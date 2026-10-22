# Rotina: atualização dos dados do Supremo (/stf)

Horário sugerido: duas vezes por dia em dias úteis (07:41 e 19:23, Brasília). Nome do clone: `pd-stf`.
Siga `docs/rotinas/comum.md`. Escopo de arquivos desta rotina: **só `data/stf/` e `public/data/stf/`**
(mais o `.cache/` ignorado). Nunca edite os JSON à mão, nem `app/`, `components/`, `lib/` ou `scripts/`.

## O que a rotina faz

1. Clone, branch e `npm ci` como em comum.md.
2. `NODE_USE_ENV_PROXY=1 npm run stf:update` (coleta incremental: reaproveita o cache de
   notícias já lidas e só busca o que é novo).
   - Primeira vez de um período maior: `npm run stf:update -- --desde=AAAA-MM-DD`. A rotina
     amplia a cobertura aos poucos, recuando a janela em até 30 dias por rodada
     (`--desde` = data de `cobertura.de` menos 30 dias), até chegar a `2026-02-01`.
   - O portal do STF recusa clientes automáticos de forma intermitente (HTTP 403 de WAF). O script
     já repete com espera crescente; se mesmo assim sobrar aviso em `meta.json > avisos`, rode de novo
     uma vez. Persistindo, não mescle e registre.
3. Confira o resultado em `data/stf/meta.json`:
   - `cobertura.de` e `cobertura.ate` coerentes com a janela; `contagens.ministros` igual à composição
     real (11 cadeiras: ministros em exercício mais `vagas`).
   - `avisos` vazio ou explicado. Composição trocada (posse, aposentadoria, vaga) é mudança relevante.
   - Nenhum CPF, endereço ou dado pessoal além de nascimento, formação e carreira públicas.
4. `npm run check:content`, `npm run lint`, `npm run build` sem erro.
5. `git diff --stat` só com `data/stf/` e `public/data/stf/`. PR contra `main`, checks verdes, squash.
6. Informe só se houver troca na composição, novo ministro, novo presidente do STF ou erro.

## Fontes e limites

| Dado | Fonte | Observação |
| --- | --- | --- |
| Pautas, destaques do Plenário Virtual, notícias de julgamento | Portal de Notícias do STF (`noticias.stf.jus.br`) | Fonte oficial acessível por script. |
| Sessões do Plenário e das Turmas | Calendário de eventos do mesmo portal (API `tribe/events`) | Várias agendas de gabinete viram uma sessão por dia e tipo. |
| Composição, posse, indicação, votação no Senado, carreira | Wikipédia (REST) | Fonte secundária, identificada nos dados; conferir com o portal do STF quando acessível. |
| Fotos | Wikimedia Commons (CC0, CC BY, CC BY-SA, domínio público) | Crédito e licença visíveis; sem foto, avatar de iniciais. |
| Corte Aberta, jurisprudência, pauta estruturada | `portal.stf.jus.br` | Responde 403 a scripts: não é coletado. Quando houver acesso, é o melhor lugar para ampliar. |

### Regras do que entra em `julgamentos.json`

- Um registro por notícia oficial de julgamento (Plenário, Plenário Virtual ou Turma) que cita processo.
- **Voto individual só quando a notícia o descreve em frase explícita** (divergiu, acompanhou o relator,
  pediu vista, impedimento ou suspeição, ficou vencido, votou). A frase fica em `votos[].trecho` como
  evidência. Nada é inferido de "por unanimidade" ou "por maioria".
- `sigilo`: `sigiloso` se o texto diz sigilo ou segredo de justiça; `publico` para itens de pauta pública;
  `nao_informado` nos demais (a notícia não traz o campo).
- `data`: a do julgamento quando a notícia a informa ("nesta quarta-feira (14)"); senão a da notícia,
  marcada em `dataTipo`.
- Estatísticas por ministro (`estatisticas`) contam só o que está na cobertura. Tempo de pedido de vista
  e decisões monocráticas por ano ficam `null` ("não coletado") até haver fonte acessível.

## Se o script precisar de ajuste

Rotinas não editam `scripts/`. Se o formato do portal mudar (a coleta cair para zero julgamentos ou zero
pautas com a janela cheia), registre o problema e não mescle: a correção do script é tarefa de
desenvolvimento, não da rotina.
