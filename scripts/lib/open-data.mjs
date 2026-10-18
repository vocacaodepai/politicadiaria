/**
 * Utilidades compartilhadas pelos coletores de dados abertos do Congresso
 * (agenda, recursos do mandato e campanha): rede educada com tentativas e cache em disco,
 * leitura em fluxo de arquivos .zip e de CSV (separador ";").
 */
import { createReadStream, createWriteStream, existsSync, mkdirSync, readFileSync, renameSync, statSync, writeFileSync } from "node:fs";
import { createHash } from "node:crypto";
import { dirname, join, resolve } from "node:path";
import { createInflateRaw } from "node:zlib";
import { StringDecoder } from "node:string_decoder";
import { pipeline } from "node:stream/promises";
import { Readable } from "node:stream";
import { open } from "node:fs/promises";

export const ROOT = resolve(new URL("../..", import.meta.url).pathname);
export const CACHE = join(ROOT, ".cache", "congress");
export const UA = "PoliticaDiariaBot/1.0 (agregador de dados abertos; contato via site)";
export const TODAY = new Date().toLocaleDateString("en-CA", { timeZone: "America/Sao_Paulo" });

export const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
export const log = (...a) => console.log(new Date().toISOString().slice(11, 19), ...a);
export const round2 = (n) => Math.round(n * 100) / 100;
export const num = (s) => {
  const n = Number(String(s ?? "").replace(/\./g, "").replace(",", "."));
  return Number.isFinite(n) ? n : 0;
};
export const norm = (s) =>
  String(s ?? "")
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9 ]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
export const emptyToNull = (s) => (s === undefined || s === null || String(s).trim() === "" || /^#NUL/.test(String(s)) ? null : String(s).trim());
export const toArray = (x) => (x === undefined || x === null ? [] : Array.isArray(x) ? x : [x]);

export function writeJson(path, data) {
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, JSON.stringify(data));
}
export function readJson(path) {
  return JSON.parse(readFileSync(path, "utf8"));
}

/* ------------------------------------------------------------------ rede */

/** Intervalo mínimo entre requisições, por servidor (cada API tem o seu limite). */
const lastReq = new Map();
/** Pausa coletiva por servidor depois de um HTTP 429 (todos os trabalhadores esperam). */
const cooldown = new Map();
const streak = new Map();
async function politeWait(minGap, url) {
  const host = new URL(url).host;
  const now = Date.now();
  const last = lastReq.get(host) ?? 0;
  const slot = Math.max(now, last + minGap, cooldown.get(host) ?? 0);
  lastReq.set(host, slot);
  if (slot > now) await sleep(slot - now);
}
function rateLimited(url) {
  const host = new URL(url).host;
  const n = Math.min((streak.get(host) ?? 0) + 1, 6);
  streak.set(host, n);
  cooldown.set(host, Date.now() + 8000 * n);
}
const rateOk = (url) => streak.set(new URL(url).host, 0);

export async function getText(url, { accept = "application/json", tries = 8, timeout = 120000, gap = 100 } = {}) {
  let err;
  for (let i = 0; i < tries; i++) {
    try {
      await politeWait(gap, url);
      const res = await fetch(url, { headers: { Accept: accept, "User-Agent": UA }, signal: AbortSignal.timeout(timeout) });
      if (res.status === 429) {
        rateLimited(url);
        err = new Error(`HTTP 429 ${url}`);
        continue;
      }
      if (res.ok) {
        rateOk(url);
        return await res.text();
      }
      if (res.status >= 400 && res.status < 500 && res.status !== 429) throw Object.assign(new Error(`HTTP ${res.status} ${url}`), { status: res.status });
      err = new Error(`HTTP ${res.status} ${url}`);
    } catch (e) {
      if (e.status) throw e;
      err = e;
    }
    await sleep(err?.message?.startsWith("HTTP 429") ? 500 : Math.min(1500 * 2 ** i, 30000) + Math.random() * 500);
  }
  throw err;
}

/** Resposta com cache em disco; `ttlHours` (padrão: 0 = o cache vale para sempre, como no coletor principal). */
export async function cachedText(url, opts = {}) {
  const { ttlHours = 0, cacheDir = join(CACHE, "api"), ...rest } = opts;
  mkdirSync(cacheDir, { recursive: true });
  const f = join(cacheDir, createHash("sha1").update(url).digest("hex") + ".txt");
  if (existsSync(f) && statSync(f).size > 0 && (ttlHours === 0 || Date.now() - statSync(f).mtimeMs < ttlHours * 3600e3)) return readFileSync(f, "utf8");
  const text = await getText(url, rest);
  writeFileSync(f, text);
  return text;
}
export async function cachedJson(url, opts) {
  return JSON.parse(await cachedText(url, opts));
}

