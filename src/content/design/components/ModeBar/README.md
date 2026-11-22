The machine's five modes in one floating pill: Standby, Brew, Steam, Water, Grind. The machine's mode is the `ink` item.

- It is state, not navigation: pressing a mode changes what the machine is doing. Pages are in the Nav.
- It floats `space-3` above the bottom edge and the safe area on a phone, and sits 400 px wide at the bottom centre on desktop. The page pads `space-16` under its last tile so nothing hides behind it.
- Exactly one set of mode controls shows at any size. The profile editor and Settings hide the mode bar and pin their own action instead.
- Leave out Grind when there is no grinder; the four that remain share the width.

### Anatomy

`nav.bm-modebar`: a `surface-1` pill with a `line` hairline and `space-1` of padding, holding one `button.bm-modebar__item` per mode. An item is 52 px tall and shares the width equally (54 px each on a 320 px screen), with a 22 px icon over its word in `caption` at weight 500.

### States

| State | Fill | Icon and word |
| --- | --- | --- |
| Rest | none | `ink-muted` |
| Hover, pressed | `state-hover` | `ink` |
| The machine's mode | `ink` | `on-ink` |
| Locked | none | `ink-faint` |
| Focus | the `focus` ring | |

**Locked is not faded.** While a shot, a flush or a grind runs, every other mode except Steam is locked. A locked item keeps its place and its word, drawn in `ink-faint` at full opacity: 4.1:1 or better on the bar in both themes, where the old 40% opacity gave 1.9:1. Mark it `aria-disabled="true"`, keep it focusable, and answer a press with a Toast: "Stop the shot to change mode." Steam never locks, because steaming milk during a shot is normal.

### Content

Mode names are fixed and are never translated into verbs: Standby, Brew, Steam, Water, Grind. One word each, at most 7 characters.

### Keyboard and screen reader

- `nav` with `aria-label="Machine mode"`. Items are buttons with `aria-pressed`; each is a Tab stop, in reading order.
- A locked item has `aria-disabled="true"` and `aria-describedby` pointing at one visually hidden sentence: "Locked while a shot runs."
- When the mode changes, from here or from the display, send the new mode to the status region ("Steam").
