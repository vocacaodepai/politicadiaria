#!/usr/bin/env node
/**
 * Coletor de dados abertos do Congresso Nacional (Câmara dos Deputados + Senado Federal).
 *
 *   npm run congress:update                 # tudo, reaproveitando o cache em .cache/congress/
 *   npm run congress:update -- --refresh    # apaga o cache e baixa tudo de novo
 *   npm run congress:update -- --only=senado|camara|fotos
 *
 * Fontes (todas oficiais, sem chave de API):
 *  - Câmara: API https://dadosabertos.camara.leg.br/api/v2 (lista, detalhe, histórico, órgãos,
 *    frentes, profissões) e arquivos em lote https://dadosabertos.camara.leg.br/arquivos/
 *    (votos, votações, proposições, autores) e https://www.camara.leg.br/cotas/ (cota parlamentar).
 *  - Senado: https://legis.senado.leg.br/dadosabertos (lista, detalhe, comissões, autorias,
 *    votações nominais) e https://adm.senado.gov.br/adm-dadosabertos (CEAPS).
 *
 * Idempotente e retomável: toda resposta bruta fica em .cache/congress/ (ignorado pelo git);
 * uma segunda execução só repete o que falhou. Requisições com limite de ritmo, tentativas e
 * espera exponencial. Atrás de proxy HTTP(S), rode com NODE_USE_ENV_PROXY=1.
 *
 * Não grava CPF nem endereço residencial. Saída em data/congresso/ (JSON minificado).
 */
import { createReadStream, existsSync, mkdirSync, readFileSync, writeFileSync, rmSync, statSync, createWriteStream, readdirSync } from "node:fs";
import { resolve, join } from "node:path";
import { createHash } from "node:crypto";
import { inflateRawSync } from "node:zlib";
import { StringDecoder } from "node:string_decoder";
import { pipeline } from "node:stream/promises";
import { Readable } from "node:stream";

const ROOT = resolve(new URL("..", import.meta.url).pathname);
const CACHE = join(ROOT, ".cache", "congress");
const OUT = join(ROOT, "data", "congresso");
const PUB = join(ROOT, "public", "data", "congresso");
const UA = "PoliticaDiariaBot/1.0 (agregador de dados abertos; contato via site)";
const args = process.argv.slice(2);
const REFRESH = args.includes("--refresh");
const ONLY = (args.find((a) => a.startsWith("--only=")) ?? "").slice(7) || "all";
const YEARS = [2023, 2024, 2025, 2026];
const LEG_START = "2023-02-01";
const TODAY = new Date().toLocaleDateString("en-CA", { timeZone: "America/Sao_Paulo" });

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const log = (...a) => console.log(new Date().toISOString().slice(11, 19), ...a);
for (const d of [CACHE, join(CACHE, "api"), join(CACHE, "bulk"), OUT]) mkdirSync(d, { recursive: true });
if (REFRESH) {
  for (const d of ["api", "bulk"]) rmSync(join(CACHE, d), { recursive: true, force: true });
  for (const d of ["api", "bulk"]) mkdirSync(join(CACHE, d), { recursive: true });
  rmSync(join(CACHE, "photos.json"), { force: true });
}

/* ------------------------------------------------------------------ rede */

let lastReq = 0;
async function politeWait(minGap = 120) {
  const now = Date.now();
  const wait = lastReq + minGap - now;
  lastReq = Math.max(now, lastReq + minGap);
  if (wait > 0) await sleep(wait);
}

/** GET com tentativas e espera exponencial. Devolve o texto da resposta. */
async function getText(url, { accept = "application/json", tries = 7, timeout = 120000 } = {}) {
  let err;
  for (let i = 0; i < tries; i++) {
    try {
      await politeWait();
      const res = await fetch(url, { headers: { Accept: accept, "User-Agent": UA }, signal: AbortSignal.timeout(timeout) });
      if (res.ok) return await res.text();
      if (res.status >= 400 && res.status < 500 && res.status !== 429) throw Object.assign(new Error(`HTTP ${res.status} ${url}`), { status: res.status });
      err = new Error(`HTTP ${res.status} ${url}`);
    } catch (e) {
      if (e.status) throw e;
      err = e;
    }
    await sleep(1500 * 2 ** i + Math.random() * 500);
  }
  throw err;
}

/** JSON com cache em disco (a chave é a própria URL). */
async function getJson(url, opts) {
  const f = join(CACHE, "api", createHash("sha1").update(url).digest("hex") + ".json");
  if (existsSync(f) && statSync(f).size > 0) return JSON.parse(readFileSync(f, "utf8"));
  const text = await getText(url, opts);
  const data = JSON.parse(text);
  writeFileSync(f, text);
  return data;
}

/** Percorre a paginação da API da Câmara (links rel=next). */
async function camaraAll(url) {
  const out = [];
  let next = url;
  while (next) {
    const j = await getJson(next);
    out.push(...(j.dados ?? []));
    next = (j.links ?? []).find((l) => l.rel === "next")?.href ?? null;
  }
  return out;
}

async function pool(items, n, fn, label = "") {
  let i = 0;
  let done = 0;
  const failures = [];
  await Promise.all(
    Array.from({ length: n }, async () => {
      while (i < items.length) {
        const item = items[i++];
        try {
          await fn(item);
        } catch (e) {
          failures.push({ item, error: String(e.message ?? e) });
        }
        done++;
        if (label && done % 50 === 0) log(`${label}: ${done}/${items.length}`);
      }
    }),
  );
  if (failures.length) log(`${label}: ${failures.length} falha(s)`, failures.slice(0, 3));
  return failures;
}

async function download(url, dest) {
  if (existsSync(dest) && statSync(dest).size > 0) return;
  for (let i = 0; i < 6; i++) {
    try {
      const res = await fetch(url, { headers: { "User-Agent": UA }, signal: AbortSignal.timeout(600000) });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      await pipeline(Readable.fromWeb(res.body), createWriteStream(dest + ".part"));
      const { renameSync } = await import("node:fs");
      renameSync(dest + ".part", dest);
      log("baixado", url);
      return;
    } catch (e) {
      log("falha no download", url, e.message);
      await sleep(3000 * 2 ** i);
    }
  }
  throw new Error(`Não foi possível baixar ${url}`);
}

/* ------------------------------------------------------------------- CSV */

async function* csvRecords(chunks, delim = 59) {
  let field = "";
  let row = [];
  let inQ = false;
  let justClosed = false;
  let first = true;
  for await (const chunk of chunks) {
    const len = chunk.length;
    let pos = 0;
    while (pos < len) {
      if (inQ) {
        const q = chunk.indexOf('"', pos);
        if (q < 0) {
          field += chunk.slice(pos);
          pos = len;
        } else {
          field += chunk.slice(pos, q);
          pos = q + 1;
          inQ = false;
          justClosed = true;
        }
        continue;
      }
      if (justClosed) {
        if (chunk.charCodeAt(pos) === 34) {
          field += '"';
          inQ = true;
          justClosed = false;
          pos++;
          continue;
        }
        justClosed = false;
      }
      let j = pos;
      while (j < len) {
        const c = chunk.charCodeAt(j);
        if (c === delim || c === 10 || c === 34) break;
        j++;
      }
      field += chunk.slice(pos, j);
      pos = j;
      if (pos >= len) break;
      const c = chunk.charCodeAt(pos);
      if (c === delim) {
        row.push(field);
        field = "";
        pos++;
      } else if (c === 10) {
        row.push(field.endsWith("\r") ? field.slice(0, -1) : field);
        if (first && row[0]) row[0] = row[0].replace(/^﻿/, "");
        first = false;
        yield row;
        row = [];
        field = "";
        pos++;
      } else {
        inQ = true;
        pos++;
      }
    }
  }
  if (field || row.length) {
    row.push(field);
    yield row;
  }
}

