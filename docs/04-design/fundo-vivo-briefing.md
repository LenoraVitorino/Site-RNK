# Briefing e prompt: o fundo vivo da home

> Atualização de 25/09/2026: os caminhos B e C foram reprovados por excesso
> de amarelo. A direção que vale agora está em
> [`referencias-alto-padrao.md`](referencias-alto-padrao.md). A dinâmica e o
> motor descritos aqui continuam valendo.

Documento de 22/09/2026. Tem sete partes:

1. o briefing;
2. a leitura das referências;
3. três caminhos para escolher;
4. o prompt pronto para executar o caminho escolhido;
5. prompts em inglês para gerar quadros de conceito antes de programar;
6. os próximos passos;
7. o roteiro detalhado de execução: as regras da dinâmica, a legibilidade,
   o vidro e a cena de cada dobra, medidos no layout real. Os caminhos B e
   C já estão prototipados com ele em `/laboratorio/fundo`.

Este documento substitui a parte do objeto em
[`hero-aneis-prompt.md`](hero-aneis-prompt.md). Os anéis seguem no laboratório
como primeira tentativa. O que já foi aprovado continua valendo: a dinâmica.

---

## 1. Briefing

### O que queremos

Um fundo que acompanhe a home do começo ao fim. É um elemento só, grande, que
muda de lugar, de forma e de profundidade a cada dobra e sempre abre espaço
para o texto. Quem rola a página sente que atravessa um mesmo ambiente, e não
uma sequência de seções soltas.

### O que já está aprovado

O protótipo dos anéis (`/laboratorio/aneis`) validou a dinâmica:

- uma tela 3D fixa atrás da página inteira;
- dobras escuras transparentes, que deixam o fundo aparecer;
- dobras claras e amarela sólidas, que sobem por cima como uma cortina;
- cartões de vidro desfocado na dobra do Protocolo Revena;
- movimento lento, guiado pelo scroll, sem travar a rolagem.

### O que muda

Muda o elemento. Os anéis funcionaram como **objeto**: uma peça no meio da
tela, que a gente olha. As referências pedem um **fundo**: algo maior que a
tela, cortado pelas bordas e com contraste baixo, que a gente mais sente do
que olha. É essa a correção de rota.

### Para quem e com que tom

O público são donos e donas de clínicas de alto padrão. O fundo precisa parecer
**moderno, neutro, suave e elegante**, mais próximo de arquitetura, joalheria e
moda do que de tecnologia. A mensagem do site segue a mesma: a Renke não é
agência de marketing, é RevOps, o sistema que conecta marketing, comercial e
operação.

### Paleta

- **Ambiente**: preto `#000000` e grafite `#161616`.
- **Reflexos frios e discretos**: papel `#F2F2EE`.
- **Luz**: o amarelo da marca `#FFD103` e o amarelo claro `#FFEBA3`. Eles
  aparecem no brilho da crista, no fio da borda e na cor das partículas, nunca
  como tinta chapada cobrindo o elemento inteiro.

---

## 2. O que as referências ensinam

São sete referências. Cinco são as imagens enviadas em 22/09. As outras duas
são os vídeos do Pinterest (`pin.it/69gk2ush6`, da Ascend, e
`pin.it/2MwcUAkCz`, da PeachWeb), os mesmos da rodada anterior.

| Referência | O que tem | O que levamos |
|---|---|---|
| snce agency, fita amarela | Curvas largas e brilhantes cruzam o quadro e saem pelas bordas. O texto fica no vazio preto. | **Escala e corte**: o elemento é maior que a tela. |
| Anéis pretos concêntricos | Preto sobre preto; a forma só aparece pelo fio de luz nas bordas arredondadas. | **Contenção**: luz de contorno, profundidade por sobreposição e o túnel. |
| Onda de partículas amarela | Pontos dourados formam uma onda, e os mais próximos viram bokeh. | **Foco raso**: profundidade de câmera fotográfica. |
| Malha de pontos oliva | Milhares de pontos em grade regular desenham uma superfície que ondula. | **Ordem**: partícula organizada, nunca poeira caótica. |
| Véus âmbar | Fitas translúcidas como seda ou fumaça, em camadas, com calor no centro e cinza nas pontas. | **Transparência em camadas** e calor contido. |
| Ascend (vídeo) | Uma forma nervurada e monocromática atravessa o site: é arco na hero, fica na lateral nas seções e vira túnel no convite final. | **Continuidade**: um elemento só costura as dobras. |
| PeachWeb, seção de recursos (vídeo) | O texto fica fixo à esquerda, os cartões de vidro à direita e o objeto desfocado atrás deles. | **Vidro sobre o fundo**: os cartões deixam o fundo passar, desfocado. |

