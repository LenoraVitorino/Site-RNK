/**
 * Quais rotas já existem como página.
 *
 * Derivado do diretório de páginas em tempo de build, não de uma lista à
 * mão: uma página nova acende o link dela sozinha.
 *
 * Lê o disco com node:fs em vez de import.meta.glob({ eager: true }): o glob
 * importava todas as páginas dentro de quem chamasse, e o Astro passava a
 * embutir o CSS de todas as páginas em cada uma — a home v2 carregava o
 * site.css antigo depois do seu e perdia a cascata.
 */
import { readdirSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

// A partir da raiz do projeto (constante de build, ver astro.config.mjs).
// Nem import.meta.url (no build aponta para o chunk em dist/) nem
// process.cwd() (depende da pasta de onde o comando foi rodado) servem.
const pastaPaginas = join(__RAIZ__, 'src', 'pages');

const lista = (dir: string): string[] =>
  readdirSync(dir).flatMap((n) => {
    const p = join(dir, n);
    return statSync(p).isDirectory() ? lista(p) : n.endsWith('.astro') ? [p] : [];
  });

export const rotasProntas: ReadonlySet<string> = new Set(
  lista(pastaPaginas)
    .map((arquivo) => {
      const rel = '/' + relative(pastaPaginas, arquivo).replace(/\\/g, '/').replace(/\.astro$/, '');
      return rel.replace(/\/index$/, '') || '/';
    })
    // 404 e design-system não são destino de navegação
    .filter((rota) => rota !== '/404' && rota !== '/design-system'),
);

export const existe = (rota: string) => rotasProntas.has(rota);
