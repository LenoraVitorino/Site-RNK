# Home v2 — estrutura de dobras e o que veio de cada referência

Data: 11/09/2026. Direção visual aprovada (base clara, grafite, amarelo
`#FFE27A`, Instrument Sans, caixa alta nos títulos) aplicada na home.
Código: `src/pages/index.astro` → `src/layouts/Base2.astro` +
`src/components/home2/*` + `src/styles/home2.css`.

## Referências analisadas

| Referência | O que foi extraído | Onde entrou |
|---|---|---|
| metodobr.com (base principal) | Página em trilhos verticais finos; título gigante em caixa alta que ocupa a primeira dobra sozinho; segunda dobra com fotos do escritório em colunas que se movem com o scroll; blocos numerados; linhas alternando foto/texto; seção escura de perguntas; CTA em painel de cor | Trilhos (`.trilhos`), palco do título, esteira de fotos, escada numerada, linhas dos protocolos, seção Perguntas, CTA final |
| infinitepay.io/conta | Vídeo vertical dentro de moldura de celular, com autoplay silencioso ao entrar na tela e pausa ao sair; no mobile a moldura some e o vídeo ocupa a largura | `Telefone.astro` (dobra "O que a Renke faz") |
| Prints Consul / Opsitive / Vestora | Cards sem sombra, borda de 1px, cantos retos, muito respiro; rótulos pequenos em caixa alta com tracking; números grandes em "extrato" | `.rotulo`, `.cartao`, `.ledger`, faixa de números |

## Dobras (ordem na página)

1. **Palco** (`Hero.astro`) — hero escura e centralizada, em três tempos
   presos por ~1,6 telas de scroll (progresso em `--p`, 0→1):
   ao carregar, "Isso não é marketing para clínicas." com a seta para
   baixo; no scroll, a frase é riscada e some e "Isso é RevOps." entra
   suave, no amarelo original, com um reflexo de luz que vai e volta
   (gradiente recortado no texto, `background-position` animada — o
   mesmo efeito do AnimatedText/framer-motion usado como referência, em
   CSS); depois ele sai e, no lugar, entram título, subtítulo e CTA.
   Sem JS ou com `prefers-reduced-motion`, tudo nasce no estado final e o
   reflexo não roda.
   No pé da hero, a barra "Doutores que confiam na Renke": a frase à
   esquerda, um fio vertical e o carrossel de logos (placeholders) tomando
   o resto da largura, como a barra "Trusted by…" da referência
   (16/09/2026: saíram o mapa pontilhado e o rótulo "Cases").
2. **O que a Renke faz** (`OQueFaz.astro` + `Telefone.astro`) — texto à
   esquerda e reel vertical à direita, nas duas versões. Autoplay mudo ao
   entrar na tela, pausa ao sair; botão de som e de pausa; pausa manual é
   lembrada. (O reel sozinho e o palco 16:9 foram testados e descartados.)
   Logo depois, na versão do estúdio, a faixa "Nossos números"
   (`NumerosFaixa.astro` + `ui/Numeros.astro`): os três números de ponta
   a ponta, em amarelo, com a legenda embaixo.
   (`Esteira.astro`, o trilho de fotos e depoimentos, está fora da página
   por ora: volta quando houver fotos, depoimentos e logos reais.
   `Sobre.astro` saiu da home em 16/09/2026; a copy segue para a página
   /sobre.)
3. **Protocolo Revena** (`Protocolos.astro`) — no desenho da referência
   "Metafore": cabeçalho (rótulo em pílula e título) e cinco cartões, um
   aberto por vez. Na versão do estúdio os cartões seguem sendo os cinco
   pilares, com o texto deles, e cada um ganha o plano que o entrega:
   ícone oficial do plano, etiqueta amarela com o nome, a frase do plano e
   o "Saiba mais" (cruzamento pilar → plano lido do briefing, a validar:
   tráfego pago → Core, CRM → Start, automação → Full, dados → Run,
   posicionamento → Scale). O H3 divisor da copy vira o apoio do título e
   a dobra separada dos planos sai. Na versão copy os cartões são só os
   pilares e a dobra dos planos segue depois. O aberto fica
   largo e mais alto, com uma imagem no topo (fundo fictício em
   `public/imagens/plano-fundo.svg` até chegarem as artes), ícone, título e
   texto; os fechados mostram só o número, o ícone e o título. Passar o
   mouse ou tocar abre. Grade fina ao fundo, esmaecendo. Ícones dos pilares
   provisórios (`public/icones/pilar-0N.svg`). No celular, cartões
   empilhados e abertos.
