A reading in a tile: mono label, large tabular numeral with a raised unit, and a segment bar.

- Order is fixed: `eyebrow`, numeral, bar. Add `/ target` after the numeral only when a target exists.
- Give the bar the series tone (`bm-segbar--heat`, `--primary`, `--flow`, `--weight`); a plain level uses `ink`.
- A tile turns `bm-tile--heat` only while that boiler is heating, and then carries a HEATING Chip.
- Group small results as `bm-stat--sm` in cells inside one tile rather than as many small tiles.
- Do not show a reading that is zero at rest in Simple view.

### Anatomy

`.bm-tile > .bm-stat` with `.bm-eyebrow`, `.bm-stat__row` (`.bm-stat__value` in `metric-lg`, `.bm-stat__unit` in `unit`, `.bm-stat__target` in `metric-sm`) and `.bm-segbar`. `bm-stat--sm` sets the numeral in `metric` and the target in `data`.

### States

| State | What changes |
| --- | --- |
| Live | Digits snap as telemetry arrives; segments recolour in `duration-fast`. |
| No reading yet, or offline | The numeral is `—`, the unit stays, every segment is unlit. No shimmer and no spinner. |
| Heating | The tile takes `heat-soft` and a HEATING Chip. Nothing else is ever tinted. |
| Off target | The numeral stays `ink`. Say it in a Chip or on the Dial, not by colouring the number. |

### Content

- Label: one or two words, at most 14 characters; it may wrap to a second line in a narrow tile.
- Numeral: at most 5 characters (`100.0`, `1:2.0`). Decimals follow the Content section: one for pressure, flow, weight and seconds; none for temperature and percent.
- At 320 px a two-column tile is 144 px wide; the target wraps under the numeral there instead of clipping it.

### Screen reader

The tile is not interactive. Mark the label and value up so they read together ("Pressure 9.0 bar, target 9.0"): put the tile in a `role="group"` with `aria-label`, or use a `dl`. Never make a live numeral an `aria-live` region; it changes four times a second. State changes go to the page's status region.

Markup: `.bm-tile > .bm-stat` with `.bm-eyebrow`, `.bm-stat__row` (`.bm-stat__value`, `.bm-stat__unit`, `.bm-stat__target`) and `.bm-segbar`.
