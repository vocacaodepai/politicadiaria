# Rotina: notícias de política (nacional e internacional)

Horários (Brasília): 06:20, 09:20, 12:20, 15:20, 18:20 e 21:20. Nome do clone: `pd-noticias`.
Siga `docs/rotinas/comum.md` além do que está aqui. Se não houver notícia nova de verdade,
termine em silêncio, sem commit e sem mensagem. Publique **no máximo 2 notícias por rodada**.

## Equilíbrio

Alterne a cobertura ao longo do dia: nas rodadas, procure ao menos 1 fato nacional e, quando
houver, 1 internacional. Varie os `topic` (não empilhe tudo em `brasil`).

## O que procurar (últimas 24 a 48 horas)

Use WebSearch (3 a 6 buscas, em português e inglês) por fatos verificáveis sobre:
- **Brasil**: votações e pautas da Câmara e do Senado, decisões do STF/TSE/STJ, atos do
  Executivo (decretos, medidas provisórias, nomeações), eleições e calendário eleitoral,
  política econômica com efeito político (orçamento, reforma, arcabouço fiscal), CPIs, emendas.
- **Mundo**: eleições e crises de governo, EUA (Casa Branca, Congresso, Suprema Corte),
  América Latina, União Europeia e países europeus, Oriente Médio, China/Ásia, Rússia/Ucrânia,
  ONU, G20, BRICS, acordos comerciais e sanções, com ângulo para o leitor brasileiro.

Só publique fato com `sourceUrl` de veículo ou fonte oficial (gov.br, camara.leg.br,
senado.leg.br, stf.jus.br, tse.jus.br, ONU etc.) que você abriu com WebFetch e conferiu. Nunca
invente, nunca reescreva boato, nunca publique só a versão de um lado. Para votações do
Congresso, confira o placar na fonte oficial. Compare com `grep -h sourceUrl content/news/*.ts`
e pule o que já foi coberto.

## Escrever

- `npm run content:new -- noticia <slug>` (slug curto com a keyword, sem acentos; se a notícia for
  de ontem, ajuste `date`).
- Campos: title (55 a 75, factual), summary (140 a 158), sourceName, sourceUrl (https), author
  "Equipe Política Diária", `publishedAt` com a hora real de agora em Brasília, `topic`,
  `imageQuery` específico (pessoa/instituição/lugar do fato; ver CLAUDE.md "Imagens"), content,
  faq opcional (2 ou 3).
- content: 900+ palavras em HTML, 3+ `<h2>`, estrutura do `docs/padrao-editorial.md` (fato em 2
  parágrafos com fonte linkada, contexto, "Por que isso importa", desdobramentos). 3 a 6 links
  internos reais; se citar parlamentar com página em `data/congresso`, linke
  `/congresso/deputados/<slug>` ou `/congresso/senadores/<slug>` (confira o slug nos dados).
- 1 ou 2 imagens no corpo via API do Wikimedia Commons quando a cena for concreta
  (licença conferida, legenda com autor/licença); sem imagem boa, siga sem.
- Atribua posições a quem as emitiu; no caso de disputa política, registre a posição de cada lado.

## Informe

Só quando publicar: 1 ou 2 frases dizendo o que entrou, terminando com https://www.politicadiaria.com.br
