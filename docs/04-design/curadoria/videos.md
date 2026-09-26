# Vídeos da pasta Renke: análise do movimento

26/09/2026

Análise dos 27 vídeos da pasta "Renke" pelo movimento. Vi todas as folhas de 12 quadros e extraí folhas mais densas (24 quadros e trechos a 10–12 qps) das que importavam. Essas folhas estão em /private/tmp/claude-501/-Users-lenoravitorino-Renke/e4121aa0-13de-4668-adf1-12e4c5509bd7/scratchpad/det/.

Três observações antes da lista:
- Nos vídeos da PeachWeb, da Newform e do Instagram (0, 1, 3, 4, 5, 30, 230), a tela que inclina em 3D, o monitor e o notebook são edição do vídeo, não o site. Isso não deve ser copiado.
- As durações são estimadas pelos quadros. Vídeos de vitrine costumam vir acelerados, então os tempos reais são um pouco maiores que os medidos.
- Conferi com docs/04-design/referencias-alto-padrao.md (seções 6 e 10). Vários movimentos dos vídeos já são proibidos lá: contador, texto palavra a palavra, partículas, anéis ou vórtice, cursor próprio, vídeo de fundo e trava nova. Aviso o conflito onde ele aparece.

## 1. Vídeo a vídeo

**0** | https://br.pinterest.com/pin/800022321353534714/
- **O que acontece:** "Financial Consultant" em preto e prata. Uma seda ou fumaça prateada em 3D fica fixa atrás de todas as dobras e muda de enquadramento: nítida e larga na hero, fios verticais atrás da grade de logos, desfocada atrás dos números e riscos de luz na diagonal do convite. As dobras brancas ("approach", "team") sobem como folhas opacas por cima.
- **Técnica:** canvas WebGL fixo, reenquadrado por dobra e ligado ao scroll. Posição, ângulo e nitidez mudam; a forma é a mesma.
- **Curva:** passagem de cerca de 1 tela de rolagem, amortecida, sem snap.
- **Encaixe:** 5.
- **Dobra:** fundo de todas as dobras escuras (é a referência "A" do doc).

**1** | https://br.pinterest.com/pin/800022321353534568/
- **O que acontece:** Blendr. É um filme de produto: a câmera gira em volta de um monitor num quarto escuro com um foco de luz. As seções do site trocam por fusão, com renders azuis de GPU.
- **Técnica:** edição de vídeo, com crossfade simples no site.
- **Curva:** lenta.
- **Encaixe:** 1.
- **Dobra:** nenhuma.

**3** | https://br.pinterest.com/pin/800022321353534212/ (o pin 191, 700098704620752588, é o mesmo reel)
- **O que acontece:** o mesmo modelo do 0, em azul. As fitas azuis ficam quase paradas no mesmo lugar em todas as dobras escuras, respirando devagar. As dobras brancas cobrem o fundo e o convite volta às mesmas fitas.
- **Técnica:** canvas fixo com seções transparentes e cortinas opacas.
- **Curva:** loop lento, sem reenquadramento forte.
- **Encaixe:** 3. Mostra a versão "fundo quase fixo", menos viva que o 0 ou o 30.
- **Dobra:** fundo.

**4** | https://br.pinterest.com/pin/800022321353527874/
- **O que acontece:** Vexel. Um anel de partículas azuis é reenquadrado a cada dobra: cúpula no topo da hero, tubo girando na borda dos logos, núcleo brilhante atrás dos cartões, anel atrás dos preços e anel na borda do convite. Os blocos entram em stagger.
- **Técnica:** WebGL de partículas, com câmera por dobra.
- **Curva:** média, amortecida.
- **Encaixe:** 1. É o conceito certo com o elemento errado: partículas e anéis estão proibidos e o conjunto tem cara de template de IA.
- **Dobra:** nenhuma, só o conceito.

