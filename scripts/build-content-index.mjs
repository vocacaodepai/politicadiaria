#!/usr/bin/env node
/**
 * Gera os índices content/articles/index.ts e content/news/index.ts a partir
 * dos arquivos content/<tipo>/<slug>.ts. Roda em `npm run check:content`,
 * `npm run lint` e antes de todo build. Um arquivo por item: as rotinas de
 * escrita criam arquivos novos em vez de editar um arquivo gigante.
 */
import { readdirSync, readFileSync, writeFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";

const ROOT = resolve(new URL("..", import.meta.url).pathname);

const COLLECTIONS = [
  { dir: "content/articles", exportName: "articles", itemExport: "article", type: "Article" },
  { dir: "content/news", exportName: "news", itemExport: "item", type: "NewsItem" },
];

const slugRe = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

for (const col of COLLECTIONS) {
  const dir = resolve(ROOT, col.dir);
  const out = resolve(dir, "index.ts");
  const files = readdirSync(dir)
    .filter((f) => f.endsWith(".ts") && f !== "index.ts")
    .sort();

  const entries = [];
  for (const file of files) {
    const slug = file.slice(0, -3);
    if (!slugRe.test(slug)) {
      console.error(`build-content-index: nome de arquivo inválido em ${col.dir}: ${file} (use só a-z, 0-9 e hífen)`);
      process.exit(1);
    }
    const src = readFileSync(resolve(dir, file), "utf8");
    const slugM = /\n\s*slug:\s*"([^"]+)"/.exec(src);
    const dateM = /\n\s*date:\s*"([^"]+)"/.exec(src);
    const seedM = /\n\s*seed:\s*(\d+)/.exec(src);
    if (!slugM || slugM[1] !== slug) {
      console.error(`build-content-index: ${col.dir}/${file} precisa ter slug: "${slug}"`);
      process.exit(1);
    }
    if (!new RegExp(`export const ${col.itemExport}: ${col.type} = \\{`).test(src)) {
      console.error(`build-content-index: ${col.dir}/${file} precisa exportar \`export const ${col.itemExport}: ${col.type} = { ... }\``);
      process.exit(1);
    }
    entries.push({ slug, date: dateM ? dateM[1] : "", seed: seedM ? Number(seedM[1]) : 0 });
  }

  // Mais recentes primeiro; desempate pelo seed (maior = mais novo) e depois pelo slug.
  entries.sort(
    (a, b) => b.date.localeCompare(a.date) || b.seed - a.seed || a.slug.localeCompare(b.slug)
  );

  const lines = [
    "// Gerado automaticamente por scripts/build-content-index.mjs. Não edite à mão.",
    `// Para publicar, crie ${col.dir}/<slug>.ts e rode \`npm run check:content\`.`,
    `import type { ${col.type} } from "@/lib/types";`,
    "",
    ...entries.map((e, i) => `import { ${col.itemExport} as i${i} } from "./${e.slug}";`),
    "",
    `export const ${col.exportName}: ${col.type}[] = [`,
    ...entries.map((_, i) => `  i${i},`),
    "];",
    "",
  ];
  const next = lines.join("\n");
  const prev = existsSync(out) ? readFileSync(out, "utf8") : "";
  if (prev !== next) {
    writeFileSync(out, next);
    console.log(`build-content-index: ${col.dir} atualizado (${entries.length} itens)`);
  } else {
    console.log(`build-content-index: ${col.dir} em dia (${entries.length} itens)`);
  }
}