### A gramática em comum

1. **Um elemento só, maior que a tela.** Ele sai pelas bordas e nunca aparece
   inteiro e centralizado.
2. **Preto como ambiente e uma luz quente.** Uma fonte principal, rasante,
   desenha a forma pelas bordas.
3. **Profundidade de câmera.** Foco raso, camadas, e o que está perto fica
   desfocado.
4. **Calma.** Movimento lento e contínuo, sem pulso nem pressa.
5. **O texto mora no vazio.** O elemento se afasta do texto e ocupa o espaço
   negativo.

---

## 3. Três caminhos

Os três seguem a mesma gramática e a mesma coreografia base. O que muda é a
matéria do elemento.

### A. Escultura: a lâmina de cetim

Uma lâmina larga e contínua, como uma fita de cetim grafite com nervuras
suaves, que se curva devagar pelo espaço. A luz amarela corre pela crista das
curvas. É a leitura mais direta da Ascend e da snce, em versão neutra.

- **O que diz da Renke**: fluxo sem emenda. Marketing, comercial e operação
  formam uma peça só.
- **A favor**: é o caminho mais próximo das referências em vídeo e o mais
  arquitetônico.
- **Risco**: pede acabamento fino para não parecer plástico. É o mais caro de
  acertar em tempo real.

### B. Partículas: a constelação que se organiza

Um campo de milhares de pontos de luz, amarelos e cor de papel, que se
reorganiza numa forma diferente a cada dobra. Na transição, cada ponto parte
no seu tempo, com um pequeno atraso próprio. A forma se desfaz e se refaz
como um cardume, e não como um bloco.

- **O que diz da Renke**: dados soltos que viram estrutura. As formas contam o
  método dobra a dobra: a onda do mercado, os três anéis que se unem, a esfera
  integrada e o portal para a conversa.
- **A favor**: é o único caminho em que o fundo muda de forma a cada dobra,
  que é a dinâmica pedida. É leve, roda bem no celular e fica bonito com foco
  raso.
- **Risco**: pode parecer "tecnologia" se ficar frio, rápido ou denso. As
  proteções são pontos quentes e macios, bokeh, nenhuma linha ligando os
  pontos, poucas formas e todas simples.

### C. Superfície: ondas em preto líquido

Uma superfície de preto polido, como óleo ou laca, com ondas concêntricas
largas e arredondadas, como as de uma gota. Só as cristas pegam luz: um fio
cor de papel de um lado e amarelo quente do outro. É a referência dos anéis
pretos em movimento e a herdeira natural dos anéis do primeiro protótipo.

- **O que diz da Renke**: impacto que se propaga. Uma decisão bem tomada
  reverbera na clínica inteira.
- **A favor**: é o caminho mais suave e o mais luxuoso. O preto sobre preto
  quase não fala, e o texto respira.
- **Risco**: pode sumir se a luz estiver fraca. Depende de um reflexo bem
  calibrado.

### Comparação

| | A. Escultura | B. Partículas | C. Superfície |
|---|---|---|---|
| Quanto muda de forma por dobra | pouco: a curva muda | muito: uma forma nova por dobra | médio: as ondas e o ângulo mudam |
| Referências mais próximas | Ascend, snce, véus | ondas de pontos | anéis pretos |
| Sensação | moda, arquitetura | método, sistema | joalheria, calma |
| Risco principal | parecer plástico | parecer tecnologia | sumir |
| Custo de execução | alto | médio | médio |
| Celular | simplificada | ótimo, com menos pontos | bom, com malha menor |

### Recomendação

Minha recomendação é prototipar **B e C** lado a lado no laboratório, com um
seletor para comparar:

