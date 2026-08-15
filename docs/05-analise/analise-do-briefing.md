# Análise do briefing

Leitura crítica do documento original. O objetivo aqui não é discordar da estratégia — ela está
sólida e bem construída — mas listar o que **trava a execução** se não for resolvido antes de
desenhar e codar.

Resumo: o briefing é forte em **estratégia, posicionamento e copy**. As lacunas são de
**consistência numérica, rotas e assets**.

---

## 🔴 Bloqueantes (resolver antes de começar o design)

### Números de prova inconsistentes

O mesmo indicador aparece com valores diferentes em páginas diferentes. Como o site inteiro se
sustenta em prova social, isso é o risco de credibilidade mais alto do projeto.

| Indicador | Valores encontrados | Onde |
|---|---|---|
| Clínicas atendidas | **~30** / **+140** / **+10** | Hero da home / Sobre + Academy + metas / Narrativa institucional |
| Tempo de operação | **4 anos** / **6 anos** | Home, Sobre, Performa, Cultura Pro / Contato |
| Recorrência de gestão de CRM (Academy) | **R$3k–R$5k/mês** / **R$1k–R$5k/mês** | Treinamento CRM §3 / Treinamento CRM §5 |

**Hipótese provável:** ~30 = clínicas **ativas hoje**; +140 = clínicas **atendidas historicamente**;
+10 = número desatualizado de um rascunho antigo. Se for isso, basta rotular explicitamente
("30 clínicas ativas" vs. "+140 clínicas atendidas em 4 anos") e o conflito some.

**Ação:** definir uma tabela única de números oficiais e referenciá-la em todas as páginas.

### Conflito de rotas

| Rota no sitemap | Rota na copy |
|---|---|
| `/studio/revena-start` | `/revena-start` |
| `/studio/treine-sua-equipe` | `/treine-sua-equipe` |
| `/carreiras` | `/faca-parte` |

A seção de SEO técnico do próprio briefing pede "URLs limpas e **hierárquicas** (/studio/revena-start)",
o que favorece o padrão do sitemap. Decidir antes de qualquer implementação — mudar URL depois custa
redirect e perda de ranking.

### Números de resultado são placeholder

A seção 4 da home (7%→19%, 29%, 38%, 24%, 60 dias) está marcada no próprio briefing como
**placeholder**. E o insumo "cases com números reais" aparece na lista de "próximos insumos
necessários" — ou seja, ainda não existe.

Sem isso, `/cases` não pode ser construída e a home fica com prova social fictícia.
**Não publicar números inventados.**

---

## 🟡 Lacunas de conteúdo (copy faltando)

| Página | O que falta |
|---|---|
| **Home** | Seção 5 (CTA final) — o designer tem direcionamento visual, mas **não há copy**. A numeração pula de 4 para 6. |
| **Home** | Schema declara **FAQ com 4 perguntas**, mas não existe seção de FAQ na copy. |
| **Home** | Seções previstas no sitemap que **não estão na copy**: "Visual jornada" (agência para no lead), "Por que a Renke e não mais uma agência?", "Metáfora do corpo (veias/coração)". |
| **Revena Start** | Seção 5 ausente (pula de 4 para 6). |
| **Revena Full** | Seção 6 (Resultados) é só `[IMG]`. |
| **Revena Scale** | Seção 8 (Resultados) é só `[IMG]`. |
| **Revena Core** | Seção 7 (Resultados) é um comentário interno não resolvido. |
| **Contato** | Schema declara FAQ com **5** perguntas; só há **4**. |
| **Contato / Rodapé** | **Telefone/WhatsApp não informado** em lugar nenhum, mas está previsto no rodapé e no sitemap. |
| **Academy** | **ClickUp On Track** e **CRM Sheets** estão no sitemap e na hierarquia de produtos, mas não têm copy nem aparecem na listagem de produtos da página. |
| **Studio (visão geral)** | Página `/studio` prevista no sitemap, **sem copy**. |
| **Tools** | Página `/tools` prevista, **sem copy** (só diretrizes). |
| **Sobre** | Página `/sobre` prevista, **sem copy dedicada** (só o bloco resumido da home). |
| **Cases** | Página `/cases` prevista, **sem copy e sem dados**. |
| **Blog** | Categorias definidas, **sem nenhum post**. |
| **Site Institucional / Identidade Visual** | Páginas previstas no menu, só com diretrizes de comunicação. |
| **Academy (produtos)** | Notas SEO ausentes em Protocolo Renke, Performa, Treinamento CRM, Rastreamento Avançado e Cultura Pro. |

