/**
 * Monta docs/dossie-estrutura-e-copy.md: um arquivo único com a estrutura do
 * site e a copy de todas as páginas.
 *
 *   npm run docs:dossie
 *
 * Por que é gerado e não escrito à mão: a copy vive em docs/03-copy/, uma
 * página por arquivo. Um dossiê copiado na unha começa igual e termina
 * divergente. Aqui ele é remontado a cada build.
 */

import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const raiz = join(dirname(fileURLToPath(import.meta.url)), '..');
const docs = join(raiz, 'docs');
const ler = (p) => readFileSync(join(docs, p), 'utf8');

/* Ordem de leitura, não ordem alfabética: a home primeiro, depois cada
   público, porque é assim que o site conversa. */
const grupos = [
  {
    titulo: 'Home',
    resumo: 'A página que carrega 90% do tráfego esperado.',
    paginas: ['home.md'],
  },
  {
    titulo: 'Studio — páginas para clínicas',
    resumo:
      'O Protocolo Revena em cinco níveis de maturidade, mais o treinamento de secretárias. ' +
      'Cada uma funciona sozinha: responde o que é, pra quem é, o que resolve, o que recebo ' +
      'e por que confiar, sem depender de o visitante ter lido outra antes.',
    paginas: [
      'revena-start.md', 'revena-full.md', 'revena-core.md',
      'revena-scale.md', 'revena-run.md', 'treinamento-secretarias.md',
    ],
  },
  {
    titulo: 'Academy — páginas para agências',
    resumo: 'O outro público: agências que compram método da Renke.',
    paginas: [
      'academy.md', 'protocolo-renke.md', 'formacao-performa.md',
      'treinamento-crm.md', 'rastreamento-avancado.md', 'cultura-pro.md',
    ],
  },
  {
    titulo: 'Institucional',
    resumo: 'Conversão e recrutamento.',
    paginas: ['contato.md', 'faca-parte.md'],
  },
];

const acentoFora = (s) =>
  s.normalize('NFD').replace(/[̀-ͯ]/g, '');

/** Âncora no formato que GitHub gera: sem pontuação, cada espaço vira hífen.
    Colapsar espaços aqui quebraria os títulos com travessão, que viram dois. */
const ancora = (texto) =>
  acentoFora(texto).toLowerCase().replace(/[^\w\s-]/g, '').trim().replace(/ /g, '-');

/**
 * Ajusta um arquivo de copy para viver dentro do dossiê:
 * - rebaixa os títulos, para o documento ter um H1 só;
 * - troca "# Copy — X" por "### X": o travessão vira dois hífens na âncora
 *   e os links do índice não achariam o destino;
 * - resolve os links relativos, que apontavam para arquivos vizinhos e
 *   morreriam num arquivo solto.
 */
