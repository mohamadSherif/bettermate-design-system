The sign that the machine is working on something you asked for: three lit ticks stepping round a small ring. It is the display's busy comet, drawn for the web.

- Use it while a command is on its way and has no measurable progress: starting a shot, saving to the machine, scanning for Wi-Fi, pairing a scale.
- When progress can be measured, use a segment bar (SegmentBar, As progress).
- Never for a page or a tile that is loading its first reading: tiles show `—` and unlit ticks, and there is no shimmer.
- Always beside words that say what is happening. A Loader alone says nothing.

### Anatomy

`BetterMate.loader(size)` returns an SVG of twelve ticks; `data-loader` with `BetterMate.hydrate()` does the same. Unlit ticks are `track`; three lit ticks take `currentColor`, so the Loader matches the text beside it. On a filled control (the ActionBanner, a primary or ink Button, a Toast) the unlit ticks are the label colour at 28%.

| Size | Where |
| --- | --- |
| 14 px | In a field's message line. |
| 18 or 20 px | In a Button, a Notice, a ListRow's end. |
| 24 px | In the ActionBanner's disc. |
| 40 px | Alone in the middle of a Dialog, over a sentence. |

### Motion

The lit ticks advance one position every 80 ms, twelve steps to a turn, with `steps(12)`: it steps, it does not sweep, the same as the ring on the display. Under `prefers-reduced-motion` it stands still, and the words beside it carry the meaning.

### Timing

- Show it at once when the wait follows a press; the control should answer within one frame.
- If the wait passes 2 s for a machine command, or 15 s for a scan, stop, restore the control and say what happened in a Toast or Notice. A Loader never spins forever.

### Screen reader

The SVG is `aria-hidden`. Put `aria-busy="true"` on the control or region that is working, and the words ("Saving", "Looking for networks nearby") in text or in the status region.
