import type { FactCheck } from "@/lib/types";

export const checagem: FactCheck = {
  slug: "maduro-delacao-lula-letreiro-falso-jornal-nacional",
  title: "Vídeo com trecho do Jornal Nacional engana sobre delação de Maduro contra Lula",
  summary:
    "Reportagem real sobre novas acusações dos EUA ganhou foto com Lula e letreiro sobre delação. Checagens não acharam confirmação de acordo negociado.",
  author: "Equipe Política Diária",
  verdict: "enganoso",
  quick:
    "Enganoso. O trecho do Jornal Nacional sobre novas acusações dos EUA contra Nicolás Maduro existe, mas a foto com Lula e a frase sobre delação foram acrescentadas. As checagens não encontraram confirmação de acordo, e Maduro se declara inocente.",
  claim: {
    text: "Ao saber que poderá pegar prisão perpétua, defesa de Maduro quer delação e promete entregar aliados.",
    origin:
      "Vídeo em redes sociais, com registro no Facebook segundo o Estadão Verifica. A montagem une uma foto de Maduro ao lado de Lula, o texto “a casa caiu” e uma reportagem do Jornal Nacional.",
    attribution: "Publicações em redes sociais",
  },
  date: "2026-11-28",
  checkedAt: "2026-11-28T09:22:20-03:00",
  updated: "2026-11-28",
  topic: "Mundo",
  points: [
    {
      status: "verdade",
      text: "O Jornal Nacional noticiou, em 8 de outubro, novas acusações da Justiça dos Estados Unidos contra Maduro e a mulher dele, Cilia Flores.",
    },
    {
      status: "falso",
      text: "A frase sobre delação não é da reportagem. Segundo a TV Sim Brasil, o letreiro foi inventado e inserido no vídeo junto com a foto de Maduro ao lado de Lula.",
    },
    {
      status: "atencao",
      text: "Não há confirmação de que Maduro negocie delação. A própria reportagem usada na montagem informa que ele e a mulher se declaram inocentes, segundo o Estadão Verifica.",
    },
  ],
  sources: [
    {
      label: "Suposta negociação de Maduro para delatar Lula é boato sem confirmação",
      publisher: "Estadão Verifica, reproduzido pelo Terra",
      url: "https://www.terra.com.br/noticias/brasil/politica/suposta-negociacao-de-maduro-para-delatar-lula-e-boato-sem-confirmacao,bfa97a322208149bbe31da1600f5ee87zoiqs45a.html",
      kind: "agencia",
      note: "Classifica a peça como enganosa, identifica a reportagem de 8 de outubro e explica que um acordo de colaboração pressupõe admissão de culpa.",
      published: "2026-11-18",
    },
    {
      label: "Vídeo manipulado forja delação de Maduro que incriminaria Lula",
      publisher: "TV Sim Brasil",
      url: "https://tvsimbrasil.com.br/brasil/politica/noticia/2026/11/24/video-manipulado-forja-delacao-maduro-incriminaria-lula",
      kind: "imprensa",
      note: "Descreve o corte de cerca de 40 segundos, a foto e o letreiro acrescentados, e relata que o UOL Confere não achou notícia que sustente a delação.",
      published: "2026-11-24",
    },
  ],
  timeline: [
    { date: "2026-10-08", text: "O Jornal Nacional exibe a reportagem sobre novas acusações dos Estados Unidos contra Maduro." },
    { date: "2026-11-18", text: "O Terra publica a checagem do Estadão Verifica, que classifica a peça como enganosa." },
    { date: "2026-11-24", text: "A TV Sim Brasil detalha os cortes e o letreiro acrescentado ao vídeo." },
  ],
  content: `
    <h2>O que as fontes dizem</h2>
    <p>O vídeo usa uma reportagem verdadeira do Jornal Nacional, exibida em 8 de outubro, sobre novas acusações apresentadas nos Estados Unidos contra Maduro e Cilia Flores. De acordo com o <a href="https://www.terra.com.br/noticias/brasil/politica/suposta-negociacao-de-maduro-para-delatar-lula-e-boato-sem-confirmacao,bfa97a322208149bbe31da1600f5ee87zoiqs45a.html" target="_blank" rel="noopener noreferrer nofollow">Estadão Verifica, em texto reproduzido pelo Terra</a>, os dois estão presos em Nova York desde janeiro e negam as acusações.</p>
    <p>A <a href="https://tvsimbrasil.com.br/brasil/politica/noticia/2026/11/24/video-manipulado-forja-delacao-maduro-incriminaria-lula" target="_blank" rel="noopener noreferrer nofollow">TV Sim Brasil</a> relata que a montagem omite cerca de 40 segundos da reportagem original, justamente o trecho com o posicionamento da defesa, e soma ao material uma foto de Maduro com Lula e um letreiro inventado.</p>
    <p>Ainda segundo a TV Sim Brasil, o UOL Confere procurou notícias em português e em inglês sobre uma eventual colaboração de Maduro e não encontrou resultado que sustente a informação.</p>

    <h2>Por que declarar inocência pesa</h2>
    <p>O Estadão Verifica cita a American Bar Association, entidade de advogados dos Estados Unidos, para explicar que acordos de cooperação judicial pressupõem que o réu se declare culpado de algum crime que tenha praticado. Maduro e a mulher, porém, se declaram inocentes.</p>
    <p>Isso descreve a situação registrada nas checagens, publicadas em 18 e 24 de novembro. Uma eventual mudança na estratégia da defesa dependeria de informação oficial ou de reportagem identificada, que não foi apontada.</p>

    <h2>Por que o veredito é Enganoso</h2>
    <p>As imagens do telejornal e as acusações contra Maduro são reais. A conclusão sugerida pelo conjunto, de que a defesa quer delatar aliados e de que Lula estaria entre eles, não aparece na reportagem nem encontra confirmação nas fontes consultadas.</p>
    <p>Já checamos outras alegações que usam autoridades estrangeiras contra o presidente, como o <a href="/checagem/marco-rubio-lula-conspirou-eua-ira-post-falso">post atribuído a Marco Rubio</a> e a história do <a href="/checagem/trump-xerife-anticorrupcao-investigar-lula-moraes-sem-registro">“xerife anticorrupção” de Trump</a>. Veja todas em <a href="/checagem">Checagem</a>.</p>
  `,
};
