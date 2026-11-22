import set from "@/content/design/icons.json";

const paths: Record<string, string> = set.paths;

/* One of the system's 53 stroke glyphs, drawn exactly as the bundle draws them. */
export function Icon({ name, size = 24, className }: { name: string; size?: number; className?: string }) {
  const d = paths[name] ?? paths.info;
  return (
    <svg
      className={className ? `bm-icon ${className}` : "bm-icon"}
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={d} />
    </svg>
  );
}
