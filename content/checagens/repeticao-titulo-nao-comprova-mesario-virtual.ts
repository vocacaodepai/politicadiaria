import type { FactCheck } from "@/lib/types";

export const checagem: FactCheck = {
  slug: "repeticao-titulo-nao-comprova-mesario-virtual",
  title: "Título de mesário repetido em urnas distantes não comprova “mesários virtuais”",
  summary:
    "O TSE atribui a repetição a erro de digitação no registro de presença. O dado aparece nos registros, mas não demonstra mesário virtual nem fraude.",
  author: "Equipe Política Diária",
  verdict: "enganoso",
  quick:
    "Enganoso. Há números de título de mesário repetidos em registros de seções distantes, mas isso não prova mesários virtuais nem fraude. Segundo a Lupa e o Boatos.org, o TSE atribuiu a repetição a erro de digitação e afirma que o número digitado não comprova que o titular esteve na seção.",
  claim: {
    text: "O mesmo título de eleitor de um mesário aparece em seções a centenas de quilômetros, com poucos segundos de diferença, o que provaria a existência de mesários virtuais e fraude nas eleições de 2026.",
    origin:
      "Publicações em redes sociais, entre elas um vídeo com mais de 280 mil visualizações no X, segundo a Lupa; o Boatos.org reproduz uma publicação no Facebook e publicou a checagem em 24/11/2026.",
    attribution: "Publicações em redes sociais",
  },
  date: "2026-11-27",
  checkedAt: "2026-11-27T18:26:00-03:00",
  updated: "2026-11-27",
  topic: "Eleições 2026",
  points: [
    {
      status: "verdade",
      text: "Um mesmo número de título de mesário foi registrado em mais de uma localidade. Segundo a Lupa, o TSE tratou do caso em 23/11 e falou em erro de digitação que se repetiu em algumas localidades do país.",
    },
    {
      status: "falso",
      text: "O número repetido não prova que existam mesários virtuais. Segundo o TSE, citado pela Lupa e pelo Boatos.org, um erro na digitação pode gerar o número de um título válido que não pertence à pessoa presente na seção.",
    },
    {
      status: "falso",
      text: "As fontes abertas não apontam fraude ligada à repetição. Em declaração reproduzida pela Lupa, o TSE afirma que o erro não compromete a eleição nem pode ser considerado indício de fraude.",
    },
    {
      status: "atencao",
      text: "Segundo a Lupa, um relatório da empresa Arvor Intelligence também listou títulos repetidos, mas ressalva que os dados não comprovam fraude.",
    },
    {
      status: "atencao",
      text: "Não conferimos os registros das urnas, nem as distâncias e os intervalos citados nas publicações. A página do TSE sobre o caso não abriu na nossa consulta, e a explicação do tribunal chega aqui por meio das fontes listadas.",
    },
  ],
  sources: [
    {
      label: "Repetição de registro de título de mesário não comprova fraude em eleição",
      publisher: "Agência Lupa",
      url: "https://www.agencialupa.org/verificacao/2026/11/27/repeticao-de-registro-de-titulo-de-mesario-nao-comprova-fraude-em-eleicao/",
      kind: "agencia",
      note: "Classifica como falso, informa mais de 280 mil visualizações no X e reproduz trechos da nota do TSE de 23/11 sobre o erro de digitação.",
      published: "2026-11-27",
    },
    {
      label: "É falso que mesários “supersônicos” tenham atuado em cidades diferentes nas eleições de 2026",
      publisher: "Boatos.org",
      url: "https://www.boatos.org/politica/mesarios-supersonicos-atuaram-em-cidades-diferentes-durante-as-eleicoes-de-2026.html",
      kind: "agencia",
      note: "Reproduz os exemplos que circularam e a explicação do TSE: digitação errada, identificação dos mesários por convocação, ata e biometria, e urnas sem conexão durante a votação.",
      published: "2026-11-24",
    },
    {
      label: "TSE desmente boato de “mesários virtuais” em urnas eletrônicas",
      publisher: "Painel Político",
      url: "https://painelpolitico.com/tse-desmente-boato-de-mesarios-virtuais-em-urnas-eletronicas",
      kind: "imprensa",
      note: "Relata a resposta da Justiça Eleitoral e descreve o registro de presença: o mesário digita o próprio título no terminal e registra a biometria.",
      published: "2026-11-24",
    },
  ],
  timeline: [
    { date: "2026-11-23", text: "Segundo a Lupa e o Boatos.org, o TSE publica esclarecimento sobre os títulos repetidos." },
    { date: "2026-11-24", text: "O Boatos.org publica checagem e classifica a história como falsa." },
    { date: "2026-11-27", text: "A Lupa publica verificação e também classifica a alegação como falsa." },
  ],
  content: `
    <h2>O que as fontes dizem</h2>
    <p>As publicações partem de registros de urnas em que o mesmo número de título de um mesário aparece em cidades distantes. O <a href="https://www.boatos.org/politica/mesarios-supersonicos-atuaram-em-cidades-diferentes-durante-as-eleicoes-de-2026.html" target="_blank" rel="noopener noreferrer nofollow">Boatos.org</a> reproduz exemplos que circularam com cidades do Pará, de São Paulo, da Bahia e do Rio de Janeiro, e intervalos que iam de segundos a poucos minutos. A conclusão das postagens era a de que uma pessoa não poderia estar nos dois lugares, logo haveria mesários virtuais.</p>
    <p>Segundo a <a href="https://www.agencialupa.org/verificacao/2026/11/27/repeticao-de-registro-de-titulo-de-mesario-nao-comprova-fraude-em-eleicao/" target="_blank" rel="noopener noreferrer nofollow">Agência Lupa</a>, o TSE atribuiu a repetição, em nota de 23 de novembro, a “um erro de digitação do número do título de eleitor, que se repetiu em algumas localidades do país”. O tribunal acrescentou: “Isso não compromete a eleição, nem pode ser considerado um indício de fraude”.</p>
    <p>A presença do mesário é registrada com a digitação do título e a coleta da biometria, segundo a Lupa e o <a href="https://painelpolitico.com/tse-desmente-boato-de-mesarios-virtuais-em-urnas-eletronicas" target="_blank" rel="noopener noreferrer nofollow">Painel Político</a>. O número digitado, sozinho, não comprova que o titular daquela inscrição esteve fisicamente na seção, de acordo com a explicação do TSE reproduzida pela agência.</p>

    <h2>Como saber quem trabalhou na seção</h2>
    <p>O Boatos.org relata que, segundo o TSE, a identificação de quem atuou é feita pelas convocações dos cartórios eleitorais, pela ata da mesa receptora e pela impressão digital coletada. Ainda segundo essa explicação, as urnas não têm conexão com a internet durante a votação e não fazem consultas em tempo real.</p>
    <p>O registro de presença de mesário é um procedimento diferente do voto. As fontes abertas não relacionam a repetição do número a mudança em votos, boletins ou totalização.</p>

    <h2>Por que o veredito é Enganoso</h2>
    <p>A Lupa e o Boatos.org classificam a história como falsa. Usamos um selo menos severo porque o dado de partida, o número repetido, é reconhecido na explicação do próprio tribunal. O que as fontes não sustentam é a conclusão: que a repetição revele mesários inexistentes ou fraude.</p>
    <p>Outras alegações sobre as urnas do 2º turno já foram verificadas aqui, como a de que <a href="/checagem/mesarios-votam-no-lugar-de-ausentes-apos-17h">mesários votariam no lugar de ausentes</a>, a dos <a href="/checagem/oito-milhoes-votos-sem-biometria-nao-provam-fraude-falso">8 milhões de votos sem biometria</a> e a da <a href="/checagem/soma-tres-boletins-urna-teixeira-de-freitas-nao-comprova-fraude">soma de boletins de urna em Teixeira de Freitas</a>.</p>
  `,
};
