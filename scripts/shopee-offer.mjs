#!/usr/bin/env node
/**
 * Busca ofertas de livros na API de afiliados da Shopee Brasil e imprime JSON.
 *
 *   node scripts/shopee-offer.mjs --keyword "9788500000000" [--limit 5]
 *   node scripts/shopee-offer.mjs --isbn 9788500000000
 *   node scripts/shopee-offer.mjs --keyword "título autor" --mock   (sem rede, sem credenciais)
 *
 * Credenciais: variáveis de ambiente SHOPEE_APP_ID e SHOPEE_APP_SECRET. Nunca vão para o
 * repositório nem para a saída. Saída: nome, preço, imageUrl, offerLink, productLink,
 * shopName, itemId (e vendas/estrelas), mais `checks` com o teste de host do link e da foto.
 */
import { MOCK_RESPONSE, normalizeOffers, scrub, searchOffers } from "./lib/shopee.mjs";

function parseArgs(argv) {
  const out = { limit: 5, mock: false };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === "--mock") out.mock = true;
    else if (a === "--keyword" || a === "-k") out.keyword = argv[++i];
    else if (a === "--isbn") out.keyword = argv[++i];
    else if (a === "--limit" || a === "-n") out.limit = argv[++i];
    else if (a === "--help" || a === "-h") out.help = true;
    else if (!a.startsWith("-") && !out.keyword) out.keyword = a;
    else throw new Error(`Argumento desconhecido: ${a}`);
  }
  return out;
}

const USAGE = `Uso: node scripts/shopee-offer.mjs --keyword "<palavra-chave ou ISBN>" [--limit 5] [--mock]
Variáveis de ambiente: SHOPEE_APP_ID e SHOPEE_APP_SECRET (não são necessárias com --mock).`;

async function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.help) {
    console.log(USAGE);
    return;
  }
  if (!args.keyword || !String(args.keyword).trim()) {
    console.error(`Informe --keyword ou --isbn.\n${USAGE}`);
    process.exit(2);
  }
  let offers;
  if (args.mock) {
    offers = normalizeOffers(MOCK_RESPONSE);
  } else {
    const appId = process.env.SHOPEE_APP_ID;
    const secret = process.env.SHOPEE_APP_SECRET;
    const missing = [!appId && "SHOPEE_APP_ID", !secret && "SHOPEE_APP_SECRET"].filter(Boolean);
    if (missing.length > 0) {
      console.error(`Variáveis de ambiente ausentes: ${missing.join(", ")}. Defina-as no ambiente (nunca em arquivo do repositório) ou use --mock para testar.`);
      process.exit(2);
    }
    try {
      offers = await searchOffers({ appId, secret, keyword: args.keyword, limit: args.limit });
    } catch (e) {
      console.error(scrub(e.message, appId, secret));
      process.exit(1);
    }
  }
  console.log(JSON.stringify({ keyword: args.keyword, mock: args.mock, count: offers.length, offers }, null, 2));
}

main().catch((e) => {
  console.error(e.message);
  process.exit(1);
});
