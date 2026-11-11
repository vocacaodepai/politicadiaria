import { site } from "@/lib/articles";
import type { ReviewData, ReviewStore } from "@/lib/types";

/** Peso de cada critério na nota final: média simples dos cinco, 20% cada. */
export const CRITERION_WEIGHT_PCT = 20;

export const CRITERION_HELP: Record<string, string> = {
  Clareza: "O texto se faz entender sem exigir leitura prévia do tema?",
  Profundidade: "O livro vai além do óbvio e sustenta a tese com argumento?",
  "Rigor e fontes": "As afirmações têm base em documentos, dados e notas verificáveis?",
  Atualidade: "O conteúdo continua útil para entender o debate de hoje?",
  Leitura: "O ritmo, a edição e a tradução ajudam a chegar ao fim?",
};

/** Veredito final derivado da nota, na mesma régua de components/ScoreScaleNote.tsx. */
export function reviewVerdict(score: number): { label: string; tone: "good" | "ok" | "warn" } {
  if (score >= 9) return { label: "Leitura essencial", tone: "good" };
  if (score >= 8) return { label: "Vale muito a leitura", tone: "good" };
  if (score >= 7) return { label: "Vale a leitura", tone: "ok" };
  return { label: "Leia com ressalvas", tone: "warn" };
}

/** Loja da resenha; sem `store`, vale a Amazon (artigos antigos). */
export function reviewStore(review: Pick<ReviewData, "store">): ReviewStore {
  return review.store === "shopee" ? "shopee" : "amazon";
}

/** Nome da loja para os textos da página. */
export function storeName(store: ReviewStore): string {
  return store === "shopee" ? "Shopee" : "Amazon";
}

/** Texto do botão principal: o `ctaLabel` da resenha ou o padrão da loja. */
export function ctaLabel(review: ReviewData): string {
  return review.ctaLabel ?? (reviewStore(review) === "shopee" ? "Ver o livro na Shopee" : "Ver o livro na Amazon");
}

/**
 * Link de afiliado para a foto e o botão. Amazon: página do livro (ASIN = ISBN-10) com a tag do site.
 * Shopee: o link curto de afiliado em `review.url`, exatamente como a API devolveu.
 */
export function productHref(review: ReviewData): string {
  if (reviewStore(review) === "shopee") return review.url;
  const asin = review.productImage?.asin;
  return asin ? `https://www.amazon.com.br/dp/${asin}?tag=${site.amazonTag}` : review.url;
}

/** Garante ponto final em frases de prós/contras (que no conteúdo vêm sem). */
export function sentence(text: string): string {
  const t = text.trim();
  return /[.!?]$/.test(t) ? t : `${t}.`;
}
