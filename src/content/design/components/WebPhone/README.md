The dashboard on a phone, at rest and during a shot: one column of tiles with the mode bar floating over it.

Compose it top to bottom: Dial tile, ActionBanner, StatTiles in two columns, Setup tile, recent shots. During a shot the Dial's centre becomes the timer, the banner turns `ink` and says STOP, and the StatTiles become pressure, flow, weight and temperature. Nothing else on the page moves.

### Down to 320 px

The third frame is the same page at 320 px, the narrowest screen the app supports. Nothing is hidden and nothing scrolls sideways except the favourites track, which is built to. What changes by itself:

- The Dial is the tile's inner width, 256 px.
- Favourite profiles keep their names and scroll; a long name truncates at 176 px.
- The target temperature Stepper drops under its label, right-aligned, instead of squeezing it.
- The warning Chip and the Flush button stack when they no longer fit one row.
- A two-column StatTile is 144 px wide; a target wraps under its numeral.

### Rules this page shows

- Every control is at least 44 px to the finger: the top bar's buttons, Flush, the stepper discs, each favourite, each mode.
- The warning Chip carries its `triangle-alert`, so it cannot be mistaken for the orange of heating.
- During a shot the other modes are locked, not faded: still readable in `ink-faint`, with Steam left available.
- The page has one `h1` (visually hidden, "Dashboard"), each titled tile is a labelled `section`, and a status region announces Heating, Ready, Shot started and Shot finished.
