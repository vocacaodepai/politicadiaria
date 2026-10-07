# Política Diária

Site brasileiro de política nacional e internacional (www.politicadiaria.com.br):
notícias diárias, "Congresso por dentro" (uma página para cada um dos 513 deputados e 81
senadores, com votos, ausências em votações nominais, gastos e salário, a partir dos dados
abertos da Câmara e do Senado) e resenhas de livros de política com link de afiliado da
Amazon (tag `politicadiaria-20`). Publicação diária por rotinas automáticas (ver
`docs/rotinas/`). Construído sobre o mesmo código-base do Portal da AI.

## Stack

- Next.js 16 (App Router, TypeScript estrito, React 19)
- Tailwind CSS 4 com tokens de design em `app/globals.css` (tema claro/escuro automático)
- Conteúdo em arquivos TypeScript (`content/`) e dados do Congresso em JSON (`data/congresso/`)
- Capas via Wikimedia Commons (primeira opção), Pexels e Pixabay, com fallback ilustrado
- Hospedagem e deploy na Vercel; Vercel Web Analytics (sem cookies)

## Rodando localmente

```bash
npm install
cp .env.example .env.local   # preencha as chaves que tiver
npm run check:content        # gera os índices e valida o conteúdo
npm run dev
```

## Scripts

| Script | O que faz |
| --- | --- |
| `npm run dev` | Servidor de desenvolvimento |
| `npm run content:index` | Regenera `content/articles/index.ts` e `content/news/index.ts` |
| `npm run check:content` | Regenera os índices e valida artigos e notícias (roda antes de todo build) |
| `npm run content:new -- artigo <slug> <categoria>` | Esqueleto de resenha de livro |
| `npm run content:new -- noticia <slug>` | Esqueleto de notícia |
| `npm run congress:update` | Coleta os dados abertos da Câmara e do Senado em `data/congresso/` |
| `npm run lint` / `npm run build` | ESLint + check:content / build de produção |

## Conteúdo

Categorias dos livros: `politica-brasileira`, `politica-internacional`, `historia-politica`,
`ideias-politicas`, `economia-e-estado`, `democracia-e-instituicoes`, `biografias`.
Tópicos das notícias: ver `newsTopics` em `lib/types.ts`. As regras editoriais estão em
`CLAUDE.md` e `docs/padrao-editorial.md`; as rotinas em `docs/rotinas/`.

## Rotas

- `/` home, `/artigos` (12 por página, `/artigos/pagina/n`), `/noticias`
  (30 por página, agrupadas por dia), `/reviews` (ranking por nota), `/congresso` (visão geral, `/congresso/deputados`, `/congresso/senadores` e uma página por parlamentar), `/categoria/<slug>`
  (paginada), `/artigos/<slug>`, `/noticias/<slug>`, `/autor/equipe-editorial`,
  `/busca` (noindex, índice em `/search-index.json`)
- Institucionais: `/sobre`, `/contato`, `/politica-editorial`,
  `/publicidade-e-afiliados`, `/politica-de-privacidade`, `/termos-de-uso`
  (todas em `components/InstitutionalPage.tsx`, sem anúncio)
- Gerados: `/sitemap.xml` (com imagens OG dos artigos), `/robots.txt`,
  `/manifest.webmanifest`, `/feed.xml` (RSS), `/opengraph-image` e a OG de
  cada artigo

Toda página define `title`, `description` (até 158 caracteres), canonical
próprio e Open Graph. JSON-LD sempre via `safeJsonLd` (`lib/seo.ts`).

## Variáveis de ambiente

Copie `.env.example` para `.env.local`. Na Vercel, cadastre em
Settings > Environment Variables (Production).

| Variável | Uso |
| --- | --- |
| `PEXELS_API_KEY` | Fotos de capa (tentado primeiro) |
| `PIXABAY_API_KEY` | Fotos de capa (segunda opção) |
| `NEXT_PUBLIC_ADSENSE_CLIENT` | ID do publisher AdSense (`ca-pub-XXXXXXXXXXXXXXXX`). Vazio = site sem anúncios e sem aviso de cookies |
| `NEXT_PUBLIC_ADSENSE_SLOT_LEADERBOARD` | ID da unidade horizontal (home e fim de artigo) |
| `NEXT_PUBLIC_ADSENSE_SLOT_RECTANGLE` | ID da unidade da sidebar |
| `NEXT_PUBLIC_ADSENSE_SLOT_IN_ARTICLE` | ID da unidade dentro do texto |
| `NEXT_PUBLIC_ADSENSE_SLOT_ANCHOR` | ID da unidade ancorada (mobile) |
| `CSP_REPORT_ONLY` | `true` troca a Content-Security-Policy para modo de relatório (útil na primeira semana com anúncios) |

