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
          <MobileMenu groupsBySection={groupsBySection()} />
        </div>
      </div>
    </header>
  );
}
