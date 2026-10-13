import Link from "next/link";
import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { Breadcrumbs } from "@/components/article/Breadcrumbs";
import { JsonLd } from "@/components/listing/JsonLd";
import { ListingHeader } from "@/components/listing/ListingHeader";
import { listingMetadata } from "@/components/listing/metadata";
import { absoluteUrl, breadcrumbJsonLd } from "@/lib/seo";
import { formatInt, formatPct, getMeta, partySlug, pct } from "@/lib/congress";
import { getEvolucao, type Snapshot } from "@/lib/congress-extra";
import { LegislatureNotice } from "./LegislatureNotice";
import { Card } from "./Stat";

const PATH = "/congresso/evolucao";
const TITLE = "Evolução das bancadas no Congresso: quem cresceu e quem diminuiu";
const DESC =
  "Composição da Câmara e do Senado por partido no início e no fim das legislaturas 55ª, 56ª e 57ª e hoje: variação em cadeiras e em pontos percentuais, com fontes e ressalvas.";

export const evolucaoMetadata = (): Metadata => listingMetadata({ title: TITLE, description: DESC, path: PATH });

const dateBR = (iso: string) => new Date(`${iso}T12:00:00-03:00`).toLocaleDateString("pt-BR", { timeZone: "America/Sao_Paulo" });
const signed = (n: number) => (n > 0 ? `+${formatInt(n)}` : n < 0 ? `-${formatInt(Math.abs(n))}` : "0");
const signedPp = (n: number) => `${n > 0 ? "+" : n < 0 ? "-" : ""}${Math.abs(n).toLocaleString("pt-BR", { minimumFractionDigits: 1, maximumFractionDigits: 1 })} pp`;

/**
 * Agrupamento por sucessão partidária: siglas que mudaram de nome ou se fundiram viram uma linha,
 * para a comparação entre legislaturas não mostrar partido "nascendo" ou "sumindo" só por causa
 * do nome. A tabela "como estava registrado" mostra os números sem agrupar.
 */
const GROUPS: { label: string; members: string[]; nota?: string }[] = [
  { label: "MDB", members: ["PMDB", "MDB"], nota: "PMDB passou a se chamar MDB." },
  { label: "PL", members: ["PR", "PL"], nota: "PR passou a se chamar PL." },
  { label: "REPUBLICANOS", members: ["PRB", "REPUBLICANOS"], nota: "PRB passou a se chamar Republicanos." },
  { label: "AVANTE", members: ["PTdoB", "AVANTE"], nota: "PT do B passou a se chamar Avante." },
  { label: "CIDADANIA", members: ["PPS", "CIDADANIA"], nota: "PPS passou a se chamar Cidadania." },
  { label: "SOLIDARIEDADE (com PROS)", members: ["SD", "SOLIDARIEDADE", "PROS"], nota: "SD passou a se chamar Solidariedade, que depois incorporou o PROS." },
  { label: "PODE (com PTN, PHS e PSC)", members: ["PTN", "PODE", "PHS", "PSC"], nota: "PTN passou a se chamar Podemos, que depois incorporou PHS e PSC." },
  { label: "UNIÃO (DEM + PSL)", members: ["DEM", "PSL", "UNIÃO"], nota: "União Brasil nasceu da fusão entre DEM e PSL." },
  { label: "PRD (PTB + Patriota)", members: ["PTB", "PEN", "PATRI", "PATRIOTA", "PRP", "PRD"], nota: "PEN passou a se chamar Patriota (PRP foi incorporado a ele); PTB e Patriota se fundiram no PRD." },
  { label: "DC", members: ["PSDC", "DC"], nota: "PSDC passou a se chamar Democracia Cristã." },
  { label: "PP", members: ["PP", "PP**"], nota: "Progressistas; a base antiga registra a sigla como “PP**”." },
  { label: "Sem partido", members: ["S.PART.", "S/Partido", "Sem partido"], nota: "Sem filiação registrada na data." },
];
const GROUP_OF = new Map(GROUPS.flatMap((g) => g.members.map((m) => [m, g.label] as const)));
const groupOf = (sigla: string) => GROUP_OF.get(sigla) ?? sigla;

