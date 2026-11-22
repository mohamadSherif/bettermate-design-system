Profiles, Shot history and Settings: a `title`, then tiles of ListRows or fields.

Use one tile per group, an `eyebrow` for a date or group name, and at most one primary Button per page, pinned at the bottom of a form. The profile in use is marked in `ink`, never in cobalt.

- **Profiles.** The search field is the one place a placeholder stands in for a label: it has a `search` glyph, an `aria-label`, and nothing to explain. NEW is a default-size `ink` Button; a 36 px button is for desktop rows only.
- **Shot history.** Rows under a day's `eyebrow` show the time alone (`14:41`); the day is already said. Follow Content for the formats.
- **Settings.** Fixed choices of two or three are Segmented, on or off is a Switch, a typed number is a NumberField with its unit inside ("30" with `MIN`), and a long list is a Select.
- An empty list keeps its tile and shows an EmptyState inside it. A failed save keeps the form as typed, marks the field, and says so in a Toast.
