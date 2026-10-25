import type { Coverage } from "@/lib/stf";
import { fmtDateBR } from "@/lib/stf";

/** Cobertura explícita do histórico de julgamentos e votos. */
export function CoverageBox({ c, className = "" }: { c: Coverage; className?: string }) {
  return (
    <aside aria-label="Cobertura dos dados" className={`border border-border border-l-[3px] border-l-foreground bg-surface p-4 text-sm leading-relaxed ${className}`}>
      <p className="label-mono text-muted">Cobertura</p>
      <p className="mt-1">
        {c.de && c.ate ? (
          <>
            Julgamentos de <strong>{fmtDateBR(c.de)}</strong> a <strong>{fmtDateBR(c.ate)}</strong>: {c.julgamentos} julgamentos noticiados, {c.comVotoIndividual} com voto individual descrito ({c.votosIndividuais} votos).
          </>
        ) : (
          <>Nenhum julgamento coletado nesta rodada.</>
        )}{" "}
        Fonte:{" "}
        <a href={c.fonteUrl} target="_blank" rel="noopener noreferrer" className="text-accent underline">
          {c.fonte}
        </a>
        .
      </p>
      <p className="mt-2 text-muted">{c.limite}</p>
    </aside>
  );
}
