# Página Sobre a Renke — especificação (28/09/2026)

## Emendas do orquestrador (prevalecem)

**ES1. equipe.jpg entra.** Conferida no navegador: é uma foto nova do salão (time trabalhando, faixa amarela da marca), não a foto de grupo desatualizada, que é `docs/assets/briefing/time-renke.png`. O trilho de S4 fica assim:
1. `cafe`, 3:2;
2. `equipe`, 3:2, com alt "Salão da sede com o time nas estações de trabalho e a faixa amarela da marca na parede.";
3. `casa-reuniao`, 4:5, reservado;
4. `casa-detalhe`, 4:5, reservado.
O slot `casa-time` deixa de existir.

**ES2. Dobras sólidas compartilhadas.** A fundação de tons das internas cria `.int-secao--papel` e `.int-secao--preto` em `paginas2.css`, com os tokens de tinta de cada tom (ver `docs/04-design/ritmo-dobras-internas.md`). O Sobre usa essas classes em S1, S2, S3 e S5, em vez de `sb-dobra--preto` e das cores próprias. Só o grafite de S4 (`sb-dobra--grafite`, #0e0e0e) é exclusivo desta página.

**ES3. Botão da home.** Quando /sobre existir, `OQueFaz.astro` passa a mostrar "Ver mais sobre a Renke", que já está programado ali. Não edite a home. A verificação confere se o botão ficou bem na composição e relata. A decisão fica com a Lenora.

**ES4. Regras contra travamento** para os agentes: imagens reduzidas antes do Read (≤1400px, no máximo 8), sem laços de espera nem Monitor, e um script Playwright por página, com timeout.

## 0. A ideia da página

A página funciona como um ensaio de livro de arquitetura, e não como uma página institucional. Os três parágrafos do Sobre viram capítulos, cada um com a sua dobra sólida, alternando papel e preto.

A cena 3D aparece só na abertura e no fecho. No meio, as dobras são opacas e a cena para sozinha, porque o fundo-motor.ts só roda enquanto `main > [data-cena]` está à vista.

| # | Seção | Fundo | Referência principal |
|---|---|---|---|
| S0 | Abertura | cena (`data-cena="hero"`) | VSIMDIM, pin 224 (nome gigante) |
| S1 | "Não somos agência de marketing." | papel `#e7e7e5` | folha que sobe (já existe no sistema) + Snøhetta |
| S2 | "Começamos com uma tese simples:" | preto `#000` | VSIMDIM (linha ativa) + Snøhetta (título preso) |
| S3 | "Em quatro anos, validamos essa tese…" | papel | Audo (zigue-zague desencontrado, parallax) |
| S4 | "Onde a mágica acontece" | grafite `#0e0e0e` | Apparatus (cartões de foto no escuro) |
| S5 | "No que acreditamos" | papel | Snøhetta (rótulo à esquerda, texto à direita) |
| S6 | Fecho | cena (`data-cena="formulario"`) | BlocoCtaFinal atual |

### As quatro referências e o que cada seção pega

1. **Snøhetta About** (https://www.snohetta.com/about): a grade de duas colunas, com o título pequeno preso à esquerda e o texto corrido à direita. Entra em S2 (coluna presa) e em S5.
2. **VSIMDIM, pin 224** (https://br.pinterest.com/pin/800022321353278571/): o nome gigante (S0) e a lista em que a linha ativa escurece enquanto as outras ficam cinza, com a imagem ao lado (S2).
3. **Audo Copenhagen About** (https://audocph.com/pages/about-audo): fotos de tamanhos diferentes, desencontradas na grade, com parallax leve e parágrafos curtos entre elas (S3).
4. **Apparatus About** (https://apparatusstudio.com/pages/about): a dobra preta sólida com cartões de foto em ritmo de catálogo (S4). A grade de fios de 1px não entra, porque "sem fios" continua valendo; a separação é feita por espaço.

### O que fica fora (menos é mais)

- **Jogo antigo × novo:** é rascunho, não copy aprovada.
- **Régua "GPTW · +140 · R$42M":** os conflitos D1 e D3 continuam em aberto.
- **Os três braços (Studio, Academy, Tools):** já estão na home.
- **GPTW e o texto completo dos valores:** já estão no /faca-parte.
- **Índice lateral (IndicePagina):** ele some sobre o papel, e com três dobras papel ficaria escondido metade do tempo.
- **Numerais de capítulo "01/02/03":** vetados (ver acima).
- **Entalhe na foto do VSIMDIM:** não fica estável entre 320 e 1920.

### Regras gerais

- **Amarelo:** um único ponto na página, o marcador de 6px `#FFD103` da linha ativa em S2. "Marcador do item ativo" está na lista fechada de usos permitidos. Fora dele, só o hover do `.botao` e a seleção de texto, que já existem.
- **Fotos:**
  - sempre em moldura de raio 12, com largura máxima de **820px CSS**;
  - `quality={78}`, webp, `widths={[640, 1280, 1760]}`;
  - `filter: saturate(.8)`, para o amarelo das paredes não dominar;
  - nunca em tela cheia.
- **Grade:** a do `.container` da home, com 12 colunas e `column-gap: var(--sb-gap)` = clamp(16px, 2vw, 32px).
  - Área útil: **1196px** em 1440, **913** em 1100, **638** em 768, **324** em 390 e **266** em 320.
  - Em 1440, 8 colunas somam cerca de 790px.

---

## (a) Estrutura, seção a seção

### Convenções

- Todo `<section>` é filho direto do `<main>`, com `class="secao int-secao …"`, um `id` e `aria-labelledby` apontando para o próprio título.
- Os blocos de texto levam `.entra`, a revelação da Base2 (16px→0 em .6s). Com movimento reduzido, nada se move, pela regra que já está no paginas2.css.
- O cabeçalho troca de tom sozinho sobre o papel, porque o Header.astro lê a cor de fundo da seção que está abaixo dele.
- Breakpoints: ≥1100, 900–1099.98, 600–899.98 e <600. A `.sb-grade` tem 12 colunas a partir de 900px, 6 colunas entre 600 e 899.98, e 4 colunas abaixo de 600.

### S0 · Abertura

**Arquivo e ancoragem:** `SobreAbertura.astro`, id `sobre-abertura`, `data-cena="hero"`.

**Tom:** capa de livro. Só o nome e uma frase sobre a cena, sem foto; a foto chega na dobra seguinte, atravessando a costura.

**Texto literal:**
- `p.rotulo` "Sobre" (docs/03-copy/home.md:191).
- `h1` "Sobre a Renke" (home.md:192), em duas linhas: `<span>Sobre a</span><span>Renke</span>`. É só quebra tipográfica.
- Lead: "A Renke é a primeira **assessoria de Revenue Operations** para clínicas médicas e odontológicas de alto padrão do mundo." (home.md:194; briefing-texto-extraido.txt:947).
  - O `<strong>` segue a direção do briefing (:1038-1041).
- ⚠ D5, "do mundo" × "no Brasil": fica o texto da home até a Lenora decidir. A frase fica num único campo de `sobre.ts`.

**Composição:**
- Altura mínima `min(86svh, 900px)`, com o miolo alinhado embaixo (flex-end).
- `padding-top: calc(var(--altura-header) + 64px)`.
- `padding-bottom: calc(var(--esp-secao) + var(--sb-sobe))`, com `--sb-sobe: clamp(72px, 11vw, 176px)`. É a reserva de espaço para a foto de S1 subir.
- H1:
  - `clamp(56px, 10vw, 168px)`, peso 250, `line-height .92`, `-.055em`, `word-spacing -.08em`;
  - linha 1 em `var(--cinza)` e linha 2 em papel (o tom duplo da emenda E6);
  - colunas 1–7.
- Lead:
  - colunas 8–12, `align-self: end`, `padding-bottom: .14em`, alinhado à base de "Renke";
  - `clamp(18px, 1.6vw, 22px)`, peso 300, `line-height 1.45`, cor `#bcbcbc`;
  - `strong` em 500 papel; largura máxima de 34ch.
- A máscara de leitura da cena protege `.sb-abertura__miolo`. A classe entra em TEXTOS_INTERNAS na fundação.

**Movimento:** o H1 e o lead entram como bloco (`.entra`, `--i` 0 e 1). Nada palavra a palavra.

**Responsivo:**

| Largura | Comportamento |
|---|---|
| 1440 | H1 em 144px e lead de ~470px à direita |
| 1100 | H1 em 110px e lead nas colunas 8–12 (~370px) |
| 768 | 6 colunas. H1 na largura toda (77px) e lead embaixo, com 34ch e margem de 32px. `min-height: auto` |
| 390 e 320 | H1 em 56px ("Sobre a" ocupa ~200px) e lead em 18px |

**Acessibilidade:** um único `h1` na página. O `#bcbcbc` sobre a cena mascarada dá contraste de 9:1 ou mais.

### S1 · O que somos

**Arquivo e ancoragem:** `SobreManifesto.astro`, id `sobre-somos`, papel, classes `secao int-secao int-secao--papel sb-somos`.

**Tom:** a primeira dobra clara sobe como uma folha, e a foto da operação atravessa a costura entre o escuro e o papel.

**Foto:** `operacao` (slot `abertura`).
- Proporção 16:10, `foco: '50% 45%'`.
- Colunas 5–12 em ≥1100 (~790px, com max-width 820 e `justify-self: end`); colunas 4–12 entre 900 e 1099.98.
- `margin-top: calc(-1 * (var(--esp-secao) + var(--sb-sobe)))`: a foto sobe `--sb-sobe` acima da costura. O `main > *` já tem z-index 1, e a seção de baixo pinta por cima da de cima.
- `loading="eager"` e `fetchpriority="high"`, porque deve ser o LCP.
- `data-paralaxe="18"`.

**Texto literal** (home.md:195-197):
- `h2` em tom duplo:
  - `<span>Não somos agência de marketing.</span>` em `#252523`;
  - `<span>Não somos consultoria de gestão.</span>` em `#5f5f5d` (contraste de 5,2:1);
  - `clamp(34px, 5.2vw, 76px)`, peso 280, `line-height 1.02`, `-.045em`;
  - colunas 1–10, `margin-top: clamp(56px, 8vw, 120px)`.
- `p.sb-somos__texto`: "Somos o time que conecta marketing, processo comercial e dados em um sistema único, operado de perto, com responsabilidade pelo resultado da última linha do nosso cliente."
  - Colunas 7–12, `margin-top: 40px` (desencontrado do título).
  - `clamp(18px, 1.5vw, 22px)`, peso 300, `line-height 1.5`, largura máxima de 40ch.

**Movimento:** a foto sobe com a rolagem nativa e tem parallax de ±18px dentro da moldura. O texto entra com `.entra`.

**Responsivo:**

| Largura | Comportamento |
|---|---|
| 1100 | H2 nas colunas 1–12 e parágrafo nas 6–12 |
| 768 | Foto nas colunas 1–6 (638px); texto empilhado |
| 390 e 320 | Foto em 3:2 na largura toda; `--sb-sobe` de 72px; H2 em 34px |

**Acessibilidade:** o foco sobre o papel é `#262624` (regra que já existe) e o alt da foto está na lista de microcopy.

### S2 · A tese

**Arquivo e ancoragem:** `SobreTese.astro`, id `sobre-tese`, classes `secao int-secao sb-dobra--preto sb-tese`, fundo `#000`, sem `data-cena`.

**Tom:** leitura lenta. O título fica preso à esquerda com a foto da parede de palavras. O parágrafo da tese vem destrinchado, e a linha que passa pelo centro da tela acende.

**Texto literal** (home.md:199-202; briefing:949):
- `h2.titulo`: "Começamos com uma tese simples:"
- Um único `p.sb-tese__texto` com cinco `span.sb-tese__linha` em `display: block`, sem mudar nenhuma letra:
  1. "o problema das clínicas que faturam bem mas não têm previsibilidade não é marketing." (a minúscula inicial é a continuação literal do título)
  2. "É o que acontece depois do lead."
  3. "Dados soltos, equipes desconectadas, decisões no feeling."
  4. "Nenhuma agência resolve isso porque isso não é um problema de marketing."
  5. "É um problema de negócio."

**Foto:** `sala-vidro` (slot `tese`), 4:5, `foco: '14% 50%'`.

**Composição a partir de 900px:**
- Coluna presa `.sb-tese__fixo`, nas colunas 1–5:
  - `position: sticky; top: var(--int-topo-fixo)`, só com `@media (min-width: 900px) and (min-height: 760px)`;
  - leva o H2 e, 32px abaixo, a foto 4:5 nas colunas 1–4 (~380px);
  - a foto tem `max-height: calc(100svh - var(--int-topo-fixo) - 220px)` e `object-fit: cover`.
- Linhas nas colunas 7–12:
  - `gap: clamp(40px, 9vh, 104px)`, `padding-block: 10vh`;
  - `clamp(22px, 2.3vw, 34px)`, peso 300, `line-height 1.25`, `-.025em`;
  - largura máxima de 26ch, `padding-left: 22px` para o marcador.

**Movimento** (script no próprio componente, sem listener de scroll):
- Um IntersectionObserver com `rootMargin: '-45% 0px -45% 0px'` marca `.ativa`; as linhas anteriores ganham `.lida`.
- Cores das linhas:
  - futura: `rgb(242 242 238 / .42)`, 3,6:1 (o texto grande pede 3:1);
  - lida: `/ .72`;
  - ativa: papel;
  - transição de cor em .8s, `cubic-bezier(.22,1,.36,1)`.
- Marcador: `::before` de 6×6px, redondo, `#FFD103`, `left 0; top .55em`, com opacidade 0→1 só na `.ativa`. É o único amarelo da página.
- Os tons esmaecidos só valem com `.sb-tese--viva`, classe que o script põe.
  - Sem JS ou com movimento reduzido: todas as linhas em papel e o marcador fixo na linha 5.
- A foto tem `data-paralaxe="14"`.

**Responsivo:**

| Largura | Comportamento |
|---|---|
| 1100 | Coluna presa nas 1–5 (foto de ~290px) e linhas nas 7–12 |
| <900 | Sem sticky. H2, depois as linhas (gap 28px), depois a foto em 3:2 na largura toda. A ativação continua valendo |
| Desktop com menos de 760px de altura | Sem sticky |

### S3 · A prova

**Arquivo e ancoragem:** `SobreProva.astro`, id `sobre-prova`, papel, classes `secao int-secao int-secao--papel sb-prova`.

**Tom:** página dupla de livro de mesa.

**Texto literal** (home.md:204-207; briefing:951):
- `h2`: "Em quatro anos, validamos essa tese em mais de <span>140 clínicas</span>."
  - A frase vai em `#5f5f5d` e o realce em `#252523`, no mesmo peso 300.
  - Escala do `.titulo`, colunas 1–8, largura máxima de 20ch.
- Três parágrafos:
  - **B:** "Construímos o Protocolo Revena, metodologia proprietária que estrutura a operação de receita do zero e a mantém funcionando no longo prazo."
  - **C:** "Desenvolvemos tecnologia própria para operacionalizar o método."
  - **D:** "E formamos especialistas que fazem isso, para saúde, todo santo dia."

**Fotos:**
- `estudio` (slot `prova`), 3:2, `foco: '50% 40%'`, `data-paralaxe="24"`.
- Slot `prova-detalhe`, 4:5, reservado (cartão de grão), `data-paralaxe="-16"`: sobe enquanto a outra desce.

**Composição em ≥1100:**
- **Linha B:** texto nas colunas 1–5, com margem superior de 48px; foto nas 7–12 (~590px), com `margin-top: clamp(0px, 6vw, 96px)`.
- **Linha C:** slot nas colunas 2–5 (~380px), com `margin-top: calc(-1 * clamp(0px, 8vw, 128px))`; texto nas 7–11, centralizado verticalmente.
- **Linha D:** colunas 4–11, `clamp(26px, 2.8vw, 40px)`, peso 280, `#252523`, `margin-top: clamp(64px, 8vw, 128px)`.
- B e C: `clamp(18px, 1.5vw, 21px)`, peso 300, `line-height 1.55`, largura máxima de 34ch.

**Responsivo:**

| Largura | Comportamento |
|---|---|
| 1100 | B: 1–6 / 7–12. C: 1–5 / 7–12. D: 2–12 |
| 768 | Foto de B embaixo (colunas 2–6), slot nas 1–4 com o texto embaixo, sem margens negativas |
| 390 e 320 | Pilha: foto em 3:2 na largura toda, slot 4:5 a 72% da largura (`justify-self: end`), parallax pela metade, D em 26px |

**Acessibilidade:** a ordem do DOM é a ordem de leitura (H2, B, foto, slot, C, D).

### S4 · A casa

**Arquivo e ancoragem:** `SobreCasa.astro`, id `sobre-casa`, classes `secao int-secao sb-dobra--grafite sb-casa`, fundo `#0e0e0e`.

**Tom:** o arquivo do estúdio. São os cartões para as fotos que vão chegar, numa fileira que sangra à direita, com rolagem horizontal nativa.

**Texto literal** (faca-parte.ts:55-57):
- `h2` "Onde a mágica acontece".
- `p` "Operamos de forma híbrida com o time, com base física pra quem quiser um café e um papo presencial."
- ⚠ Conflito com o "100% remoto" do contato.ts:66.
- Sem endereço: ele já está no rodapé.

**Cartões**, na ordem:
1. `cafe`, 3:2, `foco: '30% 50%'`;
2. `casa-reuniao`, 4:5, reservado;
3. `casa-detalhe`, 3:2, reservado;
4. `casa-time`, 4:5, reservado.

**Composição:**
- Cabeça em `.container .sb-grade`: H2 nas colunas 1–6, texto nas 1–5 (18px, `#bcbcbc`, 44ch), setas nas 11–12 (`justify-self: end; align-self: end`).
- `ul.sb-casa__trilho` fica **fora** do `.container`:
  - `width: 100%`, `padding-inline: var(--grid-inset)`, `scroll-padding-inline: var(--grid-inset)`;
  - `display: flex; align-items: flex-end; gap: clamp(12px, 1.6vw, 24px)`;
  - `overflow-x: auto; overscroll-behavior-x: contain`;
  - `scrollbar-width: thin; scrollbar-color: rgb(242 242 238 / .22) transparent`;
  - `margin-top: clamp(40px, 5vw, 72px)`.
- Tamanhos dos cartões:
  - 3:2: `clamp(280px, 44vw, 640px)`;
  - 4:5: `clamp(220px, 26vw, 380px)`, com `margin-bottom: clamp(24px, 4vw, 64px)` para desencontrar.
- `scroll-snap` fica **desligado** e só comentado no código: `scroll-snap-type: x proximity` e `scroll-snap-align: start`. O snap já foi vetado na página.

**Movimento:**
- Cartões com `.entra`, `--i` de 0 a 3.
- Hover (`@media (hover: hover)`): a imagem vai de `scale(1.04)` e `saturate(.8)` para `scale(1)` e `saturate(.95)`, em 1.2s, `cubic-bezier(.22,1,.36,1)`.
- Setas `button.sb-casa__seta`:
  - 44×44, vidro `rgb(242 242 238 / .07)`, raio 8;
  - ícone Lucide `ArrowRight` de 18px; o botão "anterior" usa o mesmo ícone com `rotate(180deg)`;
  - clique chama `scrollBy({ left: ±(largura do 1º cartão + gap), behavior: reduzido ? 'auto' : 'smooth' })`;
  - nas pontas: `aria-disabled="true"` e opacidade .35, atualizado por um listener `scroll` passivo com um único rAF;
  - com `(hover: none)`, as setas ficam ocultas.
- Sem autoplay, sem trava, sem arrastar por JS.

**Responsivo:**

| Largura | Comportamento |
|---|---|
| 1440 | Cabem ~1,8 cartões |
| 1100 | Cartões de 484 e 286px |
| 768 | 338 e 220px |
| 390 | 280 e 220px; o cartão seguinte aparece cortado |
| 320 | Cartão de 280px; passa da borda de propósito, dentro do trilho |

**Acessibilidade:**
- O trilho tem `role="region"`, `aria-label="Fotos da sede"`, `tabindex="0"` e contorno papel em `:focus-visible`.
- Estrutura em `ul`/`li`; cada cartão com foto é um `figure` com alt.
- Os placeholders levam `aria-hidden`.
- Os botões são `button type="button"` com `aria-controls` apontando para o trilho.

### S5 · Cultura

**Arquivo e ancoragem:** `SobreCultura.astro`, id `sobre-cultura`, papel, classes `secao int-secao int-secao--papel sb-cultura`.

**Tom:** colofão. Uma frase isolada e os valores como palavras, sem cartões.

**Texto literal** (faca-parte.ts):
- `p.rotulo` "#TEAMRENKE" (:34).
- `h2` "No que acreditamos" (:35).
- Frase: "Nossa filosofia não é um time que constrói a empresa. É uma empresa que constrói pessoas." É o recorte literal do começo do 2º parágrafo (:38).
- `ul` com os valores: Liberdade, Autorresponsabilidade, Conexão, Evolução (:43-51, só os títulos).
- Link "Faça Parte" → /faca-parte (rótulo do nav.ts).

**Composição a partir de 900px:**
- Rótulo e H2 nas colunas 1–3: `clamp(20px, 1.6vw, 24px)`, peso 350, `#252523`.
- Frase nas colunas 4–12:
  - `clamp(32px, 4.4vw, 64px)`, peso 280, `line-height 1.08`, `-.05em`, `word-spacing -.08em`;
  - largura máxima de 22ch; sem pílula e sem amarelo.
- Valores 48px abaixo: `flex-wrap`, gap de 12px por 32px, `clamp(20px, 2vw, 28px)`, peso 280, `#5f5f5d`.
- Link 40px abaixo: 16px, `#252523`, sublinhado com offset de 4px e o ícone `ArrowUpRight` de 16px.
- Slot `cultura` (retrato do time atual):
  - colunas 10–12, 4:5, e então a frase fica nas colunas 4–9;
  - **só aparece com foto** (`reservar: false`), porque retrato placeholder está vetado.

**Movimento:** `.entra` com `--i` de 0 a 2.

**Responsivo:**

| Largura | Comportamento |
|---|---|
| 768 | Rótulo e H2 em cima; frase em 44px |
| 390 e 320 | Frase em 32px; "Autorresponsabilidade" em 20px ocupa ~230px e cabe sem hifenizar |

**Acessibilidade:** `ul role="list"`.

### S6 · Fecho

**Arquivo e ancoragem:** o `BlocoCtaFinal` que já existe, com id `sobre-fecho` e `data-cena="formulario"`.
- H2 literal: "Antes de trocar de agência de novo, descubra o que é RevOps." (home.md:218). Tem 60 caracteres, então usa a escala normal.
- Botão "Fale com a gente" → /contato (nav.ts:62).
- É o único botão de conversão da tela, e a cena volta aqui.

---

## (b) Arquivos

### `src/pages/sobre.astro` (fundação)

```astro
---
import Base2 from '../layouts/Base2.astro';          // primeiro: a ordem do CSS depende disso
import FundoInterno from '../components/pagina/FundoInterno.astro';
import BlocoCtaFinal from '../components/pagina/BlocoCtaFinal.astro';
import type { ContextoSecao } from '../components/pagina/contexto';
import SobreAbertura from '../components/sobre/SobreAbertura.astro';
import SobreManifesto from '../components/sobre/SobreManifesto.astro';
import SobreTese from '../components/sobre/SobreTese.astro';
import SobreProva from '../components/sobre/SobreProva.astro';
import SobreCasa from '../components/sobre/SobreCasa.astro';
import SobreCultura from '../components/sobre/SobreCultura.astro';
import '../styles/paginas2.css';
import '../styles/sobre.css';
import { seo, fecho } from '../data/sobre';
const secaoFecho: ContextoSecao = { id: 'sobre-fecho', tituloId: 'sobre-fecho-titulo', indice: 6,
  cena: 'formulario', junta: false, colaAbaixo: false, primeira: false };
---
<Base2 titulo={seo.titulo} descricao={seo.descricao} classe="home-refinada pg-sobre">
  <FundoInterno slot="fundo" />
  <SobreAbertura /><SobreManifesto /><SobreTese /><SobreProva /><SobreCasa /><SobreCultura />
  <BlocoCtaFinal bloco={fecho} secao={secaoFecho} />
</Base2>
<script>
  import { iniciarParalaxe } from '../components/sobre/paralaxe';
  iniciarParalaxe();
</script>
```

### `src/data/sobre.ts` (fundação)

Todo o texto da página, com a fonte comentada em cada campo, mais os slots de foto:

```ts
import type { ImageMetadata } from 'astro';
import operacao from '../assets/sede/operacao.jpg';
import salaVidro from '../assets/sede/sala-vidro.jpg';
import estudio from '../assets/sede/estudio.jpg';
import cafe from '../assets/sede/cafe.jpg';           // equipe.jpg fica de fora por ora
export type Proporcao = '16 / 10' | '3 / 2' | '4 / 5';
export interface SlotFoto {
  id: string; foto?: ImageMetadata; alt: string; foco?: string; proporcao: Proporcao;
  reservar: boolean;  // sem foto: true = cartão de grão em produção; false = não renderiza
  nota: string;       // só em import.meta.env.DEV
}
export const seo, abertura { rotulo, linhasH1, lead }, somos { h2: [l1, l2], texto },
  tese { h2, linhas[5] }, prova { h2: { antes, realce, depois }, frases[3] }, casa { h2, texto },
  cultura { rotulo, h2, frase, valores[4], link }, fecho (ctaFinal),
  fotos: Record<'abertura'|'tese'|'prova'|'provaDetalhe'|'cultura', SlotFoto>, casaCartoes: SlotFoto[4]
```

Para pôr uma foto nova: colocar o arquivo, com pelo menos 1760px de largura, em `src/assets/sede/`, importá-lo e preencher `foto` e `alt`. O layout não muda.

### `src/styles/sobre.css` (fundação)

- Tokens: `--sb-sobe`, `--sb-gap`, `--sb-tinta: #252523`, `--sb-tinta-2: #5f5f5d`, `--sb-preto: #000`, `--sb-grafite: #0e0e0e`, `--sb-raio-foto: 12px`, `--sb-escala: 1.06`.
- `.sb-grade`: 12, 6 e 4 colunas, conforme os breakpoints.
- `.sb-dobra--preto` e `.sb-dobra--grafite`.
- O papel reaproveita o `.int-secao--papel` que já existe.
- Se o pedido 1 criar classes de dobra sólida compartilhadas, trocar por elas.

### `src/components/sobre/CartaoFoto.astro` (fundação)

Props: `{ slot: SlotFoto; sizes: string; paralaxe?: number; tom?: 'escuro'|'claro'; eager?: boolean }`.

- **Com foto:**
  - estrutura: `figure.sb-foto[style="--prop"][data-paralaxe] > div.sb-foto__miolo > <Image>`;
  - o `<Image>` leva `format="webp"`, `quality={78}`, `widths={[640, 1280, 1760]}`, `loading` e `fetchpriority` conforme `eager`, e `object-position` vindo do `foco`.
- **Sem foto e com `reservar`:**
  - `figure.sb-foto--vazia` com `aria-hidden` e a mesma proporção;
  - fundo `#161616` (escuro) ou `#d6d6d3` (claro);
  - grão `var(--grao-fino)`: .22 em `soft-light` no escuro, .14 em `multiply` no claro;
  - clarão radial de 5%;
  - sem texto em produção; em DEV, a `nota` aparece em 11px.
- **Sem foto e sem `reservar`:** não renderiza nada.
- CSS:
  - `.sb-foto { width: 100%; max-width: 820px; aspect-ratio: var(--prop); border-radius: 12px; overflow: hidden; }`;
  - a imagem leva `object-fit: cover; filter: saturate(.8); transform: translate3d(0, var(--py, 0), 0) scale(var(--escala, 1))`;
  - com `[data-paralaxe]`, `--escala` vale 1.06.
- O componente pai dá a largura por um wrapper próprio, e o cartão ocupa 100% dele. Ninguém passa `class` para o componente filho.

### `src/components/sobre/paralaxe.ts` (fundação)

`iniciarParalaxe(seletor = '[data-paralaxe]')`:
- Sai com `prefers-reduced-motion` ou se não houver IntersectionObserver.
- Um IO com `rootMargin: '15% 0px'` mantém a lista de fotos visíveis.
- Um `scroll` passivo e um `resize` agendam um único rAF.
- O cálculo é `d = clamp((centro − innerHeight/2) / innerHeight, −1, 1)` e `--py = −d × amp`, com amplitude de até 24px, pela metade abaixo de 768.
- Sem `wheel`, sem `preventDefault`, sem biblioteca.

### Componentes das seções

Cada um com `<style>` scoped:
- `SobreAbertura.astro`
- `SobreManifesto.astro`
- `SobreTese.astro`, com o script da linha ativa
- `SobreProva.astro`
- `SobreCasa.astro`, com o script das setas
- `SobreCultura.astro`

Todos em `src/components/sobre/`.

### Arquivos já existentes que a fundação edita

- `src/data/nav.ts`: ver (d).
- `src/components/laboratorio/fundo-internas.ts`: acrescentar `'.sb-abertura__miolo'` ao fim de `TEXTOS_INTERNAS`. É aditivo.
- `docs/04-design/pagina-sobre.md` (novo): esta especificação, com a nota de que o /sobre quebra de propósito a regra "no máximo uma dobra clara por página", pelo pedido 1 de 28/09.

---

## (c) Divisão do trabalho

### F · Fundação (sequencial, antes de todos)

- Cria `sobre.ts`, `sobre.css`, `CartaoFoto.astro`, `paralaxe.ts`, `sobre.astro` e `docs/04-design/pagina-sobre.md`.
- Edita `nav.ts` e a linha do `fundo-internas.ts`.
- Cria também os **seis componentes como esqueletos válidos**: cada um com o `section`, as classes, o id e o título vindo dos dados.
- **Pronto quando:** o build passa e o /sobre abre na porta 4350 com as sete seções na ordem certa.

### Agentes paralelos (arquivos disjuntos)

Os quatro não editam `sobre.ts`, `sobre.css`, `CartaoFoto.astro` nem `paralaxe.ts`. Qualquer mudança nesses arquivos passa pelo orquestrador.

- **A · Abertura e costura:** `SobreAbertura.astro` e `SobreManifesto.astro`. Os dois dependem do `--sb-sobe`, por isso ficam juntos.
- **B · Tese:** `SobreTese.astro` (sticky, linha ativa e o ponto amarelo).
- **C · Papel editorial:** `SobreProva.astro` e `SobreCultura.astro`.
- **D · Casa:** `SobreCasa.astro` (trilho, setas e hover).

### V · Verificação (depois de A a D)

Roda o checklist (f) com Playwright e só relata o que encontrou, sem corrigir.

---

## (d) Menu, rodapé e home

- **Menu, `nav.ts:124`:**
  - trocar `{ rotulo: 'Sobre', rota: '/#o-que-fazemos' }` por `{ rotulo: 'Sobre', rota: '/sobre' }`;
  - vai no mesmo commit que o `sobre.astro`, porque o Header filtra os itens por `existe()`;
  - sem cartão de destaque com foto (foi retirado em 26/09).
- **Rodapé, `nav.ts` em `rodape.links`:** acrescentar `{ rotulo: 'Sobre', rota: '/sobre' }` entre "Conteúdos" e "Faça Parte". O Footer já filtra por `existe()`.
- **Home:** nenhuma edição. `OQueFaz.astro:30` já tem `existe('/sobre') && <Botao href="/sobre">Ver mais sobre a Renke</Botao>`, então o botão aparece sozinho quando a página existir. Avisar a Lenora de duas coisas:
  - vai surgir um botão novo na dobra "O que a Renke faz";
  - o rótulo não é literal da copy, que diz "Saiba Mais" (home.md:209).
  - Sugestão, só com a aprovação dela: `variante="texto"`.
- **Opcional, em outro PR:** links para /sobre a partir do /faca-parte e do /contato.

## (e) A cena

A cena fica **só na abertura (`hero`) e no fecho (`formulario`)**, via `FundoInterno`: o fundo estático embaixo e a cena no roteiro interno.
- As quatro dobras do meio são sólidas, sem `data-cena`. Nelas o laço da cena para, e a GPU descansa.
- Nenhuma mudança em `fundo-cena.ts`.

---

## Microcopy nova (precisa de aprovação; mantida no mínimo)

1. `<title>`: "Sobre a Renke | Renke Studio". É montagem de títulos existentes. A meta description é a 1ª frase do §1, literal.
2. Textos alternativos das fotos:
   - operacao: "Salão da sede da Renke, com o time nas estações de trabalho e o R amarelo na parede."
   - sala-vidro: "Sala de reunião com divisória de vidro e palavras em amarelo na parede."
   - estudio: "Parede amarela com o nome Renke em neon e a frase “Pense, elabore e surpreenda!”."
   - cafe: "Área do café da sede, com bancada e cadeiras amarelas."
3. Rótulos de acessibilidade (`aria-label`): "Fotos da sede", "Foto anterior", "Próxima foto".
4. A nota dos slots aparece só em DEV e não vai para produção.
5. O botão da home: "Ver mais sobre a Renke", que já está no código, contra "Saiba Mais", que é o literal da copy.

## Pendências para a Lenora

1. "Do mundo" ou "no Brasil" (D5).
2. "Híbrida" ou "100% remoto".
3. Liberar as quatro fotos da sede para o /sobre.
4. A `equipe.jpg`: o levantamento indica que é uma foto nova do salão, e não a foto de grupo desatualizada (essa é a `time-renke.png`). Se ela confirmar, a foto preenche o cartão `casa-time`.
5. Os 3 ou 4 cartões de grão em produção: manter ou esconder até as fotos chegarem (`reservar: false`).
6. O snap horizontal do trilho, que fica desligado.
7. A emenda na spec das internas: mais de uma dobra clara por página.

---

## (f) Checklist de verificação

### Build e conteúdo

1. `npm run build` e `npx astro check` sem erros; o /sobre responde 200 em 127.0.0.1:4350.
2. Todo o `innerText` das seções aparece literalmente em home.md, faca-parte.ts ou nav.ts. A única exceção é a lista de microcopy.
3. Um único `h1`, `aria-labelledby` válido em todas as seções e nenhum id duplicado.

### Visual

Playwright com `channel: "chrome"`, nos tamanhos 1440×900, 1100×800, 768×1024, 390×844 e 320×640.

4. Fundos na ordem cena → papel → preto → papel → grafite → papel → cena, conferidos pelo `backgroundColor` computado de cada seção.
5. Toda `.sb-foto` com largura de até 820px, também em 1920 e 2560.
6. Sem rolagem horizontal na página: `scrollWidth === innerWidth`.
7. Amarelo `rgb(255, 209, 3)` e `#FFE27A`, inclusive nos pseudo-elementos: só no `.sb-tese__linha.ativa::before`.
8. O cabeçalho fica em `header--claro` sobre S1, S3 e S5, e escuro sobre S2 e S4.
9. O topo da foto de S1 fica acima do fim de S0 (a foto atravessa a costura).
10. O sticky de S2 funciona em 1440×900 e em 1100×800, e fica desligado em 1100×700 e abaixo de 900px de largura.

### Movimento e regras

11. Nenhum `wheel` com `preventDefault`; `window.Lenis`, `window.gsap` e `html.has-scroll-smooth` indefinidos. O único sticky é `.sb-tese__fixo`.
12. Só uma linha `.ativa` por vez, a até ±10% do centro da tela.
13. `--py` nunca passa de 24px (12px abaixo de 768).
14. As setas rolam um cartão; no começo do trilho, a anterior fica `aria-disabled`; com toque e `(hover: none)`, as setas ficam ocultas.
15. Com `reducedMotion: 'reduce'`:
    - todos os `.entra` visíveis desde a primeira pintura;
    - sem `--py`;
    - todas as linhas de S2 em papel, com o marcador fixo na linha 5;
    - o canvas oculto.
16. Sem JavaScript: todo o texto visível e as linhas de S2 em papel.

### Acessibilidade

17. Contrastes:
    - `#5f5f5d` sobre o papel ≥ 4,5;
    - `#bcbcbc` sobre a cena ≥ 4,5;
    - linhas futuras de S2 ≥ 3.
18. Teclado:
    - o trilho recebe foco com contorno visível e rola pelas setas do teclado;
    - os botões são alcançáveis;
    - o link "Faça Parte" e o botão do fecho mostram o foco tanto no papel quanto no escuro.
19. Todos os `alt` preenchidos, placeholders com `aria-hidden` e listas com `role="list"`.

### Navegação e desempenho

20. Menu "A Renke → Sobre" leva ao /sobre; o rodapé mostra "Sobre" entre "Conteúdos" e "Faça Parte"; o botão da home aparece e leva ao /sobre.
21. O LCP é a foto de S1 ou o H1. O CLS fica abaixo de 0,05. O canvas não desenha quadros novos durante 2 s parado em S3.