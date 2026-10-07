# Rotinas automáticas da Política Diária: regras comuns

Vale para todas as rotinas (notícias, livros, Congresso). Cada rotina roda sozinha, sem
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

## Validar (o build falha se o padrão não for cumprido)

1. `npm run check:content` com zero ERRO.
2. `npm run lint`.
3. `npm run build`.

Corrija sozinho até passar. Se sobrar erro real que você não resolveu, não mescle e registre.

## Segurança (toda rodada)

- Escopo de arquivos: `content/` (itens e índices gerados), `public/images/covers/` e, só na
  rotina do Congresso, `data/congresso/`. Nunca altere `docs/`, `CLAUDE.md`, `lib/`, `app/`,
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
- Cada URL externa é aberta com WebFetch e conferida antes de entrar (não abre = não entra).
- Capas: melhor foto que encaixar, começando pelo Wikimedia Commons
  (`node scripts/wikimedia-cover.mjs search` e `get`), abrindo a imagem para conferir o tema.
  Nunca imagem de IA. Todo `coverImage` leva autor, fonte e link.
- Sem crase nem `${}` dentro de `content`. Atributos HTML sempre entre aspas duplas.
