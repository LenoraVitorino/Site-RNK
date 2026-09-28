/**
 * Fundo vivo: o anel de fios prateados (laboratório, 26/09/2026).
 *
 * A Lenora escolheu a cena da PeachWeb (curious-mepp4bd.peachweb.site) como
 * caminho: "é o caminho", com a transição mais suave e sem o foco que segue o
 * mouse. A cena de lá é um anel de tecido metálico escuro, com brilho de seda
 * cinza, que se aproxima, gira e se afasta conforme a página rola, sob
 * vinheta e grão. Este arquivo refaz a ideia do zero, sem os modelos nem o
 * código de lá: um toro com ondas lentas de tecido e fios desenhados no
 * shader (brilho anisotrópico, como seda), cinza quente, sem amarelo.
 * Análise completa: docs/04-design/curadoria-pinterest.md, seção 1.
 *
 * Diferenças pedidas em relação à referência:
 * - sem o desfoque em volta do mouse de lá: o ponteiro só inclina o anel
 *   1,2°, bem amortecido;
 * - passagem mais longa e amortecida entre as dobras (tau .9 s, curva
 *   quíntica), com o anel parado enquanto a dobra ocupa a tela;
 * - a máscara de leitura escurece o anel atrás de qualquer texto.
 */
import { AdditiveBlending, DoubleSide, Group, Mesh, ShaderMaterial, TorusGeometry, Vector3 } from 'three';
import { iniciar as iniciarMotor, maisSuave, type Contexto, type Elemento, type Quadro } from './fundo-motor';
import { CAIXAS, CARTOES, ROTEIRO, TEXTOS_DOBRAS, TRANSPARENTES } from './fundo-dobras';

/**
 * Quadros por dobra. x, y, z: posição do anel (a câmera está em z 11; na
 * tela de 16:9 o plano z 0 vai de -5,6 a 5,6 na horizontal e de -3,15 a 3,15
 * na vertical). rx, ry, rz: rotação em graus. s: escala (1 = anel de 4,1 de
 * diâmetro). luz: intensidade. onda: amplitude das ondas do tecido.
 * leitura: quanto a máscara escurece o anel atrás do texto. leque: o anel
 * se abre numa pilha de cinco, ao longo do próprio eixo (0 = um só; 1 =
 * cinco anéis separados, um por pilar), como as moedas da PeachWeb "huge".
 */
const q = (x: number, y: number, z: number, rx: number, ry: number, rz: number, s: number, luz: number, onda = 1, leitura = .88, leque = 0): Quadro =>
  ({ x, y, z, rx, ry, rz, s, luz, onda, leitura, leque });

const QUADROS = {
  desktop: {
    // Grande, à direita do título, inclinado e saindo da tela, como a hero de lá.
    hero:        q(3.4, .1, 0, 62, -16, 28, 1.45, 1),
    // Vem para trás do vídeo, quase de frente: o vídeo ganha um halo; a pilha começa a se abrir.
    metodologia: q(-3.2, -.2, -3, 18, 34, -12, 1.15, .62, 1, .88, .25),
    // Abre em cinco anéis empilhados à direita: um por pilar do Protocolo.
    pilares:     q(3.3, -.3, -4.5, 78, -8, 4, .95, .62, .5, .82, 1),
    // De lado, baixo, como um traço sob as palavras que correm.
    letreiro:    q(0, -1.5, -1.5, 88, 8, 2, 1.7, .55, .6, .55),
    // Espia do canto de cima, atrás do palco da foto.
    perguntas:   q(4.6, 2.5, -4, 42, -30, 40, 1.25, .42),
    // De frente e centrado: o título do convite fica dentro do anel.
    convite:     q(0, .1, -3.5, 6, 0, 0, 1.45, .5, .7, .92),
    // Desce para o canto de baixo, atrás dos dois produtos.
    academy:     q(-4.3, -2.8, -3, 70, 22, -18, 1.3, .42),
    // Atrás da moldura da foto, à direita; some quando a foto toma a tela.
    sobre:       q(3.2, 0, -5, 50, -10, 30, 1.2, .38),
    // Fecha calmo, à esquerda do formulário, levemente aberto.
    formulario:  q(-3.8, .3, -1.5, 56, 24, -30, 1.2, .6, 1, .88, .3),
  },
  celular: {
    hero:        q(1.2, 1.9, -1, 64, -16, 26, .78, .9),
    metodologia: q(-1, 2.2, -3, 18, 34, -12, .8, .5),
    pilares:     q(1.5, -2, -4, 68, -14, 10, .7, .45, .6, .82, 1),
    letreiro:    q(0, -1.6, -1.5, 88, 8, 2, 1, .45, .6, .55),
    perguntas:   q(1.4, 2.6, -4, 42, -30, 40, .8, .36),
    convite:     q(0, .1, -3.5, 6, 0, 0, .75, .45, .7, .92),
    academy:     q(-1.2, -2.6, -3, 70, 22, -18, .85, .38),
    sobre:       q(1.1, 2.2, -5, 50, -10, 30, .8, .34),
    formulario:  q(-1.2, 2.4, -1.5, 56, 24, -30, .8, .5),
  },
};

