import type { Metadata } from "next";
import Link from "next/link";
import { ArticleCard } from "@/components/ArticleCard";
import { Container } from "@/components/Container";
import { JsonLd } from "@/components/listing/JsonLd";
import { listingMetadata } from "@/components/listing/metadata";
import { countLabel } from "@/components/listing/paginate";
import { categories, countByCategory, site, sortedArticles } from "@/lib/articles";
import { author } from "@/lib/author";
import { absoluteUrl, breadcrumbJsonLd } from "@/lib/seo";

const PERSON_ID = `${site.url}/autor/equipe-editorial#person`;

export const metadata: Metadata = listingMetadata({
  title: author.name,
  description: author.bio,
  path: author.url,
  type: "profile",
});

export default function AutorPage() {
  const all = sortedArticles();
  const recent = all.slice(0, 12);
  const counts = countByCategory();

  const profile = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    url: absoluteUrl(author.url),
    name: author.name,
    inLanguage: "pt-BR",
    isPartOf: { "@id": `${site.url}/#website` },
    mainEntity: {
      "@type": "Organization",
      "@id": PERSON_ID,
      name: author.name,
      url: absoluteUrl(author.url),
      image: absoluteUrl(author.image),
      description: author.bio,
      email: author.email,
      worksFor: { "@id": `${site.url}/#organization` },
    },
  };

  return (
    <>
      <JsonLd data={profile} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Início", path: "/" },
          { name: author.name, path: author.url },
        ])}
      />
      <Container className="py-10 sm:py-14">
        <header className="grid gap-6 sm:grid-cols-[auto_1fr] sm:items-start sm:gap-8">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={author.image}
            alt={`Foto de ${author.name}`}
            width={160}
            height={160}
            fetchPriority="high"
            className="h-24 w-24 rounded-xl border border-border object-cover sm:h-40 sm:w-40"
          />
          <div className="max-w-3xl">
            <p className="label-mono text-accent">Redação</p>
            <h1 className="mt-2 font-display text-3xl font-bold leading-[1.1] tracking-tight sm:text-4xl lg:text-5xl">
              {author.name}
            </h1>
            <p className="mt-2 font-display text-base font-semibold text-muted sm:text-lg">{author.role}</p>
            <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">{author.bio}</p>
            <dl className="mt-5 flex flex-wrap gap-x-6 gap-y-2 font-mono text-xs text-muted">
              <div className="flex gap-2">
                <dt>E-mail</dt>
                <dd>
                  <a href={`mailto:${author.email}`} className="text-accent hover:underline">
                    {author.email}
                  </a>
                </dd>
              </div>
              <div className="flex gap-2">
                <dt>Artigos</dt>
                <dd>{all.length}</dd>
              </div>
            </dl>
          </div>
        </header>

        <div className="mt-12 grid gap-10 lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-12">
          <section aria-labelledby="como-produzimos" className="max-w-[68ch]">
            <p className="label-mono text-muted">Transparência</p>
            <h2 id="como-produzimos" className="mt-1 font-display text-xl font-bold tracking-tight sm:text-2xl">
              Como o conteúdo é produzido
            </h2>
            <div className="mt-4 space-y-4 text-base leading-relaxed text-muted">
              <p>
                Os textos da Política Diária partem de fontes primárias, como o Diário Oficial, a
                Câmara, o Senado, o STF, o TSE e organismos internacionais, e são escritos em
                linguagem simples, separando fato de opinião. Os dados do Congresso por dentro vêm
                dos dados abertos da Câmara e do Senado. Ferramentas de apoio podem ajudar na
                organização do rascunho, mas a pauta, a checagem das fontes e a decisão do que entra
                ou não são sempre da equipe editorial. O site informa: não apoia partido nem candidato
                e não dá orientação de voto.
              </p>
              <p>
                Erros acontecem, e a correção é pública: se você encontrar um dado errado, um link
                quebrado ou uma afirmação que não se sustenta, escreva para{" "}
                <a href={`mailto:${author.email}`} className="text-accent hover:underline">
                  {author.email}
                </a>{" "}
                e o texto é revisado e marcado como atualizado. Os critérios completos, incluindo como
                lidamos com fontes, dados do Congresso, resenhas de livros e links de afiliado, estão na{" "}
                <Link href="/politica-editorial" className="text-accent hover:underline">
                  política editorial
                </Link>
                .
              </p>
            </div>
          </section>

          <aside aria-labelledby="cobertura" className="lg:sticky lg:top-20 lg:self-start">
            <section className="rounded-xl border border-border bg-surface p-5">
              <h2 id="cobertura" className="label-mono text-muted">
                O que cobrimos
              </h2>
              <ul className="mt-3 flex flex-wrap gap-2">
                {categories.map((c) => (
                  <li key={c.slug}>
                    <Link
                      href={`/categoria/${c.slug}`}
                      className="inline-flex h-8 items-center gap-2 rounded-lg border border-border bg-background px-3 text-xs font-medium text-foreground transition hover:border-accent/50 hover:text-accent"
                    >
                      {c.label}
                      <span className="font-mono text-[11px] text-muted">{counts[c.slug]}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          </aside>
        </div>

        <section aria-labelledby="recentes" className="mt-14">
          <div className="mb-5 flex items-end justify-between gap-4">
            <div>
              <p className="label-mono text-accent">Publicações</p>
              <h2 id="recentes" className="mt-1 font-display text-xl font-bold tracking-tight sm:text-2xl">
                Artigos mais recentes
              </h2>
            </div>
            <Link href="/artigos" className="shrink-0 font-mono text-xs font-medium text-muted transition hover:text-accent">
              Ver todos os {countLabel(all.length, "artigo", "artigos")} →
            </Link>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {recent.map((article) => (
              <ArticleCard key={article.slug} article={article} headingLevel="h3" />
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link
              href="/artigos"
              className="inline-flex h-10 items-center rounded-lg border border-border bg-surface px-5 font-mono text-xs font-medium transition hover:border-accent/50 hover:text-accent"
            >
              Ver todos os artigos →
            </Link>
          </div>
        </section>
      </Container>
    </>
  );
}
