/* Navigation groups for each section, built from the content at build time. Server only. */
import { DISPLAY, WEB } from "@/content/compare";
import { componentGroups, type ComponentMeta } from "./content";
import { foundationsGroup, type NavGroup } from "./nav";

export const componentSlug = (name: string) => name.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
export const componentHref = (c: Pick<ComponentMeta, "name">) => `/components/${componentSlug(c.name)}/`;

export function compareGroups(): NavGroup[] {
  return [
    { label: "Round display", links: DISPLAY.map((p) => ({ href: `/compare/#${p.id}`, label: p.title })) },
    { label: "Web app", links: WEB.map((p) => ({ href: `/compare/#${p.id}`, label: p.title })) },
  ];
}

export function systemGroups(): NavGroup[] {
  return [
    foundationsGroup(),
    { label: "Components", links: [{ href: "/components/", label: "All components" }] },
    ...componentGroups().map((g) => ({ label: g.group, links: g.items.map((c) => ({ href: componentHref(c), label: c.title })) })),
  ];
}

export function groupsBySection(): Record<string, NavGroup[]> {
  const system = systemGroups();
  return { "/compare/": compareGroups(), "/foundations/principles/": system, "/components/": system };
}
