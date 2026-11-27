import type { FactCheck } from "@/lib/types";

export const checagem: FactCheck = {
  slug: "projeto-pt-15-por-cento-dividendos-nao-cita-mei",
  title: "Post engana sobre projeto do PT para taxar MEIs em 15%: texto trata de dividendos",
  summary:
    "Líder do PT propôs 15% sobre lucros e dividendos sem citar o MEI. Dias depois, houve outra versão por faixas e pedidos de retirada dos dois textos.",
  author: "Equipe Política Diária",
  verdict: "enganoso",
  quick:
    "Enganoso. O PL 5.854/2026, do líder do PT e de outros deputados, previa 15% de Imposto de Renda sobre lucros e dividendos pagos a pessoas físicas, de empresas de qualquer regime. O texto não citava o MEI nem criava imposto específico para ele. Em 19/11, foi pedida a retirada desse projeto e da versão por faixas que veio depois. Nada disso virou lei.",
  claim: {
    text: "O PT teria apresentado um projeto de lei que estabelece a cobrança de 15% de imposto sobre os lucros dos microempreendedores individuais (MEIs).",
    origin:
      "Publicações em redes sociais e no WhatsApp, uma delas com foto do presidente Lula, segundo o Estadão Verifica, que publicou a checagem em 26/11/2026.",
    attribution: "Publicações em redes sociais",
  },
  date: "2026-11-27",
  checkedAt: "2026-11-27T09:19:00-03:00",
  updated: "2026-11-27",
  topic: "Economia e impostos",
  points: [
    {
      status: "verdade",
      text: "O líder do PT na Câmara, Pedro Uczai (PT-SC), e outros deputados apresentaram em 13/11 o PL 5.854/2026, com alíquota de 15% sobre lucros e dividendos distribuídos a pessoas físicas, qualquer que fosse o valor.",
    },
    {
      status: "falso",
      text: "O texto do PL 5.854/2026 não cita o microempreendedor individual nem institui um imposto próprio sobre o MEI. A proposta altera as Leis 9.249 e 9.250, de 1995, e trata de lucros e dividendos distribuídos por pessoas jurídicas.",
    },
    {
      status: "atencao",
      text: "O início do artigo principal falava em empresas do lucro real, presumido ou arbitrado, mas um parágrafo do mesmo artigo estendia a cobrança a todas as pessoas jurídicas, de qualquer regime, sem exceção expressa para MEIs ou empresas do Simples. As fontes abertas não mostram uma definição oficial sobre como a regra alcançaria o MEI.",
    },
    {
      status: "verdade",
      text: "O PL 5.889/2026, apresentado em 17/11, trocou a alíquota única por faixas: zero até R$ 5 mil por mês, alíquota crescente até 10% entre R$ 5 mil e R$ 7.350 e, acima disso, de 10% a 25%.",
    },
    {
      status: "atencao",
      text: "Em 19/11 foram apresentados requerimentos para retirar os dois projetos de tramitação. Na consulta de 27/11, as fichas da Câmara ainda mostravam os textos como aguardando despacho, sem registro de decisão sobre os pedidos.",
    },
  ],
  sources: [
    {
      label: "PL 5854/2026: inteiro teor",
      publisher: "Câmara dos Deputados",
      url: "https://www.camara.leg.br/proposicoesWeb/prop_mostrarintegra?codteor=3195958",
      kind: "primaria",
      note: "Texto com alíquota de 15% sobre lucros e dividendos pagos a pessoas físicas, para empresas de qualquer regime de tributação, sem menção ao MEI.",
      published: "2026-11-13",
    },
    {
      label: "PL 5889/2026: inteiro teor",
      publisher: "Câmara dos Deputados",
      url: "https://www.camara.leg.br/proposicoesWeb/prop_mostrarintegra?codteor=3197768",
      kind: "primaria",
      note: "Segunda versão, com isenção até R$ 5 mil por mês e alíquotas por faixas de até 25%. A justificativa diz que o texto aprimora o PL 5854.",
      published: "2026-11-17",
    },
    {
      label: "REQ 4495/2026: retirada de tramitação do PL 5889/2026",
      publisher: "Câmara dos Deputados",
      url: "https://www.camara.leg.br/proposicoesWeb/prop_mostrarintegra?codteor=3199133",
      kind: "primaria",
      note: "Requerimento assinado pelo líder Pedro Uczai e outros deputados, apresentado à Mesa em 19/11.",
      published: "2026-11-19",
    },
    {
      label: "REQ 4496/2026: retirada de tramitação do PL 5854/2026",
      publisher: "Câmara dos Deputados",
      url: "https://www.camara.leg.br/proposicoesWeb/prop_mostrarintegra?codteor=3199156",
      kind: "primaria",
      note: "Pede a retirada do projeto de 15%. O texto é datado de 17/11 e o registro de apresentação à Mesa é de 19/11.",
      published: "2026-11-19",
    },
    {
      label: "Ficha de tramitação do PL 5854/2026",
      publisher: "Câmara dos Deputados",
      url: "https://www.camara.leg.br/proposicoesWeb/fichadetramitacao?idProposicao=2653946",
      kind: "primaria",
      note: "Em 27/11, mostrava o projeto como aguardando despacho do presidente da Câmara, com o requerimento de retirada registrado.",
    },
    {
      label: "Post enganoso diz que PT apresentou projeto para taxar MEIs em 15%",
      publisher: "Estadão Verifica",
      url: "https://www.estadao.com.br/estadao-verifica/pt-apresentou-projeto-para-taxar-meis-em-15-enganoso/",
      kind: "agencia",
      note: "Classifica como enganoso, registra que não havia texto específico sobre MEIs e reproduz nota de Uczai sobre a retirada. Informa o teto da faixa de 10% como R$ 7.530, mas o projeto traz R$ 7.350 para a faixa de transição.",
      published: "2026-11-26",
    },
  ],
  timeline: [
    { date: "2026-11-13", text: "O PL 5.854/2026, com alíquota de 15% sobre lucros e dividendos, é apresentado na Câmara." },
    { date: "2026-11-17", text: "É apresentado o PL 5.889/2026, que isenta até R$ 5 mil por mês e cria faixas de até 25%." },
    { date: "2026-11-19", text: "São apresentados os requerimentos 4495 e 4496, que pedem a retirada dos dois projetos." },
    { date: "2026-11-26", text: "O Estadão Verifica publica a checagem e classifica o post como enganoso." },
  ],
  content: `
    <h2>O que as fontes dizem</h2>
    <p>Segundo o <a href="https://www.estadao.com.br/estadao-verifica/pt-apresentou-projeto-para-taxar-meis-em-15-enganoso/" target="_blank" rel="noopener noreferrer nofollow">Estadão Verifica</a>, posts passaram a dizer que o PT apresentou um projeto para cobrar 15% sobre os lucros dos MEIs, em um dos casos ao lado de uma foto de Lula, como se a proposta tivesse aval do Executivo. Os dois textos citados pela agência foram apresentados por deputados, encabeçados por <a href="/congresso/deputados/pedro-uczai-160604">Pedro Uczai</a> (PT-SC).</p>
    <p>O primeiro é o <a href="https://www.camara.leg.br/proposicoesWeb/prop_mostrarintegra?codteor=3195958" target="_blank" rel="noopener noreferrer nofollow">PL 5.854/2026</a>, de 13 de novembro. Ele previa retenção na fonte de 15% sobre lucros e dividendos distribuídos a pessoas físicas, independentemente do valor, com o imposto retido compensado na declaração anual. A proposta fazia parte do pacote noticiado quando o <a href="/noticias/pt-projetos-grandes-fortunas-dividendos-lci-lca">líder do PT protocolou projetos sobre fortunas e investimentos</a>.</p>

    <h2>Onde o post se apoia e onde engana</h2>
    <p>A alíquota de 15% existiu em um projeto. O que o texto não tem é uma cobrança voltada ao MEI: a categoria não é citada. A base da proposta é o dinheiro que sai da empresa como lucro ou dividendo para uma pessoa física, e não o faturamento.</p>
    <p>Há, porém, um ponto que alimenta a dúvida. O começo do artigo principal cita empresas do lucro real, presumido ou arbitrado, mas um parágrafo do mesmo artigo diz que a regra se aplica a todas as pessoas jurídicas, qualquer que seja o regime de tributação. Não há exceção expressa para MEI ou Simples.</p>
    <p>Os textos alteram leis de 1995 sobre o Imposto de Renda e não mencionam a lei do Simples Nacional. Não encontramos manifestação oficial que defina como a mudança alcançaria o microempreendedor se fosse aprovada.</p>
    <p>O Estadão reproduz nota em que Uczai diz ter determinado a retirada para aprofundar estudos técnicos e calibrar a proposta, de modo a alcançar os super-ricos e proteger microempreendedores e empresas do Simples. A nota reproduzida cita os números 5884 e 5889. Na Câmara, os pedidos de retirada registrados são dos projetos 5854 e 5889.</p>

    <h2>A segunda versão e a retirada</h2>
    <p>Quatro dias depois do primeiro texto, o <a href="https://www.camara.leg.br/proposicoesWeb/prop_mostrarintegra?codteor=3197768" target="_blank" rel="noopener noreferrer nofollow">PL 5.889/2026</a> propôs isenção para até R$ 5 mil mensais. Entre esse valor e R$ 7.350, a alíquota subiria de forma linear até 10%. Depois viriam 10% até R$ 20 mil, 15% até R$ 50 mil, 20% até R$ 150 mil e 25% acima disso.</p>
    <p>Em 19 de novembro, foram apresentados o <a href="https://www.camara.leg.br/proposicoesWeb/prop_mostrarintegra?codteor=3199133" target="_blank" rel="noopener noreferrer nofollow">requerimento 4495</a>, para retirar o PL 5889, e o <a href="https://www.camara.leg.br/proposicoesWeb/prop_mostrarintegra?codteor=3199156" target="_blank" rel="noopener noreferrer nofollow">requerimento 4496</a>, para retirar o PL 5854. O Estadão afirma que nenhum dos dois continua em tramitação. A <a href="https://www.camara.leg.br/proposicoesWeb/fichadetramitacao?idProposicao=2653946" target="_blank" rel="noopener noreferrer nofollow">ficha oficial</a>, consultada em 27 de novembro, ainda não registrava decisão sobre o pedido. Em qualquer caso, um projeto de lei só passa a valer depois de aprovado pelo Congresso e sancionado.</p>

    <h2>Por que o veredito é Enganoso</h2>
    <p>O post parte de um fato, a proposta de 15% sobre lucros e dividendos assinada por deputados do PT e de outros partidos, e o apresenta como um imposto sobre o MEI, categoria que o texto não cita. A proposta de alíquota única também foi seguida de uma versão com faixa de isenção e de pedidos de retirada. Outro conteúdo sobre o microempreendedor foi verificado no caso do <a href="/checagem/pix-mei-r-363-no-lugar-de-r-5-mil-conta-hipotetica">Pix MEI de R$ 363</a>. Veja mais em <a href="/checagem">checagens</a>.</p>
  `,
};
