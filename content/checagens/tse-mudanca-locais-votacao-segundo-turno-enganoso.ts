import type { FactCheck } from "@/lib/types";

export const checagem: FactCheck = {
  slug: "tse-mudanca-locais-votacao-segundo-turno-enganoso",
  title: "Post engana ao ligar mudança de locais de votação a manobra do presidente do TSE",
  summary:
    "Posts dizem que Nunes Marques mexeu em locais de votação de áreas pró-Lula. Zonas e TREs decidem as trocas, e o TSE corrigiu o número de 4.352 seções, diz o Aos Fatos.",
  author: "Equipe Política Diária",
  verdict: "enganoso",
  quick:
    "Enganoso. Houve troca de local de votação entre os turnos, mas é decisão das zonas e dos TREs, e não do presidente do TSE, segundo o Aos Fatos. O número de 4.352 seções divulgado em 17/10 foi um erro de dados, admitiu o TSE. Antes de votar, consulte o local no e-Título ou no portal do TSE.",
  claim: {
    text: "O presidente do TSE, ministro Kássio Nunes Marques, teria mudado locais de votação em regiões favoráveis a Lula para influenciar o segundo turno, com endereços trocados e mudanças nunca anunciadas.",
    origin: "Postagens em redes sociais após a divulgação, em 17/10/2026, de que 4.352 seções mudaram de local, segundo o Aos Fatos (20/10/2026).",
    firstSeen: "2026-10-17",
    attribution: "Publicações em redes sociais",
  },
  date: "2026-10-24",
  checkedAt: "2026-10-24T08:10:00-03:00",
  updated: "2026-10-24",
  topic: "Eleições 2026",
  points: [
    {
      status: "verdade",
      text: "Houve troca de local de votação entre os turnos. A Agência Brasil publicou em 17/10 que a Justiça Eleitoral anunciou 4.352 seções com endereço alterado (0,87% das seções), com motivos como reformas de última hora, acessibilidade e danos causados por chuva e vento.",
    },
    {
      status: "falso",
      text: "O número de 4.352 estava errado. Segundo o SBT News (21/10), o TSE admitiu o erro, atribuído a lançamento de dados pelos TREs, e o valor corrigido era de 343 seções, depois de 441 na terça (20/10). O presidente do Colégio de Presidentes dos TREs disse que o dado de 4,3 mil comparava 2024 com 2026.",
    },
    {
      status: "falso",
      text: "Segundo o Aos Fatos, a troca de locais entre turnos é rotina prevista em norma e é decidida pelos TREs e zonas eleitorais, e não pelo presidente do TSE, que não poderia determiná-la.",
    },
    {
      status: "atencao",
      text: "Os números mudam conforme as zonas atualizam o sistema: 4.352 (17/10), 441 (20/10) e 343 (21/10), segundo as fontes. O total atual deve ser conferido no TSE. As páginas do TSE e do Fato ou Boato bloquearam o acesso automático (erro 403) e não entram como fontes abertas.",
    },
    {
      status: "atencao",
      text: "Nenhuma das fontes abertas aponta critério político nas trocas, e o Aos Fatos cita especialista da OAB Paraná que diz não haver base para acusar o TSE de manipular a eleição por esse meio. Isso não exclui erros pontuais, e por isso o eleitor deve conferir o próprio local.",
    },
  ],
  sources: [
    {
      label: "O que se sabe sobre as mudanças nas seções eleitorais no segundo turno",
      publisher: "Aos Fatos",
      url: "https://www.aosfatos.org/noticias/mudancas-secoes-eleitorais-segundo-turno/",
      kind: "agencia",
      note: "Classifica como enganoso. Diz que as trocas são decididas por TREs e zonas, não pelo presidente do TSE, e que o número de 4.352 veio de erro de atualização de dados; o TSE contava 441 em 20/10.",
      published: "2026-10-20",
    },
    {
      label: "TSE admite erro em anúncio de mudança de 4 mil seções",
      publisher: "SBT News",
      url: "https://sbtnews.sbt.com.br/noticia/eleicoes/tse-admite-erro-em-mudanca-de-4-mil-secoes-de-votacao",
      kind: "imprensa",
      note: "Relata que o TSE admitiu o erro do dado de 4.352 seções, comparado indevidamente com 2024, e que o valor corrigido era de 343 seções. Orienta consultar o local só por canais oficiais.",
      published: "2026-10-21",
    },
    {
      label: "Mais de 4 mil eleitores tiveram locais de votação alterados",
      publisher: "Agência Brasil",
      url: "https://agenciabrasil.ebc.com.br/politica/noticia/2026-10/mais-de-4-mil-eleitores-tiveram-locais-de-votacao-alterados",
      kind: "imprensa",
      note: "Registra o anúncio original de 4.352 seções (0,87%), os motivos (reformas, acessibilidade, chuva e vento) e como consultar o local pelo e-Título ou pelos sites dos TREs.",
      published: "2026-10-17",
    },
  ],
  timeline: [
    { date: "2026-10-17", text: "A Agência Brasil informa que a Justiça Eleitoral alterou o local de 4.352 seções para o 2º turno." },
    { date: "2026-10-20", text: "O Aos Fatos publica a checagem e informa que o TSE contava 441 seções alteradas, com o número de 4.352 atribuído a erro de dados." },
    { date: "2026-10-21", text: "O SBT News relata que o TSE admitiu o erro e que o total corrigido era de 343 seções." },
  ],
  content: `
    <h2>O que as fontes dizem</h2>
    <p>Depois do anúncio de que milhares de seções mudaram de endereço para o segundo turno, postagens passaram a afirmar que o presidente do TSE, ministro Kássio Nunes Marques, teria alterado locais de votação em áreas favoráveis a Lula para influenciar o resultado. Segundo o <a href="https://www.aosfatos.org/noticias/mudancas-secoes-eleitorais-segundo-turno/" target="_blank" rel="noopener noreferrer nofollow">Aos Fatos</a>, a atribuição é enganosa: trocar o local entre os turnos é rotina prevista em norma, e quem decide são os Tribunais Regionais Eleitorais e as zonas, não o presidente do TSE.</p>
    <p>A mudança existiu. A <a href="https://agenciabrasil.ebc.com.br/politica/noticia/2026-10/mais-de-4-mil-eleitores-tiveram-locais-de-votacao-alterados" target="_blank" rel="noopener noreferrer nofollow">Agência Brasil</a> noticiou em 17 de outubro que 4.352 seções, ou 0,87% do total, tiveram o endereço alterado, por reformas de última hora, melhorias de acessibilidade e danos de chuva e vento. Nossa <a href="/noticias/tse-4352-secoes-local-votacao-alterado">notícia daquele dia</a> reproduziu esse número, divulgado na ocasião.</p>

    <h2>O número foi corrigido</h2>
    <p>O dado de 4.352 não se sustentou. De acordo com o <a href="https://sbtnews.sbt.com.br/noticia/eleicoes/tse-admite-erro-em-mudanca-de-4-mil-secoes-de-votacao" target="_blank" rel="noopener noreferrer nofollow">SBT News</a>, o TSE admitiu erro de lançamento de dados pelos TREs, e o total corrigido foi de 343 seções, depois de 441 na terça-feira (20). O presidente do Colégio de Presidentes dos TREs afirmou que o dado de 4,3 mil comparava 2024 com 2026. O Aos Fatos também descreve o número de 4.352 como erro de atualização do sistema e informa que a contagem cai à medida que as zonas concluem as atualizações.</p>
    <p>As fontes divergem no total (343 ou 441, conforme o dia), e esta checagem registra as duas datas. Em qualquer caso, o Aos Fatos fala em menos de 0,1% das seções.</p>

    <h2>Por que o veredito é Enganoso</h2>
    <p>O fato central, a troca de endereços, é real. O que as fontes não sustentam é a conclusão de que houve manobra do presidente do TSE para favorecer um lado: a decisão é local, há motivos concretos listados, e nenhuma fonte aberta aponta critério político. Por isso o selo é Enganoso, e não Falso. Um especialista da OAB Paraná, citado pelo Aos Fatos, diz que acusar o TSE de manipular a eleição exige prova concreta.</p>
    <p>O que o eleitor deve fazer antes de domingo (25), quando a votação vai das 8h às 17h: conferir zona, seção e endereço no aplicativo e-Título ou no autoatendimento do portal do TSE, e desconfiar de links não oficiais. Para o calendário e os dados da disputa, veja o <a href="/eleicoes">painel de Eleições 2026</a> e as demais <a href="/checagem">checagens</a>.</p>
  `,
};
