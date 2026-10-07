import { AdSlot } from "@/components/AdSlot";
import { Container } from "@/components/Container";
import { NewsList } from "@/components/NewsRow";
import { NewsSortControl } from "@/components/NewsSortControl";
import { NewsTopicFilter } from "@/components/NewsTopicFilter";
import { Pagination } from "@/components/Pagination";
import { Sidebar } from "@/components/Sidebar";
import type { NewsItem } from "@/lib/news";
import { newsTopics } from "@/lib/news";
import { formatDate, relativeDay } from "@/lib/seo";
import { ListingHeader } from "./ListingHeader";
import { countLabel } from "./paginate";

const NEWS_LIST_ID = "noticias-lista";

export const NEWS_TITLE = "Notícias de política nacional e internacional";
export const NEWS_DESCRIPTION =
  "O que aconteceu hoje na política do Brasil e do mundo, resumido em português claro: Congresso, governo, Justiça, eleições e relações internacionais, sempre com link para a fonte original.";

/** "Hoje · 27 de setembro de 2026", "Ontem · ..." ou só a data longa. */
function dayLabel(date: string): string {
  const rel = relativeDay(date);
  const long = formatDate(date, "long");
  if (rel === "hoje") return `Hoje · ${long}`;
  if (rel === "ontem") return `Ontem · ${long}`;
  return long;
}

/**
 * Listagem paginada de notícias agrupadas por dia, com cabeçalho de dia
 * fixo ao rolar (abaixo do header do site) e sidebar à direita.
 */
export function NewsListing({
  groups,
  total,
  page,
  totalPages,
  basePath,
  availableTopics = [],
}: {
  groups: { date: string; items: NewsItem[] }[];
  total: number;
  page: number;
  totalPages: number;
  basePath: string;
  /** Tópicos que já aparecem em alguma notícia publicada; sem nenhum, o filtro fica escondido. */
  availableTopics?: string[];
}) {
  const topicOptions = newsTopics.filter((t) => availableTopics.includes(t.slug));

  return (
    <Container className="py-10 sm:py-14">
      <ListingHeader
        label="Notícias"
        title={NEWS_TITLE}
        description={NEWS_DESCRIPTION}
        count={countLabel(total, "notícia", "notícias")}
        page={page}
        totalPages={totalPages}
      />
      {topicOptions.length > 0 && (
        <NewsTopicFilter topics={topicOptions} rootId={NEWS_LIST_ID} className="mt-8 border-y border-border py-3" />
      )}
      <NewsSortControl rootId={NEWS_LIST_ID} />
      <div id={NEWS_LIST_ID} className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div className="min-w-0">
          {groups.length === 0 && (
            <div className="rounded-xl border border-dashed border-border bg-surface p-8 text-center">
              <p className="font-display text-lg font-semibold">Nenhuma notícia nesta página</p>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                Voltamos todos os dias com o que importa na política do Brasil e do mundo.
              </p>
            </div>
          )}
          {groups.map((group, i) => (
            <section key={group.date} data-day-section aria-labelledby={`dia-${group.date}`} className="mb-8">
              <h2
                id={`dia-${group.date}`}
                className="sticky top-16 z-10 -mx-4 flex items-baseline justify-between gap-3 border-b border-border bg-background/90 px-4 py-2.5 backdrop-blur sm:mx-0 sm:px-0"
              >
                <time dateTime={group.date} className="label-mono text-foreground">
                  {dayLabel(group.date)}
                </time>
                <span className="font-mono text-[11px] text-muted">
                  {countLabel(group.items.length, "notícia", "notícias")}
                </span>
              </h2>
              <NewsList items={group.items} headingLevel="h3" />
              {i === 0 && <AdSlot format="leaderboard" className="mt-6" />}
            </section>
          ))}
          <Pagination current={page} total={totalPages} basePath={basePath} />
        </div>
        <Sidebar />
      </div>
    </Container>
  );
}
