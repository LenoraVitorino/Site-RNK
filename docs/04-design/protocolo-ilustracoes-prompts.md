# Prompts — ilustrações do bento "Protocolo Revena"

Documento de 01/10/2026. A Lenora pediu para reanalisar as referências do
bento, tirar a "estética de IA" das ilustrações e escrever um prompt
detalhado para cada cartão ilustrado. Os três prompts abaixo são a
especificação do que está em `src/components/home2/PilarConexoes.astro`,
`arte/pilares/Crm.astro` e `arte/pilares/Automacao.astro`.

---

## 1. Nova leitura das referências

| Referência | O que a deixa profissional | O que levamos |
|---|---|---|
| Maagic, "Security Hub" | Um núcleo com moldura dupla, fios curvos que chegam em portas marcadas e uma luz amarela pequena só nas junções. O fundo tem textura, mas quase invisível. | Núcleo com moldura, portas nos fios, amarelo como luz pontual. |
| Vercel, cartões de blog | Peças com luz vinda de cima (borda clara no alto, base escura), um único ponto colorido, setas e fios finos e precisos. | Material das peças: gradiente mínimo, fio que clareia no alto. |
| Plasmic, "SOC 2 / SSO / Permissions" | Recortes de interface de verdade, com texto real, que sangram pela borda e se apagam. Círculos concêntricos muito sutis dão profundidade. | Recorte de produto com microcopy real; anéis concêntricos discretos. |
| BZ House | Um elemento de destaque por cartão (a barra laranja, o ícone central) e todo o resto em grafite. | Um destaque só por cena. |
| Hack The Box (vermelho) | Luz atrás do elemento principal, linhas estruturais ao fundo, rótulos pequenos e nítidos. | Luz suave atrás do foco da cena. |
| Artone (bentogrids) | Cursor de colega com etiqueta amarela, cartão de fatura com um número em amarelo, botão amarelo isolado. | Cursor amarelo no CRM; amarelo em um ponto de conteúdo. |
| Nucleum (bentogrids) | Núcleo com anéis, etiquetas saindo dele; cartões alternam diagrama, gráfico e interface. | Variedade: cada cartão com um tipo de imagem (diagrama, quadro, mensagem). |

### O que lia como "IA" na versão anterior

- **Conexões:** pílulas só com texto, fios todos iguais, nada em destaque e
  nenhum volume. Um diagrama genérico, que serviria para qualquer empresa.
- **CRM:** os cartões do quadro ficaram vazios depois que os detalhes foram
  escondidos. Caixas vazias leem como esqueleto.
- **Automação:** uma lista cortada pela metade, sem começo nem fim.
- **Nas três:** tudo no mesmo cinza chapado, sem luz, sem hierarquia.

### Direção comum

1. **Conteúdo de clínica de verdade.** Procedimentos, canais, dia e hora. Sem
   métrica inventada e sem nome de paciente.
2. **Volume com luz, não com efeito.** Peças com gradiente mínimo de cima
   para baixo, fio que clareia no alto, sombra macia só no que flutua.
3. **Um destaque por cena, e ele é o amarelo.** Um visto, um ponto, o cursor.
   Brilho só como um halo pequeno e fraco atrás desse ponto.
4. **Três imagens diferentes.** Diagrama (conexões), quadro de produto (CRM)
   e mensagem (automação). Nada de três janelas iguais.
5. **Alinhamento.** Toda cena começa na linha do texto do cartão e ocupa a
   largura dele. Sem área vazia sobrando.
6. **Movimento.** Lento, com amortecimento, uma vez só ao entrar na tela;
   depois a cena descansa na pose final. Com movimento reduzido, a cena já
   aparece pronta.

---

## 2. Prompt — "Vamos além do tráfego pago"

> Subtítulo: "Conectamos marketing ao comercial para lead virar paciente de
> verdade."

**Papel.** Você é um designer de produto sênior desenhando, em SVG, um
diagrama para o site de uma assessoria de RevOps que atende clínicas de alto
padrão. O diagrama tem de explicar o subtítulo sem legenda.

**Ideia.** O lead entra pelo marketing, passa pela Renke e sai no comercial
como consulta marcada. O diagrama mostra esse caminho aceso.

