import { site } from "@/lib/articles";
import { checagemPath, checagemUpdated, verdictMeta } from "@/lib/checagens";
import { absoluteUrl, metaDescription } from "@/lib/seo";
import type { FactCheck } from "@/lib/types";

/**
 * JSON-LD ClaimReview (schema.org) de uma checagem. Segue o que a Google pede para
 * "Fact Check": claimReviewed, reviewRating com nota e texto, url, autor e data.
 * A alegação não leva link (não amplificamos o boato); as fontes entram em `citation`.
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
    author: {
      "@type": "Organization",
      name: site.name,
      url: site.url,
    },
    publisher: { "@id": `${site.url}/#organization` },
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
