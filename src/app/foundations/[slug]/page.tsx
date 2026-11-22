import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { DocsShell, PageHead, Prose } from "@/components/DocsShell";
import { Example } from "@/components/Example";
import { Icon } from "@/components/Icon";
import { card, icons, markdown, omit, pick, section, splitSections, tokens } from "@/lib/content";
import { FOUNDATIONS, type FoundationSlug } from "@/lib/nav";
import { systemGroups } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return FOUNDATIONS.map((f) => ({ slug: f.slug }));
}

export async function generateMetadata({ params }: PageProps<"/foundations/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const f = FOUNDATIONS.find((x) => x.slug === slug);
  return f ? { title: f.title, description: f.lede } : {};
}

const md = (text: string) => <Prose html={markdown(text).html} />;
const README = () => section("README.md");

/* ---------- Live blocks drawn from tokens.json ---------- */

function resolve(value: string, theme: string): string {
  const alias = /^\{([a-z0-9-]+)\}$/.exec(value);
  if (!alias) return value;
  const target = tokens().color.tokens.find((t) => t.name === alias[1]);
  if (!target) return value;
  return resolve(typeof target.value === "string" ? target.value : (target.value[theme] ?? target.value.light), theme);
}

function ColorTable() {
  const { themes, tokens: list } = tokens().color;
  return (
    <div className="table-wrap color-table">
      <table>
        <thead>
          <tr>
            <th>Token</th>
            <th>{themes.map((t) => t.name).join(" · ")}</th>
            <th>Use it for</th>
          </tr>
        </thead>
        <tbody>
          {list.map((t) => (
            <tr key={t.name}>
              <td>
                <code className="code-inline">{t.name}</code>
              </td>
              <td>
                <div className="color-chips">
                  {themes.map((th) => {
                    const raw = typeof t.value === "string" ? t.value : (t.value[th.id] ?? t.value.light);
                    const hex = resolve(raw, th.id);
                    return (
                      <span className="color-chip" key={th.id}>
                        <span className="color-chip__fill" style={{ background: hex }} title={`${th.name}: ${hex}`} />
                        <span className="bm-caption">{raw.startsWith("{") ? raw.replace(/[{}]/g, "") : hex}</span>
                      </span>
                    );
                  })}
                </div>
              </td>
              <td className="usage">{t.usage}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function TypeScale() {
  const { type } = tokens();
  return (
    <>
      {type.groups.map((g) => (
        <section key={g.name}>
          <h3 className="bm-sub" style={{ margin: "var(--space-10) 0 var(--space-2)" }}>
            {g.name}
          </h3>
          {g.styles.map((s) => (
            <div className="specimen" key={s.name}>
              <div className="specimen__meta">
                <code className="code-inline" style={{ alignSelf: "flex-start" }}>
                  {s.name}
                </code>
                <span className="bm-data">
                  {s.fontSize} / {s.lineHeight} · {s.fontWeight}
                </span>
              </div>
              <div>
                <div
                  className="specimen__sample"
                  style={{
                    font: `${s.fontWeight} ${s.fontSize}/${s.lineHeight} var(--font-${g.family})`,
                    letterSpacing: s.letterSpacing,
                  }}
                >
                  {s.sample}
                </div>
                {s.usage && (
                  <p className="bm-help" style={{ marginTop: "var(--space-2)" }}>
                    {s.usage}
                  </p>
                )}
              </div>
            </div>
          ))}
        </section>
      ))}
    </>
  );
}

function Scales() {
  const t = tokens();
  const px = (v: string) => parseFloat(v);
  const max = Math.max(...t.spacing.tokens.map((s) => px(s.value)));
  return (
    <>
      <div className="prose">
        <h2 id="spacing">
          <a className="anchor" href="#spacing">
            Spacing
          </a>
        </h2>
        <p>Every padding, gap and margin is one of these steps on a 4 px grid.</p>
      </div>
      <div style={{ margin: "0 0 var(--space-8)" }}>
        {t.spacing.tokens.map((s) => (
          <div className="scale-row" key={s.name}>
            <code className="code-inline" style={{ justifySelf: "start" }}>
              {s.name}
            </code>
            <span className="bm-data">{s.value}</span>
            <span className="scale-bar" style={{ width: `${(px(s.value) / max) * 100}%` }} />
          </div>
        ))}
      </div>
      <div className="prose">
        <h2 id="radii">
          <a className="anchor" href="#radii">
            Radii
          </a>
        </h2>
        <p>Everything you press is a pill. A nested corner is the outer radius minus the padding between them.</p>
      </div>
      <div className="radius-row">
        {t.radius.tokens.map((r) => (
          <div className="radius-sample" key={r.name}>
            <i style={{ borderRadius: r.value }} />
            <code className="code-inline">{r.name}</code>
            <span className="bm-data">{r.value}</span>
          </div>
        ))}
      </div>
      <div className="prose">
        <h2 id="sizes">
          <a className="anchor" href="#sizes">
            Sizes
          </a>
        </h2>
      </div>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Token</th>
              <th>Value</th>
              <th>Use it for</th>
            </tr>
          </thead>
          <tbody>
            {t.size.tokens.map((s) => (
              <tr key={s.name}>
                <td>
                  <code className="code-inline">{s.name}</code>
                </td>
                <td className="bm-data">{s.value}</td>
                <td>{s.usage}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

function IconGrid() {
  return (
    <div className="icon-grid">
      {Object.keys(icons()).map((name) => (
        <div className="icon-cell" key={name}>
          <Icon name={name} />
          <span className="bm-caption">{name}</span>
        </div>
      ))}
    </div>
  );
}

function Heading({ id, children }: { id: string; children: ReactNode }) {
  return (
    <div className="prose">
      <h2 id={id}>
        <a className="anchor" href={`#${id}`}>
          {children}
        </a>
      </h2>
    </div>
  );
}

function Preview({ name }: { name: string }) {
  const c = card(name);
  return c ? <Example card={c} code={false} /> : null;
}

function SeeAlso({ links }: { links: string[] }) {
  return (
    <p className="bm-help" style={{ margin: "var(--space-8) 0 0" }}>
      See also:{" "}
      {links.map((name, i) => {
        const c = card(name);
        if (!c) return null;
        const slug = name.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
        return (
          <span key={name}>
            <Link className="bm-link bm-link--inline" href={`/components/${slug}/`}>
              {c.title}
            </Link>
            {i < links.length - 1 ? ", " : "."}
          </span>
        );
      })}
    </p>
  );
}

/* ---------- What each page is made of ---------- */

function blocks(slug: FoundationSlug): ReactNode {
  switch (slug) {
    case "principles": {
      const fiveRules = pick(section("round-display.md"), ["The five rules"], { headings: false });
      return (
        <>
          {md(splitSections(README()).intro)}
          {md(pick(README(), ["Principles"]))}
          {md(`## The five rules of the round display\n\n${fiveRules}`)}
          {md(pick(README(), ["Voice and content"]))}
        </>
      );
    }
    case "color":
      return (
        <>
          {md(pick(README(), ["Color"], { headings: false }))}
          <Heading id="tokens">Every colour, in all three themes</Heading>
          <p className="bm-help" style={{ margin: "0 0 var(--space-4)" }}>
            Light and Dark are the web app&apos;s themes. Display black is the round display&apos;s default on every panel.
          </p>
          <ColorTable />
        </>
      );
    case "typography":
      return (
        <>
          {md(pick(README(), ["Typography"], { headings: false }))}
          <Heading id="scale">The type scale</Heading>
          <TypeScale />
        </>
      );
    case "layout":
      return (
        <>
          {md(pick(README(), ["Shape and layout"], { headings: false }))}
          <Scales />
        </>
      );
    case "icons":
      return (
        <>
          {md(pick(README(), ["Iconography"], { headings: false }))}
          <Heading id="set">The set</Heading>
          <IconGrid />
        </>
      );
    case "motion": {
      const m = section("motion.md");
      return (
        <>
          {md(pick(README(), ["Motion"], { headings: false }))}
          <Heading id="on-the-web">On the web</Heading>
          <Preview name="MotionWeb" />
          <Heading id="on-the-display">On the display</Heading>
          <Preview name="MotionDisplay" />
          {md(omit(m, ["Replacing the current helpers"]))}
        </>
      );
    }
    case "content":
      return md(section("content.md").replace(/^# .*\n+/, ""));
    case "accessibility":
      return (
        <>
          {md(pick(README(), ["States and accessibility"], { headings: false }))}
          <Heading id="states">Every control, in every state</Heading>
          <Preview name="States" />
          {md(section("accessibility.md").replace(/^# .*\n+/, ""))}
        </>
      );
    case "product-states":
      return (
        <>
          {md(section("product-states.md").replace(/^# .*\n+/, ""))}
          <SeeAlso links={["WebStates", "DisplayStates", "Notice"]} />
        </>
      );
    case "round-display":
      return (
        <>
          {md(omit(section("round-display.md"), ["Fonts for LVGL", "Drawing the ring in LVGL"]))}
          <SeeAlso links={["TickRing", "DisplayStandby", "DisplayBrew", "DisplayShot", "DisplayModes", "DisplayMenu", "DisplayStates"]} />
        </>
      );
    case "web-ui":
      return (
        <>
          {md(omit(section("web-ui.md"), ["Moving the current code over"]))}
          <SeeAlso links={["WebDesktop", "WebPhone", "WebPages", "WebStates", "Dial", "ModeBar"]} />
        </>
      );
  }
}

export default async function FoundationPage({ params }: PageProps<"/foundations/[slug]">) {
  const { slug } = await params;
  const i = FOUNDATIONS.findIndex((f) => f.slug === slug);
  if (i < 0) notFound();
  const f = FOUNDATIONS[i];
  const prev = FOUNDATIONS[i - 1];
  const next = FOUNDATIONS[i + 1];
  return (
    <DocsShell groups={systemGroups()} label="Design system">
      <PageHead crumbs={[{ label: "Foundations" }]} title={f.title} lede={f.lede} />
      {blocks(f.slug)}
      <nav className="pager" aria-label="More foundations">
        {prev && (
          <Link href={`/foundations/${prev.slug}/`}>
            <span className="bm-caption">Previous</span>
            <strong>{prev.title}</strong>
          </Link>
        )}
        {next ? (
          <Link href={`/foundations/${next.slug}/`} className="next">
            <span className="bm-caption">Next</span>
            <strong>{next.title}</strong>
          </Link>
        ) : (
          <Link href="/components/" className="next">
            <span className="bm-caption">Next</span>
            <strong>Components</strong>
          </Link>
        )}
      </nav>
    </DocsShell>
  );
}
