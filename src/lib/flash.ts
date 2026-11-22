/* Writes a BetterMate release onto a display over USB, from the browser, with Web Serial and esptool-js.

   The images come from this site (scripts/fetch-firmware.mjs copies them out of the GitHub release, which sends no
   CORS headers). Each one is checked against the release's SHA-256 before anything touches the display, and esptool
   reads back an MD5 of every image it writes, so a bad cable fails loudly instead of leaving a half-written display.

   The separate images match display-full.bin byte for byte where they land. Writing them instead of the full image
   leaves the gaps alone, so the display keeps its Wi-Fi and settings; erasing first gives the full image's blank start. */
import release from "@/content/firmware.json";

export type Release = typeof release;
export type Build = Release["builds"][number];
export type BuildId = Build["id"];
export { release };

export type Step =
  | { s: "download"; done: number; total: number }
  | { s: "connect" }
  | { s: "erase" }
  | { s: "write"; part: number; parts: number; done: number; total: number }
  | { s: "restart" };

export const serialSupported = () => typeof navigator !== "undefined" && "serial" in navigator;

const hex = (buf: ArrayBuffer) => Array.from(new Uint8Array(buf), (b) => b.toString(16).padStart(2, "0")).join("");

async function download(build: Build, onStep: (step: Step) => void): Promise<Uint8Array[]> {
  const total = build.parts.reduce((n, p) => n + p.size, 0);
  let done = 0;
  onStep({ s: "download", done, total });
  const images: Uint8Array[] = [];
  for (const p of build.parts) {
    const res = await fetch(p.file);
    if (!res.ok) throw new FlashError(`Could not download ${p.part} (${res.status}).`);
    const buf = await res.arrayBuffer();
    if (hex(await crypto.subtle.digest("SHA-256", buf)) !== p.sha256)
      throw new FlashError(`The downloaded ${p.part} image does not match the release. Reload the page and try again.`);
    images.push(new Uint8Array(buf));
    done += p.size;
    onStep({ s: "download", done, total });
  }
  return images;
}

/* An error worth showing as it is. Anything else is turned into one by explain(). */
export class FlashError extends Error {}

export function explain(e: unknown): string {
  if (e instanceof FlashError) return e.message;
  const text = e instanceof Error ? e.message : String(e);
  if (/MD5 of file does not match/i.test(text)) return "What was written does not read back the same. Try another USB cable or port, then install again.";
  if (/Failed to open serial port|port is already open/i.test(text))
    return "The port is in use. Close any other tab or app talking to the display, such as a serial monitor or another flasher.";
  if (/Failed to connect|Timeout|timed out|Couldn't sync/i.test(text))
    return "The display did not answer. Unplug it, hold its BOOT button while you plug it back in, then install again.";
  if (/device has been lost|disconnected|NetworkError/i.test(text)) return "The display was unplugged. Plug it back in and install again.";
  return text;
}

/* Asks for a port, so it must run straight from a click, before anything else is awaited. */
export async function requestPort(): Promise<SerialPort | null> {
  try {
    return await navigator.serial.requestPort();
  } catch {
    return null; // the visitor closed the list
  }
}

export async function install(port: SerialPort, build: Build, opts: { erase: boolean; onStep: (step: Step) => void }) {
  const { onStep } = opts;
  const images = await download(build, onStep);

  onStep({ s: "connect" });
  const [{ ESPLoader, Transport }, { default: SparkMD5 }] = await Promise.all([import("esptool-js"), import("spark-md5")]);
  const transport = new Transport(port, false);
  try {
    const loader = new ESPLoader({ transport, baudrate: 921600, romBaudrate: 115200 });
    const chip = await loader.main();
    if (!/ESP32-S3/i.test(chip)) throw new FlashError(`This is an ${chip}. BetterMate displays are ESP32-S3 boards: check that you picked the display's port.`);

    if (opts.erase) {
      onStep({ s: "erase" });
      await loader.eraseFlash();
    }

    const parts = build.parts.length;
    await loader.writeFlash({
      fileArray: build.parts.map((p, i) => ({ address: p.offset, data: images[i] })),
      flashMode: "keep",
      flashFreq: "keep",
      flashSize: "keep",
      eraseAll: false,
      compress: true,
      reportProgress: (i, done, total) => onStep({ s: "write", part: i + 1, parts, done, total }),
      calculateMD5Hash: (image) => SparkMD5.ArrayBuffer.hash(image.buffer.slice(image.byteOffset, image.byteOffset + image.byteLength) as ArrayBuffer),
    });

    onStep({ s: "restart" });
    await loader.after("hard_reset");
  } finally {
    try {
      await transport.disconnect();
    } catch {}
  }
}
