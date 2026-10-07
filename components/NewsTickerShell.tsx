"use client";

import { useState } from "react";

/** Casca interativa do ticker: botão de pausa acessível e pausa ao toque. */
export function NewsTickerShell({ children }: { children: React.ReactNode }) {
  const [paused, setPaused] = useState(false);
  return (
    <>
      <button
        type="button"
        aria-pressed={paused}
        onClick={() => setPaused((p) => !p)}
        className="label-mono mr-3 shrink-0 text-ink-foreground/60 transition hover:text-white"
      >
        {paused ? "Retomar" : "Pausar"}
        <span className="sr-only"> rolagem das últimas notícias</span>
      </button>
      <div
        className="ticker relative flex-1 overflow-hidden"
        role="region"
        aria-label="Últimas notícias"
        data-paused={paused || undefined}
        onTouchStart={() => setPaused(true)}
      >
        {children}
      </div>
    </>
  );
}
