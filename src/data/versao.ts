/**
 * Duas versões da home, para a entrega final comparar lado a lado:
 * - "estudio" (padrão): a leitura do estúdio — mesma copy, mas com a
 *   dinâmica das dobras revista (ex.: o vídeo entra direto, sem repetir o
 *   título que ele mesmo diz).
 * - "copy": o site como a copy foi entregue, dobra a dobra, título por título.
 * Escolhe-se no build: `VERSAO=copy npm run build`.
 */
export const versao: 'estudio' | 'copy' = process.env.VERSAO === 'copy' ? 'copy' : 'estudio';
export const copyLiteral = versao === 'copy';
