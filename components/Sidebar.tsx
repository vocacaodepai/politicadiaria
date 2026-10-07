import Link from "next/link";
import { categories, countByCategory, getPopularArticles } from "@/lib/articles";
import { author } from "@/lib/author";
import { AdSlot } from "./AdSlot";
import { CongressPromo } from "./CongressPromo";

/** Lista numerada 01–05 de artigos em destaque (proxy editorial, sem analytics). */
export function FeaturedList({
  title = "Livros em destaque",
  limit = 5,
  exclude = [],
}: {
  title?: string;
  limit?: number;
  exclude?: string[];
}) {
  const items = getPopularArticles(limit + exclude.length)
    .filter((a) => !exclude.includes(a.slug))
    .slice(0, limit);
  const headingId = `featured-${title.normalize("NFD").replace(/[^a-zA-Z0-9]+/g, "-").toLowerCase()}`;
  return (
    <section aria-labelledby={headingId} className="rounded-xl border border-border bg-surface p-5">
      <h2 id={headingId} className="label-mono text-muted">
        {title}
      </h2>
      <ol className="mt-3 divide-y divide-border">
        {items.map((a, i) => (
          <li key={a.slug} className="flex gap-3 py-3 first:pt-0 last:pb-0">
            <span className="font-mono text-sm font-semibold text-accent">
              {String(i + 1).padStart(2, "0")}
            </span>
            <Link
              href={`/artigos/${a.slug}`}
              className="font-display text-[15px] font-semibold leading-snug transition hover:text-accent"
            >
              {a.title}
            </Link>
          </li>
        ))}
      </ol>
    </section>
  );
}

export function CategoryList() {
  const counts = countByCategory();
  return (
    <section aria-labelledby="category-list" className="rounded-xl border border-border bg-surface p-5">
      <h2 id="category-list" className="label-mono text-muted">
        Categorias
      </h2>
      <ul className="mt-3 space-y-1">
        {categories.map((c) => (
          <li key={c.slug}>
            <Link
              href={`/categoria/${c.slug}`}
              className="flex items-center justify-between rounded-lg px-2 py-1.5 text-sm transition hover:bg-surface-2"
            >
              <span className="font-medium">{c.label}</span>
              <span className="font-mono text-[11px] text-muted">{counts[c.slug]}</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function AuthorMini() {
  return (
    <section className="rounded-xl border border-border bg-surface p-5">
      <p className="label-mono text-muted">Quem escreve</p>
      <div className="mt-3 flex items-center gap-3">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={author.imageSmall}
          alt={author.name}
          width={48}
          height={48}
          loading="lazy"
          className="h-12 w-12 rounded-lg border border-border object-cover"
        />
        <p className="font-display text-base font-semibold">{author.name}</p>
      </div>
      <p className="mt-1 text-sm leading-relaxed text-muted">{author.shortBio}</p>
      <Link href={author.url} className="mt-3 inline-block font-mono text-xs font-medium text-accent hover:underline">
        Conheça a redação →
      </Link>
    </section>
  );
}

/**
 * Sidebar padrão da home e das listagens. O anúncio (se existir) fica no topo
 * e NÃO é sticky; só os blocos editoriais grudam ao rolar.
 */
export function Sidebar({
  exclude = [],
  featuredTitle = "Livros em destaque",
}: {
  exclude?: string[];
  /** Título do bloco de destaques (ex.: "Destaques" quando a página já tem outro bloco de destaque). */
  featuredTitle?: string;
}) {
  return (
    <aside className="space-y-6" aria-label="Barra lateral">
      <AdSlot format="rectangle" />
      <div className="space-y-6 lg:sticky lg:top-20">
        <CongressPromo compact />
        <FeaturedList exclude={exclude} title={featuredTitle} />
        <CategoryList />
        <AuthorMini />
      </div>
    </aside>
  );
}
