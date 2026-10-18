#!/usr/bin/env node
/**
 * Coletor da agenda do Congresso Nacional: Câmara dos Deputados, Senado Federal e sessões
 * conjuntas, para os 513 deputados e os 81 senadores. Janela: 7 dias para trás e 14 para frente
 * (datas de Brasília).
 *
 *   npm run congress:agenda
 *   node scripts/build-congress-agenda.mjs --days-back=7 --days-ahead=14
 *
 * Fontes oficiais, sem chave:
 *  - Câmara: https://dadosabertos.camara.leg.br/api/v2/eventos (todos os eventos da janela) e
 *    /deputados/{id}/eventos (eventos em que a Câmara registra o deputado).
 *  - Senado: https://legis.senado.leg.br/dadosabertos/comissao/agenda/{ini}/{fim} (reuniões de
 *    comissões), /plenario/agenda/mes/{data} (sessões do Plenário) e /plenario/agenda/cn/{ini}/{fim}
 *    (sessões do Congresso Nacional).
 *
 * Saída em data/congresso/agenda/ (não é apagada pelo coletor principal):
 *   eventos.json                 todos os eventos da janela, deduplicados
 *   parlamentares/c-<id>.json    eventos de cada deputado  [{e: idDoEvento, v: "registro"|"membro"}]
 *   parlamentares/s-<id>.json    eventos de cada senador
 *   meta.json                    janela, contagens, fontes, falhas
 *
 * Vínculo (campo v): "registro" = a própria fonte lista o parlamentar no evento (API da Câmara);
 * "membro" = o parlamentar integra o órgão (comissão, Plenário) que tem a reunião, segundo a
 * composição oficial. Quando a fonte não traz um campo (ex.: reunião reservada na Câmara),
 * o valor é null e a página diz "não informado pela fonte". Nunca gravamos CPF.
 */
import { mkdirSync, rmSync } from "node:fs";
import { join } from "node:path";
import { CACHE, CAMARA, ROOT, SEN, TODAY, cachedJson, camaraAll, log, pool, readIndexes, readJson, toArray, writeJson } from "./lib/open-data.mjs";

const args = process.argv.slice(2);
const argNum = (name, def) => {
  const a = args.find((x) => x.startsWith(`--${name}=`));
  return a ? Number(a.split("=")[1]) : def;
};
const DAYS_BACK = argNum("days-back", 7);
const DAYS_AHEAD = argNum("days-ahead", 14);
const OUT = join(ROOT, "data", "congresso", "agenda");
const DEPUTADOS = join(ROOT, "data", "congresso", "deputados");
const SENADORES = join(ROOT, "data", "congresso", "senadores");
const NET = { cacheDir: join(CACHE, "agenda"), ttlHours: 3 };

const addDays = (iso, n) => {
  const d = new Date(`${iso}T12:00:00Z`);
  d.setUTCDate(d.getUTCDate() + n);
  return d.toISOString().slice(0, 10);
};
const FROM = addDays(TODAY, -DAYS_BACK);
const TO = addDays(TODAY, DAYS_AHEAD);
const compact = (iso) => iso.replaceAll("-", "");
const clean = (s) => String(s ?? "").replace(/\s+/g, " ").trim();

/* --------------------------------------------------------- classificação */

function categoria(tipo, orgaoTipo = "") {
  const t = `${tipo} ${orgaoTipo}`.toLowerCase();
  if (/audi[eê]ncia/.test(t)) return "audiencia";
  if (/sess[aã]o|plen[aá]rio/.test(t)) return "sessao";
  if (/reuni[aã]o|comiss|subcomiss|cpi|cpmi|conselho/.test(t)) return "comissao";
  return "outro";
}

