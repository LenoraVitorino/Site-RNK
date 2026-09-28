/**
 * Paralaxe leve das fotos do Sobre (docs/04-design/pagina-sobre.md, (b)
 * "paralaxe.ts"). A foto anda dentro da moldura, nunca a moldura.
 *
 * - Sai com movimento reduzido ou sem IntersectionObserver: nada se move e
 *   --py nunca é escrito.
 * - Um IntersectionObserver (rootMargin 15%) mantém a lista das molduras à
 *   vista; só elas são calculadas.
 * - Um scroll passivo e um resize agendam um único rAF. Sem wheel, sem
 *   preventDefault, sem biblioteca: a rolagem continua nativa.
 * - d = clamp((centro − altura da tela / 2) / altura da tela, −1, 1) e
 *   --py = −d × amplitude. A amplitude vem de data-paralaxe (px, com sinal),
 *   limitada a 24px e pela metade abaixo de 768px de largura.
 * - A escala da imagem (--escala) cresce só o bastante para a foto nunca
 *   descolar da borda: no mínimo 1.06, ou 1 + 2 × amplitude / altura.
 */

const AMPLITUDE_MAX = 24;
const ESCALA_MIN = 1.06;

const limitar = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v));

export function iniciarParalaxe(seletor = '[data-paralaxe]'): void {
  if (typeof window === 'undefined') return;
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if (!('IntersectionObserver' in window)) return;

  const alvos = Array.from(document.querySelectorAll<HTMLElement>(seletor));
  if (!alvos.length) return;

  const visiveis = new Set<HTMLElement>();
  let quadro = 0;

  const amplitude = (el: HTMLElement) => {
    const bruta = Number(el.dataset.paralaxe) || 0;
    const amp = Math.sign(bruta) * Math.min(Math.abs(bruta), AMPLITUDE_MAX);
    return innerWidth < 768 ? amp / 2 : amp;
  };

  const pintar = () => {
    quadro = 0;
    const alturaTela = innerHeight;
    // Primeiro todas as leituras, depois todas as escritas.
    const medidas = [...visiveis].map((el) => {
      const r = el.getBoundingClientRect();
      const amp = amplitude(el);
      const d = limitar((r.top + r.height / 2 - alturaTela / 2) / alturaTela, -1, 1);
      const escala = r.height > 0 ? Math.max(ESCALA_MIN, 1 + (2 * Math.abs(amp)) / r.height) : ESCALA_MIN;
      return { el, py: -d * amp, escala };
    });
    for (const { el, py, escala } of medidas) {
      el.style.setProperty('--py', `${py.toFixed(2)}px`);
      el.style.setProperty('--escala', escala.toFixed(4));
    }
  };

  const agendar = () => {
    if (!quadro && visiveis.size) quadro = requestAnimationFrame(pintar);
  };

  const obs = new IntersectionObserver(
    (entradas) => {
      for (const e of entradas) {
        const el = e.target as HTMLElement;
        if (e.isIntersecting) visiveis.add(el);
        else visiveis.delete(el);
      }
      agendar();
    },
    { rootMargin: '15% 0px' },
  );
  alvos.forEach((el) => obs.observe(el));

  addEventListener('scroll', agendar, { passive: true });
  addEventListener('resize', agendar, { passive: true });
}
