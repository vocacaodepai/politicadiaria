import type { FactCheck } from "@/lib/types";

export const checagem: FactCheck = {
  slug: "pf-compra-de-votos-flavio-bolsonaro-reportagem-cnn-falsa",
  title: "É falso que a CNN Brasil tenha noticiado compra de votos da PF para Flávio Bolsonaro",
  summary:
    "A reportagem real da CNN falou de R$ 27 milhões apreendidos pela PF e não cita Flávio Bolsonaro. A CNN, a Lupa e o Aos Fatos classificam a ligação como falsa.",
  author: "Equipe Política Diária",
  verdict: "falso",
  quick:
    "Falso. A CNN Brasil publicou em 3/10 que a PF apreendeu R$ 27 milhões em espécie no período eleitoral, mas sem citar Flávio Bolsonaro. A ligação com o candidato foi acrescentada em posts e vídeo, segundo a CNN, a Lupa e o Aos Fatos.",
  claim: {
    text: "Imagem e vídeo com a marca da CNN Brasil diziam que a Polícia Federal descobriu um esquema de compra de votos para Flávio Bolsonaro (PL) em estados do Norte e do Nordeste, com R$ 27 milhões apreendidos, e apontavam o candidato como responsável.",
    origin:
      "Publicações no Facebook e em outras redes na primeira semana de outubro de 2026. O Aos Fatos contou ao menos 5.200 interações nos posts até 8/10, e a Lupa registrou 40 compartilhamentos de uma das imagens até 15/10.",
    attribution: "Publicações em redes sociais",
  },
  date: "2026-10-20",
  checkedAt: "2026-10-20T19:50:00-03:00",
  updated: "2026-10-20",
  topic: "Eleições 2026",
  points: [
    {
      status: "verdade",
      text: "A CNN Brasil publicou em 3 de outubro que a PF já havia apreendido R$ 27 milhões em espécie no período eleitoral, em combate à compra de votos, com maior concentração em Tocantins, Roraima, Pará, Amazonas e Amapá.",
    },
    {
      status: "falso",
      text: "O texto da CNN Brasil não cita Flávio Bolsonaro. A CNN publicou uma matéria própria em 7 de outubro classificando como fake o vídeo que liga a reportagem ao candidato.",
    },
    {
      status: "falso",
      text: "O Aos Fatos não encontrou registro público, na imprensa ou nos canais da PF, de investigação por compra de votos para Flávio Bolsonaro. O balanço da PF de 5 de outubro trata de crimes eleitorais em geral.",
    },
    {
      status: "verdade",
      text: "Daniel Trindade (PL-RR) foi eleito deputado federal e havia sido preso pela PF em 25 de setembro. Segundo a Lupa, a legenda associa o caso dele ao candidato sem base.",
    },
    {
      status: "atencao",
      text: "Segundo o Aos Fatos, Trindade é investigado em suposto esquema de compra de votos em Boa Vista, mas a prisão de 25/9 foi por crimes ambientais e ele foi solto no dia seguinte sob fiança. Investigado não é condenado.",
    },
  ],
  sources: [
    {
      label: "Reportagem da CNN Brasil sobre compra de votos não cita Flávio Bolsonaro",
      publisher: "Agência Lupa",
      url: "https://www.agencialupa.org/verificacao/2026/10/19/reportagem-da-cnn-brasil-sobre-compra-de-votos-nao-cita-flavio-bolsonaro/",
      kind: "agencia",
      note: "Compara a imagem viral com a reportagem original de 3/10, que não cita o candidato, e esclarece o caso de Daniel Trindade.",
      published: "2026-10-19",
    },
    {
      label: "É falso que PF descobriu esquema de compra de votos para Flávio",
      publisher: "Aos Fatos",
      url: "https://www.aosfatos.org/noticias/pf-esquema-compra-votos-flavio/",
      kind: "agencia",
      note: "Não encontrou registro de investigação contra o candidato; o trecho da CNN foi usado fora de contexto e o balanço da PF não o cita.",
      published: "2026-10-08",
    },
    {
      label: "É fake vídeo em que CNN Brasil noticia compra de votos para Flávio",
      publisher: "CNN Brasil",
      url: "https://www.cnnbrasil.com.br/eleicoes/e-fake-video-em-que-cnn-brasil-noticia-compra-de-votos-para-flavio/",
      kind: "imprensa",
      note: "O veículo cuja marca aparece no material afirma que o vídeo é fake e reproduz a fala original do comentarista sobre o total apreendido.",
      published: "2026-10-07",
    },
    {
      label: "PF já apreendeu R$ 27 milhões em espécie em combate à compra de voto",
      publisher: "CNN Brasil",
      url: "https://www.cnnbrasil.com.br/eleicoes/pf-ja-apreendeu-r-27-milhoes-em-especie-em-combate-a-compra-de-voto/",
      kind: "imprensa",
      note: "Reportagem original de 3/10: R$ 27 milhões em espécie, 1.300 inquéritos e 52 pessoas conduzidas, sem menção ao candidato no texto.",
      published: "2026-10-03",
    },
  ],
  timeline: [
    { date: "2026-09-25", text: "A PF prende Daniel Trindade (PL-RR), candidato a deputado federal, em operação em Roraima." },
    { date: "2026-10-03", text: "A CNN Brasil publica a reportagem sobre R$ 27 milhões apreendidos pela PF no período eleitoral." },
    { date: "2026-10-07", text: "A CNN Brasil publica que o vídeo que liga a reportagem a Flávio Bolsonaro é falso." },
    { date: "2026-10-08", text: "O Aos Fatos publica a checagem." },
    { date: "2026-10-19", text: "A Lupa publica a sua checagem sobre a imagem que circulava no Facebook." },
  ],
  content: `
    <h2>O que as fontes dizem</h2>
    <p>A <a href="https://www.cnnbrasil.com.br/eleicoes/pf-ja-apreendeu-r-27-milhoes-em-especie-em-combate-a-compra-de-voto/" target="_blank" rel="noopener noreferrer nofollow">reportagem original da CNN Brasil</a>, de 3 de outubro, informa que a Polícia Federal já havia apreendido R$ 27 milhões em espécie no período eleitoral, com suspeita de compra de votos. Segundo o texto, a maior concentração estava em Tocantins, Roraima, Pará, Amazonas e Amapá. A matéria cita 1.300 inquéritos abertos e 52 pessoas conduzidas à PF, e não menciona Flávio Bolsonaro no corpo do texto.</p>
    <p>Em 7 de outubro, a própria CNN Brasil publicou que o <a href="https://www.cnnbrasil.com.br/eleicoes/e-fake-video-em-que-cnn-brasil-noticia-compra-de-votos-para-flavio/" target="_blank" rel="noopener noreferrer nofollow">vídeo que liga a reportagem ao candidato é fake</a>. O <a href="https://www.aosfatos.org/noticias/pf-esquema-compra-votos-flavio/" target="_blank" rel="noopener noreferrer nofollow">Aos Fatos</a> não encontrou registro público de investigação por compra de votos para o candidato e afirma que o trecho do comentarista foi usado fora de contexto. A <a href="https://www.agencialupa.org/verificacao/2026/10/19/reportagem-da-cnn-brasil-sobre-compra-de-votos-nao-cita-flavio-bolsonaro/" target="_blank" rel="noopener noreferrer nofollow">Lupa</a> chegou à mesma conclusão ao analisar uma imagem com a marca da CNN que circulava no Facebook.</p>

    <h2>O caso de Daniel Trindade</h2>
    <p>A imagem também cita Daniel Trindade, delegado da Polícia Civil filiado ao PL de Roraima. Segundo a Lupa, ele foi preso pela PF em 25 de setembro e depois eleito deputado federal. O Aos Fatos acrescenta que ele é investigado em suposto esquema de compra de votos em Boa Vista, que a prisão de 25 de setembro foi por crimes ambientais e que ele foi solto no dia seguinte, sob fiança. Pessoa investigada não é condenada, e nenhuma das fontes abertas liga o caso dele ao candidato à Presidência.</p>

    <h2>Por que o veredito é Falso</h2>
    <p>O dado de base é verdadeiro: a PF apreendeu R$ 27 milhões em espécie no período eleitoral. O que é falso é a atribuição ao candidato, que a reportagem não faz e que o veículo cuja marca foi usada desmentiu. Duas agências de checagem e o próprio veículo chegam à mesma conclusão. A mesma régua vale para qualquer campo: acusação de crime eleitoral exige decisão ou investigação oficial documentada, e as fontes abertas não mostram nenhuma contra o candidato. Para acompanhar o segundo turno, veja o <a href="/eleicoes">painel de Eleições 2026</a>.</p>
  `,
};
