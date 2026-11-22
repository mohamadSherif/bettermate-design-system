"use client";

import { useSyncExternalStore } from "react";
import { Icon } from "./Icon";

/* Light, Dark or System, as in the web app. The choice is kept in this browser only; layout.tsx applies it before
   the first paint. */
type Theme = "light" | "dark" | "system";
const KEY = "bm-theme";
const listeners = new Set<() => void>();

function read(): Theme {
  try {
    const t = localStorage.getItem(KEY);
    return t === "light" || t === "dark" ? t : "system";
  } catch {
    return "system";
  }
}
function subscribe(cb: () => void) {
  listeners.add(cb);
  window.addEventListener("storage", cb);
  return () => {
    listeners.delete(cb);
    window.removeEventListener("storage", cb);
  };
}
function apply(theme: Theme) {
  try {
    if (theme === "system") localStorage.removeItem(KEY);
    else localStorage.setItem(KEY, theme);
  } catch {}
  const html = document.documentElement;
  if (theme === "system") html.removeAttribute("data-theme");
  else html.setAttribute("data-theme", theme);
  listeners.forEach((l) => l());
}

const OPTIONS: { id: Theme; label: string; icon: string }[] = [
  { id: "light", label: "Light", icon: "sun" },
  { id: "dark", label: "Dark", icon: "moon" },
  { id: "system", label: "System", icon: "monitor" },
];

export function ThemeSwitch({ labels = false }: { labels?: boolean }) {
  const theme = useSyncExternalStore(subscribe, read, () => "system" as Theme);
  return (
    <div className="bm-seg theme" role="group" aria-label="Theme">
      {OPTIONS.map((o) => (
        <button
          key={o.id}
          type="button"
          className="bm-seg__item"
          aria-pressed={theme === o.id}
          aria-label={labels ? undefined : o.label}
          title={labels ? undefined : o.label}
          onClick={() => apply(o.id)}
        >
          <Icon name={o.icon} size={18} />
          {labels && o.label}
        </button>
      ))}
    </div>
  );
}
