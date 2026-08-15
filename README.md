# Site Institucional — Renke

Repositório do projeto do site institucional da **Renke** (Studio · Academy · Tools).

> **Posicionamento em uma linha:**
> A Renke não é agência de marketing. É uma assessoria de **Revenue Operations** para clínicas de
> alto padrão — conecta marketing, comercial e dados num sistema só.

## Status

🟡 **Fase 0/1 — Descoberta concluída, wireframe da home em andamento.**
O briefing foi analisado e documentado, e a home existe como wireframe estrutural.
Há decisões e insumos pendentes que bloqueiam o design visual — ver
[pendências e próximos passos](docs/05-analise/pendencias-e-proximos-passos.md).

👉 **Wireframe da home:** [`wireframe/index.html`](wireframe/index.html)
(abra no navegador — [instruções](wireframe/README.md))

## Por onde começar

👉 **[`docs/README.md`](docs/README.md)** — índice completo da documentação.

Atalhos:

| Se você é... | Comece por |
|---|---|
| **Copywriter** | [Posicionamento e tom de voz](docs/01-estrategia/posicionamento-e-tom-de-voz.md) → [Glossário e termos proibidos](docs/01-estrategia/glossario-e-termos-proibidos.md) → [`03-copy/`](docs/03-copy/) |
| **Designer** | [Notas para o designer — Home](docs/04-design/notas-designer-home.md) → [Diretrizes visuais](docs/04-design/diretrizes-visuais.md) |
| **Dev** | [Sitemap](docs/02-arquitetura/sitemap.md) → [Padrões de página](docs/02-arquitetura/padroes-de-pagina.md) → [SEO e keywords](docs/02-arquitetura/seo-e-keywords.md) |
| **Gestão do projeto** | [Análise do briefing](docs/05-analise/analise-do-briefing.md) → [Pendências](docs/05-analise/pendencias-e-proximos-passos.md) |

## As duas regras que governam todo o conteúdo

**1. O objetivo #1**
> Fazer o visitante entender em **5 segundos** que a Renke **não é agência de marketing**.

**2. O filtro do WhatsApp**
> "Se eu ler isso pro dono da clínica no WhatsApp, ele entende de primeira ou pede pra explicar?"
> Se pedir pra explicar, **reescreve**.

## Estrutura do repositório

```
docs/
├── 01-estrategia/    posicionamento, ICP, produtos, diferenciais, glossário, narrativa
├── 02-arquitetura/   sitemap, SEO/keywords, padrões de página
├── 03-copy/          copy final por página (15 páginas)
├── 04-design/        notas do designer e diretrizes visuais
├── 05-analise/       análise crítica do briefing e pendências
├── assets/briefing/  imagens extraídas do briefing
└── _original/        briefing original (HTML do ClickUp) + texto extraído para busca

wireframe/            wireframe estrutural da home (HTML/CSS/JS puro)
```

## Fonte da verdade

O briefing original está preservado em
[`docs/_original/briefing-site-institucional-renke.html`](docs/_original/briefing-site-institucional-renke.html)
(export do ClickUp, 15/08/2026). Toda a documentação em `docs/` é derivada dele.

Para busca rápida no texto completo:

```bash
grep -n "termo" docs/_original/briefing-texto-extraido.txt
```
