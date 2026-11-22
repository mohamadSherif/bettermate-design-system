import Link from "next/link";
import { groupsBySection } from "@/lib/site";
import { MobileMenu } from "./MobileMenu";
import { ThemeSwitch } from "./ThemeSwitch";
import { TopNav } from "./TopNav";
import { Wordmark } from "./Wordmark";

export function TopBar() {
  return (
    <header className="top">
      <div className="top__inner">
        <Link href="/" className="top__brand" aria-label="BetterMate, overview">
          <Wordmark />
        </Link>
        <TopNav />
        <div className="top__end">
          <ThemeSwitch />
          <a
            href="https://github.com/531dev/bettermate"
            className="bm-btn bm-btn--icon bm-btn--quiet top__github"
            aria-label="BetterMate on GitHub"
            title="GitHub"
            target="_blank"
            rel="noopener noreferrer"
          >
            {/* The GitHub mark. It is a brand logo, so it stays outside the stroke icon set. */}
            <svg viewBox="0 0 24 24" width={20} height={20} fill="currentColor" aria-hidden="true">
              <path d="M12 .3a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2c-3.3.7-4-1.6-4-1.6-.6-1.4-1.4-1.8-1.4-1.8-1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.8 1.3 3.5 1 0-.8.4-1.3.7-1.6-2.7-.3-5.5-1.3-5.5-6 0-1.2.5-2.3 1.3-3.1-.2-.4-.6-1.6 0-3.2 0 0 1-.3 3.4 1.2a11.5 11.5 0 0 1 6 0c2.3-1.5 3.3-1.2 3.3-1.2.6 1.6.2 2.8 0 3.2.9.8 1.3 1.9 1.3 3.2 0 4.6-2.8 5.6-5.5 5.9.5.4.9 1 .9 2.2v3.3c0 .3.1.7.8.6A12 12 0 0 0 12 .3" />
            </svg>
          </a>
          <MobileMenu groupsBySection={groupsBySection()} />
        </div>
      </div>
    </header>
  );
}
