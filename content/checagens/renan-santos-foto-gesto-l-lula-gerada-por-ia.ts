import type { FactCheck } from "@/lib/types";

export const checagem: FactCheck = {
  slug: "renan-santos-foto-gesto-l-lula-gerada-por-ia",
  title: "É falso que Renan Santos tenha feito o “L” de Lula; foto foi gerada por IA",
  summary:
    "Imagem que mostra o ex-candidato fazendo o gesto de apoio a Lula no 2º turno foi feita com inteligência artificial, segundo Aos Fatos e Lupa. Ele diz que não apoia ninguém.",
  author: "Equipe Política Diária",
  verdict: "falso",
  quick:
    "Falso. A foto de Renan Santos (Missão) fazendo o “L” de Lula é sintética: Aos Fatos e Lupa encontraram a marca d’água SynthID de ferramentas da OpenAI. A assessoria dele diz que a imagem é falsa, e ele afirma que não apoiará nenhum dos candidatos no 2º turno.",
  claim: {
    text: "Foto mostraria Renan Santos, ex-candidato à Presidência pelo Missão, fazendo o gesto de “L” e aderindo à campanha de Lula contra Flávio Bolsonaro no segundo turno.",
    origin:
      "Perfis no Instagram, Threads, X e Facebook, a partir de 9/10/2026, segundo o Aos Fatos. Uma das legendas dizia “o Brasil feliz de novo com Renanzinho fazendo o L”.",
    firstSeen: "2026-10-09",
    attribution: "Publicações em redes sociais",
  },
  date: "2026-10-19",
  checkedAt: "2026-10-19T07:58:00-03:00",
  updated: "2026-10-19",
  topic: "Eleições 2026",
  points: [
    {
      status: "falso",
      text: "A imagem não é uma fotografia. Segundo Aos Fatos e Lupa, o detector da OpenAI identificou a marca d’água SynthID, aplicada a imagens geradas por produtos da empresa, e não encontrou credenciais C2PA confiáveis.",
    },
    {
      status: "falso",
      text: "A assessoria de Renan Santos disse ao Aos Fatos que a imagem é falsa. Segundo o Aos Fatos, ele afirma desde o primeiro turno que não apoiará nenhum dos dois candidatos.",
    },
    {
      status: "verdade",
      text: "Segundo a Lupa, em entrevista ao canal Alt Tabet ele disse que não votará no segundo turno, orientou os eleitores a votar em quem quiserem e descartou apoiar Lula ou Flávio Bolsonaro.",
    },
    {
      status: "atencao",
      text: "O Aos Fatos localizou a postagem mais antiga que encontrou, de 9/10/2026, em um perfil que apoia Lula e que já havia compartilhado outros conteúdos feitos com IA. A legenda foi editada depois para chamar a imagem de meme. Isso não prova quem criou a imagem, e esta checagem não atribui autoria.",
    },
  ],
  sources: [
    {
      label: "Foto de Renan Santos ‘fazendo o L’ foi gerada por IA",
      publisher: "Aos Fatos",
      url: "https://www.aosfatos.org/noticias/foto-renan-santos-fazendo-L-ia/",
      kind: "agencia",
      note: "Detector da OpenAI achou SynthID; postagens somavam ao menos 670 mil visualizações no X até 13/10; assessoria de Renan Santos disse que a imagem é falsa.",
      published: "2026-10-13",
    },
    {
      label: "É falsa imagem que mostra Renan Santos fazendo o “L” de Lula",
      publisher: "Agência Lupa",
      url: "https://www.agencialupa.org/verificacao/2026/10/16/e-falsa-imagem-que-mostra-renan-santos-fazendo-o-l-de-lula/",
      kind: "agencia",
      note: "Chegou à mesma conclusão de forma independente, pela ferramenta da OpenAI, e registra a declaração de Renan Santos de que não votará nem apoiará candidato no 2º turno.",
      published: "2026-10-16",
    },
  ],
  timeline: [
    { date: "2026-10-09", text: "O Aos Fatos localiza a postagem mais antiga que encontrou da imagem, em um perfil no Instagram." },
    { date: "2026-10-13", text: "O Aos Fatos publica a checagem: a imagem foi gerada por IA e já somava ao menos 670 mil visualizações no X." },
    { date: "2026-10-16", text: "A Agência Lupa publica checagem sobre a mesma imagem, enviada por leitores pelo WhatsApp, e confirma a origem sintética." },
  ],
  content: `
    <h2>O que as fontes dizem</h2>
    <p>Uma imagem passou a circular em redes sociais com o ex-candidato à Presidência Renan Santos (Missão) fazendo o gesto de “L”, associado a Lula (PT), como se ele tivesse aderido à campanha contra Flávio Bolsonaro (PL) no segundo turno, marcado para 25 de outubro. Segundo o <a href="https://www.aosfatos.org/noticias/foto-renan-santos-fazendo-L-ia/" target="_blank" rel="noopener noreferrer nofollow">Aos Fatos</a>, as postagens enganosas tinham ao menos 670 mil visualizações no X até a tarde de 13 de outubro, além de curtidas e compartilhamentos no Threads, no Instagram e no Facebook.</p>
    <p>Para verificar, o Aos Fatos submeteu a imagem à ferramenta de verificação da OpenAI, que detectou a marca d’água SynthID, invisível a olho nu e aplicada a imagens geradas por produtos da empresa. A <a href="https://www.agencialupa.org/verificacao/2026/10/16/e-falsa-imagem-que-mostra-renan-santos-fazendo-o-l-de-lula/" target="_blank" rel="noopener noreferrer nofollow">Agência Lupa</a> fez o mesmo teste, de forma independente, e obteve o mesmo resultado. As duas agências relatam que não há credenciais de procedência (C2PA) confiáveis associadas ao arquivo.</p>

    <h2>O que Renan Santos disse</h2>
    <p>A assessoria do ex-candidato afirmou ao Aos Fatos que a imagem é falsa. Segundo a Lupa, em entrevista ao canal Alt Tabet ele disse que não votará no segundo turno, pediu voto nulo no primeiro e agora orienta os eleitores a votar em quem quiserem. Ele também descartou apoiar Lula ou Flávio Bolsonaro, e disse não querer sinalizar aos seguidores que se alinhará a outro projeto para o país.</p>
    <p>O Aos Fatos também chegou à postagem mais antiga que encontrou, de 9 de outubro, publicada por um perfil que apoia Lula e que já havia compartilhado outros conteúdos feitos com IA. A legenda foi alterada depois para dizer que a imagem era um meme. Essa informação mostra por onde a imagem começou a circular, mas não prova quem a produziu, e por isso esta checagem não atribui autoria a ninguém.</p>

    <h2>Por que o veredito é Falso</h2>
    <p>A alegação central é que a foto mostra um gesto real de apoio. Duas agências independentes apontam que a imagem é sintética, e o próprio Renan Santos, por meio da assessoria e de entrevista, nega o apoio. Não há fonte aberta que sustente a adesão a qualquer candidato.</p>
    <p>Imagens geradas por IA com pessoas públicas circulam nos dois lados da disputa, e a régua desta checagem é a mesma para qualquer campo. Para acompanhar a reta final, veja o <a href="/eleicoes">painel de Eleições 2026</a> e as demais <a href="/checagem">checagens</a>. Em caso de dúvida sobre uma imagem, procure o mesmo registro no perfil oficial da pessoa e em veículos de imprensa antes de compartilhar.</p>
  `,
};
