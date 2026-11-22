What the web app shows when things are not normal: offline, a blocking fault, a command on its way, first start, Wi-Fi setup and a firmware update. All six are drawn at 320 px.

Product states has the full table, with the display's side of each. The rules that hold across them:

- **The page keeps its shape.** Tiles stay where they are. A reading that is unknown is `—` with unlit ticks; it is never a spinner, a skeleton or a stale number shown as live.
- **One Notice says what is wrong**, first on the page, in the tone of its severity, with the action that fixes it. The Dial tile's Chip repeats the state in one word.
- **The ActionBanner is still the next thing you can do.** Offline, that is TRY AGAIN. During a fault nothing can be started, so it is disabled and its second line says why. While a command is in flight it says STARTING and shows a Loader.
- **The mode bar locks instead of fading.** Offline, every mode is locked. During a fault only Standby is left, so the machine can still be switched off.
- **Setup and updates take the whole page**: the wordmark above, one tile, one primary Button, no mode bar and no Nav.
- **Time limits.** A command that is not confirmed in 2 s restores the banner and raises a Toast: "The machine did not answer. Try again." A lost connection retries by itself every 5 s and says when it last heard from the machine.
