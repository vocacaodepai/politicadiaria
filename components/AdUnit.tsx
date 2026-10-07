"use client";

import { useEffect, useRef } from "react";
import { useConsent } from "@/lib/consent";

declare global {
  interface Window {
    adsbygoogle?: unknown[] & { requestNonPersonalizedAds?: number };
  }
}

export type AdFormat = "leaderboard" | "rectangle" | "in-article" | "anchor";

const MIN_HEIGHT: Record<AdFormat, number> = {
  leaderboard: 90,
  rectangle: 250,
  "in-article": 280,
  anchor: 50,
};

export function AdUnit({
  client,
  slot,
  format,
  className = "",
}: {
  client: string;
  slot: string;
  format: AdFormat;
  className?: string;
}) {
  const pushed = useRef(false);
  const consent = useConsent();

  useEffect(() => {
    if (!consent || pushed.current) return;
    pushed.current = true;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {
      // bloqueador de anúncios ou script ainda não carregado: ignora
    }
  }, [consent]);

  // Antes da escolha de cookies o script nem carrega: não reserva espaço nem rotula.
  if (!consent) return null;

  return (
    <aside
      className={`w-full bg-surface-2/60 ${className}`}
      style={{ minHeight: MIN_HEIGHT[format] + 18 }}
      aria-label="Publicidade"
    >
      <span className="label-mono block px-1 pb-1 text-muted">Publicidade</span>
      <ins
        className="adsbygoogle"
        style={{ display: "block", minHeight: MIN_HEIGHT[format] }}
        data-ad-client={client}
        data-ad-slot={slot}
        data-ad-format={format === "in-article" ? "fluid" : "auto"}
        data-ad-layout={format === "in-article" ? "in-article" : undefined}
        data-full-width-responsive="true"
      />
    </aside>
  );
}
