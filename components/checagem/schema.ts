import { checagemPath, checagemUpdated, verdictMeta } from "@/lib/checagens";
import { absoluteUrl, metaDescription } from "@/lib/seo";
import { authorLd, publisherLd } from "@/lib/structured-data";
import type { FactCheck } from "@/lib/types";

/**
 * JSON-LD ClaimReview (schema.org) de uma checagem. Segue o que a Google pede para
 * "Fact Check": claimReviewed, reviewRating com nota e texto, url, autor e data.
 * A alegação não leva link (não amplificamos o boato); as fontes entram em `citation`.
 *
 * Mapeamento do veredito (factCheckVerdicts, lib/types.ts) para reviewRating, escala de 1 a 5
 * (worstRating 1 = falso, bestRating 5 = verdadeiro). O número vem de `verdictMeta.ratingValue`
 * (lib/checagens-meta.ts) e alternateName é o rótulo exibido na página:
 *
 *   veredito           ratingValue  alternateName
 *   falso              1            "Falso"
 *   enganoso           2            "Enganoso"
 *   fora-de-contexto   2            "Fora de contexto"
 *   sem-provas         3            "Sem provas"
 *   verdadeiro         5            "Verdadeiro"
 *
 * Não há veredito com nota 4 ("verdadeiro, mas"): a escala fica aberta a ele sem mudar os demais.
 * Se um veredito novo entrar em factCheckVerdicts, o Record de verdictMeta obriga a dar a nota.
 */
export function claimReviewJsonLd(c: FactCheck) {
  const url = absoluteUrl(checagemPath(c.slug));
  const meta = verdictMeta[c.verdict];
  return {
    "@context": "https://schema.org",
    "@type": "ClaimReview",
    "@id": `${url}#claimreview`,
    url,
    name: c.title,
    description: metaDescription(c.summary),
    datePublished: c.date,
    dateModified: checagemUpdated(c),
    inLanguage: "pt-BR",
    claimReviewed: c.claim.text,
    author: authorLd(c.author),
    publisher: publisherLd,
    reviewRating: {
      "@type": "Rating",
      ratingValue: meta.ratingValue,
      bestRating: 5,
      worstRating: 1,
      alternateName: meta.label,
    },
    itemReviewed: {
      "@type": "Claim",
      author: { "@type": "Organization", name: c.claim.attribution },
      ...(c.claim.firstSeen ? { datePublished: c.claim.firstSeen } : {}),
    },
    citation: c.sources.map((s) => ({
      "@type": "CreativeWork",
      name: s.label,
      url: s.url,
      publisher: { "@type": "Organization", name: s.publisher },
    })),
  };
}
