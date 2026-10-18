import Link from "next/link";
import type { Mention } from "@/lib/congress-mentions";
import { Card } from "./Stat";

const KIND: Record<Mention["kind"], string> = { noticia: "Notícia", checagem: "Checagem", resenha: "Resenha" };
const dmy = (iso: string) => iso.slice(0, 10).split("-").reverse().join("/");

/** "Seguir por RSS" e "Citado em": o feed do parlamentar e o que o site publicou sobre ele. */
export function FollowSection({ feedPath, nome, mentions }: { feedPath: string; nome: string; mentions: Mention[] }) {
  return (
    <Card id="seguir" title="Seguir este parlamentar">
      <p className="text-sm text-muted">
        O feed RSS de {nome} reúne os votos mais recentes em votação nominal, as ausências em votação nominal (que não são faltas em sessão), as notícias, checagens e resenhas do site que o citam e a agenda dos próximos dias.
      </p>
      <p className="mt-3">
        <a
          href={feedPath}
          className="inline-flex h-10 items-center rounded-lg border border-foreground bg-foreground px-4 font-mono text-xs font-semibold uppercase tracking-wide text-background transition hover:opacity-90"
        >
          Seguir por RSS
        </a>
        <span className="ml-3 text-xs text-muted">Cole o endereço <code className="break-all">{feedPath}</code> no seu leitor de feeds.</span>
      </p>

      <h3 className="mt-6 label-mono text-muted" id="citado-em">
        Citado em ({mentions.length})
      </h3>
      {mentions.length === 0 ? (
        <p className="mt-1 text-sm text-muted">Nenhuma notícia, checagem ou resenha do site cita este parlamentar com link para esta página.</p>
      ) : (
        <ul className="mt-2 divide-y divide-border text-sm">
          {mentions.map((m) => (
            <li key={`${m.kind}-${m.slug}`} className="py-2">
              <span className="font-mono text-[11px] uppercase tracking-wider text-muted">
                {KIND[m.kind]} · {dmy(m.date)}
              </span>
              <Link href={m.href} className="mt-0.5 block font-semibold leading-snug hover:text-accent hover:underline">
                {m.title}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </Card>
  );
}
