# Rotina: atualização diária dos dados do Congresso

Horário: 04:17 (Brasília), uma vez por dia. Nome do clone: `pd-congresso`. Siga
`docs/rotinas/comum.md` (escopo desta rotina: `data/congresso/`, mais o `.cache/` ignorado, a fila
`content/pautas/fila.json` e o registro `content/rotinas/registro/`).

1. Clone, branch e `npm ci` como em comum.md.
2. `npm run congress:update` (coleta incremental: lista atual de deputados e senadores,
   votações novas, despesas, proposições). O script é retomável e educado com as APIs; se uma
   API estiver fora do ar, rode de novo uma vez e, persistindo, não mescle e registre.
   O passo 2 já regenera `public/data/congresso/votacoes-recentes.json` (ferramenta "Como votou meu
   deputado" em `/congresso`, sem rede) e `data/congresso/placares.json` (placar oficial das
   proposições listadas em `content/proposicoes-noticias.json`, consultado nas APIs da Câmara e do
   Senado). Para só esses dois arquivos, sem a coleta completa:
   `NODE_USE_ENV_PROXY=1 npm run congress:update -- --only=votacoes`. Rode esse modo também ao
   longo do dia quando a rotina de notícias registrar proposição nova. Nunca edite placar à mão;
   sem votação na fonte, a notícia não mostra nada.
3. Confira o resultado: contagens coerentes (513 deputados em exercício + licenciados e
   suplentes conforme a fonte, 81 senadores), nenhum campo sensível (CPF, endereço residencial).
4. `npm run check:content`, `npm run lint`, `npm run build` com zero erro.
5. Se a rodada mudou dados, teve bloqueio de API ou descarte novo, registre-a em
   `content/rotinas/registro/AAAA-MM-DD-HHMM-congresso.json` (formato em `comum.md`; sem nada
   novo, sem registro e sem PR): `publicou` com `data/congresso` se houve mudança, `bloqueios` com host e erro de
   cada API que falhou. Pautas da fila com `"rotina": "congresso"`, se houver, são reavaliadas no início.
   `git diff --stat` só com `data/congresso/`, `public/data/congresso/`, `content/pautas/` e `content/rotinas/`. PR contra `main`, checks verdes, squash.
6. Informe só se houver mudança relevante (troca de parlamentar, nova votação importante) ou
   erro; uma frase.
