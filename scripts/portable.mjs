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

/** Prefixo relativo para voltar à raiz a partir de um arquivo. */
const prefixoDe = (arquivo) => {
  const profundidade = arquivo.split(sep).length - 1;
  return profundidade === 0 ? '' : '../'.repeat(profundidade);
};

let total = 0;

// HTML: atributos src e href
const paginas = globSync('**/*.html', { cwd: destino });
for (const pagina of paginas) {
  const caminho = join(destino, pagina);
  const prefixo = prefixoDe(pagina);

  const html = readFileSync(caminho, 'utf8').replace(
    /(src|href)="\/(?!\/)([^"]*)"/g,
    (_m, attr, resto) => {
      total++;
      // Link para a home ("/") vira o próprio index.html
      return `${attr}="${prefixo}${resto === '' ? 'index.html' : resto}"`;
    }
  );

  writeFileSync(caminho, html);
}

// CSS: url() — é onde ficam as fontes. Sem isto elas falham em file://
// e a página cai silenciosamente para a fonte do sistema.
const estilos = globSync('**/*.css', { cwd: destino });
for (const estilo of estilos) {
  const caminho = join(destino, estilo);
  const prefixo = prefixoDe(estilo);

  const css = readFileSync(caminho, 'utf8').replace(
    /url\((['"]?)\/(?!\/)([^'")]*)\1\)/g,
    (_m, aspas, resto) => {
      total++;
      return `url(${aspas}${prefixo}${resto}${aspas})`;
    }
  );

  writeFileSync(caminho, css);
}

console.log(`✓ ${destino}`);
console.log(`  ${paginas.length} página(s), ${estilos.length} folha(s) de estilo`);
console.log(`  ${total} caminho(s) reescrito(s) para relativo`);
