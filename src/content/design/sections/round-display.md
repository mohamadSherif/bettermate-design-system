# Round display

The machine's screen is a 480 × 480 circular panel (LilyGo T-RGB, Waveshare, or the CO5300 AMOLED) drawn by hand-written LVGL 8.4. It is read from arm's length in a kitchen, often with a wet hand. On the 2.1 inch T-RGB a pixel is about 0.11 mm, so the 120 px reading is 9 mm tall and readable from across the room, a 44 px value is readable at arm's length, and a 20 px label is the smallest thing worth drawing.

## The five rules

1. One large reading and one primary action per screen.
2. Normal states stay hidden; only exceptions appear.
3. Data sits on the rim: lit ticks for the value, an ink notch for the target.
4. A control that cannot be used is hidden, not greyed.
5. One unit style: a large reading carries a small unit label underneath; small text writes `93°`, `9.0 bar`, `36 g`.

Two more rules sit on top of these: pressure is a number only while a shot is brewing, and any core action stock GaggiMate shows as a button (start, stop, minus, plus) keeps a visible button here.

## Anatomy

All positions are in panel pixels from the top-left of the 480 box. The centre is (240, 240).

| Zone | Where | Holds |
| --- | --- | --- |
| Ring | radius `ring-inner` 212 to `ring-outer` 234 | Ticks only. Nothing else enters it. |
| Content circle | `display-content`, 392 px across | Everything that is not a tick. |
| Text square | `display-square`, 276 px | Any text of two lines. |
| Exception slot | centred on y 34, in the ring's top gap | One 28 px glyph: `triangle-alert` in `warning`, `download` when an update waits, or `triangle-alert` in `danger` on a fault screen. Empty when all is normal. |
| Label | baseline y 86 to 98 | Mode or state in `screen-label`, `ink-muted`. An exception state (HEATING TO 93°) takes `heat-text`. Standby sets its date nearer the clock, at y 136. |
| Reading | baseline y 206 to 284 | `screen-hero`, or `screen-hero-sm` between the discs. `ink`. |
| Unit | 32 px under the reading's baseline | `screen-label`, `ink-muted`. |
| Second rank | y 290 to 330 | A profile name in `screen-title`, or two `screen-value` readings each over a `screen-label`. |
| Action | y 334 to 408 | One pill, `display-action` 64 px tall, 152 to 188 px wide (244 on the save sheet). |
| Handle | centred on y 446, in the ring's bottom gap | A 32 px `chevron-up` in `ink-muted`: opens the mode menu. Hidden while a process runs. |

## The tick ring

