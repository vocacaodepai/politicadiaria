import { ctaLabel, productHref } from "@/lib/review";
import type { ReviewData } from "@/lib/types";
import { BuyButton } from "./BuyButton";

/** "Resumo em 30 segundos": os 3 pontos do artigo e o segundo botão de compra. */
export function ReviewSummary({ points, review }: { points?: string[]; review: ReviewData }) {
  if (!points || points.length === 0) return null;
  return (
    <section aria-labelledby="resumo-30s" className="rounded-r-xl border-l-4 border-accent bg-surface-2 p-5 sm:p-6">
      <h2 id="resumo-30s" className="label-mono text-accent">
        Resumo em 30 segundos
      </h2>
      <ul className="mt-3 space-y-2.5">
        {points.map((p, i) => (
          <li key={i} className="flex gap-3 text-[15px] leading-relaxed sm:text-base">
            <span className="mt-0.5 shrink-0 font-mono text-xs font-semibold text-accent">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span>{p}</span>
          </li>
        ))}
      </ul>
      <BuyButton href={productHref(review)} label={ctaLabel(review)} className="mt-5" />
    </section>
  );
}
