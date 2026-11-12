/**
 * Valida content/proposicoes-noticias.json (notícia -> proposições citadas, usado pelo placar
 * oficial em /noticias/<slug>). Mantido pela rotina de notícias; o placar em si é gerado pelo
 * coletor do Congresso e nunca é escrito à mão.
 */
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

export function checkProposicoesNoticias(root, newsSlugs, errors) {
  const file = resolve(root, "content/proposicoes-noticias.json");
  if (!existsSync(file)) return 0;
  let data;
  try {
    data = JSON.parse(readFileSync(file, "utf8"));
  } catch (e) {
    errors.push(`proposicoes-noticias.json: JSON inválido (${e.message})`);
    return 0;
  }
  const map = data?.noticias;
  if (!map || typeof map !== "object" || Array.isArray(map)) {
    errors.push(`proposicoes-noticias.json: precisa de um objeto "noticias" { slug: [proposições] }`);
    return 0;
  }
  let n = 0;
  for (const [slug, list] of Object.entries(map)) {
    const where = `proposicoes-noticias.json/${slug}`;
    if (!newsSlugs.has(slug)) errors.push(`${where}: notícia não existe em content/news/`);
    if (!Array.isArray(list) || list.length === 0) {
      errors.push(`${where}: lista de proposições vazia ou inválida`);
      continue;
    }
    for (const p of list) {
      n++;
      if (!/^[A-Z]{2,4}$/.test(String(p?.sigla ?? ""))) errors.push(`${where}: sigla inválida (${p?.sigla}); use a sigla oficial em maiúsculas, MP é "MPV"`);
      if (!Number.isInteger(p?.numero) || p.numero <= 0) errors.push(`${where}: numero precisa ser inteiro, sem ponto (${p?.numero})`);
      if (!Number.isInteger(p?.ano) || p.ano < 1946 || p.ano > 2100) errors.push(`${where}: ano inválido (${p?.ano})`);
      const extra = Object.keys(p ?? {}).filter((k) => !["sigla", "numero", "ano"].includes(k));
      if (extra.length) errors.push(`${where}: campos não aceitos (${extra.join(", ")}); placar vem só da coleta oficial`);
    }
  }
  return n;
}
