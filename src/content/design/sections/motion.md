# Motion

Motion says that something changed, and where. On the display it is built from steps the panel can actually show; on the web it is short and stays out of the way.

## The display's clock

- The T-RGB's 7 MHz pixel clock over a 561 × 531 total frame gives 23.5 scans a second. One frame is 42.5 ms, and no animation can show more steps than that.
- LVGL renders in software into a draw buffer in PSRAM and copies it to the panel's frame buffer, also in PSRAM. Measured on 2026-11-07: a full-screen frame takes 57 to 83 ms, and 105 to 134 ms when opacity is involved. That is about 0.7 ms per 1% of the screen redrawn, or 1.2 ms when blended.
- So smoothness is a matter of area. A frame that redraws little lands inside one scan. A frame that redraws everything holds the picture for two or three scans, which is the choppiness.

## Budget

| Kind of frame | Redraw at most | Estimated cost |
| --- | --- | --- |
| Continuous motion (anything lasting more than 5 frames) | 8% of the screen, about a 135 px square | 6 to 10 ms |
| One step of a transition | 25% of the screen | 18 to 30 ms |
| Any frame | never the whole screen | |

Check on hardware with the `display-frame-stats` build. The pass mark: while anything animates, no line reports a render time over 42 ms a frame or a redrawn share over 25%. The simulator renders a frame in 1 to 2 ms and proves nothing about this.

## Five rules for the display

1. **Count frames, not milliseconds.** Durations are `frame-tick` 1, `frame-micro` 3, `frame-state` 5, `frame-page` 8 and `frame-sweep` 12. Ease out with a table, not a curve: 3 frames go 55, 88, 100% of the way; 5 frames go 36, 64, 84, 96, 100%; 8 frames go 33, 58, 76, 88, 95, 98, 100, 100%.
2. **Move marks, not layers.** Never animate the opacity, scale, rotation or position of anything larger than an icon. In LVGL 8 a style opacity or transform on an object renders it through an intermediate layer and blends the result, which is the 105 to 134 ms case. No scrims and no overlays for the same reason: a sheet is a screen.
3. **Fade by recolour.** Every element sits on a flat token, so mixing its colour toward the ground looks the same as a fade and costs a plain redraw of its own box. Step text and pills in over `frame-micro`; take them out with a cut.
4. **A screen change is a cut that settles.** The ring stays. Frame 0 draws the new label and reading. Frame 1 draws second-rank values. Frame 2 draws the action. The stagger is there to spread the redraw over three scans, each under 25%. Then the ticks walk to their new values.
5. **One ambient motion at a time**, under 1% of the screen: the heating pulse or the busy comet, never both.

## Catalogue

| Motion | Where | Frames | Redraw | How |
| --- | --- | --- | --- | --- |
| Tick step | A ring value changes | 1 per tick, at most 4 ticks a frame | 0.3% a tick | Set the tick's colour; invalidate its 26 px box. |
| Ring walk | A ring's value jumps (screen entry, shot end) | at most `frame-sweep` | about 1% a frame | Tick steps in sequence. If the jump is more than 48 ticks, light the rest on the last frame. |
| Notch move | A target changes | `frame-tick` | 0.6% | Redraw the old tick and the new one. |
| Digit snap | Any reading | `frame-tick` | 3% for one hero digit | Fixed-width label, tabular figures. No interpolation between values. |
| Count | A reading jumps by more than 5 units | `frame-state` | the reading's box, 6 to 11% | Show 5 values on the ease-out table, then the exact one. |
| Step in | A label, value or pill appears | `frame-micro` | its own box | Recolour from the ground: 55, 88, 100%. |
| Press | Pill or disc is touched | 2 | 5% for a pill | Swap to `ink` and `on-ink` for 2 frames, then act. |
| Heating pulse | The last lit temperature tick, while below target | 2 states, each 12 frames | 0.3% | `heat` to `heat-soft` and back, once a second. |
| Busy comet | Standby while connecting or updating | 1 tick a frame | 0.6% | 3 lit ticks circling the ring: one on, one off. |
| Phase advance | Shot phase bars | 1 px every 4 frames | under 1% | Grow the bar's filled part. |
| Pending pill | A command that is not yet confirmed | `frame-tick`, after the 2-frame press | 5% | Swap the pill to `surface-2` with STARTING in `ink-muted`; cut back when the controller answers, or after 2 s. No comet. |
| Update walk | Firmware update | 1 tick per 1.3% of progress | 0.3% a tick | Tick steps as progress arrives; the percentage snaps. Nothing else on the screen moves. |
| Finish | Shot complete | `frame-micro` plus a ring walk | 12% in the largest frame | Label and values step in, pill swaps to DONE, pressure ticks walk down 2 a frame. |
| Screen change | Any | `frame-micro` plus a ring walk | up to 23% in the largest frame | Rule 4. |

