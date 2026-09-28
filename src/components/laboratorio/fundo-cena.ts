/**
 * Fundo vivo: a cena da PeachWeb "curious", extraída da página
 * (laboratório, 26/09/2026; Lenora: "é literalmente EXTRAIR dessa página").
 *
 * Tudo vem do estado do engine de https://curious-mepp4bd.peachweb.site/
 * (docs/04-design/curadoria/cena-peachweb.md): os dois modelos (o "donut" e
 * a "minhoca", com as animações de morph deles), os dois env maps, o vídeo
 * de cáusticas do spot, os materiais, as luzes, a névoa, a câmera, os
 * efeitos de pós-processamento (mesmo pacote, postprocessing) e a folha de
 * animação por scroll.
 *
 * Os arquivos da página ficam em public/cena/ (ver public/cena/LEIA-ME.md).
 * Enquanto algum deles não estiver lá, entra a reserva refeita aqui com os
 * mesmos parâmetros: toro com estrias, tubo ondulado, env maps por shader e
 * cáusticas procedurais.
 *
 * ⚠️ Licença: modelos, env maps e vídeo são assets do template da PeachWeb
 * (o donut tem crédito para sketchfab.com/tamminen; os env maps são previews
 * de banco de imagens). Antes de publicar, licenciar ou trocar.
 *
 * Diferenças pedidas pela Lenora: o desfoque não segue o mouse (centro fixo)
 * e a passagem entre as dobras é mais lenta e amortecida (tau .9, quíntica).
 */
import {
  AmbientLight, Color, DoubleSide, EquirectangularReflectionMapping, Euler, Fog, Group, HalfFloatType,
  LinearFilter, Mesh, MeshPhysicalMaterial, MeshStandardMaterial, NoToneMapping, OrthographicCamera,
  PlaneGeometry, PMREMGenerator, PointLight, Scene, ShaderMaterial, SpotLight, TorusGeometry, TubeGeometry,
  Vector2, Vector3, WebGLRenderTarget, WebGLRenderer, CatmullRomCurve3, RepeatWrapping, type Texture,
  AnimationMixer, SRGBColorSpace, TextureLoader, VideoTexture, type Object3D,
} from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { MeshoptDecoder } from 'three/addons/libs/meshopt_decoder.module.js';
import {
  BlendFunction, BrightnessContrastEffect, EdgeDetectionMode, Effect, EffectAttribute, EffectComposer,
  EffectPass, NoiseEffect, RenderPass, SMAAEffect, SMAAPreset, ToneMappingEffect, ToneMappingMode, VignetteEffect,
} from 'postprocessing';
import { iniciar as iniciarMotor, maisSuave, type Contexto, type Elemento, type Quadro } from './fundo-motor';
import { CAIXAS, CARTOES, ROTEIRO, TEXTOS_DOBRAS, TRANSPARENTES } from './fundo-dobras';

/** Os arquivos extraídos da página (public/cena/LEIA-ME.md). */
const ARQUIVOS = {
  donut: '/cena/donut.glb',
  minhoca: '/cena/minhoca.glb',
  envArcos: '/cena/env-arcos.webp',
  envFaixas: '/cena/env-faixas.webp',
  causticas: '/cena/causticas.mp4',
};
/** Velocidade das animações de morph dos modelos, como na cena de lá. */
const VELOCIDADE = { donut: .08, minhoca: .04 };

/* ------------------------------------------------------------------ */
/* Folha de animação da referência (trecho 0–1 da página de lá)         */
/* ------------------------------------------------------------------ */

type Chave = [number, number];
/** Interpolação linear entre chaves; fora delas, segura o valor da ponta (como o Theatre.js). */
const trilha = (chaves: Chave[]) => (t: number) => {
  if (t <= chaves[0][0]) return chaves[0][1];
  for (let i = 1; i < chaves.length; i++) {
    const [t0, v0] = chaves[i - 1], [t1, v1] = chaves[i];
    if (t <= t1) return v0 + ((v1 - v0) * (t - t0)) / Math.max(1e-6, t1 - t0);
  }
  return chaves[chaves.length - 1][1];
};

