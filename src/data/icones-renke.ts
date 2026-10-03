/**
 * Ícones Renke, V1 (02/10/2026). Conjunto próprio para substituir a Lucide
 * em todo o site (Lenora: "cria um próprio… com um detalhe mais Renke…
 * acabamento diagonal, minimalista, nada grotesco, bem moderno").
 *
 * Linguagem:
 *  - grade de 24, área viva de 3 a 21, traço 1,5, quinas vivas e pontas retas;
 *  - retângulos com chanfro de 45° (o acabamento das peças do site) no lugar
 *    do raio; o octógono é forma de base; círculos seguem círculos;
 *  - assinatura: o losango (quadrado a 45°) marca o ponto que importa em cada
 *    ícone e pode ser pintado com --icone-acento (amarelo) ou ficar no traço.
 * Redes sociais (Instagram, LinkedIn, Facebook, YouTube) ficam com os logos
 * das marcas, fora do conjunto (Lenora, 02/10).
 * Especificação: docs/04-design/icones-renke.md. Prévia: /laboratorio/icones.
 */

/** Retângulo com os quatro cantos chanfrados em c. */
const ch = (x: number, y: number, w: number, h: number, c: number) =>
  `M${x + c} ${y}H${x + w - c}L${x + w} ${y + c}V${y + h - c}L${x + w - c} ${y + h}H${x + c}L${x} ${y + h - c}V${y + c}Z`;
/** Círculo como dois arcos. */
const circ = (cx: number, cy: number, r: number) => `M${cx} ${cy - r}A${r} ${r} 0 1 1 ${cx} ${cy + r}A${r} ${r} 0 1 1 ${cx} ${cy - r}Z`;
/** Octógono regular-ish de 3 a 21. */
const OCT = 'M8.3 3H15.7L21 8.3V15.7L15.7 21H8.3L3 15.7V8.3Z';

export interface IconeRenke {
  /** Traço principal (currentColor). */
  base: string;
  /** Traço de destaque (--icone-acento; cai no currentColor). */
  acento?: string;
  /** Losangos cheios de destaque: [cx, cy, raio]. */
  pontos?: [number, number, number][];
  rotulo: string;
  grupo: 'Interface' | 'Conceitos' | 'Ganhos' | 'Canais e etapas';
  /** Ícone da Lucide que este substitui (para a comparação na prévia). */
  substitui?: string;
}

