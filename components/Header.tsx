import Link from "next/link";
import { categories } from "@/lib/articles";
import { Logo } from "./Logo";
import { ThemeToggle } from "./ThemeToggle";
import { SearchDialog } from "./SearchDialog";
import { MobileMenu } from "./MobileMenu";
import { TodayDate } from "./TodayDate";

export type NavChild = { href: string; label: string; description?: string };
export type NavItem = { href: string; label: string; highlight?: boolean; children?: NavChild[] };

/** Menu principal. Itens com `children` viram menu suspenso (e seção no menu do celular). */
export const PRIMARY_NAV: NavItem[] = [
  { href: "/noticias", label: "Notícias" },
  {
    href: "/eleicoes",
    label: "Eleições 2026",
    highlight: true,
    children: [
      { href: "/eleicoes", label: "Painel das eleições", description: "Resultados, quem está na frente e o 2º turno" },
      { href: "/eleicoes/pesquisas", label: "Pesquisas e ranking", description: "Intenção de voto e quais institutos mais acertaram" },
    ],
  },
  {
    href: "/congresso",
    label: "Congresso",
    children: [
      { href: "/congresso", label: "Visão geral", description: "Quem está no Congresso hoje, em números" },
      { href: "/congresso/plenario", label: "Plenário", description: "Veja as cadeiras e passe o dedo em cada parlamentar" },
      { href: "/congresso/deputados", label: "Deputados federais", description: "513 fichas com votos, ausências e gastos" },
      { href: "/congresso/senadores", label: "Senadores", description: "81 fichas com votos, ausências e gastos" },
      { href: "/congresso/numeros", label: "Gastos e números", description: "Cota parlamentar, CEAPS, salários e ausências, com fontes" },
      { href: "/congresso/evolucao", label: "Evolução das bancadas", description: "Quem cresceu e quem diminuiu" },
    ],
  },
  {
    href: "/stf",
    label: "Supremo",
    children: [
      { href: "/stf", label: "Composição", description: "Os ministros do STF, turmas, posse e indicação" },
      { href: "/stf/julgamentos", label: "Julgamentos", description: "Pesquise processos, relatores, resultados e votos" },
      { href: "/stf/agenda", label: "Agenda", description: "Sessões, pauta da semana e Plenário Virtual" },
    ],
  },
  { href: "/checagem", label: "Checagem" },
  {
    href: "/artigos",
    label: "Livros",
    children: [
      { href: "/artigos", label: "Todas as resenhas", description: "Livros de política com nota de 0 a 10" },
      { href: "/reviews", label: "Mais bem avaliados", description: "Ranking pela nota final" },
    ],
  },
  { href: "/sobre", label: "Sobre" },
];

export const INSTITUTIONAL_NAV = [
  { href: "/sobre", label: "Sobre a Política Diária" },
  { href: "/autor/equipe-editorial", label: "Quem escreve" },
  { href: "/contato", label: "Contato" },
  { href: "/politica-editorial", label: "Política editorial" },
  { href: "/publicidade-e-afiliados", label: "Publicidade e afiliados" },
  { href: "/politica-de-privacidade", label: "Política de privacidade" },
  { href: "/termos-de-uso", label: "Termos de uso" },
];

function Chevron() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

export function Header() {
  const categoryItems = categories.map((c) => ({
    href: `/categoria/${c.slug}`,
    label: c.label,
    description: c.description,
  }));

  // O item "Livros" ganha também os temas no menu suspenso.
  const nav: NavItem[] = PRIMARY_NAV.map((i) =>
    i.href === "/artigos" ? { ...i, children: [...(i.children ?? []), ...categoryItems] } : i,
  );

  const navLink =
    "px-3 py-2.5 text-[13px] font-semibold uppercase tracking-[0.06em] text-foreground transition hover:text-accent";

  return (
    <header className="border-b border-foreground bg-background">
      {/* Linha de serviço: data, busca, tema */}
      <div className="mx-auto flex h-10 w-full max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <TodayDate className="hidden text-xs text-muted sm:inline" />
        <p className="text-xs font-semibold uppercase tracking-[0.08em] text-muted sm:hidden">Política Diária</p>
        <div className="flex items-center gap-1">
          <SearchDialog />
          <ThemeToggle className="hidden lg:inline-flex" />
          <MobileMenu
            primary={PRIMARY_NAV}
            categories={categoryItems}
            institutional={INSTITUTIONAL_NAV}
          />
        </div>
      </div>

      {/* Nome do jornal, centralizado, com filete duplo como nas primeiras páginas */}
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center py-3 sm:py-5">
          <Logo priority />
          <p className="mt-2 hidden text-[11px] font-semibold uppercase tracking-[0.22em] text-muted sm:block">
            Política do Brasil, Eleições, Congresso e livros para entender o poder
          </p>
        </div>
      </div>

      {/* Seções */}
      <div className="sticky top-0 z-40 border-t-[3px] border-double border-foreground border-b border-b-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/90">
        <nav
          className="mx-auto hidden w-full max-w-7xl items-center justify-center gap-1 px-4 sm:px-6 lg:flex lg:px-8"
          aria-label="Principal"
        >
          {nav.map((i) =>
            i.children ? (
              <div key={i.href} className="group relative">
                <Link
                  href={i.href}
                  className={`${navLink} inline-flex items-center gap-1 group-focus-within:text-accent ${i.highlight ? "text-accent" : ""}`}
                >
                  {i.label}
                  <Chevron />
                </Link>
                <div className="invisible absolute left-1/2 top-full z-50 w-[min(520px,90vw)] -translate-x-1/2 translate-y-1 opacity-0 transition group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                  <div className={`grid gap-1 border border-foreground bg-surface p-2 shadow-xl ${i.children.length > 4 ? "grid-cols-2" : "grid-cols-1"}`}>
                    {i.children.map((c) => (
                      <Link key={`${c.href}-${c.label}`} href={c.href} className="px-3 py-2.5 transition hover:bg-surface-2">
                        <span className="block font-display text-sm font-bold">{c.label}</span>
                        {c.description && (
                          <span className="mt-0.5 line-clamp-2 block text-xs leading-snug text-muted">
                            {c.description}
                          </span>
                        )}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <Link key={i.href} href={i.href} className={`${navLink} ${i.highlight ? "text-accent" : ""}`}>
                {i.label}
              </Link>
            ),
          )}
        </nav>
        <div className="lg:hidden">
          <div className="mx-auto flex w-full max-w-7xl items-center gap-4 overflow-x-auto px-4 no-scrollbar sm:px-6">
            {PRIMARY_NAV.filter((i) => i.href !== "/sobre").map((i) => (
              <Link
                key={i.href}
                href={i.href}
                className={`${navLink} shrink-0 px-0 ${i.highlight ? "text-accent" : ""}`}
              >
                {i.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
