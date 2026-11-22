/* Build-time readers for the design system copied in by scripts/sync-design.mjs. Server only. */
import fs from "node:fs";
import path from "node:path";
import { Marked, type Tokens } from "marked";

const DIR = path.join(process.cwd(), "src/content/design");
const read = (...p: string[]) => fs.readFileSync(path.join(DIR, ...p), "utf8");

export type ComponentMeta = {
  name: string;
  title: string;
  group: string;
  height: number;
  width: number | null;
  summary: string;
};

type ColorToken = { name: string; value: string | Record<string, string>; usage: string };
type ScalarToken = { name: string; value: string; usage?: string };
type TypeStyle = {
  name: string;
  fontSize: string;
  lineHeight: string;
  fontWeight: number;
  letterSpacing?: string;
  sample?: string;
  usage?: string;
};
export type DesignTokens = {
  color: { themes: { id: string; name: string }[]; tokens: ColorToken[] };
  type: { families: Record<string, string>; groups: { name: string; family: string; styles: TypeStyle[] }[] };
} & Record<string, { note?: string; tokens: ScalarToken[] }>;

let tokenCache: DesignTokens | null = null;
export function tokens(): DesignTokens {
  tokenCache ??= JSON.parse(read("tokens.json")) as DesignTokens;
  return tokenCache;
}

export function icons(): Record<string, string> {
  return JSON.parse(read("icons.json")).paths;
}

/* Components the site lists. The Cover is the artifact's own; Icon, States and the two Motion cards are
   shown on Foundations pages instead. */
const NOT_COMPONENTS = new Set(["Cover", "Icon", "States", "MotionDisplay", "MotionWeb"]);
export const GROUP_ORDER = ["Actions", "Navigation", "Data", "Forms", "Feedback", "Overlays", "Layout", "Round display", "Web UI"];

export function allCards(): ComponentMeta[] {
  return JSON.parse(read("components.json"));
}
export function card(name: string): ComponentMeta | undefined {
  return allCards().find((c) => c.name === name);
}
export function components(): ComponentMeta[] {
  return allCards()
    .filter((c) => !NOT_COMPONENTS.has(c.name))
    .sort((a, b) => GROUP_ORDER.indexOf(a.group) - GROUP_ORDER.indexOf(b.group) || a.name.localeCompare(b.name));
}
export function componentGroups(): { group: string; items: ComponentMeta[] }[] {
  const list = components();
  return GROUP_ORDER.map((group) => ({ group, items: list.filter((c) => c.group === group) })).filter((g) => g.items.length);
}

export function componentReadme(name: string): string {
  const file = path.join(DIR, "components", name, "README.md");
  return fs.existsSync(file) ? fs.readFileSync(file, "utf8") : "";
}
export function componentMarkup(name: string): string {
  return read("components", name, "markup.html");
}

export function section(file: string): string {
  return read("sections", file);
}

/* Splits a Markdown file at its level-two headings. The intro is whatever comes before the first one,
   without the file's own level-one title. */
export function splitSections(md: string): { intro: string; parts: Map<string, string> } {
  const body = md.replace(/^# .*\n+/, "");
  const chunks = body.split(/^(?=## )/m);
  const intro = chunks[0].startsWith("## ") ? "" : chunks.shift()!.trim();
  const parts = new Map<string, string>();
  for (const chunk of chunks) {
    const [head, ...rest] = chunk.split("\n");
    parts.set(head.replace(/^## /, "").trim(), rest.join("\n").trim());
  }
  return { intro, parts };
}

/* Picks named level-two parts of a file, in order, keeping their headings. */
export function pick(md: string, names: string[], { headings = true } = {}): string {
  const { parts } = splitSections(md);
  return names
    .map((n) => {
      const text = parts.get(n);
      if (text == null) throw new Error(`No section "${n}"`);
      return headings ? `## ${n}\n\n${text}` : text;
    })
    .join("\n\n");
}
export function omit(md: string, names: string[]): string {
  const { intro, parts } = splitSections(md);
  return [intro, ...[...parts].filter(([n]) => !names.includes(n)).map(([n, t]) => `## ${n}\n\n${t}`)].filter(Boolean).join("\n\n");
}

export const slug = (s: string) =>
  s
    .toLowerCase()
    .replace(/<[^>]+>/g, "")
    .replace(/&[a-z]+;/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

/* Markdown to HTML. Headings get anchors; inline code naming a colour token gets a swatch of it. */
export function markdown(md: string): { html: string; headings: { id: string; text: string; depth: number }[] } {
  const colorNames = new Set(tokens().color.tokens.map((t) => t.name));
  const headings: { id: string; text: string; depth: number }[] = [];
  const marked = new Marked({
    gfm: true,
    renderer: {
      heading(this: { parser: { parseInline(t: Tokens.Generic[]): string } }, { tokens: inline, depth }: Tokens.Heading) {
        const html = this.parser.parseInline(inline);
        const id = slug(html);
        headings.push({ id, text: html.replace(/<[^>]+>/g, ""), depth });
        return `<h${depth} id="${id}"><a class="anchor" href="#${id}">${html}</a></h${depth}>\n`;
      },
      codespan({ text }: Tokens.Codespan) {
        if (colorNames.has(text)) {
          return `<code class="token"><span class="swatch" style="background:var(--${text})" aria-hidden="true"></span>${text}</code>`;
        }
        return `<code>${text}</code>`;
      },
      table(this: { parser: { parseInline(t: Tokens.Generic[]): string } }, token: Tokens.Table) {
        const cell = (c: Tokens.TableCell, tag: string) =>
          `<${tag}${c.align ? ` style="text-align:${c.align}"` : ""}>${this.parser.parseInline(c.tokens)}</${tag}>`;
        const head = `<tr>${token.header.map((c) => cell(c, "th")).join("")}</tr>`;
        const rows = token.rows.map((r) => `<tr>${r.map((c) => cell(c, "td")).join("")}</tr>`).join("");
        return `<div class="table-wrap"><table><thead>${head}</thead><tbody>${rows}</tbody></table></div>\n`;
      },
    },
  });
  const html = marked.parse(md, { async: false }) as string;
  return { html, headings };
}

/* One line of Markdown, for summaries that name tokens in backticks. */
export function inline(md: string): string {
  return new Marked().parseInline(md, { async: false }) as string;
}

/* A README without its first paragraph, which the page shows as its lede. */
export function withoutSummary(md: string): string {
  return md.replace(/^\s*[^#\n][^\n]*(\n[^\n#|-][^\n]*)*\n*/, "");
}
