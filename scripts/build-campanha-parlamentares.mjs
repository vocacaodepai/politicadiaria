#!/usr/bin/env node
/**
 * Gastos de campanha dos parlamentares atuais (candidaturas de 2022 e, quando houver, 2026).
 *
 *   npm run congress:campanha
 *   node scripts/build-campanha-parlamentares.mjs --ano=2022   # só uma eleição
 *
 * Fonte: dados abertos do TSE (as mesmas informações do DivulgaCandContas, em arquivos
 * em lote). A API do DivulgaCandContas (divulgacandcontas.tse.jus.br/divulga/rest/v1/...) bloqueia
 * acessos automatizados (HTTP 403) em vários ambientes; o arquivo em lote do TSE não:
 *   https://cdn.tse.jus.br/estatistica/sead/odsele/consulta_cand/consulta_cand_{ano}.zip
 *   https://cdn.tse.jus.br/estatistica/sead/odsele/bem_candidato/bem_candidato_{ano}.zip
 *   https://cdn.tse.jus.br/estatistica/sead/odsele/prestacao_contas/prestacao_de_contas_eleitorais_candidatos_{ano}.zip
 *
 * Vínculo entre candidato e parlamentar (com cautela): nome civil idêntico E data de nascimento
 * idêntica, ambos nas duas bases oficiais. Se houver mais de um candidato possível, ou só o nome
 * de urna coincidir, NÃO vincula e registra "não vinculado com segurança". Quem não aparece como
 * candidato naquela eleição é registrado como "sem candidatura localizada".
 *
 * Privacidade: nada de CPF (o do candidato e o dos doadores são lidos só para contar doadores
 * distintos, em memória, e nunca gravados). Doadores só entram agregados por tipo de origem.
 * Saída em data/congresso/campanha/ (c-<id>.json, s-<id>.json, meta.json).
 *
 * Os valores da prestação de contas são DECLARADOS pelas campanhas ao TSE; a prestação pode estar
 * parcial (2026 ainda em andamento) ou em análise. Nada é estimado.
 */
import { mkdirSync, rmSync } from "node:fs";
import { join } from "node:path";
import { CACHE, ROOT, TODAY, csvRecords, download, log, norm, readIndexes, readJson, round2, writeJson, zipEntries, zipEntryText } from "./lib/open-data.mjs";

const args = process.argv.slice(2);
const onlyYear = Number((args.find((a) => a.startsWith("--ano=")) ?? "").slice(6)) || null;
const YEARS = (onlyYear ? [onlyYear] : [2022, 2026]).sort();
const OUT = join(ROOT, "data", "congresso", "campanha");
const TSE_DIR = join(CACHE, "tse");
const BASE = "https://cdn.tse.jus.br/estatistica/sead/odsele";
const SOURCES = (ano) => ({
  candidatos: `${BASE}/consulta_cand/consulta_cand_${ano}.zip`,
  bens: `${BASE}/bem_candidato/bem_candidato_${ano}.zip`,
  prestacao: `${BASE}/prestacao_contas/prestacao_de_contas_eleitorais_candidatos_${ano}.zip`,
});
const PAGES = (ano) => ({
  candidatos: `https://dadosabertos.tse.jus.br/dataset/candidatos-${ano}`,
  prestacao: ano === 2022 ? "https://dadosabertos.tse.jus.br/dataset/dadosabertos-tse-jus-br-dataset-prestacao-de-contas-eleitorais-2022" : `https://dadosabertos.tse.jus.br/dataset/prestacao-de-contas-eleitorais-${ano}`,
  divulga: "https://divulgacandcontas.tse.jus.br/divulga/",
});

/** Lê um CSV do TSE (latin1, ";") chamando onRow(get) com get(coluna) -> texto. */
async function scan(zipPath, entry, wanted, onRow) {
  let idx = null;
  const pos = {};
  for await (const r of csvRecords(zipEntryText(zipPath, entry, "latin1"))) {
    if (!idx) {
      idx = r;
      for (const c of wanted) {
        pos[c] = idx.indexOf(c);
        if (pos[c] < 0) throw new Error(`coluna ausente em ${entry.name}: ${c}`);
      }
      continue;
    }
    if (r.length < idx.length - 2) continue;
    onRow((c) => r[pos[c]] ?? "");
  }
}

