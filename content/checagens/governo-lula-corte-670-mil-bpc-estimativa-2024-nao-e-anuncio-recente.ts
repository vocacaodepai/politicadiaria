import type { FactCheck } from "@/lib/types";

export const checagem: FactCheck = {
  slug: "governo-lula-corte-670-mil-bpc-estimativa-2024-nao-e-anuncio-recente",
  title: "O corte de 670 mil benefícios do BPC é estimativa de 2024, não anúncio pós-eleição",
  summary:
    "Posts dizem que, após a reeleição, o governo prevê cancelar 670 mil BPC. O número vem de nota técnica de 2024, revelada pela Folha, e era projeção, não decisão.",
  author: "Equipe Política Diária",
  verdict: "fora-de-contexto",
  quick:
    "Fora de contexto. A cifra de 670,4 mil benefícios do BPC é de uma projeção do Ministério do Desenvolvimento Social para 2025, noticiada em agosto de 2024. Não há anúncio semelhante em 2026, segundo o Aos Fatos. As revisões cadastrais do BPC existem, mas preveem aviso, prazo e possibilidade de regularizar.",
  claim: {
    text: "Depois da reeleição, o governo Lula teria autorizado o cancelamento de 670 mil benefícios do BPC em um pente-fino.",
    origin:
      "Postagens no Instagram e no Facebook e mensagens no WhatsApp, em 29/10/2026, segundo o Aos Fatos.",
    firstSeen: "2026-10-29",
    attribution: "Publicações em redes sociais",
  },
  date: "2026-10-30",
  checkedAt: "2026-10-30T20:20:00-03:00",
  updated: "2026-10-30",
  topic: "Economia e benefícios",
  points: [
    {
      status: "verdade",
      text: "O número existe: 670,4 mil benefícios, com taxa de cessação de 11,25% e economia de R$ 6,6 bilhões em 2025, constava de nota técnica do Ministério do Desenvolvimento Social enviada ao Ministério do Planejamento, segundo reportagem da Folha de S.Paulo de agosto de 2024 reproduzida pelo Diário do Comércio.",
    },
    {
      status: "falso",
      text: "Não é um anúncio recente nem uma decisão pós-eleição. A reportagem original é de 7 de agosto de 2024 e trata os números como estimativas para 2025, sem confirmação de resultado. O Aos Fatos não encontrou anúncio semelhante em 2026.",
    },
    {
      status: "atencao",
      text: "As revisões cadastrais do BPC continuam. Segundo o Ministério do Desenvolvimento Social, quem não atualiza o CadÚnico no prazo pode ter o pagamento suspenso, e a regra de 2024 prevê prazos de 45 ou 90 dias, mais 30 dias após a suspensão para regularizar, com pagamento retroativo na reativação.",
    },
    {
      status: "atencao",
      text: "As regras de 2024 garantem notificação e ampla defesa antes de decisão sobre suspeita de irregularidade. Esta checagem não avalia quantos benefícios foram efetivamente cancelados em 2025 ou 2026.",
    },
  ],
  sources: [
    {
      label: "Não é verdade que governo prevê corte de 670 mil beneficiários do BPC",
      publisher: "Aos Fatos",
      url: "https://www.aosfatos.org/noticias/governo-corte-670-mil-bpc/",
      kind: "agencia",
      note: "Classifica a alegação como falsa, rastreia o número até a reportagem de 2024 e diz não ter achado anúncio semelhante em 2026.",
      published: "2026-10-29",
    },
    {
      label: "Governo Lula prevê cortar 11 a cada 100 benefícios em pente-fino do BPC",
      publisher: "Diário do Comércio",
      url: "https://diariodocomercio.com.br/politica/governo-lula-cortar-beneficios-bpc/",
      kind: "imprensa",
      note: "Datada de 07/08/2024, reproduz a revelação da Folha: nota técnica do MDS projeta 670,4 mil cancelamentos em 2025 (11,25%) e economia de R$ 6,6 bilhões, tratados como estimativas.",
      published: "2024-08-07",
    },
    {
      label: "Portarias do MDS e INSS atualizam regras operacionais do BPC",
      publisher: "Ministério do Desenvolvimento e Assistência Social (gov.br)",
      url: "https://www.gov.br/mds/pt-br/noticias-e-conteudos/original/desenvolvimento-social/noticias-desenvolvimento-social/2024/portarias-do-mds-inss-e-ministerio-da-previdencia-social-atualizam-regras-operacionais-do-bpc/",
      kind: "primaria",
      note: "Publicada em 26/07/2024. Descreve prazos de 45 e 90 dias para atualizar o CadÚnico, 30 dias após a suspensão para pedir reativação, notificação e ampla defesa. A página tem atualização posterior.",
      published: "2024-07-26",
    },
    {
      label: "Quais são os prazos (qualificação cadastral de 2026)",
      publisher: "Ministério do Desenvolvimento e Assistência Social (gov.br)",
      url: "https://www.gov.br/mds/pt-br/acoes-e-programas/cadastro-unico/perguntas-frequentes-cadastro-unico/gst-acao-de-qualificacao-cadastral-de-2026/35-quais-sao-os-prazos",
      kind: "primaria",
      note: "Informa que famílias com beneficiários do BPC devem regularizar o cadastro até a data de corte, sob pena de suspensão do benefício, e remete ao cronograma da instrução normativa de janeiro de 2026.",
    },
  ],
  timeline: [
    { date: "2024-07-26", text: "O MDS divulga portarias que atualizam as regras operacionais do BPC." },
    { date: "2024-08-07", text: "A Folha de S.Paulo noticia a nota técnica do MDS com a projeção de 670,4 mil cancelamentos em 2025." },
    { date: "2026-10-25", text: "Segundo turno da eleição presidencial." },
    { date: "2026-10-29", text: "Postagens apresentam o número como decisão pós-reeleição; o Aos Fatos publica a checagem." },
  ],
  content: `
    <h2>O que as fontes dizem</h2>
    <p>A partir de 29 de outubro, publicações em redes sociais passaram a dizer que, depois da reeleição, o governo Lula autorizara o cancelamento de 670 mil benefícios do BPC (Benefício de Prestação Continuada, pago a idosos e pessoas com deficiência de baixa renda). Segundo o <a href="https://www.aosfatos.org/noticias/governo-corte-670-mil-bpc/" target="_blank" rel="noopener noreferrer nofollow">Aos Fatos</a>, o número vem de uma estimativa de 2024 e não há anúncio semelhante em 2026.</p>
    <p>Uma <a href="https://diariodocomercio.com.br/politica/governo-lula-cortar-beneficios-bpc/" target="_blank" rel="noopener noreferrer nofollow">reportagem de 7 de agosto de 2024</a> reproduz a revelação da Folha de S.Paulo: uma nota técnica do Ministério do Desenvolvimento Social, enviada ao Ministério do Planejamento, projetava 670,4 mil cancelamentos em 2025, taxa de 11,25% e economia de R$ 6,6 bilhões. A própria reportagem trata os valores como estimativas, sem anúncio oficial na época.</p>

    <h2>O que existe de fato</h2>
    <p>As revisões do BPC continuam. O <a href="https://www.gov.br/mds/pt-br/noticias-e-conteudos/original/desenvolvimento-social/noticias-desenvolvimento-social/2024/portarias-do-mds-inss-e-ministerio-da-previdencia-social-atualizam-regras-operacionais-do-bpc/" target="_blank" rel="noopener noreferrer nofollow">Ministério do Desenvolvimento</a> descreve prazos de 45 dias (municípios de até 50 mil habitantes) ou 90 dias para atualizar o CadÚnico, suspensão do pagamento depois do prazo e mais 30 dias para pedir reativação, com pagamento dos valores do período bloqueado. Em suspeita de irregularidade, a norma garante ampla defesa e contraditório.</p>
    <p>Para 2026, a <a href="https://www.gov.br/mds/pt-br/acoes-e-programas/cadastro-unico/perguntas-frequentes-cadastro-unico/gst-acao-de-qualificacao-cadastral-de-2026/35-quais-sao-os-prazos" target="_blank" rel="noopener noreferrer nofollow">página do ministério</a> diz que famílias com beneficiários do BPC devem regularizar o cadastro até a data de corte, sob pena de suspensão. A suspensão por cadastro desatualizado, portanto, é uma regra real, mas é diferente de um cancelamento em massa anunciado após a eleição.</p>

    <h2>Por que o veredito é Fora de contexto</h2>
    <p>O número é real, mas tem outra data e outro sentido: uma projeção orçamentária de 2024 para 2025, apresentada como decisão de agora. As fontes não sustentam que o governo tenha determinado, depois do segundo turno, o corte de 670 mil benefícios. Quando um dado verdadeiro aparece com data e sentido diferentes dos originais, o selo é Fora de contexto.</p>
    <p>Quem recebe o BPC deve manter o CadÚnico atualizado e consultar os canais oficiais (CRAS, Meu INSS, Central 135) em vez de mensagens encaminhadas. Esta checagem não mede quantos benefícios foram de fato cancelados em 2025 ou 2026. Veja as demais <a href="/checagem">checagens</a> da Política Diária.</p>
  `,
};
