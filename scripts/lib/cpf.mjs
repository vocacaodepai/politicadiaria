/**
 * Privacidade: CPF de pessoa física nunca entra nos dados publicados do Congresso.
 *
 * Nomes de fornecedores da cota parlamentar (CEAP/CEAPS) às vezes trazem o CPF do titular de
 * microempreendedor individual ("NOME 12345678901"), completo, com pontuação ou parcialmente
 * mascarado. O nome da pessoa que prestou o serviço pode ficar (é dado de interesse público do
 * gasto); o documento não. CNPJ (14 dígitos, 00.000.000/0000-00) é dado de empresa e fica.
 *
 * Padrões cobertos: 11 dígitos seguidos; 000.000.000-00; CPF parcial com asteriscos
 * (ex.: 123********* ou ***.123.456-**). Alguns padrões são só de detecção e removidos igual.
 */

/** 000.000.000-00 (hífen ou travessão), fora de números maiores e de CNPJ. */
const CPF_DOTTED = /(?<![\d.\/])\d{3}\.\d{3}\.\d{3}\s?[-–]\s?\d{2}(?![\d\/])/g;
/** 11 dígitos seguidos, sem dígito colado (14 dígitos de CNPJ não casam). */
const CPF_BARE = /(?<![\d.\/])\d{11}(?!\d)/g;
/** Parcial: token só de dígitos, asteriscos, pontos e hífens, com 3+ asteriscos e 9+ caracteres. */
const CPF_MASKED = /(?<![\w*])(?=[\d*.\-]{9,}(?![\w*]))[\d*.\-]*?\*{3}[\d*.\-]*/g;

/** Texto contém algum padrão de CPF (completo, pontuado ou parcial)? */
export function hasCpf(text) {
  const s = String(text ?? "");
  return [CPF_DOTTED, CPF_BARE, CPF_MASKED].some((re) => ((re.lastIndex = 0), re.test(s)));
}

/**
 * Remove o documento do nome de fornecedor e arruma o que sobra (separadores soltos, espaços).
 * Se nada restar, devolve "Pessoa física". CNPJ não é alterado.
 */
export function stripCpf(text) {
  const original = String(text ?? "");
  if (!hasCpf(original)) return original;
  const cleaned = original
    .replace(CPF_DOTTED, " ")
    .replace(CPF_BARE, " ")
    .replace(CPF_MASKED, " ")
    .replace(/\s+/g, " ")
    .replace(/^[\s\-–:,;/]+|[\s\-–:,;/]+$/g, "")
    .trim();
  return cleaned || "Pessoa física";
}

/** CPF válido pelos dígitos verificadores (sequências repetidas não contam). */
export function validCpfDigits(d) {
  if (!/^\d{11}$/.test(d) || /^(\d)\1{10}$/.test(d)) return false;
  const dv = (n) => {
    let sum = 0;
    for (let i = 0; i < n; i++) sum += Number(d[i]) * (n + 1 - i);
    const r = (sum * 10) % 11;
    return r === 10 ? 0 : r;
  };
  return dv(9) === Number(d[9]) && dv(10) === Number(d[10]);
}

/** Campos de texto livre onde um nome de pessoa/empresa mora: ali QUALQUER sequência de 11 dígitos conta. */
const NAME_KEYS = /^(nome|fornecedor|razao|razaosocial)$/i;

/**
 * Tipo de CPF achado no texto (para mensagem de erro), ou null. Pontuado e parcial sempre contam.
 * Onze dígitos soltos contam em campo de nome (`strictBare`) ou, nos demais campos (ex.: votos
 * codificados, ids), só se passarem nos dígitos verificadores de CPF.
 */
export function findCpf(text, strictBare = true) {
  const s = String(text ?? "");
  CPF_DOTTED.lastIndex = CPF_MASKED.lastIndex = CPF_BARE.lastIndex = 0;
  if (CPF_DOTTED.test(s)) return "CPF com pontuação";
  if (CPF_MASKED.test(s)) return "CPF parcialmente mascarado";
  const bare = s.match(CPF_BARE) ?? [];
  if (strictBare ? bare.length : bare.some(validCpfDigits)) return "11 dígitos seguidos (CPF)";
  return null;
}

/**
 * Percorre um valor JSON e devolve a lista de ocorrências de CPF (caminho + tipo). URLs (https://...)
 * são ignoradas: nomes de arquivo podem ter 11 dígitos sem ser documento.
 */
export function scanCpf(value, path = "$", out = [], key = "") {
  if (typeof value === "string") {
    if (!/^https?:\/\//i.test(value)) {
      const kind = findCpf(value, NAME_KEYS.test(key));
      if (kind) out.push(`${path}: ${kind}`);
    }
  } else if (Array.isArray(value)) value.forEach((v, i) => scanCpf(v, `${path}[${i}]`, out, key));
  else if (value && typeof value === "object") for (const [k, v] of Object.entries(value)) scanCpf(v, `${path}.${k}`, out, k);
  return out;
}

/** Trava de segurança na gravação: interrompe a coleta em vez de publicar CPF. */
export function assertNoCpf(value, where) {
  const hits = scanCpf(value);
  if (hits.length) throw new Error(`CPF encontrado em ${where} (${hits.length}): ${hits.slice(0, 3).join("; ")}`);
}
