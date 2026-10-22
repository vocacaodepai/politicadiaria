#!/usr/bin/env node
/**
 * Coleta gastos de campanha e bens declarados dos candidatos à Presidência e dos governadores em 2º turno
 * na API pública do TSE (DivulgaCandContas) e grava data/eleicoes/campanha/presidente.json e governadores.json.
 *
 *   NODE_USE_ENV_PROXY=1 npm run campanha:update
 *
 * Regras:
 * - Só dado oficial do TSE. Nenhum valor é estimado. Campo que a API não trouxe fica null ("não informado pela fonte").
 * - Doadores e fornecedores entram só agregados por tipo/categoria. Nunca grava CPF, CNPJ de pessoa física, nome de
 *   doador ou endereço. Bens entram por tipo (por exemplo "Casa"), sem descrição individual.
 * - Se a API responder 403 ou ficar indisponível, o script mantém o arquivo anterior quando ele já tinha dados
 *   coletados; senão grava status "nao_coletado" com o motivo. Sai com código 0 nos dois casos (a página mostra o estado).
 *
 * Endpoints (https://divulgacandcontas.tse.jus.br/divulga/rest/v1):
 *   /eleicao/ordinarias                                                   descobre os ids da eleição 2026
 *   /candidatura/listar/{ano}/{ue}/{eleicao}/{cargo}/candidatos           candidatos (cargo 1 presidente, 3 governador)
 *   /candidatura/buscar/{ano}/{ue}/{eleicao}/candidato/{id}               detalhe, com bens declarados
 *   /prestador/consulta/{eleicao}/{ano}/{ue}/{cargo}/{partido}/{numero}/{id}   prestação de contas (parcial/final)
 * ATENÇÃO: escrito sem acesso à API (403 no ambiente de desenvolvimento). Na primeira execução com acesso, confira a
 * saída contra a página do candidato em https://divulgacandcontas.tse.jus.br/ antes de publicar.
 */
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const OUT = join(ROOT, "data", "eleicoes", "campanha");
const API = "https://divulgacandcontas.tse.jus.br/divulga/rest/v1";
const ANO = 2026;
const FONTE = { rotulo: "TSE, DivulgaCandContas", url: "https://divulgacandcontas.tse.jus.br/" };
const HEADERS = {
  "user-agent": "Mozilla/5.0 (compatible; PoliticaDiaria/1.0; +https://www.politicadiaria.com.br)",
  accept: "application/json",
  referer: "https://divulgacandcontas.tse.jus.br/divulga/",
};

const agora = () =>
  new Intl.DateTimeFormat("sv-SE", { timeZone: "America/Sao_Paulo", dateStyle: "short", timeStyle: "medium" })
    .format(new Date())
    .replace(" ", "T") + "-03:00";

async function get(path) {
  const res = await fetch(`${API}${path}`, { headers: HEADERS, signal: AbortSignal.timeout(30000) });
  if (!res.ok) throw new Error(`HTTP ${res.status} em ${path}`);
  return res.json();
}

const num = (v) => (typeof v === "number" && Number.isFinite(v) ? v : typeof v === "string" && v.trim() !== "" && Number.isFinite(Number(v.replace(",", "."))) ? Number(v.replace(",", ".")) : null);
const ddmmaaaa = (v) => {
  if (typeof v !== "string") return null;
  const m = v.match(/^(\d{2})\/(\d{2})\/(\d{4})/) ?? null;
  if (m) return `${m[1]}/${m[2]}/${m[3]}`;
  const iso = v.match(/^(\d{4})-(\d{2})-(\d{2})/);
  return iso ? `${iso[3]}/${iso[2]}/${iso[1]}` : null;
};

/** Soma valores por categoria. `lista` pode não existir: devolve null (não informado pela fonte). */
function agrega(lista, chavesCategoria, chavesValor) {
  if (!Array.isArray(lista) || lista.length === 0) return null;
  const mapa = new Map();
  for (const it of lista) {
    const cat = chavesCategoria.map((k) => it?.[k]).find((x) => typeof x === "string" && x.trim());
    const val = chavesValor.map((k) => num(it?.[k])).find((x) => x !== null);
    if (!cat || val === null || val === undefined) continue;
    mapa.set(cat.trim(), (mapa.get(cat.trim()) ?? 0) + val);
  }
  if (mapa.size === 0) return null;
  return [...mapa.entries()].map(([categoria, valor]) => ({ categoria, valor: Math.round(valor * 100) / 100 })).sort((a, b) => b.valor - a.valor).slice(0, 8);
}

async function eleicoes2026() {
  const lista = await get("/eleicao/ordinarias");
  const itens = (Array.isArray(lista) ? lista : []).filter((e) => Number(e.ano) === ANO);
  if (!itens.length) throw new Error("API não listou eleições de 2026");
  console.log("Eleições 2026 na API:", itens.map((e) => `${e.id ?? e.codigo}:${e.nomeEleicao ?? e.descricaoEleicao ?? ""}:${e.turno ?? ""}`).join(" | "));
  return itens;
}

