import type { FactCheck } from "@/lib/types";

export const checagem: FactCheck = {
  slug: "relatorio-pericial-independente-fraude-2-turno-apocrifo-distorce-dados",
  title: "“Relatório Pericial Independente” não comprova fraude no 2º turno, diz o TSE",
  summary:
    "Documento sem autoria cita 1,8 milhão de votos após as 17h para sugerir fraude. O TSE contou 34.393 votos depois desse horário e rebate os demais pontos.",
  author: "Equipe Política Diária",
  verdict: "falso",
  quick:
    "Falso. O TSE contou 34.393 votos depois das 17h, e não 1,8 milhão, e a vantagem de Lula foi de 4.430.191 votos. O tribunal diz que o relatório, sem autoria, confunde horário do voto, fechamento da urna e totalização.",
  claim: {
    text: "Um documento de quatro páginas, apresentado como “Relatório Pericial Independente” com base em dados do TSE, diz ter achado fraude no 2º turno de 2026: atribui a vitória às seções encerradas depois das 17h, cita 1,8 milhão de votos, “votos manuais”, a Lei de Benford e um apagão de dados de 72 horas.",
    origin:
      "Imagens do documento, datado de 28/10/2026, divulgadas na plataforma X e republicadas em vídeos e posts em outras redes, segundo o TSE.",
    firstSeen: "2026-10-28",
    attribution: "Documento sem autoria identificada (apócrifo), segundo o TSE",
  },
  date: "2026-10-29",
  checkedAt: "2026-10-29T13:43:00-03:00",
  updated: "2026-10-29",
  topic: "Eleições 2026",
  points: [
    {
      status: "verdade",
      text: "Houve votos depois das 17h. A votação foi estendida até as 19h nas seções ainda abertas, por decisão do ministro Cristiano Zanin (STF), e o TSE contou 34.393 votos depois das 17h: 32.399 entre 17h e 18h, 1.981 entre 18h e 19h e 13 depois das 19h.",
    },
    {
      status: "falso",
      text: "Não foram 1,8 milhão de votos depois das 17h. Segundo o TSE, o número do relatório está muito acima dos 34.393 registrados, e a vantagem do candidato vencedor foi de 4.430.191 votos (64.256.232 contra 59.826.041).",
    },
    {
      status: "falso",
      text: "Votos incluídos no painel depois das 19h não são necessariamente votos dados depois das 17h. O TSE suspendeu o recebimento de boletins, a totalização e a divulgação enquanto a votação seguia, e, na retomada, os boletins traziam a votação inteira de cada seção.",
    },
    {
      status: "falso",
      text: "Habilitação sem biometria não é voto irregular, e não é possível saber em quem votou cada eleitor. Segundo o TSE, há procedimento alternativo previsto de identificação, e o Registro Digital do Voto guarda as escolhas sem ligá-las à identidade de quem votou.",
    },
    {
      status: "falso",
      text: "Não houve apagão de dados de 72 horas. O TSE afirma que os boletins foram impressos e afixados nas seções e divulgados na página Resultados, e que os arquivos dos dois turnos estão no portal de dados abertos.",
    },
    {
      status: "atencao",
      text: "O TSE diz que usar só o primeiro dígito na Lei de Benford é inadequado para sustentar conclusão de fraude e remete a esclarecimento anterior sobre o tema. Esta checagem não reproduziu o cálculo do relatório; o veredito se apoia nos números oficiais e na análise do tribunal.",
    },
  ],
  sources: [
    {
      label: "Relatório apócrifo distorce dados para sugerir fraude nas Eleições 2026",
      publisher: "Justiça Eleitoral (Fato ou Boato)",
      url: "https://www.justicaeleitoral.jus.br/fato-ou-boato/checagens/2026/relatorio-apocrifo-distorce-dados-para-sugerir-fraude-nas-eleicoes-2026",
      kind: "primaria",
      note: "Descreve o relatório e rebate cada ponto: votos depois das 17h, suspensão da totalização, habilitação sem biometria, sigilo do voto, Lei de Benford, suposto apagão e seções com voto único. Publicada em 28/10/2026, às 21h49, e atualizada em 29/10/2026, às 13h01.",
      published: "2026-10-28",
    },
    {
      label: "Eleições 2026: cerca de 34 mil votos foram registrados após as 17h no 2º turno",
      publisher: "Tribunal Superior Eleitoral",
      url: "https://www.tse.jus.br/comunicacao/noticias/2026/Outubro/eleicoes-2026-mais-de-34-mil-votos-foram-registrados-apos-as-17h-no-2o-turno",
      kind: "primaria",
      note: "Traz o levantamento oficial: 34.393 votos depois das 17h, em 497.333 seções com encerramento registrado depois desse horário, e informa que o recebimento de boletins, a totalização e a divulgação foram suspensos e retomados depois das 19h.",
    },
    {
      label: "Esclarecimento sobre prorrogação da votação",
      publisher: "Tribunal Superior Eleitoral",
      url: "https://www.tse.jus.br/comunicacao/noticias/2026/Outubro/esclarecimento-sobre-prorrogacao-da-votacao",
      kind: "primaria",
      note: "Nota do TSE de 25/10/2026: a eleição seguia apenas onde a votação não havia sido encerrada às 17h, e o recebimento dos boletins, a totalização e a divulgação seriam retomados depois das 19h.",
      published: "2026-10-25",
    },
    {
      label: "Votos registrados após as 17h não mudam resultado das eleições",
      publisher: "Aos Fatos",
      url: "https://www.aosfatos.org/noticias/votos-registrados-apos-as-17h-nao-mudam-resultado-das-eleicoes/",
      kind: "agencia",
      note: "Mostra que os 34.393 votos equivalem a cerca de 0,8% da vantagem de Lula e que, mesmo nos cenários extremos, mais de 98% dela permaneceria. Publicada em 27/10/2026.",
      published: "2026-10-27",
    },
  ],
  timeline: [
    { date: "2026-10-25", text: "Zanin estende a votação até as 19h nas seções ainda abertas. O TSE informa que retomará o recebimento de boletins, a totalização e a divulgação depois das 19h." },
    { date: "2026-10-27", text: "O Aos Fatos publica a conta dos 34.393 votos depois das 17h contra a vantagem de Lula." },
    { date: "2026-10-28", text: "O relatório sem autoria, datado desse dia, circula no X e em outras redes. À noite, o TSE publica o esclarecimento no Fato ou Boato." },
    { date: "2026-10-29", text: "O TSE atualiza o esclarecimento, às 13h01." },
  ],
  content: `
    <h2>O que as fontes dizem</h2>
    <p>O <a href="https://www.justicaeleitoral.jus.br/fato-ou-boato/checagens/2026/relatorio-apocrifo-distorce-dados-para-sugerir-fraude-nas-eleicoes-2026" target="_blank" rel="noopener noreferrer nofollow">Fato ou Boato, da Justiça Eleitoral</a>, descreve um relatório de quatro páginas, sem autoria, que se apresenta como pericial e independente. O documento atribui o resultado presidencial às seções encerradas depois das 17h, questiona habilitações sem biometria, cita a Lei de Benford e fala em indisponibilidade de boletins por 72 horas. Para o tribunal, os trechos apresentados não comprovam a conclusão de fraude.</p>
    <p>O levantamento do <a href="https://www.tse.jus.br/comunicacao/noticias/2026/Outubro/eleicoes-2026-mais-de-34-mil-votos-foram-registrados-apos-as-17h-no-2o-turno" target="_blank" rel="noopener noreferrer nofollow">TSE</a> registra 34.393 votos depois das 17h. O Fato ou Boato compara esse número com os 1,8 milhão citados no relatório e com a vantagem de 4.430.191 votos do candidato vencedor.</p>

    <h2>Horário do voto, fechamento da urna e totalização</h2>
    <p>Segundo o TSE, são três momentos distintos: quando o eleitor vota, quando a urna é encerrada e quando o resultado entra no painel. Depois da decisão que estendeu a votação, o tribunal <a href="https://www.tse.jus.br/comunicacao/noticias/2026/Outubro/esclarecimento-sobre-prorrogacao-da-votacao" target="_blank" rel="noopener noreferrer nofollow">suspendeu o recebimento de boletins, a totalização e a divulgação</a>, e os retomou depois das 19h. Na retomada, os boletins processados traziam os resultados completos das seções, inclusive votos dados antes das 17h.</p>
    <p>Por isso, votos que entraram no painel depois das 19h não são necessariamente votos dados depois das 17h. O tribunal observa, no painel de evolução da totalização, que o candidato vencedor liderava entre 17h10 e 19h, houve uma virada às 19h45 e ele retomou a liderança às 20h25. A <a href="/checagem/votos-apos-17h-decidiram-eleicao-lula-prorrogacao-falso">checagem sobre os votos depois das 17h</a> e o <a href="https://www.aosfatos.org/noticias/votos-registrados-apos-as-17h-nao-mudam-resultado-das-eleicoes/" target="_blank" rel="noopener noreferrer nofollow">Aos Fatos</a> mostram que mesmo o cenário extremo não alteraria o resultado.</p>

    <h2>Biometria, sigilo e Benford</h2>
    <p>O relatório chama de “votos manuais” os casos em que o eleitor não foi liberado pela digital. O TSE responde que a forma de identificação não altera o registro da escolha na urna e que, quando a digital não é reconhecida, há procedimento alternativo, com documento com foto, confirmação do ano de nascimento, assinatura no caderno de votação e identificação do mesário. O tribunal afirma ainda que não é possível saber em quem votaram os eleitores que compareceram depois das 17h, porque o voto é registrado sem ligação com a identidade.</p>
    <p>Sobre a Lei de Benford, o TSE diz que há consenso de que aplicá-la apenas ao primeiro dígito é inapropriado para apontar fraude. Sobre as seções com votos para um só candidato, informa que 106 tiveram votos exclusivos para o candidato vencedor no 2º turno e quatro para o adversário, e que algo parecido ocorreu em 2022.</p>

    <h2>Por que o veredito é Falso</h2>
    <p>O fato de que houve votos depois das 17h é verdadeiro e está nos números oficiais. A alegação central, de que 1,8 milhão de votos nesse período decidiram a eleição, é contrariada pelo levantamento do TSE, e a explicação sobre os horários do painel é desmentida pelo registro da suspensão e da retomada da totalização. Esta checagem não atribui o documento a ninguém, pois o próprio TSE o trata como sem autoria.</p>
    <p>O resultado oficial está no <a href="/eleicoes">painel de Eleições 2026</a>. Veja também <a href="/checagem/pausa-divulgacao-tse-fraude-primeiro-turno">a checagem sobre a pausa na divulgação do 1º turno</a> e as demais <a href="/checagem">checagens do 2º turno</a>.</p>
  `,
};
