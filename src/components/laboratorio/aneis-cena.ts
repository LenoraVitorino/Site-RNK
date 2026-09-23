/**
 * Três anéis de vidro âmbar atrás da página (protótipo de 22/09/2026).
 * Especificação: docs/04-design/hero-aneis-prompt.md.
 *
 * Um único <canvas> fixo. Cada dobra da página é um quadro-chave (posição,
 * tamanho, alinhamento dos anéis, profundidade); o estado é interpolado pelo
 * scroll e amortecido. Soltos, os anéis giram cada um no seu eixo, como um
 * giroscópio parado; alinhados, se aninham num plano só e o conjunto respira.
 */
import {
  AdditiveBlending, CanvasTexture, Color, DirectionalLight, Euler, Group,
  LatheGeometry, Mesh, MeshBasicMaterial, MeshPhysicalMaterial, NeutralToneMapping,
  PerspectiveCamera, PlaneGeometry, PMREMGenerator, Quaternion, Scene, SRGBColorSpace,
  Vector2, Vector3, WebGLRenderer,
} from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';

/** Estado de um quadro-chave. Posições em frações da metade visível da tela. */
interface Estado {
  fx: number;      // -1 borda esquerda, 1 borda direita
  fy: number;      // -1 embaixo, 1 em cima
  k: number;       // raio externo do anel maior, em fração da menor metade da tela
  z: number;       // profundidade do conjunto
  alinha: number;  // 0 soltos, 1 aninhados num plano
  prof: number;    // 0 no mesmo plano, 1 afastados em túnel
  brilho: number;  // intensidade do brilho âmbar atrás
  luz: number;     // exposição da cena: menor onde há muito texto por cima
}
type Chave = keyof Estado;
const CHAVES: Chave[] = ['fx', 'fy', 'k', 'z', 'alinha', 'prof', 'brilho', 'luz'];

/** Quadros-chave por dobra. Nas dobras sólidas (palco, saída) os anéis ficam cobertos. */
const QUADROS_DESKTOP: Record<string, Estado> = {
  hero:        { fx:  .50, fy:  .04, k: .56, z:  0,   alinha: 0,   prof: 0, brilho: 1,  luz: 1 },
  metodologia: { fx: -.95, fy:  .05, k: .50, z: -2.5, alinha: .35, prof: 0, brilho: .6, luz: .6 },
  pilares:     { fx:  0,   fy: -.14, k: .48, z: -1.6, alinha: .82, prof: 0, brilho: .6, luz: .45 },
  letreiro:    { fx:  0,   fy:  0,   k: .46, z:  0,   alinha: 1,   prof: 0, brilho: .8, luz: .8 },
  palco:       { fx:  0,   fy:  0,   k: .46, z:  0,   alinha: 1,   prof: 0, brilho: .8, luz: .8 },
  perguntas:   { fx:  .64, fy:  .40, k: .38, z:  0,   alinha: 1,   prof: 0, brilho: .7, luz: .75 },
  saida:       { fx:  .98, fy:  .85, k: .24, z: -1,   alinha: 1,   prof: 0, brilho: .3, luz: .5 },
  formulario:  { fx:  .44, fy:  .02, k: .76, z: -1,   alinha: 1,   prof: 1, brilho: .8, luz: .7 },
};
const QUADROS_CELULAR: Record<string, Estado> = {
  hero:        { fx:  .60, fy:  .62, k: .58, z:  0,   alinha: 0,   prof: 0, brilho: .8, luz: .9 },
  metodologia: { fx:  0,   fy:  .20, k: .70, z: -2,   alinha: .35, prof: 0, brilho: .5, luz: .6 },
  pilares:     { fx:  0,   fy:  0,   k: .70, z: -1.2, alinha: .82, prof: 0, brilho: .6, luz: .55 },
  letreiro:    { fx:  0,   fy:  0,   k: .60, z:  0,   alinha: 1,   prof: 0, brilho: .8, luz: .8 },
  palco:       { fx:  0,   fy:  0,   k: .60, z:  0,   alinha: 1,   prof: 0, brilho: .8, luz: .8 },
  perguntas:   { fx:  .60, fy:  .62, k: .45, z:  0,   alinha: 1,   prof: 0, brilho: .6, luz: .7 },
  saida:       { fx:  .98, fy:  .98, k: .28, z: -1,   alinha: 1,   prof: 0, brilho: .3, luz: .5 },
  formulario:  { fx:  0,   fy:  .32, k: .85, z: -1,   alinha: 1,   prof: 1, brilho: .7, luz: .65 },
};

