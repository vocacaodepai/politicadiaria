#!/usr/bin/env node
/**
 * Coleta os resultados das eleições gerais de 2026 no portal de resultados do TSE
 * (https://resultados.tse.jus.br) e grava data/eleicoes/resultados.json e meta.json.
 *
 *   npm run eleicoes:update
 *
 * Os arquivos JSON do portal são os mesmos que alimentam a apuração oficial. Padrão das URLs:
 *   /oficial/ele2026/<cd_eleicao>/dados/<uf|br>/<uf|br>-c<cargo 4 dígitos>-e<eleição 6 dígitos>-u.json
 * Códigos (conferidos em /oficial/comum/config/ele-c.json): 6257 presidente 1º turno,
 * 6258 presidente 2º turno, 6259 estaduais e federais 1º turno, 6260 governador 2º turno.
 * Cargos: 1 presidente, 3 governador, 5 senador, 6 deputado federal.
 *
 * Pesquisas (pesquisas.json) e institutos (institutos.json) NÃO vêm do TSE: são mantidos à mão a partir
 * de fonte aberta conferida (ver docs/rotinas/eleicoes.md). Este script não os altera.
 *
 * Falha (exit 1) sem sobrescrever nada se qualquer arquivo obrigatório do TSE não puder ser lido.
 */
