/**
 * Cliente mínimo da API de afiliados da Shopee Brasil (GraphQL), usado por
 * scripts/shopee-offer.mjs. Nenhum segredo vive aqui: as credenciais vêm das
 * variáveis de ambiente SHOPEE_APP_ID e SHOPEE_APP_SECRET e nunca são impressas.
 */
import { createHash } from "node:crypto";

export const SHOPEE_ENDPOINT = "https://open-api.affiliate.shopee.com.br/graphql";
export const OFFER_LINK_HOST = "s.shopee.com.br";
export const IMAGE_HOST = "cf.shopee.com.br";

/** Monta a query productOfferV2 (palavra-chave escapada como string GraphQL/JSON). */
export function buildQuery(keyword, limit) {
  const kw = JSON.stringify(String(keyword));
  const n = Math.min(20, Math.max(1, Number.parseInt(limit, 10) || 5));
  return `{ productOfferV2(keyword:${kw}, limit:${n}){ nodes{ productName price priceMin priceMax imageUrl offerLink productLink shopName itemId sales ratingStar } } }`;
}

/** Corpo JSON exato que será enviado e assinado. */
export function buildPayload(query) {
  return JSON.stringify({ query });
}

/** Authorization: SHA256 Credential=<APP_ID>, Timestamp=<ts>, Signature=<sha256(APP_ID + ts + payload + SECRET)>. */
export function buildAuthHeader(appId, secret, payload, timestamp) {
  const ts = String(timestamp);
  const signature = createHash("sha256").update(appId + ts + payload + secret).digest("hex");
  return `SHA256 Credential=${appId}, Timestamp=${ts}, Signature=${signature}`;
}

function hostOf(url, requiredProtocol = "https:") {
  try {
    const u = new URL(url);
    return u.protocol === requiredProtocol ? u.hostname : "";
  } catch {
    return "";
  }
}

/** Normaliza os nós da resposta e marca se link e imagem respeitam as regras do site. */
export function normalizeOffers(json) {
  const nodes = json?.data?.productOfferV2?.nodes;
  if (!Array.isArray(nodes)) return [];
  return nodes.map((n) => ({
    name: n.productName ?? "",
    price: n.price ?? null,
    priceMin: n.priceMin ?? null,
    priceMax: n.priceMax ?? null,
    imageUrl: n.imageUrl ?? "",
    offerLink: n.offerLink ?? "",
    productLink: n.productLink ?? "",
    shopName: n.shopName ?? "",
    itemId: n.itemId ?? null,
    sales: n.sales ?? null,
    ratingStar: n.ratingStar ?? null,
    checks: {
      offerLinkHostOk: hostOf(n.offerLink) === OFFER_LINK_HOST,
      imageHostOk: hostOf(n.imageUrl) === IMAGE_HOST,
    },
  }));
}

/** Chama a API. `fetchImpl` e `now` existem para teste; em uso real são fetch e Date.now. */
export async function searchOffers({ appId, secret, keyword, limit = 5, fetchImpl = fetch, now = () => Date.now() }) {
  const payload = buildPayload(buildQuery(keyword, limit));
  const timestamp = Math.floor(now() / 1000);
  const res = await fetchImpl(SHOPEE_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: buildAuthHeader(appId, secret, payload, timestamp),
    },
    body: payload,
  });
  const text = await res.text();
  let json;
  try {
    json = JSON.parse(text);
  } catch {
    throw new Error(`Resposta da Shopee não é JSON (HTTP ${res.status}).`);
  }
  if (!res.ok || (Array.isArray(json.errors) && json.errors.length > 0)) {
    const msg = json.errors?.map((e) => e.message).filter(Boolean).join("; ") || `HTTP ${res.status}`;
    throw new Error(`A API da Shopee recusou a consulta: ${scrub(msg, appId, secret)}`);
  }
  return normalizeOffers(json);
}

/** Garante que nenhuma credencial apareça em mensagens de erro. */
export function scrub(text, ...secrets) {
  let out = String(text);
  for (const s of secrets) if (s) out = out.split(s).join("[oculto]");
  return out;
}

/** Resposta simulada para --mock e testes (dados fictícios, não são ofertas reais). */
export const MOCK_RESPONSE = {
  data: {
    productOfferV2: {
      nodes: [
        {
          productName: "[MOCK] Livro de exemplo, Autor Exemplo, Editora Exemplo",
          price: "59.90",
          priceMin: "49.90",
          priceMax: "69.90",
          imageUrl: "https://cf.shopee.com.br/file/mock-image-id",
          offerLink: "https://s.shopee.com.br/MOCKLINK",
          productLink: "https://shopee.com.br/product/1/2",
          shopName: "Loja Exemplo",
          itemId: "2",
          sales: 10,
          ratingStar: "4.9",
        },
      ],
    },
  },
};
