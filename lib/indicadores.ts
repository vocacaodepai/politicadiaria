/**
 * Indicadores de utilidade pública da barra do topo, direto da API do Banco Central.
 * Fontes: PTAX (Olinda) para o dólar e SGS para Selic e IPCA. Se uma fonte falha,
 * o indicador some da barra; nunca se mostra número inventado ou antigo sem data.
 */

export type Indicador = {
  id: "dolar" | "selic" | "ipca";
  label: string;
  valor: string;
  detalhe: string;
  fonte: string;
  href: string;
};

const REVALIDATE = 60 * 30;
const TIMEOUT_MS = 5000;

async function getJson<T>(url: string): Promise<T | null> {
  try {
    const res = await fetch(url, { next: { revalidate: REVALIDATE }, signal: AbortSignal.timeout(TIMEOUT_MS) });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

const brDate = (d: Date) => d.toLocaleDateString("pt-BR", { timeZone: "America/Sao_Paulo" });
const num = (v: number, digits = 2) => v.toLocaleString("pt-BR", { minimumFractionDigits: digits, maximumFractionDigits: digits });

function parseBr(d: string): Date {
  const [dd, mm, yyyy] = d.split("/").map(Number);
  return new Date(Date.UTC(yyyy, mm - 1, dd, 12));
}

async function dolar(): Promise<Indicador | null> {
  // PTAX: o dia sem cotação (fim de semana, feriado) volta vazio; recua até 6 dias.
  for (let back = 0; back < 7; back++) {
    const d = new Date(Date.now() - back * 86_400_000);
    const iso = d.toLocaleDateString("en-CA", { timeZone: "America/Sao_Paulo" }); // AAAA-MM-DD
    const [y, m, day] = iso.split("-");
    const url = `https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoDolarDia(dataCotacao=@dataCotacao)?@dataCotacao='${m}-${day}-${y}'&$format=json`;
    const j = await getJson<{ value: { cotacaoVenda: number; dataHoraCotacao: string }[] }>(url);
    const q = j?.value?.at(-1);
    if (q) {
      const [yy, mm, dd] = q.dataHoraCotacao.slice(0, 10).split("-");
      return {
        id: "dolar",
        label: "Dólar",
        valor: `R$ ${num(q.cotacaoVenda)}`,
        detalhe: `PTAX de venda, ${dd}/${mm}/${yy}`,
        fonte: "Banco Central (PTAX)",
        href: "https://www.bcb.gov.br/estabilidadefinanceira/historicocotacoes",
      };
    }
  }
  return null;
}

type Sgs = { data: string; valor: string }[];

async function selic(): Promise<Indicador | null> {
  const ini = new Date(Date.now() - 120 * 86_400_000);
  const url = `https://api.bcb.gov.br/dados/serie/bcdata.sgs.432/dados?formato=json&dataInicial=${brDate(ini)}&dataFinal=${brDate(new Date())}`;
  const rows = await getJson<Sgs>(url);
  const hoje = Date.now();
  const last = rows?.filter((r) => parseBr(r.data).getTime() <= hoje).at(-1);
  if (!last) return null;
  return {
    id: "selic",
    label: "Selic",
    valor: `${num(Number(last.valor))}% ao ano`,
    detalhe: `meta definida pelo Copom, vigente em ${last.data}`,
    fonte: "Banco Central (SGS 432)",
    href: "https://www.bcb.gov.br/controleinflacao/taxaselic",
  };
}

const MESES = ["jan", "fev", "mar", "abr", "mai", "jun", "jul", "ago", "set", "out", "nov", "dez"];

async function ipca(): Promise<Indicador | null> {
  const rows = await getJson<Sgs>("https://api.bcb.gov.br/dados/serie/bcdata.sgs.13522/dados/ultimos/1?formato=json");
  const last = rows?.at(-1);
  if (!last) return null;
  const d = parseBr(last.data);
  return {
    id: "ipca",
    label: "Inflação (IPCA)",
    valor: `${num(Number(last.valor))}% em 12 meses`,
    detalhe: `referência ${MESES[d.getUTCMonth()]}/${d.getUTCFullYear()}`,
    fonte: "IBGE, via Banco Central (SGS 13522)",
    href: "https://www.bcb.gov.br/controleinflacao/historicometa",
  };
}

export async function getIndicadores(): Promise<Indicador[]> {
  const all = await Promise.all([dolar(), selic(), ipca()]);
  return all.filter((x): x is Indicador => x !== null);
}
