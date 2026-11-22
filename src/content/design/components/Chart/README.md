A shot drawn as lines: pressure, temperature, flow and weight against time.

- Lines only: no fill under a line, no points, no animation. A live chart appends points; it never redraws its history.
- Each series differs in three ways, so none depends on hue: its token, its line and its end label.

| Series | Token | Line | End label |
| --- | --- | --- | --- |
| Pressure | `series-pressure` | solid, 2.5 px | `9.0 bar` |
| Temperature | `series-temperature` | solid, 2 px | `93°` |
| Flow | `series-flow` | dashed 6 4, 2 px | `2.1 ml/s` |
| Weight | `series-weight` | dotted 1 5, round caps, 2 px | `36.1 g` |

- In every theme the four colours also step in lightness, 1.28:1 or more between neighbours, so they separate in greyscale and for colour-blind readers.
- Label each line at its right end with its last value and unit, in `data` and `ink`. The unit names the series. Labels keep 16 px apart; the chart nudges them when lines end close together.
- Add the legend only when the chart is wider than 480 px: neutral Chips, each with a sample of its line (`data-chart-key`), not a dot.
- Draw charts on `surface-1` or `surface-0`. Never in a cell: pressure is 2.6:1 on `surface-2` in Dark.

### Anatomy

`BetterMate.chart(options)` returns one SVG, drawn at the pixel width you give it so the type stays at `data` size. A 30 px gutter on the left holds the scale, 76 px on the right holds the end labels, and the grid is three or four horizontal lines in `chart-grid` with no vertical ones. The left scale belongs to pressure. Any series with its own `max` is scaled to that and read from its end label.

### States

| State | Drawing |
| --- | --- |
| Live | Lines grow to the right; end labels follow the newest point. Update at most 4 times a second. |
| No shot yet | The grid and scale with no lines, and an EmptyState sentence under the tile's title. |
| A series is missing (no scale, no pressure sensor) | Leave its line, legend Chip and label out. Do not draw a flat line at zero. |

### Content

- Time on the x axis in seconds, the unit on the first tick only: `0 s`, `10`, `20`, `30`.
- At most four series. Compare two shots in two charts, not eight lines.
- Minimum width 240 px. Below 480 px drop the legend; the end labels are enough.

### Screen reader

The SVG is `role="img"`. Its `aria-label` names the series, the span of time and the final values: "Pressure, temperature, flow and weight over a 30 second shot. Final values: 9.0 bar, 93 degrees, 2.1 millilitres a second, 36.1 grams." The same facts stand as text in the ListRow or StatTiles beside it, so nothing lives in the chart alone.

Markup: `<div data-chart='{"x":{...},"y":{...},"series":[...]}'></div>` with `BetterMate.hydrate()`, which draws at the element's width; or `BetterMate.chart({w, h, label, x, y, series})`.
