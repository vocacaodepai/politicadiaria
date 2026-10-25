# Rotina: História das eleições e da política (nome do clone: `pd-historia`)

Vale junto com `docs/rotinas/comum.md` (ambiente, git, validação, segurança, publicar) e com
`CLAUDE.md` (linha editorial). Publica artigos em `content/historia/<slug>.ts`, exibidos em
`/historia` (índice, filtro por período e linha do tempo) e `/historia/<slug>`. A seção conta a
história política e eleitoral do Brasil **de trás para frente**: da eleição mais recente para a
mais antiga, **uma eleição ou um período por rodada**.

**Autonomia.** Até o dono do site liberar de forma expressa, a rotina abre o PR e o deixa
**aberto para revisão**; não mescle sozinha. Depois da liberação, vale o fluxo de `comum.md`.

## Escopo de arquivos

Só `content/historia/` (arquivos novos e o `index.ts` gerado) e `public/images/` (só se uma imagem
do corpo precisar ser hospedada, o que normalmente não é o caso: use a URL `upload.wikimedia.org`
devolvida pela API). Nunca altere `docs/`, `CLAUDE.md`, `lib/`, `app/`, `components/`, `scripts/`
nem configuração. `git diff --stat` só pode mostrar esses caminhos.

A linha do tempo do índice vem de `lib/historia-meta.ts` (`HISTORIA_MILESTONES`). A rotina **não
edita** esse arquivo: o marco passa de "em breve" para link sozinho quando existe um artigo com o
mesmo `year` e `period`. Se um marco estiver errado, registre no relatório para o dono corrigir.

## Linha editorial da seção

- **Fatos primeiro.** Quem fez o quê, quando, com que ato formal, que resultado oficial, com data,
  número e fonte. Interpretação vem depois e sempre atribuída.
- **Termos em disputa.** Onde historiadores ou campos políticos divergem de interpretação ou de
  nome (31 de março de 1964: golpe, revolução ou movimento; impeachment de 2016: golpe ou crime de
  responsabilidade; 1930: revolução ou golpe; 1889: proclamação ou golpe militar), descreva
  primeiro os atos verificáveis (decretos, votações, atas, datas) e depois apresente cada termo
  atribuído a quem o usa ("para X...", "segundo Y..."). Nunca carimbe um lado.
