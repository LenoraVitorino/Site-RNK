/**
 * Gera uma versão de arquivo único do wireframe, com CSS e JS embutidos.
 *
 *   node wireframe/build-standalone.mjs
 *   → wireframe/wireframe-home-renke.html
 *
 * Para quê: o index.html depende de assets/css e assets/js ao lado. Sozinho,
 * ele abre sem estilo nenhum. Esta versão é autossuficiente — dá pra mandar
 * por e-mail/WhatsApp e abrir com duplo-clique, sem servidor.
 *
 * A fonte da verdade continua sendo index.html. O arquivo gerado NÃO é
 * versionado (ver .gitignore) justamente para não divergir da fonte.
 */

import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = dirname(fileURLToPath(import.meta.url));
const read = (...p) => readFileSync(join(dir, ...p), 'utf8');

const html = read('index.html');
const css = read('assets', 'css', 'wireframe.css');
const js = read('assets', 'js', 'nav.js');

const LINK = '<link rel="stylesheet" href="assets/css/wireframe.css">';
const SCRIPT = '<script src="assets/js/nav.js"></script>';

for (const [nome, tag] of [['CSS', LINK], ['JS', SCRIPT]]) {
  if (!html.includes(tag)) {
    console.error(`Referência de ${nome} não encontrada em index.html:\n  ${tag}`);
    process.exit(1);
  }
}

const out = html
  .replace(LINK, `<style>\n${css}\n</style>`)
  .replace(SCRIPT, `<script>\n${js}\n</script>`);

const externas = /(src|href)="(?!#|data:)[^"]*"/.exec(out);
if (externas) {
  console.error(`Sobrou referência externa, o arquivo não é autossuficiente: ${externas[0]}`);
  process.exit(1);
}

const destino = join(dir, 'wireframe-home-renke.html');
writeFileSync(destino, out);
console.log(`✓ ${destino} (${(out.length / 1024).toFixed(1)} KB)`);
