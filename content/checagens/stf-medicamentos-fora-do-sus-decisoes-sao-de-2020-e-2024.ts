import type { FactCheck } from "@/lib/types";

export const checagem: FactCheck = {
  slug: "stf-medicamentos-fora-do-sus-decisoes-sao-de-2020-e-2024",
  title: "Restrição do STF a remédios fora do SUS é de 2020 e 2024, não uma decisão nova",
  summary:
    "Post apresenta como novidade decisões do STF de 2020 e 2024. A tese restringe, mas permite exceções para remédios fora das listas do SUS.",
  author: "Equipe Política Diária",
  verdict: "fora-de-contexto",
  quick:
    "Fora de contexto. O STF restringiu a concessão judicial de remédios fora das listas do SUS em julgamentos de 2020 e 2024. A tese não proíbe todos os casos: há exceção com requisitos cumulativos.",
  claim: {
    text: "O STF acaba de definir que medicamentos fora do SUS não poderão mais ser obtidos pela Justiça.",
    origin:
      "Publicação em grupos de WhatsApp e no Facebook, checada pela Agência Lupa em 25 de novembro de 2026. Segundo a agência, o texto sugere ligação com a reeleição de Lula.",
    attribution: "Publicações em redes sociais",
  },
  date: "2026-11-26",
  checkedAt: "2026-11-26T18:30:00-03:00",
  updated: "2026-11-26",
  topic: "Saúde",
  points: [
    {
      status: "verdade",
      text: "O STF decidiu que, em regra, a Justiça não deve mandar fornecer medicamento que está fora das listas do SUS, qualquer que seja o custo.",
    },
    {
      status: "falso",
      text: "A decisão não é recente. O julgamento de mérito citado é de 11 de março de 2020, e a tese com os critérios saiu em julgamento virtual encerrado em 20 de setembro de 2024.",
    },
    {
      status: "falso",
      text: "Não é verdade que nenhum remédio fora das listas possa mais ser obtido na Justiça. A tese admite a concessão excepcional quando o autor da ação comprova todos os requisitos fixados.",
    },
    {
      status: "atencao",
      text: "A exceção é restrita. Entre as exigências estão negativa administrativa, falta de substituto no SUS, evidências científicas de alto nível, laudo médico fundamentado e incapacidade financeira.",
    },
  ],
  sources: [
    {
      label: "Estado não é obrigado a fornecer medicamentos de alto custo não registrados na lista do SUS",
      publisher: "Supremo Tribunal Federal",
      url: "https://portal.stf.jus.br/noticias/verNoticiaDetalhe.asp?idConteudo=439095&tip=UN",
      kind: "primaria",
      note: "Notícia de 11/03/2020 sobre o julgamento do RE 566.471 (Tema 6): maioria de oito votos, com as situações excepcionais deixadas para a formulação da tese.",
      published: "2020-03-11",
    },
    {
      label: "STF define critérios para a concessão judicial de medicamentos não incorporados ao SUS",
      publisher: "Supremo Tribunal Federal",
      url: "https://noticias.stf.jus.br/postsnoticias/stf-define-criterios-para-a-concessao-judicial-de-medicamentos-nao-incorporado-ao-sus/",
      kind: "primaria",
      note: "Traz a tese do Tema 6, do julgamento virtual encerrado em 20/09/2024: regra geral de não concessão e requisitos cumulativos para a exceção.",
      published: "2024-09-30",
    },
    {
      label: "Decisão do STF sobre medicamentos do SUS é antiga e não tem relação com Lula",
      publisher: "Agência Lupa",
      url: "https://www.agencialupa.org/verificacao/2026/11/25/decisao-do-stf-sobre-medicamentos-do-sus-e-antiga-e-nao-tem-relacao-com-lula/",
      kind: "agencia",
      note: "Reproduz o texto do post e aponta que as datas foram omitidas. Classifica o conteúdo como falta de contexto.",
      published: "2026-11-25",
    },
  ],
  timeline: [
    { date: "2020-03-11", text: "O Plenário do STF decide que o Estado não é obrigado a fornecer, por ordem judicial, remédios de alto custo fora das listas do SUS." },
    { date: "2024-09-20", text: "Termina o julgamento virtual que fixou a tese com os critérios para casos excepcionais." },
    { date: "2024-09-30", text: "O STF publica notícia com a tese do Tema 6." },
    { date: "2026-11-25", text: "A Agência Lupa publica checagem sobre o post que apresenta a restrição como nova." },
  ],
  content: `
    <h2>O que as fontes dizem</h2>
    <p>A publicação anuncia, em tom de novidade, que o Supremo definiu o fim da obtenção judicial de medicamentos fora do SUS. A <a href="https://www.agencialupa.org/verificacao/2026/11/25/decisao-do-stf-sobre-medicamentos-do-sus-e-antiga-e-nao-tem-relacao-com-lula/" target="_blank" rel="noopener noreferrer nofollow">Agência Lupa</a> informa que não há definição recente do tribunal com esse teor e que o post omite as datas.</p>
    <p>Em <a href="https://portal.stf.jus.br/noticias/verNoticiaDetalhe.asp?idConteudo=439095&tip=UN" target="_blank" rel="noopener noreferrer nofollow">11 de março de 2020</a>, o Plenário julgou o recurso extraordinário 566.471 e decidiu que o Estado não é obrigado a fornecer remédios de alto custo pedidos na Justiça quando eles estão fora da lista do SUS. O próprio STF informou que as situações excepcionais seriam definidas depois, na tese de repercussão geral. Naquele momento, mais de 42 mil processos tratavam do assunto.</p>
    <p>A definição veio no julgamento virtual encerrado em 20 de setembro de 2024. A <a href="https://noticias.stf.jus.br/postsnoticias/stf-define-criterios-para-a-concessao-judicial-de-medicamentos-nao-incorporado-ao-sus/" target="_blank" rel="noopener noreferrer nofollow">tese do Tema 6</a> estabelece que a ausência do medicamento nas listas impede, como regra geral, o fornecimento por decisão judicial, independentemente do custo.</p>

    <h2>Quais são as exceções</h2>
    <p>A mesma tese permite a concessão em caráter excepcional. Quem entra com a ação precisa demonstrar, ao mesmo tempo, a negativa de fornecimento pela via administrativa e uma falha ligada à Conitec, a comissão que avalia novas tecnologias no SUS: decisão ilegal de não incorporar o remédio, falta de pedido de incorporação ou demora na análise.</p>
    <p>Também precisa comprovar que não há substituto nas listas do SUS e nos protocolos clínicos, que a eficácia e a segurança do remédio se apoiam em evidências de alto nível, que o tratamento é indispensável, com laudo médico fundamentado, e que não tem condições financeiras de pagar por ele.</p>
    <p>O juiz, por sua vez, não pode decidir apenas com base na receita ou no laudo apresentado pelo autor: a tese exige consulta prévia a núcleos de apoio técnico ou a especialistas.</p>

    <h2>Por que o veredito é Fora de contexto</h2>
    <p>A restrição existe e vale, mas foi decidida em 2020, no governo de Jair Bolsonaro, e detalhada em 2024, no governo Lula. As duas decisões são do STF, e as notícias oficiais consultadas não as ligam a nenhum presidente nem à eleição de 2026.</p>
    <p>Apresentar o julgamento como recente muda o sentido da informação. A frase de que remédios fora do SUS não poderão mais ser obtidos na Justiça também ignora a exceção prevista na tese.</p>
    <p>A Política Diária já checou outro caso de decisão antiga tratada como nova, o das <a href="/checagem/stj-cnh-passaporte-cartoes-devedores-decisao-e-de-dezembro-2025">restrições a devedores no STJ</a>. Veja as demais <a href="/checagem">checagens</a>.</p>
  `,
};
