# Home v2 — estrutura de dobras e o que veio de cada referência

Data: 11/09/2026. Direção visual aprovada (base clara, grafite, amarelo
`#FFE27A`, Instrument Sans, caixa alta nos títulos) aplicada na home.
Código: `src/pages/index.astro` → `src/layouts/Base2.astro` +
`src/components/home2/*` + `src/styles/home2.css`.

## Referências analisadas

| Referência | O que foi extraído | Onde entrou |
|---|---|---|
| metodobr.com (base principal) | Página em trilhos verticais finos; título gigante em caixa alta que ocupa a primeira dobra sozinho; segunda dobra com fotos do escritório em colunas que se movem com o scroll; blocos numerados; linhas alternando foto/texto; seção escura de perguntas; CTA em painel de cor | Trilhos (`.trilhos`), palco do título, esteira de fotos, escada numerada, linhas dos protocolos, seção Perguntas, CTA final |
| infinitepay.io/conta | Vídeo vertical dentro de moldura de celular, com autoplay silencioso ao entrar na tela e pausa ao sair; no mobile a moldura some e o vídeo ocupa a largura | `Telefone.astro` (dobra "O que a Renke faz") |
| Prints Consul / Opsitive / Vestora | Cards sem sombra, borda de 1px, cantos retos, muito respiro; rótulos pequenos em caixa alta com tracking; números grandes em "extrato" | `.rotulo`, `.cartao`, `.ledger`, faixa de números |

## Dobras (ordem na página)

1. **Palco** (`Hero.astro`) — hero escura e centralizada, em três tempos
   presos por ~1,6 telas de scroll (progresso em `--p`, 0→1):
   ao carregar, "Isso não é marketing para clínicas." com a seta para
   baixo; no scroll, a frase é riscada e some e "Isso é RevOps." entra
   suave, no amarelo original, com um reflexo de luz que vai e volta
   (gradiente recortado no texto, `background-position` animada — o
   mesmo efeito do AnimatedText/framer-motion usado como referência, em
   CSS); depois ele sai e, no lugar, entram título, subtítulo e CTA.
   Sem JS ou com `prefers-reduced-motion`, tudo nasce no estado final e o
   reflexo não roda.
   No pé da hero, a barra "Doutores que confiam na Renke" com os logos
   (placeholders), como a barra de parceiros da referência.
2. **O que a Renke faz** (`OQueFaz.astro` + `Telefone.astro`) — texto +
   reel vertical, sem moldura de aparelho. Autoplay mudo ao entrar na tela,
   pausa ao sair; botão de som e de pausa; pausa manual é lembrada.
   (`Esteira.astro`, o trilho de fotos e depoimentos, está fora da página
   por ora: volta quando houver fotos, depoimentos e logos reais.)
3. **Protocolo Revena** (`Protocolos.astro`) — no desenho da referência
   "Metafore": cabeçalho (rótulo em pílula, título, texto de apoio e botão
   escuro) e os cinco pilares em cartões, um aberto por vez. O aberto fica
   largo e mais alto, com uma imagem no topo (fundo fictício em
   `public/imagens/plano-fundo.svg` até chegarem as artes), ícone, título e
   texto; os fechados mostram só o número, o ícone e o título. Passar o
   mouse ou tocar abre. Grade fina ao fundo, esmaecendo. Ícones dos pilares
   provisórios (`public/icones/pilar-0N.svg`). No celular, cartões
   empilhados e abertos.
4. **Planos** (`Planos.astro`) — como a dobra "Selected work" do trionn.com,
   medida na referência: um trilho preso na tela. Primeiro só o título,
   centrado na metade esquerda; a página rola e os planos entram pela
   direita, um a um (Start, Run, Scale, Core, Full), cada um com metade da
   tela, imagem em 670×460 no alto e ícone oficial, nome, fala, texto e
   "Saiba mais" embaixo; fecha com o convite "Fale com a equipe" centrado.
   No último trecho do curso, a dobra seguinte entra pela direita por cima
   desta (`.cortina` em volta das Perguntas; `--curso`, `--x`, `--fim` e
   `--sobe` calculados no scroll). No celular, sem JS ou com movimento
   reduzido, tudo fica empilhado e a próxima dobra segue em fluxo.