**Contagem:** das ~25 páginas previstas no sitemap, **15 têm copy** e cerca de **10 não têm**.

---

## 🟡 Contradições internas de comunicação

### H1 da home divergente do briefing estratégico

O brainstorm elege como headline favorita:
> ⭐ "Não somos agência de marketing para clínicas. Cuidamos de tudo que faz o paciente chegar, fechar e voltar."

Mas a copy final usa:
> "Isso não é ~~marketing para clínicas~~. É RevOps"

E as notas SEO da mesma página registram uma **terceira** variação:
> "Não é marketing para clínicas. É RevOps."

A versão da copy é mais curta e visualmente mais forte (o strikethrough resolve o "não somos"), mas
ela **introduz "RevOps" logo na H1** — exatamente o jargão que o briefing classifica como "conceito
educativo para quem quer entender o framework", não como gancho de atenção. O gancho recomendado era
"faturamento previsível".

**Vale testar** as duas versões. Não é erro, é uma decisão que ninguém registrou ter tomado.

### "Primeira do mundo" vs. "primeira do Brasil"

- Home e /sobre: "primeira assessoria de Revenue Operations para clínicas de alto padrão **do mundo**"
- /faca-parte: "primeira assessoria de Revenue Operations para clínicas de alto padrão **no Brasil**"

"Do mundo" é uma afirmação difícil de sustentar e fácil de contestar. "No Brasil" é mais defensável.
Padronizar — e, idealmente, escolher a versão que sobrevive a um checagem pública.

### Renke Connect: ativo ou "em breve"?

- Estratégia (Tools): "**já ativo**, incluso no Start/Full... não precisa ser 'em breve'"
- Menu da home: "Renke Connect **(em breve)**"

O Connect é o que sustenta a frase "nossa tecnologia rastreia cada conversão, do clique até o
paciente na cadeira. Nenhuma agência faz isso" — marcá-lo como "em breve" enfraquece o diferencial
mais técnico da Renke.

### Scale referencia o Core

A diretriz é explícita: *"NÃO comunicar como 'Core + extras'"*. Mas a copy do Scale abre a Seção 3
com o bloco **"Tudo do Core"** e a Etapa 1 da jornada começa com **"Tudo do Core + ..."**.

Mesmo problema, menor grau, no Full: Seção 3 se chama "Tudo do Revena Start + a jornada completa" —
aqui não há diretriz proibindo, mas quebra a regra de independência entre páginas.