/** Dobra da página → quadro-chave. O quadro vale quando o topo da dobra chega ao meio da tela. */
const ROTEIRO: [string, string][] = [
  ['.hero', 'hero'],
  ['#o-que-fazemos', 'metodologia'],
  ['#pilares-revena, #protocolo-revena.pilares', 'pilares'],
  ['.letreiro', 'letreiro'],
  ['[data-palcoplanos]', 'palco'],
  ['#perguntas', 'perguntas'],
  ['#resultados', 'saida'],
  ['#sobre', 'saida'],
  ['#formulario', 'formulario'],
];

export const DOBRAS_TRANSPARENTES = '.hero, #o-que-fazemos, #pilares-revena, .letreiro, #perguntas, #formulario';

/** Anel de borda arredondada: um perfil retangular com cantos suaves girado em torno do eixo. */
function anel(raioExterno: number, raioInterno: number, altura: number, canto: number, segmentos: number) {
  const pontos: Vector2[] = [];
  const arco = (cx: number, cy: number, de: number, ate: number) => {
    const passos = 8;
    for (let i = 0; i <= passos; i++) {
      const a = de + (ate - de) * (i / passos);
      pontos.push(new Vector2(cx + Math.cos(a) * canto, cy + Math.sin(a) * canto));
    }
  };
  const h = altura / 2;
  arco(raioExterno - canto, -h + canto, -Math.PI / 2, 0);   // canto de baixo, por fora
  arco(raioExterno - canto, h - canto, 0, Math.PI / 2);     // canto de cima, por fora
  arco(raioInterno + canto, h - canto, Math.PI / 2, Math.PI);          // canto de cima, por dentro
  arco(raioInterno + canto, -h + canto, Math.PI, Math.PI * 1.5);       // canto de baixo, por dentro
  pontos.push(pontos[0].clone());
  const g = new LatheGeometry(pontos, segmentos);
  g.rotateX(Math.PI / 2);   // o anel passa a olhar para a câmera (normal no eixo Z)
  return g;
}

/** Brilho radial âmbar desenhado num canvas, para o vidro ter o que refratar. */
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

const suave = (x: number) => x * x * (3 - 2 * x);
const limita = (x: number, a = 0, b = 1) => Math.max(a, Math.min(b, x));

