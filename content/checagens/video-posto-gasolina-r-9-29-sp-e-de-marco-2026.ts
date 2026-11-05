import type { FactCheck } from "@/lib/types";

export const checagem: FactCheck = {
  slug: "video-posto-gasolina-r-9-29-sp-e-de-marco-2026",
  title: "Vídeo de posto com gasolina a R$ 9,29 em SP é de março, não do pós-eleição",
  summary:
    "Posts ligam reportagem sobre gasolina a R$ 9,29 em SP ao resultado do 2º turno. O vídeo é de 16/03/2026; a ANP aponta média de R$ 6,48 no país em 25 a 31/10.",
  author: "Equipe Política Diária",
  verdict: "fora-de-contexto",
  quick:
    "Fora de contexto. A reportagem do SBT foi exibida em 16/03/2026, sete meses antes do 2º turno. Segundo a ANP, a gasolina comum custou em média R$ 6,48 no país e R$ 6,36 na capital paulista na semana de 25 a 31/10/2026.",
  claim: {
    text: "Publicações mostram uma reportagem de TV sobre um posto de São Paulo que cobra R$ 9,29 pela gasolina e R$ 8,00 pelo diesel, com legenda que associa os preços ao resultado da eleição presidencial.",
    origin:
      "Posts no Facebook e no X que reaproveitam uma reportagem do SBT, segundo a Lupa. Até as 14h de 04/11/2026, o vídeo somava 136 mil visualizações no X.",
    firstSeen: "2026-11-04",
    attribution: "Publicações em redes sociais",
  },
  date: "2026-11-05",
  checkedAt: "2026-11-05T07:42:00-03:00",
  updated: "2026-11-05",
  topic: "Economia",
  points: [
    {
      status: "falso",
      text: "O vídeo não é recente: segundo a Lupa, a reportagem do SBT foi exibida em 16/03/2026, mais de sete meses antes do segundo turno.",
    },
    {
      status: "verdade",
      text: "Houve preços muito acima da média naquele período: segundo o Vero Notícias, que cita levantamento da ANP, o maior valor da gasolina em São Paulo na semana de 8 a 14/03/2026 foi de R$ 9,29. A Lupa informa que o posto cobrava quase R$ 10 pela gasolina premium aditivada e menos para pagamento via Pix.",
    },
    {
      status: "verdade",
      text: "R$ 9,29 era o maior preço registrado, não a média. Na Síntese Semanal da ANP de 8 a 14/03/2026, a gasolina comum custou em média R$ 6,46 no país (alta de 2,54% na semana) e R$ 6,24 na capital paulista.",
    },
    {
      status: "verdade",
      text: "Na Síntese Semanal da ANP de 25 a 31/10/2026, a gasolina comum custou em média R$ 6,48 no país (queda de 0,15% na semana) e R$ 6,36 na capital paulista. A Lupa cita R$ 6,35 em São Paulo com base em dados da Petrobras; a diferença de um centavo vem da fonte e do recorte.",
    },
    {
      status: "atencao",
      text: "A causa da alta em março: segundo a Lupa, a reportagem do SBT a associou à guerra no Oriente Médio e ao preço internacional do petróleo. O Vero Notícias faz a mesma associação. Este texto não avalia a legenda do post, que é opinião, e checa apenas a data e o preço.",
    },
  ],
  sources: [
    {
      label: "Vídeo de posto com gasolina a R$ 9,29 em SP é de março",
      publisher: "Agência Lupa",
      url: "https://www.agencialupa.org/verificacao/2026/11/04/video-de-posto-com-gasolina-a-r-929-em-sp-e-de-marco/",
      kind: "agencia",
      note: "Classifica como falta de contexto, data a reportagem do SBT em 16/03/2026 e cita os preços médios de 25 a 31/10/2026. Publicada em 04/11/2026.",
      published: "2026-11-04",
    },
    {
      label: "Síntese Semanal dos Preços dos Combustíveis, edição 44/2026 (25 a 31/10/2026)",
      publisher: "ANP",
      url: "https://www.gov.br/anp/pt-br/assuntos/precos-e-defesa-da-concorrencia/precos/arq-sintese-semanal/2026/sintese-precos-44.pdf",
      kind: "primaria",
      note: "Gasolina comum a R$ 6,48 por litro em média no país e R$ 6,36 na capital paulista na semana de 25 a 31/10/2026. Documento lido em PDF; o texto não traz data de publicação, então usamos o fim da semana.",
      published: "2026-10-31",
    },
    {
      label: "Síntese Semanal dos Preços dos Combustíveis, edição 11/2026 (8 a 14/03/2026)",
      publisher: "ANP",
      url: "https://www.gov.br/anp/pt-br/assuntos/precos-e-defesa-da-concorrencia/precos/arq-sintese-semanal/2026/sintese-precos-11.pdf",
      kind: "primaria",
      note: "Gasolina comum a R$ 6,46 em média no país (alta de 2,54%) e R$ 6,24 na capital paulista na semana do vídeo. A síntese traz médias, não o preço máximo. O texto não traz data de publicação, então usamos o fim da semana.",
      published: "2026-03-14",
    },
    {
      label: "Gasolina sobe pela segunda semana e chega a R$ 9,29 em SP",
      publisher: "Vero Notícias",
      url: "https://veronoticias.com/economia/gasolina-sobe-pela-segunda-semana-e-chega-a-r-929-em-sp/",
      kind: "imprensa",
      note: "Informa, a partir de levantamento da ANP, que R$ 9,29 foi o maior preço em São Paulo na semana de 8 a 14/03/2026 e que a média nacional subiu de R$ 6,30 para R$ 6,46. Publicada em 16/03/2026. Não verificamos o dado do preço máximo na base da ANP.",
      published: "2026-03-16",
    },
  ],
  timeline: [
    { date: "2026-03-14", text: "Fim da semana em que a ANP registra média nacional de R$ 6,46 para a gasolina comum, após alta de 2,54%." },
    { date: "2026-03-16", text: "O SBT exibe a reportagem sobre o posto em São Paulo, segundo a Lupa; o Vero Notícias publica que R$ 9,29 foi o maior preço da semana na capital paulista." },
    { date: "2026-10-31", text: "Fim da semana em que a ANP registra média nacional de R$ 6,48 e de R$ 6,36 na capital paulista." },
    { date: "2026-11-04", text: "A Lupa publica a checagem do vídeo, que somava 136 mil visualizações no X até as 14h." },
  ],
  content: `
    <h2>O que as fontes dizem</h2>
    <p>Posts nas redes mostram uma reportagem de TV sobre um posto paulista que cobrava R$ 9,29 pela gasolina e R$ 8,00 pelo diesel, com a legenda ligando os preços ao resultado da eleição. Segundo a <a href="https://www.agencialupa.org/verificacao/2026/11/04/video-de-posto-com-gasolina-a-r-929-em-sp-e-de-marco/" target="_blank" rel="noopener noreferrer nofollow">Agência Lupa</a>, a reportagem é do SBT e foi exibida em 16 de março de 2026, mais de sete meses antes do segundo turno.</p>
    <p>A própria reportagem, segundo a Lupa, mostrava um posto que cobrava quase R$ 10 pela gasolina premium aditivada, com preço menor para pagamento via Pix, e associava a alta à guerra no Oriente Médio e ao preço internacional do petróleo. O <a href="https://veronoticias.com/economia/gasolina-sobe-pela-segunda-semana-e-chega-a-r-929-em-sp/" target="_blank" rel="noopener noreferrer nofollow">Vero Notícias</a> publicou em 16/03/2026 que R$ 9,29 foi o maior preço da gasolina em São Paulo na semana de 8 a 14 de março, segundo levantamento da ANP, quando a média nacional subiu de R$ 6,30 para R$ 6,46.</p>

    <h2>O que a ANP registra</h2>
    <p>A <a href="https://www.gov.br/anp/pt-br/assuntos/precos-e-defesa-da-concorrencia/precos/arq-sintese-semanal/2026/sintese-precos-11.pdf" target="_blank" rel="noopener noreferrer nofollow">Síntese Semanal da ANP de 8 a 14/03/2026</a> traz a gasolina comum a R$ 6,46 em média no país, alta de 2,54% na semana, e a R$ 6,24 na capital paulista. Já a <a href="https://www.gov.br/anp/pt-br/assuntos/precos-e-defesa-da-concorrencia/precos/arq-sintese-semanal/2026/sintese-precos-44.pdf" target="_blank" rel="noopener noreferrer nofollow">síntese de 25 a 31/10/2026</a> registra R$ 6,48 no país, queda de 0,15% na semana, e R$ 6,36 na capital paulista. O diesel S10 estava em R$ 7,31 em média nacional na mesma semana de outubro.</p>
    <p>A Lupa cita R$ 6,35 para São Paulo com base em dados da Petrobras. A síntese da ANP traz R$ 6,36 para a capital; a diferença de um centavo vem da fonte e do recorte, e não muda a conclusão.</p>

    <h2>Por que o veredito é Fora de contexto</h2>
    <p>O vídeo é real e o preço apareceu de fato, mas no fim de uma alta semanal ocorrida em março e como o valor mais alto de um posto, não como o que o consumidor pagava em média. Apresentá-lo como retrato do pós-eleição troca a data e o tipo de preço. A legenda do post é uma opinião e não é objeto desta checagem: aqui se confere a data do vídeo e o valor do combustível. A mesma régua vale para boatos de qualquer campo. Veja outras <a href="/checagem">checagens do site</a> e o painel de <a href="/eleicoes">Eleições 2026</a>.</p>
  `,
};
