# Rotina: Checagem de boatos (nome do clone: `pd-checagem`)

Vale junto com `docs/rotinas/comum.md` (ambiente, git, validação, segurança, publicar) e com
`CLAUDE.md` (linha editorial). Publica checagens em `content/checagens/<slug>.ts`, exibidas em
`/checagem`. A regra de ouro: **a mesma régua para qualquer campo político**. Boato contra ou a
favor de qualquer candidato, partido ou governo recebe a mesma investigação, o mesmo rigor e o
mesmo tom.

## Escopo de arquivos

Só `content/checagens/` (arquivos novos e o `index.ts` gerado). Nunca altere `docs/`,
`CLAUDE.md`, `lib/`, `app/`, `components/`, `scripts/` nem configuração. `git diff --stat` só
pode mostrar `content/checagens/`.

## Passo a passo

1. Clone e branch como em `comum.md`, com `<rotina>` = `checagem`:
   `git clone https://github.com/vocacaodepai/politicadiaria /tmp/pd-checagem-$(date +%s)`.
   Leia `CLAUDE.md`, `docs/padrao-editorial.md` e este arquivo. Liste o que existe:
   `ls content/checagens` e `grep -h "title:" content/checagens/*.ts`.
2. **Caçar boatos das últimas 24 horas** (America/Sao_Paulo). Fontes de pauta:
   - Agências de checagem: Aos Fatos, Lupa, Comprova, Estadão Verifica, g1 Fato ou Fake, UOL Confere.
   - TSE: "Fato ou Boato" (justicaeleitoral.jus.br/fato-ou-boato) e a central de enfrentamento à
     desinformação; decisões recentes do TSE e do STF sobre remoção de conteúdo.
   - Imprensa identificada e cobertura de campanha; redes sociais só para entender o alcance
     (nunca como fonte do veredito, e sem linkar o boato).
3. **Escolher até 3 por rodada**, com estes critérios, nesta ordem:
   1. Alcance (visualizações, republicação por perfis grandes ou por candidatos).
   2. Impacto eleitoral, em saúde ou em segurança.
   3. Equilíbrio: varie os campos atingidos. Se as pautas do dia atingirem só um lado, procure
      ativamente boatos do outro e, se não houver bem documentado, publique só o que comprovar.
   4. Fato verificável (alegação concreta, com data, pessoa, número ou documento). Opinião e
      ironia não são checadas.
   Rejeite: boato que já tem checagem nossa (veja o slug e a alegação), alegação sem fonte
   verificável, assunto privado de pessoa comum, conteúdo sobre menores.
4. **Checar** cada alegação:
   1. Registre a alegação **como circulou** (texto, onde e quando apareceu), sem link para o boato
      e sem reproduzir imagem dele.
   2. Busque a **fonte primária**: Diário Oficial, TSE, Câmara (API de dados abertos
      `dadosabertos.camara.leg.br`), Senado, STF, Planalto, ONU, o órgão ou a pessoa citados.
   3. Cruze com agências de checagem e imprensa. Abra **cada URL com WebFetch** e confira o que a
      página realmente diz (data, números, citações). Não abre = não entra. Se um site bloquear o
      acesso (403), a fonte não entra como aberta; use outra.
   4. **Nunca dê veredito sem fonte primária ou ao menos duas fontes independentes abertas e
      conferidas.** Sem isso, não publique.
   5. Quando as fontes divergem (data, número, quem decidiu), use a fonte primária e registre a
      divergência na nota da fonte.
   6. Atribua cada afirmação a quem a fez ("segundo o Aos Fatos", "segundo o TSE"). Não atribua
      intenção, não alegue autoria do boato sem decisão judicial ou fato documentado, e não
      chame ninguém de mentiroso. Pessoa investigada é "investigada"; réu é "réu".
5. **Escolher o veredito** pelo que as fontes sustentam, não pelo que seria mais claro:
   - `falso`: o fato central é contrariado por fonte primária ou por fontes independentes.
   - `enganoso`: parte é verdadeira, mas o conjunto leva a conclusão que as fontes não sustentam.
   - `fora-de-contexto`: o material é real, mas com data, local ou sentido diferentes dos originais.
   - `sem-provas`: não há evidência aberta que confirme nem que desminta.
   - `verdadeiro`: fonte primária confirma. Checagem de alegação verdadeira também se publica.
   Na dúvida entre dois selos, use o menos severo e explique na análise.
6. **Escrever**: `npm run content:new -- checagem <slug>` cria o esqueleto (tipo `FactCheck` em
   `lib/types.ts`). Preencha todos os campos:
   - `title` factual ("É falso que...", "Vídeo ... não foi gravado ..."), sem caça-clique.
   - `summary` (até 158 caracteres) e `quick` ("Em 20 segundos": veredito mais o essencial).
   - `claim` (`text`, `origin`, `firstSeen` quando conhecida, `attribution`).
   - `points`: o que é verdade, o que não é e o que não foi confirmado (`verdade`, `falso`, `atencao`).
   - `sources`: **todas** as fontes realmente abertas, cada uma com `label`, `publisher`, `url`
     https, `kind` (`primaria`, `agencia`, `imprensa`, `referencia`), `note` (o que confirma) e
     `published`. O site mostra "Checado em N fontes" com N igual ao tamanho dessa lista: nunca
     infle a lista.
   - `timeline` (datas reais e verificadas) e `content` (HTML, mesmo guarda-corpo das notícias:
     h2 "O que as fontes dizem", "Por que o veredito é X", links internos quando houver).
   - `date` = dia da checagem, `checkedAt` = hora real em Brasília, `updated` = mesma data.
   - Strings entre aspas duplas, sem aspas duplas dentro (use “ ”), sem crase nem `${}`
     no `content`, sem travessão (—), sem mencionar IA, Claude ou Anthropic.
   - Parlamentar citado: link para a página dele em `/congresso/...` quando existir.
7. **Validar** (`comum.md`): `npm run check:content` (valida veredito, mínimo de 2 fontes https
   com hosts distintos, datas, linha do tempo, travessão e HTML), `npm run lint`, `npm run build`.
8. **Publicar**: commit em português com o rodapé de atribuição padrão, push da branch
   `claude/pd-checagem-AAAAMMDD-HHMM`, PR contra `main`, esperar os checks e mesclar por
   **squash**. Conflito em `content/checagens/index.ts`: é gerado; `git merge origin/main`,
   `npm run content:index`, valide de novo. Depois do merge, confirme `merged: true` e remova
   o clone.

## Regras de comunicação

- **Informe só quando publicar.** Rodada sem checagem publicável termina em silêncio: sem PR,
  sem mensagem, e o clone é removido.
- No máximo **3 checagens por rodada**. Nunca repita alegação já checada (compare alegação e
  slug: 3 ou mais palavras do slug novo já juntas num slug existente = rejeite).

## Correções e atualizações

- Checagens **nunca são apagadas**: a URL continua no ar.
- Se uma fonte mudar, houver decisão nova (TSE, STF) ou erro nosso: edite o arquivo da checagem,
  ajuste o que mudou, atualize `updated` para a data de hoje e acrescente em `corrections` um
  item `{ date, text }` que explique o que mudou ("Atualizado em ..."). Se o veredito mudar,
  explique o motivo na correção e na análise. Só altere checagens da própria rodada ou as que a
  rotina está revisando de propósito; liste no PR qual arquivo mudou e por quê.
- Mantenha o tom: erro corrigido às claras, sem defensiva e sem apagar o histórico.
