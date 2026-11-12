import Link from "next/link";
import { temaPath, temasDaNoticia } from "@/lib/temas";

/**
 * "Este texto faz parte do tema X": aparece na página da notícia quando o slug
 * dela está em algum tema de content/temas.ts. A notícia não é editada.
 */
export function TemaBox({ newsSlug, className = "" }: { newsSlug: string; className?: string }) {
  const temas = temasDaNoticia(newsSlug);
  if (temas.length === 0) return null;
  return (
    <aside aria-label="Siga este tema" className={`space-y-3 ${className}`}>
      {temas.map((t) => {
        const pos = t.items.findIndex((n) => n.slug === newsSlug) + 1;
        return (
          <div key={t.slug} className="border-l-4 border-accent bg-surface-2 px-4 py-3 sm:px-5">
            <p className="label-mono text-muted">Siga este tema</p>
            <p className="mt-1 font-serif text-base leading-snug">
              Este texto faz parte do tema{" "}
              <Link href={temaPath(t.slug)} className="font-display font-bold text-accent hover:underline">
                {t.titulo}
              </Link>
              .
            </p>
            <p className="mt-1 text-xs text-muted">
              Texto {pos} de {t.items.length} em ordem cronológica.{" "}
              <Link href={temaPath(t.slug)} className="font-semibold text-foreground hover:text-accent">
                Ver todos →
              </Link>
            </p>
          </div>
        );
      })}
    </aside>
  );
}
