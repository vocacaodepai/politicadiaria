import Link from "next/link";
import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { Breadcrumbs } from "@/components/article/Breadcrumbs";
import { JsonLd } from "@/components/listing/JsonLd";
import { ListingHeader } from "@/components/listing/ListingHeader";
import { listingMetadata } from "@/components/listing/metadata";
import { absoluteUrl, breadcrumbJsonLd } from "@/lib/seo";
import { UF_NAMES, formatBRL, formatBRLShort, formatInt, formatPct, getMeta, getRemuneracao, getSummary, partySlug, pct, type SourceLink } from "@/lib/congress";
import { NUMERO_SLUGS, getNumeros, type NumeroRow, type NumeroSlug } from "@/lib/congress-extra";
import { BarList } from "./Bars";
import { LegislatureNotice } from "./LegislatureNotice";
import { Card, StatTile } from "./Stat";

const dateBR = (iso: string) => new Date(`${iso}T12:00:00-03:00`).toLocaleDateString("pt-BR", { timeZone: "America/Sao_Paulo" });
const monthBR = (ym: string) => {
  const [y, m] = ym.split("-");
  return `${m}/${y}`;
};

type Kind = "gasto" | "ausencia" | "fixo";
type Theme = { slug: NumeroSlug; kind: Kind; casa?: "camara" | "senado"; short: string; title: string; desc: string; crumb: string };

export const THEMES: Theme[] = [
  {
    slug: "cota-camara",
    kind: "gasto",
    casa: "camara",
    short: "Cota parlamentar (CEAP)",
    crumb: "Cota da Câmara",
    title: "Cota parlamentar da Câmara (CEAP): quanto cada partido e estado usou",
    desc: "Quanto os deputados federais usaram da cota parlamentar desde fevereiro de 2023: total, média mensal por partido e por estado, maiores e menores valores e fontes oficiais.",
  },
  {
    slug: "ceaps-senado",
    kind: "gasto",
    casa: "senado",
    short: "CEAPS no Senado",
    crumb: "CEAPS do Senado",
    title: "CEAPS do Senado: quanto cada partido e estado usou",
    desc: "Quanto os senadores usaram da cota para o exercício da atividade parlamentar (CEAPS) desde fevereiro de 2023: total, média mensal por partido e por estado, maiores e menores valores e fontes.",
  },
  {
    slug: "subsidio",
    kind: "fixo",
    short: "Subsídio mensal",
    crumb: "Subsídio",
    title: "Salário de deputados e senadores (subsídio): valor e como é definido",
    desc: "O subsídio mensal bruto de deputados federais e senadores, o que entra e o que não entra nessa conta e as fontes oficiais, com a data em que o valor foi conferido.",
  },
  {
    slug: "verba-gabinete",
    kind: "fixo",
    short: "Verba de gabinete",
    crumb: "Verba de gabinete",
    title: "Verba de gabinete dos deputados: teto, secretários e fontes",
    desc: "O limite mensal que cada deputado federal tem para pagar secretários parlamentares, quantos podem ser contratados, faixas de salário e as fontes oficiais.",
  },
  {
    slug: "auxilio-moradia",
    kind: "fixo",
    short: "Auxílio-moradia",
    crumb: "Auxílio-moradia",
    title: "Auxílio-moradia de deputados e senadores: valor, regra e fontes",
    desc: "Quem recebe auxílio-moradia na Câmara e no Senado, o valor mensal, quando o deputado usa apartamento funcional e onde conferir os dados oficiais.",
  },
  {
    slug: "ausencias-camara",
    kind: "ausencia",
    casa: "camara",
    short: "Votos não registrados na Câmara",
    crumb: "Ausências na Câmara",
    title: "Ausências em votações nominais na Câmara: por partido e estado",
    desc: "Em quantas votações nominais do Plenário cada deputado não teve voto registrado desde 2023, por partido e estado, com o que esse número mede e o que ele não mede.",
  },
  {
    slug: "ausencias-senado",
    kind: "ausencia",
    casa: "senado",
    short: "Ausências no Senado",
    crumb: "Ausências no Senado",
    title: "Ausências em votações nominais no Senado: por partido e estado",
    desc: "Em quantas votações nominais do Plenário cada senador não compareceu desde 2023, separando licença, missão e atividade parlamentar, por partido e estado.",
  },
];

const byslug = (slug: string) => THEMES.find((t) => t.slug === slug);
export const numeroParams = () => NUMERO_SLUGS.map((slug) => ({ tema: slug }));

export function numeroMetadata(slug: string): Metadata {
  const t = byslug(slug);
  if (!t) return {};
  return listingMetadata({ title: t.title, description: t.desc, path: `/congresso/numeros/${t.slug}` });
}

/* ------------------------------------------------------------- cálculos */

type Agg = { key: string; n: number; g: number; m: number; a: number; t: number; r: number; af: number; ps: number };

