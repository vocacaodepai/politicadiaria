/**
 * Validação do painel de promessas (data/promessas/*.json), chamada por scripts/check-content.mjs
 * e, sozinha, por `npm run check:promessas`.
 *
 * Regras: id único, fonte com URL https, citação com no máximo 25 palavras, status válido,
 * toda mudança de status com data e fonte, nunca status além de "prometida" sem histórico com fonte,
 * nada de histórico antes da posse nem para o candidato que não foi eleito, "contrariada" só com
 * fonte oficial e nenhum travessão em nenhum texto.
 */
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const STATUS = ["prometida", "em tramitacao", "em andamento", "entregue", "contrariada", "sem dados"];
const AREAS = [
  "economia", "trabalho-e-previdencia", "seguranca-publica", "saude", "educacao", "energia-e-infraestrutura",
  "meio-ambiente-e-clima", "protecao-social-e-moradia", "agropecuaria", "estado-e-instituicoes",
  "politica-externa-e-defesa", "costumes-e-direitos", "cultura",
];
const CANDIDATOS = { lula: "LULA", flavio: "FLAV" };
const FONTE_TIPOS = ["plano", "imprensa", "oficial"];
const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;
const ID_RE = /^(LULA|FLAV)-[A-Z]{3,4}-\d{2}$/;
const OFFICIAL_HOST = /\.(gov|leg|jus|mil)\.br$/i;
const MAX_QUOTE_WORDS = 25;

const words = (s) => s.trim().split(/\s+/).filter(Boolean).length;
const isHttps = (u) => typeof u === "string" && /^https:\/\/[^\s/]+\.[^\s]+$/.test(u);
const hostOf = (u) => {
  try {
    return new URL(u).hostname;
  } catch {
    return "";
  }
};

function allStrings(value, out = []) {
  if (typeof value === "string") out.push(value);
  else if (Array.isArray(value)) value.forEach((v) => allStrings(v, out));
  else if (value && typeof value === "object") Object.values(value).forEach((v) => allStrings(v, out));
  return out;
}

function readJson(path, errors, label) {
  try {
    return JSON.parse(readFileSync(path, "utf8"));
  } catch (e) {
    errors.push(`promessas/${label}: não consegui ler ou interpretar o JSON (${e.message})`);
    return null;
  }
}

