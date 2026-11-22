/* Reads the firmware versions from a GaggiMate on the visitor's network and says whether BetterMate fits it.

   The machine reports its versions over the WebSocket its own web app uses: send `req:ota-settings`, get back
   `res:ota-settings` with `displayVersion` and `controllerVersion`. Every release since v1.5.0 answers it the same way.
   A plain HTTP request cannot do this: /settings/system is an empty app shell, and the REST API sends no CORS headers. */

/* BetterMate speaks link protocol 5, which only GaggiMate v1.9 controllers speak. Change this when that changes. */
export const SUPPORTED = { major: 1, minor: 9 };
export const SUPPORTED_LABEL = `v${SUPPORTED.major}.${SUPPORTED.minor}`;
export const SUPPORTED_RELEASE = "https://github.com/jniebuhr/gaggimate/releases/tag/v1.9.0";
export const DEFAULT_HOST = "gaggimate.local";

export type Version = { major: number; minor: number; patch: number; raw: string };
export type Fit = "ok" | "old" | "new" | "unknown";
export type Reading = { display: string; controller: string };

/* Accepts what the machine and its System page show: "v1.9.0", "1.9", and builds such as "v1.9.0-12-gabc123-dirty". */
export function parseVersion(text: string): Version | null {
  const m = text.trim().match(/^v?(\d+)\.(\d+)(?:\.(\d+))?/i);
  if (!m) return null;
  return { major: +m[1], minor: +m[2], patch: m[3] ? +m[3] : 0, raw: text.trim() };
}

export function fit(text: string): Fit {
  const v = parseVersion(text);
  if (!v) return "unknown";
  if (v.major === SUPPORTED.major && v.minor === SUPPORTED.minor) return "ok";
  return v.major < SUPPORTED.major || (v.major === SUPPORTED.major && v.minor < SUPPORTED.minor) ? "old" : "new";
}

export type Probe = { kind: "found"; reading: Reading } | { kind: "blocked" } | { kind: "unreachable" };

/* Safari and Firefox refuse a ws:// connection from an https:// page and throw at once ("blocked"). Chromium lets
   it through for .local names and private IP addresses, after the visitor allows local network access. Anything
   else that fails, a wrong name, another network or a machine that is off, ends as "unreachable". Looking up a .local
   name took about 5 s on macOS against a real machine (the exchange itself takes 0.5 s), hence the long wait. */
export function probe(host: string, timeoutMs = 10000): Promise<Probe> {
  return new Promise((resolve) => {
    let ws: WebSocket;
    try {
      ws = new WebSocket(`ws://${host}/ws`);
    } catch {
      resolve({ kind: "blocked" });
      return;
    }
    let done = false;
    const finish = (result: Probe) => {
      if (done) return;
      done = true;
      clearTimeout(timer);
      ws.onopen = ws.onmessage = ws.onerror = ws.onclose = null;
      try {
        ws.close();
      } catch {}
      resolve(result);
    };
    const timer = setTimeout(() => finish({ kind: "unreachable" }), timeoutMs);
    ws.onopen = () => ws.send(JSON.stringify({ tp: "req:ota-settings" }));
    ws.onmessage = (e) => {
      try {
        const m = JSON.parse(String(e.data));
        if (m?.tp !== "res:ota-settings") return;
        finish({ kind: "found", reading: { display: String(m.displayVersion ?? ""), controller: String(m.controllerVersion ?? "") } });
      } catch {}
    };
    ws.onerror = ws.onclose = () => finish({ kind: "unreachable" });
  });
}

/* Chrome 145 asks for "local-network"; Chrome 142 to 144 called it "local-network-access". Other browsers know neither. */
export async function localNetworkPermission(): Promise<PermissionState | "unknown"> {
  for (const name of ["local-network", "local-network-access"]) {
    try {
      return (await navigator.permissions.query({ name } as unknown as PermissionDescriptor)).state;
    } catch {}
  }
  return "unknown";
}