4. **Planos** (`Planos.astro`, só na versão copy) — como a dobra "Selected work" do trionn.com,
   medida na referência: um trilho preso na tela. Primeiro só o título,
   centrado na metade esquerda; a página rola e os planos entram pela
   direita, um a um (Start, Run, Scale, Core, Full), cada um com metade da
   tela, imagem em 670×460 no alto e ícone oficial, nome, fala, texto e
   "Saiba mais" embaixo; fecha com o convite "Fale com a equipe" centrado.
   No último trecho do curso, a dobra seguinte entra pela direita por cima
   desta (`.cortina` em volta das Perguntas; `--curso`, `--x`, `--fim` e
   `--sobe` calculados no scroll). No celular, sem JS ou com movimento
   reduzido, tudo fica empilhado e a próxima dobra segue em fluxo.
5. **Perguntas** (`Perguntas.astro`) — seção escura, 4 perguntas principais
   em grade 2×2 + 3 em linha. Entra pela cortina dos planos mostrando só a
   frase-âncora; no scroll seguinte a frase sobe e as perguntas aparecem.
6. **Resultados** (`Resultados.astro`) — extrato de ponta a ponta, no
   desenho da referência "Alphamark": uma linha por especialidade, com o
   número gigante em amarelo à esquerda e, na metade direita, a
   especialidade e o antes → depois; fios de uma borda à outra da tela
   (⚠️ D1). Os números carregam ao entrar na tela.
7. **CTA final** (`CtaFinal.astro`) — painel amarelo "Limitado a 1 nova
   clínica por mês" com dois slots de foto.
8. **Academy e Tools** (`AcademyTools.astro`) — dois cartões com slot de foto.
9. **Formulário** (`Formulario.astro`) — mesmo formulário da v1 (envio ainda
    não ligado).

## Preto absoluto (16/09/2026)

