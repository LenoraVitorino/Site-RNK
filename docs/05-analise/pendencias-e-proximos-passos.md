# Pendências e próximos passos

Checklist acionável derivado da [análise do briefing](analise-do-briefing.md).

---

## 1. Decisões que só o time Renke pode tomar

| # | Decisão | Impacto se não decidir |
|---|---|---|
| D1 | **Números oficiais**: ~30 vs. +140 clínicas · 4 vs. 6 anos | Prova social contraditória em páginas vizinhas |
| ~~D2~~ | ~~**Padrão de rotas**~~ → **hierárquico** (`/studio/revena-start`), em 06/09/2026 | ✅ resolvido |
| D3 | **Agendamento 10x**: descontinuar ou manter? (CEO quer descontinuar, Eduarda discorda) | Página e item de menu em limbo |
| D4 | **H1 da home**: "Isso não é marketing para clínicas. É RevOps" ou a versão favorita do brainstorm | Define o gancho de atenção do site inteiro |
| D5 | **"Primeira do mundo" ou "primeira do Brasil"** | Risco de contestação pública |
| D6 | **Renke Connect**: comunicar como ativo ou "em breve"? | Enfraquece ou fortalece o diferencial técnico |
| ~~D7~~ | ~~**Menu principal**: inclui Sobre e Cases?~~ → **sim**, dentro do grupo "A Renke", em 30/08/2026 | ✅ resolvido |
| D8 | **Quais 4 das 7 perguntas** entram no grid 2×2 da home | Bloqueia o design da Seção 3 |
| D9 | **4 ou 5 cards** na seção "O que fazemos" da home | Bloqueia o layout da Seção 2 |
| D10 | **Domínio**: `renke.com.br` ou `renkestudio.com.br` | Configuração de DNS, canonical, e-mail |
| D11 | **Depoimentos como componente global** em todas as páginas — confirmar | Define arquitetura de componentes |
| D12 | **Telefone / WhatsApp oficial** para rodapé e contato | Rodapé e /contato incompletos |
| ~~D14~~ | ~~**Vídeo institucional: auto-hospedar ou manter o embed?**~~ → **auto-hospedado**, em 30/08/2026 | ✅ resolvido |
| ~~D13~~ | ~~**Stack**~~ → **Astro**, decidido em 29/08/2026 | ✅ resolvido |

---

## 1b. Páginas construídas

13 das 23 rotas do menu já estão no ar, todas com a copy literal de `docs/03-copy/`:

| Rota | Origem da copy |
|---|---|
| `/` | home.md |
| `/studio/revena-start` · `-full` · `-core` · `-scale` · `-run` | os cinco protocolos |
| `/academy` + as 5 páginas de produto | academy.md e derivadas |
| `/contato` · `/faca-parte` | contato.md · faca-parte.md |
| `/404` | sem copy no briefing — escrita para o deploy |

As 10 restantes seguem no menu marcadas **"em breve"**, sem link, porque não têm copy:
`/studio/site-institucional`, `/studio/identidade-visual`, `/tools/renke-connect`,
`/tools/renke-crm`, `/sobre`, `/cases`, `/blog`, `/studio`, `/tools` e
`/studio/treine-sua-equipe`.

> **`/treine-sua-equipe` é o caso diferente:** a copy existe e está completa. A página não foi
> construída porque o próprio documento manda não construir até a **D3** ser resolvida — o CEO quer
> descontinuar o produto e a Eduarda discorda. Se a decisão for manter, a página sai em minutos.

O menu deriva o estado de cada link do diretório de páginas (`src/data/rotas.ts`), então uma rota
nova acende sozinha quando a página entra. Não há link levando a 404.

---

## 2. Conteúdo a produzir (copy)

### Prioridade alta — bloqueia páginas já mapeadas
- [ ] **Home · Seção 5 (CTA final)** — copy inexistente
- [ ] **Home · FAQ** (4 perguntas) — exigida pelo schema declarado
- [ ] **Home · seções previstas no sitemap e ausentes na copy**: "Visual jornada", "Por que a Renke e
      não mais uma agência?", "Metáfora do corpo"
- [ ] **Revena Full · Seção Resultados**
- [ ] **Revena Scale · Seção Resultados**
- [ ] **Revena Core · Seção Resultados**
- [ ] **Revena Start · Seção 5** (ou renumerar)
- [ ] **Contato · 5ª pergunta do FAQ**

### Prioridade alta — páginas inteiras sem copy
- [ ] `/studio` — visão geral do Studio
- [ ] `/sobre` — quem somos, história, tese, time, números, cultura
- [ ] `/cases` — depende dos cases reais (ver seção 3)
- [ ] `/tools` — Renke CRM, Connect, Pulse AI + waitlist

### Prioridade média
- [ ] `/studio/site-institucional`
- [ ] `/studio/identidade-visual`
- [ ] `/academy/clickup-on-track`
- [ ] `/academy/crm-sheets`
- [ ] Notas SEO das 5 páginas de produto da Academy

### Prioridade baixa (pós-lançamento)
- [ ] Blog — primeiros posts das 4 categorias, começando pelo território virgem:
      "o que é revops", "por que trocar de agência não funciona", "quanto custa captar um paciente"

---

## 3. Insumos e assets a coletar

O próprio briefing lista em "próximos insumos necessários": **cases com números reais**.

### Prova social
- [ ] **Cases com números reais** (antes/depois, por especialidade) — substitui os placeholders da home
- [ ] Depoimentos de clientes: foto real + fala + nome + especialidade + cidade (mín. 2 para a home)
- [ ] Depoimentos de agências (para Protocolo Renke)
- [ ] Logos de clientes autorizados para uso (5–6 para o hero) + nome e especialidade para o tooltip
- [ ] Autorização formal de uso de imagem/marca dos clientes