const TRILHAS: Record<string, Chave[]> = {
  // "Controller", pai do donut.
  cx: [[0, 0], [.099, 1.188], [.199, 1.188], [.315, 0]],
  cy: [[0, 1.321], [.099, 0]],
  cz: [[0, 3.996], [.199, 3.996], [.315, 0]],
  cry: [[0, 0], [.099, 1.5708], [.199, 1.5708], [.315, 0]],
  // Donut, local ao Controller.
  dx: [[0, .442], [.098, 3.642], [.150, 4.034]],
  dy: [[0, .205], [.098, -.335], [.150, -.431]],
  dz: [[0, -11.065], [.098, 3.110], [.150, 4.726]],
  drx: [[0, 1.223], [.098, 4.129], [.150, 4.469]],
  dry: [[0, -.054], [.098, .207], [.150, .238]],
  drz: [[0, .085], [.098, 1.278], [.150, 1.418]],
  dsx: [[0, .745], [.098, .528], [.150, .503], [.197, .116]],
  dsy: [[0, .875], [.098, .309], [.150, .242], [.197, .056]],
  dsz: [[0, .752], [.098, .472], [.150, .439], [.197, .101]],
  // Minhoca (antes de .356 fica embaixo, fora da tela).
  mx: [[.356, -2.061], [.420, -1.118], [.497, -.382]],
  my: [[.356, -10.242], [.420, -1.338], [.497, 1.266]],
  mz: [[.356, -2.064], [.420, -3.614], [.497, -6.752]],
  mrx: [[.356, -2.682], [.420, -.806], [.497, -.356]],
  mry: [[.356, .352], [.420, -.209], [.497, .227]],
  mrz: [[.356, -.125], [.420, -.267], [.497, -.416]],
  ms: [[.356, 9.844], [.420, 14.491], [.497, 19.744]],
  // Plano de fundo: some na névoa quando a seção Features chega.
  pz: [[.085, -9.902], [.110, -11.329], [.129, -60.732]],
  // Luzes.
  l1x: [[0, 2.496], [.095, 14.916]], l1y: [[0, 2.109], [.095, -2.468]], l1z: [[0, -1.152], [.095, -6.834]],
  l1i: [[0, 10], [.095, 0]], l1d: [[0, 35.38], [.095, 23.24]], l1k: [[0, 1.77], [.095, 1.33]],
  l2x: [[0, -.437], [.097, -1.496]], l2y: [[0, 3.213], [.097, 2.196]], l2z: [[0, -1.455], [.097, 1.25]],
  l3i: [[0, 8.95], [.176, 25], [.190, 0]],
  l5i: [[.238, 0], [.275, 25], [.343, 25], [.378, 0]],
  si: [[0, 11.84], [.060, 11.84], [.101, 0]],
  // Câmera sobe um pouco na passagem para Pricing.
  cay: [[.498, -.021], [.596, .322]],
};
const FUNCOES = Object.fromEntries(Object.entries(TRILHAS).map(([k, c]) => [k, trilha(c)]));

/** Estado da referência no trecho t, mais o que é nosso (leitura). */
const amostra = (t: number, extra: Partial<Quadro> = {}): Quadro => {
  const q: Quadro = { leitura: .85 };
  for (const k in FUNCOES) q[k] = FUNCOES[k](t);
  return { ...q, ...extra };
};

/**
 * Quadros por dobra: trechos escolhidos da folha da referência (hero → 0,
 * seção Product → metodologia, Features → pilares, Solutions → perguntas e
 * convite, Pricing → academy). O formulário fecha voltando ao toro do hero,
 * mais ao fundo e mais escuro.
 */
const DESKTOP: Record<string, Quadro> = {
  hero:        amostra(0),
  // O toro de lá tem outra forma; puxado para dentro da tela para a hero ver o rebordo (17.webp).
  metodologia: amostra(.105, { dz: 2.3 }),
  pilares:     amostra(.250),
  letreiro:    amostra(.300, { leitura: .6 }),
  perguntas:   amostra(.400),
  convite:     amostra(.497, { leitura: .9 }),
  academy:     amostra(.560),
  sobre:       amostra(.620),
  formulario:  amostra(0, { dz: -14.5, dsx: .70, dsy: .82, dsz: .71, l1i: 4, l3i: 3, si: 0, pz: -60, leitura: .85 }),
};
const QUADROS = { desktop: DESKTOP, celular: DESKTOP };

