import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/Container";
import { Breadcrumbs } from "@/components/article/Breadcrumbs";
import { JsonLd } from "@/components/article/JsonLd";
import { site } from "@/lib/articles";
import { RESUMO_PATH, getResumo, resumoDays, resumoNeighbors, resumoPath } from "@/lib/resumo";
import { dayLabel, dayLabelWithWeekday } from "@/lib/timeline";
import { absoluteUrl, alternatesFor, breadcrumbJsonLd, metaDescription } from "@/lib/seo";

type Params = Promise<{ data: string }>;

/* Um resumo por dia com notícia. Cada publicação gera um deploy, que recria o dia corrente. */
export const dynamicParams = false;

export function generateStaticParams() {
  return resumoDays().map((data) => ({ data }));
}

const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { data } = await params;
  const resumo = getResumo(data);
  if (!resumo) return {};
  const path = resumoPath(data);
  const title = `Resumo do dia ${dayLabel(data)}`;
  const n = resumo.totalNoticias;
  const description = metaDescription(
    `${n} ${n === 1 ? "notícia publicada" : "notícias publicadas"} pela Política Diária em ${dayLabel(data)}, agrupadas por tópico: ${resumo.groups.map((g) => g.label).join(", ")}.`
  );
  return {
    title,
    description,
    alternates: { ...alternatesFor(path), types: { "application/rss+xml": absoluteUrl(`${RESUMO_PATH}/feed.xml`) } },
    openGraph: { type: "website", url: absoluteUrl(path), title, description, siteName: site.name, locale: site.locale },
  };
}

export default async function ResumoPage({ params }: { params: Params }) {
  const { data } = await params;
  const resumo = getResumo(data);
  if (!resumo) notFound();
  const { prev, next } = resumoNeighbors(data);
  const path = resumoPath(data);

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Início", path: "/" },
          { name: "Resumo do dia", path: RESUMO_PATH },
          { name: dayLabel(data), path },
        ])}
      />
      <Container className="pb-20 pt-8 sm:pt-10">
        <div className="mx-auto max-w-3xl">
          <Breadcrumbs items={[{ name: "Início", href: "/" }, { name: "Resumo do dia", href: RESUMO_PATH }, { name: dayLabel(data) }]} />
          <header className="mt-6 border-b-[3px] border-double border-foreground pb-5">
            <p className="label-mono text-accent">Resumo do dia</p>
            <h1 className="mt-2 font-display text-4xl font-black leading-[1.05] tracking-tight sm:text-5xl">
              {capitalize(dayLabelWithWeekday(data))}
            </h1>
            <p className="mt-3 font-serif text-lg text-muted">
              {resumo.totalNoticias} {resumo.totalNoticias === 1 ? "notícia" : "notícias"} em {resumo.groups.length}{" "}
              {resumo.groups.length === 1 ? "tópico" : "tópicos"}
              {resumo.checagens.length > 0 &&
                ` e ${resumo.checagens.length} ${resumo.checagens.length === 1 ? "checagem" : "checagens"}`}
              . Horário de Brasília.
            </p>
            <nav aria-label="Tópicos do dia" className="mt-4 flex flex-wrap gap-x-4 gap-y-1">
              {resumo.groups.map((g) => (
                <a key={g.slug} href={`#${g.slug}`} className="label-mono text-foreground hover:text-accent">
                  {g.label} ({g.entries.length})
                </a>
              ))}
              {resumo.checagens.length > 0 && (
                <a href="#checagem" className="label-mono text-foreground hover:text-accent">
                  Checagem ({resumo.checagens.length})
                </a>
              )}
            </nav>
          </header>

          {resumo.groups.map((g) => (
            <section key={g.slug} id={g.slug} aria-labelledby={`h-${g.slug}`} className="mt-10 scroll-mt-24">
              <h2 id={`h-${g.slug}`} className="border-t-[3px] border-foreground pt-2 font-display text-2xl font-extrabold tracking-tight">
                {g.label}
              </h2>
              <ul className="mt-2">
                {g.entries.map(({ t, news }) => (
                  <li key={news.slug} className="border-b border-border py-4 last:border-b-0">
                    {t.time && (
                      <time dateTime={t.dateTime} className="text-xs font-bold tabular-nums text-muted">
                        {t.time}
                      </time>
                    )}
                    <h3 className="mt-0.5 font-display text-lg font-bold leading-snug">
                      <Link href={t.href} className="transition hover:text-accent">
                        {news.title}
                      </Link>
                    </h3>
                    <p className="mt-1 font-serif text-base leading-relaxed text-foreground/85">{news.summary}</p>
                  </li>
                ))}
              </ul>
            </section>
          ))}

          {resumo.checagens.length > 0 && (
            <section id="checagem" aria-labelledby="h-checagem" className="mt-10 scroll-mt-24">
              <h2 id="h-checagem" className="border-t-[3px] border-foreground pt-2 font-display text-2xl font-extrabold tracking-tight">
                Checagem
              </h2>
              <ul className="mt-2">
                {resumo.checagens.map((c) => (
                  <li key={c.slug} className="border-b border-border py-4 last:border-b-0">
                    {c.time && (
                      <time dateTime={c.dateTime} className="text-xs font-bold tabular-nums text-muted">
                        {c.time}
                      </time>
                    )}
                    <h3 className="mt-0.5 font-display text-lg font-bold leading-snug">
                      <Link href={c.href} className="transition hover:text-accent">
                        {c.title}
                      </Link>
                    </h3>
                  </li>
                ))}
              </ul>
            </section>
          )}

          <nav aria-label="Outros dias" className="mt-10 flex flex-wrap items-center justify-between gap-3 border-t border-foreground pt-4 text-sm">
            {prev ? (
              <Link href={resumoPath(prev)} className="font-bold text-accent hover:underline">
                ← {dayLabel(prev)}
              </Link>
            ) : (
              <span />
            )}
            <Link href={`${RESUMO_PATH}/feed.xml`} className="label-mono text-muted hover:text-accent">
              Feed RSS do resumo
            </Link>
            {next ? (
              <Link href={resumoPath(next)} className="font-bold text-accent hover:underline">
                {dayLabel(next)} →
              </Link>
            ) : (
              <span />
            )}
          </nav>
        </div>
      </Container>
    </>
  );
}
