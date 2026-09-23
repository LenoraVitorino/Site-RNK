/**
 * Fundo vivo atrás da página (laboratório, 22/09/2026).
 * Especificação: docs/04-design/hero-aneis-prompt.md.
 *
 * Um único <canvas> fixo. Cada dobra da página é um quadro-chave (posição,
 * tamanho, forma, profundidade, luz); o estado é interpolado pelo scroll e
 * amortecido. O objeto é trocável: a Lenora aprovou a dinâmica e reprovou os
 * anéis, então a página compara três objetos pelo parâmetro ?objeto=.
 *
 * `forma` vai de 0 (solto, na hero) a 1 (integrado): cada objeto interpreta
 * do seu jeito. `prof` é o final, em volta do formulário.
 */
import {
  AdditiveBlending, BufferAttribute, BufferGeometry, CanvasTexture, Color, DirectionalLight,
  DoubleSide, Group, IcosahedronGeometry, Mesh, MeshBasicMaterial, MeshPhysicalMaterial,
  NeutralToneMapping, PerspectiveCamera, PlaneGeometry, PMREMGenerator, Scene, SRGBColorSpace,
  Vector3, WebGLRenderer,
} from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';

/** Estado de um quadro-chave. Posições em frações da metade visível da tela. */
interface Estado {
  fx: number;      // -1 borda esquerda, 1 borda direita
  fy: number;      // -1 embaixo, 1 em cima
  k: number;       // tamanho, em fração da menor metade da tela
  z: number;       // profundidade do conjunto
  forma: number;   // 0 solto, 1 integrado
  prof: number;    // o final em volta do formulário
  brilho: number;  // intensidade do brilho âmbar atrás
  luz: number;     // exposição da cena: menor onde há muito texto por cima
}
type Chave = keyof Estado;
const CHAVES: Chave[] = ['fx', 'fy', 'k', 'z', 'forma', 'prof', 'brilho', 'luz'];

/** Quadros-chave por dobra. Nas dobras sólidas (palco, saída) o objeto fica coberto. */
const QUADROS_DESKTOP: Record<string, Estado> = {
  hero:        { fx:  .50, fy:  .04, k: .56, z:  0,   forma: 0,   prof: 0, brilho: 1,  luz: 1 },
  metodologia: { fx: -.95, fy:  .05, k: .50, z: -2.5, forma: .35, prof: 0, brilho: .6, luz: .6 },
  pilares:     { fx:  0,   fy: -.14, k: .48, z: -1.6, forma: .82, prof: 0, brilho: .6, luz: .45 },
  letreiro:    { fx:  0,   fy:  0,   k: .46, z:  0,   forma: 1,   prof: 0, brilho: .8, luz: .8 },
  palco:       { fx:  0,   fy:  0,   k: .46, z:  0,   forma: 1,   prof: 0, brilho: .8, luz: .8 },
  perguntas:   { fx:  .64, fy:  .40, k: .38, z:  0,   forma: 1,   prof: 0, brilho: .7, luz: .75 },
  saida:       { fx:  .98, fy:  .85, k: .24, z: -1,   forma: 1,   prof: 0, brilho: .3, luz: .5 },
  formulario:  { fx:  .44, fy:  .02, k: .76, z: -1,   forma: 1,   prof: 1, brilho: .8, luz: .7 },
};
const QUADROS_CELULAR: Record<string, Estado> = {
  hero:        { fx:  .60, fy:  .62, k: .58, z:  0,   forma: 0,   prof: 0, brilho: .8, luz: .9 },
  metodologia: { fx:  0,   fy:  .20, k: .70, z: -2,   forma: .35, prof: 0, brilho: .5, luz: .6 },
  pilares:     { fx:  0,   fy:  0,   k: .70, z: -1.2, forma: .82, prof: 0, brilho: .6, luz: .55 },
  letreiro:    { fx:  0,   fy:  0,   k: .60, z:  0,   forma: 1,   prof: 0, brilho: .8, luz: .8 },
  palco:       { fx:  0,   fy:  0,   k: .60, z:  0,   forma: 1,   prof: 0, brilho: .8, luz: .8 },
  perguntas:   { fx:  .60, fy:  .62, k: .45, z:  0,   forma: 1,   prof: 0, brilho: .6, luz: .7 },
  saida:       { fx:  .98, fy:  .98, k: .28, z: -1,   forma: 1,   prof: 0, brilho: .3, luz: .5 },
  formulario:  { fx:  0,   fy:  .32, k: .85, z: -1,   forma: 1,   prof: 1, brilho: .7, luz: .65 },
};

