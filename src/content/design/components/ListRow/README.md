One line of a list: an icon disc, a title, a line of mono facts and something at the end.

- The whole row is the target. Put at most one thing at the end: a time, a Chip or a chevron.
- Facts go in `data`, separated by middle dots: `30.2 s · 36.1 g · 10.0 bar`.
- The current item (`aria-current="true"`) gets an `ink` disc. Add an IN USE Chip when the list can scroll it out of view.
- Rows divide with a `line` hairline; the first row has none.

### Anatomy

`a.bm-item` (or `button.bm-item`, or `div.bm-item` when it does nothing) at least 60 px tall: `.bm-item__icon`, a 40 px `surface-2` disc with a 20 px glyph; `.bm-item__body` with `.bm-item__title` in `body` at 500 and `.bm-item__meta` in `data`; `.bm-item__end` in `data`. The row reaches `space-2` past its text on each side so its hover fill has room; the hairline stays as wide as the text.

### States

| State | Drawing |
| --- | --- |
| Hover, pressed | `state-hover` across the row, `radius-md`. Only rows that are links or buttons. |
| Focus | The `focus` ring around the row. |
| Current | An `ink` disc with an `on-ink` glyph. |
| Static | A `div.bm-item` has no hover and no pointer: the wake schedule shown as a fact. |

### Content

- Title and facts are one line each and truncate with an ellipsis. Put the words that differ first: "Crème brûlée, slow bloom" survives truncation, "Profile for light roasts: Crème brûlée" does not.
- At most three facts in the second line. At 320 px a row with a time at its end has room for about 19 characters, which is two facts; the third truncates, so put the two that matter first.
- The end slot is at most 12 characters: `Today 14:41`, a Chip, or nothing. See Content for time formats.

### Keyboard and screen reader

- Wrap the rows in `ul.bm-list` with each row in an `li`, or give the container `role="list"`.
- A link row opens its detail with Enter. A row that selects (a profile) is a `button` with `aria-pressed`, or part of a `role="radiogroup"`.
- A row that also has its own actions (edit, export, delete) puts a `bm-btn--quiet` "More" button after the row, as a sibling inside the `li`, never inside the link.
- The accessible name is the title, then the facts, then the end: check that it reads as a sentence.
