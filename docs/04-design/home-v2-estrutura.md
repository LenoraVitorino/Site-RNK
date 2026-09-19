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
biblioteca: a dobra tem `(n − 1) × 85svh + 100svh`, o `.palcoplanos__fixo`
fica preso, e o script divide o curso em `n − 1` trechos iguais: nos
primeiros 30% de cada trecho o plano segura (ícone e nome flutuam com o
scroll, e uma barra fina ao lado da lista enche com o progresso, para a
página nunca parecer travada) e nos 70% restantes passa para o próximo. Os ícones oficiais dos planos são lidos no build
e postos inline; cada `<rect>` vira uma peça que se afasta do centro,
gira e encolhe quando desmontada. Abaixo de 900px, sem JS ou com menos
movimento, vira uma pilha. Fundo no claro do design system (`--papel`),
texto grafite, ícone todo amarelo e opaco. Curso de `n × 100svh`, 20% de
cada trecho segurando e 80% passando. Coreografia por plano no
frontmatter (`coreografia`: vetores de entrada e saída de cada metade, em
unidades do viewBox) e snap: 140 ms depois da última rolagem, se a dobra
está presa, a página desliza até o plano mais próximo em 700 ms
(`deslizaAte`, cancelado por qualquer gesto ou por rolagem externa).

## Trava da hero só com a hero na tela (17/09/2026)

A cena da hero é disparada pelo primeiro gesto de rolar e, até terminar,
bloqueia a roda (`preventDefault`). Isso valia mesmo com a página já no
meio (barra de rolagem, âncora), e a primeira rolada ficava presa por 5 s
sem nada na tela: a sensação de "site travado". Agora, com `scrollY > 8`
a cena é dada como vista e a roda passa livre, em qualquer versão.

## Palco dos planos em dobras inteiras (18/09/2026)

Reestruturado como a referência: `.palcoplanos__intro` (pílula, título,
apoio) antes do trilho; `.palcoplanos__trilho` com `n × 100svh` e o
`.palcoplanos__fixo` preso; cada `.plano-palco` é `position: absolute;
inset: 0` com fundo próprio (`--pp-fundo` e `--pp-fundo-2` alternados;
slot das fotos), e o `clip-path: inset(top)` da entrada corta a dobra
inteira, fundo incluído, enquanto o `.plano-palco__miolo` sobe até o
lugar. A dobra que sai perde opacidade e o miolo sobe. A que entra fica
com `z-index` acima da que sai. As âncoras (`.palcoplanos__ancoras`) ficam
por cima de tudo, no canto superior esquerdo.

## Transição lida do vídeo (18/09/2026)

Quadros do "Tela ref renke.mov" (Drive, 34 s, 2 fps): (1) o
`.palcoplanos__fixo` tem base escura (`--grafite`); (2) a dobra que sai
faz `opacity: 1 → 0` linear ao longo da passagem, revelando a base, e o
miolo sobe 24%; (3) a dobra que entra é cortada por `clip-path:
inset(top)` de 100% a 0 e o miolo sobe de 18% a 0; (4) os ícones ficam em
`.palcoplanos__icones` (absolute, z 4, centrado), por cima das dobras: as
metades do que sai se recolhem ao centro (`translate(-cx, -cy)` +
`scale(.38)`) e somem a 70% da passagem; as do que entra chegam pela
coreografia a partir de 28% da entrada; (5) o nome aparece só no último
quarto. Na pilha do celular cada dobra mostra o `-light.svg` estático.

## Regra de publicação (18/09/2026)

A cada publicação saem juntos: o artifact do estúdio, o artifact da
copy (`npm run artifact:copy`) e o link público (deploy temporário na
Cloudflare a partir de `dist-publico`, uma cópia do `dist` com o vídeo
leve no lugar do completo). O deploy temporário gera um endereço novo
a cada vez (`site-renke.<nome>.workers.dev`) e vale por tempo limitado;
o endereço fixo virá com a conta da Renke na Cloudflare.

## Nome do plano no tamanho da referência (18/09/2026)

`.plano-palco__nome` passou de `clamp(3.4rem, 7.6vw, 7.8rem)` numa caixa de
`min(66svh, 720px)` para `clamp(3.4rem, 10vw, 10.5rem)` em
`min(52vw, 80svh, 960px)`: o título da Tres Mares ocupa metade da largura da
tela, uns 11vw. O nome agora vive só na linha 1 do grid (a faixa livre acima
dos textos), então em telas baixas ele sobe em vez de encostar no "Momento
da clínica" (em 1280×720 sobram 100px; em 1440×900, 171px). O ícone perdeu o
`margin-top` e fica centrado na tela, um pouco abaixo do nome, como na
referência. Sem mudança no celular.

## Palco dos planos igual à referência (18/09/2026)

A Lenora pediu a dobra **igual** à "Financial solutions" de
tresmarescapital.com. Refeita a partir do CSS e da timeline GSAP do tema,
lidos do site em 18/09/2026 (viewport 1440×900):

- Container de `n × 100vh` com o `.sticky` de 100vh preso; base escura
  (`--grafite`, lá `#2b2b2b`).
- Âncoras a `5vw` do topo e da esquerda, coluna com `gap .833vw`; fonte
  `.75vw` medium, opacidade .4 (ativa e hover 1). Sem barra de progresso.