/** Dobra da página → quadro-chave. O quadro vale quando o topo da dobra chega ao meio da tela. */
const ROTEIRO: [string, string][] = [
  ['.hero', 'hero'],
  ['#o-que-fazemos', 'metodologia'],
  ['#pilares-revena', 'pilares'],
  ['.letreiro', 'letreiro'],
  ['[data-palcoplanos]', 'palco'],
  ['#perguntas', 'perguntas'],
  ['#resultados', 'saida'],
  ['#sobre', 'saida'],
  ['#formulario', 'formulario'],
];

export const DOBRAS_TRANSPARENTES = '.hero, #o-que-fazemos, #pilares-revena, .letreiro, #perguntas, #formulario';

const suave = (x: number) => x * x * (3 - 2 * x);
const limita = (x: number, a = 0, b = 1) => Math.max(a, Math.min(b, x));
const mistura = (a: number, b: number, t: number) => a + (b - a) * t;

/** O que cada objeto entrega para a cena comum. */
interface Objeto {
  grupo: Group;
  /** Raio nominal: o tamanho `k` dos quadros-chave é medido contra ele. */
  raio: number;
  /** Quanto do brilho âmbar de fundo o objeto aguenta (a seda, clara, quase nada). */
  brilho: number;
  atualizar(forma: number, prof: number, tempo: number): void;
}