/** Situação padronizada; `situacaoFonte` guarda o texto exato da fonte. */
function situacaoPadrao(raw, realizada) {
  const t = clean(raw).toLowerCase();
  if (/cancel/.test(t)) return "Cancelada";
  if (/suspens/.test(t)) return "Suspensa";
  if (/n[aã]o realizada/.test(t)) return "Não realizada";
  if (/encerrad|realizad/.test(t) || realizada === true) return "Realizada";
  if (/andamento/.test(t)) return "Em andamento";
  if (/convocad|agendad|pauta|confirmad/.test(t)) return "Convocada";
  return clean(raw) || "Situação não informada pela fonte";
}

/* ---------------------------------------------------------------- Câmara */

function camaraEvent(e) {
  const orgaos = toArray(e.orgaos);
  const principal = orgaos[0];
  const l = e.localCamara;
  const local = clean(e.localExterno) || [l?.nome, l?.predio && `prédio ${l.predio}`, l?.andar && `${l.andar}º andar`, l?.sala && `sala ${l.sala}`].filter(Boolean).join(", ") || null;
  return {
    id: `c${e.id}`,
    casa: "camara",
    inicio: e.dataHoraInicio ? `${e.dataHoraInicio.slice(0, 16)}:00-03:00` : null,
    fim: e.dataHoraFim ? `${e.dataHoraFim.slice(0, 16)}:00-03:00` : null,
    tipo: clean(e.descricaoTipo) || "Evento",
    categoria: categoria(e.descricaoTipo, principal?.tipoOrgao ?? ""),
    titulo: clean(e.descricao) || clean(e.descricaoTipo) || "Evento sem descrição",
    orgao: principal ? { id: String(principal.id), sigla: principal.sigla, nome: clean(principal.nome) } : null,
    orgaosIds: orgaos.map((o) => String(o.id)),
    local,
    situacao: situacaoPadrao(e.situacao),
    situacaoFonte: clean(e.situacao) || null,
    reservada: null, // a API de eventos da Câmara não traz esse campo
    url: `https://www.camara.leg.br/evento-legislativo/${e.id}`,
    pauta: null,
    registro: e.urlRegistro || null,
    fonte: `${CAMARA}/eventos/${e.id}`,
  };
}

/* ---------------------------------------------------------------- Senado */

function senadoReuniao(r) {
  const col = toArray(r.colegiados)[0] ?? r.colegiadoCriador ?? {};
  const cod = String(r.codigo);
  const secreta = r.secreta === undefined ? null : String(r.secreta) === "true";
  const parte = toArray(r.partes)[0];
  const finalidade = clean(parte?.evento?.finalidade);
  return {
    id: `s${cod}`,
    casa: "senado",
    inicio: r.dataInicio ? `${r.dataInicio.slice(0, 16)}:00-03:00` : null,
    fim: null,
    tipo: clean(r.tipo?.descricao) || "Reunião de comissão",
    categoria: /audi[eê]ncia/i.test(`${r.titulo} ${parte?.nome} ${r.tipo?.descricao}`) ? "audiencia" : "comissao",
    titulo: clean(finalidade || r.titulo || parte?.nome) || "Reunião de comissão",
    orgao: col.sigla ? { id: String(col.codigo), sigla: col.sigla, nome: clean(col.nome) } : null,
    orgaosIds: [...new Set([col.codigo, r.colegiadoCriador?.codigo].filter(Boolean).map(String))],
    local: clean(r.local) || null,
    situacao: situacaoPadrao(r.situacao ?? r.status, String(r.realizada) === "true" ? true : undefined),
    situacaoFonte: clean(r.situacao ?? r.status) || null,
    reservada: secreta,
    url: `https://legis.senado.leg.br/comissoes/reuniao?reuniao=${cod}`,
    pauta: r.urlUltimaPautaSimplesPublicada || null,
    registro: null,
    fonte: `${SEN}/comissao/reuniao/${cod}`,
  };
}