async function* csvObjects(chunks) {
  let header = null;
  for await (const r of csvRecords(chunks)) {
    if (!header) {
      header = r;
      continue;
    }
    if (r.length === 1 && r[0] === "") continue;
    const o = {};
    for (let i = 0; i < header.length; i++) o[header[i]] = r[i] ?? "";
    yield o;
  }
}

const fileChunks = (path) => createReadStream(path, { encoding: "utf8", highWaterMark: 1 << 20 });

/** Lê o único arquivo de um .zip (via diretório central) e devolve pedaços de texto. */
function* zipChunks(path) {
  const buf = readFileSync(path);
  let e = buf.length - 22;
  while (e >= 0 && buf.readUInt32LE(e) !== 0x06054b50) e--;
  if (e < 0) throw new Error("zip inválido: " + path);
  const cdOff = buf.readUInt32LE(e + 16);
  if (buf.readUInt32LE(cdOff) !== 0x02014b50) throw new Error("zip inválido (diretório central)");
  const method = buf.readUInt16LE(cdOff + 10);
  const csize = buf.readUInt32LE(cdOff + 20);
  const lho = buf.readUInt32LE(cdOff + 42);
  const nameLen = buf.readUInt16LE(lho + 26);
  const extraLen = buf.readUInt16LE(lho + 28);
  const start = lho + 30 + nameLen + extraLen;
  const raw = buf.subarray(start, start + csize);
  const data = method === 0 ? raw : inflateRawSync(raw);
  const dec = new StringDecoder("utf8");
  const step = 4 << 20;
  for (let i = 0; i < data.length; i += step) yield dec.write(data.subarray(i, i + step));
  yield dec.end();
}

/* ------------------------------------------------------------- utilidades */

const num = (s) => {
  const n = Number(String(s ?? "").replace(",", "."));
  return Number.isFinite(n) ? n : 0;
};
const round2 = (n) => Math.round(n * 100) / 100;
const trunc = (s, max) => {
  const t = String(s ?? "").replace(/\s+/g, " ").trim();
  if (t.length <= max) return t;
  const cut = t.slice(0, max - 1);
  const sp = cut.lastIndexOf(" ");
  return (sp > max * 0.6 ? cut.slice(0, sp) : cut).replace(/[,;:.\s]$/, "") + "…";
};
const norm = (s) => String(s ?? "").normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
const kebab = (s) => norm(s).replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
const emptyToNull = (s) => (s === undefined || s === null || String(s).trim() === "" ? null : String(s).trim());
const toArray = (x) => (x === undefined || x === null ? [] : Array.isArray(x) ? x : [x]);
/** Quantas votações/proposições vão no HTML; o resto fica em public/data/congresso/extras/ (carregado sob demanda). */
const HTML_VOTES = 15;
const HTML_PROPS = 8;
/** Votos como texto: uma letra por votação, na ordem do dicionário ("-" = sem registro aplicável). */
const CH = { "17": "7", AP: "a", NA: "n" };
function encodeVotes(rows, n) {
  const a = Array(n).fill("-");
  for (const [i, code] of rows) a[i] = CH[code] ?? code;
  return a.join("");
}
function writeExtras(casa, id, extras) {
  const dir = join(PUB, "extras", casa);
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, `${id}.json`), JSON.stringify(extras));
}
const writeJson = (path, data) => {
  mkdirSync(resolve(path, ".."), { recursive: true });
  writeFileSync(path, JSON.stringify(data));
};
/** CNPJ tem 14 dígitos; CPF (pessoa física) não é publicado. */
const isCnpj = (s) => String(s ?? "").replace(/\D/g, "").length === 14;
const topN = (map, n) => [...map.entries()].sort((a, b) => b[1] - a[1]).slice(0, n);

/* ================================================================ CÂMARA */

const CAMARA = "https://dadosabertos.camara.leg.br/api/v2";
const CAMARA_BULK = "https://dadosabertos.camara.leg.br/arquivos";

async function collectCamaraApi() {
  log("Câmara: lista de deputados em exercício");
  const list = await camaraAll(`${CAMARA}/deputados?itens=100&ordem=ASC&ordenarPor=nome`);
  log("Câmara: ", list.length, "deputados");
  const ids = list.map((d) => d.id);
  const failures = await pool(
    ids,
    4,
    async (id) => {
      await getJson(`${CAMARA}/deputados/${id}`);
      await getJson(`${CAMARA}/deputados/${id}/historico`);
      await camaraAll(`${CAMARA}/deputados/${id}/orgaos?itens=100&dataInicio=${LEG_START}`);
      await camaraAll(`${CAMARA}/deputados/${id}/frentes`);
      await getJson(`${CAMARA}/deputados/${id}/profissoes`);
    },
    "Câmara API por deputado",
  );
  return { list, failures };
}

async function downloadCamaraBulk() {
  const jobs = [];
  for (const y of YEARS) {
    jobs.push([`${CAMARA_BULK}/votacoesVotos/csv/votacoesVotos-${y}.csv`, `votacoesVotos-${y}.csv`]);
    jobs.push([`${CAMARA_BULK}/votacoes/csv/votacoes-${y}.csv`, `votacoes-${y}.csv`]);
    jobs.push([`${CAMARA_BULK}/votacoesObjetos/csv/votacoesObjetos-${y}.csv`, `votacoesObjetos-${y}.csv`]);
    jobs.push([`${CAMARA_BULK}/proposicoesAutores/csv/proposicoesAutores-${y}.csv`, `proposicoesAutores-${y}.csv`]);
    jobs.push([`${CAMARA_BULK}/proposicoes/csv/proposicoes-${y}.csv`, `proposicoes-${y}.csv`]);
    jobs.push([`https://www.camara.leg.br/cotas/Ano-${y}.csv.zip`, `Ano-${y}.csv.zip`]);
  }
  // O ano corrente muda todo dia: sempre rebaixa os arquivos do ano atual se têm mais de 20 h.
  const curYear = new Date().getFullYear();
  for (const [, name] of jobs) {
    if (name.includes(String(curYear))) {
      const p = join(CACHE, "bulk", name);
      if (existsSync(p) && Date.now() - statSync(p).mtimeMs > 20 * 3600 * 1000) rmSync(p);
    }
  }
  for (const [url, name] of jobs) await download(url, join(CACHE, "bulk", name));
}

const bulk = (name) => join(CACHE, "bulk", name);

