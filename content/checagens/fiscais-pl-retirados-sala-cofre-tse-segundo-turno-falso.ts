import type { FactCheck } from "@/lib/types";

export const checagem: FactCheck = {
  slug: "fiscais-pl-retirados-sala-cofre-tse-segundo-turno-falso",
  title: "É falso que fiscais do PL tenham sido retirados da sala-cofre do TSE, diz o tribunal",
  summary:
    "Flávio Bolsonaro disse que fiscais do PL foram retirados da sala-cofre. O TSE respondeu que a afirmação é falsa e que dois fiscais acompanharam o teste e a totalização.",
  author: "Equipe Política Diária",
  verdict: "falso",
  quick:
    "Falso, segundo o TSE. A sala-cofre não é aberta à visitação, e o tribunal diz ter registro de presença e filmagem de dois fiscais do PL no teste de integridade e na totalização. Não localizamos evidência aberta da retirada.",
  claim: {
    text: "Fiscais do PL teriam sido retirados da sala-cofre do TSE logo depois da decisão do ministro Cristiano Zanin de prorrogar a votação do segundo turno.",
    origin:
      "Discurso do senador Flávio Bolsonaro (PL-RJ) na noite de 25/10/2026, depois do anúncio da vitória de Lula, ao dizer que não reconhecia o resultado e que pediria a anulação da eleição.",
    firstSeen: "2026-10-25",
    attribution: "Flávio Bolsonaro (PL-RJ), candidato derrotado no 2º turno",
  },
  date: "2026-10-26",
  checkedAt: "2026-10-26T13:55:00-03:00",
  updated: "2026-10-26",
  topic: "Eleições 2026",
  points: [
    {
      status: "falso",
      text: "Segundo nota do TSE reproduzida pela imprensa, “a afirmação é falsa”. O tribunal diz que dois fiscais do PL estiveram na Corte no domingo (25) e tiveram acesso a todas as áreas visitáveis.",
    },
    {
      status: "verdade",
      text: "A sala-cofre não é aberta à visitação, como informa o próprio TSE. Isso vale para qualquer partido, e não foi uma restrição aplicada só ao PL.",
    },
    {
      status: "verdade",
      text: "O TSE afirma que os fiscais acompanharam o Teste de Integridade das Urnas, no subsolo, e a totalização e a divulgação dos resultados, na Sala de Totalização, além de visitarem a Sala dos Partidos Políticos, no 5º andar.",
    },
    {
      status: "atencao",
      text: "As gravações e os registros de presença citados pelo TSE não são públicos. A checagem se apoia na nota do tribunal, divulgada pela imprensa, e a página do Fato ou Boato do TSE bloqueou o acesso automático (erro 403).",
    },
    {
      status: "atencao",
      text: "A Gazeta do Povo informa que procurou a campanha de Flávio Bolsonaro e que o espaço seguia aberto para manifestação. Se houver prova da retirada, a checagem será atualizada.",
    },
  ],
  sources: [
    {
      label: "TSE responde Flávio e diz que fiscais do PL não foram retirados da sala-cofre",
      publisher: "Gazeta do Povo",
      url: "https://www.gazetadopovo.com.br/eleicoes/2026/tse-responde-flavio-e-diz-que-fiscais-nao-foram-retirados-da-sala-cofre/",
      kind: "imprensa",
      note: "Registra a fala de Flávio, a nota do TSE (“a afirmação é falsa”), o acesso dos fiscais até o fim da apuração e a cronologia dos pedidos de prorrogação. Publicada em 26/10/2026.",
      published: "2026-10-26",
    },
    {
      label: "Flávio Bolsonaro é desmentido pelo TSE sobre fiscais em sala-cofre",
      publisher: "A Tarde",
      url: "https://atarde.com.br/eleicoes/flavio-bolsonaro-e-desmentido-pelo-tse-sobre-fiscais-em-sala-cofre-1407127",
      kind: "imprensa",
      note: "Reproduz a nota: a sala-cofre não é espaço aberto à visitação; dois fiscais do PL acompanharam o teste de integridade, a totalização e visitaram a Sala dos Partidos; há registro de presença e filmagem.",
      published: "2026-10-26",
    },
    {
      label: "TSE desmente Flávio Bolsonaro e diz não ter retirado fiscais do PL da sala-cofre",
      publisher: "abc+ (Redação O Estado de S. Paulo)",
      url: "https://www.abcmais.com/politica/tse-desmente-flavio-bolsonaro-e-diz-nao-ter-retirado-fiscais-do-pl-da-sala-cofre/",
      kind: "imprensa",
      note: "Confirma a fala de Flávio na noite de 25/10 e a nota do TSE, que também diz que fiscais de partidos, observadores internacionais, advogados e Ministério Público podem visitar as demais áreas.",
      published: "2026-10-26",
    },
  ],
  timeline: [
    { date: "2026-10-25", text: "O segundo turno é prorrogado por decisão do ministro Cristiano Zanin, do STF, depois de pedidos de PT e PL, noticia a Gazeta do Povo." },
    { date: "2026-10-25", text: "Lula é anunciado vencedor. Flávio Bolsonaro diz que fiscais do PL foram retirados da sala-cofre e que pedirá a anulação da eleição." },
    { date: "2026-10-26", text: "O TSE responde, em nota, que a afirmação é falsa e descreve a presença de dois fiscais do PL no tribunal." },
  ],
  content: `
    <h2>O que as fontes dizem</h2>
    <p>Na noite de domingo (25), depois da divulgação da vitória de Lula no segundo turno, o senador Flávio Bolsonaro (PL-RJ) disse que fiscais do PL haviam sido retirados da sala-cofre do TSE logo após a decisão do ministro Cristiano Zanin de prorrogar a votação. Segundo a <a href="https://www.gazetadopovo.com.br/eleicoes/2026/tse-responde-flavio-e-diz-que-fiscais-nao-foram-retirados-da-sala-cofre/" target="_blank" rel="noopener noreferrer nofollow">Gazeta do Povo</a>, ele citou a suposta retirada ao anunciar que não reconhecia o resultado e que pediria a anulação da eleição. Veja a cobertura em <a href="/noticias/flavio-nao-reconhece-resultado-pede-anulacao-eleicao">Flávio não reconhece o resultado e pede anulação da eleição</a>.</p>
    <p>O TSE respondeu pelo serviço Fato ou Boato. De acordo com <a href="https://atarde.com.br/eleicoes/flavio-bolsonaro-e-desmentido-pelo-tse-sobre-fiscais-em-sala-cofre-1407127" target="_blank" rel="noopener noreferrer nofollow">A Tarde</a> e com o <a href="https://www.abcmais.com/politica/tse-desmente-flavio-bolsonaro-e-diz-nao-ter-retirado-fiscais-do-pl-da-sala-cofre/" target="_blank" rel="noopener noreferrer nofollow">abc+</a>, a nota diz que a afirmação é falsa, que a sala-cofre não é um espaço aberto à visitação e que dois fiscais do partido estiveram no tribunal. Eles teriam acompanhado o Teste de Integridade das Urnas, no subsolo, a totalização e a divulgação dos resultados, na Sala de Totalização, e visitado a Sala dos Partidos, no 5º andar. O tribunal afirma haver registro de presença e filmagem.</p>

    <h2>Por que o veredito é Falso</h2>
    <p>O veredito se apoia na versão do órgão responsável pelo local, confirmada de forma coincidente por três veículos que abrimos e conferimos, e na ausência de qualquer evidência aberta de que fiscais tenham sido retirados. Duas ressalvas pesam na análise: a página original do TSE bloqueou o acesso automático, e os registros e as filmagens citados pelo tribunal não são públicos. Por isso atribuímos cada afirmação a quem a fez. A campanha de Flávio Bolsonaro foi procurada pela Gazeta do Povo, e nova informação, de qualquer lado, será incorporada com correção datada.</p>

    <h2>O que não está em questão aqui</h2>
    <p>Esta checagem trata apenas da alegação sobre os fiscais na sala-cofre. A decisão de Zanin de prorrogar a votação é um ato formal e pode ser contestada na Justiça pelos meios próprios, o que é matéria de cobertura jornalística e não de checagem. Veja também a <a href="/noticias/tse-pausa-apuracao-prorrogacao-segundo-turno">cobertura da prorrogação</a> e o <a href="/eleicoes">painel de Eleições 2026</a>. A mesma régua vale para qualquer alegação sobre o processo eleitoral, de qualquer campo.</p>
  `,
};
