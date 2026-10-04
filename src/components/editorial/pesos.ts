/**
 * Dois pesos num título de exibição (páginas editoriais, 04/10/2026): o
 * começo no fino e as últimas `n` palavras no forte, como nos carrosséis
 * da Renke ("Onde a Renke" fino, "opera" forte). Não muda o texto.
 */
export const doisPesos = (texto: string, n = 1): [string, string] => {
  const palavras = texto.trim().split(/\s+/);
  const corte = Math.max(0, palavras.length - n);
  return [palavras.slice(0, corte).join(' '), palavras.slice(corte).join(' ')];
};
