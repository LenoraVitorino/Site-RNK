/**
 * Fundo vivo: o véu de luz (laboratório, 25/09/2026).
 * Especificação: docs/04-design/referencias-alto-padrao.md, seções 4 a 6.
 *
 * Um único véu de luz cor de pérola, translúcido e macio, atravessa o preto
 * devagar e muda de lugar entre as dobras. É luz, não objeto: uma faixa
 * desenhada direto no shader, com uma crista mais clara onde o tecido dobra,
 * o corpo caindo de um lado e uma segunda dobra fraca. Sem amarelo, sem
 * reflexo, sem brilho aditivo. Entre as dobras mudam só posição, ângulo,
 * intensidade e nitidez; a forma nunca muda.
 *
 * A cor sai de uma rampa quente e neutra que termina em #D6D5CF: o véu nunca
 * fica mais claro que isso. Atrás dos textos a máscara de leitura escurece o
 * véu; atrás dos cartões ele perde o foco e 15% do brilho (é o vidro fosco,
 * feito aqui e não com backdrop-filter).
 */
import { Mesh, PlaneGeometry, ShaderMaterial } from 'three';
import { iniciar as iniciarMotor, maisSuave, TEXTOS, type Contexto, type Elemento, type Quadro } from './fundo-motor';

/**
 * Quadros por dobra. cx, cy: centro da crista em frações da tela (0,0 no
 * canto superior esquerdo). ang: inclinação em graus (positivo sobe para a
 * direita). int: intensidade. nit: nitidez (1 nítido, 0 desfocado como o
 * cromo das referências). curva: quanto a faixa se curva.
 */
const q = (cx: number, cy: number, ang: number, int: number, nit: number, curva = .32): Quadro => ({ cx, cy, ang, int, nit, curva });

const QUADROS = {
  desktop: {
    // A crista nasce embaixo, perto do meio, e sobe em curva larga até sair pela direita.
    hero:        q(.70, .80, 24, 1, 1),
    // Gira e sobe quase na vertical atrás do vídeo, como fumaça; o vídeo ganha contraluz.
    metodologia: q(.30, .52, 64, .6, .6, .22),
    // Sai de foco atrás da grade de cartões.
    pilares:     q(.66, .50, 24, .45, 0),
    // Faixa baixa, quase horizontal e desfocada, passando sob o letreiro.
    letreiro:    q(.50, .68, 4, .5, .2, .12),
    // Luz de janela lateral: vertical, fraca, com o centro fora da tela à direita.
    perguntas:   q(1.04, .42, 84, .3, .5, .1),
    // Um traço horizontal sob o título centralizado, como linha de assinatura.
    convite:     q(.50, .64, -6, .65, .9, .06),
    // Só um brilho de chão, desfocado e fraco; quem manda são as fotos.
    sobre:       q(.42, 1.02, 6, .25, 0, .1),
    // Horizonte baixo e calmo fechando a página.
    formulario:  q(.40, .88, 8, .55, .7, .08),
  },
  celular: {
    hero:        q(.88, .98, 52, .85, .85),
    metodologia: q(.90, .66, 68, .51, .45, .22),
    pilares:     q(.82, .74, 52, .38, 0),
    letreiro:    q(.50, .86, 4, .42, .05, .12),
    perguntas:   q(1.06, .45, 75, .25, .35, .1),
    convite:     q(.50, .66, -6, .55, .75, .06),
    sobre:       q(.42, 1.02, 6, .21, 0, .1),
    formulario:  q(.40, .92, 8, .47, .55, .08),
  },
};

const ROTEIRO: [string, string][] = [
  ['.hero', 'hero'],
  ['#o-que-fazemos', 'metodologia'],
  ['#pilares-revena, #protocolo-revena.pilares', 'pilares'],
  ['.letreiro', 'letreiro'],
  ['[data-palcoplanos], [data-planos]', 'perguntas'],   // dobra clara: o véu troca de quadro coberto
  ['#perguntas', 'perguntas'],
  ['#resultados', 'convite'],
  ['#fale', 'convite'],
  ['#academy-tools', 'sobre'],
  ['#sobre', 'sobre'],
  ['#formulario', 'formulario'],
];

const TRANSPARENTES = '.hero, #o-que-fazemos, #pilares-revena, #protocolo-revena.pilares, .letreiro, #perguntas, #fale, #academy-tools, #sobre, #formulario';

const TEXTOS_VEU = [
  TEXTOS, '#protocolo-revena.pilares .titulo', '#fale .titulo', '#fale p',
  '#academy-tools .cartao h2', '#academy-tools .cartao > p',
].join(', ');

const CARTOES = '.pilar-card, #academy-tools .cartao__arte';

const VERTICE = /* glsl */ `
void main() { gl_Position = vec4(position.xy, 0., 1.); }
`;

