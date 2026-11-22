"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { SECTIONS, sectionOf } from "@/lib/nav";

export function TopNav() {
  const current = sectionOf(usePathname() || "/");
  return (
    <nav className="top__nav" aria-label="Sections">
      {SECTIONS.map((s) => (
        <Link key={s.href} href={s.href} className="bm-nav__item" aria-current={current === s.href ? "page" : undefined}>
          {s.label}
        </Link>
      ))}
    </nav>
  );
}
