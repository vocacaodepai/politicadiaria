import Link from "next/link";
import { CoverImage } from "@/components/CoverImage";
import { newsImageSeed, type NewsItem } from "@/lib/news";
import { newsTopics } from "@/lib/types";
import { formatDate } from "@/lib/seo";

function topicLabel(item: NewsItem) {
  return newsTopics.find((t) => t.slug === item.topic)?.label ?? "Notícia";
}

/**
 * Cartão de notícia guiado pela foto (estilo de home de jornal):
 * - lead: foto grande 16/9 com título grande
 * - card: foto 3/2, rótulo do tópico e título
 * - side: foto pequena à direita e título (colunas laterais)
 */
export function NewsCard({
  item,
  variant = "card",
  priority = false,
}: {
  item: NewsItem;
  variant?: "lead" | "card" | "side";
  priority?: boolean;
}) {
  const href = `/noticias/${item.slug}`;
  const photo = (cls: string) =>
    item.imageQuery ? (
      <Link href={href} tabIndex={-1} aria-hidden="true" className={`block overflow-hidden ${cls}`}>
        <CoverImage
          query={item.imageQuery}
          seed={newsImageSeed(item.slug)}
          alt=""
          priority={priority}
          showCredit={false}
          className="h-full w-full transition duration-500 group-hover:scale-[1.03]"
        />
      </Link>
    ) : null;

  if (variant === "lead") {
    return (
      <article className="group">
        {photo("aspect-[16/10] w-full")}
        <p className="label-mono mt-3 text-accent">{topicLabel(item)} · {formatDate(item.date, "short")}</p>
        <h2 className="mt-1 font-display text-3xl font-extrabold leading-[1.08] tracking-tight sm:text-[2.6rem]">
          <Link href={href} className="transition group-hover:text-accent">{item.title}</Link>
        </h2>
      </article>
    );
  }

  if (variant === "side") {
    return (
      <article className="group flex items-start gap-3 border-b border-border py-3 last:border-b-0">
        <div className="min-w-0 flex-1">
          <p className="label-mono text-accent">{topicLabel(item)}</p>
          <h3 className="mt-0.5 font-display text-base font-bold leading-snug">
            <Link href={href} className="transition group-hover:text-accent">{item.title}</Link>
          </h3>
        </div>
        {photo("h-16 w-24 shrink-0")}
      </article>
    );
  }

  return (
    <article className="group">
      {photo("aspect-[3/2] w-full")}
      <p className="label-mono mt-2.5 text-accent">{topicLabel(item)}</p>
      <h3 className="mt-0.5 font-display text-lg font-bold leading-snug">
        <Link href={href} className="transition group-hover:text-accent">{item.title}</Link>
      </h3>
    </article>
  );
}