### Marca e identidade
- [ ] Manual de identidade visual: cores (hex), tipografia oficial, uso do logo
- [ ] Logo Renke (SVG) + Logo Renke Academy (SVG)
- [ ] Selo GPTW

### Fotografia e vídeo
- [ ] **Nova foto do time** (colaboradores ativos) — a atual está desatualizada
- [ ] **Novos depoimentos em vídeo do time** — os atuais estão desatualizados
- [ ] **Fotos da nova sede** — a sede mudou
- [x] ~~Vídeo institucional "o que a Renke faz" (1–2 min)~~ → é o reel
      [DXcJsj2FTz0](https://www.instagram.com/reel/DXcJsj2FTz0/) do @renke.studio, 1min42, 1080×1920.
      Auto-hospedado na segunda dobra em 30/08/2026 (slot 02), com play automático ao entrar
      na tela. Ver **D14** na seção 4.
- [ ] GIF/motion do hero: fluxo do dado (anúncio → CRM → agendamento → venda), 3–5s

### Prints de produto (com blur nos dados sensíveis)
- [ ] CRM com dados entrando / rastreamento de origem
- [ ] Painel/dashboard de dados
- [ ] Fluxograma de processo / mapa de operações
- [ ] Mensagem de confirmação de consulta no WhatsApp
- [ ] Orçamento sendo resgatado / follow-up
- [ ] Mensagem de relatório enviada no grupo do cliente
- [ ] Documento de análise de concorrentes / mapa de posicionamento
- [ ] Anúncios e LPs já produzidos (composição)

### Dados institucionais
- [ ] **Novo endereço** confirmado (`/faca-parte` tem placeholder literal)
- [ ] Telefone/WhatsApp oficial

---

## 4. Definições técnicas a fechar antes de codar

- [x] ~~**Stack**: framework~~ → **Astro** (decidido em 29/08/2026). Estático por padrão, o que
      atende o `LCP < 2,5s`; content collections para o blog; roteamento por arquivo espelhando as
      URLs hierárquicas. Ver [`src/`](../../src/).
- [ ] **CMS**: ainda em aberto, e agora é bloqueante. O time da Renke vem de WordPress/Elementor;
      sem um painel (Sanity, Decap, Contentful), publicar post de blog passa a exigir Git.
      O briefing promete "autonomia pós-entrega" no produto Site Institucional — o site da própria
      Renke precisa ser coerente com isso.
- [ ] **Hospedagem**: Netlify, Vercel ou Cloudflare Pages. Todas servem build estático de Astro;
      a escolha se acopla à do CMS e à de onde os formulários serão processados.
- [ ] **Destino dos formulários**: integração com o Renke CRM? E-mail? Webhook?
- [ ] **Rastreamento**: Renke Connect no próprio site (dogfooding), GA4, Meta Pixel, GTM
- [ ] **LGPD**: banner de cookies, política de privacidade, termos de uso — o briefing enfatiza
      "dados de paciente são sensíveis, a gente trata com o rigor que isso exige"; o site precisa
      refletir isso
- [ ] **Estratégia de redirects** do site atual (há um site em produção — `/faca-parte` é descrita
      como "baseada na estrutura atual do site")
- [ ] Orçamento de performance: LCP < 2,5s com hero em motion
- [x] ~~**D14 · Vídeo institucional: embed ou arquivo próprio?**~~ → **arquivo próprio**, em
      30/08/2026. O embed do Instagram custava dois cliques para dar play, colocava o JS e as
      fontes deles na página e deixava o vídeo dependente de a conta continuar pública.
      O arquivo original tinha 14,7 MB — já em 720×1280, que é o que o Instagram serve, então
      não havia resolução a cortar; o que sobrava era bitrate. Encodes testados:

      | Codec | Ajuste | Tamanho |
      |---|---|---|
      | **H.264** | **CRF 32, preset slow** | **6,6 MB** ✅ |
      | H.264 | CRF 31, veryslow, tune film | 6,8 MB |
      | VP9 | CRF 40, cpu-used 2 | 9,0 MB |
      | VP9 | CRF 34, cpu-used 4 | 13,9 MB |

      VP9 saiu maior em todos os ajustes: a imagem é escura, granulada e de celular, e o x264
      lida melhor com grão. Um segundo formato só se pagaria se fosse menor — então fica só o
      `.mp4`, que todo navegador atual toca. `preload="none"` mantém o vídeo fora do
      carregamento inicial, então o `LCP < 2,5s` continua de pé.

---

## 5. Ordem de execução sugerida

```
Fase 0 · Destravar        → D1–D12 + cases reais + manual de marca
Fase 1 · Fundação         → design system, componentes globais, header/footer
Fase 2 · Home             → a página que carrega 90% do tráfego
Fase 3 · Studio           → /studio + 5 páginas de protocolo
Fase 4 · Conversão        → /contato, /sobre, /cases
Fase 5 · Academy          → /academy + 5–7 páginas de produto
Fase 6 · Complementos     → /tools, /faca-parte, produtos digitais
Fase 7 · Blog             → estrutura + primeiros posts de território virgem
```

**Racional:** a Fase 0 não é opcional. Sem números oficiais e cases reais, a home — que é a página
mais importante — sai com prova social placeholder, e refazer depois custa mais do que esperar.

Enquanto a Fase 0 roda, a Fase 1 (design system e componentes) pode avançar em paralelo, porque não
depende de nenhuma das decisões pendentes exceto a paleta.
