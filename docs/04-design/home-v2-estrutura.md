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
2. **Esteira** (`Esteira.astro`) — logo depois da hero, como a segunda
   dobra da referência: cinco colunas largas a partir da borda do
   container, sangrando pela direita, intercalando slots de foto e cartões
   com os números do briefing (⚠️ D1: ilustrativos). Parallax por coluna.
   `Faixa.astro` saiu da página (os números e os logos migraram para cá e
   para a hero).
3. **O que a Renke faz** (`OQueFaz.astro` + `Telefone.astro`) — texto +
   reel vertical, sem moldura de aparelho. Autoplay mudo ao entrar na tela,
   pausa ao sair; botão de som e de pausa; pausa manual é lembrada.
5. **Protocolos** (`Protocolos.astro`) — escada amarela com os 5 pilares do
   Protocolo Revena (texto no hover; sempre visível no toque) + linhas
   alternando foto/texto para Start, Core, Full, Scale e Run.
6. **Perguntas** (`Perguntas.astro`) — seção escura, 4 perguntas principais
   em grade 2×2 + 3 em linha.
7. **Resultados** (`Resultados.astro`) — extrato de números por
   especialidade (⚠️ D1) + dois depoimentos a coletar.
8. **CTA final** (`CtaFinal.astro`) — painel amarelo "Limitado a 1 nova
   clínica por mês" com dois slots de foto.
9. **Academy e Tools** (`AcademyTools.astro`) — dois cartões com slot de foto.
10. **Sobre** (`Sobre.astro`) — texto literal do briefing + três slots de foto.
11. **Formulário** (`Formulario.astro`) — mesmo formulário da v1 (envio ainda
    não ligado).

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