**5** | https://br.pinterest.com/pin/800022321353527873/
- **O que acontece:** "Banking of Tomorrow". Uma esfera e um arco de vidro canelado azul-marinho ficam fixos e mudam de lugar: esfera no alto da hero, esfera atrás de um painel canelado vertical em "Our Process", arco horizontal sob os logos, esfera embaixo do "Ready to Launch?". Na lista de etapas, a etapa ativa fica branca.
- **Técnica:** WebGL, ou render de vídeo, reenquadrado por dobra, mais um vidro canelado sobreposto.
- **Curva:** lenta, amortecida.
- **Encaixe:** 3. O vidro canelado e o reenquadramento servem; o azul e o cartão branco chapado não.
- **Dobra:** fundo, e as dobras 3 ou 5 como referência de lista.

**12** | https://br.pinterest.com/pin/800022321353491534/ (o pin 35 é o mesmo)
- **O que acontece:** seção de recursos em cobre. A dobra laranja sobe sobre a preta. A coluna esquerda ("Tailored for all business sizes") fica presa e os cartões de vidro escuro da direita correm. Um disco de vidro ao fundo gira com a rolagem, de perfil para de frente. No bloco seguinte a coluna esquerda troca, os números correm à direita e o ativo fica em cartão branco. Sai para uma dobra preta.
- **Técnica:** position: sticky com coluna que corre, mais objeto 3D com rotação ligada ao scroll.
- **Curva:** 1:1 com a rolagem; o disco é suavizado.
- **Encaixe:** 3.
- **Dobra:** 2 (vídeo preso e números correndo) ou 6.

**25** | https://br.pinterest.com/pin/800022321353484059/
- **O que acontece:** Alukaze (Webflow). Hero preta com seda monocromática em loop e bolinhas amarelas pequenas como único acento (botão e indicador). As fotos entram deslizando. Há um carrossel horizontal com a foto central maior e as laterais menores. A seda volta no rodapé.
- **Técnica:** vídeo em loop, slide com clip e carrossel com foco central.
- **Curva:** lenta.
- **Encaixe:** 3. É exatamente "amarelo como detalhe sobre preto"; o vídeo de fundo e o cursor ficam de fora.
- **Dobra:** 10 (carrossel das fotos do escritório com foco central).

**27** | https://br.pinterest.com/pin/800022321353475363/ (o pin 90, 800022321353428796, é o mesmo, com outro recorte)
- **O que acontece:** transição de página do CoffeeTech. Uma janela retangular abre no centro-baixo da página atual e cresce até a tela toda, enquanto o título antigo sobe e sai. A página nova tem um título gigante que corre na horizontal ("Technology / Technology"). A volta para a home sobe uma folha inteira de baixo, e o título da hero entra linha a linha por máscara.
- **Técnica:** clip-path: inset() expandindo, máscara de linha e marquee.
- **Curva:** cerca de 0,4 s no vídeo (real de 0,8 a 1 s), ease-out forte do tipo expo.
- **Encaixe:** 3. A janela é boa; o marquee no título é demais.
- **Dobra:** transição entre páginas.

**28** | https://br.pinterest.com/pin/800022321353475359/
- **O que acontece:** Gcore. Preloader com logo, título que aparece palavra a palavra do cinza ao escuro, globo que sobe e cresce, alternância entre dobras claras e escuras, e convite com um horizonte laranja brilhante.
- **Técnica:** reveal por palavra, escala ligada ao scroll e troca de fundo.
- **Curva:** média.
- **Encaixe:** 1.
- **Dobra:** nenhuma.

