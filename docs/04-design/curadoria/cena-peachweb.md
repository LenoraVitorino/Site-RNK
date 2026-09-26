# Fundo fiel à cena "curious" da PeachWeb (https://curious-mepp4bd.peachweb.site/)

Objetivo: reproduzir com fidelidade a cena 3D de fundo dessa referência no site da Renke,
num arquivo novo `src/components/laboratorio/fundo-cena.ts`, exportando `iniciar(canvas)` no
mesmo molde de `fundo-prata.ts` (que usa o motor `fundo-motor.ts`). A página de teste é
`/laboratorio/prata` (FundoVivo já aceita `fundo="cena"`; use `?fundo=` não, a prop está fixa
na página `src/pages/laboratorio/cena.astro`).

A Lenora (dona do site) reprovou a tentativa anterior (`fundo-prata.ts`, um toro com shader
próprio): "ficou péssima". Ela quer a cena da referência, fiel. Só duas diferenças pedidas:
1. sem o desfoque que segue o mouse (o efeito BLUR abaixo existe, mas com o centro fixo);
2. a passagem entre as dobras mais suave e lenta (o motor já amortece; use `tau: .9`,
   `curva: maisSuave`).

## Fonte da verdade
- `scratchpad/peach/cena.json`: o estado do engine da referência (objetos, materiais, luzes,
  efeitos e a folha de animação por scroll). Tudo abaixo foi extraído dele.
- Screenshots da referência (da Lenora): `images/17.webp` (seção Product: toro escuro perto da
  câmera à direita, prata só no rebordo), `images/18.webp` (Features: preto), `images/19.webp`
  (Solutions: uma nuvem clara e enfumaçada, é a "minhoca" cromada gigante desfocada pelo BLUR).
  Hero da referência: um toro grande, escuro, inclinado, no centro-direita da tela, quase todo
  na sombra, com o rebordo prateado e fosco; grão fino por cima; vinheta.
- Env maps e vídeo de cáusticas da referência, só para estudo (NÃO usar no site, são assets de
  terceiros): `scratchpad/peach/ref/*.webp`, `scratchpad/peach/ref/video-caustics.mp4`, e
  `scratchpad/peach/ref/estudo.png` (prancha com os dois env maps e quadros das cáusticas).

