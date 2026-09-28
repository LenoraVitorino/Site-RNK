/**
 * Caminho B do fundo vivo: a constelação que se organiza (22/09/2026).
 * Especificação: docs/04-design/fundo-vivo-briefing.md.
 *
 * Um campo de pontos de luz que, a cada dobra, vira uma forma nova: onda,
 * três anéis, esfera, fita, poeira e portal. Todas as formas são calculadas
 * no shader a partir da mesma grade (u, v), e a grade é o que liga uma forma
 * à outra: u corre na horizontal ou em volta do eixo em todas elas, então
 * cada ponto viaja pouco. Na passagem, cada ponto parte no seu tempo
 * (varrendo da esquerda para a direita, com um pouco de acaso) e faz uma
 * curva no caminho, como um cardume.
 */
import { AdditiveBlending, BufferAttribute, BufferGeometry, Points, ShaderMaterial } from 'three';
import { iniciar as iniciarMotor, type Contexto, type Elemento, type Quadro } from './fundo-motor';

const FORMA = { onda: 0, aneis: 1, esfera: 2, fita: 3, poeira: 4, portal: 5 } as const;

/**
 * Quadros por dobra. Posição (fx, fy) em frações da metade visível da tela;
 * k é o tamanho em metades da altura da tela (acima de 1 o elemento sai
 * pelas bordas); r* são giros em radianos; mira aponta o eixo do objeto
 * para a câmera; foco desloca o plano nítido e
 * desfoque controla o bokeh; brilho, presença (fração dos pontos acesos) e
 * leitura (quanto a máscara escurece atrás do texto). amp e cresce só valem
 * para a onda.
 */
const base = { z: 0, rz: 0, mira: 0, foco: 0, desfoque: .22, brilho: 1, presenca: 1, leitura: .85, amp: 1, cresce: 0 };
const q = (o: Partial<Quadro> & { forma: number }): Quadro => ({ ...base, fx: 0, fy: 0, k: 1, rx: 0, ry: 0, ...o });

const QUADROS = {
  desktop: {
    // Onda larga na metade de baixo, subindo à direita; o título fica no preto de cima.
    hero:        q({ forma: FORMA.onda, fx: .22, fy: -.42, k: 1.05, rx: .3, ry: -.42, rz: .1, amp: 1.4, cresce: .45 }),
    // Três anéis em cascata em volta do vídeo, à esquerda; o vídeo cobre o miolo.
    metodologia: q({ forma: FORMA.aneis, fx: -.5, fy: -.05, k: .92, rx: -.35, ry: .32, rz: .1, brilho: .85 }),
    // Esfera grande no centro, atrás dos cartões de vidro, um pouco fora de foco.
    pilares:     q({ forma: FORMA.esfera, fx: 0, fy: -.12, z: -1.2, k: .82, rx: .35, foco: -1.4, brilho: .6 }),
    // A esfera se abre numa fita que atravessa a tela atrás das letras.
    letreiro:    q({ forma: FORMA.fita, fy: .04, k: .95, rx: .25, rz: -.06, brilho: .9, leitura: .55 }),
    // Curva ascendente: a onda volta e sobe da esquerda para a direita, ao lado da frase.
    perguntas:   q({ forma: FORMA.onda, fx: .3, fy: -.05, k: 1.05, rx: .62, ry: -.75, rz: .28, amp: .55, cresce: 1.35, brilho: .85 }),
    // A onda volta calma e baixa, como um horizonte sob os dois cartões.
    academy:     q({ forma: FORMA.onda, fy: -.72, k: 1.2, rx: .34, ry: .3, amp: .8, cresce: 0, brilho: .8 }),
    // Respiro: poucas luzes grandes e desfocadas atrás das fotos, como bokeh.
    sobre:       q({ forma: FORMA.poeira, k: 1, presenca: .06, brilho: 2.4, foco: -7, desfoque: .7 }),
    // Portal: um túnel em espiral cuja boca emoldura o cartão do formulário.
    formulario:  q({ forma: FORMA.portal, fx: .54, fy: .16, k: .86, mira: 1, brilho: .95, foco: 1.2 }),
  },
  celular: {
    hero:        q({ forma: FORMA.onda, fx: .1, fy: -.62, k: 1.15, rx: .6, ry: -.35, rz: .12, amp: .9, cresce: .4, brilho: .8 }),
    metodologia: q({ forma: FORMA.aneis, fx: 0, fy: .1, k: .9, rx: -.35, ry: .32, brilho: .7 }),
    pilares:     q({ forma: FORMA.esfera, fy: 0, z: -1.2, k: .8, rx: .35, foco: -1.4, brilho: .7 }),
    letreiro:    q({ forma: FORMA.fita, k: 1.2, rx: .25, rz: -.06, brilho: .8, leitura: .55 }),
    perguntas:   q({ forma: FORMA.onda, fx: .1, fy: -.1, k: 1.2, rx: .6, ry: -.7, rz: .3, amp: .55, cresce: 1.3, brilho: .7 }),
    academy:     q({ forma: FORMA.onda, fy: -.75, k: 1.3, rx: .34, ry: .3, amp: .8, brilho: .7 }),
    sobre:       q({ forma: FORMA.poeira, presenca: .06, brilho: 2, foco: -7, desfoque: .7 }),
    formulario:  q({ forma: FORMA.portal, fy: .25, k: .8, mira: 1, brilho: .85, foco: 1.2 }),
  },
};