**30** | https://br.pinterest.com/pin/800022321353475094/
- **O que acontece:** Ascend (PeachWeb) em preto e prata. Um único objeto cromado e canelado é o protagonista, e a câmera muda por dobra: arco baixo sob o título da hero; espiral vertical cortada na borda direita ao lado do texto longo; coluna vertical entre as colunas de logos, que correm em velocidades diferentes; e, no convite, vista frontal em vórtice com esfera no centro.
- **Técnica:** cena WebGL única, com câmera em keyframes por dobra ligados ao scroll, mais parallax de colunas.
- **Curva:** passagem de cerca de 1 tela, amortecida. O objeto anda de 50% a 70% da largura e gira até perto de 90°.
- **Encaixe:** 5. É a melhor referência para o fundo que muda entre dobras; só o vórtice final passa do ponto.
- **Dobra:** fundo de todas as dobras escuras.

**32** | https://br.pinterest.com/pin/800022321353475040/
- **O que acontece:** hero em cobre com discos de vidro girando muito devagar em loop, atrás de uma faixa de vidro fosco vertical. O texto fica parado.
- **Técnica:** vídeo ou render em loop, mais backdrop-filter.
- **Curva:** muito lenta.
- **Encaixe:** 2. É vídeo de fundo, que o doc proíbe; vale só a calma.
- **Dobra:** 1, como referência de ritmo.

**34** | https://br.pinterest.com/pin/800022321353474853/
- **O que acontece:** Cascade Space. A dobra branca "Core Problems" sobe sobre a hero. Os problemas 1, 2 e 3 se empilham: cada painel cinza sobe por cima do anterior, que continua visível por uma faixa fina no topo. Depois vem a dobra escura com a imagem da antena presa à esquerda e a lista técnica correndo à direita. Um fio vermelho vertical marca a grade.
- **Técnica:** sticky empilhado com deslocamento, mais sticky de imagem com coluna que corre.
- **Curva:** 1:1 com a rolagem.
- **Encaixe:** 3.
- **Dobra:** 5 (refinar o palco da Revena) e 2.

**40** | https://br.pinterest.com/pin/800022321353472304/ (o pin 120 é o mesmo post)
- **O que acontece:** Uniko. O fundo troca de branco para preto ao entrar em "Services". Anéis cromados giram. O texto enche do cinza ao preto com a rolagem. Um cartão escuro cresce até ocupar a largura toda. O rodapé tem marquee gigante e há um cursor verde-limão.
- **Técnica:** troca de cor de fundo, preenchimento de texto ligado ao scroll e escala do cartão.
- **Curva:** média.
- **Encaixe:** 2. Tem cara de agência.
- **Dobra:** 8, como ideia (cartão que ganha a tela).

**46** | https://br.pinterest.com/pin/800022321353472200/
- **O que acontece:** United Carriers. Do preto, sobe uma faixa de luz azul que vira branco: a página clareia com a rolagem, sem borda. O título "WE MOVE FREIGHT…" fica preso à esquerda e enche de cor, enquanto os números correm à direita contando. No fim, a foto do guindaste sobe.
- **Técnica:** degradê longo ligado ao scroll, sticky, contador e preenchimento de texto.
- **Curva:** a passagem do escuro ao claro leva cerca de 1 tela; a contagem leva cerca de 1 s.
- **Encaixe:** 4 pela passagem escuro→claro. O contador e o preenchimento por palavra são proibidos no doc.
- **Dobra:** 7.

**60** | https://br.pinterest.com/pin/800022321353454462/
- **O que acontece:** depoimentos da Better Off. A frase troca linha a linha: as linhas antigas sobem e são cortadas pela máscara, as novas sobem de baixo com leve escalonamento. O contador "1 — 5" muda e um fio fino desliza até ficar acima do logo do cliente ativo. A troca provavelmente é por tempo ou por clique.
- **Técnica:** máscara por linha (overflow: hidden) e indicador que desliza.
- **Curva:** cerca de 0,6 a 0,8 s por troca, escalonamento de uns 70 ms, ease-out.
- **Encaixe:** 3. É elegante, mas o doc pede "títulos entram como bloco".
- **Dobra:** 6 (troca do texto do ganho ativo) ou depoimentos, se um dia existirem.

