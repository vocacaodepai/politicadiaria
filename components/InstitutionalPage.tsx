import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/Container";
import { INSTITUTIONAL_NAV } from "@/components/Header";
import { site } from "@/lib/articles";
import { author } from "@/lib/author";
import { absoluteUrl, breadcrumbJsonLd, formatDate, metaDescription, safeJsonLd, alternatesFor } from "@/lib/seo";

/**
 * Data da última revisão dos textos institucionais (sobre, contato, políticas,
 * termos). Aparece em "Atualizado em" e alimenta o lastModified do sitemap.
 */
export const INSTITUTIONAL_UPDATED = "2026-09-27";

/** Caminhos das páginas institucionais, na ordem do rodapé (usado pelo sitemap). */
export const INSTITUTIONAL_PATHS = [
  "/sobre",
  "/contato",
  "/politica-editorial",
  "/publicidade-e-afiliados",
  "/politica-de-privacidade",
  "/termos-de-uso",
] as const;

type PageType = "WebPage" | "AboutPage" | "ContactPage";

/**
 * Metadata completo de uma página institucional: título (o layout aplica o
 * template "%s | Política Diária"), description até 158 caracteres, canonical
 * próprio e Open Graph com URL absoluta. A imagem vem de app/opengraph-image.tsx.
 */
export function institutionalMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  const desc = metaDescription(description);
  return {
    title,
    description: desc,
    alternates: alternatesFor(path),
    openGraph: {
      type: "website",
      url: absoluteUrl(path),
      title: `${title} | ${site.name}`,
      description: desc,
      siteName: site.name,
      locale: site.locale,
    },
  };
}

function RelatedPages({ currentPath }: { currentPath: string }) {
  const items = INSTITUTIONAL_NAV.filter((i) => i.href !== currentPath);
  return (
    <nav aria-labelledby="institucional-nav" className="rounded-xl border border-border bg-surface p-5">
      <h2 id="institucional-nav" className="label-mono text-muted">
        Institucional
      </h2>
      <ul className="mt-3 space-y-1">
        {items.map((i) => (
          <li key={i.href}>
            <Link
              href={i.href}
              className="block rounded-lg px-2 py-1.5 text-sm font-medium transition hover:bg-surface-2 hover:text-accent"
            >
              {i.label}
            </Link>
          </li>
        ))}
      </ul>
      <p className="mt-4 border-t border-border pt-4 text-xs leading-relaxed text-muted">
        Dúvidas sobre qualquer destas páginas:{" "}
        <a href={`mailto:${author.email}`} className="font-medium text-accent hover:underline">
          {author.email}
        </a>
      </p>
    </nav>
  );
}

/**
 * Casca das páginas institucionais (sobre, contato, políticas, termos):
 * rótulo em mono, h1 em display, parágrafo de abertura, "Atualizado em" e o
 * corpo em .prose-article com 68ch de largura. Emite o JSON-LD da página
 * (WebPage, AboutPage ou ContactPage) e o BreadcrumbList, sempre via safeJsonLd.
 * Nenhuma destas páginas leva anúncio.
 */
export function InstitutionalPage({
  label,
  title,
  lead,
  path,
  type = "WebPage",
  updated = INSTITUTIONAL_UPDATED,
  aside,
  children,
}: {
  /** Rótulo pequeno acima do título, ex.: "Institucional". */
  label: string;
  title: string;
  /** Parágrafo de abertura, em texto corrido (também vira a description do JSON-LD). */
  lead: string;
  /** Caminho da página, ex.: "/sobre". */
  path: string;
  type?: PageType;
  /** Data ISO (AAAA-MM-DD) da última revisão do texto. */
  updated?: string;
  /** Substitui a coluna lateral padrão (lista das outras páginas institucionais). */
  aside?: React.ReactNode;
  children: React.ReactNode;
}) {
  const url = absoluteUrl(path);
  const pageJsonLd = {
    "@context": "https://schema.org",
    "@type": type,
    "@id": `${url}#webpage`,
    url,
    name: `${title} | ${site.name}`,
    headline: title,
    description: lead,
    inLanguage: "pt-BR",
    dateModified: updated,
    isPartOf: { "@id": `${site.url}/#website` },
    about: { "@id": `${site.url}/#organization` },
    publisher: { "@id": `${site.url}/#organization` },
    ...(type === "ContactPage" ? { mainEntity: { "@id": `${site.url}/#organization` } } : {}),
  };
  const breadcrumb = breadcrumbJsonLd([
    { name: "Início", path: "/" },
    { name: title, path },
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(pageJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(breadcrumb) }} />
      <Container className="py-10 sm:py-14">
        <nav aria-label="Trilha de navegação" className="font-mono text-xs text-muted">
          <ol className="flex items-center gap-1.5">
            <li>
              <Link href="/" className="transition hover:text-accent">
                Início
              </Link>
            </li>
            <li aria-hidden="true" className="text-border">
              /
            </li>
            <li>
              <span aria-current="page" className="text-foreground/80">
                {title}
              </span>
            </li>
          </ol>
        </nav>

        <header className="mt-6 max-w-3xl">
          <p className="label-mono text-accent">{label}</p>
          <h1 className="mt-2 font-display text-3xl font-bold leading-[1.1] tracking-tight sm:text-4xl lg:text-5xl">
            {title}
          </h1>
          <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">{lead}</p>
          <p className="mt-5 font-mono text-xs text-muted">
            Atualizado em <time dateTime={updated}>{formatDate(updated, "long")}</time>
          </p>
        </header>

        <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-12">
          <div className="prose-article min-w-0 max-w-[68ch]">{children}</div>
          <aside aria-label="Páginas relacionadas" className="lg:sticky lg:top-20 lg:self-start">
            {aside ?? <RelatedPages currentPath={path} />}
          </aside>
        </div>
      </Container>
    </>
  );
}
