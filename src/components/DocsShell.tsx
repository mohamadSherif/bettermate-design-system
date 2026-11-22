import type { ReactNode } from "react";
import type { NavGroup } from "@/lib/nav";
import { Sidebar } from "./Sidebar";

/* The Stacks arrangement: a sticky list of pages beside one reading column. */
export function DocsShell({ groups, label, children }: { groups: NavGroup[]; label: string; children: ReactNode }) {
  return (
    <div className="docs">
      <aside className="docs__side">
        <Sidebar groups={groups} label={label} />
      </aside>
      <main id="main" className="docs__main">
        {children}
      </main>
    </div>
  );
}

export function PageHead({ crumbs, title, lede, children }: { crumbs?: { href?: string; label: string }[]; title: string; lede?: ReactNode; children?: ReactNode }) {
  return (
    <header className="page-head">
      {crumbs && (
        <nav className="crumbs bm-caption" aria-label="Breadcrumb">
          {crumbs.map((c, i) => (
            <span key={c.label}>
              {c.href ? <a href={c.href}>{c.label}</a> : c.label}
              {i < crumbs.length - 1 && <span aria-hidden="true"> / </span>}
            </span>
          ))}
        </nav>
      )}
      <h1 className="page-title">{title}</h1>
      {lede && <p className="lede">{lede}</p>}
      {children}
    </header>
  );
}

export function Prose({ html }: { html: string }) {
  return <div className="prose" dangerouslySetInnerHTML={{ __html: html }} />;
}