/* ------------------------------------------------------------------ */
/* Geometria própria: shaders do donut e da minhoca                     */
/* ------------------------------------------------------------------ */

const FIOS = 44;    // estrias em volta do tubo (inteiro: fecha sem costura)
const TORCAO = 3;   // voltas das estrias ao longo do anel (inteiro)
const R_ANEL = 6.3, R_TUBO = 1.8, ACHATA = .62;   // toro achatado, como a fita da referência

const DONUT_VERT_CABECA = /* glsl */ `
uniform float uTempo;
varying vec3 vTubo;
varying float vFase;
const float PI2 = 6.2831853;
vec3 toro(float u, float v, float t) {
  float R = ${R_ANEL.toFixed(2)} * (1. + .035 * sin(2. * u + t * .8));
  float r = ${R_TUBO.toFixed(2)} * (1. + .12 * sin(2. * u - t) + .06 * sin(3. * u + t * .6 + 1.));
  float z = ${R_ANEL.toFixed(2)} * (.10 * sin(2. * u + t * .5 + 2.) + .05 * sin(3. * u - t * .7));
  float c = R + r * cos(v);
  return vec3(c * cos(u), c * sin(u), r * ${ACHATA.toFixed(2)} * sin(v) + z);
}
`;
const DONUT_VERT_NORMAL = /* glsl */ `
float u = uv.x * PI2, v = uv.y * PI2, t = uTempo * 1.2;
vec3 pC = toro(u, v, t);
vec3 dU = toro(u + .002, v, t) - pC, dV = toro(u, v + .002, t) - pC;
vec3 objectNormal = normalize(cross(dU, dV));
vTubo = normalize(normalMatrix * normalize(dV));
vFase = uv.y * PI2 * ${FIOS}. + uv.x * PI2 * ${TORCAO}. + uTempo * .35;
`;
const DONUT_VERT_POS = /* glsl */ `vec3 transformed = pC;`;
const DONUT_FRAG_CABECA = /* glsl */ `
uniform float uFio, uVinco;
varying vec3 vTubo;
varying float vFase;
`;
// Estrias: relevo procedural na normal, atenuado quando fica mais fino que o pixel (sem moiré).
const DONUT_FRAG_NORMAL = /* glsl */ `
#include <normal_fragment_begin>
{
  float k = uFio * (1. - smoothstep(.6, 2.5, fwidth(vFase)));
  normal = normalize(normal + normalize(vTubo) * k * cos(vFase));
  nonPerturbedNormal = normal;
}
`;
// Sulcos: entre um fio e outro a luz não chega; é o que desenha as linhas da seda.
const DONUT_FRAG_SULCO = /* glsl */ `
{
  float forca = uVinco * (1. - smoothstep(.6, 2.5, fwidth(vFase)));
  float g = .5 + .5 * cos(vFase);
  outgoingLight *= mix(1., .3 + .7 * pow(g, .8), forca);
}
#include <opaque_fragment>
`;

const MINHOCA_VERT_CABECA = /* glsl */ `uniform float uTempo;`;
const MINHOCA_VERT_POS = /* glsl */ `
vec3 transformed = position + vec3(0., .05 * sin(uv.x * 18.85 - uTempo * .5), .035 * cos(uv.x * 12.57 + uTempo * .4));
`;

/* ------------------------------------------------------------------ */
/* Env maps e cáusticas por shader                                      */
/* ------------------------------------------------------------------ */

const QUAD_VERT = /* glsl */ `
varying vec2 vUv;
void main() { vUv = uv; gl_Position = vec4(position.xy, 0., 1.); }
`;

