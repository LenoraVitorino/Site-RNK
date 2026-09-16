# Design System — guia inicial

Base para trabalhar o layout. Não é extração do site atual: dele vieram só **cor, logo e a
confirmação da fonte**. Forma, ritmo e componentes são novos.

**Página viva:** https://claude.ai/code/artifact/cc282afc-78f7-46d7-a9c4-a91b1fae4843
**No repositório:** `/design-system` (`npm run dev` → http://localhost:4321/design-system)

| Onde | O quê |
|---|---|
| [`src/styles/tokens.css`](../../src/styles/tokens.css) | Cor, tipografia, espaçamento, forma, movimento |
| [`src/styles/botao.css`](../../src/styles/botao.css) | Botão e variantes |
| [`src/components/ui/Botao.astro`](../../src/components/ui/Botao.astro) | Componente |
| [`src/pages/design-system.astro`](../../src/pages/design-system.astro) | Página viva |

---

## Marca

Monograma **R** em amarelo e assinatura em branco com acento amarelo, extraídos do site atual.
Em `public/marca/`.

⚠️ **Estão em PNG.** Para o site novo precisamos de **SVG**, nas versões positiva, negativa e
monocromática. Também falta confirmar se o monograma amarelo é a marca oficial ou uma aplicação.

## Cor

Detalhe completo em [paleta-de-marca.md](paleta-de-marca.md). O resumo operacional:

| Token | Hex | Papel |
|---|---|---|
| `--marca` | `#FFD103` | Primária |
| `--marca-escura` | `#B79500` | Estados sobre claro |
| `--marca-suave` | `#FFF4C7` | Marca-texto, lavagens |
| `--dark` | `#14161A` | Superfície escura, sólidos |
| `--dark-soft` | `#1E2329` | Seções escuras |
| `--text` | `#1F2226` | Corpo e títulos |
| `--muted` | `#6F7176` | Apoio |
| `--bg` / `--bg-alt` | `#FFFFFF` / `#FAF9F7` | Superfícies |
| `--line` | `#DEDBD6` | Bordas |

**A regra que governa tudo:** o amarelo não é cor de texto. Sobre branco dá 1,5:1 — ilegível.
Ele entra como fundo com texto preto (14:1), acento sobre escuro (9,8:1), ou marca-texto.

## Tipografia

**Open Sans**, 600 para títulos e 400 para texto corrido. Self-hosted.

Escala modular ~1.25 em `--fs-xs` a `--fs-3xl`. Entrelinhas separadas por papel: `--lh-tight` 1.15
títulos, `--lh-snug` 1.35 subtítulos, `--lh-corpo` 1.65 corpo. Texto corrido limitado a `--medida`
(68ch).

## Espaçamento

Escala de 4px, `--s-1` (4px) a `--s-8` (64px). `--space` governa o respiro entre seções.
Nenhum componente declara margem literal.

## Forma e movimento

| Token | Valor | Uso |
|---|---|---|
| `--raio-sutil` | 2px | Cards, campos |
| `--raio-medio` | 8px | Blocos maiores |
| `--raio-pilula` | 999px | Forma de pílula |
| `--raio-botao` | = pílula | **Todas** as variantes de botão |
| `--elev-1/2/3` | sombras | Repouso, hover, sobreposição |
| `--dur-rapida` | 150ms | Hover, foco |
| `--dur-media` | 300ms | Transições de estado |
| `--dur-lenta` | 800ms | Movimento expressivo |
| `--easing` | `cubic-bezier(.25,1,.5,1)` | Padrão |

---

## Botões

Nove variantes, uma hierarquia. Três disputam o papel de conversão — só uma entra por página.

### `brilho` — CTA de conversão

Borda cônica animada em amarelo sobre preto, pontilhado sutil e halo que pulsa no hover.
Adaptado da referência enviada: o azul deu lugar ao amarelo da marca, a tipografia passou a ser a
do sistema, e a animação respeita `prefers-reduced-motion`.

> **Regra: um por página.** A animação roda continuamente — cada instância custa repaint. E se
> tudo brilha, nada brilha. Use no ponto principal de conversão; as repetições usam `solido`.

Sob `prefers-reduced-motion` vira sólido com contorno amarelo: mantém presença, sem movimento.

Em navegador sem suporte a `@property` a borda não anima, mas o botão continua legível — preto,
texto branco, contorno.

### `metal-ouro` — CTA de conversão

Metálico com a rampa no amarelo da marca. Três camadas: borda em gradiente, miolo e superfície,
cada uma reagindo a hover e clique.

A referência controlava pressionado/hover com estado em React. Aqui é CSS puro — `:active`,
`:hover` e `:has()` dão o mesmo resultado sem JavaScript, e sem custo de hidratação.

**Sem animação contínua**: custo zero em repouso. Contraste do texto sobre a parte mais escura da
rampa: 5,8:1, passa em AA.

Existe também `metal` (neutro, cinza). Outros tons se criam repetindo o padrão de três gradientes
em `botao.css`.

### `vidro` — CTA de conversão, com ressalva

Distorce o que está atrás. **Só faz sentido sobre foto ou gradiente** — em superfície chapada
quase não aparece.

⚠️ **Duas limitações reais:**

1. O efeito depende de `backdrop-filter: url(#renke-vidro)`, que **só Chrome e Edge suportam**.
   Firefox e Safari caem no fallback declarado — blur simples com translucidez, que continua
   legível mas perde a distorção. O `@supports` garante que ninguém veja um botão quebrado.
2. O contraste do texto **varia com o que está atrás**. Use só sobre áreas escuras o bastante, e
   confira caso a caso.

Requer `<FiltroVidro />` incluído uma vez na página — o filtro SVG mora nele.

### `relevo` — destaque repetível

Gradiente de baixo para cima, borda inferior mais grossa, anel interno claro e brilho no hover.
Sem animação. É a variante para CTAs de destaque que aparecem várias vezes.

### As de uso corrente

| Variante | Quando |
|---|---|
| `solido` | Padrão. CTAs repetidos a cada 2–3 scrolls |
| `contorno` | Ação secundária sobre fundo claro |
| `claro` | Sobre fundo escuro — amarelo com texto preto |
| `texto` | Terciária, tom leve. O "Saiba mais" dos cards de protocolo |

Tamanhos: `sm` (32px), `md` (44px, padrão) e `lg` (52px).

### Forma

Todas as variantes são **pílula**, governadas por `--raio-botao`. Um token só: mudar ali muda as
nove de uma vez, sem caçar valor solto por arquivo. A única exceção é `texto`, que não tem
superfície — só o anel de foco recebe raio.

### 🔴 As três de conversão não convivem

`brilho`, `metal-ouro` e `vidro` competem pelo mesmo papel. Escolher duas na mesma página dilui as
duas. Uma por página, no ponto principal de conversão — o resto usa `relevo` ou `solido`.

Em custo: `brilho` é o único com animação contínua, então é o que mais pesa. `metal` e `relevo`
custam zero em repouso. `vidro` custa `backdrop-filter`, que é caro em área grande mas irrelevante
num botão.

### Uso

```astro
---
import Botao from '../components/ui/Botao.astro';
---
<Botao variante="brilho" href="/contato">Descubra se faz sentido para sua clínica</Botao>
<Botao variante="metal-ouro" tamanho="lg">Agendar diagnóstico</Botao>
<Botao variante="relevo">Fale com a equipe</Botao>
<Botao variante="texto" href="/studio/revena-start">Saiba mais →</Botao>
```

A variante `vidro` precisa do filtro SVG na página:

```astro
---
import FiltroVidro from '../components/ui/FiltroVidro.astro';
---
<Botao variante="vidro">Converse com a equipe</Botao>
<FiltroVidro />
```

---

## O que ainda falta

- **Logo em SVG** — positiva, negativa, monocromática
- **Ícones** — definir biblioteca ou desenhar o set. O briefing pede link/conexão, database,
  raio/automação e gráfico de barras
- **Tratamento de foto** — enquadramento, cor, como o amarelo se comporta sobre imagem
- **Motion além do CTA** — entrada de seção, hover de card, e o fluxo do dado no hero
- **Componentes ainda não sistematizados** — card, campo de formulário, chip, navegação. Hoje
  vivem em `wireframe.css`; migram para o design system conforme forem estabilizando

## Migração da home

A home usava uma classe `.btn` própria, anterior ao design system. Foi migrada para o componente
`Botao` e a classe antiga saiu do `wireframe.css` — assim os dois não divergem quando o sistema
mudar. Distribuição atual:

| Onde | Variante |
|---|---|
| Hero | `brilho` — o CTA principal da página |
| Resultados | `relevo` — repetição do mesmo CTA |
| CTA final | `claro` (lg) — sobre fundo escuro |
| Sobre | `contorno` — ação secundária |
| Formulário | `relevo` em bloco |


---

## Navegação

Header fixo em vidro escuro, 84px de altura, com a assinatura da Renke à esquerda.

### Pílula deslizante

Ao passar o mouse (ou dar foco por teclado) num item, uma pílula translúcida se move até ele.
Não há um fundo por item aparecendo e sumindo: é **um único elemento** que muda de posição — o
mesmo princípio do `layoutId` do framer-motion.

Anima apenas `transform` e `width`, então o navegador resolve na composição, sem recalcular layout.

Funciona também no **foco de teclado**, não só no hover — a referência original cobria só o mouse.

### Sobre a referência em React

A referência enviada era React + Tailwind + framer-motion + shadcn. **Não foi instalada.**

| | Custo |
|---|---|
| React + ReactDOM | ~45 KB gzip |
| framer-motion | ~50 KB gzip |
| **Total** | **~95 KB de JavaScript** |

O site é Astro com zero JS de framework, e é essa escolha que sustenta o `LCP < 2,5s` do briefing.
Trazer 95 KB para um efeito de menu inverteria a premissa da stack.

O efeito foi portado em **~25 linhas** de CSS e JS nativo, sem dependência nova. O que veio da
referência: a pílula compartilhada, o `border-radius` de pílula, o fundo translúcido a ~9%, a seta
que gira, e o painel com cantos arredondados.

O que não veio: os ícones por item de submenu (`lucide-react`) e a coluna de descrição. Nosso
mega-menu é de navegação, não de vitrine de produto — as descrições vivem nas páginas.
