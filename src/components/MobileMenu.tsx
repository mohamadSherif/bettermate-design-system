"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useState } from "react";
import { SECTIONS, sectionOf, type NavGroup } from "@/lib/nav";
import { Icon } from "./Icon";
import { Sidebar } from "./Sidebar";
import { ThemeSwitch } from "./ThemeSwitch";

/* Under 900 px the sections, the current section's pages and the theme move into one sheet. */
export function MobileMenu({ groupsBySection }: { groupsBySection: Record<string, NavGroup[]> }) {
  const [open, setOpen] = useState(false);
  const id = useId();
  const current = sectionOf(usePathname() || "/");
  const groups = groupsBySection[current] ?? [];

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        className="bm-btn bm-btn--icon bm-btn--quiet top__menu"
        aria-label={open ? "Close menu" : "Menu"}
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen((o) => !o)}
      >
        <Icon name={open ? "x" : "menu"} />
      </button>
      <div
        id={id}
        className="sheet"
        hidden={!open}
        onClick={(e) => {
          if ((e.target as HTMLElement).closest("a")) setOpen(false);
        }}
      >
        <nav aria-label="Sections" className="bm-nav">
          {SECTIONS.map((s) => (
            <Link key={s.href} href={s.href} className="bm-nav__item" aria-current={current === s.href ? "page" : undefined}>
              {s.label}
            </Link>
          ))}
        </nav>
        <div className="sheet__theme">
          <span className="bm-field__label">Theme</span>
          <ThemeSwitch />
        </div>
        {groups.length > 0 && <Sidebar groups={groups} label="Pages in this section" />}
      </div>
    </>
  );
}