Sem nenhuma chave de imagem, o site usa capas ilustradas geradas localmente.
Sem `NEXT_PUBLIC_ADSENSE_CLIENT`, nenhum bloco de anúncio é renderizado
(nada de caixa vazia "Publicidade").

## Ativando o Google AdSense, passo a passo

Faça na ordem. O site já tem tudo o que a revisão procura (páginas
institucionais, política de privacidade com LGPD e cookies, aviso de
consentimento, robots, sitemap, canonical por página); o que falta é o ID.

1. **Antes de pedir a revisão**: confirme no Search Console que
   `https://www.politicadiaria.com.br/sitemap.xml` foi enviado e que a maioria das
   URLs está indexada. Confirme que `contato@politicadiaria.com.br` recebe e-mail.
2. **Crie a conta** no AdSense com o domínio `politicadiaria.com.br` (o AdSense
   normaliza o `www`). Anote o ID do publisher, formato `ca-pub-XXXXXXXXXXXXXXXX`.
3. **Cadastre `NEXT_PUBLIC_ADSENSE_CLIENT`** na Vercel (Production) com esse ID
   e faça um redeploy. Com isso o site passa a: emitir a meta
   `google-adsense-account` em todas as páginas, mostrar o aviso de cookies
   (LGPD) e carregar o script `adsbygoogle.js` só depois da escolha do
   visitante (quem recusa recebe anúncios não personalizados).
4. **Crie `public/ads.txt`** com exatamente uma linha e quebra de linha final,
   trocando os X pelo seu ID sem o prefixo `ca-`:

   ```
   google.com, pub-XXXXXXXXXXXXXXXX, DIRECT, f08c47fec0942fa0
   ```

   Faça o deploy e abra `https://www.politicadiaria.com.br/ads.txt` no navegador:
   tem que responder como texto puro (o `next.config.ts` já força o
   Content-Type). O arquivo não existe no repositório de propósito: ele é
   criado quando o ID existir.
5. **Peça a verificação** no painel do AdSense. Ele reconhece a meta tag ou o
   `ads.txt`. Aguarde a revisão (dias a semanas).
6. **Depois da aprovação**, no painel: em "Privacidade e mensagens", ative a
   mensagem de consentimento (GDPR para EEA/Reino Unido/Suíça e "outras
   regulamentações" para o Brasil). Em "Anúncios > Por unidade", crie as
   unidades (display horizontal, retângulo, in-article e âncora) e cadastre
   os IDs numéricos nas variáveis `NEXT_PUBLIC_ADSENSE_SLOT_*`. Cada formato só
   aparece quando o seu ID existir.
7. **Primeira semana com anúncios**: defina `CSP_REPORT_ONLY=true` na Vercel e
   acompanhe o console do navegador; se algum domínio do Google for bloqueado,
   adicione à lista `googleAds` em `next.config.ts`. Depois remova a variável
   para a CSP voltar ao modo bloqueante.
8. Acompanhe o "Centro de políticas" do AdSense semanalmente.

Regras que o código já aplica e que não devem ser quebradas: nenhum anúncio
acima do h1, nenhum em `/contato`, `/busca`, 404 e institucionais, nenhum
in-article em notícias curtas, sidebar de anúncio não sticky.

## Deploy

O deploy de produção é feito pela Vercel (projeto `politicadiaria`, time
`portal-da-ai`), automático a cada push na branch de produção
(`claude/portal-ai-blog-iujjht`). Domínio principal `www.politicadiaria.com.br`;
`politicadiaria.com.br` redireciona para ele. `site.url` em `lib/articles.ts` usa
o `www`, e dele derivam canonical, sitemap, robots, OG e JSON-LD.

`next.config.ts` aplica cabeçalhos de segurança (CSP compatível com AdSense,
HSTS, nosniff, Referrer-Policy, Permissions-Policy) no deploy da Vercel.

O workflow `.github/workflows/deploy-gh-pages.yml` (GitHub Pages) é só um
preview auxiliar, disparado manualmente (`workflow_dispatch`), com export
estático e `basePath`. Não é o deploy de referência e não deve ser
automatizado.

## Rotinas automáticas

Rotinas agendadas (Claude Code) rodam em outro checkout do repositório e:

- criam artigos diários em `content/articles/<slug>.ts` e notícias em
  `content/news/<slug>.ts` com `npm run content:new`;
- rodam `npm run check:content` antes de qualquer commit (data futura, tags
  proibidas, padrão mínimo de artigo novo);
- abrem PR ou fazem push na branch de produção, o que dispara o deploy.

Toda rotina segue o padrão publicado em `/politica-editorial`: rascunho com
apoio de IA, verificação automática, revisão e assinatura do editor. Datas
sempre em `America/Sao_Paulo`.

## Validação antes de commitar

```bash
npx tsc --noEmit
npx eslint .
npm run check:content
```