- A tick is a radial line from `ring-inner` to `ring-outer`, `ring-tick` 6 px wide, round capped. Ticks sit `ring-pitch` 4° apart.
- **Split ring**: temperature on the left from 110° up to 250°, pressure on the right from 70° up to -70° (angles clockwise from 3 o'clock). 36 ticks each. A 40° gap at the top holds the exception slot, and one at the bottom holds the handle.
- **Single ring**: one quantity over 300°, from 120° clockwise to 420°. 76 ticks, with a 60° gap at the bottom.
- Scales are fixed: 0 to 160 °C and 0 to 16 bar. Progress rings run 0 to 100%.
- Lit ticks: `round(fraction × count)`, filled from the low end. Tone is `heat` for temperature, `primary` for pressure, `ink` for progress, `ink-faint` for the standby ring. Unlit ticks are `track`.
- Target notch: the tick at `round(target × (count − 1))`, drawn in `ink` and extended inward to `ring-notch` 204. No notch on progress or standby rings.
- Without a pressure sensor, Brew and Shot use the single ring for temperature.

## Screens

| Screen | Ring | Reading | Second rank | Action | Only when needed |
| --- | --- | --- | --- | --- | --- |
| Standby | Single, `ink-faint`, residual boiler heat | Clock | Date above; one line below (Boiler off · 21°, or Wakes at 06:30) | WAKE, `primary` | Busy comet on the ring while connecting, updating or autotuning, with no pill. AMOLED rest after 30 s. |
| Brew | Split: temperature with notch, pressure | Boiler temperature, °C under | Profile name with a chevron: opens Profiles | START, `primary` | HEATING TO 93° as the label. Scale weight and TARE on a line under the profile. Warning glyph in the slot. A pressed START that is not yet confirmed is a quiet STARTING pill. |
| Shot | Split: temperature, pressure with the phase's notch | Elapsed time | Phase bars under the reading; pressure and weight as two values | STOP, `ink` | With a scale the second value is weight over its target; without one it is boiler temperature. The label reads TEMPERATURE 88° in `heat-text` if the boiler strays more than 3°. |
| Shot complete | Split; pressure ticks walk down | Final time | Yield and ratio | DONE, `primary` | Ratio needs a dose on the profile. |
| Steam, Water | Single: temperature with notch | Target between minus and plus | Live temperature above, in `heat-text` while heating | Water: START then STOP. Steam: none, it starts with the valve. | A status line where the pill would be. |
| Grind | Single: progress in `ink` | Target between minus and plus, then what has been ground | TIME · WEIGHT row above when a scale is present | START then STOP | Minus, plus and the row hide while grinding; elapsed time takes their place. |
| Menu | none | none | Up to five 116 px mode discs on a 134 px circle, the active one in `ink` | Power disc at the centre: Standby | Grind disc only with a grinder. |
| Profiles | none | Profile name in `screen-value` | Three fact cards, the phase names, pagination dots | SELECT, with a pencil disc beside it | Chevron discs at 9 and 3 o'clock; swipes do the same. |
| Adjust | none | The focused value between minus and plus | A row above choosing which value: TEMP · BAR · TIME | SAVE | The title says UNSAVED once anything changed. |
| Save sheet | none | none | Title | SAVE in `primary`, SAVE AS NEW on `surface-2`, USE ONCE as text | |
| Warnings | none | none | One card per warning: a chip (ERROR, WARN) and a sentence | DONE, `ink` | |
| Information | none | QR on a white card | Network name above; address and SCAN TO OPEN below | ABOUT as a text button | The QR card is white in every theme. |
| Wi-Fi setup | none | QR on a white card | JOIN THIS WI-FI and the machine's own network name above; address and SCAN TO SET UP below | none: setup continues on the phone | Shown until the machine has joined a network. |
| Fault | none | The fault's name in `screen-title` | An ERROR chip above; one or two lines in `screen-body` below | RESTART or RETRY in `primary`, only when pressing it can help | Takes the screen only when brewing is blocked. `triangle-alert` in `danger` in the slot. |
| Updating | Single: progress in `ink` | Percentage, `%` under | UPDATING above; "Keep the machine on" and the version below | none | No handle. The screen cannot be left. |

## Controls

- **Pill.** 64 px tall, fully rounded, label in `screen-button`. `primary` with `on-primary` starts something. `ink` with `on-ink` stops or dismisses. One pill per screen; the save sheet is the only place with two fills, and its second is `surface-2`. A command that is not yet confirmed shows a quiet pill: `surface-2` with its label in `ink-muted` (STARTING).
- **Disc.** 60 px for minus and plus at x 82 and x 398 on the reading's centre line. 56 px for chevrons and secondary actions. `surface-2` with an `ink` glyph.
- **Row.** A 56 px tall track in `surface-1`, 244 px wide, with the chosen segment in `ink`. Two or three choices.
- **Text button.** `screen-button` in `ink` with no fill, and a 56 px tall hit area.
- **Card.** `surface-1`, `radius-lg`, for facts and warning rows. Never a border.

## Content limits

Measured in the two faces at their display sizes. Write copy to these counts; in firmware, measure the string and cut it, since letters differ in width.

| Style | Fits | Rule |
| --- | --- | --- |
| `screen-hero` | 5 characters: `10:51`, `100.0` | A digit is 65 px wide. |
| `screen-hero-sm` | 4 characters between the discs: `18.0`, `145` | A digit is 52 px wide; the discs leave 232 px. |
| `screen-value` | 12 characters in the 276 px text square: `Crème brûlée` | A longer profile name is cut at 11 and ends with `…`. |
| `screen-title` | 20 characters, or 18 beside a chevron | Fault titles, sheet titles, the profile on Brew. |
| `screen-body` | 25 characters a line, two lines | Each line is its own sentence. |
| `screen-label` | 20 characters | 13.2 px a character: `HEATING TO 100°` is 15. |
| `screen-button` | 9 characters in a 188 px pill, 13 in the 244 px one | 14.5 px a character: `STARTING` is 8. |

A name that does not fit is cut one short and ends with an ellipsis. Never shrink the type, and never scroll text on the display: a marquee redraws its box every frame.

## Themes on the display

| Role | Light | Dark | Display black | Token |
| --- | --- | --- | --- | --- |
| Face | `#e9e9e9` | `#212121` | `#000000` | `surface-0` |
| Cards, row track | `#f4f4f4` | `#2b2b2b` | `#141414` | `surface-1` |
| Discs | `#ffffff` | `#363636` | `#232323` | `surface-2` |
| Text | `#111111` | `#f5f5f5` | `#f2f2f2` | `ink` |
| Labels | `#555555` | `#b8b8b8` | `#a6a6a6` | `ink-muted` |
| Unlit ticks | `#cdcdcd` | `#4d4d4d` | `#343434` | `track` |
| Temperature | `#e4501c` | `#e95b2a` | `#e95b2a` | `heat` |
| Pressure, START | `#0f20ec` | `#5361ff` | `#5361ff` | `primary` |
| Warning | `#8a5a00` | `#f5b400` | `#f5b400` | `warning` |

Ship Display black as the default on every panel. On AMOLED, after 30 s on Standby draw only the clock, in `ink-faint`, and move it 2 px each minute.

## Fonts for LVGL

Convert at 4 bpp and enable only these sizes. Funnel Display's figures are tabular as drawn and Geist Mono is fixed width, so the generator has no OpenType feature to resolve:

| Style | Face | Size | Glyphs |
| --- | --- | --- | --- |
| `screen-hero` | Funnel Display 500 | 120 | digits, colon, period, minus, degree |
| `screen-hero-sm` | Funnel Display 500 | 96 | digits, colon, period, minus, degree |
| `screen-value` | Funnel Display 500 | 44 | Basic Latin, Latin-1 Supplement (U+00A0 to U+00FF), ellipsis |
| `screen-title` | Funnel Display 500 | 28 | Basic Latin, Latin-1 Supplement, ellipsis |
| `screen-body` | Funnel Display 400 | 22 | Basic Latin, Latin-1 Supplement, ellipsis |
| `screen-label` | Geist Mono 500 | 20 | uppercase, digits, punctuation, degree, middle dot, the Latin-1 capitals (U+00C0 to U+00DE), ellipsis |
| `screen-button` | Geist Mono 600 | 22 | uppercase, space, ampersand |

Profile names are typed by people, so the three text styles carry Latin-1: `Crème brûlée` and `Café München` draw as written, where Basic Latin alone left gaps. Degree and middle dot are part of that range. `screen-label` carries the Latin-1 capitals because the Adjust title sets the profile's name in capitals. The cost is 96 more glyphs in each of three sizes, roughly 70 KB of flash at 4 bpp before compression (an estimate from glyph sizes, not a measured build). A character outside the set, such as Polish ł or Turkish ş, is replaced by its base letter before drawing (`ł` to `l`) and never drawn as an empty box; the web app shows the name as typed.

Give every changing label a fixed width sized for its longest value, so a new digit redraws the same box every time.

## Drawing the ring in LVGL

Draw each arc as one custom object in `LV_EVENT_DRAW_MAIN`: a loop of `lv_draw_line` calls with round ends over endpoints computed once. Keep the lit count and the notch index as integers. When either changes, invalidate only the 26 × 26 px box around each tick whose colour changed, never the object. `TickRing.cpp` already draws this way, and it is what makes rule 3 cost 0.3% of the screen per tick. The Motion section sets how many ticks may change per frame.
