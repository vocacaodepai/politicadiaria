/**
 * Verificação dos dados gerados do Congresso (data/congresso/ e public/data/congresso/):
 * falha se aparecer CPF (com pontuação ou 11 dígitos soltos em texto) ou campo de CPF/endereço
 * residencial em qualquer JSON. CNPJ de empresa (14 dígitos) é permitido.
 */
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

const CPF_DOTTED = /(?<![\d.\/-])\d{3}\.\d{3}\.\d{3}-\d{2}(?!\d)/;
const CPF_BARE = /(?<![\d.\/-])\d{11}(?!\d)/g;

/** CPF válido pelos dígitos verificadores (sequências como 77777777777 não contam). */
function validCpf(d) {
  if (/^(\d)\1{10}$/.test(d)) return false;
  const dv = (n) => {
    let sum = 0;
    for (let i = 0; i < n; i++) sum += Number(d[i]) * (n + 1 - i);
    const r = (sum * 10) % 11;
    return r === 10 ? 0 : r;
  };
  return dv(9) === Number(d[9]) && dv(10) === Number(d[10]);
}
const FORBIDDEN_KEYS = /^(cpf|nr_?cpf|nrcpf|cpf_?cnpj|endereco|endereco_?residencial|logradouro)$/i;

function* jsonFiles(dir) {
  if (!existsSync(dir)) return;
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    const st = statSync(p);
    if (st.isDirectory()) yield* jsonFiles(p);
    else if (name.endsWith(".json")) yield p;
  }
}

function walk(value, path, report) {
  if (typeof value === "string") {
    if (CPF_DOTTED.test(value)) report(`${path}: CPF com pontuação em "${value.slice(0, 60)}"`);
    else if ((value.match(CPF_BARE) ?? []).some(validCpf)) report(`${path}: sequência de 11 dígitos com dígitos verificadores de CPF em "${value.slice(0, 60)}"`);
  } else if (Array.isArray(value)) {
    value.forEach((v, i) => walk(v, `${path}[${i}]`, report));
  } else if (value && typeof value === "object") {
    for (const [k, v] of Object.entries(value)) {
      if (FORBIDDEN_KEYS.test(k)) report(`${path}.${k}: campo proibido (CPF ou endereço residencial)`);
      walk(v, `${path}.${k}`, report);
    }
  }
}

/** Devolve a quantidade de arquivos verificados; empurra erros em `errors` (máx. 20 por execução). */
export function checkCongressData(root, errors) {
  let files = 0;
  let found = 0;
  for (const base of [join(root, "data", "congresso"), join(root, "public", "data", "congresso")]) {
    for (const f of jsonFiles(base)) {
      files++;
      let data;
      try {
        data = JSON.parse(readFileSync(f, "utf8"));
      } catch (e) {
        errors.push(`${f.replace(root + "/", "")}: JSON inválido (${e.message})`);
        continue;
      }
      walk(data, f.replace(root + "/", ""), (msg) => {
        if (found++ < 20) errors.push(`dados do Congresso: ${msg}`);
      });
    }
  }
  if (found > 20) errors.push(`dados do Congresso: mais ${found - 20} ocorrência(s) de CPF omitidas`);
  return files;
}
