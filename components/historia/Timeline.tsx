import Link from "next/link";
import { historiaPath, type HistoriaMilestone } from "@/lib/historia-meta";
import type { HistoryArticle } from "@/lib/types";

export type TimelineItem = HistoriaMilestone & { article?: HistoryArticle };

/**
 * Linha do tempo das eleições presidenciais, da mais recente para a mais antiga.
 * Marco com artigo vira link; marco sem artigo aparece como "em breve", sem link.
 * O item "2026" (eleição em andamento) é fixo no topo e aponta para /eleicoes.
 */
export function Timeline({ items, showOngoing = false }: { items: TimelineItem[]; showOngoing?: boolean }) {
  return (
    <ol className="relative ml-2 border-l-2 border-border sm:ml-3">
      {showOngoing && (
        <li className="relative pb-6 pl-6 sm:pl-8">
          <span aria-hidden="true" className="absolute -left-[9px] top-1.5 h-4 w-4 rounded-full border-2 border-accent bg-background" />
          <p className="label-mono text-accent">2026 · em andamento</p>
          <p className="mt-1 font-display text-lg font-bold leading-snug">
            <Link href="/eleicoes" className="transition hover:text-accent">
              Eleições 2026: acompanhe o painel com os resultados do TSE
            </Link>
          </p>
          <p className="mt-1 text-sm text-muted">
            A eleição ainda está em curso, por isso o artigo de História sobre ela só sai depois da apuração e da
            diplomação. Os números atualizados estão em{" "}
            <Link href="/eleicoes" className="text-accent underline underline-offset-2">
              /eleicoes
            </Link>
            .
          </p>
        </li>
      )}
      {items.map((m) => (
        <li key={`${m.year}-${m.how}`} className="relative pb-6 pl-6 last:pb-0 sm:pl-8">
          <span
            aria-hidden="true"
            className={`absolute -left-[9px] top-1.5 h-4 w-4 rounded-full border-2 ${
              m.article ? "border-foreground bg-foreground" : "border-border bg-background"
            }`}
          />
          <p className="label-mono text-muted">
            <span className="text-foreground">{m.year}</span>
            {m.dates && <> · {m.dates}</>}
            <> · eleição {m.how}</>
          </p>
          <p className="mt-1 font-display text-lg font-bold leading-snug">
            {m.article ? (
              <Link href={historiaPath(m.article.slug)} className="transition hover:text-accent">
                {m.article.title}
              </Link>
            ) : (
              <span className="text-foreground/80">Eleição de {m.year}</span>
            )}
          </p>
          <p className="mt-0.5 text-sm text-muted">
            {m.how === "indireta" ? "Escolhido" : "Eleito"}: {m.winner}
            {m.note ? `. ${m.note}` : ""}
            {!m.article && <span className="ml-2 label-mono">em breve</span>}
          </p>
        </li>
      ))}
    </ol>
  );
}
