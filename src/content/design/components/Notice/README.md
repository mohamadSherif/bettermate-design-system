A message that stays on the page until its cause is gone: the machine is offline, a fault blocks brewing, an update is ready.

- Use a Notice for anything the person must know before their next action and that will still be true in a minute. Something that just happened and needs no action is a Toast. One or two words of state are a Chip.
- Inside a tile it is a cell-sized block (`radius-lg`). Across a page, above the first tile, use `bm-notice--page`, which is tile-sized (`radius-xl`).
- One Notice per cause, and the most severe first. Three warnings become one Notice that says "3 things to check" and links to the list.

### Anatomy

`.bm-notice`: a 20 px glyph in `.bm-notice__icon`, then `.bm-notice__body` with `.bm-notice__title` in `body` at weight 500, `.bm-notice__text` in `body-sm`, and optional `.bm-notice__actions` holding one or two `bm-btn--outline` buttons. Padding `space-3` by `space-4`, gap `space-3`.

### Tones

| Class | Ground | Glyph | For |
| --- | --- | --- | --- |
| neutral | `surface-2` (`surface-1` on a page) | `info`, or a Loader | Work in progress: "Connecting to the machine". |
| `bm-notice--info` | `primary-soft` | `info` in `primary-text` | Something new that can wait: an update is ready. |
| `bm-notice--success` | `success-soft` | `check` in `success` | A long task finished: "Updated to 1.8.0". |
| `bm-notice--warning` | `warning-soft` | `triangle-alert` in `warning` | Attention before the next shot: water low, flush recommended. |
| `bm-notice--danger` | `danger-soft` | `circle-alert` in `danger` | A fault, or the machine cannot be reached. |

Title and text are `ink` and `ink-muted` on every ground (11:1 and 5.4:1 or better); only the glyph takes the status colour, and it always comes with the title's words. There is no orange Notice: heating is not a message.

### Content

- Title: what is true, at most 40 characters, no full stop: "The machine is offline", "Boiler sensor lost".
- Text: what it means and what to do, one or two sentences. See Content for the error pattern.
- Buttons: verbs that name the fix, most likely first: TRY AGAIN, DETAILS. Never OK or DISMISS on a danger Notice; it leaves when the fault does.
- A warning Notice may have a close button (`bm-btn--quiet`, "Dismiss"); the warning stays in the top bar's list.

### Keyboard and screen reader

- A danger Notice that appears while the page is open is `role="alert"`. Every other tone is `role="status"`. One that is there when the page loads has no live role; it is just content, placed first.
- Do not move focus to a Notice. Its buttons come in the normal Tab order.
- The glyph is `aria-hidden`; start the title with the state in words when the tone matters ("Warning: water low" is not needed, "Water low" is enough, because the word carries it).
