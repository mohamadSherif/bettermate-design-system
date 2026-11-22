/* The site's logo, set in Funnel Display at the owner's request (2026-11-18) in place of the design system's
   Space Grotesk wordmark files. It keeps the files' weight split: "Better" at 600, "Mate" at 400. */
export function Wordmark() {
  return (
    <span className="logo">
      <span className="logo__better">Better</span>Mate
    </span>
  );
}
