# Rotina: atualização diária dos dados do Congresso

Horário: 04:17 (Brasília), uma vez por dia. Nome do clone: `pd-congresso`. Siga
`docs/rotinas/comum.md` (escopo desta rotina: `data/congresso/` e `public/data/congresso/`, mais o
`.cache/` ignorado).

1. Clone, branch e `npm ci` como em comum.md.
2. `NODE_USE_ENV_PROXY=1 npm run congress:update` (usa o proxy quando houver). Executa, nesta ordem:
   - `scripts/build-congress-data.mjs`: lista atual de deputados e senadores, votações novas, despesas
     (CEAP/CEAPS, com CPF mascarado em nome de fornecedor), proposições. Cerca de 20 minutos num clone novo.
   - `scripts/build-congress-agenda.mjs`: agenda de 7 dias atrás a 14 à frente (`data/congresso/agenda/`).
     Menos de 2 minutos.
   - `scripts/build-congress-recursos.mjs`: verba de gabinete, pessoal, auxílio-moradia, imóvel funcional e
     viagens (`data/congresso/recursos/`). A página da Câmara limita o ritmo (HTTP 429, cerca de 10 a 20
     requisições por minuto): o script faz pausa coletiva ao receber 429 e tem orçamento de tempo
     (`--budget-min=40` por padrão, `--gap=2000` ms). Fase 1: página do deputado e ano corrente para todos
     (os coletados há mais tempo primeiro); fase 2: anos anteriores, do mais recente ao mais antigo, só de quem
     ainda não os tem (anos fechados vêm da coleta anterior). Ao estourar o orçamento grava o que tem e o
     restante entra nas rodadas seguintes (`avisos` de cada arquivo diz quais anos faltam). Primeira carga
     completa: várias rodadas. O quadro de pessoal do gabinete vem do arquivo aberto de funcionários.
   - `scripts/build-campanha-parlamentares.mjs`: gastos de campanha 2022 e 2026 a partir dos dados abertos
     do TSE (`data/congresso/campanha/`). Baixa cerca de 450 MB para `.cache/`. Se o TSE falhar, os
     dados anteriores ficam e a rotina segue (registre na resposta final).
   Os scripts são retomáveis e educados com as APIs; se uma API estiver fora do ar, rode de novo
   uma vez e, persistindo, não mescle e registre. Cada script também roda sozinho:
   `npm run congress:data|agenda|recursos|campanha`.
3. Confira o resultado: contagens coerentes (513 deputados em exercício + licenciados e suplentes conforme
   a fonte, 81 senadores; `data/congresso/agenda/meta.json` com `deputadosComAgenda`/`senadoresComAgenda`
   e `falhas` vazias; `recursos/meta.json` e `campanha/meta.json`), nenhum campo sensível.
   **Nenhum CPF e nenhum endereço residencial**: o `check-content` varre `data/congresso/` e falha se
   achar CPF. A agenda de dia sem reunião é normal (campanha, recesso).
4. `npm run check:content`, `npm run lint`, `npm run build` com zero erro.
5. `git diff --stat` só com `data/congresso/` e `public/data/congresso/`. PR contra `main`, checks verdes, squash.
6. Informe só se houver mudança relevante (troca de parlamentar, nova votação importante) ou
   erro; uma frase.

## O que cada pasta de `data/congresso/` guarda

- `deputados/`, `senadores/`, `votacoes-*.json`, `resumo.json`, `numeros.json`, `evolucao.json`: coletor principal.
- `agenda/`: `eventos.json` (todos os eventos da janela, com partidos e UFs presentes para os filtros),
  `parlamentares/c-<id>.json` e `s-<id>.json` (vínculo parlamentar x evento), `meta.json`.
- `recursos/`: `c-<id>.json`, `s-<id>.json`, `meta.json`.
- `campanha/`: `c-<id>.json`, `s-<id>.json`, `meta.json` (estado por eleição: `vinculado`, `nao-vinculado`
  ou `sem-candidatura`).
- `remuneracao.json`: valores oficiais verificados à mão, com URL e data (não é gerado por script).

## Etapa futura (não anunciar no site)

Alerta por e-mail por parlamentar: usar o mesmo conteúdo do `feed.xml` de cada parlamentar
(`lib/congress-feed.ts`) com cadastro e confirmação de e-mail (dupla confirmação, descadastro em um
clique, consentimento conforme LGPD). Hoje só existe o feed RSS.
