# Wireframe — Home

Wireframe estrutural da home, montado com a **copy original do briefing** (sem as correções
sugeridas na [análise](../docs/05-analise/analise-do-briefing.md) — essas ficam para a v2).

## Como abrir

Abra `index.html` direto no navegador, ou sirva localmente:

```bash
cd wireframe && python3 -m http.server 8000
# http://localhost:8000
```

## O que é e o que não é

| É | Não é |
|---|---|
| Estrutura, hierarquia e ritmo de scroll | Design final |
| Navegação funcionando de verdade | Escolha de paleta ou tipografia |
| Copy real posicionada nos blocos | Página pronta para produção |

**O grayscale é intencional.** O manual de identidade da Renke ainda não foi fornecido e a paleta é
uma decisão em aberto — cor aqui só distrairia da discussão de estrutura. As caixas tracejadas
marcam onde entram imagens, GIFs e vídeos.

## Stack

HTML + CSS + JS puro, sem dependências. A stack do projeto ainda não foi decidida (ver
[pendências](../docs/05-analise/pendencias-e-proximos-passos.md), seção 4), então o wireframe não
compromete essa escolha — serve de referência estrutural para portar depois.

```
wireframe/
├── index.html
└── assets/
    ├── css/wireframe.css
    └── js/nav.js
```

## Anotações

O botão **"Ocultar anotações"** no topo alterna entre dois modos:

- **Com anotações** (padrão) — mostra os rótulos de seção, os avisos ⚠️ das pendências e as bordas
  tracejadas nos elementos em disputa. Modo de trabalho interno.
- **Sem anotações** — a estrutura limpa. Modo de apresentar ao cliente.

## Navegação

- **Desktop (≥900px)** — mega-menu abre no hover e no foco de teclado. Clique no gatilho mantém
  aberto (não alterna, senão o clique fecharia o menu que o hover acabou de abrir). Fecha com
  `Esc`, clique fora, ou ao abrir outro.
- **Mobile** — drawer lateral com submenus em acordeão; fecha com `Esc`, no overlay ou no X.
- Links apontam para `#` e registram a rota prevista no console (`data-rota`), já que as demais
  páginas não existem.

Estrutura de menu conforme a copy da home: Home · Para Clínicas · Para Agências · Outras Soluções ·
Tecnologia · Conteúdos · Contato · Faça Parte.

## Pontos marcados no wireframe

Estão sinalizados inline, no lugar exato onde aparecem:

| Seção | Ponto |
|---|---|
| Hero | `~30 clínicas` conflita com `+140` da Seção 7 (D1) |
| S2 | Notas do designer pedem 4 cards; a copy traz 5 — o 5º está tracejado (D9) |
| S2 | "primeira do mundo" vs. "no Brasil" em /faca-parte (D5) |
| S3 | Grid 2×2 tem 4 slots; a copy traz 7 perguntas — as 3 excedentes estão tracejadas (D8) |
| S4 | Números de resultado são placeholder (nota do próprio briefing) |
| S4 | Depoimentos não fornecidos |
| **S5** | **Copy inexistente** — bloco montado a partir do CTA das páginas de produto só para dimensionar |
| S8 | Destino do formulário não definido |
| Rodapé | Telefone não informado; "Sobre" e "Cases" fora do menu (D7) |
| Menu | Renke Connect como "em breve" vs. estratégia dizendo que já está ativo (D6) |
| Menu | Treinamento para secretárias com decisão de descontinuidade pendente (D3) |

Referência completa: [pendências e próximos passos](../docs/05-analise/pendencias-e-proximos-passos.md).

## Verificado

- Sem erros de console; sem overflow horizontal em 390px
- Menu testado em desktop e mobile (abrir, fechar, `Esc`, acordeão)
- Estados de foco visíveis, `aria-expanded`/`aria-controls` nos gatilhos, skip-link
- `prefers-reduced-motion` e estilos de impressão contemplados

## Versão de arquivo único

`index.html` depende de `assets/` ao lado — sozinho, abre sem estilo. Para mandar por
e-mail/WhatsApp ou abrir com duplo-clique sem servidor:

```bash
node wireframe/build-standalone.mjs
# → wireframe/wireframe-home-renke.html (~50 KB, autossuficiente)
```

O gerado não é versionado (`.gitignore`), para não divergir da fonte. Rode de novo depois de
qualquer alteração no wireframe.

---

## ⚠️ Esta pasta está congelada

A partir de 29/08/2026 o projeto roda em **Astro** (`src/`). Esta pasta permanece como registro do
wireframe original em HTML puro e **não recebe mais ajustes** — evita manter o mesmo layout em dois
lugares.

Ajustes de layout entram em `src/styles/wireframe.css` e nos componentes de `src/components/`.
Ver [`docs/02-arquitetura/stack.md`](../docs/02-arquitetura/stack.md).
