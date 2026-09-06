/**
 * Quais rotas já existem como página.
 *
 * Derivado do próprio diretório de páginas, não de uma lista escrita à mão:
 * quando uma página nova entra em src/pages/, o link dela no menu acende
 * sozinho. Uma lista manual sairia de sincronia no primeiro esquecimento.
 */

const arquivos = import.meta.glob('/src/pages/**/*.astro', { eager: true });

export const rotasProntas: ReadonlySet<string> = new Set(
  Object.keys(arquivos)
    .map((caminho) =>
      caminho
        .replace('/src/pages', '')
        .replace(/\.astro$/, '')
        .replace(/\/index$/, '') || '/',
    )
    // 404 e design-system não são destino de navegação
    .filter((rota) => rota !== '/404' && rota !== '/design-system'),
);

export const existe = (rota: string) => rotasProntas.has(rota);
