import { formatDate } from "@/lib/seo";
import { statusLabel, type PromessaHistorico } from "@/lib/promessas";
import { StatusBadge } from "./StatusBadge";

const t = (iso: string) => Date.parse(`${iso}T12:00:00-03:00`);

/**
 * Linha do tempo do mandato (HTML simples): régua da posse ao fim do mandato, com um marcador por
 * registro, e a lista dos registros com data, status, resumo factual e fonte.
 */
export function PromessaTimeline({
  historico,
  posse,
  today,
  ativo,
}: {
  historico: PromessaHistorico[];
  posse: string;
  today: string;
  ativo: boolean;
}) {
  const start = t(posse);
  const endYear = Number(posse.slice(0, 4)) + 4;
  const end = t(`${endYear}-01-01`);
  const span = end - start;
  const pos = (iso: string) => Math.min(100, Math.max(0, ((t(iso) - start) / span) * 100));
  const nowPct = pos(today);
  const years = [0, 1, 2, 3, 4].map((i) => ({ label: String(Number(posse.slice(0, 4)) + i), left: (i / 4) * 100 }));
  const hasNow = ativo && t(today) >= start && t(today) <= end;

  return (
    <div>
      <figure aria-label="Régua do mandato, da posse ao último dia" className="m-0">
        <div className="relative mt-6 h-12 select-none">
          <div className="absolute inset-x-0 top-5 h-[3px] bg-border" />
          {years.map((y, i) => (
            <div key={y.label} className="absolute top-3.5" style={{ left: `${y.left}%` }}>
              <span className="absolute h-4 w-px bg-foreground" />
              {i < 4 && <span className="label-mono absolute top-5 left-1 text-[10px] text-muted">{y.label}</span>}
            </div>
          ))}
          {historico.map((h, i) => (
            <span
              key={`${h.data}-${i}`}
              title={`${formatDate(h.data)}: ${statusLabel(h.status)}`}
              className="absolute top-[13px] size-3.5 -translate-x-1/2 border-2 border-foreground bg-accent"
              style={{ left: `${pos(h.data)}%` }}
            />
          ))}
          {hasNow && (
            <span
              title="Hoje"
              className="absolute top-2 h-7 w-0.5 bg-danger"
              style={{ left: `${nowPct}%` }}
            />
          )}
        </div>
        <figcaption className="mt-1 text-xs text-muted">
          Do dia da posse ({formatDate(posse, "short")}) ao fim do mandato. Cada quadrado é um registro com fonte.
        </figcaption>
      </figure>

      {historico.length === 0 ? (
        <p className="mt-5 border border-dashed border-border p-4 text-sm leading-relaxed text-muted">
          Nenhum registro ainda. Quando houver ato oficial, execução ou dado que mude o status, ele entra aqui com data e fonte.
        </p>
      ) : (
        <ol className="relative mt-6 ml-1 border-l-2 border-border pl-5">
          {historico.map((h, i) => (
            <li key={`${h.data}-${i}`} className="relative pb-6 last:pb-0">
              <span aria-hidden="true" className="absolute -left-[1.62rem] top-1.5 size-2.5 border-2 border-foreground bg-background" />
              <div className="flex flex-wrap items-center gap-2">
                <time dateTime={h.data} className="label-mono text-muted">
                  {formatDate(h.data)}
                </time>
                <StatusBadge status={h.status} label={statusLabel(h.status)} />
              </div>
              <p className="mt-1 text-[0.95rem] leading-relaxed">{h.resumo}</p>
              <p className="mt-1 text-xs text-muted">
                Fonte:{" "}
                <a href={h.fonte.url} target="_blank" rel="noopener noreferrer" className="text-accent underline underline-offset-2">
                  {h.fonte.nome}
                </a>
              </p>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}
