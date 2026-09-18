// @ts-check
import { defineConfig } from 'astro/config';
import { fileURLToPath } from 'node:url';

/**
 * Domínio pelo qual o dev server será acessado de fora — o hostname do túnel
 * do Cloudflare, sem esquema. Vazio no uso normal.
 *
 *   PREVIEW_HOST=preview.renkestudio.com.br npm run dev
 */
const preview = process.env.PREVIEW_HOST?.trim().replace(/^https?:\/\//, '') || '';

/**
 * Raiz do projeto, gravada como constante de build (`__RAIZ__`). Os componentes
 * que leem o disco (ícones em public/, páginas em src/pages) usam essa
 * constante em vez de process.cwd(): assim tanto faz de que pasta o comando
 * foi rodado — antes, `astro dev --root` chamado de outra pasta quebrava com
 * "ENOENT: scandir .../src/pages".
 */
const raiz = fileURLToPath(new URL('.', import.meta.url));

export default defineConfig({
  // TODO(D10): confirmar o domínio definitivo — o sitemap usa renke.com.br,
  // mas o e-mail institucional é @renkestudio.com.br.
  // Ver docs/05-analise/pendencias-e-proximos-passos.md
  site: 'https://renke.com.br',

  // URLs hierárquicas sem barra final: /studio/revena-start
  trailingSlash: 'never',
  build: { format: 'file' },

  server: {
    // Sem PREVIEW_HOST o servidor só escuta em localhost, que é o certo para o
    // dia a dia. Com a variável definida ele passa a escutar em todas as
    // interfaces, para o cloudflared alcançar de fora do processo.
    host: Boolean(preview),
    port: 4321,
  },

  vite: {
    define: { __RAIZ__: JSON.stringify(raiz) },

    server: {
      // O Vite recusa requisição cujo cabeçalho Host ele não conhece — é uma
      // proteção contra rebinding de DNS, não um capricho. O túnel chega com o
      // domínio da Cloudflare, não com "localhost", e sem esta lista a resposta
      // é "Blocked request. This host is not allowed".
      allowedHosts: preview ? [preview] : [],
    },
  },
});
