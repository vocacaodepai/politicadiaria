import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/Container";
import { JsonLd } from "@/components/article/JsonLd";
import { getGuia, guiaLivros, guias } from "@/lib/guias";
import { absoluteUrl, alternatesFor, breadcrumbJsonLd } from "@/lib/seo";

type Params = Promise<{ slug: string }>;

export function generateStaticParams() {
  return guias.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const g = getGuia((await params).slug);
  if (!g) return {};
  return {
    title: g.title,
    description: g.description,
    alternates: alternatesFor(`/guias/${g.slug}`),
    openGraph: { type: "article", url: absoluteUrl(`/guias/${g.slug}`), title: g.title, description: g.description },
  };
}

export default async function GuiaPage({ params }: { params: Params }) {
  const g = getGuia((await params).slug);
  if (!g) notFound();
  const livros = guiaLivros(g);
  const path = `/guias/${g.slug}`;
  return (
    <Container className="py-10">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Início", path: "/" },
          { name: "Guias", path: "/guias" },
          { name: g.title, path },
        ])}
      />
      <div className="mx-auto max-w-3xl">
        <p className="label-mono text-accent">
          <Link href="/guias" className="hover:underline">Guias de leitura</Link>
        </p>
        <h1 className="mt-2 font-display text-3xl font-bold leading-tight tracking-tight sm:text-4xl">{g.title}</h1>
        <p className="mt-4 text-lg leading-relaxed text-muted">{g.intro}</p>
        <p className="mt-4 border-l-4 border-accent bg-surface px-4 py-3 text-sm">
          <strong>Critério da ordem:</strong> {g.criterio}
        </p>

        <ol className="mt-8 space-y-8">
          {livros.map(({ article: a, porque }, i) => {
            const r = a.review!;
            return (
              <li key={a.slug} className="border-t-[3px] border-foreground pt-3">
                <p className="font-mono text-xs text-muted">
                  {i + 1}º livro · {r.bookAuthor}
                  {r.pages ? ` · ${r.pages} páginas` : ""}
                </p>
                <h2 className="mt-1 font-display text-2xl font-bold leading-snug">{r.tool}</h2>
                <p className="mt-1 font-semibold">
                  Nota {r.score.toFixed(1).replace(".", ",")} de 10{" "}
                  <span className="font-normal text-muted">(da resenha, sem recálculo)</span>
                </p>
                <p className="mt-2">{porque}</p>
                <p className="mt-2 text-sm text-muted"><strong>Para quem serve:</strong> {r.bestFor}</p>
                <p className="mt-2 text-sm text-muted"><strong>Preço:</strong> {r.price}</p>
                <p className="mt-3">
                  <Link href={`/artigos/${a.slug}`} className="text-accent underline">
                    Ler a resenha completa e as críticas feitas ao livro
                  </Link>
                </p>
                <div className="prose-article">
                  <div className="buy-btn">
                    <a href={r.url} rel="sponsored noopener noreferrer" target="_blank">
                      Ver {r.tool} na Amazon ↗
                    </a>
                  </div>
                </div>
              </li>
            );
          })}
        </ol>

        <p className="mt-10 text-xs text-muted">
          Os links de compra são de afiliado da Amazon Brasil: se você comprar por eles, o site pode receber uma comissão, sem custo extra
          para você. Veja a <Link href="/publicidade-e-afiliados" className="underline">política de publicidade e afiliados</Link> e a{" "}
          <Link href="/politica-editorial" className="underline">política editorial</Link>.
        </p>
      </div>
    </Container>
  );
}