// Equiretangular, valores lineares (HDR). uTipo 0: estúdio branco com arcos
// pretos lisos (donut). uTipo 1: preto com faixas e manchas claras distorcidas (minhoca).
const ENV_FRAG = /* glsl */ `
precision highp float;
uniform int uTipo;
varying vec2 vUv;
const float PI2 = 6.2831853;
const vec3 QUENTE = vec3(.62, .51, .35);   // #9d8159
float mancha(vec2 p, vec2 c, vec2 s) { vec2 d = (p - c) / s; return exp(-dot(d, d)); }
void main() {
  float lon = vUv.x, lat = vUv.y;
  vec3 cor;
  float transicao = 0.;
  if (uTipo == 0) {
    float v = 1.15;
    // Arcos empilhados que ondulam com a longitude, como tubos pretos brilhantes num estúdio branco.
    for (int k = 0; k < 5; k++) {
      float fk = float(k);
      float centro = .5 + (fk - 2.) * .085 + .07 * sin(lon * PI2 * 2. + fk * 1.7) * (1. - abs(fk - 2.) * .25);
      float larg = .026 + .004 * abs(fk - 2.);
      float d = abs(lat - centro);
      float faixa = 1. - smoothstep(larg * .55, larg, d);
      float fio = smoothstep(larg * .3, larg * .42, d) * (1. - smoothstep(larg * .5, larg * .62, d));
      v = mix(v, .015, faixa);
      v += fio * 1.4;
      transicao = max(transicao, smoothstep(larg * .4, larg * .7, d) * (1. - smoothstep(larg * .9, larg * 1.3, d)));
    }
    // Softboxes: dois retângulos macios muito claros, um alto à esquerda e outro baixo à direita.
    v += 1.8 * mancha(vec2(lon, lat), vec2(.22, .74), vec2(.09, .06));
    v += 1.2 * mancha(vec2(lon, lat), vec2(.68, .3), vec2(.12, .05));
    v *= 1. - .35 * smoothstep(.25, 0., lat);   // chão um pouco mais escuro
    cor = vec3(v);
  } else {
    float w = lat + .10 * sin(lon * PI2 * 2. + 1.) + .05 * sin(lon * PI2 * 5. + lat * 9.);
    float faixas = sin(w * PI2 * 3.);
    float claro = smoothstep(.45, .92, faixas) * 1.3;
    claro += 2.4 * mancha(vec2(lon, lat), vec2(.3, .62), vec2(.08, .07));
    claro += 1.6 * mancha(vec2(lon, lat), vec2(.78, .42), vec2(.1, .05));
    claro += .9 * mancha(vec2(lon, lat), vec2(.55, .8), vec2(.2, .04));
    transicao = smoothstep(.2, .45, faixas) * (1. - smoothstep(.45, .7, faixas));
    cor = vec3(.012 + claro);
  }
  cor = mix(cor, cor * QUENTE * 1.7, transicao * .45);
  gl_FragColor = vec4(cor, 1.);
}
`;

// Cáusticas: bordas de duas camadas de células de Voronoi que derivam devagar.
const CAUSTICA_FRAG = /* glsl */ `
precision highp float;
uniform float uTempo;
varying vec2 vUv;
vec2 hash2(vec2 p) { p = vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3))); return fract(sin(p) * 43758.5453); }
float celulas(vec2 p, float t) {
  vec2 i = floor(p), f = fract(p);
  float d1 = 8., d2 = 8.;
  for (int y = -1; y <= 1; y++) for (int x = -1; x <= 1; x++) {
    vec2 g = vec2(float(x), float(y));
    vec2 o = .5 + .42 * sin(t + 6.2831 * hash2(i + g));
    float d = length(g + o - f);
    if (d < d1) { d2 = d1; d1 = d; } else if (d < d2) { d2 = d; }
  }
  return d2 - d1;
}
void main() {
  float a = celulas(vUv * 5., uTempo * .45);
  float b = celulas(vUv * 8.5 + 3.1, uTempo * .3 + 2.);
  float c = pow(1. - smoothstep(0., .28, a), 2.5) + .55 * pow(1. - smoothstep(0., .22, b), 2.5);
  gl_FragColor = vec4(vec3(.12 + c * .9), 1.);
}
`;

/* ------------------------------------------------------------------ */
/* Efeitos custom do postprocessing                                     */
/* ------------------------------------------------------------------ */

/**
 * Desfoque radial da referência: nítido perto de uMouse (fixo no centro), e
 * cada vez mais desfocado longe dele. A referência amostra um anel de 50
 * pontos; aqui é um disco (espiral de Vogel) com menos amostras e a rotação
 * sorteada por pixel, que dá a mesma suavidade a um custo menor.
 */