**Composição (620 × 268).**
- À esquerda, sob o rótulo "Marketing", três origens em pílulas com ícone:
  Anúncios, Instagram e Google. Alinhadas à esquerda, na linha do texto do
  cartão.
- No centro, o núcleo: uma peça quadrada de cantos arredondados com o
  monograma da Renke, dentro de uma moldura um pouco maior.
- À direita, sob o rótulo "Comercial", três etapas: Atendimento, Agenda e
  Consulta. A coluna começa toda no mesmo eixo.
- Fios curvos ligam cada pílula ao núcleo. Cada fio nasce num ponto marcado
  na pílula e chega numa porta do núcleo; os três entram em leque curto.

**Material e luz.**
- Pílulas e núcleo com gradiente mínimo (#262626 → #191919) e fio que clareia
  no alto. O núcleo tem sombra macia embaixo.
- Atrás do núcleo, uma luz branca muito fraca e três contornos concêntricos
  quase invisíveis, que se apagam antes das pílulas.
- Fios de 1 px, mais claros perto do núcleo.

**Destaque.** Um caminho só fica aceso: Anúncios → Renke → Consulta. Esse fio
é mais claro e, ao chegar na Consulta, puxa para o amarelo. A pílula
"Consulta" ganha um visto amarelo com um halo pequeno e fraco. É o único
amarelo além do monograma.

**Movimento (uma vez, 5 s).** Uma luz curta percorre o fio de Anúncios até o
núcleo; a moldura do núcleo clareia por um instante; a luz segue até a
Consulta; o visto amarelo se desenha. Depois, tudo parado na pose final.

**Celular.** O diagrama fica em pé: origens em cima, núcleo no meio, etapas
embaixo, pílulas só com o nome.

**Não fazer.** Grade de pontos, anel amarelo decorativo, brilho neon, ícones
em caixinhas iguais, números inventados.

---

## 3. Prompt — "Implementamos um CRM"

> Subtítulo: "Processo, jornadas, scripts, time treinado e usando a
> ferramenta de verdade."

**Papel.** Você é um designer de produto desenhando o recorte de um quadro
de CRM real, em uso por uma recepcionista de clínica.

**Ideia.** A Recepção arrasta a "Harmonização" de "Em contato" para
"Agendado". É a ferramenta sendo usada de verdade.

**Composição (400 × 300, reta, sem perspectiva).**
- Uma janela que começa na linha do texto do cartão e sangra pela direita e
  por baixo, apagando-se nas bordas.
- Cabeçalho: "Pipeline" à esquerda; à direita, as iniciais de quem está no
  quadro (C de Comercial, R de Recepção).
- Três colunas: Em contato, Agendado, Atendido. Cada uma com o glifo de
  estado, o nome e a contagem de cartões.
- Cartões com conteúdo, não caixas vazias: o procedimento em cima; embaixo,
  o canal de origem (um ponto e o nome) e o quando. Linha de baixo em cinza
  discreto, para a cena continuar leve.

**Material e luz.** Janela com gradiente mínimo e uma luz fraca vinda do
alto à esquerda. Cartão arrastado com sombra macia.

**Destaque.** O cursor da Recepção, com a etiqueta amarela, e o anel amarelo
na inicial dela no cabeçalho. Nenhum outro amarelo.

**Movimento (uma vez, lento).** O cursor entra, pega o cartão, e a vaga de
destino aparece tracejada em "Agendado". O cartão viaja num arco leve,
assenta, ganha o visto e o horário "qui, 14:00". As contagens das colunas se
atualizam. Depois, pose final.

**Não fazer.** Perspectiva, cartões vazios, pílulas com contorno em toda
linha, métricas de desempenho.

---

## 4. Prompt — "Automatizamos o seu atendimento"

> Subtítulo: "Confirmação, lembrete, follow-up, NPS, avaliação do Google,
> anamnese..."

**Papel.** Você é um designer de produto mostrando uma automação de
atendimento no momento em que ela trabalha sozinha.

**Ideia.** O lembrete da consulta acabou de sair, sem ninguém apertar nada.
A cena mostra a mensagem e em que ponto da sequência ela está.

**Composição (348 × 130, estática).**
- Em cima, a mensagem enviada, num cartão flutuante que ocupa a largura do
  texto: ícone de conversa, "Lembrete", "WhatsApp" em cinza e "agora" à
  direita. No corpo, duas linhas: "Sua avaliação facial é amanhã, às 14:00."
  e "Podemos confirmar a sua presença?".
- Embaixo, a sequência em pílulas ligadas por um fio: Confirmação (feita,
  com visto cinza), Lembrete (a atual) e Pesquisa (a próxima, um tom abaixo).
  Depois dela o fio segue e se apaga na borda: a sequência continua.
- Um fio curto liga a mensagem à pílula "Lembrete".
- O fio da sequência é contínuo até a etapa atual e tracejado depois dela.

**Material e luz.** Mensagem com superfície elevada, fio claro no alto e
sombra macia. Pílulas no material das outras cenas.

**Destaque.** O visto duplo da mensagem em amarelo e o ponto amarelo da
pílula "Lembrete", com um halo pequeno e fraco. Nada mais.

**Movimento.** Nenhum. Esta cena fica parada para o bento não pesar.

**Não fazer.** Nome de paciente, lista cortada, interruptores decorativos,
cinco linhas com o mesmo peso.

---

## 5. Prompt — "Construímos seu posicionamento"

> Subtítulo: "Estudamos seus concorrentes a fundo: o que comunicam, onde
> investem, quais brechas deixam abertas."

Referência da Lenora: o convite de pesquisa do aplicativo Hevy, com um globo
pontilhado, retratos espalhados nele e um retrato maior no centro.

**Papel.** Você é um designer de produto desenhando o mercado de uma clínica
como um mapa: quem está em volta e onde ela se posiciona.

**Ideia.** O mercado é um globo de pontos. Os concorrentes estão espalhados
nele; a clínica do cliente fica no centro, maior, com nome.

**Composição (388 × 172, estática, sangra pelas laterais e por baixo).**
- A calota de um globo visto de frente, com o polo inclinado para trás: os
  paralelos de pontos acompanham a silhueta curva, como um horizonte.
- Seis concorrentes em círculos com as letras A a F. Sem rosto e sem nome.
  Os do fundo, perto do horizonte, são menores e mais escuros.
- No centro, a clínica: círculo maior, com moldura e uma cruz, e a etiqueta
  "Sua clínica" logo abaixo.

**Material e luz.** Pontos mais claros no alto do globo, apagando-se para os
lados e para a base. Um fio de luz na silhueta, forte no meio e nulo nas
pontas. Círculos com gradiente mínimo, fio que clareia no alto e sombra de
apoio.

**Destaque.** O ponto amarelo da etiqueta "Sua clínica", com halo pequeno.

**Movimento.** Nenhum.

**Não fazer.** Rostos, nomes de clínicas, linhas ligando os círculos, anéis
concêntricos vistos de cima (viram alvo).

---

## 6. Prompt — "Dizemos o que fazer todo mês" (cartão amarelo)

> Subtítulo: "Custo por agendamento. Taxa de comparecimento. Faturamento
> por canal."

Histórico: a Lenora reprovou a palavra "Decisão" ao fundo, as barras com a
etiqueta "Investir mais", os indicadores em linhas entre fios ("ficou
péssimo") e o mini painel com fundo grafite ("não quero fundo escuro, deixe
sem fundo, mais minimalista").

**Ideia.** Um gráfico mínimo, desenhado direto sobre o amarelo, com o dado
que a Renke acompanha todo mês.

**Composição (220 × 80, estática).** Sem fundo, sem moldura e sem título.
Duas linhas de quatro meses (jul a out) em grafite: uma forte, subindo, com
um ponto cheio no mês atual; outra mais clara, de apoio. Embaixo, a linha
de base e os meses em corpo pequeno, com o mês atual mais escuro.

**Destaque.** O próprio cartão já é o amarelo; o gráfico é todo em grafite.

**Não fazer.** Fundo escuro, números inventados, etiquetas de recomendação,
barras, área preenchida, mais de um gráfico.