import { mkdirSync, readFileSync, writeFileSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const OUT = join(ROOT, "data", "eleicoes");
const BASE = "https://resultados.tse.jus.br/oficial";
const CICLO = "ele2026";
const ELE = { pres1: "6257", pres2: "6258", est1: "6259", est2: "6260" };
const UFS = "ac al am ap ba ce df es go ma mg ms mt pa pb pe pi pr rj rn ro rr rs sc se sp to".split(" ");
const UF_NOME = {
  ac: "Acre", al: "Alagoas", am: "Amazonas", ap: "Amapá", ba: "Bahia", ce: "Ceará", df: "Distrito Federal",
  es: "Espírito Santo", go: "Goiás", ma: "Maranhão", mg: "Minas Gerais", ms: "Mato Grosso do Sul", mt: "Mato Grosso",
  pa: "Pará", pb: "Paraíba", pe: "Pernambuco", pi: "Piauí", pr: "Paraná", rj: "Rio de Janeiro", rn: "Rio Grande do Norte",
  ro: "Rondônia", rr: "Roraima", rs: "Rio Grande do Sul", sc: "Santa Catarina", se: "Sergipe", sp: "São Paulo", to: "Tocantins",
};
/** Nomes de urna dos candidatos à Presidência com acento (o TSE entrega em caixa alta, às vezes sem acento). */
const PRES_NOMES = {
  "280002542548": "Lula",
  "280002551544": "Flávio Bolsonaro",
  "280002551547": "Augusto Cury",
  "280002551932": "Ronaldo Caiado",
  "280002540694": "Renan Santos",
  "280002539826": "Romeu Zema",
  "280002538811": "Samara Martins",
  "280002548139": "Wilson Grassi",
  "280002552484": "Clariana Barão",
  "280002541457": "Hertz Dias",
  "280002551975": "Edmilson Costa",
  "280002552487": "Rui Costa Pimenta",
};

const CLAUSULA = {
  pctVotos: 2.5,
  pctPorUf: 1.5,
  ufsMinimas: 9,
  cadeirasMinimas: 13,
  texto:
    "Em 2026, para ter acesso ao fundo partidário e ao tempo gratuito de rádio e TV, o partido (ou a federação) precisa de 2,5% dos votos válidos para a Câmara em todo o país, com pelo menos 1,5% em cada uma de nove unidades da federação, ou de 13 deputados federais eleitos em pelo menos nove unidades da federação.",
};

/* ------------------------------------------------------------------ util */

const num = (s) => {
  const n = Number(String(s ?? "0").replace(",", "."));
  return Number.isFinite(n) ? n : 0;
};
const pct1 = (s) => Math.round(num(s) * 100) / 100;

async function getJson(path) {
  const url = `${BASE}/${CICLO}/${path}`;
  let last;
  for (let i = 0; i < 4; i++) {
    try {
      const r = await fetch(url, { headers: { "user-agent": "politicadiaria-eleicoes/1.0 (+https://www.politicadiaria.com.br)" } });
      if (r.ok) return { url, json: await r.json() };
      last = `HTTP ${r.status}`;
      if (r.status === 404) break;
    } catch (e) {
      last = String(e);
    }
    await new Promise((res) => setTimeout(res, 800 * (i + 1)));
  }
  throw new Error(`Falha ao ler ${url}: ${last}`);
}

async function pool(items, size, fn) {
  const out = new Array(items.length);
  let i = 0;
  await Promise.all(
    Array.from({ length: size }, async () => {
      while (i < items.length) {
        const k = i++;
        out[k] = await fn(items[k], k);
      }
    }),
  );
  return out;
}

const PARTICULAS = new Set(["de", "da", "do", "dos", "das", "e"]);
const SIGLAS = new Set(["acm"]);
function titulo(s) {
  return String(s ?? "")
    .toLocaleLowerCase("pt-BR")
    .split(" ")
    .map((w, i) => {
      if (i > 0 && PARTICULAS.has(w)) return w;
      // Siglas sem vogal (JHC, ACM) ficam em caixa alta.
      if (SIGLAS.has(w) || (/^[^aeiouáéíóúâêôãõ.]{2,4}$/i.test(w) && !/^(dr|sr|sra)$/i.test(w))) return w.toLocaleUpperCase("pt-BR");
      return w.charAt(0).toLocaleUpperCase("pt-BR") + w.slice(1);
    })
    .join(" ");
}

const dataHoraTse = (j) => ({ data: j.dg, hora: j.hg, ultimaTotalizacao: j.dt ? `${j.dt} ${j.ht}` : null });

/** Resumo de apuração/comparecimento/votos de um arquivo de cargo majoritário. */
function resumo(j) {
  const s = j.s ?? {};
  const e = j.e ?? {};
  const v = j.v ?? {};
  return {
    apuracao: {
      secoesTotal: num(s.ts),
      secoesTotalizadas: num(s.st),
      pctSecoesTotalizadas: num(s.pstn),
    },
    eleitorado: {
      aptos: num(e.te),
      comparecimento: num(e.c),
      pctComparecimento: pct1(e.pcn),
      abstencoes: num(e.a),
      pctAbstencao: pct1(e.pan),
    },
    votos: {
      validos: num(v.vvc),
      brancos: num(v.vb),
      pctBrancos: pct1(v.pvbn),
      nulos: num(v.tvn),
      pctNulos: pct1(v.ptvnn),
      totais: num(v.tv),
    },
  };
}

/** Candidatos de um cargo majoritário, ordenados por votos. */
function candidatos(carg, fedPorNumero, nomePorSq = {}) {
  const lista = [];
  for (const ag of carg.agr ?? []) {
    for (const p of ag.par ?? []) {
      for (const c of p.cand ?? []) {
        const vice = (c.vs ?? []).find((x) => x.tp === "v");
        lista.push({
          numero: c.n,
          nome: nomePorSq[c.sqcand] ?? titulo(c.nmu),
          partido: p.sg,
          federacao: p.nfed ? (fedPorNumero[p.nfed] ?? null) : null,
          coligacao: ag.tp === "c" ? ag.nm : null,
          vice: vice ? (nomePorSq[vice.sqcand] ?? titulo(vice.nmu)) : null,
          votos: num(c.vap),
          pct: pct1(c.pvapn ?? c.pvap),
          situacao: c.st || "",
        });
      }
    }
  }
  lista.sort((a, b) => b.votos - a.votos || a.nome.localeCompare(b.nome, "pt-BR"));
  return lista;
}

function fedMap(carg) {
  const m = {};
  for (const f of carg.fed ?? []) m[f.n] = f.nm.replace(/^FEDERAÇÃO\s+/i, "").replace(/ - FE BRASIL$/, "").trim();
  return m;
}

/* ----------------------------------------------------------------- coleta */

async function main() {
  const fontes = [];
  const registrar = (rotulo, url, tse) => fontes.push({ rotulo, url, arquivoTse: tse ?? null });

  // Confere os códigos da eleição na configuração oficial.
  const cfgUrl = `${BASE}/comum/config/ele-c.json`;
  const cfgRes = await fetch(cfgUrl);
  if (!cfgRes.ok) throw new Error("Configuração ele-c.json indisponível");
  const cfg = { url: cfgUrl, json: await cfgRes.json() };
  const pleitos = (cfg.json.pl ?? []).filter((p) => p.c === CICLO);
  const t1 = pleitos.find((p) => p.dt === "04/10/2026");
  const t2 = pleitos.find((p) => p.dt === "25/10/2026");
  if (!t1 || !t2) throw new Error("Datas de 1º e 2º turno de 2026 não encontradas em ele-c.json");
  const cods = new Set(t1.e.map((e) => e.cd).concat(t2.e.map((e) => e.cd)));
  for (const cd of Object.values(ELE)) if (!cods.has(cd)) throw new Error(`Código de eleição ${cd} ausente em ele-c.json`);

  /* presidente */
  const p1 = await getJson(`${ELE.pres1}/dados/br/br-c0001-e00${ELE.pres1}-u.json`);
  const p2 = await getJson(`${ELE.pres2}/dados/br/br-c0001-e00${ELE.pres2}-u.json`);
  registrar("Presidente, 1º turno", p1.url, dataHoraTse(p1.json));
  registrar("Presidente, 2º turno", p2.url, dataHoraTse(p2.json));
  const montaPres = (j, turno) => {
    const carg = j.carg[0];
    return {
      turno,
      ...resumo(j),
      candidatos: candidatos(carg, fedMap(carg), PRES_NOMES),
      tse: dataHoraTse(j),
    };
  };
  const presidente = { turno1: montaPres(p1.json, 1), turno2: montaPres(p2.json, 2) };
  // No 2º turno antes da votação os votos são 0: mantém a ordem do 1º turno.
  const ordem = presidente.turno1.candidatos.map((c) => c.numero);
  const seg = presidente.turno2.candidatos;
  if (presidente.turno2.votos.validos === 0) seg.sort((a, b) => ordem.indexOf(a.numero) - ordem.indexOf(b.numero));

  /* governador */
  const gov1 = await pool(UFS, 6, async (uf) => {
    const r = await getJson(`${ELE.est1}/dados/${uf}/${uf}-c0003-e00${ELE.est1}-u.json`);
    return { uf, ...r };
  });
  const segundoTurnoUfs = gov1
    .filter((g) => candidatos(g.json.carg[0], {}).some((c) => c.situacao === "2º turno"))
    .map((g) => g.uf);
  const avisos = [];
  const ufsConfig2 = new Set(
    (t2.e.find((e) => e.cd === ELE.est2)?.abr ?? []).map((a) => a.cd),
  );
  const gov2 = Object.fromEntries(
    (
      await pool(segundoTurnoUfs, 5, async (uf) => {
        try {
          const r = await getJson(`${ELE.est2}/dados/${uf}/${uf}-c0003-e00${ELE.est2}-u.json`);
          return [uf, r];
        } catch {
          avisos.push(
            `${UF_NOME[uf]}: o arquivo do 1º turno marca candidatos com "2º turno", mas o TSE ainda não publicou o arquivo de apuração do 2º turno (${ufsConfig2.has(uf) ? "consta" : "não consta"} na configuração oficial de 25/10).`,
          );
          return null;
        }
      })
    ).filter(Boolean),
  );
  registrar("Governadores, 1º turno (27 unidades da federação)", `${BASE}/${CICLO}/${ELE.est1}/dados/<uf>/<uf>-c0003-e00${ELE.est1}-u.json`);
  if (segundoTurnoUfs.length) registrar("Governadores, 2º turno", `${BASE}/${CICLO}/${ELE.est2}/dados/<uf>/<uf>-c0003-e00${ELE.est2}-u.json`);
  const governadores = gov1
    .map((g) => {
      const carg = g.json.carg[0];
      const fm = fedMap(carg);
      const t1c = candidatos(carg, fm);
      const g2 = gov2[g.uf];
      const t2c = g2 ? candidatos(g2.json.carg[0], fedMap(g2.json.carg[0])) : null;
      if (t2c && g2.json.v && num(g2.json.v.vvc) === 0) {
        const ord = t1c.map((c) => c.numero);
        t2c.sort((a, b) => ord.indexOf(a.numero) - ord.indexOf(b.numero));
      }
      const eleito1 = t1c.find((c) => c.situacao === "Eleito");
      const eleito2 = t2c?.find((c) => c.situacao === "Eleito");
      return {
        uf: g.uf.toUpperCase(),
        estado: UF_NOME[g.uf],
        turno1: { ...resumo(g.json), candidatos: t1c, tse: dataHoraTse(g.json) },
        turno2: t2c ? { ...resumo(g2.json), candidatos: t2c, tse: dataHoraTse(g2.json) } : null,
        segundoTurno: g.uf in gov2 || segundoTurnoUfs.includes(g.uf),
        eleito: (eleito2 ?? eleito1)?.nome ?? null,
      };
    })
    .sort((a, b) => a.estado.localeCompare(b.estado, "pt-BR"));

  /* senado */
  const sen = await pool(UFS, 6, async (uf) => {
    const r = await getJson(`${ELE.est1}/dados/${uf}/${uf}-c0005-e00${ELE.est1}-u.json`);
    return { uf, ...r };
  });
  registrar("Senadores (54 vagas)", `${BASE}/${CICLO}/${ELE.est1}/dados/<uf>/<uf>-c0005-e00${ELE.est1}-u.json`);
  const eleitosSenado = [];
  let senTotalizacao = 100;
  for (const s of sen) {
    const carg = s.json.carg[0];
    senTotalizacao = Math.min(senTotalizacao, num(s.json.s?.pstn));
    for (const c of candidatos(carg, fedMap(carg))) {
      if (c.situacao === "Eleito") eleitosSenado.push({ uf: s.uf.toUpperCase(), nome: c.nome, partido: c.partido, votos: c.votos, pct: c.pct });
    }
  }
  eleitosSenado.sort((a, b) => a.uf.localeCompare(b.uf) || b.votos - a.votos);
  const porPartidoSen = {};
  for (const e of eleitosSenado) porPartidoSen[e.partido] = (porPartidoSen[e.partido] ?? 0) + 1;
  const senado = {
    vagas: 54,
    eleitosTotal: eleitosSenado.length,
    pctApuracaoMinima: senTotalizacao,
    porPartido: Object.entries(porPartidoSen)
      .map(([sigla, n]) => ({ sigla, n }))
      .sort((a, b) => b.n - a.n || a.sigla.localeCompare(b.sigla)),
    eleitos: eleitosSenado,
  };

  /* câmara */
  const cam = await pool(UFS, 6, async (uf) => {
    const r = await getJson(`${ELE.est1}/dados/${uf}/${uf}-c0006-e00${ELE.est1}-u.json`);
    return { uf, ...r };
  });
  registrar("Deputados federais (513 vagas)", `${BASE}/${CICLO}/${ELE.est1}/dados/<uf>/<uf>-c0006-e00${ELE.est1}-u.json`);
  const porPartido = {};
  const agrup = new Map(); // chave: partidos ordenados
  let totalEleitos = 0;
  let vagasTotal = 0;
  let validosNacional = 0;
  let camMin = 100;
  const porUf = [];
  for (const c of cam) {
    const carg = c.json.carg[0];
    const vvcUf = num(c.json.v?.vvc);
    validosNacional += vvcUf;
    camMin = Math.min(camMin, num(c.json.s?.pstn));
    let vagasUf = 0;
    for (const ag of carg.agr ?? []) {
      const partidos = ag.par.map((p) => p.sg).sort();
      const chave = partidos.join("/");
      const votosAgr = (ag.tp === "f" ? num(ag.tvtn) + num(ag.tvtl) : num(ag.par[0].tvtn) + num(ag.par[0].tvtl));
      const vagas = num(ag.vag);
      vagasUf += vagas;
      vagasTotal += vagas;
      let g = agrup.get(chave);
      if (!g) {
        g = {
          partidos,
          federacao: ag.tp === "f" ? ag.nm.replace(/^FEDERAÇÃO\s+/i, "").replace(/ - FE BRASIL$/, "") : null,
          cadeiras: 0,
          votos: 0,
          ufsComCadeira: 0,
          ufsAcimaDe1_5: 0,
        };
        agrup.set(chave, g);
      }
      g.cadeiras += vagas;
      g.votos += votosAgr;
      if (vagas > 0) g.ufsComCadeira += 1;
      if (vvcUf > 0 && (votosAgr / vvcUf) * 100 >= CLAUSULA.pctPorUf) g.ufsAcimaDe1_5 += 1;
      for (const p of ag.par) {
        for (const cd of p.cand ?? []) {
          if (cd.e === "s") {
            totalEleitos += 1;
            porPartido[p.sg] = (porPartido[p.sg] ?? 0) + 1;
          }
        }
      }
    }
    porUf.push({ uf: c.uf.toUpperCase(), vagas: num(carg.nv), eleitos: vagasUf });
  }
  const agrupamentos = [...agrup.values()]
    .map((g) => {
      const pctVotos = (g.votos / validosNacional) * 100;
      const porVotos = pctVotos >= CLAUSULA.pctVotos && g.ufsAcimaDe1_5 >= CLAUSULA.ufsMinimas;
      const porCadeiras = g.cadeiras >= CLAUSULA.cadeirasMinimas && g.ufsComCadeira >= CLAUSULA.ufsMinimas;
      return {
        nome: g.federacao ? `Federação ${g.federacao}` : g.partidos[0],
        sigla: g.partidos.join("/"),
        partidos: g.partidos,
        federacao: Boolean(g.federacao),
        cadeiras: g.cadeiras,
        votos: g.votos,
        pctVotos: Math.round(pctVotos * 100) / 100,
        ufsComCadeira: g.ufsComCadeira,
        ufsAcimaDe1_5: g.ufsAcimaDe1_5,
        clausula: porVotos ? "votos" : porCadeiras ? "cadeiras" : "nao",
      };
    })
    .sort((a, b) => b.cadeiras - a.cadeiras || b.votos - a.votos);
  if (totalEleitos !== vagasTotal) throw new Error(`Eleitos (${totalEleitos}) difere das vagas por agrupamento (${vagasTotal})`);
  if (totalEleitos !== 513) throw new Error(`Esperado 513 deputados eleitos, obtido ${totalEleitos}`);
  const camara = {
    vagas: 513,
    eleitosTotal: totalEleitos,
    pctApuracaoMinima: camMin,
    votosValidosNacional: validosNacional,
    porPartido: Object.entries(porPartido)
      .map(([sigla, n]) => ({ sigla, n }))
      .sort((a, b) => b.n - a.n || a.sigla.localeCompare(b.sigla)),
    agrupamentos,
    clausulaRegra: CLAUSULA,
    porUf: porUf.sort((a, b) => a.uf.localeCompare(b.uf)),
  };

  if (eleitosSenado.length !== 54) console.warn(`Aviso: ${eleitosSenado.length} senadores marcados como eleitos (esperado 54).`);

  const agora = new Date();
  const brt = new Date(agora.getTime() - 3 * 3600 * 1000).toISOString().replace("Z", "").replace(/\.\d+$/, "") + "-03:00";
  const resultados = {
    atualizadoEm: brt,
    presidente,
    governadores,
    senado,
    camara,
  };

  /* meta */
  const metaPath = join(OUT, "meta.json");
  const metaAnterior = existsSync(metaPath) ? JSON.parse(readFileSync(metaPath, "utf8")) : {};
  const meta = {
    ...metaAnterior,
    eleicao: {
      ano: 2026,
      turno1: "2026-10-04",
      turno2: "2026-10-25",
      segundoTurnoGovernadores: segundoTurnoUfs.map((u) => u.toUpperCase()),
      fonteDatas: "https://resultados.tse.jus.br/oficial/comum/config/ele-c.json",
    },
    atualizadoEm: brt,
    coletadoPor: "scripts/build-eleicoes-data.mjs",
    avisosColeta: avisos,
    fontesResultados: fontes,
  };

  mkdirSync(OUT, { recursive: true });
  writeFileSync(join(OUT, "resultados.json"), JSON.stringify(resultados, null, 1) + "\n");
  writeFileSync(metaPath, JSON.stringify(meta, null, 2) + "\n");
  console.log(
    `OK: presidente ${presidente.turno1.apuracao.pctSecoesTotalizadas}% (1º) / ${presidente.turno2.apuracao.pctSecoesTotalizadas}% (2º); governadores em 2º turno: ${segundoTurnoUfs.join(", ") || "nenhum"}; senadores eleitos ${eleitosSenado.length}; deputados ${totalEleitos}.`,
  );
}

main().catch((e) => {
  console.error(e.message);
  process.exit(1);
});
