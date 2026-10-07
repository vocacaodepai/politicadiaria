import Link from "next/link";
import { categories, site } from "@/lib/articles";
import { author } from "@/lib/author";
import { Logo } from "./Logo";
import { ThemeToggle } from "./ThemeToggle";
import { CookiePreferencesButton } from "./CookiePreferencesButton";
import { INSTITUTIONAL_NAV } from "./Header";

const ADSENSE_CLIENT = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;
const GA_ID = process.env.NEXT_PUBLIC_GA_ID ?? "G-J2V2PCNK2T";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-16 border-t border-border bg-surface">
      <div className="mx-auto grid w-full max-w-7xl grid-cols-2 gap-x-8 gap-y-10 px-4 py-12 sm:px-6 md:grid-cols-4 lg:grid-cols-5 lg:px-8">
        <div className="col-span-2 lg:col-span-2">
          <Logo id="footer" />
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted">{site.description}</p>
          <p className="mt-4 text-sm text-muted">
            Redação:{" "}
            <Link href={author.url} className="font-medium text-foreground hover:text-accent">
              {author.name}
            </Link>
            . Fale com a gente:{" "}
            <a href={`mailto:${author.email}`} className="text-foreground hover:text-accent">
              {author.email}
            </a>
          </p>
          <div className="mt-5 flex items-center gap-3">
            <Link
              href="/feed.xml"
              className="inline-flex h-9 items-center gap-2 rounded-lg border border-border px-3 text-xs font-medium text-muted transition hover:border-accent/50 hover:text-foreground"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <circle cx="5" cy="19" r="2" />
                <path d="M3 10a11 11 0 0 1 11 11h-3a8 8 0 0 0-8-8v-3zm0-7a18 18 0 0 1 18 18h-3A15 15 0 0 0 3 6V3z" />
              </svg>
              RSS
            </Link>
            <ThemeToggle />
          </div>
        </div>

        <div>
          <h4 className="label-mono text-muted">Conteúdo</h4>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <Link href="/noticias" className="text-foreground/90 transition hover:text-accent">
                Notícias de política
              </Link>
            </li>
            <li>
              <Link href="/artigos" className="text-foreground/90 transition hover:text-accent">
                Resenhas de livros
              </Link>
            </li>
            <li>
              <Link href="/congresso" className="text-foreground/90 transition hover:text-accent">
                Congresso por dentro
              </Link>
            </li>
            <li>
              <Link href="/reviews" className="text-foreground/90 transition hover:text-accent">
                Livros mais bem avaliados
              </Link>
            </li>
            <li>
              <Link href="/busca" className="text-foreground/90 transition hover:text-accent">
                Buscar no site
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="label-mono text-muted">Temas dos livros</h4>
          <ul className="mt-3 space-y-2 text-sm">
            {categories.map((c) => (
              <li key={c.slug}>
                <Link
                  href={`/categoria/${c.slug}`}
                  className="text-foreground/90 transition hover:text-accent"
                >
                  {c.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="label-mono text-muted">Institucional</h4>
          <ul className="mt-3 space-y-2 text-sm">
            {INSTITUTIONAL_NAV.map((i) => (
              <li key={i.href}>
                <Link href={i.href} className="text-foreground/90 transition hover:text-accent">
                  {i.label}
                </Link>
              </li>
            ))}
            {(ADSENSE_CLIENT || GA_ID) && (
              <li>
                <CookiePreferencesButton className="text-foreground/90 transition hover:text-accent" />
              </li>
            )}
          </ul>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-2 px-4 py-6 text-xs text-muted sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <p>
            © {year} {site.name}. Todos os direitos reservados. Conteúdo original em português do
            Brasil.
          </p>
          <p className="font-mono text-[11px]">Feito no Brasil · politicadiaria.com.br</p>
        </div>
      </div>
    </footer>
  );
}
