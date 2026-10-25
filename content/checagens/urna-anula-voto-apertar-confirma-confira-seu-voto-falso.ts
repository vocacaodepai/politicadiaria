import type { FactCheck } from "@/lib/types";

export const checagem: FactCheck = {
  slug: "urna-anula-voto-apertar-confirma-confira-seu-voto-falso",
  title: "Apertar “confirma” com o aviso “confira seu voto” na tela não anula o voto",
  summary:
    "Boato recorrente diz que o voto se perde se o eleitor apertar “confirma” durante o aviso na urna. Aos Fatos e Comprova checaram versões anteriores: o voto não é anulado.",
  author: "Equipe Política Diária",
  verdict: "falso",
  quick:
    "Falso. Segundo Aos Fatos e Comprova, que checaram o mesmo boato em 2024, o eleitor não perde nem anula o voto ao apertar “confirma” durante o aviso “confira seu voto”. A tecla só é liberada cerca de 1 segundo depois de digitado o número, e basta apertar “confirma” para concluir. Não foi localizada checagem aberta de 2026 deste texto específico.",
  claim: {
    text: "O eleitor precisaria esperar aparecer a frase “confirma o seu voto” antes de apertar a tecla verde; se apertasse enquanto o aviso “confira seu voto” aparece, o voto seria anulado.",
    origin:
      "Vídeo de 2022 que voltou a circular em WhatsApp, Instagram e Facebook em 2024, segundo Aos Fatos e Comprova. Versões do mesmo texto reaparecem a cada eleição.",
    attribution: "Publicações em redes sociais, segundo Aos Fatos e Comprova",
  },
  date: "2026-10-25",
  checkedAt: "2026-10-25T08:30:00-03:00",
  updated: "2026-10-25",
  topic: "Eleições 2026",
  points: [
    {
      status: "falso",
      text: "Segundo o Aos Fatos, o aviso adicionado pelo TSE em 2022 serve só para o eleitor conferir as escolhas e não afeta a validação do voto. Se o eleitor apertar “confirma” antes, o voto não é perdido nem anulado.",
    },
    {
      status: "falso",
      text: "Segundo o Aos Fatos, a frase “confirma o seu voto” não aparece na urna e não faz parte do processo de votação.",
    },
    {
      status: "verdade",
      text: "Existe um aviso real: depois de digitar o número, a urna mostra “confira seu voto” e libera a tecla de confirmação cerca de 1 segundo depois, conforme o TSE citado por Aos Fatos e Comprova. Nada a ver com anulação.",
    },
    {
      status: "atencao",
      text: "Pelo relato do Aos Fatos, se o eleitor apertar cedo, não precisa digitar o candidato de novo: basta apertar “confirma” para concluir.",
    },
    {
      status: "atencao",
      text: "As checagens abertas são de 2024, quando o boato recirculou. As páginas do TSE sobre o tema em 2026 não abriram para consulta automática (erro 403) e não entram como fontes. O funcionamento descrito vale para a urna usada desde 2022, e a Comprova cita o TSE dizendo que o modelo mais recente não mudou as mensagens da tela.",
    },
  ],
  sources: [
    {
      label: "É falso que urnas eletrônicas exibem mensagem “confirma o seu voto”",
      publisher: "Aos Fatos",
      url: "https://www.aosfatos.org/noticias/falso-urnas-eletronicas-mensagem-confirma-o-seu-voto/",
      kind: "agencia",
      note: "Descreve a versão do boato de 2024, afirma que a frase “confirma o seu voto” não existe na urna e que apertar “confirma” durante o aviso não anula o voto. Publicada em 5/10/2024.",
      published: "2024-10-05",
    },
    {
      label: "Voto não é anulado se eleitor apertar “confirma” durante alerta para conferir escolhas",
      publisher: "Aos Fatos",
      url: "https://www.aosfatos.org/noticias/voto-nao-e-anulado-se-eleitor-apertar-confirma-durante-alerta-para-conferir-escolhas/",
      kind: "agencia",
      note: "Cita o TSE: a tecla de confirmação é liberada um segundo após o preenchimento completo dos números. Publicada em 1/10/2024.",
      published: "2024-10-01",
    },
    {
      label: "Vídeo antigo volta a circular com mentira sobre urna eletrônica",
      publisher: "Projeto Comprova (Metrópoles)",
      url: "https://www.metropoles.com/projeto-comprova/video-antigo-mente-sobre-urna-eletronica",
      kind: "imprensa",
      note: "Confirma de forma independente que o vídeo é de 2022, que o eleitor não perde o voto ao apertar “confirma” durante o aviso e que o TSE já havia desmentido. Publicada em 10/9/2024.",
      published: "2024-09-10",
    },
  ],
  timeline: [
    { date: "2024-09-10", text: "A Comprova publica checagem do vídeo de 2022 que recirculou antes das eleições municipais." },
    { date: "2024-10-05", text: "O Aos Fatos checa nova versão, com a frase inexistente “confirma o seu voto”." },
    { date: "2026-10-25", text: "Dia do 2º turno: esta checagem reúne o que as agências já apuraram sobre o boato recorrente." },
  ],
  content: `
    <h2>O que as fontes dizem</h2>
    <p>O texto é antigo e volta a cada eleição: o eleitor teria de esperar aparecer “confirma o seu voto” e, se apertasse a tecla verde enquanto o aviso “confira seu voto” aparece, perderia o voto. O <a href="https://www.aosfatos.org/noticias/falso-urnas-eletronicas-mensagem-confirma-o-seu-voto/" target="_blank" rel="noopener noreferrer nofollow">Aos Fatos</a> checou a versão de outubro de 2024 e concluiu que a frase “confirma o seu voto” não aparece na urna. A <a href="https://www.metropoles.com/projeto-comprova/video-antigo-mente-sobre-urna-eletronica" target="_blank" rel="noopener noreferrer nofollow">Comprova</a> mostrou que o vídeo era de 2022.</p>
    <p>Em outra checagem, o <a href="https://www.aosfatos.org/noticias/voto-nao-e-anulado-se-eleitor-apertar-confirma-durante-alerta-para-conferir-escolhas/" target="_blank" rel="noopener noreferrer nofollow">Aos Fatos</a> explica que o aviso foi adicionado em 2022 e que o TSE libera a tecla de confirmação um segundo depois do preenchimento completo do número. Se o eleitor apertar antes, o voto não é perdido nem anulado, e ele só precisa apertar “confirma” para concluir.</p>

    <h2>Como votar com tranquilidade hoje</h2>
    <p>O procedimento é o mesmo do primeiro turno: digitar o número, conferir o nome e a foto na tela e apertar “confirma”. Se errar o número, a tecla “corrige” permite refazer antes de confirmar.</p>
    <p>Dúvidas na hora de votar devem ser resolvidas com os mesários, que podem chamar o apoio da Justiça Eleitoral. Para outros boatos sobre a votação, veja as <a href="/checagem">checagens</a> e o <a href="/eleicoes">painel de Eleições 2026</a>.</p>

    <h2>Por que o veredito é Falso</h2>
    <p>As duas agências, de forma independente, concluem que apertar “confirma” durante o aviso não anula o voto. A ressalva é de data: as checagens abertas são de 2024, e as páginas do TSE sobre o tema em 2026 não abriram para consulta (erro 403). A Comprova registra o TSE dizendo que o modelo mais recente de urna não alterou as mensagens da tela. Esta checagem não atribui a autoria do boato a ninguém, e ele não favorece candidato específico: atinge qualquer voto.</p>
  `,
};