const SNAP_HEAD: Record<string, string> = {
  "55-inicio": "Início da 55ª",
  "55-fim": "Fim da 55ª",
  "56-inicio": "Início da 56ª",
  "56-fim": "Fim da 56ª",
  "57-inicio": "Início da 57ª",
  "57-hoje": "Hoje (57ª)",
};

const COMPARISONS = [
  { from: "55-inicio", to: "56-inicio", title: "Do início da 55ª (2015) ao início da 56ª (2019)" },
  { from: "56-inicio", to: "57-inicio", title: "Do início da 56ª (2019) ao início da 57ª (2023)" },
  { from: "57-inicio", to: "57-hoje", title: "Do início da 57ª (2023) a hoje" },
] as const;

type Casa = "camara" | "senado";

function grouped(snap: Snapshot): Map<string, number> {
  const m = new Map<string, number>();
  for (const [sigla, n] of Object.entries(snap.partidos)) m.set(groupOf(sigla), (m.get(groupOf(sigla)) ?? 0) + n);
  return m;
}

function DivergingBars({ rows, max }: { rows: { label: string; delta: number; pp: number; from: number; to: number }[]; max: number }) {
  return (
    <ul className="space-y-2" role="list">
      {rows.map((r) => {
        const w = max > 0 ? (Math.abs(r.delta) / max) * 50 : 0;
        return (
          <li key={r.label} className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-x-2 gap-y-0.5 text-sm sm:grid-cols-[12rem_minmax(0,1fr)_9.5rem]" title={`${r.label}: ${r.from} → ${r.to} cadeiras`}>
            <span className="truncate font-medium sm:col-start-1">{r.label}</span>
            <span className="text-right font-mono text-xs tabular-nums sm:col-start-3 sm:row-start-1">
              {signed(r.delta)} <span className="text-muted">({signedPp(r.pp)})</span>
            </span>
            <span className="relative col-span-2 h-3.5 bg-surface-2 sm:col-span-1 sm:col-start-2 sm:row-start-1" aria-hidden="true">
              <span className="absolute inset-y-0 left-1/2 w-px bg-foreground" />
              {r.delta !== 0 && (
                <span
                  className={`absolute inset-y-0 ${r.delta > 0 ? "left-1/2 bg-accent" : "right-1/2 bg-accent-2"}`}
                  style={{ width: `${Math.max(w, 0.8)}%` }}
                />
              )}
            </span>
          </li>
        );
      })}
    </ul>
  );
}

