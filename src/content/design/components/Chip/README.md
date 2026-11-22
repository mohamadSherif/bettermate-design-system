A status word in a small tinted box: uppercase mono, one or two words.

- Tones mean something: `success` ready or connected, `heat` heating, `primary` a process running, `warning` attention before the next shot, `danger` a fault, `ink` the item in use, neutral for facts (PRO, 30.2 s).
- The word carries the meaning; the tint only supports it. Add `.bm-chip__dot` for a live state.
- A `warning` Chip always starts with the `triangle-alert` glyph and a `danger` Chip with `circle-alert`, at 14 px. Amber and the orange of `heat` are close neighbours, and both can sit in the Dial tile; the glyph is what tells them apart. `BetterMate.hydrate()` adds a missing glyph in static pages; in the app, write it in the markup.
- One status Chip per tile, at the right of its head. Never a row of status Chips.
- Chips are not buttons. For a choice use Segmented.

### Anatomy

`span.bm-chip` 24 px tall, `radius-sm`, padding `space-2`, label in `chip`, with an optional leading dot (`mark` 6 px) or 14 px glyph and a gap of `space-1`.

### Tones

| Class | Ground | Text | Leading mark |
| --- | --- | --- | --- |
| `bm-chip--success` | `success-soft` | `success` | dot, when live |
| `bm-chip--heat` | `heat-soft` | `heat-text` | none |
| `bm-chip--primary` | `primary-soft` | `primary-text` | dot, when live |
| `bm-chip--warning` | `warning-soft` | `warning` | `triangle-alert`, always |
| `bm-chip--danger` | `danger-soft` | `danger` | `circle-alert`, always |
| `bm-chip--ink` | `ink` | `on-ink` | none |
| neutral | `surface-2` | `ink` | none |

Every pair holds 5.2:1 or better in the three themes. A Chip has no hover, focus or disabled state.

### Content

- One or two words, at most 20 characters: READY, HEATING, FLUSH RECOMMENDED. Longer messages are a Notice.
- State, not instruction: SCALE LOST, not RECONNECT SCALE.
- A fact Chip holds a value with its unit (`30.2 s`) and stays neutral.

### Screen reader

The word is the content, so it needs nothing extra; keep the glyph and dot `aria-hidden`. When a status Chip changes while the page is open, mirror the new word in the page's status region.