- **B** entrega exatamente a dinâmica descrita pela Lenora: formas diferentes
  que se montam com o scroll.
- **C** é a aposta mais segura em elegância e conversa com os anéis de que ela
  gostou.

A Escultura (A) fica para depois, se nenhuma das duas convencer, porque é a
mais cara de acertar.

---

## 4. O prompt

> Copie a partir daqui. A parte comum vale para os três caminhos. No fim, cole
> só o bloco do caminho escolhido.

### Papel

Você é um desenvolvedor criativo sênior, especialista em WebGL com three.js,
direção de arte para sites premiados e performance web. Sua tarefa é
implementar o fundo vivo da home da **Renke**: uma camada 3D fixa, contínua e
guiada pelo scroll, que acompanha as dobras da página.

### Contexto

- A Renke é uma assessoria de Revenue Operations (RevOps) para clínicas
  médicas de alto padrão, como dermatologia, cirurgia plástica e nutrologia.
  A mensagem central do site: ela não é agência de marketing, é o sistema que
  conecta marketing, comercial e operação.
- O público são donos e donas de clínica, acostumados com marcas de luxo,
  consultórios de arquitetura cuidada e atendimento impecável.
- O tom visual é moderno, neutro, suave e elegante, mais perto de arquitetura
  e joalheria do que de tecnologia.

### Objetivo

Criar um único elemento 3D, maior que a tela, que muda de posição, forma e
profundidade a cada dobra. Ele ocupa sempre o espaço negativo, longe do texto.
Quem rola a página deve sentir que atravessa um mesmo ambiente.

### Linguagem visual (vale para qualquer caminho)

- **Cores**:
  - Ambiente em preto `#000000` e grafite `#161616`.
  - O amarelo `#FFD103` e o amarelo claro `#FFEBA3` entram como luz: brilho,
    fio de borda e cor de ponto. Nunca como cor chapada.
  - O papel `#F2F2EE` aparece só em reflexos frios e discretos.
- **Luz**: uma luz principal quente e rasante desenha a forma pelas bordas. Do
  lado oposto, um contorno frio e fraco. Mapeamento de tom neutro, para o
  amarelo sair fiel.
- **Escala**: o elemento é sempre maior que a área visível e sai por pelo
  menos uma borda. Nunca aparece inteiro e centralizado, como um produto.
- **Profundidade**: foco raso. O que está fora do plano de foco fica macio.
- **Contraste**: o texto claro precisa passar de 4,5:1 sobre o ponto mais
  claro do fundo atrás dele. Se for preciso, use um véu escuro e suave atrás
  do bloco de texto.
- **Textura**: um grão fino de filme por cima, com 2 a 3% de opacidade, para
  tirar o aspecto digital. É opcional.

### Princípios de movimento

1. **Lento e contínuo.** Toda mudança passa por amortecimento exponencial, com
   meia-vida em torno de 120 ms. Nada acelera de repente.
2. **O scroll conduz e nunca trava.** A rolagem é nativa. É proibido prender
   dobras, criar snap ou sequestrar a roda do mouse.
3. **Respiração.** Parado, o elemento continua vivo, num ciclo de 8 a 12 s.
4. **O mouse aproxima, não sacode.** Paralaxe de no máximo 4 graus, com
   amortecimento, só em telas com mouse ou trackpad.
5. **Entrada.** Ao carregar, o elemento surge em 1,6 s, com fade e leve
   aproximação, depois que o texto da hero já está na tela.

### Estrutura da página e coreografia

Uma única `<canvas>` fica fixa atrás de todo o conteúdo, sem eventos de
ponteiro. As dobras escuras têm fundo transparente. As dobras claras e a
amarela são sólidas e sobem por cima, como uma cortina.

Cada linha da tabela é um quadro-chave. Ele é alcançado quando o topo da dobra
chega ao meio da tela, e entre dois quadros o estado é interpolado com
suavização (smoothstep). A última coluna diz onde o elemento se concentra; a
forma em cada dobra está no bloco do caminho escolhido.

