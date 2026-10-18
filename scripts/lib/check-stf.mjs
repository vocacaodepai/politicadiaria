/**
 * Validação dos dados do Supremo (data/stf/*.json), chamada por scripts/check-content.mjs.
 *
 * Exige campos obrigatórios, URLs https, datas válidas e não futuras, sigilo em vocabulário
 * fechado, relator que exista na composição e nenhum CPF ou travessão nos textos.
 */
import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

const SIGILO = ["publico", "sigiloso", "nao_informado"];
const RESULT = ["unanimidade", "maioria", "nao_informado"];
const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;
const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const CPF_RE = /\b\d{3}\.\d{3}\.\d{3}-\d{2}\b/;
const BANNED = [/Anthropic/i, /\bClaude\b/, /intelig[êe]ncia artificial/i];

const validDate = (s) => typeof s === "string" && DATE_RE.test(s) && !Number.isNaN(Date.parse(`${s}T12:00:00Z`)) && new Date(`${s}T12:00:00Z`).toISOString().slice(0, 10) === s;
const isHttps = (u) => {
  try {
    return new URL(u).protocol === "https:";
  } catch {
    return false;
  }
};

export function checkStf(root, { errors, warnings, TODAY }) {
  const dir = join(root, "data", "stf");
  if (!existsSync(dir)) return { stf: 0 };
  const read = (f) => {
    try {
      return JSON.parse(readFileSync(join(dir, f), "utf8"));
    } catch (e) {
      errors.push(`data/stf/${f}: JSON ausente ou inválido (${e.message})`);
      return null;
    }
  };
  const err = (f, msg) => errors.push(`data/stf/${f}: ${msg}`);

  for (const f of readdirSync(dir).filter((x) => x.endsWith(".json"))) {
    const raw = readFileSync(join(dir, f), "utf8");
    if (CPF_RE.test(raw)) err(f, "contém padrão de CPF (dado pessoal não permitido)");
    if (raw.includes("—")) err(f, "contém travessão (—)");
    for (const re of BANNED) if (re.test(raw)) err(f, `contém termo proibido no conteúdo (${re})`);
  }

  const meta = read("meta.json");
  const min = read("ministros.json");
  const jul = read("julgamentos.json");
  const pau = read("pauta.json");
  if (!meta || !min || !jul || !pau) return { stf: 0 };

  for (const [f, o] of [["meta.json", meta], ["ministros.json", min], ["julgamentos.json", jul], ["pauta.json", pau]]) {
    if (!validDate(o.atualizadoEm)) err(f, `atualizadoEm inválido (${o.atualizadoEm})`);
    else if (o.atualizadoEm > TODAY) err(f, `atualizadoEm no futuro (${o.atualizadoEm})`);
  }
  for (const s of meta.fontes ?? []) if (!isHttps(s.url)) err("meta.json", `fonte sem URL https (${s.id})`);
  if (!meta.fontes?.length) err("meta.json", "sem lista de fontes");

  const slugs = new Set();
  if (!Array.isArray(min.ministros) || !min.ministros.length) err("ministros.json", "sem ministros");
  if (!isHttps(min.fonteUrl)) err("ministros.json", "fonteUrl ausente ou sem https");
  for (const m of min.ministros ?? []) {
    const w = `ministro ${m.slug}`;
    if (!SLUG_RE.test(m.slug ?? "")) err("ministros.json", `${w}: slug inválido`);
    if (slugs.has(m.slug)) err("ministros.json", `${w}: slug duplicado`);
    slugs.add(m.slug);
    for (const k of ["nome", "nomeCompleto", "indicadoPor", "cargo"]) if (!m[k]) err("ministros.json", `${w}: falta ${k}`);
    if (!validDate(m.posse)) err("ministros.json", `${w}: posse inválida (${m.posse})`);
    else if (m.posse > TODAY) err("ministros.json", `${w}: posse no futuro`);
    if (!validDate(m.nascimento)) err("ministros.json", `${w}: nascimento inválido (${m.nascimento})`);
    else if (m.aposentadoriaCompulsoria !== `${+m.nascimento.slice(0, 4) + 75}${m.nascimento.slice(4)}`) err("ministros.json", `${w}: aposentadoria compulsória não é nascimento + 75 anos`);
    if (m.foto) {
      if (!isHttps(m.foto.url)) err("ministros.json", `${w}: foto sem URL https`);
      for (const k of ["credito", "creditoUrl", "licenca"]) if (!m.foto[k]) err("ministros.json", `${w}: foto sem ${k}`);
    }
    if (m.senado) {
      if (!isHttps(m.senado.fonteUrl)) err("ministros.json", `${w}: votação no Senado sem fonte https`);
      if (m.senado.data && !validDate(m.senado.data)) err("ministros.json", `${w}: data de aprovação no Senado inválida`);
    }
    if (!m.estatisticas || typeof m.estatisticas.nota !== "string") err("ministros.json", `${w}: sem estatísticas`);
  }

  const ids = new Set();
  for (const j of jul.itens ?? []) {
    const w = `julgamento ${j.id}`;
    if (!j.id || ids.has(j.id)) err("julgamentos.json", `${w}: id ausente ou duplicado`);
    ids.add(j.id);
    if (!validDate(j.data)) err("julgamentos.json", `${w}: data inválida (${j.data})`);
    else if (j.data > TODAY) err("julgamentos.json", `${w}: data no futuro`);
    for (const k of ["orgao", "classe", "numero", "processo", "titulo"]) if (!j[k]) err("julgamentos.json", `${w}: falta ${k}`);
    if (!/^\d+$/.test(j.numero ?? "")) err("julgamentos.json", `${w}: número do processo inválido (${j.numero})`);
    if (!SIGILO.includes(j.sigilo)) err("julgamentos.json", `${w}: sigilo inválido (${j.sigilo})`);
    if (!RESULT.includes(j.resultado?.tipo)) err("julgamentos.json", `${w}: resultado inválido`);
    if (!isHttps(j.fonteUrl)) err("julgamentos.json", `${w}: fonteUrl sem https`);
    if (j.processoUrl && !isHttps(j.processoUrl)) err("julgamentos.json", `${w}: processoUrl sem https`);
    if (j.relatorSlug && !slugs.has(j.relatorSlug)) err("julgamentos.json", `${w}: relatorSlug sem ministro correspondente`);
    for (const v of j.votos ?? []) {
      if (!v.ministro || !v.tipo || !v.trecho) err("julgamentos.json", `${w}: voto sem ministro, tipo ou trecho (evidência)`);
      if (v.slug && !slugs.has(v.slug)) err("julgamentos.json", `${w}: voto com slug desconhecido (${v.slug})`);
    }
  }
  if (!jul.cobertura?.limite || !isHttps(jul.cobertura?.fonteUrl)) err("julgamentos.json", "cobertura sem limite declarado ou fonte https");

  for (const p of pau.pautas ?? []) {
    const w = `pauta ${p.id}`;
    if (!validDate(p.data)) err("pauta.json", `${w}: data inválida`);
    if (!isHttps(p.fonteUrl)) err("pauta.json", `${w}: fonteUrl sem https`);
    for (const it of p.itens ?? []) {
      if (!it.classe || !/^\d+$/.test(it.numero ?? "")) err("pauta.json", `${w}: item sem classe ou número válido`);
      if (!SIGILO.includes(it.sigilo)) err("pauta.json", `${w}: sigilo inválido`);
      if (it.url && !isHttps(it.url)) err("pauta.json", `${w}: url do item sem https`);
      if (it.relatorSlug && !slugs.has(it.relatorSlug)) err("pauta.json", `${w}: relatorSlug desconhecido`);
    }
  }
  for (const s of pau.sessoes ?? []) {
    if (!validDate(s.data) || !s.tipo || !isHttps(s.url)) err("pauta.json", `sessão ${s.id}: data, tipo ou url https inválidos`);
  }
  if ((jul.itens ?? []).length === 0) warnings.push("data/stf/julgamentos.json sem julgamentos");
  return { stf: (jul.itens ?? []).length };
}
