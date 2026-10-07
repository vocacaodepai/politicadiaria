import Link from "next/link";
import { CoverImage } from "@/components/CoverImage";
import { site } from "@/lib/articles";
import { newsImageSeed, newsPopularity, type NewsItem } from "@/lib/news";
import { formatTime } from "@/lib/seo";

function shortDate(iso: string) {
  return new Date(`${iso}T12:00:00-03:00`).toLocaleDateString("pt-BR", {
    timeZone: "America/Sao_Paulo",
    day: "2-digit",
    month: "short",
  });
}

/**
 * Linha de notícia: data em mono à esquerda, título forte, fonte abaixo.
 * Quando a notícia tem `imageQuery`, mostra uma miniatura (mesma cascata de
 * capa real do CoverImage); sem ela, mantém a linha só com texto (padrão
 * antigo, preservado pras notícias sem imagem).
 */
export async function NewsRow({
  item,
  showDate = true,
  headingLevel = "h3",
}: {
  item: NewsItem;
  showDate?: boolean;
  headingLevel?: "h2" | "h3";
}) {
  const Heading = headingLevel;
  const time = formatTime(item.publishedAt);
  const dateLabel = time ? `${shortDate(item.date)} · ${time}` : shortDate(item.date);
  return (
    <article
      data-news-row
      data-topic={item.topic ?? "geral"}
      data-date={item.publishedAt ?? item.date}
      data-popularity={newsPopularity(item.slug)}
      className="group flex gap-4 border-b border-border py-3.5 last:border-b-0"
    >
      {item.imageQuery && (
        <Link href={`/noticias/${item.slug}`} className="block shrink-0 self-start">
          <CoverImage
            query={item.imageQuery}
            seed={newsImageSeed(item.slug)}
            alt=""
            showCredit={false}
            className="h-14 w-20 rounded-lg sm:h-16 sm:w-24"
          />
        </Link>
      )}
      {showDate && !item.imageQuery && (
        <time
          dateTime={item.publishedAt ?? item.date}
          className="w-20 shrink-0 pt-0.5 font-mono text-[11px] uppercase tracking-wider text-muted"
        >
          {dateLabel}
        </time>
      )}
      <div className="min-w-0">
        {showDate && item.imageQuery && (
          <time
            dateTime={item.publishedAt ?? item.date}
            className="font-mono text-[11px] uppercase tracking-wider text-muted"
          >
            {dateLabel}
          </time>
        )}
        <Heading className="font-display text-[15px] font-semibold leading-snug">
          <Link href={`/noticias/${item.slug}`} className="transition group-hover:text-accent">
            {item.title}
          </Link>
        </Heading>
        <p className="mt-1 font-mono text-[11px] text-muted">via {site.name}</p>
      </div>
    </article>
  );
}

export function NewsList({
  items,
  columns = 1,
  headingLevel = "h3",
}: {
  items: NewsItem[];
  columns?: 1 | 2;
  headingLevel?: "h2" | "h3";
}) {
  return (
    <div data-news-rows className={columns === 2 ? "grid gap-x-10 md:grid-cols-2" : ""}>
      {items.map((n) => (
        <NewsRow key={n.slug} item={n} headingLevel={headingLevel} />
      ))}
    </div>
  );
}