export function checkPromessas(ctx) {
  const { errors, TODAY } = ctx;
  const dir = ctx.dir ?? resolve(new URL("../..", import.meta.url).pathname, "data/promessas");
  const meta = readJson(resolve(dir, "meta.json"), errors, "meta.json");
  if (!meta) return { propostas: 0 };

  if (meta.eleito !== null && !(meta.eleito in CANDIDATOS)) {
    errors.push(`promessas/meta.json: eleito precisa ser null, "lula" ou "flavio" (veio ${JSON.stringify(meta.eleito)})`);
  }
  if (!DATE_RE.test(meta.posse ?? "")) errors.push("promessas/meta.json: posse precisa ser AAAA-MM-DD");
  if (!DATE_RE.test(meta.atualizadoEm ?? "")) errors.push("promessas/meta.json: atualizadoEm precisa ser AAAA-MM-DD");
  else if (meta.atualizadoEm > TODAY) errors.push(`promessas/meta.json: atualizadoEm no futuro (${meta.atualizadoEm})`);

  for (const c of Object.keys(CANDIDATOS)) {
    const info = meta.candidatos?.[c];
    if (!info) {
      errors.push(`promessas/meta.json: falta candidatos.${c}`);
      continue;
    }
    if (!info.nome || !info.partido) errors.push(`promessas/meta.json: candidatos.${c} sem nome ou partido`);
    const plano = info.plano ?? {};
    if (!isHttps(plano.url)) errors.push(`promessas/meta.json: candidatos.${c}.plano.url precisa ser https`);
    if (!isHttps(plano.materia)) errors.push(`promessas/meta.json: candidatos.${c}.plano.materia precisa ser https`);
    if (!plano.hospedadoPor) errors.push(`promessas/meta.json: candidatos.${c}.plano.hospedadoPor vazio`);
    for (const [i, n] of (info.naoFara ?? []).entries()) {
      const w = `promessas/meta.json: candidatos.${c}.naoFara[${i}]`;
      if (!n.texto) errors.push(`${w}: sem texto`);
      if (n.citacao && words(n.citacao) > MAX_QUOTE_WORDS) errors.push(`${w}: citação com mais de ${MAX_QUOTE_WORDS} palavras`);
      if (!DATE_RE.test(n.data ?? "")) errors.push(`${w}: data inválida`);
      if (!isHttps(n.fonte?.url)) errors.push(`${w}: fonte.url precisa ser https`);
    }
  }

  const ids = new Map();
  let total = 0;
  for (const [cand, prefix] of Object.entries(CANDIDATOS)) {
    const file = readJson(resolve(dir, `${cand}.json`), errors, `${cand}.json`);
    if (!file) continue;
    if (file.candidato !== cand) errors.push(`promessas/${cand}.json: campo candidato deveria ser "${cand}"`);
    if (!Array.isArray(file.propostas) || file.propostas.length === 0) {
      errors.push(`promessas/${cand}.json: propostas vazio`);
      continue;
    }
    const archived = meta.eleito && meta.eleito !== cand;
    for (const p of file.propostas) {
      total++;
      const w = `promessas/${p.id ?? "(sem id)"}`;
      if (!ID_RE.test(p.id ?? "")) errors.push(`${w}: id fora do padrão LULA-ABC-01 / FLAV-ABC-01`);
      else if (!p.id.startsWith(`${prefix}-`)) errors.push(`${w}: id não combina com o arquivo ${cand}.json`);
      if (ids.has(p.id)) errors.push(`${w}: id duplicado (também em ${ids.get(p.id)})`);
      ids.set(p.id, cand);
      if (!AREAS.includes(p.area)) errors.push(`${w}: area inválida "${p.area}"`);
      for (const f of ["titulo", "texto", "meta", "prazo"]) if (!p[f] || !String(p[f]).trim()) errors.push(`${w}: sem ${f}`);
      if (p.titulo && p.titulo.length > 90) errors.push(`${w}: titulo com ${p.titulo.length} caracteres (máximo 90)`);
      if (!["plano", "campanha"].includes(p.origem)) errors.push(`${w}: origem precisa ser "plano" ou "campanha"`);
      if (typeof p.citacao !== "string") errors.push(`${w}: citacao precisa existir (pode ser vazia)`);
      else if (words(p.citacao) > MAX_QUOTE_WORDS) errors.push(`${w}: citação com ${words(p.citacao)} palavras (máximo ${MAX_QUOTE_WORDS})`);

      const f = p.fonte ?? {};
      if (!f.nome) errors.push(`${w}: fonte sem nome`);
      if (!isHttps(f.url)) errors.push(`${w}: fonte.url precisa ser https`);
      if (!FONTE_TIPOS.includes(f.tipo)) errors.push(`${w}: fonte.tipo inválido "${f.tipo}"`);
      if (f.tipo === "plano" && !f.pagina) errors.push(`${w}: fonte do plano sem página`);
      if (/registrad[oa] no TSE/i.test(f.nome ?? "")) errors.push(`${w}: a fonte não pode ser rotulada como registrada no TSE sem conferência com o arquivo do TSE`);

      if (p.indicador) {
        if (!p.indicador.nome || !p.indicador.serie) errors.push(`${w}: indicador sem nome ou serie`);
        if (p.indicador.url && !isHttps(p.indicador.url)) errors.push(`${w}: indicador.url precisa ser https (ou vazio)`);
      }

      if (!STATUS.includes(p.status)) errors.push(`${w}: status inválido "${p.status}"`);
      if (!Array.isArray(p.historico)) {
        errors.push(`${w}: historico precisa ser uma lista`);
        continue;
      }
      let prev = "";
      for (const [i, h] of p.historico.entries()) {
        const hw = `${w}: historico[${i}]`;
        if (!DATE_RE.test(h.data ?? "")) errors.push(`${hw}: data inválida`);
        else {
          if (h.data > TODAY) errors.push(`${hw}: data no futuro (${h.data})`);
          if (DATE_RE.test(meta.posse ?? "") && h.data < meta.posse) errors.push(`${hw}: data anterior à posse (${meta.posse}); o acompanhamento começa na posse`);
          if (prev && h.data < prev) errors.push(`${hw}: fora de ordem cronológica`);
          prev = h.data;
        }
        if (!STATUS.includes(h.status)) errors.push(`${hw}: status inválido "${h.status}"`);
        if (!h.resumo || !String(h.resumo).trim()) errors.push(`${hw}: sem resumo factual`);
        if (!h.fonte?.nome || !isHttps(h.fonte?.url)) errors.push(`${hw}: mudança de status exige fonte com nome e URL https`);
      }
      if (p.status !== "prometida") {
        const last = p.historico.at(-1);
        if (!last) errors.push(`${w}: status "${p.status}" exige ao menos uma entrada de histórico com fonte`);
        else if (last.status !== p.status) errors.push(`${w}: status "${p.status}" difere do último histórico ("${last.status}")`);
        if (p.status === "contrariada" && last && !OFFICIAL_HOST.test(hostOf(last.fonte?.url ?? ""))) {
          errors.push(`${w}: "contrariada" exige fonte oficial (domínio .gov.br, .leg.br, .jus.br ou .mil.br) na última entrada`);
        }
      } else if (p.historico.length > 0 && p.historico.at(-1).status !== "prometida") {
        errors.push(`${w}: status "prometida" mas o último histórico é "${p.historico.at(-1).status}"`);
      }
      if (archived && (p.historico.length > 0 || p.status !== "prometida")) {
        errors.push(`${w}: candidato sem eleição é arquivo da campanha; não pode ter acompanhamento (histórico ou status diferente de prometida)`);
      }
    }
  }

  for (const [i, c] of (meta.checagensAgencias ?? []).entries()) {
    const w = `promessas/meta.json: checagensAgencias[${i}]`;
    if (!(c.candidato in CANDIDATOS)) errors.push(`${w}: candidato inválido`);
    if (c.propostaId && !ids.has(c.propostaId)) errors.push(`${w}: propostaId inexistente ${c.propostaId}`);
    for (const k of ["tema", "alegacao", "rotulo", "agencia", "resumo"]) if (!c[k]) errors.push(`${w}: sem ${k}`);
    if (!DATE_RE.test(c.data ?? "")) errors.push(`${w}: data inválida`);
    if (!isHttps(c.fonte?.url)) errors.push(`${w}: fonte.url precisa ser https`);
  }

  for (const s of allStrings(meta)) if (/—/.test(s)) errors.push(`promessas/meta.json: travessão (—) em "${s.slice(0, 60)}"`);
  for (const cand of Object.keys(CANDIDATOS)) {
    const file = readJson(resolve(dir, `${cand}.json`), [], cand);
    for (const s of allStrings(file ?? {})) if (/—/.test(s)) errors.push(`promessas/${cand}.json: travessão (—) em "${s.slice(0, 60)}"`);
  }
  for (const s of allStrings(meta)) if (/\b(Claude|Anthropic)\b/.test(s)) errors.push("promessas/meta.json: menção proibida no conteúdo do site");

  return { propostas: total };
}
