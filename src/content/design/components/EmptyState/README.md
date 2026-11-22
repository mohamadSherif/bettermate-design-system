What a tile or a page shows when it has nothing to list yet: one sentence about what will appear, and at most one way to make it appear.

- Use it for the first run of a list (no shots, no profiles), for a search with no results, and for a feature that needs hardware which is not there (no scale).
- It lives inside the tile that would hold the content, under the tile's title. The tile keeps its size and place.
- It is not for loading. While the first reading is on its way, tiles show `—` and unlit ticks.

### Anatomy

`.bm-empty`, centred, `space-2` between parts: `.bm-empty__icon`, a 56 px `surface-2` disc with a 24 px glyph in `ink-muted`; `.bm-empty__title` in `subheading`; `.bm-empty__text` in `body-sm`, `ink-muted`, at most 32 characters a line; and an optional Button. Padding `space-6` by `space-4`. No illustration: the glyph is the one that names the missing thing (`coffee` for shots, `list` for profiles, `scale` for a scale).

### Kinds

| Kind | Title | Text | Action |
| --- | --- | --- | --- |
| Nothing yet | "No shots yet" | What will appear here and what makes it appear. | Only when the person can make it appear from here: NEW PROFILE. |
| No results | "No profiles match “decaf”" | Suggest the next step. | CLEAR SEARCH, a default Button. |
| Not available | "No scale connected" | What they would gain, in one sentence. | PAIR A SCALE, a default Button. |

The action is a default or `ink` Button, never `primary`: an empty list is not the page's commit.

### Content

- Title: the plain fact, at most 28 characters, no full stop and no exclamation mark.
- Text: one sentence, at most 80 characters, about what happens next. Never apologise and never joke.
- Quote the person's own search term in the title so they can see what was searched.

### Screen reader

Plain content in reading order: title as a heading one level below the tile's, then the sentence, then the button. When a search empties the list while the person types, announce "No profiles match" through the status region.
