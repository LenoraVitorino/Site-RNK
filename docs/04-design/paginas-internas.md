# Páginas internas no sistema da home — especificação (27/09/2026)

Pedido da Lenora: levar o design da home a todas as páginas internas, reaproveitando assets e transições (exceto os do palco dos planos Revena), adaptando o layout ao conteúdo de cada uma; onde o conteúdo não encaixa num preset da home, aplicar uma referência da pasta Renke do Pinterest, mantendo grid, cards, caixas e regras de diagramação da home.

Esta especificação foi sintetizada a partir de quatro mapeamentos (sistema da home, conteúdo das páginas, infraestrutura/fundo e curadoria do Pinterest). A seção **Emendas** prevalece sobre o restante quando houver conflito.

## Emendas (prevalecem)

A pasta Renke do Pinterest tinha, em 27/09, **269 pins**: três a mais que os 266 da curadoria. Os três novos
foram abertos no navegador logado e são as referências mais recentes da Lenora. Eles substituem as
escolhas da síntese nos pontos abaixo.

**E1. Etapas → pin MyDNA (Levi Wilson), https://br.pinterest.com/pin/800022321353572225/**
Landing page médica e minimalista. Tem linhas numeradas grandes: caixa larga de raio grande, numeral
grande "01" à esquerda, uma data pequena acima do título (título em duas linhas) e o texto corrido
à direita. Nas etapas, a duração entra no lugar da data. Substitui a "régua de livro-caixa" (pin 164)
e o painel de vidro:
- Não há painel. A cabeça (CabecaSecao, h2 em linhas) fica à esquerda, no topo da seção.
- `ol` de linhas empilhadas, com gap 12px. Cada `li` é um `.int-cartao`: #0e0e0e, raio 18, sem borda
  e sem sombra, padding var(--int-cartao-pad) (clamp(24px,2.4vw,32px), o mesmo dos cartões de blocos).
- Grade da linha no desktop: `minmax(88px,.32fr) minmax(0,1fr) minmax(0,1.15fr)`,
  column-gap clamp(24px,4vw,64px), align-items start.
  - Coluna 1: o numeral (n com padStart 2), clamp(44px,4.6vw,68px), peso 300, line-height .9,
    -.06em, tabular-nums, papel.
  - Coluna 2: a duração como `p.rotulo` (11px, caixa alta, .12em, cinza) e, abaixo dela, o nome em h3,
    clamp(22px,2vw,30px), peso 300, -.04em, max-width 16ch.
  - Coluna 3: a descrição, 16px, line-height 1.65, var(--int-corpo), max-width 50ch.
- Fechamento: p abaixo da lista, 17px, var(--int-corpo), 62ch.
- ≤899.98: duas colunas (numeral | duração + nome), com a descrição embaixo ocupando a linha toda.
  ≤599.98: numeral 36px.
- Movimento: `.entra` em cada linha (--i ≤ 4). Números estáticos.

**E2. Perguntas (faq) → pin do acordeão em caixas grafite, https://br.pinterest.com/pin/800022321353572224/**
Caixas grafite empilhadas com vão pequeno. Cada uma tem a pergunta à esquerda e "+"/"−" à direita;
a aberta cresce e mostra a resposta. Substitui as "respostas sempre visíveis":
- A grade editorial fica (título preso à esquerda, a partir de 900px). A lista vai à direita.
- `details.int-faq__item` nativo, com `summary`:
  - fundo rgb(242 242 238 / .06), raio 16, sem borda, gap 8 entre as caixas;
  - pergunta em 17–20px, peso 400, papel;
  - à direita, um ícone Plus (Lucide, já está no Icone.astro) de 18px que gira 45° quando aberto
    (transform .45s com amortecimento). Sem chevron. O marcador nativo fica escondido.
- A primeira pergunta nasce aberta. A resposta vem em 16px, line-height 1.65, var(--int-apoio),
  max-width 60ch, padding 0 24px 24px.
- Abrir com altura animada só como aprimoramento, via `interpolate-size: allow-keywords` e
  `::details-content`, com transição de .5s. Sem JS, sem snap, sem trava.
- Com movimento reduzido, nada de transição.

**E3. Citação (texto em forma 'citacao') → pin Hikari, https://br.pinterest.com/pin/800022321353572229/**
Frase-manifesto enorme, alinhada à esquerda, em peso regular e entrelinha justa, com um pequeno ícone
em pílula dentro do texto. Substitui a citação centrada, porque a regra da home é título à esquerda:
- `p.int-citacao.int-citacao--manifesto`, alinhado à esquerda no container, com max-width 22ch:
  clamp(32px,4.4vw,64px), peso 300, line-height 1.08, -.05em, word-spacing -.08em, papel.
  Com mais de 90 caracteres, usa clamp(28px,3.4vw,50px) e max-width 26ch.
- No fim da frase, inline, vai `span.int-citacao__pilula` (aria-hidden): pílula de 1.35em × .8em,
  raio 999px, fundo rgb(242 242 238 / .1), vertical-align .08em, margin-left .25em. Dentro dela, um
  ponto de .22em em #FFD103. É o único ponto amarelo em repouso das internas, dentro da regra
  "amarelo só como detalhe, no máximo um por tela".
- Nenhum texto novo: sem chip "Next step", sem retrato.
- Movimento: `.entra` no bloco inteiro, sem palavra a palavra.
- A validação de amarelo aceita esse ponto como exceção.

**E4. Índice lateral da página → pin MyDNA (índice vertical à esquerda com marcador na seção atual)**
Novo componente `src/components/pagina/IndicePagina.astro`, feito na fundação e usado por
Pagina.astro, depois das seções (a lista vem do mesmo cálculo do despachante):
- Só aparece a partir de 1280px de largura, com `@media (hover: hover)`, e só em páginas com 4 ou mais
  seções que tenham título (h2). A primeira seção (hero) não entra.
- `nav.int-indice-pagina[aria-label="Nesta página"]` fixo, left: max(20px, calc(var(--grid-inset) - 88px)),
  top 50%, translateY(-50%), z-index 2. Deve caber no gutter sem encostar no conteúdo; confira a
  1280, 1440 e 1920.
- `ol` vertical com gap 10. Cada item é um `a[href="#secao-N"]` que mostra só o índice "01", "02"…
  em 11px tabular, cor rgb(242 242 238 / .55) (cerca de 5,7:1 sobre o preto; hover .8). O título da seção vai em
  `aria-label`/`span.visually-hidden`.
- Item atual: cor papel e um fio de 14px × 1px antes do número (fio cinza claro, não amarelo), com
  transição de .5s. O atual é calculado por IntersectionObserver sobre as seções, sem listener de
  scroll. `aria-current="true"`.
- Some (opacity 0 e pointer-events none, transição .4s) enquanto a primeira dobra ou uma dobra papel
  (`.int-secao--papel`) estiver sob o índice, e também sobre o rodapé. O sumiço só vale com JS (`.js`), e
  o foco do teclado dentro do índice sempre o revela (`:focus-within`). `ol role="list"`.
- Com movimento reduzido, sem transições.
- As âncoras usam o scroll-margin-top de 110px que a home já dá a `section[id]`.

