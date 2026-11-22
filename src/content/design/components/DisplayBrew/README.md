The idle Brew screen: boiler temperature as the reading, the profile under it, START as the action, on the split ring.

- Left ticks are temperature in `heat` with the target as an `ink` notch; right ticks are pressure in `primary`, empty at rest.
- The label is BREW in `ink-muted`. Only while the boiler is off target does it change, to HEATING TO 93° in `heat-text`. Do not add a READY state: ready is the absence of a message.
- The profile name is a button: it opens Profiles. Keep the chevron beside it.
- With a scale connected, add one line under the profile: the weight and TARE.
- START is always visible. If a warning of error level exists, pressing START opens the warnings screen first.

### Content

- Profile name: `screen-title`, one line, at most 18 characters; a longer name is cut at 17 with an ellipsis. Names keep their accents: the display fonts carry Latin-1, so "Crème brûlée" draws as written (Round display, Fonts for LVGL).
- The label is at most 20 characters, which HEATING TO 100° fits.

### Touch

| Target | Size | Does |
| --- | --- | --- |
| START pill | 188 by 64 px | Starts the shot. While unconfirmed it shows STARTING (the DisplayStates card). |
| Profile name and chevron | the name's width plus the chevron, 56 px tall | Opens Profiles. |
| Scale line | 56 px tall | Tares. |
| Handle | 56 px square around the chevron | Opens the mode menu; so does a swipe up from it. |

Every target is `display-touch` 56 px or more, and each has a visible control: no action lives only in a gesture.

Provide: temperature, target, pressure, profile name, scale weight if any, and the highest warning level.
