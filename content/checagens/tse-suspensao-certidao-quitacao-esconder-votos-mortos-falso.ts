import type { FactCheck } from "@/lib/types";

export const checagem: FactCheck = {
  slug: "tse-suspensao-certidao-quitacao-esconder-votos-mortos-falso",
  title: "É falso que o TSE tenha suspendido certidões de quitação para esconder votos de mortos",
  summary:
    "A emissão online da certidão foi mesmo suspensa, mas por calendário previsto desde fevereiro, segundo o TSE. O aviso não prova que alguém falecido tenha votado.",
  author: "Equipe Política Diária",
  verdict: "falso",
  quick:
    "Falso. A emissão da certidão de quitação eleitoral pela internet foi suspensa a partir de 26/10/2026, mas por rotina prevista no cronograma do Cadastro Eleitoral, e não para impedir consultas sobre falecidos. Segundo o TSE, a mensagem de indisponibilidade não prova que a pessoa consultada votou. A emissão volta em 3/11.",
  claim: {
    text: "A Justiça Eleitoral teria suspendido a emissão de certidões de quitação eleitoral depois do 2º turno para impedir que se descobrisse que pessoas mortas votaram.",
    origin:
      "Mensagens compartilhadas em redes sociais depois do 2º turno (25/10/2026), segundo o resumo da Gazeta do Paraná, que não reproduz as postagens originais.",
    firstSeen: "2026-10-30",
    attribution: "Publicações em redes sociais, segundo a Gazeta do Paraná",
  },
  date: "2026-11-01",
  checkedAt: "2026-11-01T07:41:00-03:00",
  updated: "2026-11-01",
  topic: "Eleições 2026",
  points: [
    {
      status: "verdade",
      text: "A emissão da certidão de quitação eleitoral pela internet foi de fato suspensa. Segundo o Campo Grande News, a suspensão começou em 26/10/2026 e a emissão volta na terça-feira, 3/11, inclusive pelo e-Título.",
    },
    {
      status: "falso",
      text: "Segundo a Gazeta do Paraná, que relata a checagem do TSE, a interrupção estava prevista desde fevereiro de 2026, para atualizar o Cadastro Eleitoral. Não foi uma medida tomada depois do 2º turno para esconder algo.",
    },
    {
      status: "falso",
      text: "O aviso de indisponibilidade aparece para todos os eleitores. Segundo o TSE, relatado pela Gazeta do Paraná, ele não prova que a pessoa consultada votou nem que o cadastro foi adulterado.",
    },
    {
      status: "verdade",
      text: "O mesmo tipo de pausa ocorreu no 1º turno. Segundo o Poder360 e A Crítica, a emissão ficou suspensa de 5 a 11/10 enquanto o TSE processava dados de comparecimento, ausência, justificativas e presença de mesários.",
    },
    {
      status: "atencao",
      text: "As páginas do TSE e da Justiça Eleitoral com a própria checagem não abriram para consulta automática (erro 403) e não entram como fontes. As afirmações do tribunal aparecem como relatadas pela imprensa. Quem precisar da certidão antes de 3/11 pode pedi-la presencialmente em cartório eleitoral, segundo o Campo Grande News.",
    },
  ],
  sources: [
    {
      label: "De fraude nas urnas a votos de pessoas mortas: confira as fake news que ainda circulam após as eleições de 2026",
      publisher: "Gazeta do Paraná",
      url: "https://gazetadoparana.com.br/publico/de-fraude-nas-urnas-a-votos-de-pessoas-mortas-confira-as-fake-news-que-ainda-circulam-apos-as",
      kind: "imprensa",
      note: "Resume a alegação, classifica como falsa com base no TSE e informa que a pausa estava prevista desde fevereiro para atualizar o Cadastro Eleitoral. Publicada em 30/10/2026.",
      published: "2026-10-30",
    },
    {
      label: "TSE retoma emissão de certidão de quitação eleitoral na próxima 3ª feira",
      publisher: "Campo Grande News",
      url: "https://www.campograndenews.com.br/politica/tse-retoma-emissao-de-certidao-de-quitacao-eleitoral-na-proxima-3afeira",
      kind: "imprensa",
      note: "Informa que a suspensão começou em 26/10 para consolidar dados do 2º turno, que é etapa técnica usada em eleições anteriores e que a emissão volta em 3/11. Publicada em 31/10/2026.",
      published: "2026-10-31",
    },
    {
      label: "Site do TSE registra como “faltou” eleitores que votaram",
      publisher: "Poder360",
      url: "https://www.poder360.com.br/poder-eleicoes-2026/site-do-tse-registra-como-faltou-eleitores-que-votaram/",
      kind: "imprensa",
      note: "Mostra que a mesma suspensão ocorreu no 1º turno, de 5 a 12/10, no cronograma da Resolução TSE nº 23.750/2026. Publicada em 6/10/2026.",
      published: "2026-10-06",
    },
    {
      label: "TSE nega fraude na apuração e diz que dados de comparecimento seguem em processamento",
      publisher: "A Crítica",
      url: "https://acritica.net/eleicoes-2026/tse-nega-fraude-na-apuracao-e-diz-que-dados-de-comparecimento-seguem-em-processamento/",
      kind: "imprensa",
      note: "Relata que o TSE descreveu a suspensão de 5 a 11/10 como parte do processamento de comparecimento e ausências, com retomada em 12/10. Publicada em 6/10/2026.",
      published: "2026-10-06",
    },
  ],
  timeline: [
    { date: "2026-02-01", text: "O cronograma do Cadastro Eleitoral, com pausas na emissão de certidões, é aprovado em fevereiro pela Resolução TSE nº 23.750/2026, segundo o Poder360 e a Gazeta do Paraná." },
    { date: "2026-10-05", text: "No 1º turno, a emissão online da certidão é suspensa de 5 a 11/10 enquanto o TSE processa os dados de comparecimento, segundo A Crítica." },
    { date: "2026-10-26", text: "Depois do 2º turno, a emissão é suspensa de novo para processar os dados da votação, segundo o Campo Grande News." },
    { date: "2026-10-30", text: "A Gazeta do Paraná publica o resumo do boato e a classificação de falso feita pelo TSE." },
  ],
  content: `
    <h2>O que as fontes dizem</h2>
    <p>Depois do segundo turno, mensagens passaram a afirmar que a Justiça Eleitoral teria suspendido a emissão de certidões de quitação eleitoral para impedir que se descobrisse que pessoas mortas votaram. A <a href="https://gazetadoparana.com.br/publico/de-fraude-nas-urnas-a-votos-de-pessoas-mortas-confira-as-fake-news-que-ainda-circulam-apos-as" target="_blank" rel="noopener noreferrer nofollow">Gazeta do Paraná</a> resumiu a alegação em 30 de outubro e registrou que o TSE a classifica como falsa.</p>
    <p>Segundo o TSE, relatado pela Gazeta do Paraná, a interrupção estava prevista desde fevereiro de 2026 para atualizar o Cadastro Eleitoral, e a mensagem de indisponibilidade não prova que a pessoa consultada votou nem que o cadastro foi alterado. O <a href="https://www.campograndenews.com.br/politica/tse-retoma-emissao-de-certidao-de-quitacao-eleitoral-na-proxima-3afeira" target="_blank" rel="noopener noreferrer nofollow">Campo Grande News</a> informa que a suspensão começou em 26 de outubro, para consolidar dados de comparecimento, ausências e justificativas, e que a emissão volta na terça-feira, 3 de novembro. Quem precisar do documento antes pode pedi-lo em cartório eleitoral.</p>

    <h2>Contexto: a mesma pausa já havia ocorrido no 1º turno</h2>
    <p>O <a href="https://www.poder360.com.br/poder-eleicoes-2026/site-do-tse-registra-como-faltou-eleitores-que-votaram/" target="_blank" rel="noopener noreferrer nofollow">Poder360</a> registrou em 6 de outubro que a emissão online, inclusive pelo e-Título, estava suspensa desde o dia 5, no cronograma da Resolução TSE nº 23.750/2026, enquanto o tribunal processava os dados do primeiro turno. <a href="https://acritica.net/eleicoes-2026/tse-nega-fraude-na-apuracao-e-diz-que-dados-de-comparecimento-seguem-em-processamento/" target="_blank" rel="noopener noreferrer nofollow">A Crítica</a> relata que o TSE descreveu a pausa de 5 a 11 de outubro como parte desse processamento, com retomada em 12 de outubro. Ou seja, o procedimento se repete a cada turno, e não foi criado depois do resultado de 25 de outubro.</p>

    <h2>Por que o veredito é Falso</h2>
    <p>A suspensão é real, mas o motivo atribuído a ela não se sustenta. As quatro fontes abertas descrevem uma pausa técnica prevista em calendário, aplicada nos dois turnos, e o TSE afirma que o aviso não indica quem votou. O voto é secreto e a urna não guarda quem votou junto com cada voto, segundo o TSE relatado pela imprensa. Esta checagem não atribui a autoria do boato a ninguém, e a mesma régua vale para qualquer campo político.</p>
    <p>As páginas do TSE com a checagem não abriram para consulta automática, e por isso as afirmações do tribunal vêm como relatadas pela imprensa. Veja também as checagens sobre <a href="/checagem/votos-apos-17h-decidiram-eleicao-lula-prorrogacao-falso">votos depois das 17h</a> e <a href="/checagem/votacao-unanime-106-secoes-zero-voto-flavio-nao-prova-fraude">seções com votação unânime</a>, e o <a href="/eleicoes">painel de Eleições 2026</a>.</p>
  `,
};