const R = 1.5, r = .55;   // raio do anel e do tubo
const TORCAO = 2;          // voltas dos fios em torno do tubo a cada volta do anel (inteiro: fecha sem costura)
const FIOS = 72;           // fios por volta do tubo (inteiro, pelo mesmo motivo)

const VERTICE = /* glsl */ `
uniform float uTempo, uOnda;
varying vec2 vUv;
varying vec3 vN, vT, vV;
const float PI2 = 6.2831853;
void main() {
  vUv = uv;
  float a = uv.x * PI2, b = uv.y * PI2;
  // Ondas lentas de tecido, ao longo do anel e em volta do tubo.
  float d = .045 * sin(3. * a + 2. * b + uTempo * .32)
          + .028 * sin(5. * a - 3. * b - uTempo * .23)
          + .014 * sin(9. * a + b + uTempo * .41);
  vec3 p = position + normal * d * uOnda;
  // Direção do fio: em volta do anel, torcendo ${TORCAO} voltas em volta do tubo.
  vec3 du = vec3(-(${R.toFixed(2)} + ${r.toFixed(2)} * cos(b)) * sin(a), (${R.toFixed(2)} + ${r.toFixed(2)} * cos(b)) * cos(a), 0.);
  vec3 dv = vec3(-${r.toFixed(2)} * sin(b) * cos(a), -${r.toFixed(2)} * sin(b) * sin(a), ${r.toFixed(2)} * cos(b));
  vT = normalize(normalMatrix * normalize(du + float(${TORCAO}) * dv));
  vN = normalize(normalMatrix * normal);
  vec4 mv = modelViewMatrix * vec4(p, 1.);
  vV = mv.xyz;
  gl_Position = projectionMatrix * mv;
}
`;

const FRAGMENTO = /* glsl */ `
precision highp float;
uniform float uTempo, uIntensidade, uQuadro, uFase;
uniform vec3 uLuz, uLuz2;
varying vec2 vUv;
varying vec3 vN, vT, vV;
__LEITURA__
const float PI2 = 6.2831853;
float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

// Brilho de seda (Kajiya-Kay): forte quando a meia-direção é perpendicular ao fio.
float seda(vec3 T, vec3 V, vec3 L, float e) {
  vec3 H = normalize(L + V);
  float th = dot(T, H);
  return pow(sqrt(max(0., 1. - th * th)), e);
}

float ruido(vec2 p) {
  vec2 i = floor(p), f = fract(p), k = f * f * (3. - 2. * f);
  return mix(mix(hash(i), hash(i + vec2(1., 0.)), k.x), mix(hash(i + vec2(0., 1.)), hash(i + vec2(1., 1.)), k.x), k.y);
}

void main() {
  vec3 N = normalize(vN);
  vec3 V = normalize(-vV);
  if (dot(N, V) < 0.) N = -N;
  vec3 T = normalize(vT);

  // Coordenada ao longo da seção dos fios: constante em cada fio, sem costura.
  float w = (vUv.y - float(${TORCAO}) * vUv.x) * PI2;
  float k = w * float(${FIOS}) + 2.2 * sin(w * 3. + uTempo * .18 + uFase) + uFase * 3.;
  float fio = pow(.5 + .5 * sin(k), 4.);
  // Fios mais finos que o pixel viram a média deles: sem moiré de longe ou no celular.
  fio = mix(fio, .27, smoothstep(.35, 1.4, fwidth(k)));
  // Cada fio tem a sua força, que muda devagar ao longo do anel: fumaça, não mola.
  float forca = ruido(vec2(w * 7.5 + uFase * 11., vUv.x * 9. + uTempo * .05)) * ruido(vec2(w * 2.1 + 3. + uFase * 5., vUv.x * 3. - uTempo * .03));
  forca = smoothstep(.02, .45, forca);
  float feixe = .5 + .5 * sin(w * 3. - uTempo * .12);

  vec3 L1 = normalize(uLuz), L2 = normalize(uLuz2);
  float s1 = seda(T, V, L1, 60.), s2 = seda(T, V, L2, 30.), largo = seda(T, V, L1, 5.);
  float fres = pow(1. - abs(dot(N, V)), 2.5);

  // Só luz: o anel é feito dos brilhos dos fios, somados (frente e verso), como fumaça.
  float l = s1 * fio * forca * 1.1
          + s2 * fio * forca * .35
          + largo * feixe * forca * .09
          + fres * (.2 + .8 * fio * forca) * .22;
  // Mais longe da câmera, mais escuro: a profundidade da cena de referência.
  l *= mix(.3, 1., smoothstep(-19., -8., vV.z));
  l *= uIntensidade * 1.15;
  l *= leitura(gl_FragCoord.xy);
  l *= 1. - .18 * cartao(gl_FragCoord.xy);

  // Cinza quente: nunca branco puro, nunca amarelo.
  vec3 cor = vec3(.84, .835, .81) * clamp(l, 0., .85);
  float r1 = hash(gl_FragCoord.xy + fract(uQuadro * .618) * 91.), r2 = hash(gl_FragCoord.yx * 1.37 + fract(uQuadro * .382) * 57.);
  gl_FragColor = vec4(max(cor + (r1 + r2 - 1.) * 1.2 / 255., 0.), 1.);
}
`;