/** Intervalos [início, fim) em exercício, a partir do histórico de situação do deputado. */
function exerciseIntervals(hist) {
  const ev = hist
    .map((h) => ({ t: String(h.dataHora ?? ""), s: h.situacao }))
    .sort((a, b) => a.t.localeCompare(b.t));
  const out = [];
  let open = null;
  for (const e of ev) {
    if (e.s === null || e.s === undefined) continue;
    if (e.s === "Exercício") {
      if (open === null) open = e.t.slice(0, 10);
    } else if (open !== null) {
      out.push([open, e.t.slice(0, 10)]);
      open = null;
    }
  }
  if (open !== null) out.push([open, "9999-12-31"]);
  return out;
}

/** Dia estritamente depois do início e antes do fim (critério conservador, ver metodologia). */
const inExercise = (intervals, date) => intervals.some(([a, b]) => date > a && date < b);

async function buildCamara(list) {
  const ids = new Set(list.map((d) => d.id));
  const idStr = new Set([...ids].map(String));

  /* ---------- votações (metadados) ---------- */
  log("Câmara: votações");
  const votMeta = new Map(); // id -> meta
  for (const y of YEARS) {
    for await (const r of csvObjects(fileChunks(bulk(`votacoes-${y}.csv`)))) {
      votMeta.set(r.id, {
        id: r.id,
        data: r.data,
        hora: r.dataHoraRegistro,
        orgao: r.siglaOrgao,
        aprovacao: r.aprovacao === "" ? null : Number(r.aprovacao),
        sim: r.votosSim === "" ? null : Number(r.votosSim),
        nao: r.votosNao === "" ? null : Number(r.votosNao),
        outros: r.votosOutros === "" ? null : Number(r.votosOutros),
        descricao: r.descricao,
      });
    }
  }

  /* ---------- votos nominais ---------- */
  log("Câmara: votos nominais");
  const nominal = new Map(); // idVotacao -> n votos
  const votesBy = new Map(); // depId -> Map(idVotacao -> código)
  const CODES = { "Sim": "S", "Não": "N", "Abstenção": "A", "Obstrução": "O", "Art. 17": "17", "Artigo 17": "17" };
  const unknownVotes = new Map();
  for (const y of YEARS) {
    for await (const r of csvObjects(fileChunks(bulk(`votacoesVotos-${y}.csv`)))) {
      nominal.set(r.idVotacao, (nominal.get(r.idVotacao) ?? 0) + 1);
      if (!idStr.has(r.deputado_id)) continue;
      const code = CODES[r.voto] ?? null;
      if (!code) {
        // Linha de voto sem tipo reconhecido (ex.: vazio): não vira voto nem ausência por engano.
        unknownVotes.set(r.voto, (unknownVotes.get(r.voto) ?? 0) + 1);
        continue;
      }
      const id = Number(r.deputado_id);
      if (!votesBy.has(id)) votesBy.set(id, new Map());
      votesBy.get(id).set(r.idVotacao, code);
    }
  }
  if (unknownVotes.size) log("Câmara: tipos de voto não mapeados", [...unknownVotes]);

  // Dicionário: só votações nominais do Plenário.
  const plen = [...votMeta.values()]
    .filter((v) => v.orgao === "PLEN" && (nominal.get(v.id) ?? 0) >= 1)
    .sort((a, b) => b.hora.localeCompare(a.hora));
  log("Câmara: votações nominais do Plenário:", plen.length);

  /* ---------- objetos (matéria) das votações ---------- */
  const PRIORITY = ["PEC", "PLP", "PL", "MPV", "PDL", "PLV", "PRC", "PLN", "PDC"];
  const plenIds = new Set(plen.map((v) => v.id));
  const objs = new Map(); // idVotacao -> melhor objeto
  const score = (t) => {
    const i = PRIORITY.indexOf(t);
    return i < 0 ? 99 : i;
  };
  for (const y of YEARS) {
    for await (const r of csvObjects(fileChunks(bulk(`votacoesObjetos-${y}.csv`)))) {
      if (!plenIds.has(r.idVotacao)) continue;
      const cur = objs.get(r.idVotacao);
      const cand = { tipo: r.proposicao_siglaTipo, numero: r.proposicao_numero, ano: r.proposicao_ano, ementa: r.proposicao_ementa, id: r.proposicao_id };
      if (!cur || score(cand.tipo) < score(cur.tipo)) objs.set(r.idVotacao, cand);
    }
  }
  const dict = plen.map((v) => {
    const o = objs.get(v.id);
    const materia = o && o.tipo ? `${o.tipo}${o.numero && o.numero !== "0" ? ` ${o.numero}` : ""}${o.ano && o.ano !== "0" ? `/${o.ano}` : ""}` : null;
    return {
      id: v.id,
      d: v.data,
      m: materia,
      e: o?.ementa ? trunc(o.ementa, 240) : null,
      t: trunc(v.descricao, 200),
      a: v.aprovacao,
      s: v.sim,
      n: v.nao,
      o: v.outros,
    };
  });
  const dictIdx = new Map(dict.map((v, i) => [v.id, i]));
  const plenMeta = new Map(plen.map((v) => [v.id, v]));

  /* ---------- despesas (cota parlamentar) ---------- */
  log("Câmara: despesas (cota parlamentar)");
  const desp = new Map(); // depId -> agregado
  for (const y of YEARS) {
    for await (const r of csvObjects(zipChunks(bulk(`Ano-${y}.csv.zip`)))) {
      if (!idStr.has(r.ideCadastro)) continue;
      const ano = Number(r.numAno);
      const mes = Number(r.numMes);
      if (ano < 2023 || (ano === 2023 && mes < 2)) continue;
      const id = Number(r.ideCadastro);
      let a = desp.get(id);
      if (!a) desp.set(id, (a = { total: 0, docs: 0, ano: new Map(), cat: new Map(), anoCat: new Map(), mes: new Map(), forn: new Map(), fornNome: new Map() }));
      const v = num(r.vlrLiquido);
      a.total += v;
      a.docs++;
      a.ano.set(ano, (a.ano.get(ano) ?? 0) + v);
      const cat = r.txtDescricao || "Sem categoria";
      a.cat.set(cat, (a.cat.get(cat) ?? 0) + v);
      const k = `${ano}|${cat}`;
      a.anoCat.set(k, (a.anoCat.get(k) ?? 0) + v);
      const m = `${ano}-${String(mes).padStart(2, "0")}`;
      a.mes.set(m, (a.mes.get(m) ?? 0) + v);
      if (isCnpj(r.txtCNPJCPF)) {
        const key = r.txtCNPJCPF.replace(/\D/g, "");
        a.forn.set(key, (a.forn.get(key) ?? 0) + v);
        a.fornNome.set(key, r.txtFornecedor);
      }
    }
  }

  /* ---------- proposições de autoria ---------- */
  log("Câmara: proposições (autoria)");
  const authored = new Map(); // propId -> [{dep, primeiro}]
  for (const y of YEARS) {
    for await (const r of csvObjects(fileChunks(bulk(`proposicoesAutores-${y}.csv`)))) {
      if (!idStr.has(r.idDeputadoAutor)) continue;
      const pid = r.idProposicao;
      if (!authored.has(pid)) authored.set(pid, []);
      authored.get(pid).push({ dep: Number(r.idDeputadoAutor), primeiro: r.ordemAssinatura === "1" });
    }
  }
  const propsBy = new Map(); // depId -> [{...}]
  for (const y of YEARS) {
    for await (const r of csvObjects(fileChunks(bulk(`proposicoes-${y}.csv`)))) {
      const au = authored.get(r.id);
      if (!au) continue;
      if (String(r.dataApresentacao).slice(0, 10) < LEG_START) continue;
      const p = {
        id: Number(r.id),
        tipo: r.siglaTipo,
        numero: r.numero,
        ano: r.ano,
        data: String(r.dataApresentacao).slice(0, 10),
        ementa: trunc(r.ementa, 260),
        situacao: emptyToNull(r.ultimoStatus_descricaoSituacao),
      };
      for (const a of au) {
        if (!propsBy.has(a.dep)) propsBy.set(a.dep, []);
        propsBy.get(a.dep).push({ ...p, primeiro: a.primeiro });
      }
    }
  }

  /* ---------- fotos ---------- */
  const photos = await resolvePhotos(
    list.map((d) => ({ key: `c${d.id}`, url: d.urlFoto, nome: d.nome })),
  );

  /* ---------- montagem por deputado ---------- */
  log("Câmara: montando arquivos");
  rmSync(join(PUB, "extras", "camara"), { recursive: true, force: true });
  const outDir = join(OUT, "deputados");
  rmSync(outDir, { recursive: true, force: true });
  mkdirSync(outDir, { recursive: true });
  const index = [];
  const MAIN = new Set(["PL", "PLP", "PEC", "PDL", "PRC", "PLN", "PDC", "MPV", "PLV"]);
  const now = new Date();
  const ageOf = (iso) => {
    if (!iso) return null;
    const b = new Date(iso + "T12:00:00");
    let a = now.getFullYear() - b.getFullYear();
    const m = now.getMonth() - b.getMonth();
    if (m < 0 || (m === 0 && now.getDate() < b.getDate())) a--;
    return a;
  };

  for (const base of list) {
    const id = base.id;
    const det = (await getJson(`${CAMARA}/deputados/${id}`)).dados;
    // O histórico da API traz também legislaturas anteriores: só interessa o mandato atual.
    const hist = ((await getJson(`${CAMARA}/deputados/${id}/historico`)).dados ?? []).filter((h) => String(h.dataHora) >= LEG_START);
    const orgaos = await camaraAll(`${CAMARA}/deputados/${id}/orgaos?itens=100&dataInicio=${LEG_START}`);
    const frentes = await camaraAll(`${CAMARA}/deputados/${id}/frentes`);
    const prof = (await getJson(`${CAMARA}/deputados/${id}/profissoes`)).dados ?? [];
    const st = det.ultimoStatus ?? {};
    const g = st.gabinete ?? {};

    const intervals = exerciseIntervals(hist);
    const votes = votesBy.get(id) ?? new Map();
    const counts = { S: 0, N: 0, A: 0, O: 0, "17": 0, F: 0 };
    const rows = [];
    for (const v of dict) {
      const meta = plenMeta.get(v.id);
      const code = votes.get(v.id);
      if (code) {
        if (counts[code] !== undefined) counts[code]++;
        rows.push([dictIdx.get(v.id), code]);
      } else if (inExercise(intervals, meta.data)) {
        counts.F++;
        rows.push([dictIdx.get(v.id), "F"]);
      }
    }
    const registered = counts.S + counts.N + counts.A + counts.O + counts["17"];
    const eligible = registered + counts.F;

    // Despesas
    const d = desp.get(id);
    const despesas = d
      ? {
          total: round2(d.total),
          documentos: d.docs,
          porAno: [...d.ano.entries()].sort((a, b) => a[0] - b[0]).map(([ano, total]) => ({
            ano,
            total: round2(total),
            categorias: [...d.anoCat.entries()]
              .filter(([k]) => k.startsWith(ano + "|"))
              .map(([k, t]) => ({ categoria: k.split("|").slice(1).join("|"), total: round2(t) }))
              .filter((c) => c.total !== 0)
              .sort((a, b) => b.total - a.total)
              .slice(0, 6),
          })),
          porCategoria: topN(d.cat, 15).map(([categoria, total]) => ({ categoria, total: round2(total) })),
          porMes: [...d.mes.entries()].sort((a, b) => a[0].localeCompare(b[0])).slice(-12).map(([mes, total]) => ({ mes, total: round2(total) })),
          fornecedores: topN(d.forn, 5).map(([cnpj, total]) => ({ nome: d.fornNome.get(cnpj), cnpj, total: round2(total) })),
        }
      : null;

    // Proposições
    const props = propsBy.get(id) ?? [];
    const porTipo = new Map();
    for (const p of props) porTipo.set(p.tipo, (porTipo.get(p.tipo) ?? 0) + 1);
    const recentes = props
      .filter((p) => MAIN.has(p.tipo))
      .sort((a, b) => b.data.localeCompare(a.data) || b.id - a.id)
      .slice(0, 20)
      .map((p) => ({ id: p.id, titulo: `${p.tipo} ${p.numero}/${p.ano}`, data: p.data, ementa: p.ementa, situacao: p.situacao, primeiro: p.primeiro }));

    // Histórico: situação e troca de partido
    const sorted = [...hist].sort((a, b) => String(a.dataHora).localeCompare(String(b.dataHora)));
    const trocas = [];
    let prevParty = null;
    for (const h of sorted) {
      if (prevParty && h.siglaPartido && h.siglaPartido !== prevParty) trocas.push({ data: String(h.dataHora).slice(0, 10), de: prevParty, para: h.siglaPartido });
      if (h.siglaPartido) prevParty = h.siglaPartido;
    }
    const situacoes = [];
    let lastKey = "";
    for (const h of sorted) {
      if (!h.situacao) continue;
      const key = `${h.situacao}|${h.condicaoEleitoral}`;
      if (key === lastKey) continue;
      lastKey = key;
      situacoes.push({ data: String(h.dataHora).slice(0, 10), situacao: h.situacao, condicao: h.condicaoEleitoral ?? null, descricao: emptyToNull(h.descricaoStatus) });
    }
    const firstExercise = intervals[0]?.[0] ?? null;

    // Órgãos (comissões etc.)
    const orgaosOut = orgaos
      .map((o) => ({
        sigla: o.siglaOrgao,
        nome: o.nomeOrgao,
        cargo: o.titulo,
        inicio: String(o.dataInicio ?? "").slice(0, 10) || null,
        fim: o.dataFim ? String(o.dataFim).slice(0, 10) : null,
        id: o.idOrgao,
      }))
      .sort((a, b) => (a.fim === null ? 0 : 1) - (b.fim === null ? 0 : 1) || String(b.inicio).localeCompare(String(a.inicio)));

    const nome = st.nomeEleitoral || st.nome || base.nome;
    const slug = `${kebab(base.nome || nome)}-${id}`;
    const foto = photos.get(`c${id}`);
    const record = {
      id,
      slug,
      nome: base.nome,
      nomeEleitoral: st.nomeEleitoral ?? null,
      nomeCivil: det.nomeCivil ?? null,
      partido: st.siglaPartido ?? base.siglaPartido,
      uf: st.siglaUf ?? base.siglaUf,
      sexo: det.sexo ?? null,
      nascimento: det.dataNascimento ?? null,
      idade: ageOf(det.dataNascimento),
      naturalidade: [det.municipioNascimento, det.ufNascimento].filter(Boolean).join("/") || null,
      escolaridade: emptyToNull(det.escolaridade),
      profissoes: prof.map((p) => p.titulo).filter((t) => t && !/não declarada/i.test(t)),
      situacao: st.situacao ?? null,
      condicao: st.condicaoEleitoral ?? null,
      descricaoStatus: emptyToNull(st.descricaoStatus),
      legislatura: st.idLegislatura ?? 57,
      inicioExercicio: firstExercise,
      foto,
      email: emptyToNull(g.email) ?? emptyToNull(st.email),
      gabinete: g.nome ? { sala: g.sala ?? g.nome, predio: g.predio ?? null, andar: g.andar ?? null, telefone: emptyToNull(g.telefone) } : null,
      site: emptyToNull(det.urlWebsite),
      redes: toArray(det.redeSocial).filter(Boolean),
      perfil: `https://www.camara.leg.br/deputados/${id}`,
      trocasDePartido: trocas,
      historicoSituacao: situacoes.slice(-10),
      orgaos: orgaosOut.filter((o) => !o.fim),
      orgaosAnteriores: orgaosOut.filter((o) => o.fim).length,
      frentes: frentes.length,
      votacoes: {
        total: dict.length,
        elegiveis: eligible,
        contagem: { sim: counts.S, nao: counts.N, abstencao: counts.A, obstrucao: counts.O, art17: counts["17"], ausencias: counts.F },
        registradas: registered,
        // [índice na lista de votações, código S|N|A|O|17|F], da mais recente para a mais antiga
        lista: rows.slice(0, HTML_VOTES),
      },
      despesas,
      proposicoes: { total: props.length, primeiroAutor: props.filter((p) => p.primeiro).length, porTipo: Object.fromEntries(topN(porTipo, 14)), recentes: recentes.slice(0, HTML_PROPS) },
    };
    writeJson(join(outDir, `${id}.json`), record);
    writeExtras("camara", id, {
      v: encodeVotes(rows, dict.length),
      op: orgaosOut.filter((o) => o.fim),
      fr: frentes.map((f) => f.titulo),
      pr: recentes,
    });
    index.push({
      id,
      slug,
      nome: record.nome,
      partido: record.partido,
      uf: record.uf,
      sexo: record.sexo,
      condicao: record.condicao,
      situacao: record.situacao,
      foto: foto ? { url: foto.url } : null,
      gasto: despesas?.total ?? 0,
      ausencias: counts.F,
      presenca: eligible ? Math.round((registered / eligible) * 1000) / 10 : null,
      proposicoes: props.length,
    });
  }
  index.sort((a, b) => a.nome.localeCompare(b.nome, "pt-BR"));
  writeJson(join(outDir, "index.json"), index);
  rmSync(join(OUT, "frentes.json"), { force: true });

  // Dicionário de votações (usado pelas páginas e pelo "ver mais" no navegador)
  const dictOut = { atualizadoEm: TODAY, votacoes: dict };
  writeJson(join(OUT, "votacoes-camara.json"), dictOut);
  mkdirSync(PUB, { recursive: true });
  writeJson(join(PUB, "votacoes-camara.json"), dictOut);

  return { index, dictCount: dict.length, despAgg: desp, records: index.length };
}

