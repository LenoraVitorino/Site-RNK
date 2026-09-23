# Prompt — Hero com os três anéis e o fundo que atravessa as dobras

Documento de 22/09/2026. Serve para duas coisas: como prompt completo para uma
IA de código ou um dev criativo construir a animação, e como especificação do
protótipo em `/laboratorio/aneis`. O fim do arquivo traz também um prompt curto,
em inglês, para gerar imagens de conceito numa IA de imagem.

---

## 1. Análise das referências

Três pins do Pinterest enviados pela Lenora em 22/09. Os três vêm do mesmo
ecossistema de sites (PeachWeb e Ascend), e cada um ensina uma coisa.

| Referência | O que acontece | O que levamos |
|---|---|---|
| `pin.it/2gQzXmCFM` — "Hero Section UI" | Discos de vidro fosco, empilhados em diagonal como lentes, giram devagar sobre um degradê cobre. A câmera se aproxima aos poucos. Título grande embaixo à esquerda, CTA embaixo à direita, tudo dentro de uma moldura arredondada. | O **material**: vidro fosco que refrata a cor de trás. O **ritmo**: movimento lento, contínuo, sem pressa. |
| `pin.it/56Y1Cwf8Q` — Ascend, agência web3 | Um único objeto 3D, uma fita nervurada em preto e branco, atravessa a página. Na hero é um arco monumental; na segunda dobra vira espiral à direita do texto; na terceira vai para a esquerda, atrás dos logos; no fim vira um túnel e o CTA fica dentro dele. | A **continuidade**: um objeto só, que muda de lugar e de forma a cada dobra e costura o site. O **final em túnel**. |
| `pin.it/54to2u8Ds` — "Features Section UI" | Continuação do primeiro site. O disco de vidro da hero segue nas dobras seguintes. Texto fixo à esquerda, cartões escuros e translúcidos rolando à direita, com o disco aparecendo desfocado através deles. Na dobra de números, um cartão branco sólido destaca o número ativo entre cartões de vidro. | Os **cartões de vidro**: escuros, translúcidos, com desfoque do que está atrás, fio claro de 1 px e brilho discreto na borda de cima. |

O que **não** levamos: o degradê cobre (a Renke é preto, papel e amarelo), a
serifa itálica da Ascend (a Renke é Inter fina) e qualquer cara de "web3".

---

## 2. O prompt

> Copie a partir daqui para usar numa IA de código.

### Papel

Você é um desenvolvedor criativo sênior, especialista em WebGL com three.js,
direção de arte de sites premiados e performance. Vai implementar uma camada de
fundo 3D, contínua e guiada pelo scroll, na home do site institucional da
**Renke**, uma assessoria de Revenue Operations (RevOps) para clínicas médicas
de alto padrão.

### Contexto de negócio

- A mensagem central do site: **a Renke não é agência de marketing, é RevOps**.
  Ela conecta marketing, comercial e operação num sistema só.
- Quem lê: donos e donas de clínicas de alto padrão (dermatologia, cirurgia
  plástica, nutrologia). Gente acostumada com consultórios bonitos, marcas de
  luxo e atendimento impecável.
- Por isso o tom é **soft, elegante e moderno — mais joalheria e arquitetura
  do que tecnologia**. Nada de redes de pontos, circuitos, neon, glitch,
  partículas "digitais" ou estética de startup de software.

### O objeto: três anéis que se encaixam

- **Três anéis concêntricos**, de tamanhos diferentes, que representam
  marketing, comercial e operação. Na hero eles estão soltos, cada um num
  plano diferente, como um giroscópio parado no ar. Conforme a página desce,
  giram até ficar no mesmo plano e se aninham um dentro do outro: o sistema
  conectado. É a mesma linguagem dos ícones dos planos do site, que se montam
  a partir de duas metades.
