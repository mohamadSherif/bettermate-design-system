import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/next";
import "@/styles/tokens.css";
import "@/styles/bundle.css";
import "./globals.css";
import { TopBar } from "@/components/TopBar";

export const metadata: Metadata = {
  title: { default: "BetterMate: a new face for GaggiMate", template: "%s · BetterMate" },
  description:
    "BetterMate replaces the GaggiMate display and web interface and keeps the stock controller. Compare every screen and explore the design system.",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#e9e9e9" },
    { media: "(prefers-color-scheme: dark)", color: "#212121" },
  ],
};

/* Applies a chosen Light or Dark theme before the first paint; System leaves the attribute off. */
const THEME = `try{var t=localStorage.getItem("bm-theme");if(t==="light"||t==="dark")document.documentElement.setAttribute("data-theme",t)}catch(e){}`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME }} />
      </head>
      <body>
        <a className="skip" href="#main">
          Skip to content
        </a>
        <TopBar />
        {children}
        <footer className="foot">
          <div className="foot__inner bm-help">
            <p>
              BetterMate is a fork of{" "}
              <a className="bm-link bm-link--inline" href="https://github.com/jniebuhr/gaggimate">
                GaggiMate
              </a>{" "}
              that replaces its display and web interface. The machine logic, the controller and its safety are GaggiMate&apos;s. Licensed CC BY-NC-SA
              4.0, the same as GaggiMate.
            </p>
            <p>Fonts: Funnel Display and Geist Mono, SIL Open Font License.</p>
          </div>
        </footer>
        <Analytics />
      </body>
    </html>
  );
}
