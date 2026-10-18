import Link from "next/link";
import { hasStfData } from "@/lib/stf";

/** Chamada para a seção "Supremo" na home (quando há dados coletados). */
export function StfPromo() {
  if (!hasStfData()) return null;
  return (
    <section aria-labelledby="stf-promo" className="border border-border border-t-[3px] border-t-foreground bg-surface p-5">
      <p className="label-mono text-muted">Supremo</p>
      <h2 id="stf-promo" className="mt-2 font-display text-xl font-bold leading-tight tracking-tight">
        Quem são os ministros do STF e o que está na pauta
      </h2>
      <p className="mt-2 text-sm leading-relaxed text-muted">Uma página para cada ministro, julgamentos pesquisáveis com a fonte oficial e a agenda da semana.</p>
      <div className="mt-4 flex flex-wrap gap-2">
        <Link href="/stf" className="inline-flex h-9 items-center bg-foreground px-3.5 text-xs font-semibold text-background">
          Ministros
        </Link>
        <Link href="/stf/julgamentos" className="inline-flex h-9 items-center border border-foreground px-3.5 text-xs font-semibold">
          Julgamentos
        </Link>
        <Link href="/stf/agenda" className="inline-flex h-9 items-center border border-foreground px-3.5 text-xs font-semibold">
          Agenda
        </Link>
      </div>
    </section>
  );
}