- Cada plano é um `.content` absoluto de tela cheia: `.plano-palco__imagem`
  (fundo, depois a foto) e `.plano-palco__info` por cima.
- Título `.plano-palco__nome`: `50.75vw`, centrado, `mix-blend-mode:
  multiply`, cinza `#A0A0A0`, linha 1 à esquerda e linha 2 à direita,
  `10vw`, caixa alta (decisão anterior da Lenora).
- Texto: coluna de `10vw` a `5vw` do canto inferior esquerdo, `1vw`
  medium, "Saiba mais" em `1vw`. Dados: coluna de `8.333vw` a `5vw` do canto
  inferior direito, rótulo `.75vw` caixa alta, valor `.917vw` medium com
  `.417vw` de respiro, `2.083vw` entre grupos, alinhados à direita.
- Transição contínua, sem segurada: cada trecho do curso é uma passagem
  inteira. O que sai: opacidade 1→0, imagem 0→−20%, info 0→−30% sumindo na
  primeira metade, título sumindo no primeiro quarto. O que entra:
  `clip-path: inset(100%→0)`, imagem 20%→0, info 30%→0, título aparecendo
  no último quarto. A âncora troca na metade do trecho.
- Pré-trecho (a dobra chegando): imagem do primeiro plano −10%→0, info
  15%→0 aparecendo no último quarto.
- Snap nos fins de trecho (os "postshow" da referência) 140 ms depois da
  rolagem parar; clique na âncora desliza até o plano.
- O cabeçalho some enquanto a dobra está presa (`header--oculto`,
  `data-hide-header` na referência).
- Ícone: camada central de `min(39vw, 60svh)`, metades na coreografia do
  plano ao longo do trecho inteiro.

A abertura com "PROTOCOLO REVENA" por cima do ícone de vidro (pedida por
print no mesmo dia) foi revertida a pedido dela. Pilha do celular mantida,
com a marcação nova.

## Nome na frente do ícone (18/09/2026)

Pedido da Lenora: o texto na frente do ícone. Primeira tentativa (ícone
dentro da dobra, entre o fundo e o info) bugava: o `clip-path` da dobra que
entra cortava o ícone ao meio e o ícone do plano que sai apagava com a dobra.
Solução: três camadas sobre as dobras — `.palcoplanos__icones` (z 4, um SVG
por plano, centrado, sem corte) e `.palcoplanos__nomes` (z 5, um
`.plano-palco__nome` por plano, opacidade 0 por padrão e ligada pelo script
só para o plano na tela). Na pilha do celular o nome é o
`.plano-palco__nome--pilha`, dentro do info; as duas camadas ficam ocultas.

## Ícone inteiro e nome preto (18/09/2026)

Bugs apontados pela Lenora em gravação: o ícone que saía encolhia num
bloquinho fora do centro e o que entrava chegava em metades, uma delas
meio transparente. A coreografia das metades saiu de vez (frontmatter,
`data-coreografia` e o laço das peças). O ícone inteiro faz o que o info
faz na referência: sai esmaecendo na primeira metade do trecho, subindo 30%
e encolhendo a 92%; entra esmaecendo na segunda metade, subindo do fundo.
Na chegada da dobra, o primeiro ícone aparece no último quarto com o info.
O nome do plano ficou preto (`--grafite`), sem `multiply`, com tracking
`-.055em` e `word-spacing -.06em`: a Inter fina em caixa alta ficava solta.

## Hero no desenho da referência (18/09/2026)

Print da Lenora (agência "Creatif"): fundo preto com duas curvas escuras e
um brilho amarelo no pé; à esquerda o rótulo com o quadradinho amarelo e o
título em três linhas, a primeira em papel e as outras no amarelo original;
no centro o objeto (por ora o monograma da Renke, com brilho e flutuando;
entra a arte 3D quando houver); à direita "© 2026", o lead e o segundo
título "Isso é / RevOps." no mesmo desenho, com o CTA embaixo; no pé, o fio
e "Role para baixo" (âncora para #o-que-fazemos). Títulos em Inter 300,
`clamp(2.6rem, 6.4vw, 8rem)`. A cena em três tempos e a trava de rolagem
saíram; a frase "Revenue Operations para transformar clínicas em negócios
de alta performance." saiu da hero. A barra de logos da versão copy segue.
No celular tudo empilha: rótulo, título, objeto, ano, lead, segundo título,
CTA, fio.

## Cena da hero por tempo (18/09/2026)

No desenho novo, o título à esquerda toca uma cena ao carregar, sem trava
de rolagem: "Isso não é / marketing / para clínicas." entra; a 0,9 s o
risco (gradiente de `background-size` 0 → 100%) passa por "marketing" e
"para clínicas."; a 2,2 s as duas linhas riscadas fecham (dobras em grid,
`1fr → 0fr`), o "não" se recolhe (`max-width → 0`, com `&nbsp;` dentro
para o espaço não sumir) e "RevOps." sobe no lugar. Fica "Isso é /
RevOps.". Sem JS (`html:not(.js)`) ou com menos movimento, o estado final
direto. O segundo título da direita saiu; lá ficam ano, lead e CTA.
