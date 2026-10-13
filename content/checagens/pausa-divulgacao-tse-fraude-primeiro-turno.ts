import type { FactCheck } from "@/lib/types";

export const checagem: FactCheck = {
  slug: "pausa-divulgacao-tse-fraude-primeiro-turno",
  title: "É falso que a pausa na divulgação do TSE no 1º turno tenha fraudado a eleição",
  summary:
    "A tela nacional do painel ficou 50 minutos parada em 4/10, mas urnas e totalização seguiram. TSE e Lupa descartam fraude, e o boletim de urna pode ser conferido.",
  author: "Equipe Política Diária",
  verdict: "falso",
  quick:
    "Falso. A tela “Brasil” do painel do TSE parou de 19h14 às 20h04 em 4/10 por excesso de dados, mas a apuração nas urnas e a totalização seguiram. A pausa foi real, a fraude não. O boletim de urna permite conferir os números.",
  claim: {
    text: "A pausa na divulgação dos resultados do primeiro turno, na noite de 4 de outubro, esconde fraude: o TSE teria recebido votos com erro de computação, e uma suposta análise de logs das urnas modelos 2013 e 2015 seria a prova.",
    origin:
      "Publicações no X, Instagram e TikTok depois da interrupção de 4/10/2026. Só no X, a Lupa contou mais de 139 mil visualizações.",
    attribution: "Publicações em redes sociais",
  },
  date: "2026-10-13",
  checkedAt: "2026-10-13T17:00:00-03:00",
  updated: "2026-10-13",
  topic: "Eleições 2026",
  points: [
    {
      status: "verdade",
      text: "Houve uma interrupção real: a tela nacional “Brasil” do painel de resultados parou às 19h14, quando 64,81% dos dados para presidente já estavam divulgados, e voltou às 20h04.",
    },
    {
      status: "verdade",
      text: "Segundo o TSE, a causa foi uma contenção no processamento após aumento no volume de dados, que travou o módulo que gera os arquivos da visualização nacional na internet. A visualização por estado continuou funcionando.",
    },
    {
      status: "falso",
      text: "A apuração nas urnas e a totalização não foram interrompidas, segundo o TSE, exceto por uma breve suspensão da totalização prevista em protocolo de segurança. A falha ficou restrita à divulgação na internet.",
    },
    {
      status: "falso",
      text: "O TSE diz que a imagem de dados mostrada no vídeo viral é “100% falsa” e não foi produzida com dados da Justiça Eleitoral (Lupa).",
    },
    {
      status: "atencao",
      text: "As checagens se apoiam principalmente na nota do TSE. Não localizamos auditoria técnica independente sobre a causa da falha, e o próprio tribunal prepara uma nova rotina para evitar repetição no segundo turno.",
    },
    {
      status: "atencao",
      text: "O eleitor pode conferir por conta própria: cada boletim de urna tem QR Code que permite verificar os números da seção pelos aplicativos Boletim na Mão e e-Título ou pelos arquivos publicados na internet.",
    },
  ],
  sources: [
    {
      label: "É falso que a demora de divulgação dos resultados pelo TSE indique fraude nas eleições",
      publisher: "Agência Lupa",
      url: "https://www.agencialupa.org/eleicoes/2026/10/06/e-falso-que-a-demora-de-divulgacao-dos-resultados-pelo-tse-indique-fraude-nas-eleicoes/",
      kind: "agencia",
      note: "Descreve as publicações, a explicação técnica do TSE, o horário da interrupção e a conclusão de que a pausa afetou a divulgação, não a apuração nem a totalização.",
      published: "2026-10-06",
    },
    {
      label: "TSE desmente alegação de fraude na apuração dos votos",
      publisher: "Folha de Pernambuco",
      url: "https://www.folhape.com.br/politica/tse-desmente-alegacao-de-fraude-na-apuracao-dos-votos/516945/",
      kind: "imprensa",
      note: "Reproduz a posição do TSE: o erro foi apenas na divulgação e não na contabilização dos votos; as abas dos estados seguiram registrando votos.",
      published: "2026-10-06",
    },
    {
      label: "TSE explica pausa na divulgação dos votos e nega fraude no primeiro turno",
      publisher: "Aqui (UAI)",
      url: "https://aqui.uai.com.br/cidades/tse-explica-pausa-na-divulgacao-dos-votos-e-nega-fraude-no-primeiro-turno/",
      kind: "imprensa",
      note: "Horários (19h14 às 20h04), percentual já divulgado (64,81%), causa informada pelo TSE e continuidade dos boletins de urna.",
      published: "2026-10-06",
    },
    {
      label: "TSE explica pausa de 50 minutos na divulgação dos votos e nega fraude nas eleições",
      publisher: "GC Mais",
      url: "https://gcmais.com.br/noticias/2026/10/07/tse-explica-pausa-de-50-minutos-na-divulgacao-dos-votos-e-nega-fraude-nas-eleicoes",
      kind: "imprensa",
      note: "Detalha o módulo afetado, a diferença entre apuração e totalização, a breve suspensão prevista em protocolo e a conferência pelo QR Code do boletim de urna.",
      published: "2026-10-07",
    },
  ],
  timeline: [
    { date: "2026-10-04", text: "Primeiro turno. Às 19h14, com 64,81% dos dados para presidente divulgados, a tela nacional do painel do TSE para de atualizar. Ela volta às 20h04." },
    { date: "2026-10-06", text: "As publicações com a alegação de fraude já circulam. O TSE explica a causa, nega fraude e diz que investiga a falha. A Lupa publica a checagem." },
    { date: "2026-10-07", text: "A Lupa atualiza a checagem. O TSE diz preparar uma nova rotina técnica para o segundo turno, marcado para 25 de outubro." },
  ],
  content: `
    <h2>O que de fato aconteceu</h2>
    <p>Na noite de 4 de outubro, a visualização nacional dos resultados para presidente no painel do TSE deixou de se atualizar às 19h14 e só foi normalizada às 20h04, segundo a <a href="https://www.agencialupa.org/eleicoes/2026/10/06/e-falso-que-a-demora-de-divulgacao-dos-resultados-pelo-tse-indique-fraude-nas-eleicoes/" target="_blank" rel="noopener noreferrer nofollow">Agência Lupa</a>. Naquele momento, 64,81% dos dados para presidente e vice já tinham sido divulgados. A pausa foi real, e o TSE reconheceu a falha. Em seguida, publicações nas redes passaram a dizer que ela escondia fraude, e a Lupa menciona uma suposta análise de logs das urnas dos modelos 2013 e 2015 usada como prova.</p>
    <p>Segundo o TSE, na versão publicada pela <a href="https://www.folhape.com.br/politica/tse-desmente-alegacao-de-fraude-na-apuracao-dos-votos/516945/" target="_blank" rel="noopener noreferrer nofollow">Folha de Pernambuco</a>, o erro foi apenas na divulgação e não na contabilização dos votos. A causa informada foi uma contenção no processamento, provocada por um volume grande de dados chegando ao mesmo tempo, que travou o módulo que gera os arquivos da visualização nacional na internet. A visualização por estado seguiu mostrando resultados parciais.</p>

    <h2>Apuração, totalização e divulgação são etapas diferentes</h2>
    <p>A apuração é feita nas urnas, que contam os votos de cada seção e geram o boletim de urna. A totalização soma os resultados das seções. A divulgação é a publicação desses números na internet. De acordo com o TSE, conforme o GC Mais, os boletins continuaram sendo transmitidos, processados e publicados durante a pausa, e a totalização seguiu, com uma breve suspensão prevista em protocolo de segurança para verificação individual dos sistemas. O que parou foi uma tela do painel.</p>
    <p>A Lupa informa ainda que o TSE classificou como “100% falsa” a imagem de dados exibida no vídeo viral: ela não foi produzida com dados da Justiça Eleitoral. Isso desmonta a parte da alegação que dependia dessa imagem como prova, embora não elimine a necessidade de explicar a falha, que o tribunal diz estar investigando.</p>

    <h2>O que ainda não se sabe e como conferir</h2>
    <p>As checagens consultadas se apoiam principalmente na nota do TSE. Não há, nas fontes que abrimos, uma auditoria técnica independente sobre a causa da falha. O tribunal diz que sua área de tecnologia analisa o caso e prepara uma nova rotina para que o problema não se repita no segundo turno, em 25 de outubro. O resultado de cada seção pode ser conferido: o boletim de urna tem QR Code, que permite checar os números pelos aplicativos Boletim na Mão e e-Título ou pelos arquivos disponíveis na internet.</p>

    <h2>Por que o veredito é Falso</h2>
    <p>A alegação junta um fato verdadeiro, a pausa na divulgação, a uma conclusão não sustentada, a de que houve fraude. O fato foi confirmado por quatro fontes abertas. A conclusão é contrariada pela nota do TSE, que separa divulgação de apuração, e pela checagem da Lupa, e nenhuma fonte consultada apresenta prova de adulteração de votos. A mesma régua vale para dúvidas sobre o processo eleitoral levantadas por qualquer campo político: a pergunta legítima, sobre o que causou a falha, tem resposta pública e pode ser acompanhada. Para o resultado do primeiro turno e a reação do mercado, veja a <a href="/noticias/ibovespa-dolar-apos-primeiro-turno">cobertura da Política Diária</a>.</p>
  `,
};
