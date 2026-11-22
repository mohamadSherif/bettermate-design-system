A shot in progress and its result: elapsed time as the reading, phase bars beneath it, pressure and weight as second-rank values, STOP in ink.

- The ring is the same split ring as Brew, so nothing on the rim redraws when the shot starts. The pressure notch follows the running phase's target.
- The label names the phase. Phase bars show one bar per phase, as wide as its planned duration, filling as it runs.
- Pressure appears as a number only here. With a scale the second value is weight over its target; without one it is the boiler temperature.
- If the boiler strays more than 3° from target, the label says so in `heat-text` (TEMPERATURE 88°) until it recovers.
- STOP is `ink`, not cobalt: cobalt starts things.
- On completion keep the layout: the label becomes SHOT COMPLETE, the values become yield and ratio, the pill becomes DONE in `primary`, and the pressure ticks walk down.

### Content

- The word is always **phase**, on the display as on the web. The label is the phase's own name in capitals, at most 20 characters: RAMP TO 9 BAR, PREINFUSE.
- Elapsed time is `m:ss` (`0:15`); the final time on completion stays in the same format.
- Second-rank values carry their unit as the label under them: `9.0` over BAR, `21.7` over G / 36.
- At most five phase bars fit the 220 px row. With more, draw the running phase and its two neighbours.

### Touch

STOP is the only target while a shot runs: 168 by 64 px, and nothing else on the screen responds, so a wet hand cannot change a setting mid-shot. The handle is hidden. STOP acts on touch down, not on release.

Provide: elapsed time, phase name and target, the phases with their durations and progress, pressure, weight and target weight.