const VERTICE = /* glsl */ `
uniform float uTempo, uRolagem, uEnergia, uMistura, uFormaA, uFormaB, uPresenca, uBrilho;
uniform vec4 uParA, uParB;
uniform float uFoco, uDesfoque, uTamanho, uPixel, uCentro;
attribute vec2 aGrade;
attribute vec4 aSorte;
varying vec3 vCor;
varying float vAlfa;
varying float vMacio;

const float TAU = 6.28318530718;

vec3 giraX(vec3 p, float a) { float c = cos(a), s = sin(a); return vec3(p.x, c * p.y - s * p.z, s * p.y + c * p.z); }
vec3 giraY(vec3 p, float a) { float c = cos(a), s = sin(a); return vec3(c * p.x + s * p.z, p.y, -s * p.x + c * p.z); }

// Onda: grade regular larga; cresce levanta o lado direito (curva ascendente).
vec4 onda(vec2 g, vec4 par) {
  float x = (g.x - .5) * 4.4, z = (g.y - .5) * 2.4, t = uTempo;
  float onda = sin(x * 1.25 + t * .32) * .26 + sin(x * .63 - z * 1.7 + t * .21) * .17 + sin(z * 2.9 + x * .45 - t * .27) * .07;
  float y = par.x * onda + par.y * (smoothstep(-2.2, 2.2, x) * 1.1 - .55);
  // As cristas acendem, como a luz rasante das referências.
  return vec4(x, y, z, .5 + .8 * smoothstep(-.15, .35, onda));
}

// Três anéis em cascata, cada um no seu plano; v escolhe o anel e a espessura.
vec4 aneis(vec2 g, vec4 s) {
  float v = g.y;
  float i = v < .44 ? 0. : (v < .76 ? 1. : 2.);
  float l = i == 0. ? v / .44 : (i == 1. ? (v - .44) / .32 : (v - .76) / .24);
  float raio = i == 0. ? 1. : (i == 1. ? .72 : .47);
  float sentido = i == 1. ? -1. : 1.;
  float a = g.x * TAU + l * 2.4 + (uTempo * (.05 + i * .015) + uRolagem * .35) * sentido;
  float r = raio + (l - .5) * .05;
  vec3 p = vec3(cos(a) * r, sin(a) * r, (s.z - .5) * .03);
  vec3 inc = i == 0. ? vec3(.14, .2, 0.) : (i == 1. ? vec3(.24, .06, 0.) : vec3(.06, .3, 0.));
  float balanco = sin(uTempo * .4 + i * 2.1) * .08;
  p = giraY(giraX(p, inc.x + balanco), inc.y - balanco * .6);
  vec3 cascata = i == 0. ? vec3(-.42, .34, -.3) : (i == 1. ? vec3(0.) : vec3(.4, -.32, .3));
  return vec4(p + cascata, 1.);
}

// Esfera: u é a longitude (a mesma volta dos anéis), v a latitude uniforme em
// área. Perto dos polos a grade aperta, e o peso cai na mesma proporção.
vec4 esfera(vec2 g, vec4 s) {
  float th = g.x * TAU + (s.x - .5) * .01 + uRolagem * .45;
  float cz = 1. - 2. * g.y;
  float sn = sqrt(max(0., 1. - cz * cz));
  float r = 1. + .012 * sin(th * 3. + cz * 5. + uTempo * .45);
  return vec4(vec3(sn * cos(th), cz, sn * sin(th)) * r, sn);
}

// Fita torcida que corre na horizontal, com as pontas apagadas fora da tela.
vec4 fita(vec2 g) {
  float u = fract(g.x + uTempo * .012 + uRolagem * .05);
  float x = (u - .5) * 5.6, w = (g.y - .5) * .62;
  float a = x * .95 + uTempo * .18;
  float y = cos(a) * w + sin(x * .75 + uTempo * .25) * .16;
  return vec4(x, y, sin(a) * w, smoothstep(0., .06, u) * smoothstep(1., .94, u));
}

// Poeira: esparsa e funda, mas ainda ordenada da esquerda para a direita.
vec4 poeira(vec2 g, vec4 s) {
  vec3 p = vec3((g.x - .5) * 6.4 + (s.x - .5) * .6, (s.y - .5) * 3.8, (g.y - .5) * 5.);
  p += vec3(sin(uTempo * .07 + s.w * TAU), cos(uTempo * .05 + s.x * TAU), sin(uTempo * .06 + s.y * TAU)) * .12;
  return vec4(p, 1.);
}

// Portal: anéis em profundidade girando em espiral; o scroll gira o túnel.
vec4 portal(vec2 g) {
  float prof = g.y;
  float a = g.x * TAU + prof * 2.6 + uTempo * .05 + uRolagem * .35;
  float r = 1. + .04 * sin(a * 5. - uTempo * .4 + prof * 8.);
  return vec4(cos(a) * r, sin(a) * r, .4 - pow(prof, .85) * 4.5, 1. - prof * .5);
}

vec4 forma(float id, vec2 g, vec4 s, vec4 par) {
  if (id < .5) return onda(g, par);
  if (id < 1.5) return aneis(g, s);
  if (id < 2.5) return esfera(g, s);
  if (id < 3.5) return fita(g);
  if (id < 4.5) return poeira(g, s);
  return portal(g);
}

void main() {
  // Cada ponto parte no seu tempo: varre da esquerda para a direita, com acaso.
  float atraso = aGrade.x * .65 + aSorte.x * .35;
  float ti = smoothstep(0., 1., clamp((uMistura - atraso * .4) / .6, 0., 1.));
  vec4 A = forma(uFormaA, aGrade, aSorte, uParA);
  vec4 B = forma(uFormaB, aGrade, aSorte, uParB);
  vec3 p = mix(A.xyz, B.xyz, ti);
  float peso = mix(A.w, B.w, ti);

  // No meio do caminho o ponto faz uma curva (cardume); parado, só respira.
  float curva = sin(3.14159 * ti);
  vec3 deriva = vec3(sin(aSorte.y * TAU + uTempo * .3), cos(aSorte.z * TAU + uTempo * .26), sin(aSorte.w * TAU - uTempo * .22));
  p += deriva * (.24 * curva + .003 + .03 * uEnergia);

  vec4 mv = modelViewMatrix * vec4(p, 1.);
  gl_Position = projectionMatrix * mv;

  // Profundidade de câmera: fora do plano nítido o ponto cresce, fica macio e
  // mais transparente, como bokeh.
  float dist = -mv.z;
  float coc = abs(dist - uFoco) * uDesfoque;
  float tam = uTamanho * (.7 + aSorte.y * .6) * (11. / dist);
  float borrao = coc * 7.;
  gl_PointSize = min((tam + borrao) * uPixel, 64. * uPixel);
  float cresceu = (tam + borrao) / tam;

  float aceso = 1. - smoothstep(uPresenca - .08, uPresenca, aSorte.w);
  // Profundidade também pela luz: o que está mais perto acende, o fundo apaga.
  float perto = clamp(1. - (dist - uCentro) * .2, .3, 1.4);
  vAlfa = uBrilho * peso * aceso * perto * (.6 + .4 * aSorte.z) / pow(cresceu, 1.15);
  vMacio = clamp(coc * 1.6, 0., 1.);

  vec3 amarelo = vec3(1., .82, .01), claro = vec3(1., .92, .64), papel = vec3(.95, .95, .93);
  vCor = aSorte.z > .84 ? papel : mix(amarelo, claro, aSorte.y * .7);
}
`;

