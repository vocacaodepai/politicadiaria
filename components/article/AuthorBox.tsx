import Link from "next/link";
import { author } from "@/lib/author";
import { AuthorAvatar } from "./AuthorAvatar";

/** Caixa do autor ao fim do artigo: avatar, nome, função, bio, link e e-mail. */
export function AuthorBox({ className = "" }: { className?: string }) {
  return (
    <section
      aria-labelledby="sobre-o-autor"
      className={`flex flex-col gap-4 rounded-xl border border-border bg-surface p-6 sm:flex-row sm:gap-5 ${className}`}
    >
      <AuthorAvatar name={author.name} size="lg" />
      <div className="min-w-0 flex-1">
        <p className="label-mono text-muted">Quem escreveu</p>
        <h2 id="sobre-o-autor" className="mt-1 font-display text-lg font-bold tracking-tight">
          <Link href={author.url} className="transition hover:text-accent">
            {author.name}
          </Link>
        </h2>
        <p className="font-mono text-xs text-muted">{author.role}</p>
        <p className="mt-3 text-sm leading-relaxed text-muted">{author.bio}</p>
        <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-xs">
          <Link href={author.url} className="font-medium text-accent hover:underline">
            Todos os artigos de {author.name.split(" ")[0]} →
          </Link>
          <a href={`mailto:${author.email}`} className="text-muted transition hover:text-accent">
            {author.email}
          </a>
        </div>
      </div>
    </section>
  );
}