/* ------------------------------------------------------------------ */
/* Seda: um tecido amarelo acetinado ondulando devagar. Solto, a onda é */
/* mais viva; integrado, vira uma dobra única e calma. No final, curva  */
/* em volta do formulário. As ondas são calculadas no shader, com a     */
/* normal analítica, e as bordas somem num degradê.                     */
/* ------------------------------------------------------------------ */
function criarSeda(celular: boolean): Objeto {
  const uniformes = {
    uTempo: { value: 0 },
    uAmp: { value: new Vector3(.5, .2, .07) },
    uCurva: { value: 0 },
  };
  const material = new MeshPhysicalMaterial({
    // Tom mais fundo e sem brilho próprio: com mais luz, o tecido vira um feixe.
    color: new Color('#F2BE14'), roughness: .38, metalness: 0,
    sheen: .5, sheenColor: new Color('#FFE9A0'), sheenRoughness: .3,
    clearcoat: .25, clearcoatRoughness: .35,
    envMapIntensity: .9,
    side: DoubleSide, transparent: true, depthWrite: false,
  });
  material.onBeforeCompile = (shader) => {
    Object.assign(shader.uniforms, uniformes);
    // Cristas de tecido: ondas ao longo de u, que se curva devagar em y. A normal
    // sai por diferenças finitas, então a altura pode ser qualquer função.
    const funcoes = /* glsl */`
      uniform float uTempo; uniform vec3 uAmp; uniform float uCurva;
      varying vec2 vUvSeda;
      float alturaSeda(vec2 p) {
        float u = p.x + .35 * sin(.6 * p.y + uTempo * .2);
        float h = uAmp.x * sin(1.3 * u + .35 * uTempo)
                + uAmp.y * sin(2.7 * u - .55 * uTempo + 1.2 * sin(.8 * p.y + .3 * uTempo))
                + uAmp.z * sin(5.1 * u + .8 * uTempo + .6 * p.y)
                + .18 * sin(.55 * p.y + .25 * uTempo);
        return h + uCurva * .35 * p.x * p.x;
      }
      vec2 inclinacaoSeda(vec2 p) {
        float e = .01;
        float h = alturaSeda(p);
        return vec2(alturaSeda(p + vec2(e, 0.0)) - h, alturaSeda(p + vec2(0.0, e)) - h) / e;
      }
    `;
    shader.vertexShader = shader.vertexShader
      .replace('#include <common>', `#include <common>\n${funcoes}`)
      .replace('#include <beginnormal_vertex>', `
        vec2 incl = inclinacaoSeda(position.xy);
        vec3 objectNormal = normalize(vec3(-incl.x, -incl.y, 1.0));
        #ifdef USE_TANGENT
          vec3 objectTangent = vec3(tangent.xyz);
        #endif
      `)
      .replace('#include <begin_vertex>', `
        vec3 transformed = vec3(position.xy, alturaSeda(position.xy));
        vUvSeda = uv;
      `);
    shader.fragmentShader = shader.fragmentShader
      .replace('#include <common>', '#include <common>\nvarying vec2 vUvSeda;')
      .replace('#include <color_fragment>', `#include <color_fragment>
        float bordaX = smoothstep(0.0, .14, vUvSeda.x) * smoothstep(1.0, .86, vUvSeda.x);
        float bordaY = smoothstep(0.0, .04, vUvSeda.y) * smoothstep(1.0, .96, vUvSeda.y);
        diffuseColor.a *= bordaX * bordaY;
      `);
  };
  // Um lenço largo de cetim: comprido em x, com as bordas de cima e de baixo à vista.
  const malha = new Mesh(new PlaneGeometry(6.4, 2.3, celular ? 130 : 260, celular ? 50 : 100), material);
  malha.rotation.set(-1.1, .12, .42);   // deitado para trás, em diagonal: as cristas ganham sombra
  const grupo = new Group();
  grupo.add(malha);
  return {
    grupo,
    raio: 2.1,
    brilho: .25,
    atualizar(forma, prof, tempo) {
      uniformes.uTempo.value = tempo;
      uniformes.uAmp.value.set(mistura(.62, .7, forma), mistura(.3, .14, forma), mistura(.1, .04, forma));
      uniformes.uCurva.value = prof;
      malha.rotation.x = mistura(-1.1, -.6, prof);
    },
  };
}

