/**
 * Validação de data/eleicoes/debates.json, agenda.json e campanha/*.json (rodada pelo check-content).
 * Esquema e rotina: docs/rotinas/eleicoes.md.
 */
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const ISO_OFFSET = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}(:\d{2})?(Z|[+-]\d{2}:\d{2})$/;
const ISO_DAY = /^\d{4}-\d{2}-\d{2}$/;
const DDMMAAAA = /^\d{2}\/\d{2}\/\d{4}$/;
const CPF = /\b\d{3}\.\d{3}\.\d{3}-\d{2}\b|\b\d{11}\b/;
const TRAVESSAO = /—/;

export function checkEleicoesExtra({ root, errors, TODAY }) {
  const dir = join(root, "data/eleicoes");
  const err = (f, m) => errors.push(`data/eleicoes/${f}: ${m}`);
  const read = (f) => {
    try {
      return JSON.parse(readFileSync(join(dir, f), "utf8"));
    } catch (e) {
      err(f, `JSON inválido ou ausente (${e.message})`);
      return null;
    }
  };
  const https = (f, where, u) => {
    try {
      if (new URL(u).protocol !== "https:") throw new Error();
    } catch {
      err(f, `${where}: URL https inválida -> ${u}`);
    }
  };
  const dia = (f, where, v) => {
    if (typeof v !== "string" || !ISO_DAY.test(v) || Number.isNaN(Date.parse(`${v}T00:00:00Z`))) err(f, `${where}: data inválida -> ${v}`);
    else if (v > TODAY) err(f, `${where}: verificadoEm no futuro -> ${v}`);
  };
  const dh = (f, where, v) => {
    if (typeof v !== "string" || !ISO_OFFSET.test(v) || Number.isNaN(Date.parse(v))) err(f, `${where}: data/hora com offset inválida -> ${v}`);
  };
  const texto = (f, where, v) => {
    if (typeof v !== "string" || !v.trim()) err(f, `${where}: texto vazio`);
    else {
      if (TRAVESSAO.test(v)) err(f, `${where}: travessão (—) proibido`);
      if (CPF.test(v)) err(f, `${where}: parece conter CPF`);
    }
  };
  const fonte = (f, where, x, exigeVerif) => {
    if (!x || typeof x !== "object") return err(f, `${where}: fonte ausente`);
    texto(f, `${where}.rotulo`, x.rotulo);
    https(f, `${where}.url`, x.url);
    if (exigeVerif || x.verificadoEm !== undefined) dia(f, `${where}.verificadoEm`, x.verificadoEm);
  };

  // ---- debates
  const deb = read("debates.json");
  if (deb) {
    dh("debates.json", "atualizadoEm", deb.atualizadoEm);
    if (!Array.isArray(deb.debates)) err("debates.json", "debates deve ser lista");
    for (const d of deb.debates ?? []) {
      const w = `debates[${d.id}]`;
      for (const k of ["id", "titulo", "emissora", "local", "fuso"]) texto("debates.json", `${w}.${k}`, d[k]);
      if (!ISO_DAY.test(d.data ?? "")) err("debates.json", `${w}.data inválida`);
      if (!/^\d{2}:\d{2}$/.test(d.horaInicio ?? "")) err("debates.json", `${w}.horaInicio deve ser HH:MM`);
      if (!["agendado", "realizado", "cancelado"].includes(d.status)) err("debates.json", `${w}.status inválido`);
      for (const k of ["pool", "participantes", "mediadores", "regras", "formato", "fontes", "temas", "tempoDeFala", "checagens"]) {
        if (!Array.isArray(d[k])) err("debates.json", `${w}.${k} deve ser lista`);
      }
      (d.fontes ?? []).forEach((x, i) => fonte("debates.json", `${w}.fontes[${i}]`, x, true));
      if (!(d.fontes ?? []).length) err("debates.json", `${w}: ao menos uma fonte`);
      (d.formato ?? []).forEach((x, i) => { texto("debates.json", `${w}.formato[${i}].bloco`, x.bloco); texto("debates.json", `${w}.formato[${i}].descricao`, x.descricao); });
      if (d.noticiaRegras && !existsSync(join(root, "content/news", `${d.noticiaRegras}.ts`))) err("debates.json", `${w}.noticiaRegras não existe em content/news`);
      const checagemOk = (slug) => !slug || existsSync(join(root, "content/checagens", `${slug}.ts`));
      for (const t of d.temas ?? []) {
        texto("debates.json", `${w}.temas.titulo`, t.titulo);
        for (const [i, fa] of (t.falas ?? []).entries()) {
          const ww = `${w}.temas[${t.id}].falas[${i}]`;
          if (!(d.participantes ?? []).includes(fa.candidato)) err("debates.json", `${ww}.candidato fora de participantes`);
          texto("debates.json", `${ww}.texto`, fa.texto);
          if (typeof fa.texto === "string" && fa.texto.split(/\s+/).length > 60) err("debates.json", `${ww}: fala com mais de 60 palavras (use trecho curto)`);
          fonte("debates.json", `${ww}.fonte`, fa.fonte, true);
          if (!checagemOk(fa.checagem)) err("debates.json", `${ww}.checagem não existe em content/checagens -> ${fa.checagem}`);
          if (d.status !== "realizado") err("debates.json", `${ww}: fala só entra com status "realizado"`);
        }
      }
      for (const [i, c] of (d.checagens ?? []).entries()) {
        const ww = `${w}.checagens[${i}]`;
        texto("debates.json", `${ww}.afirmacao`, c.afirmacao);
        if (!(d.participantes ?? []).includes(c.candidato)) err("debates.json", `${ww}.candidato fora de participantes`);
        if (!["em_checagem", "checada"].includes(c.situacao)) err("debates.json", `${ww}.situacao inválida`);
        if (c.situacao === "checada" && !c.checagem) err("debates.json", `${ww}: checada exige slug de checagem`);
        if (!checagemOk(c.checagem)) err("debates.json", `${ww}.checagem não existe em content/checagens -> ${c.checagem}`);
        fonte("debates.json", `${ww}.fonte`, c.fonte, true);
      }
      for (const [i, t] of (d.tempoDeFala ?? []).entries()) {
        if (!Number.isFinite(t.segundos) || t.segundos <= 0) err("debates.json", `${w}.tempoDeFala[${i}].segundos inválido`);
        fonte("debates.json", `${w}.tempoDeFala[${i}].fonte`, t.fonte, true);
      }
    }
  }

  // ---- agenda
  const ag = read("agenda.json");
  if (ag) {
    dh("agenda.json", "atualizadoEm", ag.atualizadoEm);
    texto("agenda.json", "observacao", ag.observacao);
    const ids = new Set();
    for (const e of ag.eventos ?? []) {
      const w = `eventos[${e.id}]`;
      if (ids.has(e.id)) err("agenda.json", `${w}: id repetido`);
      ids.add(e.id);
      for (const k of ["id", "candidato", "tipo", "descricao", "cidade"]) texto("agenda.json", `${w}.${k}`, e[k]);
      if (!["Presidente", "Governador"].includes(e.cargo)) err("agenda.json", `${w}.cargo inválido`);
      if (e.cargo === "Governador" && !e.ufCandidato) err("agenda.json", `${w}: governador exige ufCandidato`);
      if (!/^[A-Z]{2}$/.test(e.uf ?? "")) err("agenda.json", `${w}.uf deve ter 2 letras maiúsculas`);
      dh("agenda.json", `${w}.dataHora`, e.dataHora);
      fonte("agenda.json", `${w}.fonte`, e.fonte, false);
      dia("agenda.json", `${w}.verificadoEm`, e.verificadoEm);
    }
  }

  // ---- campanha
  for (const f of ["campanha/presidente.json", "campanha/governadores.json"]) {
    const c = read(f);
    if (!c) continue;
    if (!["coletado", "nao_coletado"].includes(c.status)) err(f, "status deve ser coletado ou nao_coletado");
    if (c.status === "nao_coletado") texto(f, "motivo", c.motivo);
    dh(f, "coletadoEm", c.coletadoEm);
    fonte(f, "fonte", c.fonte, false);
    for (const x of c.candidatos ?? []) {
      const w = `${x.nome}`;
      texto(f, `${w}.nome`, x.nome);
      const blocos = [["receitas", x.receitas, "porCategoria"], ["despesas", x.despesas, "porCategoria"], ["bensDeclarados", x.bensDeclarados, "porTipo"]];
      if (c.status === "nao_coletado" && blocos.some(([, b]) => b)) err(f, `${w}: valores com status nao_coletado`);
      for (const [n, b, cat] of blocos) {
        if (!b) continue;
        if (b.total !== null && !(Number.isFinite(b.total) && b.total >= 0)) err(f, `${w}.${n}.total inválido`);
        for (const it of b[cat] ?? []) {
          texto(f, `${w}.${n} categoria`, it.categoria);
          if (!Number.isFinite(it.valor)) err(f, `${w}.${n} valor inválido`);
        }
      }
      if (c.status === "coletado" && (x.receitas || x.despesas) && !DDMMAAAA.test(x.ultimaPrestacao ?? "")) err(f, `${w}.ultimaPrestacao deve ser dd/mm/aaaa quando há valores`);
      if (x.ultimaPrestacao != null && !DDMMAAAA.test(x.ultimaPrestacao)) err(f, `${w}.ultimaPrestacao deve ser dd/mm/aaaa`);
      if (x.urlTse) https(f, `${w}.urlTse`, x.urlTse);
      if (x.sigilo !== null && typeof x.sigilo !== "boolean") err(f, `${w}.sigilo deve ser true, false ou null`);
    }
  }
}
