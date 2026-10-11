/**
 * Fundo vivo "seda" (laboratório, 11/10/2026). Versão nossa do fundo, feita
 * do zero: nenhum modelo, textura, vídeo ou código de terceiros. A direção
 * vem das páginas da PeachWeb que a Lenora usa como referência (fitas de
 * seda cinza, desfocadas e granuladas, que andam com a rolagem), mas a forma
 * aqui é outra e é toda matemática: um shader de tela inteira, em WebGL2
 * puro (sem three.js), que desenha duas fitas com dobras e fios.
 *
 * A rolagem conduz a cena: cada trecho da página tem um quadro (posição,
 * giro, escala e largura da fita) e a fita viaja de um para o outro, com
 * amortecimento, enquanto os fios correm ao longo dela. Parada, ela só
 * respira devagar.
 *
 * Teste: /laboratorio/fundo-seda. A home segue com a cena antiga.
 */

const VERT = /* glsl */ `#version 300 es
in vec2 pos;
void main() { gl_Position = vec4(pos, 0., 1.); }
`;

const FRAG = /* glsl */ `#version 300 es
precision highp float;
uniform vec2 uRes;
uniform float uTempo;
uniform float uFase;    // corre com a rolagem
uniform vec4 uFita;     // centro x, centro y, giro, escala
uniform vec4 uCorpo;    // largura, ganho, nitidez dos fios, (livre)
out vec4 cor;

float sorteio(vec2 p) { p = fract(p * vec2(123.34, 456.21)); p += dot(p, p + 45.32); return fract(p.x * p.y); }
float ruido(vec2 p) {
  vec2 i = floor(p), f = fract(p);
  f = f * f * (3. - 2. * f);
  return mix(mix(sorteio(i), sorteio(i + vec2(1., 0.)), f.x), mix(sorteio(i + vec2(0., 1.)), sorteio(i + vec2(1., 1.)), f.x), f.y);
}
float fbm(vec2 p) {
  float a = .5, s = 0.;
  for (int i = 0; i < 4; i++) { s += a * ruido(p); p = p * 2.03 + vec2(1.7, 9.2); a *= .5; }
  return s;
}
mat2 giro(float a) { float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

// Uma fita de seda vista de lado: o eixo ondula, a largura respira (a fita
// torce), dobras largas atravessam o tecido e fios finos correm ao longo dele.
float fita(vec2 p, vec2 centro, float ang, float escala, float largura, float nitidez, float fase) {
  vec2 u = giro(ang) * (p - centro) / escala;
  float eixo = .22 * sin(u.x * 1.15 + fase) + .09 * sin(u.x * 2.7 - fase * .7 + 1.3);
  float w = largura * (.72 + .28 * sin(u.x * .85 + fase * .6 + .8));
  float d = (u.y - eixo) / w;
  float corpo = exp(-d * d * 1.9);
  float onda = fbm(vec2(u.x * .9 + fase * .3, d * .8) + uTempo * .02);
  float dobra = .5 + .5 * sin(d * 2.5 + onda * 5.5 + u.x * .7);
  float fios = .5 + .5 * sin(d * 30. + onda * 12.);
  float luz = pow(dobra, 3.) * mix(1., .78 + .22 * fios, nitidez);
  return corpo * (.03 + 1.15 * luz * corpo);
}

void main() {
  vec2 p = (gl_FragCoord.xy - .5 * uRes) / uRes.y;
  float fase = uFase + uTempo * .06;
  float l = fita(p, uFita.xy, uFita.z, uFita.w, uCorpo.x, uCorpo.z, fase);
  // Segunda fita, mais longe: maior, sem fios, só o volume.
  l += .22 * fita(p, uFita.xy * vec2(-.6, .5) + vec2(.1, .15), uFita.z * .6 + 1.1, uFita.w * 1.8, uCorpo.x * 1.4, 0., fase * .5 + 2.);
  l *= uCorpo.y;
  l = pow(l, 1.25) / (1. + l * .7);                                 // curva de tom: preto fundo, claro que não estoura
  l *= 1. - .55 * smoothstep(.45, 1.15, length(p * vec2(.8, 1.)));  // vinheta
  float grao = sorteio(gl_FragCoord.xy + fract(uTempo) * 91.7) - .5;
  l += grao * .07 * (.35 + l);
  cor = vec4(vec3(l) * vec3(1., .99, .97) + .008, 1.);
}
`;

