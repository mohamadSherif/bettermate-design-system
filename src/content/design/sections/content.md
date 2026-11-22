# Content

How BetterMate speaks: the words it uses, how it writes numbers and times, and the shape of each kind of message. The display and the web say the same thing in the same words.

## Voice

- Plain and short. Say what is true and what to do; leave out how the software feels about it. No "Oops", no "please", no "successfully".
- Sentence case for anything read as a sentence. UPPERCASE only in the mono micro styles, and there the words are still chosen as words: START SHOT, not START_SHOT.
- "You" for the person. "The machine", "the boiler", "the scale", "the controller" for the hardware. Never "I", "we" or "your BetterMate".
- No emoji, no exclamation marks, no ellipsis for suspense. An ellipsis only ever means text was cut.
- Verbs on buttons, nouns on navigation, states on Chips.

## Vocabulary

One word per thing, everywhere: labels, messages, settings and the display.

| Say | Not | Note |
| --- | --- | --- |
| phase | stage, step | The parts of a shot. `StageTrack` and `bm-stages` are code names and stay; no label says "stage". |
| profile | recipe, program | A saved set of phases. |
| shot | brew, pull, extraction | One run of a profile. "Brew" is the mode. |
| target | setpoint, goal | The value a reading is heading for. |
| yield | output, weight out | Grams in the cup. "Dose" is grams of coffee in. |
| flush | purge, rinse | Running water through the group. |
| tare | zero | The scale. |
| standby | sleep, off | The mode with the boiler off. "Wake" leaves it. |
| the controller | the board, the MCU | The box that drives the boiler and pump. |
| offline | disconnected, unreachable | The web app cannot reach the machine. |
| fault | error, failure | Something that blocks brewing. The display's chip says ERROR because it must fit five characters. |
| update | upgrade, firmware flash | New firmware. |

Mode names are proper names and never change form: Standby, Brew, Steam, Water, Grind. Page names too: Dashboard, Profiles, History, Settings.

## Numbers and units

| Quantity | In a large reading | In running text and rows | Decimals |
| --- | --- | --- | --- |
| Temperature | `93` with `°C` as its label | `93°` | none |
| Pressure | `9.0` with `BAR` | `9.0 bar` | one |
| Weight | `36.1` with `G` | `36.1 g` | one |
| Flow | `2.1` with `ML/S` | `2.1 ml/s` | one |
| Shot time, running | `0:15` | `0:15` | `m:ss` |
| Shot time, finished | `30.2` with `S` | `30.2 s` | one |
| Other durations | | `40 s`, `4 min`, `about 2 min` | none |
| Ratio | `1:2.0` | `1:2.0` | one, on the right |
| Level | `94` with `%` | `94%` | none |

- A space between a number and its unit, except `°` and `%`.
- A point as the decimal mark. Accept a comma when it is typed.
- A target follows its reading after a slash: `21.7 g / 36`. A range is "80 to 100 °C", written with "to".
- Join facts in a row with a middle dot and spaces: `30.2 s · 36.1 g · 10.0 bar`. At most three.
- A value that is not known is `—` on the web. Zero is a value: write `0.0`. On the display the element is hidden instead.
- Round only when showing; keep the full value in data. "About" in front of an estimate: "Ready in about 40 s".

## Time and dates

The clock is 24-hour, with a leading zero on the hour.

| Where | Format | Example |
| --- | --- | --- |
| A time today, alone | `HH:mm` | `14:41`, `06:30` |
| A row under a TODAY or YESTERDAY eyebrow | `HH:mm` | `14:41` |
| A row with no day heading | `Today HH:mm`, `Yesterday HH:mm` | `Today 14:41` |
| Earlier this year | `D MMM HH:mm` | `12 Nov 07:12` |
| Another year | `D MMM YYYY` | `12 Nov 2025` |
| The display's date line | `DDD D MMM`, capitals | `THU 12 NOV` |
| A day heading | The word, or `D MMMM` | `Today`, `12 November` |

