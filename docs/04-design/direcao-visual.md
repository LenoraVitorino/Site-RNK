# Direção visual

Base de design da home, a partir de duas referências.

**Página no ar:** https://claude.ai/code/artifact/8f514e60-a505-4d93-82f1-2288b5390063

---

## Referência 1 · quantumflux.framer.ai

Acessível. Analisei o HTML e o CSS gerados (5,7 MB) e extraí os padrões por frequência de uso —
não por impressão visual.

### O que os números mostram

| Padrão | Evidência |
|---|---|
| **Vidro = branco a 5%** | `rgba(255,255,255,0.05)` aparece **2.137 vezes**. É a superfície dominante do site inteiro. |
| **Blur baixo** | `backdrop-filter: blur(5px)` em 92 elementos; `blur(10px)` em apenas 4. Blur pesado borra o fundo e o cartão perde a leitura de "vidro sobre algo". |
| **Raio 20px** | 64 ocorrências, contra 14 de 30px e 12 de 40px. É o raio de card. |
| **Cadência de 0.25s** | `transition: color 0.25s ease` em **1.014** elementos. Uma única duração governa o site. |
| **Máscara de fade** | Vários `linear-gradient(90deg, #0000, #000 X%, #0000)` usados como máscara — é como as faixas de logo somem nas bordas em vez de cortar. |
| **Fundo escuro** | `#171717` e `#222426`, com um acento único e saturado (`#ff3a24`). |

### O que trouxe, e o que não

**Trouxe:** a fórmula do vidro (5% + blur 5px + borda a 12%), o raio de 20px, a cadência de 0.25s,
e a máscara de fade nas laterais.

**Não trouxe:** o acento vermelho e as três famílias tipográficas (Inter Display + Plus Jakarta +
JetBrains Mono). A Renke tem um acento só, e uma fonte só.

---

## Referência 2 · Dribbble

⚠️ **Não consegui acessar.** O Dribbble responde `202` com corpo vazio para requisição
automatizada — proteção anti-bot. Não vi a peça.

Como você descreveu "diagramação, cards em glass e acabamentos arredondados", trabalhei a partir
disso mais o que a referência do Framer sustenta com evidência. **Se você mandar um print da tela
cheia, eu extraio o resto** — proporções de grid, densidade e ritmo de seção.

### Prompt de direção, derivado da sua descrição

> Landing page de conversão em base escura, com cartões de vidro sobre fundo com manchas de cor
> difusas. Cantos generosamente arredondados (20px em cartão, pílula em botão). Hierarquia clara
> entre o bloco de destaque e os cartões de apoio. Espaçamento amplo entre seções, com o conteúdo
> respirando dentro de cada cartão. Acento único e saturado usado com parcimônia: em fundo de
> destaque, borda de foco e números, nunca em texto corrido.

---

## O que foi aplicado na home

### Vidro

Tokens em `tokens.css`: `--vidro-fundo` (branco 5%), `--vidro-borda` (12%), `--vidro-blur` (5px),
com variantes de hover a 8% e 22%. A classe `.vidro` está em 27 elementos.

Sobre fundo claro o vidro inverte para preto a 3,5% (`.vidro--claro`) — branco sobre branco não
existe.

`.vidro--realce` acrescenta um fio de luz na borda superior. Dá volume sem sombra pesada, que é o
que faz cartão escuro parecer sujo.

### Fundo dinâmico

`.fundo-vivo` coloca duas manchas radiais que respiram em ciclos de 22s e 28s, dessincronizados
para o movimento não parecer um pulso. Amarelo e amarelo escuro — a paleta não tem uma terceira
cor, e inventar uma quebraria a identidade.

Sobre seção clara as manchas recuam para 22% e 14% de opacidade: no valor cheio o texto perde
contraste.

Em três seções: hero, frase-âncora e CTA final.

### Faixa de logos

Os logos passaram de linha estática para faixa que corre, com máscara de fade nas laterais. Pausa
no hover. A lista é duplicada para o loop não ter emenda.

### Entrada por scroll

`.entra` em 26 blocos, revelados por `IntersectionObserver` — não por listener de scroll, que
dispara a cada pixel. Cada elemento é desobservado depois de aparecer.

### Foto

`.foto` entra com leve dessaturação e ganha cor no hover, com um véu escuro em baixo para o texto
sobreposto ter contraste. `.foto--marca` acrescenta uma lavagem amarela diagonal a 18%.

Ainda sem foto real — os slots estão em [inventario-de-midia.md](inventario-de-midia.md).

### Cantos

| Token | Valor | Onde |
|---|---|---|
| `--raio-card` | 20px | Cartões, slots de mídia, colunas |
| `--raio-card-sm` | 15px | Chips de logo, campos, callout |
| `--raio-botao` | pílula | Todas as variantes de botão |

---

## Acessibilidade e custo

**Movimento.** Tudo que anima respeita `prefers-reduced-motion`: as manchas param, a faixa para, a
foto não escala, e os blocos aparecem sem transição.

**Custo.** As manchas usam `transform` e `filter: blur()` em elemento isolado com `will-change`, o
que mantém a animação fora do layout. A faixa anima só `transform`. Nada anima propriedade que
force recálculo de layout.

**Contraste.** As manchas sobre seção clara foram reduzidas justamente para não comer contraste do
texto. Vale reconferir sempre que a opacidade mudar.

---

## O que falta

- Print do Dribbble, para extrair grid e densidade
- Fotos reais — sem elas o tratamento de imagem é só uma regra escrita
- Ícones dos 4 pilares, hoje caixas com rótulo
- Transição entre seções: hoje o corte é seco. A referência usa sobreposição de fundo