/** "SESSÃO NÃO DELIBERATIVA " -> "Sessão não deliberativa" (só quando a fonte vem toda em maiúsculas). */
function tidyCaps(t) {
  const x = clean(t);
  if (!x || x !== x.toUpperCase()) return x;
  const l = x.toLowerCase();
  return l.charAt(0).toUpperCase() + l.slice(1);
}

function senadoSessao(s, casaSessao) {
  const cod = String(s.CodigoSessao);
  const real = String(s.Realizada?.Status ?? "").toLowerCase();
  const hora = /^\d{1,2}:\d{2}/.test(clean(s.Hora)) ? clean(s.Hora).replace(/^(\d):/, "0$1:").slice(0, 5) : "00:00";
  const ini = `${s.Data}T${hora}:00-03:00`;
  const numero = clean(s.NumeroSessao).replace(/\s*sess[ãa]o\s*$/i, "").trim();
  const tipoSessao = tidyCaps(s.TipoSessao);
  const nome = numero ? `${numero} ${tipoSessao.toLowerCase()}`.replace(/^(\S+) (\S)/, (m, a, b) => `${a} ${b}`) : tipoSessao;
  return {
    id: `${casaSessao === "CN" ? "n" : "p"}${cod}`,
    casa: casaSessao === "CN" ? "congresso" : "senado",
    inicio: ini,
    fim: null,
    tipo: tipoSessao || "Sessão",
    categoria: "sessao",
    titulo: nome || "Sessão",
    orgao: casaSessao === "CN" ? { id: "CN", sigla: "CN", nome: "Congresso Nacional" } : { id: "PLEN-SF", sigla: "PLEN-SF", nome: "Plenário do Senado Federal" },
    orgaosIds: [casaSessao === "CN" ? "CN" : "PLEN-SF"],
    local: clean(s.LocalSessao) || null,
    situacao: situacaoPadrao(s.SituacaoSessao, real === "sim" ? true : undefined),
    situacaoFonte: clean(s.SituacaoSessao) || null,
    reservada: null,
    url: casaSessao === "CN" ? `${SEN}/plenario/agenda/cn/${compact(FROM)}/${compact(TO)}` : `${SEN}/plenario/agenda/mes/${compact(s.Data)}`,
    pauta: null,
    registro: null,
    fonte: casaSessao === "CN" ? `${SEN}/plenario/agenda/cn/${compact(FROM)}/${compact(TO)}` : `${SEN}/plenario/agenda/mes/${compact(s.Data)}`,
  };
}

/* ------------------------------------------------------------------ main */