| Dobra | Fundo | Onde está o texto | Onde o elemento se concentra |
|---|---|---|---|
| Hero | transparente | título à esquerda | domina a direita e o alto, saindo pelas bordas |
| Nossa metodologia | transparente | vídeo à esquerda, texto à direita | desce para a esquerda, atrás do vídeo, mais fundo na cena |
| Protocolo Revena | transparente | grade central de cinco cartões de vidro | no centro, desfocado, visto através dos cartões |
| Letreiro | transparente | faixa de letras grandes no meio da tela | atravessa o quadro na horizontal, atrás das letras |
| Palco dos planos | claro, sólido | (coberto) | a renderização pausa |
| Perguntas | transparente | frase-âncora em cima, perguntas em grade 2 × 2 | à direita da frase; recua quando as perguntas entram |
| Resultados até o Sobre | sólidos | (coberto) | a renderização pausa |
| Formulário | transparente | texto à esquerda, cartão à direita | emoldura o cartão do formulário e fecha a história |

### Cartões de vidro (dobra do Protocolo Revena)

- Fundo preto a 55%, desfoque de 22 px sobre o que está atrás, com leve
  saturação. Fio claro de 1 px a 12%, brilho interno de 1 px na borda de cima
  e raio de 16 px.
- O ícone fica em amarelo, o título em papel e o texto em cinza.
- No hover, o cartão clareia um pouco e a borda fica mais visível, sem pulo e
  sem sombra dura.

### Requisitos técnicos

- **Stack**: Astro 5, CSS próprio, TypeScript nos scripts. A única dependência
  é three.js, que já está no projeto. Sem React e sem biblioteca de scroll.
- **Carregamento**: a cena entra por import dinâmico, depois que a página
  pintou o texto da hero. O texto nunca espera o 3D.
- **Resolução**: limitada a 1,5 vez a densidade da tela no desktop e a 1 vez
  no celular.
- **Pausa**: um `IntersectionObserver` sobre as dobras transparentes desliga o
  laço de animação quando nenhuma está na tela. A aba oculta também pausa.
- **Quadros-chave medidos nas dobras reais**: recalculados no
  redimensionamento e quando as fontes terminam de carregar. As posições são
  frações da área visível, para funcionar em qualquer tela.
- **Celular**: mesma coreografia, com o elemento mais centralizado atrás do
  texto e menos geometria (menos pontos ou uma malha menor).
- **Movimento reduzido**: sem vida própria e sem amortecimento. O elemento
  aparece parado no estado da dobra atual.
- **Sem WebGL**: nenhuma mensagem de erro; a página segue com o fundo preto.
- **Acessibilidade**: a camada é decorativa, com `aria-hidden`.

### Critérios de aceite

1. Lê como um ambiente só, do começo ao fim, e nunca como animações soltas por
   dobra.
2. O elemento nunca disputa com o texto. Ele fica no espaço negativo e o texto
   passa de 4,5:1.
3. A rolagem nunca trava nem pula: 60 quadros por segundo num MacBook Air
   recente e nada abaixo de 30 num celular médio.
4. O peso extra da página fica abaixo de 200 KB comprimidos.
5. A hero é legível desde o primeiro quadro, antes do 3D chegar.
6. Com movimento reduzido, nada se mexe sozinho.
7. A primeira sensação é de elegância e calma. A tecnologia fica invisível.

### Não fazer

- Não usar linhas ligando pontos, grades em perspectiva com cara de rede,
  neon, glitch, aberração cromática nem elementos de interface futurista.
- Não usar azul, roxo ou qualquer cor fora da paleta.
- Não mostrar o elemento inteiro e centralizado, como um produto.
- Não prender dobras novas ao scroll. O palco dos planos já é preso.
- Não mudar a copy nem o layout das dobras. Só o fundo e os cartões dos
  pilares mudam.

---

### Bloco do caminho A: Escultura

- **Forma**: uma lâmina contínua, de 0,8 a 1,2 unidade de largura, construída
  ao longo de uma curva spline (Catmull-Rom com 6 a 8 pontos de controle). A
  espessura é mínima, as bordas são arredondadas e o comprimento tem de 12 a
  20 nervuras rasas.
