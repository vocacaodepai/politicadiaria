"use client";

import Script from "next/script";
import { useEffect } from "react";
import { useConsent } from "@/lib/consent";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

/**
 * Google Analytics 4 com Modo de Consentimento v2 (modo avançado).
 * O gtag carrega para todo visitante, começando com tudo negado (sem cookies).
 * Quando o visitante escolhe no aviso, mandamos um `consent update`.
 * Assim o GA detecta a tag e recebe sinais sem cookie de quem não aceitou.
 */
export function GoogleAnalytics({ id }: { id: string | undefined }) {
  const consent = useConsent();

  useEffect(() => {
    if (!id || !consent || typeof window.gtag !== "function") return;
    const v = consent.ads ? "granted" : "denied";
    window.gtag("consent", "update", {
      ad_storage: v,
      ad_user_data: v,
      ad_personalization: v,
      analytics_storage: v,
    });
  }, [id, consent]);

  if (!id) return null;

  const init = `window.dataLayer=window.dataLayer||[];window.gtag=function(){dataLayer.push(arguments);};
gtag('consent','default',{ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',analytics_storage:'denied',wait_for_update:500});
try{var c=JSON.parse(localStorage.getItem('pd-consent')||'null');if(c&&c.version===1&&typeof c.ads==='boolean'){var v=c.ads?'granted':'denied';gtag('consent','update',{ad_storage:v,ad_user_data:v,ad_personalization:v,analytics_storage:v});}}catch(e){}
gtag('js',new Date());gtag('config','${id}');`;

  return (
    <>
      <Script id="ga4-init" strategy="afterInteractive">
        {init}
      </Script>
      <Script
        id="ga4-src"
        src={`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(id)}`}
        strategy="afterInteractive"
      />
    </>
  );
}
