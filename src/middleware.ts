/**
 * Pós-processa o HTML de toda página (home, internas, Sobre, 404 e
 * laboratórios), no dev e no build estático: o Astro 5 roda o middleware
 * também ao pré-renderizar as páginas no build.
 *
 * Hoje ele só faz uma coisa: evita palavras sozinhas no fim dos blocos de
 * texto, trocando por espaço inseparável o espaço antes da última palavra
 * (src/lib/sem-viuvas.mjs). A copy não muda e nada vai para o cliente.
 */
import { defineMiddleware } from 'astro:middleware';
import { semViuvas } from './lib/sem-viuvas.mjs';

export const onRequest = defineMiddleware(async (_contexto, proximo) => {
  const resposta = await proximo();
  const tipo = resposta.headers.get('content-type') ?? '';
  if (!tipo.includes('text/html')) return resposta;

  const html = await resposta.text();
  const cabecalhos = new Headers(resposta.headers);
  cabecalhos.delete('content-length');
  return new Response(semViuvas(html), {
    status: resposta.status,
    statusText: resposta.statusText,
    headers: cabecalhos,
  });
});