- **Material**: cetim grafite `#141413`, rugosidade de 0,35 a 0,45, brilho de
  tecido (sheen) quente e verniz baixo. A cor só aparece onde a luz rasante
  bate.
- **Vida própria**: uma onda viajante de baixa amplitude percorre a lâmina, e
  ela gira levemente no próprio eixo.
- **Quadros-chave**:

  | Dobra | Estado da lâmina |
  |---|---|
  | Hero | Arco monumental que entra pela borda direita, sobe e sai pelo alto. |
  | Nossa metodologia | A curva se fecha e desce como um S vertical atrás do vídeo. |
  | Protocolo Revena | Vira uma onda horizontal, larga e baixa, atrás dos cartões. |
  | Letreiro | Estica numa diagonal suave que cruza a faixa de letras. |
  | Perguntas | Enrola-se numa espiral aberta à direita. |
  | Formulário | A espiral se fecha num túnel, com o cartão do formulário na boca. |

- **Técnica**: interpolar os pontos de controle entre os quadros e reconstruir
  a malha a cada quadro, com cerca de 400 × 24 vértices. A alternativa é
  deformar no vertex shader a partir de uma curva guardada numa textura.

### Bloco do caminho B: Partículas

- **Campo**: de 24 mil a 32 mil pontos no desktop e de 10 mil a 12 mil no
  celular. Cada ponto é um disco macio, com gradiente radial no fragment
  shader e sem contorno.
- **Cor**: 80% dos pontos entre `#FFD103` e `#FFEBA3`, 20% em papel
  `#F2F2EE`, com leve variação aleatória de brilho. Mistura aditiva, contida
  para não estourar.
- **Profundidade**: o tamanho do ponto cresce com a distância do plano de
  foco. Fora de foco, o ponto fica maior, mais transparente e mais macio
  (bokeh), como na referência da onda dourada.
- **Formas por dobra**, todas simples e com o mesmo número de pontos:

  | Dobra | Forma | O que representa |
  |---|---|---|
  | Hero | **Onda**: uma superfície de pontos em grade regular, larga, que cruza a metade de baixo da tela, sobe à direita e ondula devagar. | o mercado em movimento |
  | Nossa metodologia | **Três anéis**, de tamanhos e planos diferentes, atrás do vídeo. | marketing, comercial e operação |
  | Protocolo Revena | **Esfera**: os três anéis se fundem numa esfera de pontos, grande e desfocada atrás dos cartões. | o sistema integrado |
  | Letreiro | **Horizonte**: a esfera se abre num plano calmo, uma linha de horizonte atrás das letras. | a operação estável |
  | Perguntas | **Curva ascendente**: o plano sobe numa onda que cresce da esquerda para a direita, à direita da frase. | o crescimento |
  | Formulário | **Portal**: os pontos formam um túnel em perspectiva, com o cartão do formulário no centro da boca. | a conversa com a Renke |

- **Transição**: cada ponto tem um atraso próprio, de 0 a 35% da transição,
  definido pela posição. Assim a forma se desfaz e se refaz como um cardume,
  varrendo a tela de um lado para o outro. Um ruído de curl de baixa amplitude
  mantém os pontos vivos quando parados.
- **Correspondência**: os pontos de todas as formas são ordenados pelo mesmo
  critério espacial, por exemplo ângulo e altura. Assim cada ponto viaja
  pouco e nunca cruza a tela inteira. É isso que deixa a transição elegante,
  e não caótica.
- **Técnica**: `THREE.Points` com `ShaderMaterial`. As posições de cada forma
  ficam em atributos ou numa textura, e o vertex shader mistura a forma atual
  e a próxima pelo progresso do scroll. Sem física na CPU.

### Bloco do caminho C: Superfície

- **Forma**: um plano de cerca de 12 × 12 unidades, com malha de 256 × 256
  (128 × 128 no celular). O vertex shader o desloca com ondas concêntricas
  amortecidas, vindas de um ou dois centros. As cristas são largas e
  arredondadas, nunca pontudas.
- **Material**: preto polido `#070707`, rugosidade de 0,18 a 0,25 e verniz
  cheio. A luz vem de três fontes:
  - um reflexo de estúdio suave (`RoomEnvironment`);
  - uma luz de faixa amarela, rasante, que acende as cristas;
  - um contorno frio do lado oposto.
