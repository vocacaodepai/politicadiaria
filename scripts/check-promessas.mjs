#!/usr/bin/env node
/** Valida só o painel de promessas (data/promessas/). O `npm run check:content` já inclui esta checagem. */
import { checkPromessas } from "./lib/check-promessas.mjs";

const errors = [];
const TODAY = new Intl.DateTimeFormat("en-CA", {
  timeZone: "America/Sao_Paulo",
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
}).format(new Date());

const stats = checkPromessas({ errors, TODAY });
if (errors.length) {
  for (const e of errors) console.error(`ERRO: ${e}`);
  console.error(`\ncheck-promessas: ${errors.length} erro(s) encontrado(s).`);
  process.exit(1);
}
console.log(`check-promessas: ok (${stats.propostas} propostas)`);
