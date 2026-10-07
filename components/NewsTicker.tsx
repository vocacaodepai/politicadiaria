import Link from "next/link";
import { sortedNews } from "@/lib/news";
import { NewsTickerShell } from "./NewsTickerShell";

function shortDate(iso: string) {
  return new Date(iso + "T12:00:00").toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "short",
  });
}

/** Faixa "Últimas" com as notícias mais recentes rolando (pausa no hover). */
export function NewsTicker({ limit = 8 }: { limit?: number }) {
  const items = sortedNews().slice(0, limit);
  if (items.length === 0) return null;
  const track = [...items, ...items]; // duplicado para o loop ser contínuo

  return (
    <div className="border-b border-border bg-ink text-ink-foreground">
      <div className="mx-auto flex h-9 w-full max-w-7xl items-center px-4 sm:px-6 lg:px-8">
        <Link
          href="/noticias"
          className="label-mono mr-4 flex shrink-0 items-center gap-2 text-white hover:text-accent"
        >
          <span className="pulse-dot inline-block h-1.5 w-1.5 rounded-full bg-success" aria-hidden="true" />
          Últimas
        </Link>
        <NewsTickerShell>
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-8 bg-gradient-to-r from-ink to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-8 bg-gradient-to-l from-ink to-transparent" />
          <ul className="ticker-track flex w-max items-center gap-8 whitespace-nowrap">
            {track.map((n, i) => (
              <li key={`${n.slug}-${i}`} aria-hidden={i >= items.length}>
                <Link
                  href={`/noticias/${n.slug}`}
                  tabIndex={i >= items.length ? -1 : 0}
                  className="text-[13px] text-ink-foreground/90 hover:text-white"
                >
                  <span className="mr-2 font-mono text-[11px] text-accent">{shortDate(n.date)}</span>
                  {n.title}
                  <span className="ml-8 text-ink-foreground/30" aria-hidden="true">
                    {"//"}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </NewsTickerShell>
      </div>
    </div>
  );
}
