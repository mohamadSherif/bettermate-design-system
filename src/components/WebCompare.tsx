"use client";

import Image from "next/image";
import { useState } from "react";

type Img = { src: string; alt: string; w: number; h: number };
export type WebView = { id: string; label: string; stock: Img; bettermate: Img };

/* The web app on a desktop or a phone, stock beside BetterMate. */
export function WebCompare({ views }: { views: WebView[] }) {
  const [id, setId] = useState(views[0].id);
  const view = views.find((v) => v.id === id) ?? views[0];
  const phone = view.id === "phone";
  return (
    <div>
      <div className="web-compare__bar">
        <div className="bm-seg" role="group" aria-label="Screen size">
          {views.map((v) => (
            <button key={v.id} type="button" className="bm-seg__item" aria-pressed={v.id === id} onClick={() => setId(v.id)}>
              {v.label}
            </button>
          ))}
        </div>
      </div>
      <div className={`web-compare__shots${phone ? " web-compare__shots--phone" : ""}`}>
        {(["stock", "bettermate"] as const).map((side) => (
          <figure className="shot shot--web" key={side + view.id}>
            <figcaption>
              <span className="bm-eyebrow">{side === "stock" ? "Stock GaggiMate" : "BetterMate"}</span>
            </figcaption>
            <Image
              src={view[side].src}
              alt={view[side].alt}
              width={view[side].w}
              height={view[side].h}
              sizes={phone ? "(max-width: 599px) 45vw, 340px" : "(max-width: 899px) 100vw, 680px"}
            />
          </figure>
        ))}
      </div>
    </div>
  );
}
