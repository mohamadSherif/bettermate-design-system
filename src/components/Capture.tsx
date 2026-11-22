import Image from "next/image";
import sizes from "@/content/captures.json";

/* A capture copied in by the sync script, at its real size so the page never jumps while it loads. */
export function Capture({ src, alt, sizes: sizesAttr, priority }: { src: string; alt: string; sizes?: string; priority?: boolean }) {
  const size = (sizes as Record<string, { w: number; h: number }>)[src];
  if (!size) throw new Error(`No capture at ${src}; run npm run sync`);
  return <Image src={src} alt={alt} width={size.w} height={size.h} sizes={sizesAttr} priority={priority} />;
}
