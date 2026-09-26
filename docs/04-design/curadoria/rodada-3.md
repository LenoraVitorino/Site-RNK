# Rodada 3 (26/09/2026): a referência fiel e o mapeamento por dobra

A Lenora reprovou a rodada 2 ("não gostei do que você construiu") e pediu:
extrair fielmente o fundo de https://curious-mepp4bd.peachweb.site/, aplicar
as caixas translúcidas, a seção "Features" na dobra 3, a "Solutions" na dobra
6 (e avaliar reduzir os sete itens), fazer a dobra 2 mais dinâmica, tirar a
textura do palco e resolver as fotos, que pareciam de baixa qualidade. E
rever as referências do Pinterest mapeando as que encaixam em copy e layout.

## O que a referência é, de verdade

A cena da PeachWeb foi extraída do estado do engine dela (objetos, materiais,
luzes, efeitos e a folha de animação por scroll):

- **Cena:** fundo preto com névoa (10 a 20), câmera fov 30 a z 8,4, inclinação
  de 1° pelo mouse. Um plano cinza (#464646) atrás, iluminado por pontos de luz
  e por um spot com **cáusticas em vídeo** (é o que dá o ar enfumaçado).
- **Objetos:** um toro ("Twist Shape Loop", morph em loop) em metal escuro
  (#232323, metalness .92, roughness .45, clearcoat .4, sheen .96) com env map
  de arcos cromados; uma "minhoca" ondulada em cromo (metalness .97) que só
  aparece na seção Solutions e, desfocada, vira a nuvem clara.
- **Pós:** SMAA, vinheta (offset .2, força .5), ACES, brilho +.03 a 10 %,
  **grão** (soft light a 30 %) e um **desfoque radial** que deixa nítido só um
  raio de 10 % em volta do mouse (a Lenora não quis o mouse: o centro é fixo).
- **Coreografia:** hero com o toro grande e escuro ao fundo; Product com o
  toro perto da câmera à direita, encolhendo; Features preto; Solutions com a
  minhoca subindo e crescendo (9,8 → 19,7); Pricing com a câmera subindo.

Os modelos e os env maps são de terceiros (Sketchfab, Shutterstock): não
entram no site. Geometria e env maps foram refeitos; materiais, luzes, névoa,
efeitos e coreografia são os da referência, transcritos.

Implementação: `src/components/laboratorio/fundo-cena.ts`, página
`/laboratorio/cena`. Especificação completa da extração: guardada em
`docs/04-design/curadoria/cena-peachweb.md`.

## As caixas

A referência usa `#ffffff14` com `backdrop-filter: blur(25–30px)` e raio 8 a
12. No site: `.vidro` (branco a 7 %, blur 28, raio 12, fio a 9 %). Vale para os
cartões dos pilares, as caixas da dobra 6, os produtos do Ecossistema, o
painel da metodologia e a moldura das fotos.

## Mapeamento por dobra (o que encaixa em copy e layout)

| Dobra | Referência | Por que encaixa | O que foi feito |
|---|---|---|---|
| Fundo | PeachWeb curious (fiel); Alukaze (pin 3) confirma: seda enfumaçada em preto e amarelo só num ponto | É o pedido; Alukaze mostra o mesmo material com o amarelo como detalhe | Cena refeita 1:1 (materiais, luzes, efeitos, coreografia) |
| 2 · Nossa metodologia | Seção **Product** da referência + o pin do diagrama de nós (fig. 20) | A copy diz "a partir de dados, CRM e marketing": os três viram nós que entram no R e saem como operação de receita | Painel de vidro: título e descrição em cima, sistema conectado com pulsos nos fios ao lado do reel, três números no pé. Sem capítulos por scroll |
| 3 · Protocolo Revena | Seção **Features** + Vivid Motion (pin 1: fileira de cartões, cada um com a sua arte) | Cinco pilares com título e uma linha: é exatamente o formato | Cinco cartões de vidro com arte em traço fino sobre clarão granulado (`public/arte/pilar-*.svg`), sem trava. Em telas médias e no celular a fileira rola de lado |
| 5 · Palco dos planos | (sem textura, a pedido) | | Textura retirada; os tons lisos ficam até a próxima ideia |
| 6 · Uma operação estruturada | Seção **Solutions** | Título preso à esquerda, caixas de vidro empilhadas à direita, uma foto dentro de uma caixa | Quatro itens no estúdio (os três "excedentes" da nota D8 ficam de fora; a copy integral segue com sete), duas fotos em moldura |
| Ecossistema | Features (arte) | Mesma linguagem das artes dos pilares | Tools ganhou a arte de camadas; caixas de vidro |
| Conheça a Renke | QClay (pin 2): fotos em ladrilhos dentro da composição | As fotos com grão só aguentam tamanho menor que o original | Moldura de vidro à direita, presa por uma tela e meia, fotos por cortina; nunca em tela cheia |

## Fotos

O grão que a Lenora aplicou vira "baixa qualidade" quando a foto é ampliada
além do arquivo (2200 px numa tela 2× de largura cheia). Regra: a foto nunca
passa de ~820 px de CSS (1640 px em 2×), sempre em moldura, qualidade 78.

## O que ficou de fora e por quê

- Vivid Motion como estética (vidro azul 3D): só a estrutura da fileira; os
  objetos coloridos não cabem na base neutra.
- Nexora (fig. 21): cara de agência; só a ideia das fotos em moldura.
- O desfoque seguindo o mouse: a Lenora reprovou na rodada 1.
