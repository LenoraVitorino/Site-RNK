/**
 * Caminho C do fundo vivo: ondas em preto líquido (22/09/2026).
 * Especificação: docs/04-design/fundo-vivo-briefing.md.
 *
 * Um disco de malha polar (denso no centro, onde as ondas nascem) deslocado
 * no shader por ondas concêntricas de crista redonda e vale largo, como uma
 * gota em óleo. O material é preto polido; quem desenha a forma é o reflexo
 * de um estúdio de três faixas de luz (amarela à direita, clara em cima, fria
 * à esquerda). A cada dobra mudam o centro das ondas, a inclinação, a calma
 * da superfície e o giro do estúdio, e o reflexo amarelo corre pelas cristas
 * com o scroll. O próprio scroll empurra as ondas para fora.
 */
import {
  BufferAttribute, BufferGeometry, Color, DoubleSide, Mesh, MeshBasicMaterial,
  MeshPhysicalMaterial, PlaneGeometry, PMREMGenerator, Scene,
} from 'three';
import { iniciar as iniciarMotor, type Contexto, type Elemento, type Quadro } from './fundo-motor';

/**
 * Quadros por dobra. fx, fy: onde fica o centro das ondas, em frações da
 * metade visível da tela; k: tamanho; inclina: 0 de frente, perto de 1,3
 * rasante como um chão; amp e freq: altura e densidade das ondas; pulso e
 * pulsoR: uma onda solitária e o raio por onde ela passa; funil: o centro
 * afunda como um túnel raso; luz: giro do estúdio (move o reflexo amarelo);
 * exposicao e leitura: brilho geral e quanto o fundo escurece atrás do texto.
 */
const base = { z: 0, ry: 0, rz: 0, amp: .2, freq: 4.6, pulso: 0, pulsoR: 0, funil: 0, luz: 0, exposicao: 1.15, leitura: .85 };
const q = (o: Partial<Quadro>): Quadro => ({ ...base, fx: 0, fy: 0, k: 1, inclina: 0, ...o });

const QUADROS = {
  desktop: {
    // De frente, como a referência dos anéis pretos: centro à direita do título, anéis maiores saindo da tela.
    hero:        q({ fx: .46, fy: .1, k: 1.15, inclina: .22, ry: -.28, amp: .22, luz: .2 }),
    // A câmera deita: as ondas viram relevo em perspectiva, embaixo e à esquerda, em volta do vídeo.
    metodologia: q({ fx: -.5, fy: -.42, k: 1.3, inclina: 1.0, ry: .35, amp: .16, luz: 1.1, exposicao: .65 }),
    // Superfície quase lisa: só um reflexo largo atravessa, desfocado pelos cartões de vidro.
    pilares:     q({ fx: 0, fy: -.35, k: 1.4, inclina: .8, amp: .07, luz: 2, exposicao: .85, pulsoR: 1 }),
    // Rasante como um horizonte; uma onda solitária cruza atrás das letras.
    letreiro:    q({ fx: 0, fy: -.3, k: 1.4, inclina: 1.2, amp: .1, pulso: .2, pulsoR: 7, luz: 2.6, exposicao: .85, leitura: .75 }),
    // Um novo centro nasce no alto, à direita da frase.
    perguntas:   q({ fx: .78, fy: .55, k: 1.2, inclina: .3, ry: -.3, amp: .2, luz: .4, pulsoR: 12, exposicao: 1.1 }),
    // Chão calmo e baixo sob os dois cartões.
    academy:     q({ fy: -.85, k: 1.5, inclina: 1.15, amp: .14, luz: 3.8, exposicao: .6 }),
    // Respiro à esquerda, embaixo, mais escuro, atrás das fotos.
    sobre:       q({ fx: -.55, fy: -.6, k: 1.2, inclina: .85, amp: .16, luz: 4.4, exposicao: .7 }),
    // De frente de novo: as ondas emolduram o cartão e o centro afunda como um túnel raso.
    formulario:  q({ fx: .54, fy: .16, k: .9, inclina: .08, amp: .16, funil: .35, luz: 5.4, exposicao: .55 }),
  },
  celular: {
    hero:        q({ fx: .3, fy: -.35, k: 1.2, inclina: .3, ry: -.2, amp: .22, luz: .2, exposicao: .9 }),
    metodologia: q({ fx: 0, fy: -.45, k: 1.3, inclina: 1.0, ry: .3, amp: .16, luz: 1.1, exposicao: .6 }),
    pilares:     q({ fy: -.3, k: 1.4, inclina: .8, amp: .07, luz: 2, exposicao: .8, pulsoR: 1 }),
    letreiro:    q({ fy: -.25, k: 1.4, inclina: 1.2, amp: .1, pulso: .2, pulsoR: 7, luz: 2.6 }),
    perguntas:   q({ fx: .5, fy: .6, k: 1.2, inclina: .3, amp: .2, luz: .4, pulsoR: 12, exposicao: 1 }),
    academy:     q({ fy: -.85, k: 1.5, inclina: 1.15, amp: .14, luz: 3.8, exposicao: .55 }),
    sobre:       q({ fx: -.3, fy: -.6, k: 1.2, inclina: .85, amp: .16, luz: 4.4, exposicao: .65 }),
    formulario:  q({ fy: .3, k: 1, inclina: .08, amp: .16, funil: .35, luz: 5.4, exposicao: .5 }),
  },
};

