# Refinamento da home — 26/09/2026

## Base e alcance

Branch `codex/refinamento-home`, criada a partir de `ajustes-layout-2` (PR #4, commit `0ffe233`), com integração de `paginas/revena-protocolos` (PR #5). Os dois PRs estavam abertos, sem merge em `main` na consulta. O novo PR usa a branch do #4 como base para destacar o refinamento e a integração do #5, sem repetir toda a construção anterior da home.

A pasta privada Renke foi acessada pela sessão autenticada no navegador. Ela mostrava **266 pins**, incluindo a referência Zenith adicionada depois do inventário de 265 pins do PR #4. O feed foi percorrido até o final e comparado com as quatro tabelas da curadoria existente. Essa foi uma nova leitura da composição visual; não uma nova análise quadro a quadro dos vídeos. Os três links curtos enviados foram abertos individualmente, assim como os sites PeachWeb e Alukaze.

Documentos e comentários anteriores foram usados como contexto da evolução do projeto. A solicitação atual orienta esta rodada de refinamento. O arquivo `AGENTS.md` mantém o layout compartilhado entre as versões `estudio` e `copy`.

## Diagnóstico

A home anterior acumulava soluções de rodadas diferentes: painel de metodologia, grade de seis células, cinco telas de planos, outra pilha de cartões, resultados em linhas e produtos que escondiam seu conteúdo no hover. A repetição de grandes blocos escuros diluía a hierarquia. Havia movimento, mas pouca relação entre o gesto do visitante e o que ele aprendia sobre a Renke.

A mudança dá uma função a cada composição: apresentação ampla, método com vídeo e provas, cards ilustrados dos pilares, palco dos planos, ganhos em uma coluna de cards, mosaico de resultados e duas portas para o ecossistema. Os textos e indicadores existentes continuam nas respectivas fontes, com as diferenças de copy preservadas.

## Curadoria aplicada

| Referência | Leitura desta rodada | Aplicação |
| --- | --- | --- |
| [Alukaze / Halo Lab](https://alukaze-aluminum.webflow.io/) | Tipografia fina, grandes intervalos, composição deslocada e acento amarelo pontual. O ambiente escuro precisa de hierarquia, não apenas de efeitos. | Abertura com composição ampla, índice de navegação, títulos e rótulos em eixos distintos. |
| [PeachWeb](https://curious-mepp4bd.peachweb.site/) | A cena dá continuidade entre capítulos; copiar a grade inteira de features tornaria a home repetitiva. | A home usa **fundo="cena"**, com a animação Peachweb já incorporada à base. A abertura recupera a estrutura anterior ao refinamento. Features orienta a grade dos cinco pilares; Solutions orienta o título fixo ao lado dos ganhos ilustrados. |
| [Zenith](https://br.pinterest.com/pin/800022321353544071/) / anexo 3 | Um campo visual dominante com conteúdo organizado em poucas camadas. | Respiro da abertura; mantida a identidade neutra da Renke, sem o azul do template. |
| [Movetrans](https://br.pinterest.com/pin/800022321353454717/) | Linhas expansíveis permitem reconhecer o conjunto antes de ler os detalhes. | O accordion desta exploração foi substituído, a pedido da Lenora, pelos cards de Features. Todos os textos agora ficam visíveis. |
| [robot.com](https://br.pinterest.com/pin/800022321353472301/) / anexo 1 | A assimetria faz um indicador liderar a leitura e cria contraste sem precisar animar os números. | Mosaico claro: um resultado grafite ocupa duas linhas, quatro resultados complementares formam o restante. Valores estáticos, sem contagem a partir de zero. |
| [Nó central](https://br.pinterest.com/pin/800022321353534530/) / anexo 2 | A conexão comunica integração melhor quando tem um lugar específico na narrativa. | SVG original de Tools: Renke conecta marketing, comercial, operação, CRM, dados e automação. Pulso só em hover/foco; estático com movimento reduzido. |
| [Cascade](https://br.pinterest.com/pin/800022321353387822/) | Duas frentes precisam ser reconhecidas juntas. | Academy e Tools em painéis de igual largura, com listas sempre visíveis e acessíveis. |
| [Orbital](https://br.pinterest.com/pin/800022321353311723/) e [Apollo](https://br.pinterest.com/pin/800022321353294716/) | Prova em números finos, com rótulos curtos e bastante espaço. | Régua de métricas da metodologia e escala dos resultados. |
| [MyDNA / Levi Wilson](https://br.pinterest.com/pin/565342559489687187/) — `7p6IVjCea` | Recortes técnicos, informação organizada e movimento que apresenta uma peça por vez. | A hierarquia gráfica ajuda a leitura dos cards, com ilustrações vetoriais próprias de interfaces em vidro e cinza. |
| [Vivid Motion](https://br.pinterest.com/pin/939070959829684781/) — `7DFqxriEK` | Objetos de metal/vidro podem dar acabamento, mas competem quando cada cartão tem um espetáculo próprio. | Prata concentrada na cena existente; descartada a multiplicação de objetos 3D por cartão. |
| [AI solutions / Pascal Engelmann](https://br.pinterest.com/pin/681380618665961517/) — `6TCC8uiMS` | Uma peça dominante e células menores criam hierarquia. | Assimetria do mosaico; excluídos o laranja e as ilustrações de produto alheias à Renke. |

## Decisões de implementação — ajustes pedidos pela Lenora

- Abertura recuperada da versão `49123ae`, com selo arredondado no topo, seis espaços circulares para fotos e a legenda “Doutores que confiam na gente”. O bloco aparece mesmo enquanto as fotos aguardam inserção; a contagem só aparece quando preenchida em `src/data/doutores.ts`. Sem índice numerado, com a cena Peachweb preservada.
- Segunda dobra baseada na referência enviada “Crafting ideas that inspire”: título grande em duas linhas no alto à esquerda, apresentação e três indicadores na base da coluna, vídeo vertical ampliado à direita. Título “O que a Renke faz” no estúdio e “Nossa metodologia” na copy. Mantidos o grid global, a cena Peachweb e os valores de cada versão, sem contornos nem legenda abaixo do vídeo. No celular, título, texto e números precedem o vídeo; o parágrafo quebra naturalmente conforme a largura.
- Removidos os rótulos auxiliares numerados das seções.
- Cinco pilares com três cards na primeira linha e dois mais largos na segunda, seguindo a nova referência de interfaces escuras enviada pela Lenora; duas colunas no tablet e uma no celular. As duas versões preservam seus textos próprios.
- Artes próprias em `ArtePilar.astro`, com planos inclinados, profundidade discreta, cinzas neutros e amarelo pontual: jornada de marketing até consulta, CRM por etapas, confirmação/lembrete/follow-up, painel de decisão e diferenciação da clínica. As cenas são conceituais, sem números de resultado ou dados de pacientes inventados. O movimento responde apenas ao hover e respeita movimento reduzido.
- Na prática segue Solutions: título fixo no desktop, cards translúcidos ilustrados em uma coluna à direita. No celular, tudo segue o fluxo natural. Quatro ganhos no estúdio e sete na copy.
- Mosaico dos números preservado; o card de 19% ganhou uma ilustração de agenda com confirmação, relacionada ao agendamento.
- Academy/Tools fica dentro de uma única caixa escura sólida, envolvendo o título e os dois cards, com borda discreta e espaçamento responsivo. Conteúdo e links permanecem visíveis. Os cinco planos e sua ordem foram preservados.

- Contato com colunas centralizadas de até 400 e 460 px, intervalo máximo de 56 px; no celular, texto e formulário em sequência com 32 px de separação. A cena de fundo retoma o enquadramento e a iluminação da abertura, deixando a animação visível atrás da seção; a caixa dos campos permanece clara.

## Limites de conteúdo

Nenhum depoimento, retrato de cliente ou indicador novo foi inventado. As divergências históricas de números anotadas em `src/data/home.ts` continuam sendo pendências de conteúdo da base. As páginas ainda inexistentes de Tools permanecem sem links falsos. As imagens do Pinterest não foram copiadas para o site.

## Validação desta entrega

- `npm run build` e `VERSAO=copy npm run build -- --outDir dist-copy`: 21 páginas em cada build.
- `node scripts/test-planos-motion.mjs`: aprovado. O mock passou a representar o mapa de planos adicionado na base; a suíte agora também verifica seu estado ativo.
- `git diff --check`: aprovado.
- Auditoria do HTML das duas homes: IDs únicos, âncoras existentes, links internos e assets locais resolvidos.
- Navegador sobre os builds de produção: desktop de 1440 px, mobile de 390 px e verificação de overflow em 320 px; sem rolagem horizontal nas duas versões.
- Pilares com conteúdo permanentemente visível; cinco cards ilustrados nas duas versões.
- Menu mobile abre e fecha. Links da Academy permanecem visíveis. Copy original, cinco textos integrais dos pilares e sete ganhos confirmados.
- Cena Peachweb carregada no preview de produção (`data-fundo="cena"`, canvas visível), acompanhando a navegação entre as dobras.
- Console do preview de produção sem erros ou avisos. O build mantém o aviso de tamanho do chunk Three.js, carregado dinamicamente; esta entrega não mede Core Web Vitals em produção.
- Movimento reduzido: regras CSS/JS revisadas e fallback dos planos coberto pela suíte; não foi emulado visualmente no navegador desta sessão.
