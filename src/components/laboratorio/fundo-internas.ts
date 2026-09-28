/**
 * Roteiro genérico da cena nas páginas internas (27/09/2026).
 * Especificação: docs/04-design/paginas-internas.md, "Fundação", item 5.
 *
 * Cada seção transparente leva data-cena ('hero', 'pilares' ou
 * 'formulario'), calculado pelo despachante (contexto.ts). As seções
 * sólidas (papel e preto) não têm cena. Os quadros vêm da home: 'hero' (t = 0), 'pilares' (.125)
 * e 'formulario' (t = 0). 'perguntas' e 'convite' ficam de fora, porque
 * puxam a minhoca e a névoa do trecho dos planos.
 */

/** Dobra → quadro, lido das seções do <main> na ordem da página. */
export const roteiroInterno = (): [string, string][] =>
  [...document.querySelectorAll<HTMLElement>('main > [data-cena]')].map((el) => ['#' + el.id, el.dataset.cena!]);

/**
 * Blocos de texto que a máscara de leitura protege. Cartões, caixa, painel e papel já protegem o próprio texto.
 * A cabeça da hero cobre rótulo e H1; a lista inteira cobre índices, pontos e texto.
 * Só texto sobre a cena: o limite é de 16 retângulos por quadro. Os cinco últimos são da página
 * Sobre: a abertura, o título e cada linha da tese (um retângulo por linha, para não escurecer
 * o vão entre elas) e a cabeça da casa (título e texto), que ficam na cena desde 28/09/2026.
 */
export const TEXTOS_INTERNAS = [
  '.int-hero__cabeca', '.int-hero__sub', '.int-hero__acoes', '.int-cabeca', '.int-lista__itens', '.int-rico',
  '.int-citacao', '.int-regua', '.int-faq__item', '.int-dados', '.int-cta__miolo', '.form-block__text', '.int-erro__miolo',
  '.int-etapas__fechamento', '.int-numeros__nota', '.int-blocos__lista', '.sb-abertura__miolo',
  '.sb-tese__titulo', '.sb-tese__linha', '.sb-casa__titulo', '.sb-casa__texto',
].map((s) => `main > [data-cena] ${s}`).join(', ');
