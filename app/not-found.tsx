import Link from "next/link";
import { CategoryChips } from "@/components/CategoryChips";
import { Container } from "@/components/Container";
import { Logo } from "@/components/Logo";
import { FeaturedList } from "@/components/Sidebar";

/**
 * 404 sem anúncio: marca, caminho para a busca, seis artigos em destaque e os
 * chips de categoria para o visitante seguir navegando.
 */
export default function NotFound() {
  return (
    <Container className="py-12 sm:py-16">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_380px] lg:gap-14">
        <section aria-labelledby="titulo-404" className="max-w-2xl">
          <Logo id="nao-encontrada" />
          <p className="label-mono mt-8 text-accent">Erro 404</p>
          <h1
            id="titulo-404"
            className="mt-2 font-display text-3xl font-bold leading-[1.1] tracking-tight sm:text-4xl lg:text-5xl"
          >
            Essa página não existe, mas o resto do site está aqui.
          </h1>
          <p className="mt-4 max-w-prose text-base leading-relaxed text-muted sm:text-lg">
            O endereço pode ter sido digitado errado, o artigo pode ter mudado de lugar ou o link que
            trouxe você até aqui estava quebrado. Procure pelo assunto ou escolha uma categoria.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/busca"
              className="inline-flex h-11 items-center gap-2 rounded-lg bg-foreground px-5 text-sm font-semibold text-background transition hover:opacity-90"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <circle cx="11" cy="11" r="7" />
                <path d="m20 20-3.5-3.5" />
              </svg>
              Buscar no site
            </Link>
            <Link
              href="/"
              className="inline-flex h-11 items-center rounded-lg border border-border bg-surface px-5 text-sm font-semibold text-foreground transition hover:border-accent/50 hover:text-accent"
            >
              Ir para a página inicial
            </Link>
          </div>

          <div className="mt-10">
            <p className="label-mono text-muted">Navegue por categoria</p>
            <CategoryChips className="mt-3" />
          </div>
        </section>

        <aside aria-label="Artigos em destaque">
          <FeaturedList title="Comece por aqui" limit={6} />
        </aside>
      </div>
    </Container>
  );
}
