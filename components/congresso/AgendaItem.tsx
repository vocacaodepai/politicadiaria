import { AGENDA_CATEGORIAS, RESERVADA_TEXT, formatAgendaWhen, situacaoTone, type AgendaEvento } from "@/lib/congress-agenda-format";

const CASA: Record<AgendaEvento["casa"], string> = { camara: "Câmara", senado: "Senado", congresso: "Congresso Nacional" };

const TONE = {
  ok: "border-foreground text-foreground",
  warn: "border-secondary text-secondary",
  bad: "border-border text-muted line-through decoration-1",
  idle: "border-border text-muted",
} as const;

/** Um evento da agenda (sessão, reunião de comissão, audiência), com todos os campos da fonte. */
export function AgendaItem({
  e,
  vinculo,
  cargo,
  showParticipants = false,
}: {
  e: AgendaEvento;
  vinculo?: "registro" | "membro";
  cargo?: string;
  showParticipants?: boolean;
}) {
  return (
    <article className="py-3 first:pt-0 last:pb-0" data-agenda-item>
      <p className="flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-[11px] uppercase tracking-wider text-muted">
        <time dateTime={e.inicio}>{formatAgendaWhen(e.inicio)}</time>
        <span aria-hidden="true">·</span>
        <span>{CASA[e.casa]}</span>
        <span aria-hidden="true">·</span>
        <span>{AGENDA_CATEGORIAS[e.categoria]}</span>
      </p>
      <h3 className="mt-1 text-[15px] font-semibold leading-snug">{e.titulo}</h3>
      <p className="mt-0.5 text-sm text-muted">
        {e.tipo}
        {e.orgao ? ` · ${e.orgao.sigla}${e.orgao.nome && e.orgao.nome !== e.orgao.sigla ? `: ${e.orgao.nome}` : ""}` : ""}
      </p>
      <dl className="mt-2 grid gap-x-6 gap-y-1 text-xs sm:grid-cols-2">
        <div className="flex gap-1.5">
          <dt className="text-muted">Local:</dt>
          <dd>{e.local ?? "não informado pela fonte"}</dd>
        </div>
        <div className="flex flex-wrap items-center gap-1.5">
          <dt className="text-muted">Situação:</dt>
          <dd>
            <span className={`inline-block border px-1.5 py-px font-mono text-[11px] font-semibold uppercase tracking-wide ${TONE[situacaoTone(e.situacao)]}`}>{e.situacao}</span>
            {e.situacaoFonte && e.situacaoFonte.toLowerCase() !== e.situacao.toLowerCase() && <span className="ml-1.5 text-muted">(na fonte: {e.situacaoFonte})</span>}
          </dd>
        </div>
        <div className="flex gap-1.5 sm:col-span-2">
          <dt className="text-muted">Reunião reservada ou sigilosa:</dt>
          <dd>{RESERVADA_TEXT(e.reservada)}</dd>
        </div>
        {vinculo && (
          <div className="flex gap-1.5 sm:col-span-2">
            <dt className="text-muted">Vínculo com o parlamentar:</dt>
            <dd>
              {vinculo === "registro" ? "a própria fonte registra o parlamentar neste evento" : `integrante do órgão${cargo ? ` (${cargo})` : ""}; presença não é garantida pela convocação`}
            </dd>
          </div>
        )}
        {showParticipants && (
          <div className="flex gap-1.5 sm:col-span-2">
            <dt className="text-muted">Parlamentares vinculados:</dt>
            <dd>{e.parlamentares > 0 ? `${e.parlamentares} (${e.registrados > 0 ? `${e.registrados} registrados pela fonte` : "integrantes do órgão"})` : "nenhum vínculo publicado pela fonte"}</dd>
          </div>
        )}
      </dl>
      <p className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs">
        <a className="text-accent underline" href={e.url} target="_blank" rel="noopener noreferrer">
          Ver na fonte oficial ↗
        </a>
        {e.pauta && (
          <a className="text-accent underline" href={e.pauta} target="_blank" rel="noopener noreferrer">
            Pauta ↗
          </a>
        )}
        {e.registro && (
          <a className="text-accent underline" href={e.registro} target="_blank" rel="noopener noreferrer">
            Transmissão ↗
          </a>
        )}
      </p>
    </article>
  );
}
