# Legibilidade do site — medição e proposta

Documento de 01/10/2026. A Lenora achou o título e o texto dos tópicos
pequenos e pediu uma análise do site inteiro, "sem exagerar no tamanho".
Medição feita no navegador, em 1440 px e 390 px, na home, Sobre, Contato,
Faça Parte, Academy, um curso e dois planos do Studio.

## O que a medição mostra

O site não tem texto ilegível, mas tem um degrau grande demais: os títulos
de dobra têm 52 px e o texto logo abaixo dos tópicos tem 15 ou 16 px em
cinza. Em tela grande, o texto de leitura parece nota de rodapé.

| Grupo | Onde | Hoje (1440 px) | Proposta |
|---|---|---|---|
| Texto dos tópicos | Protocolo (5 cartões), "O que muda" (7), Ecossistema, cartões e etapas das internas | 15 ou 16 px, cinza | 16 a 18 px, crescendo com a tela (`clamp(16px, 1.25vw, 18px)`) |
| Título dos tópicos | Protocolo 26 px, internas 27 px, "O que muda" 35 px | três tamanhos | um só: `clamp(24px, 2.1vw, 32px)`; "O que muda" segue maior |
| Texto de apoio do formulário e do "Vagas limitadas" | home, Contato, Faça Parte | 16 px | 17 a 18 px |
| Rótulos dos campos do formulário | home, Contato, Faça Parte | 13 px | 14 px |
| Aviso do formulário e e-mail | idem | 12,5 px | 13,5 px |
| Âncoras dos planos (Revena Start, Run...) | palco dos planos | 12,2 px | 14 px |
| "Doutores que confiam na gente" | hero | 13 px | 14 px |
| Selo da hero | hero | 14 px | 15 px |
| Rodapé: títulos das colunas | todas | 12 px | 13 px |
| Rodapé: links e endereço | todas | 14 px | 15 px |
| Rodapé: direitos | todas | 13 px | 13 px (mantém) |
| Duração das etapas, legenda do antes e depois | planos do Studio | 12 px | 13,5 px |
| Itens da ficha "antes e depois" | planos do Studio | 14 px | 15 px |
| Legenda da régua de números | Contato | 14 px | 15 px |
| Botão "Conheça o curso" | Academy | 14 px | 15 px |

Ficam como estão: títulos de dobra (52 a 55 px), leads de abertura (20 a
22 px), textos da página Sobre (17 a 22 px) e perguntas frequentes (20 px).

## Contraste

Os cinzas de texto passam do mínimo, mas dois ficam no limite em corpo
pequeno: `#5a5a58` sobre o papel `#e7e7e5` (texto dos Resultados) e
`#50504e` no aviso do formulário. A proposta é escurecer um passo, para
`#4a4a48`, sempre que o corpo for menor que 18 px.

## Aplicado em 02/10/2026

A Lenora aprovou a tabela ("pode aplicar os tamanhos da tabela no site
inteiro pra ver"). Os dois tamanhos de tópico viraram tokens em
`src/styles/tokens-v2.css` (`--titulo-topico` e `--corpo-topico`), usados na
home (Protocolo, "O que muda", Ecossistema, Resultados) e nas internas
(cartões, produtos, etapas, painéis, antes e depois, perguntas). Os demais
itens da tabela foram ajustados um a um. Medição depois da mudança, em
1440 px: título de tópico 30 px, corpo 18 px, campos 14 px, aviso 13,5 px,
rodapé 13 e 16 px (os links do rodapé já herdavam 16 px de outra regra e
ficaram assim), âncoras do palco 14,4 px, legendas das etapas 13,5 px.

Na dobra de Resultados, além do tamanho: a linha é lida numa direção só
(número, depois especialidade e frase, depois a foto, sempre visível).
