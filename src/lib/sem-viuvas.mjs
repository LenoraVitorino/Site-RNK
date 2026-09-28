/**
 * Sem palavras sozinhas (Lenora, 28/09/2026: "sem quebras de títulos que fiquem
 * com palavras soltas, sem palavras sozinhas em textos corridos também").
 *
 * Pós-processa o HTML pronto de cada página e troca por espaço inseparável
 * (&nbsp;) o espaço antes da ÚLTIMA palavra de cada bloco de texto, quando as
 * duas últimas palavras somadas são curtas o bastante para caberem juntas numa
 * linha a 320px. A copy não muda: só o espaço entre as duas palavras.
 *
 * Roda no servidor (middleware do Astro, no dev e no build estático). Nada vai
 * para o cliente.
 *
 * Regras:
 * - Blocos: p, h1–h6, li, dd, dt, figcaption, blockquote, summary, label,
 *   button, td, th e a.botao. Dentro deles, cada span COM classe também é
 *   tratado como um bloco próprio (muitos são display:block, como
 *   .botao__texto, .int-lista__texto e as linhas de título).
 * - Atravessa só tags inline de formatação: strong, em, b, i, a, small, abbr
 *   e span sem classe (e sem style). Qualquer outro elemento (br, img, svg,
 *   span com classe, div…) separa os trechos: nunca junta palavras de um lado
 *   e do outro dele.
 * - Nunca toca em atributos, comentários, nem no conteúdo de script, style,
 *   textarea, pre, svg, code, template, noscript, title e math.
 * - Limites das duas últimas palavras somadas: 24 caracteres no texto, 16 no
 *   h2 e 12 no h1 (corpo grande a 320px). Em títulos, se uma das duas tem
 *   12 caracteres ou mais, elas não se juntam (colunas estreitas).
 * - Texto de duas palavras só (rótulo, legenda, item de menu) fica livre:
 *   juntar tiraria o único ponto de quebra.
 * - O espaço que só existe entre duas tags (<span>a</span> <span>b</span>)
 *   não é trocado: com spans de bloco, ele viraria uma linha a mais.
 * - Hífen entre letras dentro das palavras presas vira hífen inseparável
 *   (&#8209;, mesmo desenho na Inter), senão a linha quebrava nele.
 * - Saídas manuais no próprio bloco: data-quebra="livre" (não mexe, vale
 *   também para os blocos de dentro) e data-quebra="junta" (junta mesmo
 *   acima do limite).
 * - Idempotente: se a última palavra já tem um espaço inseparável, o bloco já
 *   está protegido e fica como está.
 */

/** Limite (em caracteres) das duas últimas palavras somadas. */
export const LIMITE_PADRAO = 24;
/** h2: menos folga, para a dupla nunca passar da medida a 320px (28–32px de corpo). */
export const LIMITE_TITULO = 16;
/** h1: corpo de 40px ou mais a 320px ("Vamos conversar?", 15, já não cabia em 266px). */
export const LIMITE_H1 = 12;
/** Em títulos, uma palavra deste tamanho já ocupa boa parte da linha: presa
 *  à outra, a dupla passava da caixa em colunas estreitas a 320px ("seu
 *  posicionamento" num cartão de 210px, "Rastreamento Avançado" na coluna
 *  do antes/depois). */
export const PALAVRA_LONGA_TITULO = 12;

