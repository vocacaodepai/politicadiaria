#!/usr/bin/env node
/**
 * Coletor dos recursos do mandato (além da cota CEAP/CEAPS, que o coletor principal já traz):
 * verba de gabinete e pessoal, auxílio-moradia, imóvel funcional e viagens, SOMENTE quando a
 * fonte oficial publica.
 *
 *   npm run congress:recursos
 *
 * Fontes oficiais:
 *  - Câmara: página oficial de cada deputado e a página "Verba de gabinete" (por ano), ambas do
 *    Portal da Câmara (https://www.camara.leg.br/deputados/{id} e .../verba-gabinete?ano=AAAA),
 *    que não têm API JSON equivalente. O texto é lido da página pública e só entra se bater com o
 *    formato esperado; o que não bater vira "não informado pela fonte".
 *  - Senado: API administrativa https://adm.senado.gov.br/adm-dadosabertos/api/v1/senadores/
 *    {codigo}/recursos-utilizados?ano=AAAA (cota, gastos fora da cota, benefícios e pessoal).
 *
 * Saída em data/congresso/recursos/ (c-<id>.json, s-<id>.json, meta.json). Não grava CPF nem
 * nome de servidor: só quantidades e valores agregados por parlamentar.
 * "Gastos pessoais" no sentido de gasto privado não são dado público e não são coletados.
 */
import { existsSync, mkdirSync, readFileSync, readdirSync, rmSync } from "node:fs";
import { join } from "node:path";
import { CACHE, ROOT, TODAY, cachedText, csvObjects, download, log, pool, readIndexes, writeJson } from "./lib/open-data.mjs";
import { createReadStream } from "node:fs";

const OUT = join(ROOT, "data", "congresso", "recursos");
const CAMARA_GAP = Number((process.argv.find((a) => a.startsWith("--gap=")) ?? "").split("=")[1]) || 2000;
const NET = { cacheDir: join(CACHE, "recursos"), ttlHours: 12, accept: "text/html,application/json", gap: CAMARA_GAP };
const YEARS = [2023, 2024, 2025, 2026];
const SEN_ADM = "https://adm.senado.gov.br/adm-dadosabertos/api/v1";

const brl = (s) => {
  const n = Number(String(s).replace(/\./g, "").replace(",", "."));
  return Number.isFinite(n) ? Math.round(n * 100) / 100 : null;
};
const iso = (br) => {
  const m = /(\d{2})\/(\d{2})\/(\d{4})/.exec(br ?? "");
  return m ? `${m[3]}-${m[2]}-${m[1]}` : null;
};
function textOf(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&rarr;/g, "→")
    .replace(/&amp;/g, "&")
    .replace(/\s+/g, " ");
}

/* ---------------------------------------------------------------- Câmara */

async function fetchHtml(url) {
  return cachedText(url, { ...NET, accept: "text/html", timeout: 60000, tries: 4 });
}

/** Tabela "Mês / Valor disponível / Valor gasto" da página de verba de gabinete. */
function parseVerba(html, ano) {
  const t = textOf(html);
  const start = t.indexOf("Valor gasto (R$)");
  if (start < 0) return null;
  const tail = t.slice(start + "Valor gasto (R$)".length, start + 4000);
  const meses = [];
  const re = /\b(0[1-9]|1[0-2])\s+([\d.]+,\d{2})\s+([\d.]+,\d{2})/g;
  let m;
  while ((m = re.exec(tail))) {
    if (`${ano}-${m[1]}` < "2023-02") continue; // janeiro de 2023 ainda é a legislatura anterior
    const disponivel = brl(m[2]);
    const gasto = brl(m[3]);
    if (disponivel === null || gasto === null) continue;
    meses.push({ mes: `${ano}-${m[1]}`, disponivel, gasto });
  }
  const teto = /limite mensal de R\$\s*([\d.]+,\d{2})/.exec(t);
  return { meses, teto: teto ? brl(teto[1]) : null };
}

/** Anos já fechados (anteriores ao atual) não mudam: reaproveita os da coleta anterior, se existir. */
const PREVIOUS = new Map();
function loadPrevious() {
  for (const f of existsSync(OUT) ? readdirSync(OUT) : []) {
    if (!/^c-\d+\.json$/.test(f)) continue;
    try {
      PREVIOUS.set(Number(f.slice(2, -5)), JSON.parse(readFileSync(join(OUT, f), "utf8")));
    } catch {
      /* arquivo corrompido: coleta de novo */
    }
  }
}
const CURRENT_YEAR = Number(TODAY.slice(0, 4));
const REFRESH = process.argv.includes("--refresh");

