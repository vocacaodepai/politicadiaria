import type { FaqItem } from "@/lib/types";

/**
 * Extrai um Offer válido do preço em texto ("US$ 20/mês", "R$ 97/mês").
 * Sem número ou sem moeda reconhecível, devolve null e a página omite offers.
 */
export function parseOffer(price: string): { "@type": "Offer"; price: string; priceCurrency: string } | null {
  const m = /(\d{1,3}(?:\.\d{3})*(?:,\d{1,2})?|\d+(?:\.\d{1,2})?)/.exec(price);
  if (!m) return null;
  const raw = m[1];
  const normalized = /,\d{1,2}$/.test(raw) ? raw.replace(/\./g, "").replace(",", ".") : raw.replace(/\.(?=\d{3}\b)/g, "");
  const value = Number(normalized);
  if (!Number.isFinite(value)) return null;
  let currency: string | null = null;
  if (/US\$|USD/i.test(price)) currency = "USD";
  else if (/R\$|BRL/i.test(price)) currency = "BRL";
  else if (/€|EUR/i.test(price)) currency = "EUR";
  else if (/£|GBP/i.test(price)) currency = "GBP";
  if (!currency) return null;
  return { "@type": "Offer", price: value.toFixed(2), priceCurrency: currency };
}

/** FAQPage a partir da lista de perguntas; null quando não há perguntas. */
export function faqJsonLd(faq?: FaqItem[]) {
  if (!faq || faq.length === 0) return null;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
}