const ALTURA = /* glsl */ `
uniform float uTempo, uRolagem, uEnergia, uAmp, uFreq, uPulso, uPulsoR, uFunil;
varying float vRaio;
// Crista redonda e vale largo: o cosseno elevado ao quadrado, com média zero.
float altura(vec2 p) {
  float r = length(p);
  float fase = r * uFreq - uTempo * .5 - uRolagem * 2.4;
  float onda = pow(.5 + .5 * cos(fase), 2.) - .375;
  float envelope = exp(-r * .1) * smoothstep(0., .9, r);
  float h = (uAmp + uEnergia * .05) * onda * envelope;
  h += uPulso * exp(-pow((r - uPulsoR) / .55, 2.));
  h -= uFunil * 1.4 / (1. + r * r * .45);
  return h;
}
`;

/** Disco polar: anéis de vértices mais juntos perto do centro. */
function discoPolar(aneis: number, segmentos: number, raio: number) {
  const n = (aneis + 1) * segmentos;
  const pos = new Float32Array(n * 3), normal = new Float32Array(n * 3);
  for (let j = 0, i = 0; j <= aneis; j++) {
    const r = raio * Math.pow(j / aneis, 1.35);
    for (let s = 0; s < segmentos; s++, i++) {
      const a = (s / segmentos) * Math.PI * 2;
      pos[i * 3] = Math.cos(a) * r;
      pos[i * 3 + 1] = Math.sin(a) * r;
      normal[i * 3 + 2] = 1;
    }
  }
  const indices: number[] = [];
  for (let j = 0; j < aneis; j++) {
    for (let s = 0; s < segmentos; s++) {
      const a = j * segmentos + s, b = j * segmentos + ((s + 1) % segmentos);
      const c = a + segmentos, d = b + segmentos;
      indices.push(a, c, b, b, c, d);
    }
  }
  const g = new BufferGeometry();
  g.setAttribute('position', new BufferAttribute(pos, 3));
  g.setAttribute('normal', new BufferAttribute(normal, 3));
  g.setIndex(indices);
  return g;
}

