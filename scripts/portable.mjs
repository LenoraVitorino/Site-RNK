/**
 * Gera uma cópia de dist/ com caminhos relativos, que abre por duplo-clique
 * (protocolo file://) sem precisar de servidor nem de Node.
 *
 *   npm run portable   →  dist-portatil/
 *
 * Para quê: o build do Astro usa caminhos absolutos (/_astro/...), que só
 * funcionam servidos por HTTP. Em file:// a barra inicial aponta para a raiz
 * do disco e a página abre sem estilo. Este script reescreve para relativo,
 * calculando a profundidade de cada página.
 *
 * Use só para enviar preview a quem não tem ambiente montado. Em produção,
 * publique dist/ normalmente — lá os caminhos absolutos estão corretos.
 */

import { cpSync, readFileSync, writeFileSync, rmSync, existsSync } from 'node:fs';
import { globSync } from 'node:fs';
import { dirname, join, relative, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const raiz = join(dirname(fileURLToPath(import.meta.url)), '..');
const origem = join(raiz, 'dist');
const destino = join(raiz, 'dist-portatil');

if (!existsSync(origem)) {
  console.error('dist/ não existe. Rode "npm run build" antes.');
  process.exit(1);
}

rmSync(destino, { recursive: true, force: true });
cpSync(origem, destino, { recursive: true });

const paginas = globSync('**/*.html', { cwd: destino });
let total = 0;

for (const pagina of paginas) {
  const caminho = join(destino, pagina);
  // Profundidade da página: index.html → "", studio/x.html → "../"
  const profundidade = pagina.split(sep).length - 1;
  const prefixo = profundidade === 0 ? '' : '../'.repeat(profundidade);

  let html = readFileSync(caminho, 'utf8');

  html = html.replace(/(src|href)="\/(?!\/)([^"]*)"/g, (_m, attr, resto) => {
    total++;
    // Link para a home ("/") vira o próprio index.html
    if (resto === '') return `${attr}="${prefixo}index.html"`;
    return `${attr}="${prefixo}${resto}"`;
  });

  writeFileSync(caminho, html);
}

console.log(`✓ ${destino}`);
console.log(`  ${paginas.length} página(s), ${total} caminho(s) reescrito(s) para relativo`);
