import type { FactCheck } from "@/lib/types";

export const checagem: FactCheck = {
  slug: "exercito-apuracao-paralela-385-urnas-2-turno-2026",
  title: "Apuração paralela com 385 urnas é história de 2022, e não de 2026",
  summary:
    "A mensagem reaproveita uma reportagem de 2022 sobre 385 urnas. O TSE negou então qualquer acesso especial das Forças Armadas, e o decreto de 2026 trata de apoio.",
  author: "Equipe Política Diária",
  verdict: "fora-de-contexto",
  quick:
    "Fora de contexto. A história de militares coletando dados de 385 urnas vem de uma reportagem de 2022, desmentida então pelo TSE. Não localizamos anúncio de apuração paralela para o 2º turno de 2026, e o decreto de julho prevê apoio mediante pedido do TSE.",
  claim: {
    text: "As Forças Armadas fariam, pela primeira vez, uma apuração paralela em tempo real no segundo turno de 2026, com militares coletando os boletins de 385 urnas.",
    origin:
      "Publicações em redes sociais na campanha do 2º turno, registradas pelo Boatos.org em 11/10/2026.",
    attribution: "Publicações em redes sociais",
  },
  date: "2026-10-17",
  checkedAt: "2026-10-17T19:55:00-03:00",
  updated: "2026-10-17",
  topic: "Eleições 2026",
  points: [
    {
      status: "verdade",
      text: "A reportagem existiu, mas é de 2022. Segundo a nota do TSE de 12/9/2022, a Folha de S.Paulo noticiou que o Comando de Defesa Cibernética do Exército receberia fotos dos QR Codes dos boletins de 385 urnas para uma contagem independente.",
    },
    {
      status: "falso",
      text: "Em 2022, o TSE negou haver parceria ou acordo com as Forças Armadas que desse acesso diferenciado, em tempo real, aos dados de totalização. Segundo o tribunal, a totalização é competência constitucional da Justiça Eleitoral.",
    },
    {
      status: "falso",
      text: "O Boatos.org diz não ter encontrado anúncio oficial de apuração paralela para 2026 e afirma que o TSE descreve o papel dos militares como apoio logístico e de segurança.",
    },
    {
      status: "verdade",
      text: "As Forças Armadas têm papel nas eleições de 2026. O decreto de 20/7/2026, noticiado pela Agência Brasil, autoriza o emprego militar na votação e na apuração e em apoio logístico, mediante solicitação do TSE. A notícia não descreve contagem própria de votos.",
    },
    {
      status: "atencao",
      text: "A página do TSE sobre o tema em 2026 bloqueou o acesso automático (erro 403). Por isso o veredito se apoia em duas checagens e na nota de 2022 reproduzida pela imprensa, e não confirma o texto vigente do tribunal.",
    },
    {
      status: "atencao",
      text: "Qualquer pessoa pode conferir os resultados: segundo a nota do TSE de 2022, os boletins de urna são publicados na internet após o fim da votação e podem ser somados livremente.",
    },
  ],
  sources: [
    {
      label: "Exército vai fazer apuração paralela pela 1ª vez no 2º turno das eleições de 2026?",
      publisher: "Boatos.org",
      url: "https://www.boatos.org/politica/exercito-vai-fazer-apuracao-paralela-pela-1a-vez-no-2o-turno-das-eleicoes-de-2026.html",
      kind: "agencia",
      note: "Registra a mensagem de 2026, mostra que ela recicla uma reportagem de setembro de 2022 e informa não haver anúncio oficial de apuração paralela em 2026.",
      published: "2026-10-11",
    },
    {
      label: "Forças Armadas não farão apuração paralela das eleições, diz TSE",
      publisher: "Polêmica Paraíba",
      url: "https://www.polemicaparaiba.com.br/brasil/forcas-armadas-nao-farao-apuracao-paralela-das-eleicoes-diz-tse/",
      kind: "imprensa",
      note: "Reproduz a nota do TSE de 12/9/2022: sem parceria nem acesso diferenciado em tempo real; totalização é competência da Justiça Eleitoral; boletins de urna publicados na internet. Nota de 2022, atualizada em 2025.",
      published: "2022-09-12",
    },
    {
      label: "Decreto autoriza atuação das Forças Armadas nas eleições de 2026",
      publisher: "Agência Brasil",
      url: "https://agenciabrasil.ebc.com.br/politica/noticia/2026-07/decreto-autoriza-atuacao-das-forcas-armadas-nas-eleicoes-de-2026",
      kind: "imprensa",
      note: "Decreto nº 13.073, de 20/7/2026, publicado no Diário Oficial em 21/7: emprego mediante solicitação do TSE, que define as localidades. Não cita apuração paralela.",
      published: "2026-07-21",
    },
  ],
  timeline: [
    { date: "2022-09-12", text: "O TSE nega parceria com as Forças Armadas para apurar votos, em resposta a reportagem da Folha de S.Paulo sobre 385 urnas." },
    { date: "2026-07-21", text: "Sai no Diário Oficial o decreto que autoriza o emprego das Forças Armadas nas eleições de 2026, a pedido do TSE." },
    { date: "2026-10-11", text: "O Boatos.org publica a checagem da mensagem sobre apuração paralela no 2º turno." },
  ],
  content: `
    <h2>O que as fontes dizem</h2>
    <p>Na campanha do segundo turno, circularam publicações dizendo que as Forças Armadas fariam uma apuração paralela em tempo real, com militares coletando dados de 385 urnas. O <a href="https://www.boatos.org/politica/exercito-vai-fazer-apuracao-paralela-pela-1a-vez-no-2o-turno-das-eleicoes-de-2026.html" target="_blank" rel="noopener noreferrer nofollow">Boatos.org</a> checou a mensagem em 11 de outubro e concluiu que ela reaproveita uma notícia de setembro de 2022, sem anúncio oficial equivalente em 2026.</p>
    <p>A notícia original, segundo a nota do TSE reproduzida pelo <a href="https://www.polemicaparaiba.com.br/brasil/forcas-armadas-nao-farao-apuracao-paralela-das-eleicoes-diz-tse/" target="_blank" rel="noopener noreferrer nofollow">Polêmica Paraíba</a>, foi publicada pela Folha de S.Paulo em 2022 e falava em fotos dos QR Codes de boletins de 385 urnas para uma contagem independente do Exército. O TSE respondeu na época que não havia parceria nem acesso diferenciado, em tempo real, aos dados de totalização.</p>

    <h2>O papel das Forças Armadas em 2026</h2>
    <p>As Forças Armadas participam do processo, mas em outra função. A <a href="https://agenciabrasil.ebc.com.br/politica/noticia/2026-07/decreto-autoriza-atuacao-das-forcas-armadas-nas-eleicoes-de-2026" target="_blank" rel="noopener noreferrer nofollow">Agência Brasil</a> informa que o decreto de 20 de julho de 2026 autoriza o emprego militar na votação e na apuração, além de apoio logístico, sempre mediante solicitação do TSE, que define as localidades. A reportagem não descreve contagem própria de votos. Tribunais regionais também têm pedido força federal para o segundo turno, como mostra a <a href="/noticias/tre-rj-pede-tropas-federais-segundo-turno">cobertura da Política Diária</a>.</p>

    <h2>Por que o veredito é Fora de contexto</h2>
    <p>A reportagem de 2022 existiu, e por isso o veredito não é Falso. O que as fontes não sustentam é a conclusão de que o mesmo procedimento ocorrerá em 2026, como novidade. A negativa do TSE que consultamos é de 2022, e a página do tribunal sobre 2026 bloqueou o acesso automático, o que limita a checagem. A mesma régua vale para qualquer alegação sobre o processo eleitoral, venha de que campo vier. Para conferir, os boletins de urna são públicos, e o resultado da disputa está no <a href="/eleicoes">painel de Eleições 2026</a>.</p>
  `,
};