**61** | https://br.pinterest.com/pin/800022321353454456/ (o pin 114, 800022321353388669, é o mesmo site)
- **O que acontece:** Lama Lama, em papel. Etapas numeradas (01 Discover, 02 Define, 03 Design, 04 Deliver). Ao rolar, o cabeçalho de cada etapa (número e título) fica preso no topo logo abaixo do anterior e forma um índice compacto com fios finos, enquanto o texto de cada etapa corre por baixo. No fim, a pilha sai junto e entra uma foto.
- **Técnica:** position: sticky com top escalonado (top = cabeçalho + i × degrau).
- **Curva:** 1:1 com a rolagem, sem animação própria.
- **Encaixe:** 4.
- **Dobra:** 3 (5 pilares).

**118** | https://br.pinterest.com/pin/800022321353387878/
- **O que acontece:** uwwa. Texto gigante correndo na horizontal com a rolagem ("We → are ✦ best"), que enche do cinza ao preto. Lista de serviços com ícone no hover. Vitrine em abas com barra de progresso e troca de imagem. Fundo que muda de tom por case. Seta em SVG que se desenha.
- **Técnica:** scroll horizontal, preenchimento de texto, barra de progresso e stroke-dashoffset.
- **Curva:** média.
- **Encaixe:** 2. Tem cara de agência; a barra de progresso já existe na dobra 6.
- **Dobra:** 6, como referência.

**122** | https://br.pinterest.com/pin/800022321353387822/
- **O que acontece:** Cascade. Ao clicar num cartão vermelho ou preto, uma folha branca entra pela direita sobre um véu escuro, com folhas "fantasma" empilhadas na borda. O conteúdo rola dentro dela. Ao fechar, a folha encolhe num quadrado.
- **Técnica:** drawer com transform e camadas.
- **Curva:** cerca de 0,6 s, ease-in-out.
- **Encaixe:** 2.
- **Dobra:** 9 (painel lateral de Academy e Tools), opcional.

**123** | https://br.pinterest.com/pin/800022321353387819/
- **O que acontece:** AON. Moldura fixa com grade em bento: os blocos crescem de baixo, se reorganizam e um deles ocupa a moldura inteira. Tem texto datilografado. Roxo.
- **Técnica:** FLIP de layout, clip e typewriter.
- **Curva:** rápida.
- **Encaixe:** 1.
- **Dobra:** nenhuma.

**153** | https://br.pinterest.com/pin/800022321353319694/
- **O que acontece:** BTC Markets. Título palavra a palavra com desfoque, cartões em stagger, partículas flutuando, cubo com brilho neon e marca gigante no rodapé.
- **Técnica:** reveal por palavra com blur e brilho aditivo.
- **Curva:** média.
- **Encaixe:** 0. É o "template de IA" típico.
- **Dobra:** nenhuma.

**165** | https://br.pinterest.com/pin/800022321353295858/
- **O que acontece:** transição de página do Exo Ape. A página nova sobe de baixo como uma folha, com a borda de ataque levemente inclinada. A página antiga sobe mais devagar (parallax) e escurece. Depois o título ("Building Digital Presence") entra linha a linha por máscara. A navegação seguinte repete o mesmo gesto.
- **Técnica:** transição de página com translateY, dim e parallax na saída, e máscara por linha no título.
- **Curva:** a folha leva cerca de 0,4 s no vídeo (real de 0,9 a 1,1 s), ease-in-out forte. As linhas levam cerca de 0,5 s cada, com escalonamento de 100 ms.
- **Encaixe:** 4, sem a inclinação da borda.
- **Dobra:** navegação entre páginas.

**224** | https://br.pinterest.com/pin/800022321353278571/
- **O que acontece:** VSIMDIM, em papel, com grotesca fina em caixa alta. As telas passam na horizontal. O título começa com letras muito espaçadas e se fecha. As fotos entram com recortes em "aba". Um desenho isométrico se monta. Na lista "LUNCH / WORK / REST", o item ativo escurece e cresce enquanto a planta ao lado troca.
- **Técnica:** anima o letter-spacing do bloco, clip-path com entalhe, lista com item ativo ligado ao scroll.
- **Curva:** lenta, amortecida.
- **Encaixe:** 3.
- **Dobra:** 10 (fotos do escritório) e 6 (lista com item ativo).