const ufOfEntry = (name) => /_([A-Z]{2})\.csv$/.exec(name)?.[1] ?? null;
const brDate = (s) => {
  const m = /^(\d{2})\/(\d{2})\/(\d{4})/.exec(s ?? "");
  return m ? `${m[3]}-${m[2]}-${m[1]}` : null;
};
const nz = (s) => (!s || /^#N/.test(s.trim()) || s === "-1" ? null : s.trim());
const add = (map, k, v) => map.set(k, (map.get(k) ?? 0) + v);
const sortedTotals = (map, n = 12) =>
  [...map.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, n)
    .map(([nome, total]) => ({ nome, total: round2(total) }));

/* --------------------------------------------------------------------- parlamentares */

function loadParliamentarians() {
  const { deputados, senadores } = readIndexes();
  const out = [];
  for (const d of deputados) {
    const f = readJson(join(ROOT, "data", "congresso", "deputados", `${d.id}.json`));
    out.push({ key: `c-${d.id}`, casa: "camara", id: d.id, nomeCivil: f.nomeCivil, nome: f.nomeEleitoral ?? f.nome, nascimento: f.nascimento, uf: f.uf, partido: f.partido });
  }
  for (const s of senadores) {
    const f = readJson(join(ROOT, "data", "congresso", "senadores", `${s.id}.json`));
    out.push({ key: `s-${s.id}`, casa: "senado", id: s.id, nomeCivil: f.nomeCivil, nome: f.nome, nascimento: f.nascimento, uf: f.uf, partido: f.partido });
  }
  return out;
}

/* ----------------------------------------------------------------------- uma eleição */

async function processElection(ano, people) {
  const src = SOURCES(ano);
  log(`${ano}: baixando arquivos do TSE`);
  const paths = {};
  for (const [k, url] of Object.entries(src)) paths[k] = await download(url, join(TSE_DIR, `${k}-${ano}.zip`), { ttlHours: ano >= 2026 ? 6 : 24 * 7 });
  const entries = Object.fromEntries(await Promise.all(Object.entries(paths).map(async ([k, p]) => [k, await zipEntries(p)])));
  const pick = (k, prefix) => entries[k].filter((e) => e.name.startsWith(prefix) && ufOfEntry(e.name));

  /* 1) candidaturas */
  const byName = new Map(); // nome civil normalizado -> candidaturas
  const byUrn = new Map();
  let total = 0;
  for (const e of pick("candidatos", "consulta_cand_")) {
    await scan(
      paths.candidatos,
      e,
      ["SQ_CANDIDATO", "NM_CANDIDATO", "NM_URNA_CANDIDATO", "DT_NASCIMENTO", "SG_UF", "DS_CARGO", "NR_CANDIDATO", "SG_PARTIDO", "DS_SITUACAO_CANDIDATURA", "DS_SIT_TOT_TURNO", "NM_UE"],
      (g) => {
        total++;
        const c = {
          sq: g("SQ_CANDIDATO"),
          nome: g("NM_CANDIDATO"),
          urna: g("NM_URNA_CANDIDATO"),
          nasc: brDate(g("DT_NASCIMENTO")),
          uf: g("SG_UF"),
          cargo: g("DS_CARGO"),
          numero: g("NR_CANDIDATO"),
          partido: g("SG_PARTIDO"),
          situacao: nz(g("DS_SITUACAO_CANDIDATURA")),
          resultado: nz(g("DS_SIT_TOT_TURNO")),
        };
        const k = norm(c.nome);
        (byName.get(k) ?? byName.set(k, []).get(k)).push(c);
        const u = norm(c.urna);
        (byUrn.get(u) ?? byUrn.set(u, []).get(u)).push(c);
      },
    );
  }
  log(`${ano}: ${total} candidaturas lidas`);

  /* 2) vínculo */
  const links = new Map(); // sq -> parlamentar
  const result = new Map(); // key -> {status, ...}
  const dedupeSq = (arr) => [...new Map(arr.map((c) => [c.sq, c])).values()];
  for (const p of people) {
    const civil = p.nomeCivil ? dedupeSq((byName.get(norm(p.nomeCivil)) ?? []).filter((c) => c.nasc && p.nascimento && c.nasc === p.nascimento)) : [];
    if (civil.length === 1) {
      links.set(civil[0].sq, p);
      result.set(p.key, { status: "vinculado", criterio: "nome civil e data de nascimento iguais nas duas bases oficiais", cand: civil[0] });
      continue;
    }
    if (civil.length > 1) {
      result.set(p.key, { status: "nao-vinculado", motivo: `mais de uma candidatura com o mesmo nome civil e nascimento (${civil.length}); não associado por cautela` });
      continue;
    }
    // Sem coincidência de nome civil + nascimento: verifica se há candidatura plausível por nome de urna,
    // apenas para registrar a ambiguidade (nunca vincula só pelo nome de urna).
    const urn = dedupeSq((byUrn.get(norm(p.nome)) ?? []).filter((c) => c.uf === p.uf || c.uf === "BR"));
    const sameBirth = urn.filter((c) => c.nasc && p.nascimento && c.nasc === p.nascimento);
    if (sameBirth.length === 1) {
      links.set(sameBirth[0].sq, p);
      result.set(p.key, { status: "vinculado", criterio: "nome de urna, UF e data de nascimento iguais nas duas bases oficiais", cand: sameBirth[0] });
    } else if (urn.length) {
      result.set(p.key, { status: "nao-vinculado", motivo: "há candidatura com nome parecido, mas sem coincidência segura de nome civil e data de nascimento; não associado por cautela" });
    } else {
      result.set(p.key, { status: "sem-candidatura" });
    }
  }
  const nVinc = [...result.values()].filter((r) => r.status === "vinculado").length;
  log(`${ano}: vinculados com segurança: ${nVinc} de ${people.length}`);

  const acc = new Map(); // sq -> acumulador
  for (const sq of links.keys())
    acc.set(sq, {
      prest: new Set(),
      datas: new Set(),
      tipos: new Set(),
      rec: { total: 0, origem: new Map(), fonte: new Map(), pf: new Set(), pj: new Set(), ids: new Set() },
      con: { total: 0, origem: new Map(), rows: 0 },
      pag: { total: 0, origem: new Map(), rows: 0 },
      bens: { total: 0, n: 0, tipo: new Map() },
    });
  const prestToSq = new Map();

  /* 3) receitas */
  for (const e of pick("prestacao", "receitas_candidatos_").filter((x) => !x.name.includes("doador_originario") && !x.name.endsWith("_BRASIL.csv"))) {
    await scan(
      paths.prestacao,
      e,
      ["SQ_CANDIDATO", "SQ_PRESTADOR_CONTAS", "SQ_RECEITA", "VR_RECEITA", "DS_ORIGEM_RECEITA", "DS_FONTE_RECEITA", "DT_PRESTACAO_CONTAS", "TP_PRESTACAO_CONTAS", "NR_CPF_CNPJ_DOADOR"],
      (g) => {
        const a = acc.get(g("SQ_CANDIDATO"));
        if (!a) return;
        const id = g("SQ_RECEITA");
        if (a.rec.ids.has(id)) return;
        a.rec.ids.add(id);
        prestToSq.set(g("SQ_PRESTADOR_CONTAS"), g("SQ_CANDIDATO"));
        const v = Number(g("VR_RECEITA").replace(",", ".")) || 0;
        a.rec.total += v;
        add(a.rec.origem, nz(g("DS_ORIGEM_RECEITA")) ?? "Origem não informada", v);
        add(a.rec.fonte, nz(g("DS_FONTE_RECEITA")) ?? "Fonte não informada", v);
        const doc = g("NR_CPF_CNPJ_DOADOR").replace(/\D/g, "");
        if (doc.length === 11) a.rec.pf.add(doc);
        else if (doc.length === 14) a.rec.pj.add(doc);
        const d = brDate(g("DT_PRESTACAO_CONTAS"));
        if (d) a.datas.add(d);
        const t = nz(g("TP_PRESTACAO_CONTAS"));
        if (t) a.tipos.add(t.toUpperCase());
      },
    );
  }
  log(`${ano}: receitas lidas`);

  /* 4) despesas contratadas (têm o candidato) */
  for (const e of pick("prestacao", "despesas_contratadas_candidatos_").filter((x) => !x.name.endsWith("_BRASIL.csv"))) {
    await scan(
      paths.prestacao,
      e,
      ["SQ_CANDIDATO", "SQ_PRESTADOR_CONTAS", "SQ_DESPESA", "VR_DESPESA_CONTRATADA", "DS_ORIGEM_DESPESA", "DT_PRESTACAO_CONTAS", "TP_PRESTACAO_CONTAS"],
      (g) => {
        const a = acc.get(g("SQ_CANDIDATO"));
        if (!a) return;
        prestToSq.set(g("SQ_PRESTADOR_CONTAS"), g("SQ_CANDIDATO"));
        const d = brDate(g("DT_PRESTACAO_CONTAS"));
        if (d) a.datas.add(d);
        const t = nz(g("TP_PRESTACAO_CONTAS"));
        if (t) a.tipos.add(t.toUpperCase());
        // SQ_DESPESA se repete entre linhas da mesma despesa: soma todas as linhas, sem deduplicar.
        a.con.rows++;
        const v = Number(g("VR_DESPESA_CONTRATADA").replace(",", ".")) || 0;
        a.con.total += v;
        add(a.con.origem, nz(g("DS_ORIGEM_DESPESA")) ?? "Origem não informada", v);
      },
    );
  }
  log(`${ano}: despesas contratadas lidas`);

  /* 5) despesas pagas (identificadas pelo prestador de contas) */
  for (const e of pick("prestacao", "despesas_pagas_candidatos_").filter((x) => !x.name.endsWith("_BRASIL.csv"))) {
    await scan(paths.prestacao, e, ["SQ_PRESTADOR_CONTAS", "SQ_DESPESA", "VR_PAGTO_DESPESA", "DS_ORIGEM_DESPESA"], (g) => {
      const sq = prestToSq.get(g("SQ_PRESTADOR_CONTAS"));
      const a = sq && acc.get(sq);
      if (!a) return;
      a.pag.rows++;
      const v = Number(g("VR_PAGTO_DESPESA").replace(",", ".")) || 0;
      a.pag.total += v;
      add(a.pag.origem, nz(g("DS_ORIGEM_DESPESA")) ?? "Origem não informada", v);
    });
  }
  log(`${ano}: despesas pagas lidas`);

  /* 6) bens declarados */
  for (const e of pick("bens", "bem_candidato_")) {
    await scan(paths.bens, e, ["SQ_CANDIDATO", "DS_TIPO_BEM_CANDIDATO", "VR_BEM_CANDIDATO"], (g) => {
      const a = acc.get(g("SQ_CANDIDATO"));
      if (!a) return;
      const v = Number(g("VR_BEM_CANDIDATO").replace(",", ".")) || 0;
      a.bens.total += v;
      a.bens.n++;
      add(a.bens.tipo, nz(g("DS_TIPO_BEM_CANDIDATO")) ?? "Tipo não informado", v);
    });
  }
  log(`${ano}: bens lidos`);

  /* 7) montagem */
  const pages = PAGES(ano);
  const out = new Map();
  for (const p of people) {
    const r = result.get(p.key);
    const base = { ano, fontes: { dadosAbertos: pages.candidatos, prestacaoDeContas: pages.prestacao, consultaPublica: pages.divulga } };
    if (r.status !== "vinculado") {
      out.set(p.key, { ...base, status: r.status, ...(r.motivo ? { motivo: r.motivo } : {}) });
      continue;
    }
    const a = acc.get(r.cand.sq);
    const has = a.rec.ids.size > 0 || a.con.rows > 0 || a.pag.rows > 0;
    const datas = [...a.datas].sort();
    out.set(p.key, {
      ...base,
      status: "vinculado",
      criterio: r.criterio,
      candidatura: {
        cargo: r.cand.cargo,
        uf: r.cand.uf,
        numero: r.cand.numero,
        nomeUrna: r.cand.urna,
        partido: r.cand.partido,
        situacaoCandidatura: r.cand.situacao,
        resultado: r.cand.resultado,
      },
      prestacao: has ? { tipo: [...a.tipos].sort().map((t) => t.charAt(0) + t.slice(1).toLowerCase()).join("; ") || null, ultimaData: datas.at(-1) ?? null } : null,
      receitas: has
        ? {
            total: round2(a.rec.total),
            porOrigem: sortedTotals(a.rec.origem),
            porFonte: sortedTotals(a.rec.fonte),
            doadoresPessoaFisica: a.rec.pf.size,
            doadoresPessoaJuridica: a.rec.pj.size,
          }
        : null,
      despesas: has ? { contratadas: round2(a.con.total), pagas: round2(a.pag.total), porOrigemContratadas: sortedTotals(a.con.origem), porOrigemPagas: sortedTotals(a.pag.origem) } : null,
      bens: a.bens.n ? { total: round2(a.bens.total), quantidade: a.bens.n, porTipo: sortedTotals(a.bens.tipo) } : null,
      avisoPrestacao: has ? null : "O TSE não traz prestação de contas desta candidatura nos arquivos de hoje (ainda não entregue ou sem movimento).",
    });
  }
  return { out, stats: { candidaturas: total, vinculados: nVinc } };
}

async function main() {
  const t0 = Date.now();
  const people = loadParliamentarians();
  mkdirSync(TSE_DIR, { recursive: true });
  const perPerson = new Map(people.map((p) => [p.key, []]));
  const stats = {};
  const falhas = [];
  for (const ano of YEARS) {
    try {
      const { out, stats: s } = await processElection(ano, people);
      stats[ano] = s;
      for (const [k, v] of out) perPerson.get(k).push(v);
    } catch (e) {
      falhas.push({ ano, erro: String(e.message ?? e) });
      log(`${ano}: FALHOU`, e.message);
    }
  }
  if (falhas.length === YEARS.length) {
    console.error("Nenhuma eleição foi coletada; os arquivos existentes não foram alterados.");
    process.exit(1);
  }
  rmSync(OUT, { recursive: true, force: true });
  mkdirSync(OUT, { recursive: true });
  const status = {};
  for (const p of people) {
    const eleicoes = perPerson.get(p.key);
    writeJson(join(OUT, `${p.key}.json`), { casa: p.casa, id: p.id, geradoEm: TODAY, eleicoes });
    for (const e of eleicoes) status[`${e.ano}:${e.status}`] = (status[`${e.ano}:${e.status}`] ?? 0) + 1;
  }
  writeJson(join(OUT, "meta.json"), {
    atualizadoEm: TODAY,
    geradoEm: new Date().toISOString(),
    eleicoes: YEARS.filter((y) => stats[y]),
    estatisticas: stats,
    porStatus: status,
    fontes: Object.fromEntries(YEARS.map((y) => [y, SOURCES(y)])),
    observacao:
      "Valores declarados pelas campanhas ao TSE, conforme os arquivos de dados abertos da data indicada. Senadores eleitos em 2018 não têm campanha no recorte de 2022; o TSE publica 2018 em outro formato. Nada é estimado e nenhum CPF é gravado.",
    falhas,
  });
  log(`Campanha concluída em ${Math.round((Date.now() - t0) / 1000)} s`, JSON.stringify(status));
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
