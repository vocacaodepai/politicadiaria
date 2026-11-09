import type { FactCheck } from "@/lib/types";

export const checagem: FactCheck = {
  slug: "governo-lula-confisco-poupanca-2027-sem-base-oficial-falso",
  title: "Não há registro de que o governo prepare confisco da poupança em 2027",
  summary:
    "Posts dizem que o governo Lula vai confiscar a poupança em 2027. Não há proposta oficial; a Constituição veda medida provisória sobre poupança, segundo a Secom.",
  author: "Equipe Política Diária",
  verdict: "falso",
  quick:
    "Falso. Nenhuma fonte aberta registra projeto, medida ou fala do governo sobre confisco em 2027. A Secom cita a Emenda 32/2001, que veda medida provisória sobre poupança popular.",
  claim: {
    text: "Publicações dizem que o governo Lula prepara um novo confisco da poupança dos brasileiros em 2027, com imagem de tela de erro em que o dinheiro não pode ser sacado.",
    origin:
      "Posts em redes sociais com imagem atribuída a um perfil de notícias, segundo o Boatos.org, que publicou a checagem em 07/11/2026.",
    firstSeen: "2026-11-07",
    attribution: "Publicações em redes sociais",
  },
  date: "2026-11-09",
  checkedAt: "2026-11-09T14:25:00-03:00",
  updated: "2026-11-09",
  topic: "Economia",
  points: [
    {
      status: "falso",
      text: "Não encontramos, nas páginas abertas, projeto de lei, medida provisória ou declaração do governo que preveja confisco da poupança em 2027. O Boatos.org também não achou base oficial.",
    },
    {
      status: "verdade",
      text: "A Secom explica que o PL 1.847/24, sobre valores esquecidos em bancos há mais de 25 anos, “não representa confisco”: o dono mantém o direito ao dinheiro e pode contestar. O Aos Fatos informa que os recursos podem ser reclamados até 31/12/2027, data que pode alimentar a confusão.",
    },
    {
      status: "verdade",
      text: "O confisco de 1990 (Plano Collor) existiu. A Secom afirma que a Emenda Constitucional 32/2001 passou a vedar medida provisória sobre “detenção ou sequestro de bens, de poupança popular ou qualquer outro ativo financeiro”.",
    },
    {
      status: "atencao",
      text: "A imagem de erro de saque não traz banco, agência, data nem fonte, e por isso não pode ser verificada. O texto da Emenda 32 no site do Planalto não abriu para nós; a citação vem da nota da Secom.",
    },
  ],
  sources: [
    {
      label: "Não existe confisco de dinheiro depositado em contas bancárias",
      publisher: "Secretaria de Comunicação Social (Secom)",
      url: "https://www.gov.br/secom/pt-br/acompanhe-a-secom/area-de-imprensa/notas-a-imprensa/nao-existe-confisco-de-dinheiro-depositado-em-contas-bancarias",
      kind: "primaria",
      note: "Nota do governo sobre o PL 1.847/24 e valores esquecidos: diz que a transferência não é confisco e que o titular pode contestar. Publicada em 13/09/2024, com atualização em 29/10/2026.",
      published: "2024-09-13",
    },
    {
      label: "Por que não há risco de confisco da poupança",
      publisher: "Secretaria de Comunicação Social (Secom)",
      url: "https://www.gov.br/secom/pt-br/fatos/brasil-contra-fake/noticias/2023/07/por-que-nao-ha-risco-de-confisco-da-poupanca",
      kind: "primaria",
      note: "Cita o artigo 62 da Constituição, incluído pela Emenda 32/2001, que veda medida provisória sobre poupança popular e ativos financeiros. Publicada em 12/07/2023, com atualização em 27/10/2026.",
      published: "2023-07-12",
    },
    {
      label: "Governo federal não limitou saques em dinheiro",
      publisher: "Secretaria de Comunicação Social (Secom)",
      url: "https://www.gov.br/secom/pt-br/fatos/brasil-contra-fake/noticias/2025/01/governo-federal-nao-limitou-saques-em-dinheiro",
      kind: "primaria",
      note: "Afirma que não há regras novas do Banco Central sobre saques e repete que a Constituição veda medida provisória que sequestre poupança. Publicada em 16/01/2025, com atualização em 27/10/2026.",
      published: "2025-01-16",
    },
    {
      label: "Lula e o Congresso não tentaram aprovar lei para confiscar poupança",
      publisher: "Aos Fatos",
      url: "https://www.aosfatos.org/noticias/falso-lula-congresso-projeto-para-confiscar-poupancas/",
      kind: "agencia",
      note: "Checagem de 2024 sobre o PL 1.847/24: o texto não trata de confiscar poupança e o titular pode reclamar os valores até 31/12/2027. Publicada em 13/09/2024.",
      published: "2024-09-13",
    },
    {
      label: "Governo Lula prepara confisco do dinheiro da poupança dos brasileiros em 2027?",
      publisher: "Boatos.org",
      url: "https://www.boatos.org/politica/governo-lula-prepara-confisco-do-dinheiro-da-poupanca-dos-brasileiros-em-2027.html",
      kind: "agencia",
      note: "Checa os posts atuais, classifica como falsos e aponta que não há projeto, medida provisória ou declaração oficial. Publicada em 07/11/2026.",
      published: "2026-11-07",
    },
  ],
  timeline: [
    { date: "1990-03-16", text: "O Plano Collor bloqueia depósitos e aplicações, episódio que a Secom cita como referência histórica do boato." },
    { date: "2001-09-11", text: "A Emenda Constitucional 32 limita os temas de medida provisória, incluindo o sequestro de poupança popular, conforme a Secom." },
    { date: "2024-09-13", text: "Secom e Aos Fatos explicam que o PL 1.847/24, sobre valores esquecidos, não é confisco de poupança." },
    { date: "2026-11-07", text: "O Boatos.org publica a checagem dos posts que apontam confisco em 2027." },
  ],
  content: `
    <h2>O que as fontes dizem</h2>
    <p>Posts afirmam que o governo Lula prepara um confisco da poupança em 2027, acompanhados de uma imagem de tela em que o saque supostamente não é liberado. O <a href="https://www.boatos.org/politica/governo-lula-prepara-confisco-do-dinheiro-da-poupanca-dos-brasileiros-em-2027.html" target="_blank" rel="noopener noreferrer nofollow">Boatos.org</a> classificou a alegação como falsa em 7 de novembro de 2026 e informa que não há projeto, medida provisória nem declaração oficial nesse sentido.</p>
    <p>Em nota atualizada em 29 de outubro de 2026, a <a href="https://www.gov.br/secom/pt-br/acompanhe-a-secom/area-de-imprensa/notas-a-imprensa/nao-existe-confisco-de-dinheiro-depositado-em-contas-bancarias" target="_blank" rel="noopener noreferrer nofollow">Secom</a> afirma que não existe confisco de dinheiro depositado em contas bancárias.</p>

    <h2>De onde pode vir a confusão</h2>
    <p>O PL 1.847/24 trata de valores que pessoas ou empresas esqueceram em bancos, consórcios ou outras instituições e que ficaram sem movimentação por mais de 25 anos. Segundo a Secom, isso “não representa confisco”: o dono continua com direito ao dinheiro e pode contestar a transferência. O <a href="https://www.aosfatos.org/noticias/falso-lula-congresso-projeto-para-confiscar-poupancas/" target="_blank" rel="noopener noreferrer nofollow">Aos Fatos</a> informa que o titular pode reclamar os recursos até 31 de dezembro de 2027, uma data que coincide com o ano citado no boato.</p>
    <p>Outra fonte de confusão é o Plano Collor, de 1990, que de fato bloqueou depósitos. Sobre isso, a <a href="https://www.gov.br/secom/pt-br/fatos/brasil-contra-fake/noticias/2023/07/por-que-nao-ha-risco-de-confisco-da-poupanca" target="_blank" rel="noopener noreferrer nofollow">Secom</a> cita a Emenda Constitucional 32, de 2001, que limitou os temas de medida provisória e passou a vedar a “detenção ou sequestro de bens, de poupança popular ou qualquer outro ativo financeiro”. Em outra nota, a <a href="https://www.gov.br/secom/pt-br/fatos/brasil-contra-fake/noticias/2025/01/governo-federal-nao-limitou-saques-em-dinheiro" target="_blank" rel="noopener noreferrer nofollow">Secom</a> diz que não há regras novas do Banco Central limitando saques.</p>

    <h2>Por que o veredito é Falso</h2>
    <p>Nenhuma fonte aberta registra proposta, ato ou fala do governo sobre confisco em 2027, e a imagem de erro de saque não identifica banco, agência nem data. Ressalva: as notas da Secom são do próprio governo, que é parte interessada, e o texto da Emenda 32 no site do Planalto não abriu para nós; por isso o veredito se apoia também no Aos Fatos e no Boatos.org, que checaram a mesma alegação. Um projeto futuro de qualquer governo teria de tramitar às claras, com registro no Congresso ou no Diário Oficial. A mesma régua vale para boatos sobre qualquer governo e qualquer campo. Veja outras <a href="/checagem">checagens do site</a> e o painel de <a href="/eleicoes">Eleições 2026</a>.</p>
  `,
};
