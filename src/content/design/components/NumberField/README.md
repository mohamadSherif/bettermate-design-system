A typed number with its unit inside the field: dose, yield, a phase's duration, a pressure target.

- Use it in the profile editor, where a value is typed once. On the dashboard, a value nudged in small steps is a Stepper.
- The unit is part of the field, not of the label: "Dose" with `g` inside, never "Dose (g)".

### Anatomy

`.bm-inputwrap` holding `input.bm-input.bm-input--num` and `.bm-input__unit`. The number is right-aligned in `body` with tabular figures and ends `space-12` from the right edge; the unit sits in that space in `unit`, `ink-muted`, UPPERCASE. Use `type="text"` with `inputmode="decimal"`: it gives the numeric keyboard without the spinner arrows and the scroll-wheel changes of `type="number"`.

### States

The Field's states. An out-of-range value is an error when the field loses focus: `danger` border, `circle-alert`, and a sentence that states the range.

### Content

| Quantity | Unit shown | Decimals | Typical range |
| --- | --- | --- | --- |
| Temperature | `°C` | 0 | 80 to 100 |
| Pressure | `BAR` | 1 | 0.0 to 12.0 |
| Dose, yield | `G` | 1 | 0.0 to 100.0 |
| Flow | `ML/S` | 1 | 0.0 to 10.0 |
| Duration | `S` | 0 or 1 | 0 to 120 |
| Standby after | `MIN` | 0 | 0 to 240 |

- Accept a comma or a point as the decimal mark and show the point. Round to the decimals in the table when the field loses focus; never while typing.
- State the range in the help line when it is not obvious ("80 to 100 °C") and repeat it in the error.
- Empty is allowed only where the help says what empty means.

### Keyboard and screen reader

- The visible label names the field. Link the unit into the name with `aria-describedby` on the unit's id, so it reads "Dose, 18.0, grams": give the unit an `aria-label` with the word ("grams") since "G" alone is read as a letter.
- Up and Down change the value by one step (0.1 or 1), Shift with them by ten. Do not trap the scroll wheel.
