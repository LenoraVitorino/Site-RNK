# Diretrizes visuais gerais

## Direcionamento do briefing

- **Paleta:** fugir do clichê healthcare (branco + teal). Preferir **tons quentes/neutros** que
  transmitam premium e confiança.
- **Tipografia:** moderna, limpa. **Sans-serif** para o corpo; pode usar **serif/display**
  pontualmente na frase-âncora.
- **Espaçamento generoso** entre seções.
- **Alternar fundos claros e escuros** para criar ritmo no scroll.
- **Fotos reais** (não stock genérico).
- **Mobile-first**, mas pensado para desktop primeiro no briefing.

## Cor de marca observada nos assets

As fotos do time e da sede em `../assets/briefing/` mostram a identidade atual da Renke:
**preto + amarelo** (camisetas, sinalização da sede). As notas do designer também mencionam
"destaque **amarelo** ou cor secundária" para o callout do hero.

→ Isso é consistente com a diretriz de "tons quentes" e de fuga do teal healthcare.
**Confirmar com o time de marca** se o amarelo é a cor primária oficial e obter o manual de
identidade (hex, tipografia oficial, uso do logo).

## Ritmo de scroll (pattern interrupt)

O briefing pede alternância de formato a cada scroll:

```
texto → número → imagem → depoimento → pergunta
```

E alternância de fundo:

| Seção | Fundo sugerido |
|---|---|
| Hero | Claro |
| O que fazemos | Claro |
| Frase-âncora + perguntas | **Escuro** |
| Resultados | Claro |
| CTA final | **Escuro** |
| Academy + Tools | Claro (visual mais leve) |
| Sobre | Neutro/alternado |
| Formulário | Claro, com card destacado |
| Rodapé | **Escuro** |

## Elementos visuais recorrentes

| Elemento | Uso |
|---|---|
| **Strikethrough** na H1 | Marca a negação ("~~marketing para clínicas~~") |
| **Callout amarelo** | Subheadline do hero |
| **Números grandes em cor primária** | Seção de resultados, blocos de prova |
| **Cards de protocolo** com label de produto em destaque | Escada de maturidade |
| **Timeline horizontal** (ETAPA N + duração) | Páginas de produto |
| **Tabela Antes/Depois** | Home, Start, Agendamento 10x |
| **Blocos alternados texto/imagem** | "O que resolve na prática" |
| **Tooltip no hover** dos logos de clientes | Nome + especialidade |

## Diagrama-chave a produzir

Visual do posicionamento (briefing pede explicitamente):

```
Agência →  Anúncio → Lead → ❌ (aqui ela para)
Renke   →  Anúncio → Lead → Atendimento → Agendamento → Comparecimento → Venda → Retorno → 💰
```

E a **metáfora do corpo humano** (veias/coração) — descrita como "melhor recurso de comunicação pra
clínicas". Precisa de tratamento visual próprio.

## Requisitos de imagem

- **Fotos reais** dos clientes, do time e da sede. Sem stock.
- Prints de produto (CRM, dashboards, relatórios, automações de WhatsApp) — **com blur** nos dados
  sensíveis de cliente.
- Logos de clientes: opacidade reduzida, em linha, com tooltip.
- ⚠️ Fotos do time e da sede no briefing estão **desatualizadas** — ver
  [`faca-parte.md`](../03-copy/faca-parte.md).

## Requisitos técnicos que afetam o design

Do [SEO](../02-arquitetura/seo-e-keywords.md):
- **LCP < 2,5s** → o hero não pode depender de vídeo pesado ou GIF grande sem otimização.
  Preferir vídeo `.mp4`/`.webm` com poster, ou motion leve.
- **CLS baixo** → reservar dimensões de imagens e do banner de callout.
- **Mobile-first** → o grid 2×2 de perguntas e a timeline horizontal de etapas precisam de
  comportamento definido em mobile (stack vertical / scroll horizontal).
- Parágrafos de **3–4 linhas máximo**, frases curtas.

## Referências citadas no briefing

- Apresentação de pilares (hero GIF):
  [Google Slides](https://docs.google.com/presentation/d/1bCJM1HB2sq-15Wrqq1z5OLAlHH_a-x8nwBO4NuUUQGY/edit?usp=sharing)
- Narrativa institucional: referência **Society / Tay Dantas** (estrutura "jogo antigo vs. jogo novo")
- Copy final da home hospedada no ClickUp
  ([doc "Private"](https://app.clickup.com/36711476/docs/130b1m-208951/130b1m-1138451))


---

# Sistema tipográfico (decidido em 29/08/2026)

**Fonte: Open Sans**, em dois pesos apenas.

| Papel | Peso | Onde |
|---|---|---|
| **Títulos** | **600** (semibold) | h1–h4, rótulos, botões, números, `<strong>` |
| **Texto corrido** | **400** (regular) | parágrafos, listas, campos de formulário |

Nada acima de 600. Antes havia 700 e 800 espalhados pelo CSS, o que criava três níveis de ênfase
sem critério.

## Carregamento

Self-hosted via `@fontsource/open-sans`, importada em `src/layouts/Base.astro`. **Não usar o CDN do
Google Fonts:** um terceiro no caminho crítico briga com o `LCP < 2,5s` que o briefing exige.
Só as variantes usadas entram no bundle — latin 400, 400-italic e 600.

## Escala modular

Razão ~1.25, fluida onde o tamanho muda de papel. Tokens em `src/styles/wireframe.css`:

| Token | Tamanho | Uso |
|---|---|---|
| `--fs-xs` | 12px | rótulos, eyebrows, notas |
| `--fs-sm` | 14px | texto de card, botões, apoio |
| `--fs-base` | 16px | corpo |
| `--fs-md` | 17px | lead do hero |
| `--fs-lg` | 18–21px | h4 |
| `--fs-xl` | 22–28px | h3, divisores |
| `--fs-2xl` | 26–38px | h2, frase-âncora |
| `--fs-3xl` | 32–56px | h1, statement |

Entrelinha: `--lh-tight` 1.15 para títulos, `--lh-snug` 1.35 para subtítulos, `--lh-corpo` 1.65
para texto corrido.

## Medida de leitura

Texto corrido não passa de `--medida` (68ch), mesmo dentro do container de 1160px. Sem isso, os
parágrafos das seções largas passavam de 100 caracteres por linha.

## Espaçamento

Escala de 4px (`--s-1` a `--s-8`) substituindo as margens ad-hoc. `--space` continua governando o
respiro entre seções.

## Alvos de toque

`--alvo: 44px` aplicado a botões, campos de formulário, itens do menu mobile e ao botão hambúrguer.
No desktop o mega-menu pode ser mais denso, porque o alvo é o cursor.
