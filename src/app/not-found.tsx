import Link from "next/link";

export default function NotFound() {
  return (
    <main id="main" className="wrap" style={{ padding: "var(--space-16) var(--gutter)" }}>
      <h1 className="page-title">No page here</h1>
      <p className="lede">The address may have changed. Start from the overview, or compare the screens.</p>
      <p style={{ display: "flex", gap: "var(--space-3)", marginTop: "var(--space-8)" }}>
        <Link href="/" className="bm-btn bm-btn--ink">
          Overview
        </Link>
        <Link href="/compare/" className="bm-btn">
          Compare
        </Link>
      </p>
    </main>
  );
}
