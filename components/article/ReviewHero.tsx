import type { ReactNode } from "react";
import { productHref, reviewVerdict } from "@/lib/review";
import type { ReviewData } from "@/lib/types";
import { BuyButton } from "./BuyButton";
import { ProductImage } from "./ProductImage";

/**
 * Abertura da resenha com a foto real do livro e a caixa "Onde comprar".
 * Só entra quando há `review.productImage`; sem ela, a página mostra a capa de sempre.
 * `fallback` é a capa por imageQuery/gradiente, exibida no lugar da foto se o CDN falhar.
 */
export function ReviewHero({ review, fallback }: { review: ReviewData; fallback: ReactNode }) {
  const image = review.productImage;
  if (!image) return null;
  const href = productHref(review);
  return (
    <div className="mt-8 grid max-w-3xl gap-6 sm:grid-cols-[220px_minmax(0,1fr)] sm:items-start">
      <div className="mx-auto w-44 sm:mx-0 sm:w-full">
        <ProductImage
          image={image}
          href={href}
          priority
          sizes="(max-width: 640px) 176px, 220px"
          fallback={fallback}
        />
      </div>
      <aside aria-labelledby="onde-comprar" className="rounded-xl border border-border bg-surface p-5 sm:p-6">
        <p className="label-mono text-accent">Onde comprar</p>
        <h2 id="onde-comprar" className="mt-1 font-display text-xl font-bold leading-snug tracking-tight">
          {review.tool}
        </h2>
        <p className="mt-1 text-sm text-muted">
          {review.bookAuthor}
          {review.publisher ? ` · ${review.publisher}` : ""}
          {review.year ? ` · ${review.year}` : ""}
        </p>
        <p className="mt-4 flex flex-wrap items-baseline gap-x-2 font-mono">
          <span className="text-3xl font-semibold leading-none">{review.score.toFixed(1).replace(".", ",")}</span>
          <span className="text-sm text-muted">/10 · {reviewVerdict(review.score).label}</span>
        </p>
        <p className="mt-3 text-sm leading-snug">
          <span className="label-mono mr-2 text-muted">Preço</span>
          <span className="font-mono font-semibold">{review.price}</span>
        </p>
        <BuyButton href={href} label={review.ctaLabel ?? "Ver o livro na Amazon"} className="mt-5 w-full sm:w-auto" />
        <p className="mt-3 text-xs leading-relaxed text-muted">
          Preço e disponibilidade mudam na loja. A foto e o botão levam à página do livro na Amazon Brasil por
          link de afiliado.
        </p>
      </aside>
    </div>
  );
}
