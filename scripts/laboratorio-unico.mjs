/**
 * Gera um HTML único, com tudo dentro, de uma página do laboratório, para
 * abrir no celular sem servidor (arquivo enviado ou página hospedada).
 *
 *   npm run build && node scripts/laboratorio-unico.mjs [pagina]
 *   → dist-unico/<pagina>.html      (padrão: laboratorio/veu)
 *
 * Diferente do scripts/artifact.mjs (que junta o site inteiro e deixa os
 * scripts de módulo de fora), este leva uma página só e empacota o JS dela
 * com o esbuild, inclusive os imports dinâmicos (o fundo e o three.js). CSS,
 * fontes e imagens entram como data URI. Os vídeos ficam de fora (só a imagem
 * de capa), para o arquivo abrir leve no celular. Links para outras páginas
 * não funcionam no arquivo; é só uma prévia.
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { dirname, join, extname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { build } from 'esbuild';

const raiz = join(dirname(fileURLToPath(import.meta.url)), '..');
const dist = join(raiz, process.env.DIST || 'dist');
const pagina = process.argv[2] || 'laboratorio/veu';
const saida = join(raiz, 'dist-unico');

const tipos = {
  '.css': 'text/css', '.woff2': 'font/woff2', '.woff': 'font/woff', '.png': 'image/png', '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg', '.webp': 'image/webp', '.avif': 'image/avif', '.svg': 'image/svg+xml', '.mp4': 'video/mp4',
};
const arquivo = (url) => {
  const caminho = join(dist, decodeURIComponent(url.split(/[?#]/)[0]));
  return existsSync(caminho) ? caminho : null;
};
const dataUri = (url) => {
  const c = arquivo(url);
  if (!c) return null;
  return `data:${tipos[extname(c).toLowerCase()] || 'application/octet-stream'};base64,${readFileSync(c).toString('base64')}`;
};

let html = readFileSync(join(dist, `${pagina}.html`), 'utf8');

// CSS: cada folha entra inteira, com as fontes e imagens dela em data URI.
html = html.replace(/<link rel="stylesheet" href="(\/_astro\/[^"]+\.css)"\s*\/?>/g, (_m, href) => {
  const css = readFileSync(arquivo(href), 'utf8').replace(/url\((['"]?)(\/[^'")]+)\1\)/g, (m, _q, url) => {
    const d = dataUri(url);
    return d ? `url("${d}")` : m;
  });
  return `<style>${css}</style>`;
});

// Os vídeos saem (embutidos, passariam de 9 MB): fica a imagem de capa.
html = html.replace(/<source[^>]*\.mp4"[^>]*>/g, '').replace(/\ssrc="[^"]*\.mp4"/g, '');

// srcset aponta para variações que não vale a pena embutir: fica só o src.
html = html.replace(/\s(srcset|sizes)="[^"]*"/g, '');

// Imagens, ícones, pôster e vídeo em data URI.
html = html.replace(/\s(src|poster)="(\/(?!\/)[^"]+)"/g, (m, attr, url) => {
  if (url.endsWith('.js')) return m;
  const d = dataUri(url);
  return d ? ` ${attr}="${d}"` : m;
});

// Scripts de módulo externos: empacotados com os imports dinâmicos dentro.
// O Vite pré-carrega os pedaços importados sob demanda (__vite__mapDeps); no
// arquivo único eles já estão dentro, então a lista de pré-carga vai vazia.
const semPreCarga = {
  name: 'sem-pre-carga',
  setup(b) {
    b.onLoad({ filter: /\.js$/ }, (args) => ({
      contents: readFileSync(args.path, 'utf8').replace(/__vite__mapDeps\(\[[\d,]*\]\)/g, 'void 0'),
      loader: 'js',
    }));
  },
};
const scripts = [...html.matchAll(/<script type="module" src="(\/_astro\/[^"]+\.js)"><\/script>/g)];
for (const [tag, src] of scripts) {
  const r = await build({ entryPoints: [arquivo(src)], bundle: true, format: 'iife', minify: true, write: false, logLevel: 'silent', plugins: [semPreCarga] });
  const codigo = r.outputFiles[0].text.replace(/<\/script/gi, '<\\/script');
  html = html.replace(tag, () => `<script>${codigo}</script>`);
}

const restos = [...html.matchAll(/(?:src|href)="(\/_astro\/[^"]+)"/g)].map((m) => m[1]);
if (restos.length) console.warn('Ficaram referências sem embutir:', restos);

mkdirSync(saida, { recursive: true });
const destino = join(saida, `${pagina.replaceAll('/', '-')}.html`);
writeFileSync(destino, html);
console.log(`${destino} — ${(Buffer.byteLength(html) / 1024 / 1024).toFixed(1)} MB`);
