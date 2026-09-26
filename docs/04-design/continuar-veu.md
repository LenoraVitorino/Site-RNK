# Continuar: véu de luz no laboratório

Roteiro deixado em 25/09/2026 para a próxima sessão, que pode ser pelo app do
celular. Quando a Lenora disser "ok continue" (ou algo parecido), execute os
passos abaixo a partir do primeiro que não estiver marcado como feito. Ao
concluir um passo, marque `[x]` neste arquivo, no mesmo commit.

## Contexto que a sessão nova precisa ter

- **Quem pede**: a Lenora, designer e dona do projeto. Responda sempre em
  português, com acentuação correta, de forma curta e direta.
- **Regra de desenvolvimento** (está no `AGENTS.md`): alto padrão, menos é
  mais, amarelo é detalhe, transições suaves, nada com cara de agência. Toda
  mudança visual passa por esse filtro.
- **Direção aprovada para estudo**: `docs/04-design/referencias-alto-padrao.md`.
  Leia as seções 4 a 7 e 11 antes de começar.
- **Branch e PR**: tudo na branch `ajustes-layout-2`, PR #4 de
  `LenoraVitorino/Site-RNK`. Cada ajuste vira commit e push nessa mesma
  branch. Antes de começar, rode `git fetch` e `git pull --ff-only`: outra
  pessoa (ysesaantos) também commita nela.
- **Commits**: mensagem em português, primeira linha curta ("Laboratório: ...",
  "Docs: ..."), corpo explicando o porquê.
- **Duas versões de copy** (`AGENTS.md`): toda mudança de layout vale para as
  duas. Sempre rode os dois builds:
  `npm run build` e `VERSAO=copy npx astro build --outDir dist-copy`.
- **A home (`src/pages/index.astro`) não muda nesta etapa.** As mudanças da
  seção 9 do documento esperam o aval dela. Tudo acontece no laboratório.
- **O que ela já decidiu**:
  - o letreiro continua correndo ("acho massa");
  - os fundos de partículas e superfície foram reprovados (amarelo demais);
  - a dinâmica agradou: fundo fixo que acompanha as dobras, cartões de
    vidro, dobras claras subindo como cortina.
- **Inspecionar o fundo sem animação**: em navegador embutido ou headless,
  o `requestAnimationFrame` pode não rodar. No dev há o gancho
  `window.__fundo`:
  - `assentar()` pinta até o fundo parar no quadro da dobra;
  - `roteiro()` mostra as dobras medidas;
  - `quadros` permite ajustar valores ao vivo.

## O que já está pronto

- `src/components/laboratorio/fundo-motor.ts` é o motor comum. Aceita
  configuração por fundo (roteiro, textos, cartões, amortecimento, curva,
  salto, entrada) e deixa o fundo fosco atrás dos cartões.
- `src/components/laboratorio/fundo-veu.ts` é o véu de luz cor de pérola,
  já escrito com os quadros da seção 5. **Ainda não está ligado a nenhuma
  página e nunca foi visto.**

## Passos

- [x] **1. Corrigir o documento: o letreiro continua correndo.** Em
  `referencias-alto-padrao.md`:
  - troque a "linha de métricas" pelo letreiro que corre, como está hoje, nas
    seções 5 (linha 4 da tabela e quadro `metricas`, que passa a se chamar
    `letreiro`), 7 (remova o bloco "Linha de métricas"), 9 (item 5) e 11
    (roteiro);
  - na seção 10, tire "letreiro correndo" da lista do que não fazer;
  - registre a decisão dela, de 25/09.

