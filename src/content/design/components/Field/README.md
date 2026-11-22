Labelled inputs and switches for Settings, the profile editor and setup.

- Label above in `label`, sentence case; help below in `body-sm`, one sentence.
- Inputs are 44 px, `surface-2`, with a `line-strong` hairline: the border is what shows where to type, because `surface-2` on a tile is only 1.1:1.
- A Switch is for something that is on or off and applies at once. On is `ink`; off is `line-strong`. Put its label and help on the left, the switch on the right.
- Instructions go in help text, where they stay visible while you type: "Leave blank to keep the saved one." A placeholder is optional, shows only an example of the format ("192.168.1.20"), is set in `ink-muted`, and is never the only place a rule is written.

### Anatomy

`label.bm-field` stacks, `space-2` apart: `.bm-field__label` (with `.bm-field__opt` for "Optional" at the right), the control, then `.bm-help` or a `.bm-field__msg`. Controls are `.bm-input`, `.bm-textarea` (88 px or taller), `.bm-select` and the number field; see Select and NumberField. A control with something inside it (a unit, a chevron, a show-password button) sits in `.bm-inputwrap`.

### States

| State | Border | Fill | Text | Message |
| --- | --- | --- | --- | --- |
| Rest | `line-strong` | `surface-2` | `ink` | help in `ink-muted` |
| Hover | `ink` | | | |
| Focus | `line-strong` and the `focus` ring | | | |
| Error (`aria-invalid="true"`) | `danger` | | | `circle-alert` and a sentence in `danger`; it replaces the help |
| Warning | `line-strong` | | | `triangle-alert` and a sentence in `warning`, when the value is allowed but unusual |
| Valid | `line-strong` | | | `check` and a short confirmation in `success`, only after a check that takes time (a Wi-Fi password, a name already taken) |
| Disabled | `line` | `surface-1` | `ink-faint` | help says why |

A message always has its glyph and its words; the border colour is never the only sign. Validate when the field loses focus and again on submit, not on every key. On submit, move focus to the first field with an error.

### Switch

48 by 28 px drawn, with a hit area 44 px tall. Off: `line-strong` track, `surface-2` knob. On: `ink` track, `on-ink` knob. Hover steps the track to `ink-muted` or `ink-hover`. Disabled: `track`, and the label turns `ink-faint`. The knob travels in `duration-base`; nothing else moves.

### Content

- Label: a noun phrase of at most 28 characters, with no colon: "Machine name", "Standby after".
- Help: one sentence. Mark the few optional fields "Optional" rather than starring the required ones.
- Error: what is wrong and how to fix it, in one sentence, without "invalid" or "error": "Enter 80 to 100 °C." "That password did not work. Check it and try again."
- A counter (`.bm-field__count`, "12 / 24") appears only where a limit exists.

### Keyboard and screen reader

- The `label` wraps or points to its control. Help and messages are linked with `aria-describedby`, and an error also sets `aria-invalid="true"`.
- Give Wi-Fi and account fields their `autocomplete` values (`current-password`, `off` for a network name) and the right `inputmode`.
- The show-password button is a `bm-btn--quiet` with `aria-pressed` and a label that says what pressing does: "Show password", "Hide password".
- A Switch is `button role="switch"` with `aria-checked`, named by its visible label through `aria-labelledby`. Space and Enter toggle it. The change applies at once; no Save.