/* ================================================================ SENADO */

const SEN = "https://legis.senado.leg.br/dadosabertos";

const SEN_CODES = {
  "Sim": "S",
  "Não": "N",
  "Abstenção": "A",
  "Votou": "V", // voto secreto: registrado, sem revelar o sentido
  "Presidente (art. 51 RISF)": "P",
  "P-NRV": "R", // presente, não registrou voto
  "NCom": "F", // não compareceu
  "AP": "AP", // atividade parlamentar
  "MIS": "M", // missão oficial
  "LS": "L",
  "LP": "L",
  "LAP": "L",
  "NA": "NA",
};

async function buildSenado() {
  log("Senado: lista de senadores em exercício");
  const lista = await getJson(`${SEN}/senador/lista/atual.json`);
  const parl = toArray(lista.ListaParlamentarEmExercicio.Parlamentares.Parlamentar);
  log("Senado:", parl.length, "senadores");
  const codes = parl.map((p) => p.IdentificacaoParlamentar.CodigoParlamentar);
  const codeSet = new Set(codes);

  await pool(
    codes,
    3,
    async (c) => {
      await getJson(`${SEN}/senador/${c}.json`);
      await getJson(`${SEN}/senador/${c}/comissoes.json`);
      await getJson(`${SEN}/senador/${c}/autorias.json`);
      await getJson(`${SEN}/senador/${c}/mandatos.json`);
      await getJson(`${SEN}/senador/${c}/cargos.json`);
    },
    "Senado API por senador",
  );

  /* ---------- votações nominais ---------- */
  log("Senado: votações nominais");
  const dict = [];
  const votesBy = new Map(); // cod -> [[idx, code]]
  const unknown = new Map();
  const seen = new Set();
  const all = [];
  for (const y of YEARS) {
    const arr = await getJson(`${SEN}/votacao?ano=${y}`, { timeout: 300000 });
    for (const v of arr) if ((v.votos ?? []).length > 0 && !seen.has(v.codigoSessaoVotacao)) {
      seen.add(v.codigoSessaoVotacao);
      all.push(v);
    }
  }
  all.sort((a, b) => String(b.dataSessao).localeCompare(String(a.dataSessao)) || b.sequencialSessao - a.sequencialSessao);
  for (const v of all) {
    const idx = dict.length;
    let sim = 0, nao = 0, abst = 0;
    for (const vo of v.votos) {
      const sg = vo.siglaVotoParlamentar;
      if (sg === "Sim") sim++;
      else if (sg === "Não") nao++;
      else if (sg === "Abstenção") abst++;
      let code = SEN_CODES[sg];
      if (!code) {
        if (/obstru/i.test(sg ?? "")) code = "O";
        else {
          unknown.set(sg, (unknown.get(sg) ?? 0) + 1);
          code = "NA";
        }
      }
      const cod = String(vo.codigoParlamentar);
      if (!codeSet.has(cod)) continue;
      if (!votesBy.has(cod)) votesBy.set(cod, []);
      votesBy.get(cod).push([idx, code]);
    }
    dict.push({
      id: String(v.codigoSessaoVotacao),
      d: v.dataSessao,
      m: v.identificacao || null,
      e: v.ementa ? trunc(v.ementa, 240) : null,
      t: trunc(v.descricaoVotacao, 200),
      r: v.resultadoVotacao ?? null,
      sec: v.votacaoSecreta === "S",
      s: v.votacaoSecreta === "S" ? null : sim,
      n: v.votacaoSecreta === "S" ? null : nao,
      ab: v.votacaoSecreta === "S" ? null : abst,
    });
  }
  if (unknown.size) log("Senado: siglas de voto não mapeadas", [...unknown]);
  log("Senado: votações nominais:", dict.length);

  /* ---------- CEAPS ---------- */
  log("Senado: CEAPS");
  const ceaps = new Map();
  for (const y of YEARS) {
    const rows = await getJson(`https://adm.senado.gov.br/adm-dadosabertos/api/v1/senadores/despesas_ceaps/${y}`, { timeout: 300000 });
    for (const r of rows) {
      const cod = String(r.codSenador);
      if (!codeSet.has(cod)) continue;
      if (r.ano < 2023 || (r.ano === 2023 && r.mes < 2)) continue;
      let a = ceaps.get(cod);
      if (!a) ceaps.set(cod, (a = { total: 0, docs: 0, ano: new Map(), cat: new Map(), anoCat: new Map(), mes: new Map(), forn: new Map(), fornNome: new Map() }));
      const v = num(r.valorReembolsado);
      a.total += v;
      a.docs++;
      a.ano.set(r.ano, (a.ano.get(r.ano) ?? 0) + v);
      const cat = r.tipoDespesa || "Sem categoria";
      a.cat.set(cat, (a.cat.get(cat) ?? 0) + v);
      const k = `${r.ano}|${cat}`;
      a.anoCat.set(k, (a.anoCat.get(k) ?? 0) + v);
      const m = `${r.ano}-${String(r.mes).padStart(2, "0")}`;
      a.mes.set(m, (a.mes.get(m) ?? 0) + v);
      if (isCnpj(r.cpfCnpj)) {
        const key = String(r.cpfCnpj).replace(/\D/g, "");
        a.forn.set(key, (a.forn.get(key) ?? 0) + v);
        a.fornNome.set(key, r.fornecedor);
      }
    }
  }

  const photos = await resolvePhotos(
    parl.map((p) => ({
      key: `s${p.IdentificacaoParlamentar.CodigoParlamentar}`,
      url: (p.IdentificacaoParlamentar.UrlFotoParlamentar ?? "").replace(/^http:/, "https:"),
      nome: p.IdentificacaoParlamentar.NomeParlamentar,
    })),
  );

  /* ---------- montagem ---------- */
  rmSync(join(PUB, "extras", "senado"), { recursive: true, force: true });
  const outDir = join(OUT, "senadores");
  rmSync(outDir, { recursive: true, force: true });
  mkdirSync(outDir, { recursive: true });
  const index = [];
  const MAIN = new Set(["PL", "PLS", "PLP", "PLC", "PEC", "PDL", "PDS", "PRS", "PLN", "MPV"]);
  const now = new Date();
  const ageOf = (iso) => {
    if (!iso) return null;
    const b = new Date(iso + "T12:00:00");
    let a = now.getFullYear() - b.getFullYear();
    const m = now.getMonth() - b.getMonth();
    if (m < 0 || (m === 0 && now.getDate() < b.getDate())) a--;
    return a;
  };

  for (const p of parl) {
    const idp = p.IdentificacaoParlamentar;
    const cod = idp.CodigoParlamentar;
    const det = (await getJson(`${SEN}/senador/${cod}.json`)).DetalheParlamentar.Parlamentar;
    const basicos = det.DadosBasicosParlamentar ?? {};
    const comissoes = toArray((await getJson(`${SEN}/senador/${cod}/comissoes.json`)).MembroComissaoParlamentar?.Parlamentar?.MembroComissoes?.Comissao);
    const autorias = toArray((await getJson(`${SEN}/senador/${cod}/autorias.json`)).MateriasAutoriaParlamentar?.Parlamentar?.Autorias?.Autoria);
    const mandatos = toArray((await getJson(`${SEN}/senador/${cod}/mandatos.json`)).MandatoParlamentar?.Parlamentar?.Mandatos?.Mandato);
    const cargos = toArray((await getJson(`${SEN}/senador/${cod}/cargos.json`)).CargoParlamentar?.Parlamentar?.Cargos?.Cargo);
    const m = p.Mandato ?? {};
    const rows = (votesBy.get(cod) ?? []).sort((a, b) => a[0] - b[0]);
    const c = {};
    for (const [, code] of rows) c[code] = (c[code] ?? 0) + 1;
    const voted = (c.S ?? 0) + (c.N ?? 0) + (c.A ?? 0) + (c.O ?? 0) + (c.V ?? 0) + (c.P ?? 0);

    const a = ceaps.get(cod);
    const despesas = a
      ? {
          total: round2(a.total),
          documentos: a.docs,
          porAno: [...a.ano.entries()].sort((x, y) => x[0] - y[0]).map(([ano, total]) => ({
            ano,
            total: round2(total),
            categorias: [...a.anoCat.entries()]
              .filter(([k]) => k.startsWith(ano + "|"))
              .map(([k, t]) => ({ categoria: k.split("|").slice(1).join("|"), total: round2(t) }))
              .filter((x) => x.total !== 0)
              .sort((x, y) => y.total - x.total)
              .slice(0, 6),
          })),
          porCategoria: topN(a.cat, 15).map(([categoria, total]) => ({ categoria, total: round2(total) })),
          porMes: [...a.mes.entries()].sort((x, y) => x[0].localeCompare(y[0])).slice(-12).map(([mes, total]) => ({ mes, total: round2(total) })),
          fornecedores: topN(a.forn, 5).map(([cnpj, total]) => ({ nome: a.fornNome.get(cnpj), cnpj, total: round2(total) })),
        }
      : null;

    const aut = autorias
      .map((x) => ({ ...x.Materia, principal: x.IndicadorAutorPrincipal === "Sim" }))
      .filter((x) => String(x.Data) >= LEG_START);
    const porTipo = new Map();
    for (const x of aut) porTipo.set(x.Sigla, (porTipo.get(x.Sigla) ?? 0) + 1);
    const recentes = aut
      .filter((x) => MAIN.has(x.Sigla))
      .sort((x, y) => String(y.Data).localeCompare(String(x.Data)))
      .slice(0, 20)
      .map((x) => ({
        id: Number(x.Codigo),
        titulo: x.DescricaoIdentificacao,
        data: x.Data,
        ementa: trunc(x.Ementa, 260),
        primeiro: x.principal,
      }));

    const comOut = comissoes
      .map((x) => ({
        sigla: x.IdentificacaoComissao?.SiglaComissao,
        nome: x.IdentificacaoComissao?.NomeComissao,
        casa: x.IdentificacaoComissao?.SiglaCasaComissao,
        cargo: x.DescricaoParticipacao,
        inicio: x.DataInicio ?? null,
        fim: x.DataFim ?? null,
        id: x.IdentificacaoComissao?.CodigoComissao,
      }))
      .sort((x, y) => (x.fim === null ? 0 : 1) - (y.fim === null ? 0 : 1) || String(y.inicio).localeCompare(String(x.inicio)));
    const cargosOut = cargos
      .map((x) => ({ sigla: x.IdentificacaoComissao?.SiglaComissao, nome: x.IdentificacaoComissao?.NomeComissao, cargo: x.DescricaoCargo, inicio: x.DataInicio ?? null, fim: x.DataFim ?? null }))
      .filter((x) => !x.fim)
      .slice(0, 20);

    const partidos = toArray(mandatos.at(-1)?.Partidos?.Partido)
      .map((x) => ({ sigla: x.Sigla, filiacao: x.DataFiliacao ?? null, desfiliacao: x.DataDesfiliacao ?? null }))
      .sort((x, y) => String(x.filiacao).localeCompare(String(y.filiacao)));
    const suplentes = toArray(m.Suplentes?.Suplente).map((s) => ({ ordem: s.DescricaoParticipacao, nome: s.NomeParlamentar }));
    const tel = toArray(idp.Telefones?.Telefone).map((t) => t.NumeroTelefone).filter(Boolean);
    const mand = {
      participacao: m.DescricaoParticipacao ?? null,
      legislaturaInicio: m.PrimeiraLegislaturaDoMandato?.DataInicio ?? null,
      fim: (m.SegundaLegislaturaDoMandato?.DataFim ?? m.PrimeiraLegislaturaDoMandato?.DataFim) ?? null,
      exercicioInicio: toArray(m.Exercicios?.Exercicio)[0]?.DataInicio ?? null,
    };

    const slug = `${kebab(idp.NomeParlamentar)}-${cod}`;
    const foto = photos.get(`s${cod}`);
    const record = {
      id: Number(cod),
      slug,
      nome: idp.NomeParlamentar,
      nomeCivil: idp.NomeCompletoParlamentar ?? null,
      partido: idp.SiglaPartidoParlamentar,
      uf: idp.UfParlamentar,
      bloco: idp.Bloco?.NomeBloco ?? null,
      sexo: /^Fem/i.test(idp.SexoParlamentar ?? "") ? "F" : "M",
      nascimento: basicos.DataNascimento ?? null,
      idade: ageOf(basicos.DataNascimento),
      naturalidade: [basicos.Naturalidade, basicos.UfNaturalidade].filter(Boolean).join("/") || null,
      situacao: "Em exercício",
      condicao: mand.participacao,
      mandato: mand,
      suplentes,
      membroMesa: idp.MembroMesa === "Sim",
      lideranca: idp.MembroLideranca === "Sim",
      foto,
      email: emptyToNull(idp.EmailParlamentar),
      telefones: tel,
      gabinete: emptyToNull(basicos.EnderecoParlamentar),
      perfil: `https://www25.senado.leg.br/web/senadores/senador/-/perfil/${cod}`,
      partidos,
      comissoes: comOut.filter((o) => !o.fim),
      comissoesAnteriores: comOut.filter((o) => o.fim).length,
      cargos: cargosOut,
      votacoes: {
        total: dict.length,
        registradas: voted,
        contagem: {
          sim: c.S ?? 0,
          nao: c.N ?? 0,
          abstencao: c.A ?? 0,
          obstrucao: c.O ?? 0,
          secreto: c.V ?? 0,
          presidente: c.P ?? 0,
          presenteSemVoto: c.R ?? 0,
          naoCompareceu: c.F ?? 0,
          atividadeParlamentar: c.AP ?? 0,
          missao: c.M ?? 0,
          licenca: c.L ?? 0,
          naoCitado: c.NA ?? 0,
        },
        // [índice na lista de votações, código], da mais recente para a mais antiga
        lista: rows.slice(0, HTML_VOTES),
      },
      despesas,
      proposicoes: { total: aut.length, primeiroAutor: aut.filter((x) => x.principal).length, porTipo: Object.fromEntries(topN(porTipo, 14)), recentes: recentes.slice(0, HTML_PROPS) },
    };
    writeJson(join(outDir, `${cod}.json`), record);
    writeExtras("senado", cod, { v: encodeVotes(rows, dict.length), op: comOut.filter((o) => o.fim), fr: [], pr: recentes });
    index.push({
      id: record.id,
      slug,
      nome: record.nome,
      partido: record.partido,
      uf: record.uf,
      sexo: record.sexo,
      condicao: record.condicao,
      situacao: record.situacao,
      foto: foto ? { url: foto.url } : null,
      gasto: despesas?.total ?? 0,
      ausencias: c.F ?? 0,
      presenca: rows.length ? Math.round((voted / rows.length) * 1000) / 10 : null,
      proposicoes: aut.length,
    });
  }
  index.sort((a, b) => a.nome.localeCompare(b.nome, "pt-BR"));
  writeJson(join(outDir, "index.json"), index);
  const dictOut = { atualizadoEm: TODAY, votacoes: dict };
  writeJson(join(OUT, "votacoes-senado.json"), dictOut);
  mkdirSync(PUB, { recursive: true });
  writeJson(join(PUB, "votacoes-senado.json"), dictOut);
  return { index, dictCount: dict.length, ceaps };
}

