/**
 * Motor do fundo vivo (laboratório, 22/09/2026). Especificação:
 * docs/04-design/fundo-vivo-briefing.md, parte 7 (roteiro detalhado).
 *
 * Um <canvas> fixo atrás da página, com a mesma dinâmica dos vídeos de
 * referência: o elemento fica parado no quadro de cada dobra enquanto ela
 * ocupa a tela e se transforma na passagem de uma dobra para a outra. O
 * motor mede as dobras reais e converte o scroll num tempo de roteiro p:
 * inteiro durante a dobra, fracionário na passagem. p é amortecido, e o
 * elemento (partículas ou superfície) recebe os dois quadros vizinhos e a
 * mistura entre eles.
 *
 * Máscara de leitura: a cada quadro o motor mede os blocos de texto
 * visíveis e manda até 10 retângulos para o shader, que escurece o fundo
 * atrás deles com borda macia. A legibilidade não depende da posição do
 * elemento.
 */
import { NeutralToneMapping, PerspectiveCamera, Scene, Vector4, WebGLRenderer } from 'three';

export type Quadro = Record<string, number>;
export interface Quadros { desktop: Record<string, Quadro>; celular: Record<string, Quadro> }

/** O que o elemento recebe a cada quadro. */
export interface Momento {
  a: Quadro; b: Quadro;   // quadro da dobra atual e da próxima
  t: number;              // mistura entre os dois, 0 a 1, já suavizada
  q: Quadro;              // estado interpolado
  tempo: number; dt: number;
  rolagem: number;        // scroll amortecido, em alturas de tela
  energia: number;        // 0 a 1: velocidade recente do scroll
  entrada: number;        // 0 a 1: fade de entrada
  ponteiro: { x: number; y: number };
  parado: boolean;        // movimento reduzido
}

export interface Elemento {
  quadros: Quadros;
  pintar(m: Momento): void;
}

export interface Contexto {
  renderer: WebGLRenderer;
  cena: Scene;
  camera: PerspectiveCamera;
  celular: boolean;
  /** Uniforms e GLSL da máscara de leitura: `float leitura(vec2 fragCoord)` devolve 1 longe do texto e menos perto dele. */
  leitura: { uniforms: Record<string, { value: unknown }>; glsl: string };
  /** Metades visíveis da tela no plano z = 0, em unidades da cena. */
  meia(): { altura: number; largura: number };
}

/** Dobra → quadro. As dobras cobertas já levam o quadro da próxima dobra visível. */
const ROTEIRO: [string, string][] = [
  ['.hero', 'hero'],
  ['#o-que-fazemos', 'metodologia'],
  ['#pilares-revena', 'pilares'],
  ['.letreiro', 'letreiro'],
  ['[data-palcoplanos], [data-planos]', 'perguntas'],
  ['#perguntas', 'perguntas'],
  ['#resultados', 'academy'],
  ['#fale', 'academy'],
  ['#academy-tools', 'academy'],
  ['#sobre', 'sobre'],
  ['#formulario', 'formulario'],
];

export const DOBRAS_TRANSPARENTES = '.hero, #o-que-fazemos, #pilares-revena, .letreiro, #perguntas, #academy-tools, #sobre, #formulario';

/** Blocos de texto que a máscara protege. Cartões ficam de fora: o vidro já cuida deles. */
const TEXTOS = [
  '.hero__selo', '.hero__h1', '.hero__lead', '.hero__acoes', '.hero-prova',
  '#o-que-fazemos .titulo', '.oquefaz__descricao', '.oquefaz__numeros',
  '#pilares-revena .titulo', '.letreiro__trilho',
  '.ancora', '.pergunta',
  '#academy-tools .titulo',
  '.sobre__declaracao', '.sobre-editorial__descricao',
  '#formulario .titulo', '.form-block__text p',
].join(', ');

const MAX_RETANGULOS = 10;

const GLSL_LEITURA = /* glsl */ `
uniform vec4 uLeituraRet[${MAX_RETANGULOS}];
uniform int uLeituraN;
uniform float uLeituraForca;
uniform float uLeituraPena;
float leitura(vec2 p) {
  float m = 0.0;
  for (int i = 0; i < ${MAX_RETANGULOS}; i++) {
    if (i >= uLeituraN) break;
    vec4 r = uLeituraRet[i];
    vec2 d = abs(p - (r.xy + r.zw) * .5) - (r.zw - r.xy) * .5;
    float dist = length(max(d, 0.0)) + min(max(d.x, d.y), 0.0);
    m = max(m, 1.0 - smoothstep(0.0, uLeituraPena, dist));
  }
  return 1.0 - m * uLeituraForca;
}
`;