const argv = process.argv.slice(2);
const argNum = (n, d) => Number((argv.find((a) => a.startsWith(`--${n}=`)) ?? "").split("=")[1]) || d;
/** Orçamento de tempo da coleta da Câmara: ao estourar, grava o que já tem e deixa o resto para a próxima rodada. */
const BUDGET_MS = argNum("budget-min", 40) * 60000;
const r2 = (n) => Math.round(n * 100) / 100;

/**
 * Quadro de pessoal lotado nos gabinetes de deputados (arquivo aberto de funcionários da Câmara, sem
 * limite de ritmo): só contagem por tipo de vínculo, sem nome, ponto ou salário.
 */
async function pessoalPorGabinete() {
  const url = "https://dadosabertos.camara.leg.br/arquivos/funcionarios/csv/funcionarios.csv";
  const file = await download(url, join(CACHE, "bulk", "funcionarios.csv"), { ttlHours: 20 });
  const by = new Map(); // id do deputado -> Map(grupo -> n)
  for await (const r of csvObjects(createReadStream(file, { encoding: "utf8", highWaterMark: 1 << 20 }))) {
    const m = /\/deputados\/(\d+)$/.exec(r.uriLotacao ?? "");
    if (!m) continue;
    const id = Number(m[1]);
    const g = (r.grupo || "Sem grupo").trim();
    const mm = by.get(id) ?? by.set(id, new Map()).get(id);
    mm.set(g, (mm.get(g) ?? 0) + 1);
  }
  return by;
}

async function camaraBase(d) {
  const pageUrl = `https://www.camara.leg.br/deputados/${d.id}`;
  const t = textOf(await fetchHtml(pageUrl));
  const pessoal = /Pessoal de gabinete\s*\?\s*(\d+)\s+pessoas? neste ano(?:,\s*sendo\s+(\d+)\s+ativas?\s+atualmente)?/i.exec(t);
  const imovel = /Im[óo]vel funcional\s*\?\s*(Faz uso desde (\d{2}\/\d{2}\/\d{4})|N[ãa]o faz uso[^A-Z]*)/i.exec(t);
  const aux = /Aux[íi]lio-moradia\s*\?\s*(N[ãa]o recebe o aux[íi]lio|Recebe o aux[íi]lio[^A-Z]*|Recebe[^A-Z]*)/i.exec(t);
  const viagens = /Viagens em miss[ãa]o oficial\s*\?\s*(\d+)/i.exec(t);
  const passaporte = /Passaporte diplom[áa]tico\s*\?\s*(Possui|N[ãa]o possui)/i.exec(t);
  const atualizado = /Informa[çc][õo]es de recursos atualizadas em (\d{2}\/\d{2}\/\d{4}(?: \d{2}:\d{2})?)/i.exec(t);
  return {
    pageUrl,
    atualizadoNaFonte: atualizado ? atualizado[1] : null,
    pessoalGabinete: pessoal ? { noAno: Number(pessoal[1]), ativas: pessoal[2] ? Number(pessoal[2]) : null } : null,
    imovelFuncional: imovel ? { usa: /Faz uso/i.test(imovel[1]), desde: imovel[2] ? iso(imovel[2]) : null } : null,
    auxilioMoradia: aux ? { recebe: /^Recebe/i.test(aux[1]) } : null,
    viagensMissaoOficial: viagens ? Number(viagens[1]) : null,
    passaporteDiplomatico: passaporte ? /^Possui/i.test(passaporte[1]) : null,
  };
}

/** Um ano da verba de gabinete; null se a página não traz a tabela. */
async function camaraAno(d, ano) {
  const url = `https://www.camara.leg.br/deputados/${d.id}/verba-gabinete?ano=${ano}`;
  let parsed = null;
  try {
    parsed = parseVerba(await fetchHtml(url), ano);
  } catch (e) {
    if (!e.status) throw e;
  }
  if (!parsed || !parsed.meses.length) return { vazio: true, teto: null };
  return {
    teto: parsed.teto,
    ano: {
      ano,
      url,
      meses: parsed.meses,
      totalGasto: r2(parsed.meses.reduce((t, x) => t + x.gasto, 0)),
      totalDisponivel: r2(parsed.meses.reduce((t, x) => t + x.disponivel, 0)),
    },
  };
}