**229** | https://br.pinterest.com/pin/800022321353275998/
- **O que acontece:** Optimind, em cinza e papel com dourado. O painel do título da hero sobe como cortina e revela uma escultura escura com faíscas douradas, que fica fixa. Um segundo enunciado aparece sobre ela. Depois, uma folha cinza opaca sobe e cobre tudo. Em "Discover our services", os três cartões nascem de baixo em alturas escalonadas e os ícones em relevo "acendem" em dourado devagar. O menu tem um fio dourado sob o item ativo.
- **Técnica:** cortina com rolagem nativa sobre objeto fixo; stagger de altura e clip nos cartões; fade lento de luz nos ícones.
- **Curva:** cartões em cerca de 0,8 s com escalonamento de uns 150 ms; ícones em cerca de 1,5 s, ease-out.
- **Encaixe:** 4. É o mais próximo da paleta da Renke; as faíscas e o brilho ficam de fora.
- **Dobra:** passagem da 1 para a 2, e as dobras 3 e 9 (cartões).

**230** | https://br.pinterest.com/pin/800022321353275996/
- **O que acontece:** GalaxyStudio (PeachWeb), num notebook ao pôr do sol. A câmera atravessa um arco branco da hero para a dobra seguinte ("zoom-through"). Depois, um sol ou orbe laranja persistente muda de lugar e de tamanho por dobra, atrás dos números e do convite.
- **Técnica:** WebGL com câmera por dobra.
- **Curva:** lenta.
- **Encaixe:** 2. Paleta quente e travessia teatral.
- **Dobra:** fundo, só como conceito.

**234** | https://br.pinterest.com/pin/800022321353275764/
- **O que acontece:** MYDNA, landing médica em branco e lavanda. Marquee de serviços com um cartão de vidro flutuando no centro. Números "01 02 03" subindo da linha de base cortada. Cartões da equipe que levantam. Linha do tempo em que o ano troca junto com a foto. "CONTACT US" com as letras abrindo para um cartão entrar.
- **Técnica:** marquee, máscara de linha de base, ticker de ano e letter-spacing.
- **Curva:** média.
- **Encaixe:** 2. O segmento é o mesmo, mas a estética é genérica; vale os números subindo da linha de base.
- **Dobra:** 7.

## 2. Top 6 para o site

### 1. O mesmo fundo, reenquadrado a cada dobra
- **De onde vem:** 30, 0 e 5.
- **Destino:** todas as dobras escuras.
- **Implementação:** já existe no laboratório. É o fundo-motor.ts com o roteiro por dobra do fundo-dobras.ts, que segue exatamente o padrão desses vídeos. O que eles acrescentam é uma gramática de enquadramento para os quadros:
  - **Hero:** baixo e largo, horizontal, sob o título, intensidade média, nítido.
  - **Dobra 2 (texto longo e vídeo):** empurrado para a borda do lado oposto ao texto, quase vertical, mais da metade fora da tela.
  - **Dobras 3 e 9 (grade de cartões):** atrás da grade, desfocado, intensidade baixa. No 0, a seda vira fios verticais atrás dos logos.
  - **Dobra 4 (letreiro):** horizontal e fino, alinhado à faixa.
  - **Dobra 6:** do lado oposto à foto.
  - **Dobra 8 (convite):** frontal e centrado, é o "fecho", ainda sob a máscara de leitura.
  - **Dobras claras:** trocam de quadro com a tela coberta, como o doc já prevê.
