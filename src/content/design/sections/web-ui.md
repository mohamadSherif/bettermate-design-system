# Web UI

The web app is served by the display's ESP32 from flash, over home Wi-Fi, and doubles as the captive portal. It has to load fast, work offline and weigh little. It is built from tiles on a bento grid, and it draws the machine exactly as the display does.

## Shell

| Width | Layout |
| --- | --- |
| Under 600 px | One column, `space-3` gutters, tiles `space-2` apart, down to 320 px wide with nothing clipped. Top bar: a menu button, the wordmark, and a `triangle-alert` button in `warning` only when a warning exists; each button is a 44 px target. The mode bar floats `space-3` above the bottom edge and the safe area; the page pads `space-16` under its last tile. |
| 600 to 1023 px | Two columns of tiles. Same top bar and mode bar. |
| 1024 px and up | A sidebar tile, `sidebar` 248 px wide, then a 12 column grid with `space-3` gaps up to `content-max`. The mode bar floats at the bottom centre, 400 px wide. |

- The sidebar holds the wordmark, four pages (Dashboard, Profiles, History, Settings) and the GaggiMate credit. The current page is a `surface-2` item in `ink`.
- The mode bar holds Standby, Brew, Steam, Water and Grind. The machine's mode is an `ink` pill. While a process runs the other modes are locked: drawn in `ink-faint` at full opacity, still focusable, with `aria-disabled` and their reason in words. Steam never locks. See ModeBar.
- Exactly one set of mode controls shows at any size. The profile editor and Settings hide the mode bar and pin their own action instead.

## Dashboard

Build it in this order, on a phone from top to bottom:

1. **Dial tile.** Eyebrow with mode and profile, a status Chip on the right, the Dial, then one row holding any warning Chip, with its `triangle-alert`, and the Flush button.
2. **ActionBanner.** The next thing you can do: START SHOT, WAKE UP, START GRINDING. While a process runs it turns `ink` and says STOP, with progress in segments.
3. **StatTiles.** Two columns. At rest: water tank and last shot. During a shot: pressure, flow, weight, temperature, each with a segment bar.
4. **Setup tile.** Favourite profiles as a scrolling Segmented control (`bm-seg--scroll`), so real names fit; a link to all profiles; and the target temperature Stepper, which drops under its label when the tile is narrow.
5. **Recent shots.** ListRows; the wake schedule is the last row.

On desktop the same tiles take these spans of the 12 columns:

| Tile | Columns | Rows |
| --- | --- | --- |
| Dial | 5 | 2 |
| ActionBanner | 4 | 1, stretched to the row, label at the bottom left |
| Water tank, last shot | 3 each | 1 each |
| Setup | 4 | 1 |
| Shot chart | 7 | 1 |
| Recent shots | 5 | 1 |

Simple view shows this and nothing else. Advanced adds tiles (every reading with its target, the live chart between shots, the profile curve); it never swaps a component for a denser one.

## When things are not normal

Offline, a blocking fault, a command on its way, first start, Wi-Fi setup and a firmware update are drawn on the WebStates card and specified in Product states. The page keeps its shape: one Notice first, `—` and unlit ticks for what is unknown, the ActionBanner still naming the next thing you can do, and the mode bar locked rather than hidden.

## What the dial shows

| State | Ring | Centre |
| --- | --- | --- |
| Standby | Single, `ink-faint` | Boiler temperature; next wake |
| Heating | Split | Boiler temperature; "Ready in about 40 s" |
| Ready | Split | Boiler temperature; the shot plan (18.5 g in · 36 g out · 30 s) |
| Pulling a shot | Split, pressure notch at the phase target | Timer under the phase name; temperature and pressure |
| Finished | Split | Final time; yield and ratio |
| Steam, Water | Single, `heat` | Boiler temperature; time to ready or ml pumped |
| Grind | Single, `ink` | Target, then progress against it |
| Offline, or no reading yet | Single, every tick unlit | `—`; "Last seen 14:41" |

The centre is an `eyebrow`, one `metric-xl` reading and one line of `body-sm`. Temperature and pressure live on the dial, so they leave the StatTiles in Simple view: each fact appears once.

