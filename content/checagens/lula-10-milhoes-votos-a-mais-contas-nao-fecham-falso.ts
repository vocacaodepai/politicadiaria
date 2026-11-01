import type { FactCheck } from "@/lib/types";

export const checagem: FactCheck = {
  slug: "lula-10-milhoes-votos-a-mais-contas-nao-fecham-falso",
  title: "É falso que os 10,3 milhões de votos a mais de Lula no 2º turno “não fecham” e provem fraude",
  summary:
    "Pelos arquivos do TSE, a soma bate: 9,3 milhões de votos de outros candidatos e 4,8 milhões de votos válidos a mais explicam os 14,1 milhões que os finalistas somaram.",
  author: "Equipe Política Diária",
  verdict: "falso",
  quick:
    "Falso. Lula foi de 53,88 para 64,26 milhões de votos entre os turnos (mais 10,38 milhões), mas o total de votos válidos subiu 4,78 milhões e os dez candidatos eliminados somaram 9,32 milhões no 1º turno. Os números do TSE fecham e não indicam fraude. O voto é secreto, então nenhuma conta mostra de quem veio cada voto.",
  claim: {
    text: "Lula teria “pegado” todos os votos dos candidatos derrotados no 1º turno e dos abstêmios, e o aumento de mais de 10 milhões de votos seria “matematicamente impossível”, prova de fraude no 2º turno (“as contas não fecham”).",
    origin:
      "Publicações em redes sociais depois do 2º turno (25/10/2026), citadas pela Agência Lupa em 27/10; a Lupa também registra a mesma ideia em carta atribuída a Flávio Bolsonaro, divulgada em 28/10.",
    firstSeen: "2026-10-26",
    attribution: "Publicações em redes sociais, segundo a Agência Lupa",
  },
  date: "2026-11-01",
  checkedAt: "2026-11-01T13:41:00-03:00",
  updated: "2026-11-01",
  topic: "Eleições 2026",
  points: [
    {
      status: "verdade",
      text: "Segundo os arquivos de resultado do TSE, Lula teve 53.879.538 votos no 1º turno e 64.256.232 no 2º, aumento de 10.376.694. Flávio Bolsonaro foi de 56.104.503 para 59.826.041, aumento de 3.721.538.",
    },
    {
      status: "falso",
      text: "A conta fecha. Os dois finalistas somaram 14.098.232 votos a mais. Desse total, 9.316.747 são os votos que os outros candidatos tiveram no 1º turno e 4.781.485 vêm do aumento dos votos válidos.",
    },
    {
      status: "falso",
      text: "O aumento dos votos válidos tem origem nos dados do TSE: o comparecimento subiu de 125.275.835 para 128.236.074 (2.960.239 eleitores a mais) e brancos e nulos caíram de 5.975.047 para 4.153.801 (1.821.246 a menos).",
    },
    {
      status: "atencao",
      text: "Como o voto é secreto, comparar totais dos dois turnos não diz de quem veio cada voto. Segundo a Lupa e o Times Brasil, a conta mostra saldos, e não a migração de cada eleitor. Também por isso ela não prova transferência automática nem fraude.",
    },
  ],
  sources: [
    {
      label: "Resultado oficial, Presidente, 1º turno (arquivo de totalização, 05/10/2026)",
      publisher: "TSE, Divulgação de Resultados",
      url: "https://resultados.tse.jus.br/oficial/ele2026/6257/dados/br/br-c0001-e006257-u.json",
      kind: "primaria",
      note: "Traz Lula 53.879.538, Flávio 56.104.503, demais candidatos 9.316.747, votos válidos 119.300.788, brancos 2.300.798, nulos 3.674.249, comparecimento 125.275.835 e abstenção 33.469.244, com 100% das seções.",
      published: "2026-10-05",
    },
    {
      label: "Resultado oficial, Presidente, 2º turno (arquivo de totalização, 25/10/2026)",
      publisher: "TSE, Divulgação de Resultados",
      url: "https://resultados.tse.jus.br/oficial/ele2026/6258/dados/br/br-c0001-e006258-u.json",
      kind: "primaria",
      note: "Traz Lula 64.256.232, Flávio 59.826.041, votos válidos 124.082.273, brancos 1.430.496, nulos 2.723.305, comparecimento 128.236.074 e abstenção 30.509.005, totalizado às 23h26 de 25/10.",
      published: "2026-10-25",
    },
    {
      label: "Aumento de votos a Lula não reflete transferência automática de votos de outros candidatos",
      publisher: "Agência Lupa",
      url: "https://www.agencialupa.org/jornalismo/2026/10/27/aumento-de-votos-a-lula-nao-reflete-transferencia-automatica-de-votos-de-outros-candidatos/",
      kind: "agencia",
      note: "Classifica como falsa a publicação e explica que totais de cada turno não mostram a escolha individual do eleitor. Cita queda da abstenção e de brancos e nulos. Publicada em 27/10/2026.",
      published: "2026-10-27",
    },
    {
      label: "Após fuga do Brasil, Flávio Bolsonaro mente sobre eleições em carta com teor golpista",
      publisher: "Agência Lupa",
      url: "https://www.agencialupa.org/checagem/2026/10/28/apos-fuga-do-brasil-flavio-bolsonaro-mente-sobre-eleicoes-em-carta-com-teor-golpista/",
      kind: "agencia",
      note: "Classifica como falsa a alegação de “impossibilidade matemática” do aumento de 10,3 milhões e cita o teste de integridade com 389 votos sem divergências. Publicada em 28/10/2026.",
      published: "2026-10-28",
    },
    {
      label: "Lula ganhou três em cada quatro votos que ficaram abertos para disputa no segundo turno",
      publisher: "Times Brasil",
      url: "https://timesbrasil.com.br/eleicoes-2026/lula-ganhou-tres-em-cada-quatro-votos-que-ficaram-abertos-para-disputa-no-segundo-turno/",
      kind: "imprensa",
      note: "Decompõe os 14,09 milhões de votos a mais dos finalistas em 9,32 milhões de outros candidatos e 4,77 milhões de aumento de votos válidos, e ressalva que é comparação de saldos. Publicada em 26/10/2026.",
      published: "2026-10-26",
    },
  ],
  timeline: [
    { date: "2026-10-05", text: "O TSE totaliza 100% das seções do 1º turno: Flávio 56.104.503 votos e Lula 53.879.538." },
    { date: "2026-10-25", text: "No 2º turno, o TSE totaliza Lula com 64.256.232 votos e Flávio com 59.826.041, com comparecimento de 80,78%." },
    { date: "2026-10-27", text: "A Agência Lupa publica a checagem de que o aumento de votos de Lula não reflete transferência automática." },
    { date: "2026-10-28", text: "A Lupa checa a carta atribuída a Flávio Bolsonaro que fala em aumento “matematicamente impossível”." },
  ],
  content: `
    <h2>O que as fontes dizem</h2>
    <p>Depois do segundo turno, publicações passaram a afirmar que Lula teria “pegado” todos os votos dos candidatos derrotados e dos abstêmios do primeiro turno e que, por isso, as contas não fechariam. A <a href="https://www.agencialupa.org/jornalismo/2026/10/27/aumento-de-votos-a-lula-nao-reflete-transferencia-automatica-de-votos-de-outros-candidatos/" target="_blank" rel="noopener noreferrer nofollow">Agência Lupa</a> classificou a publicação como falsa em 27 de outubro. Em 28 de outubro, a <a href="https://www.agencialupa.org/checagem/2026/10/28/apos-fuga-do-brasil-flavio-bolsonaro-mente-sobre-eleicoes-em-carta-com-teor-golpista/" target="_blank" rel="noopener noreferrer nofollow">Lupa</a> também classificou como falsa a alegação de “impossibilidade matemática” presente em carta atribuída a Flávio Bolsonaro.</p>
    <p>Os números vêm dos arquivos de resultado do TSE. No <a href="https://resultados.tse.jus.br/oficial/ele2026/6257/dados/br/br-c0001-e006257-u.json" target="_blank" rel="noopener noreferrer nofollow">1º turno</a>, Lula teve 53.879.538 votos e Flávio 56.104.503. No <a href="https://resultados.tse.jus.br/oficial/ele2026/6258/dados/br/br-c0001-e006258-u.json" target="_blank" rel="noopener noreferrer nofollow">2º turno</a>, Lula teve 64.256.232 e Flávio 59.826.041. Lula ganhou 10.376.694 votos e Flávio ganhou 3.721.538.</p>

    <h2>A conta, passo a passo</h2>
    <p>Somados, os dois finalistas tiveram 14.098.232 votos a mais no 2º turno. Os outros dez candidatos do 1º turno somaram 9.316.747 votos, que ficaram disponíveis. O restante, 4.781.485, vem de votos válidos que não existiam antes: o comparecimento subiu de 125.275.835 para 128.236.074 (2.960.239 eleitores a mais) e brancos e nulos caíram de 5.975.047 para 4.153.801 (1.821.246 a menos). A soma de 9.316.747 com 4.781.485 dá exatamente 14.098.232. O <a href="https://timesbrasil.com.br/eleicoes-2026/lula-ganhou-tres-em-cada-quatro-votos-que-ficaram-abertos-para-disputa-no-segundo-turno/" target="_blank" rel="noopener noreferrer nofollow">Times Brasil</a> chega à mesma decomposição, de forma arredondada (9,32 milhões e 4,77 milhões).</p>
    <p>A abstenção caiu de 21,08% para 19,22%, segundo os arquivos do TSE. Ou seja, o crescimento dos dois lados tem espaço aritmético nos próprios dados. A diferença entre os candidatos no 2º turno foi de 4.430.191 votos a favor de Lula.</p>

    <h2>Por que o veredito é Falso</h2>
    <p>A alegação central é que a conta seria impossível. Os dados oficiais mostram o contrário: o aumento cabe nos votos de outros candidatos, na queda da abstenção e na redução de brancos e nulos. Também há um limite para o que a conta mostra. Como o voto é secreto, comparar totais não revela a escolha de cada eleitor, e é por isso que a Lupa e o Times Brasil dizem que a diferença entre turnos não indica, por si só, transferência de votos nem fraude. Na mesma carta, a Lupa registra que um teste de integridade com 389 votos auditados não encontrou divergências.</p>
    <p>Esta checagem não atribui a autoria do boato a ninguém e a mesma régua vale para qualquer campo: a comparação entre turnos também vale para o crescimento de Flávio Bolsonaro, de 3,7 milhões de votos. Veja também as checagens sobre <a href="/checagem/votos-apos-17h-decidiram-eleicao-lula-prorrogacao-falso">votos depois das 17h</a>, <a href="/checagem/lula-165-mil-votos-sem-origem-diferenca-entre-paineis-tse">os 165 mil votos sem origem</a> e o <a href="/eleicoes">painel de Eleições 2026</a>.</p>
  `,
};