const FRAGMENTO = /* glsl */ `
precision highp float;
uniform vec2 uRes;
uniform vec2 uCentro;
uniform float uAngulo, uIntensidade, uNitidez, uCurva, uTempo, uRespira, uQuadro;
__LEITURA__

float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float ruido(vec2 p) {
  vec2 i = floor(p), f = fract(p), s = f * f * (3. - 2. * f);
  return mix(mix(hash(i), hash(i + vec2(1., 0.)), s.x), mix(hash(i + vec2(0., 1.)), hash(i + vec2(1., 1.)), s.x), s.y);
}
// Duas oitavas: a intensidade varia entre 80% e 100%, como fumaça.
float fumaca(vec2 p) { return .65 * ruido(p) + .35 * ruido(p * 2.03 + 17.); }

// Rampa quente e neutra. O teto é #D6D5CF.
vec3 rampa(float l) {
  vec3 c0 = vec3(0.), c1 = vec3(18., 18., 17.) / 255., c2 = vec3(59., 58., 55.) / 255.;
  vec3 c3 = vec3(140., 139., 133.) / 255., c4 = vec3(214., 213., 207.) / 255.;
  if (l < .15) return mix(c0, c1, l / .15);
  if (l < .35) return mix(c1, c2, (l - .15) / .20);
  if (l < .60) return mix(c2, c3, (l - .35) / .25);
  return mix(c3, c4, clamp((l - .60) / .25, 0., 1.));
}

void main() {
  vec2 p = gl_FragCoord.xy;
  float lado = min(uRes.x, uRes.y);
  vec2 centro = vec2(uCentro.x, 1. - uCentro.y) * uRes;
  vec2 q = (p - centro) / lado;
  vec2 d = vec2(cos(uAngulo), sin(uAngulo)), n = vec2(-d.y, d.x);
  float u = dot(q, d), v = dot(q, n);

  // Respiração só no desktop: um ciclo a cada 48 s, até 1,5% da altura.
  float resp = uRespira * .015 * (uRes.y / lado) * sin(uTempo * 6.2832 / 48. + u * 1.3);
  float vc = v - uCurva * u * u - resp;

  // Atrás de um cartão o véu perde o foco e um pouco do brilho: vidro fosco.
  float noCartao = cartao(p);
  float nit = uNitidez * (1. - noCartao);
  float sb = mix(.22, .14, nit), sc = mix(.035, .005, nit);

  float corpo = exp(-.5 * pow((vc + sb * .55) / sb, 2.));    // o tecido cai para um lado da crista
  float crista = exp(-.5 * pow(vc / sc, 2.));
  float vd = v - uCurva * .7 * u * u - .16 - resp * .6;       // segunda dobra, deslocada
  float dobra = .2 * exp(-.5 * pow((vd + sb * .4) / (sb * .8), 2.)) + .12 * exp(-.5 * pow(vd / (sc * 1.4), 2.));

  float nasce = smoothstep(-1.1, -.35, u);                    // entra macio numa ponta, sai da tela na outra
  float luz = .78 + .22 * smoothstep(-.6, .6, u);             // luz do alto à esquerda, no sentido da leitura
  float f = .8 + .2 * fumaca(vec2(u * 1.6 + uTempo * .008, vc * 5.));

  float l = uIntensidade * nasce * luz * f * (corpo * .34 + crista * .52 + dobra);
  l *= 1. - .15 * noCartao;
  l *= leitura(p);
  vec3 cor = rampa(min(l, .85));

  // Dither triangular de ±1,5/255: sem faixas no degradê sobre o preto.
  float r1 = hash(p + fract(uQuadro * .618) * 91.), r2 = hash(p.yx * 1.37 + fract(uQuadro * .382) * 57.);
  gl_FragColor = vec4(cor + (r1 + r2 - 1.) * 1.5 / 255., 1.);
}
`;

function criar(ctx: Contexto): Elemento {
  const { renderer, celular } = ctx;
  // Luz macia não precisa de resolução cheia: .75 do tamanho em CSS, sem DPR.
  renderer.setPixelRatio(.75);

  const u = {
    uRes: { value: [1, 1] }, uCentro: { value: [.5, .5] },
    uAngulo: { value: 0 }, uIntensidade: { value: 1 }, uNitidez: { value: 1 }, uCurva: { value: .3 },
    uTempo: { value: 0 }, uRespira: { value: celular ? 0 : 1 }, uQuadro: { value: 0 },
  };
  const material = new ShaderMaterial({
    uniforms: { ...u, ...ctx.leitura.uniforms },
    vertexShader: VERTICE,
    fragmentShader: FRAGMENTO.replace('__LEITURA__', ctx.leitura.glsl),
    depthTest: false, depthWrite: false,
  });
  const tela = new Mesh(new PlaneGeometry(2, 2), material);
  tela.frustumCulled = false;
  ctx.cena.add(tela);

  const t0 = performance.now();
  const abriuNoTopo = scrollY < 40;
  let quadro = 0;

  return {
    quadros: QUADROS,
    config: {
      roteiro: ROTEIRO, transparentes: TRANSPARENTES, textos: TEXTOS_VEU, cartoes: CARTOES,
      tau: .35, curva: maisSuave, saltoMax: 1,
      // Na hero, o véu só aparece depois da troca do título (ou no primeiro scroll).
      esperarEntrada: () => !abriuNoTopo || scrollY > 10 || performance.now() - t0 > 4300,
    },
    pintar({ q: e, tempo, entrada }) {
      const w = renderer.domElement.width, h = renderer.domElement.height;
      u.uRes.value = [w, h];
      u.uCentro.value = [e.cx, e.cy];
      u.uAngulo.value = (e.ang * Math.PI) / 180;
      u.uIntensidade.value = e.int * (.9 + .1 * entrada);
      u.uNitidez.value = e.nit;
      u.uCurva.value = e.curva;
      u.uTempo.value = tempo;
      u.uQuadro.value = ++quadro;
    },
  };
}

export const iniciar = (canvas: HTMLCanvasElement) => iniciarMotor(canvas, criar);
