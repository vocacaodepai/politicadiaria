import type { FactCheck } from "@/lib/types";

export const checagem: FactCheck = {
  slug: "interpol-vestido-fuga-flavio-manchete-do-globo-e-falsa",
  title: "É falsa a capa do O Globo sobre Interpol e vestido usado por Flávio em fuga",
  summary:
    "Capa atribui à Interpol a identificação de um vestido usado por Flávio Bolsonaro para fugir. A edição citada não existe, mostram Aos Fatos e Boatos.org.",
  author: "Equipe Política Diária",
  verdict: "falso",
  quick:
    "Falso. A capa não é do O Globo: segundo o Aos Fatos, a edição indicada não existe e a primeira página de 18/11 era outra. As checagens não acharam registro de que a Interpol tenha identificado um vestido.",
  claim: {
    text: "O Globo teria publicado em 18/11/2026 a manchete “Interpol identifica vestido usado por Flávio Bolsonaro na fuga para a Argentina”, com o título auxiliar “Caso do ‘vestido da rachadinha’”.",
    origin:
      "Imagem que imita a primeira página do jornal. Publicações com o conteúdo reuniam ao menos 7.000 interações nas plataformas da Meta até a tarde de 23/11, segundo o Aos Fatos.",
    attribution: "Publicações em redes sociais",
  },
  date: "2026-11-25",
  checkedAt: "2026-11-25T09:23:00-03:00",
  updated: "2026-11-25",
  topic: "Justiça",
  points: [
    {
      status: "falso",
      text: "A capa é falsa. Segundo o Aos Fatos, a edição “34.891” impressa na imagem não existe: o jornal publicou em 18/11 a edição 34.071, com outra primeira página, sem menção a Flávio Bolsonaro.",
    },
    {
      status: "falso",
      text: "Não há registro de que a Interpol tenha identificado um vestido ou de que o senador tenha usado disfarce, segundo o Aos Fatos. O Boatos.org também não encontrou informação verificável sobre a suposta identificação nem a reportagem atribuída ao jornal.",
    },
    {
      status: "falso",
      text: "Segundo o Aos Fatos, uma ferramenta de detecção da OpenAI identificou na imagem a marca d’água SynthID, sinal de que o conteúdo foi gerado por inteligência artificial.",
    },
    {
      status: "verdade",
      text: "Flávio Bolsonaro é investigado em inquéritos no STF e, em 26/10, o ministro Alexandre de Moraes mandou que ele entregasse os passaportes e o proibiu de deixar o país. A PF cancelou os documentos no dia 27, segundo a Agência Brasil. Ele deixou o Brasil e foi para os Estados Unidos, segundo o Aos Fatos.",
    },
    {
      status: "atencao",
      text: "Os meios exatos usados na saída não são conhecidos, segundo o Aos Fatos, que cita entrevista ao New York Times em que o senador diz ter organizado tudo sozinho. Isso não dá base à história do vestido.",
    },
    {
      status: "atencao",
      text: "A capa falsa mistura a história com fatos antigos sobre rachadinha. A denúncia contra Flávio nesse caso, apresentada em outubro de 2020, foi arquivada pelo Tribunal de Justiça do Rio em maio de 2022, após anulação de provas, segundo o Aos Fatos.",
    },
  ],
  sources: [
    {
      label: "O Globo não noticiou que Flávio Bolsonaro usou vestido como disfarce para fuga",
      publisher: "Aos Fatos",
      url: "https://www.aosfatos.org/noticias/flavio-bolsonaro-vestido-fuga/",
      kind: "agencia",
      note: "Classifica a capa como falsa, compara o número da edição e a primeira página de 18/11, informa a detecção de marca d’água de IA e contextualiza o caso da rachadinha e a saída do país.",
      published: "2026-11-23",
    },
    {
      label: "É falsa a capa de O Globo que afirma que Flávio Bolsonaro fugiu do Brasil vestido de mulher",
      publisher: "Boatos.org",
      url: "https://www.boatos.org/politica/flavio-bolsonaro-fugiu-do-brasil-vestido-de-mulher-e-o-globo-revelou-tudo.html",
      kind: "agencia",
      note: "Classifica como falso. Diz que a imagem imita a identidade visual do jornal e que não há reportagem nem informação verificável sobre a identificação do vestido.",
      published: "2026-11-21",
    },
    {
      label: "Polícia Federal cancela passaportes de Flávio Bolsonaro",
      publisher: "Agência Brasil",
      url: "https://agenciabrasil.ebc.com.br/politica/noticia/2026-10/policia-federal-cancela-passaportes-de-flavio-bolsonaro",
      kind: "imprensa",
      note: "Informa a decisão de Moraes de 26/10, o cancelamento dos passaportes pela PF e os inquéritos em que o senador é investigado. No dia 27 ainda não havia registro formal de saída.",
      published: "2026-10-27",
    },
  ],
  timeline: [
    { date: "2026-10-26", text: "Alexandre de Moraes manda Flávio Bolsonaro entregar os passaportes e o proíbe de deixar o país." },
    { date: "2026-10-27", text: "A Polícia Federal cancela os passaportes. O Aos Fatos aponta esta como a data da saída do Brasil." },
    { date: "2026-11-18", text: "Data impressa na capa falsa. A primeira página verdadeira do jornal nesse dia é outra." },
    { date: "2026-11-21", text: "O Boatos.org publica a checagem." },
    { date: "2026-11-23", text: "O Aos Fatos publica a checagem; as postagens somavam ao menos 7.000 interações nas plataformas da Meta." },
  ],
  content: `
    <h2>O que circulou</h2>
    <p>Uma imagem com o visual do jornal O Globo, datada de 18 de novembro, anuncia que a Interpol teria identificado um vestido usado por Flávio Bolsonaro (PL-RJ) para fugir para a Argentina. A peça liga o suposto vestido a uma ex-assessora e ao esquema de rachadinha. Segundo o <a href="https://www.aosfatos.org/noticias/flavio-bolsonaro-vestido-fuga/" target="_blank" rel="noopener noreferrer nofollow">Aos Fatos</a>, as publicações somavam ao menos 7.000 interações nas plataformas da Meta até 23 de novembro.</p>

    <h2>O que as fontes dizem</h2>
    <p>O Aos Fatos informa que o número de edição impresso na imagem, 34.891, não existe. A edição de 18 de novembro é a 34.071, e a primeira página publicada nesse dia não tratava do senador. A agência também aponta diferenças de desenho gráfico, como a posição do nome do jornal, a ausência de código de barras e a tipografia. Segundo ela, uma ferramenta de detecção da OpenAI encontrou na imagem a marca d’água SynthID, associada a conteúdo gerado por inteligência artificial.</p>
    <p>O <a href="https://www.boatos.org/politica/flavio-bolsonaro-fugiu-do-brasil-vestido-de-mulher-e-o-globo-revelou-tudo.html" target="_blank" rel="noopener noreferrer nofollow">Boatos.org</a> chegou à mesma conclusão. O site afirma que a publicação não traz endereço de reportagem, nome de jornalista nem referência que permita localizar o texto, e que não há informação verificável sobre a identificação do vestido pela Interpol.</p>

    <h2>O que é verdade sobre a saída do país</h2>
    <p>A saída do senador do Brasil é um fato distinto da história do vestido. Segundo a <a href="https://agenciabrasil.ebc.com.br/politica/noticia/2026-10/policia-federal-cancela-passaportes-de-flavio-bolsonaro" target="_blank" rel="noopener noreferrer nofollow">Agência Brasil</a>, Moraes determinou em 26 de outubro a entrega dos passaportes e proibiu a viagem, e a PF cancelou os documentos no dia seguinte. Flávio é investigado em dois inquéritos no STF, um sobre lavagem de dinheiro e outro sobre o financiamento do filme Dark Horse. Veja a notícia sobre a <a href="/noticias/moraes-flavio-passaportes-proibicao-viagem-willer-tomaz">decisão dos passaportes</a> e sobre a <a href="/noticias/pf-checa-saida-flavio-relato-infobae-jato">apuração da PF sobre a saída</a>.</p>
    <p>O Aos Fatos diz que os meios exatos dessa saída continuam desconhecidos e que as imagens disponíveis mostram o senador desembarcando nos Estados Unidos de camiseta polo preta. A falta de detalhes oficiais não confirma a versão do disfarce.</p>

    <h2>Por que o veredito é Falso</h2>
    <p>A peça atribui a um jornal uma manchete que ele não publicou e a um órgão internacional uma descoberta sem registro. As duas checagens abertas chegam ao mesmo resultado. A mesma régua vale para montagens contra qualquer campo: já checamos uma <a href="/checagem/flavio-bolsonaro-aposentadoria-70-anos-capa-o-globo-falsa">outra capa falsa atribuída ao O Globo</a>.</p>
  `,
};
