"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { CONSENT_OPEN_EVENT, useConsent, writeConsent } from "@/lib/consent";

/**
 * Aviso de cookies (LGPD). Só é montado quando há scripts de terceiros no site
 * (Google AdSense configurado). A escolha fica no localStorage do visitante e
 * o script de anúncios só carrega depois dela (ver AdSenseLoader).
 */
export function CookieConsent({ enabled }: { enabled: boolean }) {
  const consent = useConsent();
  // Reaberto pelo link "Preferências de cookies" do rodapé.
  const [forcedOpen, setForcedOpen] = useState(false);

  useEffect(() => {
    if (!enabled) return;
    function onOpen() {
      setForcedOpen(true);
    }
    window.addEventListener(CONSENT_OPEN_EVENT, onOpen);
    return () => window.removeEventListener(CONSENT_OPEN_EVENT, onOpen);
  }, [enabled]);

  // No servidor `consent` é null; o aviso só aparece depois da hidratação.
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);

  const open = enabled && mounted && (consent === null || forcedOpen);
  if (!open) return null;

  function choose(ads: boolean) {
    writeConsent(ads);
    setForcedOpen(false);
  }

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Aviso de cookies"
      className="fixed inset-x-0 bottom-0 z-50 p-3 sm:p-4"
    >
      <div className="mx-auto flex max-w-3xl flex-col gap-3 rounded-xl border border-border bg-surface p-4 text-sm shadow-2xl sm:flex-row sm:items-center sm:gap-5">
        <p className="flex-1 leading-relaxed text-foreground">
          Usamos cookies do Google Analytics para medir audiência e, quando houver anúncios, do
          Google AdSense. Você pode aceitar todos ou manter só os essenciais. Detalhes na{" "}
          <Link href="/politica-de-privacidade" className="font-medium text-accent underline">
            Política de Privacidade
          </Link>
          .
        </p>
        <div className="flex shrink-0 gap-2">
          <button
            type="button"
            onClick={() => choose(false)}
            className="h-9 rounded-lg border border-border px-3 text-sm font-medium text-foreground transition hover:bg-surface-2"
          >
            Só o essencial
          </button>
          <button
            type="button"
            onClick={() => choose(true)}
            className="h-9 rounded-lg bg-accent px-3.5 text-sm font-semibold text-accent-foreground transition hover:opacity-90"
          >
            Aceitar
          </button>
        </div>
      </div>
    </div>
  );
}
