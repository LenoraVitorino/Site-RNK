# Revena — diagramação e movimento

Referência analisada em 18/09/2026: https://www.tresmarescapital.com/en/, seção Financial solutions. Foram inspecionados o CSS público do tema e `js/app.min.js`, além do vídeo fornecido (34,137 s). Os arquivos externos foram usados para análise; não são dependências do site.

## Observações da referência

O palco fica preso por toda a sequência. O próximo conteúdo entra com recorte vertical de 100% a 0%, enquanto o anterior escurece. A imagem percorre 20% e as informações 30%; o título desaparece no primeiro quarto e aparece no último quarto da transição. O símbolo central usa uma timeline independente do recorte. No vídeo, entre 6 e 14 segundos, suas partes contraem e se reorganizam enquanto os fundos se alternam.

## Implementação Renke — revisão de 19/09/2026

A revisão segue o print e as direções de montagem descritas pela Lenora. Cada artigo contém seu fundo, símbolo, nome e informações. A próxima dobra sobe inteira de `translateY(100%)` a `translateY(0)`, carregando fundo, símbolo e textos juntos. Não há `clip-path` nem máscara de revelação. Cada painel é opaco e contém o próprio conteúdo, sem vazamento na borda. A dobra anterior permanece estática e recebe `brightness(1 → 0.42)`, sem diminuir, girar, dissolver ou desmontar o símbolo.

A montagem acontece perto do centro, com deslocamentos de 110 a 210 unidades no viewBox de 1080 (aproximadamente 80 a 160 px em desktop):

- Start: metade esquerda vem da diagonal inferior esquerda; metade direita da diagonal superior direita.
- Run: ambas da esquerda, com pequena diferença de distância.
- Scale: ambas de baixo, com pequena diferença de distância.
- Core: metades inferior e superior se encontram para formar o X.
- Full: metades superior e inferior se encontram no centro.

As peças chegam às coordenadas originais até 88% da entrada. Depois permanecem em repouso durante toda a saída. O primeiro símbolo se monta durante a chegada do palco. O movimento é reversível pelo scroll, sem morph entre planos.

Símbolos cerca de 9% menores. Nome em caixa normal, peso 450, tracking -0.07em, duas linhas desencontradas em uma largura de 46vw, aproximando a diagramação do print. As copys e a paleta Renke foram preservadas.

A animação é habilitada somente a partir de 900 px e sem preferência por movimento reduzido. Nos demais casos, inclusive sem JavaScript, todos os planos aparecem em sequência. Planos inativos ficam fora da navegação por teclado somente durante o modo animado.

## Verificação

Build Astro: 16 páginas. Teste de movimento com `node scripts/test-planos-motion.mjs`: cinco planos nos dois sentidos, direções das peças, retorno às coordenadas originais, símbolo/título/informações imóveis na saída, escurecimento, deslocamento integral sem máscara e hierarquia das camadas, links inativos, cabeçalho e mudança de breakpoint/preferência. Conferência visual em desktop e celular.