- **Mesma régua para todos.** Nenhum adjetivo sobre partido, político ou governo, nem para elogiar
  nem para atacar. Corrija distorções de qualquer lado com fato e fonte, e traga o que costuma
  ficar de fora do resumo de cada campo (seção "Fatos que costumam ficar de fora do resumo de cada
  lado", com pelo menos um item que desagrade a cada campo quando houver fonte).
- **Nada inventado.** Sem fonte aberta e conferida, a frase não entra: número, votação, data,
  citação. Citação literal só curta (até 25 palavras), verificada, entre aspas curvas “ ”, com
  autor e data. O validador barra citação maior.
- **Acusação.** Investigado é investigado, réu é réu, condenado só com decisão (cite o órgão, a data
  e o placar). Sem decisão, descreva a acusação como acusação.
- **Sem IA nas páginas.** Nunca mencione IA, Claude ou Anthropic. Sem travessão (—), sem "Em
  resumo", sem "É importante ressaltar", sem "Vale destacar", sem "como já discutimos".
- Autor sempre `Equipe Política Diária`. Nunca invente revisor nem historiador.

## Escolher o próximo tema

1. `ls content/historia` e `grep -h "year:\|period:" content/historia/*.ts`. Olhe também a linha do
   tempo em `lib/historia-meta.ts`.
2. O próximo é **o marco imediatamente anterior ao mais antigo já publicado** (de trás para frente,
   sem pular). Hoje: depois de 2014 vem 2010, depois 2006, 2002, 1998, 1994, 1989, 1985 e assim por
   diante. Período sem eleição presidencial (Império) vira artigo de período (slug livre, sem
   prefixo `eleicao-`).
3. **Nunca repetir.** Um artigo por `year` + `period`; o validador barra duplicata. Rejeite o tema se
   3 ou mais palavras do slug novo já aparecem juntas em um slug existente.
4. **A eleição de 2026 só entra depois da apuração e da diplomação.** Enquanto houver votação ou
   totalização em curso, o espaço fica no índice como "em andamento, veja /eleicoes". O validador
   barra `year: 2026`; quando a eleição estiver encerrada e diplomada, o dono libera.
5. Uma rodada = um artigo. Se sobrar tempo, não escreva um segundo: pesquise melhor o primeiro.

## Fontes

Hierarquia: primária (TSE, Câmara, Senado, Planalto, STF, Arquivo Nacional, CPDOC/FGV, IBGE,
Diário Oficial, atas, textos legais) e, depois, veículos de imprensa identificados e de campos
variados. Fonte de partido ou fundação partidária entra como `referencia` e é citada como tal.

- **TSE.** `www.tse.jus.br` costuma dar 403 e o painel `resultados.tse.jus.br` pode não devolver
  eleições antigas. Use os **dados abertos**: `https://dadosabertos.tse.jus.br/dataset/resultados-AAAA`
  (a página abre) e os arquivos em `cdn.tse.jus.br` (`votacao_candidato_munzona_AAAA.zip` e
  `detalhe_votacao_munzona_AAAA.zip`; em 2022 há ainda `Historico_Totalizacao_Presidente_BR_1T_2022.zip`
  e `..._2T_2022.zip`). Baixe com `curl`, some `QT_VOTOS_NOMINAIS` do cargo `Presidente` por candidato
  e turno (o arquivo `_BRASIL` e os arquivos de UF aparecem juntos: confira que não dobrou a soma) e
  valide com o total de `QT_VOTOS_CONCORRENTES` e com a imprensa. Percentuais sobre votos válidos
  (nominais). Comparecimento e abstenção: `detalhe_votacao_munzona`.
- **Antes dos dados abertos** (anterior a 1994 e, em geral, anterior a 1945): Arquivo Nacional,
  CPDOC/FGV (verbetes do DHBB), Câmara e Senado (legislação, Memória), Planalto (leis, constituições),
  IBGE (Estatísticas do Século XX / séries históricas), TSE (acervo histórico e "Memória"). Cite a
  página e confira a data e o número que usar.
- **Programas e planos de governo.** A fonte é o documento registrado no TSE (DivulgaCandContas) ou o
  publicado pela campanha. Se o portal bloquear, resuma a partir de veículos que leram o texto (Agência
  Brasil, Câmara, Senado) e **diga no artigo** que o documento original não pôde ser aberto. Candidatos
  menores: uma frase cada, ou só o resultado.
- Cada URL externa é aberta e conferida (WebFetch ou `curl`) antes de entrar. Não abre = não entra. O
  validador exige que **todo link externo do texto esteja listado em `sources`** e que haja ao menos
  uma fonte primária (ou o aviso, no texto, de que ela não pôde ser aberta).

## Formato do artigo (`HistoryArticle`, `lib/types.ts`)

Arquivo `content/historia/<slug>.ts`, `export const entry: HistoryArticle = { ... }`. Para eleição, o
slug é `eleicao-presidencial-AAAA-resultado-candidatos-propostas` (o prefixo `eleicao-` ativa as
regras de eleição do validador). Campos:

- `slug`, `title` (50 a 70 caracteres, palavra-chave natural), `summary` (120 a 160 caracteres, é a
  meta description), `author` (`Equipe Política Diária`), `date` (dia da publicação em
  America/Sao_Paulo), `updated` (opcional), `period` (um dos seis), `year`, `eventDate` (data do
  1º turno ou da votação, AAAA-MM-DD), `imageQuery`, `keyPoints` (3 frases completas), `sources`
  (4 ou mais, cada uma com `label`, `publisher`, `url`, `kind`, `note`), `relatedBooks` (slugs de
  resenhas que existem em `content/articles`, só se houver relação real), `content`, `faq`.
- **Corpo**: 1.200 palavras ou mais, 4 `<h2>` ou mais. Em artigo de eleição, nesta ordem:
  1. contexto (o que estava em jogo, com fatos datados);
  2. os candidatos e as chapas;
  3. **Propostas de cada candidato** (plano de governo ou programa, com link para a fonte; para os
     dois ou três principais, o que prometem, sem adjetivo);
  4. resultado oficial do 1º turno, em **tabela** (votos e % dos válidos), com comparecimento,
     abstenção, brancos e nulos;
  5. resultado oficial do 2º turno, em tabela, quando houve;
  6. **Fatos que costumam ficar de fora do resumo de cada lado** (equilibrado, com fonte);
  7. **O que aconteceu depois**: só fatos datados e com fonte (posse, decisões judiciais, votações
     no Congresso), em ordem cronológica, sem prever nem opinar.
- **Links internos**: 5 ou mais distintos, sempre `/eleicoes` e `/congresso/...` ou `/checagem/...` quando
  houver relação, notícias e resenhas que existam (`ls content/news content/articles`), e os
  vizinhos na linha do tempo (`/historia/<slug>` da eleição seguinte e da anterior, só se o arquivo
  existir). O validador barra link quebrado.
- **Imagem**: `imageQuery` concreto em inglês (lugar, instituição ou pessoa: "Palácio do Planalto
  Brasília", "Supremo Tribunal Federal building"), que passa pela cascata de `lib/wikimedia.ts`
  (Commons primeiro, só licenças livres, crédito visível). Nunca imagem de IA. Imagem no corpo só com
  URL `upload.wikimedia.org` devolvida pela API e legenda `Foto: <autor> / Wikimedia Commons (<licença>)`.
- **HTML**: mesmas tags e classes das notícias (`docs/padrao-editorial.md` seção 3), aspas duplas nos
  atributos, `rel="noopener noreferrer nofollow"` nos externos, sem crase nem `${}` dentro de `content`,
  sem aspas duplas dentro de strings fora do `content` (use “ ”).

## SEO

- Título com a palavra-chave que a pessoa digita ("Eleição de 2010: resultado, candidatos e
  propostas"), **variando o formato** entre os artigos da seção ("Quem ganhou a eleição de 2010 e o que
  cada candidato propôs", "Eleição de 2010: resultado do 1º e do 2º turno") e nunca dois iguais em
  sequência. Sem travessão.
- `faq` de 3 a 5 perguntas **reais de busca** ("Quem ganhou a eleição de 2010?", "Quantos votos teve
  X?", "Quem foram os candidatos?"), respostas factuais de 30 a 90 palavras com número e fonte.
- O restante (metadata, canonical, Open Graph, JSON-LD de Article, BreadcrumbList e FAQPage, sitemap, busca)
  vem dos templates; a rotina só preenche os campos.

## Validar

1. `npm run check:content` com zero ERRO. Para `historia/` ele confere: autor da casa, período e datas,
   mínimo de 1.200 palavras e 4 `<h2>`, 4 fontes https de 2 hosts ao menos, link externo só se estiver em
   `sources`, tabela e seções de propostas e "O que aconteceu depois" nos artigos de eleição, FAQ de 3 a 5,
   `keyPoints` com 3 itens, 5 links internos distintos, citação de até 25 palavras, travessão, menção a
   IA e rótulos pejorativos.
2. `npm run lint`.
3. `npm run build`.
4. Releia como leitor: um apoiador de cada campo concordaria que cada **fato** está certo e que a
   mesma régua foi aplicada? Há fonte para cada número?

## Informe final

Qual marco entrou (título, palavras), que fontes não abriram (e como o texto avisa), se
check-content, lint e build passaram, o link do PR e o que o dono precisa decidir. Não alegue
leitura de livro nem consulta a arquivo físico.

## Correções

Artigos de História **nunca são apagados**: a URL continua no ar. Para corrigir, edite o arquivo,
atualize `updated` e acrescente no texto uma nota "Atualizado em dd/mm/aaaa: ...". Liste no PR qual
arquivo mudou e por quê.
