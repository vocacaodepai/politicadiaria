import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/Container";
import { Breadcrumbs } from "@/components/article/Breadcrumbs";
import { JsonLd } from "@/components/article/JsonLd";
import { site } from "@/lib/articles";
import { TEMAS_PATH, getTemaBySlug, temaPath, temas } from "@/lib/temas";
import { dayLabel, newsToTimeline, topicLabel } from "@/lib/timeline";
import { absoluteUrl, alternatesFor, breadcrumbJsonLd, metaDescription } from "@/lib/seo";

type Params = Promise<{ slug: string }>;

export const dynamicParams = false;

export function generateStaticParams() {
  return temas.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const tema = getTemaBySlug(slug);
  if (!tema) return {};
  const path = temaPath(tema.slug);
  const description = metaDescription(tema.descricao);
  return {
    title: `${tema.titulo}: todas as notícias em ordem cronológica`,
    description,
    alternates: alternatesFor(path),
    openGraph: { type: "website", url: absoluteUrl(path), title: tema.titulo, description, siteName: site.name, locale: site.locale },
  };
}

export default async function TemaPage({ params }: { params: Params }) {
  const { slug } = await params;
  const tema = getTemaBySlug(slug);
  if (!tema) notFound();
  const path = temaPath(tema.slug);

  const itemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: tema.titulo,
    numberOfItems: tema.items.length,
    itemListOrder: "https://schema.org/ItemListOrderAscending",
    itemListElement: tema.items.map((n, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: n.title,
      url: absoluteUrl(`/noticias/${n.slug}`),
    })),
  };

  return (
    <>
      <JsonLd data={itemList} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Início", path: "/" },
          { name: "Temas", path: TEMAS_PATH },
          { name: tema.titulo, path },
        ])}
      />
      <Container className="pb-20 pt-8 sm:pt-10">
        <div className="mx-auto max-w-3xl">
          <Breadcrumbs items={[{ name: "Início", href: "/" }, { name: "Temas", href: TEMAS_PATH }, { name: tema.titulo }]} />
          <header className="mt-6 border-b-[3px] border-double border-foreground pb-5">
            <p className="label-mono text-accent">Siga este tema</p>
            <h1 className="mt-2 font-display text-4xl font-black leading-[1.05] tracking-tight sm:text-5xl">{tema.titulo}</h1>
            <p className="mt-4 font-serif text-lg leading-relaxed">{tema.descricao}</p>
            <p className="mt-3 text-sm text-muted">
              {tema.items.length} {tema.items.length === 1 ? "notícia" : "notícias"}
              {tema.first && tema.last && `, de ${dayLabel(newsToTimeline(tema.first).day)} a ${dayLabel(newsToTimeline(tema.last).day)}`}. Mais antiga primeiro.
            </p>
          </header>

          <ol className="mt-6 border-l-2 border-foreground">
            {tema.items.map((n, i) => {
              const t = newsToTimeline(n);
              return (
                <li key={n.slug} className="relative pb-6 pl-5 sm:pl-7">
                  <span aria-hidden="true" className="absolute -left-[5px] top-1.5 h-2 w-2 bg-foreground" />
                  <p className="flex flex-wrap items-baseline gap-x-2 text-xs">
                    <span className="font-bold tabular-nums text-muted">{i + 1}.</span>
                    <time dateTime={t.dateTime} className="font-bold tabular-nums">
                      {dayLabel(t.day)}
                      {t.time && ` · ${t.time}`}
                    </time>
                    <span className="label-mono text-accent">{topicLabel(n.topic)}</span>
                  </p>
                  <h2 className="mt-1 font-display text-xl font-bold leading-snug">
                    <Link href={`/noticias/${n.slug}`} className="transition hover:text-accent">
                      {n.title}
                    </Link>
                  </h2>
                  <p className="mt-1 font-serif text-base leading-relaxed text-muted">{n.summary}</p>
                </li>
              );
            })}
          </ol>

          <p className="mt-6 border-t border-foreground pt-4 text-sm">
            <Link href={TEMAS_PATH} className="font-bold text-accent hover:underline">
              ← Todos os temas
            </Link>
          </p>
        </div>
      </Container>
    </>
  );
}