function criar(ctx: Contexto): Elemento {
  const { renderer, celular, cena } = ctx;
  renderer.setPixelRatio(Math.min(devicePixelRatio, celular ? 1 : 1.25));

  const u = {
    uTempo: { value: 0 }, uOnda: { value: 1 }, uQuadro: { value: 0 },
    uLuz: { value: new Vector3(-.55, .75, .5) },   // luz do alto à esquerda
    uLuz2: { value: new Vector3(.8, -.3, .4) },    // contraluz fraca à direita
  };
  // Cinco anéis com a mesma geometria: o do meio é o anel de sempre; os
  // outros só aparecem quando a pilha se abre (leque > 0).
  const N = 5, MEIO = 2;
  const geometria = new TorusGeometry(R, r, celular ? 64 : 96, celular ? 200 : 320);
  const fragmento = FRAGMENTO.replace('__LEITURA__', ctx.leitura.glsl);
  const aneis = Array.from({ length: N }, (_, i) => {
    const proprio = { uIntensidade: { value: i === MEIO ? 1 : 0 }, uFase: { value: i * 1.37 } };
    const material = new ShaderMaterial({
      uniforms: { ...u, ...proprio, ...ctx.leitura.uniforms },
      vertexShader: VERTICE,
      fragmentShader: fragmento,
      // Frente e verso somados, sem profundidade: os fios de trás aparecem através dos da frente.
      transparent: true, blending: AdditiveBlending, depthTest: false, depthWrite: false, side: DoubleSide,
    });
    const anel = new Mesh(geometria, material);
    anel.visible = i === MEIO;
    return { anel, proprio };
  });
  const grupo = new Group();
  aneis.forEach(({ anel }) => grupo.add(anel));
  cena.add(grupo);

  const t0 = performance.now();
  const abriuNoTopo = scrollY < 40;
  const grau = Math.PI / 180;
  let quadro = 0, fluxo = 0;

  return {
    quadros: QUADROS,
    config: {
      roteiro: ROTEIRO, transparentes: TRANSPARENTES, textos: TEXTOS_DOBRAS, cartoes: CARTOES, caixas: CAIXAS,
      // Mais lento e amortecido que o véu: "a transição podia ser mais suave".
      tau: .9, curva: maisSuave, saltoMax: 1, pena: 140,
      esperarEntrada: () => !abriuNoTopo || scrollY > 10 || performance.now() - t0 > 3400,
    },
    pintar({ q: e, tempo, dt, entrada, parado, energia, ponteiro }) {
      grupo.position.set(e.x, e.y + (1 - entrada) * -.6, e.z);
      // O ponteiro inclina o conjunto só um pouco (até 1,2°), bem amortecido: sem foco nem desfoque.
      grupo.rotation.set((e.rx + ponteiro.y * 1.2) * grau, (e.ry + ponteiro.x * 1.2) * grau, e.rz * grau);
      grupo.scale.setScalar(e.s * (.94 + .06 * entrada));
      // Os fios correm mais depressa enquanto a página rola: o fundo responde ao ritmo da leitura.
      if (!parado) fluxo += dt * (1 + energia * 3.2);
      u.uTempo.value = parado ? 0 : fluxo;
      u.uOnda.value = e.onda * (1 + energia * .5);
      u.uQuadro.value = ++quadro;
      // Pilha: os anéis se separam ao longo do eixo do anel, o do meio fica.
      const leque = Math.max(0, Math.min(1, e.leque ?? 0));
      const abre = leque * leque * (3 - 2 * leque);
      aneis.forEach(({ anel, proprio }, i) => {
        const k = i - MEIO;
        anel.position.set(0, 0, k * 1.3 * abre);
        // Deriva própria, bem lenta: cada anel gira no próprio eixo, em velocidades diferentes.
        anel.rotation.z = parado ? 0 : tempo * (.026 + k * .004) + k * .5 * abre;
        const brilho = k === 0 ? 1 : Math.min(1, abre * 4) * (1 - Math.abs(k) * .16);
        proprio.uIntensidade.value = e.luz * entrada * brilho * (k === 0 ? 1 : .82);
        anel.visible = brilho > .002;
      });
    },
  };
}

export const iniciar = (canvas: HTMLCanvasElement) => iniciarMotor(canvas, criar);
