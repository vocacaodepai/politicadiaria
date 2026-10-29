import type { FactCheck } from "@/lib/types";

export const checagem: FactCheck = {
  slug: "soma-tres-boletins-urna-teixeira-de-freitas-nao-comprova-fraude",
  title: "Soma de três boletins de urna em Teixeira de Freitas (BA) não comprova fraude",
  summary:
    "Vídeo de suposto fiscal diz que três boletins mostram 164 votos de vantagem para Flávio, e não os 93 do TSE. O município tem 342 seções, e a soma total bate com o TSE.",
  author: "Equipe Política Diária",
  verdict: "enganoso",
  quick:
    "Enganoso. Somar apenas três boletins de urna não dá o resultado do município. Segundo o TSE e o Aos Fatos, Teixeira de Freitas tem 342 seções, e a soma de todas elas dá 93 votos de vantagem para Flávio Bolsonaro, o número oficial.",
  claim: {
    text: "Um homem que diz ter sido fiscal de partido em Teixeira de Freitas (BA) soma três boletins de urna, afirma que Flávio Bolsonaro teve 164 votos a mais que Lula nessas seções e diz que isso difere dos 93 votos de vantagem do site do TSE, o que indicaria fraude.",
    origin:
      "Vídeo publicado em redes sociais e republicado no Instagram, com legendas que falam em “denúncia” e em diferença entre os boletins impressos e o site do TSE, segundo o Aos Fatos. Publicações com o conteúdo reuniam ao menos 1.200 interações até a tarde de 28/10/2026.",
    firstSeen: "2026-10-28",
    attribution: "Homem que se apresenta como ex-fiscal de partido, segundo o TSE e o Aos Fatos",
  },
  date: "2026-10-29",
  checkedAt: "2026-10-29T13:43:00-03:00",
  updated: "2026-10-29",
  topic: "Eleições 2026",
  points: [
    {
      status: "verdade",
      text: "O resultado oficial de Teixeira de Freitas no 2º turno foi apertado. Segundo o painel de resultados do TSE, citado pelo Aos Fatos, Flávio Bolsonaro (PL) teve 41.454 votos e Lula (PT) teve 41.361, uma diferença de 93 votos.",
    },
    {
      status: "falso",
      text: "Três boletins não representam o município. O TSE informa que Teixeira de Freitas tem 303 seções principais (342 com as agregadas), e que a diferença obtida em três seções foi superada quando somados os resultados das demais.",
    },
    {
      status: "falso",
      text: "Não há divergência entre os boletins e o site. O Aos Fatos somou seção por seção, com base em levantamento do Nexo, e obteve os mesmos números divulgados pelo TSE.",
    },
    {
      status: "atencao",
      text: "O TSE e o Aos Fatos não contestam a existência dos três boletins mostrados, e sim a conclusão de que a soma deles indicaria fraude. Esta checagem não verificou a identidade nem a atuação de quem aparece no vídeo.",
    },
    {
      status: "atencao",
      text: "O número de seções varia conforme a contagem: 303 principais, segundo o TSE, ou 342 com as agregadas, número citado também pelo Aos Fatos. As duas contagens levam à mesma conclusão.",
    },
  ],
  sources: [
    {
      label: "Soma de três boletins de urna não comprova fraude na eleição presidencial em Teixeira de Freitas (BA)",
      publisher: "Justiça Eleitoral (Fato ou Boato)",
      url: "https://www.justicaeleitoral.jus.br/fato-ou-boato/checagens/2026/soma-de-tres-boletins-de-urna-nao-comprova-fraude-na-eleicao-presidencial-em-teixeira-de-freitas-ba",
      kind: "primaria",
      note: "Descreve o vídeo, explica que a totalização soma todas as seções e informa 303 seções principais e diferença de 93 votos no município. Publicada em 28/10/2026, às 11h20.",
      published: "2026-10-28",
    },
    {
      label: "Soma de votos de três seções eleitorais na BA não comprova fraude",
      publisher: "Aos Fatos",
      url: "https://www.aosfatos.org/noticias/soma-votos-tres-secoes-ba-nao-comprova-fraude/",
      kind: "agencia",
      note: "Refaz a soma de todas as seções do município e obtém os mesmos números do TSE: 41.454 votos para Flávio Bolsonaro e 41.361 para Lula. Cita 342 seções no total. Publicada em 28/10/2026.",
      published: "2026-10-28",
    },
  ],
  timeline: [
    { date: "2026-10-25", text: "Ocorre o 2º turno. Lula é reeleito com 51,79% dos votos válidos, segundo o Aos Fatos com dados do TSE." },
    { date: "2026-10-28", text: "O vídeo circula no Instagram e em outras redes. No mesmo dia, o TSE publica o esclarecimento no Fato ou Boato e o Aos Fatos publica sua checagem." },
  ],
  content: `
    <h2>O que as fontes dizem</h2>
    <p>Segundo o <a href="https://www.justicaeleitoral.jus.br/fato-ou-boato/checagens/2026/soma-de-tres-boletins-de-urna-nao-comprova-fraude-na-eleicao-presidencial-em-teixeira-de-freitas-ba" target="_blank" rel="noopener noreferrer nofollow">Fato ou Boato, da Justiça Eleitoral</a>, o vídeo mostra um homem que diz ter sido fiscal de partido somando três boletins de urna (BUs) e apontando 164 votos de vantagem para um candidato, contra 93 no painel de resultados do TSE. O tribunal classifica a afirmação como falsa e a conclusão como errônea.</p>
    <p>O <a href="https://www.aosfatos.org/noticias/soma-votos-tres-secoes-ba-nao-comprova-fraude/" target="_blank" rel="noopener noreferrer nofollow">Aos Fatos</a> chegou ao mesmo ponto por outro caminho: somou as seções do município uma a uma, usando um levantamento do Nexo, e encontrou os mesmos números do TSE. Flávio Bolsonaro (PL) teve 41.454 votos e Lula (PT), 41.361, diferença de 93.</p>

    <h2>Como o boletim de urna entra na conta</h2>
    <p>O boletim de urna é impresso no fim da votação e traz os votos apurados naquela seção. Uma via fica afixada no local, e outras vias vão para os fiscais de partido. Os mesmos dados são publicados na página e no aplicativo Resultados, do TSE, e podem ser comparados com os boletins impressos.</p>
    <p>A totalização, porém, é a soma de todas as seções. O TSE explica que uma diferença constatada em um pequeno grupo de boletins pode ser superada pelas demais seções. No caso, o tribunal informa que a vantagem das três seções foi compensada pelas outras 300 seções principais do município. O tribunal também afirma que qualquer alteração no arquivo do boletim que chega ao TSE faz o documento ser rejeitado automaticamente pelo sistema de totalização.</p>

    <h2>Por que o veredito é Enganoso</h2>
    <p>Os fatos centrais do vídeo não foram contestados pelas fontes: existem boletins com votos para cada candidato e a diferença de 93 votos no município é real. O que as fontes contrariam é a conclusão. Comparar a soma de três seções com o total de uma cidade com centenas delas não revela divergência, porque os dois números medem coisas diferentes.</p>
    <p>Esta checagem não avalia quem é o autor do vídeo nem sua intenção. O resultado nacional do 2º turno está no <a href="/eleicoes">painel de Eleições 2026</a>. Outros boatos sobre a votação e a apuração estão em <a href="/checagem/votos-apos-17h-decidiram-eleicao-lula-prorrogacao-falso">É falso que os votos depois das 17h tenham decidido a eleição</a> e nas demais <a href="/checagem">checagens do 2º turno</a>. A mesma régua vale para qualquer campo.</p>
  `,
};