/* ================================================================= FOTOS */

const PHOTO_CACHE = join(CACHE, "photos.json");
const COMMONS = "https://commons.wikimedia.org/w/api.php";
const FREE = /^(CC0|CC[ -]?BY(?:[ -]SA)?[ -]\d|Public domain|PD)/i;
const strip = (html = "") => html.replace(/<[^>]+>/g, " ").replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&#0?39;/g, "'").replace(/\s+/g, " ").trim();

async function urlOk(url) {
  if (!url) return false;
  for (let i = 0; i < 4; i++) {
    try {
      await politeWait(60);
      const res = await fetch(url, { method: "HEAD", headers: { "User-Agent": UA }, signal: AbortSignal.timeout(30000) });
      if (res.status === 404 || res.status === 410) return false;
      if (res.ok) {
        const type = res.headers.get("content-type") ?? "";
        return /image/i.test(type) || type === "";
      }
    } catch {
      /* tenta de novo */
    }
    await sleep(1500 * 2 ** i);
  }
  return true; // não deu para checar: mantém a foto oficial
}

/** Busca no Commons (só licenças livres) uma foto cujo título cite o nome do parlamentar. */
async function commonsPhoto(nome, extra) {
  const tokens = norm(nome).split(/[^a-z0-9]+/).filter((t) => t.length > 1);
  if (tokens.length < 2) return null;
  const q = `${nome} ${extra} filetype:bitmap`;
  const params = new URLSearchParams({
    action: "query", format: "json", generator: "search", gsrsearch: q, gsrnamespace: "6", gsrlimit: "10",
    prop: "imageinfo", iiprop: "url|size|mime|extmetadata", iiurlwidth: "480",
  });
  let data;
  try {
    data = JSON.parse(await getText(`${COMMONS}?${params}`));
  } catch {
    return null;
  }
  const pages = Object.values(data.query?.pages ?? {}).sort((a, b) => (a.index ?? 0) - (b.index ?? 0));
  for (const p of pages) {
    const title = norm(p.title);
    if (!tokens.every((t) => title.includes(t))) continue;
    if (/\.(svg|pdf|gif|tiff?)$/i.test(p.title)) continue;
    const ii = p.imageinfo?.[0];
    if (!ii || !/^image\/(jpeg|png|webp)/.test(ii.mime ?? "")) continue;
    const meta = ii.extmetadata ?? {};
    const lic = strip(meta.LicenseShortName?.value);
    if (!FREE.test(lic)) continue;
    return {
      url: ii.thumburl || ii.url,
      credito: `${strip(meta.Artist?.value) || "Wikimedia Commons"} / Wikimedia Commons`,
      creditoUrl: ii.descriptionurl,
      licenca: lic,
      fonte: "wikimedia",
    };
  }
  return null;
}

