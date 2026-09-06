# Publicação na Cloudflare

O site é inteiramente pré-renderizado, então vai para a Cloudflare como **Worker
só de assets**: nenhum código roda por requisição, os arquivos são servidos da
borda. É o formato mais barato e mais rápido que a plataforma oferece.

## O que já está no repositório

| Arquivo | Papel |
|---|---|
| `wrangler.jsonc` | aponta para `./dist`, define tratamento de URL e 404 |
| `src/pages/404.astro` | a página que a Cloudflare serve quando a rota não existe |
| `npm run deploy` | `astro build` + `wrangler deploy` |
| `npm run deploy:teste` | igual, mas `--dry-run`: valida sem publicar |

Duas escolhas na configuração que não são o padrão:

- **`html_handling: "drop-trailing-slash"`** — casa com o `trailingSlash: 'never'`
  do `astro.config.mjs`. O padrão (`auto-trailing-slash`) deixaria `/pagina/` e
  `/pagina` valendo como dois endereços, ou seja, conteúdo duplicado para o
  buscador. Num site cuja estratégia inteira depende de SEO, isso não é detalhe.
- **`not_found_handling: "404-page"`** — sem isso, rota inexistente devolve uma
  resposta vazia em vez da página de erro.

## Três formas de publicar

### 1. Workers Builds — publica sozinho a cada push

A Cloudflare observa o repositório no GitHub e publica a cada commit. Ninguém
precisa rodar comando, e não existe credencial circulando.

No painel: **Workers & Pages → Create → Import a repository**, apontando para
`LenoraVitorino/Site-RNK`. Os campos:

| Campo | Valor |
|---|---|
| Build command | `npm run build` |
| Deploy command | `npx wrangler deploy` |
| Branch | `main` (ou a branch de trabalho, para ver o que está em revisão) |

É a única das três que merece o nome de "roda 100%": não depende de máquina
ligada nem de alguém lembrar de publicar.

### 2. Da sua máquina, quando quiser

```bash
npx wrangler login    # abre o navegador, uma vez só
npm run deploy
```

### 3. Com token de API

Para publicar de um ambiente sem navegador (CI próprio, container). O token
precisa de **Workers Scripts: Edit** e **Account Settings: Read**, criado em
*My Profile → API Tokens*.

```bash
CLOUDFLARE_API_TOKEN=<token> npm run deploy
```

> Token é credencial: dá para publicar código em nome da conta. Vale escopo
> mínimo, e revogar assim que não for mais usado.

## Endereço

O primeiro deploy cria `site-renke.<sua-conta>.workers.dev`. Para domínio
próprio, o caminho é *Workers & Pages → o worker → Settings → Domains & Routes*.

⚠️ O domínio definitivo ainda é a pendência **D10** — o sitemap usa
`renke.com.br` e o e-mail institucional é `@renkestudio.com.br`.

## O que este site não usa

A conta tem D1, KV, R2 e Hyperdrive disponíveis. Nenhum entra aqui: não há banco,
sessão nem upload. Se um dia o formulário de contato precisar guardar algo, aí
sim — e a conversa começa por onde o dado vai parar, que é a decisão em aberto
sobre destino dos formulários.
