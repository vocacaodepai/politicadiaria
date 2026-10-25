import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/Container";
import { Breadcrumbs } from "@/components/article/Breadcrumbs";
import { JsonLd } from "@/components/article/JsonLd";
import { HistoriaCard } from "@/components/historia/HistoriaCard";
import { PeriodChips } from "@/components/historia/PeriodChips";
import { Timeline } from "@/components/historia/Timeline";
import { listingMetadata } from "@/components/listing/metadata";
import { site } from "@/lib/articles";
import {
  HISTORIA_PATH,
  IMPERIO_NOTE,
  getHistoriaByPeriod,
  getPeriod,
  historiaPath,
  historiaPeriodPath,
  historyPeriods,
  periodCounts,
  timelineEntries,
} from "@/lib/historia";
import { absoluteUrl, breadcrumbJsonLd } from "@/lib/seo";
import type { HistoryPeriod } from "@/lib/types";

type Params = Promise<{ periodo: string }>;

export function generateStaticParams() {
  return historyPeriods.map((p) => ({ periodo: p.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { periodo } = await params;
  const p = getPeriod(periodo);
  if (!p) return {};
  return listingMetadata({
    title: `${p.label} (${p.years}): eleições e história política`,
    description: `${p.description} Artigos da seção História sobre o período, com fonte e data.`,
    path: historiaPeriodPath(p.slug),
  });
}

export default async function HistoriaPeriodPage({ params }: { params: Params }) {
  const { periodo } = await params;
  const p = getPeriod(periodo);
  if (!p) notFound();

  const slug = p.slug as HistoryPeriod;
  const path = historiaPeriodPath(slug);
  const articles = getHistoriaByPeriod(slug);
  const entries = timelineEntries(slug);

  const collection = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `${p.label} (${p.years})`,
    description: p.description,
    url: absoluteUrl(path),
    inLanguage: "pt-BR",
    isPartOf: { "@id": `${site.url}/#website` },
    publisher: { "@id": `${site.url}/#organization` },
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: articles.length,
      itemListElement: articles.map((a, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: a.title,
        url: absoluteUrl(historiaPath(a.slug)),
      })),
    },
  };

  return (
    <>
      <JsonLd data={collection} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Início", path: "/" },
          { name: "História", path: HISTORIA_PATH },
          { name: p.label, path },
        ])}
      />

      <Container className="pb-20 pt-8 sm:pt-10">
        <Breadcrumbs
          items={[{ name: "Início", href: "/" }, { name: "História", href: HISTORIA_PATH }, { name: p.label }]}
        />
        <header className="mt-6 border-t-[3px] border-foreground pt-3">
          <p className="label-mono text-accent">{p.years}</p>
          <h1 className="mt-1 font-display text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl">
            {p.label}
          </h1>
          <p className="mt-3 max-w-3xl text-lg leading-relaxed text-muted">{p.description}</p>
        </header>

        <div className="mt-8">
          <PeriodChips active={slug} counts={periodCounts()} />
        </div>

        {articles.length > 0 ? (
          <section aria-labelledby="artigos" className="mt-10">
            <h2 id="artigos" className="label-mono mb-3 text-muted">
              Artigos do período
            </h2>
            <div className="grid gap-x-8 gap-y-2 md:grid-cols-2">
              {articles.map((a) => (
                <HistoriaCard key={a.slug} item={a} />
              ))}
            </div>
          </section>
        ) : (
          <p className="mt-10 border border-dashed border-border p-6 text-center text-sm text-muted">
            Ainda não há artigos publicados neste período. A seção avança de trás para frente, uma eleição ou um período
            por vez.
          </p>
        )}

        <section aria-labelledby="linha-do-tempo" className="mt-14">
          <div className="mb-6 border-t-[3px] border-foreground pt-2">
            <h2 id="linha-do-tempo" className="font-display text-2xl font-extrabold tracking-tight sm:text-3xl">
              {entries.length > 0 ? "Eleições do período" : "Sobre o período"}
            </h2>
          </div>
          {entries.length > 0 ? (
            <Timeline items={entries} showOngoing={slug === "nova-republica"} />
          ) : (
            <p className="max-w-3xl text-muted">{slug === "imperio" ? IMPERIO_NOTE : p.description}</p>
          )}
        </section>
      </Container>
    </>
  );
}