- No comma between day and time, and no AM or PM. The forms `02:41 PM`, `Today, 02:41 PM` and `Today 02:41` that were in the previews are gone.
- If a 12-hour option is added later, it is `2:41 PM`: no leading zero, a space, capitals. It would be one setting for the display and the web together.
- Relative time only for the last hour and only in sentences: "Last seen 2 min ago". A list always shows a clock time.
- Weekdays and months are three letters in capitals on the display and in eyebrows, full words in sentences.

## Buttons and labels

- A button says what happens: START SHOT, SAVE, DELETE PROFILE, TRY AGAIN. Never OK, YES, SUBMIT or CONTINUE.
- One or two words, a verb first. The object joins the verb when the action destroys something or sits in a Dialog.
- A field label is a noun phrase with no colon: "Machine name". Help is one sentence under the field.
- A link is the name of where it goes: "All profiles", "Analyzer".
- An eyebrow names what the reading under it is: WATER TANK, LAST SHOT. It is not a sentence.

## Messages

Each kind has one shape. Pick the kind by what the person must do, then fill the shape.

| Kind | Component | Shape | Example |
| --- | --- | --- | --- |
| State, one or two words | Chip | The state as an adjective or participle | READY · HEATING · SCALE LOST |
| Something just happened | Toast | A fact in the past tense, no full stop | Profile saved |
| Something is true and matters | Notice | Title: what is true. Text: what it means, then what to do. | The machine is offline / Last seen 14:41. Check that it is switched on and on Wi-Fi. |
| A field is wrong | Field message | What is wrong and how to fix it, one sentence | Enter 80 to 100 °C. |
| Nothing to show | EmptyState | Title: the fact. Text: what will appear, or the next step. | No shots yet / Your shots appear here, newest first, as soon as you pull one. |
| A decision | Dialog | Title: the question with the object's name. Body: the consequence. Buttons: verbs. | Delete Adaptive v2? / Its 14 shots stay in History. / KEEP · DELETE PROFILE |
| A fault on the display | Fault screen | Title: the part and what happened. Up to two lines: what the machine did, what to check. | Boiler sensor lost / Heating is off. / Check the sensor cable. |

### Errors and faults

1. Say what happened in the person's terms: "Boiler sensor lost", not "Thermocouple read error".
2. Say what the machine has done about it, when it has done something: "Heating is off."
3. Say what to do next, as an instruction: "Check the sensor cable, then restart the machine."
4. Leave out blame ("you entered"), apology ("sorry"), the word "error" and anything "invalid".
5. Codes, addresses and logs belong behind DETAILS, never in the title.

| Instead of | Write |
| --- | --- |
| Error: invalid temperature | Enter 80 to 100 °C. |
| Connection failed (ECONNRESET) | The machine did not answer. Try again. |
| Wrong password! | That password did not work. Check it and try again. |
| Unable to save profile | Could not save. Check the connection. |
| Scale disconnected unexpectedly | Scale lost. Shots stop by time until it is back. |

### Warnings

A warning names the condition and when it matters: "Water low. About two shots left." "Flush recommended before the next shot." It never says "Warning:" in front; the glyph and the amber already do.

### Confirmations

Confirm only what cannot be undone. The title asks with the object's own name, the body states the one consequence that might surprise, and the two buttons are the two answers as verbs, with the safe one first.

## Names people type

- A profile or machine name is at most 24 characters. Say so beside the field with a counter, and stop input at the limit rather than cutting it later.
- Names keep their case, accents and spaces as typed. They are never upper-cased except in the display's Adjust title.
- Where a name does not fit, it is cut one character short and ends with `…`: at 176 px in the favourites track, at 12 characters in the display's Profiles reading. The full name is always available one step away.
- Two profiles cannot share a name. The error says which name is taken.

## Limits at a glance

| Text | Limit |
| --- | --- |
| ActionBanner label | 14 characters |
| ActionBanner second line | 28 characters |
| Button | 16 characters, two words |
| Chip | 20 characters, two words |
| Eyebrow | 16 characters |
| Segmented item, fixed | 10 characters, one word |
| Field label | 28 characters |
| Notice or Dialog title | 40 characters |
| Toast | 32 characters |
| EmptyState title | 28 characters |
| Menu item | 24 characters |
| Tooltip | 28 characters |

The display's limits are in Round display, Content limits.
