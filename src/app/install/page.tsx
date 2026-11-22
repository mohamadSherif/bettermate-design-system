import type { Metadata } from "next";
import { CodeBlock } from "@/components/CodeBlock";
import { Icon } from "@/components/Icon";
import { Installer } from "@/components/Installer";
import { MachineCheck } from "@/components/MachineCheck";
import BetterMate from "@/lib/bm-bundle";
import { release } from "@/lib/flash";
import { SUPPORTED_LABEL, SUPPORTED_RELEASE } from "@/lib/machine";

export const metadata: Metadata = {
  title: "Install",
  description: `Install BetterMate ${release.version} on your GaggiMate display from the browser, over USB.`,
};

const hexOffset = (n: number) => `0x${n.toString(16)}`;
const released = new Date(release.published).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });
const screen = release.builds.find((b) => b.id === "screen")!;
const esptool = `esptool.py --chip esp32s3 write_flash 0x0 display-full.bin`;

export default function InstallPage() {
  const loader = BetterMate.loader(20);
  return (
    <main id="main">
      <div className="wrap">
        <header className="install-head">
          <p className="bm-eyebrow">
            {release.version} · Released {released}
          </p>
          <h1 className="hero__title">Install BetterMate</h1>
          <p className="lede">
            Put BetterMate on your display from this page, over a USB cable. The controller stays on stock GaggiMate{" "}
            {SUPPORTED_LABEL} and is not touched.
          </p>
        </header>

        <ol className="install-steps">
          <li className="install-step" aria-labelledby="step-check">
            <div className="install-step__head">
              <span className="install-step__n" aria-hidden="true">
                1
              </span>
              <div>
                <h2 className="bm-heading" id="step-check">
                  Check the controller
                </h2>
                <p className="bm-help">
                  BetterMate needs a controller on GaggiMate {SUPPORTED_LABEL}. On v1.10 or later it blocks brewing and says the controller is too new:
                  put it back on{" "}
                  <a className="bm-link bm-link--inline" href={SUPPORTED_RELEASE}>
                    GaggiMate v1.9.0
                  </a>{" "}
                  with GaggiMate&apos;s own tools first.
                </p>
              </div>
            </div>
            <MachineCheck loader={loader} />
          </li>

          <li className="install-step" aria-labelledby="step-backup">
            <div className="install-step__head">
              <span className="install-step__n" aria-hidden="true">
                2
              </span>
              <div>
                <h2 className="bm-heading" id="step-backup">
                  Save what you want to keep
                </h2>
                <p className="bm-help">Installing replaces the display&apos;s storage.</p>
              </div>
            </div>
            <div className="bm-notice bm-notice--warning">
              <span className="bm-notice__icon">
                <Icon name="triangle-alert" size={20} />
              </span>
              <div className="bm-notice__body">
                <span className="bm-notice__title">Your profiles and shot history will be replaced</span>
                <span className="bm-notice__text">
                  They live on the display, not the controller. Save copies of any profiles you want to keep from the web app before you start. Wi-Fi
                  and settings stay, unless you choose to erase the display.
                </span>
              </div>
            </div>
          </li>

          <li className="install-step" aria-labelledby="step-install" id="install">
            <div className="install-step__head">
              <span className="install-step__n" aria-hidden="true">
                3
              </span>
              <div>
                <h2 className="bm-heading" id="step-install">
                  Plug in the display and install
                </h2>
                <p className="bm-help">
                  Use Chrome or Edge on a computer. Connect the display&apos;s USB-C port to the computer with a cable that carries data, not one
                  for charging only.
                </p>
              </div>
            </div>
            <Installer loader={loader} />
          </li>
        </ol>
      </div>

      <section className="band" aria-labelledby="trouble-title">
        <div className="wrap">
          <div className="band__head">
            <h2 className="band__title" id="trouble-title">
              Troubleshooting
            </h2>
          </div>
          <div className="split">
            <div className="bm-tile">
              <h3 className="bm-heading">The display is not in the list</h3>
              <ul className="checklist">
                <li>
                  <Icon name="arrow-right" size={20} />
                  <span>Try another cable. Many USB-C cables only charge.</span>
                </li>
                <li>
                  <Icon name="arrow-right" size={20} />
                  <span>Plug straight into the computer, not through a hub or a monitor.</span>
                </li>
              </ul>
            </div>
            <div className="bm-tile">
              <h3 className="bm-heading">It does not connect</h3>
              <ul className="checklist">
                <li>
                  <Icon name="arrow-right" size={20} />
                  <span>Close other tabs or apps that use the port: a serial monitor, the Arduino IDE or another installer.</span>
                </li>
                <li>
                  <Icon name="arrow-right" size={20} />
                  <span>
                    Start the display in its USB loader by hand: unplug it, hold its BOOT button while you plug it back in, then let go. Install
                    again and pick the port that appears.
                  </span>
                </li>
                <li>
                  <Icon name="arrow-right" size={20} />
                  <span>A display that stopped partway through is not lost. Its USB loader is in the chip, so you can always install again.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="band" aria-labelledby="later-title">
        <div className="wrap">
          <div className="band__head">
            <h2 className="band__title" id="later-title">
              Updates after this
            </h2>
            <p className="band__lede">
              You only need the cable once. A display on BetterMate finds new releases itself, under Settings, System, and updates over Wi-Fi
              without touching your profiles or history.
            </p>
          </div>
        </div>
      </section>

      <section className="band" aria-labelledby="manual-title">
        <div className="wrap">
          <div className="band__head">
            <h2 className="band__title" id="manual-title">
              Without this page
            </h2>
            <p className="band__lede">
              Any ESP32 installer works. Download <code className="code-inline">display-full.bin</code> from the{" "}
              <a className="bm-link bm-link--inline" href={release.url}>
                {release.version} release
              </a>{" "}
              and write it at <code className="code-inline">0x0</code>, for example with esptool. The full image also erases the display&apos;s
              Wi-Fi and settings.
            </p>
          </div>
          <CodeBlock code={esptool} />
          <div className="table-wrap install-files">
            <table>
              <caption className="bm-eyebrow">The separate images this page writes, for a display with a screen</caption>
              <thead>
                <tr>
                  <th scope="col">Offset</th>
                  <th scope="col">Image</th>
                  <th scope="col">Size</th>
                </tr>
              </thead>
              <tbody>
                {screen.parts.map((p) => (
                  <tr key={p.part}>
                    <td>
                      <code className="code-inline">{hexOffset(p.offset)}</code>
                    </td>
                    <td>
                      <a className="bm-link bm-link--inline" href={p.file} download>
                        {p.file.split("/").pop()}
                      </a>
                    </td>
                    <td className="bm-data">{p.size >= 1048576 ? `${(p.size / 1048576).toFixed(1)} MB` : `${Math.round(p.size / 1024)} KB`}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </main>
  );
}
