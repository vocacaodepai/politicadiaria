import Link from "next/link";
import { latestTimeline, shortDay } from "@/lib/timeline";

/**
 * Bloco compacto da home: as 5 publicações mais recentes (notícias e checagens),
 * com hora, tópico e link para /hoje. A home é gerada a cada deploy (cada
 * publicação gera um deploy), por isso o bloco mostra hora e data absolutas,
 * que não envelhecem quando o dia vira.
 */
export function HojeBlock({ limit = 5 }: { limit?: number }) {
  const items = latestTimeline(limit);
  if (items.length === 0) return null;
  return (
    <section aria-labelledby="hoje-no-pd" className="mx-auto mt-10 w-full max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="flex items-baseline justify-between gap-4 border-b-[3px] border-foreground pb-2">
        <h2 id="hoje-no-pd" className="font-display text-xl font-black sm:text-2xl">
          Hoje no Política Diária
        </h2>
        <Link href="/hoje" className="label-mono shrink-0 text-accent hover:underline">
          Linha do tempo →
        </Link>
      </div>
      <ol className="grid sm:grid-cols-2 lg:grid-cols-5">
        {items.map((i) => (
          <li
            key={`${i.kind}-${i.slug}`}
            className="border-b border-border py-3 sm:pr-4 lg:border-b-0 lg:border-r lg:px-4 lg:first:pl-0 lg:last:border-r-0 lg:last:pr-0"
          >
            <p className="flex flex-wrap items-baseline gap-x-2 text-xs">
              <time dateTime={i.dateTime} className="font-bold tabular-nums text-foreground">
                {i.time ? `${i.time} · ${shortDay(i.day)}` : shortDay(i.day)}
              </time>
              <span className={`label-mono ${i.kind === "checagem" ? "text-accent-2" : "text-accent"}`}>{i.topicLabel}</span>
            </p>
            <h3 className="mt-1 font-display text-[15px] font-bold leading-snug">
              <Link href={i.href} className="transition hover:text-accent">
                {i.title}
              </Link>
            </h3>
          </li>
        ))}
      </ol>
    </section>
  );
}
