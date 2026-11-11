import type { FactCheck } from "@/lib/types";

export const checagem: FactCheck = {
  slug: "taxa-das-blusinhas-volta-2027-reeleicao-enganoso",
  title: "Governo não anunciou a volta da “taxa das blusinhas” em 2027, mas haverá novo tributo",
  summary:
    "Posts dizem que a taxa de 20% sobre compras de até US$ 50 volta em 2027 após a reeleição. Não há anúncio disso, mas a CBS passa a valer em 2027 e muda a conta.",
  author: "Equipe Política Diária",
  verdict: "enganoso",
  quick:
    "Enganoso. Segundo a Lupa, não há anúncio de volta da taxa de 20% após a reeleição: a Receita Federal informa imposto de importação de 0% para compras de até US$ 50 em sites certificados. O que existe é a CBS, tributo da reforma de 2023 que começa em 2027, com alíquota de referência de 11,3% calculada pelo TCU e ainda a ser fixada pelo Senado.",
  claim: {
    text: "Publicações dizem que o governo federal vai trazer de volta a “taxa das blusinhas”, a cobrança de 20% sobre compras internacionais de até US$ 50, a partir de 2027, depois da reeleição do presidente Lula.",
    origin:
      "Postagens no Facebook, Instagram, Threads e X, segundo a Lupa, que checou o tema a pedido de usuários do Facebook.",
    attribution: "Publicações em redes sociais",
  },
  date: "2026-11-11",
  checkedAt: "2026-11-11T07:46:22-03:00",
  updated: "2026-11-11",
  topic: "Economia e impostos",
  points: [
    {
      status: "falso",
      text: "Segundo a Lupa, não há previsão de que a cobrança de 20% de imposto de importação sobre compras de até US$ 50 volte em 2027, e o tema não foi anunciado após a reeleição.",
    },
    {
      status: "verdade",
      text: "A Receita Federal informa que, para pessoas físicas em sites certificados no Remessa Conforme, o imposto de importação em compras de até US$ 50 é de 0%. A Lei 15.502/2026, publicada em 10/09/2026, autoriza a alíquota zero, segundo a Agência Senado.",
    },
    {
      status: "atencao",
      text: "Há um novo tributo a caminho: a CBS, que substitui PIS e Cofins a partir de 2027 e vem da reforma tributária promulgada em 2023. Segundo a Lupa, ela não tem isenção geral para compras internacionais de baixo valor, então esses itens podem ficar mais caros mesmo com o imposto de importação zerado.",
    },
    {
      status: "atencao",
      text: "O TCU calculou em 28/10/2026 uma alíquota de referência de 11,3% para a CBS, mas o valor não é definitivo: o Senado a fixa por resolução até 15 de dezembro. A conta final para cada compra ainda não está definida.",
    },
    {
      status: "atencao",
      text: "O ICMS estadual (de 17% a 20%, segundo a Receita Federal) continua incidindo sobre essas compras. Compras de empresas fora do programa seguem com 60% de imposto de importação.",
    },
  ],
  sources: [
    {
      label: "Governo federal não anunciou a volta da “taxa das blusinhas” em 2027 após reeleição",
      publisher: "Agência Lupa",
      url: "https://www.agencialupa.org/verificacao/2026/11/10/governo-federal-nao-anunciou-a-volta-da-taxa-das-blusinhas-em-2027-apos-reeleicao/",
      kind: "agencia",
      note: "Classifica a alegação como “falta contexto”: não há anúncio de volta da taxa de 20%, mas um novo tributo (CBS) começa em 2027 e não tem isenção geral para compras de baixo valor. Cita nota da Secom de 29/10/2026 que desmente a volta do imposto de 20%. Publicada em 10/11/2026.",
      published: "2026-11-10",
    },
    {
      label: "Quais são os impostos devidos nas compras internacionais",
      publisher: "Receita Federal (gov.br)",
      url: "https://www.gov.br/receitafederal/pt-br/assuntos/aduana-e-comercio-exterior/manuais/remessas-postal-e-expressa/preciso-pagar-impostos-nas-compras-internacionais/quais-sao-os-impostos-devidos",
      kind: "primaria",
      note: "Informa imposto de importação de 0% até US$ 50 para pessoas físicas em sites certificados no Remessa Conforme; 60% (com desconto de US$ 30) entre US$ 50 e US$ 3.000; ICMS de 17% a 20%. Página atualizada em 14/09/2026.",
      published: "2026-09-14",
    },
    {
      label: "Sancionada lei que autoriza zerar taxa das blusinhas até US$ 50",
      publisher: "Agência Senado",
      url: "https://www12.senado.leg.br/noticias/materias/2026/09/11/sancionada-lei-que-autoriza-zerar-taxa-das-blusinhas-ate-us-50",
      kind: "primaria",
      note: "Registra a Lei 15.502, publicada em edição extra do Diário Oficial da União em 10/09/2026, que autoriza alíquota zero de imposto de importação até US$ 50 e mantém o ICMS.",
      published: "2026-09-11",
    },
    {
      label: "TCU calcula alíquota de referência de 11,3% para novo tributo sobre consumo",
      publisher: "Tribunal de Contas da União",
      url: "https://portal.tcu.gov.br/imprensa/noticias/tcu-calcula-aliquota-de-referencia-de-113-para-novo-tributo-sobre-consumo",
      kind: "primaria",
      note: "Informa que o TCU calculou, em 28/10/2026, a alíquota de referência de 11,3% da CBS, que começa a ser cobrada em 2027 e substitui PIS e Cofins. O número é referência e não é a alíquota final, que o Senado fixa por resolução até 15 de dezembro.",
      published: "2026-10-28",
    },
    {
      label: "Taxa das blusinhas em 2027: compra internacional terá novo imposto",
      publisher: "Metrópoles",
      url: "https://www.metropoles.com/brasil/taxa-das-blusinhas-em-2027-compra-internacional-tera-novo-imposto",
      kind: "imprensa",
      note: "Reportagem de 17/06/2026, anterior à eleição, já explicava que a tributação de compras de até US$ 50 voltaria em 2027 por meio da CBS, e não por reedição da taxa antiga. Não cita documento oficial com número de lei ou decreto.",
      published: "2026-06-17",
    },
  ],
  timeline: [
    { date: "2023-12-20", text: "O Congresso promulga a reforma tributária que cria a CBS, segundo a Lupa." },
    { date: "2026-06-17", text: "O Metrópoles publica que a tributação das compras de até US$ 50 voltaria em 2027 pela CBS." },
    { date: "2026-09-10", text: "A Lei 15.502/2026 é publicada no Diário Oficial e autoriza alíquota zero até US$ 50, segundo a Agência Senado." },
    { date: "2026-10-28", text: "O TCU calcula a alíquota de referência de 11,3% da CBS, a ser fixada pelo Senado até 15 de dezembro." },
    { date: "2026-10-29", text: "A Secom diz que a taxa de 20% não volta em 2027, segundo a Lupa." },
    { date: "2026-11-10", text: "A Lupa publica a checagem sobre as postagens." },
  ],
  content: `
    <h2>O que as fontes dizem</h2>
    <p>Postagens em redes sociais afirmam que o governo federal vai reeditar a “taxa das blusinhas”, a cobrança de 20% de imposto de importação sobre compras internacionais de até US$ 50, a partir de 2027 e como consequência da reeleição de Lula. A <a href="https://www.agencialupa.org/verificacao/2026/11/10/governo-federal-nao-anunciou-a-volta-da-taxa-das-blusinhas-em-2027-apos-reeleicao/" target="_blank" rel="noopener noreferrer nofollow">Agência Lupa</a> classificou a alegação como “falta contexto”.</p>
    <p>Pela <a href="https://www.gov.br/receitafederal/pt-br/assuntos/aduana-e-comercio-exterior/manuais/remessas-postal-e-expressa/preciso-pagar-impostos-nas-compras-internacionais/quais-sao-os-impostos-devidos" target="_blank" rel="noopener noreferrer nofollow">Receita Federal</a>, o imposto de importação é hoje de 0% nas compras de até US$ 50 feitas por pessoas físicas em sites certificados no Remessa Conforme. A <a href="https://www12.senado.leg.br/noticias/materias/2026/09/11/sancionada-lei-que-autoriza-zerar-taxa-das-blusinhas-ate-us-50" target="_blank" rel="noopener noreferrer nofollow">Agência Senado</a> registra que a Lei 15.502, publicada em 10 de setembro de 2026, autoriza essa alíquota zero.</p>

    <h2>O que muda em 2027 e o que não foi anunciado</h2>
    <p>Segundo a Lupa, a Secretaria de Comunicação Social da Presidência (Secom) afirmou em 29 de outubro que a mudança prevista para o próximo ano não restabelece o imposto de 20%. O que começa em 2027 é a Contribuição sobre Bens e Serviços (CBS), que vem da reforma tributária promulgada em 2023, antes da eleição, e substitui PIS e Cofins.</p>
    <p>A Lupa observa que a CBS não traz isenção geral para compras internacionais de baixo valor. Por isso, o preço final dessas compras pode subir mesmo com o imposto de importação zerado. O <a href="https://portal.tcu.gov.br/imprensa/noticias/tcu-calcula-aliquota-de-referencia-de-113-para-novo-tributo-sobre-consumo" target="_blank" rel="noopener noreferrer nofollow">TCU</a> calculou em 28 de outubro a alíquota de referência de 11,3%, mas esse número não é o definitivo: o Senado precisa fixar o percentual por resolução até 15 de dezembro. Já em junho, o <a href="https://www.metropoles.com/brasil/taxa-das-blusinhas-em-2027-compra-internacional-tera-novo-imposto" target="_blank" rel="noopener noreferrer nofollow">Metrópoles</a> havia publicado que a tributação voltaria em 2027 por meio da CBS.</p>

    <h2>Por que o veredito é Enganoso</h2>
    <p>Há um fundo de verdade: compras internacionais de baixo valor deverão pagar um novo tributo a partir de 2027. Mas as fontes não sustentam as duas ideias centrais das postagens: que a taxa de 20% foi reeditada e que isso foi anunciado depois da reeleição. A CBS foi criada em 2023, tem alíquota ainda a definir e vale para bens e serviços em geral, segundo as fontes citadas.</p>
    <p>A checagem não avalia se o novo tributo é adequado nem prevê o preço final das compras, que depende da alíquota que o Senado fixar e do ICMS de cada estado. Veja o acompanhamento da <a href="/noticias/cbs-aliquota-tcu-senado-prazo-30-outubro">alíquota da CBS no TCU e no Senado</a>, outra checagem sobre o <a href="/checagem/governo-lula-confisco-poupanca-2027-sem-base-oficial-falso">boato de confisco da poupança em 2027</a> e as demais <a href="/checagem">checagens</a>. A mesma régua vale para qualquer campo político.</p>
  `,
};
