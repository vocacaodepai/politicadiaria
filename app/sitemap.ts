import type { MetadataRoute } from "next";
import { INSTITUTIONAL_PATHS, INSTITUTIONAL_UPDATED } from "@/components/InstitutionalPage";
import { ARTICLES_PER_PAGE, NEWS_PER_PAGE, countPages, slicePage } from "@/components/listing/paginate";
import { categories, getArticlesByCategory, getReviews, site, sortedArticles } from "@/lib/articles";
import { author } from "@/lib/author";
import { congressUrls } from "@/lib/congress";
import { sortedNews } from "@/lib/news";
import { absoluteUrl } from "@/lib/seo";

export const dynamic = "force-static";

type Entry = MetadataRoute.Sitemap[number];
type Freshness = Pick<Entry, "changeFrequency" | "priority">;

/** Data de modificação de um artigo: a última revisão editorial ou a publicação. */
function articleModified(a: { date: string; updated?: string }): string {
  return a.updated ?? a.date;
}

/** Data mais recente de uma lista de datas ISO; undefined para lista vazia. */
function newest(dates: string[]): string | undefined {
  return dates.length ? dates.reduce((max, d) => (d > max ? d : max)) : undefined;
}

/**
 * Entradas de uma listagem paginada: a raiz (página 1) e /pagina/n para n >= 2,
 * com a mesma paginação das rotas. O lastModified de cada página é o item mais
 * novo daquela página (as datas chegam já ordenadas, mais recentes primeiro).
 */
function paginated(
  basePath: string,
  dates: string[],
  perPage: number,
  root: Freshness,
  page: Freshness
): Entry[] {
  const total = countPages(dates.length, perPage);
  const entries: Entry[] = [];
  for (let n = 1; n <= total; n++) {
    entries.push({
      url: absoluteUrl(n === 1 ? basePath : `${basePath}/pagina/${n}`),
      lastModified: newest(slicePage(dates, n, perPage)),
      ...(n === 1 ? root : page),
    });
  }
  return entries;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const articles = sortedArticles();
  const news = sortedNews();
  const articleDates = articles.map(articleModified);
  const newsDates = news.map((n) => n.date);
  const newestArticle = newest(articleDates);
  const newestNews = newest(newsDates);
  const newestAny = newest([newestArticle, newestNews].filter((d): d is string => Boolean(d)));

  const home: Entry[] = [
    { url: site.url, lastModified: newestAny, changeFrequency: "daily", priority: 1 },
  ];

  const artigos = paginated(
    "/artigos",
    articleDates,
    ARTICLES_PER_PAGE,
    { changeFrequency: "daily", priority: 0.9 },
    { changeFrequency: "weekly", priority: 0.5 }
  );

  const noticias = paginated(
    "/noticias",
    newsDates,
    NEWS_PER_PAGE,
    { changeFrequency: "daily", priority: 0.9 },
    { changeFrequency: "weekly", priority: 0.5 }
  );

  const reviews: Entry[] = [
    {
      url: absoluteUrl("/reviews"),
      lastModified: newest(getReviews().map(articleModified)) ?? newestArticle,
      changeFrequency: "weekly",
      priority: 0.7,
    },
  ];

  const categorias = categories.flatMap((c) =>
    paginated(
      `/categoria/${c.slug}`,
      getArticlesByCategory(c.slug).map(articleModified),
      ARTICLES_PER_PAGE,
      { changeFrequency: "daily", priority: 0.7 },
      { changeFrequency: "weekly", priority: 0.4 }
    )
  );

  const autor: Entry[] = [
    {
      url: absoluteUrl(author.url),
      lastModified: newestArticle,
      changeFrequency: "weekly",
      priority: 0.5,
    },
  ];

  const institucionais: Entry[] = INSTITUTIONAL_PATHS.map((path) => ({
    url: absoluteUrl(path),
    lastModified: INSTITUTIONAL_UPDATED,
    changeFrequency: path === "/sobre" || path === "/contato" ? "monthly" : "yearly",
    priority: path === "/sobre" ? 0.4 : 0.3,
  }));

  const artigoPages: Entry[] = articles.map((a) => ({
    url: absoluteUrl(`/artigos/${a.slug}`),
    lastModified: articleModified(a),
    changeFrequency: "weekly",
    priority: 0.8,
    images: [absoluteUrl(`/artigos/${a.slug}/opengraph-image`)],
  }));

  const noticiaPages: Entry[] = news.map((n) => ({
    url: absoluteUrl(`/noticias/${n.slug}`),
    lastModified: n.date,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const congresso: Entry[] = congressUrls().map((u) => ({
    url: absoluteUrl(u.path),
    lastModified: u.lastModified,
    changeFrequency: "weekly",
    priority: u.priority,
  }));

  return [
    ...home,
    ...artigos,
    ...noticias,
    ...reviews,
    ...categorias,
    ...autor,
    ...institucionais,
    ...artigoPages,
    ...noticiaPages,
    ...congresso,
  ];
}
