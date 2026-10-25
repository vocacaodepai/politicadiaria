// node --test scripts/lib/cpf.test.mjs
import test from "node:test";
import assert from "node:assert/strict";
import { hasCpf, stripCpf, findCpf } from "./cpf.mjs";

test("remove CPF de 11 dígitos e mantém o nome", () => {
  assert.equal(stripCpf("JOSE DA SILVA 52998224725"), "JOSE DA SILVA");
  assert.equal(stripCpf("PAULO DIAS SANTOS JUNIOR - 52998224725"), "PAULO DIAS SANTOS JUNIOR");
  assert.equal(stripCpf("52998224725 JOSE"), "JOSE");
});
test("remove CPF pontuado", () => {
  assert.equal(stripCpf("MARIA SOUZA 529.982.247-25"), "MARIA SOUZA");
  assert.equal(stripCpf("MARIA SOUZA 529.982.247 - 25 ME"), "MARIA SOUZA ME");
});
test("remove CPF parcial com asteriscos", () => {
  assert.equal(stripCpf("ANA LIMA 738*********"), "ANA LIMA");
  assert.equal(stripCpf("ANA LIMA ***.123.456-**"), "ANA LIMA");
  assert.equal(stripCpf("ANA LIMA ***.***.***-**"), "ANA LIMA");
  assert.equal(stripCpf("***.123.456-**"), "Pessoa física");
});
test("CNPJ (14 dígitos ou formatado) não é alterado", () => {
  for (const s of ["EMPRESA LTDA 12345678000195", "EMPRESA LTDA 12.345.678/0001-95", "12345678000195", "12.345.678/0001-95", "POSTO 88 LTDA"]) {
    assert.equal(hasCpf(s), false, s);
    assert.equal(stripCpf(s), s, s);
    assert.equal(findCpf(s), null, s);
  }
});
test("texto sem documento e números curtos ficam iguais", () => {
  for (const s of ["Hotel Central 2024", "LOJA 1234567890", "A**B", ""]) assert.equal(stripCpf(s), s);
  assert.equal(stripCpf(null), "");
});
test("MEI com nome e CNPJ no mesmo texto: só o CPF sai", () => {
  assert.equal(stripCpf("JOAO 52998224725 CNPJ 12345678000195"), "JOAO CNPJ 12345678000195");
});
test("findCpf: detecta pontuado, parcial e 11 dígitos", () => {
  assert.ok(findCpf("X 529.982.247-25"));
  assert.ok(findCpf("X 738*********"));
  assert.ok(findCpf("X 52998224725"));
  assert.ok(findCpf("X 11111111111"));
});
test("votos codificados e ids com 11 dígitos não são CPF; em campo de nome qualquer 11 dígitos é", async () => {
  const { scanCpf } = await import("./cpf.mjs");
  assert.deepEqual(scanCpf({ v: "77777777777" }), []);
  assert.equal(scanCpf({ nome: "ANA 11111111111" }).length, 1);
  assert.equal(scanCpf({ x: "52998224725" }).length, 1);
});
test("scanCpf ignora URL e acha CPF em nome de fornecedor", async () => {
  const { scanCpf, assertNoCpf } = await import("./cpf.mjs");
  assert.deepEqual(scanCpf({ foto: "https://upload.wikimedia.org/x_(52998224725).jpg" }), []);
  assert.equal(scanCpf({ f: [{ nome: "ANA 52998224725", cnpj: "12345678000195" }] }).length, 1);
  assert.throws(() => assertNoCpf({ nome: "ANA 738*********" }, "teste"));
  assert.doesNotThrow(() => assertNoCpf({ nome: "ANA", cnpj: "12345678000195" }, "teste"));
});
