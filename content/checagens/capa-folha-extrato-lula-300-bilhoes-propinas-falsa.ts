import type { FactCheck } from "@/lib/types";

export const checagem: FactCheck = {
  slug: "capa-folha-extrato-lula-300-bilhoes-propinas-falsa",
  title: "É falso que a Folha tenha publicado extrato de Lula com R$ 300 bilhões em propinas",
  summary:
    "Imagem que imita a capa da Folha de S.Paulo diz mostrar extrato de Lula com quase R$ 300 bilhões em propinas. Lupa, AFP e Boatos.Org apontam montagem feita com IA.",
  author: "Equipe Política Diária",
  verdict: "falso",
  quick:
    "Falso. A capa que atribui à Folha de S.Paulo a divulgação de um extrato bancário de Lula com quase R$ 300 bilhões em propinas não foi publicada pelo jornal. Segundo a AFP, a própria Folha confirmou que a capa é falsa. Lupa e Boatos.Org apontam que a edição de 14/10/2026 não traz o tema e que a imagem foi gerada por inteligência artificial.",
  claim: {
    text: "Suposta capa da Folha de S.Paulo com a manchete “Primeiras imagens do extrato bancário de Lula”, que somaria quase R$ 300 bilhões em propinas e desvios.",
    origin:
      "Publicações no Facebook, Instagram e Threads, com mais de 120 mil visualizações em posts analisados pela AFP em 23/10/2026. O Boatos.Org registrou a imagem em 21/10/2026, depois que as campanhas discutiram abrir o sigilo bancário dos candidatos.",
    firstSeen: "2026-10-21",
    attribution: "Publicações em redes sociais",
  },
  date: "2026-10-26",
  checkedAt: "2026-10-26T08:20:00-03:00",
  updated: "2026-10-26",
  topic: "Eleições 2026",
  points: [
    {
      status: "falso",
      text: "Segundo a AFP, procurada, a Folha de S.Paulo confirmou que a capa é falsa e que não há notícia no site do jornal sobre divulgação de movimentações financeiras de Lula.",
    },
    {
      status: "falso",
      text: "A Lupa e o Boatos.Org informam que a capa original de 14/10/2026 não menciona extrato nem movimentações financeiras de Lula.",
    },
    {
      status: "falso",
      text: "Segundo a Lupa e a AFP, a imagem tem erros: indica 14/10 como terça-feira (foi quarta), e a tabela soma cerca de R$ 168 bilhões, não os R$ 299,2 bilhões anunciados.",
    },
    {
      status: "falso",
      text: "Lupa, AFP e Boatos.Org indicam que a imagem foi gerada por inteligência artificial. O Boatos.Org relata marca d’água associada a conteúdo sintético, e a Lupa cita 99,1% de probabilidade pela ferramenta Hive Moderation.",
    },
    {
      status: "atencao",
      text: "O Boatos.Org observa que a tabela mistura casos de natureza diferente: contratos, operações e estimativas de prejuízo, não valores recebidos por uma pessoa, e que muitos dos casos citados nem envolvem Lula.",
    },
    {
      status: "atencao",
      text: "Detectores automáticos de IA são indícios, não prova. O veredito se apoia na confirmação da Folha e na ausência da capa e da reportagem.",
    },
  ],
  sources: [
    {
      label: "É falsa capa da Folha de S. Paulo sobre supostos R$ 300 bilhões em propinas de Lula",
      publisher: "Agência Lupa",
      url: "https://www.agencialupa.org/verificacao/2026/10/25/e-falsa-capa-da-folha-de-s-paulo-sobre-supostos-r-300-bilhoes-em-propinas-de-lula/",
      kind: "agencia",
      note: "Não achou notícia no site da Folha, compara com a capa de 14/10/2026, aponta o erro de dia da semana e a soma de cerca de R$ 168 bilhões, e cita 99,1% de chance de IA (Hive Moderation).",
      published: "2026-10-25",
    },
    {
      label: "Folha não publicou capa sobre suposto extrato bancário de Lula (checagem da AFP Brasil)",
      publisher: "O Povo (checagem da AFP Brasil)",
      url: "https://www.opovo.com.br/noticias/politica/eleicoes/2026/10/23/folha-nao-publicou-capa-sobre-suposto-extrato-bancario-de-lula.html",
      kind: "agencia",
      note: "Relata que a Folha confirmou à AFP que a capa é falsa, que o preço e o slogan estão errados e que nenhum sigilo bancário de Lula havia sido divulgado até a publicação.",
      published: "2026-10-23",
    },
    {
      label: "Folha de S.Paulo divulga extrato bancário de Lula com propina de escândalos de corrupção?",
      publisher: "Boatos.Org",
      url: "https://www.boatos.org/politica/folha-de-s-paulo-divulga-extrato-bancario-de-lula-com-propina-de-escandalos-de-corrupcao.html",
      kind: "agencia",
      note: "Classifica a capa como falsa, compara com o arquivo da edição de 14/10/2026, cita marca d’água de conteúdo sintético e diz que a tabela mistura casos sem relação direta com valores recebidos por Lula.",
      published: "2026-10-21",
    },
  ],
  timeline: [
    { date: "2026-10-14", text: "Data da edição da Folha que a imagem falsa imita. A capa verdadeira, segundo Lupa e Boatos.Org, não traz o tema." },
    { date: "2026-10-21", text: "O Boatos.Org publica a checagem da imagem." },
    { date: "2026-10-22", text: "As campanhas de Lula e Flávio Bolsonaro assinam acordo sobre abertura de sigilos, e o ministro André Mendonça, do TSE, decide que cada candidato pode divulgar os seus por conta própria, segundo a AFP." },
    { date: "2026-10-23", text: "A AFP publica a checagem com a confirmação da Folha." },
    { date: "2026-10-25", text: "A Lupa publica a checagem." },
  ],
  content: `
    <h2>O que as fontes dizem</h2>
    <p>Circula nas redes uma imagem que imita a capa da Folha de S.Paulo e diz que o jornal mostrou o extrato bancário do presidente Lula com quase R$ 300 bilhões em propinas e desvios. Segundo a <a href="https://www.opovo.com.br/noticias/politica/eleicoes/2026/10/23/folha-nao-publicou-capa-sobre-suposto-extrato-bancario-de-lula.html" target="_blank" rel="noopener noreferrer nofollow">checagem da AFP publicada no O Povo</a>, posts com a imagem passaram de 120 mil visualizações, e a Folha, procurada, confirmou que a capa é falsa.</p>
    <p>A <a href="https://www.agencialupa.org/verificacao/2026/10/25/e-falsa-capa-da-folha-de-s-paulo-sobre-supostos-r-300-bilhoes-em-propinas-de-lula/" target="_blank" rel="noopener noreferrer nofollow">Agência Lupa</a> não encontrou nenhuma notícia sobre o suposto extrato no site do jornal e relata que a capa de 14 de outubro de 2026 não trata de movimentações financeiras de Lula. O <a href="https://www.boatos.org/politica/folha-de-s-paulo-divulga-extrato-bancario-de-lula-com-propina-de-escandalos-de-corrupcao.html" target="_blank" rel="noopener noreferrer nofollow">Boatos.Org</a> chegou à mesma conclusão, a partir do arquivo de capas da data.</p>

    <h2>Sinais de montagem</h2>
    <p>Segundo a Lupa e a AFP, a imagem indica 14/10 como terça-feira, mas o dia foi uma quarta-feira. O preço e o slogan também diferem dos da capa original, e a tabela do suposto extrato soma cerca de R$ 168 bilhões, e não os R$ 299,2 bilhões anunciados.</p>
    <p>As três checagens apontam que a imagem foi gerada por inteligência artificial. O Boatos.Org relata marca d’água de conteúdo sintético, e a Lupa cita 99,1% de probabilidade pela ferramenta Hive Moderation. Esses detectores são indícios e não sustentam sozinhos o veredito.</p>

    <h2>Contexto: o debate sobre os sigilos bancários</h2>
    <p>O boato ganhou força depois que a campanha de Lula propôs abrir o próprio sigilo bancário se Flávio Bolsonaro fizesse o mesmo. Segundo a AFP, em 22 de outubro as campanhas assinaram um acordo, e o ministro do TSE André Mendonça decidiu que cada candidato pode divulgar seus sigilos por conta própria. Até a publicação da checagem, nenhum sigilo de Lula havia sido divulgado.</p>
    <p>O Boatos.Org observa ainda que a tabela mistura contratos, operações e estimativas de prejuízo de casos distintos, que não são valores recebidos por uma pessoa, e que muitos dos casos citados nem envolvem Lula.</p>

    <h2>Por que o veredito é Falso</h2>
    <p>O fato central, a publicação da capa e do extrato pela Folha, é contrariado pelo próprio jornal, segundo a AFP, e por três agências independentes que comparam a imagem com a edição real. Esta checagem trata apenas dessa imagem e não avalia outras alegações sobre o presidente, que dependem de decisões judiciais e documentos próprios.</p>
    <p>Veja também o <a href="/eleicoes">painel de Eleições 2026</a> e outras <a href="/checagem">checagens</a>, como a da <a href="/checagem/pf-compra-de-votos-flavio-bolsonaro-reportagem-cnn-falsa">reportagem da CNN Brasil atribuída falsamente</a>, que atingia o outro campo.</p>
  `,
};
