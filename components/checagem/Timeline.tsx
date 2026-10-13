import { formatDate } from "@/lib/seo";

/** Linha do tempo vertical: data à esquerda, fato à direita. */
export function Timeline({ items }: { items: { date: string; text: string }[] }) {
  return (
    <ol className="relative ml-1 border-l-2 border-border pl-5">
      {items.map((t, i) => (
        <li key={`${t.date}-${i}`} className="relative pb-5 last:pb-0">
          <span aria-hidden="true" className="absolute -left-[1.62rem] top-1.5 size-2.5 border-2 border-foreground bg-background" />
          <time dateTime={t.date} className="label-mono text-muted">
            {formatDate(t.date)}
          </time>
          <p className="mt-0.5 text-[0.95rem] leading-relaxed">{t.text}</p>
        </li>
      ))}
    </ol>
  );
}