**Sugestão:** descrever o conteúdo em vez de referenciar o produto ("Marketing, comercial e dados
integrados operando toda semana" em vez de "Tudo do Core").

### Menu inconsistente entre documentos

O menu do sitemap (`Pra Clínicas | Pra Agências | Tools | Sobre | Cases | Blog | Contato`) e o menu
da copy da home (`Home | Para Clínicas | Para Agências | Outras Soluções | Tecnologia | Conteúdos |
Contato | Faça Parte`) não batem. "Sobre" e "Cases" **somem** no segundo.

Dado que /sobre e /cases são pilares de E-E-A-T declarados no próprio briefing, tirá-los do menu
principal é contraditório com a estratégia de SEO.

---

## 🟡 Numeração de seções quebrada

Vários documentos têm numeração inconsistente — sintoma de edição incremental, mas gera ambiguidade
na hora de montar:

| Página | Problema |
|---|---|
| Home | 4 → 6 (falta a 5) |
| Revena Start | 4 → 6 (falta a 5) |
| Revena Core | duas seções numeradas "SEÇÃO 5" |
| Revena Scale | duas seções numeradas "SEÇÃO 5" |
| Contato | 2 → 5 → 6 |
| Faça Parte | 4 → 6 |

Nesta documentação a numeração foi **normalizada** e as divergências marcadas.

---

## 🟡 Assets pendentes

| Asset | Status |
|---|---|
| Foto do time | ⚠️ Desatualizada — trocar por colaboradores ativos |
| Depoimentos em vídeo do time | ⚠️ Desatualizados — regravar |
| Fotos da sede | ⚠️ Sede mudou — refotografar |
| Endereço em /faca-parte | ⚠️ `[NOVO ENDEREÇO AQUI]` — placeholder literal |
| Logos de clientes | Não fornecidos |
| Depoimentos de clientes (foto + fala + nome + especialidade + cidade) | Não fornecidos |
| Prints de produto (CRM, dashboards, relatórios, automações) | Não fornecidos |
| Vídeo institucional "o que a Renke faz" | Referenciado como [Vídeo Instagram], não fornecido |
| GIF/motion do hero | Só a referência de Slides |
| Selo GPTW | Não fornecido |
| Logo Renke / Renke Academy | Não fornecido |
| Manual de identidade visual (hex, fontes) | Não fornecido |

O briefing tem **19 imagens**, das quais só 3 são conteúdo real (time, sede, CEO — extraídas para
`docs/assets/briefing/`). As outras 16 são referências externas do ClickUp que não vieram no export.

---

## 🟢 Observações menores

- **Erros de digitação** no rascunho da narrativa institucional ("jhojejoga", "oess jogo",
  "nno ovo", "Teso no modelo", "d que tá funcionando", "avalição", "oeprações", "pré gerir").
  Corrigidos na transcrição desta documentação; o original está preservado em `_original/`.
- **Domínio:** o sitemap usa `renke.com.br`, mas o e-mail de contato é `@renkestudio.com.br`.
  Confirmar qual domínio hospeda o site e se há redirect entre eles.
- **"Cirurgia" vs. "procedimento":** a analogia aparece nas duas formas ("você não entra em cirurgia
  sem exames" / "você não entra em procedimentos sem exames"). "Procedimento" é mais inclusivo para
  clínicas não-cirúrgicas.
- **Depoimentos como componente global** foi sugerido num comentário interno, mas nunca formalizado.
  Já registrei como decisão recomendada em [padrões de página](../02-arquitetura/padroes-de-pagina.md).
- **Sinalização de preço:** a página Protocolo Renke expõe faixas de ticket de projeto
  (R$20k–R$40k, R$6.5k–R$15k/mês) que são do **cliente da agência**, não do curso — está correto,
  mas vale conferir se não gera confusão com o preço do próprio produto (R$7k, que não vai pro site).

---

## O que está muito bem resolvido

Vale registrar, porque deve ser preservado na execução:

- O **filtro do WhatsApp** ("ele entende de primeira ou pede pra explicar?") é um critério de
  qualidade operacional raro em briefing — dá pra aplicar mecanicamente.
- O **glossário de tradução CEO → médico** e a lista de termos proibidos eliminam a maior fonte de
  ruído em site B2B técnico.
- A **regra de independência entre páginas** está certa para SEO: cada página captura uma intenção
  de busca e converte sozinha.
- A estratégia de **território virgem** no blog ("revops para clínicas", "por que trocar de agência
  não funciona") é a jogada de SEO mais inteligente do documento: baixo volume, zero concorrência,
  e cria a categoria.
- O reconhecimento de que a **concorrência é a inércia**, não outra empresa, orienta corretamente
  toda a copy para "custo da inação".
