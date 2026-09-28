/**
 * Contrato das seções das páginas internas (27/09/2026).
 * Especificação: docs/04-design/paginas-internas.md, seção "Fundação".
 *
 * Tipos e helpers puros, sem DOM. O despachante (Blocos2.astro) calcula as
 * seções com planejarSecoes(), para que ids, cenas e tons nunca divirjam.
 * Os componentes de bloco só leem o ContextoSecao que recebem.
 * O índice lateral da página saiu em 28/09/2026 (pedido da Lenora).
 */
import type { Bloco } from '../../data/paginas/tipos';

/** O bloco de um tipo só, tal como está em tipos.ts, sem campo novo. */
export type BlocoDe<T extends Bloco['tipo']> = Extract<Bloco, { tipo: T }>;

/** Quadros da cena usados nas internas (fundo-internas.ts). */
export type Cena = 'hero' | 'pilares' | 'formulario';

/** Tom da seção: 'cena' é transparente (leva data-cena); 'papel' e 'preto' são dobras sólidas. */
export type Tom = 'cena' | 'papel' | 'preto';

export interface ContextoSecao {
  id: string;          // 'secao-3' (o formulário usa 'formulario')
  tituloId: string;    // 'secao-3-titulo'
  indice: number;      // posição entre as seções renderizadas, a partir de 0
  cena?: Cena;         // vira data-cena; só quando tom === 'cena' (nas dobras sólidas fica undefined)
  junta: boolean;      // cola na seção anterior
  colaAbaixo: boolean; // a seção seguinte cola nesta
  primeira: boolean;   // indice === 0
  abertura?: string[]; // só formulario: linhas do H1 herdadas do hero curto
  rotulo?: string;     // só hero: rótulo acima do H1, vindo da navegação
  variante?: 'tipografica'; // só blocos: logo depois de outra seção de cartões, sai sem cartão
  tom: Tom;            // vira data-tom; papel e preto também ganham int-secao--{tom}
}

/** Uma entrada do plano: a pendência não tem seção (e some em produção). */
export type EntradaPlano =
  | { bloco: Exclude<Bloco, { tipo: 'pendencia' }>; secao: ContextoSecao }
  | { bloco: BlocoDe<'pendencia'>; secao?: undefined };

/* ------------------------------------------------------------------ */
/* Helpers de texto                                                     */
/* ------------------------------------------------------------------ */

/** Tira a seta do fim do rótulo ('Quero o Start →' → 'Quero o Start'). */
export const semSeta = (s: string) => s.replace(/\s*[→↓]\s*$/, '');

/** Índice de duas casas: 1 → '01'. */
export const indice2 = (n: number) => String(n).padStart(2, '0');

