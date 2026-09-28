# Curadoria: PeachWeb, ClickUp, Vercel e a pasta "Renke" do Pinterest

26/09/2026. Pedido da Lenora: extrair o fundo da PeachWeb (sem o foco que
segue o mouse, com transição mais suave), menu como o do ClickUp, grid e
tamanhos de fonte como os da Vercel, e uma curadoria da pasta
[Renke](https://br.pinterest.com/ysesaantos/renke/) (privada, 265 pins) para
os ajustes da home. Regra de filtro: `AGENTS.md`, "alto padrão, menos é mais".

## 1. O fundo da PeachWeb (curious-mepp4bd.peachweb.site)

**Como é feito lá.** É um site do construtor PeachWeb: uma cena three.js
descrita em JSON (`scene-state/*.json`), com animações presas à porcentagem
de scroll da página inteira (uma "sheet" de 0 a 100%).

- **Objetos:**
  - "Primary Model Donut": um plano de 18 mil vértices dobrado em anel, com 11
    alvos de morph animados em loop lento (velocidade .08);
  - "Secondary Model Line": um fio em espiral que sobe de baixo entre 36% e
    50% do scroll;
  - "Third Model Wave": uma onda em gradiente que aparece e some entre 23% e
    38%;
  - um plano de fundo cinza que recua.
- **Material:** físico escuro (#232323), metal .25 → .92 com o scroll,
  rugosidade .45, verniz .5, "sheen" cinza, transmissão 1 no começo (o ar de
  fumaça) e reflexo de um HDRI "abstrato brilhante".
- **Luz:** três pontuais cinza (#D2D2D2), mais um spot que projeta um vídeo de
  cáusticas. Fog preto de 10 a 20.
- **Pós-processamento:** vinheta, tone mapping, grão a 30%, brilho +3%, e um
  **desfoque radial em volta do mouse**. Esse desfoque é o "foco no hover"
  que a Lenora não gostou. A câmera também inclina 1° com o ponteiro.
- **Coreografia:**
  - 0 a 20%: o anel vem de longe (z −11 → 4,7), gira e depois encolhe até
    sumir;
  - 23 a 38%: a onda aparece;
  - 36 a 50%: o fio sobe;
  - depois, só a câmera sobe um pouco.

**O que fizemos** (`src/components/laboratorio/fundo-prata.ts`, página
`/laboratorio/prata`). Não copiamos modelos, texturas nem código de lá: os
modelos são do construtor. Refizemos a ideia do zero.

- **O anel:** um toro com ondas lentas de tecido no vértice e fios desenhados
  no shader. Cada fio tem brilho de seda (Kajiya-Kay) e força própria que muda
  devagar. Frente e verso se somam, e é isso que dá o ar de fumaça.
- **Cor e acabamento:** cinza quente com teto em #D6D5CF, sem amarelo, com
  grão e vinheta por cima (CSS).
- **Nada acompanha o mouse:** sem o desfoque e sem a inclinação da câmera.
- **Transição mais suave:** o motor mantém o anel parado enquanto a dobra
  ocupa a tela e muda de quadro na passagem. O amortecimento subiu de .35 s
  (véu) para .9 s, com curva quíntica.
- **Legibilidade:** a máscara de leitura escurece o anel atrás de todo texto.
  Atrás dos cartões ele perde 18% do brilho.
- **Um quadro por dobra:**
  - hero: grande, à direita, saindo da tela;
  - metodologia: atrás do vídeo;
  - pilares: deitado, como horizonte;
  - letreiro: um traço sob as palavras;
  - perguntas: espiando do canto;
  - convite: de frente, com o título dentro do anel;
  - ecossistema: canto de baixo;
  - Sobre: atrás da moldura;
  - formulário: à esquerda.

## 2. Menu: ClickUp (clickup.com)

Medido na página:

- **Itens:** pílulas de 8 px de raio e 4×10 px de respiro. O item aberto
  ganha fundo a 6%, com transição de .2 s.
- **Painel:** é uma "cortina" única que desce do cabeçalho (`block-size`,
  .3 s, `cubic-bezier(.4, 0, .2, 1)`) e muda de altura entre um menu e outro.
  Não são caixas soltas.
- **Conteúdo:** colunas com rótulo pequeno em caixa alta e, à direita, uma
  coluna de destaque com cartões (ícone, título e uma linha).
- **Página:** escurece por baixo (fundo do backdrop em .3 s).

**Adaptado** (`Header.astro`, `home2.css`):

- O cabeçalho flutuante e o painel viram uma peça só. A caixa cresce até a
  altura do painel ativo, em .5 s, com `cubic-bezier(.22, 1, .36, 1)`.
- O conteúdo troca com fade de .35 s. Os itens viram pílulas e a página
  escurece a 45%.
- Cada menu ganhou colunas e um **cartão de destaque**, com textos que o site
  já usa:
  - Protocolo Revena → "Fale com a gente";
  - Renke Academy;
  - Renke Tools;
  - Conheça a Renke.
- Os planos Revena aparecem com o próprio símbolo. É o único amarelo do
  menu.
- O menu fecha ao sair da caixa inteira, com 160 ms de folga, e não mais ao
  sair do item. No celular o drawer continua como era.

## 3. Grid e tipografia: Vercel (vercel.com)

Medido na página:

- **Grid:** conteúdo de 1400 px com margem de 24 px, 12 colunas e vão de
  20 px.
- **Títulos:** o h1 tem 64/64 (peso 400, tracking −.06em). Os títulos de
  seção têm 56/56.
- **Textos:** apoio em 24/32, cinza #A1A1A1. Rótulos e texto miúdo em 14/20.
- **Espaço entre seções:** 160 a 208 px.

**Adaptado** (`home2.css`, nas duas versões):

- **Laterais um pouco maiores:** a margem passou de `clamp(24px, 7vw, 112px)`
  para `clamp(24px, 8.5vw, 136px)`. A composição máxima passou de 1600 para
  1560 px. Em 1440 px, o conteúdo foi de 1238 para 1196 px.
- **Tudo menor:**

  | Elemento                        | Antes    | Agora    |
  | ------------------------------- | -------- | -------- |
  | Corpo                           | 17 px    | 16 px    |
  | Títulos de dobra                | 77 px    | 56 px    |
  | h1 da hero                      | 118 px   | 80 px    |
  | Apoio da hero                   | 23 px    | 19 px    |
  | Título da metodologia           | 80 px    | 54 px    |
  | Números da metodologia          | 64 px    | 48 px    |
  | Letreiro                        | 125 px   | 83 px    |
  | Frase de abertura do palco      | 70 px    | 54 px    |
  | Números dos Resultados          | 120 px   | 83 px    |
  | Convite                         | 80 px    | 61 px    |
  | Caixa do cabeçalho              | 72 px    | 64 px    |
  | Logo                            | 40 px    | 34 px    |
  | Itens do menu                   | 17 px    | 15 px    |

- **O palco dos planos não mudou** (nome em 10vw, símbolo, coreografia):
  "volta como era antes".

## 4. A pasta "Renke" do Pinterest

São 265 pins, 230 imagens diferentes (alguns repetidos) e 30 vídeos. Todos
foram vistos em folhas numeradas e os vídeos foram quebrados em quadros. O
número entre parênteses é a posição na pasta, a partir de 0 (o pin mais
recente).

### O que a pasta diz sobre o gosto da Renke

- **O que domina:** preto, cinza e metal; amarelo em ponto pequeno; fotos
  de gente real com luz baixa; muito vazio.
- **Vídeos de transição:** seis vêm do details.so (mostruário de seções) e
  quatro da PeachWeb.
- **O que aparece muito, mas vai contra a regra:**
  - verde-limão em blocos (47, 139, 208, 209, 213, 218, 219, 247 a 262);
  - vidro laranja 3D (58, 231, 232);
  - cripto neon (225, 238);
  - azul elétrico (3, 4, 5, 158, 263).

  Ficam como "não fazer": amarelo e cor viva só como detalhe.

### Classificação por ajuste

A = aplicado nesta rodada · B = usar na próxima · C = evitar.

**Fundo e transições**

- A · (0) [Reel da PeachWeb](https://br.pinterest.com/pin/800022321353534714/): a
  mesma cena escolhida, com anel de fumaça prateada, seções em cartões escuros
  e fechamento com traços de luz.
- A · (18, 19) [Anéis de metal](https://br.pinterest.com/pin/800022321353491502/)
  e [anéis dourados](https://br.pinterest.com/pin/800022321353491501/): confirmam
  o anel como forma da marca. No nosso, prata.
- B · (165) [Exo Ape, transição](https://br.pinterest.com/pin/800022321353295858/):
  foto que troca por cortina vertical e título que sobe linha a linha. Usado
  no Sobre; dá para levar às trocas de dobra.
- B · (90, 27) [CoffeeTech](https://br.pinterest.com/pin/800022321353428796/):
  a manchete corre na horizontal durante a troca ("Technology / Technology").
  Conversa com o nosso letreiro.
- C · (3, 4, 5) templates da PeachWeb em azul: a estrutura serve, a cor não.

**"Uma operação estruturada muda a forma como sua clínica cresce"**

- A · (124) [Institutional Grade In All We Do](https://br.pinterest.com/pin/800022321353369489/):
  foto grande da empresa com os itens em cartões por cima, um aberto por vez.
  É a base da dobra nova.
- A · (69) [Understand the flow](https://br.pinterest.com/pin/800022321353447164/):
  abas numeradas com uma barra de progresso que anda. É o índice da dobra.
- A · (176) [Harmony Haven](https://br.pinterest.com/pin/800022321353281497/):
  cartão flutuando sobre a foto. É o cartão claro do item ativo.
- B · (143) [We've orchestrated Intelligence](https://br.pinterest.com/pin/800022321353356347/):
  colunas numeradas em que a ativa se abre com imagem. Serve para os pilares.
- B · (114, 61) [Serviços numerados](https://br.pinterest.com/pin/800022321353388669/):
  as linhas 01, 02, 03 se empilham no topo conforme a página rola.
- C · (219) Facture 1 2 3 4: forte, mas cara de agência.

**Academy e Tools**

- A · (122) [Cascade, dois produtos](https://br.pinterest.com/pin/800022321353387822/):
  dois cartões lado a lado, cada um com nome, texto e a lista do que entrega.
  É a base do "Ecossistema Renke".
- A · (2) [Nó central ligado aos serviços](https://br.pinterest.com/pin/800022321353534530/):
  a arte do Renke Tools, o R ligando marketing, comercial e operação com um
  brilho correndo pelos fios.
- B · (125) [Technical knowledge](https://br.pinterest.com/pin/800022321353369484/):
  educação com um único detalhe amarelo. Serve para a página da Academy.
- B · (183) [Campus](https://br.pinterest.com/pin/700098704620738118/): bento
  escuro com números (cursos, alunos, mentores). Idem.

**Fotos da Renke sem cara de institucional**

- A · (165) Exo Ape e (201) [Nenya](https://br.pinterest.com/pin/700098704620779659/):
  a foto nasce numa moldura, cresce até a tela inteira e as outras entram por
  cortina. É a base do "Conheça a Renke".
- A · (124) a foto como palco de conteúdo, não como galeria. É a dobra das
  perguntas.
- B · (190) [Built to outlast the moment](https://br.pinterest.com/pin/700098704620752587/):
  retratos com o do meio em destaque. Serve para os doutores (depoimentos)
  quando houver fotos.
- B · (226) [How We Help You](https://br.pinterest.com/pin/800022321353278532/):
  quatro fotos altas desfocadas em cartões. Serve para os pilares com fotos.

**Grid, cor e tipografia**

- A · (83) [Grid system](https://br.pinterest.com/pin/800022321353430356/) e
  (89) [Typography](https://br.pinterest.com/pin/800022321353429809/): colunas
  à vista e tipografia fina e grande. Confirmam a leitura da Vercel.
- A · (140) [Neural White, Quantum Black, Solar Core, Circuit Silver](https://br.pinterest.com/pin/800022321353356863/):
  é a paleta da Renke (branco, preto, amarelo e prata), com o amarelo como
  uma faixa entre quatro.
- B · (51) [The intelligence behind every trade](https://br.pinterest.com/pin/800022321353454745/):
  cruzes "+" nos cantos e grade fina, como a Vercel. Os fios de grade já foram
  testados e retirados em 20/09, então só voltam se ela quiser.
- B · (38) [Not separate services. One connected system](https://br.pinterest.com/pin/800022321353472461/):
  a frase é a tese da Renke (RevOps). Serve como dobra de manifesto.

**Números e prova**

- B · (168) [40x · 72M · 6.3M](https://br.pinterest.com/pin/800022321353294716/)
  e (164) [120+ · 45+ · 24/7](https://br.pinterest.com/pin/800022321353311723/):
  números grandes e finos, sem caixa.
- B · (108) [User research](https://br.pinterest.com/pin/800022321353389081/):
  porcentagens em círculos pontilhados.

**Formulário**

- B · (135) [Every project starts with a plan](https://br.pinterest.com/pin/800022321353362779/):
  um painel da pessoa que vai atender ao lado do formulário.

## 5. O que foi aplicado nesta rodada

- **Fundo prata** em `/laboratorio/prata` (seção 1).
- **Palco dos planos:** o símbolo voltou a ser amarelo no laboratório. A
  estrutura continua a mesma.
- **Escala menor e laterais maiores** (seção 3), nas duas versões.
- **Menu no molde do ClickUp** (seção 2), nas duas versões.
- **"Uma operação estruturada":**
  - palco com a foto da operação, índice de vidro, cartão claro e troca
    automática a cada 6,5 s (pausa com mouse ou foco, para no primeiro
    clique);
  - no celular, foto e lista;
  - na copy, cabe na cortina dos planos.
- **Ecossistema Renke:** Academy e Tools com arte, texto e lista do que cada
  um entrega. Título na versão do estúdio: "O mesmo método, em outras
  frentes."
- **Conheça a Renke:**
  - "Conheça a história" virou "Conheça a Renke", só na versão do estúdio;
  - a esteira de seis blocos virou a foto que cresce da moldura e troca por
    cortina.

## 6. Pendências

- **As 5 fotos com grão** que a Lenora mandou no chat não chegaram como
  arquivo. Por ora entram as três fotos da sede que já estavam no projeto
  (`src/assets/sede`). Quando as fotos novas estiverem numa pasta, é só
  trocar os imports em:
  - `Perguntas.astro`;
  - `AcademyTools.astro`;
  - `Sobre.astro`.
- **Próxima rodada, pedida por ela:** análise de cada referência, uma a uma,
  e as dobras 2, 3, 5, 6 e 7 com mais dinâmica. Entram também:
  - o Protocolo Revena com um fundo na linha da tresmarescapital.com;
  - as PeachWeb happy-qq33pg9ab e huge-ry3qig12sh;
  - referências de fora;
  - o `/impeccable`.
