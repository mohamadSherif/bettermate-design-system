The name of an icon-only control, shown on hover and on keyboard focus.

- Use it for icon buttons on desktop: "More", "Close", "Tare the scale", "Show password". Its text is the button's `aria-label`.
- Never put anything in a Tooltip that the person needs: a rule, a unit, an error, a value. Touch screens have no hover, so on a phone it never shows. Help text and Notices carry what matters.
- Never on a disabled control, a Chip, a reading or a tile. If a reading needs explaining, the tile's label is wrong.

### Anatomy

`.bm-tooltip`: an `ink` block with `on-ink` text in `body-sm`, `radius-sm`, padding `space-1` by `space-2`, at most 240 px wide, on `layer-menu`. No arrow. It sits `space-2` from its control, above by default, and flips below or to a side when it would leave the screen.

### Timing

- Appears 500 ms after the pointer rests on the control, and at once on keyboard focus. Opacity only, `duration-fast`.
- Leaves at once when the pointer or focus leaves, on Escape, and when the control is pressed.
- The pointer can move onto the Tooltip without closing it, so it can be read under magnification.

### Content

Two or three words, sentence case, at most 28 characters, no full stop. The same words as the control's accessible name.

### Screen reader

The Tooltip element has `role="tooltip"` and is linked with `aria-describedby` only when it adds something to the name. When it repeats the `aria-label`, hide it from assistive technology with `aria-hidden="true"`; the label already says it.
