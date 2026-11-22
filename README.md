# BetterMate site

A static Next.js site that pitches BetterMate to GaggiMate owners: every stock GaggiMate screen beside its BetterMate
counterpart, and the BetterMate design system laid out the way [Stacks](https://stackoverflow.design/) documents
Stack Overflow's (foundations, components with live examples and markup, written guidelines).

The site is styled with BetterMate's own tokens and `bm-*` recipes, and the round-display faces are drawn at build time
by the design system's bundle, so it shows the system by using it.

## Pages

| Route | What it is |
| --- | --- |
| `/` | The pitch: a before-and-after wipe of the round display, what changes and what stays, the five display rules drawn live, the web app side by side, and where the project stands. |
| `/compare/` | Every stock screen beside BetterMate's, with what changed and what is still there. |
| `/foundations/<slug>/` | Principles, colour, type, layout, icons, motion, content, accessibility, product states, round display, web UI. |
| `/components/` and `/components/<slug>/` | Each component live in a frame that follows the site's theme, its HTML, and its guidelines. |

## Commands

```shell
npm install
npm run dev      # http://localhost:3000
npm run build    # static export into out/
npm run sync     # re-import the design system and captures from ../betterMate
```

## Where the content comes from

`npm run sync` (`scripts/sync-design.mjs`) reads the betterMate workspace (`../betterMate`, or `BETTERMATE_DIR`) and
writes everything the site needs into this repository, so a build never touches the workspace:

- `bettermate/design/` → `src/content/design/` (tokens, written sections, component READMEs and markup),
  `src/styles/` and `public/design/` (generated `tokens.css`, `bundle.css`, fonts, wordmarks), `src/lib/bm-bundle.js`
  (the drawing bundle as an ES module), and `public/previews/` (each component's preview as its own page).
- `visual-identity/current*/` (stock GaggiMate) and `bettermate/docs/{display/v2,webui}/` (BetterMate) →
  `public/compare/`, resized to webp, with their sizes in `src/content/captures.json`.

The comparison notes are written by hand in `src/content/compare.ts`; each "Still there" item was checked against
`stock-screens.md` and the BetterMate display source. The status band on the overview (`src/app/page.tsx`) reflects
`bettermate/docs/v2/STATUS.md` as of 2026-11-14 and needs updating by hand as the project moves.

Licensed CC BY-NC-SA 4.0, as GaggiMate. Funnel Display and Geist Mono are under the SIL Open Font License.
