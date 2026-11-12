import Link from "next/link";
import type { TimelineItem } from "@/lib/timeline";

/**
 * Linha do tempo de publicações: hora (HH:mm) à esquerda, tópico e título à
 * direita, com um filete vertical ligando os itens. Ordem: a recebida.
 */
export function Timeline({ items, headingLevel = "h2" }: { items: TimelineItem[]; headingLevel?: "h2" | "h3" }) {
  const Heading = headingLevel;
  return (
    <ol className="border-l-2 border-foreground">
      {items.map((i) => (
        <li key={`${i.kind}-${i.slug}`} className="relative grid grid-cols-[3.75rem_minmax(0,1fr)] gap-x-3 py-3 pl-4 sm:grid-cols-[4.5rem_minmax(0,1fr)] sm:gap-x-5 sm:pl-6">
          <span aria-hidden="true" className="absolute -left-[5px] top-[1.15rem] h-2 w-2 bg-foreground" />
          <time dateTime={i.dateTime} className="pt-0.5 font-sans text-sm font-bold tabular-nums text-foreground">
            {i.time || "--:--"}
          </time>
          <div className="min-w-0 border-b border-border pb-3">
            <p className={`label-mono ${i.kind === "checagem" ? "text-accent-2" : "text-accent"}`}>{i.topicLabel}</p>
            <Heading className="mt-1 font-display text-lg font-bold leading-snug sm:text-xl">
              <Link href={i.href} className="transition hover:text-accent">
                {i.title}
              </Link>
            </Heading>
          </div>
        </li>
      ))}
    </ol>
  );
}
