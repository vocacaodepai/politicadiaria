import type { FactCheck } from "@/lib/types";

export const checagem: FactCheck = {
  slug: "foto-trump-abracando-flavio-miami-gerada-por-ia",
  title: "É falso que Trump tenha recepcionado Flávio Bolsonaro nos EUA; foto foi gerada por IA",
  summary:
    "Imagem de Donald Trump abraçado a Flávio Bolsonaro em um aeroporto é sintética, segundo Lupa e Chequeado. Imprensa não registrou Trump na chegada do senador.",
  author: "Equipe Política Diária",
  verdict: "falso",
  quick:
    "Falso. A foto de Trump abraçando Flávio Bolsonaro é sintética, segundo Lupa e Chequeado. Imagens da chegada do senador aos EUA, em 28/10, não mostram Trump, e ele disse só saber que o visto foi concedido.",
  claim: {
    text: "Foto mostraria Donald Trump abraçado a Flávio Bolsonaro em um aeroporto, como se o presidente dos EUA tivesse recepcionado o senador na chegada aos Estados Unidos.",
    origin:
      "Postagens no Instagram e no Facebook, com legenda dizendo que Flávio “já está em Miami como exilado político” e “com autorização de Donald Trump”. Uma delas somava 12,7 mil compartilhamentos até 29/10/2026, segundo a Lupa.",
    firstSeen: "2026-10-28",
    attribution: "Publicações em redes sociais",
  },
  date: "2026-10-29",
  checkedAt: "2026-10-29T19:41:00-03:00",
  updated: "2026-10-29",
  topic: "Eleições 2026",
  points: [
    {
      status: "falso",
      text: "A imagem foi gerada com inteligência artificial. A Lupa relata que três detectores (SynthID, Hive e ZeroGPT) apontaram origem sintética. O Chequeado diz que a Hive deu 99% de probabilidade e que o SynthID foi detectado em mais da metade da imagem.",
    },
    {
      status: "falso",
      text: "Não há registro de Trump na chegada de Flávio. Segundo o Chequeado, os vídeos do desembarque não coincidem com a foto (a camisa do senador é diferente) e não mostram Trump. A Lupa também cita que a agenda de Trump em 28/10 não previa encontro com o senador.",
    },
    {
      status: "verdade",
      text: "Flávio Bolsonaro chegou aos Estados Unidos em 28/10/2026 com a família, num jatinho que saiu da Argentina e passou pelo Equador, segundo o g1. O governo da Argentina confirmou que ele entrou no país por terra na noite de 27/10.",
    },
    {
      status: "verdade",
      text: "Perguntado sobre o caso, Trump disse em 28/10: “demos a ele uma autorização para entrar no país”, mas que não iria se envolver, segundo a Agência Brasil. Isso confirma o visto, e não uma recepção.",
    },
    {
      status: "atencao",
      text: "A legenda diz que ele estaria como “exilado político”. Essa é uma caracterização dos autores das postagens. As fontes abertas informam o visto e a entrada nos EUA, mas não descrevem asilo concedido. Fontes divergem sobre o aeroporto (g1: Opa-locka, em Miami; Chequeado: Fort Lauderdale), o que não altera o veredito.",
    },
  ],
  sources: [
    {
      label: "É falso que Trump recepcionou Flávio Bolsonaro nos EUA; imagem foi gerada com IA",
      publisher: "Agência Lupa",
      url: "https://www.agencialupa.org/verificacao/2026/10/29/e-falso-que-trump-recepcionou-flavio-bolsonaro-nos-eua-imagem-foi-gerada-com-ia/",
      kind: "agencia",
      note: "Conclui que a imagem é sintética (SynthID, Hive e ZeroGPT), que não há registros públicos de encontro recente entre os dois e que a agenda de Trump em 28/10 não previa o encontro. Lembra que o único registro dos dois juntos é de 26/05/2026.",
      published: "2026-10-29",
    },
    {
      label: "Esta foto de Flávio Bolsonaro y Donald Trump en un aeropuerto fue hecha con inteligencia artificial",
      publisher: "Chequeado",
      url: "https://chequeado.com/ultimas-noticias/esta-foto-de-flavio-bolsonaro-y-donald-trump-en-un-aeropuerto-fue-hecha-con-inteligencia-artificial/",
      kind: "agencia",
      note: "Checagem argentina independente: Hive aponta 99% de chance de IA, o Gemini detectou SynthID, e os vídeos da chegada de Flávio não coincidem com a foto nem mostram Trump.",
      published: "2026-10-28",
    },
    {
      label: "Flávio Bolsonaro chega aos Estados Unidos",
      publisher: "g1",
      url: "https://g1.globo.com/mundo/noticia/2026/10/28/voo-flavio-bolsonaro-chega-aos-eua.ghtml",
      kind: "imprensa",
      note: "Relata a chegada de Flávio, da esposa e das filhas aos EUA em 28/10, a rota por Argentina e Equador, o comunicado de migração da Argentina e que o governo americano disse que concederia vistos. A reportagem não cita encontro com Trump.",
      published: "2026-10-28",
    },
    {
      label: "Trump diz que não vai se “envolver”, após carta de Flávio Bolsonaro",
      publisher: "Agência Brasil",
      url: "https://agenciabrasil.ebc.com.br/internacional/noticia/2026-10/trump-diz-que-nao-vai-se-envolver-apos-carta-de-flavio-bolsonaro",
      kind: "imprensa",
      note: "Registra a fala de Trump em 28/10: sabe que o governo deu autorização de entrada ao senador, mas não vai se envolver. Não relata encontro entre os dois.",
      published: "2026-10-28",
    },
  ],
  timeline: [
    { date: "2026-05-26", text: "Imagem de Flávio Bolsonaro com Trump, em encontro de campanha nos EUA, é divulgada pela comitiva do senador, segundo o g1 citado pela Lupa. É o único registro público dos dois juntos que a Lupa encontrou." },
    { date: "2026-10-27", text: "Flávio Bolsonaro e a família entram na Argentina por terra, às 22h50 pelo horário de Brasília, segundo a Direção Nacional de Migrações argentina citada pelo g1." },
    { date: "2026-10-28", text: "Flávio e a família chegam aos EUA. Trump diz que o governo deu autorização de entrada e que não vai se envolver. O Chequeado publica a checagem da foto." },
    { date: "2026-10-29", text: "A Lupa publica a checagem e confirma que a imagem foi gerada com inteligência artificial." },
  ],
  content: `
    <h2>O que as fontes dizem</h2>
    <p>Uma foto que circula no Instagram e no Facebook mostra o presidente dos Estados Unidos, Donald Trump, abraçado ao senador Flávio Bolsonaro (PL) em um aeroporto. A legenda sugere que Trump teria recepcionado o senador na chegada aos EUA. Segundo a <a href="https://www.agencialupa.org/verificacao/2026/10/29/e-falso-que-trump-recepcionou-flavio-bolsonaro-nos-eua-imagem-foi-gerada-com-ia/" target="_blank" rel="noopener noreferrer nofollow">Agência Lupa</a>, uma das postagens tinha 12,7 mil compartilhamentos até 29 de outubro.</p>
    <p>A Lupa concluiu que a imagem foi criada com inteligência artificial: o SynthID, ferramenta do Google, encontrou marca d’água digital, e as ferramentas Hive e ZeroGPT também apontaram origem sintética. O <a href="https://chequeado.com/ultimas-noticias/esta-foto-de-flavio-bolsonaro-y-donald-trump-en-un-aeropuerto-fue-hecha-con-inteligencia-artificial/" target="_blank" rel="noopener noreferrer nofollow">Chequeado</a>, da Argentina, analisou a mesma foto e chegou ao mesmo resultado. Apontou também sinais visuais, como a desproporção dos dedos da mão de Trump sobre o ombro do senador, e que a camisa de Flávio na foto é diferente da usada nos vídeos reais do desembarque.</p>

    <h2>O que de fato aconteceu</h2>
    <p>Segundo o <a href="https://g1.globo.com/mundo/noticia/2026/10/28/voo-flavio-bolsonaro-chega-aos-eua.ghtml" target="_blank" rel="noopener noreferrer nofollow">g1</a>, Flávio Bolsonaro chegou aos Estados Unidos em 28 de outubro com a esposa e as filhas, em um jatinho que saiu da Argentina e fez escala no Equador. A Direção Nacional de Migrações da Argentina informou que ele entrou no país por terra na noite de 27 de outubro. O g1 relata que o desembarque foi acompanhado por um policial que cumprimentou o senador, sem citar encontro com Trump, e que o governo americano havia dito que concederia vistos à família.</p>
    <p>A mesma reportagem registra que o ministro Alexandre de Moraes, do STF, havia determinado a entrega dos passaportes do senador, que é investigado, segundo a reportagem. Esses pontos são relatados pelo g1 e não fazem parte da alegação checada aqui. Em 28 de outubro, Trump disse, segundo a <a href="https://agenciabrasil.ebc.com.br/internacional/noticia/2026-10/trump-diz-que-nao-vai-se-envolver-apos-carta-de-flavio-bolsonaro" target="_blank" rel="noopener noreferrer nofollow">Agência Brasil</a>, que não faria comentário sobre a carta divulgada pelo senador, mas que sabia que os EUA haviam dado a ele “uma autorização para entrar no país”, e que não iria se envolver.</p>

    <h2>Por que o veredito é Falso</h2>
    <p>A alegação central é que Trump recepcionou Flávio e posou com ele. A foto que sustenta isso é sintética, segundo duas agências independentes, e as reportagens sobre a chegada não registram a presença de Trump. A Lupa observa ainda, com base na agenda do presidente americano, que ele não tinha encontro previsto com o senador naquele dia. As duas agências diferem sobre os horários da agenda de Trump em 28 de outubro, mas concordam que não havia evento com Flávio. O único registro público dos dois juntos que a Lupa encontrou é de 26 de maio de 2026, em encontro nos EUA.</p>
    <p>Ficam de fora desta checagem as decisões do STF e as investigações citadas pela imprensa, que seguem na Justiça. A régua é a mesma para imagens sintéticas de qualquer campo: veja, por exemplo, a checagem sobre a <a href="/checagem/renan-santos-foto-gesto-l-lula-gerada-por-ia">foto de Renan Santos fazendo o “L” de Lula</a>, e a anterior sobre a <a href="/checagem/flavio-bolsonaro-deixou-brasil-eua-apos-eleicao-montagem-g1-falsa">montagem do g1 sobre a saída de Flávio do Brasil</a>. O <a href="/eleicoes">painel de Eleições 2026</a> reúne os resultados oficiais.</p>
  `,
};
