"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import type { NavGroup } from "@/lib/nav";

const clean = (p: string) => p.replace(/\/+$/, "") || "/";

export function Sidebar({ groups, label }: { groups: NavGroup[]; label: string }) {
  const here = clean(usePathname() || "/");
  const nav = useRef<HTMLElement>(null);

  /* Bring the current page into view inside the sidebar's own scroll, without moving the page. */
  useEffect(() => {
    const box = nav.current?.closest<HTMLElement>(".docs__side");
    const item = nav.current?.querySelector<HTMLElement>('[aria-current="page"]');
    if (!box || !item) return;
    const top = item.getBoundingClientRect().top - box.getBoundingClientRect().top + box.scrollTop;
    if (top < box.scrollTop || top > box.scrollTop + box.clientHeight - item.offsetHeight) box.scrollTop = top - box.clientHeight / 3;
  }, [here]);

  return (
    <nav aria-label={label} ref={nav}>
      {groups.map((g) => (
        <div className="side-group" key={g.label}>
          <p className="bm-eyebrow">{g.label}</p>
          <div className="bm-nav">
            {g.links.map((l) => (
              <Link key={l.href} href={l.href} className="bm-nav__item" aria-current={!l.href.includes("#") && clean(l.href) === here ? "page" : undefined}>
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      ))}
    </nav>
  );
}