/** Foto oficial como primária; se a URL falhar, tenta o Commons; senão null (avatar com iniciais). */
async function resolvePhotos(items) {
  let cache = {};
  try {
    cache = JSON.parse(readFileSync(PHOTO_CACHE, "utf8"));
  } catch {
    /* sem cache */
  }
  const out = new Map();
  await pool(
    items,
    6,
    async (it) => {
      if (cache[it.key] === undefined) {
        const casa = it.key.startsWith("c") ? "Câmara dos Deputados" : "Senado Federal";
        if (await urlOk(it.url)) {
          const camara = it.key.startsWith("c");
          cache[it.key] = {
            url: it.url,
            credito: camara ? "Câmara dos Deputados" : "Agência Senado / Senado Federal",
            creditoUrl: camara ? `https://www.camara.leg.br/deputados/${it.key.slice(1)}` : `https://www25.senado.leg.br/web/senadores/senador/-/perfil/${it.key.slice(1)}`,
            licenca: "Foto oficial, divulgação institucional",
            fonte: "oficial",
          };
        } else {
          cache[it.key] = (await commonsPhoto(it.nome, casa.includes("Câmara") ? "deputado federal" : "senador")) ?? null;
          log("foto oficial indisponível:", it.nome, "->", cache[it.key] ? "Wikimedia" : "iniciais");
        }
      }
      out.set(it.key, cache[it.key]);
    },
    "fotos",
  );
  writeFileSync(PHOTO_CACHE, JSON.stringify(cache));
  return out;
}

