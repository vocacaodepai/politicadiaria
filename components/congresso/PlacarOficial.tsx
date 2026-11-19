import Link from "next/link";
import { getNewsPlacares, type PlacarCasa, type PlacarVotacao } from "@/lib/congress-placar";

const brDate = (iso: string) => `${iso.slice(8, 10)}/${iso.slice(5, 7)}/${iso.slice(0, 4)}`;
const fmt = (n: number) => n.toLocaleString("pt-BR");
/** "SIM" -> "Sim", "NÃO" -> "Não", "LIVRE" -> "Livre": a grafia da fonte, só com caixa normalizada. */
const voteWord = (s: string) => {
  const t = s.trim();
  return t === t.toUpperCase() ? t.charAt(0) + t.slice(1).toLocaleLowerCase("pt-BR") : t;
};

const CASA = {
  camara: { nome: "Câmara dos Deputados", fonte: "Dados abertos da Câmara", link: "Ficha de tramitação na Câmara", outros: "Art. 17 (presidência)" },
  senado: { nome: "Senado Federal", fonte: "Dados abertos do Senado", link: "Matéria no site do Senado", outros: "Outros" },
} as const;
type Casa = keyof typeof CASA;

function resultado(v: PlacarVotacao) {
  if (v.aprovacao === 1) return "Aprovada";
  if (v.aprovacao === 0) return "Rejeitada";
  return null;
}

