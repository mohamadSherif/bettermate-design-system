A quantity as a row of discrete segments: lit in a tone, unlit in `track`, with an optional target mark.

- 20 segments for a level or a reading against a fixed scale; 24 inside an ActionBanner.
- `data-segbar="on/total/target"` with `BetterMate.hydrate()`, or `BetterMate.segbar(on, total, target)`.
- Tone classes: `bm-segbar--heat`, `--primary`, `--flow`, `--weight`; none for `ink`.
- The target mark is a short `ink` bar above one segment. Use it only when the reading has a set point.
- `bm-dots` is the same idea as a grid, for counts: shots this week, days of a schedule.
- Never use a continuous progress bar or a gradient scale anywhere in the product. Progress is a segment bar too.

### Anatomy

`.bm-segbar` is 20 px tall with `space-1` between segments. A segment is at most `mark` 6 px wide; `bm-segbar--fill` lets segments share the row instead. Lit count is `round(fraction × total)`, the same rule as the ring.

### As progress

For a task with a known end (a firmware update, an upload, a descale) wrap the bar in `.bm-progress`: a head with what is happening on the left and the figure on the right in `data`, then the bar, then one line of help. Use `ink` segments. When the end is not known, use the Loader and a sentence instead; never a bar that loops.

### States

| State | Drawing |
| --- | --- |
| No value | Every segment unlit. |
| At or past the target | The lit segments reach the mark; the mark stays `ink`. Do not change the tone. |
| Complete | Every segment lit, and the label says so ("Installed"). |

### Screen reader

- Inside a StatTile or an ActionBanner the bar repeats a number that is already text: leave it without a role.
- As progress it is the only carrier: give `.bm-segbar` `role="progressbar"`, `aria-valuemin="0"`, `aria-valuemax="100"`, `aria-valuenow` and an `aria-label` or `aria-labelledby` naming the task. Update `aria-valuenow` no more than once a second.
- A level with no text beside it uses `role="meter"` the same way.
