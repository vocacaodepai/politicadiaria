import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/Container";
import { Breadcrumbs } from "@/components/article/Breadcrumbs";
import { site } from "@/lib/articles";
import { RESUMO_PATH, getResumo, resumoDays, resumoPath } from "@/lib/resumo";
import { dayLabelWithWeekday } from "@/lib/timeline";
import { absoluteUrl, alternatesFor } from "@/lib/seo";

const TITLE = "Resumo do dia";
const DESCRIPTION =
  "Todas as notícias de cada dia na Política Diária, agrupadas por tópico, com um feed RSS que traz um item por dia.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { ...alternatesFor(RESUMO_PATH), types: { "application/rss+xml": absoluteUrl(`${RESUMO_PATH}/feed.xml`) } },
  openGraph: { type: "website", url: absoluteUrl(RESUMO_PATH), title: TITLE, description: DESCRIPTION, siteName: site.name, locale: site.locale },
};

const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

export default function ResumoIndex() {
  const days = resumoDays().slice(0, 60);
  return (
    <Container className="pb-20 pt-8 sm:pt-10">
      <div className="mx-auto max-w-3xl">
        <Breadcrumbs items={[{ name: "Início", href: "/" }, { name: TITLE }]} />
        <header className="mt-6 border-b-[3px] border-double border-foreground pb-5">
          <p className="label-mono text-accent">Arquivo</p>
          <h1 className="mt-2 font-display text-4xl font-black leading-[1.05] tracking-tight sm:text-5xl">{TITLE}</h1>
          <p className="mt-3 font-serif text-lg text-muted">{DESCRIPTION}</p>
          <p className="mt-3 text-sm">
            <Link href={`${RESUMO_PATH}/feed.xml`} className="font-bold text-accent hover:underline">
              Assinar o feed RSS do resumo →
            </Link>
          </p>
        </header>
        <ul>
          {days.map((d) => {
            const r = getResumo(d);
            if (!r) return null;
            return (
              <li key={d} className="flex flex-wrap items-baseline justify-between gap-x-4 border-b border-border py-3">
                <Link href={resumoPath(d)} className="font-display text-lg font-bold hover:text-accent">
                  {capitalize(dayLabelWithWeekday(d))}
                </Link>
                <span className="text-xs text-muted">
                  {r.totalNoticias} {r.totalNoticias === 1 ? "notícia" : "notícias"}
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </Container>
  );
}
