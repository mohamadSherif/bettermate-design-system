The 53 stroke glyphs of the interface.

`BetterMate.icon(name, size)` returns an SVG that draws in `currentColor`; `data-icon="name"` with `BetterMate.hydrate()` does the same in static markup. Keep the 1.6 stroke at 24 px and let it scale with size. Do not fill a glyph, and do not mix in another set.

### Sizes

| Size | Where |
| --- | --- |
| 24 px (`icon`) | Icon buttons, the ActionBanner's disc, a top bar. |
| 20 px | A ListRow's icon disc, a Notice, a Select's chevron, the mode bar at 22 px. |
| 18 px | Inside a `bm-btn--sm` and a segmented item. |
| 14 px | Inside a Chip and a field message. |
| 36 and 28 px | The display's mode discs and small discs. |

### Meaning

An icon never carries a meaning alone. In navigation and on buttons it sits beside its word; an icon-only button has an `aria-label` and, on desktop, a Tooltip. Status glyphs are fixed: `triangle-alert` warning, `circle-alert` error, `check` done or valid, `info` information. A glyph in `currentColor` takes the contrast of the text beside it; alone on a surface it must hold 3:1, which `ink`, `ink-muted` and every status colour do.

### Screen reader

Glyphs are `aria-hidden="true"`, which `BetterMate.icon()` sets. The name comes from the control's text or `aria-label`.
