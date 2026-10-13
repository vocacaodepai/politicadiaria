import Link from "next/link";
import { Container } from "@/components/Container";
import { checagemPath, latestChecagens, verdictMeta } from "@/lib/checagens";

/** Faixa da home com as últimas checagens. */
export function ChecagemStrip() {
  const items = latestChecagens(3);
  if (items.length === 0) return null;
  return (
    <Container as="section" className="mt-12" aria-label="Checagem">
      <div className="flex items-baseline justify-between border-b-[3px] border-foreground pb-2">
        <h2 className="font-display text-2xl font-black sm:text-3xl">Checagem</h2>
        <Link href="/checagem" className="label-mono text-accent hover:underline">Ver todas</Link>
      </div>
      <ul className="mt-4 grid gap-6 md:grid-cols-3">
        {items.map((c) => (
          <li key={c.slug} className="border-t border-border pt-3">
            <p className="label-mono text-accent">{verdictMeta[c.verdict].label} · {c.sources.length} fontes</p>
            <h3 className="mt-1 font-display text-lg font-bold leading-snug">
              <Link href={checagemPath(c.slug)} className="hover:text-accent">{c.title}</Link>
            </h3>
            <p className="mt-2 font-serif text-sm text-muted">{c.quick}</p>
          </li>
        ))}
      </ul>
    </Container>
  );
}
