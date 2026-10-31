import type { FactCheck } from "@/lib/types";

export const checagem: FactCheck = {
  slug: "numero-eleitores-maior-que-habitantes-bahia-nao-prova-fraude",
  title: "23 cidades da Bahia com mais eleitores que habitantes: o dado é real, mas não prova fraude",
  summary:
    "O dado de 23 cidades baianas com mais eleitores que habitantes é real, mas Lupa, Aos Fatos e A Tarde mostram que ele não prova fraude.",
  author: "Equipe Política Diária",
  verdict: "enganoso",
  quick:
    "Enganoso. É verdade que 23 municípios baianos têm mais eleitores que habitantes, segundo levantamento de julho. Mas as fontes explicam que isso não indica fraude, e a própria reportagem original diz que o fenômeno não expressa, obrigatoriamente, irregularidade.",
  claim: {
    text: "A Bahia teria 23 municípios com mais eleitores do que habitantes, o que provaria fraude na eleição, inclusive com votos de mortos.",
    origin:
      "Publicações no X, no Facebook e no Instagram que ressurgiram depois do segundo turno de 25/10/2026, segundo a Lupa. Uma imagem no X tinha 84,8 mil visualizações em 30/10.",
    firstSeen: "2026-07-28",
    attribution: "Publicações em redes sociais",
  },
  date: "2026-10-31",
  checkedAt: "2026-10-31T08:12:00-03:00",
  updated: "2026-10-31",
  topic: "Eleições 2026",
  points: [
    {
      status: "verdade",
      text: "Em 28/7/2026, o jornal A Tarde noticiou que 23 municípios baianos têm mais eleitores que habitantes em 2026 (eram 36 em 2022). No país, são 733 municípios, 701 deles com menos de 10 mil moradores.",
    },
    {
      status: "falso",
      text: "A diferença não indica fraude. A reportagem de A Tarde afirma que o fenômeno não expressa, obrigatoriamente, uma irregularidade eleitoral. Quem se muda nem sempre transfere o título, e as estimativas de população podem estar defasadas.",
    },
    {
      status: "falso",
      text: "A alegação de votos de mortos não se sustenta: segundo o Aos Fatos, que cita o TRE-BA, os cartórios informam os óbitos mensalmente à Justiça Eleitoral e os títulos são cancelados. Menores de 16 anos não têm título.",
    },
    {
      status: "atencao",
      text: "A cientista política Luciana Santana, ouvida por A Tarde, defende monitoramento contínuo do fenômeno. Isso é diferente de afirmar que houve votos fraudulentos.",
    },
  ],
  sources: [
    {
      label: "Bahia tem 23 municípios com mais eleitores que habitantes em 2026",
      publisher: "A Tarde",
      url: "https://atarde.com.br/eleicoes/bahia-tem-23-municipios-com-mais-eleitores-que-habitantes-em-2026-1396858",
      kind: "imprensa",
      note: "Reportagem original de 28/7/2026: 23 municípios na Bahia e 733 no país. Explica a migração sem transferência do título e diz que o fenômeno não expressa, obrigatoriamente, irregularidade.",
      published: "2026-07-28",
    },
    {
      label: "Número maior de eleitores que de habitantes na Bahia não indica fraude",
      publisher: "Aos Fatos",
      url: "https://www.aosfatos.org/noticias/numero-maior-eleitores-habitantes-bahia/",
      kind: "agencia",
      note: "Checagem de 13/8/2026 com explicação do TRE-BA: domicílio eleitoral desatualizado, cancelamento de títulos de mortos e identificação do eleitor na seção.",
      published: "2026-08-13",
    },
    {
      label: "Número de eleitores maior que o de habitantes em cidades da Bahia não indica fraude",
      publisher: "Agência Lupa",
      url: "https://www.agencialupa.org/jornalismo/2026/10/30/numero-de-eleitores-maior-que-o-de-habitantes-em-cidades-da-bahia-nao-indica-fraude/",
      kind: "agencia",
      note: "Verificação de 30/10/2026 (selo “falta contexto”): o dado foi tirado de contexto e reaparece após o segundo turno. Lembra que a urna só aceita eleitores da seção e que há checagem de identidade.",
      published: "2026-10-30",
    },
  ],
  timeline: [
    { date: "2026-07-28", text: "A Tarde publica o levantamento: 23 municípios baianos com mais eleitores que habitantes." },
    { date: "2026-08-13", text: "O Aos Fatos checa posts que usavam o dado como prova de fraude." },
    { date: "2026-10-25", text: "Segundo turno da eleição presidencial." },
    { date: "2026-10-30", text: "A Lupa publica a verificação das postagens que voltaram a circular após o segundo turno." },
  ],
  content: `
    <h2>O que as fontes dizem</h2>
    <p>O número tem origem real. Em 28 de julho de 2026, <a href="https://atarde.com.br/eleicoes/bahia-tem-23-municipios-com-mais-eleitores-que-habitantes-em-2026-1396858" target="_blank" rel="noopener noreferrer nofollow">A Tarde</a> noticiou que 23 municípios da Bahia tinham mais eleitores do que habitantes em 2026, contra 36 em 2022. No país, eram 733 municípios, 701 deles com menos de 10 mil moradores. A reportagem explica que cidades pequenas perdem população para centros maiores e que quem se muda nem sempre transfere o título de eleitor.</p>
    <p>Segundo o <a href="https://www.aosfatos.org/noticias/numero-maior-eleitores-habitantes-bahia/" target="_blank" rel="noopener noreferrer nofollow">Aos Fatos</a>, o TRE-BA informou que os óbitos são comunicados mensalmente pelos cartórios e que os títulos de falecidos são cancelados, e que a urna só aceita votos de eleitores da lista da seção, com identificação no local. A <a href="https://www.agencialupa.org/jornalismo/2026/10/30/numero-de-eleitores-maior-que-o-de-habitantes-em-cidades-da-bahia-nao-indica-fraude/" target="_blank" rel="noopener noreferrer nofollow">Agência Lupa</a> reforça que o dado voltou a circular após o segundo turno, sem o contexto da reportagem original.</p>

    <h2>Por que o veredito é Enganoso</h2>
    <p>O número de municípios é verdadeiro, mas a conclusão de que ele prova fraude não é sustentada por nenhuma das fontes. Comparar o eleitorado de 2026 com estimativas de população do IBGE de 2025 gera diferenças que as fontes atribuem a migração e a dados defasados. Nenhuma das fontes abertas identificou voto irregular por causa disso. Esta checagem não afirma que o sistema seja imune a falhas: afirma que este dado, sozinho, não demonstra fraude. A mesma régua foi aplicada à checagem sobre a <a href="/checagem/soma-tres-boletins-urna-teixeira-de-freitas-nao-comprova-fraude">soma de três boletins de urna na Bahia</a>. Veja também o painel <a href="/eleicoes">Eleições 2026</a>.</p>
  `,
};
