The display when things are not normal: connecting, Wi-Fi setup, a command on its way, a warning or update waiting, a blocking fault and a firmware update.

Product states has the full table with the web's side of each. On the display the five rules still hold, and three of them decide these screens:

- **Normal states stay hidden; only exceptions appear.** A warning or an update that can wait is one 28 px glyph in the slot at 12 o'clock (`triangle-alert` in `warning`, `download` in `ink-muted`) and the screen under it does not change. Only a fault that blocks brewing takes the screen.
- **A control that cannot be used is hidden, not greyed.** A fault screen has a pill only when pressing it can fix something. The update screen has no pill and no handle.
- **One reading and one action.** The fault's reading is its title; the update's reading is the percentage.

### The screens

| Screen | Ring | Label | Reading | Under it | Action |
| --- | --- | --- | --- | --- | --- |
| Connecting | Single, busy comet | Date | Clock | One line: "Waiting for the controller" | None, until it connects. |
| Wi-Fi setup | None | JOIN THIS WI-FI | The machine's own network name in `screen-title` | QR on a white card, the address, SCAN TO SET UP | None: setup continues on the phone. |
| Command pending | Unchanged | Unchanged | Unchanged | Unchanged | The pill turns `surface-2` with STARTING in `ink-muted`, and the handle hides. |
| Warning or update waiting | Unchanged | Unchanged | Unchanged | An update adds one line on Standby: "Update 1.8.0 is ready" | Unchanged. Pressing START with an error-level warning opens Warnings first. |
| Blocking fault | None | An ERROR chip, with `triangle-alert` in `danger` in the slot | The fault's name in `screen-title` | One or two lines in `screen-body`: what is off, what to check | RESTART or RETRY in `primary` when that can help; otherwise none. |
| Firmware update | Single, progress in `ink` | UPDATING | Percentage in `screen-hero`, `%` under it | "Keep the machine on" and the version | None. The screen cannot be left. |

### Command pending

A press swaps the pill to `ink` for 2 frames, as every press does. If the controller has not confirmed by then, the pill becomes the quiet STARTING pill and stays until it does. After 2 s with no answer the START pill returns and a warning is raised ("The controller did not answer"). The comet does not run here: the screen already has the heating pulse, and there is one ambient motion at a time.

### Content

- Fault title: at most 20 characters, sentence case, naming the part and what happened to it: "Boiler sensor lost", "Controller not found", "Temperature runaway".
- Fault lines: at most two, each at most 25 characters so both fit the 276 px text square. First what the machine has done ("Heating is off."), then what to check.
- The chip says ERROR. Codes and addresses go behind DETAILS in the web app, never on this screen.
- The update's second line is the version alone, in `screen-label`.

### Motion

A fault is a cut, like every screen change, and it settles in the usual three frames. The update ring walks one tick at a time as progress arrives; nothing else on that screen moves, and it never dims, so a person can see from across the room that it is still alive.

Provide: the state, and for a fault its title, up to two lines and whether a restart can clear it; for an update, progress from 0 to 1 and the version.
