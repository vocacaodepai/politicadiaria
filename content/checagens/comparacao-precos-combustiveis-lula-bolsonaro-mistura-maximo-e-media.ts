import type { FactCheck } from "@/lib/types";

export const checagem: FactCheck = {
  slug: "comparacao-precos-combustiveis-lula-bolsonaro-mistura-maximo-e-media",
  title: "Imagem sobre gasolina com Lula e Bolsonaro compara preço máximo com média",
  summary:
    "Imagem põe gasolina a R$ 9,92 sob Lula e R$ 4,59 sob Bolsonaro. Pela ANP, 9,92 foi o preço de um posto em outubro; a média no país foi R$ 6,51.",
  author: "Equipe Política Diária",
  verdict: "enganoso",
  quick:
    "Enganoso. Segundo a ANP, R$ 9,92 foi o preço mais alto achado num posto em outubro de 2026, quando a média nacional da gasolina comum foi R$ 6,51. Sob Bolsonaro, a média mensal foi de R$ 3,82 a R$ 7,28, e passou de R$ 7 em 2022.",
  claim: {
    text: "Uma imagem compara os preços nos dois governos: com Lula, etanol a R$ 6,20 e gasolina comum a R$ 9,92; com Bolsonaro, etanol a R$ 2,99 e gasolina a R$ 4,59. As legendas falam em pandemia e em “roubo”.",
    origin:
      "Imagem compartilhada no WhatsApp, no X e no Facebook depois do segundo turno de 2026, segundo a Agência Lupa, que publicou a checagem em 12/11/2026.",
    attribution: "Publicações em redes sociais",
  },
  date: "2026-11-12",
  checkedAt: "2026-11-12T14:20:00-03:00",
  updated: "2026-11-12",
  topic: "Economia",
  points: [
    {
      status: "verdade",
      text: "O número R$ 9,92 existe na base da ANP: é o preço máximo da gasolina comum encontrado em um posto no levantamento de outubro de 2026. No mesmo mês, a média nacional foi R$ 6,51 e o menor preço, R$ 5,36.",
    },
    {
      status: "falso",
      text: "A comparação não é entre preços equivalentes. Sob Bolsonaro (2019 a 2022), a média mensal da gasolina comum foi de R$ 3,82 (maio de 2020) a R$ 7,28 (maio de 2022), e o maior preço de posto no levantamento chegou a R$ 8,99, segundo a ANP. Valores como R$ 4,59 e R$ 2,99 ficam perto das médias de 2019 e do começo de 2020, antes da alta.",
    },
    {
      status: "falso",
      text: "O etanol a R$ 6,20 não é a média do governo Lula. Pela ANP, a média mensal do etanol hidratado de janeiro de 2023 a outubro de 2026 foi de R$ 3,42 a R$ 4,67; na semana de 1º a 7/11/2026, ficou em R$ 4,15.",
    },
    {
      status: "verdade",
      text: "Sob Lula, a média mensal da gasolina comum foi de R$ 5,05 (janeiro de 2023) a R$ 6,74 (abril de 2026), segundo a ANP. Na semana de 1º a 7/11/2026, a média foi R$ 6,47, com máximo de R$ 8,99 em posto.",
    },
    {
      status: "atencao",
      text: "As altas tiveram causas diferentes: em 2021 e 2022, segundo a Lupa, o pós-pandemia, a guerra na Ucrânia e a política da Petrobras de seguir o preço internacional; em 2026, a guerra envolvendo o Irã, segundo o governo. Esta checagem não avalia as legendas da imagem, que são opinião.",
    },
  ],
  sources: [
    {
      label: "Série histórica do levantamento de preços (mensal, Brasil, desde janeiro de 2013)",
      publisher: "ANP",
      url: "https://www.gov.br/anp/pt-br/assuntos/precos-e-defesa-da-concorrencia/precos/precos-revenda-e-de-distribuicao-combustiveis/serie-historica-do-levantamento-de-precos",
      kind: "primaria",
      note: "Planilha mensal do Brasil, atualizada em 10/11/2026: médias, mínimos e máximos de revenda da gasolina comum e do etanol hidratado de 2019 a outubro de 2026, incluindo o máximo de R$ 9,92 e a média de R$ 6,51 em outubro de 2026.",
      published: "2026-11-10",
    },
    {
      label: "Levantamento de preços de combustíveis: últimas semanas pesquisadas",
      publisher: "ANP",
      url: "https://www.gov.br/anp/pt-br/assuntos/precos-e-defesa-da-concorrencia/precos/levantamento-de-precos-de-combustiveis-ultimas-semanas-pesquisadas",
      kind: "primaria",
      note: "Resumo semanal de 1º a 7/11/2026: gasolina comum a R$ 6,47 em média no país (mínimo R$ 5,39, máximo R$ 8,99) e etanol hidratado a R$ 4,15. Arquivo atualizado em 09/11/2026.",
      published: "2026-11-09",
    },
    {
      label: "Comparação entre preços de combustíveis nas gestões Lula e Bolsonaro omite variações",
      publisher: "Agência Lupa",
      url: "https://www.agencialupa.org/jornalismo/2026/11/12/comparacao-entre-precos-de-combustiveis-nas-gestoes-lula-e-bolsonaro-omite-variacoes/",
      kind: "agencia",
      note: "Classifica a imagem como falta de contexto, informa onde circulou e cita as faixas de média nacional da ANP nos dois governos e as causas das altas. Publicada em 12/11/2026.",
      published: "2026-11-12",
    },
    {
      label: "Entenda o que muda na política de preços dos combustíveis",
      publisher: "Agência Brasil",
      url: "https://agenciabrasil.ebc.com.br/economia/noticia/2023-05/entenda-o-que-muda-na-politica-de-precos-dos-combustiveis",
      kind: "imprensa",
      note: "Registra o fim do Preço de Paridade Internacional (PPI), adotado em 2016, anunciado pela Petrobras em maio de 2023. Publicada em 16/05/2023.",
      published: "2023-05-16",
    },
    {
      label: "Silveira detalha medidas do governo do Brasil para conter impacto da guerra nos combustíveis",
      publisher: "Agência Gov",
      url: "https://agenciagov.ebc.com.br/noticias/202604/silveira-detalha-medidas-do-governo-do-brasil-para-conter-impacto-da-guerra-nos-combustiveis",
      kind: "imprensa",
      note: "Relata, com base no Ministério de Minas e Energia, medidas contra a alta dos combustíveis atribuída à guerra de Estados Unidos e Israel contra o Irã. Publicada em 06/04/2026.",
      published: "2026-04-06",
    },
  ],
  timeline: [
    { date: "2022-05-01", text: "Mês com a maior média mensal da gasolina comum no governo Bolsonaro, R$ 7,28, segundo a ANP." },
    { date: "2023-05-16", text: "A Agência Brasil explica o fim do Preço de Paridade Internacional, anunciado pela Petrobras em maio de 2023." },
    { date: "2026-04-01", text: "Mês com a maior média mensal da gasolina comum no governo Lula, R$ 6,74, segundo a ANP." },
    { date: "2026-04-06", text: "O governo detalha medidas contra a alta dos combustíveis ligada à guerra envolvendo o Irã." },
    { date: "2026-10-01", text: "No levantamento de outubro, a ANP registra média de R$ 6,51 e preço máximo de R$ 9,92 para a gasolina comum." },
    { date: "2026-11-12", text: "A Lupa publica a checagem da imagem que circulou depois do segundo turno." },
  ],
  content: `
    <h2>O que as fontes dizem</h2>
    <p>Uma imagem compartilhada depois do segundo turno compara o preço dos combustíveis nos governos Lula e Bolsonaro. Segundo a <a href="https://www.agencialupa.org/jornalismo/2026/11/12/comparacao-entre-precos-de-combustiveis-nas-gestoes-lula-e-bolsonaro-omite-variacoes/" target="_blank" rel="noopener noreferrer nofollow">Agência Lupa</a>, que classificou a peça como falta de contexto, ela circulou no WhatsApp, no X e no Facebook e põe a gasolina comum a R$ 9,92 sob Lula e a R$ 4,59 sob Bolsonaro.</p>
    <p>A <a href="https://www.gov.br/anp/pt-br/assuntos/precos-e-defesa-da-concorrencia/precos/precos-revenda-e-de-distribuicao-combustiveis/serie-historica-do-levantamento-de-precos" target="_blank" rel="noopener noreferrer nofollow">série histórica mensal da ANP</a> ajuda a entender de onde vêm os números. Em outubro de 2026, o preço mais alto da gasolina comum achado em um posto foi exatamente R$ 9,92. A média nacional do mês, porém, foi R$ 6,51, e o menor preço, R$ 5,36.</p>

    <h2>O que a ANP registra nos dois governos</h2>
    <p>De janeiro de 2019 a dezembro de 2022, a média mensal da gasolina comum foi de R$ 3,82 (maio de 2020, no início da pandemia) a R$ 7,28 (maio de 2022). O maior preço de posto no levantamento do período foi R$ 8,99. Valores como R$ 4,59 para a gasolina e R$ 2,99 para o etanol ficam perto das médias de 2019 e do começo de 2020, antes da alta de 2021 e 2022.</p>
    <p>De janeiro de 2023 a outubro de 2026, a média mensal da gasolina comum foi de R$ 5,05 a R$ 6,74 (abril de 2026). O etanol hidratado teve média mensal de R$ 3,42 a R$ 4,67, longe dos R$ 6,20 da imagem. No <a href="https://www.gov.br/anp/pt-br/assuntos/precos-e-defesa-da-concorrencia/precos/levantamento-de-precos-de-combustiveis-ultimas-semanas-pesquisadas" target="_blank" rel="noopener noreferrer nofollow">resumo semanal mais recente da ANP</a>, de 1º a 7 de novembro, a gasolina comum custou em média R$ 6,47 e o etanol, R$ 4,15.</p>
    <p>A Lupa cita ainda casos fora da curva nos dois períodos: em março de 2022, o litro chegou a R$ 11,56 em Jordão (AC), e no primeiro semestre de 2026 chegou a R$ 9,89 em algumas cidades. O valor de Jordão não aparece no levantamento mensal da ANP, que pesquisa uma amostra de municípios.</p>

    <h2>O que explica as altas</h2>
    <p>Segundo a Lupa, a alta de 2021 e 2022 combinou o pós-pandemia, a guerra da Rússia contra a Ucrânia e a política da Petrobras de seguir o preço internacional do petróleo e o câmbio. Essa política, o Preço de Paridade Internacional, foi encerrada pela Petrobras em maio de 2023, conforme a <a href="https://agenciabrasil.ebc.com.br/economia/noticia/2023-05/entenda-o-que-muda-na-politica-de-precos-dos-combustiveis" target="_blank" rel="noopener noreferrer nofollow">Agência Brasil</a>.</p>
    <p>Em 2026, o governo atribuiu a pressão sobre os preços à guerra de Estados Unidos e Israel contra o Irã e anunciou medidas como subsídio ao gás de cozinha importado e reforço na fiscalização, segundo a <a href="https://agenciagov.ebc.com.br/noticias/202604/silveira-detalha-medidas-do-governo-do-brasil-para-conter-impacto-da-guerra-nos-combustiveis" target="_blank" rel="noopener noreferrer nofollow">Agência Gov</a>. Preços diferentes entre cidades também dependem de frete e do ICMS de cada estado.</p>

    <h2>Por que o veredito é Enganoso</h2>
    <p>O número de R$ 9,92 aparece na base da ANP, mas como o preço mais alto de um posto num mês, não como o preço típico do governo Lula. Do outro lado, a imagem usa valores próximos da média de antes da alta e deixa de fora que, em 2022, a média nacional passou de R$ 7. Comparar o máximo de um período com a média de outro leva a uma conclusão que os dados não sustentam.</p>
    <p>As legendas da imagem são opinião e não são objeto desta checagem. Em novembro, já tínhamos mostrado que o <a href="/checagem/video-posto-gasolina-r-9-29-sp-e-de-marco-2026">vídeo de posto com gasolina a R$ 9,29 em SP é de março</a>. Veja outras <a href="/checagem">checagens do site</a> e as notícias de <a href="/noticias">economia e política</a>.</p>
  `,
};
