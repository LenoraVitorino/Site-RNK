# Defesa da versão do estúdio

Registro vivo das decisões que afastam a versão do estúdio da copy
entregue, com o porquê de cada uma. É o material da apresentação final:
"isso é o que a copy entregou, isso é a nossa leitura". Regra em todas:
**nenhuma palavra nova** (com uma exceção assinalada); só corte de
palavras, rediagramação e ordem. Cada item aponta o arquivo onde a chave
`copyLiteral` guarda as duas versões.

## Copy

| Onde | Copy entregue | Versão do estúdio | Por quê |
|---|---|---|---|
| Hero · título (`Hero.astro`) | Revenue Operations estratégico para transformar clínicas médicas em negócios de alta performance. | Revenue Operations para transformar clínicas em negócios de alta performance. | Três linhas cheias na hero cansam antes da promessa chegar. Saem "estratégico" (adjetivo que não muda a promessa) e "médicas" (o site inteiro já fala de clínicas de saúde). Cabe em duas linhas de 1100 a 1920. |
| Hero · lead (`Hero.astro`) | Sua clínica fatura bem, mas você não sabe de onde vem cada real nem onde trava quando os números caem. Esse é o problema que resolvemos. Do anúncio ao retorno do paciente, tudo conectado, tudo rastreado. | Sua clínica fatura bem, mas não sabe de onde vem cada real nem onde trava. Esse é o problema que resolvemos. Do anúncio ao retorno do paciente, tudo conectado e rastreado. | Mais direto sem mudar o jeito de falar: saem "você" e "quando os números caem" (o "trava" já carrega a ideia). A repetição "tudo conectado, tudo rastreado" vira "tudo conectado e rastreado" — única palavra nova de toda a versão, o "e", porque "tudo conectado, rastreado" soa quebrado. |
| Hero · lead — sugestão em aberto | Esse é o problema que resolvemos. | (cortar a frase) | Repete o que o título promete acima e o que a frase seguinte entrega. Sem ela, o lead vira problema + solução, sem ponte. Não aplicado: é corte de frase inteira, decisão da Lenora. |
| O que a Renke faz (`OQueFaz.astro`) | Título + parágrafo à esquerda, reel vertical à direita | Igual à copy | Testamos só o reel centrado (o vídeo já diz "O que a Renke faz?") e o reel num palco 16:9 com o fundo desfocado; voltamos ao texto à esquerda com o vertical, que ficou melhor. |
| Perguntas · frase-âncora (`Perguntas.astro`) | Clinicamente, você sabe exatamente o que está acontecendo com seu paciente. Mas e com o seu negócio? | Você sabe o que está acontecendo com seu paciente. Mas e com a sua clínica? | Saem "Clinicamente," e "exatamente". O fecho troca "negócio" por "clínica" para falar no nicho da Renke, que é saúde — decisão da Lenora (16/09). É a única troca de palavra da versão. |

## Layout e ritmo

| Decisão | Por quê |
|---|---|
| Preto absoluto como base; amarelo só em detalhes de fundo (pílula, número dos planos, painel do botão da hero, CTA final) | Ar de premium e high ticket. A paleta do rebrand é preto e amarelo; o site anterior tinha ido para uma linha clara parecida demais com a referência metodobr. |
| Uma família tipográfica só (Inter), títulos finos em 260, corpo 400, destaques 500 | O site tem muito texto: uma família leve e minimalista dá o ar delicado e reduz ruído. A Instrument Sans saiu. |
| Grid de ponta a ponta (container de 1760px, respiro só nas laterais), títulos de dobra grandes, trilhos laterais removidos | Margem centralizada com muito respiro "parece feito com IA". A diagramação ocupando a tela é mais moderna e sofisticada. |
| Hero: cena de abertura mais ágil (1,9 s + 1,5 s + 1,4 s) | A cena "Isso não é marketing / Isso é RevOps" estava engessada; o visitante precisa chegar à promessa rápido. |
| Hero com mais ar: título no corpo das outras dobras, mais espaço entre título, lead e botão, container mais largo | Tudo estava amontoado e apertado, "cara de IA". O respiro prepara um fundo em movimento que entra depois. |
| CTA: botão simples (branco, cantos de 12px, hover suave para amarelo com leve subida) no lugar do botão de onda com chevrons | O botão de onda tinha ficado brega e datado. Um botão limpo é mais moderno e sofisticado; vale para a hero, os Resultados e o CTA final. |
| Hero: título com linhas equilibradas (`text-wrap: balance`) | Quando precisa quebrar em três linhas, o navegador reparte as palavras por igual, em vez de deixar "alta performance." sozinho numa linha curta (o efeito "pirâmide"). |
| Letreiro "Controle + Automação + Processo + Experiência" | Detalhe da referência que a Lenora gostou (faixa de letras grandes). As palavras são as quatro do Revena Full no briefing. Sem o monograma atrás: distorcia. |
| Protocolo Revena em cartões (um aberto, os outros com número, ícone e título) | Referência "Metafore": cinco pilares numa linha só, com hierarquia clara e sem cinco blocos iguais de texto. |
| Planos em trilho horizontal preso na tela, com cortina para as Perguntas | Referência trionn.com: título primeiro, planos entram um a um no scroll, e a próxima dobra entra pela direita — as Perguntas mostram só a frase, depois sobem e revelam os cards. |
| Resultados como extrato de ponta a ponta (número gigante em amarelo à esquerda, especialidade e antes → depois à direita) | Referência Alphamark: os dados viram o protagonista; fios de borda a borda da tela. |
| Sobre fora da home | A home fica mais curta e direta; a copy do Sobre segue para a página /sobre (decisão da Lenora, 16/09). O desenho com declaração grande e "Nossos números" em carrossel fica guardado em `Sobre.astro`. |
| Perguntas: cards em até duas linhas | Medida de texto alargada para o grid novo; a copy não mudou. |

## Pendências que a defesa deve mencionar

- Números placeholder (⚠️ D1) e o conflito "~30 clínicas" × "mais de 140 clínicas".
- Fotos, depoimentos e logos das clínicas ainda são espaços reservados.
- Ícones oficiais dos pilares (os cinco atuais são provisórios).
- Artes para o topo dos cartões (o fundo de linhas é fictício).