- **Vida própria**: as ondas se propagam para fora bem devagar, com um anel
  novo a cada 6 s mais ou menos, como uma gota em óleo.
- **Quadros-chave**:

  | Dobra | Estado da superfície |
  |---|---|
  | Hero | Vista de frente, como a referência dos anéis pretos. O centro das ondas fica à direita, e os anéis maiores saem da tela. |
  | Nossa metodologia | A câmera inclina, e as ondas viram um relevo em perspectiva na parte de baixo e à esquerda. |
  | Protocolo Revena | A superfície se acalma, quase lisa. Só um reflexo largo e amarelo atravessa, desfocado pelos cartões. |
  | Letreiro | Um pulso único cruza a tela na horizontal, atrás das letras. |
  | Perguntas | Nasce um novo centro de ondas à direita da frase. |
  | Formulário | A câmera volta para a frente, e as ondas emolduram o cartão como um túnel raso. |

- **Técnica**: `MeshPhysicalMaterial` com `onBeforeCompile` para o
  deslocamento. As normais saem de diferenças finitas no próprio shader.

---

## 5. Prompts de imagem de conceito

Servem para travar a estética antes do código, numa IA de imagem. Estão em
inglês porque essas ferramentas respondem melhor assim.

**A. Escultura**

```text
A single wide ribbon of graphite satin with soft longitudinal ribs, sweeping in
a monumental arc across a pure black frame and leaving through the edges, warm
golden light (#FFD103) grazing only the crest of the curve, faint cool rim
light on the opposite edge, luxury fashion and architecture aesthetic, calm,
minimal, generous empty black space on the left for text, shallow depth of
field, no text, no neon, no sci-fi, 16:9, photorealistic render
```

**B. Partículas**

```text
Thousands of tiny soft golden light particles (#FFD103 and warm white) arranged
in an orderly grid forming a wide, calm wave across the lower half of a pure
black frame, rising to the right, very shallow depth of field with large soft
bokeh in the foreground, elegant, minimal, premium, no connecting lines, no
network, no neon, no sci-fi, generous empty black space in the upper left for
text, 16:9, photorealistic
```

Variação para a dobra dos três anéis:

```text
Thousands of tiny soft golden light particles forming three thin concentric
rings tilted on different axes, slowly merging into one sphere, pure black
background, shallow depth of field with soft bokeh, calm and elegant, no
connecting lines, no text, 16:9
```

**C. Superfície**

```text
Concentric soft rounded ripples on a surface of polished black liquid like oil
or lacquer, seen from the front, the center of the ripples on the right side of
the frame with the outer rings cropped by the edges, only the crests catch
light, a thin warm golden highlight (#FFD103) on one side and a faint cool
white rim on the other, black on black, calm, luxurious, jewelry product
photography, no text, 16:9, photorealistic render
```

---

## 6. Próximos passos

1. ~~Protótipo no laboratório, com seletor e sem tocar na home.~~ Feito em
   `/laboratorio/fundo`, com os caminhos B e C (parte 7). Os anéis continuam
   em `/laboratorio/aneis`.
2. A Lenora compara os dois e escolhe um.
3. Ajuste fino junto com ela: posição por dobra, intensidade da luz e
   velocidade.
4. Levar para a home.

---

## 7. Roteiro detalhado de execução

Esta parte completa o prompt da parte 4. É o que foi usado para construir
os protótipos, e vale como especificação para qualquer ajuste daqui para a
frente.

### 7.1 A dinâmica dos vídeos, em regras

1. **Parado na dobra, transformando na passagem.** Enquanto uma dobra ocupa
   a tela, o fundo fica no quadro dela e só respira. Conta como ocupando a
   tela do momento em que o topo da dobra chega a 15% da altura até a base
   chegar a 85%. A transformação acontece na passagem, enquanto a divisa
   entre duas dobras atravessa a tela de 85% a 15%. É o que se vê nos
   vídeos: o objeto se acomoda enquanto se lê e muda quando a seção muda.
