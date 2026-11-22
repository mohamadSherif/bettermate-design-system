The display at rest: the clock as the one reading, the boiler's residual heat greyed on a single ring, and WAKE as the one action.

- Draw the ring in `ink-faint` with no notch; it answers "is it still warm" without inviting a tap.
- One line under the clock says what happens next: `Boiler off · 21°`, or `Wakes at 06:30` when a schedule is set.
- While connecting, updating or autotuning, remove the pill, put the reason on that line and run the busy comet on the ring.
- WAKE opens the mode menu, as waking does today. It is drawn so the action is visible, not discovered.
- On AMOLED, 30 s after entering Standby keep only the clock, in `ink-faint`, and move it 2 px each minute. Warnings stay visible through rest.

### Content

- The clock is 24-hour, `10:51` and `06:30`, as everywhere in the system (Content). The reading never grows a suffix.
- The date is `THU 12 NOV`: weekday, day, month, three letters each, in `screen-label`.
- The line under the clock is one clause of at most 25 characters. With an update waiting it reads `Update 1.8.0 is ready` (see the DisplayStates card).

### Touch

The WAKE pill is the target, 176 by 64 px. A tap anywhere else on a resting AMOLED screen brings the full Standby screen back and does nothing more: the first touch on a dark screen never starts the machine.

Provide: time, date, the status line, boiler temperature as a fraction of 160 °C, and whether the controller is connected.
