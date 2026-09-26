/**
 * Dobras da home que os fundos do laboratório acompanham (véu e prata).
 * Um lugar só para o roteiro, as dobras transparentes, os textos que a
 * máscara de leitura protege e os cartões atrás dos quais o fundo fica fosco.
 */
import { TEXTOS } from './fundo-motor';

/** Dobra → quadro. As dobras claras (palco, resultados) já levam o quadro da próxima dobra escura. */
export const ROTEIRO: [string, string][] = [
  ['.hero', 'hero'],
  ['#o-que-fazemos', 'metodologia'],
  ['#pilares-revena, #protocolo-revena.pilares', 'pilares'],
  ['.letreiro', 'letreiro'],
  ['[data-palcoplanos], [data-planos]', 'perguntas'],   // dobra clara: troca de quadro coberta
  ['#perguntas', 'perguntas'],
  ['#resultados', 'convite'],
  ['#fale', 'convite'],
  ['#academy-tools', 'academy'],
  ['#sobre', 'sobre'],
  ['#formulario', 'formulario'],
];

export const TRANSPARENTES = '.hero, #o-que-fazemos, #pilares-revena, #protocolo-revena.pilares, .letreiro, #perguntas, #fale, #academy-tools, #sobre, #formulario';

export const TEXTOS_DOBRAS = [
  TEXTOS, '#protocolo-revena.pilares .titulo', '.pilares__cabeca', '.operacao__titulo', '#fale .titulo', '#fale p', '.ecossistema__cabeca',
].join(', ');

/** Caixas com fundo próprio: atrás delas o fundo perde brilho (e, no véu, o foco).
 *  Rodada 3: as caixas viraram vidro translúcido e deixam a cena aparecer; nada a escurecer. */
export const CARTOES = '';

/** Blocos sem texto que também pedem o fundo escuro atrás (os retratos da prova social). */
export const CAIXAS = '.hero-prova__retratos';