/* ------------------------------------------------------------------ */
/* Fita: uma fita acetinada contínua, a jornada do paciente. Solta, faz */
/* laços livres; integrada, desenha um oito calmo; no final vira uma    */
/* espiral que recua em volta do formulário. Afina nas pontas e gira    */
/* devagar no próprio eixo.                                             */
/* ------------------------------------------------------------------ */
function criarFita(celular: boolean): Objeto {
  const amostras = celular ? 220 : 420;
  const posicoes = new Float32Array(amostras * 2 * 3);
  const indices: number[] = [];
  for (let i = 0; i < amostras - 1; i++) {
    const a = i * 2, b = a + 1, c = a + 2, d = a + 3;
    indices.push(a, c, b, b, c, d);
  }
  const geometria = new BufferGeometry();
  geometria.setAttribute('position', new BufferAttribute(posicoes, 3));
  geometria.setIndex(indices);
  const material = new MeshPhysicalMaterial({
    color: new Color('#FFD447'), roughness: .34, metalness: 0,
    sheen: 1, sheenColor: new Color('#FFF3C4'), sheenRoughness: .4,
    clearcoat: .6, clearcoatRoughness: .25,
    emissive: new Color('#FFA800'), emissiveIntensity: .1, envMapIntensity: 1.4,
    side: DoubleSide,
  });
  const malha = new Mesh(geometria, material);
  const grupo = new Group();
  grupo.add(malha);

  const p = new Vector3(), antes = new Vector3(), depois = new Vector3();
  const tangente = new Vector3(), lado = new Vector3(), cima = new Vector3(), binormal = new Vector3();
  const Z = new Vector3(0, 0, 1), Y = new Vector3(0, 1, 0);

  const caminho = (u: number, forma: number, prof: number, t: number, alvo: Vector3) => {
    const th = u * Math.PI * 2;
    // Solta: laços livres que fluem com o tempo.
    const lx = 1.7 * Math.sin(th + .3 + t * .05);
    const ly = .95 * Math.sin(th * 2 + t * .22);
    const lz = 1.1 * Math.cos(th * 1.5 + t * .18);
    // Integrada: um oito (lemniscata) quase plano.
    const s = Math.sin(th), c = Math.cos(th), dd = 1 + s * s;
    const ix = 1.65 * c / dd, iy = 1.65 * s * c / dd, iz = .3 * s;
    // Final: espiral recuando.
    const hx = 1.25 * Math.cos(th * 2.5 + t * .1), hy = 1.25 * Math.sin(th * 2.5 + t * .1), hz = 1.4 - u * 5;
    alvo.set(mistura(lx, ix, forma), mistura(ly, iy, forma), mistura(lz, iz, forma));
    alvo.set(mistura(alvo.x, hx, prof), mistura(alvo.y, hy, prof), mistura(alvo.z, hz, prof));
    return alvo;
  };

  return {
    grupo,
    raio: 1.6,
    brilho: 1,
    atualizar(forma, prof, tempo) {
      const du = .002;
      for (let i = 0; i < amostras; i++) {
        const u = .02 + (i / (amostras - 1)) * .96;
        caminho(u, forma, prof, tempo, p);
        caminho(u - du, forma, prof, tempo, antes);
        caminho(u + du, forma, prof, tempo, depois);
        tangente.subVectors(depois, antes).normalize();
        cima.copy(Math.abs(tangente.dot(Z)) > .92 ? Y : Z);
        lado.crossVectors(cima, tangente).normalize();
        binormal.crossVectors(tangente, lado);
        const giro = u * Math.PI * 1.2 + tempo * .12;
        lado.multiplyScalar(Math.cos(giro)).addScaledVector(binormal, Math.sin(giro));
        const largura = .42 * Math.pow(Math.sin(Math.PI * u), .6);
        const o = i * 6;
        posicoes[o] = p.x - lado.x * largura / 2;
        posicoes[o + 1] = p.y - lado.y * largura / 2;
        posicoes[o + 2] = p.z - lado.z * largura / 2;
        posicoes[o + 3] = p.x + lado.x * largura / 2;
        posicoes[o + 4] = p.y + lado.y * largura / 2;
        posicoes[o + 5] = p.z + lado.z * largura / 2;
      }
      geometria.attributes.position.needsUpdate = true;
      geometria.computeVertexNormals();
      geometria.computeBoundingSphere();
    },
  };
}

