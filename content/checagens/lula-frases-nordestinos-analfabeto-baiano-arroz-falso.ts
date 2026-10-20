import type { FactCheck } from "@/lib/types";

export const checagem: FactCheck = {
  slug: "lula-frases-nordestinos-analfabeto-baiano-arroz-falso",
  title: "Post distorce e inventa falas de Lula sobre nordestinos, dizem Lupa e Aos Fatos",
  summary:
    "Três frases atribuídas a Lula sobre nordestinos vêm de falas de 2017 e 2022 tiradas de contexto ou de um boato de 2015. Lupa e Aos Fatos classificam o post como falso.",
  author: "Equipe Política Diária",
  verdict: "falso",
  quick:
    "Falso. Lula não disse as três frases. Uma é trecho de 2022 em que ele citava Bolsonaro, outra é manipulação de entrevista de 2017, e a do grão de arroz não tem registro público, segundo Lupa e Aos Fatos.",
  claim: {
    text: "Post no X atribui a Lula três frases ofensivas sobre nordestinos: que só venceu eleições porque o povo nordestino é analfabeto, que compra votos com um grão de arroz e que compraria um baiano por R$ 10.",
    origin:
      "Publicação no X, checada pela Lupa em 15/10/2026. O Aos Fatos já havia publicado checagem do mesmo conteúdo em 7/10/2026.",
    attribution: "Publicações em redes sociais",
  },
  date: "2026-10-20",
  checkedAt: "2026-10-20T19:55:00-03:00",
  updated: "2026-10-20",
  topic: "Eleições 2026",
  points: [
    {
      status: "falso",
      text: "A frase sobre o povo nordestino analfabeto vem de discurso de 6/10/2022 em São Bernardo do Campo. Lula citava o que disse o então adversário, Jair Bolsonaro, e não falava de si.",
    },
    {
      status: "falso",
      text: "A frase sobre R$ 10 vem de entrevista à Rádio Metrópole em agosto de 2017, sobre inclusão de pobres no consumo: Você dá 10 reais para um pobre, vira um consumidor. Não trata de compra de votos.",
    },
    {
      status: "falso",
      text: "A do grão de arroz não tem registro público de ter sido dita, segundo o Aos Fatos. A Lupa liga o boato a uma palestra de 2015 em que Lula ironizava pastores evangélicos e a um site que usou indevidamente a marca do SBT.",
    },
    {
      status: "atencao",
      text: "A Secom da Presidência também classificou o conteúdo como falso, segundo o Aos Fatos. O que vale é a conferência das falas originais, apontadas pelas duas agências.",
    },
  ],
  sources: [
    {
      label: "Post distorce falas de Lula sobre analfabetismo e compra de votos no Nordeste",
      publisher: "Agência Lupa",
      url: "https://www.agencialupa.org/verificacao/2026/10/15/post-distorce-falas-de-lula-sobre-analfabetismo-e-compra-de-votos-no-nordeste/",
      kind: "agencia",
      note: "Localiza a data e o contexto de cada uma das três frases e aponta a manipulação.",
      published: "2026-10-15",
    },
    {
      label: "Posts distorcem e inventam falas de Lula sobre nordestinos",
      publisher: "Aos Fatos",
      url: "https://www.aosfatos.org/noticias/falas-lula-nordestinos/",
      kind: "agencia",
      note: "Chega às mesmas origens (discurso de 2022, entrevista de 2017, boato de 2015) e informa que a Secom classificou o conteúdo como falso.",
      published: "2026-10-07",
    },
  ],
  timeline: [
    { date: "2017-08-18", text: "Entrevista de Lula à Rádio Metrópole, de Salvador, da qual sai a frase dos R$ 10." },
    { date: "2022-10-06", text: "Discurso de Lula em São Bernardo do Campo, em que cita a fala de Bolsonaro sobre analfabetismo no Nordeste." },
    { date: "2026-10-07", text: "O Aos Fatos publica a checagem." },
    { date: "2026-10-15", text: "A Lupa publica a checagem do post no X." },
  ],
  content: `
    <h2>O que as fontes dizem</h2>
    <p>Segundo a <a href="https://www.agencialupa.org/verificacao/2026/10/15/post-distorce-falas-de-lula-sobre-analfabetismo-e-compra-de-votos-no-nordeste/" target="_blank" rel="noopener noreferrer nofollow">Lupa</a>, a frase sobre analfabetismo vem de discurso de 6 de outubro de 2022, no qual Lula respondia a Jair Bolsonaro, que havia relacionado o analfabetismo no Nordeste à vitória do petista na região. O trecho foi cortado para parecer confissão. O <a href="https://www.aosfatos.org/noticias/falas-lula-nordestinos/" target="_blank" rel="noopener noreferrer nofollow">Aos Fatos</a> transcreve o começo da fala: o adversário disse que ele só ganhou porque o povo nordestino é analfabeto, e em seguida Lula afirma que analfabetismo não é responsabilidade das pessoas.</p>
    <p>A frase dos R$ 10 vem de entrevista de agosto de 2017 à Rádio Metrópole, de Salvador, sobre incluir pobres no mercado de consumo. A do grão de arroz, segundo o Aos Fatos, não tem registro público e nasce de boato de 2015. A Lupa a liga a uma palestra em que Lula ironizava pastores evangélicos e a um site que usou de forma fraudulenta a marca do SBT.</p>

    <h2>Por que o veredito é Falso</h2>
    <p>As duas agências, de forma independente, chegam às mesmas fontes originais: uma frase foi tirada de contexto, outra foi manipulada e a terceira não tem registro. O veredito vale para a atribuição das frases, não para a avaliação de qualquer outra declaração do presidente. A mesma régua se aplica a falas atribuídas a qualquer candidato: ver o trecho completo, a data e o contexto antes de compartilhar. Veja também outras <a href="/checagem">checagens do segundo turno</a> e o <a href="/eleicoes">painel de Eleições 2026</a>.</p>
  `,
};
