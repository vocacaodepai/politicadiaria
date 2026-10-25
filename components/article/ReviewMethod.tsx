import Link from "next/link";
import { CRITERION_HELP, CRITERION_WEIGHT_PCT } from "@/lib/review";
import type { ReviewData } from "@/lib/types";

/** "Como avaliamos": nota final = média simples dos cinco critérios, 20% cada. */
export function ReviewMethod({ review }: { review: ReviewData }) {
  return (
    <section aria-labelledby="como-avaliamos" className="mt-10 rounded-xl border border-border bg-surface p-5 sm:p-6">
      <p className="label-mono text-muted">Método</p>
      <h2 id="como-avaliamos" className="mt-1 font-display text-xl font-bold tracking-tight">
        Como avaliamos
      </h2>
      <p className="mt-2 text-sm leading-relaxed text-muted">
        A nota final é a média simples de cinco critérios, todos com o mesmo peso ({CRITERION_WEIGHT_PCT}% cada),
        aplicada com a mesma régua a livros de todos os campos. A nota julga a qualidade da obra, nunca a posição
        política do autor. Veja a{" "}
        <Link href="/politica-editorial" className="font-medium text-accent hover:underline">
          política editorial
        </Link>
        .
      </p>
      <ul className="mt-4 divide-y divide-border border-y border-border text-sm">
        {review.criteria.map((c) => (
          <li key={c.label} className="flex items-start justify-between gap-4 py-2.5">
            <div className="min-w-0">
              <p className="font-medium">
                {c.label} <span className="font-mono text-xs text-muted">· peso {CRITERION_WEIGHT_PCT}%</span>
              </p>
              {CRITERION_HELP[c.label] && <p className="mt-0.5 text-xs leading-snug text-muted">{CRITERION_HELP[c.label]}</p>}
            </div>
            <span className="shrink-0 font-mono font-semibold">{c.score.toFixed(1).replace(".", ",")}</span>
          </li>
        ))}
        <li className="flex items-center justify-between gap-4 py-2.5 font-semibold">
          <span>Nota final (média)</span>
          <span className="font-mono">{review.score.toFixed(1).replace(".", ",")} / 10</span>
        </li>
      </ul>
    </section>
  );
}