/* ------------------------------------------------------------------ */
/* Pérola: uma esfera de vidro fosco com uma luz âmbar por dentro. Na   */
/* hero, três gotas menores (marketing, comercial, operação) orbitam em */
/* volta; conforme a página desce, elas entram e se fundem na esfera.   */
/* No final, a esfera cresce e vira uma luz atrás do formulário.        */
/* ------------------------------------------------------------------ */
function criarPerola(celular: boolean): Objeto {
  const vidro = celular
    ? new MeshPhysicalMaterial({
        color: new Color('#FFE6A0'), roughness: .24, metalness: 0,
        clearcoat: 1, clearcoatRoughness: .15, sheen: .8, sheenColor: new Color('#FFF6DC'),
        emissive: new Color('#FFB000'), emissiveIntensity: .2, envMapIntensity: 1.5,
      })
    : new MeshPhysicalMaterial({
        // Vidro fosco quase branco, com furta-cor leve de madrepérola: a cor vem
        // do núcleo âmbar, visto desfocado através dele.
        // Leitoso: transmissão parcial e rugosidade alta espalham a luz do núcleo
        // pela esfera inteira, em vez de mostrar uma gema dentro de vidro escuro.
        color: new Color('#FFF6E2'), roughness: .58, metalness: 0,
        transmission: .78, thickness: 3, ior: 1.3,
        attenuationColor: new Color('#FFE9A8'), attenuationDistance: 3,
        clearcoat: 1, clearcoatRoughness: .08, specularIntensity: 1,
        iridescence: .6, iridescenceIOR: 1.3, iridescenceThicknessRange: [180, 420],
        emissive: new Color('#FFCF4A'), emissiveIntensity: .07, envMapIntensity: 1.4,
      });
  const grupo = new Group();
  const esfera = new Mesh(new IcosahedronGeometry(1.2, celular ? 24 : 48), vidro);
  const nucleo = new Mesh(
    new IcosahedronGeometry(.62, 16),
    new MeshBasicMaterial({ color: new Color('#FFD84A'), toneMapped: false }),
  );
  nucleo.visible = !celular;   // sem transmissão, o núcleo não apareceria através do vidro
  grupo.add(nucleo, esfera);
  const gotas = [0, 1, 2].map(() => {
    const g = new Mesh(new IcosahedronGeometry(.26, celular ? 12 : 24), vidro);
    grupo.add(g);
    return g;
  });
  const nucleosGotas = gotas.map((g) => {
    const n = new Mesh(new IcosahedronGeometry(.14, 8), nucleo.material);
    n.visible = !celular;
    grupo.add(n);
    return n;
  });
  return {
    grupo,
    raio: 1.9,
    brilho: .8,
    atualizar(forma, prof, tempo) {
      const respira = 1 + .015 * Math.sin(tempo * .8);
      const cresce = 1 + .45 * prof;
      esfera.scale.setScalar(respira * cresce);
      nucleo.scale.setScalar((1 + .06 * Math.sin(tempo * .6 + 1)) * cresce * (1 + .25 * forma));
      const entra = suave(limita(forma));
      gotas.forEach((g, i) => {
        const angulo = tempo * .22 + i * (Math.PI * 2 / 3);
        const raio = mistura(1.75, 0, entra);
        g.position.set(Math.cos(angulo) * raio, Math.sin(angulo) * raio * .55 + Math.sin(tempo * .5 + i) * .08 * (1 - entra), Math.sin(angulo) * raio * .6);
        const tamanho = mistura(1, .5, entra);
        g.scale.setScalar(tamanho);
        g.visible = entra < .97;
        nucleosGotas[i].position.copy(g.position);
        nucleosGotas[i].scale.setScalar(tamanho);
        nucleosGotas[i].visible = !celular && g.visible;
      });
    },
  };
}

const OBJETOS: Record<string, (celular: boolean) => Objeto> = { seda: criarSeda, fita: criarFita, perola: criarPerola };
export const NOMES_OBJETOS = Object.keys(OBJETOS);

/** Brilho radial âmbar desenhado num canvas, atrás do objeto. */
function texturaBrilho() {
  const c = document.createElement('canvas');
  c.width = c.height = 512;
  const g = c.getContext('2d')!;
  const r = g.createRadialGradient(256, 256, 0, 256, 256, 256);
  r.addColorStop(0, 'rgba(255, 196, 40, .55)');
  r.addColorStop(.35, 'rgba(255, 170, 20, .18)');
  r.addColorStop(.7, 'rgba(255, 150, 0, .04)');
  r.addColorStop(1, 'rgba(255, 150, 0, 0)');
  g.fillStyle = r;
  g.fillRect(0, 0, 512, 512);
  const t = new CanvasTexture(c);
  t.colorSpace = SRGBColorSpace;
  return t;
}

