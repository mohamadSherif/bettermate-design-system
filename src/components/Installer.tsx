"use client";

import { useEffect, useRef, useState, useSyncExternalStore, type KeyboardEvent } from "react";
import { explain, install, release, requestPort, serialSupported, type Build, type BuildId, type Step } from "@/lib/flash";
import { Icon } from "./Icon";

type Stage = { s: "idle" } | { s: "run"; step: Step } | { s: "done"; erased: boolean } | { s: "failed"; message: string };

const SEGMENTS = 24;
const CHOICES: { id: BuildId; label: string; help: string }[] = [
  { id: "screen", label: "Screen", help: "A display with its round screen: LilyGo T-RGB, Waveshare or CO5300 AMOLED." },
  { id: "headless", label: "Headless", help: "A display board built without a screen, run from the web app only." },
];

const subscribeNever = () => () => {};
const mb = (bytes: number) => `${(bytes / 1048576).toFixed(1)} MB`;
const sizeOf = (b: Build) => b.parts.reduce((n, p) => n + p.size, 0);

/* What is happening, how far along it is from 0 to 1, and one line of help. */
function describe(step: Step, build: Build): { title: string; fraction: number | null; help: string } {
  switch (step.s) {
    case "download":
      return { title: "Downloading", fraction: step.done / step.total, help: `${mb(step.done)} of ${mb(step.total)}, checked against the release as it arrives.` };
    case "connect":
      return { title: "Connecting to the display", fraction: null, help: "If this takes more than 30 seconds, see Troubleshooting below." };
    case "erase":
      return { title: "Erasing the display", fraction: null, help: "This takes about 20 seconds. Keep the cable in." };
    case "write": {
      const before = build.parts.slice(0, step.part - 1).reduce((n, p) => n + p.size, 0);
      const fraction = (before + build.parts[step.part - 1].size * (step.total ? step.done / step.total : 0)) / sizeOf(build);
      return { title: `Installing ${release.version}`, fraction, help: `Image ${step.part} of ${step.parts}, the ${build.parts[step.part - 1].part}. Keep the cable in.` };
    }
    case "restart":
      return { title: "Restarting the display", fraction: 1, help: "Checked. Starting BetterMate." };
  }
}

export function Installer({ loader }: { loader: string }) {
  /* Web Serial is known only in the browser: null while the page is still the static HTML. */
  const supported = useSyncExternalStore(subscribeNever, serialSupported, () => null);
  const [choice, setChoice] = useState<BuildId>("screen");
  const [erase, setErase] = useState(false);
  const [stage, setStage] = useState<Stage>({ s: "idle" });
  const build = release.builds.find((b) => b.id === choice)!;
  const running = stage.s === "run";

  /* Leaving mid-write leaves the display without a working firmware: ask first. */
  useEffect(() => {
    if (!running) return;
    const stay = (e: BeforeUnloadEvent) => e.preventDefault();
    window.addEventListener("beforeunload", stay);
    return () => window.removeEventListener("beforeunload", stay);
  }, [running]);

  const start = async () => {
    const port = await requestPort();
    if (!port) return;
    setStage({ s: "run", step: { s: "download", done: 0, total: sizeOf(build) } });
    try {
      await install(port, build, { erase, onStep: (step) => setStage({ s: "run", step }) });
      setStage({ s: "done", erased: erase });
    } catch (e) {
      setStage({ s: "failed", message: explain(e) });
    }
  };

  if (supported === false) return <Unsupported />;

  return (
    <div className="bm-tile installer">
      {stage.s === "run" ? (
        <Progress {...describe(stage.step, build)} loader={loader} />
      ) : stage.s === "done" ? (
        <Done erased={stage.erased} onAgain={() => setStage({ s: "idle" })} />
      ) : (
        <>
          {stage.s === "failed" && (
            <div className="bm-notice bm-notice--danger" role="alert">
              <span className="bm-notice__icon">
                <Icon name="circle-alert" size={20} />
              </span>
              <div className="bm-notice__body">
                <span className="bm-notice__title">The install stopped</span>
                <span className="bm-notice__text">
                  {stage.message} A display that stopped partway through can always be installed again: its USB loader is built into the chip.
                </span>
              </div>
            </div>
          )}
          <Choice value={choice} onChange={setChoice} />
          <div className="bm-setting">
            <span>
              <span className="bm-field__label" id="erase-label">
                Erase the display first
              </span>
              <p className="bm-help">Also clears its Wi-Fi and settings. Use it if the display misbehaves after installing.</p>
            </span>
            <button className="bm-switch" type="button" role="switch" aria-checked={erase} aria-labelledby="erase-label" onClick={() => setErase(!erase)} />
          </div>
          <div className="installer__go">
            <button className="bm-btn bm-btn--primary bm-btn--lg" type="button" onClick={start} disabled={supported === null}>
              <Icon name="download" size={20} />
              {stage.s === "failed" ? "Try again" : `Install ${release.version}`}
            </button>
            <p className="bm-help">
              Your browser asks which USB port the display is on, then this page downloads {mb(sizeOf(build))} and installs it.
            </p>
          </div>
        </>
      )}
    </div>
  );
}

