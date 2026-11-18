/**
 * Validação da fila de pautas (content/pautas/fila.json) e do registro das rodadas das rotinas
 * (content/rotinas/registro/AAAA-MM-DD-HHMM-<rotina>.json, um arquivo por rodada).
 *
 * São arquivos internos: alimentam só o painel /interno/rotinas (noindex, fora do sitemap).
 * O schema é simples de propósito, para a rotina escrever à mão sem erro. Sem dado pessoal,
 * sem texto opinativo, sem travessão. Ver docs/rotinas/comum.md, "Fila de pautas e registro".
 */
import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { hasCpf } from "./cpf.mjs";

export const ROTINAS = ["noticias", "checagem", "eleicoes", "congresso", "livros", "historia", "promessas"];
export const MOTIVOS = [
  "fonte-unica",
  "aguardando-fato",
  "sem-angulo",
  "numeros-divergentes",
  "sem-fonte-primaria",
  "fonte-bloqueada",
  "ja-publicado",
  "fora-do-escopo",
];
export const STATUS_PAUTA = ["aberta", "publicada", "descartada"];
export const ERROS_BLOQUEIO = [
  "http-401",
  "http-403",
  "http-404",
  "http-429",
  "http-5xx",
  "captcha",
  "timeout",
  "sem-creditos",
  "dns",
  "tls",
  "proxy",
  "outro",
];
/** Rotinas cujo `publicou` lista slugs de content/ (as demais publicam dados em data/). */
const ROTINAS_DE_CONTEUDO = new Set(["noticias", "checagem", "livros", "historia"]);

// Horário de Brasília (sem horário de verão desde 2019): sempre -03:00.
const ISO_BRT = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}(?::\d{2})?-03:00$/;
const SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const HOST = /^(?=.{1,253}$)[a-z0-9](?:[a-z0-9-]*[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]*[a-z0-9])?)*$/;
const REGISTRO_FILE = /^(\d{4}-\d{2}-\d{2})-(\d{2})(\d{2})-([a-z]+)\.json$/;
const EMAIL = /[\w.+-]+@[\w-]+\.[\w.]+/;
// Folga para relógio: o registro é escrito segundos antes do commit.
const SKEW_MS = 10 * 60 * 1000;

function isObj(v) {
  return v !== null && typeof v === "object" && !Array.isArray(v);
}

