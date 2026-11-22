"use client";

import { useEffect, useId, useState } from "react";
import {
  DEFAULT_HOST,
  SUPPORTED_LABEL,
  SUPPORTED_RELEASE,
  fit,
  localNetworkPermission,
  parseVersion,
  probe,
  type Fit,
  type Probe,
  type Reading,
} from "@/lib/machine";
import { Icon } from "./Icon";

type Stage =
  | { s: "checking"; host: string }
  | { s: "ask" } // Chromium, before the visitor has allowed local network access
  | { s: "found"; host: string; reading: Reading }
  | { s: "notfound"; host: string }
  | { s: "blocked" } // Safari and Firefox, or a name Chromium will not treat as local
  | { s: "denied" };

const CHIP: Record<Fit, { label: string; tone: string }> = {
  ok: { label: "Ready", tone: "bm-chip--success" },
  old: { label: "Too old", tone: "bm-chip--warning" },
  new: { label: "Too new", tone: "bm-chip--warning" },
  unknown: { label: "Unknown", tone: "" },
};

const cleanHost = (text: string) =>
  text
    .trim()
    .replace(/^[a-z]+:\/\//i, "")
    .replace(/\/.*$/, "") || DEFAULT_HOST;

/* A visitor who blocks Chrome's prompt also ends as "unreachable", so ask again before blaming the network. */
const look = async (host: string): Promise<Stage> => {
  const r: Probe = await probe(host);
  if (r.kind === "found") return { s: "found", host, reading: r.reading };
  if (r.kind === "blocked") return { s: "blocked" };
  return (await localNetworkPermission()) === "denied" ? { s: "denied" } : { s: "notfound", host };
};

/* Finds the visitor's machine and says whether BetterMate fits it. Where the browser cannot reach the machine, the
   visitor types the two versions from its System & Updates page instead. */
export function MachineCheck({ loader }: { loader: string }) {
  const [stage, setStage] = useState<Stage>({ s: "checking", host: DEFAULT_HOST });
  const [manual, setManual] = useState(false);
  const [host, setHost] = useState(DEFAULT_HOST);
  const [typed, setTyped] = useState("");
  const id = useId();

  const check = (target: string) => {
    setStage({ s: "checking", host: target });
    look(target).then(setStage);
  };

  /* Only look straight away when it cannot raise a prompt: a site that asks for the network the moment it opens gets Blocked. */
  useEffect(() => {
    let live = true;
    localNetworkPermission().then((p) => {
      if (!live) return;
      if (p === "prompt") setStage({ s: "ask" });
      else if (p === "denied") setStage({ s: "denied" });
      else
        look(DEFAULT_HOST).then((next) => {
          if (live) setStage(next);
        });
    });
    return () => {
      live = false;
    };
  }, []);

  const showForm = manual || stage.s === "notfound" || stage.s === "blocked" || stage.s === "denied";
  const reading: Reading | null =
    stage.s === "found" ? stage.reading : showForm && parseVersion(typed) ? { controller: typed, display: "" } : null;
  const bad = typed.trim() !== "" && !parseVersion(typed);
  const systemPage = `http://${stage.s === "found" || stage.s === "notfound" ? stage.host : host}/settings/system`;

  return (
    <div className="bm-tile machine">
      <Status stage={stage} loader={loader} onFind={() => check(host)} onManual={manual ? undefined : () => setManual(true)} systemPage={systemPage} />

      {stage.s === "notfound" && (
        <form
          className="machine__host"
          onSubmit={(e) => {
            e.preventDefault();
            const h = cleanHost(host);
            setHost(h);
            check(h);
          }}
        >
          <label className="bm-field">
            <span className="bm-field__label">Machine name or address</span>
            <input className="bm-input" value={host} onChange={(e) => setHost(e.target.value)} autoComplete="off" spellCheck={false} />
          </label>
          <button className="bm-btn" type="submit">
            Try again
          </button>
        </form>
      )}

      {showForm && stage.s !== "found" && (
        <div className="machine__manual">
          <p className="bm-help">
            Or enter the controller version from your machine. It is under{" "}
            <a className="bm-link bm-link--inline" href={systemPage} target="_blank" rel="noreferrer">
              Settings, System &amp; Updates
            </a>
            .
          </p>
          <div className="machine__fields">
            <label className="bm-field">
              <span className="bm-field__label">Controller version</span>
              <input
                className="bm-input"
                value={typed}
                placeholder="v1.9.0"
                autoComplete="off"
                spellCheck={false}
                aria-invalid={bad || undefined}
                aria-describedby={bad ? `${id}-controller` : undefined}
                onChange={(e) => setTyped(e.target.value)}
              />
              {bad && (
                <span className="bm-field__msg bm-field__msg--error" id={`${id}-controller`}>
                  <Icon name="circle-alert" size={14} />
                  Enter it as it is shown, like v1.9.0.
                </span>
              )}
            </label>
          </div>
        </div>
      )}

      {reading && <Result reading={reading} found={stage.s === "found"} onAgain={stage.s === "found" ? () => check(stage.host) : undefined} />}
    </div>
  );
}

function Status({ stage, loader, onFind, onManual, systemPage }: { stage: Stage; loader: string; onFind: () => void; onManual?: () => void; systemPage: string }) {
  switch (stage.s) {
    case "checking":
      return (
        <div className="bm-notice" role="status">
          <span className="bm-notice__icon" dangerouslySetInnerHTML={{ __html: loader }} />
          <div className="bm-notice__body">
            <span className="bm-notice__title">Looking for {stage.host}</span>
            <span className="bm-notice__text">This can take up to 10 seconds.</span>
          </div>
        </div>
      );
    case "ask":
      return (
        <div className="bm-notice bm-notice--info">
          <span className="bm-notice__icon">
            <Icon name="wifi" size={20} />
          </span>
          <div className="bm-notice__body">
            <span className="bm-notice__title">Find your machine</span>
            <span className="bm-notice__text">
              On the same Wi-Fi as your machine, this page can read its versions. Your browser will ask to let it reach devices on your network.
            </span>
            <div className="bm-notice__actions">
              <button className="bm-btn bm-btn--outline" type="button" onClick={onFind}>
                Find my machine
              </button>
              {onManual && (
                <button className="bm-btn bm-btn--ghost" type="button" onClick={onManual}>
                  Enter versions instead
                </button>
              )}
            </div>
          </div>
        </div>
      );
    case "notfound":
      return (
        <div className="bm-notice bm-notice--warning" role="status">
          <span className="bm-notice__icon">
            <Icon name="triangle-alert" size={20} />
          </span>
          <div className="bm-notice__body">
            <span className="bm-notice__title">No machine found at {stage.host}</span>
            <span className="bm-notice__text">
              Check that this device is on the same Wi-Fi as the machine and that the machine is on. If you renamed it, enter its name or IP address.
            </span>
          </div>
        </div>
      );
    case "blocked":
      return (
        <div className="bm-notice" role="status">
          <span className="bm-notice__icon">
            <Icon name="info" size={20} />
          </span>
          <div className="bm-notice__body">
            <span className="bm-notice__title">This browser cannot reach your machine</span>
            <span className="bm-notice__text">
              It does not let websites talk to devices on your network. Chrome and Edge can, or you can enter the versions below.
            </span>
          </div>
        </div>
      );
    case "denied":
      return (
        <div className="bm-notice" role="status">
          <span className="bm-notice__icon">
            <Icon name="info" size={20} />
          </span>
          <div className="bm-notice__body">
            <span className="bm-notice__title">Local network access is off for this site</span>
            <span className="bm-notice__text">
              Allow it in your browser&apos;s site settings and reload, or{" "}
              <a className="bm-link bm-link--inline" href={systemPage} target="_blank" rel="noreferrer">
                open your machine
              </a>{" "}
              and enter the versions below.
            </span>
          </div>
        </div>
      );
    case "found":
      return null;
  }
}

function Result({ reading, found, onAgain }: { reading: Reading; found: boolean; onAgain?: () => void }) {
  /* Only the controller decides. Installing replaces the display's firmware, so any version there will do. */
  const controller = fit(reading.controller);
  const parts = [
    { name: "Controller", icon: "settings", version: reading.controller, chip: CHIP[controller] },
    ...(found ? [{ name: "Display", icon: "monitor", version: reading.display, chip: { label: "Any version", tone: "" } }] : []),
  ];
  const noController = found && reading.controller.trim() === "";

  return (
    <>
      <div className="bm-list status-list">
        {parts.map((p) => (
          <div className="bm-item" key={p.name}>
            <span className="bm-item__icon">
              <Icon name={p.icon} size={20} />
            </span>
            <span className="bm-item__body">
              <span className="bm-item__title">{p.name}</span>
              <span className="bm-item__meta">{p.version.trim() || "Not connected"}</span>
            </span>
            <span className={`bm-chip ${p.chip.tone}`}>{p.chip.label}</span>
          </div>
        ))}
      </div>

      <Verdict noController={noController} controller={controller} onAgain={onAgain} />
    </>
  );
}

function Verdict({ noController, controller, onAgain }: { noController: boolean; controller: Fit; onAgain?: () => void }) {
  const again = onAgain && (
    <button className="bm-btn bm-btn--ghost" type="button" onClick={onAgain}>
      Check again
    </button>
  );

  if (noController)
    return (
      <div className="bm-notice bm-notice--warning" role="status">
        <span className="bm-notice__icon">
          <Icon name="triangle-alert" size={20} />
        </span>
        <div className="bm-notice__body">
          <span className="bm-notice__title">The controller did not answer</span>
          <span className="bm-notice__text">The display is on, but it has no controller version to report. Check that the controller is powered and connected.</span>
          <div className="bm-notice__actions">{again}</div>
        </div>
      </div>
    );

  if (controller === "new")
    return (
      <div className="bm-notice bm-notice--warning" role="status">
        <span className="bm-notice__icon">
          <Icon name="triangle-alert" size={20} />
        </span>
        <div className="bm-notice__body">
          <span className="bm-notice__title">The controller is newer than BetterMate supports</span>
          <span className="bm-notice__text">
            BetterMate works with a controller on GaggiMate {SUPPORTED_LABEL} only. Later releases changed how the display and controller talk to
            each other, and BetterMate does not support that yet. Put the controller back on{" "}
            <a className="bm-link bm-link--inline" href={SUPPORTED_RELEASE} target="_blank" rel="noreferrer">
              GaggiMate v1.9.0
            </a>{" "}
            first.
          </span>
          {again && <div className="bm-notice__actions">{again}</div>}
        </div>
      </div>
    );

  if (controller === "old")
    return (
      <div className="bm-notice bm-notice--info" role="status">
        <span className="bm-notice__icon">
          <Icon name="download" size={20} />
        </span>
        <div className="bm-notice__body">
          <span className="bm-notice__title">Put the controller on GaggiMate {SUPPORTED_LABEL} first</span>
          <span className="bm-notice__text">
            Use the {SUPPORTED_LABEL} release files for the controller, not Check for updates: the machine&apos;s updater installs the newest release, which BetterMate
            cannot use yet.
          </span>
          <div className="bm-notice__actions">
            <a className="bm-btn bm-btn--outline" href={SUPPORTED_RELEASE} target="_blank" rel="noreferrer">
              GaggiMate {SUPPORTED_LABEL}
            </a>
            {again}
          </div>
        </div>
      </div>
    );

  return (
    <div className="bm-notice bm-notice--success" role="status">
      <span className="bm-notice__icon">
        <Icon name="check" size={20} />
      </span>
      <div className="bm-notice__body">
        <span className="bm-notice__title">Ready for BetterMate</span>
        <span className="bm-notice__text">
          The controller is on {SUPPORTED_LABEL}, so BetterMate can go straight onto the display, whatever version it runs now.
        </span>
        <div className="bm-notice__actions">
          <a className="bm-btn bm-btn--outline" href="/install/#install">
            Install BetterMate
          </a>
          {again}
        </div>
      </div>
    </div>
  );
}