export const ICONES_RENKE = {
  /* ---------- Interface ---------- */
  'seta-diagonal': { grupo: 'Interface', rotulo: 'Seta diagonal', substitui: 'ArrowUpRight', base: 'M6.5 17.5L17 7M9 7H17V15' },
  seta: { grupo: 'Interface', rotulo: 'Seta', substitui: 'ArrowRight', base: 'M4 12H19M13 6L19 12L13 18' },
  'seta-baixo': { grupo: 'Interface', rotulo: 'Seta para baixo', substitui: 'ArrowDown', base: 'M12 4V19M6 13L12 19L18 13' },
  'chevron-direita': { grupo: 'Interface', rotulo: 'Avançar', substitui: 'ChevronRight', base: 'M9.5 6L15.5 12L9.5 18' },
  'chevron-baixo': { grupo: 'Interface', rotulo: 'Abrir', substitui: 'ChevronDown', base: 'M6 9.5L12 15.5L18 9.5' },
  menu: { grupo: 'Interface', rotulo: 'Menu', substitui: 'Menu', base: 'M4 8H20M4 16H14.5', pontos: [[18.6, 16, 1.6]] },
  fechar: { grupo: 'Interface', rotulo: 'Fechar', substitui: 'X', base: 'M6 6L18 18M18 6L6 18' },
  mais: { grupo: 'Interface', rotulo: 'Mais', substitui: 'Plus', base: 'M12 5V19M5 12H19' },
  check: { grupo: 'Interface', rotulo: 'Confirmado', substitui: 'Check', base: 'M4.5 12.5L9.5 17.5L19.5 7' },
  play: { grupo: 'Interface', rotulo: 'Tocar', substitui: 'Play', base: 'M8 5.5V18.5L18.5 12Z' },
  pausa: { grupo: 'Interface', rotulo: 'Pausar', substitui: 'Pause', base: ch(6.5, 5, 3.5, 14, 1) + ch(14, 5, 3.5, 14, 1) },
  som: { grupo: 'Interface', rotulo: 'Som ligado', substitui: 'Volume2', base: 'M3.5 9.5H7L11.5 5.5V18.5L7 14.5H3.5Z', acento: 'M15 9L16.5 10.5V13.5L15 15M17.5 6.5L20 9V15L17.5 17.5' },
  mudo: { grupo: 'Interface', rotulo: 'Sem som', substitui: 'VolumeX', base: 'M3.5 9.5H7L11.5 5.5V18.5L7 14.5H3.5Z', acento: 'M15.5 9.5L20.5 14.5M20.5 9.5L15.5 14.5' },

  /* ---------- Conceitos (indicadores, selos, cultura) ---------- */
  brilho: { grupo: 'Conceitos', rotulo: 'Destaque (selo)', substitui: 'Sparkles', base: 'M12 3.5L20.5 12L12 20.5L3.5 12Z', pontos: [[12, 12, 3.4]] },
  pessoas: { grupo: 'Conceitos', rotulo: 'Pessoas', substitui: 'Users', base: circ(9, 8, 3.5) + 'M3 20V18L6 15H12L15 18V20M15.5 4.6A3.5 3.5 0 0 1 15.5 11.4M17 15L21 18V20' },
  verificado: { grupo: 'Conceitos', rotulo: 'Método validado', substitui: 'BadgeCheck', base: OCT, acento: 'M8.5 12L11 14.5L15.5 9.5' },
  crescimento: { grupo: 'Conceitos', rotulo: 'Crescimento', substitui: 'TrendingUp', base: 'M3 17.5L9 11.5L13 15.5L20 8.5M15 8H20.5V13.5', pontos: [[9, 11.5, 1.6]] },
  bussola: { grupo: 'Conceitos', rotulo: 'Direção', substitui: 'Compass', base: circ(12, 12, 9), acento: 'M15.5 8.5L13.3 13.3L8.5 15.5L10.7 10.7Z' },
  tecnologia: { grupo: 'Conceitos', rotulo: 'Tecnologia', substitui: 'Cpu', base: ch(6, 6, 12, 12, 2) + 'M9.5 3V6M14.5 3V6M9.5 18V21M14.5 18V21M3 9.5H6M3 14.5H6M18 9.5H21M18 14.5H21', pontos: [[12, 12, 2.2]] },
  fluxo: { grupo: 'Conceitos', rotulo: 'Processo', substitui: 'Workflow', base: ch(3.5, 3.5, 7, 7, 1.5) + ch(13.5, 13.5, 7, 7, 1.5) + 'M7 10.5V13L11 17H13.5' },
  mira: { grupo: 'Conceitos', rotulo: 'Foco', substitui: 'Target', base: circ(12, 12, 9) + circ(12, 12, 5), pontos: [[12, 12, 1.9]] },
  conexao: { grupo: 'Conceitos', rotulo: 'Conexão / parceria', substitui: 'Handshake', base: circ(5.5, 12, 3.5) + circ(18.5, 12, 3.5) + 'M9 12H10.1M13.9 12H15', pontos: [[12, 12, 1.7]] },
  camadas: { grupo: 'Conceitos', rotulo: 'Camadas', substitui: 'Layers', base: 'M12 3.5L20.5 8L12 12.5L3.5 8ZM3.5 12.5L12 17L20.5 12.5M3.5 16.5L12 21L20.5 16.5', pontos: [[12, 8, 1.5]] },

  /* ---------- Ganhos (O que muda na sua clínica) ---------- */
  funil: { grupo: 'Ganhos', rotulo: 'Conversão', base: 'M3.5 4.5H20.5L14 12.5V19L10 21V12.5Z' },
  investimento: { grupo: 'Ganhos', rotulo: 'Investimento', base: 'M10 14V6.5A7.5 7.5 0 1 0 17.5 14Z', acento: 'M13 11V3.5A7.5 7.5 0 0 1 20.5 11Z' },
  dados: { grupo: 'Ganhos', rotulo: 'Dados', base: 'M3.5 20.5H20.5M7 17V13M11 17V9M15 17V11', acento: 'M19 17V6' },

  /* ---------- Canais e etapas (ilustrações) ---------- */
  anuncios: { grupo: 'Canais e etapas', rotulo: 'Anúncios', base: 'M3.5 10V14H6.5L15.5 19V5L6.5 10ZM6.5 14L8 19.5H10.5L9.3 15.5', acento: 'M18.5 9.5L20.5 8M19 12H21.5M18.5 14.5L20.5 16' },
  google: { grupo: 'Canais e etapas', rotulo: 'Google', base: 'M19.6 7.6A8.5 8.5 0 1 0 20.5 12H12.5' },
  busca: { grupo: 'Canais e etapas', rotulo: 'Busca', base: circ(10.5, 10.5, 6.5) + 'M15.3 15.3L20.5 20.5' },
  atendimento: { grupo: 'Canais e etapas', rotulo: 'Atendimento', base: 'M4 13.5V12A8 8 0 0 1 20 12V13.5' + ch(3, 13, 4, 6, 1) + ch(17, 13, 4, 6, 1), acento: 'M19 19L16.5 21.5H13' },
  conversa: { grupo: 'Canais e etapas', rotulo: 'Conversa', base: 'M6 4H18L20 6V14L18 16H11L6 20V16H6L4 14V6Z', pontos: [[8.5, 10, 1.1], [12, 10, 1.1], [15.5, 10, 1.1]] },
  agenda: { grupo: 'Canais e etapas', rotulo: 'Agenda', base: ch(3.5, 5, 17, 15.5, 2) + 'M3.5 10H20.5M8 3V7M16 3V7', pontos: [[12, 15.2, 1.7]] },
  consulta: { grupo: 'Canais e etapas', rotulo: 'Consulta', base: 'M9 3.5H15V9H20.5V15H15V20.5H9V15H3.5V9H9Z', pontos: [[12, 12, 1.7]] },
  redes: { grupo: 'Canais e etapas', rotulo: 'Redes sociais', base: circ(12, 12, 3.8) + 'M15.8 8.5V13.5A2.6 2.6 0 0 0 21 13.5V12A9 9 0 1 0 17.5 19.1' },
  indicacao: { grupo: 'Canais e etapas', rotulo: 'Indicação', base: circ(9, 8, 3.5) + 'M3 20V18L6 15H12L15 18V20', acento: 'M18.5 8V14M15.5 11H21.5' },
  telefone: { grupo: 'Canais e etapas', rotulo: 'Telefone', base: 'M5.5 3.5H9L11 8.5L8.5 10A11 11 0 0 0 14 15.5L15.5 13L20.5 15V18.5L18.5 20.5A15.5 15.5 0 0 1 3.5 5.5Z' },
  ficha: { grupo: 'Canais e etapas', rotulo: 'Ficha', base: ch(5, 5, 14, 16, 2) + 'M9.5 5V3.5H14.5V5M8.5 11H15.5M8.5 15H13' },
  etiqueta: { grupo: 'Canais e etapas', rotulo: 'Etiqueta', base: 'M3.5 3.5H11.5L20.5 12.5L12.5 20.5L3.5 11.5Z', pontos: [[8, 8, 1.5]] },
  pino: { grupo: 'Canais e etapas', rotulo: 'Local', base: 'M12 21.5L5.8 13.6A7.2 7.2 0 1 1 18.2 13.6Z', pontos: [[12, 9.4, 2]] },
  encerrou: { grupo: 'Canais e etapas', rotulo: 'Encerrado', base: OCT, acento: 'M9 9L15 15M15 9L9 15' },
  base: { grupo: 'Canais e etapas', rotulo: 'Base de dados', base: 'M4 6L7 3.5H17L20 6V18L17 20.5H7L4 18ZM4 6L7 8.5H17L20 6M4 12L7 14.5H17L20 12' },

} satisfies Record<string, IconeRenke>;

export type NomeIconeRenke = keyof typeof ICONES_RENKE;
