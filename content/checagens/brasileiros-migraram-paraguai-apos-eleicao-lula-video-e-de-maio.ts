import type { FactCheck } from "@/lib/types";

export const checagem: FactCheck = {
  slug: "brasileiros-migraram-paraguai-apos-eleicao-lula-video-e-de-maio",
  title: "Vídeo de brasileiros migrando para o Paraguai é de maio, não de depois da reeleição de Lula",
  summary:
    "Posts dizem que brasileiros foram em massa ao Paraguai após a eleição. Segundo Lupa e AFP, a reportagem é de maio; o pedido de residência cresce há anos.",
  author: "Equipe Política Diária",
  verdict: "falso",
  quick:
    "Falso. Segundo a Lupa e a AFP, o trecho de reportagem foi gravado em Ciudad del Este em maio de 2026, antes da eleição. A migração brasileira ao Paraguai é real e crescente, mas começou antes e o órgão paraguaio de migração nega êxodo pós-eleitoral.",
  claim: {
    text: "Publicações no Instagram e em outras redes mostram uma reportagem com brasileiros em fila e entrevistas com imigrantes, com a legenda de que “uma quantidade grande de brasileiros migraram para o Paraguai após o resultado das eleições”, sugerindo uma fuga em massa depois da reeleição de Lula.",
    origin:
      "Vídeos e posts em redes sociais a partir de 25 e 26 de outubro de 2026, segundo a AFP e o El Otro País. Nenhuma das agências identifica quem começou a circulação.",
    firstSeen: "2026-10-26",
    attribution: "Publicações em redes sociais",
  },
  date: "2026-11-06",
  checkedAt: "2026-11-06T19:44:04-03:00",
  updated: "2026-11-06",
  topic: "Eleições 2026",
  points: [
    {
      status: "falso",
      text: "O vídeo não foi gravado depois da eleição. Segundo a Lupa, a reportagem é da emissora paraguaia C9N e foi gravada em maio de 2026; a AFP localizou a versão original no YouTube, publicada em 19 de maio, em Ciudad del Este.",
    },
    {
      status: "falso",
      text: "Não houve êxodo pós-eleitoral. Segundo a AFP, a Direção Nacional de Migrações do Paraguai afirmou que não houve aumento relevante de pedidos de residência de brasileiros em 26 e 27 de outubro; para o El Otro País, o diretor do órgão disse que as filas mostradas são de operações móveis anteriores.",
    },
    {
      status: "verdade",
      text: "A procura de brasileiros por residência no Paraguai é real e vem crescendo. Segundo o ABC Color, o país registrou quase 50 mil pedidos de residência em 2026, mais de 70% de brasileiros, um recorde. A AFP descreve uma tendência de mais de três anos.",
    },
    {
      status: "atencao",
      text: "Segundo a Lupa, as buscas por “como morar no Paraguai” subiram 1.700% após a eleição, de acordo com o Google Trends citado pela Folha. Interesse em pesquisar não equivale a mudança de país. O mutirão de migração em Ciudad del Este iniciado em 2 de novembro é real, mas o vídeo checado é de outra edição.",
    },
    {
      status: "atencao",
      text: "As fontes usam recortes diferentes (pedidos de residência, residências concedidas, pedidos iniciados por brasileiros), por isso os números não são diretamente comparáveis entre si. Todos apontam alta contínua, não um salto pós-eleição.",
    },
  ],
  sources: [
    {
      label: "Vídeo de imigrantes brasileiros no Paraguai é anterior à reeleição de Lula",
      publisher: "Lupa",
      url: "https://www.agencialupa.org/jornalismo/2026/11/06/video-de-imigrantes-brasileiros-no-paraguai-e-anterior-a-reeleicao-de-lula/",
      kind: "agencia",
      note: "Selo Falso. Busca reversa levou à reportagem da C9N Paraguay, de maio de 2026; traz os números da DNM (23.526 pedidos de brasileiros em 2025) e o mutirão de Ciudad del Este iniciado em 2/11. Publicada em 06/11/2026.",
      published: "2026-11-06",
    },
    {
      label: "Video de migrantes brasileños en Paraguay es anterior a la reelección de Lula en octubre de 2026",
      publisher: "AFP (via Yahoo Notícias)",
      url: "https://es-us.noticias.yahoo.com/video-migrantes-brasile%C3%B1os-paraguay-reelecci%C3%B3n-180527983.html",
      kind: "agencia",
      note: "Localiza a reportagem original da C9N, de 19/05/2026, em Ciudad del Este, durante ação do MigraMóvil; registra a posição da Direção Nacional de Migrações. A página não exibe selo explícito. Publicada em 29/10/2026.",
      published: "2026-10-29",
    },
    {
      label: "Medios y redes informan sobre masiva huida de brasileños al Paraguay tras la victoria de Lula. Es falso",
      publisher: "El Otro País Verifica",
      url: "https://elotropais.org/2026/10/31/el-otro-pais-verifica/medios-y-redes-informan-sobre-masiva-huida-de-brasilenos-al-paraguay-tras-la-victoria-de-lula-es-falso/",
      kind: "agencia",
      note: "Selo “Es falso”. Atribui ao diretor da Migraciones, Jorge Kronawetter, que as filas são de operações anteriores, e cita 49.538 solicitações de residência de estrangeiros entre janeiro e setembro de 2026. Publicada em 31/10/2026.",
      published: "2026-10-31",
    },
    {
      label: "Migraciones registra récord histórico de solicitudes de residencia en Paraguay",
      publisher: "ABC Color",
      url: "https://www.abc.com.py/nacionales/2026/10/27/migraciones-registra-record-historico-de-solicitudes-de-residencia-en-paraguay/",
      kind: "imprensa",
      note: "Reproduz declarações do diretor Jorge Kronawetter: quase 50 mil pedidos em 2026, mais de 70% de brasileiros (31.706 até setembro), atribuídos principalmente à situação econômica do Paraguai. Publicada em 27/10/2026.",
      published: "2026-10-27",
    },
    {
      label: "Migraciones desmiente el “efecto Lula” y descarta un éxodo masivo de brasileños a Paraguay",
      publisher: "La Política Online",
      url: "https://www.lapoliticaonline.com/paraguay/asuncion/migraciones-desmiente-el-efecto-lula-y-descarta-un-exodo-masivo-de-brasilenos-a-paraguay-7079/",
      kind: "imprensa",
      note: "Cita o porta-voz regional da Migraciones em Ciudad del Este, Cornelio Melgarejo: “Por ahora no existe nada de lo que se muestra en las redes”. Publicada em 27/10/2026. Trechos econômicos e políticos do texto são opinativos e não foram usados.",
      published: "2026-10-27",
    },
    {
      label: "Migraciones anuncia el calendario del programa MigraMóvil 2026",
      publisher: "Dirección Nacional de Migraciones do Paraguai",
      url: "https://migraciones.gov.py/migraciones-anuncia-el-calendario-del-programa-migramovil-2026/",
      kind: "primaria",
      note: "O órgão paraguaio divulgou em janeiro um calendário preliminar de 22 edições do MigraMóvil ao longo de 2026, com a primeira em Ciudad del Este: os mutirões são um programa recorrente, e não uma resposta à eleição. A página não detalha as datas de maio e novembro. Publicada em 06/01/2026.",
      published: "2026-01-06",
    },
  ],
  timeline: [
    { date: "2026-01-06", text: "O órgão de migração do Paraguai divulga o calendário preliminar de 22 edições do MigraMóvil em 2026." },
    { date: "2026-05-19", text: "A emissora paraguaia C9N publica no YouTube a reportagem sobre brasileiros em Ciudad del Este, segundo a AFP." },
    { date: "2026-10-25", text: "Realizado o 2º turno da eleição presidencial." },
    { date: "2026-10-27", text: "A imprensa paraguaia registra declarações da Migraciones negando um êxodo de brasileiros." },
    { date: "2026-10-29", text: "A AFP publica que o vídeo viral é anterior à eleição." },
    { date: "2026-11-02", text: "Começa um mutirão de migração em Ciudad del Este, segundo a Lupa." },
    { date: "2026-11-06", text: "A Lupa publica a checagem do post que apresentava a reportagem de maio como fato pós-eleição." },
  ],
  content: `
    <h2>O que as fontes dizem</h2>
    <p>Após o segundo turno de 25 de outubro, um trecho de reportagem com brasileiros em fila e entrevistas com imigrantes passou a circular com a legenda de que muitos brasileiros haviam migrado para o Paraguai depois do resultado. Segundo a <a href="https://www.agencialupa.org/jornalismo/2026/11/06/video-de-imigrantes-brasileiros-no-paraguai-e-anterior-a-reeleicao-de-lula/" target="_blank" rel="noopener noreferrer nofollow">Lupa</a>, que classificou o conteúdo como falso, uma busca reversa levou à gravação original da emissora paraguaia C9N Paraguay, feita em maio de 2026, cerca de cinco meses antes da checagem.</p>
    <p>A <a href="https://es-us.noticias.yahoo.com/video-migrantes-brasile%C3%B1os-paraguay-reelecci%C3%B3n-180527983.html" target="_blank" rel="noopener noreferrer nofollow">AFP</a> chegou à mesma data, em 29/10: a reportagem original foi publicada em 19 de maio, em Ciudad del Este, durante uma ação do programa MigraMóvil, que facilita trâmites de documentação de migrantes. Ainda segundo a AFP, a Direção Nacional de Migrações do Paraguai afirmou que não houve aumento relevante de pedidos de residência de brasileiros em 26 e 27 de outubro. O <a href="https://elotropais.org/2026/10/31/el-otro-pais-verifica/medios-y-redes-informan-sobre-masiva-huida-de-brasilenos-al-paraguay-tras-la-victoria-de-lula-es-falso/" target="_blank" rel="noopener noreferrer nofollow">El Otro País Verifica</a> também deu o selo “Es falso” e atribui ao diretor do órgão, Jorge Kronawetter, a explicação de que as filas são de operações móveis anteriores à eleição.</p>

    <h2>O que é real: a migração brasileira ao Paraguai cresce</h2>
    <p>O vídeo é antigo, mas o fenômeno de fundo existe. Segundo o <a href="https://www.abc.com.py/nacionales/2026/10/27/migraciones-registra-record-historico-de-solicitudes-de-residencia-en-paraguay/" target="_blank" rel="noopener noreferrer nofollow">ABC Color</a>, que reproduz declarações do diretor da Migraciones, o Paraguai recebeu quase 50 mil pedidos de residência em 2026, um recorde, com mais de 70% de brasileiros (31.706 até setembro). O diretor atribuiu o aumento principalmente à situação econômica do Paraguai e disse que o crescimento deve continuar.</p>
    <p>A Lupa informa que o maior volume anterior foi o de 2025, com 23.526 pedidos de brasileiros, segundo dados da DNM. Já o El Otro País cita 49.538 solicitações de residência de estrangeiros entre janeiro e setembro de 2026, contra 47.687 em todo o ano de 2025. Os recortes variam entre as fontes (pedidos, residências concedidas, pedidos iniciados por brasileiros), mas todos indicam uma alta contínua, anterior à eleição. A <a href="https://www.lapoliticaonline.com/paraguay/asuncion/migraciones-desmiente-el-efecto-lula-y-descarta-un-exodo-masivo-de-brasilenos-a-paraguay-7079/" target="_blank" rel="noopener noreferrer nofollow">La Política Online</a> cita o porta-voz regional da Migraciones, Cornelio Melgarejo, que disse em 27/10: “Por ahora no existe nada de lo que se muestra en las redes”.</p>

    <h2>Buscas e mutirões: o que não prova uma fuga</h2>
    <p>Segundo a Lupa, que cita o Google Trends reportado pela Folha, as buscas por “como morar no Paraguai” subiram 1.700% depois da eleição. Pesquisar um assunto, porém, não equivale a mudar de país, e o próprio diretor da Migraciones, segundo o El Otro País, reconhece o aumento de consultas digitais sem tradução imediata em migração física.</p>
    <p>A Lupa também informa que um mutirão de migração começou em Ciudad del Este em 2 de novembro, depois da eleição, e que outro está previsto para a terceira semana de novembro em Pedro Juan Caballero. Esses mutirões fazem parte do MigraMóvil, que, segundo a <a href="https://migraciones.gov.py/migraciones-anuncia-el-calendario-del-programa-migramovil-2026/" target="_blank" rel="noopener noreferrer nofollow">Dirección Nacional de Migraciones</a>, tem calendário preliminar de 22 edições ao longo de 2026, com a primeira em Ciudad del Este. É um programa recorrente, e a reportagem de maio mostra uma edição anterior.</p>

    <h2>Por que o veredito é Falso</h2>
    <p>A alegação central, a de que os brasileiros migraram em massa para o Paraguai depois da eleição, é contrariada pela data da reportagem usada como prova (maio de 2026) e pela posição do órgão paraguaio, que nega um êxodo pós-eleitoral. O selo segue o da Lupa. Parte do cenário é verdadeira: o interesse e os pedidos de residência de brasileiros crescem, por razões que o diretor da Migraciones associa à economia do Paraguai. Isso não sustenta que o resultado da eleição tenha provocado uma fuga, e nenhuma das fontes abertas traz dado que mostre isso.</p>
    <p>A mesma régua vale para qualquer campo: imagem antiga apresentada como fato recente é checada da mesma forma, seja contra ou a favor de quem for. Veja outras <a href="/checagem">checagens do período eleitoral</a>, como a do <a href="/checagem/video-caminhao-de-lixo-fortaleza-e-de-2021-nao-de-depois-da-reeleicao-de-lula">vídeo de caminhão de lixo em Fortaleza</a>, e a notícia sobre a <a href="/noticias/paraguai-santiago-pena-renuncia-presidencia-ueno">renúncia do presidente do Paraguai, Santiago Peña</a>.</p>
  `,
};
