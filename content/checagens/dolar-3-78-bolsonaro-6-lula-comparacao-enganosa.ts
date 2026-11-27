import type { FactCheck } from "@/lib/types";

export const checagem: FactCheck = {
  slug: "dolar-3-78-bolsonaro-6-lula-comparacao-enganosa",
  title: "Dólar a R$ 3,78 com Bolsonaro e R$ 6 com Lula: comparação isola dois momentos",
  summary:
    "Dados do BC mostram que R$ 3,78 é um patamar de 2019 e que R$ 6 não é a cotação típica desde 2023. As médias são de R$ 4,91 e R$ 5,29.",
  author: "Equipe Política Diária",
  verdict: "enganoso",
  quick:
    "Enganoso. O dólar esteve perto de R$ 3,78 em 2019 e passou de R$ 6 no atual governo Lula, mas nenhum dos valores resume o período. Pela taxa de venda do Banco Central, a média foi de R$ 4,91 de 2019 a 2022 e de R$ 5,29 de 2023 até 27/11/2026.",
  claim: {
    text: "Com Jair Bolsonaro, US$ 1 valia R$ 3,78; com Lula, vale R$ 6,00.",
    origin:
      "Imagem que circula no WhatsApp e no Instagram, segundo a Lupa, que publicou a verificação em 27/11/2026.",
    attribution: "Publicações em redes sociais",
  },
  date: "2026-11-27",
  checkedAt: "2026-11-27T18:24:00-03:00",
  updated: "2026-11-27",
  topic: "Economia",
  points: [
    {
      status: "verdade",
      text: "O dólar rondou R$ 3,78 no início do governo Bolsonaro: a taxa de venda do BC foi de R$ 3,7815 em 24/01/2019.",
    },
    {
      status: "verdade",
      text: "A moeda passou de R$ 6 no governo Lula. A taxa ficou nesse patamar ou acima em 35 dias úteis entre 29/11/2024 e 09/04/2025, com pico de R$ 6,2086 em 02/01/2025.",
    },
    {
      status: "falso",
      text: "R$ 3,78 não representa o mandato de Bolsonaro. A taxa só ficou abaixo de R$ 3,80 em 2019, pela última vez em 31/07. Depois chegou a R$ 5,9372, em 14/05/2020, e terminou 2022 em R$ 5,2177.",
    },
    {
      status: "falso",
      text: "R$ 6 não é a cotação de referência de todo o período desde 2023. A mínima foi de R$ 4,7202, em 27/07/2023, e em 27/11/2026 a taxa ficou em R$ 5,5430.",
    },
    {
      status: "atencao",
      text: "Duas cotações escolhidas em datas diferentes não mostram, sozinhas, o efeito de um governo sobre o câmbio. O resultado muda conforme o dia de partida e de chegada.",
    },
  ],
  sources: [
    {
      label: "Taxa de câmbio, dólar americano (venda), diário: SGS série 1, de 02/01/2019 a 27/11/2026",
      publisher: "Banco Central do Brasil",
      url: "https://api.bcb.gov.br/dados/serie/bcdata.sgs.1/dados?formato=json&dataInicial=01/01/2019&dataFinal=27/11/2026",
      kind: "primaria",
      note: "Série diária usada para as cotações, os extremos e as variações. As médias são a média simples dos dias úteis, calculada pela redação.",
    },
    {
      label: "Post omite variações do dólar ao comparar gestões Bolsonaro e Lula",
      publisher: "Agência Lupa",
      url: "https://www.agencialupa.org/jornalismo/2026/11/27/post-omite-variacoes-do-dolar-ao-comparar-gestoes-bolsonaro-e-lula/",
      kind: "agencia",
      note: "Reproduz a imagem e conclui que falta contexto. Calcula alta de 36,2% de 2019 a 2022; pela série diária do BC, do primeiro dia útil de 2019 ao último de 2022, a conta dá 35,2%.",
      published: "2026-11-27",
    },
  ],
  timeline: [
    { date: "2019-01-02", text: "O dólar abre o governo Bolsonaro, no primeiro dia útil do ano, a R$ 3,8595 na taxa de venda do BC." },
    { date: "2020-05-14", text: "A taxa chega a R$ 5,9372, a maior do período de 2019 a 2022." },
    { date: "2022-12-30", text: "No último dia útil de 2022, a taxa fica em R$ 5,2177." },
    { date: "2025-01-02", text: "A taxa alcança R$ 6,2086, a maior desde 2023." },
    { date: "2026-11-27", text: "A taxa fica em R$ 5,5430 e a Lupa publica a verificação." },
  ],
  content: `
    <h2>O que as fontes dizem</h2>
    <p>Usamos a <a href="https://api.bcb.gov.br/dados/serie/bcdata.sgs.1/dados?formato=json&dataInicial=01/01/2019&dataFinal=27/11/2026" target="_blank" rel="noopener noreferrer nofollow">série diária do Banco Central</a> para a taxa de venda do dólar. Os números abaixo são dessa série e podem diferir em centavos da cotação comercial mostrada por sites de mercado durante o dia.</p>
    <table>
      <thead>
        <tr><th>Medida</th><th>2019 a 2022</th><th>2023 a 27/11/2026</th></tr>
      </thead>
      <tbody>
        <tr><td>Primeiro dia útil</td><td>R$ 3,8595</td><td>R$ 5,3436</td></tr>
        <tr><td>Mínima</td><td>R$ 3,6519</td><td>R$ 4,7202</td></tr>
        <tr><td>Máxima</td><td>R$ 5,9372</td><td>R$ 6,2086</td></tr>
        <tr><td>Média dos dias úteis</td><td>R$ 4,9143</td><td>R$ 5,2939</td></tr>
        <tr><td>Fim do período</td><td>R$ 5,2177</td><td>R$ 5,5430</td></tr>
      </tbody>
    </table>
    <p>Do primeiro ao último dia útil de 2019 a 2022, o dólar subiu 35,2%. Do primeiro dia útil de 2023 até 27 de novembro de 2026, a alta foi de 3,7%. Os dois intervalos não têm a mesma duração, já que o mandato atual ainda não terminou.</p>

    <h2>O que a imagem deixa de fora</h2>
    <p>Cotações em torno de R$ 3,78 aparecem entre janeiro e julho de 2019. Depois a taxa mudou de patamar e chegou perto de R$ 6 em maio de 2020, de acordo com a mesma série.</p>
    <p>Do outro lado, o patamar de R$ 6 ocorreu entre o fim de 2024 e abril de 2025. Segundo a <a href="https://www.agencialupa.org/jornalismo/2026/11/27/post-omite-variacoes-do-dolar-ao-comparar-gestoes-bolsonaro-e-lula/" target="_blank" rel="noopener noreferrer nofollow">Agência Lupa</a>, a moeda também chegou a R$ 6 em 23 de novembro deste ano; a taxa do BC naquele dia foi de R$ 5,9708. Cobrimos a pressão recente no câmbio quando o <a href="/noticias/ibovespa-dolar-fechamento-10-novembro-maior-valor-15-meses">dólar atingiu o maior valor em 15 meses</a>.</p>

    <h2>Por que o veredito é Enganoso</h2>
    <p>Os dois números têm relação com cotações reais, mas a imagem põe lado a lado um ponto baixo do começo de um governo e um ponto alto do outro, sem informar as datas. Quem lê pode concluir que esses eram os valores normais de cada período, o que a série do BC não sustenta.</p>
    <p>A mesma régua vale para a comparação inversa: escolher o pico de 2020 contra a mínima de 2023 também distorceria o quadro. Para o cenário atual, veja a notícia sobre a <a href="/noticias/trabuco-ministro-fazenda-lula-2027">indicação de Trabuco para a Fazenda</a> e outras <a href="/checagem">checagens</a>.</p>
  `,
};
