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

import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const raiz = join(dirname(fileURLToPath(import.meta.url)), '..');
const dist = join(raiz, 'dist');
const saida = join(raiz, 'dist-artifact');

const pagina = process.argv[2] || 'index';
const titulos = {
  index: 'Wireframe da Home Renke',
  'design-system': 'Design System Renke',
};

let html = readFileSync(join(dist, `${pagina}.html`), 'utf8');

// 1) CSS: inline de TODAS as folhas que a página referencia, com as fontes
//    como data URI. Com mais de uma página há mais de um bundle — pegar o
//    primeiro do diretório embutiria o CSS da página errada.
let fontes = 0;

const inlineFontes = (css) =>
  css.replace(/url\((['"]?)\/_astro\/([^'")]+\.woff2?)\1\)/g, (_m, _q, arquivo) => {
    const dados = readFileSync(join(dist, '_astro', arquivo)).toString('base64');
    const tipo = arquivo.endsWith('.woff2') ? 'font/woff2' : 'font/woff';
    fontes++;
    return `url(data:${tipo};base64,${dados})`;
  });

const links = [...html.matchAll(/<link rel="stylesheet" href="\/_astro\/([^"]+\.css)"\s*\/?>/g)];
if (links.length === 0) {
  console.error(`Nenhuma folha de estilo encontrada em ${pagina}.html`);
  process.exit(1);
}

for (const [tag, arquivo] of links) {
  html = html.replace(tag, `<style>\n${readFileSync(join(dist, '_astro', arquivo), 'utf8')}\n</style>`);
}

// A Astro também embute CSS direto no HTML quando o bundle é pequeno, então a
// substituição roda no documento inteiro — não só nas folhas linkadas.
html = inlineFontes(html);

// 2) Descarta o esqueleto do documento — a página publicada já fornece o dela
// O <body> pode ter atributos (class, data-*), então casa por regex.
// Procurar a string literal "<body>" devolvia -1 e vazava o doctype na página.
const abre = html.match(/<body[^>]*>/);
if (!abre) {
  console.error(`Não encontrei a tag <body> em ${pagina}.html`);
  process.exit(1);
}
const inicio = abre.index + abre[0].length;
const corpo = html.slice(inicio, html.lastIndexOf('</body>'));
// Título fixo: o <title> da home é a meta tag de SEO, longa demais para
// nomear a prévia. E o nome precisa ficar estável entre publicações.
const titulo = titulos[pagina] || pagina;
const estilos = (html.match(/<style>[\s\S]*?<\/style>/g) || []).join('\n');

const final = `<title>${titulo}</title>\n${estilos}\n${corpo}\n`;

// 3) Imagens locais viram data URI — a página publicada não busca arquivo externo
let imagens = 0;
const embutir = (texto) =>
  texto.replace(/(src|href)="\/((?:marca|imagens)\/[^"]+)"/g, (_m, attr, arquivo) => {
    try {
      const dados = readFileSync(join(dist, arquivo)).toString('base64');
      const ext = arquivo.split('.').pop().toLowerCase();
      const tipo = ext === 'svg' ? 'image/svg+xml' : ext === 'png' ? 'image/png' : `image/${ext}`;
      imagens++;
      return `${attr}="data:${tipo};base64,${dados}"`;
    } catch {
      return _m;
    }
  });

// 4) Página única: links de navegação viram âncora inerte
const final2 = embutir(final).replace(/href="\/(?!\/)[^"]*"/g, 'href="#"');

// 5) Confere que não sobrou referência a arquivo externo
const externa = /(src|href)="\/(?!\/)/.exec(final2) || /url\(['"]?\/(?!\/)/.exec(final2);
if (externa) {
  console.error(`Sobrou referência externa: ${externa[0]}`);
  process.exit(1);
}

mkdirSync(saida, { recursive: true });
const destino = join(saida, `${pagina}.html`);
writeFileSync(destino, final2);

console.log(`✓ ${destino}`);
console.log(`  ${fontes} fonte(s) e ${imagens} imagem(ns) embutidas · ${(final2.length / 1024).toFixed(0)} KB`);
