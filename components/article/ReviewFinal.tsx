import { ctaLabel, productHref, reviewVerdict, sentence } from "@/lib/review";
import type { ReviewData } from "@/lib/types";
import { BuyButton } from "./BuyButton";
import { ProductImage } from "./ProductImage";

const TONE = {
  good: "text-success",
  ok: "text-accent",
  warn: "text-warn",
} as const;

/** "Veredito final": a decisão em uma caixa, derivada da nota, com a ressalva principal. */
export function ReviewFinal({ review }: { review: ReviewData }) {
  const v = reviewVerdict(review.score);
  const href = productHref(review);
  const caveat = review.cons[0];
  return (
    <section
      aria-labelledby="veredito-final"
      className="mt-10 rounded-xl border border-border border-t-4 border-t-accent bg-surface p-5 sm:p-6"
    >
      <p className="label-mono text-muted">Veredito final</p>
      <div className="mt-3 flex gap-4 sm:gap-5">
        {review.productImage && (
          <ProductImage image={review.productImage} href={href} sizes="96px" className="w-20 shrink-0 self-start sm:w-24" />
        )}
        <div className="min-w-0">
          <h2 id="veredito-final" className={`font-display text-2xl font-bold tracking-tight ${TONE[v.tone]}`}>
            {v.label}
          </h2>
          <p className="mt-1 font-mono text-sm text-muted">
            Nota {review.score.toFixed(1).replace(".", ",")} de 10
          </p>
          <p className="mt-3 text-[15px] leading-relaxed">
            <strong>Para quem é:</strong> {sentence(review.bestFor)}
          </p>
          {caveat && (
            <p className="mt-2 text-[15px] leading-relaxed">
              <strong>Principal ressalva:</strong> {sentence(caveat)}
            </p>
          )}
          <BuyButton href={href} label={ctaLabel(review)} className="mt-4" />
        </div>
      </div>
    </section>
  );
}