class Desfoque extends Effect {
  constructor(amostras: number) {
    super('Desfoque', /* glsl */ `
uniform float uRadius;
uniform float uBlurStrength;
uniform vec2 uMouse;
float sorteio(vec2 p) { return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453); }
void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor) {
  float dist = distance(uv, uMouse);
  if (dist < uRadius) { outputColor = inputColor; return; }
  float sigma = max(.001, uBlurStrength * (dist - uRadius));
  float giro = sorteio(gl_FragCoord.xy) * 6.28318;
  vec4 soma = vec4(0.);
  float peso = 0.;
  for (int i = 0; i < ${amostras}; i++) {
    float f = (float(i) + .5) / ${amostras}.;
    float ang = float(i) * 2.399963 + giro;
    float rr = sigma * 1.45 * sqrt(f);
    vec2 off = vec2(cos(ang), sin(ang)) * rr;
    float w = exp(-(rr * rr) / (2. * sigma * sigma));
    soma += texture2D(inputBuffer, uv + off) * w;
    peso += w;
  }
  outputColor = soma / peso;
}
`, {
      attributes: EffectAttribute.CONVOLUTION,
      blendFunction: BlendFunction.NORMAL,
      uniforms: new Map<string, { value: unknown }>([
        ['uRadius', { value: .1 }],
        ['uBlurStrength', { value: .1 }],
        ['uMouse', { value: new Vector2(.5, .5) }],
      ]) as never,
    });
  }
}

/** Máscara de leitura do motor: escurece atrás dos textos; cartões ficam foscos. */
class Leitura extends Effect {
  constructor(ctx: Contexto) {
    super('Leitura', /* glsl */ `
${ctx.leitura.glsl}
void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor) {
  float m = leitura(gl_FragCoord.xy) * (1. - .3 * cartao(gl_FragCoord.xy));
  outputColor = vec4(inputColor.rgb * m, inputColor.a);
}
`, {
      blendFunction: BlendFunction.SRC,
      uniforms: new Map(Object.entries(ctx.leitura.uniforms)) as never,
    });
  }
}

/* ------------------------------------------------------------------ */
/* Montagem                                                             */
/* ------------------------------------------------------------------ */

function gerarEnvMap(renderer: WebGLRenderer, pmrem: PMREMGenerator, tipo: 0 | 1): Texture {
  const alvo = new WebGLRenderTarget(1024, 512, { type: HalfFloatType, minFilter: LinearFilter, magFilter: LinearFilter, depthBuffer: false });
  alvo.texture.mapping = EquirectangularReflectionMapping;
  alvo.texture.wrapS = RepeatWrapping;
  const material = new ShaderMaterial({ vertexShader: QUAD_VERT, fragmentShader: ENV_FRAG, uniforms: { uTipo: { value: tipo } }, depthTest: false, depthWrite: false });
  const cena = new Scene();
  cena.add(new Mesh(new PlaneGeometry(2, 2), material));
  const camera = new OrthographicCamera(-1, 1, 1, -1, 0, 1);
  const antes = renderer.getRenderTarget();
  renderer.setRenderTarget(alvo);
  renderer.render(cena, camera);
  renderer.setRenderTarget(antes);
  const env = pmrem.fromEquirectangular(alvo.texture).texture;
  alvo.dispose();
  material.dispose();
  return env;
}

/** Os env maps da página: equiretangulares em sRGB, passados pelo PMREM. */
async function carregarEnvMap(pmrem: PMREMGenerator, url: string): Promise<Texture> {
  const tex = await new TextureLoader().loadAsync(url);
  tex.mapping = EquirectangularReflectionMapping;
  tex.colorSpace = SRGBColorSpace;
  const env = pmrem.fromEquirectangular(tex).texture;
  tex.dispose();
  return env;
}

