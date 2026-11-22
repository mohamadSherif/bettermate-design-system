The phases of a process as a row of bars: done, running, to come.

- Each step's width follows its planned duration (`--w`), and its bar fills with progress (`--p`).
- The running step's name is `ink` at weight 700; done steps get a check; the rest stay `ink-muted`.
- Three to five steps. Names are one word.
- Use it under the Dial during a shot and nowhere else on the dashboard.

The component keeps its code name, `StageTrack` and `bm-stages`. To the person these are always **phases**: say "phase" in every label, and never "stage" or "step".

### Anatomy

`.bm-stages` holds one `.bm-stages__step` per phase: a `.bm-stages__bar` `mark` 6 px tall in `track` with an `ink` fill, and a `.bm-stages__name` in `chip`. Steps sit `space-1` apart.

### States

| State | Class | Bar | Name |
| --- | --- | --- | --- |
| To come | none | unlit | `ink-muted` |
| Running | `is-now` | filled to `--p` | `ink`, weight 700 |
| Done | `is-done` | full | `ink-muted`, with a 14 px `check` |

The fill is set, never transitioned: it is the one bar in the system that is not segmented, because a phase's length is planned in time and not in units.

### Content

- A name is one word of at most 9 characters (PREINFUSE). It truncates with an ellipsis when a short phase leaves it no room; the Dial's eyebrow carries the full name of the running phase.
- With more than five phases, show the running one and its two neighbours.

### Screen reader

Mark the row `role="list"` and each step `role="listitem"`. The running step carries `aria-current="step"`; a done step adds visually hidden "done". Phase changes go to the status region ("Ramp").