function aggregate(rows: NumeroRow[], by: "p" | "u"): Agg[] {
  const map = new Map<string, Agg>();
  for (const r of rows) {
    const k = r[by];
    const a = map.get(k) ?? { key: k, n: 0, g: 0, m: 0, a: 0, t: 0, r: 0, af: 0, ps: 0 };
    a.n++;
    a.g += r.g;
    a.m += r.m;
    a.a += r.a;
    a.t += r.t;
    a.r += r.r;
    a.af += r.af ?? 0;
    a.ps += r.ps ?? 0;
    map.set(k, a);
  }
  return [...map.values()];
}

const monthly = (r: { g: number; m: number }) => (r.m > 0 ? r.g / r.m : 0);
const absRate = (r: { a: number; t: number }) => (r.t > 0 ? (r.a / r.t) * 100 : 0);
const median = (xs: number[]) => {
  if (!xs.length) return 0;
  const s = [...xs].sort((a, b) => a - b);
  const h = s.length >> 1;
  return s.length % 2 ? s[h] : (s[h - 1] + s[h]) / 2;
};
const ufName = (uf: string) => `${UF_NAMES[uf] ?? uf}`;

/* ------------------------------------------------------------ blocos de UI */

function Sources({ items, verifiedAt, collectedAt }: { items: (SourceLink & { nota?: string })[]; verifiedAt?: string; collectedAt?: string }) {
  return (
    <section aria-labelledby="fontes" className="mt-6 border-y-[3px] border-double border-foreground bg-surface-2/50 px-4 py-4 text-sm leading-relaxed">
      <h2 id="fontes" className="font-display text-xl font-bold">
        Fontes
      </h2>
      <ul className="mt-2 list-disc space-y-1.5 pl-5">
        {items.map((s) => (
          <li key={s.url}>
            <a className="text-accent underline" href={s.url} target="_blank" rel="noopener noreferrer">
              {s.rotulo}
            </a>
            {s.nota ? <span className="text-muted"> ({s.nota})</span> : null}
            <span className="block break-all font-mono text-[11px] text-muted">{s.url}</span>
          </li>
        ))}
      </ul>
      <p className="mt-3 text-xs text-muted">
        {verifiedAt && <>Valores de referência conferidos nas páginas oficiais em <strong className="text-foreground">{dateBR(verifiedAt)}</strong>. </>}
        {collectedAt && <>Totais por parlamentar coletados dos dados abertos em <strong className="text-foreground">{dateBR(collectedAt)}</strong>. </>}
        Se a fonte oficial divergir desta página, vale a fonte oficial. Encontrou um erro? <Link href="/contato" className="text-accent underline">Fale com a redação</Link>.
      </p>
    </section>
  );
}

function OtherThemes({ current }: { current: string }) {
  return (
    <nav aria-label="Outros números" className="mt-8">
      <h2 className="label-mono text-muted">Outros números do Congresso</h2>
      <ul className="mt-2 flex flex-wrap gap-2">
        {THEMES.filter((t) => t.slug !== current).map((t) => (
          <li key={t.slug}>
            <Link href={`/congresso/numeros/${t.slug}`} className="card-hover inline-block border border-border bg-surface px-3 py-1.5 text-sm">
              {t.short}
            </Link>
          </li>
        ))}
        <li>
          <Link href="/congresso" className="card-hover inline-block border border-border bg-surface px-3 py-1.5 text-sm">
            Visão geral do Congresso
          </Link>
        </li>
      </ul>
    </nav>
  );
}

function Pill({ children }: { children: React.ReactNode }) {
  return <span className="font-mono text-xs tabular-nums">{children}</span>;
}

