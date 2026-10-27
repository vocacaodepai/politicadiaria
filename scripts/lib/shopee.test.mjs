import test from "node:test";
import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { spawnSync } from "node:child_process";
import { buildAuthHeader, buildPayload, buildQuery, MOCK_RESPONSE, normalizeOffers, scrub, searchOffers } from "./shopee.mjs";

// Credenciais FICTÍCIAS, só para o teste.
const ID = "TEST_APP_ID";
const SECRET = "TEST_SECRET_VALUE";

test("buildQuery escapa a palavra-chave e limita o tamanho da página", () => {
  const q = buildQuery('livro "x"', 99);
  assert.match(q, /keyword:"livro \\"x\\""/);
  assert.match(q, /limit:20/);
  assert.match(buildQuery("a", 0), /limit:5/);
});

test("assinatura é sha256 hex de APP_ID + ts + payload + SECRET", () => {
  const payload = buildPayload(buildQuery("isbn", 3));
  const header = buildAuthHeader(ID, SECRET, payload, 1700000000);
  const expected = createHash("sha256").update(ID + "1700000000" + payload + SECRET).digest("hex");
  assert.equal(header, `SHA256 Credential=${ID}, Timestamp=1700000000, Signature=${expected}`);
  assert.ok(!header.includes(SECRET));
});

test("searchOffers envia POST assinado e normaliza a resposta simulada", async () => {
  let seen;
  const fetchImpl = async (url, init) => {
    seen = { url, init };
    return { ok: true, status: 200, text: async () => JSON.stringify(MOCK_RESPONSE) };
  };
  const offers = await searchOffers({ appId: ID, secret: SECRET, keyword: "x", fetchImpl, now: () => 1700000000000 });
  assert.equal(seen.url, "https://open-api.affiliate.shopee.com.br/graphql");
  assert.equal(seen.init.method, "POST");
  assert.match(seen.init.headers.Authorization, /^SHA256 Credential=TEST_APP_ID, Timestamp=1700000000, Signature=[0-9a-f]{64}$/);
  assert.equal(offers.length, 1);
  assert.equal(offers[0].shopName, "Loja Exemplo");
  assert.deepEqual(offers[0].checks, { offerLinkHostOk: true, imageHostOk: true });
});

test("checks reprovam link e imagem fora dos hosts esperados", () => {
  const [o] = normalizeOffers({ data: { productOfferV2: { nodes: [{ offerLink: "http://s.shopee.com.br/a", imageUrl: "https://exemplo.com/a.jpg" }] } } });
  assert.deepEqual(o.checks, { offerLinkHostOk: false, imageHostOk: false });
});

test("erro da API não vaza credenciais", async () => {
  const fetchImpl = async () => ({ ok: false, status: 401, text: async () => JSON.stringify({ errors: [{ message: `bad ${SECRET}` }] }) });
  await assert.rejects(searchOffers({ appId: ID, secret: SECRET, keyword: "x", fetchImpl }), (e) => {
    assert.ok(!e.message.includes(SECRET));
    return true;
  });
  assert.equal(scrub(`a ${SECRET}`, SECRET), "a [oculto]");
});

test("CLI falha com mensagem clara sem variáveis e funciona com --mock", () => {
  const env = { ...process.env };
  delete env.SHOPEE_APP_ID;
  delete env.SHOPEE_APP_SECRET;
  const bad = spawnSync("node", ["scripts/shopee-offer.mjs", "--keyword", "x"], { env, encoding: "utf8" });
  assert.equal(bad.status, 2);
  assert.match(bad.stderr, /SHOPEE_APP_ID, SHOPEE_APP_SECRET/);
  const ok = spawnSync("node", ["scripts/shopee-offer.mjs", "--keyword", "x", "--mock"], { env, encoding: "utf8" });
  assert.equal(ok.status, 0);
  const out = JSON.parse(ok.stdout);
  assert.equal(out.mock, true);
  assert.equal(out.offers[0].itemId, "2");
});