- [x] **2. Página `/laboratorio/veu`.**
  - Crie `src/pages/laboratorio/veu.astro` a partir de
    `src/pages/laboratorio/fundo.astro`:
    - mesmas dobras;
    - `noindex`;
    - `classe="laboratorio-veu"`;
    - sem o seletor de fundos.
  - Em `src/components/laboratorio/FundoVivo.astro`, aceite a prop
    `fundo` (`'veu'`, `'particulas'` ou `'superficie'`), com prioridade sobre
    o `?fundo=`, e importe `./fundo-veu` quando for `'veu'`. A página
    `/laboratorio/fundo` precisa continuar como está.
  - Estilos da página, todos presos a `body.laboratorio-veu`, seguindo a
    seção 7 do documento:
    - **Dobras transparentes**: hero, `#o-que-fazemos`, `#pilares-revena`
      (e `#protocolo-revena.pilares` na copy), `.letreiro`, `#perguntas`,
      `#fale`, `#academy-tools`, `#sobre` e `#formulario`. A `.hero__fundo`
      é escondida.
    - **Vidro nos `.pilar-card`**: fundo `rgb(12 12 11 / .74)`, fio de 1 px
      a `.10`, raio de 12 px e brilho interno a `.06`. **Sem**
      `backdrop-filter` e sem sombra externa, porque quem deixa o fundo
      fosco é o shader.
    - **Dobras claras em papel escovado** (`#resultados` e o palco dos
      planos): a receita `.dobra-clara` da seção 7. O símbolo gigante do
      palco vira relevo tom sobre tom (`.peca--papel` e `.peca--ouro` com
      `fill: rgb(22 22 22 / .06)`).
    - **Convite (`#fale`)**:
      - transparente e centralizado;
      - sem o "01" (`.chamada__numero`) e sem caixa alta no título;
      - filete amarelo de 40×1 px acima do título;
      - texto em cinza;
      - botão papel.
    - **Formulário**: seção transparente e cartão claro sólido, com a
      especificação da seção 7.
    - **Amarelo só como detalhe**:
      - ícones dos pilares em papel a `.85`;
      - números da metodologia em papel;
      - número das perguntas em cinza;
      - botão do cabeçalho secundário (vidro com fio, sem amarelo no hover);
      - selo da hero como linha de apoio de 13 px cinza, sem pílula e sem
        "✦";
      - círculo amarelo da arte da Academy neutro.
    - **O letreiro continua correndo**, sem mudança.
  - Confira a versão `VERSAO=copy` também. Ela usa `Planos` e a `.cortina`
    nas perguntas.

- [x] **3. Ver e ajustar o véu.**
  - Suba o dev (`npm run dev`) e abra `/laboratorio/veu` em 1440×900 e
    375×812.
  - Dobra por dobra, use `__fundo.assentar()` e confira:
    - o véu é luz macia, não objeto;
    - nenhuma luz forte atrás de título;
    - no máximo um ponto amarelo por tela, além do monograma;
    - o texto sempre legível;
    - o vidro dos cartões lê como vidro fosco.
  - Ajuste os quadros no topo de `fundo-veu.ts` até ficar calmo e elegante.
    Na dúvida, menos.

- [x] **4. Builds, commit e push.** Rode os dois builds, faça um commit
  explicando o que ela vai ver e faça o push na `ajustes-layout-2`.

- [x] **5. Mostrar para ela pelo celular.**
  - O `localhost` não abre no celular, e o `npm run deploy` publica em
    produção, então **não use**.
  - Tente publicar o `/laboratorio/veu` como página hospedada (Artifact). O
    `scripts/artifact.mjs` já embute CSS, fontes e imagens, mas não os
    scripts de módulo, e o véu depende deles: gere um HTML único dessa
    página com o JS do véu empacotado junto (por exemplo, com o `esbuild`
    que já vem com o Astro).
  - Se não der no ambiente, diga isso a ela com clareza e combine de ver no
    Mac.

- [x] **6. Resumo para ela.** Curto, em português, contando:
  - o que ela vai ver e onde;
  - o que mudou em relação às partículas e à superfície;
  - o que ainda espera a decisão dela (seção 9 do documento).

  Pergunte se o véu vai para a home.

## Resultado (25/09/2026)

Todos os passos foram feitos.

- **A página**: `/laboratorio/veu`, pelo servidor local, ou o arquivo único
  gerado por `npm run laboratorio:unico` (`dist-unico/laboratorio-veu.html`,
  enviado a ela).
- **Revisão**: uma revisão independente confirmou 16 pontos, e todos foram
  corrigidos, entre eles:
  - a cortina das perguntas na copy;
  - a assinatura do rodapé;
  - o hover dos botões nas dobras claras;
  - o ícone da pilha no celular;
  - as trocas de quadro, que agora ficam escondidas atrás das dobras opacas;
  - o lado do tecido, que não troca mais no meio de uma passagem;
  - os retratos na máscara;
  - os hovers sem movimento.
- **Próximo passo**: a Lenora decide se o véu e os ajustes vão para a home.
  As mudanças da seção 9 do documento continuam esperando o aval dela.