function Nominal({ casa, v }: { casa: Casa; v: PlacarVotacao }) {
  const p = v.placar!;
  const counted = p.sim + p.nao + p.abstencao + p.obstrucao;
  const seg = [
    { k: "Sim", n: p.sim, cls: "bg-foreground" },
    { k: "Não", n: p.nao, cls: "bg-muted" },
    { k: "Abstenção", n: p.abstencao, cls: "bg-border" },
    { k: "Obstrução", n: p.obstrucao, cls: "bg-surface-2" },
  ];
  return (
    <>
      <dl className="mt-2 flex flex-wrap gap-x-5 gap-y-1 font-mono text-sm tabular-nums">
        {seg.map((s) => (
          <div key={s.k} className="flex items-baseline gap-1.5">
            <dt className="text-muted">{s.k}</dt>
            <dd className="font-semibold text-foreground">{fmt(s.n)}</dd>
          </div>
        ))}
        {p.outros > 0 && (
          <div className="flex items-baseline gap-1.5">
            <dt className="text-muted">{CASA[casa].outros}</dt>
            <dd className="font-semibold text-foreground">{fmt(p.outros)}</dd>
          </div>
        )}
      </dl>
      {counted > 0 && (
        <div className="mt-2 flex h-2.5 overflow-hidden rounded-sm border border-border" aria-hidden="true">
          {seg.filter((s) => s.n > 0).map((s) => (
            <span key={s.k} className={s.cls} style={{ width: `${(s.n / counted) * 100}%` }} />
          ))}
        </div>
      )}
      {(v.orientacoes?.length ?? 0) > 0 && (
        <details className="mt-3 text-sm">
          <summary className="cursor-pointer font-medium text-accent">Orientação das lideranças ({v.orientacoes!.length})</summary>
          <ul className="mt-2 grid gap-x-4 gap-y-1 text-xs sm:grid-cols-2">
            {v.orientacoes!.map((o) => (
              <li key={o.sigla} className="flex justify-between gap-3 border-b border-border py-1">
                <span>{o.sigla}</span>
                <span className="font-mono">{voteWord(o.voto)}</span>
              </li>
            ))}
          </ul>
        </details>
      )}
      {(v.partidos?.length ?? 0) > 0 && (
        <details className="mt-2 text-sm">
          <summary className="cursor-pointer font-medium text-accent">Votos por partido ({v.partidos!.length})</summary>
          <div className="mt-2 overflow-x-auto">
            <table className="w-full min-w-[420px] border-collapse text-xs [&_td]:border-t [&_td]:border-border [&_td]:py-1 [&_td]:pr-3 [&_th]:pb-1 [&_th]:pr-3 [&_th]:text-left [&_th]:font-mono [&_th]:text-[11px] [&_th]:uppercase [&_th]:tracking-wider [&_th]:text-muted">
              <thead>
                <tr>
                  <th scope="col">Partido</th>
                  <th scope="col">Sim</th>
                  <th scope="col">Não</th>
                  <th scope="col">Abst.</th>
                  <th scope="col">Obstr.</th>
                  {p.outros > 0 && <th scope="col">{casa === "camara" ? "Art. 17" : "Outros"}</th>}
                </tr>
              </thead>
              <tbody className="font-mono tabular-nums">
                {v.partidos!.map((r) => (
                  <tr key={r.sigla}>
                    <td className="font-sans">{r.sigla}</td>
                    <td>{r.sim}</td>
                    <td>{r.nao}</td>
                    <td>{r.abstencao}</td>
                    <td>{r.obstrucao}</td>
                    {p.outros > 0 && <td>{r.outros}</td>}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-1 text-xs text-muted">Partido registrado pela Casa no momento do voto.</p>
        </details>
      )}
    </>
  );
}

function Votacao({ casa, v }: { casa: Casa; v: PlacarVotacao }) {
  const r = resultado(v);
  return (
    <li className="border-t border-border py-3 first:border-t-0 first:pt-0">
      <p className="flex flex-wrap items-baseline gap-x-2 font-mono text-xs text-muted">
        <time dateTime={v.data}>{brDate(v.data)}</time>
        {r && <span className="font-semibold uppercase tracking-wide text-foreground">{r}</span>}
        {v.tipo === "nominal" && <span>· votação nominal</span>}
      </p>
      {v.descricao && v.tipo !== "semNominal" && <p className="mt-1 text-sm leading-snug">{v.descricao}</p>}
      {v.tipo === "nominal" && v.placar && <Nominal casa={casa} v={v} />}
      {v.tipo === "simbolica" && <p className="mt-1 text-sm text-muted">Votação simbólica, sem placar nominal.</p>}
      {v.tipo === "secreta" && <p className="mt-1 text-sm text-muted">Votação secreta: a Casa não divulga o voto de cada parlamentar.</p>}
      {v.tipo === "semNominal" && (
        <p className="mt-1 text-sm leading-snug">
          {v.descricao}. <span className="text-muted">Os dados abertos do Senado não registram votação nominal nesta deliberação.</span>
        </p>
      )}
    </li>
  );
}

function CasaBlock({ casa, data }: { casa: Casa; data: PlacarCasa }) {
  return (
    <div className="mt-4">
      <h4 className="label-mono text-muted">{CASA[casa].nome}</h4>
      <ul className="mt-2">
        {data.votacoes.map((v) => (
          <Votacao key={v.id} casa={casa} v={v} />
        ))}
      </ul>
      {data.url && (
        <a href={data.url} target="_blank" rel="noopener noreferrer" className="mt-1 inline-block text-xs text-accent underline">
          {CASA[casa].link} ↗
        </a>
      )}
    </div>
  );
}

/** Placar oficial (Plenário da Câmara e do Senado) das proposições que a notícia cita. */
export function PlacarOficial({ slug, className = "" }: { slug: string; className?: string }) {
  const data = getNewsPlacares(slug);
  if (!data) return null;
  return (
    <section aria-labelledby="placar-oficial" className={`rounded-xl border border-border border-t-[3px] border-t-foreground bg-surface p-5 sm:p-6 ${className}`}>
      <p className="label-mono text-muted">Placar oficial</p>
      <h2 id="placar-oficial" className="mt-1 font-display text-lg font-bold tracking-tight">
        Como foi a votação no Plenário
      </h2>
      {data.items.map((p) => {
        const ementa = p.camara?.ementa ?? p.senado?.ementa;
        return (
          <div key={`${p.sigla}-${p.numero}-${p.ano}`} className="mt-5 border-t border-border pt-4 first-of-type:border-t-0 first-of-type:pt-0">
            <h3 className="font-display text-base font-bold">
              {p.sigla} {p.numero}/{p.ano}
            </h3>
            {ementa && <p className="mt-0.5 text-xs leading-snug text-muted">{ementa}</p>}
            {p.camara && p.camara.votacoes.length > 0 && <CasaBlock casa="camara" data={p.camara} />}
            {p.senado && p.senado.votacoes.length > 0 && <CasaBlock casa="senado" data={p.senado} />}
          </div>
        );
      })}
      <p className="mt-5 text-xs leading-relaxed text-muted">
        Fonte: <a className="underline" href="https://dadosabertos.camara.leg.br" target="_blank" rel="noopener noreferrer">dados abertos da Câmara</a> e{" "}
        <a className="underline" href="https://legis.senado.leg.br/dadosabertos" target="_blank" rel="noopener noreferrer">dados abertos do Senado</a>, consultados em {brDate(data.atualizadoEm)}. Só aparecem
        votações de Plenário registradas pelas Casas; em votação simbólica não há registro do voto de cada parlamentar. Veja{" "}
        <Link className="underline" href="/congresso#como-votou">como votou cada deputado e senador</Link> nas votações nominais mais recentes.
      </p>
    </section>
  );
}
