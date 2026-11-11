import type { FactCheck } from "@/lib/types";

export const checagem: FactCheck = {
  slug: "contas-bloqueadas-judicialmente-novembro-todos-brasileiros-falso",
  title: "É falso que todos os brasileiros terão contas bancárias bloqueadas em novembro, diz o CNJ",
  summary:
    "Posts dizem que os bancos vão bloquear as contas de todo mundo em novembro. O CNJ diz que o bloqueio vale só para quem tem dívida reconhecida pela Justiça.",
  author: "Equipe Política Diária",
  verdict: "falso",
  quick:
    "Falso. Em nota à Lupa, o Conselho Nacional de Justiça (CNJ) afirma que não é verdade que as contas de todos os brasileiros serão bloqueadas: as ferramentas de bloqueio, como Sisbajud e Sniper, valem só para pessoas e empresas com dívidas reconhecidas judicialmente. Uma atualização do Sniper em 5/11 deixou a busca de bens mais rápida, sem alcançar quem não tem execução na Justiça.",
  claim: {
    text: "Publicações dizem que todo mundo terá as contas bloqueadas judicialmente pelos bancos em novembro, e algumas associam o suposto bloqueio ao governo Lula, comparando-o ao confisco de 1990.",
    origin:
      "Mensagens no WhatsApp e no Facebook, segundo a Lupa, que recebeu o conteúdo de leitores pelo seu canal de WhatsApp. A data exata das primeiras postagens não consta.",
    attribution: "Publicações em redes sociais",
  },
  date: "2026-11-11",
  checkedAt: "2026-11-11T07:46:22-03:00",
  updated: "2026-11-11",
  topic: "Economia e Justiça",
  points: [
    {
      status: "falso",
      text: "O CNJ declarou à Lupa: “Não é verdade que todas as contas de todos os brasileiros serão bloqueadas.” Segundo o órgão, o bloqueio vale apenas para quem tem dívidas reconhecidas judicialmente.",
    },
    {
      status: "verdade",
      text: "Há uma mudança real: segundo o CNJ, o Sniper, sistema usado por magistrados e servidores dos tribunais, recebeu atualização em 5/11 que reduz etapas para localizar patrimônio e pedir bloqueio de bens de devedores. O Sisbajud, que intermedia ordens judiciais de bloqueio de ativos financeiros, funciona desde 2020.",
    },
    {
      status: "verdade",
      text: "Segundo o Seu Dinheiro, em maio de 2026 o Sisbajud passou a permitir bloqueios até duas horas após a decisão judicial, sem aviso prévio ao titular, em projeto-piloto com cinco instituições financeiras. Isso vale para ordens de pagamento de dívida, e não para todos os clientes de bancos.",
    },
    {
      status: "atencao",
      text: "Segundo a Lupa, o bloqueio depende de ação do credor e de autorização de um magistrado. Dívida em cadastro de inadimplentes, como o Serasa, não leva automaticamente ao bloqueio da conta.",
    },
    {
      status: "atencao",
      text: "Esta checagem não avalia se os novos procedimentos de bloqueio são adequados, nem a situação de uma pessoa específica com dívida judicial.",
    },
  ],
  sources: [
    {
      label: "Nota do CNJ enviada à Lupa sobre Sisbajud e Sniper",
      publisher: "Conselho Nacional de Justiça (via Agência Lupa)",
      url: "https://uploads.agencialupa.org/2026/11/Nota-CNJ.pdf",
      kind: "primaria",
      note: "Nota da Secretaria de Comunicação Social do CNJ: o Sisbajud e o Sniper auxiliam o bloqueio de ativos de quem tem dívidas reconhecidas pelo Judiciário; a alteração de 5/11 do Sniper torna mais rápida a busca de patrimônio; e “não é verdade que todas as contas de todos os brasileiros serão bloqueadas”. O PDF é hospedado pela Lupa; a página do CNJ citada na nota não abriu para nós (erro 403).",
      published: "2026-11-10",
    },
    {
      label: "É falso que brasileiros correm o risco de ter contas bancárias bloqueadas em novembro",
      publisher: "Agência Lupa",
      url: "https://www.agencialupa.org/jornalismo/2026/11/10/e-falso-que-brasileiros-correm-o-risco-de-ter-contas-bancarias-bloqueadas-em-novembro/",
      kind: "agencia",
      note: "Classifica como falso, descreve a atualização do Sniper e explica que o bloqueio exige ação do credor e autorização de magistrado. Publicada em 10/11/2026, às 19h22.",
      published: "2026-11-10",
    },
    {
      label: "Devedores podem ter contas bloqueadas sem aviso prévio; sistema da Justiça agiliza processo",
      publisher: "Seu Dinheiro",
      url: "https://www.seudinheiro.com/2026/financas-pessoais/devedores-podem-ter-contas-bloqueadas-sem-aviso-previo-sistema-da-justica-garg/",
      kind: "imprensa",
      note: "Reportagem de 21/05/2026 sobre o novo bloqueio automático no Sisbajud: até duas horas após a ordem judicial, sem aviso prévio, para devedores com decisão judicial, em piloto de 18 meses com cinco instituições. Não menciona o Sniper.",
      published: "2026-05-21",
    },
  ],
  timeline: [
    { date: "2026-05-21", text: "O Seu Dinheiro publica reportagem sobre o bloqueio mais rápido no Sisbajud, para devedores com ordem judicial." },
    { date: "2026-11-05", text: "O CNJ atualiza o Sniper, que agiliza a busca de patrimônio de devedores." },
    { date: "2026-11-10", text: "A Lupa publica a checagem com nota do CNJ." },
  ],
  content: `
    <h2>O que as fontes dizem</h2>
    <p>Mensagens em redes sociais e aplicativos afirmam que “todo mundo” terá as contas bloqueadas judicialmente pelos bancos em novembro. Algumas ligam o suposto bloqueio ao governo federal e o comparam ao confisco de 1990. A <a href="https://www.agencialupa.org/jornalismo/2026/11/10/e-falso-que-brasileiros-correm-o-risco-de-ter-contas-bancarias-bloqueadas-em-novembro/" target="_blank" rel="noopener noreferrer nofollow">Agência Lupa</a> procurou o Conselho Nacional de Justiça (CNJ), apontado como possível origem da confusão.</p>
    <p>Na <a href="https://uploads.agencialupa.org/2026/11/Nota-CNJ.pdf" target="_blank" rel="noopener noreferrer nofollow">nota enviada à Lupa</a>, o CNJ diz que o Sisbajud e o Sniper ajudam a bloquear ativos de pessoas e empresas com dívidas reconhecidas pelo Judiciário, e que uma alteração do Sniper em 5 de novembro deixa a busca de patrimônio mais rápida. O órgão afirma: “Não é verdade que todas as contas de todos os brasileiros serão bloqueadas.”</p>

    <h2>O que mudou de fato</h2>
    <p>A mudança existe, mas tem alvo restrito. O Sniper é usado por magistrados e servidores dos tribunais e integra bases como Renajud e Sisbajud, segundo o CNJ. Já o Sisbajud passou a permitir, em projeto-piloto, bloqueios até duas horas depois da ordem judicial, sem aviso prévio ao titular, segundo reportagem do <a href="https://www.seudinheiro.com/2026/financas-pessoais/devedores-podem-ter-contas-bloqueadas-sem-aviso-previo-sistema-da-justica-garg/" target="_blank" rel="noopener noreferrer nofollow">Seu Dinheiro</a> de maio. A reportagem diz que isso vale para devedores com decisão judicial, e lembra que salários e aposentadorias seguem protegidos por lei.</p>
    <p>Segundo a Lupa, o bloqueio depende de uma ação do credor e da autorização de um juiz. Ter o nome em cadastro de inadimplentes não leva, sozinho, ao bloqueio da conta.</p>

    <h2>Por que o veredito é Falso</h2>
    <p>A alegação central, de que as contas de todos os brasileiros serão bloqueadas em novembro, é contrariada pelo próprio CNJ e pela checagem da Lupa. Não encontramos nas fontes abertas nenhuma medida do governo federal com esse efeito. A associação com o confisco de 1990 não tem base nos documentos consultados.</p>
    <p>A checagem não avalia se o novo procedimento é adequado, nem o caso de quem responde a uma execução. Veja também a checagem sobre o <a href="/checagem/governo-lula-confisco-poupanca-2027-sem-base-oficial-falso">boato de confisco da poupança em 2027</a> e as demais <a href="/checagem">checagens</a>. A mesma régua vale para qualquer campo político.</p>
  `,
};