- **Parâmetros:** os do doc. Smootherstep, τ de 0,35 s, passagem da base da dobra A a 85% até o topo da B a 15%, rotação de até 50° e deslocamento de até 50% por passagem. As referências chegam a cerca de 90° e 70%; eu manteria os limites do doc, que são mais calmos.
- **Cuidado:** um objeto só, que nunca muda de forma. O vórtice frontal do 30 e o anel do 4 são o momento "agência". Nada de azul, cor ou reação ao mouse. A tela inclinada dos vídeos é edição e não entra.

### 2. Cortina com recuo: a dobra que sai fica para trás e apaga
- **De onde vem:** 165, 34 e 229.
- **Destino:** entradas das dobras opacas, ou seja, o palco da Revena (5), Resultados (7) e o Formulário (11), se for opaco.
- **Implementação:**
  - A dobra que entra continua subindo com a rolagem nativa, com `position: relative; z-index: 2` e fundo opaco.
  - O conteúdo da dobra que sai (não o canvas) recebe atraso e apagamento:
    `@supports (animation-timeline: view()) { .dobra > .miolo { animation: recuo linear both; animation-timeline: view(); animation-range: exit 0% exit 100%; } }`
    `@keyframes recuo { to { transform: translateY(18vh); opacity: .45 } }`
  - Com o translateY positivo, o conteúdo sobe mais devagar que a página e é coberto pela folha que entra (fator de uns 0,82).
  - Sem suporte a animation-timeline: um IntersectionObserver liga um único rAF que escreve --p (0 a 1) a partir do getBoundingClientRect da dobra seguinte.
- **Parâmetros:** atraso de 15 a 20vh ao longo de 100vh, opacidade mínima de 0,45, sem curva própria (1:1 com a rolagem).
- **Cuidado:** borda reta, sem sombra, sem a inclinação do Exo Ape, sem filter: brightness em camada grande (usar opacity). Não fixa nada, então não é trava nova. Aplicar igual nas duas versões.

### 3. Índice que se empilha nos 5 pilares
- **De onde vem:** 61 e 114.
- **Destino:** dobra 3.
- **Implementação:**
  - Uma lista plana, com cabeçalhos e corpos como irmãos no mesmo container. Esse é o detalhe que importa: se cada cabeçalho ficar dentro do seu `<li>`, o sticky solta no fim do item e a pilha não se forma.
  - Cabeçalho (número e título numa linha):
    `position: sticky; top: calc(var(--altura-header) + var(--i) * var(--degrau)); z-index: calc(10 + var(--i));`
    com `border-top: 1px solid rgb(242 242 238 / .14)` e fundo de vidro escuro, `rgb(12 12 12 / .86)` com `backdrop-filter: blur(12px)`, para o texto que corre por baixo não colidir.
  - Container com `padding-bottom` de uns 35vh, para os 5 chegarem a empilhar antes da dobra sair.
  - O número do último cabeçalho preso fica em #FFD103 (o acento permitido: um número). Pode ser marcado por IntersectionObserver.
- **Parâmetros:** --degrau de 52px no desktop e 40px abaixo de 900px (ou sem empilhar no celular). Pilha com no máximo 30% da altura da tela. Só a cor do número tem transição, de 0,4 s.
- **Cuidado:** é uma troca de layout (os cartões dos pilares viram índice tipográfico), então precisa de aprovação e das duas versões. Precisa ser só tipografia, para não repetir o palco da Revena, que também empilha, duas dobras depois.

### 4. Coluna presa e lista que corre
- **De onde vem:** 12, 34 e 5.
- **Destino:** dobra 2 (vídeo vertical preso à esquerda, texto e 3 números correndo à direita). Alternativa: dobra 6.
- **Implementação:**
  - Grade de 5 e 7 colunas.
  - A figura do vídeo fica `position: sticky; top: calc(var(--altura-header) + (100svh - var(--altura-header) - var(--altura-video)) / 2)`, centrada na altura.
  - Na direita, texto e cada número com `min-height` de uns 45vh.
  - O item ativo é o que cruza o meio da tela: `IntersectionObserver({ rootMargin: '-45% 0px -45% 0px' })`. O ativo fica com opacidade 1 e um fio amarelo de 1 × 24px à esquerda (scaleX de 0 a 1); os outros ficam em 0,4.
