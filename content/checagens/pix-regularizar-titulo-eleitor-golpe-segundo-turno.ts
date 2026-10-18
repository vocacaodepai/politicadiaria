import type { FactCheck } from "@/lib/types";

export const checagem: FactCheck = {
  slug: "pix-regularizar-titulo-eleitor-golpe-segundo-turno",
  title: "É falso que título de eleitor irregular se resolva com Pix, alerta golpe",
  summary:
    "Mensagens dizem que o título está irregular e pedem Pix para votar no 2º turno. As fontes apontam golpe: o cadastro está fechado e a Justiça Eleitoral não cobra por link.",
  author: "Equipe Política Diária",
  verdict: "falso",
  quick:
    "Falso. Mensagens que dizem que o título de eleitor está irregular e cobram Pix para liberar o voto no 2º turno, em 25 de outubro, são golpe, segundo as fontes. O cadastro eleitoral está fechado para alterações e a Justiça Eleitoral não envia cobrança por SMS, e-mail ou WhatsApp.",
  claim: {
    text: "O título de eleitor estaria irregular e precisaria ser regularizado com um pagamento por Pix, em site indicado em mensagem, para poder votar no segundo turno.",
    origin:
      "SMS, WhatsApp e e-mail com link para um site que imita páginas do governo ou do TSE, segundo a ESET Brasil (2/10/2026) e o alerta do TRE de Pernambuco reproduzido em 15/10/2026.",
    attribution: "Mensagens enviadas por golpistas",
  },
  date: "2026-10-18",
  checkedAt: "2026-10-18T14:20:00-03:00",
  updated: "2026-10-18",
  topic: "Eleições 2026",
  points: [
    {
      status: "falso",
      text: "Não há taxa para regularizar o título por link recebido em mensagem. Segundo o alerta do TRE-PE reproduzido pelo Portal de Prefeitura, a Justiça Eleitoral não envia SMS, e-mail ou WhatsApp com cobranças ou links de pagamento.",
    },
    {
      status: "falso",
      text: "Segundo o Canaltech e o Portal de Prefeitura, o cadastro eleitoral está fechado para emissão, transferência e revisão de títulos, o que torna impossível resolver pendências de cadastro nesse período.",
    },
    {
      status: "verdade",
      text: "Existem pendências reais, como multa por ausência não justificada, que se pagam por canais oficiais. O Canaltech e o A Crítica informam que, em pagamento por Pix da Justiça Eleitoral, o recebedor deve ser o Tesouro Nacional.",
    },
    {
      status: "verdade",
      text: "Segundo a ESET Brasil, citada pelo A Crítica, o site fraudulento cobrava R$ 47,90 (R$ 26 de “ausência eleitoral”, R$ 14,90 de encargos e R$ 7 de taxa), usava endereço terminado em .online e mostrava dados reais da vítima após o CPF. O recebedor do Pix era uma empresa de Curitiba.",
    },
    {
      status: "atencao",
      text: "A origem dos dados usados no golpe não é conhecida, e a ESET não confirmou se a empresa recebedora participa da fraude ou apenas intermedeia o pagamento.",
    },
    {
      status: "atencao",
      text: "Há divergência sobre a data de reabertura do cadastro: o Canaltech diz “novembro” e o Portal de Prefeitura cita 3 de novembro. Em ambos os casos, é depois do 2º turno. As páginas do TSE e do TRE-PE bloquearam o acesso automático (erro 403) e por isso não entram como fontes abertas.",
    },
  ],
  sources: [
    {
      label: "Eleições 2026: site falso cobra Pix para regularizar título eleitoral",
      publisher: "Portal de Prefeitura",
      url: "https://portaldeprefeitura.com.br/bastidores-da-politica/eleicoes-2026-site-falso-cobra-pix-para-regularizar-titulo-eleitoral/634172/",
      kind: "imprensa",
      note: "Reproduz o alerta do TRE-PE: SMS diz que o título está irregular, o link leva a site falso que cobra de R$ 12 a R$ 14 por Pix, e a Justiça Eleitoral não envia cobranças nem links de pagamento. Cadastro fechado até 3 de novembro.",
      published: "2026-10-15",
    },
    {
      label: "Golpe do e-Título: cobra para regularizar seu título, veja como se prevenir",
      publisher: "Canaltech",
      url: "https://canaltech.com.br/seguranca/golpe-do-e-titulo-cobra-para-regularizar-seu-titulo-veja-como-se-prevenir/",
      kind: "imprensa",
      note: "Relata o alerta do TSE: sites falsos copiam a identidade visual, o cadastro está fechado desde 7 de maio e reabre em novembro, e o eleitor deve conferir o domínio jus.br e o recebedor do Pix (Tesouro Nacional).",
      published: "2026-09-30",
    },
    {
      label: "Site falso do TSE cobra R$ 47,90 por suposta regularização do título de eleitor",
      publisher: "A Crítica",
      url: "https://acritica.net/eleicoes-2026/site-falso-do-tse-cobra-r-4790-por-suposta-regularizacao-do-titulo-de-eleitor/",
      kind: "imprensa",
      note: "Descreve a fraude identificada pela ESET Brasil: valores, domínio .online, dados reais da vítima e recebedor do Pix em Curitiba. Orienta pedir o MED ao banco e registrar boletim de ocorrência.",
      published: "2026-10-02",
    },
  ],
  timeline: [
    { date: "2026-09-30", text: "O Canaltech publica o alerta sobre sites falsos que cobram para regularizar o título." },
    { date: "2026-10-02", text: "O A Crítica relata a fraude identificada pela ESET Brasil, com cobrança de R$ 47,90." },
    { date: "2026-10-15", text: "O TRE de Pernambuco alerta para SMS com site falso que cobra Pix antes do 2º turno, segundo o Portal de Prefeitura." },
  ],
  content: `
    <h2>O que as fontes dizem</h2>
    <p>Eleitores relatam mensagens por SMS, WhatsApp e e-mail com o aviso de que o título está irregular e precisa ser regularizado antes do segundo turno, em 25 de outubro. O link leva a uma página que imita um site oficial e pede pagamento por Pix. Segundo o <a href="https://portaldeprefeitura.com.br/bastidores-da-politica/eleicoes-2026-site-falso-cobra-pix-para-regularizar-titulo-eleitoral/634172/" target="_blank" rel="noopener noreferrer nofollow">Portal de Prefeitura</a>, que reproduz o alerta do TRE de Pernambuco, a Justiça Eleitoral não envia SMS, e-mail ou mensagem de WhatsApp com cobranças ou links para pagamento.</p>
    <p>A empresa de segurança ESET Brasil examinou uma das páginas. De acordo com o <a href="https://acritica.net/eleicoes-2026/site-falso-do-tse-cobra-r-4790-por-suposta-regularizacao-do-titulo-de-eleitor/" target="_blank" rel="noopener noreferrer nofollow">A Crítica</a>, o site cobrava R$ 47,90, usava endereço terminado em .online e exibia nome e nome da mãe do eleitor depois da digitação do CPF, o que dava aparência de autenticidade. O recebedor do Pix era uma empresa de Curitiba, e não o Tesouro Nacional.</p>

    <h2>O que a regra eleitoral prevê</h2>
    <p>O <a href="https://canaltech.com.br/seguranca/golpe-do-e-titulo-cobra-para-regularizar-seu-titulo-veja-como-se-prevenir/" target="_blank" rel="noopener noreferrer nofollow">Canaltech</a> informa que o cadastro eleitoral está fechado desde 7 de maio e só reabre em novembro, de modo que atualização de dados ou transferência de local de votação não podem ser feitas agora. O Portal de Prefeitura cita 3 de novembro como data de reabertura. As duas fontes concordam que é depois do segundo turno.</p>
    <p>Pendências reais existem, como a multa por ausência não justificada. Elas são pagas por canais oficiais, e o Pix à Justiça Eleitoral deve ter como recebedor o Tesouro Nacional, segundo o Canaltech e o A Crítica. A consulta da situação do título é gratuita, pelo aplicativo e-Título ou pelo Autoatendimento Eleitoral no portal do TSE.</p>

    <h2>Por que o veredito é Falso</h2>
    <p>A alegação central, de que o título estaria irregular e se resolveria com um Pix enviado a um link, é contrariada pelas três fontes abertas: não há cobrança por mensagem, o cadastro está fechado e o pagamento ia para uma empresa privada. Não há na checagem acusação a pessoa determinada, já que a autoria dos golpes é desconhecida.</p>
    <p>Quem pagou deve procurar o banco, pedir a abertura do Mecanismo Especial de Devolução (MED) do Pix e registrar boletim de ocorrência, conforme o A Crítica. Para acompanhar a disputa, veja o <a href="/eleicoes">painel de Eleições 2026</a> e as demais <a href="/checagem">checagens</a>. As páginas do TSE e do TRE-PE bloquearam o acesso automático, e por isso as orientações vêm de veículos que as citam.</p>
  `,
};
