import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/Container";
import { Breadcrumbs } from "@/components/article/Breadcrumbs";
import { JsonLd } from "@/components/article/JsonLd";
import { Timeline } from "@/components/hoje/Timeline";
import { site } from "@/lib/articles";
import { isResumoDay, resumoPath } from "@/lib/resumo";
import { TEMAS_PATH } from "@/lib/temas";
import { dayLabel, dayLabelWithWeekday, timelineToday } from "@/lib/timeline";
import { absoluteUrl, alternatesFor, breadcrumbJsonLd } from "@/lib/seo";

/*
 * Geração: o conteúdo (notícias e checagens) entra no código a cada publicação,
 * e cada publicação já gera um deploy na Vercel, que reconstrói esta página.
 * O que muda sem deploy é o dia corrente: à meia-noite de Brasília a página
 * precisa trocar de dia. Por isso ela é estática com ISR de 10 minutos: no
 * máximo 10 minutos depois da virada do dia, a próxima visita já recebe o dia novo.
 */
export const revalidate = 600;

const TITLE = "O que aconteceu hoje";

const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
const DESCRIPTION =
  "Linha do tempo das notícias e checagens publicadas hoje na Política Diária, em ordem cronológica inversa, com hora, tópico e link para cada texto.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: alternatesFor("/hoje"),
  openGraph: { type: "website", url: absoluteUrl("/hoje"), title: TITLE, description: DESCRIPTION, siteName: site.name, locale: site.locale },
};

export default function HojePage() {
  const { today, day, isToday, items } = timelineToday();
  const noticias = items.filter((i) => i.kind === "noticia").length;
  const checagens = items.length - noticias;

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Início", path: "/" },
          { name: TITLE, path: "/hoje" },
        ])}
      />
      <Container className="pb-20 pt-8 sm:pt-10">
        <div className="mx-auto max-w-3xl">
          <Breadcrumbs items={[{ name: "Início", href: "/" }, { name: TITLE }]} />
          <header className="mt-6 border-b-[3px] border-double border-foreground pb-5">
            <p className="label-mono text-accent">Linha do tempo</p>
            <h1 className="mt-2 font-display text-4xl font-black leading-[1.05] tracking-tight sm:text-5xl">{TITLE}</h1>
            <p className="mt-3 font-serif text-lg text-muted">
              {capitalize(dayLabelWithWeekday(day))}, horário de Brasília. Mais
              recentes primeiro.
            </p>
          </header>

          {!isToday && (
            <div className="mt-6 border border-border border-l-4 border-l-accent-2 bg-surface-2 px-4 py-3">
              <p className="label-mono text-muted">Aviso</p>
              <p className="mt-1 font-serif text-base">
                Ainda não há publicações em {dayLabel(today)}. Abaixo, o que saiu em {dayLabel(day)}.
              </p>
            </div>
          )}

          {items.length > 0 ? (
            <>
              <p className="mt-6 text-sm text-muted">
                {noticias} {noticias === 1 ? "notícia" : "notícias"}
                {checagens > 0 && ` e ${checagens} ${checagens === 1 ? "checagem" : "checagens"}`}
              </p>
              <div className="mt-4">
                <Timeline items={items} />
              </div>
            </>
          ) : (
            <p className="mt-8 font-serif text-lg">Ainda não há publicações.</p>
          )}

          <nav aria-label="Mais formas de acompanhar" className="mt-10 grid gap-3 border-t border-foreground pt-5 sm:grid-cols-3">
            {isResumoDay(day) && (
              <Link href={resumoPath(day)} className="text-sm font-bold text-accent hover:underline">
                Resumo do dia por tópico →
              </Link>
            )}
            <Link href={TEMAS_PATH} className="text-sm font-bold text-accent hover:underline">
              Temas acompanhados →
            </Link>
            <Link href="/noticias" className="text-sm font-bold text-accent hover:underline">
              Todas as notícias →
            </Link>
          </nav>
        </div>
      </Container>
    </>
  );
}
