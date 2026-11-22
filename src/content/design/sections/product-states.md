# Product states

Everything the machine can be doing or failing to do, and what each face shows for it. The web side is drawn on the WebStates card and the display side on the DisplayStates card.

## The states

| State | When | Web | Display | Ends |
| --- | --- | --- | --- | --- |
| First reading on its way | The page has opened and no telemetry has arrived | The shell and every tile at once, with `—` for each reading and unlit ticks. No spinner, no skeleton. | Not applicable: the display starts on Standby. | With the first reading, usually inside a second. |
| Connecting | The web app is opening its connection, or the display is waiting for the controller | A neutral Notice with a Loader: "Connecting to the machine". | Standby with the busy comet and "Waiting for the controller"; no pill. | On connection. After 5 s without one, it becomes Offline. |
| Offline | The web app cannot reach the machine | A `danger` Notice first on the page: "The machine is offline", with when it was last seen. An OFFLINE Chip on the Dial tile. Readings are `—`. The ActionBanner says TRY AGAIN. Every mode is locked. Forms keep what was typed, and Save is disabled with the reason beside it. | Not applicable: the display is part of the machine. | By itself: it retries every 5 s. TRY AGAIN retries at once. |
| Heating | The boiler is below its target | A HEATING Chip and "Ready in about 40 s" in the Dial. A boiler's own tile takes `heat-soft`. | The label reads HEATING TO 93° in `heat-text`; the last lit tick pulses. | At target. |
| Ready | Nothing is in the way | A READY Chip. Nothing else: ready is the absence of a message. | Nothing. The label says BREW. | |
| Command pending | A start or stop was pressed and the machine has not confirmed | The ActionBanner says STARTING or STOPPING with a Loader in its disc and `aria-busy`. The other modes lock. | The pill turns quiet: `surface-2`, STARTING in `ink-muted`. The handle hides. | On confirmation. After 2 s with none, the control returns as it was and a Toast (web) or a warning (display) says "The machine did not answer. Try again." |
| Running | A shot, flush, grind or water run is in progress | The ActionBanner is `ink` and says STOP, with progress in segments. The Dial shows the timer and the phase. Every other mode is locked except Steam. | STOP in `ink`. The handle and anything that cannot be used are hidden. | When the run ends or is stopped. |
| Finished | A shot has just ended | The Dial keeps the final time, yield and ratio until the next action. The status region says "Shot finished" with time and yield. | SHOT COMPLETE, yield and ratio, DONE in `primary`. | On DONE, on the next start, or after 2 min. |
| Warning waiting | Something needs attention before the next shot but does not block it: flush recommended, water low, descale due | A `warning` Chip with its glyph in the Dial tile, and the warning button in the top bar, which opens the list. | `triangle-alert` in the slot at 12 o'clock. The screen under it is unchanged. Pressing START with an error-level warning opens Warnings first. | When its cause clears. A warning can be dismissed from the page; it stays in the list. |
| Blocking fault | Brewing cannot continue safely: a sensor lost, a temperature runaway, the controller not found | A `danger` Notice first on the page with what happened, what the machine did, what to check and the action that may fix it. A FAULT Chip. Unknown readings are `—`. The ActionBanner is disabled and its second line says "Fix the fault to brew". Only Standby stays unlocked. | The Fault screen: ERROR chip, the fault's name, up to two lines, and RESTART or RETRY only if pressing it can help. | Only when the cause is gone. It cannot be dismissed. |
| Hardware not present | No scale, no pressure sensor or no grinder is fitted. This is not a fault. | Features that need it are left out, not disabled: no Grind mode, no weight tile in Simple view. Where a setting depends on it, the setting is disabled with the reason ("Connect a scale to use this"), and the Weight tile shows an EmptyState. | Grind is absent from the menu; without a pressure sensor Brew and Shot use the single ring. | When the hardware is paired. |
| Update ready | New firmware has been found | An `info` Notice at the top of Settings: "Version 1.8.0 is ready", with INSTALL. Nothing on the Dashboard. | `download` in the slot, and on Standby the line "Update 1.8.0 is ready". | When installed. |
| Updating | Firmware is being installed | One tile takes the page: the version, a segment bar with its percentage, and "Keep the machine on." No Nav, no mode bar, no way to cancel. | The Updating screen: progress on the ring, the percentage as the reading, no pill and no handle. | The machine restarts. The web app reconnects by itself and shows a `success` Notice: "Updated to 1.8.0". If it fails, a `danger` Notice says so and that the previous version is still running. |
| First start | The machine has never been set up | Setup takes the page: the wordmark, one tile per step, one primary Button per step. Three steps: Wi-Fi, machine, scale. | Wi-Fi setup: JOIN THIS WI-FI, the machine's own network name, and a QR code. | When setup is finished or skipped. |
| Wi-Fi setup | First start, or the saved network cannot be joined | The captive portal: a Select of networks, strongest first, and a password field with a show button. A wrong password is an error on that field. | The same Wi-Fi setup screen. | When the machine has joined a network. |
| Nothing to list | No profiles, no shots, or a search with no match | The tile keeps its title and shows an EmptyState: the fact, one sentence, and at most one Button. | Profiles shows "No profiles" as its reading and "Add one in the web app" under it, with no SELECT pill. | When there is something to list. |
| Saving | A form was submitted | The Button keeps its width, shows a Loader and SAVING, and sets `aria-busy`. On success a Toast: "Profile saved". On failure the form stays as typed, the field or a Notice says what went wrong, and a Toast repeats it. | Not applicable: the display saves at once and cuts to the next screen. | |

## When several are true

Show the one highest in this list in full. The others wait, each in the smallest form it has.

1. Updating
2. Blocking fault
3. Offline (web only)
4. Wi-Fi setup and first start
5. Running, and Command pending
6. Warning waiting: its Chip and the glyph in the slot stay visible under everything below
7. Update ready: its glyph stays visible
8. Heating
9. Ready

A fault during a shot stops the shot first; the Fault state then replaces Running. Going offline during a shot does not stop the shot: the machine finishes on its own, the display keeps showing it, and the web app says it is offline.

## What every state keeps

- **The page keeps its shape.** Tiles do not appear, disappear or change size because data is missing. Unknown is `—`.
- **One message, in one place.** A Notice at the top says what is wrong; the Dial tile's Chip repeats it in a word. The same fact is not also a Toast, a Dialog and a banner.
- **The ActionBanner always answers "what can I do next".** When that is nothing, it is disabled and says why.
- **Locked is visible.** A mode that cannot be chosen now is drawn in `ink-faint`, stays focusable and gives its reason. Only a control that can never apply is absent.
- **Nothing waits forever.** Every pending state has a time limit and a visible failure.

## Time limits

| What | Limit | Then |
| --- | --- | --- |
| A command waiting for confirmation | 2 s | The control returns; a Toast or warning says the machine did not answer. |
| Connecting | 5 s | Offline. |
| Reconnecting while offline | Every 5 s | Keeps trying; "Last seen" stays on screen. |
| A Wi-Fi scan | 15 s | The Select shows what was found, or "No networks found" with SCAN AGAIN. |
| A Toast | 5 s, or 8 s with an action | It leaves. |
| The Finished state | 2 min | The Dial returns to Ready. |
| AMOLED rest | 30 s on Standby | Only the clock is drawn. |