function adaptar(md, nivel) {
  return md
    // Rebaixa antes de trocar o título: na ordem inversa o próprio "###" que
    // acabou de ser escrito seria rebaixado junto e viraria "#####".
    .replace(/^(#{2,6}) /gm, (_m, h) => '#'.repeat(Math.min(h.length + nivel, 6)) + ' ')
    .replace(/^#\s+Copy\s+—\s+(.+)$/m, (_m, nome) => `### ${nome.trim()}`)
    // O sitemap entra neste mesmo documento: vira link interno.
    .replace(/\[([^\]]+)\]\(\.\.\/02-arquitetura\/sitemap\.md[^)]*\)/g, '[$1](#mapa-do-site)')
    // Os demais continuam no repositório: vira o caminho, em vez de link morto.
    .replace(/\[([^\]]+)\]\(\.\.\/([^)]+?)(?:#[^)]*)?\)/g, '$1 (`docs/$2`)')
    .replace(/\[([^\]]+)\]\((?!https?:|#)([^)]+?)(?:#[^)]*)?\)/g, '$1 (`$2`)')
    .trim();
}

/** Lê o cabeçalho de uma página de copy para montar o índice. */
function ficha(arquivo, md) {
  const titulo = (md.match(/^#\s+Copy\s+—\s+(.+)$/m) || [, arquivo])[1].trim();
  const rotaLinha = (md.match(/^\*\*Rota:\*\*\s*(.+)$/m) || [, ''])[1];
  const rota = (rotaLinha.match(/`([^`]+)`/) || [, '—'])[1];
  const secoes = (md.match(/^##\s+SEÇÃO/gm) || []).length;
  const pendencias = (md.match(/⚠️/g) || []).length;
  return { titulo, rota, secoes, pendencias, arquivo };
}

/* ---- Trechos reaproveitados de outros documentos ---------------------- */

const sitemap = ler('02-arquitetura/sitemap.md');
const recorte = (texto, de, ate) => {
  const i = texto.indexOf(de);
  const j = ate ? texto.indexOf(ate, i + de.length) : -1;
  return texto.slice(i, j === -1 ? undefined : j).trim();
};

// Descem um nível: no sitemap eram seções de topo, aqui são partes do mapa.
const desce = (t) => t.replace(/^## /gm, '### ');

const arvore = desce(recorte(sitemap, '## Estrutura completa', '## ⚠️ Conflito de rotas'));
// Já vem como ###, que é o nível certo aqui dentro do mapa.
const menu = recorte(sitemap, '### Menu implementado', '### Menu original');
const ctas = desce(recorte(sitemap, '## CTAs por página', '## Rodapé'));
const rodape = desce(recorte(sitemap, '## Rodapé'));

const pendencias = ler('05-analise/pendencias-e-proximos-passos.md');
const faltaEscrever = recorte(pendencias, '## 2. Conteúdo a produzir (copy)', '---');

/* ---- Montagem --------------------------------------------------------- */

const fichas = [];
const corpo = [];

for (const grupo of grupos) {
  corpo.push(`## Parte ${grupos.indexOf(grupo) + 1} · ${grupo.titulo}`, '', grupo.resumo, '');
  for (const arquivo of grupo.paginas) {
    const md = ler(join('03-copy', arquivo));
    const f = ficha(arquivo, md);
    fichas.push({ ...f, grupo: grupo.titulo });
    corpo.push(adaptar(md, 2), '', '---', '');
  }
}

const hoje = new Date().toISOString().slice(0, 10).split('-').reverse().join('/');
const totalPendencias = fichas.reduce((n, f) => n + f.pendencias, 0);

const linhas = [
  '# Estrutura e copy — Site Renke Studio',
  '',
  `Documento único com o mapa do site e a copy de todas as páginas escritas até aqui.`,
  `${fichas.length} páginas, ${fichas.reduce((n, f) => n + f.secoes, 0)} seções.`,
  '',
  '> **Fonte:** briefing exportado do ClickUp em 15/08/2026, reorganizado em `docs/`.',
  `> Gerado por \`npm run docs:dossie\` em ${hoje} — editar os arquivos de`,
  '> `docs/03-copy/` e rodar de novo, em vez de editar este arquivo.',
  '',
  '## Como ler',
  '',
  '- **Copy final** aparece em blocos de citação (`>`), transcrita literalmente do briefing.',
  '- **Diretrizes** e notas de produção aparecem como texto normal ou em itálico — não são copy.',
  '- **⚠️** marca pendência, placeholder ou decisão em aberto. ' +
    `Há ${totalPendencias} no documento.`,
  '- **Notas SEO** no fim de cada página trazem title, meta description e keyword-alvo.',
  '- Caminhos entre crases (`docs/...`) apontam para outros arquivos do repositório.',
  '',
  '## Índice',
  '',
  '| Página | Rota | Seções | ⚠️ |',
  '|---|---|---|---|',
  ...fichas.map(
    (f) => `| [${f.titulo}](#${ancora(f.titulo)}) | \`${f.rota}\` | ` +
           `${f.secoes} | ${f.pendencias || '—'} |`,
  ),
  '',
  '---',
  '',
  '## Mapa do site',
  '',
  arvore,
  '',
  menu,
  '',
  ctas,
  '',
  rodape,
  '',
  '---',
  '',
  ...corpo,
  '## O que ainda falta escrever',
  '',
  'Copy que o briefing prevê mas não entregou. Lista completa e atualizada em',
  '`docs/05-analise/pendencias-e-proximos-passos.md`.',
  '',
  faltaEscrever.replace(/^## 2\. Conteúdo a produzir \(copy\)\n*/, ''),
  '',
];

const destino = join(docs, 'dossie-estrutura-e-copy.md');
writeFileSync(destino, linhas.join('\n').replace(/\n{4,}/g, '\n\n\n') + '\n');

console.log(`✓ ${destino}`);
console.log(`  ${fichas.length} páginas · ${fichas.reduce((n, f) => n + f.secoes, 0)} seções · ` +
            `${totalPendencias} pendências marcadas`);
