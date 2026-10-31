import type { FactCheck } from "@/lib/types";

export const checagem: FactCheck = {
  slug: "lula-165-mil-votos-sem-origem-diferenca-entre-paineis-tse",
  title: "Vídeo não prova que 165 mil votos de Lula no 2º turno não têm origem",
  summary:
    "A diferença de 165.699 votos vem de painéis do TSE comparados em momentos diferentes da suspensão da divulgação, segundo o Aos Fatos, e não de votos sem origem.",
  author: "Equipe Política Diária",
  verdict: "enganoso",
  quick:
    "Enganoso. A diferença entre o total nacional e a soma de estados e exterior existe no vídeo, mas vem de telas do painel do TSE em momentos diferentes de atualização, com a divulgação suspensa. Não há fonte aberta que mostre votos inseridos sem origem.",
  claim: {
    text: "Um vídeo mostra um homem consultando o total nacional de Lula (PT) no painel de resultados do TSE, somando os valores de cada estado e do exterior e concluindo que 165.699 votos não têm origem identificada. Legendas perguntavam onde estaria o restante desses votos.",
    origin:
      "Vídeos no Instagram, Facebook e X e mensagens em WhatsApp, a partir da noite de 25/10/2026. Segundo o Aos Fatos, as publicações somavam ao menos 1,5 mil interações na tarde de 28/10.",
    firstSeen: "2026-10-25",
    attribution: "Publicações em redes sociais",
  },
  date: "2026-10-31",
  checkedAt: "2026-10-31T13:55:00-03:00",
  updated: "2026-10-31",
  topic: "Eleições 2026",
  points: [
    {
      status: "verdade",
      text: "Houve uma suspensão real. Em comunicado às 17h20 de 25/10, o TSE informou que suspendia a totalização e que a atualização do painel de resultados na internet fora interrompida, depois de decisão do ministro Cristiano Zanin que estendeu a votação até as 19h nas seções ainda abertas (Correio).",
    },
    {
      status: "verdade",
      text: "O vídeo mostra um painel nacional com 193.574 votos para Lula e 142.169 para Flávio Bolsonaro (PL), números de um momento muito inicial da apuração. A conta do vídeo parte dessa tela (Aos Fatos).",
    },
    {
      status: "falso",
      text: "A diferença de 165.699 votos não indica votos sem origem. Segundo o Aos Fatos, que cita explicação do TSE, a página nacional já tinha recebido dados que ainda não apareciam nas páginas por estado e do exterior, porque a atualização foi interrompida.",
    },
    {
      status: "falso",
      text: "Os votos de brasileiros no exterior entram no total nacional, mas aparecem em consulta separada. O Aos Fatos informa, com base no TSE, que a atualização dessa página foi interrompida antes de mostrar todos os números.",
    },
    {
      status: "atencao",
      text: "Não conseguimos abrir a página “Fato ou Boato” do TSE sobre o caso (o site recusou o acesso automático). A explicação do tribunal aparece aqui atribuída ao Aos Fatos, e não como fonte aberta por nós.",
    },
    {
      status: "atencao",
      text: "O resultado oficial e final consta dos boletins de urna e da totalização publicada depois da retomada da divulgação. Os 34.393 votos registrados após as 17h equivalem a cerca de 0,8% da vantagem de Lula, de cerca de 4,4 milhões de votos (Aos Fatos, com dados do TSE).",
    },
  ],
  sources: [
    {
      label: "Vídeo não prova que Lula teve 165 mil votos de origem não identificada",
      publisher: "Aos Fatos",
      url: "https://www.aosfatos.org/noticias/lula-165-mil-votos-origem-nao-identificada/",
      kind: "agencia",
      note: "Descreve a alegação, o alcance, a conta do vídeo e a explicação atribuída ao TSE: painéis comparados em momentos diferentes durante a suspensão da divulgação, sem votos sem origem.",
      published: "2026-10-28",
    },
    {
      label: "Votos registrados após as 17h não mudam resultado das eleições",
      publisher: "Aos Fatos",
      url: "https://www.aosfatos.org/noticias/votos-registrados-apos-as-17h-nao-mudam-resultado-das-eleicoes/",
      kind: "agencia",
      note: "Traz os números do TSE: 34.393 votos após as 17h e vantagem de Lula de cerca de 4,4 milhões de votos. Atualizada em 29/10.",
      published: "2026-10-27",
    },
    {
      label: "TSE suspende totalização dos votos após decisão que estende votação até as 19h",
      publisher: "Correio 24horas",
      url: "https://www.correio24horas.com.br/eleicoes/tse-suspende-totalizacao-dos-votos-apos-decisao-que-estende-votacao-ate-as-19h-1026",
      kind: "imprensa",
      note: "Registra, no dia 25/10, o comunicado do TSE das 17h20 sobre a suspensão da totalização e a interrupção do painel, e a decisão de Zanin de estender a votação até as 19h.",
      published: "2026-10-25",
    },
    {
      label: "De fraude nas urnas a votos de pessoas mortas: confira as fake news que ainda circulam após as eleições de 2026",
      publisher: "Gazeta do Paraná",
      url: "https://gazetadoparana.com.br/publico/de-fraude-nas-urnas-a-votos-de-pessoas-mortas-confira-as-fake-news-que-ainda-circulam-apos-as",
      kind: "imprensa",
      note: "Reúne boatos pós-eleição e lembra que o horário de transmissão do resultado de uma seção difere do horário em que o voto foi dado. Não trata do caso dos 165 mil votos.",
      published: "2026-10-30",
    },
  ],
  timeline: [
    { date: "2026-10-25", text: "Segundo turno. Às 17h20, o TSE comunica a suspensão da totalização e a interrupção da atualização do painel, após decisão de Zanin que estende a votação até as 19h nas seções abertas." },
    { date: "2026-10-25", text: "O vídeo da conta de 165.699 votos é gravado por volta das 17h57, durante a suspensão, segundo o Aos Fatos." },
    { date: "2026-10-28", text: "O Aos Fatos publica a checagem às 18h13, com a explicação do TSE sobre os painéis em momentos diferentes de atualização." },
    { date: "2026-10-29", text: "O Aos Fatos atualiza a checagem sobre os votos após as 17h com nova manifestação do TSE." },
  ],
  content: `
    <h2>O que as fontes dizem</h2>
    <p>No dia do segundo turno, 25 de outubro, o ministro do STF Cristiano Zanin determinou que a votação fosse estendida até as 19h nas seções ainda abertas, depois de um pedido da coligação de Lula. De acordo com o <a href="https://www.correio24horas.com.br/eleicoes/tse-suspende-totalizacao-dos-votos-apos-decisao-que-estende-votacao-ate-as-19h-1026" target="_blank" rel="noopener noreferrer nofollow">Correio 24horas</a>, o TSE informou às 17h20 que suspendia a totalização e que a atualização do painel de resultados na internet fora interrompida no mesmo momento. Para entender o contexto da prorrogação, veja também a <a href="/checagem/prorrogacao-votacao-so-lula-pediu-pl-tambem-pediu-segundo-turno">checagem sobre quem pediu a prorrogação</a>.</p>
    <p>Foi nesse intervalo que o vídeo foi gravado, por volta das 17h57, segundo o <a href="https://www.aosfatos.org/noticias/lula-165-mil-votos-origem-nao-identificada/" target="_blank" rel="noopener noreferrer nofollow">Aos Fatos</a>. Nele, um homem lê o total nacional de Lula, soma os valores por estado e do exterior e encontra 165.699 votos a menos. A tela usada mostra 193.574 votos para Lula e 142.169 para Flávio Bolsonaro, um quadro bem inicial da apuração.</p>

    <h2>De onde vem a diferença</h2>
    <p>Segundo o Aos Fatos, que cita a explicação do TSE, as páginas do painel estavam em momentos diferentes de atualização. A página nacional já tinha recebido dados que ainda não apareciam nas páginas por estado e do exterior. Os votos de brasileiros no exterior, onde a votação já havia terminado, entram no total nacional, mas a atualização da consulta do exterior foi interrompida antes de mostrar todos os números. Somar telas que não foram atualizadas juntas produz uma diferença, mas ela não indica votos criados ou sem origem.</p>
    <p>Não conseguimos abrir a página do TSE que trata do caso: o site recusou o acesso. Por isso, a explicação do tribunal está aqui atribuída ao Aos Fatos. A divulgação foi retomada depois das 19h, e o resultado oficial pode ser conferido nos boletins de urna de cada seção, como em <a href="/checagem/soma-tres-boletins-urna-teixeira-de-freitas-nao-comprova-fraude">outros casos que checamos</a>.</p>

    <h2>Por que o veredito é Enganoso</h2>
    <p>O vídeo parte de números reais de um painel e de uma suspensão real da divulgação. Isso explica por que a conta parece fechar uma diferença. A conclusão, porém, de que os votos não têm origem, não é sustentada: a única explicação aberta que encontramos aponta para telas desatualizadas em momentos distintos, e nenhuma fonte consultada mostra votos inseridos fora da apuração. Escolhemos Enganoso, e não Falso, porque a explicação técnica do TSE chegou até nós por intermédio de uma agência, e não pela página do tribunal.</p>
    <p>Sobre o peso dos votos registrados depois das 17h, o Aos Fatos informa que somam 34.393 e equivalem a cerca de 0,8% da vantagem de Lula, de cerca de 4,4 milhões de votos. Veja ainda a <a href="/checagem/relatorio-pericial-independente-fraude-2-turno-apocrifo-distorce-dados">checagem sobre o relatório que usa esses dados</a>. A mesma régua vale para qualquer dúvida sobre o processo eleitoral, de qualquer campo político: o painel é de consulta, e o número que vale é o do boletim de urna.</p>
  `,
};
