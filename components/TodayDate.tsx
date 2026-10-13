"use client";

import { useSyncExternalStore } from "react";

function today() {
  const t = new Date().toLocaleDateString("pt-BR", {
    timeZone: "America/Sao_Paulo",
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  return t.charAt(0).toUpperCase() + t.slice(1);
}

const subscribe = () => () => {};

/** Data de hoje por extenso. Calculada no navegador para nunca ficar velha numa página estática. */
export function TodayDate({ className = "" }: { className?: string }) {
  const text = useSyncExternalStore(subscribe, today, () => "");
  return <span className={className}>{text || " "}</span>;
}
