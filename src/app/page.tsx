import Link from "next/link";
import { DisplayWipe, type WipeScreen } from "@/components/DisplayWipe";
import { Icon } from "@/components/Icon";
import { MachineCheck } from "@/components/MachineCheck";
import { WebCompare, type WebView } from "@/components/WebCompare";
import captures from "@/content/captures.json";
import { DISPLAY, WEB } from "@/content/compare";
import BetterMate from "@/lib/bm-bundle";
import { components } from "@/lib/content";
import { SUPPORTED_LABEL } from "@/lib/machine";
import { FOUNDATIONS } from "@/lib/nav";

const WIPE: { id: string; label: string }[] = [
  { id: "standby", label: "Standby" },
  { id: "brew", label: "Brew" },
  { id: "shot", label: "Shot" },
  { id: "shot-complete", label: "Done" },
  { id: "steam", label: "Steam" },
  { id: "grind", label: "Grind" },
  { id: "menu", label: "Menu" },
];

const size = (src: string) => (captures as Record<string, { w: number; h: number }>)[src];

/* Display builds for the LilyGo T-RGB, each with its web app built in: stock GaggiMate v1.9.0 (the fork point) against BetterMate main,
   November 2026. Bytes as measured; every figure on the page is worked out from them. */
const SIZES = [
  {
    label: "Display firmware",
    bettermate: 3_099_776,
    stock: 3_545_952,
    unit: "MB",
    less: "smaller",
    note: "Web app included. It fills 47% of the display's app partition, down from 54%.",
  },
  {
    label: "Web app",
    bettermate: 462_731,
    stock: 515_788,
    unit: "KB",
    less: "smaller",
    note: "Gzipped and built into the firmware, the same way stock ships it.",
  },
  {
    label: "Memory reserved",
    bettermate: 84_000,
    stock: 93_760,
    unit: "KB",
    less: "less",
    note: "RAM the firmware sets aside before it runs, so more is left free.",
  },
] as const;

const inUnit = (bytes: number, unit: "MB" | "KB") => (unit === "MB" ? (bytes / 1e6).toFixed(2) : Math.round(bytes / 1e3).toString());

