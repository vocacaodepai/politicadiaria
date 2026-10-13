import type { FactCheck } from "@/lib/types";

export const checagem: FactCheck = {
  slug: "flavio-bolsonaro-nossa-senhora-aparecida-padroeira",
  title: "É falso que Flávio Bolsonaro queira tirar de Nossa Senhora Aparecida o título de padroeira",
  summary:
    "O projeto de 2007 citado nas redes é de outro deputado e está arquivado desde 2008. Flávio nega e o TSE mandou remover posts que apresentam o boato como fato.",
  author: "Equipe Política Diária",
  verdict: "falso",
  quick:
    "Falso. Não há projeto de Flávio Bolsonaro para tirar o título de padroeira. O PL 2.623/2007, citado nas redes, é de outro deputado, foi rejeitado pela Comissão de Educação e arquivado em 22/08/2008. Flávio nega a intenção.",
  claim: {
    text: "Flávio Bolsonaro (PL) pretende retirar de Nossa Senhora Aparecida o título de padroeira do Brasil, para agradar a grupos evangélicos.",
    origin:
      "Redes sociais, a partir da noite de quinta-feira (24/09/2026), com referência a um projeto de lei de 2007, a trechos de um comentário de TV e a um vídeo do candidato.",
    firstSeen: "2026-09-24",
    attribution: "Publicações em redes sociais",
  },
  date: "2026-10-13",
  checkedAt: "2026-10-13T16:10:00-03:00",
  updated: "2026-10-13",
  topic: "Eleições 2026",
  points: [
    {
      status: "verdade",
      text: "Existiu um projeto de lei sobre o tema: o PL 2.623/2007, apresentado em 12/12/2007 pelo então deputado Professor Victorio Galli (PMDB-MT), com a ementa “Altera a redação da Lei nº 6.802, de 30 de junho de 1980”, a lei do feriado de 12 de outubro.",
    },
    {
      status: "verdade",
      text: "Segundo o Aos Fatos, Galli foi assessor especial da Presidência no governo de Jair Bolsonaro e disputa em 2026 uma vaga de deputado federal pelo PP.",
    },
    {
      status: "verdade",
      text: "Flávio Bolsonaro disse em vídeo de campanha que, se eleito, um de seus primeiros atos seria decretar que o Brasil é do Senhor Jesus Cristo (Aos Fatos). A CNN Brasil informa que as publicações usaram um vídeo de agosto, fora de contexto.",
    },
    {
      status: "falso",
      text: "O projeto não é de Flávio Bolsonaro. A ficha da Câmara registra um único autor, Victorio Galli.",
    },
    {
      status: "falso",
      text: "O projeto não está em tramitação. A Comissão de Educação e Cultura o rejeitou por unanimidade em 09/07/2008 e a Mesa o arquivou em 22/08/2008, sem recurso.",
    },
    {
      status: "atencao",
      text: "Flávio atribuiu o boato ao PT e disse haver “ajuda de gente de dentro” da CNBB. As reportagens consultadas não trazem prova dessa acusação, e a CNBB, em nota, negou participação.",
    },
    {
      status: "atencao",
      text: "O TSE manteve a remoção de publicações que apresentam o vínculo como fato, mas o caso teve decisões divergentes no STF. A decisão trata de conteúdo e não impede críticas a Flávio por outros motivos.",
    },
  ],
  sources: [
    {
      label: "PL 2623/2007: ficha de tramitação",
      publisher: "Câmara dos Deputados",
      url: "https://www.camara.leg.br/proposicoesWeb/fichadetramitacao?idProposicao=380897",
      kind: "primaria",
      note: "Autor único Victorio Galli, apresentação em 12/12/2007, parecer pela rejeição aprovado por unanimidade em 09/07/2008 e arquivamento em 22/08/2008. Os mesmos dados constam na API de dados abertos da Câmara.",
    },
    {
      label: "Lei nº 6.802, de 30 de junho de 1980",
      publisher: "Câmara dos Deputados (legislação)",
      url: "https://www2.camara.leg.br/legin/fed/lei/1980-1987/lei-6802-30-junho-1980-357065-publicacaooriginal-1-pl.html",
      kind: "primaria",
      note: "Declara feriado nacional o dia 12 de outubro, em honra de Nossa Senhora Aparecida, Padroeira do Brasil. Publicada no Diário Oficial da União de 01/07/1980, página 13050.",
      published: "1980-07-01",
    },
    {
      label: "Boatos sobre Nossa Senhora Aparecida e Flávio repaginam narrativas falsas de 2018 e 2022",
      publisher: "Aos Fatos",
      url: "https://www.aosfatos.org/noticias/boato-sobre-nossa-senhora-aparecida-e-flavio-retoma-narrativas-falsas-de-2018-e-2022/",
      kind: "agencia",
      note: "Checagem do boato: início da circulação, PL 2623/2007, arquivamento, decisões do TSE e do STF e a negativa de Flávio.",
      published: "2026-09-26",
    },
    {
      label: "Caso Nossa Senhora Aparecida: entenda polêmica com Flávio Bolsonaro e projeto de lei",
      publisher: "Brasil de Fato",
      url: "https://www.brasildefato.com.br/2026/09/28/caso-nossa-senhora-aparecida-entenda-polemica-com-flavio-bolsonaro-e-projeto-de-lei/",
      kind: "imprensa",
      note: "Texto do projeto de 2007, rejeição na Comissão de Educação, correção da GloboNews, nota da CNBB e a sequência de decisões no TSE e no STF.",
      published: "2026-09-28",
    },
    {
      label: "TSE proíbe posts que vinculam Flávio a fake news de Nossa Senhora",
      publisher: "CNN Brasil",
      url: "https://www.cnnbrasil.com.br/politica/julgamento-tse-fake-news-nossa-senhora-aparecida/",
      kind: "imprensa",
      note: "Julgamento do TSE em 30/09/2026: os sete ministros concordaram em remover posts que afirmam, como fato, que Flávio propôs, apoiou ou articulou a retirada do título. Liminar de 25/09 e multa de R$ 50 mil às plataformas.",
      published: "2026-09-30",
    },
    {
      label: "TSE mantém remoção de posts que relacionam Flávio a caso Nossa Senhora",
      publisher: "Congresso em Foco",
      url: "https://www.congressoemfoco.com.br/noticia/122789/tse-mantem-remocao-de-posts-que-relacionam-flavio-a-caso-nossa-senhora",
      kind: "imprensa",
      note: "Placar e ressalvas do voto do relator (não é censura prévia, críticas seguem livres) e o vaivém no STF entre os ministros Dino e Fux, com o caso retirado da pauta por Fachin.",
      published: "2026-10-01",
    },
    {
      label: "Fake news de Nossa Senhora Aparecida foi como facada em mim, diz Flávio",
      publisher: "CNN Brasil",
      url: "https://www.cnnbrasil.com.br/eleicoes/fake-news-de-nossa-senhora-aparecida-foi-como-facada-em-mim-diz-flavio/",
      kind: "imprensa",
      note: "Declaração de Flávio em podcast e o uso de um vídeo de agosto fora de contexto. A matéria data o arquivamento do projeto em 2022; a ficha oficial da Câmara registra 2008, data adotada aqui.",
      published: "2026-09-29",
    },
    {
      label: "Entenda como Nossa Senhora Aparecida se tornou a padroeira do Brasil",
      publisher: "Diário de Pernambuco",
      url: "https://www.diariodepernambuco.com.br/vida-urbana/2025/10/11697891-entenda-como-nossa-senhora-aparecida-se-tornou-a-padroeira-do-brasil.html",
      kind: "imprensa",
      note: "Informa que o papa Pio XI proclamou Nossa Senhora Aparecida padroeira do Brasil em 1930.",
    },
    {
      label: "Nossa Senhora Aparecida",
      publisher: "Wikipédia",
      url: "https://pt.wikipedia.org/wiki/Nossa_Senhora_Aparecida",
      kind: "referencia",
      note: "Enciclopédia aberta que cita documento da Santa Sé: em 16/07/1930, decreto do papa Pio XI proclamou a santa padroeira principal do Brasil. Usada só para o contexto histórico.",
    },
  ],
  timeline: [
    { date: "1980-06-30", text: "Lei 6.802 declara feriado nacional o dia 12 de outubro, em honra de Nossa Senhora Aparecida, Padroeira do Brasil." },
    { date: "2007-12-12", text: "O deputado Victorio Galli apresenta o PL 2.623/2007, que altera a redação da Lei 6.802/1980." },
    { date: "2008-07-09", text: "A Comissão de Educação e Cultura aprova por unanimidade o parecer pela rejeição do projeto." },
    { date: "2008-08-22", text: "A Mesa da Câmara arquiva o projeto, sem recurso." },
    { date: "2026-09-24", text: "À noite, o boato associando Flávio Bolsonaro ao projeto começa a circular nas redes (Aos Fatos)." },
    { date: "2026-09-25", text: "O ministro André Mendonça, do TSE, determina em liminar a remoção de mais de mil publicações, a pedido da campanha de Flávio." },
    { date: "2026-09-27", text: "O ministro Flávio Dino, do STF, suspende a decisão após pedido do humorista Antonio Tabet. Flávio nega ter qualquer projeto sobre o tema." },
    { date: "2026-09-28", text: "A CNBB nega, em nota, participação na produção ou na divulgação de conteúdo falso. Flávio compara o boato à facada de 2018 em podcast." },
    { date: "2026-09-30", text: "O plenário do TSE, em sessão virtual, mantém a remoção das publicações que apresentam o vínculo como fato e libera a postagem de Tabet." },
  ],
  content: `
    <h2>O que os registros oficiais mostram</h2>
    <p>A ficha de tramitação da Câmara dos Deputados confirma a existência do <a href="https://www.camara.leg.br/proposicoesWeb/fichadetramitacao?idProposicao=380897" target="_blank" rel="noopener noreferrer nofollow">PL 2.623/2007</a>. Ele foi apresentado em 12 de dezembro de 2007 e tem um único autor, o então deputado Professor Victorio Galli (PMDB-MT). A ementa diz apenas “Altera a redação da Lei nº 6.802, de 30 de junho de 1980”. O relator na Comissão de Educação e Cultura, Átila Lira (PSB-PI), deu parecer pela rejeição, aprovado por unanimidade em 9 de julho de 2008. Sem recurso, a Mesa arquivou o projeto em 22 de agosto de 2008.</p>
    <p>A <a href="https://www2.camara.leg.br/legin/fed/lei/1980-1987/lei-6802-30-junho-1980-357065-publicacaooriginal-1-pl.html" target="_blank" rel="noopener noreferrer nofollow">Lei 6.802, de 30 de junho de 1980</a>, publicada no Diário Oficial de 1º de julho, declara feriado nacional o dia 12 de outubro, em honra de Nossa Senhora Aparecida, Padroeira do Brasil. Segundo o Aos Fatos e o Brasil de Fato, o projeto de 2007 trocava, nessa lei, a expressão “padroeira do Brasil” por “padroeira dos brasileiros católicos apostólicos romanos”.</p>
    <p>O título religioso tem outra origem. A Wikipédia, que cita documento da Santa Sé, registra que um decreto do papa Pio XI de 16 de julho de 1930 proclamou Nossa Senhora Aparecida padroeira principal do Brasil, e o Diário de Pernambuco também data de 1930 a proclamação. A lei de 1980 é o ato civil que cria o feriado.</p>

    <h2>Como o boato chegou às redes</h2>
    <p>Segundo o <a href="https://www.aosfatos.org/noticias/boato-sobre-nossa-senhora-aparecida-e-flavio-retoma-narrativas-falsas-de-2018-e-2022/" target="_blank" rel="noopener noreferrer nofollow">Aos Fatos</a>, a alegação começou a circular na noite de quinta-feira (24 de setembro). Trechos de uma fala da jornalista Maria Cristina Fernandes na GloboNews, que não citou Flávio, passaram a circular associados ao candidato. Conforme o Brasil de Fato, a emissora publicou depois uma correção em que reconhece que o projeto era de 2007 e não tinha relação com a candidatura.</p>
    <p>A CNN Brasil informa que as publicações também usaram um vídeo de agosto, em que Flávio dizia que, como presidente, decretaria que o Brasil “é do Senhor Jesus Cristo”. O Aos Fatos lembra que narrativas parecidas circularam contra Jair Bolsonaro em 2018 e 2022. O autor do projeto, Victorio Galli, foi assessor especial da Presidência no governo Bolsonaro, segundo o Aos Fatos. A ficha da Câmara não lista Flávio entre os autores.</p>

    <h2>O que Flávio, a CNBB e a Justiça Eleitoral disseram</h2>
    <p>Flávio Bolsonaro, que é <a href="/congresso/senadores/flavio-bolsonaro-5894">senador</a> e candidato do PL à Presidência, afirmou em vídeos que não tem nenhum projeto para alterar o título da padroeira e classificou as acusações como falsas, segundo o Brasil de Fato. Ele atribuiu a criação do conteúdo ao PT e disse que houve “ajuda de gente de dentro” da CNBB. As reportagens consultadas não trazem prova dessa acusação. A CNBB, em nota oficial, negou participação, afirmou que não integra estruturas partidárias e disse que “a mentira não se combate com outra mentira”.</p>
    <p>Na Justiça Eleitoral, o ministro André Mendonça, vice-presidente do TSE, atendeu em 25 de setembro a um pedido da campanha de Flávio e mandou remover mais de mil publicações, com multa de R$ 50 mil para plataformas que descumprissem, segundo a CNN Brasil. O ministro Flávio Dino, do STF, suspendeu a decisão em 27 de setembro, a pedido do humorista Antonio Tabet. De acordo com o Congresso em Foco, o ministro Luiz Fux restabeleceu a ordem do TSE no dia seguinte, e o presidente do STF, Edson Fachin, tirou o caso da pauta do plenário para que a Justiça Eleitoral se pronunciasse primeiro.</p>
    <p>Em sessão virtual de 30 de setembro, o TSE manteve a remoção das publicações que apresentam como fato que Flávio, ou sua família, propôs, apoiou ou articulou a retirada do título. A CNN Brasil relata que os sete ministros concordaram nesse ponto. A postagem de Tabet, que não citava Flávio, foi liberada. Mendonça afirmou que as determinações “não configuram censura prévia” e que a decisão não impede críticas a Flávio, manifestações religiosas nem debates sobre o título, conforme o Congresso em Foco.</p>

    <h2>Por que o veredito é Falso</h2>
    <p>A alegação tem uma base factual verificável: a ligação entre Flávio e o projeto de lei. Essa ligação não se sustenta. Os registros da Câmara mostram que o projeto é de outro deputado, foi rejeitado e arquivado há mais de 18 anos, e as checagens do Aos Fatos e do Brasil de Fato não apontam proposta do candidato sobre o tema. Flávio nega a intenção. Intenção futura não se prova nem se desmente por registro, mas quem faz a acusação precisa apresentar algo que a sustente, e nenhuma das fontes consultadas traz isso.</p>
    <p>O veredito vale para a alegação como circulou, e não impede o debate público sobre a relação entre política e religião nas campanhas. Críticas a posições de qualquer candidato seguem livres. O que esta checagem descarta é a afirmação de que Flávio Bolsonaro propôs, apoia ou articula a retirada do título de Nossa Senhora Aparecida. Para entender o cenário em que o boato se espalhou, veja a cobertura do <a href="/noticias/ibovespa-dolar-apos-primeiro-turno">resultado do primeiro turno</a>, que levou Flávio e Lula ao segundo turno, em 25 de outubro.</p>
  `,
};