/** Quadros da rolagem: [trecho da página 0–1, centro x, centro y, giro, escala, largura, ganho, nitidez]. */
const QUADROS: number[][] = [
  [0,    .15, -.52, -.08, 1.7,  .5,  .62, .7],   // hero: um lençol largo embaixo
  [.12,  .1,  -.2,  -.55, 1.5,  .4,  .6,  .8],   // a fita sobe em diagonal
  [.26,  .5,   .22, -1.0, 1.4,  .38, .55, .8],   // passa pelo alto, à direita
  [.45,  0,   -.36,  .16, 2.2,  .55, .52, .3],   // volta larga e desfocada
  [.66,  .1,   .02,  .95, 1.5,  .42, .55, .7],   // atravessa o meio, à direita
  [.86,  .42,  .05,  1.7, 1.2,  .36, .58, .9],   // sobe pela direita
  [1,    .15, -.5,   3.06, 1.7, .5,  .6,  .7],   // fecha como abriu (meia-volta)
];

const suave = (x: number) => x * x * x * (x * (x * 6 - 15) + 10);
function quadro(s: number): number[] {
  if (s <= 0) return QUADROS[0];
  for (let i = 1; i < QUADROS.length; i++) {
    const a = QUADROS[i - 1], b = QUADROS[i];
    if (s <= b[0]) { const k = suave((s - a[0]) / (b[0] - a[0])); return a.map((v, j) => v + (b[j] - v) * k); }
  }
  return QUADROS[QUADROS.length - 1];
}

export function iniciar(canvas: HTMLCanvasElement) {
  const dev = import.meta.env.DEV;
  const gl = canvas.getContext('webgl2', { antialias: false, alpha: false, powerPreference: 'low-power', preserveDrawingBuffer: dev });
  if (!gl) throw new Error('WebGL2 indisponível');

  const compilar = (tipo: number, fonte: string) => {
    const sh = gl.createShader(tipo)!;
    gl.shaderSource(sh, fonte);
    gl.compileShader(sh);
    if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(sh) ?? 'shader');
    return sh;
  };
  const prog = gl.createProgram()!;
  gl.attachShader(prog, compilar(gl.VERTEX_SHADER, VERT));
  gl.attachShader(prog, compilar(gl.FRAGMENT_SHADER, FRAG));
  gl.linkProgram(prog);
  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(prog) ?? 'programa');
  gl.useProgram(prog);

  gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);   // um triângulo cobre a tela
  const pos = gl.getAttribLocation(prog, 'pos');
  gl.enableVertexAttribArray(pos);
  gl.vertexAttribPointer(pos, 2, gl.FLOAT, false, 0, 0);

  const u = (n: string) => gl.getUniformLocation(prog, n);
  const uRes = u('uRes'), uTempo = u('uTempo'), uFase = u('uFase'), uFita = u('uFita'), uCorpo = u('uCorpo');

  // Resolução contida: o desenho é todo macio, não precisa de pixel de retina.
  const medir = () => {
    const dpr = Math.min(window.devicePixelRatio || 1, 1.25);
    const w = Math.round(innerWidth * dpr), h = Math.round(innerHeight * dpr);
    if (canvas.width !== w || canvas.height !== h) { canvas.width = w; canvas.height = h; gl.viewport(0, 0, w, h); }
  };
  const alvo = () => {
    const total = document.documentElement.scrollHeight - innerHeight;
    return total > 0 ? Math.min(1, Math.max(0, scrollY / total)) : 0;
  };

  let s = alvo(), tempo = 0, antes = performance.now(), quadroId = 0;
  const pintar = (trecho: number, t: number) => {
    medir();
    const q = quadro(trecho);
    gl.uniform2f(uRes, canvas.width, canvas.height);
    gl.uniform1f(uTempo, t);
    gl.uniform1f(uFase, trecho * 16);
    gl.uniform4f(uFita, q[1], q[2], q[3], q[4]);
    gl.uniform4f(uCorpo, q[5], q[6], q[7], 0);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
  };
  const laco = (agora: number) => {
    const dt = Math.min(.1, (agora - antes) / 1000);
    antes = agora;
    tempo += dt;
    s += (alvo() - s) * (1 - Math.exp(-dt / .55));   // a cena chega depois da rolagem, amortecida
    pintar(s, tempo);
    quadroId = requestAnimationFrame(laco);
  };
  const ligar = () => { if (!quadroId) { antes = performance.now(); quadroId = requestAnimationFrame(laco); } };
  const desligar = () => { cancelAnimationFrame(quadroId); quadroId = 0; };
  document.addEventListener('visibilitychange', () => (document.hidden ? desligar() : ligar()));
  addEventListener('resize', medir);

  pintar(s, 0);
  canvas.style.transition = 'opacity 1.6s ease';
  canvas.style.opacity = '1';
  ligar();

  // Só no servidor de desenvolvimento: pinta um quadro avulso (trecho, tempo), para conferir sem rolar.
  if (dev) (window as unknown as { __seda?: unknown }).__seda = pintar;
}
