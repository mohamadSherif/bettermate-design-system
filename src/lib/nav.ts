/* The site's map: top-level sections, and the pages under Foundations. Shared by server and client. */

export type NavLink = { href: string; label: string };
export type NavGroup = { label: string; links: NavLink[] };

export const SECTIONS: NavLink[] = [
  { href: "/", label: "Overview" },
  { href: "/compare/", label: "Compare" },
  { href: "/foundations/principles/", label: "Foundations" },
  { href: "/components/", label: "Components" },
  { href: "/install/", label: "Install" },
];

export const FOUNDATIONS = [
  { slug: "principles", title: "Principles", lede: "BetterMate has two faces, the round display on the machine and the web app it serves, and both follow the same rules." },
  { slug: "color", title: "Color", lede: "Greys make the depth, ink selects, cobalt acts and orange belongs to the boiler. Every colour is named by what it does." },
  { slug: "typography", title: "Typography", lede: "Funnel Display for words and large numerals, Geist Mono for labels, units and small data. Numerals are always tabular." },
  { slug: "layout", title: "Shape and layout", lede: "Tiles on a bento grid, one tone step per layer, a 4 px spacing grid and generous touch targets for wet hands." },
  { slug: "icons", title: "Iconography", lede: "One set of 53 stroke glyphs on a 24 unit grid. Each has one fixed meaning." },
  { slug: "motion", title: "Motion", lede: "Things move in small steps. The display counts motion in frames of its 23.5 Hz panel, and the web animates only fills and transforms." },
  { slug: "content", title: "Content", lede: "Plain words, sentence case, one word per thing, and numbers written the same way everywhere." },
  { slug: "accessibility", title: "Accessibility", lede: "The web app meets WCAG 2.2 AA, the display reads from arm's length, and no state is shown by colour alone." },
  { slug: "product-states", title: "Product states", lede: "Offline, a fault, a command on its way, first start and an update each have a designed state on both faces." },
  { slug: "round-display", title: "Round display", lede: "The 480 px circular panel on the machine: its zones, its tick ring and what each screen shows." },
  { slug: "web-ui", title: "Web UI", lede: "The app the machine serves over your Wi-Fi: a bento grid of tiles that draws the machine exactly as the display does." },
] as const;

export type FoundationSlug = (typeof FOUNDATIONS)[number]["slug"];

export function foundationsGroup(): NavGroup {
  return { label: "Foundations", links: FOUNDATIONS.map((f) => ({ href: `/foundations/${f.slug}/`, label: f.title })) };
}

/* The section a path belongs to, for the top bar. */
export function sectionOf(pathname: string): string {
  if (pathname.startsWith("/compare")) return "/compare/";
  if (pathname.startsWith("/foundations")) return "/foundations/principles/";
  if (pathname.startsWith("/components")) return "/components/";
  if (pathname.startsWith("/install")) return "/install/";
  return "/";
}
