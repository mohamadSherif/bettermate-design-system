A pill-shaped choice of two or three: the selected item is `ink`.

- Use Segmented for mutually exclusive settings that apply at once: stop by time or weight, theme, Simple or Advanced.
- Two or three items, each one word. More than three becomes a Select or a ListRow that opens a list.
- On a tile, the track is `surface-2`; inside a cell use `bm-seg--on-tile`.
- Names you do not control, such as favourite profiles, use `bm-seg--scroll`: each item keeps its own width up to 176 px, then truncates, and the track scrolls sideways instead of squeezing or wrapping. Wrap the name in `.bm-seg__label`. Keep the selected item scrolled into view.
- The mode bar is built on the same idea and has its own card, ModeBar.

### Anatomy

`.bm-seg` is a 44 px track with `space-1` of padding; each `.bm-seg__item` is a 36 px pill, at least 44 px wide, with its label in `label` and an optional 18 px icon. An item's hit area fills the track's full height, so the target is 44 px even though the pill is 36. `bm-seg--block` shares a row's width equally.

### States

| State | Fill | Label |
| --- | --- | --- |
| Rest | none | `ink-muted` |
| Hover, pressed | `state-hover` | `ink` |
| Selected | `ink` | `on-ink` |
| Disabled | none | `ink-faint` |
| Focus | the `focus` ring, inside the track's padding | |

The fill changes in `duration-fast`. Nothing slides.

### Content

- A fixed option is one word of at most 10 characters; three of them fit a 320 px screen.
- Always have exactly one selected. A choice that can be empty is not a Segmented control.

### Keyboard and screen reader

- For a setting, mark the track `role="radiogroup"` with an `aria-label` and each item `role="radio"` with `aria-checked`; arrow keys move and select, and Tab enters and leaves the group once.
- For a pair of views or filters, plain buttons with `aria-pressed` in a `role="group"` are enough; each is a Tab stop.
- Choosing applies at once. If applying can fail (switching profile while offline), keep the old selection and raise a Toast.
