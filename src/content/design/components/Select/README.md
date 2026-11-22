One choice from a list that is too long, or too unpredictable, for a Segmented control.

- Use it for four or more options, or for names you do not control: Wi-Fi networks, timezones, profiles, a scale to pair.
- Two or three fixed one-word options are a Segmented control. On or off is a Switch.
- It is the native `select`, styled: the phone shows its own picker, which is the best list a small screen can offer. Do not rebuild it from a Menu.

### Anatomy

`.bm-inputwrap` holding `select.bm-select` and a 20 px `chevron-down` in `.bm-input__icon`. The same 44 px height, `line-strong` hairline, `surface-2` fill and `radius-md` as an input, with `space-10` kept clear on the right for the chevron. It sits in a `label.bm-field` like any other control.

### States

Rest, hover, focus, error and disabled are the Field's: `line-strong`, then `ink` on hover, the `focus` ring, `danger` with a message, and `surface-1` with `ink-faint` text. The chevron is `ink-muted` and does not change.

### Content

- The first option is a real choice, or "Choose a network" when nothing is chosen yet. Never a blank line.
- Options are sentence case, at most 32 characters, and sorted the way the person looks for them: networks by signal, timezones by offset, profiles by last use.
- The closed select shows one line and truncates with an ellipsis.
- While the list loads (a Wi-Fi scan) disable the select, show "Scanning" as its one option and put a Loader in the help line.

### Keyboard and screen reader

Native behaviour: Space or Enter opens, arrows move, typing jumps to a match, Escape closes. The `label` names it; help and errors attach with `aria-describedby`. Do not change anything else on the page until the choice is committed.
