/**
 * Contrato das seções das páginas internas (27/09/2026).
 * Especificação: docs/04-design/paginas-internas.md, seção "Fundação".
 *
 * Tipos e helpers puros, sem DOM. O despachante (Blocos2.astro) e o índice
 * lateral (IndicePagina.astro) usam o mesmo cálculo, planejarSecoes(), para
 * que ids, cenas e títulos nunca divirjam. Os componentes de bloco só leem
 * o ContextoSecao que recebem.
 */
import type { Bloco } from '../../data/paginas/tipos';

/** O bloco de um tipo só, tal como está em tipos.ts, sem campo novo. */
export type BlocoDe<T extends Bloco['tipo']> = Extract<Bloco, { tipo: T }>;

/** Quadros da cena usados nas internas (fundo-internas.ts). */
export type Cena = 'hero' | 'pilares' | 'formulario';

export interface ContextoSecao {
  id: string;          // 'secao-3' (o formulário usa 'formulario')
  tituloId: string;    // 'secao-3-titulo'
  indice: number;      // posição entre as seções renderizadas, a partir de 0
  cena?: Cena;         // vira data-cena; ausente = seção opaca (papel)
  junta: boolean;      // cola na seção anterior
  colaAbaixo: boolean; // a seção seguinte cola nesta
  primeira: boolean;   // indice === 0
  abertura?: string[]; // só formulario: linhas do H1 herdadas do hero curto
  rotulo?: string;     // só hero: rótulo acima do H1, vindo da navegação
  variante?: 'tipografica'; // só blocos: logo depois de outra seção de cartões, sai sem cartão
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

/** 'prosa' (caixa escura com dois lados) ou 'lista' (mosaico papel). */
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

/** Classes da <section> raiz de todo bloco. */
export const classesSecao = (secao: ContextoSecao, ...extras: (string | false | null | undefined)[]) =>
  ['secao', 'int-secao', secao.junta && 'int-secao--junta', secao.colaAbaixo && 'int-secao--cola-abaixo', ...extras];

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

/** Título (h2) do bloco, quando há; linhas juntas por espaço. O hero devolve o h1. */
export const tituloDe = (b: Bloco): string | undefined => {
  switch (b.tipo) {
    case 'hero': return b.titulo.join(' ');
    case 'etapas': return b.h2.join(' ');
    case 'ctaFinal': return b.destaque;
    case 'pendencia': return undefined;
    default: return b.h2;
  }
};

const ehSolto = (b: Bloco) => b.tipo === 'texto' && formaTexto(b) === 'solto';
const ehPapel = (b: Bloco) => b.tipo === 'antesDepois' && formaAntesDepois(b) === 'lista';
/** Seções desenhadas em cartões escuros: blocos, etapas e números em grade. */
const ehCartoes = (b: Bloco) => b.tipo === 'blocos' || b.tipo === 'etapas' || (b.tipo === 'numeros' && !!b.grade);

/**
 * O plano da página: cada bloco com o contexto da sua seção.
 * a) Fusão do Contato: hero sem sub e sem cta seguido (pendências à parte)
 *    de formulário sem h2 → o hero some e o formulário herda as linhas em
 *    `abertura`.
 * b) Pendências não contam para nada.
 * c) id 'secao-N', contando só as seções renderizadas; o formulário usa 'formulario'.
 * d) cena: a primeira é 'hero'; a última transparente, 'formulario'; as
 *    outras transparentes, 'pilares'; a dobra papel não tem cena.
 * e) junta: texto 'solto' ou números sem h2, desde que a seção anterior não
 *    seja hero, formulário nem a dobra papel. A anterior recebe colaAbaixo.
 * f) primeira = índice 0. O rótulo da rota vai só para a hero.
 * g) variante 'tipografica': blocos logo depois de outra seção de cartões
 *    (blocos em cartões, etapas ou números em grade), para a página não
 *    emendar dobras de cartões iguais. Um blocos já tipográfico não conta.
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

  const reais = lista.filter((b): b is Exclude<Bloco, { tipo: 'pendencia' }> => b.tipo !== 'pendencia');
  const ultimaTransparente = reais.reduce((u, b, i) => (ehPapel(b) ? u : i), -1);
  const contextos = reais.map((b, i): ContextoSecao => {
    const id = b.tipo === 'formulario' ? 'formulario' : `secao-${i + 1}`;
    const cena: Cena | undefined =
      i === 0 ? 'hero' : ehPapel(b) ? undefined : i === ultimaTransparente ? 'formulario' : 'pilares';
    const anterior = reais[i - 1];
    const junta = !!anterior && anterior.tipo !== 'hero' && anterior.tipo !== 'formulario' && !ehPapel(anterior)
      && (ehSolto(b) || (b.tipo === 'numeros' && !b.h2));
    return {
      id, tituloId: `${id}-titulo`, indice: i, cena, junta, colaAbaixo: false, primeira: i === 0,
      ...(b.tipo === 'formulario' && abertura ? { abertura } : {}),
      ...(b.tipo === 'hero' && rotuloDaRota(rota) ? { rotulo: rotuloDaRota(rota) } : {}),
    };
  });
  contextos.forEach((c, i) => { if (c.junta && i > 0) contextos[i - 1].colaAbaixo = true; });
  reais.forEach((b, i) => {
    const anterior = reais[i - 1];
    if (b.tipo === 'blocos' && anterior && ehCartoes(anterior) && !contextos[i - 1].variante) contextos[i].variante = 'tipografica';
  });

  let k = 0;
  return lista.map((b) => (b.tipo === 'pendencia' ? { bloco: b } : { bloco: b, secao: contextos[k++] }) as EntradaPlano);
}

/** Uma entrada do índice lateral (IndicePagina.astro). */
export interface ItemIndice { id: string; titulo: string; numero: string }

/**
 * Seções com título (h2) depois da primeira, na ordem da página. O índice
 * só aparece com 4 ou mais; abaixo disso, a lista volta vazia.
 */
export function indiceDaPagina(plano: EntradaPlano[]): ItemIndice[] {
  const itens = plano
    .filter((e): e is Extract<EntradaPlano, { secao: ContextoSecao }> => !!e.secao && !e.secao.primeira)
    .map((e) => ({ id: e.secao.id, titulo: tituloDe(e.bloco) }))
    .filter((e): e is { id: string; titulo: string } => !!e.titulo)
    .map((e, i) => ({ ...e, numero: indice2(i + 1) }));
  return itens.length >= 4 ? itens : [];
}
