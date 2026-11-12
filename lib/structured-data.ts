/**
 * Dados estruturados (JSON-LD, schema.org) das páginas de conteúdo.
 * Tudo sai dos campos que já existem em content/: nenhum campo é inventado. Quando um dado
 * não existe (imagem, ISBN, editora), a propriedade fica de fora.
 * O ClaimReview das checagens fica em components/checagem/schema.ts e usa o mesmo autor.
 */
import { site } from "@/lib/articles";
import { author } from "@/lib/author";
import { absoluteUrl, metaDescription } from "@/lib/seo";
import type { Article, NewsItem, ReviewData } from "@/lib/types";

/** Logo do site (o mesmo do Organization em app/layout.tsx). */
export const siteLogo = {
  "@type": "ImageObject",
  url: `${site.url}/logo-icon-dark.svg`,
  width: 512,
  height: 512,
} as const;

/** Publisher com logo embutido; o @id liga ao Organization global do layout. */
export const publisherLd = {
  "@type": "Organization",
  "@id": `${site.url}/#organization`,
  name: site.name,
  url: site.url,
  logo: siteLogo,
} as const;

/** Autor padrão do site como Organization ("Equipe Política Diária"). */
export const houseAuthorLd = {
  "@type": "Organization",
  name: author.name,
  url: absoluteUrl(author.url),
} as const;

/** Autor de um texto: a equipe vira Organization; outro nome declarado vira Person (sem inventar dados). */
export function authorLd(name?: string) {
  if (!name || name === author.name) return houseAuthorLd;
  return { "@type": "Person", name } as const;
}

/* ---------- Notícia ---------- */

export function newsArticleJsonLd(
  item: NewsItem,
  opts: { path: string; coverUrl?: string | null; wordCount?: number; citation?: string[] }
) {
  const url = absoluteUrl(opts.path);
  // publishedAt (com hora e offset de Brasília) quando existe; senão, a data do dia.
  const datePublished = item.publishedAt ?? item.date;
  return {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    "@id": `${url}#article`,
    headline: item.title,
    description: metaDescription(item.summary),
    // A imagem Open Graph é gerada para toda notícia; a foto de capa entra quando a cascata acha uma.
    image: [absoluteUrl(`${opts.path}/opengraph-image`), ...(opts.coverUrl ? [opts.coverUrl] : [])],
    datePublished,
    // NewsItem não tem campo de atualização: dateModified só entraria se existisse.
    author: authorLd(item.author),
    publisher: publisherLd,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    isPartOf: { "@id": `${site.url}/#website` },
    isBasedOn: item.sourceUrl,
    // Outras fontes citadas no texto (caixa "Fontes desta notícia"), além da fonte original.
    ...(opts.citation && opts.citation.length > 0 ? { citation: opts.citation } : {}),
    articleSection: "Notícias",
    keywords: item.sourceName,
    ...(opts.wordCount ? { wordCount: opts.wordCount } : {}),
    inLanguage: "pt-BR",
    url,
  };
}

/* ---------- Resenha de livro ---------- */

function isValidIsbn10(s: string): boolean {
  if (!/^\d{9}[\dX]$/.test(s)) return false;
  let sum = 0;
  for (let i = 0; i < 10; i++) sum += (s[i] === "X" ? 10 : Number(s[i])) * (10 - i);
  return sum % 11 === 0;
}

function isValidIsbn13(s: string): boolean {
  if (!/^97[89]\d{10}$/.test(s)) return false;
  let sum = 0;
  for (let i = 0; i < 13; i++) sum += Number(s[i]) * (i % 2 === 0 ? 1 : 3);
  return sum % 10 === 0;
}

/**
 * ISBN do livro a partir do link da Amazon já verificado em review.url (ou do ASIN da foto):
 * /dp/<ISBN-10> ou /s?k=<ISBN-13>. Só devolve o número se o dígito verificador conferir;
 * um ASIN que não é ISBN (ex.: B0...) fica de fora.
 */
export function isbnFromReview(review: ReviewData): string | null {
  const candidates: string[] = [];
  const dp = /\/dp\/([0-9X]{10})(?:[/?]|$)/i.exec(review.url);
  if (dp) candidates.push(dp[1].toUpperCase());
  try {
    const k = new URL(review.url).searchParams.get("k");
    if (k) candidates.push(k.replace(/[-\s]/g, "").toUpperCase());
  } catch {
    /* URL inválida: o check-content já barra */
  }
  if (review.productImage?.asin) candidates.push(review.productImage.asin.toUpperCase());
  for (const c of candidates) if (isValidIsbn10(c) || isValidIsbn13(c)) return c;
  return null;
}

export function bookReviewJsonLd(
  article: Article,
  review: ReviewData,
  opts: { url: string; offer?: { "@type": "Offer"; price: string; priceCurrency: string } | null }
) {
  const isbn = isbnFromReview(review);
  return {
    "@context": "https://schema.org",
    "@type": "Review",
    "@id": `${opts.url}#review`,
    name: article.title,
    url: opts.url,
    author: authorLd(article.author),
    publisher: publisherLd,
    datePublished: article.date,
    dateModified: article.updated ?? article.date,
    inLanguage: "pt-BR",
    itemReviewed: {
      "@type": "Book",
      name: review.tool,
      author: { "@type": "Person", name: review.bookAuthor },
      ...(isbn ? { isbn } : {}),
      ...(review.publisher ? { publisher: { "@type": "Organization", name: review.publisher } } : {}),
      ...(review.year ? { datePublished: String(review.year) } : {}),
      ...(review.pages ? { numberOfPages: review.pages } : {}),
      ...(review.productImage ? { image: review.productImage.url } : {}),
      url: review.url,
      ...(opts.offer ? { offers: opts.offer } : {}),
    },
    // Régua de components/ScoreScaleNote.tsx: 0 a 10, uma casa decimal.
    reviewRating: {
      "@type": "Rating",
      ratingValue: review.score,
      bestRating: 10,
      worstRating: 0,
    },
    reviewBody: article.excerpt,
    positiveNotes: {
      "@type": "ItemList",
      itemListElement: review.pros.map((p, i) => ({ "@type": "ListItem", position: i + 1, name: p })),
    },
    negativeNotes: {
      "@type": "ItemList",
      itemListElement: review.cons.map((c, i) => ({ "@type": "ListItem", position: i + 1, name: c })),
    },
  };
}