- **Parâmetros:** opacidade em 0,6 s e fio em 0,8 s, os dois com `cubic-bezier(.22,1,.36,1)`. O vídeo mantém o "4vh → 0, sem scale" do doc. Abaixo de 900px, sem sticky.
- **Cuidado:** nada do cartão branco chapado do 12 como ativo e nada do disco girando; quem se move por trás é o véu. Como a página continua rolando, não é trava.

### 5. Chegada à dobra clara por uma faixa de luz neutra
- **De onde vem:** 46.
- **Destino:** dobra 7, Resultados.
- **Implementação:**
  - No lugar da borda reta, o topo da seção ganha um `::before` de 60 a 70vh:
    `linear-gradient(in oklab, transparent 0%, rgb(24 24 23 / .6) 25%, #6f6e6a 55%, #d9d8d2 80%, var(--papel) 100%)`
  - Por cima, um ruído de 2 a 3% de opacidade para não formar faixas.
  - A troca de quadro do canvas só acontece quando o trecho opaco cobre a tela.
  - Números grandes: sobem da linha de base uma vez, como bloco, dentro de um `overflow: hidden` (234): `translateY(105%) → 0` em 1,1 s, `cubic-bezier(.22,1,.36,1)`, escalonamento de 90 ms, até 4 itens.
- **Cuidado:** nada de contagem nem de texto enchendo palavra a palavra, que o 46 usa e o doc proíbe. Sem azul nem brilho. Um degradê curto vira "fade de template". Isso altera a linha "Cortina clara: borda reta" da seção 6 do doc, então precisa de aprovação da Lenora.

### 6. Transição entre páginas: a folha que sobe
- **De onde vem:** 165, com a alternativa da janela do 27.
- **Destino:** navegação da home para Academy, Tools, Studio e Contato (dobra 9 e menu).
- **Implementação:**
  - Transições de página nativas entre documentos, sem biblioteca e sem o ClientRouter do Astro: `@view-transition { navigation: auto; }` (Chrome 126+ e Safari 18.2+; os outros navegam normalmente).
  - Saída: `::view-transition-old(root) { animation: sai 1s cubic-bezier(.65,0,.35,1) both } @keyframes sai { to { transform: translateY(-12vh); opacity: .35 } }`
  - Entrada: `::view-transition-new(root) { animation: entra 1s cubic-bezier(.65,0,.35,1) both } @keyframes entra { from { transform: translateY(100vh) } }`
  - Alternativa do 27: `from { clip-path: inset(42% 34% 42% 34%) }`.
  - Dar `view-transition-name: fundo` ao canvas fixo, para o véu ficar parado enquanto só o conteúdo troca.
  - O H1 da página nova entra como bloco, 12px → 0, depois de 350 ms.
- **Parâmetros:** até 1 s no total. Com prefers-reduced-motion, sem animação ou só um fade de 200 ms.
- **Cuidado:** sem preloader de logo, cortina colorida, borda inclinada ou título em marquee. As âncoras dentro da home continuam nativas.

## Também vale guardar
- **Fio que se desenha (229):** a borda de 1px dos cartões da 3 ou da 9 nasce de baixo com `clip-path: inset(100% 0 0 0) → inset(0)` em 1,2 s, escalonamento de 120 ms, e o ícone em amarelo aparece em 1,6 s.
- **Bordas visíveis no palco da Revena (34):** deixar de 10 a 12px de cada plano anterior à vista no topo. O palco hoje "fica como está" pelo doc.
- **Carrossel com foco central (25):** para as fotos do escritório na dobra 10.
- **Troca por linha com máscara (60) e tracking que se fecha (224):** bonitos, mas batem com "títulos entram como bloco" e "letras separadas" do doc.
