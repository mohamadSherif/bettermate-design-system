#!/usr/bin/env node
/* Copies a BetterMate release's display images off GitHub into this site, for the browser installer at /install/.
   GitHub serves release files without CORS headers, so a page cannot fetch them itself: the site hosts its own copy.
   The output is committed, so a build never needs the network. Run again for a new release:

     npm run firmware                  # v1.0.0
     npm run firmware -- v1.1.0

   Every file is checked against the SHA-256 GitHub reports for it before it is kept.

   Writes:
     public/firmware/<tag>/           the images the installer writes, under their release names
     src/content/firmware.json        the release, and each build's images with their offsets, sizes and hashes */
import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const REPO = '531dev/bettermate';
const TAG = process.argv[2] || 'v1.0.0';
const OUT = path.join(ROOT, 'public', 'firmware', TAG);

/* The separate images and where each goes, from the release notes. boot_app0 is not a release file: it lives in the repo. */
const PARTS = [
  { part: 'bootloader', offset: 0x0 },
  { part: 'partitions', offset: 0x8000 },
  { part: 'boot_app0', offset: 0xe000 },
  { part: 'firmware', offset: 0x10000 },
  { part: 'filesystem', offset: 0xc90000 },
];
const BUILDS = [
  { id: 'screen', label: 'With a screen', prefix: 'display' },
  { id: 'headless', label: 'Without a screen', prefix: 'display-headless' },
];

const sha256 = (buf) => crypto.createHash('sha256').update(buf).digest('hex');

async function get(url) {
  const res = await fetch(url, { headers: { 'User-Agent': 'bettermate-site' } });
  if (!res.ok) throw new Error(`${res.status} ${res.statusText} for ${url}`);
  return Buffer.from(await res.arrayBuffer());
}

const release = JSON.parse((await get(`https://api.github.com/repos/${REPO}/releases/tags/${TAG}`)).toString());
const assets = new Map(release.assets.map((a) => [a.name, a]));

fs.rmSync(OUT, { recursive: true, force: true });
fs.mkdirSync(OUT, { recursive: true });

const fetched = new Map();
async function keep(name, url, expected) {
  if (fetched.has(name)) return fetched.get(name);
  const buf = await get(url);
  const hash = sha256(buf);
  if (expected && hash !== expected) throw new Error(`${name}: SHA-256 ${hash}, GitHub says ${expected}`);
  fs.writeFileSync(path.join(OUT, name), buf);
  const file = { file: `/firmware/${TAG}/${name}`, size: buf.length, sha256: hash };
  fetched.set(name, file);
  console.log(`${name.padEnd(34)} ${String(buf.length).padStart(9)} B`);
  return file;
}

const builds = [];
for (const b of BUILDS) {
  const parts = [];
  for (const { part, offset } of PARTS) {
    let file;
    if (part === 'boot_app0') {
      file = await keep('boot_app0.bin', `https://raw.githubusercontent.com/${REPO}/${TAG}/docs/boot_app0.bin`);
    } else {
      const name = `${b.prefix}-${part}.bin`;
      const asset = assets.get(name);
      if (!asset) throw new Error(`${TAG} has no ${name}`);
      file = await keep(name, asset.browser_download_url, asset.digest?.replace(/^sha256:/, ''));
    }
    parts.push({ part, offset, ...file });
  }
  builds.push({ id: b.id, label: b.label, parts });
}

const manifest = {
  version: TAG,
  name: release.name,
  published: release.published_at,
  url: release.html_url,
  chip: 'ESP32-S3',
  builds,
};
fs.writeFileSync(path.join(ROOT, 'src', 'content', 'firmware.json'), JSON.stringify(manifest, null, 2) + '\n');
console.log(`Wrote src/content/firmware.json for ${release.name}`);
