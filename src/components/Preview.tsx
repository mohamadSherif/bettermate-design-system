"use client";

import { useEffect, useRef, useState } from "react";

/* A component's live preview: its own page in a frame, sized to its content and following the site's theme. */
export function Preview({ name, title, height }: { name: string; title: string; height: number }) {
  const frame = useRef<HTMLIFrameElement>(null);
  const [h, setH] = useState(height);

  useEffect(() => {
    const el = frame.current;
    if (!el) return;
    let observer: ResizeObserver | undefined;
    const attach = () => {
      const body = el.contentDocument?.body;
      if (!body) return;
      observer?.disconnect();
      const measure = () => setH(Math.ceil(body.getBoundingClientRect().height));
      observer = new ResizeObserver(measure);
      observer.observe(body);
      measure();
    };
    el.addEventListener("load", attach);
    if (el.contentDocument?.readyState === "complete") attach();
    return () => {
      el.removeEventListener("load", attach);
      observer?.disconnect();
    };
  }, []);

  return <iframe ref={frame} className="example__frame" src={`/previews/${name}.html`} title={`${title}, live example`} style={{ height: h }} loading="lazy" />;
}
