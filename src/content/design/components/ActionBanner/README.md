The one cobalt thing on a view: a full-width banner that says what you can do next, with a disc that shows the action's glyph.

- Use exactly one per page, directly under the Dial tile. Label in two words, a verb first: START SHOT, WAKE UP, START GRINDING.
- The second line states the consequence: "Stops at 36 g", "Ready in about 4 min".
- While a process runs, switch to `bm-cta--stop`: `ink` ground, STOP as the label, progress as a segment bar inside the banner.
- Never colour it by mode, and never place two side by side.

### Anatomy

`button.bm-cta` holding `.bm-cta__text` (`.bm-cta__label` in `button-lg`, `.bm-cta__sub` in `body-sm`, optional `.bm-segbar`) and `.bm-cta__disc`, a 48 px `ink` disc with a 24 px icon. Minimum height `banner` 76 px, radius `radius-xl`, padding `space-3` with `space-5` on the left.

### States

| State | Fill | Label | Notes |
| --- | --- | --- | --- |
| Rest | `primary` | `on-primary` | Both lines at full strength: the second line is never faded. |
| Hover, pressed | `primary-hover` | `on-primary` | Pressed also scales to 0.985. |
| Running (`bm-cta--stop`) | `ink`, then `ink-hover` | `on-ink` | The disc inverts to `on-ink` with an `ink` glyph. |
| Pending (`aria-busy="true"`) | unchanged | STARTING, STOPPING | A Loader replaces the glyph. Shown from the tap until the machine confirms; after 2 s without an answer, restore the banner and raise a Toast. |
| Disabled | `surface-2` | `ink-faint` | Only when nothing can be started, and the second line says why: "Fix the fault to brew". |
| Focus | | | The `focus` ring, 2 px outside. |

### Content

- Label: at most 14 characters, so it fits a 320 px screen. It truncates with an ellipsis rather than wrapping.
- Second line: one clause, at most 28 characters, no full stop. It truncates too.
- 24 segments in the progress bar. Give the bar the same quantity the second line names ("21.7 of 36 g").

### Keyboard and screen reader

- A native `button`: Enter and Space press it. It is the first stop after the Dial tile.
- The accessible name is both lines, so "Start shot, stops at 36 g". Keep the disc's icon `aria-hidden`.
- While pending set `aria-busy="true"`. When it turns to STOP, send "Shot started" to the page's status region (see Accessibility); do not move focus.
- The segment bar inside is decoration here: the second line already says the progress.