2. **O scroll é a agulha.** A transformação é presa ao scroll, não a um
   tempo. Rolar para trás desfaz o caminho. Tudo passa por amortecimento de
   cerca de 220 ms, para nunca dar tranco.
3. **O scroll mexe também dentro da forma.** Mesmo parado num quadro, rolar
   gira os anéis e a esfera, faz a fita correr, gira o portal e empurra as
   ondas para fora. Rolar rápido dá um pouco de agitação, que se acalma em
   meio segundo.
4. **Salto longo não atravessa a página.** Num clique do menu, aparece só a
   última passagem, e não todas as formas em sequência.
5. **Dobra coberta prepara a próxima.** Enquanto o palco dos planos (claro)
   cobre a tela, o fundo já vai para o quadro das perguntas. Quando a cortina
   sobe, a cena está pronta. O mesmo vale para Resultados e para o convite
   amarelo, que preparam a Academy.
6. **Todas as dobras escuras participam**, incluindo Academy e Sobre, que no
   protótipo dos anéis eram sólidas. Só as dobras claras e a amarela cobrem o
   fundo.

### 7.2 Legibilidade garantida pelo código

O fundo não depende de estar no lugar certo para o texto ser lido.

- **Máscara de leitura.** A cada quadro, o motor mede o retângulo justo de
  cada bloco de texto visível, até dez por vez. O fundo escurece 85% atrás
  deles, com uma borda macia de 90 px (60 px no celular), como uma sombra de
  luz. O retângulo é o do texto, não o da caixa, então um título curto numa
  coluna larga não apaga a tela inteira.
- **Blocos protegidos**:
  - na hero: selo, título, lead, botão e prova;
  - na metodologia: título, descrição e números;
  - nos pilares: o título do Protocolo Revena;
  - no letreiro: as letras, com escurecimento menor (55% nas partículas, 75%
    na superfície) para o fundo ainda passar por trás delas;
  - nas perguntas: a frase-âncora e as perguntas;
  - no fim da página: os títulos da Academy, do Sobre e do formulário.
- **Cartões** ficam fora da máscara, porque o vidro já cuida deles.
- **Exposição por dobra.** Cada quadro tem o seu brilho. Onde a luz ficaria
  forte demais (metodologia, Academy, formulário na superfície), ele cai.

### 7.3 Vidro em todo cartão sobre o fundo

- **Onde**:
  - os cinco cartões do Protocolo Revena;
  - os dois cartões da Academy e do Tools;
  - o cartão do formulário;
  - a pílula do selo da hero.
- **Receita**:
  - fundo preto a 55%;
  - desfoque de 22 px com saturação de 1,25;
  - fio claro de 1 px a 12%;
  - brilho interno de 1 px na borda de cima;
  - raio de 16 px e sombra longa e macia embaixo.
- **Hover**: o fundo sobe para 62% e o fio para 20%.
- **Fora do vidro**: as fotos do Sobre continuam opacas, porque são fotos.

### 7.4 Mapa das dobras (medido em 1440 × 900)

| Dobra | Fundo | Onde está o conteúdo | Espaço livre para o elemento |
|---|---|---|---|
| Hero | vivo | título, lead e botão à esquerda; retratos embaixo à direita | a direita e a metade de baixo |
| Metodologia | vivo | vídeo de 357 × 635 px à esquerda; texto e números à direita | em volta do vídeo |
| Protocolo Revena | vivo | título no alto; cinco cartões de vidro em 3 + 2 | atrás e entre os cartões |
| Letreiro | vivo | faixa de letras de ponta a ponta, 248 px de altura | acima e abaixo das letras |
| Palco dos planos | coberto | — | — |
| Perguntas | vivo | frase em duas linhas no alto; perguntas em grade 2 × 2 | alto à direita e entre as colunas |
| Resultados e convite | cobertos | — | — |
| Academy | vivo | dois cartões grandes lado a lado | embaixo e através do vidro |
| Sobre | vivo | texto e fotos em carrossel horizontal preso | frestas entre as fotos |
| Formulário | vivo | texto à esquerda; cartão de 460 px à direita | em volta do cartão |

### 7.5 Cenas do caminho B: partículas

