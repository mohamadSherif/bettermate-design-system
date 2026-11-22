A short confirmation that leaves by itself: something just happened, and nothing needs doing.

- Use it for the result of an action the person just took, when the page does not already show it: "Profile saved", "Scale tared", "Copied to the machine".
- It may carry one action, most often UNDO. Anything that needs a decision is a Dialog; anything that stays true is a Notice.
- An error is never only a Toast. If a save fails, the Toast says so and the field or Notice keeps saying so after the Toast has gone.
- One at a time. A new Toast replaces the one on screen.

### Anatomy

`.bm-toast`: an `ink` pill-like block (`radius-lg`, 44 px or taller) with `on-ink` text in `body`, padding `space-2` by `space-4`, at most `dialog` 400 px wide. With an action (`bm-toast--action`) a button sits at the right in `on-ink`. `.bm-toasts` places it at the bottom centre, above the mode bar, on `layer-toast`. Being `ink` on any surface, it needs no border and no shadow to separate from the page.

### States and timing

| | |
| --- | --- |
| Enter | Opacity and a 16 px rise, `duration-base`, `ease-out`. |
| Stay | 5 seconds; 8 seconds with an action. Hover or keyboard focus pauses the clock. |
| Leave | Opacity, `duration-fast`, `ease-in`. No slide. |
| Action hover | `ink-hover`. |

Under `prefers-reduced-motion` it appears and disappears with no transition.

### Content

- A plain fact in the past tense, at most 32 characters, no full stop: "Profile saved", "Flush finished".
- A failure names what failed and stays plain: "Could not save. Check the connection."
- The action is one word: UNDO, RETRY, VIEW.

### Keyboard and screen reader

- The container is `role="status"` with `aria-live="polite"`, present in the page from the start and empty; the Toast's text is put into it. A failure uses `role="alert"`.
- Never move focus to a Toast. Its action must also be reachable some other way (Undo is also in the History row's menu), because a keyboard or screen-reader user may not get to it in 8 seconds.
- It is also where a locked control answers a press: "Stop the shot to change mode."
