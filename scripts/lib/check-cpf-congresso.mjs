/**
 * Verificação permanente de privacidade: nenhum CPF (completo, pontuado ou parcial) nos JSON de
 * data/congresso/ e public/data/congresso/, nem campo de CPF/endereço residencial. CNPJ é permitido.
 */
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import { scanCpf } from "./cpf.mjs";

const FORBIDDEN_KEYS = /^(cpf|nr_?cpf|nrcpf|cpf_?cnpj|endereco|endereco_?residencial|logradouro)$/i;

function* jsonFiles(dir) {
  if (!existsSync(dir)) return;
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) yield* jsonFiles(p);
    else if (name.endsWith(".json")) yield p;
  }
}

function forbiddenKeys(value, path, out) {
  if (Array.isArray(value)) value.forEach((v, i) => forbiddenKeys(v, `${path}[${i}]`, out));
  else if (value && typeof value === "object") {
    for (const [k, v] of Object.entries(value)) {
      if (FORBIDDEN_KEYS.test(k)) out.push(`${path}.${k}: campo proibido (CPF ou endereço residencial)`);
      forbiddenKeys(v, `${path}.${k}`, out);
    }
  }
}

/** Devolve quantos arquivos foram verificados; empurra erros em `errors` (máx. 20 por execução). */
export function checkCpfCongresso(root, errors) {
  let files = 0;
  let found = 0;
  for (const base of [join(root, "data", "congresso"), join(root, "public", "data", "congresso")]) {
    for (const f of jsonFiles(base)) {
      files++;
      const rel = f.slice(root.length + 1);
      let data;
      try {
        data = JSON.parse(readFileSync(f, "utf8"));
      } catch (e) {
        errors.push(`${rel}: JSON inválido (${e.message})`);
        continue;
      }
      const hits = [];
      scanCpf(data, rel, hits);
      forbiddenKeys(data, rel, hits);
      for (const h of hits) if (found++ < 20) errors.push(`dados do Congresso com dado pessoal: ${h}`);
    }
  }
  if (found > 20) errors.push(`dados do Congresso: mais ${found - 20} ocorrência(s) de CPF omitidas`);
  return files;
}
