/**
 * Gera um HTML único e autossuficiente, pronto para publicar como página
 * hospedada (Artifact).
 *
 *   npm run artifact   →  dist-artifact/site.html  (todas as páginas, navegáveis)
 *                         dist-artifact/design-system.html
 *
 * Por que existe: a página publicada não pode carregar arquivo externo — CSS,
 * fontes, imagens e vídeo precisam estar dentro do próprio HTML.
 *
 * O modo `site` empacota TODAS as páginas em um arquivo só. Cada <main> vira
 * uma rota escondida e um roteador de ~30 linhas troca qual aparece, para o
 * menu funcionar de verdade na prévia. O cabeçalho e o rodapé entram uma vez:
 * duplicá-los por página repetiria os `id` que o script do menu usa e o menu
 * pararia de funcionar.
 */

import { readFileSync, writeFileSync, mkdirSync, statSync, readdirSync } from 'node:fs';
import { dirname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const raiz = join(dirname(fileURLToPath(import.meta.url)), '..');
// DIST e ROTULO permitem empacotar outro build (ex.: a versão "copy",
// gerada com `VERSAO=copy npx astro build --outDir dist-copy`) num arquivo
// separado, sem mexer no principal.
const dist = process.env.DIST ? join(raiz, process.env.DIST) : join(raiz, 'dist');
const saida = join(raiz, 'dist-artifact');

const modo = process.argv[2] || 'site';
const rotulo = process.env.ROTULO || '';
const titulos = {
  site: rotulo ? `Site Renke Studio · ${rotulo}` : 'Site Renke Studio',
  'design-system': 'Design System Renke',
};

/* ---- Coleta as páginas -------------------------------------------------- */

const listar = (dir) =>
  readdirSync(dir, { withFileTypes: true }).flatMap((e) =>
    e.isDirectory() ? listar(join(dir, e.name)) : e.name.endsWith('.html') ? [join(dir, e.name)] : [],
  );

const rotaDe = (arquivo) =>
  '/' + relative(dist, arquivo).replace(/\.html$/, '').replace(/^index$/, '');

const paginas = listar(dist)
  .map((arquivo) => ({ arquivo, rota: rotaDe(arquivo), html: readFileSync(arquivo, 'utf8') }))
  // O design system é outro artifact: não é página do site.
  .filter((p) => p.rota !== '/design-system')
  .sort((a, b) => (a.rota === '/' ? -1 : b.rota === '/' ? 1 : a.rota.localeCompare(b.rota)));

const casca =
  modo === 'design-system'
    ? { arquivo: join(dist, 'design-system.html'), rota: '/design-system', html: readFileSync(join(dist, 'design-system.html'), 'utf8') }
    : paginas.find((p) => p.rota === '/');

if (!casca) {
  console.error('Não encontrei a página que serve de casca.');
  process.exit(1);
}

/* ---- 1) CSS e fontes ---------------------------------------------------- */

let fontes = 0;
const inlineFontes = (css) =>
  css.replace(/url\((['"]?)\/_astro\/([^'")]+\.woff2?)\1\)/g, (_m, _q, arquivo) => {
    const dados = readFileSync(join(dist, '_astro', arquivo)).toString('base64');
    fontes++;
    return `url(data:font/${arquivo.endsWith('.woff2') ? 'woff2' : 'woff'};base64,${dados})`;
  });

// Todas as folhas que qualquer página referencia, sem repetir. As da casca
// (a home) entram por último: no arquivo único o CSS é global, e a home v2
// redefine tokens e componentes que as internas (ainda na v1) também usam.
// Assim a home sai fiel; as internas ficam numa mistura v1/v2 até migrarem.
const folhasDe = (p) =>
  [...p.html.matchAll(/<link rel="stylesheet" href="\/_astro\/([^"]+\.css)"\s*\/?>/g)].map((m) => m[1]);
const folhasCasca = folhasDe(casca);
const folhas = [
  ...new Set([
    ...(modo === 'design-system' ? [] : paginas.filter((p) => p !== casca).flatMap(folhasDe)).filter((f) => !folhasCasca.includes(f)),
    ...folhasCasca,
  ]),
];
if (folhas.length === 0) {
  console.error('Nenhuma folha de estilo encontrada.');
  process.exit(1);
}
// As folhas das internas ficam confinadas às rotas que não são a home
// (@scope): assim o CSS v1 não pinta por cima da home v2 no arquivo único.
// Regras em :root/html dentro do @scope deixam de valer — as internas
// passam a usar os tokens da home, o que já é a direção da migração.
const escopoInternas = '[data-rota]:not([data-rota="/"])';
const lerFolha = (f) => readFileSync(join(dist, '_astro', f), 'utf8');
const estilos =
  '<style>\n' +
  inlineFontes(
    folhas
      .map((f) =>
        modo !== 'design-system' && !folhasCasca.includes(f) ? `@scope (${escopoInternas}) {\n${lerFolha(f)}\n}` : lerFolha(f),
      )
      .join('\n'),
  ) +
  '\n</style>';

// Scripts inline do <head> da casca (ex.: a classe .js que libera as
// animações) — o corpo entra sem o <head>, então eles voltam aqui.
const cabeca = casca.html.slice(0, casca.html.indexOf('</head>'));
const scriptsCabeca = [...cabeca.matchAll(/<script(?![^>]*\bsrc=)(?![^>]*type="module")[^>]*>[\s\S]*?<\/script>/g)]
  .map((m) => m[0])
  .join('\n');

/* ---- 2) Corpo ----------------------------------------------------------- */

const corpoDe = (html) => {
  const abre = html.match(/<body[^>]*>/);
  if (!abre) throw new Error('sem <body>');
  return {
    atributos: abre[0].slice('<body'.length, -1).trim(),
    conteudo: html.slice(abre.index + abre[0].length, html.lastIndexOf('</body>')),
  };
};

const tituloDe = (html) => (html.match(/<title>([\s\S]*?)<\/title>/) || [, ''])[1].trim();

const RE_MAIN = /<main[^>]*>[\s\S]*?<\/main>/;

let corpo;
let rotas = 0;

if (modo === 'design-system') {
  corpo = corpoDe(casca.html).conteudo;
} else {
  const base = corpoDe(casca.html);
  // Cada página entra como uma rota; só a primeira nasce visível.
  const secoes = paginas
    .map((p) => {
      const main = (p.html.match(RE_MAIN) || [])[0];
      if (!main) return '';
      rotas++;
      const atributos = [
        `data-rota="${p.rota}"`,
        `data-titulo="${tituloDe(p.html).replace(/"/g, '&quot;')}"`,
        p.rota === '/' ? '' : 'hidden',
      ]
        .filter(Boolean)
        .join(' ');
      return `<div ${atributos}>${main}</div>`;
    })
    .join('\n');

  if (!RE_MAIN.test(base.conteudo)) {
    console.error('A casca não tem <main> para substituir.');
    process.exit(1);
  }
  corpo = base.conteudo.replace(RE_MAIN, secoes);

  // Roteador. Captura antes do script do menu, que também escuta cliques.
  corpo += `
<script>
(function () {
  var rotas = document.querySelectorAll('[data-rota][data-titulo]');
  var porRota = {};
  rotas.forEach(function (r) { porRota[r.dataset.rota] = r; });

  function ir(rota) {
    var alvo = porRota[rota];
    if (!alvo) return false;
    rotas.forEach(function (r) { r.hidden = r !== alvo; });
    document.title = alvo.dataset.titulo;
    location.hash = rota === '/' ? '' : rota;
    scrollTo({ top: 0, behavior: 'instant' });
    // Fecha o que estiver aberto no menu depois de navegar.
    document.querySelectorAll('.megamenu').forEach(function (m) { m.hidden = true; });
    document.querySelectorAll('.nav__trigger').forEach(function (t) {
      t.setAttribute('aria-expanded', 'false');
    });
    var nav = document.getElementById('navPrincipal');
    if (nav && nav.classList.contains('is-open')) {
      document.getElementById('navToggle').click();
    }
    return true;
  }

  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a[href^="/"]');
    if (!a || a.target === '_blank') return;
    e.preventDefault();
    e.stopPropagation();
    if (!ir(a.getAttribute('href'))) ir('/404');
  }, true);

  addEventListener('hashchange', function () { ir(location.hash.slice(1) || '/'); });
  if (location.hash) ir(location.hash.slice(1));
})();
</script>`;
}

const titulo = titulos[modo] || modo;
const atributosCorpo = corpoDe(casca.html).atributos;
let final = `<title>${titulo}</title>\n${scriptsCabeca}\n${estilos}\n${
  atributosCorpo ? `<div ${atributosCorpo} data-corpo>\n${corpo}\n</div>` : corpo
}\n`;

/* ---- 3) Vídeo ----------------------------------------------------------- */

let video = '';
const fontesVideo = [...final.matchAll(/<source src="\/(midia\/[^"]+)" type="([^"]+)"\s*\/?>/g)];
if (fontesVideo.length) {
  // Em base64 cada byte vira 1,37 — só o menor formato entra.
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
  const limpo = escolhido.tipo.split(';')[0];
  final = final.replace(escolhido.tag, `<source src="data:${limpo};base64,${dados}" type="${limpo}">`);
  for (const c of candidatos) if (c !== escolhido) final = final.replace(c.tag, '');
  video = `${escolhido.arquivo} (${(escolhido.bytes / 1048576).toFixed(1)} MB → ${(dados.length / 1048576).toFixed(1)} MB)`;
}

/* ---- 4) Imagens --------------------------------------------------------- */

let imagens = 0;
final = final.replace(
  /(src|href|poster)="\/((?:marca|imagens|midia|icones)\/[^"]+)"/g,
  (m, attr, arquivo) => {
    try {
      const dados = readFileSync(join(dist, arquivo)).toString('base64');
      const ext = arquivo.split('.').pop().toLowerCase();
      // 'image/jpg' não é tipo válido — o navegador tolera, o validador não.
      const tipos = { svg: 'image/svg+xml', png: 'image/png', jpg: 'image/jpeg', jpeg: 'image/jpeg', webp: 'image/webp' };
      imagens++;
      return `${attr}="data:${tipos[ext] || `image/${ext}`};base64,${dados}"`;
    } catch {
      return m;
    }
  },
);

/* ---- 5) Confere --------------------------------------------------------- */

// Os href de navegação continuam "/rota" de propósito: é o roteador que os usa.
const externa =
  /(src|poster)="\/(?!\/)/.exec(final) ||
  /href="\/_astro\//.exec(final) ||
  /url\(['"]?\/(?!\/)/.exec(final);
if (externa) {
  console.error(`Sobrou referência externa: ${externa[0]}`);
  process.exit(1);
}

mkdirSync(saida, { recursive: true });
const destino = join(saida, `${modo}${rotulo ? '-' + rotulo.toLowerCase().replace(/[^a-z0-9]+/g, '-') : ''}.html`);
writeFileSync(destino, final);

const mb = final.length / 1048576;
console.log(`✓ ${destino}`);
console.log(`  ${rotas || 1} página(s) · ${fontes} fonte(s) · ${imagens} imagem(ns) · ${mb.toFixed(1)} MB`);
if (video) console.log(`  vídeo: ${video}`);

// A página publicada tem teto de 16 MB.
if (mb > 15) {
  console.error(`  ⚠ ${mb.toFixed(1)} MB — perto do teto de 16 MB`);
  process.exit(1);
}