function composeCamara(d, base, anos, teto, anosSemDados, staff) {
  const sorted = [...anos].sort((a, b) => a.ano - b.ano);
  const avisos = [];
  if (!base.pessoalGabinete) avisos.push("pessoal de gabinete não localizado na página oficial");
  if (!base.imovelFuncional) avisos.push("imóvel funcional não localizado na página oficial");
  if (!base.auxilioMoradia) avisos.push("auxílio-moradia não localizado na página oficial");
  if (!sorted.length) avisos.push("verba de gabinete não localizada na página oficial");
  const faltam = YEARS.filter((y) => !sorted.some((a) => a.ano === y) && !anosSemDados.includes(y));
  if (faltam.length) avisos.push(`anos da verba de gabinete ainda não coletados: ${faltam.join(", ")}`);
  return {
    casa: "camara",
    id: d.id,
    coletadoEm: TODAY,
    fonte: { pagina: base.pageUrl, verbaGabinete: `https://www.camara.leg.br/deputados/${d.id}/verba-gabinete`, cota: `https://www.camara.leg.br/cota-parlamentar/consulta-cota-parlamentar?ideDeputado=${d.id}` },
    atualizadoNaFonte: base.atualizadoNaFonte,
    verbaGabinete: sorted.length ? { tetoMensal: teto, anos: sorted, totalGasto: r2(sorted.reduce((t, a) => t + a.totalGasto, 0)) } : null,
    pessoalGabinete: base.pessoalGabinete,
    imovelFuncional: base.imovelFuncional,
    auxilioMoradia: base.auxilioMoradia,
    viagensMissaoOficial: base.viagensMissaoOficial,
    passaporteDiplomatico: base.passaporteDiplomatico,
    quadroGabinete: staff ? { total: [...staff.values()].reduce((a, b) => a + b, 0), porGrupo: [...staff.entries()].sort((a, b) => b[1] - a[1]).map(([grupo, n]) => ({ grupo, n })) } : null,
    anosSemDados,
    avisos,
  };
}

/**
 * Câmara em duas fases, para respeitar o limite de ritmo do Portal (HTTP 429) e o orçamento de tempo:
 *  1) página do deputado + ano corrente da verba de gabinete, para todos;
 *  2) anos anteriores, do mais recente ao mais antigo, só para quem ainda não os tem (anos fechados
 *     não mudam e vêm da coleta anterior).
 */
async function coletaCamara(deputados, t0, falhas) {
  const deadline = t0 + BUDGET_MS;
  const staff = await pessoalPorGabinete().catch((e) => {
    log("Câmara: quadro de pessoal indisponível:", e.message);
    return new Map();
  });
  const state = new Map(); // id -> { base, anos: Map, teto, vazios: Set }
  for (const d of deputados) {
    const prev = REFRESH ? null : PREVIOUS.get(d.id);
    state.set(d.id, {
      base: prev
        ? { pageUrl: prev.fonte.pagina, atualizadoNaFonte: prev.atualizadoNaFonte, pessoalGabinete: prev.pessoalGabinete, imovelFuncional: prev.imovelFuncional, auxilioMoradia: prev.auxilioMoradia, viagensMissaoOficial: prev.viagensMissaoOficial, passaporteDiplomatico: prev.passaporteDiplomatico }
        : null,
      anos: new Map((prev?.verbaGabinete?.anos ?? []).map((a) => {
        const meses = a.meses.filter((m) => m.mes >= "2023-02");
        return [a.ano, { ...a, meses, totalGasto: r2(meses.reduce((t, x) => t + x.gasto, 0)), totalDisponivel: r2(meses.reduce((t, x) => t + x.disponivel, 0)) }];
      })),
      teto: prev?.verbaGabinete?.tetoMensal ?? null,
      vazios: new Set(prev?.anosSemDados ?? []),
    });
  }
  const timeUp = () => Date.now() > deadline;
  // Quem foi coletado há mais tempo vai primeiro: rodadas com orçamento curto percorrem todos em dias seguidos.
  const stale = [...deputados].sort((a, b) => (PREVIOUS.get(a.id)?.coletadoEm ?? "").localeCompare(PREVIOUS.get(b.id)?.coletadoEm ?? "") || a.id - b.id);
  const run = (items, fn, label) =>
    pool(items, 2, async (x) => {
      if (timeUp()) return;
      await fn(x);
    }, label).then((f) => f.forEach((e) => falhas.push({ casa: "camara", id: e.item.id ?? e.item.d?.id, erro: e.error })));

  await run(
    stale,
    async (d) => {
      const st = state.get(d.id);
      st.base = await camaraBase(d);
      const r = await camaraAno(d, CURRENT_YEAR);
      if (r.ano) {
        st.anos.set(CURRENT_YEAR, r.ano);
        st.teto ??= r.teto;
      }
    },
    "Câmara: página e ano corrente",
  );
  for (let ano = CURRENT_YEAR - 1; ano >= YEARS[0]; ano--) {
    const todo = deputados.filter((d) => !state.get(d.id).anos.has(ano) && !state.get(d.id).vazios.has(ano));
    log(`Câmara: ${ano}: ${todo.length} a coletar`);
    await run(
      todo,
      async (d) => {
        const st = state.get(d.id);
        const r = await camaraAno(d, ano);
        if (r.ano) {
          st.anos.set(ano, r.ano);
          st.teto ??= r.teto;
        } else st.vazios.add(ano);
      },
      `Câmara: ${ano}`,
    );
  }
  if (timeUp()) log("Câmara: orçamento de tempo esgotado; o restante fica para a próxima rodada");
  let n = 0;
  for (const d of deputados) {
    const st = state.get(d.id);
    if (!st.base) continue; // sem a página do deputado não há registro
    writeJson(join(OUT, `c-${d.id}.json`), composeCamara(d, st.base, [...st.anos.values()], st.teto, [...st.vazios], staff.get(d.id) ?? null));
    n++;
  }
  return n;
}