async function main() {
  const t0 = Date.now();
  const falhas = [];
  const { deputados, senadores } = readIndexes();
  log(`Agenda ${FROM} a ${TO}: ${deputados.length} deputados, ${senadores.length} senadores`);

  /** @type {Map<string, any>} */
  const eventos = new Map();
  const vinculos = new Map(); // "c<id>" | "s<id>" -> Map(eventoId -> {v, cargo?})
  const link = (key, eid, v, cargo) => {
    let m = vinculos.get(key);
    if (!m) vinculos.set(key, (m = new Map()));
    const cur = m.get(eid);
    if (!cur || (cur.v === "membro" && v === "registro")) m.set(eid, cargo ? { v, c: cargo } : { v });
  };

  /* ---- Câmara: lista geral da janela */
  const list = await camaraAll(`${CAMARA}/eventos?dataInicio=${FROM}&dataFim=${TO}&itens=100&ordenarPor=dataHoraInicio&ordem=ASC`, NET);
  for (const e of list) eventos.set(`c${e.id}`, camaraEvent(e));
  log("Câmara: eventos na janela:", list.length);

  /* ---- Câmara: eventos registrados por deputado */
  const fail1 = await pool(
    deputados,
    4,
    async (d) => {
      const rows = await camaraAll(`${CAMARA}/deputados/${d.id}/eventos?dataInicio=${FROM}&dataFim=${TO}&itens=100&ordenarPor=dataHoraInicio`, NET);
      for (const e of rows) {
        const ev = camaraEvent(e);
        if (!eventos.has(ev.id)) eventos.set(ev.id, ev);
        link(`c${d.id}`, ev.id, "registro");
      }
    },
    "Câmara: agenda por deputado",
  );
  for (const f of fail1) falhas.push({ fonte: "camara/deputados/eventos", id: f.item.id, erro: f.error });

  /* ---- Câmara: integrantes de órgãos com reunião */
  for (const d of deputados) {
    const full = readJson(join(DEPUTADOS, `${d.id}.json`));
    const mine = new Map((full.orgaos ?? []).filter((o) => !o.fim).map((o) => [String(o.id), o.cargo]));
    for (const ev of eventos.values()) {
      if (ev.casa !== "camara") continue;
      // Plenário da Câmara e sessões do Congresso Nacional: todos os deputados integram o órgão.
      if (ev.orgao?.sigla === "PLEN" || ev.orgao?.sigla === "CN") {
        link(`c${d.id}`, ev.id, "membro", ev.orgao.sigla === "CN" ? "Membro do Congresso Nacional" : "Deputado");
        continue;
      }
      const hit = ev.orgaosIds.find((id) => mine.has(id));
      if (hit) link(`c${d.id}`, ev.id, "membro", mine.get(hit));
    }
  }

  /* ---- Senado: comissões */
  try {
    const j = await cachedJson(`${SEN}/comissao/agenda/${compact(FROM)}/${compact(TO)}`, NET);
    const reunioes = toArray(j.AgendaReuniao?.reunioes?.reuniao);
    for (const r of reunioes) {
      const ev = senadoReuniao(r);
      if (ev.inicio) eventos.set(ev.id, ev);
    }
    log("Senado: reuniões de comissões:", reunioes.length);
  } catch (e) {
    falhas.push({ fonte: "senado/comissao/agenda", erro: String(e.message) });
  }

  /* ---- Senado: Plenário (sessões do mês, a partir de cada início de mês da janela) */
  const monthStarts = new Set([FROM]);
  for (let d = FROM; d <= TO; d = addDays(d, 1)) if (d.endsWith("-01")) monthStarts.add(d);
  for (const start of monthStarts) {
    try {
      const j = await cachedJson(`${SEN}/plenario/agenda/mes/${compact(start)}`, NET);
      for (const s of toArray(j.AgendaPlenario?.Sessoes?.Sessao)) {
        if (s.Data < FROM || s.Data > TO) continue;
        const ev = senadoSessao(s, s.Casa === "CN" ? "CN" : "SF");
        eventos.set(ev.id, ev);
      }
    } catch (e) {
      falhas.push({ fonte: `senado/plenario/agenda/mes/${compact(start)}`, erro: String(e.message) });
    }
  }
  /* ---- Congresso Nacional: sessões conjuntas */
  try {
    const j = await cachedJson(`${SEN}/plenario/agenda/cn/${compact(FROM)}/${compact(TO)}`, NET);
    for (const s of toArray(j.AgendaPlenarioCN?.Sessoes?.Sessao)) {
      const ev = senadoSessao(s, "CN");
      eventos.set(ev.id, ev);
    }
  } catch (e) {
    falhas.push({ fonte: "senado/plenario/agenda/cn", erro: String(e.message) });
  }

  /* ---- Senado: integrantes */
  for (const s of senadores) {
    const full = readJson(join(SENADORES, `${s.id}.json`));
    const mine = new Map((full.comissoes ?? []).filter((o) => !o.fim).map((o) => [String(o.id), o.cargo]));
    for (const ev of eventos.values()) {
      if (ev.casa === "camara") continue;
      if (ev.casa === "congresso" || ev.orgao?.sigla === "PLEN-SF") {
        link(`s${s.id}`, ev.id, "membro", ev.casa === "congresso" ? "Membro do Congresso Nacional" : "Senador");
        continue;
      }
      const hit = ev.orgaosIds.find((id) => mine.has(id));
      if (hit) link(`s${s.id}`, ev.id, "membro", mine.get(hit));
    }
  }
  /* ---- Congresso Nacional: todos os deputados integram */
  for (const d of deputados) for (const ev of eventos.values()) if (ev.casa === "congresso") link(`c${d.id}`, ev.id, "membro", "Membro do Congresso Nacional");

  /* ---- Filtros do agregado: partidos e UFs presentes em cada evento */
  const who = new Map();
  for (const d of deputados) who.set(`c${d.id}`, d);
  for (const s of senadores) who.set(`s${s.id}`, s);
  const participantes = new Map();
  for (const [key, m] of vinculos) for (const eid of m.keys()) (participantes.get(eid) ?? participantes.set(eid, []).get(eid)).push(key);

  const out = [...eventos.values()]
    .filter((e) => e.inicio)
    .sort((a, b) => a.inicio.localeCompare(b.inicio) || a.id.localeCompare(b.id))
    .map((full) => {
      const e = { ...full };
      delete e.orgaosIds;
      const keys = participantes.get(e.id) ?? [];
      const ps = new Set();
      const us = new Set();
      let registro = 0;
      for (const k of keys) {
        const p = who.get(k);
        if (p) {
          ps.add(p.partido);
          us.add(p.uf);
        }
        if (vinculos.get(k)?.get(e.id)?.v === "registro") registro++;
      }
      return { ...e, partidos: [...ps].sort(), ufs: [...us].sort(), parlamentares: keys.length, registrados: registro };
    });

  rmSync(join(OUT, "parlamentares"), { recursive: true, force: true });
  mkdirSync(join(OUT, "parlamentares"), { recursive: true });
  writeJson(join(OUT, "eventos.json"), out);
  const valid = new Set(out.map((e) => e.id));
  let withEvents = { camara: 0, senado: 0 };
  for (const p of [...deputados.map((d) => ["c", d.id]), ...senadores.map((s) => ["s", s.id])]) {
    const m = vinculos.get(`${p[0]}${p[1]}`) ?? new Map();
    const items = [...m.entries()].filter(([eid]) => valid.has(eid)).map(([e, x]) => ({ e, ...x }));
    items.sort((a, b) => a.e.localeCompare(b.e));
    if (items.length) withEvents[p[0] === "c" ? "camara" : "senado"]++;
    writeJson(join(OUT, "parlamentares", `${p[0]}-${p[1]}.json`), items);
  }
  const count = (f) => out.filter(f).length;
  writeJson(join(OUT, "meta.json"), {
    atualizadoEm: TODAY,
    geradoEm: new Date().toISOString(),
    janela: { de: FROM, ate: TO },
    fusoHorario: "America/Sao_Paulo (UTC-03:00)",
    totais: {
      eventos: out.length,
      camara: count((e) => e.casa === "camara"),
      senado: count((e) => e.casa === "senado"),
      congresso: count((e) => e.casa === "congresso"),
      deputadosComAgenda: withEvents.camara,
      senadoresComAgenda: withEvents.senado,
      deputados: deputados.length,
      senadores: senadores.length,
    },
    fontes: {
      camara: `${CAMARA}/eventos`,
      camaraPorDeputado: `${CAMARA}/deputados/{id}/eventos`,
      senadoComissoes: `${SEN}/comissao/agenda/{inicio}/{fim}`,
      senadoPlenario: `${SEN}/plenario/agenda/mes/{data}`,
      congressoNacional: `${SEN}/plenario/agenda/cn/{inicio}/{fim}`,
    },
    falhas,
  });
  log(`Agenda concluída em ${Math.round((Date.now() - t0) / 1000)} s: ${out.length} eventos; falhas: ${falhas.length}`);
  if (fail1.length > deputados.length * 0.2) process.exitCode = 1;
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
