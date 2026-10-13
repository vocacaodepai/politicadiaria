import Link from "next/link";
import { categories } from "@/lib/articles";
import { Logo } from "./Logo";
import { ThemeToggle } from "./ThemeToggle";
import { SearchDialog } from "./SearchDialog";
import { MobileMenu } from "./MobileMenu";
import { TodayDate } from "./TodayDate";

export const PRIMARY_NAV = [
  { href: "/noticias", label: "Notícias" },
  { href: "/congresso", label: "Congresso" },
  { href: "/artigos", label: "Livros" },
  { href: "/reviews", label: "Mais bem avaliados" },
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

export function Header() {
  const categoryItems = categories.map((c) => ({
    href: `/categoria/${c.slug}`,
    label: c.label,
    description: c.description,
  }));

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
            Notícias, Congresso e livros para entender o poder
          </p>
        </div>
      </div>

      {/* Seções */}
      <div className="sticky top-0 z-40 border-t-[3px] border-double border-foreground border-b border-b-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/90">
        <nav
          className="mx-auto hidden w-full max-w-7xl items-center justify-center gap-1 px-4 sm:px-6 lg:flex lg:px-8"
          aria-label="Principal"
        >
          {PRIMARY_NAV.slice(0, 4).map((i) => (
            <Link key={i.href} href={i.href} className={navLink}>
              {i.label}
            </Link>
          ))}

          <div className="group relative">
            <button
              type="button"
              className={`${navLink} inline-flex items-center gap-1 group-focus-within:text-accent`}
            >
              Temas dos livros
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="m6 9 6 6 6-6" />
              </svg>
            </button>
            <div className="invisible absolute left-1/2 top-full z-50 w-[520px] -translate-x-1/2 translate-y-1 pt-0 opacity-0 transition group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
              <div className="grid grid-cols-2 gap-1 border border-foreground bg-surface p-2 shadow-xl">
                {categoryItems.map((c) => (
                  <Link key={c.href} href={c.href} className="px-3 py-2.5 transition hover:bg-surface-2">
                    <span className="block font-display text-sm font-bold">{c.label}</span>
                    <span className="mt-0.5 line-clamp-2 block text-xs leading-snug text-muted">
                      {c.description}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <Link href="/sobre" className={navLink}>
            Sobre
          </Link>
        </nav>
        <div className="lg:hidden">
          <div className="mx-auto flex w-full max-w-7xl items-center gap-4 overflow-x-auto px-4 no-scrollbar sm:px-6">
            {PRIMARY_NAV.slice(0, 4).map((i) => (
              <Link key={i.href} href={i.href} className={`${navLink} shrink-0 px-0`}>
                {i.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