- **Forma**: cada anel é uma arruela de borda arredondada — seção transversal
  retangular com cantos bem suaves, mais larga do que alta. Nunca um tubo fino
  de rosquinha. Proporção sugerida para o anel maior: raio externo 1,55, raio
  interno 1,30, altura 0,16, raio de canto 0,06. Os outros dois repetem a
  proporção com raios externos de 1,20 e 0,85, deixando 0,10 de folga entre
  eles quando aninhados.
- **Material**: vidro fosco âmbar. Transmissão alta, rugosidade entre 0,25 e
  0,35 para o fosco, índice de refração 1,5, espessura perceptível, cor de
  atenuação no amarelo da marca e verniz (clearcoat) leve por cima. Um brilho
  próprio mínimo para o amarelo não apagar sobre o preto. O resultado deve
  lembrar resina âmbar polida ou vidro de perfume, não plástico.
- **Cores** da marca: amarelo `#FFD103`, amarelo claro `#FFEBA3`, papel
  `#F2F2EE`, preto `#000000`, grafite `#161616`. O amarelo é a única cor.
- **Luz**: ambiente de estúdio suave para os reflexos (o `RoomEnvironment` do
  próprio three.js serve, sem baixar HDRI), uma luz principal quente vinda de
  cima à direita e um contorno frio e fraco por trás. Mapeamento de tom
  neutro, para o amarelo sair fiel.
- **Atrás dos anéis**, dentro da cena, um brilho radial âmbar muito sutil sobre
  o preto, que o vidro refrata. Ele acompanha o objeto pela página.

### Princípios de movimento

1. **Lento e contínuo.** Nada acelera de repente. Toda mudança de estado passa
   por amortecimento exponencial, com meia-vida em torno de 120 ms.
2. **O scroll comanda, mas nunca trava.** A camada acompanha o scroll nativo.
   Proibido prender a rolagem, criar snap ou sequestrar a roda do mouse.
3. **Vida própria mínima.** Parados, os anéis respiram: um giro bem lento de
   cada anel no seu eixo quando soltos, e do conjunto quando encaixado.
4. **O mouse aproxima, não sacode.** Paralaxe de no máximo 5 graus no
   conjunto, seguindo o ponteiro com amortecimento. Só em telas com mouse.
5. **Entrada da hero.** Ao carregar, os anéis surgem com fade e leve
   crescimento em 1,6 s. Quando o título troca para "Isso é RevOps.", cerca de
   3 s depois, eles se voltam um pouco para o centro, como quem presta atenção.

### Coreografia por dobra

Uma única tela `<canvas>` fixa atrás da página inteira. As dobras escuras
ficam com fundo transparente e deixam ver os anéis. As dobras claras e a
amarela são sólidas e sobem por cima deles, como uma cortina. Cada linha da
tabela é um quadro-chave, alcançado quando o topo da dobra chega ao meio da
tela; entre dois quadros, o estado é interpolado com suavização.

| Dobra | Fundo | Estado dos anéis |
|---|---|---|
| Hero | transparente | À direita do título, grandes: o diâmetro externo ocupa cerca de 60% da altura da tela. Soltos, em planos diferentes, girando devagar. |
| Nossa metodologia | transparente | Descem e vão para trás do vídeo, à esquerda, um pouco mais fundo na cena. Começam a se alinhar. |
| Protocolo Revena, cinco cartões | transparente | Centralizados atrás da grade de cartões de vidro, quase encaixados. Aparecem desfocados através dos cartões. |
| Letreiro | transparente | Encaixados, no centro, girando como uma peça só, por trás das letras grandes. |
| Palco dos planos | claro sólido | Cobertos pela dobra clara. A renderização pausa. |
| Perguntas | transparente | Voltam encaixados, à direita da frase "Uma operação estruturada muda a forma como sua clínica cresce", girando como uma peça só. |
| Resultados até o Sobre | sólidos | Cobertos. Pausa. |
| Formulário | transparente | Final: os anéis se afastam em profundidade e viram um túnel que moldura o cartão do formulário, à direita. |

### Cartões de vidro na dobra dos pilares

