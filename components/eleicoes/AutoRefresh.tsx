"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

/**
 * Pede ao servidor a versão mais recente da página (que revalida a cada 30 s) enquanto a aba está
 * visível. Não mexe no layout: só troca os números. Sem JavaScript, o leitor recarrega a página.
 */
export function AutoRefresh({ seconds = 45 }: { seconds?: number }) {
  const router = useRouter();
  useEffect(() => {
    const tick = () => {
      if (document.visibilityState === "visible") router.refresh();
    };
    const id = window.setInterval(tick, seconds * 1000);
    document.addEventListener("visibilitychange", tick);
    return () => {
      window.clearInterval(id);
      document.removeEventListener("visibilitychange", tick);
    };
  }, [router, seconds]);
  return null;
}
