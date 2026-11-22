The unit of every page: a rounded `surface-1` block on the `surface-0` ground, holding one thing.

- A tile holds at most one title or eyebrow, one reading or list, and one control group.
- Give a reading tile this order: `eyebrow`, numeral with its raised `unit` and optional target, then a segment bar.
- Put several small readings in cells (`surface-2`, `radius-lg`) inside one tile, two columns, `space-2` apart. A tile never holds a tile; nest with a cell.
- A tile that only acts (the ActionBanner) is the cobalt one. A tile that only links is a ListRow, not a tile.
- No border and no shadow: the tone step from `surface-0` to `surface-1` is the edge.

### Anatomy

`section.bm-tile`: `radius-xl`, padding `space-5`, children `space-3` apart. `.bm-tile__head` is a row with the title or eyebrow on the left and one Chip or link on the right. `.bm-cell` is `surface-2`, `radius-lg`, padded `space-3` by `space-4`. On the grid, tiles sit `space-2` apart on a phone and `space-3` on desktop, span whole columns and stretch to fill their row.

### Tones

| Class | Ground | Only when |
| --- | --- | --- |
| none | `surface-1` | Always, except the two cases below. |
| `bm-tile--heat` | `heat-soft` | Its boiler is heating. It carries a HEATING Chip. |
| `bm-tile--primary` | `primary-soft` | It is the selected profile. It carries an IN USE Chip. |

A tinted tile always has its Chip, so the tint is never the only sign. On a tint, `ink` reads 11:1 or better and `ink-muted` 5.8:1 or better. A default Button inside a tinted tile becomes `bm-btn--outline`.

### Content

- A title is `subheading` on a phone and `heading` on desktop, sentence case, at most 24 characters.
- When a tile has nothing to show yet, keep its title and put an EmptyState inside. A tile never collapses or disappears while data loads.

### Screen reader

A tile with a title is a `section` labelled by that title (`aria-labelledby`), so the page reads as a list of regions. A tile with only an eyebrow and a reading is a `role="group"` with an `aria-label`.