export function iniciar(canvas: HTMLCanvasElement, nomeObjeto: string) {
  const celular = matchMedia('(max-width: 899.98px), (hover: none)').matches;
  const reduzido = matchMedia('(prefers-reduced-motion: reduce)');
  const quadros = celular ? QUADROS_CELULAR : QUADROS_DESKTOP;

  let renderer: WebGLRenderer;
  try {
    renderer = new WebGLRenderer({ canvas, antialias: !celular, alpha: false, powerPreference: 'high-performance' });
  } catch {
    return;   // sem WebGL: a página segue com o fundo preto
  }
  renderer.setClearColor(0x000000, 1);
  renderer.toneMapping = NeutralToneMapping;
  renderer.setPixelRatio(Math.min(devicePixelRatio, celular ? 1 : 1.5));

  const cena = new Scene();
  const pmrem = new PMREMGenerator(renderer);
  cena.environment = pmrem.fromScene(new RoomEnvironment(), .04).texture;
  pmrem.dispose();

  const camera = new PerspectiveCamera(32, 1, .1, 100);
  camera.position.set(0, 0, 11);

  const luz = new DirectionalLight(0xfff0d2, 1.6);
  luz.position.set(4, 5, 6);
  const contorno = new DirectionalLight(0xd8e4ff, .45);
  contorno.position.set(-5, -2, -4);
  cena.add(luz, contorno);

  const brilho = new Mesh(
    new PlaneGeometry(1, 1),
    new MeshBasicMaterial({ map: texturaBrilho(), transparent: true, depthWrite: false, blending: AdditiveBlending, toneMapped: false }),
  );
  brilho.position.z = -5;
  cena.add(brilho);

  const objeto = (OBJETOS[nomeObjeto] ?? criarFita)(celular);
  const conjunto = objeto.grupo;
  cena.add(conjunto);

  // Âncoras do roteiro, medidas das dobras reais.
  let ancoras: { y: number; estado: Estado }[] = [];
  const medir = () => {
    const meio = innerHeight * .5;
    ancoras = ROTEIRO.flatMap(([seletor, nome]) => {
      const el = document.querySelector<HTMLElement>(seletor);
      if (!el) return [];
      const y = nome === 'hero' ? 0 : el.getBoundingClientRect().top + scrollY - meio;
      return [{ y, estado: quadros[nome] }];
    }).sort((a, b) => a.y - b.y);
  };
  const alvoPara = (y: number): Estado => {
    if (!ancoras.length) return quadros.hero;
    if (y <= ancoras[0].y) return ancoras[0].estado;
    for (let i = 0; i < ancoras.length - 1; i++) {
      const a = ancoras[i], b = ancoras[i + 1];
      if (y < b.y) {
        const t = suave(limita((y - a.y) / Math.max(1, b.y - a.y)));
        const e = {} as Estado;
        for (const c of CHAVES) e[c] = a.estado[c] + (b.estado[c] - a.estado[c]) * t;
        return e;
      }
    }
    return ancoras[ancoras.length - 1].estado;
  };

  const atual: Estado = { ...quadros.hero };
  const ponteiro = { x: 0, y: 0, ax: 0, ay: 0 };
  if (!celular) {
    addEventListener('pointermove', (e) => {
      ponteiro.x = (e.clientX / innerWidth) * 2 - 1;
      ponteiro.y = (e.clientY / innerHeight) * 2 - 1;
    }, { passive: true });
  }

  const redimensionar = () => {
    renderer.setSize(innerWidth, innerHeight, false);
    camera.aspect = innerWidth / innerHeight;
    camera.updateProjectionMatrix();
    medir();
  };

  let tempo = 0;
  const inicio = performance.now();

  const pintar = (dt: number) => {
    const parado = reduzido.matches;
    if (!parado) tempo += dt;

    // Estado alvo pelo scroll, amortecido (meia-vida ~120 ms). Movimento reduzido: sem amortecer.
    const alvo = alvoPara(scrollY);
    const f = parado ? 1 : 1 - Math.exp(-dt / .173);
    for (const c of CHAVES) atual[c] += (alvo[c] - atual[c]) * f;

    // Entrada: fade e leve crescimento; depois de ~3 s, um primeiro passo rumo ao integrado.
    const decorrido = (performance.now() - inicio) / 1000;
    const entrada = parado ? 1 : suave(limita(decorrido / 1.6));
    const atencao = parado ? 0 : .15 * suave(limita((decorrido - 2.6) / 1.6));
    const forma = limita(atual.forma + atencao * (1 - atual.forma));

    const meiaAltura = Math.tan((camera.fov * Math.PI) / 360) * camera.position.z;
    const meiaLargura = meiaAltura * camera.aspect;
    const unidade = Math.min(meiaAltura, meiaLargura);
    const escala = (atual.k * unidade / objeto.raio) * (.92 + .08 * entrada);

    conjunto.position.set(atual.fx * meiaLargura, atual.fy * meiaAltura, atual.z);
    conjunto.scale.setScalar(escala);

    // Respiração lenta do conjunto; o ponteiro inclina no máximo ~5 graus.
    const fp = parado ? 1 : 1 - Math.exp(-dt / .35);
    ponteiro.ax += (ponteiro.x - ponteiro.ax) * fp;
    ponteiro.ay += (ponteiro.y - ponteiro.ay) * fp;
    const vida = parado ? 0 : 1;
    conjunto.rotation.set(
      Math.sin(tempo * .18) * .06 * vida + ponteiro.ay * .087,
      Math.sin(tempo * .23) * .12 * vida + ponteiro.ax * .087,
      0,
    );
    objeto.atualizar(forma, atual.prof, tempo);
    conjunto.visible = entrada > .01;

    // O brilho fica mais ao fundo: reprojetado para cair atrás do objeto na tela.
    const fundo = (camera.position.z + 5) / (camera.position.z - conjunto.position.z);
    brilho.position.set(conjunto.position.x * fundo, conjunto.position.y * fundo, -5);
    brilho.scale.setScalar(escala * objeto.raio * 4.8 * fundo);
    (brilho.material as MeshBasicMaterial).opacity = atual.brilho * objeto.brilho * entrada * .9;

    renderer.toneMappingExposure = .45 + .6 * atual.luz;
    canvas.style.opacity = String(entrada);
    renderer.render(cena, camera);
  };

  // Laço: só roda com alguma dobra transparente na tela e a aba visível.
  const transparentes = [...document.querySelectorAll<HTMLElement>(DOBRAS_TRANSPARENTES)];
  const naTela = new Set<Element>();
  let quadro = 0;
  let ultimo = performance.now();
  const rodando = () => !document.hidden && naTela.size > 0;
  const laco = () => {
    quadro = 0;
    const agora = performance.now();
    const dt = Math.min(.064, (agora - ultimo) / 1000);
    ultimo = agora;
    pintar(dt);
    if (rodando()) quadro = requestAnimationFrame(laco);
  };
  const acordar = () => {
    if (!quadro && rodando()) { ultimo = performance.now(); quadro = requestAnimationFrame(laco); }
  };
  const observador = new IntersectionObserver((entradas) => {
    for (const e of entradas) e.isIntersecting ? naTela.add(e.target) : naTela.delete(e.target);
    acordar();
  });
  transparentes.forEach((el) => observador.observe(el));
  document.addEventListener('visibilitychange', acordar);
  addEventListener('scroll', () => { if (reduzido.matches) pintar(0); acordar(); }, { passive: true });
  addEventListener('resize', () => { redimensionar(); pintar(0); acordar(); }, { passive: true });
  document.fonts?.ready.then(() => { medir(); acordar(); });
  new ResizeObserver(() => medir()).observe(document.body);

  redimensionar();
  pintar(0);
  acordar();
  // O painel do navegador embutido fica oculto e não roda requestAnimationFrame: gancho para inspeção, só no dev.
  if (import.meta.env.DEV) Object.assign(window, { __fundo: { pintar, atual, medir, redimensionar } });
}
