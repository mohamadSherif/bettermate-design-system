import type { Metadata } from "next";
import Link from "next/link";
import { Capture } from "@/components/Capture";
import { DocsShell, PageHead } from "@/components/DocsShell";
import { Icon } from "@/components/Icon";
import { DISPLAY, WEB, type Pair } from "@/content/compare";
import { card } from "@/lib/content";
import { compareGroups, componentHref } from "@/lib/site";

export const metadata: Metadata = {
  title: "Compare",
  description: "Every stock GaggiMate screen beside the same screen in BetterMate: the round display and the web app.",
};

/* The component page that documents each BetterMate screen. */
const COMPONENT: Record<string, string> = {
  standby: "DisplayStandby",
  brew: "DisplayBrew",
  adjust: "DisplayMenu",
  shot: "DisplayShot",
  "shot-complete": "DisplayShot",
  menu: "DisplayMenu",
  steam: "DisplayModes",
  water: "DisplayModes",
  grind: "DisplayModes",
  profiles: "DisplayMenu",
  info: "DisplayMenu",
  dashboard: "WebDesktop",
  phone: "WebPhone",
  navigation: "Nav",
};

function Shot({ side, shot, kind, priority }: { side: "stock" | "bettermate"; shot: Pair["stock"]; kind: "round" | "web"; priority?: boolean }) {
  return (
    <figure className={`shot shot--${kind}`}>
      <figcaption>
        <span className="bm-eyebrow">{side === "stock" ? "Stock GaggiMate" : "BetterMate"}</span>
        {side === "bettermate" && <span className="bm-chip bm-chip--primary">New</span>}
      </figcaption>
      <Capture src={shot.src} alt={shot.alt} priority={priority} sizes={kind === "round" ? "(max-width: 767px) 45vw, 320px" : "(max-width: 1023px) 100vw, 960px"} />
    </figure>
  );
}

function PairSection({ pair, kind, layout, first }: { pair: Pair; kind: "round" | "web"; layout?: "stack" | "phone"; first?: boolean }) {
  const comp = card(COMPONENT[pair.id]);
  return (
    <section className="pair" id={pair.id} aria-labelledby={`${pair.id}-title`}>
      <div className="pair__head">
        <h2 className="pair__title" id={`${pair.id}-title`}>
          {pair.title}
        </h2>
        {comp && (
          <Link className="bm-link" href={componentHref(comp)}>
            {comp.title}
          </Link>
        )}
      </div>
      <p className="pair__intro">{pair.intro}</p>
      <div className={`pair__shots${layout ? ` pair__shots--${layout}` : ""}`}>
        <Shot side="stock" shot={pair.stock} kind={kind} priority={first} />
        <Shot side="bettermate" shot={pair.bettermate} kind={kind} priority={first} />
      </div>
      <div className="pair__notes">
        <div className="notes">
          <h3 className="bm-sub">What changed</h3>
          <ul>
            {pair.changed.map((c) => (
              <li key={c}>
                <Icon name="arrow-right" size={20} />
                <span>{c}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="notes">
          <h3 className="bm-sub">Still there</h3>
          <ul>
            {pair.kept.map((c) => (
              <li key={c}>
                <Icon name="check" size={20} />
                <span>{c}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export default function ComparePage() {
  return (
    <DocsShell groups={compareGroups()} label="Screens">
      <PageHead
        title="Stock GaggiMate and BetterMate, screen by screen"
        lede="Every screen of the round display and the web app, stock on the left and BetterMate on the right. Both are captures of real firmware running in the simulator, not mock-ups."
      />
      <h2 className="part-title" id="display">
        Round display
      </h2>
      {DISPLAY.map((p, i) => (
        <PairSection key={p.id} pair={p} kind="round" first={i === 0} />
      ))}
      <h2 className="part-title" id="web">
        Web app
      </h2>
      {WEB.map((p) => (
        <PairSection key={p.id} pair={p} kind="web" layout={p.id === "dashboard" ? "stack" : "phone"} />
      ))}
    </DocsShell>
  );
}