A página inteira é preta (`--fundo: #000`); os cinzas só criam camadas:
`--painel` (#0B0B0B) para faixas e o trilho dos planos, `--superficie`
(#111) para cartões e caixas. O papel (#F2F2EE) virou a cor do texto e do
botão principal (branco, grafite ao passar no amarelo). O amarelo segue só
nos detalhes: pílula, ícones, palavra destacada, o painel do CTA final (o
único bloco de cor, com texto grafite). Títulos na Inter em peso 260, mais
finos que light — sobre o preto o traço claro pede isso. Os ícones dos
planos usam a versão `-dark` e o fundo fictício dos cartões, a versão
`plano-fundo-escuro.svg`. A cortina das Perguntas ganhou um fio na borda
esquerda para a entrada ler sobre o preto.

Entre "O que a Renke faz" e o Protocolo Revena entra o **Letreiro**
(`Letreiro.astro`): as quatro palavras do Revena Full no briefing
(Controle, Automação, Processo, Experiência) em caixa alta, grandes,
separadas por um "+" fino, andando devagar, com o monograma apagado atrás
— como a faixa "Impact + Inspire + Innovate" da referência.

## Grid de ponta a ponta (16/09/2026)

Para tirar a cara de "feito com IA": o container passou de 1240px para
1760px, com gutter `clamp(20px, 4.5vw, 84px)`. O grid de linhas da
referência strativ.framer.ai (trilhos verticais, linha entre dobras e
quadradinhos nos cruzamentos) foi testado em 16/09/2026 e retirado no
mesmo dia: a página fica só no preto, sem fio entre as dobras. Sobram os
fios finos de antes do grid (`rgb(242 242 238 / .1–.12)`): barra da hero,
cima e baixo do letreiro e rodapé. A grade quadriculada da dobra
dos pilares também saiu. Os títulos de dobra subiram para
`clamp(2.3rem, 5vw, 4.8rem)`. A
hero continua centrada por decisão anterior; o resto ocupa a tela com um
respiro só nas laterais.

## Duas versões para a entrega (16/09/2026)

`src/data/versao.ts` lê `VERSAO` no build: `estudio` (padrão) é a leitura
do estúdio, com a dinâmica das dobras revista; `copy` é o site como a copy
foi entregue, dobra a dobra — **nada é cortado nem retirado ali**, nem
dobras inteiras (o Sobre, por exemplo, segue na versão copy). As duas usam a mesma copy literal; o que muda
é o que aparece e em que ordem. A entrega final compara as duas lado a
lado. Divergências até agora: o título
da hero (a mesma frase da copy enxugada para duas linhas: saem
"estratégico" e "médicas", nenhuma palavra nova) e a frase-âncora das
Perguntas (saem "Clinicamente," e "exatamente", e o fecho vira "Mas e com
a sua clínica?", decisão da Lenora para falar no nicho) e o lead da hero
(saem "você" e "quando os números caem"; "tudo conectado, tudo rastreado"
vira "tudo conectado e rastreado"). Cada nova divergência
entra como um `copyLiteral ? … : …` no componente.
`npm run artifact:copy` gera o arquivo único dessa versão em
`dist-artifact/site-copy.html`, publicado como um artifact separado.
A abertura da hero ficou mais ágil: 1,9 s até o RevOps, 1,5 s parado com
o reflexo passando uma vez, 1,4 s até a copy.

Tipografia: uma família só, a Inter variável (títulos em 260, corpo em
400, destaques em 500, falas em itálico). A Instrument Sans saiu.
Detalhes em fundo amarelo: pílula dos rótulos, número dos planos, painel
do botão da hero, painel do CTA final.

## Regras de acabamento (12/09/2026)

- **Amarelo original** (`--amarelo-marca` #FFD103, exposto como
  `--destaque`) só em detalhes que precisam chamar atenção: "Isso é
  RevOps." e seu reflexo, a seta da hero, o link "Fale com a gente", o
  hover do menu, os números e a palavra forte da seção Perguntas. As
  superfícies grandes continuam no amarelo pastel (`--amarelo`,
  `--amarelo-claro`).
- **Arredondamento mínimo**, no acabamento do símbolo "R": `--raio` 6px em
  botões, campos e chips; `--raio-caixa` 10px em cartões, slots de foto,
  painéis com borda (escada, extrato, perguntas, formulário, megamenu).
  Entre as dobras, tudo reto e sangrado, como na referência.

## Slots de imagem

`FotoSlot.astro` desenha um painel neutro com ícone de foto e um rótulo do
que deve entrar ali ("Foto · sede", "Foto · time"…). Na home há 17 slots.
Basta trocar o componente por `<img>` quando as fotos existirem — as
proporções já estão fixadas por `--prop`.

## O que ainda é da v1

As internas continuam em `Base.astro` + `site.css`/`pagina.css` (teste da
Helvetica). No arquivo único do artifact o CSS delas fica confinado às
rotas internas com `@scope`, para não pintar por cima da home; elas usam os
tokens novos e por isso aparecem numa mistura v1/v2 até migrarem.

## Verificação feita

- Sem overflow horizontal em 390, 768 e 1440.
- Um único `h1`; Instrument Sans 400/400i/500/600 carregadas.
- Vídeo: mp4 self-hosted, poster, `muted` + `playsinline`; autoplay via
  IntersectionObserver.
- Reveal (`.entra`) sem elementos presos no fim da página.
- Itens do menu sem página marcados como "em breve" (`nav--pendente`).

## Cabeçalho, hero e letreiro (17/09/2026)

O cabeçalho continua fixo e flutuante, mas sem caixa enquanto a primeira
dobra está na tela: `.header__inner` nasce transparente e a classe
`header--caixa` (ligada no `Header.astro` quando o fundo do primeiro filho
de `main` passa do cabeçalho) traz fundo, fio e sombra. Na versão do
estúdio a barra "Doutores que confiam na Renke" saiu da hero por enquanto
(fica na copy); a hero tem mínimo de 720px e espaços maiores entre os
blocos. O letreiro passou para Inter Light (300) em clamp(2.8rem, 7.4vw,
7.8rem). No extrato de resultados o texto vai à esquerda e o número à
direita a partir de 900px.

## Protocolo Revena no palco (17/09/2026, versão do estúdio)

`PlanosPalco.astro` substitui, na versão do estúdio, o par Protocolos +
Planos (que segue na copy). Referência: dobra "Financial solutions" de
tresmarescapital.com, lida pelo código do tema (cópia da Wayback Machine
de 06/2026): GSAP ScrollTrigger com scrub, `.sticky` de 100vh dentro de um
container de `count × 100vh`, `.anchors` no canto superior esquerdo com
`--active`, cada `.content` saindo com `y: -30%` + fade e entrando com
`clip-path: inset(100% 0 0 0) → inset(0)`, título com a linha 1 à
esquerda e a linha 2 à direita, e um SVG por item que se monta (IN) e se
desmonta (OUT) conforme o progresso. A nossa versão faz o mesmo sem
biblioteca: a dobra tem `n × 100svh`, o `.palcoplanos__fixo` fica preso,
e o script converte o progresso numa linha do tempo de `2n − 1` trechos
(segura, passa, segura…). Os ícones oficiais dos planos são lidos no build
e postos inline; cada `<rect>` vira uma peça que se afasta do centro,
gira e encolhe quando desmontada. Abaixo de 900px, sem JS ou com menos
movimento, vira uma pilha.
