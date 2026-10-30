import type { FactCheck } from "@/lib/types";

export const checagem: FactCheck = {
  slug: "votacao-unanime-106-secoes-zero-voto-flavio-nao-prova-fraude",
  title: "Zero voto para Flávio em 106 seções no 2º turno é real, mas não prova fraude",
  summary:
    "Os números existem: Flávio Bolsonaro não teve voto em 106 seções. Segundo o Estadão Verifica e o TSE, votação unânime é comum e já ocorreu em eleições anteriores.",
  author: "Equipe Política Diária",
  verdict: "enganoso",
  quick:
    "Enganoso. O dado é verdadeiro: Flávio não recebeu voto em 106 das seções do 2º turno, 0,02% do total, quase todas em áreas indígenas, rurais e similares. O TSE explica que votação unânime em seções é comum e ocorreu em todas as eleições recentes, para candidatos dos dois lados.",
  claim: {
    text: "Seria “simplesmente impossível” Flávio Bolsonaro (PL) ter tido zero voto em 106 urnas no 2º turno e Lula (PT) ter zerado em apenas quatro, o que indicaria fraude na eleição.",
    origin:
      "Postagens em redes sociais depois do 2º turno (25/10/2026), que citam uma reportagem da Folha de S.Paulo. Uma delas foi compartilhada pelo deputado federal Gustavo Gayer (PL-GO), segundo o Estadão Verifica.",
    attribution: "Publicações em redes sociais, entre elas uma do deputado Gustavo Gayer (PL-GO), segundo o Estadão Verifica",
  },
  date: "2026-10-30",
  checkedAt: "2026-10-30T13:52:00-03:00",
  updated: "2026-10-30",
  topic: "Eleições 2026",
  points: [
    {
      status: "verdade",
      text: "Os números citados existem. Segundo levantamento do Estadão Verifica com dados públicos do TSE, Flávio Bolsonaro não recebeu votos em 106 seções no 2º turno (0,02% do total), onde Lula somou 14.860 votos. Lula não teve votos em 4 seções, onde Flávio somou 296.",
    },
    {
      status: "verdade",
      text: "Na grande maioria dessas seções, o perfil é o mesmo. Das 106, 104 ficam em comunidades indígenas, rurais, ribeirinhas, quilombolas ou assentamentos (67 em áreas indígenas). As outras duas são unidades prisionais, no Ceará e na Paraíba, segundo o Estadão Verifica.",
    },
    {
      status: "falso",
      text: "Não é verdade que isso seja indício de fraude. Em nota de 2022, o TSE diz que é fato que algumas urnas registram todos os votos para um candidato, mas é boato que isso seja prova de manipulação, e que o fenômeno beneficiou os dois lados e não é exclusivo de uma eleição.",
    },
    {
      status: "verdade",
      text: "O fenômeno aparece em eleições anteriores, segundo o TSE: em 2022, 143 seções votaram só em Lula e 4 só em Bolsonaro no 2º turno; em 2018, 328 seções votaram só em Haddad e 4 só em Bolsonaro; o TSE lista casos também em 2002, 2006, 2010 e 2014.",
    },
    {
      status: "atencao",
      text: "A reportagem da Folha citada nas postagens não foi aberta por esta checagem. O que se verifica aqui é a conclusão atribuída às postagens (“impossível” sem fraude), e não o texto do jornal.",
    },
  ],
  sources: [
    {
      label: "Votação unânime de Lula em 106 seções eleitorais não prova fraude eleitoral",
      publisher: "Estadão Verifica",
      url: "https://www.estadao.com.br/estadao-verifica/votacao-unanime-em-secoes-nao-prova-fraude/",
      kind: "agencia",
      note: "Levantamento com dados do TSE: 106 seções sem voto para Flávio (0,02%) e 4 sem voto para Lula no 2º turno; 104 das 106 em comunidades indígenas, rurais, ribeirinhas, quilombolas ou assentamentos. Classifica a alegação como enganosa. O deputado Gustavo Gayer foi procurado e não respondeu.",
      published: "2026-10-30",
    },
    {
      label: "Predominância de votos para um dos candidatos não é indício de fraude eleitoral",
      publisher: "Justiça Eleitoral (Fato ou Boato)",
      url: "https://www.justicaeleitoral.jus.br/fato-ou-boato/checagens/2022/predominancia-de-votos-para-um-dos-candidatos-nao-e-indicio-de-fraude-eleitoral",
      kind: "primaria",
      note: "Nota da Justiça Eleitoral (publicada em 09/11/2022): votação unânime em seções é comum, beneficiou os dois candidatos em 2022 e aparece em 2002, 2006, 2010, 2014 e 2018, com os números de cada eleição.",
      published: "2022-11-09",
    },
    {
      label: "Resultados - 2026 (votação por seção eleitoral)",
      publisher: "TSE, Portal de Dados Abertos",
      url: "https://dadosabertos.tse.jus.br/dataset/resultados-2026",
      kind: "primaria",
      note: "Conjunto de dados públicos do TSE com a votação por seção eleitoral de 2026 (arquivo da Presidência e por UF), base do levantamento do Estadão Verifica. Esta checagem confirmou que o conjunto existe e é público; as contagens vêm do Estadão Verifica.",
      published: "2026-10-06",
    },
    {
      label: "Presidente do TSE anuncia reeleição de Lula e faz balanço do 2º turno das Eleições 2026",
      publisher: "Tribunal Superior Eleitoral",
      url: "https://www.tse.jus.br/comunicacao/noticias/2026/Outubro/presidente-do-tse-anuncia-reeleicao-de-lula-e-faz-balanco-do-2o-turno-das-eleicoes-2026",
      kind: "primaria",
      note: "Resultado oficial do 2º turno: Lula com 64.256.232 votos (51,79% dos válidos) e Flávio Bolsonaro com 59.826.041 (48,21%), em 499.248 urnas. Registra a presença de observadores nacionais e internacionais.",
      published: "2026-10-25",
    },
  ],
  timeline: [
    { date: "2022-11-09", text: "A Justiça Eleitoral publica a nota sobre seções com votação para um só candidato, com o histórico de 2002 a 2022." },
    { date: "2026-10-25", text: "Segundo turno. O TSE anuncia a reeleição de Lula, com 51,79% dos votos válidos." },
    { date: "2026-10-30", text: "O Estadão Verifica publica o levantamento das seções sem voto para cada candidato e classifica a alegação como enganosa." },
  ],
  content: `
    <h2>O que as fontes dizem</h2>
    <p>Depois do segundo turno, postagens passaram a dizer que seria “simplesmente impossível” Flávio Bolsonaro (PL) ter zero voto em 106 urnas, enquanto Lula (PT) teria zerado em apenas quatro. A conclusão sugerida é de fraude. Segundo o <a href="https://www.estadao.com.br/estadao-verifica/votacao-unanime-em-secoes-nao-prova-fraude/" target="_blank" rel="noopener noreferrer nofollow">Estadão Verifica</a>, uma das postagens foi disseminada pelo deputado federal <a href="/congresso/deputados/gustavo-gayer-220568">Gustavo Gayer (PL-GO)</a>, que foi procurado e não respondeu.</p>
    <p>Os números, porém, existem. O Estadão Verifica cruzou dados públicos do <a href="https://dadosabertos.tse.jus.br/dataset/resultados-2026" target="_blank" rel="noopener noreferrer nofollow">Portal de Dados Abertos do TSE</a> e contou 106 seções sem nenhum voto para Flávio no segundo turno, o equivalente a 0,02% das seções do País. Nelas, Lula recebeu 14.860 votos. Lula ficou sem votos em 4 seções, onde Flávio somou 296. No primeiro turno, foram 81 seções sem voto para Flávio e 8 sem voto para Lula.</p>

    <h2>Onde ficam essas seções</h2>
    <p>Segundo o Estadão Verifica, 104 das 106 seções sem voto para Flávio ficam em comunidades indígenas, rurais, ribeirinhas, quilombolas ou assentamentos, e 67 delas em áreas indígenas. As outras duas são unidades prisionais: o Centro de Detenção Provisória de Aquiraz (CE) e o Presídio Regional de Sapé (PB), onde Lula somou 42 votos. Pelo levantamento, as concentrações são maiores no Amazonas (30 seções), Maranhão (20), Pará (16) e Roraima (8). As seções sem voto para Lula ficam no Pará (2) e no Rio Grande do Sul (2).</p>
    <p>A checagem não faz análise sociológica dessas comunidades. O que ela mostra é que o fenômeno é conhecido e documentado pela Justiça Eleitoral, como detalhado a seguir.</p>

    <h2>O que a Justiça Eleitoral já explicou</h2>
    <p>Em nota de novembro de 2022, a <a href="https://www.justicaeleitoral.jus.br/fato-ou-boato/checagens/2022/predominancia-de-votos-para-um-dos-candidatos-nao-e-indicio-de-fraude-eleitoral" target="_blank" rel="noopener noreferrer nofollow">Justiça Eleitoral (Fato ou Boato)</a> afirmou que é fato que algumas urnas registraram todos os votos para um só candidato, mas que é boato tratar isso como evidência de manipulação das urnas. O texto lista, eleição por eleição, as seções com votação para um só candidato:</p>
    <ul>
      <li>2022, 2º turno: 143 seções só com votos em Lula e 4 só com votos em Bolsonaro.</li>
      <li>2018, 2º turno: 328 seções só com votos em Haddad (36.608 votos) e 4 só com votos em Bolsonaro.</li>
      <li>2014, 2º turno: 192 seções só com votos em Dilma Rousseff e 11 só com votos em Aécio Neves.</li>
      <li>2010, 2º turno: 262 seções só com votos em Dilma e 6 só com votos em José Serra.</li>
      <li>2006, 2º turno: 235 seções só com votos em Lula e 3 só com votos em Geraldo Alckmin.</li>
    </ul>
    <p>A nota registra ainda casos em 2002. Ou seja, a votação unânime em algumas seções aparece em todas as eleições presidenciais listadas, a favor de candidatos de campos diferentes.</p>

    <h2>Por que o veredito é Enganoso</h2>
    <p>O selo não é Falso porque a parte factual é verdadeira: as seções existem e os números batem com os dados do TSE, segundo o levantamento do Estadão Verifica. O que as fontes não sustentam é a conclusão de que isso seria “impossível” sem fraude. O TSE trata o fenômeno como recorrente, o número de seções sem voto para Flávio (106) é pequeno diante das cerca de 499 mil urnas do segundo turno, e a maior parte fica em comunidades indígenas, rurais e similares. Pela mesma régua, o dado não é indício em nenhum dos lados: em 2022, por exemplo, Lula teve 143 seções unânimes e Bolsonaro, 4.</p>
    <p>A checagem não analisa o texto da Folha de S.Paulo mencionado nas postagens. Para outras alegações de fraude no segundo turno, veja a checagem sobre a <a href="/checagem/soma-tres-boletins-urna-teixeira-de-freitas-nao-comprova-fraude">soma de três boletins de urna em Teixeira de Freitas (BA)</a> e a sobre o <a href="/checagem/relatorio-pericial-independente-fraude-2-turno-apocrifo-distorce-dados">“Relatório Pericial Independente”</a>. O resultado oficial está no <a href="/eleicoes">painel de Eleições 2026</a>.</p>
  `,
};