export function iniciar(canvas: HTMLCanvasElement) {
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
  renderer.toneMappingExposure = 1.05;
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

  // Brilho âmbar atrás do conjunto: acompanha o objeto, sem escrever profundidade.
  const brilho = new Mesh(
    new PlaneGeometry(1, 1),
    new MeshBasicMaterial({ map: texturaBrilho(), transparent: true, depthWrite: false, blending: AdditiveBlending, toneMapped: false }),
  );
  brilho.position.z = -5;
  cena.add(brilho);

  // Vidro âmbar fosco no desktop; no celular, um acetinado que imita o vidro sem transmissão.
  const material = celular
    ? new MeshPhysicalMaterial({
        color: new Color('#FFD84A'), roughness: .36, metalness: 0,
        clearcoat: 1, clearcoatRoughness: .3, sheen: .6, sheenColor: new Color('#FFF1B0'),
        emissive: new Color('#FFB000'), emissiveIntensity: .14, envMapIntensity: 1.6,
      })
    : new MeshPhysicalMaterial({
        // Vidro âmbar polido. A atenuação curta tinge o que passa pelo vidro de
        // amarelo e o brilho próprio mínimo impede que ele vire bronze sobre o preto.
        color: new Color('#FFDC55'), roughness: .18, metalness: 0,
        transmission: .5, thickness: 1.4, ior: 1.48,
        attenuationColor: new Color('#FFCC1A'), attenuationDistance: .9,
        clearcoat: 1, clearcoatRoughness: .1, specularIntensity: 1, specularColor: new Color('#FFF6DA'),
        emissive: new Color('#FFB400'), emissiveIntensity: .13, envMapIntensity: 1.8,
      });

  const segmentos = celular ? 96 : 160;
  // Faixas largas e baixas, como arruelas polidas; o menor é quase uma lente.
  // Aninhados, sobra 0,10 de folga entre um e outro.
  const medidas = [
    [1.55, 1.12],
    [1.02, 0.64],
    [0.54, 0.20],
  ];
  const conjunto = new Group();
  const aneis = medidas.map(([fora, dentro]) => {
    const m = new Mesh(anel(fora, dentro, .14, .06, segmentos), material);
    conjunto.add(m);
    return m;
  });
  cena.add(conjunto);

  // Soltos: em cascata diagonal, como lentes empilhadas no ar (primeira
  // referência), com inclinações parecidas e flutuação lenta. Nada de giro
  // contínuo nem de eixos ortogonais, que lembrariam um átomo.
  const inclinacoes = [new Euler(1.02, .42, .18), new Euler(1.16, .24, -.06), new Euler(.94, .56, .28)];
  const cascata = [new Vector3(-.62, .5, -.35), new Vector3(0, 0, 0), new Vector3(.58, -.48, .35)];
  const eixos = [new Vector3(1, .3, 0).normalize(), new Vector3(.2, 1, 0).normalize(), new Vector3(1, -.4, .2).normalize()];
  const fases = [0, 2.1, 4.2];
  // Alinhados, vistos em três quartos: de frente o conjunto viraria um alvo.
  const alinhado = new Quaternion().setFromEuler(new Euler(-.95, .4, .12));
  const qSolto = new Quaternion(), qGiro = new Quaternion(), qTmp = new Quaternion();

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
    const w = innerWidth, h = innerHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    medir();
  };

  let ultimo = performance.now();
  let tempo = 0;
  const inicio = performance.now();

  const pintar = (dt: number) => {
    const parado = reduzido.matches;
    if (!parado) tempo += dt;

    // Estado alvo pelo scroll, amortecido (meia-vida ~120 ms). Movimento reduzido: sem amortecer.
    const alvo = alvoPara(scrollY);
    const f = parado ? 1 : 1 - Math.exp(-dt / .173);
    for (const c of CHAVES) atual[c] += (alvo[c] - atual[c]) * f;

    // Entrada: fade e leve crescimento; depois de ~3 s, voltam-se um pouco para o centro.
    const decorrido = (performance.now() - inicio) / 1000;
    const entrada = parado ? 1 : suave(limita(decorrido / 1.6));
    const atencao = parado ? 0 : .15 * suave(limita((decorrido - 2.6) / 1.6));
    const alinha = suave(limita(atual.alinha + atencao * (1 - atual.alinha)));

    // Metades visíveis da tela no plano z = 0.
    const meiaAltura = Math.tan((camera.fov * Math.PI) / 360) * camera.position.z;
    const meiaLargura = meiaAltura * camera.aspect;
    const unidade = Math.min(meiaAltura, meiaLargura);
    const escala = (atual.k * unidade / 1.55) * (.92 + .08 * entrada);

    conjunto.position.set(atual.fx * meiaLargura, atual.fy * meiaAltura, atual.z);
    conjunto.scale.setScalar(escala);

    // O conjunto respira quando encaixado; o ponteiro inclina no máximo ~5 graus.
    ponteiro.ax += (ponteiro.x - ponteiro.ax) * (parado ? 1 : 1 - Math.exp(-dt / .35));
    ponteiro.ay += (ponteiro.y - ponteiro.ay) * (parado ? 1 : 1 - Math.exp(-dt / .35));
    const respira = parado ? 0 : alinha;
    conjunto.rotation.set(
      (-.08 + Math.sin(tempo * .18) * .12) * respira + ponteiro.ay * .087,
      Math.sin(tempo * .25) * .35 * respira + ponteiro.ax * .087,
      0,
    );

    const solto = 1 - alinha;
    aneis.forEach((m, i) => {
      // Flutuação: balanço de até ~14 graus e sobe e desce suave, só enquanto soltos.
      qGiro.setFromAxisAngle(eixos[i], Math.sin(tempo * .45 + fases[i]) * .24);
      qSolto.setFromEuler(inclinacoes[i]).multiply(qGiro);
      qTmp.slerpQuaternions(qSolto, alinhado, alinha);
      m.quaternion.copy(qTmp);
      m.position.set(
        cascata[i].x * solto,
        cascata[i].y * solto + Math.sin(tempo * .6 + fases[i]) * .05 * solto,
        cascata[i].z * solto - i * 2.4 * atual.prof,   // túnel no final
      );
    });
    conjunto.visible = entrada > .01;

    // O brilho fica mais ao fundo: reprojetado para cair atrás dos anéis na tela.
    const fundo = (camera.position.z + 5) / (camera.position.z - conjunto.position.z);
    brilho.position.set(conjunto.position.x * fundo, conjunto.position.y * fundo, -5);
    brilho.scale.setScalar(escala * 7.5 * fundo);
    (brilho.material as MeshBasicMaterial).opacity = atual.brilho * entrada * .9;

    renderer.toneMappingExposure = .45 + .6 * atual.luz;
    renderer.domElement.style.opacity = String(entrada);
    renderer.render(cena, camera);
  };

  // Laço: só roda com alguma dobra transparente na tela e a aba visível.
  // As dobras de fundo transparente, onde os anéis aparecem (as mesmas da página de teste).
  const transparentes = [...document.querySelectorAll<HTMLElement>(DOBRAS_TRANSPARENTES)];
  const naTela = new Set<Element>();
  let quadro = 0;
  const laco = () => {
    quadro = 0;
    const agora = performance.now();
    const dt = Math.min(.064, (agora - ultimo) / 1000);
    ultimo = agora;
    pintar(dt);
    if (rodando()) quadro = requestAnimationFrame(laco);
  };
  const rodando = () => !document.hidden && naTela.size > 0;
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
  if (import.meta.env.DEV) Object.assign(window, { __aneis: { pintar, atual, medir, redimensionar } });
}
