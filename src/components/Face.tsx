import BetterMate from "@/lib/bm-bundle";

/* A screen of the round display, drawn at build time by the design system's own bundle, in Display black. */
export function Face({ label, className, ...props }: { label: string; className?: string; s: string; [key: string]: unknown }) {
  const svg = BetterMate.face(props as { s: string }).replace(/aria-label="[^"]*"/, `aria-label="${label.replace(/"/g, "&quot;")}"`);
  return <div className={className ? `face ${className}` : "face"} data-theme="amoled" dangerouslySetInnerHTML={{ __html: svg }} />;
}
