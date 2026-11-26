import type { FactCheck } from "@/lib/types";

export const checagem: FactCheck = {
  slug: "receber-pix-nao-corta-bpc-automaticamente",
  title: "É falso que receber Pix no CPF faça o INSS cortar o BPC de forma automática",
  summary:
    "A lei liga o BPC à renda familiar por pessoa e o decreto prevê prazo de defesa. Não há corte automático por receber Pix, segundo as fontes.",
  author: "Equipe Política Diária",
  verdict: "falso",
  quick:
    "Falso. A lei define o BPC pela renda familiar por pessoa, não pelo uso do Pix. As regras conferidas sobre bloqueio e suspensão não citam o Pix e preveem notificação e prazo de defesa.",
  claim: {
    text: "Beneficiário do BPC que receber um Pix no próprio CPF terá o benefício cortado automaticamente pelo INSS.",
    origin:
      "Vídeo no Facebook e no WhatsApp, checado pela Agência Lupa em 26 de novembro de 2026. Segundo a agência, o trecho no Facebook somava mais de 4 mil compartilhamentos.",
    attribution: "Publicações em redes sociais",
  },
  date: "2026-11-26",
  checkedAt: "2026-11-26T18:30:00-03:00",
  updated: "2026-11-26",
  topic: "Benefícios sociais",
  points: [
    {
      status: "verdade",
      text: "O BPC paga um salário mínimo por mês a idosos de 65 anos ou mais e a pessoas com deficiência que cumpram os requisitos, entre eles a renda familiar por pessoa. A regra geral é de até um quarto do salário mínimo.",
    },
    {
      status: "falso",
      text: "Não há corte automático por receber Pix. Os trechos do Decreto 12.534/2025 sobre renda, notificação, bloqueio e suspensão não mencionam o Pix, e a Lupa informa que não existe essa regra.",
    },
    {
      status: "atencao",
      text: "O benefício pode ser revisto. Se o INSS identificar renda acima do critério, inconsistência no cadastro ou indício de irregularidade, o decreto manda notificar o beneficiário, com 30 dias para defesa.",
    },
    {
      status: "atencao",
      text: "Se o INSS não conseguir comprovar em 30 dias que a pessoa soube da notificação, o decreto prevê o bloqueio do valor. Por isso convém manter o Cadastro Único atualizado e atender aos avisos oficiais.",
    },
  ],
  sources: [
    {
      label: "Lei 8.742/1993 (Lei Orgânica da Assistência Social), texto no Planalto",
      publisher: "Presidência da República",
      url: "https://www.planalto.gov.br/ccivil_03/leis/l8742.htm",
      kind: "primaria",
      note: "Artigos 20, 21 e 21-A: quem tem direito, limite de renda familiar por pessoa, revisão a cada dois anos e hipóteses de cessação, cancelamento e suspensão do BPC.",
    },
    {
      label: "Decreto 12.534, de 25 de junho de 2025, que altera o regulamento do BPC",
      publisher: "Presidência da República",
      url: "https://www.planalto.gov.br/ccivil_03/_ato2023-2026/2025/decreto/d12534.htm",
      kind: "primaria",
      note: "Define a renda familiar como a soma dos rendimentos mensais da família e prevê notificação, prazos de defesa, bloqueio e suspensão. Os trechos conferidos não citam Pix.",
      published: "2025-06-26",
    },
    {
      label: "Lei 14.176, de 22 de junho de 2021, sobre o critério de renda do BPC",
      publisher: "Presidência da República",
      url: "https://www.planalto.gov.br/ccivil_03/_ato2019-2022/2021/lei/l14176.htm",
      kind: "primaria",
      note: "Fixa o limite de um quarto do salário mínimo por pessoa e admite ampliação até meio salário mínimo, conforme regulamento.",
      published: "2021-06-23",
    },
    {
      label: "É falso que receber valores via Pix corta automaticamente o BPC",
      publisher: "Agência Lupa",
      url: "https://www.agencialupa.org/verificacao/2026/11/26/e-falso-que-receber-valores-via-pix-corta-automaticamente-o-bpc/",
      kind: "agencia",
      note: "Descreve o vídeo e seu alcance e publica a resposta da assessoria do INSS sobre a renda considerada, a revisão e o direito de defesa.",
      published: "2026-11-26",
    },
  ],
  timeline: [
    { date: "2021-06-23", text: "A Lei 14.176 é publicada com o critério de renda de um quarto do salário mínimo por pessoa." },
    { date: "2025-06-26", text: "O Decreto 12.534 é publicado com as regras atuais de notificação, bloqueio e suspensão do BPC." },
    { date: "2026-11-26", text: "A Agência Lupa classifica como falso o vídeo sobre corte do BPC por causa do Pix." },
  ],
  content: `
    <h2>O que as fontes dizem</h2>
    <p>O vídeo afirma que receber Pix no CPF levaria o INSS a cortar o Benefício de Prestação Continuada. Segundo a <a href="https://www.agencialupa.org/verificacao/2026/11/26/e-falso-que-receber-valores-via-pix-corta-automaticamente-o-bpc/" target="_blank" rel="noopener noreferrer nofollow">Agência Lupa</a>, a gravação fala em cruzamento de dados e em corte automático. A agência classificou o conteúdo como falso.</p>
    <p>A <a href="https://www.planalto.gov.br/ccivil_03/leis/l8742.htm" target="_blank" rel="noopener noreferrer nofollow">Lei 8.742/1993</a> garante um salário mínimo mensal à pessoa com deficiência e ao idoso com 65 anos ou mais que não tenham como se manter nem ser mantidos pela família. O critério geral é de renda familiar mensal por pessoa igual ou inferior a um quarto do salário mínimo.</p>
    <p>A <a href="https://www.planalto.gov.br/ccivil_03/_ato2019-2022/2021/lei/l14176.htm" target="_blank" rel="noopener noreferrer nofollow">Lei 14.176/2021</a> permite que o regulamento amplie esse limite até meio salário mínimo, em situações que levam em conta fatores como grau da deficiência, dependência de terceiros e gastos com saúde.</p>
    <p>À Lupa, a assessoria do INSS informou que a renda considerada para conceder e manter o benefício é a registrada no Cadastro Único ou a renda familiar no Cadastro Nacional de Informações Sociais (CNIS). O órgão citou a revisão a cada dois anos, prevista no artigo 21 da lei, e afirmou que há direito ao contraditório e à ampla defesa.</p>

    <h2>O que pode levar a bloqueio ou suspensão</h2>
    <p>O <a href="https://www.planalto.gov.br/ccivil_03/_ato2023-2026/2025/decreto/d12534.htm" target="_blank" rel="noopener noreferrer nofollow">Decreto 12.534/2025</a> define a renda familiar como a soma dos rendimentos mensais dos membros da família, sem deduções não previstas em lei. Quando o INSS identifica superação do critério de renda, inconsistência cadastral ou indício de irregularidade, deve notificar o beneficiário, inclusive pela rede bancária, e abrir 30 dias para defesa.</p>
    <p>O mesmo decreto prevê bloqueio do valor se não houver comprovação, em 30 dias, de que a pessoa tomou ciência da notificação. A suspensão pode ocorrer, entre outros casos, quando o beneficiário é notificado e não apresenta defesa, ou quando não atualiza o Cadastro Único nos prazos legais.</p>
    <p>A lei também prevê que o pagamento cessa quando deixam de existir as condições que o justificaram ou com a morte do beneficiário, e que pode ser cancelado em caso de irregularidade. Há ainda suspensão quando a pessoa com deficiência passa a exercer atividade remunerada.</p>

    <h2>Por que o veredito é Falso</h2>
    <p>A alegação trata o simples recebimento de um Pix como motivo de corte imediato. Os textos legais conferidos tratam de renda familiar, cadastro, revisão e irregularidade, com aviso e prazo para responder. O Pix é o meio pelo qual o dinheiro chega, e não aparece nesses trechos como hipótese de bloqueio.</p>
    <p>Isso não significa que a renda deixe de ser verificada. Quem tem dúvida sobre um valor recebido deve procurar o INSS ou o Centro de Referência de Assistência Social do município antes de acreditar em vídeos.</p>
    <p>A Política Diária já checou outros boatos sobre o tema, como o do <a href="/checagem/governo-lula-corte-670-mil-bpc-estimativa-2024-nao-e-anuncio-recente">corte de 670 mil benefícios do BPC</a> e o de que o <a href="/checagem/split-payment-nao-tributa-pix-transferencias-entre-pessoas">split payment taxaria transferências por Pix</a>. Veja as demais <a href="/checagem">checagens</a>.</p>
  `,
};
