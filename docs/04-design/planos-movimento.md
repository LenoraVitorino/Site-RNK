# Revena — diagramação e movimento

Referência analisada em 18/09/2026: https://www.tresmarescapital.com/en/, seção Financial solutions. Foram inspecionados o CSS público do tema e `js/app.min.js`, além do vídeo fornecido (34,137 s). Os arquivos externos foram usados para análise; não são dependências do site.

## Observações da referência

O palco fica preso por toda a sequência. O próximo conteúdo entra com recorte vertical de 100% a 0%, enquanto o anterior escurece. A imagem percorre 20% e as informações 30%; o título desaparece no primeiro quarto e aparece no último quarto da transição. O símbolo central usa uma timeline independente do recorte. No vídeo, entre 6 e 14 segundos, suas partes contraem e se reorganizam enquanto os fundos se alternam.

## Implementação Renke

Mantidos os cinco planos, as copys integradas do PR #2, a paleta e os SVGs oficiais. A estrutura de camadas e os intervalos de revelação seguem a referência. A transformação dos símbolos é uma adaptação às peças da Renke, com contração, deslocamento, rotação e sobreposição breve, sem um quadro vazio no centro. Não é o morph proprietário da Tresmares e não inclui suas fotografias botânicas.

Os textos laterais têm largura e tamanho mínimos para acomodar português; o título permanece em caixa alta conforme a direção atual da Renke. Ícones ampliados, nome em duas linhas, índice discreto e abertura centralizada. O acompanhamento da rolagem tem amortecimento de 90 ms; o encaixe após pausa é cancelado por um novo gesto. O cabeçalho continua oculto no último plano e retorna durante a saída.

A animação é habilitada somente a partir de 900 px e sem preferência por movimento reduzido. Nos demais casos, inclusive sem JavaScript, todos os planos aparecem em sequência. Planos inativos ficam fora da navegação por teclado somente durante o modo animado. Mudanças de breakpoint ou preferência desfazem esse estado.

## Verificação

- Build Astro: 16 páginas.
- Navegador: 1440 × 900, 1280 × 720 e 390 × 844; sem transbordamento horizontal. Inspeção dos planos, clique nas âncoras, transição intermediária e retorno de mobile para desktop.
- Teste de estado: cinco planos nos dois sentidos, símbolo contínuo no meio das quatro trocas, recorte vertical, links inativos, cabeçalho na saída e ativação/desativação do modo animado.
- Repetir o teste com `node scripts/test-planos-motion.mjs`.
