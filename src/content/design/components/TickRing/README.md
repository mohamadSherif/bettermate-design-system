The ring of ticks on the rim of the display, and around the web Dial: lit ticks are the value, a longer ink tick is the target.

- Use the split ring when temperature and pressure both matter (Brew, Shot), the single ring for one quantity (Steam, Water, Grind, Standby).
- Scales are fixed at 0 to 160 °C and 0 to 16 bar. Do not rescale to make the ring look fuller.
- Tones: `heat` temperature, `primary` pressure, `ink` progress, `ink-faint` standby. Unlit ticks are `track`.
- The notch marks a target; leave it out for progress and standby.
- Never replace ticks with a continuous arc, round the ring off with end caps, or add numerals along it.

### What the ring may carry

The ring is never the only place a value lives. Every quantity on it is also a numeral or a sentence on the same screen, so the unlit `track` ticks can stay decorative (they are under 3:1 by design) and the ring can be hidden from a screen reader. Lit ticks hold 3:1 or better on every surface in every theme, and the notch is `ink`.

Two tones never sit side by side on one arc, so no reading depends on telling orange from cobalt: temperature is always the left arc or the single ring, pressure always the right.

`BetterMate.ring({left: [value, target, tone], right: [...]})` or `{full: [...]}` returns the SVG, marked `aria-hidden`; values and targets are fractions from 0 to 1, and a target of -1 means none. `BetterMate.geometry` exposes the angles and counts for LVGL and Preact ports.
