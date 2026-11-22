Every control in every state, in the three themes. One rule makes all of them, and it lives in one block of `bundle.css`.

### The rule

| State | What changes | Token |
| --- | --- | --- |
| Rest | The control's own fill and label. | |
| Hover | The fill moves one tone step. Nothing moves or grows. Only where the device has hover. | The fill's `-hover` token: `primary-hover`, `ink-hover`, `control-hover`, `danger-soft-hover`. A control with no fill takes `state-hover` and its label turns `ink`. |
| Pressed | The same fill as hover, and the control scales: 0.97 for a Button, 0.985 for the ActionBanner, 0.92 for a stepper disc. On a touch screen this is the only feedback, so it is never skipped. | as hover |
| Selected | An `ink` fill with `on-ink`. Never cobalt, never a border plus a fill. The current page in the Nav is a `surface-2` step instead. | `ink`, `on-ink` |
| Focus | One ring for everything: 2 px `focus`, 2 px outside the control. It shows for keyboard focus (`:focus-visible`) and always on a field. | `focus`, `outline` |
| Disabled | A `surface-2` fill (none, for a control that has none) with an `ink-faint` label, no hover, no scale. Never opacity. | `ink-faint` |
| Locked | A control that works again shortly, such as a mode during a shot: as disabled, but still focusable, with `aria-disabled="true"` and its reason in words. | `ink-faint` |
| Invalid | A `danger` border on the field and a message with a glyph under it. | `danger` |

A new control needs no new decisions: give it a fill and a `--bm-hover`, and the block applies the rest.

### Why each step is safe

- Cobalt steps darker in every theme, so white on it gains contrast: 8.6 to 11.1:1 in Light, 4.6 to 6.1:1 in Dark. Before this, Dark stepped lighter and fell to 3.6:1.
- `ink-faint` on any surface is 3.6:1 or better and at least APCA Lc 30, the floor for text that is switched off. Fading a control to 40% took mode labels to 1.9:1.
- The focus ring is 6.5:1 or better against every surface, and it sits outside the control, so it never has to contrast with the fill.
- Hover is wrapped in `@media (hover: hover)`, so a tap on a phone does not leave a control looking hovered.

### What the matrix shows

Rows are the pressable parts; columns are the states that apply to each. "n/a" marks a state a control cannot be in: a Button is never selected, and a Nav item is never disabled, it is left out. The ActionBanner, list rows and menu items follow the same rule and are shown on their own cards. The states are forced here with `is-hover` and `is-focus`, the two classes `bundle.css` keeps for documentation and tests; do not use them in the app.

### Checking a change

After changing a colour token, open this card in Dark and Display black as well as Light. Every label must still read, and every focus ring must still be seen. `tokens.json` usage notes carry the ratios each pair is expected to hold.
