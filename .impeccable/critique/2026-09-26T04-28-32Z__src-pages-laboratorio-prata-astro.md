---
target: /laboratorio/prata (dobras 2, 3, 5, 6, 7, menu e fundo)
total_score: 20
max_score: 32
na_heuristics: 7,10
p0_count: 1
p1_count: 2
target_identity: "file:/Users/lenoravitorino/Renke/src/pages/laboratorio/prata.astro"
target_fingerprint: "sha256:7979b69dc1cbf11fea0edbf33b5e7077361936d827660e52d1285cbf5c9f78d9"
target_path: /Users/lenoravitorino/Renke/src/pages/laboratorio/prata.astro
timestamp: 2026-09-26T04-28-32Z
slug: src-pages-laboratorio-prata-astro
---
Method: dual-agent (A: design review · B: detector + navegador)

## Nota das heurísticas (antes das correções desta rodada)

| # | Heurística | Nota | Ponto-chave |
|---|---|---|---|
| 1 | Visibilidade do status | 3 | Contador 01/05, mapa isométrico e barra de progresso ajudam; pilar 04 acendia com o texto sob a pilha (corrigido) |
| 2 | Linguagem do mundo real | 2 | Jargão (RevOps, lead, follow-up) e planos em inglês sem dizer para que momento servem |
| 3 | Controle e liberdade | 2 | Snap automático no palco, cabeçalho some ~4.000 px, dobra 6 avança sozinha |
| 4 | Consistência | 2 | Três ordens dos planos, dois H2 "Protocolo Revena", cinco rótulos para /contato |
| 5 | Prevenção de erros | 3 | Formulário com máscaras e select |
| 6 | Reconhecer em vez de lembrar | 2 | Planos um por tela, sem comparação |
| 7 | Flexibilidade | n/a | Landing page |
| 8 | Estética e minimalismo | 3 | Base neutra controlada; ruídos: legenda de Reels no vídeo, ícones genéricos, "em breve" |
| 9 | Recuperação de erros | 3 | Erros por campo e status do envio |
| 10 | Ajuda | n/a | Landing page (mas faltam respostas a objeções: preço, prazo, contrato) |
| **Total** | | **20/32** | **Aceitável (62%)** |

## Especificidade
Esqueleto autoral (anel prateado, hero que risca e troca, planos do caos à ordem, pilares que se empilham); acabamentos genéricos (legenda de Reels, ícones de linha de banco, "+ de 00", muitos "em breve"). Detector: CLI limpa (0 achados); no navegador, contraste baixo nas linhas apagadas dos Resultados (2,0–2,3:1), "01 / 05" a 4,3:1, cartão do celular com bordas encostando no texto, rótulos acima de títulos; falsos positivos: risco da hero, letreiro, H3 oculto do palco, overlay do próprio detector.

## Problemas prioritários
- [P0] Placeholders públicos: "+ de 00" com retratos vazios na hero; "em breve" no menu, no Tools e no rodapé.
- [P1] Arquitetura dos planos: ordem diferente no menu, no palco e na copy ("Scale: tudo do Core" com o Core depois); dois H2 "Protocolo Revena"; nenhum plano diz para que clínica serve.
- [P1] Legibilidade sacrificada ao efeito: frase das perguntas acendia atrás do cabeçalho; estados apagados abaixo de 3:1. (Corrigido nesta rodada.)
- [P2] Palco tira o controle: snap depois de 600 ms, cabeçalho oculto, proposta do plano a 16,5 px no canto.
- [P2] Acabamentos com cara de template: legenda de Reels no vídeo, ícones dos pilares, 7 itens na dobra 6, foto de salão com headsets (trocada), título clichê do formulário.

## Personas
Jordan: "+ de 00", RevOps só explicado na dobra 2, dois "Protocolo Revena". Riley: snap do palco contra a inércia do trackpad, breakpoints 900/1024/1080. Casey: "+ de 00" gigante, 7 cartões na dobra 6, página longa. Médico de alto padrão: vazios e "em breve", Academy/Tools para agências contradizendo "1 nova clínica por mês", resultados sem base ("29% de quê?"), sem depoimento de médico.

## Perguntas
1. A exclusividade ("1 nova clínica por mês") sobrevive à venda de Academy e Tools na mesma home?
2. O que o médico precisa ler no palco para dizer "o meu é o Run"?
3. O anel precisa aparecer em todas as dobras, ou só em três momentos (hero, pilares, convite)?
