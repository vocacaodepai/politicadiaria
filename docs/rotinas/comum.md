# Rotinas automáticas da Política Diária: regras comuns

Vale para todas as rotinas (notícias, livros, Congresso, checagem, eleições e História). Cada rotina roda sozinha, sem
perguntar nada, e termina com o conteúdo publicado na `main` (deploy automático na Vercel).

## Ambiente e git

- Trabalhe num clone próprio e isolado em `/tmp` (rotinas podem rodar em paralelo). Antes de
  clonar, limpe clones antigos: `rm -rf /tmp/pd-*` (ignore erro). Clone:
  `git clone https://github.com/vocacaodepai/politicadiaria /tmp/pd-<rotina>-$(date +%s)`.
  Ao final, sempre `rm -rf` do seu clone, publicando ou não.
- Branch da rodada: `git checkout -B claude/pd-<rotina>-$(TZ=America/Sao_Paulo date +%Y%m%d-%H%M) origin/main`,
  depois `npm ci --silent`.
- Datas sempre em `America/Sao_Paulo`. Nunca publique data futura.
- Antes de escrever, leia `CLAUDE.md` e `docs/padrao-editorial.md` inteiros.
- Liste o que já existe (`ls content/articles content/news`, `grep -h "title:" content/*/*.ts | tail -80`,
  `grep -h sourceUrl content/news/*.ts | tail -80`). Não repita fato, fonte nem tema: rejeite a
  pauta se 3 ou mais palavras do slug novo já aparecem juntas em um slug existente.

## Fila de pautas e registro da rodada (toda rotina, toda rodada)

Dois arquivos internos, lidos só pelo painel `/interno/rotinas` (noindex, fora do sitemap) e
validados pelo `check-content`. Sem dado pessoal, sem opinião, sem travessão.

**No início**, anote a hora de início (`TZ=America/Sao_Paulo date -Iseconds`) e leia
`content/pautas/fila.json`. Para cada pauta `aberta` da sua rotina (campo `rotina`), procure de
novo o que faltava (segunda fonte, documento oficial, fato novo). Ela entra na rodada como
qualquer outra pauta, com as mesmas regras de fonte. Não procure de novo o que continua igual:
atualize só `ultimaRevisao`.

**Ao fim**, publique ou não:

1. Atualize a fila (`atualizadoEm` com a hora atual):
   - pauta nova descartada por motivo que pode mudar (fonte única, aguardando fato, números
     divergentes, fonte bloqueada): acrescente
     `{ "id", "rotina", "tema", "motivo", "fontesAbertas": [urls abertas e conferidas], "primeiraVezVisto", "ultimaRevisao", "status": "aberta" }`
     (`falta` opcional: o que falta para publicar, em poucas palavras);
   - pauta da fila que virou conteúdo: `"status": "publicada"` e `"slug"` do item publicado;
   - pauta que não vai mais sair (fato superado, já coberto, fora do escopo): `"status": "descartada"`.
   Nunca apague item da fila. `tema` é factual e curto (até 160 caracteres), sem URL.
2. Crie **um arquivo por rodada** em `content/rotinas/registro/AAAA-MM-DD-HHMM-<rotina>.json`
   (data e hora de início em Brasília; um arquivo por rodada evita conflito entre rotinas em
   paralelo):

   ```json
   {
     "rotina": "noticias",
     "inicio": "2026-11-12T14:05:12-03:00",
     "fim": "2026-11-12T14:41:30-03:00",
     "branch": "claude/pd-noticias-20261112-1405",
     "publicou": ["slug-da-noticia"],
     "descartou": [{ "tema": "Greve geral na Espanha", "motivo": "fonte-unica", "pauta": "greve-geral-espanha" }],
     "bloqueios": [{ "host": "www.tse.jus.br", "erro": "http-403" }],
     "pr": null
   }
   ```

   - `rotina`: `noticias`, `checagem`, `eleicoes`, `congresso`, `livros`, `historia` ou `promessas`.
   - `publicou`: slugs de `content/` (notícias, checagens, resenhas, História); nas rotinas de
     dados, o caminho alterado (`data/congresso`, `data/eleicoes`, `data/promessas`). Lista vazia
     se nada entrou.
   - `descartou[].motivo`: `fonte-unica`, `aguardando-fato`, `sem-angulo`, `numeros-divergentes`,
     `sem-fonte-primaria`, `fonte-bloqueada`, `ja-publicado` ou `fora-do-escopo`. `pauta` (opcional)
     é o `id` na fila.
   - `bloqueios[]`: `host` só o nome (`api.firecrawl.dev`, `www.tse.jus.br`) e `erro` um de
     `http-401`, `http-403`, `http-404`, `http-429`, `http-5xx`, `captcha`, `timeout`,
     `sem-creditos`, `dns`, `tls`, `proxy`, `outro`; `detalhe` opcional, curto, sem segredo.
   - `pr`: o número do PR quando já souber, senão `null` (o painel acha o PR pela `branch`).