/* A Segmented control for a setting: one Tab stop, arrow keys move and select. */
function Choice({ value, onChange }: { value: BuildId; onChange: (id: BuildId) => void }) {
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  const index = CHOICES.findIndex((c) => c.id === value);
  const move = (e: KeyboardEvent) => {
    const step = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[e.key];
    if (!step) return;
    e.preventDefault();
    const next = (index + step + CHOICES.length) % CHOICES.length;
    onChange(CHOICES[next].id);
    refs.current[next]?.focus();
  };
  return (
    <div className="installer__choice">
      <span className="bm-field__label" id="build-label">
        Your display
      </span>
      <div className="bm-seg" role="radiogroup" aria-labelledby="build-label" onKeyDown={move}>
        {CHOICES.map((c, i) => (
          <button
            key={c.id}
            ref={(el) => {
              refs.current[i] = el;
            }}
            className="bm-seg__item"
            type="button"
            role="radio"
            aria-checked={c.id === value}
            tabIndex={c.id === value ? 0 : -1}
            onClick={() => onChange(c.id)}
          >
            {c.label}
          </button>
        ))}
      </div>
      <p className="bm-help">{CHOICES[index].help}</p>
    </div>
  );
}

function Progress({ title, fraction, help, loader }: { title: string; fraction: number | null; help: string; loader: string }) {
  /* The bar is the only carrier of the figure, so it is a progressbar; its value changes at most once a second. */
  const percent = fraction === null ? null : Math.round(fraction * 100);
  const [spoken, setSpoken] = useState(percent ?? 0);
  const last = useRef(0);
  useEffect(() => {
    if (percent === null) return;
    const now = Date.now();
    if (percent === 100 || now - last.current >= 1000) {
      last.current = now;
      setSpoken(percent);
    }
  }, [percent]);

  if (percent === null)
    return (
      <div className="bm-notice" role="status">
        <span className="bm-notice__icon" dangerouslySetInnerHTML={{ __html: loader }} />
        <div className="bm-notice__body">
          <span className="bm-notice__title">{title}</span>
          <span className="bm-notice__text">{help}</span>
        </div>
      </div>
    );

  const lit = Math.round((percent / 100) * SEGMENTS);
  return (
    <div className="bm-progress">
      <div className="bm-progress__head">
        <span className="bm-sub" id="install-step">
          {title}
        </span>
        <span className="bm-data">{percent}%</span>
      </div>
      <div className="bm-segbar bm-segbar--fill" role="progressbar" aria-labelledby="install-step" aria-valuemin={0} aria-valuemax={100} aria-valuenow={spoken}>
        {Array.from({ length: SEGMENTS }, (_, i) => (
          <i key={i} className={i < lit ? "on" : ""} />
        ))}
      </div>
      <p className="bm-help">{help}</p>
    </div>
  );
}

function Done({ erased, onAgain }: { erased: boolean; onAgain: () => void }) {
  return (
    <div className="bm-notice bm-notice--success" role="status">
      <span className="bm-notice__icon">
        <Icon name="check" size={20} />
      </span>
      <div className="bm-notice__body">
        <span className="bm-notice__title">Installed {release.version}</span>
        <span className="bm-notice__text">
          Every image was read back from the display and matches the release. The display restarts into BetterMate; if its screen stays dark,
          unplug it and plug it back in.{" "}
          {erased
            ? "It was erased, so set up its Wi-Fi again from the display."
            : "It kept its Wi-Fi, so the web app is back at gaggimate.local once it has joined."}
        </span>
        <div className="bm-notice__actions">
          <button className="bm-btn bm-btn--ghost" type="button" onClick={onAgain}>
            Install another display
          </button>
        </div>
      </div>
    </div>
  );
}

function Unsupported() {
  return (
    <div className="bm-tile installer">
      <div className="bm-notice" role="status">
        <span className="bm-notice__icon">
          <Icon name="info" size={20} />
        </span>
        <div className="bm-notice__body">
          <span className="bm-notice__title">This browser cannot install firmware</span>
          <span className="bm-notice__text">
            Installing needs Web Serial, which Chrome and Edge have on a computer. Safari, Firefox and phones do not. Open this page in Chrome or
            Edge, or use esptool below.
          </span>
        </div>
      </div>
    </div>
  );
}