## Tiles

- A tile is `surface-1`, `radius-xl`, padded `space-5`, with at most one title or eyebrow, one reading or list, and one control group.
- Give a reading tile this order: `eyebrow`, numeral with its raised `unit` and optional target, then a segment bar.
- Put several small readings in cells (`surface-2`, `radius-lg`) inside one tile, two columns, `space-2` apart.
- A tile that only acts (the ActionBanner) is the cobalt one. A tile that only links is a ListRow, not a tile.

## Pages

- **Profiles.** `title`, an `ink` Button for New, a search input, then one tile of ListRows. The profile in use has an `ink` icon disc and an IN USE Chip. Tap a row to select; a Menu at the row's end holds edit, details, export and delete, and its button is a sibling of the row, not inside its link. An empty list, or a search with no match, shows an EmptyState in the tile.
- **Shot history.** One tile per day with an `eyebrow` date. Rows show profile, then time, yield and peak pressure in `data`. Under a day's eyebrow the end of a row is the time alone, `14:41`. Analyzer and Statistics are links under the title.
- **Profile editor and Settings.** Tiles of fields. Segmented controls for choices of two or three, a Switch for on and off, a Select for a longer list, a NumberField with its unit inside for a typed number, an input for anything else. An error shows on its field, and again in a Toast if the save fails. The page's one primary Button is pinned at the bottom, `control-lg` tall and full width.
- **Setup.** One tile per step, one primary Button per step, the wordmark above.

## Charts

- Lines only: 2.5 px for pressure in `series-pressure`, 2 px for the others, round joins, no fill under a line and no points. Temperature is solid, flow dashed 6 4, weight dotted 1 5, so no line depends on its hue.
- Grid in `chart-grid`, three or four horizontal lines, no vertical ones. Ticks in `data`, `ink-muted`.
- Each line is labelled at its right end with its last value and unit, in `data` and `ink`. On a chart wider than 480 px the legend is a row of neutral Chips, each with a sample of its line and the series name.
- Draw charts on `surface-1` or `surface-0`, never in a cell: pressure is 2.6:1 on `surface-2` in Dark.
- Keep `animation: false`. A live chart appends points; it never redraws its history.

## Moving the current code over

| In `web/src` today | Becomes |
| --- | --- |
| Jost in `luxury.css` and the font files | Funnel Display and Geist Mono. The two files are under `fonts/` in this system; copy them into `design/fonts`. |
| `--surface-*`, `--ink*`, `--primary*`, `--heat*` values | The values in Colors; the variable names stay. Add `--on-ink` and `--track`. |
| `.bm-group` holding white tiles | `.bm-tile`, with `.bm-cell` when it needs to nest |
| `.bm-dial__segment` gradient arcs and `.bm-dial__mark` | The tick ring: `BetterMate.ring()` or the same geometry in `MachineDial.jsx` |
| `.bm-gauge` gradient bars with a sliding mark | `.bm-segbar` |
| `.bm-cta__progress` (a bar that transitions `width`) | A `.bm-segbar` inside the banner |
| Selected profile tile and active nav in cobalt | `ink` fill with `on-ink` |
| Warning text in orange | `warning` Chips; orange is heat only |
| `--disc` and `--on-disc` | `ink` and `on-ink` |
| Disabled and locked controls faded with `opacity` | `surface-2` with an `ink-faint` label, no opacity; locked modes keep `aria-disabled` and stay focusable |
| Inputs with a `line` border; instructions in placeholders | A `line-strong` border; instructions in `.bm-help`; placeholders in `ink-muted` |
| Font sizes and paddings written as numbers in component CSS | The type scale block and the `space-*` tokens, as in `bundle.css` |
| Chart series told apart by colour, with a dot legend | Dashes, end labels and line-sample Chips: `BetterMate.chart()` or the same in the chart component |
| `02:41 PM`, `Today 02:41` | `14:41`, `Today 14:41` (Content) |

## Weight

Both fonts together are 41 KB of woff2 (Funnel Display 18 KB, Geist Mono 23 KB, Latin subsets). Icons are 53 path strings, about 3 KB. There is no icon font, no animation library and no image in the interface.
