# Paleta de marca

Extraída do site atual — `renkestudio.com.br`, WordPress + Elementor (kit-7), em 30/08/2026.

## A paleta

| Cor | Hex | Papel | Evidência |
|---|---|---|---|
| 🟡 **Amarelo Renke** | `#FFD103` | Primária | 57 ocorrências no HTML, global do Elementor, camisetas do time e sinalização da sede |
| | `#FFD101` · `#FFC700` | Variações | globais do Elementor |
| | `#B79500` | Amarelo escurecido | 12 ocorrências — estados sobre fundo claro |
| ⬛ **Preto** | `#000000` · `#080808` | Fundo | `--e-global-color-secondary` |
| ⬛ **Carvão** | `#1E2329` | Superfície escura | global do Elementor |
| | `#272727` | Cinza escuro | 6 ocorrências |
| ⬜ **Branco** | `#FFFFFF` | Texto sobre escuro | `--e-global-color-text` |
| | `#585858` · `#333333` | Cinzas médios | |
| 🔴 | `#FF0202` | Vermelho | global do Elementor — usar com parcimônia |

## ⚠️ O que NÃO é cor de marca

O kit do Elementor também traz `#61CE70` (verde) e `#6EC1E4` (azul claro). **São os padrões de
fábrica do Elementor** — vêm assim na instalação e nunca foram customizados. O time criou cores
próprias (as de nome com hash) e deixou `primary` e `accent` intocados.

Pelo mesmo motivo, ignore `#ff6900`, `#fcb900`, `#f78da7`, `#cf2e2e`, `#abb8c3` e `#9b51e0` — é a
paleta padrão do editor de blocos do WordPress.

Confundir esses valores com identidade seria colocar verde e azul num site que é preto e amarelo.

## 🔴 Regra de contraste — o amarelo não é cor de texto

`#FFD103` tem luminância altíssima. Contra branco dá **~1,5:1** — ilegível, e reprova em qualquer
critério de acessibilidade.

| Combinação | Contraste | Veredito |
|---|---|---|
| Amarelo sobre branco | 1,5:1 | ❌ nunca |
| Preto sobre amarelo | 14:1 | ✅ ideal |
| Amarelo sobre carvão `#1E2329` | 9,8:1 | ✅ ideal |

**Como usar:** o amarelo entra como **fundo com texto preto**, como **acento sobre superfície
escura**, ou como **marca-texto / sublinhado** atrás de conteúdo escuro. Nunca como cor de texto
sobre claro.

## Onde está aplicado no wireframe

| Elemento | Uso |
|---|---|
| Callout do hero | Fundo amarelo, texto preto — atende "destaque amarelo" das notas do designer |
| "É RevOps" na H1 | Sublinhado amarelo sob o texto escuro |
| Labels dos protocolos | Fundo amarelo, texto preto — marca a escada de maturidade |
| Números de resultado | Marca-texto em amarelo suave; o número segue escuro e legível |
| Botão sobre fundo escuro | Amarelo com texto preto |
| Hover dos botões claros | Passa a amarelo |
| Fecho da frase-âncora | Amarelo sobre carvão |
| Rodapé e header fixo | Fio amarelo de 2–3px |

Contraste medido em todos esses pares: **acima de 10:1**.

## Neutros

Deslocados levemente para o quente, como pede o briefing ("fugir do clichê healthcare de branco +
teal, preferir tons quentes e neutros"). O carvão `#1E2329` do kit atual virou a superfície escura
das seções.

## Anotações do wireframe

Passaram de âmbar para **azul frio** (`#1d4ed8`). Com o amarelo virando cor de marca, a anotação
precisava ler como andaime, não como parte do design.

## Tipografia no site atual

O kit do Elementor declara `Roboto` e `Roboto Slab` — mas esses também são **padrões de fábrica**.
A Open Sans está de fato carregada na página, aplicada por widget. A fonte oficial confirmada pelo
time é **Open Sans**, que é o que o projeto usa.
