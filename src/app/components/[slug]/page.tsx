import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { DocsShell, PageHead, Prose } from "@/components/DocsShell";
import { Example } from "@/components/Example";
import { componentReadme, components, inline, markdown, withoutSummary } from "@/lib/content";
import { componentHref, componentSlug, systemGroups } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return components().map((c) => ({ slug: componentSlug(c.name) }));
}

function find(slug: string) {
  const list = components();
  const i = list.findIndex((c) => componentSlug(c.name) === slug);
  return i < 0 ? null : { c: list[i], prev: list[i - 1], next: list[i + 1] };
}

export async function generateMetadata({ params }: PageProps<"/components/[slug]">): Promise<Metadata> {
  const found = find((await params).slug);
  return found ? { title: found.c.title, description: found.c.summary.replace(/`/g, "") } : {};
}

export default async function ComponentPage({ params }: PageProps<"/components/[slug]">) {
  const found = find((await params).slug);
  if (!found) notFound();
  const { c, prev, next } = found;
  const { html } = markdown(withoutSummary(componentReadme(c.name)));
  return (
    <DocsShell groups={systemGroups()} label="Design system">
      <PageHead
        crumbs={[{ href: "/components/", label: "Components" }, { label: c.group }]}
        title={c.title}
        lede={<span dangerouslySetInnerHTML={{ __html: inline(c.summary) }} />}
      />
      <Example card={c} />
      <Prose html={html} />
      <nav className="pager" aria-label="More components">
        {prev && (
          <Link href={componentHref(prev)}>
            <span className="bm-caption">Previous</span>
            <strong>{prev.title}</strong>
          </Link>
        )}
        {next && (
          <Link href={componentHref(next)} className="next">
            <span className="bm-caption">Next</span>
            <strong>{next.title}</strong>
          </Link>
        )}
      </nav>
    </DocsShell>
  );
}
