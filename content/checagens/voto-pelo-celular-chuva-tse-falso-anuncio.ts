import type { FactCheck } from "@/lib/types";

export const checagem: FactCheck = {
  slug: "voto-pelo-celular-chuva-tse-falso-anuncio",
  title: "É falso que o TSE tenha liberado voto pelo celular em caso de chuva",
  summary:
    "Posts com falso anúncio do TSE diziam que dava para votar pelo celular. Aos Fatos e Lupa checaram: o voto segue presencial, na urna eletrônica, e não há voto remoto.",
  author: "Equipe Política Diária",
  verdict: "falso",
  quick:
    "Falso. Em 4/10/2026, posts em WhatsApp e Facebook imitaram um anúncio do TSE para dizer que o eleitor poderia votar pelo celular se a chuva o impedisse de sair. Segundo Aos Fatos e Lupa, o voto é exclusivamente presencial, na urna eletrônica, e nenhum aplicativo ou site permite votar. No 2º turno, hoje, vale a mesma regra.",
  claim: {
    text: "O TSE teria liberado o voto pelo celular nesta eleição para quem não conseguisse chegar à seção por causa do tempo.",
    origin:
      "Postagens no Facebook e mensagens no WhatsApp na tarde de 4/10/2026, uma delas com imagem que imitava um anúncio patrocinado do perfil “TSE Informa”, segundo o Aos Fatos e a Lupa.",
    firstSeen: "2026-10-04",
    attribution: "Publicações em redes sociais e aplicativos de mensagens, segundo Aos Fatos e Lupa",
  },
  date: "2026-10-25",
  checkedAt: "2026-10-25T08:20:00-03:00",
  updated: "2026-10-25",
  topic: "Eleições 2026",
  points: [
    {
      status: "falso",
      text: "Segundo o Aos Fatos, o voto continua exclusivamente presencial, feito na urna eletrônica. O Brasil não tem sistema de votação remota pela internet ou por aplicativo, e o TSE reafirmou isso em julho de 2026.",
    },
    {
      status: "falso",
      text: "A Lupa informa que o e-Título não serve para votar. O aplicativo permite consultar o local de votação, justificar ausência, emitir certidões e ver boletins, mas não registra voto.",
    },
    {
      status: "verdade",
      text: "O celular pode ir até o local de votação, por exemplo para mostrar o e-Título. Mas, segundo Aos Fatos e Lupa, deve ser desligado e deixado com os mesários antes de o eleitor entrar na cabine.",
    },
    {
      status: "atencao",
      text: "Segundo as duas agências, boatos desse tipo já circularam em 2020 (o falso “Voto em Casa”) e podem levar a páginas falsas que coletam dados pessoais, como o CPF. Quem receber o link não deve clicar nem informar dados.",
    },
    {
      status: "atencao",
      text: "As páginas do TSE e da Justiça Eleitoral com a própria checagem não abriram para consulta automática (erro 403) e não entram como fontes. As afirmações do TSE aparecem aqui como relatadas por Aos Fatos e Lupa.",
    },
  ],
  sources: [
    {
      label: "TSE não liberou voto pelo celular nas eleições",
      publisher: "Aos Fatos",
      url: "https://www.aosfatos.org/noticias/tse-nao-liberou-voto-celular-eleicoes/",
      kind: "agencia",
      note: "Descreve o falso anúncio “TSE Informa”, afirma que o voto é só presencial e que o e-Título não permite voto remoto, e lembra o precedente de 2020. Publicada em 4/10/2026.",
      published: "2026-10-04",
    },
    {
      label: "É falso que TSE divulgou possibilidade de voto digital",
      publisher: "Agência Lupa",
      url: "https://www.agencialupa.org/eleicoes/2026/10/04/e-falso-que-tse-divulgou-possibilidade-de-voto-digital/",
      kind: "agencia",
      note: "Confirma de forma independente que nenhum aplicativo ou site permite votar, registra a nota do TSE de que o comunicado é falso e o alerta sobre links usados para coletar CPF. Publicada em 4/10/2026.",
      published: "2026-10-04",
    },
  ],
  timeline: [
    { date: "2020-11-01", text: "O TSE desmente mensagens sobre um suposto cadastro para “Voto em Casa”, segundo Aos Fatos e Lupa (novembro de 2020)." },
    { date: "2026-07-01", text: "O TSE reafirma que o voto é exclusivamente presencial, segundo o Aos Fatos (julho de 2026)." },
    { date: "2026-10-04", text: "No 1º turno, o falso anúncio de voto pelo celular circula no Facebook e no WhatsApp, e Aos Fatos e Lupa publicam a checagem à tarde." },
    { date: "2026-10-25", text: "Dia do 2º turno: a regra segue a mesma, voto presencial na urna eletrônica." },
  ],
  content: `
    <h2>O que as fontes dizem</h2>
    <p>Na tarde de 4 de outubro, dia do primeiro turno, circulou uma imagem que imitava um anúncio patrocinado do perfil “TSE Informa” no Facebook. Segundo o <a href="https://www.aosfatos.org/noticias/tse-nao-liberou-voto-celular-eleicoes/" target="_blank" rel="noopener noreferrer nofollow">Aos Fatos</a>, a peça mostrava uma pessoa sob a chuva e dizia que, se o tempo impedisse o eleitor de sair, o voto chegaria “mesmo assim”. A <a href="https://www.agencialupa.org/eleicoes/2026/10/04/e-falso-que-tse-divulgou-possibilidade-de-voto-digital/" target="_blank" rel="noopener noreferrer nofollow">Lupa</a> registra outra legenda, que convidava a votar pelo celular de forma “segura, rápida”.</p>
    <p>As duas agências chegam à mesma conclusão: o voto no Brasil é presencial e feito na urna eletrônica. Não existe votação remota por aplicativo ou site, e o e-Título, que pode mostrar o local de votação e justificar ausência, não registra voto. A Lupa cita a nota do TSE de que o comunicado é falso.</p>

    <h2>O que muda para quem vota hoje</h2>
    <p>Hoje é o segundo turno, e a regra é a mesma do primeiro. O eleitor deve ir à própria seção, com documento oficial com foto, e votar na urna. Quem não puder comparecer pode justificar a ausência depois, pelos canais da Justiça Eleitoral, mas não há como votar à distância.</p>
    <p>O celular pode ir ao local, por exemplo para exibir o e-Título, mas deve ser desligado e entregue aos mesários antes da cabine. Segundo as agências, mensagens desse tipo costumam trazer links para páginas falsas que pedem CPF e outros dados. Quem receber o link não deve clicar nem informar dado algum.</p>

    <h2>Por que o veredito é Falso</h2>
    <p>As duas fontes abertas apontam que não há voto pelo celular em nenhuma modalidade e que o anúncio não foi publicado pelos perfis oficiais do TSE, segundo a Lupa. O boato não é novo: em 2020 o TSE desmentiu um falso cadastro para “Voto em Casa”. Esta checagem não atribui a autoria do boato a ninguém, e a mesma régua vale para qualquer campo político: esse tipo de mensagem não favorece candidato específico.</p>
    <p>As páginas do TSE com a checagem não abriram para consulta automática, e por isso as afirmações do tribunal vêm como relatadas pelas agências. Para outras alegações sobre a votação, veja as <a href="/checagem">checagens</a> e o <a href="/eleicoes">painel de Eleições 2026</a>.</p>
  `,
};