3. **Rodada sem publicação também registra.** Em vez de terminar sem commit, abra o PR só com a
   fila e o registro, valide e mescle como qualquer rodada, sem mensagem ao usuário. O "termine
   em silêncio" das rotinas vale para o informe, não para o registro.
4. Conflito em `content/pautas/fila.json` (duas rotinas mexeram ao mesmo tempo):
   `git merge origin/main`, mantenha as mudanças dos dois lados item a item (pelo `id`), rode
   `npm run check:content` e dê push.

## Validar (o build falha se o padrão não for cumprido)

1. `npm run check:content` com zero ERRO.
2. `npm run lint`.
3. `npm run build`.

Corrija sozinho até passar. Se sobrar erro real que você não resolveu, não mescle e registre.

## Segurança (toda rodada)

- Escopo de arquivos: `content/` (itens e índices gerados), `public/images/covers/` e, só na
  rotina do Congresso, `data/congresso/`; na de História, `content/historia/` e `public/images/`.
  Toda rotina pode, além do próprio escopo, mexer em `content/pautas/fila.json` e criar o seu
  arquivo em `content/rotinas/registro/`. Nunca altere `docs/`, `CLAUDE.md`, `lib/`, `app/`,
  `components/`, `scripts/` nem configuração (rodar scripts é permitido, editar não).
  `git diff --stat` só pode ter esses caminhos.
- Nenhum segredo no diff (Pexels, Pixabay, AdSense, qualquer chave). `.env.local` fica fora do git.
- Nenhum HTML com script, iframe ou handler (o `check-content` barra).

## Publicar

- Commit em português, sem citar modelo ou IA na mensagem, com o rodapé de atribuição padrão.
- Push da branch, PR contra `main`, esperar os checks (Vercel) ficarem verdes e mesclar por
  squash. Autorizado pelo usuário para estas rotinas: não pedir confirmação. Sem checks
  configurados, mescle depois de lint, build e check-content passarem localmente.
- Conflito nos índices (`content/*/index.ts`): são gerados. `git merge origin/main`, rode
  `npm run content:index` (nunca edite à mão), valide de novo e dê push.
- Depois do merge, confirme `merged: true` e remova o clone temporário.

## Regras de conteúdo que valem sempre

- Apartidário; fato separado de opinião; sem adjetivo partidário; nada de boato; nada de
  acusação sem decisão judicial (ver CLAUDE.md, "Linha editorial").
- Sem travessão (—), sem "Em resumo", sem "É importante ressaltar", sem "como já discutimos".
- Nunca mencione IA, Claude ou Anthropic no conteúdo do site.
- Cada URL externa é aberta com WebFetch e conferida antes de entrar (não abre = não entra). Na
  rotina de História, todo link externo do texto também precisa estar em `sources` (o validador confere).
- Capas: melhor foto que encaixar, começando pelo Wikimedia Commons
  (`node scripts/wikimedia-cover.mjs search` e `get`), abrindo a imagem para conferir o tema.
  Nunca imagem de IA. Todo `coverImage` leva autor, fonte e link.
- Sem crase nem `${}` dentro de `content`. Atributos HTML sempre entre aspas duplas.
