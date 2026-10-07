import Link from "next/link";
import { ArticleCard } from "@/components/ArticleCard";
import { CategoryChips } from "@/components/CategoryChips";
import { Container } from "@/components/Container";
import { Pagination } from "@/components/Pagination";
import { Sidebar } from "@/components/Sidebar";
import type { Article } from "@/lib/articles";
import { ListingHeader } from "./ListingHeader";
import { countLabel } from "./paginate";

/**
 * Listagem paginada de artigos (todos, por categoria, reviews): cabeçalho,
 * chips de categoria, grade de cards à esquerda e sidebar à direita.
 */
export function ArticleListing({
  label = "Artigos",
  title,
  description,
  intro,
  items,
  total,
  page,
  totalPages,
  basePath,
  active,
  emptyTitle = "Nenhum artigo por aqui ainda",
  emptyText = "Publicamos conteúdo novo todos os dias. Enquanto isso, explore as outras categorias.",
  children,
}: {
  label?: string;
  title: string;
  description: string;
  intro?: string;
  /** Artigos desta página. */
  items: Article[];
  /** Total de artigos da listagem (todas as páginas). Padrão: items.length. */
  total?: number;
  page: number;
  totalPages: number;
  basePath: string;
  /** Chip ativo: "todos", slug de categoria ou "reviews". */
  active: string;
  emptyTitle?: string;
  emptyText?: string;
  /** Conteúdo extra entre o cabeçalho e a grade (ex.: "Como avaliamos"). */
  children?: React.ReactNode;
}) {
  const count = total ?? items.length;
  return (
    <Container className="py-10 sm:py-14">
      <ListingHeader
        label={label}
        title={title}
        description={description}
        intro={intro}
        count={countLabel(count, "artigo", "artigos")}
        page={page}
        totalPages={totalPages}
      />
      <CategoryChips active={active} className="mt-8 border-y border-border py-3" />
      {children}
      <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div className="min-w-0">
          {items.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {items.map((article, i) => (
                <ArticleCard
                  key={article.slug}
                  article={article}
                  headingLevel="h2"
                  priority={page === 1 && i < 3}
                />
              ))}
            </div>
          ) : (
            <div className="rounded-xl border border-dashed border-border bg-surface p-8 text-center">
              <p className="font-display text-lg font-semibold">{emptyTitle}</p>
              <p className="mt-2 text-sm leading-relaxed text-muted">{emptyText}</p>
              <Link
                href="/artigos"
                className="mt-4 inline-flex h-9 items-center rounded-lg border border-border bg-background px-4 font-mono text-xs font-medium transition hover:border-accent/50 hover:text-accent"
              >
                Ver todos os artigos →
              </Link>
            </div>
          )}
          <Pagination current={page} total={totalPages} basePath={basePath} />
        </div>
        <Sidebar />
      </div>
    </Container>
  );
}
