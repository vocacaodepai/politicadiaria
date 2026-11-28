import type { FactCheck } from "@/lib/types";

export const checagem: FactCheck = {
  slug: "foto-obelisco-copa-2022-nao-e-protesto-contra-milei",
  title: "Foto de multidão no Obelisco é da Copa de 2022, e não de protesto contra Milei",
  summary:
    "Imagem usada para falar em 1 milhão de argentinos contra o governo Milei foi feita em 18/12/2022, na festa do título mundial, mostram Lupa e Fast Check.",
  author: "Equipe Política Diária",
  verdict: "fora-de-contexto",
  quick:
    "Fora de contexto. A foto é real, mas mostra torcedores reunidos no Obelisco, em Buenos Aires, em 18 de dezembro de 2022, quando a Argentina ganhou a Copa. Não serve de prova de um protesto de 1 milhão de pessoas contra Javier Milei.",
  claim: {
    text: "1 milhão de argentinos vão pras ruas contra o governo de Javier Milei.",
    origin:
      "Publicações em português no X e no WhatsApp, segundo a Lupa, que cita um post com mais de 128 mil compartilhamentos.",
    attribution: "Publicações em redes sociais",
  },
  date: "2026-11-28",
  checkedAt: "2026-11-28T09:22:40-03:00",
  updated: "2026-11-28",
  topic: "Mundo",
  points: [
    {
      status: "verdade",
      text: "A imagem mostra uma multidão real no Obelisco de Buenos Aires, em vista aérea, em 18 de dezembro de 2022.",
    },
    {
      status: "falso",
      text: "A foto não registra ato contra o governo Milei: foi feita durante a comemoração do título da Argentina na Copa do Mundo do Catar.",
    },
    {
      status: "atencao",
      text: "Houve protestos na Argentina em 2026, como a marcha universitária de outubro, mas a imagem viral não é registro deles.",
    },
  ],
  sources: [
    {
      label: "Foto não mostra protesto de 1 milhão de pessoas contra o governo Milei",
      publisher: "Agência Lupa",
      url: "https://www.agencialupa.org/noticias/2026/11/13/foto-nao-mostra-protesto-de-1-milhao-de-pessoas-contra-o-governo-milei/",
      kind: "agencia",
      note: "Classifica como falso e atribui o registro original a Emiliano Lasalvia, da AFP, em 18/12/2022.",
      published: "2026-11-13",
    },
    {
      label: "Esta imagen de una multitud en Argentina no corresponde a protestas contra Milei",
      publisher: "Fast Check (Chile)",
      url: "https://www.fastcheck.cl/2026/11/05/esta-imagen-de-una-multitud-en-argentina-no-corresponde-a-protestas-contra-milei-es-de-las-celebraciones-tras-el-mundial-2022/",
      kind: "agencia",
      note: "Classifica como enganoso. A busca reversa levou a uma publicação da BBC Mundo de 18/12/2022; cita um post em português no X com mais de 90 mil visualizações.",
      published: "2026-11-05",
    },
  ],
  timeline: [
    { date: "2022-12-18", text: "Torcedores ocupam a região do Obelisco para comemorar o título mundial da Argentina; a foto é desse dia." },
    { date: "2026-11-05", text: "O Fast Check publica a verificação sobre a imagem usada como protesto contra Milei." },
    { date: "2026-11-13", text: "A Lupa publica checagem sobre a mesma foto em publicações em português." },
  ],
  content: `
    <h2>O que as fontes dizem</h2>
    <p>A <a href="https://www.agencialupa.org/noticias/2026/11/13/foto-nao-mostra-protesto-de-1-milhao-de-pessoas-contra-o-governo-milei/" target="_blank" rel="noopener noreferrer nofollow">Agência Lupa</a> fez busca reversa e localizou o registro original, de Emiliano Lasalvia, da agência AFP. A legenda de origem situa a cena no Obelisco, na festa pela conquista da Copa do Mundo de 2022 contra a França.</p>
    <p>O <a href="https://www.fastcheck.cl/2026/11/05/esta-imagen-de-una-multitud-en-argentina-no-corresponde-a-protestas-contra-milei-es-de-las-celebraciones-tras-el-mundial-2022/" target="_blank" rel="noopener noreferrer nofollow">Fast Check</a>, do Chile, chegou à mesma data a partir de outra publicação: encontrou a cena em publicação da BBC Mundo de 18 de dezembro de 2022 e comparou as bandeiras próximas ao monumento.</p>
    <p>As duas verificações citam medidas diferentes de alcance, de publicações descritas por cada uma: a Lupa fala em mais de 128 mil compartilhamentos; o Fast Check, em mais de 90 mil visualizações. Os selos também usam nomes distintos, falso na Lupa e enganoso no Fast Check.</p>

    <h2>Há protestos, mas a foto é outra</h2>
    <p>A Lupa registra que estudantes e professores protestaram em outubro contra cortes na educação, sem estimativa de público informada. O Fast Check também aponta a marcha universitária daquele mês como a grande mobilização mais recente que localizou. Nenhuma das duas liga a imagem viral a esses atos.</p>
    <p>O contexto argentino aparece na nossa cobertura da <a href="/noticias/argentina-inflacao-outubro-22-indec-maior-desde-abril">inflação de outubro no país</a> e na reação do <a href="/noticias/itamaraty-repudia-milei-ingerencia-eleicao">Itamaraty a falas de Milei sobre a eleição brasileira</a>.</p>

    <h2>Por que o veredito é Fora de contexto</h2>
    <p>A fotografia não foi descrita como montagem por nenhuma das fontes. O problema está na data e no sentido: uma festa esportiva de 2022 passou a ser apresentada como manifestação contra um governo, com um número de participantes que a imagem não comprova. Outras verificações estão em <a href="/checagem">Checagem</a>.</p>
  `,
};