export default function Overview() {
  const wipe: WipeScreen[] = WIPE.map(({ id, label }) => {
    const p = DISPLAY.find((d) => d.id === id)!;
    return { id, label, stock: p.stock, bettermate: p.bettermate };
  });
  const views: WebView[] = (["dashboard", "phone"] as const).map((id) => {
    const p = WEB.find((w) => w.id === id)!;
    return {
      id,
      label: id === "phone" ? "Phone" : "Desktop",
      stock: { ...p.stock, ...size(p.stock.src) },
      bettermate: { ...p.bettermate, ...size(p.bettermate.src) },
    };
  });
  const screenCount = DISPLAY.length + WEB.length;

  return (
    <main id="main">
      <div className="wrap">
        <section className="hero" aria-labelledby="hero-title">
          <div>
            <h1 className="hero__title" id="hero-title">
              reimagined.
            </h1>
            <p className="hero__lede">
              BetterMate is a new display and web interface for GaggiMate. It runs on the display you already have and works with the stock GaggiMate
              controller, so you never have to reflash it.
            </p>
            <div className="hero__actions">
              <Link href="/install/" className="bm-btn bm-btn--primary bm-btn--lg">
                Install
              </Link>
              <Link href="/compare/" className="bm-btn bm-btn--lg">
                Compare screens
              </Link>
            </div>
          </div>
          <DisplayWipe screens={wipe} />
        </section>
      </div>

      <section className="band" aria-labelledby="size-title">
        <div className="wrap">
          <div className="band__head">
            <h2 className="band__title" id="size-title">
              Smaller on the display
            </h2>
            <p className="band__lede">
              The new interface takes less room than the one it replaces. Both were built from source for the same display, each with its web app
              inside, and the stock build matches the official v1.9.0 release to within 1 KB.
            </p>
          </div>
          <div className="sizes">
            {SIZES.map((s) => (
              <div className="bm-tile" key={s.label}>
                <div className="bm-stat">
                  <span className="bm-eyebrow">{s.label}</span>
                  <span className="bm-stat__row">
                    <span className="bm-stat__value">{inUnit(s.bettermate, s.unit)}</span>
                    <span className="bm-stat__unit">{s.unit}</span>
                  </span>
                  <span className="bm-stat__target">
                    {Math.round((1 - s.bettermate / s.stock) * 100)}% {s.less} than stock
                  </span>
                </div>
                {/* Both bars start at zero on one scale, the stock build's size, so the difference is drawn to size. */}
                <div className="size-bars">
                  {(
                    [
                      ["BetterMate", s.bettermate, "size-bars__bar--bettermate"],
                      ["Stock", s.stock, ""],
                    ] as const
                  ).map(([name, bytes, tone]) => (
                    <div className="size-bars__row" key={name}>
                      <span className="size-bars__name">{name}</span>
                      <span className="size-bars__track">
                        <span
                          className={`size-bars__bar ${tone}`}
                          style={{ "--f": bytes / s.stock } as React.CSSProperties}
                          aria-hidden="true"
                        />
                        <span className="size-bars__value">
                          {inUnit(bytes, s.unit)} {s.unit}
                        </span>
                      </span>
                    </div>
                  ))}
                </div>
                <p className="bm-help">{s.note}</p>
              </div>
            ))}
          </div>
          <p className="bm-help sizes__note">These are sizes, not speeds. Nothing has been timed on a real machine yet.</p>
        </div>
      </section>

      <section className="band band--desktop-only" aria-labelledby="check-title">
        <div className="wrap">
          <div className="band__head">
            <h2 className="band__title" id="check-title">
              Check your machine
            </h2>
            <p className="band__lede">
              BetterMate needs a controller on GaggiMate {SUPPORTED_LABEL}; the display can run any version, since installing replaces it. On
              your home Wi-Fi, this page can read the versions your machine runs and tell you whether it is ready.
            </p>
          </div>
          <MachineCheck loader={BetterMate.loader(20)} />
        </div>
      </section>

      <section className="band" aria-labelledby="keeps-title">
        <div className="wrap">
          <div className="band__head">
            <h2 className="band__title" id="keeps-title">
              Only the screens change
            </h2>
            <p className="band__lede">
              BetterMate replaces the parts you look at and touch: the round display and the web app. Everything that runs the machine stays
              GaggiMate&apos;s, exactly as it is.
            </p>
          </div>
          <div className="split">
            <div className="bm-tile">
              <h3 className="bm-heading">BetterMate replaces</h3>
              <ul className="checklist">
                <li>
                  <Icon name="refresh-cw" size={20} />
                  <span>The round display&apos;s interface: every screen, redrawn to be read from arm&apos;s length with a wet hand.</span>
                </li>
                <li>
                  <Icon name="refresh-cw" size={20} />
                  <span>The web app the machine serves: dashboard, profiles, shot history, settings and first-run setup.</span>
                </li>
                <li>
                  <Icon name="refresh-cw" size={20} />
                  <span>The name of the setup Wi-Fi network.</span>
                </li>
              </ul>
            </div>
            <div className="bm-tile">
              <h3 className="bm-heading">GaggiMate keeps</h3>
              <ul className="checklist">
                <li>
                  <Icon name="check" size={20} />
                  <span>The controller and its firmware, on stock v1.9.0. You never reflash it.</span>
                </li>
                <li>
                  <Icon name="check" size={20} />
                  <span>Heater, pump and valve control, and every safety limit.</span>
                </li>
                <li>
                  <Icon name="check" size={20} />
                  <span>The link between display and controller, untouched, so the controller never reports a version mismatch.</span>
                </li>
                <li>
                  <Icon name="check" size={20} />
                  <span>
                    The REST and WebSocket API, the storage keys, the <code className="code-inline">gaggimate</code> network name, MQTT topics and the
                    HomeKit name. Your integrations see the same machine.
                  </span>
                </li>
                <li>
                  <Icon name="check" size={20} />
                  <span>Stock features. A few have moved or take up less room, but the aim is to keep every one within reach.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="band" aria-labelledby="web-title">
        <div className="wrap">
          <div className="band__head">
            <h2 className="band__title" id="web-title">
              The web app, side by side
            </h2>
            <p className="band__lede">
              The app your machine serves over Wi-Fi draws the boiler the same way the display does. The next thing you can do sits in one blue
              banner, and the modes live in a bar at the bottom where your thumb can reach them. Because the app ships inside the display&apos;s
              flash, it has to stay small: the two fonts take 41 KB, the 53 icons about 3 KB, and the interface uses no images.
            </p>
          </div>
          <WebCompare views={views} />
        </div>
      </section>

      <section className="band" aria-labelledby="explore-title">
        <div className="wrap">
          <div className="band__head">
            <h2 className="band__title" id="explore-title">
              Look closer
            </h2>
          </div>
          <div className="explore">
            <Link href="/compare/" className="card-link">
              <strong>
                Compare <Icon name="chevron-right" />
              </strong>
              <span className="bm-help">{screenCount} screens, stock beside BetterMate, with what changed and what is still there.</span>
            </Link>
            <Link href="/foundations/principles/" className="card-link">
              <strong>
                Foundations <Icon name="chevron-right" />
              </strong>
              <span className="bm-help">
                {FOUNDATIONS.length} pages on colour, type, motion, content and accessibility, and the rules behind them.
              </span>
            </Link>
            <Link href="/components/" className="card-link">
              <strong>
                Components <Icon name="chevron-right" />
              </strong>
              <span className="bm-help">{components().length} components, live, with the markup that draws them.</span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}