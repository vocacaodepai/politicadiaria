import Link from "next/link";
import { resolveVerification } from "@/lib/verification";
import { formatDate, formatTime } from "@/lib/seo";
import type { NewsItem } from "@/lib/types";

/** Selo de verificação no topo da notícia, com datas de publicação e atualização. */
export function VerificationSeal({ item, correctedAt }: { item: NewsItem; correctedAt?: string }) {
  const v = resolveVerification(item);
  const pubTime = formatTime(item.publishedAt);
  const updDate = item.updatedAt ? item.updatedAt.slice(0, 10) : undefined;
  const updTime = formatTime(item.updatedAt);
  const tone = v.level === "primaria" ? "border-accent" : v.level === "imprensa" ? "border-foreground" : "border-border";
  return (
    <aside aria-label="Selo de verificação" className={`mt-6 border-l-4 ${tone} bg-surface px-4 py-3 text-sm`}>
      <p className="label-mono text-muted">Verificação</p>
      <p className="mt-1 font-display text-base font-bold">{v.label}</p>
      <p className="mt-1 leading-snug text-muted">{v.notes ?? v.text}</p>
      {v.derived && (
        <p className="mt-1 text-xs text-muted">Classificação automática pelo endereço da fonte; ainda não revisada item a item.</p>
      )}
      <p className="mt-2 font-mono text-xs text-muted">
        Publicado em {formatDate(item.date)}
        {pubTime && ` às ${pubTime}`}
        {updDate && (
          <>
            {" · "}Atualizado em {formatDate(updDate)}
            {updTime && ` às ${updTime}`}
          </>
        )}
        {correctedAt && <> {" · "}<Link className="underline hover:text-accent" href="/correcoes">Corrigido em {correctedAt}</Link></>}
      </p>
      {v.unverified.length > 0 && (
        <div className="mt-3">
          <p className="font-semibold">O que não foi verificado</p>
          <ul className="mt-1 list-disc space-y-0.5 pl-5 text-muted">
            {v.unverified.map((u) => (
              <li key={u}>{u}</li>
            ))}
          </ul>
        </div>
      )}
    </aside>
  );
}