## Licenças: o que NÃO copiar e o que fazer no lugar
- Os modelos GLB (donut "Twist Shape Loop", minhoca "Wavy") e os env maps são assets de
  terceiros (Sketchfab/Shutterstock). Não usar os arquivos. Gerar geometria própria e env maps
  próprios que produzam o mesmo visual:
  - **donut**: um toro (R≈1, r≈.36, com a pré-escala do objeto 1.505 × 1.04 × 1.135) com uma
    torção/respiração lenta em loop no vertex shader (`material.onBeforeCompile`, deslocando
    posição e normal), imitando os 11 morph targets em loop (duração 0.42 s a speed 0.08 ≈ 5 s).
    Segmentos altos (radial 96, tubular 256) para a reflexão ficar lisa.
  - **minhoca**: `TubeGeometry` ao longo de uma curva ondulada larga (senóide em 3D, ~6 ondas),
    raio fino relativo ao comprimento, com ondulação lenta no vertex shader (16 morphs em loop,
    0.5 s a speed 0.04 ≈ 12 s).
  - **env maps** (equiretangulares, gerados num canvas 2D ou por shader num render target, depois
    `PMREMGenerator`): alto contraste preto/branco com arcos e faixas lisas ("futuristic glossy
    distorted"), com um leve tom quente (#9d8159) nas transições. Ver `estudo.png`. São eles que
    dão as listras de seda ao metal.
  - **cáusticas**: em vez do vídeo, um shader de cáusticas procedurais (padrão clássico de
    Voronoi/ondas) renderizado a cada quadro num `WebGLRenderTarget` pequeno (256²) e usado como
    `spotLight.map`.

## A cena (unidades three.js; valores da referência)
- `Scene.background` #000000; `Fog` linear #000000 near 10 far 20.
- `AmbientLight` #ffffff, intensity 2.
- Câmera: `PerspectiveCamera` fov 30, near .1, far 1000, position (0, -0.0214, 8.392). Tilt pelo
  ponteiro: máximo ±1° (0.01745 rad) em x e y, com easing de 0.6 s (o motor já entrega
  `ponteiro` amortecido). Celular: mesma câmera com `zoom = 0.7`.
- "Camera Rig" (grupo pai da câmera): z 0 → -0.327 a partir do trecho 0.498 (Solutions/Pricing).
  Câmera y: -0.021 → 0.322 entre 0.498 e 0.596.
- Plano de fundo: `PlaneGeometry(1,1)` scale (26.98, 15.45, 1), z -10.43;
  `MeshStandardMaterial` color #464646, roughness 0.479, metalness 0.628. Z animado: -9.9 (0.085)
  → -11.33 (0.110) → -60.7 (0.129) (some na névoa; a seção Features é preta).
- Luzes (todas `PointLight` cor #d2d2d2, salvo o spot):
  - L1 "Top Right": pos (2.496, 2.109, -1.152) int 10 dist 35.38 decay 1.77 no hero →
    pos (14.916, -2.468, -6.834) int 0 dist 23.24 decay 1.33 em 0.095.
  - L2: pos (-0.437, 3.213, -1.455) int 17.49 dist 6.75 decay 0.33 → pos (-1.496, 2.196, 1.25) em 0.097.
  - L3: pos (0.104, 1.237, -4.391) dist 5.6 decay 0; int 8.95 (0) → 25 (0.176) → 0 (0.19).
  - L4: origem, int 3, dist 20, decay 2 (fixa).
  - L5: pos (0.104, -0.422, -6.129) dist 16.67 decay 0; int 0 (0.238) → 25 (0.275–0.343) → 0 (0.378).
  - Spot: pos (0.841, 10.603, -1.111), rotation x 0.63 (aponta para baixo/trás, para o plano de
    fundo), scale 0.704, int 11.84 (0–0.06) → 0 (0.101), angle 0.89, penumbra 0.418, dist 25.31,
    decay 0, `map` = textura de cáusticas (animada, loop).
- **Donut**: `MeshPhysicalMaterial` `DoubleSide`, color #232323, metalness 0.918, roughness 0.449,
  clearcoat 0.398, clearcoatRoughness 0.334, sheen 0.96, sheenRoughness 0.229, sheenColor #5e5e5e,
  ior 1.46, specularColor rgb(0.67,0.67,0.67), transmission 0, envMapIntensity 1, env map "arcos"
  com rotação 3.452 rad. Pai: grupo "Controller".
  - Controller: (0) pos (0, 1.321, 3.996) rot y 0 → (0.099) pos (1.188, 0, 3.996) rot y 1.5708 →
    (0.199) igual → (0.315) pos (0,0,0) rot y 0 → (0.400) igual.
  - Donut local: (0) pos (0.442, 0.205, -11.065) rot (1.223, -0.054, 0.085) scale (0.745, 0.875,
    0.752) → (0.098) pos (3.642, -0.335, 3.110) rot (4.129, 0.207, 1.278) scale (0.528, 0.309,
    0.472) → (0.150) pos (4.034, -0.431, 4.726) rot (4.469, 0.238, 1.418) scale (0.503, 0.242,
    0.439) → (0.197) mesma pose, scale (0.116, 0.056, 0.101) (some).
  - Como a geometria é própria, calibrar a escala do toro para a hero ficar como a referência: o
    anel ocupa uns 60–70 % da altura da tela, centro-direita, inclinado, quase todo na sombra
    (névoa + pouca luz), rebordo prateado no alto/direita.
- **Minhoca**: `MeshPhysicalMaterial` color #232323, metalness 0.965, roughness 0.261, clearcoat
  0.4, clearcoatRoughness 0.239, ior 1.5, specularColor #fff, env map "glossy distorcido" rotação
  1.498. Poses: (0.356) pos (-2.061, -10.242, -2.064) rot (-2.682, 0.352, -0.125) scale 9.844 →
  (0.420) pos (-1.118, -1.338, -3.614) rot (-0.806, -0.209, -0.267) scale 14.491 → (0.497) pos
  (-0.382, 1.266, -6.752) rot (-0.356, 0.227, -0.416) scale 19.744. Antes de 0.356: invisível
  (fora da tela, embaixo). É ela que vira a "nuvem" clara da seção Solutions (images/19.webp):
  cromo desfocado pelo BLUR, sem cor.
- **Pós-processamento** (pacote `postprocessing` 6.39.5, já instalado; é o mesmo que a referência
  usa), nesta ordem num `EffectPass` depois do `RenderPass`:
  1. `SMAAEffect` preset MEDIUM.
  2. `VignetteEffect` offset 0.2048, darkness 1, blendFunction NORMAL, `blendMode.opacity` 0.5.
  3. `ToneMappingEffect` mode ACES_FILMIC (renderer.toneMapping = NoToneMapping, o efeito faz).
  4. `BrightnessContrastEffect` brightness 0.03, contrast 0, blendFunction ALPHA, opacity 0.1.
  5. `NoiseEffect` premultiply false, blendFunction SOFT_LIGHT, opacity 0.3 (grão fino, animado).
  6. Efeito BLUR custom (classe `Effect` do postprocessing) com o shader abaixo, `uMouse` FIXO em
     (0.5, 0.5) (sem seguir o mouse), uRadius 0.1, uSamples 50 (use 24 no desktop e 12 no celular,
     por desempenho), uBlurStrength 0.1, uShapeType 0. `uPreviousFrame` é o inputBuffer.
  7. Efeito de leitura: escurece o fundo atrás dos textos usando `ctx.leitura.glsl` e
     `ctx.leitura.uniforms` do motor (`leitura(gl_FragCoord.xy)` / `uv * resolution`), com
     `uLeituraForca`; cartões (`cartao()`) ficam foscos/escuros.

Shader do BLUR da referência (postprocessing `mainImage`):
```glsl
uniform float uRadius; uniform float uSamples; uniform float uBlurStrength; uniform int uShapeType;
uniform vec2 uMouse; uniform sampler2D uPreviousFrame; uniform vec2 uResolution;
float gaussian(float x, float sigma) { float s2 = 2.0 * sigma * sigma; if (s2 < 0.00001) return 1.0; return exp(-(x * x) / s2); }
void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor) {
  float dist = distance(uv, uMouse);
  if (dist < uRadius) { outputColor = inputColor; } else {
    vec4 blurredColor = vec4(0.0); float totalWeight = 0.0; int samples = int(uSamples);
    float sigma = max(0.001, uBlurStrength * (dist - uRadius));
    for (int i = 0; i < 50; ++i) { if (i >= samples) break;
      float offsetAngle = float(i) / float(samples) * 6.28318;
      vec2 offset = vec2(cos(offsetAngle), sin(offsetAngle)) * sigma;
      float weight = gaussian(length(offset), sigma);
      blurredColor += texture2D(uPreviousFrame, uv + offset) * weight; totalWeight += weight; }
    outputColor = totalWeight > 0.001 ? blurredColor / totalWeight : inputColor; } }
```

## Coreografia: das 5 seções da referência para as dobras da Renke
O motor (`fundo-motor.ts`) mede as dobras e interpola linearmente cada número dos "quadros"
(`Quadros.desktop[nome]`) com o tempo de roteiro amortecido. Defina UM quadro por nome do
`ROTEIRO` de `fundo-dobras.ts` (hero, metodologia, pilares, letreiro, perguntas, convite, academy,
sobre, formulario) contendo todos os números animados (posições, rotações, escalas do controller,
do donut e da minhoca; intensidades das luzes; z do plano; y/z da câmera; `leitura`).
Mapeamento sugerido do trecho 0–1 da referência para as dobras:
- hero → 0.000 (toro grande ao fundo, spot com cáusticas ligado);
- metodologia → 0.150 (toro perto da câmera, à direita, encolhendo; plano de fundo indo embora);
- pilares → 0.250 (Features: preto, toro sumido);
- letreiro → 0.300;
- perguntas → 0.400 (Solutions: minhoca chegando, L5 acesa);
- convite → 0.497 (minhoca grande, nuvem);
- academy → 0.560 (câmera sobe, minhoca segue);
- sobre → 0.620 (minhoca se afastando, ficando escura);
- formulario → volta ao toro do hero, mais ao fundo e mais escuro (fechamento calmo).
No celular, os mesmos quadros com `zoom .7`; se algo não couber, aproxime o objeto do centro.

## Motor
- O motor chama `renderer.render(cena, camera)` no fim de `pintar`. Adicione ao motor um gancho
  opcional em `Elemento`: `renderizar?(): void`; quando existir, o motor chama ele no lugar do
  `render` (é aí que entra o `EffectComposer`). O `setSize` do composer acompanha o `resize`.
- `renderer.toneMapping = NoToneMapping` quando o elemento tiver composer (o ToneMappingEffect faz
  o ACES). Pixel ratio ≤ 1.5 no desktop e 1 no celular (o motor já faz).
- `config`: `{ roteiro: ROTEIRO, transparentes: TRANSPARENTES, textos: TEXTOS_DOBRAS, cartoes:
  CARTOES, caixas: CAIXAS, tau: .9, curva: maisSuave, saltoMax: 1, pena: 140,
  esperarEntrada: () => performance.now() - performance.timeOrigin > 3400 }` (como o prata).
- O canvas é `alpha: false`; o fundo do site é preto.

## Verificação (obrigatória antes de devolver)
- Dev server já rodando em http://127.0.0.1:4350 (não inicie outro). Página: /laboratorio/cena.
- Script headless de exemplo: `scratchpad/verif.mjs` (Playwright já disponível no cache do npx com
  `executablePath` explícito; copie o cabeçalho de lá). Tire screenshots do desktop 1440×900 nas
  dobras hero, metodologia, pilares, perguntas, convite, academy, sobre e formulario, e do celular
  390×844 na hero e nas perguntas. Salve em `scratchpad/verif/cena-*.png` e olhe cada uma (Read).
- Compare com images/17.webp, 18.webp e 19.webp e com a descrição do hero. Ajuste até bater:
  brilho geral (a referência é escura: o toro é quase preto com o rebordo claro; nada de cinza
  chapado), grão fino visível, vinheta, nuvem clara na dobra das perguntas/convite.
- Sem erros no console. Build: `npm run build` precisa passar (a página cena.astro entra no build).
- Não mexa em outros arquivos além de `fundo-cena.ts`, o gancho `renderizar` em `fundo-motor.ts`
  e, se precisar, `FundoVivo.astro` (só o ramo 'cena'). Outros arquivos estão sendo editados
  em paralelo por outra pessoa.
