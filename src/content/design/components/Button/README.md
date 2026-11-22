Pill buttons for everything that is not the page's main action.

- `bm-btn--primary`: the one commit on a form (Save). Never beside an ActionBanner.
- `bm-btn--ink`: the main action of a list or tool (New profile, Analyze).
- Default (`surface-2`): secondary actions inside a tile (Tare, Flush). Use `bm-btn--outline` where the ground is already `surface-2` or a tint.
- `bm-btn--ghost`: a link-like action in `primary-text`. `bm-btn--danger`: delete and reset only.
- `bm-btn--quiet`: an icon on a bare ground, with no fill until it is hovered: menu, close, more, show password.
- Sizes: default 44 px; `bm-btn--lg` 56 px for a pinned action; `bm-btn--sm` 36 px in dense desktop rows only. On a touch screen `bm-btn--sm` is 44 px tall by itself, so never rely on it to save height on a phone.
- Labels are UPPERCASE mono, one or two words, a verb first.

### Anatomy

`button.bm-btn` with an optional leading icon (18 px in `bm-btn--sm`, 24 px otherwise) and a label in `button` (`button-lg` on `bm-btn--lg`). Padding `space-5`, gap `space-2`, radius `radius-pill`. `bm-btn--icon` is a 44 px circle and needs an `aria-label`. `bm-btn--block` fills its row.

### States

| Variant | Rest | Hover and pressed | Disabled |
| --- | --- | --- | --- |
| Primary | `primary`, `on-primary` | `primary-hover` | `surface-2`, `ink-faint` |
| Ink | `ink`, `on-ink` | `ink-hover` | `surface-2`, `ink-faint` |
| Default | `surface-2`, `ink` | `control-hover` | `surface-2`, `ink-faint` |
| Outline | `line-strong` hairline, `ink` | `state-hover` | `line` hairline, `ink-faint` |
| Ghost, quiet | no fill | `state-hover` | no fill, `ink-faint` |
| Danger | `danger-soft`, `danger` | `danger-soft-hover` | `surface-2`, `ink-faint` |

Hover and pressed share one fill; pressed also scales to 0.97. Focus is the `focus` ring, 2 px outside, on every variant. A button that is working keeps its width, swaps its icon for a Loader and sets `aria-busy="true"`. The States card shows all of this in the three themes.

### Content

- One or two words, at most 16 characters. A button never wraps; if the label does not fit, shorten it.
- Name the object when the action is destructive or sits in a dialog: DELETE PROFILE, not OK.
- One primary or ink button per view. Two actions of equal weight are both default buttons.

### Keyboard and screen reader

- Use a real `button`, or an `a` only when it navigates. Enter and Space press it.
- Disable with the `disabled` attribute when the action can never apply here. When it is only unavailable for now and the reason helps, keep it focusable with `aria-disabled="true"` and say why in help text beside it.
- An icon-only button takes its name from `aria-label`: "More", "Close", "Show password". Add a Tooltip on desktop.