**E5. Rótulo da hero → pin MyDNA ("PURPOSE OF MYDNA" acima do título)**
A hero das internas ganha um `p.rotulo` acima do h1, com texto que JÁ EXISTE na navegação (nav.ts).
Não é copy nova. Helper `rotuloDaRota(rota)` em contexto.ts:
- /studio/* → 'Protocolo Revena';
- /academy → 'Para Agências';
- /academy/* → 'Renke Academy';
- /faca-parte → 'A Renke';
- os outros → nenhum.
O despachante passa o rótulo ao BlocoHero (acrescente `rotulo?: string` ao ContextoSecao).
Pagina.astro recebe a rota por `pagina.rota`.

**E6. Realce do título da hero**
Fica o tom duplo da síntese (pin 62): as outras linhas em cinza e a linha do realce em papel. Sem
amarelo no H1.

**E7. Ritmo de dobras sólidas (28/09/2026)**
Especificação: `docs/04-design/ritmo-dobras-internas.md`, que prevalece sobre este documento no que
toca a cena, o papel e o ritmo. A cena fica na abertura, no fecho e em no máximo um respiro; entre
eles, dobras sólidas papel e preto alternadas (`planejarTons` em `contexto.ts`, campo `tom` do
ContextoSecao, classes `int-secao--papel` e `int-secao--preto`). Os componentes leem os tokens de
tinta de `paginas2.css` (`--int-tinta`, `--int-linha`, `--int-faq`…) e aplicam `data-tom`. Saem a
dobra papel fixa do antesDepois em lista e o `tom="claro"` da CabecaSecao.


## Resumo

Levar as 13 internas e o 404 para a mesma casca da home: Base2, home2.css, home-refinamento.css, body .home-refinada e a cena ao fundo. O renderizador único antigo (Blocos.astro + pagina.css + site.css) sai de cena e dá lugar a um despachante (Blocos2.astro) com um componente por tipo de bloco, cada um no seu arquivo.

Cada tipo usa um preset da home:
- o hero editorial, estático e mais baixo;
- a grade editorial da Operação (minmax(0,.85fr) minmax(0,1fr), gap 9%, título preso), que vira a espinha das dobras de leitura: lista, texto, FAQ e ficha;
- a grade de 6 colunas dos Features, para blocos, produtos e a grade de números;
- a caixa preta do Ecossistema, para o antes/depois em prosa e o catálogo da Academy;
- o painel de vidro do método, para as etapas;
- o mosaico papel dos Resultados, para o antes/depois 'Operação → Resultado', no máximo uma dobra clara por página;
- o formulário da home;
- a chamada final centrada.

Onde a forma do conteúdo não cabe num preset, entram seis referências da pasta Renke do Pinterest, adaptadas à linguagem da home:
- 62, título em dois tons no lugar do realce amarelo;
- 47, lista numerada tipográfica, sem cartão;
- 164, etapas como régua de livro-caixa;
- 187, manifesto em cinza com o strong em papel;
- 205, contato com título e formulário na mesma dobra;
- 201, ficha institucional em grade rótulo/valor.

Regras de conteúdo e de estilo:
- Nenhum texto dos dados muda. A única edição de dados é o rotaCta de Faça Parte ('#curriculo' → '#formulario'), que é rota, não copy.
- As flags antigas de apresentação (fundo 'alt'/'escuro', largo, centro do hero) deixam de valer.
- Amarelo em repouso: nenhum. Fica só o hover do botão (#FFEBA3) e a seleção de texto, já existentes.
- Sem fios, sem sombras e sem ilustrações nesta fase.

A home não muda. Mudanças em código compartilhado, todas aditivas e com padrão igual ao atual:
- prop opcional 'roteiro' no FundoVivo;
- parâmetro opcional no iniciar() de fundo-cena.ts;
- arquivo novo fundo-internas.ts.

A cena entra nas internas com um roteiro genérico montado a partir de data-cena: hero → pilares → formulario. A minhoca não é carregada. Há um fundo CSS estático por baixo, para quem tem movimento reduzido ou não tem WebGL.

## Arquitetura

NÃO TOCAR (garantia de que a home não muda): src/pages/index.astro, src/layouts/Base2.astro, src/styles/home2.css, home-refinamento.css, header-menu.css, sem-contornos.css, icones.css, tokens.css, tokens-v2.css, src/components/home2/* (inclusive Formulario.astro), src/components/ui/Botao.astro, Header.astro, Footer.astro, fundo-dobras.ts e fundo-motor.ts.

COMPARTILHADOS COM MUDANÇA ADITIVA (o padrão reproduz exatamente o comportamento atual):
- src/components/laboratorio/FundoVivo.astro: prop roteiro?: 'home' | 'interna', que vira data-roteiro. Com a prop ausente, o atributo não é emitido e o HTML da home fica idêntico. O script repassa canvas.dataset.roteiro para iniciar().
- src/components/laboratorio/fundo-cena.ts: iniciar(canvas, roteiro = 'home'). O config só muda quando roteiro === 'interna'. Nesse caso não carrega ARQUIVOS.minhoca.
- NOVO src/components/laboratorio/fundo-internas.ts: roteiroInterno() e TEXTOS_INTERNAS.

LAYOUT DAS INTERNAS:
- src/layouts/Pagina.astro passa a importar Base2 (não mais Base) e '../styles/paginas2.css'. Para de importar pagina.css. Renderiza:
<Base2 titulo descricao classe="home-refinada"><FundoInterno slot="fundo" /><Blocos2 blocos={pagina.blocos} /></Base2>
- A classe home-refinada dá o fundo #090907, o rodapé #0e0e0c em z-index 1 acima do canvas e o form-card claro. É o mesmo body da home, o que também mantém coerente a prévia do scripts/artifact.mjs.
- Nada envolve as seções num div. O Header usa main > :first-child para ligar header--caixa, e .trilhos > * só posiciona filhos diretos.

DESPACHANTE E COMPONENTES (todos em src/components/pagina/, fora de src/pages para não virarem rota):
- Blocos2.astro: despachante. Calcula o ContextoSecao de cada bloco e chama o componente do tipo.
- contexto.ts: tipos e helpers puros.
- CabecaSecao.astro: cabeçalho de seção padrão.
- FundoInterno.astro: div.int-fundo + FundoVivo fundo="cena" roteiro="interna".
- Um arquivo por tipo: BlocoHero.astro, BlocoLista.astro, BlocoProdutos.astro, BlocoBlocos.astro, BlocoEtapas.astro, BlocoAntesDepois.astro, BlocoTexto.astro, BlocoNumeros.astro, BlocoFaq.astro, BlocoFormulario.astro (+ formulario-envio.ts, script do envio) e BlocoCtaFinal.astro. A pendência fica em BlocoPendencia.astro.
- src/pages/404.astro: reescrito sobre Base2 + paginas2.css + FundoInterno, com estilos scoped próprios.

CSS:
- NOVO src/styles/paginas2.css, global, importado só por Pagina.astro e 404.astro. Leva os tokens --int-*, o ritmo das seções, a cabeça de seção, as duas grades (editorial e de cartões), as quatro superfícies, a tipografia utilitária, o texto rico vindo de set:html, o fundo estático, a regra da textarea no cartão claro e a pendência.
- Todo o resto é <style> scoped dentro de cada componente. No Astro 5 a estratégia 'attribute' acrescenta [data-astro-cid], o que vence a ordem imprevisível dos chunks CSS do Vite.
- Toda classe nova usa o prefixo int-.
- Classes da home reaproveitadas como estão: .container, .secao, .titulo, .rotulo, .entra/.visivel com --i, .botao/.botao--lg/.botao__texto/.botao__icone, .link-arrow, .visually-hidden, .num e o conjunto do formulário (.form-block, .form-card, .field…).
- Quando um componente precisa ajustar uma classe da home, prefixa com a classe da própria seção (ex.: .int-formulario .form-block__text .int-formulario__h1). Nunca empata especificidade com regra da home.

SAI DE USO NAS INTERNAS:
- Deixam de ser importados: Base.astro, site.css, superficies.css, pagina.css, Blocos.astro, Media.astro e Reel.astro (só as internas os usavam).
- botao.css continua, porque o design-system.astro o importa.
- Os arquivos mortos ficam no repositório até a Lenora aprovar o visual. Saem num commit final do mesmo PR.
- Nunca carregar site.css e home2.css na mesma página.

PARALELISMO:
1. A fundação entra primeiro, com stubs dos 12 componentes para o build passar.
2. Na segunda onda, cada agente é dono de UM arquivo Bloco*.astro, ou do 404.astro. O de formulário também é dono do formulario-envio.ts.
3. Ninguém edita paginas2.css, contexto.ts, CabecaSecao ou Blocos2 na segunda onda. Classe nova vai scoped no próprio componente.

## Fundação

A fundação é feita por um agente, antes dos componentes, nesta ordem.

0) LINHA DE BASE, antes de qualquer edição:
- npm run build e VERSAO=copy npx astro build --outDir dist-copy, os dois para o scratchpad.
- Guardar os dois index.html.
- Guardar a concatenação do CSS da home: os <link rel=stylesheet> na ordem do HTML, com os hashes normalizados.
- Guardar window.__fundo.roteiro() da home em dev (porta 4350).
- Guardar capturas da home com prefers-reduced-motion a 1440 e a 390.

1) src/styles/paginas2.css

TOKENS, copiados dos presets. A home continua com os literais dela.
:root {
  --int-cartao: #0e0e0e; --int-cartao-raio: 18px;
  --int-caixa: #000; --int-caixa-raio: 16px;
  --int-painel: rgb(10 10 10 / .58); --int-painel-raio: 16px;
  --int-papel: #e7e7e5; --int-papel-ficha: #efefed; --int-papel-texto: #252523; --int-papel-rotulo: #5f5f5d;
  --int-apoio: #b6b6b4; --int-corpo: #bcbcbc; --int-cartao-texto: #b6b6b6; --int-mudo: #aaa;
  --int-indice: rgb(242 242 238 / .45);
  --int-gap-cartoes: 16px;
  --int-junta: clamp(24px, 3vw, 40px);
  --int-topo-fixo: calc(var(--altura-header) + 56px);
}

RITMO. Toda seção leva class='secao int-secao int-{tipo}'. O .secao já dá padding-block var(--esp-secao) = clamp(72px, 9vw, 128px).
- .int-secao { position: relative }
- .int-secao--junta { padding-top: var(--int-junta) }
- .int-secao--cola-abaixo { padding-bottom: var(--int-junta) }
- .int-secao--papel { background: var(--int-papel); color: var(--int-papel-texto) }
- .int-secao--papel .rotulo { color: var(--int-papel-rotulo) }
- .int-secao--papel :focus-visible { outline-color: #262624 }
Nenhuma seção tem fundo próprio: todas são transparentes sobre a cena. As flags fundo 'alt' e 'escuro' são ignoradas.

CABEÇA DE SEÇÃO (usada por CabecaSecao.astro):
- .int-cabeca { display: grid; gap: 14px; justify-items: start; max-width: 760px; margin-bottom: clamp(32px, 4vw, 56px) }
- .int-cabeca__titulo { max-width: 22ch }. Recebe também a classe .titulo da home: 32–56px, peso 300, -.035em, word-spacing -.08em.
- .int-cabeca__titulo > span { display: block }
- .int-cabeca__apoio { font-size: 18px; line-height: 1.55; color: var(--int-apoio); max-width: 52ch }
- .int-cabeca--coluna { margin-bottom: 0 }
- .int-cabeca--centro { justify-items: center; text-align: center; margin-inline: auto }
- .int-cabeca--grande .int-cabeca__titulo { font-size: clamp(2.4rem, 4.4vw, 4rem) }
- .int-cabeca--claro .int-cabeca__titulo { color: var(--int-papel-texto); max-width: 24ch }
- .int-cabeca--claro .int-cabeca__apoio { color: #50504e }
O eyebrow é sempre p.rotulo: 11px, peso 500, .12em, caixa alta, cinza.

GRADE EDITORIAL (preset Operação):
- .int-grade-2 { display: grid; grid-template-columns: minmax(0, .85fr) minmax(0, 1fr); gap: 9%; align-items: start }
- .int-grade-2__direita { grid-column: 2 }
- @media (min-width: 900px) { .int-grade-2__fixo { position: sticky; top: var(--int-topo-fixo) } }
- ≤1099.98: gap 5%.
- ≤899.98: grid-template-columns 1fr; gap 36px; .int-grade-2__direita { grid-column: auto }.

GRADE DE CARTÕES (preset Features):
- .int-grade-6 { display: grid; grid-template-columns: repeat(6, minmax(0, 1fr)); gap: var(--int-gap-cartoes); list-style: none; margin: 0; padding: 0 }
- Filhos: span 2, min-width 0.
- [data-n='1']: span 6.
- [data-n='2'] e [data-n='4']: span 3.
- [data-n='5']: :nth-child(n+4) span 3, ou seja, 3+2 como a home.
- [data-n='3'] e [data-n='6']: span 2.
- ≤1099.98: 2 colunas, gap 20. Os mesmos seletores são repetidos com grid-column: auto, na mesma especificidade. Com [data-n='3'] ou [data-n='5'], o :last-child fica em grid-column 1/-1, width calc(50% - 10px), justify-self center.
- ≤599.98: 1 coluna, e o último em width 100%.

SUPERFÍCIES. Nenhuma tem border ou box-shadow: o 'fio fino' não existe na home, e o sem-contornos.css não precisa mudar.
- .int-cartao { background: var(--int-cartao); border-radius: var(--int-cartao-raio); padding: clamp(24px, 2.4vw, 32px) }
- .int-caixa { background: var(--int-caixa); border-radius: var(--int-caixa-raio); padding: clamp(20px, 4vw, 56px) }
- .int-painel { max-width: 1196px; margin-inline: auto; padding: clamp(20px, 3vw, 40px); border-radius: var(--int-painel-raio); background: var(--int-painel); -webkit-backdrop-filter: blur(14px); backdrop-filter: blur(14px) }
- .int-ficha { background: var(--int-papel-ficha); border-radius: 10px; padding: clamp(22px, 2.5vw, 36px); color: var(--int-papel-texto) }

TIPOGRAFIA UTILITÁRIA:
- .int-indice { font-size: 11px; letter-spacing: .04em; font-variant-numeric: tabular-nums; color: var(--int-indice) }
- .int-h3 { font-size: clamp(21px, 2vw, 29px); font-weight: 350; line-height: 1.2; letter-spacing: -.04em; hyphens: auto; overflow-wrap: break-word }
- .int-rico { display: grid; gap: 20px }
- .int-rico > p { font-size: clamp(16px, 1.3vw, 18px); line-height: 1.65; color: var(--int-corpo); max-width: 56ch }
- .int-rico strong { font-weight: 500; color: var(--papel) }
- .int-rico a { color: inherit; text-decoration: underline; text-underline-offset: 4px; text-decoration-thickness: 1px }, e 2px no hover.
- .int-manifesto > p { font-size: clamp(20px, 1.8vw, 26px); font-weight: 300; line-height: 1.5; letter-spacing: -.02em; color: var(--cinza) }
- .int-manifesto strong { font-weight: inherit; color: var(--papel) }
- .int-citacao { font-family: var(--font-titulo); font-weight: 300; font-size: clamp(24px, 2.4vw, 34px); line-height: 1.18; letter-spacing: -.035em; word-spacing: -.08em; color: var(--papel); max-width: 28ch; text-wrap: balance }
- .int-citacao :is(em, strong) { font-style: normal; font-weight: inherit }
- .int-citacao--centro { font-size: clamp(28px, 3.2vw, 46px); line-height: 1.15; letter-spacing: -.045em; max-width: 30ch; margin-inline: auto; text-align: center }
- .int-destaque { font-size: clamp(20px, 1.8vw, 26px); font-weight: 300; line-height: 1.35; color: var(--papel) }
O home2.css zera as margens de p. O espaçamento vem sempre do gap do contêiner.

FUNDO ESTÁTICO:
- .int-fundo { position: fixed; inset: 0; z-index: 0; pointer-events: none; background: radial-gradient(70% 55% at 50% 108%, rgb(242 242 238 / .07), transparent 70%), #090907 }
- .int-fundo::after { content: ''; position: absolute; inset: 0; background: var(--grao-fino); opacity: .14; mix-blend-mode: soft-light }
O canvas vem depois no DOM, também em z-index 0, é opaco e o cobre quando a cena roda.

FORMULÁRIO. A regra clara da home só cobre input e select:
.home-refinada .form-card .field textarea { background: #f4f4f2; color: #252523; min-height: 120px; padding: 12px 14px; resize: vertical }

PENDÊNCIA:
.int-pendencia { padding-block: 12px }
.int-pendencia p { max-width: 760px; font-size: 13px; line-height: 1.5; padding: 12px 16px; border-radius: 8px; background: rgb(255 209 3 / .1); color: #e8dfb8 }

2) src/components/pagina/contexto.ts, o contrato:
- export type BlocoDe<T extends Bloco['tipo']> = Extract<Bloco, { tipo: T }>;
- export type Cena = 'hero' | 'pilares' | 'formulario';
- export interface ContextoSecao {
    id: string;          // 'secao-3'
    tituloId: string;    // 'secao-3-titulo'
    indice: number;
    cena?: Cena;         // vira data-cena; ausente = seção opaca ou pendência
    junta: boolean;
    colaAbaixo: boolean;
    primeira: boolean;
    abertura?: string[]; // só formulario: linhas do H1 herdadas do hero curto
  }
- classesSecao(secao, ...extras) devolve ['secao', 'int-secao', junta && 'int-secao--junta', colaAbaixo && 'int-secao--cola-abaixo', ...extras].
- semSeta(s) remove ' →' ou ' ↓' do fim.
- indice2(n) devolve String(n).padStart(2, '0').
- formaAntesDepois(b) devolve 'prosa' quando linhas.length === 1 e as duas células somam mais de 240 caracteres; senão 'lista'.
- formaTexto(b):
  - 'citacao' quando centro, 1 parágrafo e nenhum h2 nem eyebrow (com título, cai em 'editorial', para o título não sumir);
  - 'ficha' quando há 3 ou mais parágrafos e todos começam por <strong>Rótulo:</strong>, com rótulo de até 40 caracteres terminado em dois-pontos;
  - 'editorial' quando há h2 ou eyebrow;
  - 'solto' nos outros casos.
- ehCitacao(p): o parágrafo inteiro está em <em>, ou começa com aspas.
- ehDestaque(p): o parágrafo inteiro está em <strong>.
- partesNumero(item) devolve [destaque, resto]. As regras estão em 'numeros'. Testar com os 11 itens reais.
- Props de TODO componente de bloco: interface Props { bloco: BlocoDe<'x'>; secao: ContextoSecao }. O bloco é o próprio tipo de tipos.ts, sem campo novo.

3) CabecaSecao.astro:
- Props: { id?: string; eyebrow?: string; titulo?: string | string[]; apoio?: string; nivel?: 'h1' | 'h2'; alinhamento?: 'esquerda' | 'centro'; tom?: 'escuro' | 'claro'; classe?: string }.
- Renderiza header.int-cabeca.entra, com modificadores --centro/--claro e a classe extra. Dentro: p.rotulo, depois h{n}.titulo.int-cabeca__titulo com id (string[] vira uma span display:block por linha, com espaço entre elas), depois p.int-cabeca__apoio.
- Sem título, só o rótulo.

4) FundoInterno.astro:
<div class="int-fundo" aria-hidden="true"></div>
<FundoVivo fundo="cena" roteiro="interna" />

5) Cena com roteiro genérico. A home mantém os quadros e o config atuais.
- fundo-internas.ts, roteiroInterno():
  [...document.querySelectorAll<HTMLElement>('main > [data-cena]')].map((el) => ['#' + el.id, el.dataset.cena!])
- TEXTOS_INTERNAS: '.int-hero__titulo, .int-hero__sub, .int-hero__acoes, .int-cabeca, .int-lista__texto, .int-rico, .int-citacao, .int-regua, .int-faq__item, .int-dados, .int-cta__miolo, .form-block__text, .int-erro__miolo'. Cartões, caixa, painel e papel já protegem o próprio texto.
- Em criar(ctx, roteiro), quando interna:
  config = { roteiro: roteiroInterno(), transparentes: 'main > [data-cena]', textos: TEXTOS_INTERNAS, cartoes: '', caixas: '', continuas: [], tau: .45, curva: maisSuave, saltoMax: 1, pena: 90, esperarEntrada: () => true }
  e sem carregarModelo(ARQUIVOS.minhoca…). A minhoca só aparece com t > .356, fora dos quadros usados.
- Quadros usados: 'hero' (t = 0), 'pilares' (.125) e 'formulario' (t = 0, fecha no enquadramento da abertura). 'perguntas' e 'convite' ficam de fora: puxam a minhoca e a névoa do trecho dos planos.
- Mesma condição de início da home: WebGL2 e sem movimento reduzido, inclusive no celular.
- Se a medição de desempenho mandar (ver riscos), o FundoInterno passa a checar matchMedia('(min-width: 900px) and (hover: hover)') antes de montar o FundoVivo.

6) Blocos2.astro, o despachante:
a) FUSÃO DO CONTATO. Se blocos[0] é hero sem sub e sem cta, e o próximo bloco que não é pendência é um formulario sem h2, o hero não é renderizado e o formulario recebe secao.abertura = hero.titulo.
b) As pendências não contam para nenhum cálculo abaixo. Em produção retornam null.
c) id = 'secao-N', contando só as seções renderizadas. O formulario usa id 'formulario', que é único.
d) cena:
   - a primeira seção recebe 'hero';
   - a última seção transparente recebe 'formulario';
   - as demais transparentes recebem 'pilares';
   - o antesDepois na forma 'lista' (papel) não recebe cena.
e) junta = (texto em forma 'solto') ou (numeros sem h2), desde que o bloco anterior não seja hero, formulario nem a dobra papel (antesDepois em forma 'lista'). O bloco anterior recebe colaAbaixo = true.
f) primeira = índice 0.

7) Stubs dos 12 componentes: section com classesSecao, id, data-cena e o título, para o build passar.

8) Pagina.astro conforme a arquitetura. Em src/data/paginas/faca-parte.ts: rotaCta '#formulario'.

REGRAS PARA QUEM IMPLEMENTA COMPONENTE:
- Um único <section> raiz: sem wrapper, sem fragmento com dois nós.
- id={secao.id}, data-cena={secao.cena} e aria-labelledby={secao.tituloId} quando houver título.
- Estilos scoped, com prefixo int-{tipo}__.
- Conteúdo que vem de set:html só é estilizado pelas classes globais .int-rico, .int-manifesto e .int-citacao.
- .entra com style='--i:k', com k ≤ 5, como a home (16px → 0, .6s, 90ms entre itens).
- Nunca .entra num ancestral de .int-painel: opacidade menor que 1 quebra o backdrop-filter.
- Sem amarelo, sem border, sem box-shadow, sem hover de cartão.
- Não editar arquivos compartilhados.

## Mapeamento por tipo de bloco


### hero — `src/components/pagina/BlocoHero.astro`

**Preset:** Hero editorial da home (Hero.astro + .hero--editorial), em versão estática e mais baixa: a mesma régua (.container com --gutter), a mesma grade de 2 colunas e o título em cima, com apoio e CTA na base. Sem selo, sem prova social, sem risco nem troca de frase, sem o atraso de 4,25 s. O realce segue a referência do Pinterest 62.


**Referência:** Pin 62 · Ergo 'AI revenue Infrastructure' — https://br.pinterest.com/pin/800022321353454453/ (título em dois tons: a hierarquia vem do tom, não da cor)


**Desenho**

ESTRUTURA: section.secao.int-secao.int-hero (data-cena='hero') > .container.int-hero__grade.

SEÇÃO:
- display grid; align-content end;
- min-height min(86svh, 920px);
- padding-top calc(var(--altura-header) + clamp(48px, 8vh, 96px));
- padding-bottom clamp(56px, 7vw, 104px);
- transparente sobre a cena.

GRADE (a mesma da .hero--editorial):
- grid-template-columns: minmax(0,1fr) clamp(240px,28vw,340px);
- column-gap clamp(32px,4vw,64px); row-gap clamp(28px,3.2vw,48px); align-items end.

TÍTULO: h1.titulo.int-hero__titulo em grid-column 1/-1, com uma span.int-hero__linha (display block) por item de titulo[].
- Escala --display, quando todas as linhas têm até 20 caracteres (os cinco Revena, Faça Parte): clamp(40px, 9.6vw, 120px), peso 300, line-height 1.02, letter-spacing -.06em, word-spacing -.08em.
- Escala padrão (Academy): clamp(34px, 4.4vw, 64px), peso 300, line-height 1.06, letter-spacing -.05em, max-width 24ch, text-wrap balance.
- Nunca white-space nowrap: há linhas de 66 caracteres. overflow-wrap break-word fica como rede de segurança.

REALCE (ref. 62): com `realce` definido, as outras linhas recebem .int-hero__linha--apagada (color var(--cinza) #A3A39B) e a linha do realce fica em var(--papel). Nada de amarelo. Sem realce, todas as linhas ficam em papel.

APOIO: p.int-hero__sub na coluna 1, os mesmos valores do .hero__lead: clamp(16px,1.4vw,20px), line-height 1.5, rgb(242 242 238/.78), max-width 760px, text-wrap pretty.

CTA: p.int-hero__acoes na coluna 2 (justify-self start, align-self end), com a.botao.botao--lg > span.botao__texto + Icone .botao__icone 20px. É o botão papel da home: raio 8, altura mínima 48. Sem sub, o CTA vai para a coluna 1.

RESPONSIVO:
- Tablet (≤1023.98): mantém 2 colunas.
- ≤899.98: 1 coluna, gap 28, min-height auto, padding-top calc(var(--altura-header) + 40px), padding-bottom 56px, sub em 16px.
- 390px: --display a 40px, padrão a 34px.
- 320px: conferir que '#TEAMRENKE.' cabe sem estouro.

ESTADOS: foco com outline 2px papel (home). Hover do botão igual ao da home: #FFEBA3, translateY(-1px), seta desliza 2px.


**Movimento**

- O H1 NÃO leva .entra: pinta no primeiro quadro e é o LCP.
- A sub leva .entra com --i:1; as ações, .entra com --i:2.
- Nenhuma animação da hero da home.
- A cena aparece pelo fade do motor, sem espera (esperarEntrada imediata no roteiro interno).
- Com movimento reduzido, tudo nasce visível e o .int-fundo fica no lugar da cena.


**Variações**

- titulo[] com 1–2 linhas: a escala é escolhida pelo comprimento.
- realce: só índice 1, em 7 páginas.
- centro: true (os cinco Revena) é IGNORADO: todos os heróis alinham à esquerda, como a home.
- Sem sub: o CTA vai para a coluna 1.
- Rótulo do CTA: semSeta(cta). O href é rotaCta ?? '/contato'.
- Ícone: ArrowDown quando rotaCta começa com '#' (Faça Parte); senão, ArrowUpRight. Por isso o CTA é marcado direto com as classes do botão, e não com o Botao.astro, que fixa ArrowUpRight.
- Hero só com título (Contato): não passa por aqui; o despachante o funde ao formulário.


**Acessibilidade**

- Um único h1 por página, com id = secao.tituloId e a section apontando para ele por aria-labelledby.
- Entre as spans das linhas vai {' '}, para o leitor de tela não juntar 'ano.O'.
- Contraste: cinza sobre #090907 ≈ 7,6:1; papel ≈ 17:1.
- Ícone aria-hidden (o Icone.astro já faz isso). Alvo de 48px.
- A âncora #formulario respeita o scroll-margin-top de 110px da regra global section[id].


### lista — `src/components/pagina/BlocoLista.astro`

**Preset:** Título preso + coluna da Operação/Solutions da home: grade minmax(0,.85fr) minmax(0,1fr), gap 9%, sticky em top calc(var(--altura-header) + 56px). Os itens são tipográficos, sem cartão, pela referência do Pinterest 47.


**Referência:** Pin 47 · dots and lines — https://br.pinterest.com/pin/800022321353472135/ (linhas numeradas grandes e finas, sem cartão; aproveitar só a composição)


**Desenho**

ESTRUTURA: section.secao.int-secao.int-lista > .container.int-grade-2.

COLUNA 1: CabecaSecao (eyebrow → .rotulo; h2 → .titulo) com classe 'int-cabeca--coluna int-grade-2__fixo' (sticky a partir de 900px). Título com max-width 16ch.

COLUNA 2: ol (numerada) ou ul com role='list', list-style none, display grid, gap clamp(24px,2.6vw,36px).
- li.int-lista__item: grid-template-columns 48px minmax(0,1fr).
- span.int-lista__texto: var(--font-titulo), peso 300, clamp(20px,1.8vw,26px), line-height 1.3, letter-spacing -.03em, word-spacing -.08em, papel, max-width 34ch, text-wrap pretty.
- Marca na numerada: span.int-indice '01'…'0N', padding-top .7em.
- Marca na lista sem número: span.int-lista__ponto de 6×6px, border-radius 50%, rgb(242 242 238/.4), margin-top .62em.
- Sem cartão, sem fio, sem bolinha amarela.

RESPONSIVO:
- ≤1099.98: gap da grade 5%.
- ≤899.98: 1 coluna, gap 36, sticky desligado, texto em 20px, coluna da marca de 36px.
- 390px: texto em 19px, max-width none.


**Movimento**

- A cabeça leva .entra; cada li, .entra com --i = índice (máximo 5).
- O sticky é só CSS.
- Sem 'linha ativa' à moda do pin 186: apagar as outras linhas prejudica a leitura, e a legibilidade vem antes do efeito.
- Com movimento reduzido, tudo visível.


**Variações**

- numerada: ol + índice; sem numerada: ul + ponto.
- eyebrow opcional ('Para quem é' nas Academy).
- 4–7 itens de 27–102 caracteres. O Scale tem 7, e a coluna passa da altura do título, que é justamente o caso do sticky.
- fundo é ignorado.
- Duas listas na mesma página (Run: 'Ideal para' e a rotina) usam o mesmo desenho.


**Acessibilidade**

- aria-labelledby para o h2.
- Índices e pontos aria-hidden; a ordem vem do <ol>.
- role='list' preserva a semântica no Safari com list-style none.
- Texto em papel sobre #090907 ≈ 17:1.


### produtos — `src/components/pagina/BlocoProdutos.astro`

**Preset:** Caixa escura do Ecossistema (.ecossistema__box: #000, raio 16, padding clamp(20px,4vw,56px)) envolvendo a cabeça e a grade 3+2 dos Features (6 colunas, gap 16), com cartões no tom do .feature-card (#0e0e0e, raio 18).


**Desenho**

ESTRUTURA: section.secao.int-secao.int-produtos > .container > div.int-caixa.

DENTRO DA CAIXA:
- CabecaSecao: rótulo 'Produtos', h2, apoio = sub.
- ol.int-grade-6[data-n=5] com role='list'.

CARTÃO: li > article.int-cartao.int-produto em flex column, min-height clamp(260px,22vw,320px).
- Topo: span.int-indice '01'…'05'. A sub fala em trilha, e a ordem dos dados é a da trilha.
- h3.int-produto__nome: margin-top 28px, clamp(24px,2.2vw,32px), peso 300, letter-spacing -.04em, line-height 1.1.
- p: 15px, line-height 1.65, var(--int-cartao-texto), max-width 44ch, margin-top 14px.
- p.int-produto__acao: margin-top auto, padding-top 28px, com a.link-arrow ('Saiba Mais'; 15px, peso 500, sublinhado com offset de 6px).
- Nada de Botao em cada cartão: seriam 5 botões de conversão na mesma tela.

GRADE: os cartões 1–3 ocupam span 2 e os 4–5 span 3.

RESPONSIVO:
- ≤1099.98: 2 colunas, com o 5º centralizado em calc(50% - 10px).
- ≤599.98: 1 coluna, min-height 0.

ESTADOS: o único hover é o do link (o sublinhado engrossa). O foco usa o outline papel da home.


**Movimento**

.entra na cabeça e em cada cartão, com --i de 0 a 4. Nada muda no hover do cartão: sem foto, sem arte, sem translate.


**Variações**

- 5 itens hoje; a regra [data-n] cobre de 1 a 6.
- A rota passa por existe(): sem página, o cartão fica sem link (não inventar destino).
- O cta passa por semSeta().
- fundo é ignorado.
- A área de arte 4/3 do Ecossistema NÃO entra: a home a deixou vazia até chegarem prints reais.


**Acessibilidade**

- article com h3.
- O link tem nome único: Saiba Mais<span class='visually-hidden'>: {titulo}</span>.
- A ol comunica a ordem da trilha; o índice é aria-hidden.
- Contraste de #b6b6b6 sobre #0e0e0e ≈ 9:1.


### blocos — `src/components/pagina/BlocoBlocos.astro`

**Preset:** Grade de Features da home: 6 colunas com gap 16, cartão #0e0e0e de raio 18, h3 de 21–29px com peso 350 e texto de 15px #b6b6b6. Sem a área de arte. Por dentro, a estrutura da ficha de Resultados: título no topo, texto no pé.


**Desenho**

ESTRUTURA: section.secao.int-secao.int-blocos > .container.

CABEÇA: CabecaSecao (eyebrow, h2, apoio = sub), alinhada à ESQUERDA. A cabeça centrada é própria dos pilares da home; aqui a esquerda mantém a régua das outras dobras.

GRADE: div.int-grade-6[data-n=N] com role='list'.

CARTÃO: article.int-cartao.int-blocos__cartao com role='listitem', em flex column, min-height clamp(200px,17vw,248px).
- span.int-indice no topo, só quando numerado, com margin-bottom 20px.
- h3.int-h3.
- p no pé: margin-top auto, padding-top 28px, 15px, line-height 1.65, var(--int-cartao-texto), max-width 48ch.

SPANS POR QUANTIDADE:
- 2 → 3+3;
- 3 → 2+2+2;
- 4 → 3+3 e 3+3;
- 5 → 2+2+2 e 3+3;
- 6 → 2+2+2 duas vezes.

RESPONSIVO:
- ≤1099.98: 2 colunas; com quantidade ímpar, o último centraliza em meia largura.
- ≤599.98: 1 coluna, min-height 0.

ESTADOS: sem hover no cartão.


**Movimento**

.entra na cabeça. Cartões com .entra e --i:k (k ≤ 5). Sem arte e sem translate no hover.


**Variações**

- largo é IGNORADO: a quantidade decide o span. Os 11 blocos 'largo' têm 4 itens e viram 2×2 largos.
- numerado mostra o índice 01–0N no topo (Rastreamento, Core).
- 6 itens sem flag (Protocolo Renke) ficam 2+2+2 em duas linhas.
- 2 itens ('Como funciona' de CRM e de Cultura Pro) ficam 3+3, sem o terço vazio de hoje.
- sub vira o apoio da cabeça (Scale, Core, Full).
- grande aplica int-cabeca--grande. Nenhuma página usa.
- itens[] internos viram ul com Icone Check 16px em rgb(242 242 238/.5), sem amarelo. Nenhuma página usa.
- media não é renderizado nesta migração: o Media.astro depende de site.css e nenhum dado usa. Em dev, console.warn.


**Acessibilidade**

- A grade é lista (role list/listitem), o que anuncia a quantidade de itens.
- Hierarquia h2 → h3. Índice aria-hidden.
- hyphens auto (html lang pt-BR) e overflow-wrap break-word, para 'Autorresponsabilidade' caber a 320px.


### etapas — `src/components/pagina/BlocoEtapas.astro`

**Preset:** Painel do método da home (.metodo-editorial: rgb(10 10 10/.58) + blur(14px), raio 16, padding clamp(20px,3vw,40px), max 1196px), com as durações na escala dos números do método, sem amarelo e sem contagem. As linhas funcionam como régua de livro-caixa, pela referência do Pinterest 164.


**Referência:** Pin 164 · Orbital — https://br.pinterest.com/pin/800022321353311723/ (rótulo à esquerda, contexto no meio, numeral fino à direita)


**Desenho**

ESTRUTURA: section.secao.int-secao.int-etapas > .container > div.int-painel.

DENTRO DO PAINEL:
- CabecaSecao com titulo = h2[] (uma span por linha, como o título do método).
- ol.int-etapas__lista com role='list', display grid, gap clamp(28px,3vw,40px).

LINHA: li.int-etapa com grid-template-columns 40px minmax(0,1fr) minmax(0,1.35fr) minmax(112px,.55fr); column-gap clamp(20px,3vw,48px); align-items baseline.
- span.int-indice (n com padStart 2).
- h3.int-etapa__nome: clamp(22px,2vw,30px), peso 300, -.04em, papel.
- p.int-etapa__descricao: 16px, line-height 1.6, var(--int-corpo), max-width 46ch.
- p.int-etapa__duracao, text-align right. Duração numérica ('10 dias', '12 meses') → span.int-etapa__valor (clamp(32px,3.4vw,50px), peso 300, line-height 1, -.055em, tabular-nums, papel) + span.int-etapa__unidade (13px, #aaa, margin-left 8px). Caso contrário ('Opcional'), a palavra inteira em .int-etapa__unidade de 15px.
- Sem fio, sem cartão por etapa, sem círculo amarelo.

FECHAMENTO: p.int-etapas__fechamento com margin-top clamp(40px,5vw,64px), 17px, line-height 1.65, var(--int-corpo), max-width 62ch.

RESPONSIVO:
- ≤1099.98: grid-template-areas 'n nome dur' '. desc desc', com colunas 40px 1fr auto.
- ≤599.98: areas 'n dur' 'nome nome' 'desc desc'; valor em 28px; painel com padding 20px.

FORA: linha do tempo proporcional e empilhamento de cabeçalhos com sticky (o pin 61/114 foi reprovado nos pilares).


**Movimento**

- .entra em cada li (--i ≤ 4) e no fechamento. Nunca no próprio painel nem num ancestral dele: opacidade menor que 1 quebra o backdrop-filter.
- Números estáticos: o contador existe só no método da home.


**Variações**

- 4 ou 5 etapas.
- Duração numérica ou em texto.
- fechamento opcional: o Full não tem, e o painel termina na lista.
- eyebrow opcional; nenhuma página usa.
- fundo é ignorado: o Core, que não tem alt, fica igual aos outros.
- h2 aceita várias linhas.


**Acessibilidade**

- ol com role list e um h3 por etapa.
- Valor e unidade ficam no mesmo <p> como texto real, sem aria-label reescrito. Índice aria-hidden.
- Conferir o contraste de #bcbcbc sobre o painel com a cena no quadro 'pilares': precisa de ≥ 7:1.


### antesDepois — `src/components/pagina/BlocoAntesDepois.astro`

**Preset:** Duas formas, cada uma com seu preset:
- prosa → caixa escura com duas portas do Ecossistema (#000, raio 16, 1fr 1fr, gap 24);
- lista → mosaico papel dos Resultados (#e7e7e5; fichas #efefed de raio 10; gap 12). É a única dobra clara da página.


**Desenho**

A forma sai de formaAntesDepois().

FORMA PROSA (Academy 'Dois jogos', Rastreamento, Cultura Pro)

ESTRUTURA: section.secao.int-secao.int-antes-depois--prosa > .container > div.int-caixa.
- CabecaSecao dentro da caixa.
- div.int-antes-depois__lados com role='group': grid 1fr 1fr, gap 24.

LADO: article.int-lado, padding clamp(24px,3vw,40px), raio 12.
- Antes: fundo #070707; h3 e texto em #8f8f8b.
- Depois: fundo #141413 (tom da arte do Ecossistema); h3 em papel e texto em #d0d0cc.
- h3.int-lado__titulo recebe o rótulo: clamp(24px,2.4vw,34px), peso 300, -.04em.
- p: 16px, line-height 1.7, max-width 52ch, margin-top 20px.
- Sem vermelho ou verde, sem ✕/✓, sem expandir por clique.

RESPONSIVO: ≤899.98, os lados empilham com gap 16.

FORMA LISTA (Revena Start e Full)

ESTRUTURA: section.secao.int-secao.int-secao--papel.int-antes-depois--lista > .container. O cabeçalho camaleão vira 'claro' sozinho.

TOPO: div.int-antes-depois__topo em flex, space-between, align-items end, gap 24, margin-bottom clamp(32px,4vw,56px).
- CabecaSecao com tom='claro'.
- p.rotulo.int-antes-depois__legenda com rotulos[0] + Icone ArrowRight 14px + rotulos[1].

MOSAICO: dl.int-mosaico em grid repeat(3,minmax(0,1fr)), gap 12.

FICHA: div.int-ficha em flex column, min-height 220px.
- Topo em linha: dt.int-ficha__rotulo (14px, peso 450, -.02em) à esquerda; span.int-ficha__indice '01' (10px, opacidade .6) à direita.
- dd.int-ficha__texto no pé: margin 0, margin-top auto, padding-top 40px, clamp(19px,1.6vw,24px), peso 300, line-height 1.3, -.02em, #252523, max-width 24ch.
- Sem ficha de destaque grafite: não há hierarquia entre as seis linhas.

RESPONSIVO:
- ≤899.98: 2 colunas.
- ≤599.98: 1 coluna, min-height 0, legenda abaixo do título.

A <table> com rolagem lateral deixa de existir.


**Movimento**

.entra na cabeça e em cada lado ou ficha (--i ≤ 5). Tudo estático, sem hover.


**Variações**

- Prosa: os rótulos viram os h3 dos lados. eyebrow opcional. 140–411 caracteres por lado.
- Lista: 6 linhas hoje. O mosaico aceita de 3 a 9.
- Nunca duas dobras papel na mesma página. Se isso acontecer um dia, a segunda vira prosa escura.
- fundo é ignorado.


**Acessibilidade**

- Prosa: dois article com h3, dentro de um grupo rotulado pelo título da seção.
- Lista: dl com pares dt/dd agrupados em div (HTML válido). A legenda visível nomeia as duas colunas. Ícone e índice aria-hidden.
- Na dobra papel, o outline de foco é #262624.
- Contraste: #252523 sobre #efefed ≈ 14:1; #5f5f5d sobre #e7e7e5 ≈ 5,6:1; #8f8f8b sobre #070707 ≈ 6:1.


### texto — `src/components/pagina/BlocoTexto.astro`

**Preset:** - Editorial e solto: grade editorial da Operação, sem sticky, com o texto na escala da descrição do método (18px, #bcbcbc, 56ch).
- Citação centrada: composição da chamada final com a escala da frase-âncora.
- Manifesto: referência do Pinterest 187.
- Ficha institucional: referência do Pinterest 201.


**Referência:** - Pin 187 · Vestora — https://br.pinterest.com/pin/700098704620738140/ (corpo grande em cinza e trecho em papel no mesmo peso).
- Pin 201 · Nenya — https://br.pinterest.com/pin/700098704620779659/ (fatos em grade de rótulo e valor, sem a foto).


**Desenho**

A forma sai de formaTexto(). O texto corrido mora SEMPRE na coluna direita da grade editorial, com uma única exceção, a citação centrada.

CITAÇÃO (centro e 1 parágrafo: Performa, Run, Scale)
- section.int-texto--citacao > .container > p.int-citacao.int-citacao--centro.
- O <strong> ou <em> que envolve o parágrafo fica com peso herdado e sem itálico.

FICHA (Contato 'Renke Studio')
- .container.int-grade-2, com CabecaSecao --coluna à esquerda.
- À direita, dl.int-dados: grid de 2 colunas, gap clamp(28px,3vw,40px) clamp(24px,3vw,48px).
- Cada div: dt.rotulo com o texto do <strong>, sem os dois-pontos finais; dd em 16px, line-height 1.6, rgb(242 242 238/.88), com o resto via set:html (links sublinhados).
- ≤599.98: 1 coluna.

EDITORIAL (tem h2 ou eyebrow)
- .container.int-grade-2, com CabecaSecao --coluna à esquerda, sem sticky. Só com eyebrow ('A tese' do Protocolo), a coluna leva só o rótulo, como um índice.
- À direita, div.int-rico. Dentro dela:
  - parágrafo comum: estilo base do .int-rico;
  - parágrafo inteiro em <em> ou entre aspas: p.int-citacao, com margin-block 12px;
  - parágrafo inteiro em <strong>: p.int-destaque ('Não é só um selo…').
- Com 3 ou mais parágrafos, ou com alguma citação ('A tese' da Academy e do Protocolo), a div ganha .int-manifesto.

SOLTO (sem h2 e sem eyebrow: Academy depois da caixa, Core depois dos blocos, Run depois da rotina)
- Mesma grade, com a coluna esquerda vazia e o texto em .int-grade-2__direita, em .int-rico.int-manifesto.
- A seção recebe .int-secao--junta, e a anterior .int-secao--cola-abaixo.

RESPONSIVO:
- ≤899.98: tudo em 1 coluna, gap 28; citação centrada em 28px.
- 390px: manifesto em 19px.


**Movimento**

- .entra na cabeça (--i:0) e no bloco de texto inteiro (--i:1), sem escalonar parágrafo por parágrafo.
- Citação centrada com .entra.
- Nada de revelação palavra a palavra: vetada nas internas, e o script dela mora no palco Revena.


**Variações**

- 1–5 parágrafos, de 24 a 295 caracteres.
- HTML inline (<strong>, <em>, <a>) via set:html, com replaceAll(' →', '').
- centro com mais de 1 parágrafo vira editorial.
- fundo é ignorado.
- As três seções de Faça Parte caem em editorial: GPTW (com .int-destaque), 'No que acreditamos' (eyebrow #TEAMRENKE) e 'Onde a mágica acontece'.
- Nenhuma foto: as da sede estão pendentes ou foram reprovadas.


**Acessibilidade**

- Com h2, a section usa aria-labelledby. Sem título, fica section sem nome, o que é aceitável.
- A citação é <p>, não blockquote: a copy não traz autor.
- A ficha usa dl/dt/dd. Links sublinhados, não só por cor.
- Contraste: #bcbcbc ≈ 11:1; cinza ≈ 7,6:1.


### numeros — `src/components/pagina/BlocoNumeros.astro`

**Preset:** - Régua: régua de números do painel do método (valor light grande + legenda curta; no celular, linhas 'valor | legenda'), sem amarelo e sem contagem.
- Grade: cartão do Features com a estrutura da ficha de Resultados (índice no topo, palavra no pé).


**Desenho**

RÉGUA (sem 'grade': Treinamento CRM, Cultura Pro, Contato)

ESTRUTURA: section.int-numeros > .container. CabecaSecao só entra quando há h2.

LISTA: ul.int-regua com role='list', grid repeat(N, minmax(0,1fr)) (N = número de itens, até 4), gap clamp(24px,3vw,48px), align-items start.

ITEM: partesNumero(item) divide a frase em duas spans:
- span.int-regua__valor: display block, var(--font-titulo), peso 300, clamp(28px,2.8vw,42px), line-height 1.05, -.045em, tabular-nums, papel, text-wrap balance;
- span.int-regua__legenda: display block, margin-top 12px, 14px, line-height 1.5, #aaa, max-width 24ch.
O texto do item fica idêntico: as duas spans juntas, com o espaço entre elas, somam a frase. Sem chips, sem pílula, sem vidro.

NOTA: margin-top clamp(40px,5vw,72px). Se começa com aspas, vira p.int-citacao (Cultura Pro); se não, p.int-cabeca__apoio.

RESPONSIVO:
- ≤899.98: 2 colunas.
- ≤599.98: 1 coluna; cada li vira grid minmax(0,1fr) minmax(0,1.15fr), align-items baseline, gap 12 (como o .metodo__numero no celular), com o valor em 26px.

GRADE (Revena Full)

ESTRUTURA: CabecaSecao com o h2.

LISTA: ol.int-numeros__grade em grid repeat(4,minmax(0,1fr)), gap 16.

ITEM: li.int-cartao com min-height clamp(150px,13vw,190px), em flex column.
- span.int-indice no topo.
- span.int-numeros__palavra no pé: margin-top auto, clamp(24px,2.4vw,34px), peso 300, -.04em.

NOTA: 18px, var(--int-apoio), max-width 56ch, margin-top 32px.

RESPONSIVO:
- ≤899.98: 2×2.
- ≤359.98: 1 coluna.


**Movimento**

.entra por item (--i ≤ 4) e na nota. Números estáticos, sem contador.


**Variações**

partesNumero(item), em ordem:
1) Se há ':' seguido de espaço nos primeiros 24 caracteres, o destaque vai até os dois-pontos, inclusive ('10:30 horas' e '1:1' não entram aqui) ('Sem equipe nova:', '1ª semana:', 'GPTW:', 'Baixo turnover:').
2) Se não há, e o item começa com um token que tem dígito, o destaque é esse token, estendido por ' a ' + outro token com dígito quando houver ('R$5k a R$40k', 'R$1k a R$5k/mês', '+140', '+650', '30+', '4+', '6').
3) Nos demais casos, o item inteiro é o destaque (as palavras do Full).

Quando o bloco não tem h2:
- a seção é junta do bloco anterior (CRM depois de 'Como funciona'; Cultura Pro depois da caixa);
- exceção: se o anterior é hero ou formulario, vira seção normal (Contato).

fundo é ignorado.


**Acessibilidade**

- ul ou ol com role list.
- Espaço real entre as spans, para a frase ser lida inteira.
- Índices aria-hidden. Nenhum aria-label com número reescrito.


### faq — `src/components/pagina/BlocoFaq.astro`

**Preset:** Grade editorial com título preso (Operação). As respostas ficam sempre visíveis, pela decisão de 26/09 de não esconder texto.


**Desenho**

ESTRUTURA: section.int-faq > .container.int-grade-2.

COLUNA 1: CabecaSecao com classe 'int-cabeca--coluna int-grade-2__fixo', com o h2.

COLUNA 2: div.int-faq__lista em grid, gap clamp(32px,3.4vw,48px).
- Cada div.int-faq__item leva h3.int-faq__pergunta (clamp(19px,1.7vw,24px), peso 400, line-height 1.3, -.02em, papel) e p.int-faq__resposta (16px, line-height 1.65, var(--int-apoio), max-width 56ch, margin-top 12px).
- Sem <details>, sem chevron, sem caixa, sem fio.

RESPONSIVO: ≤899.98, 1 coluna e sticky desligado.


**Movimento**

.entra por item (--i ≤ 5). O sticky é nativo.


**Variações**

4 perguntas hoje; a 5ª é pendência. O desenho aguenta de 3 a 10. Acima de 8, reavaliar com a Lenora o acordeão do pin 56.


**Acessibilidade**

- Perguntas em h3, navegáveis por cabeçalho.
- Tudo visível sem JS.
- Não criar schema FAQPage nesta migração.


### formulario — `src/components/pagina/BlocoFormulario.astro + src/components/pagina/formulario-envio.ts`

**Preset:** Formulário da home (Formulario.astro): as mesmas classes (.form-block, .form-block__text, .form-card, .form-card__duo, .field, .field__label, .field__erro, .form-card__status, .form-card__copiar, .form-card__aviso) e o mesmo id de seção #formulario. Esse id puxa as regras da home: colunas de 400 e 460 centralizadas, gap até 56, cartão claro #e7e7e5 sob .home-refinada. No Contato, título e formulário dividem a primeira dobra, pela referência do Pinterest 205. O Formulario.astro da home NÃO é editado.


**Referência:** Pin 205 · Evermind — https://br.pinterest.com/pin/700098704620779668/ (título e prazo à esquerda, campos à direita, na mesma dobra)


**Desenho**

ESTRUTURA: section.secao.int-secao.int-formulario com id='formulario' (há um só formulário por página) > .container.form-block.

COLUNA DE TEXTO: div.form-block__text.entra, gap 24.
- Com abertura (Contato): h1.titulo.int-formulario__h1, clamp(40px,5vw,72px), line-height 1.04, -.05em, uma span por linha. O seletor precisa ser .int-formulario .form-block__text .int-formulario__h1, para vencer o .form-block__text .titulo da home. Depois vem a sub e um p com a.link-arrow para mailto:{email}.
- Sem abertura: h2.titulo (se houver), a sub e o e-mail (se houver).

CARTÃO: form.form-card.entra com novalidate, data-form-pagina, data-email={email ?? rodape.email} e data-whatsapp.
- Campos na ordem dos dados, marcados como na home: label.field > span.field__label + controle + span.field__erro[hidden] com id 'campo-{id}-erro'.
- Atributos: id 'campo-{id}', name = id, autocomplete dos dados, required = obrigatorio, inputmode 'tel' no tel.
- Um email seguido de um tel formam uma div.form-card__duo.
- select: primeiro <option value='' selected disabled>Selecione</option> (a palavra que a home já usa), depois as opções dos dados.
- textarea com rows 4 (estilo claro vem do paginas2.css).
- Botão: Botao type='submit' bloco, com semSeta(botao). Fica grafite sobre o cartão claro por regra da home.
- Em seguida: p.form-card__status (role status, aria-live polite); button.form-card__copiar.link-arrow hidden ('Copiar mensagem'); p.form-card__aviso com a frase da home ('A mensagem abre no seu {canal}, pronta para revisar e enviar. Ou escreva para {email}.').

ABERTURA: #formulario.int-formulario--abertura, com o id no seletor porque o padding de #formulario na home tem especificidade de id.
- padding-top calc(var(--altura-header) + clamp(40px,6vw,88px));
- padding-bottom var(--esp-secao);
- min-height 100svh; display grid; align-content center.

RESPONSIVO: ≤899.98, valem as regras da home (1 coluna até 560px, gap 32; duo em 1 coluna).


**Movimento**

.entra no texto (--i:0) e no cartão (--i:1), como na home. Nenhuma outra transição.


**Variações**

CONTATO
- Sem h2; com sub e e-mail.
- 5 campos: nome, e-mail, WhatsApp, interesse (select) e mensagem (textarea opcional).
- Recebe a abertura com 'Vamos conversar?' e é data-cena 'hero'.

FAÇA PARTE
- h2 e sub, sem e-mail ao lado.
- 5 campos, com url obrigatório.
- É o último bloco, então fica no quadro 'formulario' da cena.
- A âncora do herói passa de '#curriculo' para '#formulario'.

ENVIO (formulario-envio.ts, um script genérico para todo [data-form-pagina])
- No submit, para cada controle com name, roda checkValidity().
- Campo inválido: el.validationMessage (a mensagem nativa do navegador, sem microcopy nova) vai para o .field__erro; o campo recebe aria-invalid='true' e .field--invalido; o foco vai para o primeiro inválido.
- Formulário válido: monta linhas 'Rótulo: valor' a partir do .field__label, omitindo os vazios. O texto é 'Olá, Renke.' + linha em branco + as linhas; o assunto é 'Contato pelo site'.
- Abre wa.me (se rodape.whatsapp estiver preenchido) ou mailto, com os mesmos status e o mesmo botão de copiar da home.
- Nada vai para a URL do site: acaba o GET atual com nome, e-mail e WhatsApp na query string.


**Acessibilidade**

- label envolvendo o controle.
- Erro ligado por aria-describedby; status em aria-live polite.
- O rótulo da copy já marca '(opcional)' onde precisa.
- Foco com outline #252523 no cartão claro (regra da home).
- autocomplete correto; campos de 46px.


### ctaFinal — `src/components/pagina/BlocoCtaFinal.astro`

**Preset:** Chamada final da home (#fale): uma coluna centralizada, título .titulo até 15ch, frase #aeaeac e botão papel grande, sobre a cena, com padding clamp(80px,9vw,144px). SEM .secao--amarela e SEM o id #fale.


**Desenho**

ESTRUTURA: section.secao.int-secao.int-cta, com padding-block clamp(80px,9vw,144px) > .container > div.int-cta__miolo.

MIOLO: display grid, justify-items center, text-align center, gap 28.

TÍTULO: h2.titulo, em duas escalas.
- Destaque de até 60 caracteres: clamp(2.2rem,3.8vw,3.8rem), max-width 15ch (a escala do #fale).
- Acima de 60 caracteres (as perguntas de 105–164 caracteres): .int-cta__titulo--longo, clamp(26px,2.6vw,38px), line-height 1.18, max-width 32ch, text-wrap balance.

TEXTO: p em 17px, line-height 1.6, #aeaeac. max-width 44ch até 160 caracteres; 56ch acima disso.

BOTÃO: Botao tamanho='lg' com href={rotaCta ?? '/contato'} e rótulo semSeta(cta). Variante sólida: papel, com ArrowUpRight.

RESPONSIVO:
- ≤899.98: gap 24.
- 390px: título curto em 35px, longo em 24px.


**Movimento**

.entra no miolo, que entra como um bloco só. O hover do botão é o da home.


**Variações**

- ctaProtocolo (os 5 Revena): título curto.
- Academy: título curto ('…não é para todo mundo.') ou longo (as perguntas).
- Texto de 113 a 269 caracteres.
- rotaCta nunca é usado; o destino é /contato.
- Contato e Faça Parte não têm este bloco.


**Acessibilidade**

- aria-labelledby para o h2.
- Um só botão de conversão na tela.
- Contraste de #aeaeac sobre #090907 ≈ 8,5:1.


### pendencia — `src/components/pagina/BlocoPendencia.astro`

**Preset:** Nenhum: é um recado para o time, não conteúdo.


**Desenho**

- Só existe em import.meta.env.DEV. Em produção retorna null, e nenhum nó entra no HTML.
- section.int-pendencia, sem .secao e sem data-cena, com padding-block 12px > .container > p com a nota ('Falta copy: {o_que}') no estilo .int-pendencia da fundação.
- É a única cor amarelada das internas, e aparece só em dev.


**Movimento**

Nenhum.


**Variações**

O despachante a ignora ao calcular junta, cena, primeira e última seção.


**Acessibilidade**

Não aparece em produção.


### 404 — `src/pages/404.astro (reescrito; estilos scoped no próprio arquivo)`

**Preset:** Chamada final da home: uma coluna centrada numa dobra de altura cheia. Sem o numeral '404' gigante: a Lenora tirou o numeral decorativo da chamada da home.


**Desenho**

CASCA: Base2 (classe 'home-refinada'; título e descrição de hoje) + import '../styles/paginas2.css' + <FundoInterno slot='fundo' />.

SEÇÃO: section.secao.int-secao.int-erro, com id 'secao-1', data-cena 'hero' e aria-labelledby 'secao-1-titulo'.
- min-height 100svh; display grid; place-items center;
- padding-top var(--altura-header); padding-bottom clamp(56px,7vw,96px).

MIOLO: .container > div.int-erro__miolo, em grid, justify-items center, text-align center, gap 24, max-width 640px, margin-inline auto.
- p.rotulo 'Erro 404';
- h1.titulo, clamp(2.2rem,3.8vw,3.8rem), max-width 15ch;
- p lead em 17px, line-height 1.6, #aeaeac, max-width 44ch;
- div.int-erro__acoes (flex, gap 28, align-items center, justify-content center, wrap) com Botao tamanho='lg' href='/' ('Voltar para a home') e a.link-arrow href='/contato' ('Falar com a gente') como ação secundária.

RESPONSIVO: ≤599.98, as ações ficam em coluna, gap 20.

A copy não muda.


**Movimento**

.entra no lead (--i:1) e nas ações (--i:2); o título aparece de imediato. A cena roda no quadro 'hero' (o roteiro interno tem uma dobra só).


**Variações**

Nenhuma. Saem as variantes 'brilho' (ilegível na Base2) e 'contorno'.


**Acessibilidade**

- Um h1.
- Menu e rodapé completos, como na decisão original.
- Um só botão de conversão.


## Casos por página

LEGENDA:
- [cena X]: seção transparente sobre a cena, no quadro X.
- [papel]: dobra clara opaca. A cena fica escondida e o cabeçalho passa a 'claro'.
- 'junta': a seção cola na anterior, com cerca de 80px entre elas.
- Surgem só duas superfícies claras em todo o conjunto: a dobra papel de Start e Full e o cartão do formulário (Contato e Faça Parte). Nunca aparecem as duas na mesma tela.
- Pendências só aparecem em dev.

/academy (hub):
1. hero padrão, linha 1 em cinza e linha 2 em papel [cena hero]
2. antesDepois prosa na caixa preta ('O jogo antigo' apagado, 'O jogo novo' um tom acima) [cena pilares]
3. texto solto 'junta', manifesto na coluna direita: +140 em papel e a citação em .int-citacao [pilares]
4. lista 'Para quem é' na grade editorial com o título preso [pilares]
5. blocos com 4 itens em 3+3 [pilares]
6. texto 'A tese': cabeça à esquerda, manifesto à direita [pilares]
7. produtos na caixa preta, com cartões 3+2 e índices 01–05 [pilares]
8. pendência
9. ctaFinal curto [cena formulario]
Ajustes: é a única página com catálogo. Os dois fundos 'alt' seguidos deixam de existir.

/academy/protocolo-renke:
hero padrão (linha 1 de 66 caracteres quebra em 3, realce em papel) → lista → blocos com 6 itens (2+2+2 duas vezes) → texto 'A tese' só com eyebrow (rótulo sozinho na coluna esquerda; manifesto com duas citações) → pendência de depoimentos (nada no lugar) → ctaFinal curto.

/academy/formacao-performa:
hero padrão → lista (6 itens) → blocos 3+3 → citação-manifesto à esquerda (E3) → texto 'Sobre a Renke' editorial → ctaFinal longo (107 caracteres).

/academy/treinamento-crm:
hero padrão → lista → blocos 3+3 → blocos 'Como funciona' com 2 itens (3+3, fim do terço vazio) → números em régua 'junta' ('R$5k a R$40k' / 'por implementação'…) → pendência → texto 'Sobre a Renke' → ctaFinal longo.
A régua publica os valores tal como estão, inclusive a divergência de R$ registrada na pendência. Decidir antes de publicar.

/academy/rastreamento-avancado:
hero padrão (segunda linha curta 'Agora você prova.' em papel) → lista → blocos 3+3 sem eyebrow → blocos numerados com 3 itens (2+2+2, índices 01–03) → antesDepois prosa na caixa → texto 'Sobre a Renke' → ctaFinal longo (134 caracteres).

/academy/cultura-pro:
hero padrão → lista → blocos 3+3 → blocos 'Como funciona' com 2 itens (3+3) → antesDepois prosa na caixa → números em régua 'junta' ('GPTW:', '30+', '4+', 'Baixo turnover:') com a nota como citação → texto 'Sobre a Renke' → ctaFinal longo (164 caracteres, escala longa, cerca de 5 linhas a 38px).
Sem selo GPTW: não há arquivo no projeto.

/studio/revena-start:
hero --display 'Revena Start' à esquerda, até 120px [cena hero] → lista numerada 01–05 [pilares] → blocos 3+3 [pilares] → etapas em linhas numeradas (E1), 5 linhas (duração '10 dias' no rótulo, 'Opcional' em texto) [pilares] → antesDepois lista [papel]: mosaico 3×2 com legenda 'Operação → Resultado' → ctaFinal ctaProtocolo [cena formulario].
Nada do palco: sem ícone plano-start, sem fundo de traços, sem nome em duas linhas desencontradas, sem esconder o cabeçalho.

/studio/revena-run:
hero --display → lista numerada → blocos 3+3 → citação-manifesto à esquerda (E3) ('Tecnologia sem manutenção degrada…') → lista da rotina com pontos → texto solto 'junta' ('Quem cuida disso:' no manifesto, na coluna direita, alinhado à lista acima) → pendência → ctaFinal.
Não tem etapas nem dobra papel. As duas listas usam o mesmo desenho e ficam separadas pela citação.

/studio/revena-scale:
hero --display → lista numerada → blocos 3+3 com apoio → citação-manifesto à esquerda (E3) → etapas em linhas numeradas (E1), 4 linhas (45, 90, 180 dias; 12 meses) → lista da rotina com 7 itens (título preso até o fim da coluna) → pendência → ctaFinal.

/studio/revena-core:
hero --display → lista numerada → blocos 3+3 com apoio → etapas em linhas numeradas (E1) (sem fundo 'alt' hoje; fica igual às outras) → blocos numerados com 3 itens curtos (2+2+2) → texto solto 'junta' ('3 camadas…' e 'Você recebe:' no manifesto; lê como fecho dos três cartões) → pendência → ctaFinal.

/studio/revena-full:
hero --display → lista numerada → blocos 3+3 com apoio → etapas em linhas numeradas (E1), 5 linhas, sem fechamento → números em grade (4 cartões Controle/Automação/Processo/Experiência + nota) → antesDepois lista [papel] → ctaFinal.
Letreiro não entra.

/contato:
1. Abertura fundida: hero 'Vamos conversar?' como h1 na coluna de texto + sub + e-mail, com o cartão claro de 5 campos ao lado [cena hero; 100svh]
2. números em régua de 3 itens (não junta: vem depois do formulário), sem padding-top: ficam a 128px do cartão e leem como prova sob o título
3. pendência D1
4. FAQ na grade editorial, com as 4 respostas visíveis
5. pendência
6. ficha institucional com rótulo à esquerda e dl em 2 colunas à direita [cena formulario]
Os números ('+140', '6 anos') divergem da home (D1): são publicados como estão nos dados, e a decisão fica com a Lenora.

/faca-parte:
hero --display 'Faça parte do' em cinza / '#TEAMRENKE.' em papel, com CTA 'Deixe seu currículo' e ícone ArrowDown para #formulario → pendência → texto GPTW editorial (com o strong como .int-destaque) → texto 'No que acreditamos' editorial → blocos 'Os 4 valores' 3+3 → texto 'Onde a mágica acontece' editorial → pendência → formulário com h2 [cena formulario].
Sem fotos: a do time está desatualizada e a da sede, pendente.

/404:
uma dobra centrada de altura cheia [cena hero].

RITMO:
- Não há alternância de fundo escuro/claro por seção. O ritmo vem das superfícies em sequência: tipografia sobre a cena → cartões → painel de vidro ou caixa preta → tipografia → papel (só Start e Full) → chamada centrada.
- É a mesma lógica da home: transparente sobre a cena, com uma dobra papel.

## Reaproveitamento de assets

ENTRA NAS INTERNAS:
- Inter Variable. Já vem da Base2.
- Assinatura e monograma da marca, via Header e Footer, que ficam como estão.
- A cena: FundoVivo fundo='cena', fundo-cena.ts e fundo-motor.ts, com donut.glb, env-arcos.webp, env-faixas.webp e causticas.mp4, no roteiro interno (quadros hero, pilares e formulario). minhoca.glb não é baixado (2,45 MB a menos).
- --grao-fino, no fundo estático .int-fundo.
- Ícones Lucide que já estão no mapa do Icone.astro: ArrowUpRight, ArrowDown, ArrowRight e Check. Nenhum ícone novo.
- Transições da home: .entra/.visivel com a cascata --i de 90ms, o hover do botão e do link-arrow, e o sticky nativo do título.
- Classes e medidas dos presets, sem mexer nelas: .container, .secao, .titulo, .rotulo, .botao/.botao--lg, .link-arrow, .visually-hidden e o conjunto do formulário.
- A microcopy de interface que a home já usa no formulário: 'Selecione', 'Copiar mensagem', os status e o aviso do canal. Ela vem copiada para o componente novo, não importada do Formulario.astro.

NÃO ENTRA, por pertencer aos planos Revena:
- PlanosPalco.astro e Planos.astro, com o pino, o snap, o mapa, as âncoras, a cortina e o header--oculto.
- O script de revelação palavra a palavra (vive no PlanosPalco).
- public/icones/plano-*-{light,dark}.svg. O uso atual no megamenu continua, porque é navegação global.
- public/imagens/plano-fundo*.svg e os fundos de traços de scripts/gerar-fundos-palco.py.
- .revena-pilares e .peca--papel/--ouro.

NÃO ENTRA, por decisão de direção:
- Letreiro: é o respiro próprio da home, um por site. As palavras dele são as do Revena Full na versão copy. Nas internas, repetido, pareceria template.
- As animações da hero da home: risco, troca de frase, subtítulo aos 4,25 s.
- ConfiancaHero e doutores.ts, que têm nomes fictícios.
- Esteira e Faixa, com números ilustrativos e vagas de depoimento.
- NumerosFaixa, Numeros.astro e os números de home.ts (divergências D1).
- O contador de 1,8 s: exclusivo do método da home.
- Sobre.astro e as fotos de src/assets/sede: o 'Conheça a Renke' foi reprovado, a foto do time está desatualizada e as fotos da sede nova estão pendentes.
- O vídeo 'o que a Renke faz' e o Telefone: pertencem à dobra do método. Repetir o único vídeo real enfraquece a home.
- ArtePilar, ArteBeneficio e ArteInterface: são cenas fixas por índice, escritas para os pilares e ganhos do Revena. Ligadas por índice a outro conteúdo, ilustrariam errado. Nesta fase os cartões ficam tipográficos.
- MockupProduto, Conexoes, IlustracaoIndicador, CabecaIndicador e RevOpsAnimacao, que estão sem uso ou são conceituais.
- public/arte/pilar-*.svg, tools-camadas.svg e icones/pilar-0N.svg, que são provisórios.
- hero-ondas.svg.
- Media.astro e Reel.astro, que dependem de site.css.
- Nenhuma imagem do Pinterest é copiada para o site.

SE A LENORA SENTIR FALTA DE IMAGEM (fase 2, precisa de aprovação): a única combinação semanticamente exata é o 'O que o Start faz' do Revena Start com ArtePilar 0 a 3, nesta ordem: jornada até a consulta, CRM por etapas, confirmação/lembrete/follow-up, painel de decisão. Isso pede um campo só de layout, arte?: number, em ItemBloco. Não estender por índice às outras páginas.

## Validação

1) HOME INALTERADA (bloqueante)
Comparar com a linha de base guardada na fundação:
- index.html dos builds padrão e VERSAO=copy idêntico, normalizando /_astro/*. Nenhum data-roteiro na home.
- Concatenação do CSS da home, na ordem dos <link>, idêntica depois de normalizar os hashes. Isso pega uma troca de ordem entre icones.css e home2.css (a seta ↗ duplicada no botão).
- window.__fundo.roteiro() da home em dev com os mesmos nomes e trechos.
- Capturas com movimento reduzido a 1440 e 390 iguais às de antes.
- node scripts/test-planos-motion.mjs aprovado.

2) BUILDS
- npm run build e VERSAO=copy npx astro build --outDir dist-copy, sem erro.
- As internas dos dois builds só podem diferir na assinatura do rodapé: diff normalizado de academy.html, contato.html, faca-parte.html, studio/revena-start.html e 404.html.
- npm run deploy:teste passa.

3) HTML DAS INTERNAS
- Sem classes da casca antiga no dist: grep por section--, pg-hero, reconhece, resolve__, etapa__n, chips, statement, tabela-rolagem, wf-note e erro__ não acha nada.
- Nenhum <link> para o chunk de site.css.
- Um h1 por página e ids únicos.
- main > * são só <section>, o nav.int-indice-pagina (índice lateral, E4, que vai no slot padrão da Base2) e <script>.
- Não há <form> sem data-form-pagina.

4) NAVEGADOR
Browser em dev na porta 4350, ou o Playwright do cache npx com channel 'chrome' e NODE_PATH, em CJS.
Em cada uma das 13 internas e no 404, a 1440×900, 1100×800, 768×1024, 390×844 e 320×640:
- console sem erros;
- document.documentElement.scrollWidth <= innerWidth;
- header--escuro no topo, header--caixa depois do herói e header--claro sobre a dobra papel (Start, Full);
- elementFromPoint no meio do rodapé devolve um descendente de .footer (rodapé acima do canvas);
- depois de rolar até o fim, todos os .entra com .visivel;
- no desktop, o canvas [data-fundo-vivo] com opacity > 0 em cerca de 2 s;
- em dev, __fundo.roteiro().nomes igual a ['hero','pilares','formulario'], ou ['hero'] no 404;
- a minhoca.glb não aparece na aba de rede das internas.
Conferir visualmente, no quadro 'pilares' da cena, a legibilidade das listas e do manifesto sobre o objeto.

5) MOVIMENTO REDUZIDO (emulado)
- Nenhum canvas iniciado.
- .int-fundo visível.
- Todo o conteúdo visível sem rolar.
- O sticky continua (não é animação).

6) AMARELO E CONTORNOS
Rodar um script que percorre todos os elementos visíveis em repouso: color, background-color, border-color, fill e stroke não podem conter #FFD103, #FFE27A nem #FFEBA3. Resultado esperado: zero ocorrências. Em dev, a .int-pendencia é a exceção esperada. Border visível e box-shadow nos cartões: zero.

7) FORMULÁRIOS (Contato e Faça Parte)
- Enviar vazio mostra os erros inline (validationMessage) e põe o foco no primeiro campo inválido.
- E-mail e url inválidos são barrados.
- Preenchido, a URL da página não muda (sem query string), o status aparece e o mailto ou wa.me é montado com 'Rótulo: valor'.
- A textarea aparece clara no cartão.
- O CTA do herói de Faça Parte cai em #formulario, com o título visível abaixo do cabeçalho (scroll-margin 110px).

8) CONTEÚDO
- Comparar o texto visível de cada interna com os dados, com um script que extrai textContent por seção. A única diferença aceita é a apresentação: as setas '→'/'↓' removidas, os dois-pontos do dt da ficha, 'Selecione', os índices 01–0N e as legendas vindas dos rotulos.
- Nenhum número, depoimento ou nome novo.

9) DESEMPENHO
- Lighthouse mobile em /studio/revena-start e /academy, antes e depois.
- Se a nota de desempenho cair mais de 10 pontos ou o TBT passar de 300 ms, ativar a condição de desktop no FundoInterno (ver riscos) e repetir a medição.

## Riscos

1. ORDEM DO CSS
O Vite divide as folhas por conjunto de páginas, e a ordem de saída não segue a dos imports. Depois da migração, o icones.css passa a ter o mesmo conjunto de páginas da home2.css e pode mudar de chunk.
- Mitigação: prefixo int-, estilos scoped (a estratégia 'attribute' soma especificidade) e ajustes de classes da home sempre prefixados pela classe da seção.
- Validação: a concatenação do CSS da home tem de sair idêntica (seção 1 da validação).

2. REGRAS DA HOME PRESAS A ID
- O formulário usa de propósito id='formulario' para herdar as regras da home. Qualquer mudança futura em #formulario na home passa a valer também nas internas.
- O padding do #formulario tem especificidade de id: a variante de abertura precisa do seletor #formulario.int-formulario--abertura.
- Nunca usar #fale, #perguntas, #resultados ou #o-que-fazemos nas internas. O CtaFinal sem #fale e com .secao--amarela pintaria a dobra inteira de amarelo.

3. CENA
- Custo nas internas: cerca de 250 KB (gzip) de JS mais uns 3,6 MB de arquivos, sem a minhoca, e renderização contínua enquanto houver dobra transparente na tela, ou seja, quase a visita inteira.
- Licença: os arquivos da PeachWeb estão pendentes, e espalhar a cena aumenta a exposição.
- Plano B, que não mexe no desenho: montar a cena só em (min-width: 900px) and (hover: hover). O .int-fundo cobre o resto.
- A máscara de leitura protege no máximo 16 retângulos. Se uma lista longa passar disso, o trecho sem proteção fica sobre o objeto. Conferir no quadro 'pilares' e, se precisar, trocar o quadro do meio para 'metodologia'.

4. BACKDROP-FILTER
O .int-painel perde o desfoque se algum ancestral estiver com opacidade menor que 1. Por isso, .entra só nos filhos do painel. Conferir no Safari.

5. MUDANÇAS EM CÓDIGO DA HOME
FundoVivo e fundo-cena ganham parâmetros. Um padrão errado muda a home. Tudo precisa ser opcional, com o padrão 'home', e ser verificado pelo roteiro e pelo diff de HTML.

6. REPROVAÇÃO VISUAL
A Lenora reprova rodadas inteiras quando o conjunto fica carregado ou com cara de template, e as internas ficam sem ilustração nesta fase.
- Mostrar primeiro /studio/revena-start e /academy prontos, com capturas a 1440 e 390, antes de fechar as outras.
- Se ela pedir imagem, usar só a combinação exata da fase 2 (ArtePilar no Start).

7. CONTEÚDO PENDENTE PUBLICADO COMO ESTÁ
- '+140 clínicas' e '6 anos' (D1) contra '~30 clínicas' e '4 anos' da home.
- As faixas de R$ divergentes do Treinamento CRM.
- '+140' da /academy.
A migração não altera dados. A Lenora precisa decidir antes do deploy, porque a régua deixa esses números mais visíveis que os chips de hoje.

8. MICROCOPY PARA APROVAÇÃO
Precisam do ok da Lenora:
- a abertura 'Olá, Renke.' e o assunto 'Contato pelo site' nas mensagens do Contato e de Faça Parte;
- 'Selecione' no select;
- o aviso do canal copiado da home.
Os erros usam a mensagem nativa do navegador, de propósito, para não criar copy.

9. FLAGS IGNORADAS
fundo, largo e o centro do hero deixam de ter efeito, o que pode surpreender quem editar os dados. Registrar isso num comentário no tipos.ts numa etapa posterior; nesta etapa não é necessário.

10. PALAVRAS LONGAS
'Autorresponsabilidade', '#TEAMRENKE.' e 'implementação' a 320px dependem de hyphens: auto e overflow-wrap. Conferir sem estouro horizontal.

11. FORMULÁRIO DUPLICADO
A lógica de envio existe agora em Formulario.astro (home) e em formulario-envio.ts. Unificar depois, numa tarefa própria que confira a home com diff.

12. AJUSTES DE DADOS E LEGADO
- O rotaCta de Faça Parte muda de '#curriculo' para '#formulario'. É rota, não copy, mas é a única edição nos dados.
- Os arquivos mortos (Base.astro, site.css, superficies.css, pagina.css, Blocos.astro, Media.astro, Reel.astro) só saem depois da aprovação.
- Um componente salvo por engano em src/pages vira rota e link pelo rotas.ts.

13. PENDÊNCIAS FORA DO ESCOPO
Ficam de fora desta migração:
- o aria-current do menu, que nunca é definido nas internas;
- a transição entre páginas por View Transitions (pin 165), porque exigiria CSS na home.

## Anexo — referências candidatas do Pinterest (curadoria)

- **Hero de página interna (título em linhas + sub + CTA), para todas as internas** — 158 · Sui, "Build full stack" https://br.pinterest.com/pin/800022321353313960/: Título enorme e fino sobre o vazio, com a luz subindo do pé da dobra por trás. Na tela só há título, uma linha de apoio e um botão. Adaptação: Sem azul: a luz vem da própria cena (FundoVivo fundo="cena") num quadro baixo, do tipo 'hero', com a máscara de leitura atrás do texto. H1 em Inter 300 na escala do h1 da home (80px no desktop, com clamp), nas colunas 1–7 do grid de 12. Apoio em 19px cinza, até 40ch. Um botão papel, o único de conversão da tela. Entra como bloco pela regra .entra (12px→0, .9s, cubic-bezier(.22,1,.36,1)). Nas páginas Revena (hoje com centro: true), alinhar à esquerda ou centralizar só com a composição do convite. Nada de ícone do plano, símbolo gigante ou fundo do palco, e sem os retratos e a prova social da hero da home.
- **Hero com duas linhas e realce (Academy, cursos, Faça Parte)** — 62 · Ergo, "AI revenue Infrastructure" https://br.pinterest.com/pin/800022321353454453/: Título em dois tons: uma linha em tom cheio e a outra em cinza fino. A hierarquia vem do tom, sem cor. Adaptação: A linha com `realce` fica em papel (#F2F2EE) e as outras em cinza (#A3A39B), no mesmo peso 300 e no mesmo tamanho, sem amarelo no título. Se a tela pedir um acento, ele é o filete de 40×1px acima do título, como no convite. Quando o apoio é longo (Academy, Faça Parte), o título vai nas colunas 1–7 e o apoio nas 8–12, alinhado à base, como a abertura da home ('título RevOps em três linhas com apoio lateral'). '#TEAMRENKE.' vai em sentence case ou fica como está na copy, mas sem caixa alta pesada.
- **Lista de reconhecimento / dores ('Ideal para clínicas que:', 'Se você é dono de agência e...')** — 186 · EchoMind https://br.pinterest.com/pin/700098704620738131/: Índice numerado 01/–0N/ em que só a linha que cruza o meio da tela acende em branco e as outras ficam apagadas. Adaptação: Composição Solutions da home: título preso à esquerda (colunas 1–5, só sticky nativo) e frases à direita (7–12) em Inter 300 de ~28–32px, uma por linha. As linhas se separam por espaço, não por fio: os contornos saíram em 26/09 (sem-contornos.css zera .reconhece__item). A linha ativa fica em papel 100% e as outras a ~55%, com transição de cor de .6s. O número 01–05 fica em cinza 13px, e só o da ativa vai em #FFD103, o único amarelo da tela. Sem a faixa de foto e sem cartão. Com movimento reduzido ou sem JS, tudo fica a 100%. Na lista sem número, o marcador vira um ponto de 6px.
- **Lista de reconhecimento (alternativa estática, sem item ativo)** — 47 · dots and lines https://br.pinterest.com/pin/800022321353472135/: Cada linha sobe de trás de uma máscara horizontal, numerada 01–03, com uma linha de descrição ao lado. Adaptação: Frases em Inter 300 dentro de overflow:hidden, com translateY(105%)→0 em ~1s e cubic-bezier(.22,1,.36,1). Anima uma vez só, com escalonamento de 70ms em até 4 itens (regra .entra). O fio visível some e fica só o limite da máscara. Números 01–05 em cinza, sem lima, sem caixa alta, sem peso pesado.
- **Etapas / linha do tempo com duração (Revena Start, Run, Scale, Core, Full)** — 61 · Lama Lama (o 114 é o mesmo site) https://br.pinterest.com/pin/800022321353454456/: Etapas numeradas (01 Discover a 04 Deliver) cujo cabeçalho, com número e nome, gruda no topo logo abaixo do anterior. Os cabeçalhos formam um índice compacto enquanto o texto de cada etapa corre por baixo. Adaptação: Lista plana, com cabeçalhos e corpos como irmãos, e top = altura do header + i × 52px. No cabeçalho: número em cinza, nome em Inter 300 papel e duração ('10 dias', 'Opcional') em cinza 13px à direita. O fundo do cabeçalho é vidro escuro (rgb(12 12 11 / .74) com blur), sem borda. O número da última etapa presa vai em #FFD103, o único amarelo da tela. Descrição nas colunas 7–12, até 52ch. O `fechamento` fecha a dobra como frase em corpo médio. Abaixo de 900px não empilha: vira lista simples, com a duração acima do nome. Sentence case, sem a caixa alta pesada do original.
- **Etapas / linha do tempo (alternativa estática)** — 164 · Orbital (com o 168, Apollo) https://br.pinterest.com/pin/800022321353311723/: Régua de livro-caixa: rótulo à esquerda, uma linha de contexto no meio e numeral enorme e fino alinhado à direita. Adaptação: Cada etapa é uma linha: número e nome nas colunas 1–4, descrição nas 5–9 e duração nas 10–12, em Inter 300 com tabular-nums na escala dos números da metodologia (48px). A unidade ('dias', 'meses') fica menor, como nos indicadores da home. Números estáticos: a contagem só existe nos indicadores da metodologia. As linhas se separam por espaço ou por vidro escuro alternado, não por fio. 'Opcional' fica em cinza.
- **Tabela antes/depois (seis linhas 'Operação → Resultado' e a versão de dois parágrafos 'jogo antigo / jogo novo')** — 63 · Levyero (estudo de caso) https://br.pinterest.com/pin/800022321353449328/: Desafio e solução em duas colunas curtas, e ficha técnica em linhas finas com rótulo à esquerda e valor à direita. Adaptação: Seis linhas: continua sendo tabela semântica. O rótulo vai em Inter 500 papel (colunas 1–4) e o resultado em 16–18px (5–12). As linhas se separam por espaço ou por zebra de vidro a 4%, porque os fios de th/td foram zerados em 26/09. 'Operação' e 'Resultado' viram o único rótulo em caixa alta de 12px da dobra. Dois parágrafos: 6+6 colunas, com 'O jogo antigo' em cinza #A3A39B e 'O jogo novo' em papel, sem vermelho/verde e sem ícones ✕/✓.
- **Tabela antes/depois em dois painéis ('Dois jogos. Você escolhe qual jogar.')** — 122 · Cascade, dois produtos https://br.pinterest.com/pin/800022321353387822/: Dois painéis lado a lado, um mais escuro e outro mais claro, lidos juntos. Adaptação: A mesma caixa escura sólida do Ecossistema, envolvendo o título e os dois cards de vidro sem contorno. O jogo antigo fica num vidro mais apagado, com texto cinza; o jogo novo num vidro um tom acima, com texto papel. Sem expansão por clique, sem vermelho, tudo legível. No celular, os painéis empilham.
- **Lista de produtos da Academy (5 cursos com título, texto e 'Saiba mais')** — 219 · Facture, conceito em grade https://br.pinterest.com/pin/800022321353278625/: Colunas altas separadas, cada uma com numeral grande e fino, nome, uma linha de texto e rótulo com seta no pé. Adaptação: Cinco colunas de vidro (raio 12, sem contorno), ou 3+2 como os pilares da home quando não couberem. Numeral em Inter 200 cinza a ~40%, grande mas abaixo do h1. Título e texto sempre visíveis, e 'Saiba mais' com seta no pé como botão secundário de vidro. O hover muda só o fundo (.35s), sem foto e sem transform. Sem pílulas e sem a barra verde-limão. No celular, linhas empilhadas com o numeral à esquerda.
- **Lista de produtos da Academy (alternativa com hierarquia)** — 236 · GreenMotive https://br.pinterest.com/pin/800022321353275704/: Cartões de vidro fosco sobre um objeto físico ao fundo, com o cartão central mais alto. Adaptação: O Protocolo Renke, que a copy chama de 'o sistema operacional inteiro', ganha o cartão maior. Os outros quatro cursos ficam em cartões menores ao lado, todos no vidro dos pilares (blur 28, raio 12). A cena passa por trás num quadro desfocado, como o de 'pilares'. Sem mockup de área de membros: as áreas visuais de Academy e Tools foram esvaziadas em 26/09 (commit 765ae7c) até chegarem prints reais.
- **Grade numerada ('O Full integra os 4 pilares' e 'O que acontece toda semana', com 3 itens numerados)** — 83 · Grid system industrial https://br.pinterest.com/pin/800022321353430356/: Células só de estrutura, com um numeral gigante esmaecido atrás do rótulo de cada uma. Adaptação: Células de vidro sem contorno e sem grade aparente, em 4 ou 3 colunas do grid. O numeral vai em Inter 200 papel a ~6%, atrás do texto e cortado pela borda da célula. Rótulo em Inter 300 papel e texto em cinza. A `nota` fica abaixo, em corpo médio, nas colunas 1–7. Número nunca em amarelo.
- **Grade numerada de palavras curtas (alternativa)** — 7 · Quadra Capital, tríptico "Structure. Strategy. Scale." https://br.pinterest.com/pin/800022321353499791/: Três palavras em três painéis verticais de tons diferentes (grafite, cinza), no ritmo de uma gestora de patrimônio. Adaptação: Painéis de vidro cujo tom avança de um para o outro (7% → 10% → 13%) como sinal de ordem, ideia tirada do pin 55. Palavra em Inter 300 grande e texto curto embaixo. Sem retrato, já que não há foto aprovada, e sem azul.
- **Números em frase (bloco 'numeros' das internas: 'R$5k a R$40k por implementação', '+140 clínicas atendidas', 'GPTW: certificação conquistada')** — 74 · Capital X, template de VC https://br.pinterest.com/pin/800022321353446824/: Número escuro com um traço curto embaixo e a unidade em cinza fino ('80 million'). Adaptação: A parte numérica vai em Inter 300 papel, com tabular-nums, na escala dos números da metodologia (48px). O resto da frase fica em 16px cinza, abaixo, sem chips. Nos itens sem número, a primeira expressão fica em papel. Estáticos, sem contagem. Fileira de 3–4 no grid, sem caixa.
- **Texto corrido / manifesto (citações em <em> e bloco 'A tese')** — 38 · Levyero, "Not separate services. One connected system…" https://br.pinterest.com/pin/800022321353472461/: A tese sozinha, com muito vazio em volta, como manifesto. Adaptação: Citação em Inter 300 de ~40px, abaixo do título de dobra de 56px, com até 28ch. Vai nas colunas 2–10 ou centralizada como o convite. Sem itálico serifado e sem aspas gigantes. O filete amarelo de 40×1px do convite fica acima, como único amarelo. A cena passa por trás num quadro calmo. Os parágrafos comuns do bloco 'texto' ficam no apoio padrão: colunas 1–7, 52–62ch, text-wrap pretty.
- **Texto corrido com trecho em destaque (os <strong> das internas)** — 187 · Vestora https://br.pinterest.com/pin/700098704620738140/: Frase-manifesto longa com um único trecho destacado. Adaptação: Parágrafo em corpo grande (22–24px) em cinza, com o <strong> em papel no mesmo peso 300: o destaque vem do tom, não do amarelo nem do negrito. Um bloco por tela, entrando como bloco.
- **FAQ (Contato; a home não tem FAQ: a dobra 'Perguntas' é a dos ganhos, na composição Solutions)** — 63 · Levyero (ficha técnica em linhas) https://br.pinterest.com/pin/800022321353449328/: Ficha em linhas, com rótulo à esquerda e valor à direita, tudo visível. Adaptação: Pergunta em Inter 500 papel (colunas 1–5) e resposta em cinza 16px (6–12), com 52–62ch. As linhas se separam por espaço, porque .faq__item está zerado desde 26/09. O título da dobra fica à esquerda. Sem ícone de +, sem caixa. O schema FAQPage continua valendo.
- **FAQ (alternativa em acordeão, se a lista crescer)** — 56 · Movetrans https://br.pinterest.com/pin/800022321353454717/: Linhas que abrem uma por vez (grid-template-rows, ~0,7s), com um quadradinho de cor como marcador só na linha aberta. Adaptação: <details>/<summary> nativo, com a primeira pergunta aberta e a resposta abrindo em .7s com cubic-bezier(.22,1,.36,1). Marcador de 6px em #FFD103 só na linha aberta, o único amarelo. Funciona sem JS.
- **Página de contato (hero curto + formulário + canal direto)** — 205 · Evermind (depoimentos e contato) https://br.pinterest.com/pin/700098704620779668/: Formulário com título e prazo de resposta à esquerda e o painel dos campos à direita. Adaptação: Reusar o Formulario da home (form-card claro como único destaque sólido; campos de 48px, raio 8) com os campos do contato. À esquerda, 'Vamos conversar?' e 'a gente responde em até 24h' como destaque tipográfico, com o e-mail direto em link. Hero e formulário na mesma dobra, sobre a cena no quadro 'formulario' (horizonte baixo), com colunas centralizadas como a chamada de contato da home. Um só botão de conversão: 'Enviar →'.
- **Página de contato (seleção de interesse no formulário)** — 135 · "Every project starts with a plan" (formulário dividido) https://br.pinterest.com/pin/800022321353362779/: Chips para escolher o tema e campos só com a linha de base. Ao lado, o painel de quem vai responder. Adaptação: O select 'Qual o seu interesse?', de três opções (e 'Área de interesse' no Faça Parte), vira um grupo de chips (radio) com raio 8, grafite sobre o cartão claro, marcado em grafite cheio. Sem amarelo e sem pílula de 999px. O painel da pessoa só entra com foto e nome aprovados.
- **Informações institucionais e sede (Contato: endereço, e-mail, CNPJ, horário, redes; Faça Parte: 'Onde a mágica acontece')** — 201 · Nenya https://br.pinterest.com/pin/700098704620779659/: Foto de interior em luz baixa com o botão encaixado num entalhe da borda de baixo, e fatos numa grade 2×2. Adaptação: Grade 2×2 em vidro sem contorno com Endereço, E-mail, Horário e CNPJ/Redes: rótulo de 12px em caixa alta cinza e valor em papel 16px. Quando houver foto aprovada, ela entra em moldura de raio 12 nas colunas 7–12, um pouco dessaturada para o amarelo das paredes não dominar. No Faça Parte, o CTA 'Deixe seu currículo ↓' vai no entalhe da foto. Sem foto, fica só o bloco tipográfico.
- **Informações institucionais e sede (alternativa)** — 160 · Bloco (construtora, em português) https://br.pinterest.com/pin/800022321353311803/: Foto P&B de arquitetura, blocos em taupe e papel, e amarelo só em etiquetas pequenas. Adaptação: Endereço e sede como bloco de texto ao lado da foto P&B em moldura, quando ela existir. O amarelo aparece no máximo num ponto pequeno, nunca no fundo nem no bloco.
- **Faça Parte: os 4 valores (Liberdade, Autorresponsabilidade, Conexão, Evolução)** — 224 · VSIMDIM (vídeo) https://br.pinterest.com/pin/800022321353278571/: Lista de palavras grandes (LUNCH / WORK / REST) em que a ativa fica em tom cheio e as outras em cinza, com a imagem ao lado trocando. Adaptação: Palavras em Inter 200 de ~56–72px, sempre abaixo do h1. A ativa fica em papel 100% e as outras a ~35%. A frase do valor ativo aparece nas colunas 8–12 por fusão lenta (.6–.8s). Sem miniatura enquanto não houver foto do time atual. A troca acompanha a rolagem só com sticky nativo, sem trava. Com movimento reduzido, as quatro palavras aparecem com as frases. 'Autorresponsabilidade' precisa caber no celular (clamp + hyphens).
- **Faça Parte: os 4 valores (alternativa com preset da home)** — 10 · Scōtt fintech ("Send, Spend, Receive.") https://br.pinterest.com/pin/800022321353491601/: Cascata de verbos: as primeiras palavras em cinza fino e só a última em tom cheio. Adaptação: Mesma mecânica dos verbos da metodologia da home: 'Liberdade. Autorresponsabilidade. Conexão. Evolução.' em linhas, uma acesa por vez em papel e as outras em cinza, com o texto do valor aceso ao lado. Sem cobre.
- **Faça Parte: cultura e time (GPTW, fotos e depoimentos da equipe)** — 190 · People Work, "Built to outlast the moment" https://br.pinterest.com/pin/700098704620752587/: Carrossel de retratos com o do centro em cor e os vizinhos em P&B, citação curta sobre a foto e setas discretas. Adaptação: Grafite no lugar do verde. Retratos em moldura de raio 12, até ~820px. Troca amortecida de ~900ms, com setas de vidro. Enquanto não houver fotos, a dobra GPTW fica só tipográfica (texto de apoio + manifesto).
- **Faça Parte: selo GPTW (alternativa)** — 206 · Factorive https://br.pinterest.com/pin/700098704620781841/: Selo em vidro escuro no canto da foto, e frase-manifesto grande ao lado de um rótulo pequeno. Adaptação: O selo GPTW (arquivo oficial, se o uso for autorizado) vai pequeno, num vidro escuro, no canto da foto do time ou ao lado do título. 'Não é só um selo. É como a gente opera todo dia.' vira manifesto em papel. Sem amarelo.
- **404** — 213 · Manual MakeReign (grade de páginas) https://br.pinterest.com/pin/700098704620782393/: Um numeral gigante sozinho numa página quase vazia. Adaptação: Base2 com a cena num quadro calmo, o do convite. '404' em Inter 200 enorme em cinza a ~10–15%, nunca amarelo, porque é número grande. Título e lead como estão. Um botão papel 'Voltar para a home' e 'Falar com a gente' como link secundário, para ter um só botão de conversão. Cabeçalho e rodapé completos.
- **404 (alternativa)** — 221 · EVS, construtora https://br.pinterest.com/pin/800022321353278619/: Número vazado e gigante, cortado pela borda da tela, como marca-d'água. Adaptação: '404' vazado, com contorno de 1px em papel a ~6%, cortado pela borda direita atrás do texto. O texto fica à esquerda em Inter 300 branca, nunca amarela.
- **Transição entre páginas (home para as internas e entre elas)** — 165 · Exo Ape via details.so (vídeo) https://br.pinterest.com/pin/800022321353295858/: A página nova sobe de baixo como uma folha, a antiga sobe mais devagar e escurece, e o título entra depois. Adaptação: @view-transition { navigation: auto } entre documentos, sem ClientRouter e sem biblioteca. Saída em translateY(-12vh) com opacity .35; entrada a partir de 100vh; 1s com cubic-bezier(.65,0,.35,1). O canvas da cena recebe view-transition-name: fundo, para o fundo não trocar. O H1 da página nova entra como bloco (12px→0) depois de 350ms. Com movimento reduzido, sem animação ou fade de 200ms. Sem preloader e sem cortina colorida.
- **Transição entre páginas (alternativa)** — 27 · CoffeeTech (o 90 é o mesmo) https://br.pinterest.com/pin/800022321353475363/: Janela retangular que abre do centro-baixo até cobrir a tela. Adaptação: clip-path de inset(42% 34% 42% 34%) até inset(0) em ~1s, com ease-out forte. Sem título em marquee e sem o botão laranja.


## Anexo — decisões anteriores da Lenora

Decisões e reprovações da Lenora que valem para as internas:
- **25/09, regra do projeto (AGENTS.md):** alto padrão, menos é mais; amarelo é detalhe; transições suaves; nada de cara de agência. Os fundos de partículas douradas e de superfície com reflexo foram reprovados por amarelo demais ("ainda não tá a cara da Renke"). O letreiro "tem que correr, acho massa".
- **26/09, rodada 1:** reprovou o desfoque que segue o mouse.
- **26/09, rodada 2, reprovada inteira ("não gostei do que você construiu"):** incluía a coluna presa da metodologia, os pilares empilhados (Lama Lama), os resultados sem contagem e a foto que cresce no Conheça a Renke.
- **26/09, rodada 3, pedidos e aprovações:**
  - o fundo tem de ser extraído fielmente da PeachWeb curious ("é o caminho"; virou a cena em fundo-cena.ts);
  - caixas translúcidas no padrão .vidro (branco a 7%, blur 28, raio 12);
  - seção Features para os pilares e Solutions para a operação estruturada;
  - textura do palco retirada;
  - fotos nunca além de ~820px, sempre em moldura.
- **26/09, retornos da tarde:**
  - metodologia com diagrama: "ficou uma merda". Virou painel com três verbos grandes, um aceso por vez, e vídeo ao lado;
  - pilares: "deveria ter feito como a seção Features". Viraram cabeça centrada e cards;
  - Conheça a Renke: "horrível", "tira, depois vemos". Saiu da página;
  - Resultados: "tenebroso, volte como era";
  - Ecossistema: pediu forma mais dinâmica.
- **26/09, refinamento aprovado como base atual:**
  - abertura restaurada com retratos;
  - metodologia com título light, vídeo à direita e indicadores com contagem de 1,8 s;
  - rótulos numerados das seções removidos;
  - pilares em 3+2 com artes próprias (ArtePilar);
  - Movetrans (acordeão) trocado por cards, com todos os textos visíveis;
  - ganhos na composição Solutions: título fixo e cards pretos sem contorno com ilustração;
  - Resultados em mosaico assimétrico estático;
  - Academy e Tools numa caixa escura sólida com listas sempre visíveis; os mockups conceituais foram retirados e as áreas visuais ficaram vazias à espera de prints reais;
  - chamada de contato centralizada, sem numeral decorativo;
  - menu compacto com a assinatura Renke Studio e os rótulos originais, depois com a pílula que desliza entre os itens (último commit do branch).
- **26/09, 16h19, contornos decorativos removidos no site inteiro:** sem-contornos.css entra em Base e Base2 e inclui listas, FAQ, tabela antes/depois e campos do formulário.
- **Regras permanentes:**
  - layout compartilhado entre estúdio e copy;
  - não inventar depoimentos, números ou clientes;
  - um destaque sólido claro por tela, que é o form-card;
  - um botão de conversão por tela;
  - títulos à esquerda no grid de 12 colunas (os centralizados aprovados são a cabeça dos pilares, o convite e a chamada de contato);
  - raios 8 e 12.


## Anexo — descartes

A curadoria e a Lenora vetaram estas categorias:
- **Template de IA/SaaS, neon, cripto, lima em bloco, vidro laranja 3D e bento azul:** dá para tirar só a técnica, nunca a estética. Pins: 1, 4, 6, 8, 9, 14, 20, 22, 23, 26, 32, 37, 42, 45, 48, 49, 53, 58, 66, 75, 78, 85, 92, 93, 94, 99, 106, 129, 144, 149, 150, 153, 156, 178, 189, 225, 238, 239, 245, 247, 249, 254, 262 e 264.
- **Amarelo em bloco ou cara de agência:** 137, 138, 142, 174, 193, 194, 222 e 223.
- **Amarelo fora da lista fechada:** vale só #FFD103, em pontos escolhidos (filete de 40×1px, número ou marcador do item ativo, foco, hover do menu). No máximo um ponto por tela em repouso. Nunca em fundo, cartão, pílula, número grande, símbolo grande, texto sobre fundo claro ou linha de H1: o `realce` amarelo das internas fere essa regra.
- **Contador animado:** vetado no doc. A única exceção aberta pela Lenora é a contagem de 1,8 s, uma vez só, nos indicadores da metodologia da home. O mosaico de Resultados ficou estático, e nas internas os números ficam estáticos.
- **Texto palavra a palavra:** vetado no doc, com títulos entrando como bloco. A tinta palavra a palavra só sobrevive no título da operação estruturada da home, versão estúdio, a partir de um print da Lenora. Não estender às internas.
- **Letras e tipo:** letras separadas ou tracking animado, digitação, embaralhamento, texto em degradê e título em marquee.
- **Travas JS:** nenhuma trava nova além das que já existem (palco dos planos no estúdio e trilho dos Planos na copy; a esteira do Sobre saiu da página). Também ficam fora snap, sequestro da roda do mouse e bibliotecas de rolagem suave. `position: sticky` com rolagem nativa é permitido.
- **Mouse e cursor:** desfoque ou foco seguindo o mouse (reprovado na rodada 1), cursor próprio, botão magnético, hover que gira ou desliza.
- **Fundo:** partículas, pontos, anéis de pontos, esferas, vórtice, túnel, grade ou linhas ligando pontos, bloom, neon, glitch, vídeo de fundo e cor na luz.
- **Diagrama de nós:** reprovado na metodologia ("ficou uma merda").
- **Conteúdo escondido:** acordeão que esconde texto (o Movetrans foi trocado por cards Features) e produtos que escondem conteúdo no hover.
- **Contornos:** grade à vista (retirada em 20/09) e contornos decorativos, removidos em 26/09 por sem-contornos.css. O mesmo arquivo zerou os fios de lista (.faq__item, .antes-depois th/td, .reconhece__item, .etapas__fechamento), então as adaptações usam espaço, tom e vidro no lugar do fio de 1px.
- **Fotos:** foto em tela cheia ou ampliada além do arquivo (vira "baixa qualidade"; o limite é ~820px de CSS, sempre em moldura), slot vazio de foto e retrato placeholder.
- **Rótulos:** rótulos numerados auxiliares de seção (removidos) e caixa alta fora do rótulo de 12px (um por dobra).
- **Formas vetadas:** pílulas de 999px, "✦", selo "novo", sombra externa pesada, borda acima de 1px, raio acima de 12px, branco #FFFFFF chapado e serifa ou itálico serifado.
- **Página:** mais de um destaque sólido claro na parte escura (o único é o cartão do formulário) e mais de um botão de conversão por tela.
- **Tudo do palco dos planos Revena, excluído pelo pedido da Lenora:** PlanosPalco.astro, Planos.astro, ícones plano-*.svg usados como elemento de palco, fundos de traços de scripts/gerar-fundos-palco.py, mapa isométrico do Cielo (109), disco com setor aceso (182), máscara 165 na troca de plano, cortina e snap do palco.
- **Copy e dados:** copy nova sem aprovação (manifesto "sistema conectado", verbete RevOps do 192), e depoimentos, números, logos ou clientes inventados. Também ficam fora os mockups de produto conceituais: as áreas visuais de Academy e Tools foram esvaziadas em 26/09.