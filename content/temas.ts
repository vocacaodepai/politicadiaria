// Temas acompanhados em /temas ("Siga este tema").
//
// Cada tema junta as notícias de um mesmo caso. Para incluir uma notícia num tema,
// acrescente o slug dela (nome do arquivo em content/news/, sem .ts) à lista
// `noticias` do tema. Não é preciso editar a notícia: o box "Este texto faz parte
// do tema" aparece sozinho. `npm run check:content` confere se cada slug existe.
//
// A descrição é só fato: o que é, número do projeto ou da ação, onde está a
// tramitação. Sem opinião, sem adjetivo sobre partido, político ou governo.
import type { Tema } from "@/lib/types";

export const temas: Tema[] = [
  {
    slug: "ajuste-fiscal-plp-299-2026",
    titulo: "Ajuste fiscal e PLP 299/2026",
    descricao:
      "O governo negocia com o Congresso um pacote fiscal para 2027. O Projeto de Lei Complementar 299/2026, apresentado no Senado por Jaques Wagner em 11 de novembro de 2026, altera o arcabouço fiscal, limita o crescimento da despesa a 2% em caso de contenção e reduz benefícios tributários. O ministro do Planejamento estimou na CMO um impacto de R$ 50 bilhões a R$ 60 bilhões em 2027. Esta página reúne, em ordem cronológica, as notícias sobre a negociação e o texto.",
    noticias: [
      "boulos-chantagem-mercado-ajuste-fiscal-desoneracoes",
      "lula-economia-arrumada-responsabilidade-fiscal-pronunciamento",
      "lula-cnpe-ajuste-fiscal-pobre-data-centers-energia",
      "ceos-itau-bradesco-ajuste-fiscal-pib-2027-neoconference",
      "senado-plp-ajuste-fiscal-alcolumbre-wagner",
      "moretti-ajuste-fiscal-50-60-bilhoes-2027-cmo",
      "plp-299-2026-wagner-projeto-fiscal-texto-trava-despesas",
      "alcolumbre-suspende-sessao-plp-299-votacao-quinta",
      "senado-aprova-urgencia-plp-299-40-a-38",
      "senado-aprova-texto-base-plp-299-45-a-31",
      "dolar-5-65-pacote-fiscal-banco-do-brasil-ibovespa",
      "ajuste-fiscal-lei-kandir-destaques-terca-senado",
      "pt-projetos-grandes-fortunas-dividendos-lci-lca",
    ],
  },
  {
    slug: "fim-da-escala-6x1",
    titulo: "Fim da escala 6x1 e a Emenda 141 no STF",
    descricao:
      "A PEC 221/2019 foi aprovada pelo Senado em dois turnos em 14 de outubro de 2026 e promulgada como Emenda Constitucional 141 em 16 de outubro. O texto reduz a jornada semanal de 44 para 42 horas em 60 dias e para 40 horas em até 14 meses, sem corte de salário, o que leva à escala 5x2. As ADIs 8041 e 8042, relatadas pelo ministro Flávio Dino no STF, discutem a transição. Esta página reúne, em ordem cronológica, a votação, a regulamentação e o processo no Supremo.",
    noticias: [
      "pec-fim-escala-6x1-senado-votacao",
      "pec-6x1-aprovada-senado-promulgacao",
      "durigan-credito-empresas-fim-escala-6x1",
      "emenda-141-promulgada-fim-escala-6x1",
      "decreto-excecoes-jornadas-atipicas-plantao-aeroviario",
      "pec-paralela-senado-excecoes-escala-6x1",
      "cnc-adi-8041-stf-prazo-fim-escala-6x1-dino",
      "marinho-decreto-fim-escala-6x1-segunda-9-oito-folgas",
      "dino-audiencia-conciliacao-escala-6x1-adi-8041",
      "decreto-6x1-adiado-volta-viagem-lula",
      "dino-abre-conciliacao-escala-6x1-prazos-seguem",
      "stf-audiencia-6x1-empresas-pedem-adiar-dino-decide-em-dias",
      "dino-decide-ate-sexta-13-implementacao-escala-5x2-plenario",
      "stf-jornada-8h24-sem-hora-extra-transicao-42-horas",
      "camara-senado-contestam-liminar-dino-emenda-141",
    ],
  },
  {
    slug: "mp-das-bets-mp-1394",
    titulo: "MP das bets (MP 1.394/2026)",
    descricao:
      "A Medida Provisória 1.394/2026, editada em 25 de setembro de 2026, proíbe as apostas de quota fixa e extingue as autorizações das empresas do setor. A constitucionalidade da MP é discutida no STF na ADI 8027, relatada pelo ministro Luiz Fux. Em 11 de novembro, a vigência foi prorrogada por 60 dias, e a Instrução Normativa SPA/MF nº 32 definiu como a reserva financeira das empresas pode ser usada para devolver saldos aos apostadores. Esta página reúne, em ordem cronológica, o processo no Supremo, a tramitação no Congresso e as regras da Fazenda.",
    noticias: [
      "stf-audiencia-publica-mp-bets-adi-8027",
      "stf-fux-amplia-audiencia-bets-ministerios-abras",
      "stf-audiencia-bets-fux-messias-clubes-falas",
      "stf-encerra-audiencia-bets-dez-horas-fazenda-nova-audiencia",
      "trf3-suspende-liminar-tres-bets-cda-gaming",
      "pgr-pede-suspensao-nacional-acoes-proibicao-bets",
      "fux-suspende-processos-mp-bets-todo-pais",
      "mjsp-348-perfis-influenciadores-bets-ilegais",
      "spa-in-32-reserva-bets-restituicao-apostadores",
      "mp-bets-tranca-pauta-camara-comissao-mista-nao-instalada",
      "alcolumbre-prorroga-mp-bets-60-dias-mp-1394",
      "cinco-mps-perdem-eficacia-desenrola-3-prorrogada",
    ],
  },
  {
    slug: "maioridade-penal",
    titulo: "Maioridade penal (PEC 32/2015)",
    descricao:
      "A PEC 32/2015, em análise numa comissão especial da Câmara, fixa em 16 anos a maioridade penal e civil. Em 3 de novembro de 2026, o Senado aprovou a PEC da Segurança Pública e, por 38 votos a 36, separou dela o trecho sobre maioridade penal, que ficou para a proposta da Câmara. O relator na comissão especial, Mendonça Filho, prevê entregar o parecer aos líderes em 1º de dezembro. Esta página reúne, em ordem cronológica, a tramitação no Senado e na Câmara.",
    noticias: [
      "senado-aprova-pec-seguranca-sem-maioridade-penal",
      "senado-espera-camara-pec-maioridade-penal",
      "comissao-especial-audiencias-maioridade-penal-10-11-novembro",
      "relator-mendonca-filho-maioridade-penal-16-anos-instituicoes-separadas",
      "maioridade-penal-relatorio-1-dezembro-comissao-especial",
    ],
  },
];
