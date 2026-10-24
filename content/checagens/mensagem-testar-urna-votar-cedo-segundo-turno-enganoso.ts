import type { FactCheck } from "@/lib/types";

export const checagem: FactCheck = {
  slug: "mensagem-testar-urna-votar-cedo-segundo-turno-enganoso",
  title: "Mensagem que manda eleitor “testar a urna” e votar cedo engana, segundo regras do TSE",
  summary:
    "Mensagens pedem que o eleitor teste a urna e vote cedo no 2º turno. Comprova e o Manual do Mesário do TSE mostram que o teste é dos mesários e que a fila das 17h vota.",
  author: "Equipe Política Diária",
  verdict: "enganoso",
  quick:
    "Enganoso. Mensagens na véspera do 2º turno orientam testar a urna antes de votar e votar cedo para não ser barrado por problemas de outros eleitores. Segundo o Comprova e o Manual do Mesário 2026 do TSE, o teste oficial é feito pelos mesários às 7h (zerésima), o eleitor não testa a urna, e quem está na fila às 17h vota com senha. Acompanhar o encerramento é permitido.",
  claim: {
    text: "Mensagens orientam o eleitor a votar cedo para não ser prejudicado por problemas de outros eleitores, a testar a urna antes de votar e a perguntar se o último eleitor pode acompanhar o encerramento e a transmissão dos dados.",
    origin:
      "Posts e mensagens de WhatsApp na véspera do 2º turno (25/10/2026), segundo o Comprova, que publicou a análise em 24/10/2026.",
    firstSeen: "2026-10-24",
    attribution: "Publicações em redes sociais e mensagens de WhatsApp, segundo o Comprova",
  },
  date: "2026-10-24",
  checkedAt: "2026-10-24T21:10:00-03:00",
  updated: "2026-10-24",
  topic: "Eleições 2026",
  points: [
    {
      status: "falso",
      text: "Não há previsão de que o eleitor teste a urna. Segundo o Comprova, os mesários fazem o teste do teclado e emitem a zerésima, relatório que mostra que a urna começa sem votos. O Manual do Mesário 2026, do TSE, descreve esse roteiro.",
    },
    {
      status: "falso",
      text: "Votar cedo não protege de problemas de outros eleitores. O manual manda desligar e religar a urna em caso de defeito e comunicar o Cartório Eleitoral se o problema persistir. Se a urna desligar com alguém votando, o voto não é registrado e a pessoa pode voltar a votar até as 17h.",
    },
    {
      status: "verdade",
      text: "A votação vai das 8h às 17h (horário de Brasília). Segundo o manual, quem estiver na fila depois das 17h recebe senha de acesso à seção e vota normalmente, o que dispensa a corrida ao primeiro horário.",
    },
    {
      status: "verdade",
      text: "O encerramento pode ser acompanhado, mas por qualquer pessoa, e não só pelo último eleitor. O manual diz que as duas últimas pessoas a votar são convidadas a acompanhar o encerramento e recebem uma via do Boletim de Urna. O Comprova acrescenta que o BU também fica afixado na seção.",
    },
    {
      status: "atencao",
      text: "As páginas do TSE citadas pelo Comprova (zerésima, tecla Confirma, simulador) e as resoluções 23.751 e 23.759/2026 não abriram para consulta automática (erro 403) e não entram como fontes. As regras acima vêm do Manual do Mesário 2026 e do Comprova.",
    },
  ],
  sources: [
    {
      label: "O que diz o TSE sobre mensagens que orientam testar a urna e votar cedo",
      publisher: "Projeto Comprova",
      url: "https://projetocomprova.com.br/publicações/o-que-diz-o-tse-sobre-mensagens-que-orientam-testar-a-urna-e-votar-cedo/",
      kind: "agencia",
      note: "Descreve as mensagens, explica que as regras não preveem teste da urna pelo eleitor, detalha a zerésima às 7h, a tecla Confirma, o encerramento e o horário de votação. Publicada em 24/10/2026.",
      published: "2026-10-24",
    },
    {
      label: "Manual do Mesário 2026",
      publisher: "Tribunal Superior Eleitoral (hospedado pelo TRE-RN)",
      url: "https://mesario.tre-rn.jus.br/wp-content/uploads/sites/6/2026/07/Manual-do-Mesario-2026-web.pdf",
      kind: "primaria",
      note: "Documento do TSE para as eleições de 2026. Traz o roteiro da zerésima, o que fazer em caso de defeito, as senhas para quem está na fila após as 17h, o encerramento e a proibição de celular na cabine.",
    },
  ],
  timeline: [
    { date: "2026-10-24", text: "O Comprova publica a análise sobre as mensagens que orientam testar a urna e votar cedo." },
    { date: "2026-10-24", text: "O Manual do Mesário 2026, do TSE, já descreve a zerésima, a fila após as 17h e o encerramento que valerão no 2º turno, marcado para 25/10." },
  ],
  content: `
    <h2>O que as fontes dizem</h2>
    <p>Na véspera do segundo turno, mensagens de WhatsApp e posts passaram a orientar o eleitor a votar cedo, para não ser prejudicado por problemas que outros eleitores possam causar, e a testar a urna antes de votar. Segundo o <a href="https://projetocomprova.com.br/publicações/o-que-diz-o-tse-sobre-mensagens-que-orientam-testar-a-urna-e-votar-cedo/" target="_blank" rel="noopener noreferrer nofollow">Projeto Comprova</a>, as mensagens também perguntam se o último eleitor pode acompanhar o encerramento e a transmissão dos dados.</p>
    <p>O Comprova explica que as normas do TSE não preveem teste da urna pelo eleitor. O teste oficial cabe à mesa: às 7h, os mesários conferem o teclado e imprimem a zerésima, o relatório que mostra que a urna começa sem nenhum voto. O <a href="https://mesario.tre-rn.jus.br/wp-content/uploads/sites/6/2026/07/Manual-do-Mesario-2026-web.pdf" target="_blank" rel="noopener noreferrer nofollow">Manual do Mesário 2026</a>, do TSE, acrescenta que as duas primeiras pessoas da fila são convidadas a acompanhar a emissão, e que o resumo da zerésima é afixado na entrada da seção.</p>

    <h2>O que acontece se a urna der problema</h2>
    <p>O manual prevê o caminho para defeitos: desligar e religar a urna, apertar Confirma no terminal do eleitor e registrar a ocorrência na ata. Se o problema persistir, o Cartório Eleitoral é comunicado. Quando a urna desliga com alguém votando, o voto não é registrado e a pessoa pode voltar para votar até as 17h. O manual não prevê nenhum benefício para quem vota no primeiro horário.</p>
    <p>Sobre o horário, o manual diz que a votação vai das 8h às 17h (horário de Brasília) e que quem estiver na fila depois das 17h recebe uma senha de acesso à seção. O encerramento só começa depois do voto da última pessoa. Segundo o Comprova, o tempo da tecla Confirma é de cerca de um segundo, durante a mensagem “Confira seu voto”, e apertá-la antes não faz o voto se perder.</p>

    <h2>Quem pode acompanhar o encerramento</h2>
    <p>Aqui a mensagem tem uma parte correta. O manual afirma que os procedimentos de encerramento podem ser acompanhados por qualquer pessoa e que as duas últimas pessoas a votar são convidadas a acompanhar e recebem uma via do Boletim de Urna. Segundo o Comprova, uma cópia assinada do boletim fica afixada no local, e os totais de cada seção podem ser consultados depois no portal de resultados do TSE. Para o dia da votação, vale a regra geral: celular não entra na cabine, como lembra a notícia sobre <a href="/noticias/celular-cabine-ordem-votacao-segundo-turno">celular na cabine e a ordem de votação</a>.</p>

    <h2>Por que o veredito é Enganoso</h2>
    <p>O veredito é Enganoso, e não Falso, porque a mensagem mistura itens diferentes. A ideia de que o eleitor deve testar a urna não tem base nas normas, e a de que é preciso votar cedo para escapar de problemas alheios não é sustentada pelo manual, que garante o voto a quem está na fila às 17h. Já a possibilidade de acompanhar o encerramento existe, embora seja mais ampla do que a mensagem sugere. Esta checagem não atribui a autoria das mensagens a ninguém.</p>
    <p>Na prática, o eleitor que quiser conferir algo tem caminhos oficiais: olhar o resumo da zerésima afixado na seção, pedir ao mesário orientação em caso de dúvida e consultar o boletim de urna depois. As páginas do TSE citadas pelo Comprova não abriram para consulta automática (erro 403) e por isso não entram como fontes. Para outros boatos sobre a votação, veja as <a href="/checagem">checagens</a> da Política Diária, o <a href="/eleicoes">painel de Eleições 2026</a> e a checagem sobre <a href="/checagem/quem-nao-votou-1-turno-nao-pode-votar-2-turno">quem não votou no 1º turno</a>.</p>
  `,
};
