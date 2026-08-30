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

import { readFileSync, writeFileSync, mkdirSync, statSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const raiz = join(dirname(fileURLToPath(import.meta.url)), '..');
const dist = join(raiz, 'dist');
const saida = join(raiz, 'dist-artifact');

const pagina = process.argv[2] || 'index';
const titulos = {
  index: 'Home Renke Studio',
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
let corpo = html.slice(inicio, html.lastIndexOf('</body>'));

// A página publicada descarta o <body> e usa o do host. Se o nosso body
// carregava atributos — a página do design system usa class="ds" — o CSS
// escopado neles deixaria de aplicar. Envolve o conteúdo num elemento que
// herda esses atributos.
const atributos = abre[0].slice('<body'.length, -1).trim();
if (atributos) {
  corpo = `<div ${atributos} data-corpo>\n${corpo}\n</div>`;
}
// Título fixo: o <title> da home é a meta tag de SEO, longa demais para
// nomear a prévia. E o nome precisa ficar estável entre publicações.
const titulo = titulos[pagina] || pagina;
const estilos = (html.match(/<style>[\s\S]*?<\/style>/g) || []).join('\n');

let final = `<title>${titulo}</title>\n${estilos}\n${corpo}\n`;

// 3) Imagens locais viram data URI — a página publicada não busca arquivo externo
let imagens = 0;
const embutir = (texto) =>
  texto.replace(/(src|href|poster)="\/((?:marca|imagens|midia)\/[^"]+)"/g, (_m, attr, arquivo) => {
    try {
      const dados = readFileSync(join(dist, arquivo)).toString('base64');
      const ext = arquivo.split('.').pop().toLowerCase();
      // 'image/jpg' não é um tipo válido — o navegador tolera, o validador não.
      const tipos = { svg: 'image/svg+xml', png: 'image/png', jpg: 'image/jpeg', jpeg: 'image/jpeg', webp: 'image/webp' };
      const tipo = tipos[ext] || `image/${ext}`;
      imagens++;
      return `${attr}="data:${tipo};base64,${dados}"`;
    } catch {
      return _m;
    }
  });

// 4) Vídeo: a prévia não busca arquivo externo, então ele também precisa virar
//    data URI. Só um dos formatos entra — em base64 cada byte vira 1,37, e os
//    dois juntos estouram o limite da página publicada. Vence o menor arquivo,
//    porque o visualizador é um navegador atual e toca os dois.
let video = '';
const fontesVideo = [...final.matchAll(/<source src="\/(midia\/[^"]+)" type="([^"]+)"\s*\/?>/g)];
if (fontesVideo.length) {
  const candidatos = fontesVideo
    .map(([tag, arquivo, tipo]) => {
      try { return { tag, arquivo, tipo, bytes: statSync(join(dist, arquivo)).size }; }
      catch { return null; }
    })
    .filter(Boolean)
    .sort((a, b) => a.bytes - b.bytes);

  if (candidatos.length === 0) {
    console.error('Os <source> de vídeo não apontam para nenhum arquivo em dist/');
    process.exit(1);
  }
  const escolhido = candidatos[0];
  const dados = readFileSync(join(dist, escolhido.arquivo)).toString('base64');
  // O type com codecs é bom no site — na prévia o data URI já resolve, e um
  // codecs errado faria o navegador descartar a fonte sem tentar.
  const limpo = escolhido.tipo.split(';')[0];
  const substituto = `<source src="data:${limpo};base64,${dados}" type="${limpo}">`;

  // Todas as fontes saem; entra uma só, no lugar da primeira.
  final = final.replace(escolhido.tag, substituto);
  for (const c of candidatos) if (c !== escolhido) final = final.replace(c.tag, '');
  video = `${escolhido.arquivo} (${(escolhido.bytes / 1048576).toFixed(1)} MB → ` +
          `${(dados.length / 1048576).toFixed(1)} MB em base64)`;
}

// 5) Página única: links de navegação viram âncora inerte
let final2 = embutir(final).replace(/href="\/(?!\/)[^"]*"/g, 'href="#"');

// 6) Confere que não sobrou referência a arquivo externo
const externa = /(src|href|poster)="\/(?!\/)/.exec(final2) || /url\(['"]?\/(?!\/)/.exec(final2);
if (externa) {
  console.error(`Sobrou referência externa: ${externa[0]}`);
  process.exit(1);
}

mkdirSync(saida, { recursive: true });
const destino = join(saida, `${pagina}.html`);
writeFileSync(destino, final2);

console.log(`✓ ${destino}`);
console.log(`  ${fontes} fonte(s) e ${imagens} imagem(ns) embutidas · ${(final2.length / 1024).toFixed(0)} KB`);
if (video) console.log(`  vídeo embutido: ${video}`);

// A página publicada tem teto de 16 MB.
const mb = final2.length / 1048576;
if (mb > 15) {
  console.error(`  ⚠ ${mb.toFixed(1)} MB — perto do teto de 16 MB da página publicada`);
  process.exit(1);
}
