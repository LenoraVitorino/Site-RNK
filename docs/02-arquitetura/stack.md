# Stack

**Decidido em 29/08/2026: [Astro](https://astro.build).**

## Por que Astro

| Exigência do briefing | Como o Astro atende |
|---|---|
| `LCP < 2,5s`, Core Web Vitals | HTML estático, zero JS por padrão. O JS só é enviado onde existe (menu). |
| ~25 páginas com blocos repetidos | Componentes reais — os blocos de [padroes-de-pagina.md](padroes-de-pagina.md) escritos uma vez |
| URLs hierárquicas (`/studio/revena-start`) | Roteamento por sistema de arquivos |
| Blog em 4 categorias, SEO de longo prazo | Content collections com Markdown |
| Meta tags e schema por página | Props no layout base |
| Mobile-first | Sem runtime imposto; o CSS manda |

## Como rodar

```bash
npm install     # uma vez
npm run dev     # http://localhost:4321
```

Outros comandos:

```bash
npm run build                  # gera dist/
npm run preview                # serve o build
npm run portable               # gera dist-portatil/ — abre por duplo-clique, sem servidor
npm run wireframe:standalone   # arquivo único do wireframe original
```

### `npm run portable` — para quem não tem ambiente montado

O build normal usa caminhos absolutos (`/_astro/...`), que só funcionam servidos por HTTP. Aberto
por duplo-clique (`file://`), a barra inicial aponta para a raiz do disco e a página carrega sem
estilo.

O `portable` gera uma cópia em `dist-portatil/` com os caminhos reescritos para relativos,
calculando a profundidade de cada página. Serve para mandar preview a quem não tem Node instalado
— o CEO, a Eduarda, um cliente.

**Em produção, publique `dist/`**, não `dist-portatil/`: lá os caminhos absolutos estão corretos e
são os que o servidor espera. Nenhum dos dois é versionado.

## Estrutura

```
src/
├── data/            conteúdo em TS — a copy vive aqui, separada do layout
│   ├── nav.ts       menu principal e rodapé
│   └── home.ts      copy e listas da home
├── layouts/
│   └── Base.astro   html, head, header, footer
├── components/
│   ├── Header.astro mega-menu desktop + drawer mobile
│   ├── Footer.astro
│   ├── wf/          primitivas de anotação do wireframe
│   └── home/        uma seção da home por arquivo
├── pages/
│   └── index.astro  compõe as seções
└── styles/
    └── wireframe.css
```

**Princípio:** copy em `data/`, estrutura em `components/`. Trocar um número ou uma frase é editar
um arquivo de dados, sem tocar em marcação — o que importa porque a copy ainda vai mudar bastante
(ver [pendências](../05-analise/pendencias-e-proximos-passos.md)).

Para criar uma página nova: um arquivo em `src/pages/` que usa `Base.astro` e monta seções.
`/studio/revena-start` = `src/pages/studio/revena-start.astro`.

## O que ainda falta decidir

Escolher Astro abriu duas decisões acopladas:

**CMS — bloqueante.** Astro estático publica a partir do repositório. O time da Renke vem de
WordPress/Elementor (o briefing entrega isso ao pedir que não se cite Elementor na venda), então
sem um painel — Sanity, Decap, Contentful — publicar um post de blog passa a exigir Git. O briefing
promete "autonomia pós-entrega" no produto Site Institucional; o site da própria Renke precisa ser
coerente com isso.

**Formulários.** São 3 (home, contato, faça parte) e Astro estático não processa nenhum. Opções:
serviço externo (Formspree, Basin), função serverless na hospedagem, ou integração direta com o
Renke CRM — que seria o mais coerente com o discurso de "cada contato chega rastreado".

**Hospedagem.** Netlify, Vercel ou Cloudflare Pages. Todas servem Astro estático; a escolha se
acopla às duas decisões acima.

## Anotado no código

- `astro.config.mjs` — `site` está com `renke.com.br` e um `TODO` marcando a decisão de domínio (D10)
- `Base.astro` — `TODO` para schema, canonical e OG tags
- `nav.ts` e `home.ts` — comentários `⚠️` nos pontos que dependem de decisão pendente
