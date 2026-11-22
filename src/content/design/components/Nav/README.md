The four pages of the app: Dashboard, Profiles, History, Settings. A sidebar on desktop, a menu behind the top bar on smaller screens.

- From 1024 px the Nav is a sidebar tile, `sidebar` 248 px wide: the wordmark, the four pages, and the GaggiMate credit at the bottom.
- Below 1024 px the top bar holds a menu button, the wordmark, and a `triangle-alert` button in `warning` only when a warning exists. The menu button opens the same list as a sheet.
- Nouns, one word each, always with their icon. The order never changes.

### Anatomy

`nav.bm-nav` holds `a.bm-nav__item` rows: 44 px tall, `radius-md`, a 24 px icon and the page name in `body` at weight 500, `space-3` apart, with `space-1` between rows. `.bm-topbar` is 44 px tall with icon buttons (`bm-btn--icon bm-btn--quiet`) at each end and the wordmark at 20 px between them.

### States

| State | Fill | Icon and word |
| --- | --- | --- |
| Rest | none | `ink-muted` |
| Hover, pressed | `state-hover` | `ink` |
| Current page | `surface-2` | `ink` |
| Focus | the `focus` ring | |

The current page is a tone step, not an `ink` fill: `ink` is kept for the machine's mode and for chosen settings, so the two never compete on one screen.

### Content

Page names are fixed: Dashboard, Profiles, History, Settings. A fifth page needs a reason and a place in this list before it gets a row. The credit reads "Based on GaggiMate", with GaggiMate as an underlined link.

### Keyboard and screen reader

- `nav` with `aria-label="Pages"`; the current row has `aria-current="page"`.
- Put a "Skip to content" link first in the page, visible on focus, so the sidebar can be passed in one key.
- The top bar's buttons are named "Menu" and "1 warning" (with the count). The warning button opens the warnings list; it is absent, not disabled, when there is none.
- The wordmark image has `alt="BetterMate"` and links to the Dashboard.
