import type { FactCheck } from "@/lib/types";

export const checagem: FactCheck = {
  slug: "governo-lula-aprovou-volta-dpvat-2027-falso",
  title: "É falso que o governo Lula aprovou a volta da cobrança do DPVAT em 2027",
  summary:
    "Posts dizem que motoristas voltam a pagar o seguro em janeiro de 2027. Segundo Aos Fatos, Boatos.org, Susep e Agência Câmara, a lei que o recriava foi revogada.",
  author: "Equipe Política Diária",
  verdict: "falso",
  quick:
    "Falso. A reportagem usada nos posts é de outubro de 2024 e tratava de uma cobrança prevista para 2025 que não ocorreu: a Lei Complementar 211/2024 revogou a lei que recriava o seguro (SPVAT).",
  claim: {
    text: "Publicações em redes sociais afirmam que o governo Lula aprovou a volta do seguro obrigatório DPVAT e que os motoristas voltarão a pagar a partir de janeiro de 2027, com trecho de uma reportagem do Jornal Nacional como suposta prova.",
    origin:
      "Posts com trecho de reportagem de televisão e legenda em vermelho, que circularam em redes sociais. Segundo o Aos Fatos, até a tarde de segunda-feira (9/11) somavam ao menos 50 mil visualizações no Kwai e 2 mil compartilhamentos no Facebook.",
    firstSeen: "2026-11-07",
    attribution: "Publicações em redes sociais",
  },
  date: "2026-11-09",
  checkedAt: "2026-11-09T19:55:00-03:00",
  updated: "2026-11-09",
  topic: "Economia e benefícios",
  points: [
    {
      status: "verdade",
      text: "A reportagem existe, mas é antiga. Segundo o Aos Fatos, o trecho do Jornal Nacional foi ao ar em outubro de 2024 e noticiava que o SPVAT, novo nome do seguro, seria cobrado a partir de janeiro de 2025.",
    },
    {
      status: "falso",
      text: "A cobrança prevista para 2025 não ocorreu. Segundo a Susep e a Agência Câmara, a Lei Complementar 211/2024, sancionada no fim de dezembro de 2024, revogou no artigo 4º a Lei Complementar 207/2024, que previa a volta do seguro.",
    },
    {
      status: "falso",
      text: "Não há lei vigente que mande cobrar o seguro em janeiro de 2027. O Aos Fatos não encontrou sinal de plano para recriar a cobrança, e a Secom (Secretaria de Comunicação da Presidência) disse ao Aos Fatos que o conteúdo não é verdadeiro.",
    },
    {
      status: "atencao",
      text: "As fontes divergem em detalhes de datas: a Susep data a lei de 30/12/2024, a Agência Câmara informa sanção em 31/12/2024, e o ano em que a cobrança do DPVAT acabou aparece como 2020 (Agência Câmara) e 2021 (Aos Fatos e Boatos.org). Nenhuma divergência altera a conclusão.",
    },
  ],
  sources: [
    {
      label: "Revogada a lei complementar que dispunha sobre o SPVAT",
      publisher: "Susep (gov.br)",
      url: "https://www.gov.br/susep/pt-br/central-de-conteudos/noticias/2024/dezembro/revogada-a-lei-complementar-que-dispunha-sobre-o-spvat",
      kind: "primaria",
      note: "O órgão regulador informa que o artigo 4º da Lei Complementar 211, de 30/12/2024, revoga a LC 207/2024 e que as propostas de regulamentação do SPVAT foram retiradas da pauta. Publicada em 31/12/2024.",
      published: "2024-12-31",
    },
    {
      label: "Sancionada lei que impede volta do DPVAT em 2025",
      publisher: "Agência Câmara de Notícias",
      url: "https://www.camara.leg.br/noticias/1125348-sancionada-lei-que-impede-volta-do-dpvat-em-2025/",
      kind: "primaria",
      note: "Informa que a LC 211/24 impede a volta do seguro e revoga a LC 207/24, sancionada em maio de 2024; o texto nasceu do PLP 210/24. Informa sanção em 31/12/2024 (a Susep data a lei de 30/12). Publicada em 02/01/2025.",
      published: "2025-01-02",
    },
    {
      label: "É falso que governo Lula aprovou volta do DPVAT em 2027",
      publisher: "Aos Fatos",
      url: "https://www.aosfatos.org/noticias/governo-lula-volta-dpvat-2027/",
      kind: "agencia",
      note: "Classifica como falso: a reportagem é de outubro de 2024, a cobrança de 2025 não ocorreu e a Secom negou o conteúdo. Cita o alcance dos posts. Publicada em 09/11/2026.",
      published: "2026-11-09",
    },
    {
      label: "É falso que motoristas terão que voltar a pagar o DPVAT em janeiro de 2027",
      publisher: "Boatos.org",
      url: "https://www.boatos.org/politica/governo-lula-aprovou-a-volta-do-seguro-dpvat-e-motoristas-terao-que-pagar-novamente-a-partir-de-janeiro.html",
      kind: "agencia",
      note: "Classifica como falso: a lei que criava o SPVAT foi revogada em dezembro de 2024, antes de a cobrança começar. Publicada em 07/11/2026.",
      published: "2026-11-07",
    },
  ],
  timeline: [
    { date: "2024-12-30", text: "Data da Lei Complementar 211, que revoga a LC 207/2024, segundo a Susep." },
    { date: "2025-01-02", text: "A Agência Câmara publica que a lei foi sancionada e impede a volta do DPVAT em 2025." },
    { date: "2026-11-07", text: "O Boatos.org publica a checagem dos posts sobre a suposta cobrança em 2027." },
    { date: "2026-11-09", text: "O Aos Fatos publica checagem e informa que a Secom negou o conteúdo." },
  ],
  content: `
    <h2>O que as fontes dizem</h2>
    <p>Posts em redes sociais dizem que o governo Lula aprovou a volta do seguro obrigatório DPVAT e que os motoristas voltarão a pagar em janeiro de 2027. Segundo o <a href="https://www.aosfatos.org/noticias/governo-lula-volta-dpvat-2027/" target="_blank" rel="noopener noreferrer nofollow">Aos Fatos</a>, as publicações reaproveitam um trecho do Jornal Nacional de outubro de 2024, que noticiava a cobrança do SPVAT (novo nome do seguro) a partir de janeiro de 2025. Essa cobrança não ocorreu.</p>
    <p>O motivo está em fontes oficiais. De acordo com a <a href="https://www.gov.br/susep/pt-br/central-de-conteudos/noticias/2024/dezembro/revogada-a-lei-complementar-que-dispunha-sobre-o-spvat" target="_blank" rel="noopener noreferrer nofollow">Susep</a>, o artigo 4º da Lei Complementar 211/2024 revogou a Lei Complementar 207/2024, que previa o seguro, e a autarquia retirou da pauta as propostas de regulamentação. A <a href="https://www.camara.leg.br/noticias/1125348-sancionada-lei-que-impede-volta-do-dpvat-em-2025/" target="_blank" rel="noopener noreferrer nofollow">Agência Câmara</a> informou, em 02/01/2025, que a nova lei impede a volta do DPVAT em 2025 e que o texto veio do PLP 210/24.</p>

    <h2>O que mudou em 2024</h2>
    <p>A Lei Complementar 207/2024 foi sancionada em maio de 2024, segundo a Agência Câmara, e previa o retorno do seguro. Em dezembro do mesmo ano, deputados e Executivo acordaram revogá-la, e o Senado também aprovou o texto, segundo a mesma agência. A Agência Câmara informa ainda que, sem o seguro, vítimas sem cobertura privada não têm direito a indenização do antigo modelo.</p>
    <p>O <a href="https://www.boatos.org/politica/governo-lula-aprovou-a-volta-do-seguro-dpvat-e-motoristas-terao-que-pagar-novamente-a-partir-de-janeiro.html" target="_blank" rel="noopener noreferrer nofollow">Boatos.org</a>, em 07/11, chegou à mesma conclusão: não há base legal atual para cobrança em janeiro de 2027. O Aos Fatos acrescenta que não encontrou sinal de plano para recriar a cobrança e que a Secom disse que o conteúdo não é verdadeiro.</p>

    <h2>Por que o veredito é Falso</h2>
    <p>A alegação central, de que a cobrança volta em janeiro de 2027 por decisão do governo, é contrariada pela Susep e pela Agência Câmara: a lei que a previa foi revogada ainda em 2024, antes de qualquer cobrança. A reportagem usada nos posts é real, mas descreve um cenário que foi desfeito, e por isso o material induz ao erro quando é apresentado como notícia atual.</p>
    <p>As fontes divergem em detalhes. A Susep data a lei de 30/12/2024 e a Agência Câmara informa sanção em 31/12/2024; sobre o fim da cobrança do DPVAT, a Agência Câmara fala em 2020, e Aos Fatos e Boatos.org, em 2021. Como nenhuma dessas diferenças muda o fato central, o veredito se mantém. Quem quiser conferir regras de seguro pode consultar o site da Susep. Veja outras <a href="/checagem">checagens do período eleitoral</a>, como a do <a href="/checagem/governo-lula-confisco-poupanca-2027-sem-base-oficial-falso">falso confisco da poupança em 2027</a>.</p>
  `,
};
