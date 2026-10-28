import type { FactCheck } from "@/lib/types";

export const checagem: FactCheck = {
  slug: "transporte-gratuito-barco-para-eleitores-pt-nao-pagou-governo-do-para",
  title: "Vídeo de barco com eleitores no Pará não mostra o PT pagando transporte para comprar votos",
  summary:
    "O barco existe, mas a gratuidade foi criada por decreto do governo do Pará, e a Lupa não achou prova de pagamento do PT. Faltam vagas e a Justiça Eleitoral apura.",
  author: "Equipe Política Diária",
  verdict: "enganoso",
  quick:
    "Enganoso. O vídeo é real e mostra passageiros de uma embarcação de empresa credenciada, mas a viagem gratuita foi criada por decreto do governo do Pará, que prevê ressarcir as operadoras. Não há prova de pagamento do PT nem de compra de votos. As queixas de eleitores que não conseguiram embarcar são um assunto à parte, em apuração.",
  claim: {
    text: "Vídeo com centenas de pessoas desembarcando de um barco diz que “a esquerda” está levando eleitores às urnas em barcos e “pagando”, e acusa o PT de comprar votos.",
    origin:
      "Vídeo no Instagram, com mais de 740 mil visualizações segundo a Lupa, que circulou na semana do segundo turno (25/10/2026).",
    firstSeen: "2026-10-25",
    attribution: "Publicação em rede social",
  },
  date: "2026-10-28",
  checkedAt: "2026-10-28T13:55:00-03:00",
  updated: "2026-10-28",
  topic: "Eleições 2026",
  points: [
    {
      status: "verdade",
      text: "O vídeo é uma gravação real de passageiros desembarcando de uma embarcação, cujo nome da empresa aparece no casco (Henvil Transportes, segundo a Lupa).",
    },
    {
      status: "verdade",
      text: "Houve transporte gratuito para eleitores no Pará: o Decreto 5.715, publicado em 19/10/2026 em edição extra do Diário Oficial do estado, tornou gratuitas as viagens intermunicipais rodoviárias e aquaviárias de 23/10 a 26/10, depois prorrogadas até 27/10.",
    },
    {
      status: "falso",
      text: "O transporte não foi pago por partido. O decreto prevê que o estado ressarça as operadoras, e a Lupa não encontrou evidência de pagamento do PT nem de compra de votos.",
    },
    {
      status: "atencao",
      text: "Houve queixas de eleitores que não conseguiram embarcar (Icoaraci e Marajó). O TRE-PA determinou medidas em 24/10 e a Lupa informa que o caso segue em análise no TRE-PA e no TSE. Isso não sustenta a acusação do vídeo.",
    },
  ],
  sources: [
    {
      label: "Não há provas de que PT pagou barcos para levar eleitores no Pará às urnas",
      publisher: "Agência Lupa",
      url: "https://www.agencialupa.org/verificacao/2026/10/27/nao-ha-provas-de-que-pt-pagou-barcos-para-levar-eleitores-no-para-as-urnas/",
      kind: "agencia",
      note: "Identifica a empresa no casco, cita o decreto e a regra de ressarcimento, relata a posição da operadora e informa que as queixas de acesso seguem em análise. Não achou prova de pagamento do PT.",
      published: "2026-10-27",
    },
    {
      label: "Governo do Pará garante transporte intermunicipal gratuito no segundo turno das eleições",
      publisher: "Agência Pará (governo do estado)",
      url: "https://agenciapara.com.br/noticia/80132/governo-do-para-garante-transporte-intermunicipal-gratuito-no-segundo-turno-das-eleicoes",
      kind: "primaria",
      note: "Em 19/10, informa o Decreto 5.715 (edição extra do Diário Oficial), a validade de 12h de 23/10 a 12h de 26/10, as regras de acesso e o ressarcimento às operadoras. A matéria não detalha a origem do dinheiro.",
      published: "2026-10-19",
    },
    {
      label: "Ônibus e barcos gratuitos no Pará: benefício é prorrogado até terça",
      publisher: "Diário do Pará",
      url: "https://diariodopara.com.br/para/onibus-e-barcos-gratuitos-no-para-beneficio-e-prorrogado-ate-terca/",
      kind: "imprensa",
      note: "Informa que a Artran pediu e o benefício foi prorrogado até as 12h de terça-feira (27/10).",
      published: "2026-10-25",
    },
    {
      label: "TRE-PA determina medidas para garantir transporte gratuito de eleitores após denúncias de dificuldades no Pará",
      publisher: "Estado do Pará Online",
      url: "https://estadodoparaonline.com/tre-pa-determina-medidas-para-garantir-transporte-gratuito-de-eleitores-apos-denuncias-de-dificuldades-no-para/",
      kind: "imprensa",
      note: "Liminar do TRE-PA de 24/10, a pedido do Ministério Público Eleitoral, obrigando governo, Artran e empresas a informar horários e capacidade e a não impor cotas ou cobranças.",
      published: "2026-10-25",
    },
    {
      label: "Icoaraci e Marajó: eleitores denunciam falta de transporte para votar",
      publisher: "DOL",
      url: "https://dol.com.br/noticias/politica/eleicoes-2026/966504/icoaraci-e-marajo-eleitores-denunciam-falta-de-transporte-para-votar",
      kind: "imprensa",
      note: "Relatos de eleitores que não conseguiram embarcar em 25/10 e nota da Artran dizendo que apura as queixas. Os relatos não foram verificados de forma independente pelo veículo.",
      published: "2026-10-25",
    },
  ],
  timeline: [
    { date: "2026-10-19", text: "O governo do Pará publica o Decreto 5.715, em edição extra do Diário Oficial, com transporte intermunicipal gratuito para o segundo turno." },
    { date: "2026-10-23", text: "Começa a gratuidade nas viagens intermunicipais rodoviárias e aquaviárias, às 12h." },
    { date: "2026-10-24", text: "O TRE-PA concede liminar, a pedido do Ministério Público Eleitoral, após denúncias de dificuldade de acesso." },
    { date: "2026-10-25", text: "Segundo turno. A Artran pede, e o governo prorroga a gratuidade até as 12h de 27/10. Eleitores relatam que não conseguiram embarcar em Icoaraci e no Marajó." },
    { date: "2026-10-27", text: "A Lupa publica a checagem do vídeo." },
  ],
  content: `
    <h2>O que as fontes dizem</h2>
    <p>O vídeo, que a <a href="https://www.agencialupa.org/verificacao/2026/10/27/nao-ha-provas-de-que-pt-pagou-barcos-para-levar-eleitores-no-para-as-urnas/" target="_blank" rel="noopener noreferrer nofollow">Agência Lupa</a> checou a pedido de leitores, mostra centenas de pessoas descendo de uma embarcação. Na legenda e na narração, o autor afirma que “a esquerda” está levando eleitores em barcos e “pagando”, e acusa o PT de comprar votos. A Lupa identificou a empresa pelo nome visível no casco, a Henvil Transportes, que consta na lista da Artran, a agência estadual que regula o transporte, entre as credenciadas para a gratuidade.</p>
    <p>A gratuidade tem origem oficial. Segundo a <a href="https://agenciapara.com.br/noticia/80132/governo-do-para-garante-transporte-intermunicipal-gratuito-no-segundo-turno-das-eleicoes" target="_blank" rel="noopener noreferrer nofollow">Agência Pará</a>, veículo do governo do estado, o Decreto 5.715 saiu em 19 de outubro em edição extra do Diário Oficial e liberou as viagens intermunicipais rodoviárias e aquaviárias entre 12h de 23 de outubro e 12h de 26 de outubro, para quem viajasse ao município onde vota. A ida exigia título, e-Título ou outro documento que comprovasse o local de votação, e a volta, o comprovante de voto. O decreto prevê que o estado ressarça as operadoras. Segundo o <a href="https://diariodopara.com.br/para/onibus-e-barcos-gratuitos-no-para-beneficio-e-prorrogado-ate-terca/" target="_blank" rel="noopener noreferrer nofollow">Diário do Pará</a>, a Artran pediu e o benefício foi prorrogado até as 12h de terça-feira, 27.</p>

    <h2>As queixas de quem não conseguiu embarcar</h2>
    <p>Há um problema real, separado da acusação. Segundo o <a href="https://dol.com.br/noticias/politica/eleicoes-2026/966504/icoaraci-e-marajo-eleitores-denunciam-falta-de-transporte-para-votar" target="_blank" rel="noopener noreferrer nofollow">DOL</a>, eleitores de Icoaraci e do Marajó disseram em 25 de outubro que não conseguiram embarcar, mesmo com bilhete, e a Artran informou que apurava as queixas. Esses relatos são de quem os fez e não foram verificados de forma independente. Antes disso, em 24 de outubro, o TRE-PA já havia concedido liminar, a pedido do Ministério Público Eleitoral, determinando que governo, Artran e empresas informassem horários e capacidade e não impusessem cotas ou cobranças, segundo o <a href="https://estadodoparaonline.com/tre-pa-determina-medidas-para-garantir-transporte-gratuito-de-eleitores-apos-denuncias-de-dificuldades-no-para/" target="_blank" rel="noopener noreferrer nofollow">Estado do Pará Online</a>. A Lupa informa que o caso segue em análise no TRE-PA e no TSE. A operadora disse à Lupa que seguiu o decreto e parou de emitir bilhetes quando a embarcação atingiu a capacidade, por regra de segurança da navegação.</p>

    <h2>Por que o veredito é Enganoso</h2>
    <p>O vídeo é real e a gratuidade também existe, por isso não se trata de montagem. O que as fontes não sustentam é a conclusão que o texto sugere: a de que um partido pagou os barcos para comprar votos. Pelo decreto e pela apuração da Lupa, o transporte foi um benefício estadual aberto a eleitores que comprovassem o local de votação. A Lupa não encontrou evidência de pagamento do PT. Ela também ressalta que o veredito trata só da acusação de pagamento partidário: as dificuldades de acesso são tema à parte e seguem sob apuração oficial.</p>
    <p>Usamos Enganoso, e não Falso, porque parte do que o vídeo mostra e implica é verdadeira (há barcos, eleitores e viagem gratuita). A mesma régua vale para qualquer campo: acusações de compra de votos exigem decisão ou documento, e não imagens de passageiros. Veja também a checagem sobre o <a href="/checagem/video-mala-r-17-milhao-compra-de-votos-pt-janeiro-cristalina">vídeo de mala com dinheiro, que não mostra compra de votos no segundo turno</a>, e o painel de <a href="/eleicoes">Eleições 2026</a>.</p>
  `,
};
