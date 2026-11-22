Minus, a value, plus: for a number changed in small steps, such as a target temperature or a grind weight.

- The value is `metric` with its unit attached (`93°`, `18.0 g`) and a fixed minimum width, so the buttons never move.
- Discs are 44 px, `surface-2` on a tile and `surface-1` inside a cell (`bm-stepper--on-cell`).
- One press is one step. Holding repeats after 400 ms. The value snaps; it does not count up.
- At a limit, disable that disc rather than hiding it.

### Anatomy

`.bm-stepper`: a `.bm-stepper__btn` with `minus`, a `.bm-stepper__value` at least 64 px wide, a `.bm-stepper__btn` with `plus`, `space-2` apart.

### States

| State | Disc | Glyph |
| --- | --- | --- |
| Rest | `surface-2` (`surface-1` on a cell) | `ink` |
| Hover, pressed | `control-hover`; pressed scales to 0.92 | `ink` |
| At a limit (`disabled`) | unchanged | `ink-faint` |
| Focus | the `focus` ring | |

### Content

- Value: at most 6 characters with its unit (`100.0 g`). Steps are 1 for temperature and seconds, 0.1 or 0.5 for weight, 0.1 for pressure.
- Name the buttons for what they do to this value: "Lower target temperature", "Raise target temperature".

### Keyboard and screen reader

- Wrap it in `role="group"` with an `aria-label` ("Target temperature"). The two discs are buttons with their own labels.
- The value is an `output` with `aria-live="polite"`, so a press announces the new number. It is the one live number in the system, because the person just changed it.
- Enter and Space press a disc; holding the key repeats like holding the button.
