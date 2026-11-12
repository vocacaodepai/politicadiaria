import type { MetadataRoute } from "next";
import { INSTITUTIONAL_PATHS, INSTITUTIONAL_UPDATED } from "@/components/InstitutionalPage";
import { ARTICLES_PER_PAGE, NEWS_PER_PAGE, countPages, slicePage } from "@/components/listing/paginate";
import { categories, getArticlesByCategory, getReviews, site, sortedArticles } from "@/lib/articles";
import { author } from "@/lib/author";
import { checagemUrls } from "@/lib/checagens";
import { congressUrls } from "@/lib/congress";
import { congressExtraUrls } from "@/lib/congress-extra";
import { eleicoesUrls } from "@/lib/eleicoes";
import { historiaUrls, historyPeriods } from "@/lib/historia";
import { sortedNews } from "@/lib/news";
import { promessasUrls } from "@/lib/promessas";
import { getResumo, resumoDays, resumoPath, RESUMO_PATH } from "@/lib/resumo";
import { TEMAS_PATH, temaPath, temas } from "@/lib/temas";
import { newsToTimeline } from "@/lib/timeline";
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

  const ferramentas: Entry[] = [
    { url: absoluteUrl("/ferramentas"), lastModified: newestArticle, changeFrequency: "weekly", priority: 0.7 },
  ];

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

  const congresso: Entry[] = [...congressUrls(), ...congressExtraUrls()].map((u) => ({
    url: absoluteUrl(u.path),
    lastModified: u.lastModified,
    changeFrequency: "weekly",
    priority: u.priority,
  }));

  const eleicoes: Entry[] = eleicoesUrls().map((u) => ({
    url: absoluteUrl(u.path),
    lastModified: u.lastModified,
    changeFrequency: "daily",
    priority: u.priority,
  }));

  const checagem: Entry[] = checagemUrls().map((u) => ({
    url: absoluteUrl(u.path),
    lastModified: u.lastModified,
    changeFrequency: "weekly",
    priority: u.priority,
  }));

  const historiaPages: Entry[] = historiaUrls(historyPeriods).map((u) => ({
    url: absoluteUrl(u.path),
    lastModified: u.lastModified,
    changeFrequency: "weekly",
    priority: u.priority,
  }));

  const promessas: Entry[] = promessasUrls().map((u) => ({
    url: absoluteUrl(u.path),
    lastModified: u.lastModified,
    changeFrequency: "weekly",
    priority: u.priority,
  }));

  const days = resumoDays();
  const acompanhamento: Entry[] = [
    { url: absoluteUrl("/hoje"), lastModified: newestNews, changeFrequency: "hourly", priority: 0.8 },
    { url: absoluteUrl(TEMAS_PATH), lastModified: newest(temas.map((t) => (t.last ? newsToTimeline(t.last).day : ""))), changeFrequency: "daily", priority: 0.7 },
    ...temas.map((t): Entry => ({
      url: absoluteUrl(temaPath(t.slug)),
      lastModified: t.last ? newsToTimeline(t.last).day : undefined,
      changeFrequency: "daily",
      priority: 0.7,
    })),
    { url: absoluteUrl(RESUMO_PATH), lastModified: days[0], changeFrequency: "daily", priority: 0.5 },
    ...days.filter((d) => getResumo(d)).map((d, i): Entry => ({
      url: absoluteUrl(resumoPath(d)),
      lastModified: d,
      changeFrequency: i === 0 ? "hourly" : "yearly",
      priority: 0.4,
    })),
  ];

  return [
    ...home,
    ...acompanhamento,
    ...artigos,
    ...noticias,
    ...reviews,
    ...categorias,
    ...autor,
    ...institucionais,
    ...artigoPages,
    ...noticiaPages,
    ...congresso,
    ...eleicoes,
    ...ferramentas,
    ...checagem,
    ...historiaPages,
    ...promessas,
  ];
}
