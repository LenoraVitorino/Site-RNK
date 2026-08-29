// @ts-check
import { defineConfig } from 'astro/config';

export default defineConfig({
  // TODO(D10): confirmar o domínio definitivo — o sitemap usa renke.com.br,
  // mas o e-mail institucional é @renkestudio.com.br.
  // Ver docs/05-analise/pendencias-e-proximos-passos.md
  site: 'https://renke.com.br',

  // URLs hierárquicas sem barra final: /studio/revena-start
  trailingSlash: 'never',
  build: { format: 'file' },
});