/* ---------------------------------------------------------------- Senado */

async function senadoSenador(s) {
  const anos = [];
  for (const ano of YEARS) {
    const url = `${SEN_ADM}/senadores/${s.id}/recursos-utilizados?ano=${ano}`;
    let j;
    try {
      j = JSON.parse(await cachedText(url, { ...NET, gap: 150, accept: "application/json", timeout: 90000, tries: 4 }));
    } catch (e) {
      if (e.status === 404 || e.status === 400) continue;
      throw e;
    }
    const d = j.data?.[0];
    if (!d) continue;
    const item = (x) => ({ recurso: String(x.recurso ?? "").trim(), valor: Number(x.valor) || 0 });
    anos.push({
      ano,
      url: `https://www6g.senado.leg.br/transparencia/sen/${s.id}/?ano=${ano}`,
      fonteApi: url,
      cota: { total: Number(d.cotas?.totalValor) || 0, despesas: (d.cotas?.despesas ?? []).map(item) },
      foraDaCota: { total: Number(d.gastosNaoInclusos?.totalValor) || 0, despesas: (d.gastosNaoInclusos?.despesas ?? []).map(item) },
      beneficios: (d.beneficios ?? []).map((b) => ({ beneficio: String(b.beneficio).trim(), utilizacao: String(b.utilizacao).trim() })),
      pessoal: (d.pessoal ?? []).map((p) => ({
        local: String(p.local).trim(),
        quantidade: Number(p.quantidade) || 0,
        vinculos: (p.vinculos ?? []).map((v) => ({ vinculo: String(v.vinculo).trim(), quantidade: Number(v.quantidade) || 0 })),
      })),
    });
  }
  return {
    casa: "senado",
    id: s.id,
    coletadoEm: TODAY,
    fonte: { pagina: `https://www6g.senado.leg.br/transparencia/sen/${s.id}/`, api: `${SEN_ADM}/senadores/${s.id}/recursos-utilizados` },
    anos,
    avisos: anos.length ? [] : ["recursos utilizados não localizados na API oficial do Senado"],
  };
}

async function main() {
  const t0 = Date.now();
  const only = (process.argv.find((a) => a.startsWith("--only=")) ?? "").slice(7);
  const { deputados, senadores } = readIndexes();
  loadPrevious();
  rmSync(OUT, { recursive: true, force: true });
  mkdirSync(OUT, { recursive: true });
  const falhas = [];
  let okC = 0;
  let okS = 0;
  if (only !== "senado") {
    okC = await coletaCamara(deputados, t0, falhas);
  }
  if (only !== "camara") {
    const f = await pool(
      senadores,
      2,
      async (s) => {
        writeJson(join(OUT, `s-${s.id}.json`), await senadoSenador(s));
        okS++;
      },
      "Senado: recursos",
    );
    for (const x of f) falhas.push({ casa: "senado", id: x.item.id, erro: x.error });
  }
  writeJson(join(OUT, "meta.json"), {
    atualizadoEm: TODAY,
    geradoEm: new Date().toISOString(),
    deputados: okC,
    senadores: okS,
    fontes: {
      camaraPagina: "https://www.camara.leg.br/deputados/{id}",
      camaraVerbaGabinete: "https://www.camara.leg.br/deputados/{id}/verba-gabinete?ano={ano}",
      senadoApi: `${SEN_ADM}/senadores/{codigo}/recursos-utilizados?ano={ano}`,
      senadoPagina: "https://www6g.senado.leg.br/transparencia/sen/{codigo}/?ano={ano}",
    },
    falhas,
  });
  log(`Recursos concluídos em ${Math.round((Date.now() - t0) / 1000)} s: ${okC} deputados, ${okS} senadores, ${falhas.length} falha(s)`);
  if (falhas.length > (deputados.length + senadores.length) * 0.1) process.exitCode = 1;
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