- Fundo preto a 38% de opacidade, desfoque do que está atrás de 22 px com
  leve saturação, fio claro de 1 px a 12% e um brilho interno de 1 px na borda
  de cima. Raio de 16 px.
- O ícone de cada pilar fica em amarelo; título em papel; texto em cinza.
- No hover o cartão fica um pouco mais claro e a borda um pouco mais visível.
  Sem pulo nem sombra dura.
- Variante para estudar depois: texto fixo à esquerda e cartões rolando à
  direita, como na terceira referência.

### Requisitos técnicos

- **Stack**: Astro 5, CSS próprio, TypeScript nos scripts. three.js como única
  dependência nova. Sem React, sem biblioteca de scroll.
- **Carregamento**: a cena carrega por import dinâmico depois que a página
  pintou o texto da hero. O texto nunca espera o 3D.
- **Uma tela só**: um `<canvas>` fixo, atrás do conteúdo, sem eventos de
  ponteiro. Resolução limitada a 1,5 vez a densidade da tela no desktop e a 1
  vez no celular.
- **Pausa**: um `IntersectionObserver` sobre as dobras transparentes desliga o
  laço de animação quando nenhuma está na tela, e a aba oculta também pausa.
- **Quadros-chave medidos das dobras reais**, recalculados no redimensionamento
  e quando as fontes terminam de carregar. Posições em frações da largura e da
  altura visíveis, para funcionar em qualquer tela.
- **Celular**: mesma coreografia, com anéis menores e centralizados atrás do
  texto, menos segmentos na geometria e sem transmissão real — um material
  acetinado que imita o vidro.
- **Movimento reduzido**: sem giro próprio e sem amortecimento. Os anéis
  aparecem parados no estado da dobra atual.
- **Sem WebGL**: nenhuma mensagem de erro; a página segue com o fundo preto.
- **Acessibilidade**: a camada é decorativa, com `aria-hidden`. Nenhum texto
  depende dela para ter contraste: o texto claro precisa passar de 4,5:1 sobre
  o ponto mais claro dos anéis, com um véu escuro atrás do texto se preciso.

### Critérios de aceite

1. O movimento lê como um objeto só atravessando a página, nunca como
   animações soltas por dobra.
2. Em nenhum momento a rolagem trava, pula ou fica pesada. 60 quadros por
   segundo num MacBook Air recente; nada abaixo de 30 num celular médio.
3. O peso extra da página fica abaixo de 200 KB comprimidos.
4. A hero continua legível desde o primeiro quadro, antes do 3D chegar.
5. Com movimento reduzido, nada gira.
6. A pessoa sente elegância e calma antes de sentir tecnologia.

### Não fazer

- Não usar partículas, linhas conectando pontos, grades em perspectiva, neon,
  distorção de vidro exagerada ou cromático aberrante.
- Não prender dobras novas ao scroll. O site já tem o palco dos planos preso.
- Não mudar a copy nem o layout das dobras, só o fundo e os cartões.

---

## 3. Prompt de imagem de conceito

Para gerar quadros de referência numa IA de imagem, antes ou durante a
implementação. Em inglês, porque essas ferramentas respondem melhor assim.

```text
Three concentric flat rings of frosted amber glass, softly rounded edges like
polished resin washers, floating in a pure black void, each ring tilted on a
different axis like a still gyroscope, subtle warm amber glow behind them
refracting through the glass, soft studio lighting from the upper right, faint
cool rim light, luxury jewelry product photography, calm, elegant, minimal,
high-end aesthetic clinic brand, brand yellow #FFD103 as the only color, no
text, no particles, no neon, no sci-fi, shallow depth of field, 16:9, ultra
detailed, photorealistic render
```

Variação para o final em túnel:

```text
Three frosted amber glass rings aligned on the same axis at different depths,
seen from the front, forming a soft glowing tunnel in a black void, calm and
elegant, luxury product lighting, brand yellow #FFD103, no text, 16:9
```