export async function pool(items, n, fn, label = "") {
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

export async function download(url, dest, { ttlHours = 0 } = {}) {
  mkdirSync(dirname(dest), { recursive: true });
  if (existsSync(dest) && statSync(dest).size > 0 && (ttlHours === 0 || Date.now() - statSync(dest).mtimeMs < ttlHours * 3600e3)) return dest;
  let last;
  for (let i = 0; i < 5; i++) {
    try {
      const res = await fetch(url, { headers: { "User-Agent": "Mozilla/5.0 (compatible; PoliticaDiariaBot/1.0)" }, signal: AbortSignal.timeout(900000) });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      await pipeline(Readable.fromWeb(res.body), createWriteStream(dest + ".part"));
      renameSync(dest + ".part", dest);
      log("baixado", url);
      return dest;
    } catch (e) {
      last = e;
      log("falha no download", url, e.message);
      await sleep(3000 * 2 ** i);
    }
  }
  throw new Error(`Não foi possível baixar ${url}: ${last?.message}`);
}

/* ------------------------------------------------------------------- zip */

/** Lista as entradas do .zip (diretório central; suporta tamanhos até 4 GB). */
export async function zipEntries(path) {
  const fh = await open(path, "r");
  try {
    const size = (await fh.stat()).size;
    const tailLen = Math.min(size, 70000);
    const tail = Buffer.alloc(tailLen);
    await fh.read(tail, 0, tailLen, size - tailLen);
    let e = tailLen - 22;
    while (e >= 0 && tail.readUInt32LE(e) !== 0x06054b50) e--;
    if (e < 0) throw new Error("zip inválido: " + path);
    const count = tail.readUInt16LE(e + 10);
    const cdSize = tail.readUInt32LE(e + 12);
    const cdOff = tail.readUInt32LE(e + 16);
    const cd = Buffer.alloc(cdSize);
    await fh.read(cd, 0, cdSize, cdOff);
    const out = [];
    let p = 0;
    for (let i = 0; i < count && p < cdSize; i++) {
      if (cd.readUInt32LE(p) !== 0x02014b50) throw new Error("zip inválido (diretório central)");
      const method = cd.readUInt16LE(p + 10);
      const csize = cd.readUInt32LE(p + 20);
      const usize = cd.readUInt32LE(p + 24);
      const nameLen = cd.readUInt16LE(p + 28);
      const extraLen = cd.readUInt16LE(p + 30);
      const commentLen = cd.readUInt16LE(p + 32);
      const lho = cd.readUInt32LE(p + 42);
      const name = cd.toString("utf8", p + 46, p + 46 + nameLen);
      out.push({ name, method, csize, usize, lho });
      p += 46 + nameLen + extraLen + commentLen;
    }
    return out;
  } finally {
    await fh.close();
  }
}

/** Texto de uma entrada do .zip, em fluxo (nunca carrega o arquivo inteiro na memória). */
export async function* zipEntryText(path, entry, encoding = "utf8") {
  const fh = await open(path, "r");
  try {
    const head = Buffer.alloc(30);
    await fh.read(head, 0, 30, entry.lho);
    const start = entry.lho + 30 + head.readUInt16LE(26) + head.readUInt16LE(28);
    const raw = createReadStream(path, { start, end: start + entry.csize - 1, highWaterMark: 1 << 20 });
    const source = entry.method === 0 ? raw : raw.pipe(createInflateRaw());
    const dec = new StringDecoder(encoding);
    for await (const chunk of source) yield dec.write(chunk);
    yield dec.end();
  } finally {
    await fh.close();
  }
}

/* ------------------------------------------------------------------- CSV */

export async function* csvRecords(chunks, delim = 59) {
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

export async function* csvObjects(chunks) {
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

/* ------------------------------------------------------------- Câmara/Senado */

export const CAMARA = "https://dadosabertos.camara.leg.br/api/v2";
export const SEN = "https://legis.senado.leg.br/dadosabertos";

/** Percorre a paginação da API da Câmara (links rel=next). */
export async function camaraAll(url, opts) {
  const out = [];
  let next = url;
  while (next) {
    const j = await cachedJson(next, opts);
    out.push(...(j.dados ?? []));
    next = (j.links ?? []).find((l) => l.rel === "next")?.href ?? null;
  }
  return out;
}

/** Lê o índice de parlamentares já gerado pelo coletor principal. */
export function readIndexes() {
  const dep = readJson(join(ROOT, "data", "congresso", "deputados", "index.json"));
  const sen = readJson(join(ROOT, "data", "congresso", "senadores", "index.json"));
  return { deputados: dep, senadores: sen };
}

/** Padrões de CPF: ddd.ddd.ddd-dd ou 11 dígitos soltos. Usado nas verificações de segurança. */
export const CPF_RE = /(?<![\d.\/-])(?:\d{3}\.\d{3}\.\d{3}-\d{2}|\d{11})(?![\d])/;
