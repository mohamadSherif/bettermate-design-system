# Accessibility

The web app is built to WCAG 2.2, level AA. The round display is not a web page, but it follows the same floors wherever they apply, sized for a kitchen and arm's length. Every number below was computed from `tokens.json` on 2026-11-16; when a colour token changes, compute them again.

## Contrast floors

| What | Floor | Worst pair in the system |
| --- | --- | --- |
| Body copy in `ink` | 4.5:1 | 11.1:1, on a tint in Dark |
| Any other text under 24 px | 4.5:1 | 4.6:1: `on-primary` on `primary` in Dark, `danger` on `danger-soft-hover` |
| Text of 24 px and larger; icons, ticks, chart lines, control borders and the focus ring | 3:1 | 3.05:1: `primary` and the pressure line on `surface-1` in Dark |
| Text that is switched off (`ink-faint`) | 3:1 and APCA Lc 30 | 3.6:1 and Lc 34, on `surface-2` in Dark |
| Unlit ticks (`track`) and dividers (`line`) | none | Decorative by design. Nothing reads from them alone. |

Rules that keep the floors true:

- A `primary` fill sits on `surface-0` or `surface-1`, never on `surface-2`; in Dark that pair is 2.6:1. So Dialogs are `surface-1`, and charts are never drawn in a cell.
- A hover step may only raise a label's contrast or leave it above 4.5:1. Cobalt steps darker in every theme.
- Nothing is faded with opacity to show a state. Opacity multiplies into whatever is under it, and the result is not a token anyone has checked.
- A field's edge is a `line-strong` border, 3.7:1 or better. Its fill is not an edge: `surface-2` on a tile is 1.1:1.

## Colour is never the only sign

| Meaning | Colour | And always |
| --- | --- | --- |
| Heating | `heat` | The word HEATING, or the label HEATING TO 93° |
| Warning | `warning` | `triangle-alert` and the warning's words |
| Error or fault | `danger` | `circle-alert` and a sentence; on the display an ERROR chip |
| Ready, connected, valid | `success` | The word, with a dot or `check` |
| The machine's mode, a chosen setting | `ink` fill | `aria-pressed` or `aria-checked`, and the item's place |
| A chart series | its `series-*` token | Line weight and dash, and an end label with the unit |
| A field in error | `danger` border | A message under it, linked to the field |
| A lit tick | the tone | The numeral and its label beside it |

Amber and the orange of heat are 1.16:1 apart in lightness, and people with a red-green colour deficiency confuse them most. That is why every warning has its glyph, with no exception for small Chips.

## Focus

- One ring for every control: 2 px `focus`, 2 px outside, drawn by `outline` so it follows the control's shape. It holds 6.5:1 or better against all three surfaces, and because it sits outside the control it never has to contrast with the fill.
- It shows on keyboard focus (`:focus-visible`), and always on a field. It is never removed, restyled per component, or replaced by a fill change.
- Focus order is reading order. Opening a Dialog or Menu moves focus in; closing returns it to the control that opened it. Nothing else moves focus: not a Toast, not a Notice, not a state change.
- A locked control stays in the focus order with `aria-disabled="true"`, so its reason can be read. A control that can never apply here uses `disabled` and leaves the order.

## Keyboard

| Component | Keys |
| --- | --- |
| Button, ActionBanner, list row | Enter or Space activates. |
| Segmented (as a radio group) | Tab enters and leaves once; arrows move and select. |
| Mode bar | Each mode is a Tab stop; Enter or Space selects. |
| Switch | Space or Enter toggles. |
| Stepper | Tab to minus or plus; Enter or Space steps; holding repeats. |
| Number field | Up and Down step by one unit; Shift with them by ten. |
| Select | Native: Space or Enter opens, arrows move, type to jump, Escape closes. |
| Menu | Enter or Space opens and moves focus in; Up and Down move; Home and End jump; Escape closes and returns focus. |
| Dialog | Tab stays inside; Escape gives the safe answer; focus returns on close. |
| Tooltip | Shows on focus; Escape hides it. |
| Toast | Never takes focus. Its action is also reachable elsewhere. |

Everything that can be done with a pointer can be done with these keys. There is no drag, no long press and no hover-only control in the web app.

## What a screen reader hears

