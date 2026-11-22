import type { Metadata } from "next";
import Link from "next/link";
import { DocsShell, PageHead } from "@/components/DocsShell";
import { componentGroups, inline } from "@/lib/content";
import { componentHref, systemGroups } from "@/lib/site";

export const metadata: Metadata = {
  title: "Components",
  description: "Every BetterMate component, live, with its markup and the rules for using it.",
};

export default function ComponentsPage() {
  const groups = componentGroups();
  const count = groups.reduce((n, g) => n + g.items.length, 0);
  return (
    <DocsShell groups={systemGroups()} label="Design system">
      <PageHead
        title="Components"
        lede={`${count} components, each drawn live by the design system's own stylesheet and bundle, the same code the web app and the display are built from.`}
      />
      {groups.map((g) => (
        <section key={g.group} aria-labelledby={`g-${g.group}`}>
          <h2 className="group-title" id={`g-${g.group}`}>
            {g.group}
          </h2>
          <div className="card-grid">
            {g.items.map((c) => (
              <Link key={c.name} href={componentHref(c)} className="card-link">
                <span className="bm-sub">{c.title}</span>
                <span className="bm-help" dangerouslySetInnerHTML={{ __html: inline(c.summary) }} />
              </Link>
            ))}
          </div>
        </section>
      ))}
    </DocsShell>
  );
}