const FRAGMENTO = /* glsl */ `
varying vec3 vCor;
varying float vAlfa;
varying float vMacio;
__LEITURA__
void main() {
  float r = length(gl_PointCoord - .5) * 2.;
  float disco = 1. - smoothstep(.72 - .62 * vMacio, 1., r);
  float a = disco * vAlfa * leitura(gl_FragCoord.xy);
  if (a < .003) discard;
  gl_FragColor = vec4(vCor, a);
}
`;

function criar(ctx: Contexto): Elemento {
  const { celular } = ctx;
  const colunas = celular ? 150 : 240, linhas = celular ? 68 : 112;
  const n = colunas * linhas;
  const grade = new Float32Array(n * 2), sorte = new Float32Array(n * 4);
  for (let l = 0, i = 0; l < linhas; l++) {
    for (let c = 0; c < colunas; c++, i++) {
      grade[i * 2] = (c + .5) / colunas;
      grade[i * 2 + 1] = (l + .5) / linhas;
      for (let k = 0; k < 4; k++) sorte[i * 4 + k] = Math.random();
    }
  }
  const geometria = new BufferGeometry();
  geometria.setAttribute('position', new BufferAttribute(new Float32Array(n * 3), 3));
  geometria.setAttribute('aGrade', new BufferAttribute(grade, 2));
  geometria.setAttribute('aSorte', new BufferAttribute(sorte, 4));

  const u = {
    uTempo: { value: 0 }, uRolagem: { value: 0 }, uEnergia: { value: 0 },
    uMistura: { value: 0 }, uFormaA: { value: 0 }, uFormaB: { value: 0 },
    uParA: { value: [1, 0, 0, 0] }, uParB: { value: [1, 0, 0, 0] },
    uPresenca: { value: 1 }, uBrilho: { value: 1 },
    uFoco: { value: 11 }, uDesfoque: { value: .5 }, uCentro: { value: 11 },
    uTamanho: { value: celular ? 2.1 : 2.5 }, uPixel: { value: 1 },
  };
  const material = new ShaderMaterial({
    uniforms: { ...u, ...ctx.leitura.uniforms },
    vertexShader: VERTICE,
    fragmentShader: FRAGMENTO.replace('__LEITURA__', ctx.leitura.glsl),
    transparent: true, depthWrite: false, depthTest: false, blending: AdditiveBlending,
  });
  const pontos = new Points(geometria, material);
  pontos.frustumCulled = false;
  ctx.cena.add(pontos);

  return {
    quadros: QUADROS,
    pintar({ a, b, t, q: e, tempo, rolagem, energia, entrada, ponteiro }) {
      const { altura, largura } = ctx.meia();

      const x = e.fx * largura, y = e.fy * altura, d = ctx.camera.position.z - e.z;
      pontos.position.set(x, y, e.z);
      pontos.scale.setScalar(e.k * altura * (.94 + .06 * entrada));
      // mira: gira o eixo do objeto para a câmera (o portal é visto de frente fora do centro).
      const mx = Math.atan2(y, Math.hypot(x, d)) * e.mira, my = Math.atan2(-x, d) * e.mira;
      pontos.rotation.set(e.rx + mx + ponteiro.y * .05, e.ry + my + ponteiro.x * .07, e.rz);

      u.uTempo.value = tempo;
      u.uRolagem.value = rolagem;
      u.uEnergia.value = energia;
      u.uMistura.value = t;
      u.uFormaA.value = a.forma;
      u.uFormaB.value = b.forma;
      u.uParA.value = [a.amp, a.cresce, 0, 0];
      u.uParB.value = [b.amp, b.cresce, 0, 0];
      u.uPresenca.value = e.presenca;
      u.uBrilho.value = e.brilho * entrada;
      u.uCentro.value = ctx.camera.position.z - e.z;
      u.uFoco.value = u.uCentro.value + e.foco;
      u.uDesfoque.value = e.desfoque;
      u.uPixel.value = ctx.renderer.getPixelRatio();
    },
  };
}

export const iniciar = (canvas: HTMLCanvasElement) => iniciarMotor(canvas, criar);
