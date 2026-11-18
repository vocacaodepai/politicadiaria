import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/Container";
import { Breadcrumbs } from "@/components/article/Breadcrumbs";
import { JsonLd } from "@/components/article/JsonLd";
import { site } from "@/lib/articles";
import { TEMAS_PATH, temaPath, temas } from "@/lib/temas";
import { dayLabel, newsToTimeline } from "@/lib/timeline";
import { absoluteUrl, alternatesFor, breadcrumbJsonLd } from "@/lib/seo";

const TITLE = "Siga este tema";
const DESCRIPTION =
  "Casos acompanhados pela Política Diária ao longo de vários dias, com todas as notícias de cada tema reunidas em ordem cronológica.";

export const metadata: Metadata = {
  title: "Temas: siga os casos em ordem cronológica",
  description: DESCRIPTION,
  alternates: alternatesFor(TEMAS_PATH),
  openGraph: { type: "website", url: absoluteUrl(TEMAS_PATH), title: TITLE, description: DESCRIPTION, siteName: site.name, locale: site.locale },
};

export default function TemasPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Início", path: "/" },
          { name: "Temas", path: TEMAS_PATH },
        ])}
      />
      <Container className="pb-20 pt-8 sm:pt-10">
        <div className="mx-auto max-w-4xl">
          <Breadcrumbs items={[{ name: "Início", href: "/" }, { name: "Temas" }]} />
          <header className="mt-6 border-b-[3px] border-double border-foreground pb-5">
            <p className="label-mono text-accent">Temas</p>
            <h1 className="mt-2 font-display text-4xl font-black leading-[1.05] tracking-tight sm:text-5xl">{TITLE}</h1>
            <p className="mt-3 max-w-2xl font-serif text-lg text-muted">{DESCRIPTION}</p>
          </header>

          <ul className="mt-2">
            {temas.map((t) => (
              <li key={t.slug} className="border-b border-border py-6">
                <p className="label-mono text-muted">
                  {t.items.length} {t.items.length === 1 ? "notícia" : "notícias"}
                  {t.last && ` · atualizado em ${dayLabel(newsToTimeline(t.last).day)}`}
                </p>
                <h2 className="mt-1 font-display text-2xl font-bold leading-tight sm:text-3xl">
                  <Link href={temaPath(t.slug)} className="transition hover:text-accent">
                    {t.titulo}
                  </Link>
                </h2>
                <p className="mt-2 line-clamp-3 font-serif text-base leading-relaxed text-foreground/85">{t.descricao}</p>
                {t.last && (
                  <p className="mt-3 text-sm">
                    <span className="label-mono text-accent">Mais recente</span>{" "}
                    <Link href={`/noticias/${t.last.slug}`} className="font-semibold hover:text-accent">
                      {t.last.title}
                    </Link>
                  </p>
                )}
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </>
  );
}