/* ================================================================ RESUMO */

function tally(arr, keyFn) {
  const m = new Map();
  for (const x of arr) {
    const k = keyFn(x);
    m.set(k, (m.get(k) ?? 0) + 1);
  }
  return [...m.entries()].map(([k, n]) => ({ chave: k, n })).sort((a, b) => b.n - a.n || String(a.chave).localeCompare(String(b.chave)));
}
const bracket = (age) => (age === null || age === undefined ? "Não informado" : age < 30 ? "Até 29" : age < 40 ? "30 a 39" : age < 50 ? "40 a 49" : age < 60 ? "50 a 59" : age < 70 ? "60 a 69" : "70 ou mais");

function buildSummary() {
  const readDir = (dir) =>
    readdirSync(join(OUT, dir))
      .filter((f) => f.endsWith(".json") && f !== "index.json")
      .map((f) => JSON.parse(readFileSync(join(OUT, dir, f), "utf8")));
  const dep = readDir("deputados");
  const sen = readDir("senadores");
  const sum = (arr) => arr.reduce((a, b) => a + b, 0);

  const agg = (recs) => {
    const years = new Map();
    const cats = new Map();
    for (const r of recs) {
      for (const y of r.despesas?.porAno ?? []) years.set(y.ano, (years.get(y.ano) ?? 0) + y.total);
      for (const c of r.despesas?.porCategoria ?? []) cats.set(c.categoria, (cats.get(c.categoria) ?? 0) + c.total);
    }
    return {
      total: round2(sum(recs.map((r) => r.despesas?.total ?? 0))),
      porAno: [...years.entries()].sort((a, b) => a[0] - b[0]).map(([ano, total]) => ({ ano, total: round2(total) })),
      porCategoria: topN(cats, 12).map(([categoria, total]) => ({ categoria, total: round2(total) })),
    };
  };
  const common = (recs) => ({
    total: recs.length,
    porPartido: tally(recs, (r) => r.partido).map((x) => ({ sigla: x.chave, n: x.n })),
    porUf: tally(recs, (r) => r.uf).map((x) => ({ uf: x.chave, n: x.n })),
    porSexo: tally(recs, (r) => (r.sexo === "F" ? "Mulheres" : r.sexo === "M" ? "Homens" : "Não informado")).map((x) => ({ rotulo: x.chave, n: x.n })),
    faixasEtarias: ["Até 29", "30 a 39", "40 a 49", "50 a 59", "60 a 69", "70 ou mais", "Não informado"]
      .map((rotulo) => ({ rotulo, n: recs.filter((r) => bracket(r.idade) === rotulo).length }))
      .filter((x) => x.n > 0),
    idadeMedia: round2(sum(recs.filter((r) => r.idade != null).map((r) => r.idade)) / Math.max(1, recs.filter((r) => r.idade != null).length)),
    despesas: agg(recs),
  });
  const depSum = common(dep);
  depSum.escolaridade = tally(dep, (r) => r.escolaridade ?? "Não informado").map((x) => ({ rotulo: x.chave, n: x.n }));
  depSum.condicao = tally(dep, (r) => r.condicao ?? "Não informado").map((x) => ({ rotulo: x.chave, n: x.n }));
  depSum.nascidosNoEstado = undefined;
  const senSum = common(sen);
  senSum.condicao = tally(sen, (r) => r.condicao ?? "Não informado").map((x) => ({ rotulo: x.chave, n: x.n }));
  senSum.porBloco = tally(sen, (r) => r.bloco ?? "Sem bloco").map((x) => ({ rotulo: x.chave, n: x.n }));

  const summary = {
    atualizadoEm: TODAY,
    legislatura: 57,
    camara: depSum,
    senado: senSum,
    totalParlamentares: dep.length + sen.length,
    partidosCongresso: tally([...dep, ...sen], (r) => r.partido).map((x) => ({ sigla: x.chave, n: x.n, deputados: dep.filter((d) => d.partido === x.chave).length, senadores: sen.filter((s) => s.partido === x.chave).length })),
  };
  writeJson(join(OUT, "resumo.json"), summary);
  return summary;
}

