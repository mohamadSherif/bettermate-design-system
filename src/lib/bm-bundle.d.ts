/* Types for the generated BetterMate drawing bundle (src/lib/bm-bundle.js). Every function returns an SVG or HTML string. */
type Tone = "heat" | "primary" | "ink" | "faint";
type Arc = [number, number, Tone];

interface BetterMateBundle {
  icon(name: string, size?: number, className?: string): string;
  icons: string[];
  ring(props: { left?: Arc; right?: Arc; full?: Arc }): string;
  face(props: { s: string; [key: string]: unknown }): string;
  segbar(on: number, total: number, target?: number): string;
  loader(size?: number): string;
  chart(props: Record<string, unknown>): string;
  chartKey(key: "pressure" | "temperature" | "flow" | "weight"): string;
}

declare const BetterMate: BetterMateBundle;
export default BetterMate;