/** Parágrafo inteiro em <em>, ou começando por aspas. */
export const ehCitacao = (p: string) => {
  const s = p.trim();
  return (/^<em>[\s\S]*<\/em>$/.test(s) && !/<\/em>[\s\S]*<em>/.test(s)) || /^["“”«]/.test(s);
};

/** Parágrafo inteiro em <strong>. */
export const ehDestaque = (p: string) => {
  const s = p.trim();
  return /^<strong>[\s\S]*<\/strong>$/.test(s) && !/<\/strong>[\s\S]*<strong>/.test(s);
};

/** Rótulo de ficha: '<strong>Rótulo:</strong> resto', com até 40 caracteres no rótulo. */
const ROTULO_FICHA = /^<strong>([^<]{1,39}:)<\/strong>\s*([\s\S]*)$/;

/** Separa '<strong>E-mail:</strong> resto' em ['E-mail', 'resto']; null quando não é ficha. */
export const partesFicha = (p: string): [string, string] | null => {
  const m = p.trim().match(ROTULO_FICHA);
  return m ? [m[1].replace(/:$/, ''), m[2]] : null;
};

/* ------------------------------------------------------------------ */
/* Formas                                                               */
/* ------------------------------------------------------------------ */

/** 'prosa' (caixa com dois lados) ou 'lista' (mosaico de fichas). */
export const formaAntesDepois = (b: BlocoDe<'antesDepois'>): 'prosa' | 'lista' =>
  b.linhas.length === 1 && b.linhas[0][0].length + b.linhas[0][1].length > 240 ? 'prosa' : 'lista';

export type FormaTexto = 'citacao' | 'ficha' | 'editorial' | 'solto';

export const formaTexto = (b: BlocoDe<'texto'>): FormaTexto => {
  // Só sem título: a forma 'citacao' não desenha cabeça, e o h2/eyebrow sumiria da página.
  if (b.centro && b.paragrafos.length === 1 && !b.h2 && !b.eyebrow) return 'citacao';
  if (b.paragrafos.length >= 3 && b.paragrafos.every((p) => ROTULO_FICHA.test(p.trim()))) return 'ficha';
  if (b.h2 || b.eyebrow) return 'editorial';
  return 'solto';
};

/**
 * Divide um item de número em [destaque, resto], sem mudar o texto:
 * `${destaque} ${resto}`.trim() === item.
 * 1) ':' seguido de espaço nos primeiros 24 caracteres: o destaque vai até
 *    ele, inclusive ('10:30 horas' e '1:1' não entram aqui).
 * 2) Primeiro token com dígito, estendido por ' a ' + outro token com dígito.
 * 3) Nos demais casos, o item inteiro.
 */
export const partesNumero = (item: string): [string, string] => {
  const m1 = item.match(/^([^:]{1,23}:)\s+([\s\S]*)$/);
  if (m1) return [m1[1], m1[2]];
  const m = item.match(/^(\S*\d\S*)(?: a (\S*\d\S*))?(?:\s+([\s\S]*))?$/);
  if (m) return [m[2] ? `${m[1]} a ${m[2]}` : m[1], (m[3] ?? '').trim()];
  return [item, ''];
};

/* ------------------------------------------------------------------ */
/* Seções                                                               */
/* ------------------------------------------------------------------ */

/** Classes da <section> raiz de todo bloco. As dobras sólidas levam int-secao--papel ou int-secao--preto. */
export const classesSecao = (secao: ContextoSecao, ...extras: (string | false | null | undefined)[]) =>
  ['secao', 'int-secao', secao.junta && 'int-secao--junta', secao.colaAbaixo && 'int-secao--cola-abaixo',
   secao.tom !== 'cena' && `int-secao--${secao.tom}`, ...extras];

/**
 * Rótulo da hero, com um texto que JÁ EXISTE na navegação (nav.ts).
 * Não é copy nova.
 */
export const rotuloDaRota = (rota?: string): string | undefined => {
  if (!rota) return undefined;
  if (rota.startsWith('/studio/')) return 'Protocolo Revena';
  if (rota === '/academy') return 'Para Agências';
  if (rota.startsWith('/academy/')) return 'Renke Academy';
  if (rota === '/faca-parte') return 'A Renke';
  return undefined;
};

const ehSolto = (b: Bloco) => b.tipo === 'texto' && formaTexto(b) === 'solto';
/** Seções desenhadas em cartões: blocos, etapas e números em grade. */
const ehCartoes = (b: Bloco) => b.tipo === 'blocos' || b.tipo === 'etapas' || (b.tipo === 'numeros' && !!b.grade);

/* ------------------------------------------------------------------ */
/* Tons (28/09/2026)                                                    */
/* Especificação: docs/04-design/ritmo-dobras-internas.md, item (a).    */
/* ------------------------------------------------------------------ */

type Real = Exclude<Bloco, { tipo: 'pendencia' }>;
/** O fecho da página fica sempre na cena. */
const ehFecho = (b: Real) => b.tipo === 'ctaFinal' || b.tipo === 'formulario';
/** Forma visível da seção: duas seções de mesma assinatura no mesmo tom se repetem. */
const assinatura = (b: Real, c: ContextoSecao) =>
  b.tipo === 'texto' ? `texto:${formaTexto(b)}`
  : b.tipo === 'antesDepois' ? `antesDepois:${formaAntesDepois(b)}`
  : b.tipo === 'blocos' ? `blocos:${c.variante ?? 'cartoes'}`
  : b.tipo === 'numeros' ? `numeros:${b.grade ? 'grade' : 'regua'}`
  : b.tipo;
/** Herda o tom da anterior: cola nela (junta) ou é a régua sem h2 sob a abertura do Contato (fusão). */
const herdaTom = (reais: Real[], ctx: ContextoSecao[], i: number) => {
  const b = reais[i];
  return i > 0 && (ctx[i].junta || (b.tipo === 'numeros' && !b.h2 && !!ctx[i - 1].abertura));
};

/**
 * O tom de cada seção real, na ordem da página (regra de 28/09/2026, pedido
 * da Lenora: "não deixe dobras seguidas sólidas").
 * 1) Âncoras na cena: a primeira (hero) e todo ctaFinal/formulário (fecho).
 * 2) Unidades: cada seção que não herda, com as herdeiras dela (a mesma
 *    dobra). Entre as âncoras ficam trechos livres de unidades.
 * 3) Em cada trecho, sólida e cena alternam, começando por sólida depois da
 *    âncora: S ◌ S ◌ S. Com número ímpar de unidades o trecho termina em
 *    sólida antes do fecho; com número par, a última unidade fica na cena
 *    e encosta no fecho (as duas dobras da cena seguidas ficam junto ao
 *    fecho, nunca no meio). Assim nunca há duas sólidas encostadas.
 * 4) As sólidas da página inteira, na ordem e pulando as da cena, alternam
 *    papel e preto. Pesos: etapas puxam papel (+3) e antesDepois em lista
 *    também (+2), de modo que as etapas ficam com o papel quando os dois
 *    disputam; produtos (a caixa preta) e antesDepois em prosa puxam preto (+3);
 *    papel encostado na dobra do formulário (o cartão claro) perde 5;
 *    repetir a assinatura de uma sólida anterior no mesmo tom perde 1. Das
 *    duas partidas vence a de maior soma; o empate começa em papel.
 * 5) As herdeiras repetem o tom da anterior.
 */
function planejarTons(reais: Real[], ctx: ContextoSecao[]): Tom[] {
  const n = reais.length;
  const tons: (Tom | undefined)[] = new Array(n).fill(undefined);
  const herda = (i: number) => herdaTom(reais, ctx, i);

  // 1) Âncoras na cena.
  if (n) tons[0] = 'cena';
  reais.forEach((b, i) => { if (ehFecho(b)) tons[i] = 'cena'; });

  // 2) Trechos livres de unidades entre as âncoras. As herdeiras não entram nem quebram o trecho.
  const trechos: number[][] = [];
  let atual: number[] = [];
  for (let i = 0; i < n; i++) {
    if (tons[i] === 'cena') { if (atual.length) trechos.push(atual); atual = []; }
    else if (!herda(i)) atual.push(i);
  }
  if (atual.length) trechos.push(atual);

  // 3) Sólida e cena alternam em cada trecho, começando por sólida.
  const solidas: number[] = [];
  for (const c of trechos) c.forEach((i, k) => { if (k % 2 === 0) solidas.push(i); else tons[i] = 'cena'; });

  // Dobra do formulário = o formulário e as herdeiras dele.
  const dobraForm = new Set<number>();
  reais.forEach((b, i) => {
    if (b.tipo !== 'formulario') return;
    dobraForm.add(i);
    for (let j = i + 1; j < n && herda(j); j++) dobraForm.add(j);
  });
  const proxima = (i: number) => { let j = i + 1; while (j < n && herda(j)) j++; return j; };

  // 4) Papel ou preto em cada sólida, alternando na sequência das sólidas.
  const peso = (i: number, t: Tom) => {
    const b = reais[i];
    let p = 0;
    if (t === 'papel' && b.tipo === 'etapas') p += 3;
    if (t === 'papel' && b.tipo === 'antesDepois' && formaAntesDepois(b) === 'lista') p += 2;
    if (t === 'preto' && (b.tipo === 'produtos' || (b.tipo === 'antesDepois' && formaAntesDepois(b) === 'prosa'))) p += 3;
    if (t === 'papel' && (dobraForm.has(i - 1) || dobraForm.has(proxima(i)))) p -= 5;
    return p;
  };
  const partida = (ini: Tom): Tom[] => solidas.map((_, k) => (k % 2 === 0 ? ini : ini === 'papel' ? 'preto' : 'papel'));
  const soma = (t: Tom[]) => solidas.reduce((a, i, k) => {
    const repete = solidas.slice(0, k).some((j, m) => t[m] === t[k] && assinatura(reais[j], ctx[j]) === assinatura(reais[i], ctx[i]));
    return a + peso(i, t[k]) - (repete ? 1 : 0);
  }, 0);
  const pa = partida('papel'), pr = partida('preto');
  (soma(pr) > soma(pa) ? pr : pa).forEach((t, k) => (tons[solidas[k]] = t));

  // 5) Herdeiras.
  for (let i = 0; i < n; i++) if (!tons[i]) tons[i] = tons[i - 1] ?? 'cena';
  return tons as Tom[];
}

/**
 * O plano da página: cada bloco com o contexto da sua seção.
 * a) Fusão do Contato: hero sem sub e sem cta seguido (pendências à parte)
 *    de formulário sem h2 → o hero some e o formulário herda as linhas em
 *    `abertura`.
 * b) Pendências não contam para nada.
 * c) id 'secao-N', contando só as seções renderizadas; o formulário usa 'formulario'.
 * d) cena: só nas seções em tom 'cena'. 'hero' na primeira, 'pilares' nas
 *    do meio, 'formulario' no fecho (ctaFinal ou formulário); a herdeira
 *    repete o quadro da anterior. As dobras sólidas não têm cena.
 * e) junta: texto 'solto' ou números sem h2, desde que a seção anterior não
 *    seja hero nem formulário. A anterior recebe colaAbaixo.
 * f) primeira = índice 0. O rótulo da rota vai só para a hero.
 * g) variante 'tipografica': blocos logo depois de outra seção de cartões
 *    (blocos em cartões, etapas ou números em grade), para a página não
 *    emendar dobras de cartões iguais. Um blocos já tipográfico não conta.
 *    Calculada antes do tom e sem depender dele.
 * h) tom: planejarTons(). A cena fica na abertura e no fecho; no meio,
 *    sólida e cena alternam (nunca duas sólidas encostadas), e as sólidas
 *    alternam papel e preto entre si. A seção que cola (junta) e a régua
 *    sob a abertura do Contato herdam o tom da anterior.
 */
export function planejarSecoes(blocos: Bloco[], rota?: string): EntradaPlano[] {
  let lista = blocos;
  let abertura: string[] | undefined;
  const [primeiro] = blocos;
  if (primeiro?.tipo === 'hero' && !primeiro.sub && !primeiro.cta) {
    const proximo = blocos.slice(1).find((b) => b.tipo !== 'pendencia');
    if (proximo?.tipo === 'formulario' && !proximo.h2) {
      abertura = primeiro.titulo;
      lista = blocos.slice(1);
    }
  }

  const reais = lista.filter((b): b is Real => b.tipo !== 'pendencia');
  const contextos = reais.map((b, i): ContextoSecao => {
    const id = b.tipo === 'formulario' ? 'formulario' : `secao-${i + 1}`;
    const anterior = reais[i - 1];
    const junta = !!anterior && anterior.tipo !== 'hero' && anterior.tipo !== 'formulario'
      && (ehSolto(b) || (b.tipo === 'numeros' && !b.h2));
    return {
      id, tituloId: `${id}-titulo`, indice: i, cena: undefined, tom: 'cena', junta, colaAbaixo: false, primeira: i === 0,
      ...(b.tipo === 'formulario' && abertura ? { abertura } : {}),
      ...(b.tipo === 'hero' && rotuloDaRota(rota) ? { rotulo: rotuloDaRota(rota) } : {}),
    };
  });
  contextos.forEach((c, i) => { if (c.junta && i > 0) contextos[i - 1].colaAbaixo = true; });
  reais.forEach((b, i) => {
    const anterior = reais[i - 1];
    if (b.tipo === 'blocos' && anterior && ehCartoes(anterior) && !contextos[i - 1].variante) contextos[i].variante = 'tipografica';
  });

  const tons = planejarTons(reais, contextos);
  contextos.forEach((c, i) => {
    c.tom = tons[i];
    if (c.tom !== 'cena') return;
    c.cena = i === 0 ? 'hero'
      : herdaTom(reais, contextos, i) ? contextos[i - 1].cena
      : ehFecho(reais[i]) ? 'formulario'
      : 'pilares';                       // as dobras da cena no meio
  });

  let k = 0;
  return lista.map((b) => (b.tipo === 'pendencia' ? { bloco: b } : { bloco: b, secao: contextos[k++] }) as EntradaPlano);
}
