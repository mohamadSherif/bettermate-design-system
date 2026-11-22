A question that must be answered before anything else: confirm a deletion, choose how to save, acknowledge a fault. On a phone it is a sheet at the bottom of the screen.

- Use it only when the next step cannot be undone or cannot be guessed. If Undo is possible, do the thing and offer UNDO in a Toast instead.
- One Dialog at a time, and never one that opens another.
- From 600 px it is centred (`bm-dialog`). Below 600 px add `bm-dialog--sheet`: it sits `space-3` above the bottom edge, where a thumb reaches, and its buttons stack full width.
- On the round display there is no Dialog and no scrim. A sheet there is a screen of its own (the DisplayMenu card).

### Anatomy

`.bm-scrim` covers the page in `scrim` on `layer-scrim`. `.bm-dialog` is a `surface-1` block on `layer-dialog`: `radius-xl`, padding `space-5`, a `line` hairline, at most `dialog` 400 px wide and never closer than `space-3` to the screen's edge. Inside: `.bm-dialog__title` in `heading`, `.bm-dialog__body` in `body` and `ink-muted`, and `.bm-dialog__actions`, right-aligned, `space-2` apart (`bm-dialog__actions--stack` on a sheet).

The Dialog is `surface-1`, so a `primary` Button on it holds 3:1 in Dark. Fields inside it are `surface-2` as usual.

### Buttons

| Dialog | Commit | Other |
| --- | --- | --- |
| Destructive: "Delete Adaptive v2?" | `bm-btn--danger`, naming the object: DELETE PROFILE | default Button: KEEP |
| A choice: "Save changes" | `bm-btn--primary`: SAVE | default Buttons: SAVE AS NEW, and `bm-btn--ghost`: USE ONCE |
| A fault to acknowledge | `bm-btn--ink`: DONE | `bm-btn--ghost`: DETAILS |

The commit is last in a row and first in a stack. There is at most one `primary` or `danger` Button.

### Motion

Scrim: opacity in `duration-base`. Dialog: opacity and a 16 px rise in `duration-base` on `ease-out`; leaves in `duration-fast` on `ease-in`. Nothing scales.

### Content

- Title: the question or the task, with the object's name, at most 40 characters: "Delete Adaptive v2?", "Save changes".
- Body: the consequence, in one or two sentences: "Its 14 shots stay in History."
- Buttons: verbs that answer the title. Never YES and NO, never OK and CANCEL.

### Keyboard and screen reader

- Use the native `dialog` element with `showModal()`, or `role="dialog"` with `aria-modal="true"`. Label it with the title (`aria-labelledby`) and describe it with the body (`aria-describedby`). A destructive one is `role="alertdialog"`.
- Opening moves focus inside: to the least destructive button for a deletion, to the first field otherwise. Tab stays inside. Closing returns focus to the control that opened it.
- Escape and a press on the scrim both mean the safe answer (KEEP). They do nothing in a Dialog that has no safe answer.
- The page behind is inert: it cannot be scrolled, focused or read.
