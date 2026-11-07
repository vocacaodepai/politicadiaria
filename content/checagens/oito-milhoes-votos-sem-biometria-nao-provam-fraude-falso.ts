import type { FactCheck } from "@/lib/types";

export const checagem: FactCheck = {
  slug: "oito-milhoes-votos-sem-biometria-nao-provam-fraude-falso",
  title: "É falso que 8 milhões de votos sem biometria provem fraude no 2º turno, diz a Lupa",
  summary:
    "Posts dizem que 8 milhões de votos sem biometria, inclusive de mortos, provam fraude. A Lupa classifica como falso: voto sem biometria é permitido e exige identificação.",
  author: "Equipe Política Diária",
  verdict: "falso",
  quick:
    "Falso, segundo a Lupa. Votar sem biometria não é irregular: o eleitor precisa estar presente e identificado com documento oficial com foto. O voto de falecido não passa por esse caminho, e votar no lugar de outra pessoa é crime eleitoral.",
  claim: {
    text: "Publicações dizem que 8 milhões de votos registrados sem biometria no 2º turno de 2026, incluindo votos de pessoas mortas, comprovariam fraude nas urnas.",
    origin:
      "Posts no Facebook, no X e no WhatsApp após o 2º turno de 25/10/2026. Uma publicação no X, citada pela Lupa, tinha mais de 43 mil visualizações. O Gazeta do Paraná relata que uma versão usa o número de 8,6 milhões, tirado do relatório anônimo já checado.",
    firstSeen: "2026-11-05",
    attribution: "Publicações em redes sociais",
  },
  date: "2026-11-07",
  checkedAt: "2026-11-07T07:44:00-03:00",
  updated: "2026-11-07",
  topic: "Eleições 2026",
  points: [
    {
      status: "falso",
      text: "Segundo a Lupa, votar sem biometria não é irregular nem torna o voto inválido. Segundo o Gazeta do Paraná, o TSE não confirmou o número citado como dado oficial.",
    },
    {
      status: "verdade",
      text: "Há eleitores sem biometria cadastrada e a regra os autoriza a votar com documento oficial com foto. Segundo o NSC Total, a ausência de biometria não impede o voto.",
    },
    {
      status: "falso",
      text: "Segundo a Lupa, sem digital reconhecida a liberação exige a presença do eleitor, identificado com documento com foto, e só ocorre se o ano de nascimento informado por ele coincide com o cadastro. Mesários não votam pelo eleitor.",
    },
    {
      status: "falso",
      text: "A ideia de que esses votos sejam de mortos não se sustenta. Segundo a Lupa, o TSE cancela inscrições de falecidos com dados dos cartórios (Infodip), e votar no lugar de outra pessoa é crime, previsto no art. 309 do Código Eleitoral.",
    },
    {
      status: "atencao",
      text: "A Lupa diz que a operação de liberação fica registrada no log da urna e pode ser consultada em auditoria. Não encontramos fonte aberta com lista de votos por eleitor habilitado sem biometria, nem divulgação de irregularidade nesse procedimento.",
    },
  ],
  sources: [
    {
      label: "É falso que 8 milhões de votos sem biometria comprovam fraude nas eleições",
      publisher: "Agência Lupa",
      url: "https://www.agencialupa.org/eleicoes/2026/11/05/e-falso-que-8-milhoes-de-votos-sem-biometria-comprovam-fraude-nas-eleicoes/",
      kind: "agencia",
      note: "Classifica como falso, descreve a circulação e explica a liberação da urna pelo ano de nascimento, o log e o crime de votar por outrem. Publicada em 05/11/2026.",
      published: "2026-11-05",
    },
    {
      label: "Nova onda de fake news usa relatório falso, biometria e dados de cidades para questionar eleições de 2026",
      publisher: "Gazeta do Paraná",
      url: "https://gazetadoparana.com.br/publico/nova-onda-de-fake-news-usa-relatorio-falso-biometria-e-dados-de-cidades-para-questionar-eleicoes-de",
      kind: "imprensa",
      note: "Registra que o TSE não confirmou a quantidade como dado oficial e que a falta de reconhecimento biométrico não torna o voto irregular. Publicada em 06/11/2026.",
      published: "2026-11-06",
    },
    {
      label: "Não cadastrou a biometria? Veja como votar normalmente no segundo turno das Eleições 2026",
      publisher: "NSC Total",
      url: "https://www.nsctotal.com.br/politica/biometria-eleicoes-2026-segundo-turno-documentos",
      kind: "imprensa",
      note: "Explica, antes do 2º turno, que a ausência de biometria não impede o voto e que é preciso apresentar documento oficial com foto. A matéria não atribui a regra ao TSE. Publicada em 19/10/2026.",
      published: "2026-10-19",
    },
  ],
  timeline: [
    { date: "2026-10-19", text: "O NSC Total explica como votar no 2º turno sem biometria cadastrada." },
    { date: "2026-10-25", text: "Ocorre o 2º turno da eleição presidencial." },
    { date: "2026-11-05", text: "A Lupa publica a checagem dos posts sobre 8 milhões de votos sem biometria." },
    { date: "2026-11-06", text: "O Gazeta do Paraná reúne a checagem entre as alegações da nova onda de boatos." },
  ],
  content: `
    <h2>O que as fontes dizem</h2>
    <p>Posts nas redes afirmam que 8 milhões de votos teriam sido registrados sem biometria no segundo turno, incluindo votos de falecidos, e que isso provaria fraude. A <a href="https://www.agencialupa.org/eleicoes/2026/11/05/e-falso-que-8-milhoes-de-votos-sem-biometria-comprovam-fraude-nas-eleicoes/" target="_blank" rel="noopener noreferrer nofollow">Lupa</a> classificou a alegação como falsa em 5 de novembro de 2026.</p>
    <p>Segundo o <a href="https://gazetadoparana.com.br/publico/nova-onda-de-fake-news-usa-relatorio-falso-biometria-e-dados-de-cidades-para-questionar-eleicoes-de" target="_blank" rel="noopener noreferrer nofollow">Gazeta do Paraná</a>, o TSE não confirmou a quantidade como dado oficial, e uma das versões do boato usa o número de 8,6 milhões, atribuído ao relatório anônimo que já checamos em <a href="/checagem/relatorio-pericial-independente-fraude-2-turno-apocrifo-distorce-dados">outra matéria</a>.</p>

    <h2>Como funciona o voto sem biometria</h2>
    <p>Segundo o <a href="https://www.nsctotal.com.br/politica/biometria-eleicoes-2026-segundo-turno-documentos" target="_blank" rel="noopener noreferrer nofollow">NSC Total</a>, a ausência de biometria não impede o voto, e o eleitor deve levar documento oficial com foto. De acordo com a Lupa, quando a digital não é reconhecida, o mesário pode liberar a urna, mas não pode votar pelo eleitor: a liberação ocorre pelo ano de nascimento informado por quem está diante da mesa e só vale se ele coincide com o cadastro eleitoral. A Lupa cita ainda que a operação fica registrada no log da urna e pode ser consultada em auditoria posterior.</p>

    <h2>Por que o veredito é Falso</h2>
    <p>Habilitar um eleitor sem biometria é um procedimento previsto e não invalida o voto. O número de 8 milhões não vem de fonte oficial aberta, e a conclusão de que seriam votos de mortos contraria o que a Lupa reúne sobre o cancelamento de inscrições e sobre o crime eleitoral de votar em nome de outra pessoa. Quem tiver prova de irregularidade em uma seção pode levá-la à Justiça Eleitoral; o número isolado, sem lista, seção ou documento, não demonstra isso. A mesma régua vale para qualquer resultado e qualquer candidato. Veja outras <a href="/checagem">checagens do site</a> e o painel de <a href="/eleicoes">Eleições 2026</a>.</p>
  `,
};
