import type { FactCheck } from "@/lib/types";

export const checagem: FactCheck = {
  slug: "lista-cidades-mais-votos-que-habitantes-falsa-reciclada-de-2022",
  title: "É falsa a lista de 10 cidades com mais votos em Lula que habitantes, e ela já circulava em 2022",
  summary:
    "O Aos Fatos mostra que a lista tem cidades inexistentes e estados trocados, e que os números não batem com IBGE e TSE. A mesma lista foi checada em 2022.",
  author: "Equipe Política Diária",
  verdict: "falso",
  quick:
    "Falso. Segundo o Aos Fatos, duas cidades da lista não existem, outras estão no estado errado e nenhum dado confere. Os números são os mesmos de uma lista checada pelo Aos Fatos e pelo Comprova em outubro de 2022.",
  claim: {
    text: "Publicações mostram uma lista de dez cidades em que Lula teria recebido mais votos do que o total de habitantes, o que indicaria fraude e votos de mortos no 2º turno de 2026.",
    origin:
      "Posts em redes sociais, com ao menos 8 mil curtidas no Instagram até a tarde de 05/11/2026, segundo o Aos Fatos.",
    firstSeen: "2026-11-05",
    attribution: "Publicações em redes sociais",
  },
  date: "2026-11-07",
  checkedAt: "2026-11-07T07:45:00-03:00",
  updated: "2026-11-07",
  topic: "Eleições 2026",
  points: [
    {
      status: "falso",
      text: "Segundo o Aos Fatos, Barragem e Nova Liberdade não existem; Porto de Pedras fica em Alagoas e Joaçaba, em Santa Catarina, não onde a lista indica. O Aos Fatos diz que nenhum dado da lista está correto.",
    },
    {
      status: "falso",
      text: "O Aos Fatos cita o TSE: nenhum dos municípios a que a lista se refere tem população menor do que os votos recebidos pelas candidaturas.",
    },
    {
      status: "falso",
      text: "Os mesmos números (por exemplo, 25.687 habitantes e 31.338 votos para “Barragem”) aparecem na checagem do Aos Fatos de 05/10/2022, que já classificava a lista como falsa. O Comprova também a checou em 07/10/2022.",
    },
    {
      status: "atencao",
      text: "O Gazeta do Paraná reproduz exemplos: Nossa Senhora da Glória (SE) tem 41.212 habitantes no Censo 2022, segundo a matéria; em 2022 o Comprova citou 37.715 habitantes, com base no IBGE (a divergência entre os dois valores vem de anos e bases diferentes, sem mudar a conclusão). Os dois valores estão muito acima dos 3.053 da lista.",
    },
  ],
  sources: [
    {
      label: "É falsa lista de cidades que registraram mais votos que habitantes",
      publisher: "Aos Fatos",
      url: "https://www.aosfatos.org/noticias/lista-cidades-mais-votos-que-habitantes/",
      kind: "agencia",
      note: "Classifica a lista como falsa, aponta cidades inexistentes e estados errados e cita o TSE. Lembra que a peça circula desde 2022. Publicada em 05/11/2026.",
      published: "2026-11-05",
    },
    {
      label: "É falso que cidades do Nordeste registraram mais votos em Lula que total de habitantes",
      publisher: "Aos Fatos",
      url: "https://www.aosfatos.org/noticias/cidades-nordeste-nao-registraram-mais-votos-lula-que-total-habitantes/",
      kind: "agencia",
      note: "Checagem de 2022 da mesma lista, com os mesmos números de população e votos. Publicada em 05/10/2022.",
      published: "2022-10-05",
    },
    {
      label: "Post inventa dados sobre cidades para insinuar fraude eleitoral a favor de Lula",
      publisher: "Projeto Comprova (republicado pelo Jornal Correio)",
      url: "https://www.correio24horas.com.br/noticia/nid/post-inventa-dados-sobre-cidades-para-insinuar-fraude-eleitoral-a-favor-de-lula",
      kind: "agencia",
      note: "Checagem do Comprova de 2022 da lista: Nossa Senhora da Glória tem 37.715 habitantes e Joaçaba fica em Santa Catarina. Republicada em 07/10/2022.",
      published: "2022-10-07",
    },
    {
      label: "Nova onda de fake news usa relatório falso, biometria e dados de cidades para questionar eleições de 2026",
      publisher: "Gazeta do Paraná",
      url: "https://gazetadoparana.com.br/publico/nova-onda-de-fake-news-usa-relatorio-falso-biometria-e-dados-de-cidades-para-questionar-eleicoes-de",
      kind: "imprensa",
      note: "Resume a checagem do Aos Fatos e traz os dados do Censo 2022 para Nossa Senhora da Glória. Publicada em 06/11/2026.",
      published: "2026-11-06",
    },
  ],
  timeline: [
    { date: "2022-10-05", text: "O Aos Fatos publica checagem de uma lista de dez cidades do Nordeste com mais votos em Lula que habitantes." },
    { date: "2022-10-07", text: "O Comprova publica checagem da mesma lista." },
    { date: "2026-10-25", text: "Ocorre o 2º turno da eleição presidencial de 2026." },
    { date: "2026-11-05", text: "O Aos Fatos publica que a lista voltou a circular e é falsa." },
    { date: "2026-11-06", text: "O Gazeta do Paraná reúne a checagem entre as alegações da nova onda de boatos." },
  ],
  content: `
    <h2>O que as fontes dizem</h2>
    <p>Posts mostram uma tabela com dez cidades em que Lula teria recebido mais votos do que o número de moradores. Segundo o <a href="https://www.aosfatos.org/noticias/lista-cidades-mais-votos-que-habitantes/" target="_blank" rel="noopener noreferrer nofollow">Aos Fatos</a>, a lista é falsa: Barragem e Nova Liberdade não existem, Porto de Pedras fica em Alagoas e Joaçaba, em Santa Catarina, e os números de população e de votos não correspondem aos dados do IBGE e do TSE. O TSE disse à agência que nenhum dos municípios tem população menor do que os votos recebidos pelas candidaturas.</p>
    <p>O <a href="https://gazetadoparana.com.br/publico/nova-onda-de-fake-news-usa-relatorio-falso-biometria-e-dados-de-cidades-para-questionar-eleicoes-de" target="_blank" rel="noopener noreferrer nofollow">Gazeta do Paraná</a> registra o mesmo achado e dá um exemplo: Nossa Senhora da Glória (SE) tem 41.212 habitantes no Censo 2022, segundo a matéria, e não os 3.053 da lista.</p>

    <h2>A lista já circulava em 2022</h2>
    <p>Os números da tabela, como 25.687 habitantes e 31.338 votos para “Barragem”, aparecem na <a href="https://www.aosfatos.org/noticias/cidades-nordeste-nao-registraram-mais-votos-lula-que-total-habitantes/" target="_blank" rel="noopener noreferrer nofollow">checagem do Aos Fatos de 5 de outubro de 2022</a>. Dois dias depois, o <a href="https://www.correio24horas.com.br/noticia/nid/post-inventa-dados-sobre-cidades-para-insinuar-fraude-eleitoral-a-favor-de-lula" target="_blank" rel="noopener noreferrer nofollow">Comprova</a>, em texto republicado pelo Jornal Correio, mostrou que a mesma mensagem usava dados inventados. O Aos Fatos diz, na checagem de 2026, que não é a primeira vez que a peça circula.</p>

    <h2>Por que o veredito é Falso</h2>
    <p>A lista não resiste à conferência mais simples: cidades que não existem, estados trocados e números que não coincidem com o Censo nem com o TSE. Como a mesma tabela já havia sido desmentida em 2022, o material não é uma descoberta nova sobre a eleição de 2026. Isso não significa que um caso real de diferença entre eleitores e moradores não possa existir, mas essa é outra discussão, que tratamos na checagem sobre <a href="/checagem/numero-eleitores-maior-que-habitantes-bahia-nao-prova-fraude">eleitores e habitantes na Bahia</a>. A mesma régua vale para qualquer candidato. Veja o painel de <a href="/eleicoes">Eleições 2026</a> e outras <a href="/checagem">checagens</a>.</p>
  `,
};