const suave = (x: number) => x * x * (3 - 2 * x);
const limita = (x: number, a = 0, b = 1) => Math.max(a, Math.min(b, x));

export function iniciar(canvas: HTMLCanvasElement, criar: (ctx: Contexto) => Elemento) {
  const celular = matchMedia('(max-width: 899.98px), (hover: none)').matches;
  const reduzido = matchMedia('(prefers-reduced-motion: reduce)');

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
  const camera = new PerspectiveCamera(32, 1, .1, 100);
  camera.position.set(0, 0, 11);

  const retangulos = Array.from({ length: MAX_RETANGULOS }, () => new Vector4());
  const uniformsLeitura = {
    uLeituraRet: { value: retangulos },
    uLeituraN: { value: 0 },
    uLeituraForca: { value: .85 },
    uLeituraPena: { value: 90 },
  };

  const meia = () => {
    const altura = Math.tan((camera.fov * Math.PI) / 360) * camera.position.z;
    return { altura, largura: altura * camera.aspect };
  };

  const elemento = criar({
    renderer, cena, camera, celular, meia,
    leitura: { uniforms: uniformsLeitura, glsl: GLSL_LEITURA },
  });
  const quadros = celular ? elemento.quadros.celular : elemento.quadros.desktop;

  // Roteiro medido: um trecho parado por dobra (nomes consecutivos iguais se fundem).
  let nomes: string[] = ['hero'];
  let trechos: [number, number][] = [[0, 0]];
  const medir = () => {
    const vh = innerHeight;
    const brutos = ROTEIRO.flatMap(([seletor, nome]) => {
      const el = document.querySelector<HTMLElement>(seletor);
      if (!el) return [];
      const r = el.getBoundingClientRect();
      const topo = r.top + scrollY, base = r.bottom + scrollY;
      // Parado enquanto a dobra ocupa a tela: do topo a 15% da tela até a base a 85%.
      let de = topo - vh * .15, ate = base - vh * .85;
      if (ate < de) de = ate = (de + ate) / 2;   // dobra curta: só o instante em que ela está no meio
      return [{ nome, de, ate }];
    }).sort((x, y) => x.de - y.de);
    if (!brutos.length) return;
    brutos[0].de = Math.min(brutos[0].de, 0);
    nomes = []; trechos = [];
    for (const b of brutos) {
      if (nomes[nomes.length - 1] === b.nome) trechos[trechos.length - 1][1] = b.ate;
      else { nomes.push(b.nome); trechos.push([b.de, b.ate]); }
    }
    medirTextos();
  };

  const progresso = (y: number) => {
    for (let i = 0; i < trechos.length; i++) {
      const [de, ate] = trechos[i];
      if (y < de) {
        if (i === 0) return 0;
        const antes = trechos[i - 1][1];
        return i - 1 + suave(limita((y - antes) / Math.max(1, de - antes)));
      }
      if (y <= ate) return i;
    }
    return trechos.length - 1;
  };

  // Textos: posições na página guardadas na medição; o retângulo justo do
  // texto (pela Range, que ignora o espaço vazio da caixa) é lido a cada quadro.
  let textos: { el: Element; de: number; ate: number }[] = [];
  const faixa = document.createRange();
  const medirTextos = () => {
    // O filtro usa a dobra inteira: dentro dela há texto preso (sticky) que muda de lugar.
    textos = [...document.querySelectorAll(TEXTOS)].map((el) => {
      const r = (el.closest('section') ?? el).getBoundingClientRect();
      return { el, de: r.top + scrollY, ate: r.bottom + scrollY };
    });
  };
  const atualizarLeitura = () => {
    const vh = innerHeight, pr = renderer.getPixelRatio(), folga = 14;
    let n = 0;
    for (const t of textos) {
      if (n >= MAX_RETANGULOS) break;
      if (t.ate < scrollY || t.de > scrollY + vh) continue;
      faixa.selectNodeContents(t.el);
      const r = faixa.getBoundingClientRect();
      if (r.width < 1 || r.bottom < -100 || r.top > vh + 100) continue;
      retangulos[n++].set((r.left - folga) * pr, (vh - r.bottom - folga) * pr, (r.right + folga) * pr, (vh - r.top + folga) * pr);
    }
    uniformsLeitura.uLeituraN.value = n;
    uniformsLeitura.uLeituraPena.value = (celular ? 60 : 90) * pr;
  };

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

  let p = 0;
  let rolagem = scrollY / innerHeight;
  let energia = 0;
  let tempo = 0;
  let ultimo = performance.now();
  const inicio = performance.now();

  const estado = (pp: number): Quadro => {
    const i = Math.min(Math.floor(pp), nomes.length - 1);
    const a = quadros[nomes[i]], b = quadros[nomes[Math.min(i + 1, nomes.length - 1)]];
    const t = pp - i;
    const q: Quadro = {};
    for (const c in a) q[c] = a[c] + ((b[c] ?? a[c]) - a[c]) * t;
    return q;
  };

  const pintar = (dt: number) => {
    const parado = reduzido.matches;
    if (!parado) tempo += dt;

    // Tempo de roteiro amortecido. Num salto longo (âncora do menu), só a
    // última passagem aparece, para o fundo não atravessar a página inteira.
    const alvo = progresso(scrollY);
    if (Math.abs(alvo - p) > 1.2) p = alvo - Math.sign(alvo - p) * 1.2;
    p += (alvo - p) * (parado ? 1 : 1 - Math.exp(-dt / .22));

    const rAlvo = scrollY / innerHeight;
    const rAntes = rolagem;
    rolagem += (rAlvo - rolagem) * (parado ? 1 : 1 - Math.exp(-dt / .16));
    const velocidade = dt > 0 ? Math.abs(rolagem - rAntes) / dt : 0;
    energia += (limita(velocidade / 1.5) - energia) * (parado ? 0 : 1 - Math.exp(-dt / .45));

    ponteiro.ax += (ponteiro.x - ponteiro.ax) * (parado ? 1 : 1 - Math.exp(-dt / .35));
    ponteiro.ay += (ponteiro.y - ponteiro.ay) * (parado ? 1 : 1 - Math.exp(-dt / .35));

    const decorrido = (performance.now() - inicio) / 1000;
    const entrada = parado ? 1 : suave(limita(decorrido / 1.6));

    const i = Math.min(Math.floor(p), nomes.length - 1);
    const a = quadros[nomes[i]], b = quadros[nomes[Math.min(i + 1, nomes.length - 1)]];
    const q = estado(p);

    atualizarLeitura();
    uniformsLeitura.uLeituraForca.value = q.leitura ?? .85;
    renderer.toneMappingExposure = q.exposicao ?? 1;

    elemento.pintar({
      a, b, t: p - i, q, tempo, dt, rolagem, energia, entrada, parado,
      ponteiro: { x: parado ? 0 : ponteiro.ax, y: parado ? 0 : ponteiro.ay },
    });
    renderer.domElement.style.opacity = String(entrada);
    renderer.render(cena, camera);
  };

  // Laço: só roda com alguma dobra transparente na tela e a aba visível.
  const naTela = new Set<Element>();
  let quadro = 0;
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
  document.querySelectorAll(DOBRAS_TRANSPARENTES).forEach((el) => observador.observe(el));
  document.addEventListener('visibilitychange', acordar);
  addEventListener('scroll', () => { if (reduzido.matches) pintar(0); acordar(); }, { passive: true });
  addEventListener('resize', () => { redimensionar(); pintar(0); acordar(); }, { passive: true });
  document.fonts?.ready.then(() => { medir(); acordar(); });
  new ResizeObserver(() => medir()).observe(document.body);

  redimensionar();
  p = progresso(scrollY);
  pintar(0);
  acordar();

  if (import.meta.env.DEV) {
    // O painel embutido não roda requestAnimationFrame: estes ganchos pintam na mão.
    Object.assign(window, {
      __fundo: {
        pintar, medir, redimensionar,
        assentar(passos = 90) { for (let k = 0; k < passos; k++) pintar(1 / 30); },
        roteiro: () => ({ p, nomes, trechos }),
        quadros,
      },
    });
  }
}
