/**
 * Gera um HTML único e autossuficiente do site, pronto para publicar
 * como página hospedada (Artifact).
 *
 *   npm run artifact   →  dist-artifact/home.html
 *
 * Por que existe: a página publicada não pode carregar arquivos externos —
 * CSS, JS e fontes precisam estar dentro do próprio HTML. As fontes viram
 * data URI em base64.
 */

import { readFileSync, writeFileSync, mkdirSync, readdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const raiz = join(dirname(fileURLToPath(import.meta.url)), '..');
const dist = join(raiz, 'dist');
const saida = join(raiz, 'dist-artifact');

let html = readFileSync(join(dist, 'index.html'), 'utf8');

// 1) CSS: inline, com as fontes como data URI
const nomeCss = readdirSync(join(dist, '_astro')).find((f) => f.endsWith('.css'));
let css = readFileSync(join(dist, '_astro', nomeCss), 'utf8');

let fontes = 0;
css = css.replace(/url\((['"]?)\/_astro\/([^'")]+\.woff2?)\1\)/g, (_m, _q, arquivo) => {
  const dados = readFileSync(join(dist, '_astro', arquivo)).toString('base64');
  const tipo = arquivo.endsWith('.woff2') ? 'font/woff2' : 'font/woff';
  fontes++;
  return `url(data:${tipo};base64,${dados})`;
});

html = html.replace(
  new RegExp(`<link rel="stylesheet" href="/_astro/${nomeCss}">`),
  `<style>\n${css}\n</style>`
);

// 2) Descarta o esqueleto do documento — a página publicada já fornece o dela
const corpo = html.slice(html.indexOf('<body>') + 6, html.lastIndexOf('</body>'));
// Título fixo: o <title> da página é a meta tag de SEO, longa demais para
// nomear a prévia. E o nome precisa ficar estável entre publicações.
const titulo = 'Wireframe da Home Renke';
const estilos = (html.match(/<style>[\s\S]*?<\/style>/g) || []).join('\n');

const final = `<title>${titulo}</title>\n${estilos}\n${corpo}\n`;

// 3) Página única: links de navegação viram âncora inerte
const final2 = final.replace(/href="\/(?!\/)[^"]*"/g, 'href="#"');

// 4) Confere que não sobrou referência a arquivo externo
const externa = /(src|href)="\/(?!\/)/.exec(final2) || /url\(['"]?\/(?!\/)/.exec(final2);
if (externa) {
  console.error(`Sobrou referência externa: ${externa[0]}`);
  process.exit(1);
}

mkdirSync(saida, { recursive: true });
const destino = join(saida, 'home.html');
writeFileSync(destino, final2);

console.log(`✓ ${destino}`);
console.log(`  ${fontes} fonte(s) embutida(s) · ${(final2.length / 1024).toFixed(0)} KB`);