function checkTexto(v, where, errors, { min = 3, max = 200 } = {}) {
  if (typeof v !== "string" || v.trim().length < min) {
    errors.push(`${where}: texto ausente ou curto demais`);
    return;
  }
  if (v.length > max) errors.push(`${where}: texto com ${v.length} caracteres (máximo ${max})`);
  if (/—/.test(v)) errors.push(`${where}: travessão (—); use dois-pontos, vírgula ou parênteses`);
  if (/\b(IA|Claude|Anthropic|ChatGPT)\b/.test(v)) errors.push(`${where}: não mencione IA, Claude ou Anthropic`);
  if (hasCpf(v) || EMAIL.test(v)) errors.push(`${where}: dado pessoal (CPF ou e-mail) não entra`);
  if (/https?:\/\//i.test(v)) errors.push(`${where}: URL fora do campo próprio (use fontesAbertas)`);
}

function checkIso(v, where, errors, now) {
  if (typeof v !== "string" || !ISO_BRT.test(v)) {
    errors.push(`${where}: data "${v}" precisa ser ISO com fuso de Brasília (AAAA-MM-DDTHH:MM:SS-03:00)`);
    return null;
  }
  const t = Date.parse(v);
  if (Number.isNaN(t)) {
    errors.push(`${where}: data inválida "${v}"`);
    return null;
  }
  if (t > now + SKEW_MS) errors.push(`${where}: data no futuro (${v})`);
  return t;
}

function readJson(path, where, errors) {
  try {
    return JSON.parse(readFileSync(path, "utf8"));
  } catch (e) {
    errors.push(`${where}: JSON inválido (${e.message})`);
    return undefined;
  }
}

function allowOnly(obj, keys, where, errors) {
  for (const k of Object.keys(obj)) if (!keys.includes(k)) errors.push(`${where}: campo desconhecido "${k}"`);
}

/** Fila de pautas. Devolve o número de pautas. */
export function checkFila(root, { errors, contentSlugs, now = Date.now() }) {
  const path = join(root, "content", "pautas", "fila.json");
  const where = "pautas/fila.json";
  if (!existsSync(path)) {
    errors.push(`${where}: arquivo ausente`);
    return 0;
  }
  const data = readJson(path, where, errors);
  if (data === undefined) return 0;
  if (!isObj(data) || !Array.isArray(data.pautas)) {
    errors.push(`${where}: formato esperado { "atualizadoEm": "...", "pautas": [ ... ] }`);
    return 0;
  }
  allowOnly(data, ["atualizadoEm", "pautas"], where, errors);
  checkIso(data.atualizadoEm, `${where} atualizadoEm`, errors, now);

  const ids = new Set();
  data.pautas.forEach((p, i) => {
    const w = `${where} pautas[${i}]${p && typeof p.id === "string" ? ` (${p.id})` : ""}`;
    if (!isObj(p)) {
      errors.push(`${w}: item precisa ser objeto`);
      return;
    }
    allowOnly(
      p,
      ["id", "rotina", "tema", "motivo", "falta", "fontesAbertas", "primeiraVezVisto", "ultimaRevisao", "status", "slug"],
      w,
      errors
    );
    if (typeof p.id !== "string" || !SLUG.test(p.id)) errors.push(`${w}: id precisa ser slug (a-z, 0-9, hífen)`);
    else if (ids.has(p.id)) errors.push(`${w}: id duplicado`);
    else ids.add(p.id);
    if (p.rotina !== undefined && !ROTINAS.includes(p.rotina)) errors.push(`${w}: rotina inválida "${p.rotina}"`);
    checkTexto(p.tema, `${w} tema`, errors, { min: 5, max: 160 });
    if (!MOTIVOS.includes(p.motivo)) errors.push(`${w}: motivo inválido "${p.motivo}" (use ${MOTIVOS.join(", ")})`);
    if (p.falta !== undefined) checkTexto(p.falta, `${w} falta`, errors, { max: 160 });
    if (!Array.isArray(p.fontesAbertas)) errors.push(`${w}: fontesAbertas precisa ser lista (vazia se não houver)`);
    else {
      const seen = new Set();
      for (const u of p.fontesAbertas) {
        let ok = false;
        try {
          ok = typeof u === "string" && new URL(u).protocol === "https:";
        } catch {}
        if (!ok) errors.push(`${w}: fontesAbertas com URL inválida (só https) -> ${u}`);
        else if (seen.has(u)) errors.push(`${w}: fontesAbertas com URL repetida -> ${u}`);
        seen.add(u);
      }
    }
    const t1 = checkIso(p.primeiraVezVisto, `${w} primeiraVezVisto`, errors, now);
    const t2 = checkIso(p.ultimaRevisao, `${w} ultimaRevisao`, errors, now);
    if (t1 !== null && t2 !== null && t2 < t1) errors.push(`${w}: ultimaRevisao anterior a primeiraVezVisto`);
    if (!STATUS_PAUTA.includes(p.status)) errors.push(`${w}: status inválido "${p.status}" (use ${STATUS_PAUTA.join(", ")})`);
    if (p.status === "publicada") {
      if (typeof p.slug !== "string" || !SLUG.test(p.slug)) errors.push(`${w}: pauta publicada precisa do slug do conteúdo`);
      else if (!contentSlugs.has(p.slug)) errors.push(`${w}: slug "${p.slug}" não existe em content/`);
    } else if (p.slug !== undefined) {
      errors.push(`${w}: slug só entra quando status for "publicada"`);
    }
  });
  return data.pautas.length;
}

/** Registro das rodadas. Devolve o número de rodadas registradas. */
export function checkRegistro(root, { errors, contentSlugs, now = Date.now() }) {
  const dir = join(root, "content", "rotinas", "registro");
  if (!existsSync(dir)) return 0;
  let n = 0;
  for (const file of readdirSync(dir).sort()) {
    if (file === ".gitkeep") continue;
    const where = `rotinas/registro/${file}`;
    const m = REGISTRO_FILE.exec(file);
    if (!m) {
      errors.push(`${where}: nome precisa ser AAAA-MM-DD-HHMM-<rotina>.json`);
      continue;
    }
    n++;
    const r = readJson(join(dir, file), where, errors);
    if (r === undefined) continue;
    if (!isObj(r)) {
      errors.push(`${where}: o arquivo precisa ter um único objeto (uma rodada)`);
      continue;
    }
    allowOnly(r, ["rotina", "inicio", "fim", "branch", "publicou", "descartou", "bloqueios", "pr"], where, errors);
    if (!ROTINAS.includes(r.rotina)) errors.push(`${where}: rotina inválida "${r.rotina}" (use ${ROTINAS.join(", ")})`);
    else if (m[4] !== r.rotina) errors.push(`${where}: nome do arquivo diz "${m[4]}", mas rotina é "${r.rotina}"`);
    const ti = checkIso(r.inicio, `${where} inicio`, errors, now);
    const tf = checkIso(r.fim, `${where} fim`, errors, now);
    if (ti !== null && tf !== null && tf < ti) errors.push(`${where}: fim anterior a inicio`);
    if (typeof r.inicio === "string" && !r.inicio.startsWith(`${m[1]}T${m[2]}:${m[3]}`)) {
      errors.push(`${where}: nome do arquivo precisa repetir a data e a hora de inicio (${r.inicio})`);
    }
    if (r.branch !== undefined && (typeof r.branch !== "string" || !/^claude\/[a-z0-9._/-]+$/.test(r.branch))) {
      errors.push(`${where}: branch inválida "${r.branch}"`);
    }
    if (r.pr !== null && r.pr !== undefined && !(Number.isInteger(r.pr) && r.pr > 0)) {
      errors.push(`${where}: pr precisa ser o número do PR ou null`);
    }

    if (!Array.isArray(r.publicou)) errors.push(`${where}: publicou precisa ser lista (vazia se nada entrou)`);
    else
      for (const s of r.publicou) {
        if (typeof s !== "string" || !s) errors.push(`${where}: publicou com item inválido`);
        else if (ROTINAS_DE_CONTEUDO.has(r.rotina)) {
          if (!contentSlugs.has(s)) errors.push(`${where}: publicou "${s}", que não existe em content/`);
        } else if (!/^[a-z0-9][a-z0-9/._-]*$/.test(s)) {
          errors.push(`${where}: publicou "${s}" (use o caminho do arquivo de dados alterado, ex.: data/congresso)`);
        }
      }

    if (!Array.isArray(r.descartou)) errors.push(`${where}: descartou precisa ser lista (vazia se nada foi descartado)`);
    else
      r.descartou.forEach((d, i) => {
        const w = `${where} descartou[${i}]`;
        if (!isObj(d)) return errors.push(`${w}: item precisa ser objeto { tema, motivo }`);
        allowOnly(d, ["tema", "motivo", "pauta"], w, errors);
        checkTexto(d.tema, `${w} tema`, errors, { min: 5, max: 160 });
        if (!MOTIVOS.includes(d.motivo)) errors.push(`${w}: motivo inválido "${d.motivo}" (use ${MOTIVOS.join(", ")})`);
        if (d.pauta !== undefined && (typeof d.pauta !== "string" || !SLUG.test(d.pauta))) {
          errors.push(`${w}: pauta precisa ser o id da fila`);
        }
      });

    if (!Array.isArray(r.bloqueios)) errors.push(`${where}: bloqueios precisa ser lista (vazia se nada bloqueou)`);
    else
      r.bloqueios.forEach((b, i) => {
        const w = `${where} bloqueios[${i}]`;
        if (!isObj(b)) return errors.push(`${w}: item precisa ser objeto { host, erro }`);
        allowOnly(b, ["host", "erro", "detalhe"], w, errors);
        if (typeof b.host !== "string" || !HOST.test(b.host)) errors.push(`${w}: host inválido "${b.host}" (só o nome, ex.: www.tse.jus.br)`);
        if (!ERROS_BLOQUEIO.includes(b.erro)) errors.push(`${w}: erro inválido "${b.erro}" (use ${ERROS_BLOQUEIO.join(", ")})`);
        if (b.detalhe !== undefined) checkTexto(b.detalhe, `${w} detalhe`, errors, { max: 160 });
      });
  }
  return n;
}