async function coletaCandidato(base, eleicao, ue, cargo, c) {
  const id = c.id;
  const det = await get(`/candidatura/buscar/${ANO}/${ue}/${eleicao}/candidato/${id}`);
  const bensLista = Array.isArray(det.bens) ? det.bens : null;
  const bens = bensLista
    ? { total: num(det.totalDeBens) ?? Math.round(bensLista.reduce((a, b) => a + (num(b.valor) ?? 0), 0) * 100) / 100, porTipo: agrega(bensLista, ["descricaoDeTipoDeBem", "tipoBem"], ["valor"]) }
    : null;
  let receitas = null;
  let despesas = null;
  let ultima = null;
  try {
    const p = await get(`/prestador/consulta/${eleicao}/${ANO}/${ue}/${cargo}/${c.partido?.numero ?? ""}/${c.numero}/${id}`);
    const d = p.dadosConsolidados ?? {};
    receitas = { total: num(d.totalRecebido), porCategoria: agrega(p.receitas ?? d.receitas, ["origemReceita", "fonteReceita", "tipoReceita"], ["valor", "valorReceita"]) };
    despesas = { total: num(d.totalDespesas) ?? num(d.totalDespesasContratadas), porCategoria: agrega(p.despesas ?? d.despesas, ["tipoDespesa", "descricaoTipoDespesa", "origemDespesa"], ["valor", "valorDespesa"]) };
    ultima = ddmmaaaa(p.dataUltimaEntrega ?? p.dataEntrega ?? d.dataUltimaEntrega ?? p.dtUltimaAtualizacao ?? null);
    if (receitas.total === null && !receitas.porCategoria) receitas = null;
    if (despesas.total === null && !despesas.porCategoria) despesas = null;
  } catch (e) {
    console.warn(`  prestação de contas indisponível para ${c.nomeUrna}: ${e.message}`);
  }
  return {
    nome: base.nome,
    partido: base.partido,
    cargo: base.cargo,
    uf: base.uf ?? null,
    receitas,
    despesas,
    bensDeclarados: bens,
    ultimaPrestacao: ultima,
    sigilo: typeof det.sigilo === "boolean" ? det.sigilo : null,
    urlTse: `https://divulgacandcontas.tse.jus.br/divulga/#/candidato/${ANO}/${eleicao}/${ue}/${id}`,
  };
}

const norm = (s) => String(s ?? "").normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();

async function grupo(arquivo, cargoCod, esperados, eleicoes, erroDescoberta) {
  const file = join(OUT, arquivo);
  const antigo = existsSync(file) ? JSON.parse(readFileSync(file, "utf8")) : null;
  try {
    if (erroDescoberta) throw new Error(`API do DivulgaCandContas indisponível (${erroDescoberta.message})`);
    const out = [];
    for (const e of esperados) {
      const ue = cargoCod === 1 ? "BR" : e.uf;
      let achou = null;
      let eleicaoUsada = null;
      for (const el of eleicoes) {
        const cod = el.id ?? el.codigo;
        try {
          const l = await get(`/candidatura/listar/${ANO}/${ue}/${cod}/${cargoCod}/candidatos`);
          const c = (l.candidatos ?? []).find((x) => norm(x.nomeUrna).includes(norm(e.nome)) || norm(e.nome).includes(norm(x.nomeUrna)));
          if (c) { achou = c; eleicaoUsada = cod; break; }
        } catch { /* tenta a próxima eleição */ }
      }
      if (!achou) throw new Error(`candidato não localizado na API: ${e.nome} (${ue})`);
      console.log(`coletando ${e.nome} (${ue})`);
      out.push(await coletaCandidato(e, eleicaoUsada, ue, cargoCod, achou));
    }
    writeFileSync(file, JSON.stringify({ status: "coletado", motivo: null, coletadoEm: agora(), fonte: FONTE, candidatos: out }, null, 2) + "\n");
    console.log(`OK: ${arquivo} com ${out.length} candidatos`);
  } catch (err) {
    console.warn(`Não coletado (${arquivo}): ${err.message}`);
    if (antigo?.status === "coletado") {
      console.warn("Mantido o arquivo anterior, que já tinha dados coletados.");
      return;
    }
    const base = antigo ?? { candidatos: esperados.map((e) => ({ ...e, receitas: null, despesas: null, bensDeclarados: null, ultimaPrestacao: null, sigilo: null, urlTse: null })) };
    writeFileSync(file, JSON.stringify({ status: "nao_coletado", motivo: `${err.message}. Nenhum valor foi coletado nem estimado.`, coletadoEm: agora(), fonte: FONTE, candidatos: base.candidatos }, null, 2) + "\n");
  }
}

mkdirSync(OUT, { recursive: true });
const resultados = JSON.parse(readFileSync(join(ROOT, "data", "eleicoes", "resultados.json"), "utf8"));
const pres = resultados.presidente.turno2.candidatos.map((c) => ({ nome: c.nome, partido: c.partido, cargo: "Presidente", uf: null }));
const govs = resultados.governadores
  .filter((g) => g.segundoTurno)
  .flatMap((g) => (g.turno2 ?? g.turno1).candidatos.slice(0, 2).map((c) => ({ nome: c.nome, partido: c.partido, cargo: "Governador", uf: g.uf })));

let eleicoes = [];
let erroDescoberta = null;
try {
  eleicoes = await eleicoes2026();
} catch (e) {
  erroDescoberta = e;
  console.warn(`Falha ao descobrir eleições: ${e.message}`);
}
await grupo("presidente.json", 1, pres, eleicoes, erroDescoberta);
await grupo("governadores.json", 3, govs, eleicoes, erroDescoberta);