function CasaSection({ casa, snaps }: { casa: Casa; snaps: Snapshot[] }) {
  const byId = new Map(snaps.map((s) => [s.id, s]));
  const order = Object.keys(SNAP_HEAD).filter((id) => byId.has(id));
  const g = new Map(order.map((id) => [id, grouped(byId.get(id)!)]));
  const labels = [...new Set(order.flatMap((id) => [...g.get(id)!.keys()]))];
  const hoje = g.get("57-hoje");
  labels.sort((a, b) => (hoje?.get(b) ?? 0) - (hoje?.get(a) ?? 0) || Math.max(...order.map((id) => g.get(id)!.get(b) ?? 0)) - Math.max(...order.map((id) => g.get(id)!.get(a) ?? 0)) || a.localeCompare(b, "pt-BR"));
  const nome = casa === "camara" ? "Câmara dos Deputados" : "Senado Federal";
  const seats = casa === "camara" ? 513 : 81;
  const total = (id: string) => byId.get(id)?.total ?? 0;
  const num = (id: string, l: string) => g.get(id)?.get(l) ?? 0;

  const comps = COMPARISONS.filter((c) => byId.has(c.from) && byId.has(c.to)).map((c) => {
    const rows = labels
      .map((label) => {
        const from = num(c.from, label);
        const to = num(c.to, label);
        return { label, from, to, delta: to - from, pp: pct(to, total(c.to)) - pct(from, total(c.from)) };
      })
      .filter((r) => r.from > 0 || r.to > 0)
      .sort((a, b) => b.delta - a.delta || b.to - a.to || a.label.localeCompare(b.label, "pt-BR"));
    return { ...c, rows, max: Math.max(1, ...rows.map((r) => Math.abs(r.delta))) };
  });

  const raw = order.map((id) => ({ id, snap: byId.get(id)! }));
  const rawSiglas = [...new Set(raw.flatMap((r) => Object.keys(r.snap.partidos)))].sort((a, b) => (byId.get("57-hoje")?.partidos[b] ?? 0) - (byId.get("57-hoje")?.partidos[a] ?? 0) || a.localeCompare(b, "pt-BR"));

  return (
    <section id={casa} aria-labelledby={`${casa}-t`} className="mt-12 scroll-mt-24">
      <h2 id={`${casa}-t`} className="border-t-[3px] border-foreground pt-3 font-display text-2xl font-bold tracking-tight sm:text-3xl">
        {nome}
      </h2>
      <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted">
        {casa === "camara"
          ? "513 cadeiras renovadas a cada quatro anos, por voto proporcional. Em cada data, contamos os deputados em exercício e a sigla do partido registrada pela Câmara naquele dia."
          : "81 cadeiras: três por estado e pelo Distrito Federal, com renovação alternada de um terço e de dois terços a cada quatro anos. Em cada data, contamos os senadores em exercício e a filiação registrada pelo Senado naquele dia."}
      </p>

      <div className="mt-5 grid gap-6 xl:grid-cols-2">
        {comps.map((c) => (
          <Card
            key={c.from + c.to}
            id={`${casa}-${c.to}`}
            title={c.title}
            note={
              <>
                Barras para a direita: ganhou cadeiras; para a esquerda: perdeu. Entre parênteses, a variação da fatia do total em pontos percentuais (pp). {SNAP_HEAD[c.from]}: {formatInt(total(c.from))} em exercício; {SNAP_HEAD[c.to]}: {formatInt(total(c.to))}.
              </>
            }
          >
            <DivergingBars rows={c.rows} max={c.max} />
          </Card>
        ))}
      </div>

      <Card id={`${casa}-tabela`} title="Cadeiras por partido em cada data" className="mt-6" note={`Partidos agrupados por sucessão (veja a tabela de correspondência abaixo). Entre colchetes, a fatia do total em exercício. Total contado em cada data: ${order.map((id) => `${SNAP_HEAD[id]} ${formatInt(total(id))}`).join("; ")}; referência: ${seats} cadeiras.`}>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] border-collapse text-sm">
            <thead>
              <tr className="text-left">
                <th scope="col" className="sticky left-0 bg-surface pb-2 pr-3 label-mono text-muted">
                  Partido
                </th>
                {order.map((id) => (
                  <th key={id} scope="col" className="pb-2 pl-3 text-right label-mono text-muted">
                    {SNAP_HEAD[id]}
                    <span className="block font-normal normal-case tracking-normal">{dateBR(byId.get(id)!.data)}</span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {labels.map((l) => (
                <tr key={l} className="border-t border-border">
                  <th scope="row" className="sticky left-0 bg-surface py-1.5 pr-3 text-left font-medium">
                    {hoje?.has(l) && !l.includes("(") && l !== "Sem partido" ? (
                      <Link className="text-accent underline decoration-accent/40 underline-offset-2" href={`/congresso/partidos/${partySlug(l)}`}>
                        {l}
                      </Link>
                    ) : (
                      l
                    )}
                  </th>
                  {order.map((id) => {
                    const n = num(id, l);
                    return (
                      <td key={id} className="py-1.5 pl-3 text-right font-mono text-xs tabular-nums">
                        {n || <span className="text-muted">-</span>}
                        {n > 0 && <span className="text-muted"> [{formatPct(pct(n, total(id)), 1)}]</span>}
                      </td>
                    );
                  })}
                </tr>
              ))}
              <tr className="border-t-2 border-foreground">
                <th scope="row" className="sticky left-0 bg-surface py-1.5 pr-3 text-left">
                  Total em exercício
                </th>
                {order.map((id) => (
                  <td key={id} className="py-1.5 pl-3 text-right font-mono text-xs font-semibold tabular-nums">
                    {formatInt(total(id))}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </Card>

      <details className="mt-4 border border-border bg-surface p-4">
        <summary className="cursor-pointer text-sm font-semibold">Ver como estava registrado, sem agrupar por sucessão</summary>
        <div className="mt-3 overflow-x-auto">
          <table className="w-full min-w-[640px] border-collapse text-sm">
            <thead>
              <tr className="text-left">
                <th scope="col" className="pb-2 pr-3 label-mono text-muted">
                  Sigla na data
                </th>
                {order.map((id) => (
                  <th key={id} scope="col" className="pb-2 pl-3 text-right label-mono text-muted">
                    {SNAP_HEAD[id]}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rawSiglas.map((s) => (
                <tr key={s} className="border-t border-border">
                  <th scope="row" className="py-1 pr-3 text-left font-medium">
                    {s}
                  </th>
                  {order.map((id) => (
                    <td key={id} className="py-1 pl-3 text-right font-mono text-xs tabular-nums">
                      {byId.get(id)!.partidos[s] ?? <span className="text-muted">-</span>}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </details>
    </section>
  );
}

export function EvolucaoPage() {
  const ev = getEvolucao();
  const meta = getMeta();
  const ld = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: TITLE,
    description: DESC,
    url: absoluteUrl(PATH),
    inLanguage: "pt-BR",
    dateModified: ev.atualizadoEm,
  };
  return (
    <>
      <JsonLd data={ld} />
      <JsonLd data={breadcrumbJsonLd([{ name: "Início", path: "/" }, { name: "Congresso Nacional", path: "/congresso" }, { name: "Evolução das bancadas", path: PATH }])} />
      <Container className="py-8 sm:py-12">
        <Breadcrumbs items={[{ name: "Início", href: "/" }, { name: "Congresso", href: "/congresso" }, { name: "Evolução das bancadas" }]} className="mb-6" />
        <ListingHeader
          label="Congresso Nacional"
          title="Evolução das bancadas"
          description="Como a composição por partido mudou entre as legislaturas 55ª (2015 a 2019), 56ª (2019 a 2023) e 57ª (2023 a 2027): quem ganhou e quem perdeu cadeiras, em número e em fatia do total."
          count={`Câmara e Senado · dados oficiais coletados em ${dateBR(ev.atualizadoEm)}`}
        />
        <nav aria-label="Seções" className="mt-6 flex gap-4 text-sm">
          <a className="text-accent underline" href="#camara">
            Câmara
          </a>
          <a className="text-accent underline" href="#senado">
            Senado
          </a>
          <a className="text-accent underline" href="#ressalvas">
            Ressalvas e fontes
          </a>
        </nav>
        <LegislatureNotice className="mt-6" />

        <CasaSection casa="camara" snaps={ev.camara} />
        <CasaSection casa="senado" snaps={ev.senado} />

        <section id="ressalvas" aria-labelledby="ressalvas-t" className="mt-12 scroll-mt-24 border-y-[3px] border-double border-foreground bg-surface-2/50 px-4 py-5 text-sm leading-relaxed">
          <h2 id="ressalvas-t" className="font-display text-2xl font-bold">
            Ressalvas e fontes
          </h2>
          <ul className="mt-3 list-disc space-y-2 pl-5">
            <li>
              <strong>Datas de referência.</strong> &quot;Início&quot; é 1º de fevereiro, dia da posse; &quot;fim&quot; é o penúltimo dia da legislatura (30 de janeiro), para pegar a composição antes da troca; &quot;hoje&quot; é a lista de quem está em exercício na data da coleta ({dateBR(meta.atualizadoEm)}). No início, alguns parlamentares tomam posse nos dias seguintes e entram só na contagem seguinte.
            </li>
            <li>
              <strong>Quem conta.</strong> Parlamentar em exercício na data, titular ou suplente. Titulares licenciados não contam (quem os substitui conta). Por isso o total pode ficar abaixo de 513 na Câmara ou de 81 no Senado; os totais de cada data estão na tabela.
            </li>
            <li>
              <strong>Trocas de partido.</strong> A sigla é a registrada pela Casa naquele dia. Quem mudou de partido depois da eleição aparece no partido novo a partir da troca. Por isso a bancada &quot;do início&quot; já pode diferir do resultado da eleição.
            </li>
            <li>
              <strong>Fusões, renomeações e federações.</strong> Siglas que mudaram de nome ou se fundiram foram agrupadas em uma linha (tabela abaixo). Federações partidárias (como as formadas em 2022) não são somadas: cada partido da federação é contado separadamente, como a Câmara e o Senado registram. A tabela sem agrupar está em cada Casa.
            </li>
            <li>
              <strong>Suplentes e vagas.</strong> O Senado elege um titular e dois suplentes por vaga; só aparece quem exercia o mandato na data. Em dias de transição (titular que deixou o cargo antes de o suplente tomar posse), a contagem fica abaixo de 81.
            </li>
            <li>
              <strong>Siglas no Senado.</strong> O cadastro de filiações do Senado pode mostrar a sigla atual de um partido que mudou de nome (por exemplo, PL para quem estava no PR). Por isso a tabela sem agrupar do Senado não deve ser lida como a sigla usada na época; o agrupamento por sucessão resolve essa diferença.
            </li>
            <li>
              <strong>Comparação.</strong> Variação em cadeiras é a diferença simples entre duas datas; a fatia (pp) divide pelo total em exercício em cada data. A ordem das barras é pelo valor da variação, sem juízo sobre os partidos.
            </li>
          </ul>

          <h3 className="mt-5 font-display text-lg font-bold">Como agrupamos as siglas</h3>
          <div className="mt-2 overflow-x-auto">
            <table className="w-full min-w-[560px] border-collapse text-sm">
              <thead>
                <tr className="text-left">
                  <th scope="col" className="pb-2 pr-3 label-mono text-muted">
                    Linha na tabela
                  </th>
                  <th scope="col" className="pb-2 pr-3 label-mono text-muted">
                    Siglas somadas
                  </th>
                  <th scope="col" className="pb-2 label-mono text-muted">
                    Motivo
                  </th>
                </tr>
              </thead>
              <tbody>
                {GROUPS.map((gr) => (
                  <tr key={gr.label} className="border-t border-border align-top">
                    <th scope="row" className="py-1.5 pr-3 text-left font-medium">
                      {gr.label}
                    </th>
                    <td className="py-1.5 pr-3 font-mono text-xs">{gr.members.join(", ")}</td>
                    <td className="py-1.5 text-muted">{gr.nota}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-2 text-xs text-muted">O agrupamento é da redação, para tornar a comparação legível. Siglas fora da tabela aparecem como foram registradas. Se um agrupamento não refletir o seu critério, use a tabela sem agrupar.</p>

          <h3 className="mt-5 font-display text-lg font-bold">Fontes</h3>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            <li>
              Câmara dos Deputados, dados abertos: <a className="text-accent underline" href="https://dadosabertos.camara.leg.br/api/v2/legislaturas" target="_blank" rel="noopener noreferrer">legislaturas</a> e histórico de cada deputado (<span className="font-mono text-xs">/deputados/{"{id}"}/historico</span>), com situação e partido a cada data.
            </li>
            <li>
              Senado Federal, dados abertos: <a className="text-accent underline" href="https://legis.senado.leg.br/dadosabertos/senador/lista/legislatura/57" target="_blank" rel="noopener noreferrer">senadores por legislatura</a>, mandatos com os períodos de exercício e filiações partidárias de cada senador.
            </li>
            <li>
              Dados coletados em {dateBR(ev.atualizadoEm)}; qualquer divergência com a página oficial é resolvida a favor da fonte oficial.
            </li>
          </ul>
        </section>
      </Container>
    </>
  );
}