/* ================================================================== MAIN */

async function main() {
  const t0 = Date.now();
  let camaraFail = [];
  if (ONLY === "all" || ONLY === "camara") {
    const { list, failures } = await collectCamaraApi();
    camaraFail = failures;
    if (failures.length) {
      log("Há falhas na API da Câmara; rode novamente para repetir só o que falta. Abortando a montagem.");
      process.exitCode = 1;
      return;
    }
    await downloadCamaraBulk();
    await buildCamara(list);
  }
  if (ONLY === "all" || ONLY === "senado") {
    await buildSenado();
  }
  if (existsSync(join(OUT, "deputados", "index.json")) && existsSync(join(OUT, "senadores", "index.json"))) {
    buildSummary();
    writeJson(join(OUT, "meta.json"), {
      atualizadoEm: TODAY,
      geradoEm: new Date().toISOString(),
      legislatura: 57,
      inicioLegislatura: LEG_START,
      fontes: {
        camara: "https://dadosabertos.camara.leg.br",
        cotaCamara: "https://www.camara.leg.br/cota-parlamentar/",
        senado: "https://legis.senado.leg.br/dadosabertos",
        ceaps: "https://www12.senado.leg.br/transparencia/dados-abertos-transparencia/dados-abertos-ceaps",
      },
    });
  }
  log(`Concluído em ${Math.round((Date.now() - t0) / 1000)} s`, camaraFail.length ? "(com falhas)" : "");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
