# Refinamento da home — 26/09/2026

## Base e alcance

Branch `codex/refinamento-home`, criada a partir de `ajustes-layout-2` (PR #4, commit `0ffe233`), com integração de `paginas/revena-protocolos` (PR #5). Os dois PRs estavam abertos, sem merge em `main` na consulta. O novo PR usa a branch do #4 como base para destacar o refinamento e a integração do #5, sem repetir toda a construção anterior da home.

A pasta privada Renke foi acessada pela sessão autenticada no navegador. Ela mostrava **266 pins**, incluindo a referência Zenith adicionada depois do inventário de 265 pins do PR #4. O feed foi percorrido até o final e comparado com as quatro tabelas da curadoria existente. Essa foi uma nova leitura da composição visual; não uma nova análise quadro a quadro dos vídeos. Os três links curtos enviados foram abertos individualmente, assim como os sites PeachWeb e Alukaze.

Documentos e comentários anteriores foram usados como contexto da evolução do projeto. A solicitação atual orienta esta rodada de refinamento. O arquivo `AGENTS.md` mantém o layout compartilhado entre as versões `estudio` e `copy`.

## Diagnóstico

A home anterior acumulava soluções de rodadas diferentes: painel de metodologia, grade de seis células, cinco telas de planos, outra pilha de cartões, resultados em linhas e produtos que escondiam seu conteúdo no hover. A repetição de grandes blocos escuros diluía a hierarquia. Havia movimento, mas pouca relação entre o gesto do visitante e o que ele aprendia sobre a Renke.

A mudança dá uma função a cada composição: apresentação ampla, método com vídeo e provas, índice explorável dos pilares, palco dos planos, operação real com ganhos, mosaico de resultados e duas portas para o ecossistema. Os textos e indicadores existentes continuam nas respectivas fontes, com as diferenças de copy preservadas.

## Curadoria aplicada

| Referência | Leitura desta rodada | Aplicação |
| --- | --- | --- |
| [Alukaze / Halo Lab](https://alukaze-aluminum.webflow.io/) | Tipografia fina, grandes intervalos, composição deslocada e acento amarelo pontual. O ambiente escuro precisa de hierarquia, não apenas de efeitos. | Abertura com composição ampla, índice de navegação, títulos e rótulos em eixos distintos. |
| [PeachWeb](https://curious-mepp4bd.peachweb.site/) | A cena dá continuidade entre capítulos; copiar a grade inteira de features tornaria a home repetitiva. | Promoção do fundo **prata autoral já desenvolvido no PR #4** para a home. Não usa os modelos GLB da referência. Carrega após o conteúdo, com fallback estático. |
| [Zenith](https://br.pinterest.com/pin/800022321353544071/) / anexo 3 | Um campo visual dominante com conteúdo organizado em poucas camadas. | Respiro da abertura; mantida a identidade neutra da Renke, sem o azul do template. |
| [Movetrans](https://br.pinterest.com/pin/800022321353454717/) | Linhas expansíveis permitem reconhecer o conjunto antes de ler os detalhes. | Cinco pilares com `details/summary`, índice numérico e arte que acompanha a seleção. Funciona com teclado e sem JavaScript. |
| [robot.com](https://br.pinterest.com/pin/800022321353472301/) / anexo 1 | A assimetria faz um indicador liderar a leitura e cria contraste sem precisar animar os números. | Mosaico claro: um resultado grafite ocupa duas linhas, quatro resultados complementares formam o restante. Valores estáticos, sem contagem a partir de zero. |
| [Nó central](https://br.pinterest.com/pin/800022321353534530/) / anexo 2 | A conexão comunica integração melhor quando tem um lugar específico na narrativa. | SVG original de Tools: Renke conecta marketing, comercial, operação, CRM, dados e automação. Pulso só em hover/foco; estático com movimento reduzido. |
| [Cascade](https://br.pinterest.com/pin/800022321353387822/) | Duas frentes precisam ser reconhecidas juntas. | Academy e Tools em painéis de igual largura, com listas sempre visíveis e acessíveis. |
| [Orbital](https://br.pinterest.com/pin/800022321353311723/) e [Apollo](https://br.pinterest.com/pin/800022321353294716/) | Prova em números finos, com rótulos curtos e bastante espaço. | Régua de métricas da metodologia e escala dos resultados. |
| [MyDNA / Levi Wilson](https://br.pinterest.com/pin/565342559489687187/) — `7p6IVjCea` | Recortes técnicos, informação organizada e movimento que apresenta uma peça por vez. | Arte complementar única ao lado do índice dos pilares, sem importar a estética de laboratório clínico. |
| [Vivid Motion](https://br.pinterest.com/pin/939070959829684781/) — `7DFqxriEK` | Objetos de metal/vidro podem dar acabamento, mas competem quando cada cartão tem um espetáculo próprio. | Prata concentrada na cena existente; descartada a multiplicação de objetos 3D por cartão. |
| [AI solutions / Pascal Engelmann](https://br.pinterest.com/pin/681380618665961517/) — `6TCC8uiMS` | Uma peça dominante e células menores criam hierarquia. | Assimetria do mosaico; excluídos o laranja e as ilustrações de produto alheias à Renke. |

## Decisões de implementação

- Hero com índice de âncoras para método, planos e resultados; texto de apresentação e CTA têm áreas próprias.
- Metodologia sem caixa externa, vídeo com controles, verbos em hierarquia estável e três números em régua.
- Pilares em um índice expansível com apenas um item aberto; a arte tem transição suave. Em telas pequenas a lista ocupa toda a largura.
- Ganhos da operação ao lado de uma foto real, em vez de uma longa sequência de cartões. A copy integral mantém os sete ganhos.
- Resultados com contraste papel/grafite, sem fotos provisórias e sem números animados.
- Academy/Tools com conteúdo sempre exposto: nenhum link fica invisível dentro de um painel fechado.
- Convite e formulário em neutros, amarelo reservado aos detalhes.
- O palco dos cinco planos e sua ordem permanecem. Na versão copy, a seção seguinte entra em fluxo normal; o curso extra destinado à antiga cortina foi retirado.
- A seleção de cada pilar é HTML nativo. JavaScript só sincroniza a arte e garante exclusividade em navegadores antigos.

## Limites de conteúdo

Nenhum depoimento, retrato de cliente ou indicador novo foi inventado. As divergências históricas de números anotadas em `src/data/home.ts` continuam sendo pendências de conteúdo da base. As páginas ainda inexistentes de Tools permanecem sem links falsos. As imagens do Pinterest não foram copiadas para o site.

## Validação desta entrega

- `npm run build` e `VERSAO=copy npm run build -- --outDir dist-copy`: 21 páginas em cada build.
- `node scripts/test-planos-motion.mjs`: aprovado. O mock passou a representar o mapa de planos adicionado na base; a suíte agora também verifica seu estado ativo.
- `git diff --check`: aprovado.
- Auditoria do HTML das duas homes: IDs únicos, âncoras existentes, links internos e assets locais resolvidos.
- Navegador sobre os builds de produção: desktop de 1440 px, mobile de 390 px e verificação de overflow em 320 px; sem rolagem horizontal nas duas versões.
- Pilares por clique, toque e Enter: item selecionado, exclusividade e arte sincronizados.
- Menu mobile abre e fecha. Links da Academy permanecem visíveis. Copy original, cinco textos integrais dos pilares e sete ganhos confirmados.
- Fundo prateado carregado no build; composição estática também observada no servidor de desenvolvimento quando o import dinâmico falhou. O fallback não bloqueia conteúdo nem navegação.
- Console do preview de produção sem erros ou avisos. O build mantém o aviso de tamanho do chunk Three.js, carregado dinamicamente; esta entrega não mede Core Web Vitals em produção.
- Movimento reduzido: regras CSS/JS revisadas e fallback dos planos coberto pela suíte; não foi emulado visualmente no navegador desta sessão.