26.880 pontos no desktop (grade de 240 × 112) e 10.200 no celular (150 × 68).
O ponto nítido tem 2,5 px (2,1 px no celular). Fora de foco, ele cresce até
virar bokeh e perde brilho na mesma proporção. O que está mais perto acende,
o que está no fundo apaga.

| Dobra | Forma | Onde e como |
|---|---|---|
| Hero | **Onda** | Malha regular ocupando a metade de baixo e subindo à direita, maior que a tela. Inclinada para que se veja a superfície de cima, com as cristas mais acesas. É a referência da malha de pontos. |
| Metodologia | **Três anéis** | Em cascata, centrados no vídeo, com raio de cerca de 420 px para aparecerem em volta dele. Cada um num plano, balançando devagar; o scroll os gira. |
| Protocolo Revena | **Esfera** | Cerca de 740 px de diâmetro, um pouco mais funda e fora de foco, no centro, vista pelos cartões de vidro. Os anéis inflam até virar a esfera; o scroll a gira. |
| Letreiro | **Fita** | Uma fita torcida que atravessa a tela na altura das letras e corre na horizontal com o scroll, com as pontas apagadas fora da tela. |
| Perguntas | **Curva ascendente** | A onda volta subindo da esquerda para o alto à direita, ao lado da frase, passando atrás das perguntas com a máscara. |
| Academy | **Horizonte** | A onda calma e baixa, como um chão de luz sob os dois cartões. |
| Sobre | **Respiro** | Só 6% dos pontos acesos, grandes e desfocados, atrás das fotos. |
| Formulário | **Portal** | Túnel em espiral visto de frente, com a boca em volta do cartão. O eixo aponta para a câmera mesmo fora do centro, e o scroll gira o túnel. |

Na passagem, cada ponto parte no seu tempo, com atraso de 0 a 40%,
varrendo da esquerda para a direita, e faz uma curva no meio do caminho
(cardume). Todas as formas usam a mesma grade, com u na horizontal ou em
volta do eixo, então cada ponto viaja pouco.

### 7.6 Cenas do caminho C: superfície

Um disco de malha polar com 200 anéis × 256 segmentos (110 × 144 no
celular). As ondas concêntricas têm crista redonda e vale largo. O material é
preto polido (`#131210`, metal 0,7, rugosidade 0,2, verniz cheio). O estúdio
refletido tem três faixas:

- uma amarela, alta, à direita;
- uma clara, macia, em cima;
- uma fria, à esquerda.

O estúdio gira a cada dobra, e o reflexo amarelo corre pelas cristas.

| Dobra | Onde e como |
|---|---|
| Hero | Quase de frente (13°), como a referência dos anéis pretos. O centro das ondas fica à direita do título, a 73% da largura, e os anéis maiores saem pela borda. |
| Metodologia | A câmera deita (57°), e as ondas viram relevo em perspectiva embaixo, à esquerda, passando atrás do vídeo. Exposição mais baixa. |
| Protocolo Revena | Superfície quase lisa. Só um reflexo largo e dourado passa atrás dos cartões de vidro. |
| Letreiro | Rasante (69°). Uma onda solitária cruza atrás das letras, com uma faixa escura de leitura. |
| Perguntas | Um novo centro nasce no alto à direita, discreto. |
| Academy | Chão calmo e baixo sob os cartões. |
| Sobre | Mais escura, embaixo à esquerda, atrás das fotos. |
| Formulário | De frente de novo. As ondas emolduram o cartão e o centro afunda como um túnel raso. |

### 7.7 Onde está no código

- `src/components/laboratorio/fundo-motor.ts`: o motor comum, com o roteiro
  medido, as passagens, o amortecimento, a máscara de leitura, as pausas e
  os casos sem WebGL e de movimento reduzido.
- `src/components/laboratorio/fundo-particulas.ts`: o caminho B, com os
  quadros de cada dobra no topo do arquivo.
- `src/components/laboratorio/fundo-superficie.ts`: o caminho C, com os
  quadros no mesmo lugar.
- `src/components/laboratorio/FundoVivo.astro` e
  `src/pages/laboratorio/fundo.astro`: a página de teste, com o seletor
  (`?fundo=particulas` ou `?fundo=superficie`) e o vidro nos cartões.
