import type { FactCheck } from "@/lib/types";

export const checagem: FactCheck = {
  slug: "lula-2-milhoes-votos-bahia-decisao-zanin-falso",
  title: "É falso que Lula tenha ganhado 2 milhões de votos na Bahia após decisão de Zanin",
  summary:
    "Posts dizem que a prorrogação até as 19h rendeu 2 milhões de votos a Lula na Bahia. Segundo a Lupa e a Agência Brasil, só 1.656 votos foram dados no estado depois das 17h.",
  author: "Equipe Política Diária",
  verdict: "falso",
  quick:
    "Falso. Segundo a Agência Brasil, com dados do TSE, 1.656 votos foram registrados na Bahia depois das 17h, e não 2 milhões. Lula teve 6.485.258 votos no estado no 2º turno, e a diferença para o 1º turno foi de 820.487, segundo a Lupa.",
  claim: {
    text: "O ministro Cristiano Zanin, do STF, teria dado a Lula cerca de 2 milhões de votos a mais na Bahia ao prorrogar a votação do 2º turno até as 19h.",
    origin:
      "Publicações no X e no Facebook depois de 25/10/2026. Uma delas, no X, passava de 305 mil visualizações quando a Lupa a registrou, em 28/10.",
    firstSeen: "2026-10-25",
    attribution: "Perfis em redes sociais, segundo a Agência Lupa",
  },
  date: "2026-10-28",
  checkedAt: "2026-10-28T19:55:00-03:00",
  updated: "2026-10-28",
  topic: "Eleições 2026",
  points: [
    {
      status: "verdade",
      text: "A votação foi estendida até as 19h por decisão de Zanin em 25/10. Segundo a Lupa, a campanha de Lula recorreu ao STF e o ministro decidiu em caráter de urgência. A mesma reportagem registra que a campanha de Flávio Bolsonaro também pediu à Justiça Eleitoral a ampliação do horário em cidades de SP, PR e SC.",
    },
    {
      status: "verdade",
      text: "Houve votos depois das 17h: 34.393 em todo o país, segundo a Agência Brasil, o que equivale a 0,027% do total do dia. A Bahia foi a terceira em volume, com 1.656 votos.",
    },
    {
      status: "falso",
      text: "Não houve 2 milhões de votos extras na Bahia. O número alegado é mais de 1.200 vezes maior que os 1.656 votos dados no estado depois das 17h.",
    },
    {
      status: "falso",
      text: "Nem a variação entre os turnos chega perto disso. Segundo a Lupa, Lula passou de cerca de 5.664.771 votos no 1º turno para 6.485.258 no 2º, uma diferença de 820.487. O Congresso em Foco confirma os 6.485.258 do 2º turno (71,31% dos válidos).",
    },
    {
      status: "atencao",
      text: "A prorrogação foi pedida por motivos de transporte. Segundo a Lupa, o transporte de eleitores foi afetado em várias regiões, e em Salvador o TRE-BA determinou a prisão em flagrante do secretário municipal de Mobilidade após denúncia de redução superior a 50% da frota. Se a decisão foi correta é questão jurídica à parte, que esta checagem não julga.",
    },
  ],
  sources: [
    {
      label: "É falso que Lula ganhou 2 milhões de votos na Bahia após decisão do STF",
      publisher: "Agência Lupa",
      url: "https://www.agencialupa.org/eleicoes/2026/10/28/e-falso-que-lula-ganhou-2-milhoes-de-votos-na-bahia-apos-decisao-do-stf/",
      kind: "agencia",
      note: "Cruza dados do TSE por turno e por seção. Mostra 1.656 votos na Bahia depois das 17h e diferença de 820.487 votos de Lula entre os turnos. Publicada em 28/10/2026, às 16h52.",
      published: "2026-10-28",
    },
    {
      label: "TSE contabiliza menos de 35 mil votos após as 17h no 2º turno",
      publisher: "Agência Brasil",
      url: "https://agenciabrasil.ebc.com.br/politica/noticia/2026-10/tse-contabiliza-menos-de-35-mil-votos-apos-as-17h-no-2-turno",
      kind: "imprensa",
      note: "Traz os 34.393 votos depois das 17h, a distribuição por estado (Bahia com 1.656) e o fato de que os dois lados pediram mais tempo de votação. Publicada em 27/10/2026.",
      published: "2026-10-27",
    },
    {
      label: "Lula venceu eleição presidencial na Bahia",
      publisher: "Congresso em Foco",
      url: "https://www.congressoemfoco.com.br/noticia/129276/lula-venceu-eleicao-presidencial-na-bahia",
      kind: "imprensa",
      note: "Informa o resultado do 2º turno na Bahia: Lula com 6.485.258 votos (71,31% dos válidos) e Flávio Bolsonaro com 2.608.761 (28,69%).",
    },
    {
      label: "Em vídeo que sugere fraude, Nikolas Ferreira omite problemas reais no transporte e que PL também pediu prorrogação",
      publisher: "Agência Lupa",
      url: "https://www.agencialupa.org/eleicoes/2026/10/25/em-video-que-sugere-fraude-nikolas-ferreira-omite-problemas-reais-no-transporte-e-que-pl-tambem-pediu-prorrogacao/",
      kind: "agencia",
      note: "Descreve o contexto da decisão de Zanin em 25/10: pedido da campanha de Lula, falta de ônibus em Salvador e pedido anterior da campanha de Flávio Bolsonaro por mais tempo em cidades paulistas, paranaenses e catarinenses. Publicada em 25/10/2026.",
      published: "2026-10-25",
    },
  ],
  timeline: [
    { date: "2026-10-25", text: "Zanin amplia a votação até as 19h, em decisão de urgência. As duas campanhas haviam pedido mais tempo em regiões diferentes, segundo a Lupa e a Agência Brasil." },
    { date: "2026-10-27", text: "A Agência Brasil publica os números do TSE: 34.393 votos depois das 17h em todo o país, 1.656 deles na Bahia." },
    { date: "2026-10-28", text: "A Lupa publica a checagem sobre a alegação dos 2 milhões de votos na Bahia." },
  ],
  content: `
    <h2>O que as fontes dizem</h2>
    <p>Publicações nas redes sociais afirmam que a decisão do ministro Cristiano Zanin, do STF, de estender a votação do 2º turno até as 19h teria rendido cerca de 2 milhões de votos a Lula (PT) na Bahia. Segundo a <a href="https://www.agencialupa.org/eleicoes/2026/10/28/e-falso-que-lula-ganhou-2-milhoes-de-votos-na-bahia-apos-decisao-do-stf/" target="_blank" rel="noopener noreferrer nofollow">Agência Lupa</a>, uma das postagens, no X, passava de 305 mil visualizações.</p>
    <p>A <a href="https://agenciabrasil.ebc.com.br/politica/noticia/2026-10/tse-contabiliza-menos-de-35-mil-votos-apos-as-17h-no-2-turno" target="_blank" rel="noopener noreferrer nofollow">Agência Brasil</a> informa que o TSE contabilizou 34.393 votos depois das 17h em todo o país, ou 0,027% do total do dia. Os estados com mais votos nesse intervalo foram São Paulo (2.496), Rio de Janeiro (2.349), Bahia (1.656) e Pernambuco (577). Ou seja, a Bahia inteira teve 1.656 votos depois das 17h, e não 2 milhões.</p>

    <h2>A conta por turno</h2>
    <p>O <a href="https://www.congressoemfoco.com.br/noticia/129276/lula-venceu-eleicao-presidencial-na-bahia" target="_blank" rel="noopener noreferrer nofollow">Congresso em Foco</a> registra que Lula teve 6.485.258 votos na Bahia no 2º turno (71,31% dos válidos), contra 2.608.761 de Flávio Bolsonaro (PL). A Lupa compara com o 1º turno, em que Lula teve cerca de 5.664.771 votos no estado, e chega a um aumento de 820.487 votos entre os dois turnos. Esse crescimento, que ocorreu ao longo de todo o domingo e com mais eleitores comparecendo, também fica abaixo dos 2 milhões citados no boato.</p>

    <h2>O contexto da prorrogação</h2>
    <p>Segundo a <a href="https://www.agencialupa.org/eleicoes/2026/10/25/em-video-que-sugere-fraude-nikolas-ferreira-omite-problemas-reais-no-transporte-e-que-pl-tambem-pediu-prorrogacao/" target="_blank" rel="noopener noreferrer nofollow">Lupa</a>, Zanin decidiu depois de um pedido da campanha de Lula e citou a gravidade de relatos de falta de ônibus em Salvador. A mesma apuração registra que a campanha de Flávio Bolsonaro havia pedido ao TSE, antes, a ampliação do horário em cidades paulistas, paranaenses e catarinenses. A discussão sobre a legalidade da decisão corre à parte, nas ações em andamento, e aparece na <a href="/noticias/zanin-prorroga-votacao-19h-segundo-turno">notícia sobre a decisão de Zanin</a>.</p>

    <h2>Por que o veredito é Falso</h2>
    <p>O fato central do boato, 2 milhões de votos obtidos por causa da prorrogação na Bahia, é contrariado pelos números do TSE reportados pela Agência Brasil e pela Lupa: 1.656 votos no estado depois das 17h. A checagem não avalia se a decisão de Zanin foi acertada. Sobre o efeito dos votos tardios em todo o país, veja também a <a href="/checagem/votos-apos-17h-decidiram-eleicao-lula-prorrogacao-falso">checagem sobre os votos depois das 17h</a> e a <a href="/checagem/prorrogacao-votacao-so-lula-pediu-pl-tambem-pediu-segundo-turno">checagem sobre os pedidos de prorrogação</a>. O resultado oficial está no <a href="/eleicoes">painel de Eleições 2026</a>.</p>
  `,
};
