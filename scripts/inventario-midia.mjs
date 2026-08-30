/**
 * Gera docs/04-design/inventario-de-midia.md a partir de src/data/midia.ts,
 * para a lista de produção nunca divergir do que o wireframe desenha.
 *
 *   npm run docs:midia
 */

import { writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const raiz = join(dirname(fileURLToPath(import.meta.url)), '..');
const { slots } = await import(join(raiz, 'src/data/midia.ts'));

const rotulo = {
  imagem: 'Imagem', video: 'Vídeo', gif: 'GIF',
  animacao: 'Animação', logo: 'Logos', retrato: 'Foto',
};
const prop = (p) => p.replace(/\s/g, '');

const linhas = [
  '# Inventário de mídia — Home',
  '',
  'Todo slot de imagem, vídeo e animação da home, com número, tipo e proporção. O número aparece no',
  'canto da caixa no wireframe, para poder ser citado na conversa ("o slot 03").',
  '',
  '> Gerado por `npm run docs:midia` a partir de [`src/data/midia.ts`](../../src/data/midia.ts).',
  '> Editar lá atualiza o wireframe e esta lista juntos.',
  '',
  '## Lista de produção',
  '',
  '| # | Seção | Tipo | Proporção | O que é | Status |',
  '|---|---|---|---|---|---|',
  ...slots.map((s) =>
    `| **${s.id}** | ${s.secao} | ${rotulo[s.tipo]} | \`${prop(s.proporcao)}\` | ${s.titulo} | ${s.status === 'pendente' ? '⏳ pendente' : '✅ existe'} |`
  ),
  '',
  '## Detalhamento',
  '',
];

for (const s of slots) {
  linhas.push(`### ${s.id} · ${s.titulo}`);
  linhas.push('');
  linhas.push(`**${rotulo[s.tipo]}** · proporção \`${prop(s.proporcao)}\` · seção ${s.secao}`);
  linhas.push('');
  linhas.push(s.descricao);
  linhas.push('');
  if (s.producao) {
    linhas.push(`> **Produção:** ${s.producao}`);
    linhas.push('');
  }
}

const pendentes = slots.filter((s) => s.status === 'pendente').length;

linhas.push(
  '## Status',
  '',
  `${pendentes} de ${slots.length} slots ainda sem asset definitivo. É a mesma lista que aparece em`,
  '[pendências](../05-analise/pendencias-e-proximos-passos.md), agora com proporção e enquadramento',
  'definidos — para a produção não sair no tamanho errado e precisar ser refeita.',
  '',
  '## Convenção no wireframe',
  '',
  '- Caixa **tracejada** = imagem parada',
  '- Caixa **sólida, com número escuro** = vídeo, GIF ou animação',
  '- A proporção aparece no canto inferior direito, como cota de desenho técnico',
  '- No modo "ocultar anotações" o número e a cota somem',
  ''
);

const destino = join(raiz, 'docs/04-design/inventario-de-midia.md');
writeFileSync(destino, linhas.join('\n'));
console.log(`✓ ${destino} — ${slots.length} slots`);
