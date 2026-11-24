import type { FactCheck } from "@/lib/types";

export const checagem: FactCheck = {
  slug: "grafico-43-por-cento-processos-moraes-nao-prova-sorteio-viciado-stf",
  title: "Gráfico de Moraes com 43,4% dos processos não prova sorteio viciado no STF",
  summary:
    "Gráfico mostra Moraes com 43,4% de 3.814 processos criminais. Os números incluem casos por prevenção, que não passam por sorteio, segundo Aos Fatos e o STF.",
  author: "Equipe Política Diária",
  verdict: "enganoso",
  quick:
    "Enganoso. O gráfico usa números reais do acervo do STF, mas mostra só processos criminais e inclui ações que chegam ao ministro por prevenção, sem sorteio. Pelo acervo total, segundo o Aos Fatos, Moraes é o segundo ministro com mais processos, atrás de Fachin.",
  claim: {
    text: "Publicações dizem que Alexandre de Moraes recebeu 43,4% dos processos sorteados no STF (1.656 de 3.814) e que o gráfico seria prova de que o sistema de sorteio da Corte não é confiável.",
    origin:
      "Postagens no X e no Instagram, que reuniam ao menos 500 mil visualizações no X e 2.000 curtidas no Instagram até a tarde de 24/11, segundo o Aos Fatos. O gráfico foi publicado originalmente pelo Poder360 em 22/11, segundo o Aos Fatos.",
    firstSeen: "2026-11-22",
    attribution: "Publicações em redes sociais",
  },
  date: "2026-11-24",
  checkedAt: "2026-11-24T18:15:00-03:00",
  updated: "2026-11-24",
  topic: "STF",
  points: [
    {
      status: "verdade",
      text: "Os números do gráfico são reais, mas se referem só a processos criminais. Segundo o Aos Fatos, Moraes relata quase 44% dos processos criminais do STF, em boa parte por causa das investigações do 8 de Janeiro, que somaram 1.516 processos no gabinete dele.",
    },
    {
      status: "falso",
      text: "Não é verdade que esses processos foram sorteados. Segundo o STF, a prevenção é o mecanismo em que um processo com conexão jurídica com outro já em tramitação vai ao ministro do primeiro caso, sem passar pelo sorteio eletrônico. Segundo o Aos Fatos, os inquéritos do 8 de Janeiro foram vinculados por prevenção a inquéritos anteriores relatados por Moraes.",
    },
    {
      status: "falso",
      text: "O gráfico não representa o STF inteiro. Considerando os 21.630 processos do acervo, o Aos Fatos informa que a maior parte está com Fachin (3.945), seguido de Moraes (2.816) e André Mendonça (2.168).",
    },
    {
      status: "atencao",
      text: "A concentração de ações penais no gabinete de Moraes existe: levantamento da Gazeta do Povo com dados do Corte Aberta aponta 222 das 229 ações penais sem decisão final com ele. Se essa concentração é adequada é debate de interesse público, mas esta checagem avalia só a alegação de que o gráfico prova falha no sorteio.",
    },
    {
      status: "atencao",
      text: "O sistema de distribuição não é um sorteio puro: segundo o STF, ele reduz a chance de gabinetes com mais carga e deixa o presidente da Corte fora da distribuição ordinária.",
    },
  ],
  sources: [
    {
      label: "Gráfico não prova que sistema de sorteio do STF privilegia Moraes",
      publisher: "Aos Fatos",
      url: "https://www.aosfatos.org/noticias/sorteio-stf-moraes/",
      kind: "agencia",
      note: "Classifica como falso. Confirma os números do gráfico para processos criminais, explica a prevenção e compara com o acervo total do STF.",
      published: "2026-11-24",
    },
    {
      label: "Como o STF define quem julgará um processo? Entenda como funciona a distribuição de ações na Corte",
      publisher: "Supremo Tribunal Federal",
      url: "https://noticias.stf.jus.br/postsnoticias/como-o-stf-define-quem-julgara-um-processo-entenda-como-funciona-a-distribuicao-de-acoes-na-corte/",
      kind: "primaria",
      note: "Explica o sorteio eletrônico, a compensação por carga de trabalho, os gabinetes fora da distribuição e a prevenção, em que o processo não passa pelo sorteio.",
      published: "2026-07-17",
    },
    {
      label: "Moraes concentra maioria dos inquéritos no STF, mesmo após fim do inquérito das fake news",
      publisher: "Gazeta do Povo",
      url: "https://www.gazetadopovo.com.br/republica/moraes-concentra-inqueritos-stf-apos-fim-inquerito-fake-news/",
      kind: "imprensa",
      note: "Mostra, com dados do Corte Aberta, que Moraes concentra 222 das 229 ações penais sem decisão final, o que confirma a concentração em processos criminais.",
      published: "2026-11-15",
    },
  ],
  timeline: [
    { date: "2023-01-08", text: "Ataques às sedes dos Três Poderes, em Brasília, que originaram os processos do 8 de Janeiro." },
    { date: "2026-07-17", text: "O STF publica explicação sobre como funciona a distribuição de processos na Corte." },
    { date: "2026-11-15", text: "A Gazeta do Povo publica levantamento sobre a concentração de ações penais com Moraes." },
    { date: "2026-11-22", text: "O Poder360 publica o gráfico com a distribuição de 3.814 processos criminais, segundo o Aos Fatos." },
    { date: "2026-11-24", text: "O Aos Fatos publica a checagem; as postagens somavam ao menos 500 mil visualizações no X." },
  ],
  content: `
    <h2>O que circulou</h2>
    <p>Publicações em redes sociais mostram um gráfico com a distribuição de 3.814 processos do STF entre os ministros, no qual Alexandre de Moraes aparece com 1.656, ou 43,4%. As postagens sugerem que o número prova que o sorteio de processos da Corte não é confiável. Segundo o <a href="https://www.aosfatos.org/noticias/sorteio-stf-moraes/" target="_blank" rel="noopener noreferrer nofollow">Aos Fatos</a>, esse conteúdo reunia ao menos 500 mil visualizações no X até a tarde de 24 de novembro.</p>
    <p>O gráfico foi publicado originalmente pelo Poder360 em 22 de novembro, segundo o Aos Fatos, com dados do acervo processual do STF. A checagem não discute se a concentração é desejável, e sim se o gráfico prova que o sorteio é viciado.</p>

    <h2>O que as fontes dizem</h2>
    <p>Segundo o Aos Fatos, os dados do gráfico são verdadeiros, mas representam apenas processos criminais, e incluem ações que não foram sorteadas. A concentração em Moraes se explica, segundo a agência, pelas investigações do 8 de Janeiro, que levaram 1.516 processos ao gabinete dele. Esses casos foram vinculados por prevenção a inquéritos anteriores relatados pelo ministro, como o dos atos antidemocráticos e o das milícias digitais, segundo o professor de direito constitucional Plínio Melgaré, ouvido pela agência.</p>
    <p>O <a href="https://noticias.stf.jus.br/postsnoticias/como-o-stf-define-quem-julgara-um-processo-entenda-como-funciona-a-distribuicao-de-acoes-na-corte/" target="_blank" rel="noopener noreferrer nofollow">próprio STF explica</a> que a prevenção é o mecanismo usado quando um novo processo tem conexão jurídica com outro que já tramita na Corte: ele vai ao ministro do primeiro caso e não passa pelo sorteio eletrônico. O tribunal também informa que o sistema reduz a probabilidade de sorteio para gabinetes com mais processos e que o presidente da Corte fica fora da distribuição ordinária.</p>
    <p>Quando se considera o acervo inteiro, de 21.630 processos, o Aos Fatos informa que a maior parte está com o ministro Edson Fachin (3.945), seguido de Moraes (2.816) e André Mendonça (2.168).</p>

    <h2>Por que o veredito é Enganoso</h2>
    <p>Parte da informação é verdadeira: Moraes de fato relata uma fatia grande dos processos criminais do STF. Um <a href="https://www.gazetadopovo.com.br/republica/moraes-concentra-inqueritos-stf-apos-fim-inquerito-fake-news/" target="_blank" rel="noopener noreferrer nofollow">levantamento da Gazeta do Povo</a>, com dados do Corte Aberta, aponta 222 das 229 ações penais sem decisão final com ele. Mas o conjunto leva a uma conclusão que as fontes não sustentam: o gráfico não separa processos sorteados de processos recebidos por prevenção e não mostra o acervo total. Por isso ele não prova defeito no sorteio.</p>
    <p>O Aos Fatos classifica o conteúdo como falso. Esta checagem adota “enganoso” porque os números são reais e a concentração em processos criminais é confirmada por mais de uma fonte; o que não se sustenta é a conclusão. Quem discorda das regras de prevenção ou da concentração de processos criminais pode debater essas regras, mas isso é diferente de afirmar que o sorteio é fraudado. A mesma régua vale para qualquer lado: veja outras <a href="/checagem">checagens</a>, como a que trata da <a href="/checagem/moraes-mandou-destruir-armas-nao-biblias-bengalas-8-de-janeiro">decisão de Moraes sobre armas</a>.</p>
  `,
};
