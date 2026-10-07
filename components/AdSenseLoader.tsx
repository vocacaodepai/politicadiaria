"use client";

import Script from "next/script";
import { useEffect } from "react";
import { useConsent } from "@/lib/consent";

/**
 * Carrega o script do AdSense só depois da escolha de cookies. Quem recusa
 * recebe anúncios não personalizados (sem perfil de interesse).
 */
export function AdSenseLoader({ client }: { client: string | undefined }) {
  const consent = useConsent();

  useEffect(() => {
    if (!client || !consent) return;
    const queue = (window.adsbygoogle = window.adsbygoogle || []);
    if (!consent.ads) queue.requestNonPersonalizedAds = 1;
  }, [client, consent]);

  if (!client || !consent) return null;

  return (
    <Script
      id="adsense"
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${encodeURIComponent(client)}`}
      strategy="afterInteractive"
      crossOrigin="anonymous"
    />
  );
}