/** Estúdio para os reflexos: três faixas de luz no escuro. */
function estudio() {
  const s = new Scene();
  const faixa = (cor: string, forca: number, w: number, h: number, x: number, y: number, z: number) => {
    const m = new Mesh(new PlaneGeometry(w, h), new MeshBasicMaterial({ color: new Color(cor).multiplyScalar(forca), side: DoubleSide }));
    m.position.set(x, y, z);
    m.lookAt(0, 0, 0);
    s.add(m);
  };
  faixa('#FFD103', 11, 2.6, 16, 7, 1, 4);     // quente, alta, à direita
  faixa('#FFEBA3', 3.2, 12, 1.6, 0, 8, 3);    // clara e macia, em cima
  faixa('#E4ECFF', 1.8, 1.2, 14, -8, -1, 3);  // contorno frio, à esquerda
  return s;
}

const RAIO = 12;

function criar(ctx: Contexto): Elemento {
  const { celular, renderer, cena } = ctx;
  const pmrem = new PMREMGenerator(renderer);
  cena.environment = pmrem.fromScene(estudio(), .02).texture;
  pmrem.dispose();

  const u = {
    uTempo: { value: 0 }, uRolagem: { value: 0 }, uEnergia: { value: 0 },
    uAmp: { value: .2 }, uFreq: { value: 4.6 }, uPulso: { value: 0 }, uPulsoR: { value: 0 }, uFunil: { value: 0 },
    uBorda: { value: RAIO * .9 },
  };
  const material = new MeshPhysicalMaterial({
    color: new Color('#131210'), metalness: .7, roughness: .2,
    clearcoat: 1, clearcoatRoughness: .12, envMapIntensity: 1,
  });
  material.onBeforeCompile = (shader) => {
    Object.assign(shader.uniforms, u, ctx.leitura.uniforms);
    shader.vertexShader = shader.vertexShader
      .replace('#include <common>', `#include <common>\n${ALTURA}`)
      .replace('#include <beginnormal_vertex>', /* glsl */ `
        vec2 pp = position.xy;
        float e = .012 + length(pp) * .004;
        float hx = altura(pp + vec2(e, 0.)) - altura(pp - vec2(e, 0.));
        float hy = altura(pp + vec2(0., e)) - altura(pp - vec2(0., e));
        vec3 objectNormal = normalize(vec3(-hx / (2. * e), -hy / (2. * e), 1.));
        #ifdef USE_TANGENT
          vec3 objectTangent = vec3(tangent.xyz);
        #endif`)
      .replace('#include <begin_vertex>', 'vec3 transformed = vec3(position.xy, altura(position.xy)); vRaio = length(position.xy);');
    shader.fragmentShader = shader.fragmentShader
      .replace('#include <common>', `#include <common>\n${ctx.leitura.glsl}\nvarying float vRaio;\nuniform float uBorda;`)
      .replace('#include <dithering_fragment>', /* glsl */ `#include <dithering_fragment>
        gl_FragColor.rgb *= leitura(gl_FragCoord.xy) * (1. - smoothstep(uBorda * .5, uBorda, vRaio));`);
  };

  const superficie = new Mesh(discoPolar(celular ? 110 : 200, celular ? 144 : 256, RAIO), material);
  superficie.frustumCulled = false;
  cena.add(superficie);

  return {
    quadros: QUADROS,
    pintar({ q: e, tempo, rolagem, energia, entrada, ponteiro }) {
      const { altura } = ctx.meia();
      const largura = altura * ctx.camera.aspect;
      superficie.position.set(e.fx * largura, e.fy * altura, e.z);
      superficie.scale.setScalar((e.k * altura / 4) * (.94 + .06 * entrada));
      superficie.rotation.set(-e.inclina + ponteiro.y * .04, e.ry + ponteiro.x * .06, e.rz);
      cena.environmentRotation.set(0, e.luz, 0);

      u.uTempo.value = tempo;
      u.uRolagem.value = rolagem;
      u.uEnergia.value = energia;
      u.uAmp.value = e.amp;
      u.uFreq.value = e.freq;
      u.uPulso.value = e.pulso;
      u.uPulsoR.value = e.pulsoR;
      u.uFunil.value = e.funil;
    },
  };
}

export const iniciar = (canvas: HTMLCanvasElement) => iniciarMotor(canvas, criar);