5. **Perguntas** (`Perguntas.astro`) — seção escura, 4 perguntas principais
   em grade 2×2 + 3 em linha. Entra pela cortina dos planos mostrando só a
   frase-âncora; no scroll seguinte a frase sobe e as perguntas aparecem.
6. **Resultados** (`Resultados.astro`) — seção clara com o título em uma
   linha e um painel branco no desenho da tela da referência "Orbital":
   contato no topo, monograma à direita e uma linha por especialidade com
   rótulo, antes → depois e o número grande à direita (⚠️ D1). Os
   depoimentos ficam para a esteira, quando voltar.
7. **CTA final** (`CtaFinal.astro`) — painel amarelo "Limitado a 1 nova
   clínica por mês" com dois slots de foto.
8. **Academy e Tools** (`AcademyTools.astro`) — dois cartões com slot de foto.
9. **Sobre** (`Sobre.astro`) — texto literal do briefing + três slots de foto.
10. **Formulário** (`Formulario.astro`) — mesmo formulário da v1 (envio ainda
    não ligado).

## Preto absoluto (16/09/2026)

A página inteira é preta (`--fundo: #000`); os cinzas só criam camadas:
`--painel` (#0B0B0B) para faixas e o trilho dos planos, `--superficie`
(#111) para cartões e caixas. O papel (#F2F2EE) virou a cor do texto e do
botão principal (branco, grafite ao passar no amarelo). O amarelo segue só
nos detalhes: pílula, ícones, palavra destacada, o painel do CTA final (o
único bloco de cor, com texto grafite). Títulos na Inter em peso 260, mais
finos que light — sobre o preto o traço claro pede isso. Os ícones dos
planos usam a versão `-dark` e o fundo fictício dos cartões, a versão
`plano-fundo-escuro.svg`. A cortina das Perguntas ganhou um fio na borda
esquerda para a entrada ler sobre o preto.

Entre "O que a Renke faz" e o Protocolo Revena entra o **Letreiro**
(`Letreiro.astro`): as quatro palavras do Revena Full no briefing
(Controle, Automação, Processo, Experiência) em caixa alta, grandes,
separadas por um "+" fino, andando devagar, com o monograma apagado atrás
— como a faixa "Impact + Inspire + Innovate" da referência.

## Regras de acabamento (12/09/2026)

- **Amarelo original** (`--amarelo-marca` #FFD103, exposto como
  `--destaque`) só em detalhes que precisam chamar atenção: "Isso é
  RevOps." e seu reflexo, a seta da hero, o link "Fale com a gente", o
  hover do menu, os números e a palavra forte da seção Perguntas. As
  superfícies grandes continuam no amarelo pastel (`--amarelo`,
  `--amarelo-claro`).
- **Arredondamento mínimo**, no acabamento do símbolo "R": `--raio` 6px em
  botões, campos e chips; `--raio-caixa` 10px em cartões, slots de foto,
  painéis com borda (escada, extrato, perguntas, formulário, megamenu).
  Entre as dobras, tudo reto e sangrado, como na referência.

## Slots de imagem

`FotoSlot.astro` desenha um painel neutro com ícone de foto e um rótulo do
que deve entrar ali ("Foto · sede", "Foto · time"…). Na home há 17 slots.
Basta trocar o componente por `<img>` quando as fotos existirem — as
proporções já estão fixadas por `--prop`.

## O que ainda é da v1

As internas continuam em `Base.astro` + `site.css`/`pagina.css` (teste da
Helvetica). No arquivo único do artifact o CSS delas fica confinado às
rotas internas com `@scope`, para não pintar por cima da home; elas usam os
tokens novos e por isso aparecem numa mistura v1/v2 até migrarem.

## Verificação feita

- Sem overflow horizontal em 390, 768 e 1440.
- Um único `h1`; Instrument Sans 400/400i/500/600 carregadas.
- Vídeo: mp4 self-hosted, poster, `muted` + `playsinline`; autoplay via
  IntersectionObserver.
- Reveal (`.entra`) sem elementos presos no fim da página.
- Itens do menu sem página marcados como "em breve" (`nav--pendente`).
