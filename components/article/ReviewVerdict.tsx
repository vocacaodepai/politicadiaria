import Link from "next/link";
import type { ReviewData } from "@/lib/types";

function barClass(score: number): string {
  if (score >= 7) return "bg-success";
  if (score >= 5) return "bg-warn";
  return "bg-danger";
}

function scoreClass(score: number): string {
  if (score >= 7) return "text-success";
  if (score >= 5) return "text-warn";
  return "text-danger";
}

/**
 * Veredito do review no topo do corpo: nota, barras por critério, prós e
 * contras, para quem é, preço e o botão para o site da ferramenta.
 */
export function ReviewVerdict({ review }: { review: ReviewData }) {
  const rel = review.affiliate ? "sponsored nofollow noopener" : "nofollow noopener";
  const scoreText = review.score.toFixed(1);
  return (
    <section aria-labelledby="veredito" className="overflow-hidden rounded-xl border border-border bg-surface">
      <div className="grid gap-8 p-6 sm:p-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        <div>
          <p className="label-mono text-accent">Veredito</p>
          <h2 id="veredito" className="mt-1 font-display text-2xl font-bold tracking-tight">
            {review.tool}
          </h2>
          <p className="mt-1 text-sm text-muted">
            {review.bookAuthor}
            {review.publisher ? ` · ${review.publisher}` : ""}
            {review.year ? ` · ${review.year}` : ""}
            {review.pages ? ` · ${review.pages} páginas` : ""}
          </p>
          <p className="mt-4 flex items-baseline gap-1 font-mono">
            <span className={`text-5xl font-semibold leading-none tracking-tight sm:text-6xl ${scoreClass(review.score)}`}>
              {scoreText}
            </span>
            <span className="text-base text-muted">/10</span>
          </p>
          <dl className="mt-6 space-y-3">
            {review.criteria.map((c) => {
              const pct = Math.max(0, Math.min(100, Math.round(c.score * 10)));
              return (
                <div key={c.label}>
                  <div className="flex items-center justify-between gap-3 font-mono text-xs">
                    <dt className="text-muted">{c.label}</dt>
                    <dd className="font-semibold">{c.score.toFixed(1)}</dd>
                  </div>
                  <div
                    className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-surface-2"
                    role="img"
                    aria-label={`${c.label}: ${c.score.toFixed(1)} de 10`}
                  >
                    <div className={`h-full rounded-full ${barClass(c.score)}`} style={{ width: `${pct}%` }} />
                  </div>
                </div>
              );
            })}
          </dl>
        </div>

        <div className="flex flex-col gap-6">
          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <h3 className="label-mono text-success">Prós</h3>
              <ul className="mt-2 space-y-2 text-sm leading-snug">
                {review.pros.map((p, i) => (
                  <li key={i} className="flex gap-2">
                    <span aria-hidden="true" className="shrink-0 font-mono font-bold text-success">
                      ✓
                    </span>
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="label-mono text-danger">Contras</h3>
              <ul className="mt-2 space-y-2 text-sm leading-snug">
                {review.cons.map((c, i) => (
                  <li key={i} className="flex gap-2">
                    <span aria-hidden="true" className="shrink-0 font-mono font-bold text-danger">
                      ✗
                    </span>
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <dl className="grid gap-3 rounded-lg border border-border bg-background p-4 text-sm sm:grid-cols-[auto_1fr] sm:gap-x-5">
            <dt className="label-mono self-start pt-0.5 text-muted">Ideal para</dt>
            <dd className="leading-snug">{review.bestFor}</dd>
            <dt className="label-mono self-start pt-0.5 text-muted">Preço</dt>
            <dd className="font-mono text-sm font-semibold">{review.price}</dd>
          </dl>
          <a
            href={review.url}
            target="_blank"
            rel={rel}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-accent px-5 py-3 font-display text-sm font-semibold text-accent-foreground transition hover:opacity-90"
          >
            {review.ctaLabel ?? "Ver o livro na Amazon"} <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>
      <p className="flex flex-wrap gap-x-4 gap-y-1 border-t border-border bg-surface-2 px-6 py-3 font-mono text-[11px] text-muted sm:px-8">
        <span>Resenha editorial baseada na obra, na ficha da edição e em fontes públicas</span>
        {review.affiliate && <span>Pode conter links de afiliado</span>}
      </p>
    </section>
  );
}

/** Aviso curto de transparência exibido em todo review. */
export function ReviewDisclosure({ affiliate = false }: { affiliate?: boolean }) {
  return (
    <aside
      aria-label="Transparência"
      className="mt-6 rounded-xl border border-border border-l-4 border-l-warn bg-surface p-4 text-sm leading-relaxed text-muted sm:p-5"
    >
      <span className="label-mono block text-warn">Transparência</span>
      <p className="mt-1.5">
        Esta resenha é independente: nenhuma editora, autor ou partido leu, revisou ou aprovou o texto antes da publicação.{" "}
        {affiliate
          ? "Alguns links desta página são de afiliado. Se você comprar por eles, a Política Diária pode receber uma comissão, sem custo extra para você, e isso não muda a nota nem a opinião. "
          : "Não há links de afiliado nesta página. "}
        Saiba mais em{" "}
        <Link href="/publicidade-e-afiliados" className="font-medium text-accent hover:underline">
          publicidade e afiliados
        </Link>
        .
      </p>
    </aside>
  );
}
