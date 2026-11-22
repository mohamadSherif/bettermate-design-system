A short list of actions on one thing, opened from a button: the "More" at the end of a profile's row, the menu behind the top bar.

- Use it for two to six actions that do not deserve their own buttons. One action is a Button; a choice of value is a Select or a Segmented control.
- Order by how often each is used, and put the destructive action last, under a separator.
- On a phone a Menu with more than four items opens as a sheet (Dialog) instead of a popover.

### Anatomy

`.bm-menu`: a `surface-2` block with a `line-strong` hairline, `radius-lg`, `space-1` of padding, 200 to 280 px wide, on `layer-menu`. The hairline is what separates it from the tile under it, since nothing here has a shadow. Each `.bm-menu__item` is 44 px tall, `radius-md`, with an optional 20 px icon, its label in `.bm-menu__label` (`body`), and an optional `.bm-menu__hint` at the right in `data`. `.bm-menu__sep` is a `line` hairline. It opens below its button, aligned to the button's right edge, `space-1` away, and flips above when there is no room.

### States

| State | Fill | Label |
| --- | --- | --- |
| Rest | none | `ink` |
| Hover, pressed, keyboard highlight | `state-hover` | `ink` |
| Destructive (`bm-menu__item--danger`) | none, then `danger-soft` | `danger` |
| Checked (`aria-checked="true"`) | none | `ink`, with a `check` at the right |
| Disabled | none | `ink-faint` |
| Focus | the `focus` ring | |

Enter: opacity and a 16 px rise in `duration-base`; leave in `duration-fast`.

### Content

- A verb, or a verb and its object, sentence case, at most 24 characters: "Edit", "Export as JSON", "Delete profile".
- No item called "More". No nested menus.
- A destructive item opens a Dialog; it never acts at once.

### Keyboard and screen reader

- The opening button has `aria-haspopup="menu"`, `aria-expanded`, and `aria-controls` pointing at the Menu.
- The Menu is `role="menu"`; items are `role="menuitem"` (or `menuitemradio` with `aria-checked`). The separator is `role="separator"`.
- Opening moves focus to the first item. Up and Down move, Home and End jump, typing a letter jumps to a match, Enter or Space activates, Escape closes and returns focus to the button, Tab closes and moves on.
- A press outside closes it without acting.