Live values have a cadence of their own. Redraw the timer once a second, pressure, flow and weight at most 4 times a second, and temperature at most twice a second and only when the shown number changes. Ticks change only when the value crosses one.

## Replacing the current helpers

| In `LuxuryUI` today | Replace with |
| --- | --- |
| `fade(obj)`: style opacity over 120 to 400 ms | Step in by recolour over 3 frames; cut out. |
| `enter(body, rise)`: fade plus a 12 px rise, part by part | The three-frame settle of rule 4. No translation. |
| `pulse(obj)`: opacity 100 to 30% over 900 ms | A two-colour toggle on one tick, once a second. |
| `Readout::set`: number gliding for 400 ms | Digit snap; Count only for jumps over 5 units. |
| `Rim`: an `lv_arc` sweeping for 400 ms | The tick ring with per-tick invalidation. |
| `orbit`: an arc rotating every 2400 ms | The busy comet. |

Three things to try on hardware. They are untested suggestions, not rules:

- The UI loop runs every 25 ms against a 42.5 ms scan, so one or two animation steps land between scans and the pace looks uneven. Drive display animations from a frame counter that advances once per scan (a 42 ms period, or the RGB panel's vsync callback) and index the step tables with it.
- `LV_COLOR_SCREEN_TRANSP` is 1 in the working tree for opacity and transform styles. With rule 2 followed nothing needs it, and it can go back to 0.
- `LV_DISP_DEF_REFR_PERIOD` is 10 ms. Nothing visible happens faster than 42 ms.

## Web

- Three durations: `duration-fast` 120 ms for fills, presses and anything leaving; `duration-base` 200 ms for anything entering and for the Switch knob; `duration-slow` 320 ms once, when the dial's ticks catch up after the page loads. Two curves: `ease-out` in, `ease-in` out.
- Transition colour, opacity and transform only. Never `width`, `height`, `top` or `bottom`: they lay the page out again on every frame. The banner's progress bar and the gauge mark do this today, and both become segment bars.
- **Hover.** A fill change in `duration-fast`, and only where the device has hover. Nothing moves.
- **Press.** A Button scales to 0.97, the ActionBanner to 0.985 and a stepper disc to 0.92, in `duration-fast`, with the same fill as hover.
- **Select.** The fill changes in `duration-fast`. Nothing slides except the Switch knob.
- **Sheets, menus, dialogs and toasts.** Enter with opacity and a 16 px rise in `duration-base` on `ease-out`; leave in `duration-fast` on `ease-in`. The scrim and a Tooltip change opacity only. A Toast stays 5 s, or 8 s with an action, and waits while it is hovered or focused.
- **Loader.** Three lit ticks advance one of twelve positions every 80 ms with `steps(12)`. It steps like the display's comet; it never sweeps. Use it only for a command on its way, never for a page.
- **Live readings.** Digits snap when telemetry arrives. Segments and dial ticks recolour in `duration-fast`, so bars step the way the display's ring does. Do not tween numbers.
- **Pages.** No page transition. The shell stays, tiles render with `—` and unlit ticks until the first reading, and there is no shimmer.
- **Charts.** No animation.
- Under `prefers-reduced-motion: reduce`, remove every transition and transform and stop the Loader; the words beside it carry the meaning.
