import type { FactCheck } from "@/lib/types";

export const checagem: FactCheck = {
  slug: "reducao-de-urnas-eleicoes-2026-secoes-aumentaram",
  title: "É falso que a Justiça Eleitoral tenha reduzido urnas em 2026 para prejudicar candidatos",
  summary:
    "Vídeos e posts dizem que o número de urnas e seções caiu em 2026. Segundo dados do TSE reproduzidos por veículos, as seções instaladas subiram de 472.028 para 499.207.",
  author: "Equipe Política Diária",
  verdict: "falso",
  quick:
    "Falso. Segundo dados do TSE reproduzidos pela imprensa, as seções eleitorais instaladas passaram de 472.028 (2022) para 499.207 (2026), alta de cerca de 5,8%. A queda de 4.384 seções vista no 2º turno veio de dados ainda incompletos, segundo o Boatos.org.",
  claim: {
    text: "A Justiça Eleitoral teria reduzido o número de urnas e de seções eleitorais em 2026, inclusive no Nordeste e no 2º turno, para prejudicar candidatos.",
    origin:
      "Vídeo compartilhado em grupos de WhatsApp, segundo a checagem do TRE-PE citada pela imprensa, e posts sobre uma queda de 4.384 seções no 2º turno, segundo o Boatos.org (15/10/2026). Uma coluna do Informe JB (12/10/2026) registra a mesma acusação feita por apoiadores do PT, com outra base de comparação.",
    attribution: "Perfis e grupos de redes sociais, de campos políticos diferentes",
  },
  date: "2026-10-18",
  checkedAt: "2026-10-18T20:05:00-03:00",
  updated: "2026-10-18",
  topic: "Eleições 2026",
  points: [
    {
      status: "falso",
      text: "Segundo dados do TSE reproduzidos pelo Fast Company Brasil e pelo Boatos.org, o país tinha 472.028 seções instaladas em 2022 e passou a ter 499.207 em 2026, aumento de cerca de 5,8%.",
    },
    {
      status: "falso",
      text: "No Nordeste, as seções somaram 144.246 em 2022, 147.266 em 2024 e 149.240 em 2026, segundo o BNews RN, que cita TRE-RN e TSE. A região também tem mais locais de votação (33.544 em 2022, 34.586 em 2026).",
    },
    {
      status: "falso",
      text: "A queda de 4.384 seções no 2º turno, segundo o Boatos.org, vem de consulta à página de resultados do TSE antes de a importação dos dados estar concluída. O número corresponde ao Tocantins, e a assessoria do TSE disse que os TREs ainda não haviam enviado os dados do 2º turno.",
    },
    {
      status: "verdade",
      text: "Há uma queda real no Nordeste, mas em seções agregadas: de 11.118 em 2024 para 8.412 em 2026, segundo o BNews RN. Isso não significa menos urnas, porque as seções principais subiram de 136.148 para 140.828.",
    },
    {
      status: "atencao",
      text: "O Informe JB (12/10/2026) compara 500.341 urnas distribuídas em 2021 com 499.248 em 2026 e atribui a crítica a petistas. A comparação usa outro ano e outro critério (urnas distribuídas, não seções instaladas), e não foi possível confirmar esses números em fonte oficial aberta.",
    },
    {
      status: "atencao",
      text: "Há divergência pequena no aumento nacional: 27.173 seções (Fast Company Brasil) contra 27.179, que é o resultado da subtração 499.207 menos 472.028. As páginas do TSE e do TRE-PE bloquearam o acesso automático (erro 403) e por isso não entram como fontes abertas.",
    },
  ],
  sources: [
    {
      label: "Eleições 2026: o que é verdade e o que é mentira sobre o 2º turno",
      publisher: "Fast Company Brasil",
      url: "https://fastcompanybrasil.com/news/eleicoes-2026-verdade-mentira-sobre-2-turno/",
      kind: "imprensa",
      note: "Reproduz a checagem da Justiça Eleitoral: 472.028 seções em 2022 e 499.207 em 2026; ressalva que seções instaladas e urnas disponíveis (com reservas) são coisas distintas.",
      published: "2026-10-15",
    },
    {
      label: "Houve redução das urnas nas Eleições 2026 no Nordeste? Entenda",
      publisher: "BNews RN",
      url: "https://www.bnewsrn.com.br/noticias/politica/houve-reducao-das-urnas-nas-eleicoes-2026-no-nordeste-entenda.html",
      kind: "imprensa",
      note: "Traz dados do TRE-RN e do TSE para o Nordeste: seções, locais de votação, queda de seções agregadas e abstenção de 19,5% para 18,4%.",
      published: "2026-10-15",
    },
    {
      label: "TSE reduziu número de seções eleitorais no 2º turno das eleições de 2026?",
      publisher: "Boatos.org",
      url: "https://www.boatos.org/politica/tse-reduziu-numero-de-secoes-eleitorais-no-2o-turno-das-eleicoes-de-2026.html",
      kind: "agencia",
      note: "Explica que as 4.384 seções a menos vinham de dados do 2º turno ainda não importados (caso do Tocantins) e cita a nota da assessoria do TSE.",
      published: "2026-10-15",
    },
    {
      label: "Informe JB: Alckmin aposta na mobilização de eleitores ausentes no segundo turno",
      publisher: "Jornal do Brasil",
      url: "https://www.jb.com.br/brasil/informe-jb/2026/10/1061201-alckmin-aposta-na-mobilizacao-de-eleitores-ausentes-no-segundo-turno.html",
      kind: "imprensa",
      note: "Registra a crítica atribuída a petistas de que o TSE diminuiu urnas, comparando 500.341 (2021) com 499.248 (2026). É a versão da alegação feita pelo outro campo, com critério diferente.",
      published: "2026-10-12",
    },
  ],
  timeline: [
    { date: "2026-10-12", text: "O Informe JB registra a acusação, atribuída a petistas, de que o TSE reduziu o número de urnas." },
    { date: "2026-10-15", text: "Fast Company Brasil, BNews RN e Boatos.org publicam os dados oficiais de seções e explicam a origem da queda de 4.384 seções." },
  ],
  content: `
    <h2>O que as fontes dizem</h2>
    <p>Circulam duas versões da mesma alegação: a de que a Justiça Eleitoral reduziu o número de urnas em 2026 para prejudicar candidatos. Um vídeo compartilhado em grupos de WhatsApp usa números de 2024 e 2026 para sustentar a tese, sobretudo no Nordeste, e posts citam uma queda de 4.384 seções no 2º turno, de 25 de outubro. Uma coluna do <a href="https://www.jb.com.br/brasil/informe-jb/2026/10/1061201-alckmin-aposta-na-mobilizacao-de-eleitores-ausentes-no-segundo-turno.html" target="_blank" rel="noopener noreferrer nofollow">Informe JB</a>, de 12 de outubro, atribui a petistas a mesma crítica, com base em 500.341 urnas distribuídas em 2021 e 499.248 em 2026.</p>
    <p>Segundo o <a href="https://fastcompanybrasil.com/news/eleicoes-2026-verdade-mentira-sobre-2-turno/" target="_blank" rel="noopener noreferrer nofollow">Fast Company Brasil</a>, que reproduz a checagem da Justiça Eleitoral, o país tinha 472.028 seções instaladas em 2022 e passou a ter 499.207 em 2026, alta de 5,8%. O <a href="https://www.boatos.org/politica/tse-reduziu-numero-de-secoes-eleitorais-no-2o-turno-das-eleicoes-de-2026.html" target="_blank" rel="noopener noreferrer nofollow">Boatos.org</a> traz os mesmos totais e acrescenta 478.026 seções em 2024.</p>

    <h2>Nordeste e a queda de 4.384 seções</h2>
    <p>No Nordeste, segundo o <a href="https://www.bnewsrn.com.br/noticias/politica/houve-reducao-das-urnas-nas-eleicoes-2026-no-nordeste-entenda.html" target="_blank" rel="noopener noreferrer nofollow">BNews RN</a>, com dados do TRE-RN e do TSE, as seções foram de 144.246 (2022) para 147.266 (2024) e 149.240 (2026). A queda que existe é a das seções agregadas, de 11.118 para 8.412, enquanto as seções principais subiram de 136.148 para 140.828.</p>
    <p>Sobre as 4.384 seções a menos no 2º turno, o Boatos.org informa que o número veio de uma consulta à página de resultados do TSE antes de os dados do segundo turno serem importados. O valor corresponde ao Tocantins, que também tem 2º turno para governador, e a assessoria do TSE disse que os TREs ainda não haviam enviado as informações.</p>

    <h2>Por que o veredito é Falso</h2>
    <p>A alegação central, de que houve redução de seções e urnas, é contrariada pelos dados reproduzidos por três veículos independentes. O que as fontes não sustentam é a conclusão de dano a candidatos: os números mostram crescimento, inclusive no Nordeste. A comparação do Informe JB usa outro critério e outro ano, e não foi possível conferi-la em fonte oficial aberta, por isso aparece como ponto de atenção e não como confirmada ou desmentida.</p>
    <p>As páginas do TSE e do TRE-PE bloquearam o acesso automático, e por isso os números vêm de veículos que as citam. Veja também o <a href="/eleicoes">painel de Eleições 2026</a>, a checagem sobre <a href="/checagem/mesarios-votam-no-lugar-de-ausentes-apos-17h">mesários e eleitores ausentes</a> e as demais <a href="/checagem">checagens</a>.</p>
  `,
};