function criar(ctx: Contexto): Elemento {
  const { renderer, cena, camera, celular } = ctx;
  renderer.toneMapping = NoToneMapping;   // o ToneMappingEffect faz o ACES

  cena.background = new Color(0x000000);
  cena.fog = new Fog(0x000000, 10, 20);
  cena.add(new AmbientLight(0xffffff, 2));

  // Câmera da referência, dentro do "Camera Rig" (z -0.327 na folha inteira).
  camera.fov = 30; camera.near = .1; camera.far = 1000;
  camera.zoom = celular ? .7 : 1;
  camera.position.set(0, -.0214, 8.069);
  camera.updateProjectionMatrix();
  const rig = new Group();
  rig.position.z = -.327;
  rig.add(camera);
  cena.add(rig);

  // Env maps próprios.
  const pmrem = new PMREMGenerator(renderer);
  pmrem.compileEquirectangularShader();
  const envArcos = gerarEnvMap(renderer, pmrem, 0);
  const envFaixas = gerarEnvMap(renderer, pmrem, 1);

  const uTempo = { value: 0 };
  const mixers: AnimationMixer[] = [];

  // Donut: toro achatado com estrias, dentro do Controller e de um pivô que
  // deita o anel (eixo Y, como o modelo da referência).
  const PARAMS_DONUT = {
    side: DoubleSide, color: 0x232323, metalness: .918, roughness: .449,
    clearcoat: .398, clearcoatRoughness: .334, sheen: .96, sheenRoughness: .229, sheenColor: new Color(0x5e5e5e),
    ior: 1.46, specularColor: new Color(.67, .67, .67), specularIntensity: 1,
    envMap: envArcos, envMapIntensity: 1, envMapRotation: new Euler(0, 3.452, 0),
  };
  const donutMaterial = new MeshPhysicalMaterial(PARAMS_DONUT);
  const uFio = { value: celular ? .35 : .45 };
  const uVinco = { value: .8 };
  donutMaterial.onBeforeCompile = (shader) => {
    shader.uniforms.uTempo = uTempo;
    shader.uniforms.uFio = uFio;
    shader.uniforms.uVinco = uVinco;
    shader.vertexShader = DONUT_VERT_CABECA + shader.vertexShader
      .replace('#include <beginnormal_vertex>', DONUT_VERT_NORMAL)
      .replace('#include <begin_vertex>', DONUT_VERT_POS);
    shader.fragmentShader = DONUT_FRAG_CABECA + shader.fragmentShader
      .replace('#include <normal_fragment_begin>', DONUT_FRAG_NORMAL)
      .replace('#include <opaque_fragment>', DONUT_FRAG_SULCO);
  };
  donutMaterial.customProgramCacheKey = () => 'cena-donut';
  const donutReserva = new Mesh(new TorusGeometry(R_ANEL, R_TUBO, celular ? 96 : 144, celular ? 320 : 480), donutMaterial);
  const pivo = new Group();
  pivo.rotation.x = Math.PI / 2;
  pivo.add(donutReserva);
  const donutObj = new Group();
  donutObj.add(pivo);
  const controller = new Group();
  controller.add(donutObj);
  cena.add(controller);

  // Minhoca: tubo fino ao longo de uma senóide larga em 3D.
  const pontos: Vector3[] = [];
  for (let i = 0; i <= 64; i++) {
    const s = i / 64;
    pontos.push(new Vector3(
      -1 + 2 * s,
      .16 * Math.sin(Math.PI * 2 * 3 * s) + .05 * Math.sin(Math.PI * 2 * 5.3 * s + 1),
      .12 * Math.cos(Math.PI * 2 * 2.4 * s + .5) + .05 * Math.sin(Math.PI * 2 * 4.1 * s),
    ));
  }
  const PARAMS_MINHOCA = {
    side: DoubleSide, color: 0x232323, metalness: .965, roughness: .261,
    clearcoat: .4, clearcoatRoughness: .239, ior: 1.5, specularColor: new Color(0xffffff),
    envMap: envFaixas, envMapIntensity: 1, envMapRotation: new Euler(0, 1.498, 0),
  };
  const minhocaMaterial = new MeshPhysicalMaterial(PARAMS_MINHOCA);
  minhocaMaterial.onBeforeCompile = (shader) => {
    shader.uniforms.uTempo = uTempo;
    shader.vertexShader = MINHOCA_VERT_CABECA + shader.vertexShader.replace('#include <begin_vertex>', MINHOCA_VERT_POS);
  };
  minhocaMaterial.customProgramCacheKey = () => 'cena-minhoca';
  const minhocaReserva = new Mesh(new TubeGeometry(new CatmullRomCurve3(pontos), celular ? 240 : 400, .085, celular ? 16 : 24, false), minhocaMaterial);
  const minhoca = new Group();
  minhoca.add(minhocaReserva);
  minhoca.visible = false;
  cena.add(minhoca);

  // Os arquivos da página: os env maps trocam os por shader em todos os
  // materiais; os modelos entram no lugar da reserva, com a animação de morph
  // deles em loop e os materiais de lá (sem os shaders da reserva).
  const literalDonut = new MeshPhysicalMaterial({ ...PARAMS_DONUT, envMap: null });
  const literalMinhoca = new MeshPhysicalMaterial({ ...PARAMS_MINHOCA, envMap: null });
  const loader = new GLTFLoader();
  loader.setMeshoptDecoder(MeshoptDecoder);
  const carregarModelo = async (url: string, grupo: Object3D, reserva: Object3D, material: MeshPhysicalMaterial, velocidade: number) => {
    const gltf = await loader.loadAsync(url);
    gltf.scene.traverse((o) => {
      const m = o as Mesh;
      if (m.isMesh) { m.material = material; m.frustumCulled = false; }
    });
    grupo.remove(reserva);
    grupo.add(gltf.scene);
    if (gltf.animations[0]) {
      const mixer = new AnimationMixer(gltf.scene);
      mixer.clipAction(gltf.animations[0]).play();
      mixer.timeScale = velocidade;
      mixers.push(mixer);
    }
  };
  Promise.allSettled([carregarEnvMap(pmrem, ARQUIVOS.envArcos), carregarEnvMap(pmrem, ARQUIVOS.envFaixas)]).then(([a, f]) => {
    if (a.status === 'fulfilled') { literalDonut.envMap = a.value; donutMaterial.envMap = a.value; donutMaterial.needsUpdate = true; }
    if (f.status === 'fulfilled') { literalMinhoca.envMap = f.value; minhocaMaterial.envMap = f.value; minhocaMaterial.needsUpdate = true; }
    pmrem.dispose();
    carregarModelo(ARQUIVOS.donut, donutObj, pivo, literalDonut, VELOCIDADE.donut).catch(() => {});
    carregarModelo(ARQUIVOS.minhoca, minhoca, minhocaReserva, literalMinhoca, VELOCIDADE.minhoca).catch(() => {});
  });

  // Plano de fundo.
  const plano = new Mesh(new PlaneGeometry(1, 1), new MeshStandardMaterial({ color: 0x464646, roughness: .479, metalness: .628 }));
  plano.scale.set(26.98, 15.45, 1);
  cena.add(plano);

  // Luzes.
  const luz = (int: number, dist: number, decay: number) => {
    const l = new PointLight(0xd2d2d2, int, dist, decay);
    cena.add(l);
    return l;
  };
  const l1 = luz(10, 35.38, 1.77);
  const l2 = luz(17.49, 6.75, .33);
  const l3 = luz(8.95, 5.6, 0);
  l3.position.set(.104, 1.237, -4.391);
  const l4 = luz(3, 20, 2);
  l4.position.set(0, 0, 0);
  const l5 = luz(0, 16.67, 0);
  l5.position.set(.104, -.422, -6.129);

  // Spot com cáusticas, apontado para baixo e para trás (rotação x .63 do modelo de lá).
  const causticaAlvo = new WebGLRenderTarget(256, 256, { minFilter: LinearFilter, magFilter: LinearFilter, depthBuffer: false });
  causticaAlvo.texture.wrapS = causticaAlvo.texture.wrapT = RepeatWrapping;
  const causticaCena = new Scene();
  const causticaMaterial = new ShaderMaterial({ vertexShader: QUAD_VERT, fragmentShader: CAUSTICA_FRAG, uniforms: { uTempo }, depthTest: false, depthWrite: false });
  causticaCena.add(new Mesh(new PlaneGeometry(2, 2), causticaMaterial));
  const causticaCamera = new OrthographicCamera(-1, 1, 1, -1, 0, 1);
  const spot = new SpotLight(0xd2d2d2, 11.84, 25.31, .89, .418, 0);
  spot.position.set(.841, 10.603, -1.111);
  spot.target.position.set(.841, 0, -1.111 - 10.603 * Math.tan(.63));
  spot.map = causticaAlvo.texture;
  cena.add(spot, spot.target);
  // O vídeo de cáusticas da página substitui as procedurais assim que carrega.
  let videoAtivo = false;
  const video = document.createElement('video');
  video.muted = true; video.loop = true; video.playsInline = true; video.preload = 'auto';
  video.addEventListener('loadeddata', () => {
    const tex = new VideoTexture(video);
    tex.colorSpace = SRGBColorSpace;
    spot.map = tex;
    videoAtivo = true;
    video.play().catch(() => {});
  }, { once: true });
  video.src = ARQUIVOS.causticas;

  // Pós-processamento. O desfoque vem antes da vinheta e do grão, para o
  // grão ficar fino e visível na tela inteira, como na referência.
  const composer = new EffectComposer(renderer, { frameBufferType: HalfFloatType });
  composer.addPass(new RenderPass(cena, camera));
  composer.addPass(new EffectPass(camera, new SMAAEffect({ preset: celular ? SMAAPreset.MEDIUM : SMAAPreset.HIGH, edgeDetectionMode: EdgeDetectionMode.COLOR })));
  composer.addPass(new EffectPass(camera, new Desfoque(celular ? 12 : 24)));
  const vinheta = new VignetteEffect({ offset: .2048, darkness: 1, blendFunction: BlendFunction.NORMAL });
  vinheta.blendMode.opacity.value = .5;
  const brilho = new BrightnessContrastEffect({ brightness: .03, contrast: 0, blendFunction: BlendFunction.ALPHA });
  brilho.blendMode.opacity.value = .1;
  const grao = new NoiseEffect({ premultiply: false, blendFunction: BlendFunction.SOFT_LIGHT });
  grao.blendMode.opacity.value = .3;
  composer.addPass(new EffectPass(camera, vinheta, new ToneMappingEffect({ mode: ToneMappingMode.ACES_FILMIC }), brilho, grao, new Leitura(ctx)));

  const tamanho = new Vector2();
  const tamanhoComposer = new Vector2(-1, -1);
  let dtQuadro = 0;

  const t0 = performance.now();
  const abriuNoTopo = scrollY < 40;
  const GRAU = Math.PI / 180;

  return {
    quadros: QUADROS,
    config: {
      roteiro: ROTEIRO, transparentes: TRANSPARENTES, textos: TEXTOS_DOBRAS, cartoes: CARTOES, caixas: CAIXAS,
      tau: .9, curva: maisSuave, saltoMax: 1, pena: 140,
      esperarEntrada: () => !abriuNoTopo || scrollY > 10 || performance.now() - t0 > 3400,
    },
    pintar({ q, tempo, dt, parado, ponteiro }) {
      dtQuadro = dt;
      uTempo.value = parado ? 0 : tempo;
      if (!parado) for (const m of mixers) m.update(dt);

      controller.position.set(q.cx, q.cy, q.cz);
      controller.rotation.y = q.cry;
      donutObj.position.set(q.dx, q.dy, q.dz);
      donutObj.rotation.set(q.drx, q.dry, q.drz);
      donutObj.scale.set(q.dsx, q.dsy, q.dsz);
      donutObj.visible = q.dsx > .03;

      minhoca.position.set(q.mx, q.my, q.mz);
      minhoca.rotation.set(q.mrx, q.mry, q.mrz);
      minhoca.scale.setScalar(q.ms);
      minhoca.visible = q.my > -9;

      plano.position.z = q.pz;
      plano.visible = q.pz > -40;

      l1.position.set(q.l1x, q.l1y, q.l1z); l1.intensity = q.l1i; l1.distance = q.l1d; l1.decay = q.l1k;
      l2.position.set(q.l2x, q.l2y, q.l2z);
      l3.intensity = q.l3i;
      l5.intensity = q.l5i;
      spot.intensity = q.si;
      spot.visible = q.si > .01;

      camera.position.y = q.cay;
      // Só um leve tilt pelo ponteiro (±1°), como a câmera de lá; sem foco seguindo o mouse.
      camera.rotation.set(-ponteiro.y * GRAU, -ponteiro.x * GRAU, 0);
    },
    renderizar() {
      renderer.getSize(tamanho);
      if (!tamanho.equals(tamanhoComposer)) {
        composer.setSize(tamanho.x, tamanho.y, false);
        tamanhoComposer.copy(tamanho);
      }
      if (spot.visible && !videoAtivo) {
        renderer.setRenderTarget(causticaAlvo);
        renderer.render(causticaCena, causticaCamera);
        renderer.setRenderTarget(null);
      }
      composer.render(dtQuadro);
    },
  };
}

export const iniciar = (canvas: HTMLCanvasElement) => iniciarMotor(canvas, criar);
