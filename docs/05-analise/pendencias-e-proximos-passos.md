# Pendências e próximos passos

Checklist acionável derivado da [análise do briefing](analise-do-briefing.md).

---

## 1. Decisões que só o time Renke pode tomar

| # | Decisão | Impacto se não decidir |
|---|---|---|
| D1 | **Números oficiais**: ~30 vs. +140 clínicas · 4 vs. 6 anos | Prova social contraditória em páginas vizinhas |
| D2 | **Padrão de rotas**: `/studio/revena-start` ou `/revena-start` | Retrabalho + redirects depois de indexado |
| D3 | **Agendamento 10x**: descontinuar ou manter? (CEO quer descontinuar, Eduarda discorda) | Página e item de menu em limbo |
| D4 | **H1 da home**: "Isso não é marketing para clínicas. É RevOps" ou a versão favorita do brainstorm | Define o gancho de atenção do site inteiro |
| D5 | **"Primeira do mundo" ou "primeira do Brasil"** | Risco de contestação pública |
| D6 | **Renke Connect**: comunicar como ativo ou "em breve"? | Enfraquece ou fortalece o diferencial técnico |
| D7 | **Menu principal**: inclui Sobre e Cases? | E-E-A-T e navegação de SEO |
| D8 | **Quais 4 das 7 perguntas** entram no grid 2×2 da home | Bloqueia o design da Seção 3 |
| D9 | **4 ou 5 cards** na seção "O que fazemos" da home | Bloqueia o layout da Seção 2 |
| D10 | **Domínio**: `renke.com.br` ou `renkestudio.com.br` | Configuração de DNS, canonical, e-mail |
| D11 | **Depoimentos como componente global** em todas as páginas — confirmar | Define arquitetura de componentes |
| D12 | **Telefone / WhatsApp oficial** para rodapé e contato | Rodapé e /contato incompletos |

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
- [ ] Vídeo institucional "o que a Renke faz" (1–2 min)
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

- [ ] **Stack**: framework, hospedagem, CMS (o briefing pede blog + "autonomia pós-entrega" no
      produto Site Institucional, o que sugere CMS)
- [ ] **Destino dos formulários**: integração com o Renke CRM? E-mail? Webhook?
- [ ] **Rastreamento**: Renke Connect no próprio site (dogfooding), GA4, Meta Pixel, GTM
- [ ] **LGPD**: banner de cookies, política de privacidade, termos de uso — o briefing enfatiza
      "dados de paciente são sensíveis, a gente trata com o rigor que isso exige"; o site precisa
      refletir isso
- [ ] **Estratégia de redirects** do site atual (há um site em produção — `/faca-parte` é descrita
      como "baseada na estrutura atual do site")
- [ ] Orçamento de performance: LCP < 2,5s com hero em motion

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
