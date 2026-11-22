The machine's round display inside a web tile: the same tick ring, with one reading in the middle.

- The centre holds an `eyebrow`, one `metric-xl` reading and one line of `body-sm`. Nothing else.
- Follow the table in Web UI for what each machine state shows.
- Width is 264 px on a phone and up to 300 px on desktop; on a 320 px screen it is the tile's inner width, 256 px. The ring scales; the centre text does not.
- Ticks recolour in `duration-fast`. The reading snaps.

### States

| State | Ring | Centre |
| --- | --- | --- |
| Live | Lit ticks in the series tone, an `ink` notch at the target | The reading |
| Offline or no reading yet | Single ring, every tick unlit | `—`, with "Last seen 14:41" on the line below |
| Standby | Single ring in `ink-faint` | Boiler temperature and the next wake |

### Content

- Reading: at most 4 characters (`92°`, `0:15`, `11.4`). A fifth does not fit inside the ring at 256 px.
- The line below: one clause, at most 28 characters, with middle dots between facts: `18.5 g in · 36 g out · 30 s`.
- The eyebrow names what the reading is (BOILER) or the phase (RAMP TO 9 BAR), at most 16 characters.

### Screen reader

The ring is `aria-hidden`: every fact it draws is also text in the centre or in the tiles below. Give the Dial `role="group"` and an `aria-label` such as "Machine". Do not make the reading live; send "Heating", "Ready", "Shot started" and "Shot finished, 30.2 seconds, 36.1 grams" to the page's status region instead.

Markup: `.bm-dial` with `data-ring='{"left":[value,target,"heat"],"right":[value,target,"primary"]}'` and a `.bm-dial__center` child; `BetterMate.hydrate()` draws the ring.
