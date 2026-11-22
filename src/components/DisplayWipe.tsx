"use client";

import Image from "next/image";
import { useState } from "react";
import type { Shot } from "@/content/compare";

export type WipeScreen = { id: string; label: string; stock: Shot; bettermate: Shot };

/* Stock GaggiMate under BetterMate on one round face. Drag, or use the arrow keys, to move the line. */
export function DisplayWipe({ screens }: { screens: WipeScreen[] }) {
  const [pos, setPos] = useState(50);
  const [id, setId] = useState(screens[1]?.id ?? screens[0].id);
  const screen = screens.find((s) => s.id === id) ?? screens[0];

  return (
    <div className="wipe-wrap">
      <div className="wipe" style={{ "--pos": `${pos}%` } as React.CSSProperties}>
        <div className="wipe__face">
          <Image src={screen.stock.src} alt={screen.stock.alt} width={480} height={480} priority />
          <div className="wipe__after">
            <Image src={screen.bettermate.src} alt={screen.bettermate.alt} width={480} height={480} priority />
          </div>
        </div>
        {/* The line sits on the display, which is always Display black, so it takes that palette in every theme. */}
        <div className="wipe__line" data-theme="amoled" aria-hidden="true">
          <span className="wipe__knob">
            <svg className="bm-icon" viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
              <path d="m9 6-6 6 6 6M15 6l6 6-6 6" />
            </svg>
          </span>
        </div>
        <input
          className="wipe__input"
          type="range"
          min={0}
          max={100}
          step={1}
          value={pos}
          onChange={(e) => setPos(Number(e.target.value))}
          aria-label="Compare the screens: stock GaggiMate on the left, BetterMate on the right"
          aria-valuetext={`${100 - pos}% BetterMate`}
        />
      </div>
      <div className="wipe__labels">
        <span className="bm-eyebrow">Stock GaggiMate</span>
        <span className="bm-eyebrow">BetterMate</span>
      </div>
      <div className="bm-seg bm-seg--scroll" role="group" aria-label="Screen">
        {screens.map((s) => (
          <button key={s.id} type="button" className="bm-seg__item" aria-pressed={s.id === id} onClick={() => setId(s.id)}>
            {s.label}
          </button>
        ))}
      </div>
    </div>
  );
}