- **Structure.** One `h1` per page (the page's name; "Dashboard" is visually hidden). Each titled tile is a `section` named by its title. Landmarks: `nav` "Pages", `nav` "Machine mode", `main`. A "Skip to content" link comes first.
- **Names.** A control's name is its visible words. An icon-only button has an `aria-label`. A unit in a field is given its word (`aria-label="grams"`), because "G" alone is read as a letter.
- **Live readings are not live regions.** Pressure, flow, weight and temperature change up to four times a second. Announcing them would bury everything else, so the numerals are plain text that can be read on demand.
- **One status region.** A single visually hidden `role="status"` element, `aria-live="polite"`, present from page load, receives one short sentence per event: "Heating." "Ready." "Shot started." "Ramp." "Shot finished: 30.2 seconds, 36.1 grams." "Steam." "Offline." At most one message every two seconds; a newer one replaces an older one that has not been read.
- **Alerts.** A fault, and the loss of the connection, are `role="alert"`: they interrupt. Nothing else does.
- **Pictures.** The Dial's ring and every segment bar that repeats a number are `aria-hidden`. A segment bar that is the only carrier of progress is a `progressbar`. A chart is `role="img"` with a label that states the series and their final values.

## Targets and reflow

- Every web control has a hit area of at least `touch-min` 44 by 44 px, including ones drawn smaller. Adjacent targets do not overlap. That is past the 24 px that AA asks for, because the app is used with wet hands beside a hot machine.
- Pages reflow to one column at 320 px wide, which is also a 1280 px window at 400% zoom, with no sideways scrolling. The one exception is the favourites track, which scrolls by design and can also be reached through All profiles.
- Text can grow to 200% without clipping: tiles grow downward, and only single-line labels that have a full version elsewhere truncate.
- Both orientations work. Nothing is fixed to the viewport except the mode bar, a pinned form action and Toasts, and the page pads so they cover no content.

## Forms

- Every field has a visible label above it. A placeholder is never a label and never an instruction.
- Help and errors are linked with `aria-describedby`; an error also sets `aria-invalid="true"`, names what is wrong and says how to fix it.
- On submit with errors, focus moves to the first field in error and the status region says how many there are.
- Fields carry `autocomplete` and `inputmode` values, and no field blocks paste. A password can be shown.
- Nothing is submitted, deleted or sent to the machine on a field's change alone, except a Switch and a Segmented control, which are understood to apply at once.

## Motion and time

- Under `prefers-reduced-motion: reduce` every transition is removed and the Loader stands still. No meaning is lost: the words beside each motion already say it.
- Nothing flashes. The fastest repeating change in the product is the heating pulse on the display, once a second, on one tick.
- A Toast stays 5 s, or 8 s with an action, and its clock stops while it is hovered or focused. Nothing a person needs is only ever in a Toast.
- There are no session time limits. A command that the machine does not confirm in 2 s fails visibly and can be given again.

## Language

- Set `lang` on the page. Mark a profile name in another language with its own `lang` where it is known.
- Abbreviations in uppercase labels are either real words (BAR) or are given their word for assistive technology (`G` as "grams", `ML/S` as "millilitres a second").

## The round display

| Concern | Rule |
| --- | --- |
| Size | Nothing under 20 px, which is 2.2 mm on the 2.1 inch panel. The reading is 120 px, 13 mm, for across the room. |
| Contrast | Display black holds 4.6:1 or better for every text pair and 3:1 for every lit mark. |
| Touch | `display-touch` 56 px or more for every target, 60 px for minus and plus, and 12 px or more between targets. |
| Gestures | Every swipe has a visible control that does the same. There is no long press and no double tap. |
| Colour | Every state has a word. Temperature and pressure never share an arc. |
| Time | No screen dismisses itself except AMOLED rest, and any touch brings it back without acting. |
| Sound | The interface makes none, so nothing depends on hearing. |

## Known limits

- **APCA.** Against the stricter APCA floors that Stacks uses (Lc 60 for all text, Lc 45 for icons), Dark falls short in places while passing WCAG AA: `danger` reads Lc 51 to 55, `heat-text` Lc 55 to 58, `ink-muted` Lc 57 on `surface-2`, and cobalt as a mark Lc 26 to 28. Meeting them would mean lightening those four tokens in Dark, which changes the palette; it has not been done.
- **Hovered cobalt in Dark.** `primary-hover` is 2.3:1 against `surface-1` while its label is 6.1:1. The label identifies the control; the fill alone would not.
- **Display black on the web.** `ink-faint` on `surface-2` is Lc 28 there. The theme is the display's, where a control that cannot be used is hidden, so the pair does not occur.
- **Not yet tested with assistive technology.** The roles and announcements here are the design. Test them with VoiceOver and TalkBack on a phone, and with a keyboard alone, before a release.
- **Languages.** The fonts cover Latin-1. Other scripts fall back to the system font on the web and are transliterated on the display.

## Before a control ships

1. It has rest, hover, pressed, focus and, if it can be, selected, disabled and invalid, and it appears on the States card in the three themes.
2. Its text and marks meet the floors above on every ground it can sit on.
3. Its hit area is 44 px or more, and it works at 320 px.
4. It can be reached and used with the keys in the table, and its name and state are announced.
5. Any meaning it gives by colour, it also gives by a word, a glyph or a shape.
6. Its README says what it is called, how long its text may be, and what happens when the text is longer.
