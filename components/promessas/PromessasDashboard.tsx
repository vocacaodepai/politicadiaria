import Link from "next/link";
import { CoverImage } from "@/components/CoverImage";
import { STATUS_COLOR } from "./StatusBadge";
import {
  areaCounts,
  candidatoPath,
  candidatoSlugs,
  getMeta,
  getPropostas,
  modoDe,
  statusCounts,
  statusList,
  statusNota,
  type CandidatoSlug,
} from "@/lib/promessas";

const FACE_QUERY: Record<CandidatoSlug, string> = {
  lula: "Luiz Inácio Lula da Silva portrait",
  flavio: "Flávio Bolsonaro portrait",
};

/** Barra empilhada com a divisão das propostas por status: "onde estamos". */
export function StatusBar({ c, className = "h-4" }: { c: CandidatoSlug; className?: string }) {
  const counts = statusCounts(c);
  const total = getPropostas(c).length || 1;
  return (
    <div className={`flex w-full overflow-hidden bg-surface-2 ${className}`} role="img" aria-label={statusList.map((s) => `${s.label}: ${counts[s.slug]}`).join(", ")}>
      {statusList.map((s) =>
        counts[s.slug] ? <div key={s.slug} style={{ width: `${(counts[s.slug] / total) * 100}%`, background: STATUS_COLOR[s.slug] }} /> : null,
      )}
    </div>
  );
}

/** Seletor visual: um cartão por candidato, com rosto, partido e barra de progresso. */
export function CandidatePicker({ current }: { current: CandidatoSlug }) {
  const meta = getMeta();
  return (
    <nav aria-label="Candidato" className="grid gap-3 sm:grid-cols-2">
      {candidatoSlugs.map((c, i) => {
        const ci = meta.candidatos[c];
        const m = modoDe(c);
        const active = c === current;
        return (
          <Link
            key={c}
            href={candidatoPath(c)}
            aria-current={active ? "page" : undefined}
            className={`group flex items-center gap-4 border-2 p-4 transition ${active ? "border-foreground bg-surface-2 shadow-md" : "border-border hover:border-foreground"}`}
          >
            <CoverImage query={FACE_QUERY[c]} seed={i + 11} alt={ci.nome} showCredit={false} sizes="96px" className="h-20 w-20 shrink-0 overflow-hidden rounded-full" />
            <span className="min-w-0 flex-1">
              <span className="label-mono text-muted">
                {ci.partido}
                {m === "acompanhando" && " · eleito"}
                {m === "arquivo" && " · arquivo da campanha"}
              </span>
              <span className="mt-0.5 block font-display text-2xl font-extrabold leading-tight">{ci.nome}</span>
              <span className="mt-2 block">
                <StatusBar c={c} className="h-2" />
              </span>
              <span className="mt-1 block text-xs text-muted">{getPropostas(c).length} propostas</span>
            </span>
          </Link>
        );
      })}
    </nav>
  );
}

/** Painel do candidato: números, barra de status e propostas por área. */
export function CandidateBoard({ c }: { c: CandidatoSlug }) {
  const counts = statusCounts(c);
  const props = getPropostas(c);
  const total = props.length;
  const areas = areaCounts(c).sort((a, b) => b.count - a.count);
  const maxArea = Math.max(1, ...areas.map((a) => a.count));
  const comIndicador = props.filter((p) => p.indicador).length;
  const moved = total - counts.prometida - counts["sem dados"];
  return (
    <section aria-labelledby="painel" className="mt-6 grid gap-6 lg:grid-cols-[1.1fr_1fr]">
      <div className="border border-border p-5">
        <h2 id="painel" className="label-mono text-muted">Onde estamos</h2>
        <p className="mt-2 font-display text-6xl font-extrabold leading-none tabular-nums">
          {moved}
          <span className="text-2xl font-bold text-muted"> de {total}</span>
        </p>
        <p className="mt-1 text-sm font-semibold">propostas com algum andamento registrado</p>
        <div className="mt-4">
          <StatusBar c={c} className="h-5" />
        </div>
        <ul className="mt-3 grid grid-cols-2 gap-x-4 gap-y-1.5 text-xs sm:grid-cols-3">
          {statusList.map((s) => (
            <li key={s.slug} className="inline-flex items-center gap-1.5">
              <span className="inline-block h-2.5 w-2.5 shrink-0" style={{ background: STATUS_COLOR[s.slug] }} aria-hidden="true" />
              <span className="font-semibold">{s.label}</span>
              <span className="tabular-nums text-muted">{counts[s.slug]}</span>
            </li>
          ))}
        </ul>
        <p className="mt-3 text-xs text-muted">{statusNota(c)}. Indicador oficial conferido em {comIndicador} propostas.</p>
      </div>
      <div className="border border-border p-5">
        <h2 className="label-mono text-muted">Propostas por área</h2>
        <ul className="mt-3 space-y-2">
          {areas.map((a) => (
            <li key={a.slug} className="grid grid-cols-[7.5rem_1fr_1.5rem] items-center gap-2 text-xs">
              <span className="truncate font-semibold">{a.label}</span>
              <span className="h-2.5 bg-surface-2">
                <span className="block h-full bg-foreground" style={{ width: `${(a.count / maxArea) * 100}%` }} />
              </span>
              <span className="text-right tabular-nums text-muted">{a.count}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