const BLOCOS = new Set(['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'li', 'dd', 'dt', 'figcaption', 'blockquote', 'summary', 'label', 'button', 'td', 'th']);
const LIMITES = { h1: LIMITE_H1, h2: LIMITE_TITULO };
const TITULOS = new Set(['h1', 'h2', 'h3', 'h4', 'h5', 'h6']);
const INLINE = new Set(['strong', 'em', 'b', 'i', 'a', 'small', 'abbr', 'span']);
/** Conteúdo intocável: pula até o fechamento correspondente. */
const OPACOS = new Set(['script', 'style', 'textarea', 'pre', 'svg', 'code', 'template', 'noscript', 'title', 'math']);
/** Elementos vazios do HTML (não têm fechamento). */
/** Abrir um destes dentro de um <p> fecha o <p> implicitamente (regra do HTML). */
const FECHAM_P = new Set(['address', 'article', 'aside', 'blockquote', 'details', 'div', 'dl', 'fieldset', 'figcaption', 'figure', 'footer', 'form', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'header', 'hr', 'main', 'menu', 'nav', 'ol', 'p', 'pre', 'section', 'table', 'ul']);
const VAZIOS = new Set(['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'param', 'source', 'track', 'wbr']);

const ESPACO = /[ \t\n\r\f]/;
const NBSP = / |&nbsp;|&#160;|&#x0*a0;/i;
const ENTIDADE = /&(?:#\d+|#x[\da-f]+|[a-z][a-z\d]*);/gi;

/** Quantos caracteres a palavra tem na tela (cada entidade conta como um). */
const tamanho = (s) => [...s.replace(ENTIDADE, '·')].length;
/** Só pontuação (travessão, barra, ponto médio…): gruda também na anterior. */
const soPontuacao = (s) => !/[\p{L}\p{N}]/u.test(s.replace(ENTIDADE, ''));

const atributo = (bruto, nome) => {
  const m = new RegExp(`\\s${nome}\\s*=\\s*(?:"([^"]*)"|'([^']*)'|([^\\s>]+))`, 'i').exec(bruto);
  return m ? (m[1] ?? m[2] ?? m[3] ?? '') : null;
};
const temAtributo = (bruto, nome) => new RegExp(`\\s${nome}(?:\\s*=|[\\s/>])`, 'i').test(bruto);

/**
 * Tokeniza o HTML em pedaços contíguos: texto, tag de abertura, tag de
 * fechamento e "outro" (comentário, doctype, CDATA, conteúdo opaco).
 * A soma dos `bruto` devolve o HTML original byte a byte.
 */
export function tokenizar(html) {
  const tokens = [];
  let i = 0;
  const n = html.length;
  const texto = (fim) => { if (fim > i) tokens.push({ tipo: 'texto', bruto: html.slice(i, fim) }); i = fim; };
  while (i < n) {
    const lt = html.indexOf('<', i);
    if (lt === -1) { texto(n); break; }
    texto(lt);
    if (html.startsWith('<!--', i)) {
      const fim = html.indexOf('-->', i + 4);
      const f = fim === -1 ? n : fim + 3;
      tokens.push({ tipo: 'outro', bruto: html.slice(i, f) }); i = f; continue;
    }
    if (html.startsWith('<![CDATA[', i)) {
      const fim = html.indexOf(']]>', i);
      const f = fim === -1 ? n : fim + 3;
      tokens.push({ tipo: 'outro', bruto: html.slice(i, f) }); i = f; continue;
    }
    if (html[i + 1] === '!' || html[i + 1] === '?') {
      const fim = html.indexOf('>', i);
      const f = fim === -1 ? n : fim + 1;
      tokens.push({ tipo: 'outro', bruto: html.slice(i, f) }); i = f; continue;
    }
    const m = /^<(\/?)([a-zA-Z][\w:-]*)/.exec(html.slice(i, i + 64));
    if (!m) { // "<" solto no texto
      tokens.push({ tipo: 'texto', bruto: '<' }); i += 1; continue;
    }
    // Fim da tag respeitando aspas nos atributos.
    let j = i + m[0].length, aspas = null;
    for (; j < n; j++) {
      const c = html[j];
      if (aspas) { if (c === aspas) aspas = null; }
      else if (c === '"' || c === "'") aspas = c;
      else if (c === '>') break;
    }
    const f = Math.min(j + 1, n);
    const bruto = html.slice(i, f);
    const nome = m[2].toLowerCase();
    const fecha = m[1] === '/';
    const autoFechada = !fecha && (VAZIOS.has(nome) || /\/\s*>$/.test(bruto));
    tokens.push({ tipo: fecha ? 'fecha' : 'abre', nome, bruto, autoFechada });
    i = f;
    if (!fecha && !autoFechada && OPACOS.has(nome)) {
      // Pula o conteúdo até o fechamento correspondente (com aninhamento do mesmo nome).
      const re = new RegExp(`<(/?)${nome}(?=[\\s/>])[^>]*>`, 'gi');
      re.lastIndex = i;
      let prof = 1, r, fimConteudo = n, fimTag = n;
      const cru = nome === 'script' || nome === 'style' || nome === 'textarea' || nome === 'title';
      while ((r = re.exec(html))) {
        if (r[1]) { prof--; if (prof === 0) { fimConteudo = r.index; fimTag = r.index + r[0].length; break; } }
        else if (!cru && !/\/\s*>$/.test(r[0])) prof++;
      }
      if (fimConteudo > i) tokens.push({ tipo: 'outro', bruto: html.slice(i, fimConteudo) });
      if (fimTag > fimConteudo) tokens.push({ tipo: 'fecha', nome, bruto: html.slice(fimConteudo, fimTag) });
      i = fimTag;
    }
  }
  return tokens;
}

/** Aplica o espaço inseparável no último trecho de texto de um bloco. */
function protegerTrecho(tokens, trecho, limite, titulo, forcar) {
  // Texto contínuo do trecho, com o mapa de volta para os tokens.
  let s = '';
  const mapa = []; // para cada caractere de s: [índice do token, posição no token]
  for (const k of trecho) {
    const b = tokens[k].bruto;
    for (let p = 0; p < b.length; p++) mapa.push([k, p]);
    s += b;
  }
  let fim = s.length - 1;
  while (fim >= 0 && ESPACO.test(s[fim])) fim--;
  if (fim < 0) return;
  const palavraAntes = (ate) => { let ini = ate; while (ini > 0 && !ESPACO.test(s[ini - 1])) ini--; return ini; };
  const espacoAntes = (ate) => { let ini = ate; while (ini > 0 && ESPACO.test(s[ini - 1])) ini--; return ini; };

  const iUlt = palavraAntes(fim + 1);
  const ultima = s.slice(iUlt, fim + 1);
  if (NBSP.test(ultima)) return; // já protegido (idempotência)
  const juntar = []; // intervalos de espaço a trocar por um só &nbsp;
  let total = tamanho(ultima), cursor = iUlt;
  for (let voltas = 0; voltas < 2; voltas++) {
    const iEsp = espacoAntes(cursor);
    if (iEsp === cursor || iEsp === 0) { // não há palavra antes neste trecho
      if (voltas === 0) return;
      break;
    }
    const iPal = palavraAntes(iEsp);
    const palavra = s.slice(iPal, iEsp);
    total += tamanho(palavra);
    if (titulo && !forcar && Math.max(tamanho(palavra), tamanho(ultima)) >= PALAVRA_LONGA_TITULO) return;
    juntar.push([iEsp, cursor]);
    cursor = iPal;
    // Travessão ou barra sozinhos não seguram a linha: gruda também a palavra de antes.
    if (!soPontuacao(palavra)) break;
  }
  if (total > limite && !forcar) return;
  // Texto de duas palavras só (rótulo, legenda, item de menu): juntar tiraria
  // o único ponto de quebra, e a dupla podia passar de uma coluna estreita.
  if (!forcar && !/[^ \t\n\r\f]/.test(s.slice(0, cursor))) return;
  // Espaço que só existe entre duas tags (<span>a</span> <span>b</span>) fica
  // como está: se os spans forem de bloco, um &nbsp; ali viraria uma linha a mais.
  const soEntreTags = ([a, b]) => {
    for (let x = a; x < b; x++) if (/[^ \t\n\r\f]/.test(tokens[mapa[x][0]].bruto)) return false;
    return true;
  };
  if (juntar.some(soEntreTags)) return;
  // Troca, de trás para a frente, cada intervalo de espaço por um &nbsp;.
  const novos = new Map(); // token → array de caracteres
  const pegar = (k) => { if (!novos.has(k)) novos.set(k, tokens[k].bruto.split('')); return novos.get(k); };
  for (const [a, b] of juntar) {
    for (let x = a; x < b; x++) {
      const [k, p] = mapa[x];
      pegar(k)[p] = x === a ? '&nbsp;' : '';
    }
  }
  // Hífen dentro das palavras presas ("follow-ups") também quebrava a linha:
  // vira o hífen inseparável (U+2011), com o mesmo desenho na Inter.
  const letra = /[\p{L}\p{N}]/u;
  for (let x = cursor + 1; x < fim; x++) {
    if (s[x] === '-' && letra.test(s[x - 1]) && letra.test(s[x + 1])) {
      const [k, p] = mapa[x];
      pegar(k)[p] = '&#8209;';
    }
  }
  for (const [k, cs] of novos) tokens[k].bruto = cs.join('');
}

/**
 * Transforma o HTML de uma página inteira (ou de um trecho).
 * @param {string} html
 * @returns {string}
 */
export function semViuvas(html) {
  const tokens = tokenizar(html);
  /** Pilha de elementos abertos: { nome, tipo: 'bloco' | 'inline' | 'barreira' }. */
  const pilha = [];
  /** Pilha de blocos em aberto, cada um com seus trechos. */
  const blocos = [];
  const atual = () => blocos[blocos.length - 1];
  const barreira = () => { const b = atual(); if (b && b.trechos[b.trechos.length - 1].length) b.trechos.push([]); };

  const fecharBloco = (b) => {
    if (b.livre) return;
    for (let t = b.trechos.length - 1; t >= 0; t--) {
      const tr = b.trechos[t];
      if (tr.some((k) => /[^ \t\n\r\f]/.test(tokens[k].bruto))) { protegerTrecho(tokens, tr, b.limite, b.titulo, b.forcar); return; }
    }
  };

  const fecharAte = (idx) => {
    while (pilha.length > idx) {
      const e = pilha.pop();
      if (e.tipo === 'bloco') fecharBloco(blocos.pop());
      if (e.tipo !== 'inline') barreira();
    }
  };

  for (let k = 0; k < tokens.length; k++) {
    const t = tokens[k];
    if (t.tipo === 'texto') { const b = atual(); if (b) b.trechos[b.trechos.length - 1].push(k); continue; }
    if (t.tipo === 'outro') continue;
    if (t.tipo === 'abre') {
      const classe = atributo(t.bruto, 'class');
      const temClasse = classe !== null && classe.trim() !== '';
      const ehBotao = t.nome === 'a' && temClasse && /(?:^|\s)botao(?:\s|$)/.test(classe);
      const dentroDeBloco = blocos.length > 0;
      let tipo;
      if (BLOCOS.has(t.nome) || ehBotao || (t.nome === 'span' && temClasse && dentroDeBloco)) tipo = 'bloco';
      else if (INLINE.has(t.nome) && !(t.nome === 'span' && (temClasse || temAtributo(t.bruto, 'style')))) tipo = 'inline';
      else tipo = 'barreira';
      // Fechamentos implícitos do HTML (<p> sem </p>, <li> seguido de <li>…).
      const fecharImplicito = (nomes) => {
        let p = pilha.length - 1;
        while (p >= 0 && pilha[p].tipo === 'inline') p--;
        if (p >= 0 && nomes.includes(pilha[p].nome)) fecharAte(p);
      };
      if (FECHAM_P.has(t.nome)) fecharImplicito(['p']);
      if (t.nome === 'li') fecharImplicito(['li']);
      if (t.nome === 'dt' || t.nome === 'dd') fecharImplicito(['dt', 'dd']);
      if (t.autoFechada) { barreira(); continue; }
      if (tipo === 'bloco') {
        barreira();
        const pai = atual();
        const herda = t.nome === 'span' && pai;
        const limite = LIMITES[t.nome] ?? (herda ? pai.limite : LIMITE_PADRAO);
        const titulo = TITULOS.has(t.nome) || Boolean(herda && pai.titulo);
        // Saídas manuais, no próprio elemento ou herdadas do bloco de fora:
        // data-quebra="livre" deixa o bloco como está; data-quebra="junta"
        // junta as duas últimas palavras mesmo acima do limite.
        const quebra = atributo(t.bruto, 'data-quebra');
        const livre = quebra === 'livre' || Boolean(pai && pai.livre);
        const forcar = quebra === 'junta';
        blocos.push({ limite, titulo, livre, forcar, trechos: [[]] });
      } else if (tipo === 'barreira') barreira();
      pilha.push({ nome: t.nome, tipo });
      continue;
    }
    // Fechamento: desempilha até a tag correspondente (HTML malformado não quebra nada).
    let idx = -1;
    for (let p = pilha.length - 1; p >= 0; p--) if (pilha[p].nome === t.nome) { idx = p; break; }
    if (idx === -1) continue;
    fecharAte(idx);
  }
  // Blocos que ficaram abertos (HTML cortado) também são tratados.
  while (blocos.length) fecharBloco(blocos.pop());
  return tokens.map((t) => t.bruto).join('');
}