function DistTable({ rows, cols, first, firstHref }: { rows: Agg[]; cols: { head: string; cell: (a: Agg) => React.ReactNode; right?: boolean }[]; first: string; firstHref?: (a: Agg) => string | null }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[480px] border-collapse text-sm">
        <thead>
          <tr className="text-left">
            <th scope="col" className="pb-2 pr-3 label-mono text-muted">
              {first}
            </th>
            <th scope="col" className="pb-2 pr-3 text-right label-mono text-muted">
              Parlamentares
            </th>
            {cols.map((c) => (
              <th key={c.head} scope="col" className="pb-2 pl-3 text-right label-mono text-muted">
                {c.head}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((a) => {
            const href = firstHref?.(a);
            return (
              <tr key={a.key} className="border-t border-border">
                <th scope="row" className="py-1.5 pr-3 text-left font-medium">
                  {href ? (
                    <Link className="text-accent underline decoration-accent/40 underline-offset-2" href={href}>
                      {a.key}
                    </Link>
                  ) : (
                    a.key
                  )}
                  {a.n < 3 && <span title="Poucos parlamentares: a média é sensível a um único caso"> *</span>}
                </th>
                <td className="py-1.5 pr-3 text-right">
                  <Pill>{a.n}</Pill>
                </td>
                {cols.map((c) => (
                  <td key={c.head} className="py-1.5 pl-3 text-right">
                    <Pill>{c.cell(a)}</Pill>
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function PersonTable({ rows, casa, cols }: { rows: NumeroRow[]; casa: "camara" | "senado"; cols: { head: string; cell: (r: NumeroRow) => React.ReactNode }[] }) {
  const base = casa === "camara" ? "/congresso/deputados" : "/congresso/senadores";
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[460px] border-collapse text-sm">
        <thead>
          <tr className="text-left">
            <th scope="col" className="pb-2 pr-3 label-mono text-muted">
              {casa === "camara" ? "Deputado" : "Senador"}
            </th>
            {cols.map((c) => (
              <th key={c.head} scope="col" className="pb-2 pl-3 text-right label-mono text-muted">
                {c.head}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.s} className="border-t border-border">
              <th scope="row" className="py-1.5 pr-3 text-left font-medium">
                <Link className="text-accent underline decoration-accent/40 underline-offset-2" href={`${base}/${r.s}`}>
                  {r.n}
                </Link>{" "}
                <span className="font-normal text-muted">
                  {r.p}-{r.u}
                </span>
              </th>
              {cols.map((c) => (
                <td key={c.head} className="py-1.5 pl-3 text-right">
                  <Pill>{c.cell(r)}</Pill>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ------------------------------------------------------------- página */

export function NumeroPage({ slug }: { slug: NumeroSlug }) {
  const theme = byslug(slug)!;
  const meta = getMeta();
  const path = `/congresso/numeros/${slug}`;
  const ld = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: theme.title,
    description: theme.desc,
    url: absoluteUrl(path),
    inLanguage: "pt-BR",
    dateModified: meta.atualizadoEm,
  };
  return (
    <>
      <JsonLd data={ld} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Início", path: "/" },
          { name: "Congresso Nacional", path: "/congresso" },
          { name: "Números", path: "/congresso/numeros" },
          { name: theme.crumb, path },
        ])}
      />
      <Container className="py-8 sm:py-12">
        <Breadcrumbs
          items={[{ name: "Início", href: "/" }, { name: "Congresso", href: "/congresso" }, { name: "Números", href: "/congresso/numeros" }, { name: theme.crumb }]}
          className="mb-6"
        />
        <ListingHeader label="Números do Congresso" title={theme.title} description={theme.desc} count={`${meta.legislatura}ª legislatura · dados coletados em ${dateBR(meta.atualizadoEm)}`} />
        <LegislatureNotice className="mt-6" />
        <div className="mt-8">
          {theme.kind === "gasto" && <GastoBody theme={theme} />}
          {theme.kind === "ausencia" && <AusenciaBody theme={theme} />}
          {theme.kind === "fixo" && <FixoBody slug={slug} />}
        </div>
        <OtherThemes current={slug} />
      </Container>
    </>
  );
}

/* ------------------------------------------------------- cota / CEAPS */

function GastoBody({ theme }: { theme: Theme }) {
  const casa = theme.casa!;
  const nums = getNumeros();
  const rem = getRemuneracao();
  const rows = nums[casa];
  const isCam = casa === "camara";
  const total = rows.reduce((a, r) => a + r.g, 0);
  const months = rows.reduce((a, r) => a + r.m, 0);
  const med = median(rows.map(monthly));
  const parties = aggregate(rows, "p").sort((a, b) => monthly(b) - monthly(a) || a.key.localeCompare(b.key, "pt-BR"));
  const ufs = aggregate(rows, "u").sort((a, b) => monthly(b) - monthly(a) || a.key.localeCompare(b.key, "pt-BR"));
  const ranked = [...rows].sort((a, b) => monthly(b) - monthly(a) || a.n.localeCompare(b.n, "pt-BR"));
  const top = ranked.slice(0, 12);
  const bottom = ranked.slice(-12).reverse();
  const topPartiesMax = Math.max(...parties.map(monthly));
  const topUfMax = Math.max(...ufs.map(monthly));
  const name = isCam ? "cota parlamentar (CEAP)" : "CEAPS";
  const who = isCam ? "deputados" : "senadores";
  const cols = [
    { head: "Total no período", cell: (r: NumeroRow) => formatBRLShort(r.g) },
    { head: "Meses", cell: (r: NumeroRow) => String(r.m) },
    { head: "Média por mês", cell: (r: NumeroRow) => formatBRLShort(monthly(r)) },
  ];

  const sources: (SourceLink & { nota?: string })[] = isCam
    ? [
        { ...rem.camara.cota.fonteOficial, nota: "regras da cota e valores oficiais" },
        { rotulo: "Câmara dos Deputados: Gastos parlamentares (verbas e recursos)", url: rem.camara.verbaGabinete.fonte.url },
        { rotulo: "Câmara dos Deputados: dados abertos (despesas da cota parlamentar)", url: "https://dadosabertos.camara.leg.br" },
        { ...rem.camara.cota.fonte, nota: "extremos de 2026 do teto por estado" },
      ]
    : [
        { ...rem.senado.cota.fonte, nota: "base oficial das despesas reembolsadas" },
        { rotulo: "Senado Federal: Dados abertos", url: "https://www12.senado.leg.br/dados-abertos" },
      ];

  return (
    <>
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <StatTile label={`Total usado em ${isCam ? "CEAP" : "CEAPS"}`} value={formatBRLShort(total)} hint={`${formatInt(rows.length)} ${who} em exercício, de ${monthBR(nums.inicio)} a ${monthBR(nums.ultimoMes)}`} />
        <StatTile label="Média mensal por parlamentar" value={formatBRLShort(months > 0 ? total / months : 0)} hint="total dividido pelos meses de exercício na legislatura" />
        <StatTile label="Mediana mensal" value={formatBRLShort(med)} hint="metade dos parlamentares ficou abaixo, metade acima" />
        <StatTile
          label={isCam ? "Teto mensal por estado" : "Teto mensal"}
          value={isCam ? `${formatBRLShort(rem.camara.cota.minimoMensal)} a ${formatBRLShort(rem.camara.cota.maximoMensal)}` : "Varia por estado"}
          hint={isCam ? `de ${rem.camara.cota.minimoUf} a ${rem.camara.cota.maximoUf}, extremos de 2026 conferidos em ${dateBR(rem.verificadoEm)}` : "o Senado não publica o limite em tabela consultável; por isso não o exibimos"}
        />
      </div>

      <Card id="calculo" title="Como o número é calculado" className="mt-6">
        <ul className="list-disc space-y-1.5 pl-5 text-sm leading-relaxed">
          <li>
            <strong>O que é:</strong> {isCam ? rem.camara.cota.descricao : rem.senado.cota.descricao}
          </li>
          <li>
            <strong>Total:</strong> soma {isCam ? "dos valores líquidos dos documentos fiscais reembolsados" : "dos valores reembolsados"} a cada parlamentar em exercício hoje, de fevereiro de 2023 até {monthBR(nums.ultimoMes)} (mês em andamento). Valores podem ser corrigidos pela {isCam ? "Câmara" : "Casa"} depois da coleta.
          </li>
          <li>
            <strong>Média por mês:</strong> total dividido pelos meses entre o início do exercício do parlamentar na legislatura (ou fevereiro de 2023) e {monthBR(nums.ultimoMes)}. Licenças e períodos de suplência dentro desse intervalo reduzem a média e não são descontados.
          </li>
          <li>
            <strong>Por partido e por estado:</strong> total de todos os parlamentares do grupo dividido pela soma dos meses deles, o que evita que bancadas grandes pareçam gastar mais só por terem mais gente.
          </li>
          <li>
            <strong>O que o número não diz:</strong> não mede desempenho, regularidade ou legalidade do gasto. Parte da diferença entre estados vem do teto, que muda com o custo de deslocamento até Brasília, e parte do tempo de exercício. Para ver o detalhe de cada gasto, abra a ficha do parlamentar.
          </li>
        </ul>
      </Card>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <Card id="partidos" title="Por partido" note="Ordenado pela média mensal por parlamentar, do maior para o menor valor. A ordem é só de valor, sem juízo. * = menos de 3 parlamentares.">
          <BarList
            labelWidth="6.5rem"
            items={parties.map((a) => ({ label: a.key, value: monthly(a), display: formatBRLShort(monthly(a)), href: `/congresso/partidos/${partySlug(a.key)}` }))}
            max={topPartiesMax}
          />
        </Card>
        <Card id="estados" title="Por estado" note="Mesma conta, agrupada pelo estado que o parlamentar representa. O teto da cota é diferente em cada estado.">
          <BarList labelWidth="3rem" compact items={ufs.map((a) => ({ label: a.key, value: monthly(a), display: formatBRLShort(monthly(a)), hint: ufName(a.key) }))} max={topUfMax} />
        </Card>
      </div>

      <Card id="tabela-partidos" title="Tabela completa por partido" className="mt-6">
        <DistTable
          rows={parties}
          first="Partido"
          firstHref={(a) => `/congresso/partidos/${partySlug(a.key)}`}
          cols={[
            { head: "Total", cell: (a) => formatBRLShort(a.g) },
            { head: "Média por parlamentar, por mês", cell: (a) => formatBRLShort(monthly(a)) },
          ]}
        />
      </Card>
      <Card id="tabela-estados" title="Tabela completa por estado" className="mt-6">
        <DistTable
          rows={[...ufs].sort((a, b) => a.key.localeCompare(b.key))}
          first="Estado"
          cols={[
            { head: "Total", cell: (a) => formatBRLShort(a.g) },
            { head: "Média por parlamentar, por mês", cell: (a) => formatBRLShort(monthly(a)) },
          ]}
        />
      </Card>

      <div className="mt-6 grid gap-6 xl:grid-cols-2">
        <Card id="maiores" title="Maiores valores (média por mês)" note="Ordenados pela média mensal. Clique no nome para abrir a ficha com o detalhe por categoria e fornecedor.">
          <PersonTable rows={top} casa={casa} cols={cols} />
        </Card>
        <Card id="menores" title="Menores valores (média por mês)" note="Inclui quem assumiu há pouco, quem esteve de licença e quem usou pouco da cota. A tabela não distingue esses casos.">
          <PersonTable rows={bottom} casa={casa} cols={cols} />
        </Card>
      </div>

      <Sources items={sources} verifiedAt={rem.verificadoEm} collectedAt={nums.atualizadoEm} />
      <p className="mt-3 text-xs text-muted">
        Veja o consolidado da legislatura na <Link className="text-accent underline" href="/congresso#gastos-camara">visão geral do Congresso</Link> e as {name === "CEAPS" ? "regras do Senado" : "regras da Câmara"} nas fontes acima.
      </p>
    </>
  );
}

/* ------------------------------------------------------------ ausências */

function AusenciaBody({ theme }: { theme: Theme }) {
  const casa = theme.casa!;
  const nums = getNumeros();
  const rows = nums[casa];
  const isCam = casa === "camara";
  const who = isCam ? "deputados" : "senadores";
  const A =rows.reduce((a, r) => a + r.a, 0);
  const T = rows.reduce((a, r) => a + r.t, 0);
  const eligible = rows.filter((r) => r.t >= 100);
  const parties = aggregate(rows, "p").sort((a, b) => absRate(b) - absRate(a) || a.key.localeCompare(b.key, "pt-BR"));
  const ufs = aggregate(rows, "u").sort((a, b) => absRate(b) - absRate(a) || a.key.localeCompare(b.key, "pt-BR"));
  const ranked = [...eligible].sort((a, b) => absRate(b) - absRate(a) || a.n.localeCompare(b.n, "pt-BR"));
  const top = ranked.slice(0, 12);
  const bottom = ranked.slice(-12).reverse();
  const maxParty = Math.max(...parties.map(absRate));
  const maxUf = Math.max(...ufs.map(absRate));
  const med = median(eligible.map(absRate));
  const cols = isCam
    ? [
        { head: "Votações possíveis", cell: (r: NumeroRow) => formatInt(r.t) },
        { head: "Sem voto registrado", cell: (r: NumeroRow) => formatInt(r.a) },
        { head: "% sem registro", cell: (r: NumeroRow) => formatPct(absRate(r)) },
      ]
    : [
        { head: "Votações", cell: (r: NumeroRow) => formatInt(r.t) },
        { head: "Não compareceu", cell: (r: NumeroRow) => formatInt(r.a) },
        { head: "Licença, missão ou atividade", cell: (r: NumeroRow) => formatInt(r.af ?? 0) },
        { head: "Presente sem voto", cell: (r: NumeroRow) => formatInt(r.ps ?? 0) },
        { head: "% não compareceu", cell: (r: NumeroRow) => formatPct(absRate(r)) },
      ];
  const aggCols: { head: string; cell: (a: Agg) => React.ReactNode }[] = isCam
    ? [
        { head: "Votações possíveis", cell: (a) => formatInt(a.t) },
        { head: "Sem voto registrado", cell: (a) => formatInt(a.a) },
        { head: "% sem registro", cell: (a) => formatPct(absRate(a)) },
      ]
    : [
        { head: "Votações", cell: (a) => formatInt(a.t) },
        { head: "Não compareceu", cell: (a) => formatInt(a.a) },
        { head: "Licença, missão ou atividade", cell: (a) => formatInt(a.af) },
        { head: "% não compareceu", cell: (a) => formatPct(absRate(a)) },
      ];
  const nameCol = isCam ? "sem voto registrado" : "não compareceu";

  const sources: (SourceLink & { nota?: string })[] = isCam
    ? [
        { rotulo: "Câmara dos Deputados: dados abertos (votações e votos)", url: "https://dadosabertos.camara.leg.br" },
        { rotulo: "Câmara dos Deputados: arquivos em lote de votações", url: "https://dadosabertos.camara.leg.br/arquivos" },
      ]
    : [
        { rotulo: "Senado Federal: dados abertos (votações)", url: "https://legis.senado.leg.br/dadosabertos" },
        { rotulo: "Senado Federal: portal de dados abertos", url: "https://www12.senado.leg.br/dados-abertos" },
      ];

  return (
    <>
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <StatTile label={`Votações nominais consideradas`} value={formatInt(Math.max(0, ...rows.map((r) => r.t)))} hint="máximo possível para quem esteve em exercício o período todo" />
        <StatTile label={isCam ? "Votos não registrados" : "Não compareceu"} value={formatInt(A)} hint={`somando os ${formatInt(rows.length)} ${who}; ${formatPct(pct(A, T))} dos votos possíveis`} />
        <StatTile label="Mediana por parlamentar" value={formatPct(med)} hint="entre quem teve ao menos 100 votações possíveis" />
        <StatTile label="Período" value={`desde ${dateBR(getMeta().inicioLegislatura)}`} hint={`coleta de ${dateBR(nums.atualizadoEm)}`} />
      </div>

      <Card id="calculo" title="Como o número é calculado e o que ele não mede" className="mt-6">
        {isCam ? (
          <ul className="list-disc space-y-1.5 pl-5 text-sm leading-relaxed">
            <li>
              <strong>Votações possíveis:</strong> votações nominais do Plenário (com voto individual registrado) desde 1º/02/2023, em dias em que o histórico oficial indica o deputado em exercício. O primeiro e o último dia de cada período de exercício são desconsiderados, para não contar de forma errada trocas de titular e suplente.
            </li>
            <li>
              <strong>Sem voto registrado:</strong> votações possíveis em que não consta voto do deputado no registro oficial. Votações simbólicas, que não registram voto individual, ficam de fora.
            </li>
            <li>
              <strong>Por partido e por estado:</strong> soma dos votos não registrados do grupo dividida pela soma das votações possíveis de todos os integrantes.
            </li>
            <li>
              <strong>O que NÃO significa:</strong> não é o mesmo que falta em sessão. O número não mostra se o deputado estava presente sem votar, em missão oficial, em licença, em comissão ou com justificativa.
            </li>
          </ul>
        ) : (
          <ul className="list-disc space-y-1.5 pl-5 text-sm leading-relaxed">
            <li>
              <strong>Votações:</strong> votações nominais do Plenário do Senado desde 1º/02/2023, conforme o registro oficial de cada sessão.
            </li>
            <li>
              <strong>Categorias:</strong> o Senado registra o motivo da ausência. Mostramos separados &quot;não compareceu&quot;, &quot;licença, missão ou atividade parlamentar&quot; e &quot;presente sem voto&quot;, sem somar tudo como falta.
            </li>
            <li>
              <strong>% não compareceu:</strong> votações em que o registro oficial aponta que o senador não compareceu, dividido pelas votações do período dele. O voto secreto aparece como voto dado, sem o sentido do voto.
            </li>
            <li>
              <strong>Por partido e por estado:</strong> soma de cada categoria no grupo dividida pela soma das votações dos integrantes.
            </li>
            <li>
              <strong>O que NÃO significa:</strong> licenças, missões oficiais e atividade parlamentar são afastamentos previstos e não equivalem a falta injustificada.
            </li>
          </ul>
        )}
      </Card>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <Card id="partidos" title="Por partido" note={`Ordenado pelo percentual de ${nameCol}, do maior para o menor, sem juízo de valor. * = menos de 3 parlamentares.`}>
          <BarList
            labelWidth="6.5rem"
            items={parties.map((a) => ({ label: a.key, value: absRate(a), display: formatPct(absRate(a)), href: `/congresso/partidos/${partySlug(a.key)}` }))}
            max={maxParty}
          />
        </Card>
        <Card id="estados" title="Por estado" note="Mesma conta, agrupada pelo estado que o parlamentar representa.">
          <BarList labelWidth="3rem" compact items={ufs.map((a) => ({ label: a.key, value: absRate(a), display: formatPct(absRate(a)), hint: ufName(a.key) }))} max={maxUf} />
        </Card>
      </div>

      <Card id="tabela-partidos" title="Tabela completa por partido" className="mt-6">
        <DistTable rows={parties} first="Partido" firstHref={(a) => `/congresso/partidos/${partySlug(a.key)}`} cols={aggCols} />
      </Card>
      <Card id="tabela-estados" title="Tabela completa por estado" className="mt-6">
        <DistTable rows={[...ufs].sort((a, b) => a.key.localeCompare(b.key))} first="Estado" cols={aggCols} />
      </Card>

      <div className="mt-6 grid gap-6">
        <Card id="maiores" title={`Maiores percentuais de ${nameCol}`} note={`Só entram parlamentares com ao menos 100 votações possíveis, para que quem assumiu há pouco não distorça a lista. A tabela não considera licenças, missões ou justificativas${isCam ? "" : " além das colunas ao lado"}.`}>
          <PersonTable rows={top} casa={casa} cols={cols} />
        </Card>
        <Card id="menores" title={`Menores percentuais de ${nameCol}`} note="Mesmo critério da tabela anterior.">
          <PersonTable rows={bottom} casa={casa} cols={cols} />
        </Card>
      </div>

      <Sources items={sources} collectedAt={nums.atualizadoEm} />
    </>
  );
}

/* ------------------------------------------------------------- fixos */

function Calc({ children }: { children: React.ReactNode }) {
  return <div className="mt-3 border-l-[3px] border-foreground bg-surface-2/60 px-4 py-3 text-sm leading-relaxed">{children}</div>;
}

function FixoBody({ slug }: { slug: NumeroSlug }) {
  const rem = getRemuneracao();
  const s = getSummary();
  const ver = dateBR(rem.verificadoEm);
  const nDep = s.camara.total;
  const nSen = s.senado.total;

  if (slug === "subsidio") {
    const v = rem.subsidio.valor;
    return (
      <>
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          <StatTile label="Subsídio mensal bruto" value={formatBRL(v)} hint="igual para deputados e senadores" />
          <StatTile label={`Soma mensal: ${nDep} deputados`} value={formatBRLShort(v * nDep)} hint="multiplicação simples, sem 13º nem encargos" />
          <StatTile label={`Soma mensal: ${nSen} senadores`} value={formatBRLShort(v * nSen)} hint="multiplicação simples, sem 13º nem encargos" />
          <StatTile label="Conferido em" value={ver} hint="nas páginas oficiais abaixo" />
        </div>
        <Card id="calculo" title="Como o número é calculado" className="mt-6">
          <ul className="list-disc space-y-1.5 pl-5 text-sm leading-relaxed">
            <li>{rem.subsidio.descricao}</li>
            <li>É um valor único, fixado pelo Congresso: não varia por partido, estado ou tempo de mandato. Por isso esta página não tem ranking.</li>
            <li>O valor é bruto: o que o parlamentar recebe em mãos depende de Imposto de Renda, contribuição previdenciária e outros descontos individuais.</li>
            <li>Verbas indenizatórias (cota, verba de gabinete, auxílio-moradia) não fazem parte do subsídio: veja os outros números abaixo.</li>
          </ul>
          <Calc>
            <p>
              <strong>Conta:</strong> {formatBRL(v)} × {nDep} deputados em exercício = {formatBRL(v * nDep)} por mês. {formatBRL(v)} × {nSen} senadores = {formatBRL(v * nSen)} por mês. São produtos simples do valor oficial pelo número de parlamentares coletado, sem 13º salário, encargos ou descontos.
            </p>
          </Calc>
        </Card>
        <Sources
          items={[
            { ...rem.subsidio.fonte, nota: "Câmara" },
            { ...rem.subsidio.fonteSenado, nota: "Senado" },
          ]}
          verifiedAt={rem.verificadoEm}
        />
      </>
    );
  }

  if (slug === "verba-gabinete") {
    const g = rem.camara.verbaGabinete;
    return (
      <>
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          <StatTile label="Teto mensal por deputado" value={formatBRL(g.tetoMensal)} hint={`para até ${g.maxSecretarios} secretários parlamentares`} />
          <StatTile label="Salário mínimo de secretário" value={formatBRL(g.salarioMinimoSecretario)} hint="faixa oficial" />
          <StatTile label="Salário máximo de secretário" value={formatBRL(g.salarioMaximoSecretario)} hint="faixa oficial" />
          <StatTile label={`Teto somado: ${nDep} deputados`} value={formatBRLShort(g.tetoMensal * nDep)} hint="é um limite, não o gasto efetivo" />
        </div>
        <Card id="calculo" title="Como o número é calculado" className="mt-6">
          <ul className="list-disc space-y-1.5 pl-5 text-sm leading-relaxed">
            <li>{g.descricao}</li>
            <li>O teto é igual para todos os deputados: não há distribuição por partido ou estado para comparar. O quanto cada gabinete usa efetivamente não consta dos dados abertos que coletamos, então não o exibimos.</li>
            <li>No Senado, os assessores do gabinete são custeados pela Casa e o limite não foi verificado em fonte oficial consultável. {rem.senado.verbaGabinete.descricao}</li>
          </ul>
          <Calc>
            <p>
              <strong>Conta:</strong> {formatBRL(g.tetoMensal)} × {nDep} deputados = {formatBRL(g.tetoMensal * nDep)} por mês de <em>limite</em> somado. Quanto foi efetivamente pago varia de gabinete para gabinete e não é estimado aqui.
            </p>
          </Calc>
        </Card>
        <Sources
          items={[
            { ...g.fonte, nota: "Câmara" },
            { ...rem.senado.verbaGabinete.fonte, nota: "Senado, sobre a remuneração dos parlamentares" },
          ]}
          verifiedAt={rem.verificadoEm}
        />
      </>
    );
  }

  // auxilio-moradia
  const a = rem.camara.auxilioMoradia;
  return (
    <>
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <StatTile label="Auxílio-moradia (Câmara)" value={formatBRL(a.valorMensal)} hint="por mês, para quem não usa apartamento funcional" />
        <StatTile label="Apartamentos funcionais" value={formatInt(a.apartamentosFuncionais)} hint="da Câmara, em Brasília" />
        <StatTile label="Diárias em viagem nacional" value={formatBRL(rem.camara.diarias.nacionalPorDia)} hint="por dia, viagem oficial" />
        <StatTile label="Conferido em" value={ver} hint="nas páginas oficiais abaixo" />
      </div>
      <Card id="calculo" title="Como o número é calculado" className="mt-6">
        <ul className="list-disc space-y-1.5 pl-5 text-sm leading-relaxed">
          <li>{a.descricao}</li>
          <li>É um valor mensal fixo, igual para quem tem direito: não há distribuição por partido ou estado a comparar. Quantos parlamentares recebem em cada mês muda com o tempo e consta nos relatórios oficiais abaixo; por isso não somamos um total aqui.</li>
          <li>No Senado, a Casa publica relatório sobre quem recebe auxílio-moradia e quem usa imóvel funcional. {rem.senado.auxilioMoradia.descricao}</li>
          <li>{rem.camara.diarias.descricao}</li>
        </ul>
      </Card>
      <Sources
        items={[
          { ...a.fonte, nota: "Câmara" },
          { ...rem.senado.auxilioMoradia.fonte, nota: "Senado" },
        ]}
        verifiedAt={rem.verificadoEm}
      />
    </>
  );
}

/* ------------------------------------------------------------- índice */

export const numerosIndexMetadata = (): Metadata =>
  listingMetadata({
    title: "Números do Congresso: cota, salário, verbas e ausências com fontes",
    description: "Cada número do Congresso Nacional explicado: como é calculado, distribuição por partido e estado, maiores e menores valores e fontes oficiais com data de verificação.",
    path: "/congresso/numeros",
  });

export function NumerosIndexPage() {
  const meta = getMeta();
  const rem = getRemuneracao();
  const nums = getNumeros();
  const s = getSummary();
  const cam = nums.camara;
  const sen = nums.senado;
  const sumG = (rows: NumeroRow[]) => rows.reduce((a, r) => a + r.g, 0);
  const sumM = (rows: NumeroRow[]) => rows.reduce((a, r) => a + r.m, 0);
  const rate = (rows: NumeroRow[]) => formatPct(pct(rows.reduce((a, r) => a + r.a, 0), rows.reduce((a, r) => a + r.t, 0)));
  const tiles: Record<NumeroSlug, { value: string; hint: string }> = {
    "cota-camara": { value: formatBRLShort(sumG(cam)), hint: `média de ${formatBRLShort(sumG(cam) / Math.max(1, sumM(cam)))} por deputado, por mês` },
    "ceaps-senado": { value: formatBRLShort(sumG(sen)), hint: `média de ${formatBRLShort(sumG(sen) / Math.max(1, sumM(sen)))} por senador, por mês` },
    subsidio: { value: formatBRL(rem.subsidio.valor), hint: "por mês, bruto, igual nas duas Casas" },
    "verba-gabinete": { value: formatBRL(rem.camara.verbaGabinete.tetoMensal), hint: "teto mensal por deputado, até 25 secretários" },
    "auxilio-moradia": { value: formatBRL(rem.camara.auxilioMoradia.valorMensal), hint: "por mês, na Câmara, sem apartamento funcional" },
    "ausencias-camara": { value: rate(cam), hint: "dos votos possíveis em votações nominais sem registro" },
    "ausencias-senado": { value: rate(sen), hint: "das votações nominais com “não compareceu”" },
  };
  const ld = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Números do Congresso",
    url: absoluteUrl("/congresso/numeros"),
    inLanguage: "pt-BR",
    dateModified: meta.atualizadoEm,
  };
  void s;
  return (
    <>
      <JsonLd data={ld} />
      <JsonLd data={breadcrumbJsonLd([{ name: "Início", path: "/" }, { name: "Congresso Nacional", path: "/congresso" }, { name: "Números", path: "/congresso/numeros" }])} />
      <Container className="py-8 sm:py-12">
        <Breadcrumbs items={[{ name: "Início", href: "/" }, { name: "Congresso", href: "/congresso" }, { name: "Números" }]} className="mb-6" />
        <ListingHeader
          label="Números do Congresso"
          title="Cada número, com a conta e a fonte"
          description="Cota, salário, verbas e ausências em votações: clique em um número para ver como ele é calculado, como se distribui entre partidos e estados, quem aparece nos extremos e de onde vêm os dados."
          count={`${meta.legislatura}ª legislatura · dados coletados em ${dateBR(meta.atualizadoEm)}`}
        />
        <LegislatureNotice className="mt-6" />
        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {THEMES.map((t) => (
            <StatTile key={t.slug} label={t.short} value={tiles[t.slug].value} hint={tiles[t.slug].hint} href={`/congresso/numeros/${t.slug}`} cta="Detalhes e fontes" />
          ))}
        </div>
        <p className="mt-6 max-w-3xl text-sm leading-relaxed text-muted">
          Os rankings são descritivos: ordenam por valor, não por mérito, e vêm sempre com a ressalva do que cada número mede. Valores de referência (subsídio, tetos) foram conferidos nas páginas oficiais em {dateBR(rem.verificadoEm)}.
        </p>
      </Container>
    </>
  );
}
