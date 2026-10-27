import type { FactCheck } from "@/lib/types";

export const checagem: FactCheck = {
  slug: "prorrogacao-votacao-so-lula-pediu-pl-tambem-pediu-segundo-turno",
  title: "A campanha de Lula não foi a única a pedir mais tempo de votação no 2º turno: o PL também pediu",
  summary:
    "O PL pediu ao TSE, às 15h27, a prorrogação em SP, PR e SC. Zanin decidiu sobre o pedido do PT ao STF, que valeu para todo o país. Veja o que dizem Aos Fatos, CNN e Jovem Pan.",
  author: "Equipe Política Diária",
  verdict: "enganoso",
  quick:
    "Enganoso. Dizer que só a campanha de Lula pediu a extensão do horário omite que o PL também pediu, ao TSE, em estados específicos. A decisão de Zanin, porém, atendeu ao pedido do PT ao STF, de alcance nacional.",
  claim: {
    text: "A prorrogação da votação do segundo turno, até as 19h, teria sido pedida apenas pela campanha de Lula, o que levantaria suspeita sobre o resultado.",
    origin:
      "Argumento usado em pronunciamento do candidato Flávio Bolsonaro após o resultado, segundo a transcrição e a checagem do Aos Fatos (26/10/2026), e repetido em redes sociais.",
    firstSeen: "2026-10-25",
    attribution: "Pronunciamento citado pelo Aos Fatos e publicações em redes sociais",
  },
  date: "2026-10-27",
  checkedAt: "2026-10-27T07:55:00-03:00",
  updated: "2026-10-27",
  topic: "Eleições 2026",
  points: [
    {
      status: "verdade",
      text: "O PT também pediu a prorrogação. Pelos horários da CNN Brasil, o pedido à presidência do TSE ocorreu às 13h22 (Bahia), houve novo pedido às 15h42 e, depois, recurso ao STF por mais duas horas em todo o país.",
    },
    {
      status: "falso",
      text: "O PL também pediu. Às 15h27, a campanha de Flávio Bolsonaro acionou o TSE para pedir prorrogação em São Paulo, Paraná e Santa Catarina, por causa de condições climáticas (CNN Brasil, Jovem Pan e Aos Fatos).",
    },
    {
      status: "atencao",
      text: "Os pedidos não foram iguais: o do PL foi ao TSE e se limitava a alguns estados. A decisão de Zanin, às 16h57, respondeu ao pedido do PT ao STF e valeu para todo o país, incluindo os estados citados pelo PL.",
    },
    {
      status: "atencao",
      text: "Segundo o Aos Fatos, cerca de 35 mil votos foram registrados após as 17h, pelos logs das urnas, dado atribuído ao g1. A vitória de Lula foi por 4,4 milhões de votos.",
    },
  ],
  sources: [
    {
      label: "Derrotado, Flávio mente ao sugerir que eleição foi fraudada",
      publisher: "Aos Fatos",
      url: "https://www.aosfatos.org/noticias/derrotado-flavio-mente-sugerir-eleicao-fraudada/",
      kind: "agencia",
      note: "Checa a fala sobre a prorrogação. Lista horários dos pedidos do PL (15h27 e 15h42, ao TSE) e do PT (13h32 e 15h42 ao TSE, 15h46 ao STF) e a decisão de Zanin às 17h03. Os horários da CNN diferem em alguns minutos (ver análise).",
      published: "2026-10-26",
    },
    {
      label: "Votação prorrogada: veja cronologia que levou a impasse entre STF e TSE",
      publisher: "CNN Brasil",
      url: "https://www.cnnbrasil.com.br/eleicoes/votacao-prorrogada-veja-cronologia-que-levou-a-impasse-entre-stf-e-tse/",
      kind: "imprensa",
      note: "Cronologia: PL aciona o TSE às 15h27 para SP, PR e SC; PT pede ao STF mais duas horas em todo o país; Zanin decide às 16h57. A petição do PL não é reproduzida.",
      published: "2026-10-25",
    },
    {
      label: "Zanin determina prorrogação do horário da votação até 19h",
      publisher: "Jovem Pan",
      url: "https://jovempan.com.br/politica/zanin-determina-prorrogacao-do-horario-da-votacao-ate-19h/",
      kind: "imprensa",
      note: "Informa que o PT pediu prorrogação nacional por falta de ônibus e que o PL pediu em estados específicos por causa da chuva, e que o grupo do PL depois também levou o pedido ao STF.",
      published: "2026-10-25",
    },
  ],
  timeline: [
    { date: "2026-10-25", text: "Pedidos de prorrogação do PT e do PL chegam ao TSE ao longo da tarde. Zanin, do STF, determina a extensão até as 19h em todo o país e a votação termina no novo horário. À noite, Lula é declarado vencedor com 51,79% dos votos válidos (CNN Brasil)." },
    { date: "2026-10-26", text: "O Aos Fatos publica a checagem da fala sobre a prorrogação. A CNN Brasil atualiza sua cronologia." },
  ],
  content: `
    <h2>O que as fontes dizem</h2>
    <p>Segundo o <a href="https://www.aosfatos.org/noticias/derrotado-flavio-mente-sugerir-eleicao-fraudada/" target="_blank" rel="noopener noreferrer nofollow">Aos Fatos</a>, ao questionar a prorrogação da votação o candidato Flávio Bolsonaro tratou o pedido como se tivesse partido apenas da campanha de Lula. A agência mostra que a campanha do PL também fez pedidos à Justiça para estender o prazo em diversas cidades. Os horários variam um pouco entre as fontes, e por isso a Política Diária usa a cronologia da <a href="https://www.cnnbrasil.com.br/eleicoes/votacao-prorrogada-veja-cronologia-que-levou-a-impasse-entre-stf-e-tse/" target="_blank" rel="noopener noreferrer nofollow">CNN Brasil</a> como referência principal.</p>
    <p>Pela CNN Brasil, o PT pediu ao presidente do TSE, Kassio Nunes Marques, prorrogação em cidades da Bahia às 13h22. Às 15h27, o PL acionou o TSE para pedir a mesma providência em São Paulo, Paraná e Santa Catarina. Às 15h42, o PT pediu extensão em cinco estados. Depois de Nunes Marques pedir informações às prefeituras, o PT recorreu ao STF, e o ministro Cristiano Zanin decidiu às 16h57 estender a votação até as 19h em todo o país. A <a href="https://jovempan.com.br/politica/zanin-determina-prorrogacao-do-horario-da-votacao-ate-19h/" target="_blank" rel="noopener noreferrer nofollow">Jovem Pan</a> também registra que o PL pediu em estados específicos por causa da chuva.</p>

    <h2>O que muda entre os dois pedidos</h2>
    <p>Os pedidos tiveram alcance e destino diferentes. O do PL foi ao TSE e se restringia a três estados, segundo a CNN Brasil. O do PT chegou ao STF e pedia duas horas a mais em todo o país. A decisão de Zanin atendeu ao pedido do PT, mas, por valer nacionalmente, cobriu também os estados citados pelo PL. Segundo a Jovem Pan, o grupo do PL depois enviou o pedido ao STF. A reportagem da CNN não reproduz a petição do PL, e por isso esta checagem não detalha o texto dela.</p>
    <p>O Aos Fatos diz que, segundo logs das urnas, cerca de 35 mil votos foram registrados depois das 17h, e que a diferença entre os candidatos foi de 4,4 milhões de votos. Sobre o desdobramento da decisão, leia a notícia sobre <a href="/noticias/zanin-prorroga-votacao-19h-segundo-turno">a ordem de Zanin</a> e a análise dos <a href="/noticias/votos-prorrogacao-35-mil-anulacao-codigo-eleitoral">votos depois do horário regular</a>.</p>

    <h2>Por que o veredito é Enganoso</h2>
    <p>É verdade que o PT pediu a prorrogação e que foi o pedido do PT ao STF que originou a decisão. Mas a afirmação de que só um campo pediu não se sustenta: duas fontes de imprensa e a checagem do Aos Fatos registram o pedido do PL ao TSE. O Aos Fatos classifica esse ponto como falso. A Política Diária usa Enganoso porque o conjunto contém fatos verdadeiros (a decisão partiu do pedido do PT) mas a conclusão sugerida não se sustenta. O mesmo critério vale para qualquer campanha. Veja também a checagem sobre os <a href="/checagem/fiscais-pl-retirados-sala-cofre-tse-segundo-turno-falso">fiscais do PL na sala-cofre</a> e o painel <a href="/eleicoes">Eleições 2026</a>.</p>
  `,
};
