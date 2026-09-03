# Estrutura e copy — Site Renke Studio

Documento único com o mapa do site e a copy de todas as páginas escritas até aqui.
15 páginas, 106 seções.

> **Fonte:** briefing exportado do ClickUp em 15/08/2026, reorganizado em `docs/`.
> Gerado por `npm run docs:dossie` em 03/09/2026 — editar os arquivos de
> `docs/03-copy/` e rodar de novo, em vez de editar este arquivo.

## Como ler

- **Copy final** aparece em blocos de citação (`>`), transcrita literalmente do briefing.
- **Diretrizes** e notas de produção aparecem como texto normal ou em itálico — não são copy.
- **⚠️** marca pendência, placeholder ou decisão em aberto. Há 32 no documento.
- **Notas SEO** no fim de cada página trazem title, meta description e keyword-alvo.
- Caminhos entre crases (`docs/...`) apontam para outros arquivos do repositório.

## Índice

| Página | Rota | Seções | ⚠️ |
|---|---|---|---|
| [Home](#home) | `/` | 9 | 5 |
| [Revena Start](#revena-start) | `/revena-start` | 7 | 1 |
| [Revena Full](#revena-full) | `/revena-full` | 7 | 1 |
| [Revena Core](#revena-core) | `/revena-core` | 8 | 2 |
| [Revena Scale](#revena-scale) | `/revena-scale` | 9 | 4 |
| [Revena Run](#revena-run) | `/revena-run` | 7 | 1 |
| [Treinamento para Secretárias (Agendamento 10x)](#treinamento-para-secretarias-agendamento-10x) | `/treine-sua-equipe` | 7 | 1 |
| [Renke Academy](#renke-academy) | `/academy` | 7 | 1 |
| [Protocolo Renke](#protocolo-renke) | `/academy/protocolo-renke` | 6 | 3 |
| [Formação Performa](#formacao-performa) | `/academy/formacao-performa` | 6 | 1 |
| [Treinamento de CRM](#treinamento-de-crm) | `/academy/treinamento-crm` | 7 | 2 |
| [Rastreamento Avançado](#rastreamento-avancado) | `/academy/rastreamento-avancado` | 7 | 1 |
| [Cultura Pro](#cultura-pro) | `/academy/cultura-pro` | 9 | 1 |
| [Contato](#contato) | `/contato` | 4 | 3 |
| [Faça Parte](#faca-parte) | `/faca-parte` | 6 | 5 |

---

## Mapa do site

### Estrutura completa (conforme briefing)

```
renke.com.br/
│
├── Home (protagonista: Studio fala com clínicas)
│   ├── Headline + posicionamento ("Não somos agência...")
│   ├── Dor + diagnóstico (escada emocional)
│   ├── Visual jornada (agência para no lead, Renke vai até o retorno)
│   ├── Prova social (números, logos, depoimentos)
│   ├── Escada de maturidade (menção aos protocolos sem cardápio)
│   ├── Seção "Por que a Renke e não mais uma agência?"
│   ├── Metáfora do corpo (veias/coração)
│   ├── Academy (teaser pra agências)
│   ├── Tools (teaser "em breve")
│   └── CTA → Fale com a gente
│
├── /studio (Pra Clínicas)
│   ├── Visão geral do Studio
│   ├── /studio/revena-start
│   ├── /studio/revena-full
│   ├── /studio/revena-run
│   ├── /studio/revena-core
│   ├── /studio/revena-scale
│   ├── /studio/treine-sua-equipe (Agendamento 10x)
│   ├── /studio/site-institucional
│   └── /studio/identidade-visual
│
├── /academy (Pra Agências)
│   ├── Visão geral da Academy
│   ├── /academy/protocolo-renke (flagship)
│   ├── /academy/formacao-performa
│   ├── /academy/treinamento-crm
│   ├── /academy/rastreamento-avancado
│   ├── /academy/cultura-pro
│   ├── /academy/clickup-on-track
│   └── /academy/crm-sheets
│
├── /tools (Em breve)
│   ├── Renke CRM (teaser + waitlist)
│   ├── Renke Connect (já ativo, pode ter mais conteúdo)
│   └── Renke Pulse AI (teaser se houver algo concreto)
│
├── /sobre
│   ├── Quem somos (história, tese, time)
│   ├── Narrativa "jogo antigo vs. jogo novo"
│   ├── Números e certificações (GPTW, 140+ clínicas, R$42M)
│   └── Cultura e valores
│
├── /cases
│   ├── Cases com números reais (antes/depois)
│   └── Filtro por especialidade ou produto
│
├── /blog
│   ├── Categoria: RevOps pra clínicas (educar mercado)
│   ├── Categoria: Marketing médico/odontológico
│   ├── Categoria: Gestão de agências (atrai público Academy)
│   └── Categoria: Tecnologia e dados
│
├── /contato
│   ├── Formulário simples (nome + WhatsApp + tipo de negócio)
│   └── WhatsApp direto
│
├── /carreiras (Faça parte)
│   └── Vagas abertas + cultura
│
└── Rodapé
    ├── Links principais
    ├── Redes sociais
    ├── Certificações
    └── Dados institucionais
```

### Menu implementado (30/08/2026)

| Item | Submenu |
|---|---|
| **Para Clínicas** | Revena Start · Full · Core · Scale · Run · Treinamento para secretárias |
| **Para Agências** | Renke Academy · Protocolo Renke · Formação Performa · Treinamento CRM · Rastreamento Avançado · Cultura Pro |
| **Outras Soluções** | Site Institucional · Identidade Visual |
| **Tecnologia** | Renke Connect · Renke CRM |
| **A Renke** | *A empresa:* Sobre · Cases — *Mais:* Conteúdos · Faça Parte |
| **[Fale com a gente]** | botão, leva a `/contato` |

Três mudanças em relação ao menu da copy:

1. **"Home" saiu.** A assinatura no header já leva à raiz. O item ocupava espaço sem oferecer
   destino novo.
2. **"Conteúdos", "Contato" e "Faça Parte" eram três itens soltos no fim.** Viraram um grupo
   ("A Renke") e um botão. Cinco itens de navegação em vez de oito.
3. **"Contato" virou botão.** É a ação de conversão, não um destino entre pares — tratá-lo como
   item de lista escondia o que o site mais quer que aconteça.

Isso resolveu a **D7**: "Sobre" e "Cases" estavam fora do menu apesar de serem os pilares de
E-E-A-T declarados no briefing. Agora entram, sem inflar a barra.

### CTAs por página

| Página | CTA |
|---|---|
| Home | "Fale com a gente" / "Descubra se faz sentido para sua clínica" |
| Studio / Produtos | "Agendar diagnóstico" ou "Conversar com a equipe" |
| Academy | "Conhecer o produto" (link pra LP de venda) |
| Cases | "Quero resultado assim" (CTA pra contato) |
| Blog | "Quer isso pra sua clínica?" (CTA contextual no final dos posts) |

### Rodapé

Fundo escuro, 4 colunas:

| Coluna 1 | Coluna 2 — Links | Coluna 3 — Siga-nos | Coluna 4 — Contato |
|---|---|---|---|
| [Logo] <br> "Não é marketing. É RevOps." | Home <br> Para Clínicas <br> Para Agências <br> Tecnologia <br> Conteúdos <br> Faça Parte | Instagram <br> LinkedIn <br> YouTube | [Endereço] <br> [Telefone] <br> [Email] |

Linha final:
`© 2026 Renke Studio. Todos os direitos reservados.`
`Você não controla o que não enxerga.`

---

## Parte 1 · Home

A página que carrega 90% do tráfego esperado.

### Home

**Rota:** `/`
**Objetivo:** fazer o visitante entender em 5 segundos que a Renke não é agência de marketing.
**Público primário:** donos de clínica de alto padrão (90% do tráfego esperado).
**CTA principal:** "Descubra se faz sentido para sua clínica" / "Fale com a gente".

> Cada seção é um bloco independente. O designer usa isso como guia de montagem.
> Ver também: Notas para o designer (`docs/04-design/notas-designer-home.md`).

---

#### Menu (header)

| Item | Submenu |
|---|---|
| Home | — |
| Para Clínicas | Protocolo Revena Start · Protocolo Revena Full · Protocolo Revena Core · Protocolo Revena Scale · Protocolo Revena Run · Treinamento para secretárias |
| Para Agências | Renke Academy · Protocolo Renke · Formação Performa · Treinamento CRM · Rastreamento Avançado · Cultura Pro |
| Outras Soluções | Site Institucional · Identidade Visual |
| Tecnologia | Renke Connect *(em breve)* · Renke CRM *(em breve)* |
| Conteúdos | — |
| Contato | — |
| Faça Parte | — |

---

#### SEÇÃO 1 · HERO

**H1:**
> **Isso não é ~~marketing para clínicas~~. É RevOps**

*(visual: "marketing para clínicas" com strikethrough, "É RevOps" em destaque)*

**Subheadline:**
> Revenue Operations estratégico para transformar clínicas médicas em negócios de alta performance.

**Visual:** [GIF] — o que a Renke faz; pilares.
Referência: [apresentação no Google Slides](https://docs.google.com/presentation/d/1bCJM1HB2sq-15Wrqq1z5OLAlHH_a-x8nwBO4NuUUQGY/edit?usp=sharing)

**Números (em linha, separados por ponto central):**
> ~30 clínicas · Método validado há 4 anos · R$42M em faturamento gerado

⚠️ Conflita com "+140 clínicas" usado em `/sobre` e nas metas. Ver análise (`docs/05-analise/analise-do-briefing.md`).

**CTA:**
> Descubra se faz sentido para sua clínica →

**Texto de apoio:**
> Sua clínica fatura bem, mas você não sabe de onde vem cada real nem onde trava quando os números
> caem. Esse é o problema que resolvemos. Do anúncio ao retorno do paciente, tudo conectado,
> tudo rastreado.

**Prova social:**
> **Doutores que confiam na Renke**
> [FOTOS DE CLIENTES] — 5–6 logos em linha com moderada sobreposição e tooltip no hover com nome e especialidade.

**Legenda em itálico abaixo do visual:**
> *Você não controla o que não enxerga.*

---

#### SEÇÃO 2 · O QUE FAZEMOS

**Eyebrow:** O que fazemos
**Kicker:** Renke Studio
**H2:** O que a Renke faz?

> A Renke é a primeira assessoria de Revenue Operations para clínicas de alto padrão do mundo.
> Assista e entenda a nova categoria que criamos para revolucionar o setor de saúde e estética.

**Visual:** [Vídeo Instagram]

##### Para Clínicas · Protocolo Revena

Os pilares como cards (ícone + título + descrição):

**Vamos além do tráfego pago**
> Conectamos marketing ao comercial para lead virar paciente de verdade, não só um número em relatório.

**Implementamos um CRM que funciona de verdade** — *[GIF do Renke CRM]*
> Processo, jornadas, scripts, time treinado e usando a ferramenta de verdade. Tudo num lugar só
> pra você confiar no que está vendo.

**Automatizamos o seu atendimento**
> A parte chata, mas que toma tempo. Toda automatizada. Confirmação, lembrete, follow-up, NPS,
> avaliação do Google, anamnese... Tudo roda sozinho, sem depender de uma pessoa. Seu time foca no
> que move ponteiro.

**Dizemos o que fazer todo mês**
> Custo por agendamento. Taxa de comparecimento. Faturamento por canal. Decisão com dado, não com
> feeling. Tomadas de decisões com a maturidade que um negócio de verdade precisa.

**Construímos seu posicionamento antes de gastar um real**
> Estudamos seus concorrentes a fundo: o que comunicam, onde investem, quais brechas deixam abertas.
> Depois, construímos uma tese de diferenciação exclusiva pra sua clínica. Você não entra no mercado
> genérico. Você entra sabendo por que é a escolha óbvia.

##### Escada de maturidade (protocolos)

**H3 divisor:**
> Estruturamos sua operação do zero e operamos juntos no longo prazo.
> **Qual é o momento da sua clínica?**

| Protocolo | "Você diria..." | O que fazemos |
|---|---|---|
| **REVENA START** | "Faturo legal, mas tô no escuro. Meu comercial não tem estrutura nem dados." | Organizamos seu processo comercial do zero em 90 dias. |
| **REVENA FULL** | "Tenho dificuldade de estruturar e gerir a jornada completa do meu paciente." | Estruturamos do comercial ao pós-venda. Paciente acompanhado do começo ao fim. |
| **REVENA CORE** | "Já entendi que o problema não é só tráfego. Quero um time estratégico que conecte tudo." | Marketing + comercial + dados operados toda semana por um time dedicado. |
| **REVENA SCALE** | "Tenho resultado, mas não metrifico e não sei como crescer e extrair mais do digital." | Tudo do Core + conteúdo orgânico + reativação da sua base de pacientes. |
| **REVENA RUN** | "Comercial e dados estruturados, mas preciso de alguém pra gerir meu time e meus números." | Mantemos sua operação comercial funcionando sem você precisar pensar nisso. |

Cada card: **Saiba mais →**

**CTA da seção (texto + link, não botão):**
> A Renke recomenda o protocolo certo para o momento da sua clínica. **Fale com a equipe →**

---

#### SEÇÃO 3 · FRASE-ÂNCORA + PERGUNTAS

*(fundo escuro — pattern interrupt)*

**Frase-âncora (tipografia display/serif, centralizada):**
> Clinicamente, você sabe exatamente o que está acontecendo com seu paciente.
> **Mas e com o seu negócio?**

**Perguntas em grid 2×2:**

- Quanto custa um paciente novo pra sua clínica? De verdade, não o que a agência diz.
- Dos leads que chegam, quantos sentam na cadeira do seu consultório?
- Se sua secretária sai amanhã, o processo continua?
- Você sabe qual canal trouxe seus melhores pacientes este mês?
- No mês que o resultado não foi bom, você encontra o motivo baseado em dados e com facilidade?
- E no mês que o resultado foi bom, você consegue atribuir o porquê para replicar?
- Você sabe o que seus concorrentes estão comunicando agora e qual espaço estão deixando aberto pra você?

⚠️ São **7** perguntas para um grid 2×2 (4 slots). Definir quais 4 entram — ver
pendências (`docs/05-analise/pendencias-e-proximos-passos.md`).

---

#### SEÇÃO 4 · RESULTADOS

**Eyebrow:** Resultados
**H2:** O que muda quando a operação tem estrutura.

| Especialidade | Antes | Depois |
|---|---|---|
| **Dermatologia** | Taxa de agendamento baixa | **7% → 19%** em 90 dias |
| **Otorrino** | Comercial sem tempo para fazer follow-up e resgates | Processo automatizado e **29%** de recuperação de leads |
| **Cirurgia plástica** | Raramente vendia para leads do tráfego | Digital responsável por **38%** da receita |
| **Nutrologia** | Pacientes sumiam depois do 1º protocolo | **24%** reativados no trimestre |
| **Tricologia** | Não mensurava quais leads eram do tráfego e quais do orgânico | Painel unificado em **60 dias** com tudo rastreado |

> ⚠️ **Números são placeholder, serão substituídos por dados reais.** (nota do briefing)

**CTA:** Descubra se faz sentido para sua clínica →

---

#### SEÇÃO 5 · CTA FINAL

⚠️ A copy pula da Seção 4 para a Seção 6. As notas do designer descrevem uma **Seção 5 · CTA FINAL**
("fundo escuro, tudo centralizado, H2 como statement forte, botão de destaque, transmitir escassez e
exclusividade") — **a copy dessa seção está faltando**. Ver
pendências (`docs/05-analise/pendencias-e-proximos-passos.md`).

---

#### SEÇÃO 6 · ACADEMY + TOOLS

*(grid de 2 colunas, visual mais leve que as seções principais)*

##### Para Agências · Renke Academy
> Você é dono de agência? O Renke Academy abre os bastidores da nossa operação para você modelar.
> Método, processos e ferramentas.
>
> **→ Conhecer a Renke Academy**

##### Tecnologia · Renke Tools
> Tecnologias proprietárias construídas por quem está nas trincheiras todo dia. Nosso método
> produtizado em softwares.
>
> **→ Conhecer a Renke Tools**

---

#### SEÇÃO 7 · SOBRE

**Eyebrow:** Sobre
**H2:** Sobre a Renke

> A Renke é a primeira **assessoria de Revenue Operations** para clínicas médicas e odontológicas de
> alto padrão do mundo. Não somos agência de marketing. Não somos consultoria de gestão. Somos o
> time que conecta marketing, processo comercial e dados em um sistema único, operado de perto, com
> responsabilidade pelo resultado da última linha do nosso cliente.
>
> Começamos com uma tese simples: o problema das clínicas que faturam bem mas não têm previsibilidade
> não é marketing. É o que acontece depois do lead. Dados soltos, equipes desconectadas, decisões no
> feeling. Nenhuma agência resolve isso porque isso não é um problema de marketing. É um problema de
> negócio.
>
> Em quatro anos, validamos essa tese em mais de **140 clínicas**. Construímos o Protocolo Revena,
> metodologia proprietária que estrutura a operação de receita do zero e a mantém funcionando no
> longo prazo. Desenvolvemos tecnologia própria para operacionalizar o método. E formamos
> especialistas que fazem isso, para saúde, todo santo dia.

**CTA:** Saiba Mais

---

#### SEÇÃO 8 · FORMULÁRIO

*(layout 2 colunas: texto à esquerda, formulário à direita)*

**H2:**
> Antes de trocar de agência de novo, descubra o que é RevOps.

**Texto:**
> O problema da maioria das clínicas não é o canal de marketing. É que ninguém conecta o anúncio ao
> paciente na cadeira. Isso tem nome: falta de RevOps. Preencha o formulário e veja se faz sentido
> para sua clínica.

**Campos:**
- Nome
- WhatsApp
- Especialidade
- Faturamento mensal

**Botão:** Quero saber se faz sentido

---

#### SEÇÃO 9 · RODAPÉ

*(fundo escuro, 4 colunas)*

| [Logo] | Links | Siga-nos | Contato |
|---|---|---|---|
| Não é marketing. É RevOps. | Home · Para Clínicas · Para Agências · Tecnologia · Conteúdos · Faça Parte | Instagram · LinkedIn · YouTube | [Endereço] · [Telefone] · [Email] |

> © 2026 Renke Studio. Todos os direitos reservados.
> *Você não controla o que não enxerga.*

---

#### Notas SEO

| Campo | Conteúdo |
|---|---|
| **H1** | "Não é marketing para clínicas. É RevOps." *(criativo, pro humano, introduz o conceito e pega a keyword "marketing para clínicas")* |
| **Meta title** | Renke \| Não somos agência de marketing para clínicas. Somos RevOps. |
| **Meta description** | Marketing, comercial e operação conectados. +140 clínicas, Método validado, R$42M gerado. Protocolo Revena. |
| **Keyword na H1** | "agência de marketing para clínicas" (1.000–2.500/mês) |
| **Schema** | Organization + FAQ (4 perguntas) ⚠️ *não há seção de FAQ na copy da home* |

---

## Parte 2 · Studio — páginas para clínicas

O Protocolo Revena em cinco níveis de maturidade, mais o treinamento de secretárias. Cada uma funciona sozinha: responde o que é, pra quem é, o que resolve, o que recebo e por que confiar, sem depender de o visitante ter lido outra antes.

### Revena Start

**Rota:** `/revena-start` (sitemap estratégico sugere `/studio/revena-start` — ver [sitemap](#mapa-do-site))
**Página independente.** Funciona sozinha.
**Ângulo:** "sua clínica atrai pacientes mas perde no processo. O Start organiza do lead até a venda."

---

#### SEÇÃO 1 · HERO

**H1:**
> Sua clínica atrai pacientes.
> **Mas perde no processo.**

**Subheadline:**
> O Revena Start organiza todo o processo de vendas da sua clínica do zero, em 90 dias: do primeiro
> contato até o paciente fechar. Saber de onde veio cada paciente, processo claro pro time,
> automações e dados confiáveis.

**CTA:**
> Fale com a equipe e descubra se o Start faz sentido para sua clínica →

**Visual:** [imagem]

---

#### SEÇÃO 2 · PRA QUEM É

**Eyebrow:** Para quem é
**H2:** Você se reconhece aqui?

- Fatura acima de R$300k/mês, mas está no escuro. Não sabe o que funciona.
- Sua equipe atende no improviso, sem roteiro, sem processo.
- Já contratou agência, recebeu contatos, mas não sabe quantos viraram paciente.
- Cada ferramenta mostra um número diferente e ninguém sabe qual é o real.
- Tem pelo menos 1 pessoa dedicada ao atendimento comercial (recepcionista ou secretária).

---

#### SEÇÃO 3 · O QUE RESOLVE NA PRÁTICA

**Eyebrow:** Nossa solução
**H2:** O que o Revena Start faz pela sua clínica

*(blocos alternados texto/imagem)*

**Conecta marketing ao comercial** — *visual: [GIF] screenshot do CRM com dados entrando / print de rastreamento de origem*
> Cada paciente interessado chega no sistema com contexto (de onde veio, o que viu, qual procedimento
> buscou). Tecnologia própria que identifica de onde veio cada paciente, de verdade. Sem depender de
> planilha ou WhatsApp solto.

**Organiza seus dados num lugar só** — *visual: [GIF] painel de dados*
> Painel central com tudo que acontece na clínica. Você confia no que está vendo porque os dados são
> limpos e vêm de uma fonte unificada.

**Cria processos claros pro seu time** — *visual: [IMAGEM] fluxograma visual de processo / print do mapa de operações*
> Roteiros de atendimento por etapa, regras claras de quando e como avançar cada paciente. O processo
> roda com ou sem a pessoa que o criou.

**Automatiza o que é chato e toma tempo, mas é importante** — *visual: [GIF] mensagem de confirmação de consulta no WhatsApp da clínica*
> Confirmação, lembrete, follow-up, pesquisa de satisfação, alerta de paciente parado. Tudo dispara
> sozinho, no momento certo.

**Resgata orçamentos que esfriaram** — *visual: [IMAGEM] print de orçamento sendo resgatado / processo de follow-up*
> Paciente pediu orçamento e sumiu? Não fica esquecido. Temos processo dedicado pra recuperar.

**Entrega dados que viram decisão** — *visual: [IMAGEM] print de uma mensagem de relatório que enviamos nos grupos*
> Custo por paciente, quantos avançam em cada etapa, quais canais convertem de verdade. Não é
> relatório, é recomendação do que fazer.

---

#### SEÇÃO 4 · COMO FUNCIONA

**Eyebrow:** Como funciona
**H2:**
> A gente não opera sem diagnosticar.
> Assim como você não entra em procedimentos sem exames.

| Etapa | Duração | Nome | Descrição |
|---|---|---|---|
| **1** | 10 dias | **Onboarding** | Coleta de acessos, briefing e reunião de kick-off. |
| **2** | 30 dias | **Diagnóstico** | Mapeamos a jornada inteira dos pacientes: de onde vêm, como são atendidos, onde se perdem. |
| **3** | 30 dias | **Implementação** | Sistema configurado, automações rodando, rastreamento conectado, equipe treinada. |
| **4** | 30 dias | **Acompanhamento** | Checagem semanal: seu time tá usando certo? Ajustes finos e suporte proativo. |
| **5** | Opcional | **Operação contínua** | Acompanhamento conforme o momento da sua clínica. |

**Fechamento:**
> Um time dedicado que responde pelo resultado de receita, e não por quantidade de lead. Todo mês.
> Com dados na mesa.

---

#### SEÇÃO 5

⚠️ **Ausente na copy.** O documento pula da Seção 4 para a Seção 6.

---

#### SEÇÃO 6 · RESULTADOS

**Eyebrow:** Resultados
**H2:** O que muda na sua clínica em 90 dias.

| Antes | Depois do Revena Start |
|---|---|
| Não sabe de onde vem cada paciente | Cada contato chega rastreado com origem real |
| Secretária atende no improviso | Processo claro que roda com ou sem a pessoa |
| Paciente pede orçamento e some | Processo de follow-up e de resgate que recupera quem esfriou |
| Cada ferramenta mostra um número diferente | Uma fonte só de dados, limpa e confiável |
| Decisão no feeling | Decisão com dado real: custo por paciente, canal que funciona, etapa que trava |
| Alguém da equipe sai e o processo vai junto | Documentado, treinável, replicável |

---

#### SEÇÃO 7 · CTA FINAL

*(fundo escuro, centralizado)*

> **Limitado a 1 nova clínica por mês.**
> Cada projeto começa com diagnóstico. Não usamos template. Não terceirizamos.
>
> **Converse com a equipe. Em 90 dias, sua operação pode estar rodando. →**

---

#### Notas SEO

| Campo | Conteúdo |
|---|---|
| Meta title | Protocolo Revena Start \| Estruturação comercial para clínicas em 90 dias |
| Meta description | Do lead ao paciente na cadeira. CRM, processo, automações e dados implementados em 90 dias. Para clínicas de alto padrão. |
| Keywords | CRM para clínicas, captação de pacientes, gestão comercial para clínicas |

---

### Revena Full

**Rota:** `/revena-full`
**Página independente.** Funciona sozinha.
**Ângulo:** "do primeiro contato ao retorno. Comercial + operação + relacionamento."
**Pra quem:** clínicas que já têm alguém no comercial **E** alguém no pós-venda, mas operando no improviso.
**Add-on:** Gestão de Carteira (ativação de pacientes antigos — exige 3+ meses de dados acumulados).

---

#### SEÇÃO 1 · HERO

**H1:**
> Do primeiro contato ao retorno. A jornada inteira do paciente, conectada.

**Subheadline:**
> O Revena Full estrutura o comercial e o pós-venda da sua clínica. Cada paciente se sente cuidado
> do começo ao fim. Isso faz pacientes voltarem e indicarem.

**CTA:**
> Fale com a equipe e descubra se o Full faz sentido para sua clínica →

**Visual:** [IMG] — usar preferencialmente o vídeo de referência citado na copy, sem texto na tela.
Se não usar vídeo, manter visual em **proporção vertical**.

---

#### SEÇÃO 2 · PRA QUEM É

**Eyebrow:** Para quem é
**H2:** Você se reconhece aqui?

- Fatura acima de R$300k/mês, mas além de não saber o que funciona na captação, seus pacientes
  somem depois da primeira consulta.
- Tem mais de 5 planilhas que o time precisa ficar preenchendo, sem contar os sistemas.
- Tem alguém no comercial e alguém cuidando do pós-venda (concierge, coordenadora, secretária
  dedicada), mas opera no improviso.
- Paciente fecha o procedimento e raramente volta. Você não tem processo de retenção.
- Quer que o paciente se sinta acompanhado, mas não tem estrutura pra isso rodar sem você pensar.

---

#### SEÇÃO 3 · O QUE RESOLVE NA PRÁTICA

**Eyebrow:** Nossa solução
**H2:** Tudo do Revena Start + a jornada completa do paciente

**Processo comercial completo** — *[imagem]*
> Do primeiro contato até o fechamento. Sistema de gestão, automações, rastreamento de origem,
> formulário pré-consulta com anamnese digital, equipe treinada.

**Acompanhamento pós-venda** — *[imagem]*
> Comunicações automáticas de cuidado no momento certo: lembrete de retorno, orientação
> pré-procedimento, confirmação. Tudo personalizado, sem a equipe precisar lembrar.

**Integração com agenda** — *[imagem]*
> O sistema conversa com a agenda da clínica. Menos pacientes que não aparecem, mais retorno.

**Processo que faz paciente voltar** — *[imagem]*
> Não é campanha de reconquista. É cuidado sistemático que faz pacientes voltarem.

---

#### SEÇÃO 4 · COMO FUNCIONA

**Eyebrow:** Como funciona
**H2:** Etapas do projeto

| Etapa | Duração | Nome | Descrição |
|---|---|---|---|
| **1** | 10 dias | **Onboarding** | Coleta de acessos, briefing e reunião de kick-off. |
| **2** | 30 dias | **Diagnóstico** | Organização do acervo documental e gerencial. Mapeamos a jornada: captação, atendimento, procedimento e pós. Identificamos o que precisa ser automatizado, documentamos regras de negócio, criamos fluxogramas visuais e definimos quem faz o quê em cada etapa. |
| **3** | 30 dias | **Implementação** | Vamos para a tecnologia. Implementamos o CRM do jeito certo. Processo de acompanhamento de tratamentos; processo de relacionamento com a base de pacientes; comunicações automáticas da concierge; integração com sistema de agenda; geração automática de contrato e termos LGPD. |
| **4** | 30 dias | **Acompanhamento** | Checagem semanal: seu time tá usando? E está usando certo? Suporte proativo via WhatsApp, ajustes finos, reuniões. Garantimos que a equipe realmente use e que os dados estão entrando limpos. |
| **5** | Opcional | **Operação contínua** | Acompanhamento conforme o momento da clínica. Mantém rodando no longo prazo sob nossos cuidados profissionais. |

---

#### SEÇÃO 5 · DIFERENCIAL

**H2:** O Full é o único produto que entrega os 4 pilares na íntegra

*(4 ícones em linha)*

| Controle | Automação | Processo | Experiência |
|---|---|---|---|

**Fechamento:**
> O paciente se sente cuidado do começo ao fim. Isso faz ele voltar e indicar.

---

#### SEÇÃO 6 · RESULTADOS

⚠️ Apenas `[IMG]` no briefing — **copy ausente**.
Recomendação: reaproveitar a estrutura Antes/Depois do Start + bloco global de depoimentos.

---

#### SEÇÃO 7 · CTA FINAL

*(fundo escuro, centralizado)*

> **Limitado a 1 nova clínica por mês.**
> Cada projeto começa com diagnóstico. Não usamos template. Não terceirizamos.
>
> **Converse com a equipe. Em 90 dias, sua operação pode estar rodando. →**

---

#### Notas SEO

| Campo | Conteúdo |
|---|---|
| Meta title | Protocolo Revena Full \| Jornada completa do paciente para clínicas |
| Meta description | Do primeiro contato ao retorno. Comercial + pós-venda conectados. Para clínicas que já têm equipe e querem retenção real. |
| Keywords | retenção de pacientes, pós-venda clínica, jornada do paciente |

---

### Revena Core

**Rota:** `/revena-core`
**Página independente.** Funciona sozinha.
⚠️ **NÃO** referenciar como "evolução do Run". Precisa funcionar pra quem nunca ouviu falar de Run.
**Pré-requisito comunicado:** já ter Start ou Full implementado.

---

#### SEÇÃO 1 · HERO

**H1:**
> Toda semana um time olha para os números da sua clínica e diz exatamente o que fazer.

**Subheadline:**
> O Revena Core assume marketing, comercial e dados da sua clínica. Tudo conectado, toda semana
> analisado, todo mês otimizado.

**CTA:**
> Fale com a equipe e descubra se o Revena Core faz sentido para sua clínica →

**Visual:** [Imagem ou GIF] — se tiver captura real de relatório, dashboard ou reunião de
acompanhamento, usar aqui.

---

#### SEÇÃO 2 · PRA QUEM É

**Eyebrow:** Para quem é
**H2:** Você se reconhece aqui?

- Sua clínica fatura acima de R$300k/mês e já entendeu que o problema não é só a agência.
  Quer um time que conecte tudo.
- Tem dados, tem marketing, tem comercial, mas cada área opera no seu mundo e de maneira independente.
- Quer clareza do que tá funcionando, o que precisa mudar, e o que fazer.
- Já tem o Start ou Full implementado (pré-requisito).

---

#### SEÇÃO 3 · O QUE RESOLVE NA PRÁTICA

**Eyebrow:** Nossa solução
**H2:** O que o Revena Core faz pela sua clínica, toda semana

##### Marketing que funciona de verdade
*visual: [Imagem ou GIF] — composição com prints de anúncios e LPs já feitos*

- ✔ Anúncios e páginas criados pela Renke, otimizados pelo paciente que fecha, não pelo clique
- ✔ Estratégia de canais baseada em dados reais de quem avançou no funil
- ✔ Roteiros produzidos em cima de anatomias validadas

##### Gestão comercial com método
*visual: [Imagem ou GIF] — dashboard com dados reais e blur no nome do cliente*

- ✔ O dado de quem fechou volta pro marketing. O marketing melhora com base em quem realmente virou paciente
- ✔ Recuperação de orçamentos parados com processo, não com spam
- ✔ Alguém olhando toda semana pro seu processo comercial e dizendo o que ajustar

##### Tecnologia própria rodando
*visual: [GIF] — automação rodando e WhatsApp recebendo mensagem automática*

- ✔ Rastreamento de onde veio cada paciente, de verdade
- ✔ Confirmações, lembretes e follow-ups disparando sozinhos
- ✔ Tudo integrado num sistema só

##### Dados que viram decisão
*visual: [Imagem] — print de uma mensagem de relatório enviada no grupo do cliente*

- ✔ Painéis com os números que importam: custo por paciente, por canal, por procedimento
- ✔ Relatório de marketing toda semana com análise e recomendação
- ✔ Relatório comercial toda semana com o que fazer
- ✔ Você sabe onde investir mais e onde parar. Cada real tem destino claro.

---

#### SEÇÃO 4 · ANÁLISE DE MERCADO E POSICIONAMENTO

**Eyebrow:** Diferencial estratégico
**H2:** Antes de gastar um real, a gente te mostra o jogo.

> Seus concorrentes estão investindo em anúncios agora. Você sabe no quê? Sabe como se comunicam?
> Sabe qual brecha estão deixando aberta pra você ocupar?
>
> A gente estuda isso a fundo. Depois, constrói um posicionamento exclusivo pra sua clínica: o que
> te torna a escolha óbvia na sua região e na sua especialidade.
>
> **Não é template. É construção estratégica individual. Cada clínica tem a sua.**

*visual: [IMAGEM] — print do documento de análise de concorrentes ou do mapa de posicionamento de um
cliente (com blur)*

> ℹ️ Esta seção é **idêntica** à Seção 4 do Revena Scale → construir como componente reutilizável.

---

#### SEÇÃO 5 · JORNADA DO PROJETO

**Eyebrow:** Como funciona
**H2:** Etapas do Revena Core

| Etapa | Duração | Nome | Descrição |
|---|---|---|---|
| **1** | 45 dias | **Estruturação** | Dossiê completo da clínica, estudo de concorrência, estratégia de posicionamento, rastreamento configurado, sistema de gestão comercial implementado, painéis de dados montados, metas definidas. |
| **2** | 90 dias | **Laboratório** | Testamos canais, criativos, abordagens. Validamos o que funciona pra sua clínica especificamente. Performance medida de ponta a ponta: do primeiro contato até o paciente fechar. |
| **3** | 180 dias | **Performance** | Aumentamos a aposta no que tá dando certo. Cortamos o que não funciona. Abrimos novos canais se fizer sentido. |
| **4** | Em 12 meses | **Operação Contínua** | Previsibilidade alcançada. Otimização constante com o time que já conhece sua clínica por dentro. |

**Fechamento:**
> Cada etapa alimenta a próxima. Por isso exigimos que a base esteja construída antes de operar.
> Sem isso, seria mais uma agência otimizando no escuro e tentando milagre com tráfego pago do passado.

---

#### SEÇÃO 6 · CADÊNCIA SEMANAL

⚠️ No briefing esta seção também está numerada como "SEÇÃO 5" (duplicidade).

**H2:** O que acontece toda semana na sua clínica

> A Renke não manda relatório mensal e some. Toda semana, 3 camadas de análise se cruzam:

1. **Ritmo** — como os números estão vs. a meta
2. **Qualidade dos contatos** — quem tá chegando tá avançando no funil? Se não, por quê?
3. **Fechamento e projeção** — quanto já fechou, quanto vai fechar, o que precisa mudar

**Você recebe:**
> Relatório de marketing + relatório comercial toda semana. Check-in mensal com o gestor.
> Alinhamentos com sua própria equipe. Suporte via WhatsApp em horário comercial.

*visual: [Imagem] — relatório enviado para o cliente*

---

#### SEÇÃO 7 · RESULTADOS

💬 **Nota interna do briefing:**
> "@Eduarda Tuorto aqui vamos repetir alguma seção de outra página? Acho que podemos colocar a mesma
> seção de depoimentos de clientes em todas as páginas"

→ Decisão sugerida: **depoimentos como componente global**. Ver
padrões de página (`docs/02-arquitetura/padroes-de-pagina.md`).

---

#### SEÇÃO 8 · CTA FINAL

*(fundo escuro, centralizado)*

> **Limitado a 1 nova clínica por mês.**
> Cada projeto começa com diagnóstico. Não usamos template. Não terceirizamos.
>
> **Converse com a equipe.**

---

#### Notas SEO

| Campo | Conteúdo |
|---|---|
| Meta title | Protocolo Revena Core \| Marketing + comercial + dados integrados para clínicas |
| Meta description | Um time operando marketing, comercial e dados da sua clínica toda semana. Custo por paciente real, não custo por clique. |
| Keywords | tráfego pago para clínicas, assessoria de marketing para médicos, marketing para clínicas |

---

### Revena Scale

**Rota:** `/revena-scale`
**Página independente.** Funciona sozinha.
⚠️ **NÃO** comunicar como "Core + extras". É um produto completo. O visitante pode nunca ter ouvido
falar de Core.
**Pré-requisito comunicado:** já ter Start ou Full implementado.

---

#### SEÇÃO 1 · HERO

**H1:**
> Crescer por todos os lados: pacientes novos e os antigos voltando.

**Subheadline:**
> O Revena Scale é a operação mensal mais completa da Renke. Captação, conversão, conteúdo que
> cresce seu perfil e comunicações automáticas de cuidado. Menos dependência de tráfego pago, mais
> receita de quem já confia em você.

**CTA:**
> Fale com a equipe e descubra se o Scale faz sentido para sua clínica →

**Visual:** [Imagem ou GIF] — se tiver print real de perfil crescendo, campanha de base ou operação
integrada, usar aqui.

---

#### SEÇÃO 2 · PRA QUEM É

**Eyebrow:** Para quem é
**H2:** Você se reconhece aqui?

- Sua clínica fatura acima de R$300k/mês e já tá rodando bem. Quer depender menos de anúncio e fazer
  pacientes antigos voltarem.
- Tem marketing interno mas sabe que pode performar mais.
- Sabe que tem uma base de pacientes valiosa, mas não faz nada com ela.
- Quer construir autoridade digital, não só comprar atenção.
- Busca crescimento sustentável: todas as frentes operando juntas.
- Já tem o Start ou Full implementado (pré-requisito).

---

#### SEÇÃO 3 · O QUE RESOLVE NA PRÁTICA

**Eyebrow:** Nossa solução
**H2:** O que o Scale faz pela sua clínica. Toda semana. Todo mês.

**Tudo do Core** — *[imagem]*
> Marketing + comercial + dados integrados, operando toda semana. Relatórios semanais, recuperação
> de orçamentos, anúncios otimizados por quem realmente virou paciente.

**Conteúdo que constrói autoridade** — *[imagem]*
> Um profissional de conteúdo dedicado que cria material que faz seu perfil crescer organicamente.
> É alguém dentro do seu dia a dia, produzindo conteúdo que atrai pacientes sem pagar por cada
> visualização.

**Ativação estruturada de pacientes antigos** — *[imagem]*
> Pacientes que sumiram voltam a agendar. Conforme os meses passam e os dados se acumulam, as
> campanhas ficam cada vez mais inteligentes: segmentação por comportamento, histórico, perfil e
> momento do paciente.

**Comunicações automáticas de cuidado (réguas inteligentes)** — *[imagem]*
> Geração de contratos, cobrança de exames, orientações pré e pós-procedimento, confirmações e
> lembretes de retorno. Tudo personalizado e automático, baseado no momento real de cada paciente.

---

#### SEÇÃO 4 · ANÁLISE DE MERCADO E POSICIONAMENTO

**Eyebrow:** Diferencial estratégico
**H2:** Antes de gastar um real, a gente te mostra o jogo.

> Seus concorrentes estão investindo em anúncios agora. Você sabe no quê? Sabe como se comunicam?
> Sabe qual brecha estão deixando aberta pra você ocupar?
>
> A gente estuda isso a fundo. Depois, constrói um posicionamento exclusivo pra sua clínica: o que
> te torna a escolha óbvia na sua região e na sua especialidade.
>
> **Não é template. É construção estratégica individual. Cada clínica tem a sua.**

*visual: [IMAGEM] — print do documento de análise de concorrentes ou do mapa de posicionamento (com blur)*

> ℹ️ Idêntica à Seção 4 do Revena Core → **componente reutilizável**.

---

#### SEÇÃO 5 · DIFERENCIAL

> Menos dependência de anúncio pago, mais receita dos pacientes que já confiam em você.

---

#### SEÇÃO 6 · JORNADA DO PROJETO

⚠️ No briefing esta seção também está numerada como "SEÇÃO 5" (duplicidade).

**Eyebrow:** Como funciona
**H2:** Etapas do Revena Scale

| Etapa | Duração | Nome | Descrição |
|---|---|---|---|
| **1** | 45 dias | **Estruturação** | Tudo do Core + otimização dos perfis digitais, estratégia de conteúdo orgânico, exportação e segmentação da base com criação do calendário de ativações. |
| **2** | 90 dias | **Laboratório** | Testamos canais, criativos e abordagens. Validamos o que funciona. Otimizamos conteúdos orgânicos em paralelo. Performance medida de ponta a ponta. |
| **3** | 180 dias | **Performance** | Dobramos a aposta no que tá dando certo. Abrimos novos canais. Ampliamos presença digital. |
| **4** | A partir de 12 meses | **Operação Contínua** | Previsibilidade alcançada. Inovação constante pra não estagnar. |

**Fechamento:**
> Cada etapa alimenta a próxima. Sem a base construída, seria mais uma agência otimizando no escuro.

⚠️ A Etapa 1 diz "Tudo do Core", o que contraria a diretriz de não referenciar o Core.
Ver pendências (`docs/05-analise/pendencias-e-proximos-passos.md`).

---

#### SEÇÃO 7 · O QUE VOCÊ RECEBE TODA SEMANA E TODO MÊS

**H2:** O que acontece toda semana e todo mês na sua clínica

- Olhar de marketing semanal com análise e recomendações
- Acionáveis comerciais semanais com o que fazer para buscar a meta
- Relatório de conteúdo mensal (o que mais funcionou no perfil e que vai ser replicado)
- Check-in mensal com o gestor da clínica
- Alinhamentos quinzenais com a equipe comercial
- Suporte via WhatsApp em horário comercial
- Alertas proativos quando algo merece atenção imediata

*visual: [imagem ou vídeo] — mockup visual com imagem de check-in mensal com o cliente e um print de
relatório enviado no grupo*

---

#### SEÇÃO 8 · RESULTADOS

⚠️ Apenas `[IMG]` no briefing — **copy ausente**. Usar o bloco global de depoimentos/resultados.

---

#### SEÇÃO 9 · CTA FINAL

*(fundo escuro, centralizado)*

> **Limitado a 1 nova clínica por mês.**
> Cada projeto começa com diagnóstico. Não usamos template. Não terceirizamos.
>
> **Converse com a equipe.**

---

#### Notas SEO

| Campo | Conteúdo |
|---|---|
| Meta title | Protocolo Revena Scale \| Captação + conteúdo + reativação para clínicas |
| Meta description | A operação completa: marketing, comercial, conteúdo orgânico e ativação de base. Para clínicas que querem crescer sem depender só de anúncio. |
| Keywords | marketing orgânico para clínicas, retenção de pacientes, crescimento sustentável clínica |

---

### Revena Run

**Rota:** `/revena-run`
**Página independente.** Funciona sozinha.
⚠️ **NÃO** é marketing, **NÃO** é conteúdo, **NÃO** é campanha.
**Pré-requisito comunicado:** já ter passado pelo Start ou Full.

---

#### SEÇÃO 1 · HERO

**H1:**
> Você investiu para organizar. A gente garante que não volta a bagunçar.

**Subheadline:**
> O Revena Run é a manutenção mensal da operação de atendimento da sua clínica. Toda semana, alguém
> checa se seu time tá seguindo o processo, se os dados estão certos e se nada quebrou. Refinamentos
> e otimizações nas jornadas são feitas sob medida. Você cuida do paciente. A gente cuida do seu negócio.

**CTA:**
> Fale com a equipe e descubra se o Run faz sentido para sua clínica →

**Visual:** [Imagem ou GIF]

---

#### SEÇÃO 2 · PRA QUEM É

**Eyebrow:** Para quem é
**H2:** Você se reconhece aqui?

- Já tem marketing e não quer trocar. Só precisa de alguém cuidando do processo comercial.
- Montou tudo direitinho, mas sem alguém de olho, a equipe relaxa e volta pro improviso.
- Já viu os dados ficarem sujos e o processo parar porque ninguém estava monitorando.
- Quer manter tudo funcionando sem ser você quem cobra a equipe todo dia.
- Já passou pelo Start ou Full da Renke (pré-requisito).

---

#### SEÇÃO 3 · O QUE RESOLVE NA PRÁTICA

**Eyebrow:** Nossa solução
**H2:** O que o Revena Run faz pela sua clínica

**Direção estruturada** — *[Imagem ou GIF]*
> Toda semana, olhamos pra dentro da sua operação. O time tá usando o processo? Os dados estão
> entrando certo? Alguma coisa travou? Corrigimos antes de virar problema.

**Acionável claro do que precisa de atenção** — *[print de alerta ou mensagem proativa no grupo]*
> Pacientes esquecidos, informações faltando, tarefas que ninguém fez. A gente identifica e te diz
> exatamente o que corrigir.

**Recuperação de orçamentos parados** — *[Imagem ou GIF]*
> Paciente pediu orçamento e sumiu? Não fica esquecido. Acionamos seu time com processo pra trazer de volta.

**Ajustes contínuos** — *[print de automação ou ajuste sendo feito]*
> Conforme sua clínica evolui, ajustamos o que precisa. Confirmações, lembretes, follow-ups: tudo
> continua rodando certinho.

---

#### SEÇÃO 4 · DIFERENCIAL

> Sua cabeça fica no resultado do paciente. A nossa fica na experiência digital dele e na sua
> operação. **Tecnologia sem manutenção degrada. O Run é quem mantém sua operação viva.**

---

#### SEÇÃO 5 · O QUE VOCÊ RECEBE TODA SEMANA E TODO MÊS

**H2:** O que acontece toda semana e todo mês na sua clínica

- **Toda semana:** relatório com o que tá funcionando e o que precisa de atenção
- **Todo mês:** reunião com a equipe pra alinhar melhorias e próximos passos
- **No dia a dia:** suporte via WhatsApp (horário comercial) pra dúvidas rápidas
- **Quando necessário:** alerta imediato se algo merece sua atenção

**Quem cuida disso:**
> Uma equipe enxuta e focada só em manter sua operação saudável. Sem excesso, sem complexidade.

*visual: [Imagem] — mockup de reunião mensal ou print de mensagem de suporte proativo no WhatsApp*

---

#### SEÇÃO 6 · QUANDO O RUN NÃO BASTA

*(gatilho de upgrade para o Core)*

> Se seu marketing não usa os dados que sua operação gera (e continua otimizando só pra entregar
> leads), o Run mantém a casa em ordem, mas o marketing continua no escuro.
>
> Para que o marketing use a inteligência que sua operação já tem, **conheça o Revena Core →**

---

#### SEÇÃO 7 · CTA FINAL

> **Sua operação já está montada. Só precisa de alguém mantendo.**
> Sem template. Sem terceirização. Alguém de verdade olhando pros seus números toda semana.
>
> **Converse com a equipe →**

---

#### Notas SEO

| Campo | Conteúdo |
|---|---|
| Meta title | Protocolo Revena Run \| Manutenção da operação comercial para clínicas |
| Meta description | Manutenção semanal, dados limpos, equipe aderindo. Alguém garantindo que sua operação não volta a bagunçar. |
| Keywords | gestão de CRM para clínicas, manutenção CRM, operação comercial clínica |

---

### Treinamento para Secretárias (Agendamento 10x)

**Rota:** `/treine-sua-equipe` (sitemap sugere `/studio/treine-sua-equipe`)
**Público:** dono da clínica que quer profissionalizar o atendimento.
**Página independente.**

> ## ⚠️ DECISÃO EM ABERTO — produto pode ser descontinuado
>
> Comentário no briefing original:
>
> **CEO:** *"@Eduarda Tuorto vamos descontinuar esse produto tá? Muito obsoleto e tô sem agenda para regravá-lo :/"*
> **Eduarda:** *"Poooxa, acho um produto MUITO interessante para clínicas"*
>
> **Não construir esta página até a decisão ser tomada.** Se descontinuado, remover também do menu
> "Para Clínicas". Ver pendências (`docs/05-analise/pendencias-e-proximos-passos.md`).

---

#### SEÇÃO 1 · HERO

**H1:**
> Sua secretária atende bem. Mas poderia agendar muito mais.

**Subheadline:**
> O Agendamento 10x é o treinamento que transforma sua equipe de atendimento em uma máquina de
> agendamento. Scripts, processo claro, rotinas diárias e jogo de cintura pra cada tipo de paciente.
> Tudo baseado no que funciona em +140 clínicas.

**CTA:** Quero treinar minha equipe →

**Visual:** [Imagem] — foto de secretária/CRC atendendo ou print de conversa bem conduzida no WhatsApp.

---

#### SEÇÃO 2 · PRA QUEM É

**Eyebrow:** Para quem é
**H2:** Você se reconhece aqui?

- Pacientes entram em contato, mas muitos não agendam. E você não sabe por quê.
- Sua secretária ou recepcionista faz tudo: atende, agenda, cobra, organiza. Mas sem método.
- Quando alguém sai da equipe, o processo vai embora junto.
- Pacientes que pedem orçamento somem e ninguém faz follow-up.
- Você sente que está perdendo dinheiro no atendimento, mas não sabe medir.

---

#### SEÇÃO 3 · O QUE SUA EQUIPE VAI APRENDER

**Eyebrow:** Nossa solução
**H2:** Do primeiro contato ao pós-venda, com processo

##### Jornada completa em 8 etapas
1. Contato inicial
2. Coleta de informações
3. Encantamento
4. Esclarecimentos
5. Agendamento
6. Consulta
7. Fechamento
8. Pós-venda

**Roteiros prontos pra cada etapa** — *[Imagem] print de roteiro de atendimento ou script real (borrado se necessário)*
> Não é texto decorado. É estrutura com argumentos que sua equipe adapta pra cada situação. Cada
> etapa tem seu roteiro específico.

**Rotinas diárias organizadas**
> Checklist do que fazer todo dia: responder contatos novos, fazer lembretes, follow-up de quem não
> respondeu, resgatar quem faltou, conferir dados atualizados.

**Separação clara de funções** — *[Imagem] diagrama de separação de funções (CRC vs. Secretária)*
> Quem cuida do comercial (agendar, resgatar, converter) e quem cuida da recepção (receber,
> organizar, cobrar). Sem confusão de papéis.

---

#### SEÇÃO 4 · O QUE MUDA NA PRÁTICA

**H2:** O que muda na prática — antes e depois do treinamento

| Antes | Depois |
|---|---|
| Equipe responde quando dá | Prioridade máxima pra contatos novos |
| Paciente pergunta preço e some | Conversa conduzida até o agendamento |
| Orçamento fica parado e ninguém retoma | Follow-up com processo e timing certo |
| Quem faltou na consulta é esquecido | Resgate ativo com roteiro específico |
| Se a pessoa sai, o método vai junto | Processo documentado, qualquer novo membro aprende rápido |

---

#### SEÇÃO 5 · COMO FUNCIONA

| TEÓRICO | PRÁTICO | MONITORAMENTO |
|---|---|---|
| Entendimento das funções, rotinas e erros mais comuns. Sua equipe entende o porquê antes do como. | Scripts completos, fluxos de atendimento, checklists diários. Tudo pronto pra aplicar no dia seguinte. | Reunião semanal de alinhamento, conferência de conversas, cliente oculto pra validar aprendizado. |

---

#### SEÇÃO 6 · DIFERENCIAL

> Não é curso genérico de atendimento. É o método que usamos nas clínicas que atendemos todo dia.
> Testado, ajustado e validado em **+140 operações reais**.

---

#### SEÇÃO 7 · CTA FINAL

> **Sua equipe está perdendo pacientes todo dia sem perceber.**
> Cada contato que não vira agendamento é dinheiro que saiu do seu bolso. O treinamento resolve isso
> em semanas, não em meses.
>
> **Quero treinar minha equipe →**

---

#### Notas SEO

| Campo | Conteúdo |
|---|---|
| Meta title | Agendamento 10x \| Treinamento de atendimento comercial para clínicas |
| Meta description | Scripts, processos e rotinas que transformam sua equipe de atendimento em uma máquina de agendamento. Método validado em +140 clínicas. |
| Keywords | treinamento secretária clínica, como agendar mais pacientes, script atendimento clínica |

---

## Parte 3 · Academy — páginas para agências

O outro público: agências que compram método da Renke.

### Renke Academy

**Rota:** `/academy`
**Público:** donos de agência.
**Tom:** direto + técnico + framework. Pode usar vocabulário de marketing sem restrição.

---

#### SEÇÃO 1 · HERO

**H1:**
> Seus clientes trocam de agência todo ano. O problema não é a entrega. É o modelo.

**Subheadline:**
> O mercado joga de 2 maneiras. O jogo antigo está matando agências e frustrando clientes. O jogo
> novo está criando operações lucrativas com poucos clientes e responsabilidade real pelo resultado.
> A Renke Academy ensina o jogo novo.

**CTA:** Quero conhecer a Academy →

**Visual:** [IMG] — foto relacionada com Academy.

---

#### SEÇÃO 2 · DOIS JOGOS

**H2:** Dois jogos. Você escolhe qual jogar.

| O jogo antigo | O jogo novo |
|---|---|
| Cliente contrata agência pro tráfego, outra pro conteúdo, alguém implementa um CRM que ninguém usa, e todo mundo decide no feeling. Cada peça solta, nenhuma conversa com a outra. O dono do negócio trabalha cada vez mais sem ver o dinheiro voltar. Troca de agência todo ano achando que o problema é a agência. E a agência? Cobra pouco, entrega muito, perde o cliente mesmo assim, e começa tudo de novo com outro. | Os negócios que estão crescendo com consistência já operam com RevOps. Marketing, comercial e dados como um sistema só. Faturamento previsível. E as agências que operam esse modelo? Poucos clientes, ticket alto, retenção real, margem de verdade. Funciona em saúde, em serviços, em qualquer negócio onde o cliente investe em marketing e precisa de previsibilidade. |

**Fechamento:**
> A Renke validou esse modelo em **+140 clínicas**. Com metodologia própria (Studio), tecnologia que
> operacionaliza tudo (Tools), e formação para quem quer aplicar esse jogo no nicho que quiser (Academy).

**Destaque:**
> *"Se você continua jogando o jogo antigo, está competindo num mercado que está morrendo."*

---

#### SEÇÃO 3 · PARA QUEM É

**H2:** Se você é dono de agência e...

- Está preso no modelo "faz tudo para todo mundo" e quer criar um posicionamento real
- Entrega resultado pro cliente mas não consegue provar com dados (e cobra pouco por isso)
- Quer parar de ser executor de tarefa e virar parceiro estratégico do cliente
- Busca um modelo onde poucos clientes + ticket alto = operação lucrativa sem caos
- Quer entender RevOps na prática e oferecer isso como serviço de alto valor

**Visual:** [IMG]

---

#### SEÇÃO 4 · O QUE VOCÊ ACESSA

**H2:** Tudo que a Renke usa para operar, aberto para você modelar

*(grid 2×2 com imagem por bloco)*

**Metodologia Revena completa**
> O framework que usamos para operar o Studio. Como nos posicionamos, como vendemos, como
> entregamos, como precificamos, como gerimos. O sistema operacional inteiro, não um resumo.

**Processos reais de operação**
> Playbooks, scripts, fluxos de automação, modelos de relatório, rotinas semanais. Não é template
> genérico. É o que usamos hoje, com 30 clínicas ativas.

**Stack técnica documentada**
> Ferramentas, configurações de CRM, modelos de rastreamento, lógica de integração. Operação real,
> não teoria.

**Comunidade de operadores**
> Acesso a outros donos de agência que estão implementando o mesmo modelo. Troca real entre quem faz.

---

#### SEÇÃO 5 · A TESE

**H2:** O mercado te ensinou errado

> O modelo tradicional de agência: muitos clientes, ticket baixo, equipe grande, margem pequena,
> cliente que troca de agência todo ano. **Escalar assim é cavar sua cova.**
>
> O modelo Renke: poucos clientes, entrega sofisticada, responsabilidade pelo resultado de receita,
> precificação por valor, não por hora. **Menos clientes, mais lucro, mais controle.**

**Frase-âncora:**
> *"Você não abriu uma agência para ter uma vida pior do que tinha antes dela."*

**Visual:** [IMG]

---

#### SEÇÃO 6 · PRODUTOS

**H2:** Nossos Cursos
**Sub:** Trilha completa ou módulos independentes

| Produto | Descrição | CTA |
|---|---|---|
| **Protocolo Renke** | O sistema operacional inteiro de uma operação de RevOps lucrativa. Posicionamento, venda, entrega, precificação, gestão de equipe. 100% dos bastidores abertos para você modelar no seu nicho. | Saiba Mais |
| **Formação Performa** | De executor reativo para estrategista de performance. Sistema de pensamento, não curso de botão. | Saiba Mais |
| **Treinamento de CRM** | Uma nova linha de receita para sua agência: implementação de CRM como serviço de alto valor. Método testado em 200+ projetos. | Saiba Mais |
| **Rastreamento Avançado** | Prove retorno real de WhatsApp e formulários sem depender de software terceiro. Recebe tudo pronto, instala e entrega. | Saiba Mais |
| **Cultura Pro** | Cultura organizacional para agências, ensinada por quem tem certificação GPTW. Os erros e acertos reais da Renke. | Saiba Mais |

⚠️ **ClickUp On Track** e **CRM Sheets** aparecem no sitemap e na hierarquia de produtos, mas **não
estão nesta lista** nem têm copy. Ver pendências (`docs/05-analise/pendencias-e-proximos-passos.md`).

---

#### SEÇÃO 7 · CTA FINAL

> **A Renke Academy não é para todo mundo.**
> É para quem quer parar de ser agência genérica e construir uma operação com posicionamento, método
> e margem real.

---

#### Notas SEO

| Campo | Conteúdo |
|---|---|
| Meta title | Renke Academy \| Como construir uma operação de RevOps lucrativa para agências |
| Meta description | O modelo de RevOps validado em +140 clínicas, aberto para agências. Método, processos, ferramentas e bastidores reais da Renke. |
| Keywords | revops para agências, como montar agência de marketing médico, escalar agência, mentoria para donos de agência |

---

### Protocolo Renke

**Rota:** `/academy/protocolo-renke`
**Flagship da Academy** (R$7k — ⚠️ preço não vai para o site).
**Público:** donos de agência de qualquer nicho.

---

#### SEÇÃO 1 · HERO

*[Logo Renke Academy]*

**H1:**
> O sistema operacional inteiro de uma operação de RevOps lucrativa. Aberto para você modelar.

**Subheadline:**
> O Protocolo Renke é o flagship da Renke Academy. Tudo que a Renke construiu em 4 anos operando
> +140 projetos, documentado e transferido para você aplicar no seu nicho. Posicionamento, produtos,
> processos, ferramentas, venda, entrega, precificação, gestão de equipe. Sem filtro.

**CTA:** QUERO O SISTEMA OPERACIONAL DA RENKE

**Visual:** [IMG]

---

#### SEÇÃO 2 · PARA QUEM É

**H2:** Se você é dono de agência e...

- Tá preso no operacional e não consegue sair
- Cobra pouco, entrega muito, e mesmo assim perde cliente
- Quer parar de escalar com mais gente e começar a escalar com mais valor
- Sente que construiu uma prisão em vez de um negócio
- Quer um modelo com menos loucura e mais lucro

---

#### SEÇÃO 3 · O QUE VOCÊ RECEBE

**H2:** O que você recebe
**Sub:** 100% dos bastidores da Renke

*(grid de 6 blocos com imagem)*

**Posicionamento**
> Como sair de "agência genérica" e criar um posicionamento que atrai clientes de alto ticket. Como
> a Renke se diferenciou num mercado comoditizado.

**Modelo comercial**
> Como vender projetos de R$20k–R$40k e recorrências de R$6.5k–R$15k/mês. Processo de venda
> consultiva, precificação por valor, qualificação de clientes.

**Operação**
> Como entregar com poucos clientes e margem alta. Estrutura de squads, rotinas semanais, rituais de
> gestão, distribuição de contas.

**Gestão de Equipe**
> Como montar uma equipe enxuta que opera sem depender de você. Cultura, processos, autonomia.

**Método de Entrega**
> O Protocolo Revena traduzido para você aplicar: diagnóstico, implementação, acompanhamento. Como
> entregar resultado real e reter cliente por anos.

**Documentos reais**
> Templates, playbooks, scripts, modelos de proposta, estruturas de relatório. Tudo que usamos hoje,
> não versões diluídas.

---

#### SEÇÃO 4 · A TESE

**Frase-âncora:**
> *"Você não abriu uma agência para ter uma vida pior do que tinha antes dela."*

> O mercado ensinou que crescer = mais clientes + mais equipe. Isso é uma armadilha. Quanto mais
> clientes, mais caos, mais rotatividade, menos margem, menos qualidade de vida.
>
> O modelo Renke inverte: **poucos clientes + entrega sofisticada + precificação por valor = escala
> vertical sem caos.** Menos clientes, mais lucro, mais controle, mais liberdade.

**Destaque:**
> *"Não é mentoria de quem parou de fazer. É o blueprint de quem faz isso todo dia."*

---

#### SEÇÃO 5 · PROVA SOCIAL

**H2:** Não é sobre o que nós falamos, é sobre o que falam de nós

- 🗣️ **O que as agências dizem**
- 🗣️ **O que as clínicas dizem**

⚠️ Estrutura definida, **depoimentos ainda não coletados**.

---

#### SEÇÃO 6 · CTA FINAL

> **O Protocolo Renke não é para todo mundo.**
> É para quem tá pronto para matar o próprio negócio e reconstruir o modelo do zero, mas com
> inteligência e estrutura. Se quer só "mais dicas de marketing", não é para você. Se quer um sistema
> operacional completo para transformar sua agência, você está no momento certo.
>
> **Quero conhecer o Protocolo Renke →**

---

#### Notas SEO

⚠️ Não especificadas no briefing. Sugestão a validar:
- Meta title: Protocolo Renke | O sistema operacional de uma agência de RevOps lucrativa
- Keywords: mentoria para donos de agência, escalar agência de marketing, como montar uma agência de marketing

---

### Formação Performa

**Rota:** `/academy/formacao-performa`
**Público:** gestores de tráfego e donos de agência que querem sair do modo reativo.

---

#### SEÇÃO 1 · HERO

*[Logo Renke Academy]*

**H1:**
> De executor reativo para estrategista de performance

**Subheadline:**
> A Formação Performa é um sistema de pensamento estratégico para quem já opera tráfego mas quer
> parar de apertar botão e começar a pensar como estrategista.

**CTA:** Quero conhecer a Formação Performa →

**Visual:** [imagem]

---

#### SEÇÃO 2 · PARA QUEM É

**H2:** Se você...

- Faz tráfego mas não tem muita segurança nas decisões estratégicas
- Sabe que poderia entregar mais resultado para o cliente que confiou em você
- Sabe otimizar, mas não tem método para pensar na estratégia por trás do tráfego
- Quer conectar o que faz no gerenciador com o resultado real do cliente
- Gera resultado mas não prova valor para o cliente
- Quer subir de nível: de gestor de tráfego para estrategista de performance

---

#### SEÇÃO 3 · O QUE VOCÊ APRENDE

**H2:** O que você recebe
**Sub:** Na Formação Performa você aprende...

*(grid 2×2 com imagem por bloco)*

**Framework estratégico**
> Como pensar antes de executar. Análise de concorrência, definição de canais, estruturação de
> funis, alocação de verba baseada em dados reais.

**Otimização por resultado, não por métrica de vaidade**
> Como parar de olhar para CPL e começar a otimizar por avanço de funil, agendamento e venda.

**Visão consultiva**
> Como conversar com o cliente sobre estratégia, não só sobre relatório. Como se posicionar como
> parceiro, não como executor.

**Integração com comercial**
> Como usar os dados do comercial para melhorar as campanhas. O circuito que separa gestores
> medianos de estrategistas.

**CTA:** Quero conhecer a Formação Performa →

---

#### SEÇÃO 4 · DIFERENCIAL

> *"Não é curso de botão. É sistema de pensamento estratégico. Quem sai daqui pensa diferente antes
> de abrir o gerenciador."*

---

#### SEÇÃO 5 · SOBRE A RENKE

**H2:** Quem está por trás da Formação

> A Formação Performa nasce da operação da Renke Studio. Não é teoria emprestada de livro gringo. É
> o sistema que roda há 4 anos com clínicas de alto ticket, validado com verba real, resultado real
> e cliente real cobrando no WhatsApp todo dia.

**Visual:** [Imagem]

---

#### SEÇÃO 6 · CTA FINAL

> **Você vai continuar otimizando CPL enquanto o cliente cancela... ou vai aprender a pensar como
> estrategista?**
>
> A Formação Performa é para quem quer parar de reagir e começar a liderar a estratégia. Framework,
> visão consultiva, integração com comercial e um sistema de pensamento que muda como você opera.
>
> **Quero sair do modo executor →**

---

#### Notas SEO

⚠️ Não especificadas no briefing. Sugestão a validar:
- Keywords: gestor de tráfego, estratégia de performance, escalar agência de marketing

---

### Treinamento de CRM

**Rota:** `/academy/treinamento-crm`
**Público:** donos de agência e gestores que querem adicionar implementação de CRM como serviço de
alto valor.

---

#### SEÇÃO 1 · HERO

*[Logo Renke Academy]*

**H1:**
> Uma nova linha de receita para sua agência: implementação de CRM como serviço de alto valor.

**Subheadline:**
> O Treinamento de CRM da Renke Academy ensina como vender e entregar projetos de implementação e
> gestão de CRM de R$5k a R$40k. Método testado em 200+ projetos reais. Alunos vendendo na primeira semana.

**CTA:** Quero aprender a vender CRM →

**Visual:** [imagem]

---

#### SEÇÃO 2 · PARA QUEM É

**H2:** Se você...

- Até implementa um CRM ou outro mas sem metodologia para replicar com seu time e amadurecer sua entrega
- Quer adicionar um serviço de alto ticket sem precisar de equipe nova
- Já atende clientes de marketing e quer agregar valor com processo comercial
- Quer parar de depender só de recorrência de gestão de tráfego
- Quer aprender a implementar CRM com método, não por tentativa e erro

---

#### SEÇÃO 3 · O QUE VOCÊ APRENDE

**H2:** O que você recebe
**Sub:** No Treinamento de CRM você aprende...

*(grid 2×2 com imagem por bloco)*

**Como vender**
> Posicionamento do serviço, precificação, abordagem comercial. Como mostrar valor pro cliente antes
> de falar preço.

**Como diagnosticar**
> Mapeamento da jornada do cliente, identificação de gargalos, recomendação de arquitetura.

**Como implementar**
> Configuração completa: funis, etapas, campos, regras, automações, rastreamento e treinamento da
> equipe do cliente.

**Como manter**
> Modelo de recorrência pós-implementação. Gestão de CRM como serviço mensal de R$3k a R$5k.

---

#### SEÇÃO 4 · COMO FUNCIONA

**Módulos práticos passo a passo**
> Do diagnóstico à entrega. Cada módulo é um pedaço do projeto real: você assiste, aplica no seu
> próximo cliente e já cobra por isso.

**Templates de projeto prontos**
> Mapa de operações, checklist de implementação, roteiro de onboarding, modelo de recorrência. Tudo
> pronto para usar.

---

#### SEÇÃO 5 · NÚMEROS

| R$5k a R$40k | R$1k a R$5k/mês | Sem equipe nova | 1ª semana |
|---|---|---|---|
| por implementação | de recorrência | você entrega sozinho | alunos já vendendo |

⚠️ **Inconsistência:** a Seção 3 fala em recorrência de "R$3k a R$5k/mês"; esta seção diz "R$1k a
R$5k/mês". Alinhar antes de publicar.

---

#### SEÇÃO 6 · SOBRE A RENKE

**H2:** Método nascido em operação real

> O treinamento é baseado nos 200+ projetos de implementação da Renke Studio. Clínicas, escritórios,
> negócios de alto ticket. Não é framework importado: é o que funciona no Brasil, com cliente
> cobrando no WhatsApp.

**Visual:** [Imagem]

---

#### SEÇÃO 7 · CTA FINAL

> **Sua agência vai continuar vendendo só tráfego a R$1.500/mês... ou vai adicionar projetos de R$5k a R$40k?**
>
> O Treinamento de CRM te entrega o método completo: como vender, diagnosticar, implementar e manter.
> Um serviço novo de alto valor que seus clientes já precisam, só não sabem pedir.
>
> **Quero adicionar CRM ao meu portfólio →**

---

#### Notas SEO

⚠️ Não especificadas no briefing. Sugestão a validar:
- Keywords: como implementar CRM, implementação de CRM como serviço, CRM para agências

---

### Rastreamento Avançado

**Rota:** `/academy/rastreamento-avancado`
**Público:** gestores de tráfego e agências que precisam provar ROI real de WhatsApp e formulários.

---

#### SEÇÃO 1 · HERO

*[Logo Renke Academy]*

**H1:**
> Seu cliente pergunta 'de onde veio esse lead?' Agora você prova.

**Subheadline:**
> O Rastreamento Avançado da Renke Academy entrega tudo pronto: scripts, configurações, templates de
> fluxos e integrações. Você instala, configura e entrega pro cliente em minutos. Cada conversão
> rastreada do clique ao CRM.

**CTA:** Quero acesso ao Rastreamento Avançado →

**Visual:** [imagem]

---

#### SEÇÃO 2 · PARA QUEM É

**H2:** Se você...

- Precisa provar pro cliente que os contatos vieram do anúncio (e não do orgânico)
- Trabalha com campanhas de mensagem e não consegue rastrear de verdade
- Quer diferenciar sua entrega de outras agências que só mostram CPL
- Não quer depender de ferramentas caras para ter rastreamento preciso
- Quer internalizar uma tecnologia para servir como vantagem competitiva

---

#### SEÇÃO 3 · O QUE VOCÊ RECEBE

**H2:** O que você recebe

*(grid 2×2 com imagem por bloco)*

**Rastreamento de WhatsApp**
> Botões de WhatsApp em sites e landing pages rastreados com precisão. Origem, campanha e criativo
> identificados no CRM automaticamente.

**Formulários nativos e de página**
> Tudo integrado direto ao CRM com UTMs dinâmicas. Cada lead com origem clara, sem achismo.

**Campanhas de mensagem (Meta)**
> Rastreamento de campanhas com objetivo de mensagens. Dados chegando estruturados no CRM com
> campanha, conjunto e criativo.

**Plug & play**
> Não precisa programar. Recebe a lógica pronta, instala e configura seguindo o passo a passo.
> Entrega pro cliente no mesmo dia.

---

#### SEÇÃO 4 · COMO FUNCIONA

**1. Recebe a lógica pronta**
> Scripts, tags e configurações documentadas passo a passo. Sem precisar de dev ou ferramenta cara.

**2. Instala e configura**
> Segue o tutorial, aplica no site e no CRM do cliente. Funciona com qualquer builder e qualquer CRM.

**3. Entrega e impressiona**
> Seu cliente passa a ver exatamente de onde vem cada contato. Você prova ROI real e justifica o investimento.

---

#### SEÇÃO 5 · O PROBLEMA

| Sem rastreamento | Com o Rastreamento Avançado |
|---|---|
| "De onde veio esse lead?" Ninguém sabe. O cliente acha que é orgânico, você não consegue provar que é do tráfego. Resultado: desconfiança, cancelamento, churn. | Cada contato chega no CRM com origem, campanha e criativo. O cliente vê o retorno. Você justifica a verba, aumenta ticket e retém com dados. |

---

#### SEÇÃO 6 · SOBRE A RENKE

**H2:** Direto da operação Renke

> O Rastreamento Avançado é extraído da operação real da Renke Studio. O mesmo rastreamento que roda
> nos nossos projetos, testado com WhatsApp, formulários, campanhas de mensagem e CRMs diferentes.
> Não é teoria: é o que usamos todo dia para provar resultado. Você recebe pronto, instala e entrega.

**Visual:** [Imagem]

---

#### SEÇÃO 7 · CTA FINAL

> **Seu cliente vai continuar achando que os leads são orgânicos... ou você vai instalar o
> rastreamento e provar de onde vem cada contato?**
>
> O Rastreamento Avançado da Renke entrega tudo pronto: scripts, configurações e integrações. Sem
> programação, sem ferramenta cara, sem achismo. Instala, entrega e prova ROI real.
>
> **Quero acesso ao Rastreamento Avançado →**
>
> *Sem dependência de software terceiro. Plug & play.*

---

#### Notas SEO

⚠️ Não especificadas no briefing. Sugestão a validar:
- Keywords: rastreamento de conversão WhatsApp, UTM WhatsApp, rastreamento de leads

---

### Cultura Pro

**Rota:** `/academy/cultura-pro`
**Público:** donos de agência que querem construir cultura sem virar RH corporativo.

---

#### SEÇÃO 1 · HERO

*[Logo Renke Academy]*

**H1:**
> Sua agência cresce, mas a equipe não acompanha. O problema é cultura.

**Subheadline:**
> O Cultura Pro é o método da Renke para construir cultura organizacional de verdade numa agência.
> Não é RH corporativo adaptado. É o que funciona quando você tem 10-20 pessoas e precisa que elas
> operem sem você no meio. Ensinado por quem errou, acertou e tem GPTW para provar.

**CTA:** Quero construir cultura na minha agência →

**Visual:** [imagem]

---

#### SEÇÃO 2 · PARA QUEM É

**H2:** Se você...

- Sente que a equipe só funciona quando você tá em cima
- Já perdeu gente boa porque o ambiente não segurou
- Quer que a agência rode mesmo quando você não está
- Não quer copiar modelo corporativo, quer algo que funcione para agência de verdade
- Sabe que precisa de cultura mas não sabe por onde começar sem parecer forçado

---

#### SEÇÃO 3 · O QUE VOCÊ APRENDE

**H2:** O que você aprende
**Sub:** No Cultura Pro você aprende...

*(grid 2×2 com imagem por bloco)*

**Os erros reais da Renke**
> O que fizemos errado antes de acertar. Os bastidores sem filtro de quem quase quebrou a cultura
> antes de construir uma de verdade.

**Rituais que funcionam**
> Reuniões, feedbacks, alinhamentos, celebrações. O que manter e o que cortar. Sem burocracia, só o
> que gera resultado.

**Autonomia sem caos**
> Como dar liberdade sem perder controle. Processos que guiam sem sufocar. O equilíbrio que faz a
> equipe rodar sem depender de você.

**Retenção real**
> Como fazer gente boa querer ficar. Não com salário absurdo, mas com ambiente, propósito e
> crescimento tangível.

---

#### SEÇÃO 4 · COMO FUNCIONA

**Módulos práticos**
> Conteúdo direto ao ponto com os bastidores reais da Renke. Cada módulo é um pilar de cultura que
> você aplica na semana seguinte.

**Frameworks e templates**
> Modelos de rituais, scripts de feedback, estrutura de onboarding, playbook de cultura. Tudo pronto
> para adaptar.

---

#### SEÇÃO 5 · O PROBLEMA

| Sem cultura intencional | Com cultura construída |
|---|---|
| Turnover alto, equipe desmotivada, você apagando incêndio todo dia. Contrata, treina, perde. Repete. A agência cresce em faturamento mas encolhe em energia. | Equipe que opera sem você em cima. Gente boa que fica. Autonomia com alinhamento. Você para de ser o gargalo e vira o líder que a agência precisa para escalar. |

---

#### SEÇÃO 6 · OS NÚMEROS

| GPTW | 30+ pessoas | 4+ anos | Baixo turnover |
|---|---|---|---|
| Certificação conquistada | operando com cultura real | construindo e iterando | gente boa que fica |

---

#### SEÇÃO 7 · DIFERENCIAL

> *"Não é teoria de livro de gestão. É o método de quem já errou e acertou dentro de uma agência.
> Com certificação GPTW para provar."*

---

#### SEÇÃO 8 · SOBRE A RENKE

**H2:** Método da Renke, com selo GPTW

> O Cultura Pro nasce dos erros e acertos reais da Renke Studio. Uma agência que cresceu de 5 para
> 30+ pessoas sem perder a essência. Com certificação GPTW conquistada na prática, você aprende com
> quem vive cultura todo dia.

**Visual:** [Imagem]

---

#### SEÇÃO 9 · CTA FINAL

> **Sua agência vai continuar perdendo gente boa e dependendo de você para tudo funcionar...
> ou você vai construir uma cultura que faz a equipe operar sem você no meio?**
>
> O Cultura Pro te entrega o método completo: rituais, feedbacks, onboarding, autonomia e retenção.
> Tudo testado na Renke, com GPTW para provar que funciona.
>
> **Quero construir cultura de verdade →**
>
> *Método validado com certificação GPTW.*

---

#### Notas SEO

⚠️ Não especificadas no briefing. Sugestão a validar:
- Keywords: cultura organizacional agência, gestão de equipe agência de marketing, GPTW agência

---

## Parte 4 · Institucional

Conversão e recrutamento.

### Contato

**Rota:** `/contato`
**Público:** todos (clínicas, agências, outros). Formulário único com seletor de interesse.

---

#### SEÇÃO 1 · HERO + FORMULÁRIO

**H1:** Vamos conversar?

**Sub:** Preencha o formulário e a gente responde em até 24h.

**Canais diretos:**
> 📧 contato@renkestudio.com.br

**Formulário:**
- Nome
- E-mail
- WhatsApp
- **Qual o seu interesse?** (seletor)
  - Protocolo Revena (para clínicas)
  - Renke Academy (para agências)
  - Outro assunto
- Mensagem (opcional)

**Botão:** Enviar →

---

#### SEÇÃO 2 · PROVA SOCIAL

| +140 clínicas atendidas | +650 alunos no Academy | 6 anos de operação |
|---|---|---|

**[LOGOS DE CLIENTES E PARCEIROS]** — mistura de logos de clínicas + agências parceiras.

⚠️ "6 anos de operação" conflita com "4 anos" usado no restante do site. Ver
análise (`docs/05-analise/analise-do-briefing.md`).

---

#### SEÇÃO 3 · FAQ

*(no briefing consta como "SEÇÃO 5" — a numeração pula)*

**H2:** Perguntas frequentes

**O que a Renke faz?**
> Somos uma empresa de Revenue Operations. Conectamos marketing, comercial e dados em um sistema só.
> Atendemos clínicas (Studio), ensinamos agências (Academy) e desenvolvemos tecnologia própria (Tools).

**O Academy é só para agências de saúde?**
> Não. O modelo que ensinamos foi validado em saúde, mas se aplica a qualquer agência que queira sair
> do modelo genérico e criar uma operação de alto valor.

**Vocês fazem site e identidade visual para qualquer empresa?**
> Sim. Nossos produtos digitais (site institucional e identidade visual) atendem qualquer negócio que
> precise de presença digital profissional.

**Onde ficam?**
> Blumenau, SC. Mas operamos 100% remoto com clientes de todo o Brasil.

⚠️ O schema declara **FAQ com 5 perguntas**, mas há **4** transcritas. Falta uma.

---

#### SEÇÃO 4 · INFORMAÇÕES DE CONTATO

*(no briefing consta como "SEÇÃO 6")*

**Renke Studio**

**Endereço:**
> Blumenau, SC
> R. Benjamin Constant, 2364
> Sala Térrea, Escola Agrícola
> CEP 89035-100

**E-mail:** contato@renkestudio.com.br

**CNPJ:** 37.079.656/0001-51

**Horário de atendimento:**
> Segunda a sexta, 08h às 12h | 13h30 às 17h
> Sábados e domingos sem atendimento.

**Redes sociais:**
- Instagram: [@renkestudio](https://instagram.com/renkestudio)
- LinkedIn: /renkestudio
- YouTube: /renkestudio

**[MAPA]** — embed do Google Maps: R. Benjamin Constant, 2364, Blumenau SC

> ℹ️ Este endereço parece ser o **novo endereço** que a página `/faca-parte` sinaliza como pendente
> de atualização. Confirmar se é o mesmo.

⚠️ **Telefone/WhatsApp não informado** no briefing, mas o rodapé prevê um campo `[Telefone]` e o
sitemap prevê "WhatsApp direto". Falta o número.

---

#### Notas SEO

| Campo | Conteúdo |
|---|---|
| Meta title | Contato \| Renke — Revenue Operations, Academy e Soluções Digitais |
| Meta description | Entre em contato com a Renke. Atendemos clínicas, agências e empresas. Respondemos em até 24h. |
| Schema | FAQ (5 perguntas) + Organization |

**Recomendação adicional:** incluir **LocalBusiness** com endereço, CNPJ, horário de atendimento e
geo-coordenadas — os dados já existem e reforçam SEO local para Blumenau.

---

### Faça Parte

**Rota:** `/faca-parte` (sitemap estratégico usa `/carreiras`)
**Base:** estrutura atual do site, com copy ajustada pro posicionamento RevOps + fotos atualizadas +
novo endereço.

---

#### SEÇÃO 1 · HERO

**H1:** Faça parte do #TEAMRENKE.

> A Renke é a primeira assessoria de Revenue Operations para clínicas de alto padrão **no Brasil**.
> Aqui, a gente conecta marketing, comercial e dados em um sistema só. E faz isso com um time enxuto,
> autônomo e obcecado por resultado.
>
> Se você quer trabalhar com propósito, liberdade e evolução constante: esse é o lugar.

**CTA:** Deixe seu currículo ↓

**Visual:** [Ícone de vídeo ou foto do time]
> ⚠️ **TROCAR:** usar foto atualizada dos colaboradores ativos. A atual está desatualizada.
> Foto atual disponível em `docs/assets/briefing/time-renke.png`.

⚠️ Note que aqui a frase é "primeira assessoria... **no Brasil**", enquanto a home e o /sobre dizem
"**do mundo**". Padronizar.

---

#### SEÇÃO 2 · DEPOIMENTOS DO TIME

**Eyebrow:** O sentimento de fazer parte
**H2:** Veja o que o time diz

**[VÍDEO ou CARROSSEL DE DEPOIMENTOS]**
> ⚠️ **TROCAR:** gravar novos depoimentos com colaboradores ativos. Os atuais estão desatualizados.

---

#### SEÇÃO 3 · GPTW

**H2:** Somos GPTW: um ótimo lugar para trabalhar e evoluir.

> Receber o selo Great Place to Work é reflexo de um compromisso diário com o bem-estar e o
> desenvolvimento de cada pessoa do time. Aqui, suas ideias são ouvidas, seu crescimento é levado a
> sério e o ambiente é leve, criativo e humano.
>
> **Não é só um selo. É como a gente opera todo dia.**

**Visual:** [Imagem do selo GPTW ou foto da celebração]

---

#### SEÇÃO 4 · CULTURA

**Eyebrow:** #TEAMRENKE
**H2:** No que acreditamos

> Liberdade com autorresponsabilidade. Criatividade com método. Evolução pessoal como parte do
> trabalho, não como extra.
>
> Nossa filosofia não é um time que constrói a empresa. É uma empresa que constrói pessoas. Um
> ambiente que te ajuda a ampliar seu nível de felicidade por meio do trabalho, com pessoas plurais
> que compartilham uma mesma visão: fazer diferente, com excelência.

**Os 4 valores:**

| Liberdade | Autorresponsabilidade | Conexão | Evolução |
|---|---|---|---|
| Você decide como, quando e de onde trabalhar. Confiamos no seu julgamento. | Liberdade vem com responsabilidade. A entrega é sua, o compromisso é com o resultado. | Somos uma tribo. O bem do grupo é inegociável. Colaboração é o padrão, não a exceção. | Crescer como profissional aqui é tão importante quanto entregar resultado. |

---

#### SEÇÃO 5 · NOSSA SEDE

*(no briefing consta como "SEÇÃO 6")*

**H2:** Onde a mágica acontece

> ⚠️ **ENDEREÇO MUDOU. Atualizar com novo endereço:** `[NOVO ENDEREÇO AQUI]`
>
> Provável novo endereço (conforme `/contato`): R. Benjamin Constant, 2364, Sala Térrea, Escola
> Agrícola, Blumenau/SC, CEP 89035-100. **Confirmar.**

> Operamos de forma híbrida com o time, com base física pra quem quiser um café e um papo presencial.

**[FOTOS DA NOVA SEDE]**
> ⚠️ **TROCAR:** fotos do novo espaço. A sede anterior não vale mais.
> Foto atual disponível em `docs/assets/briefing/sede-renke.png`.

---

#### SEÇÃO 6 · FORMULÁRIO

**H2:** Quer fazer parte?

> Mesmo sem vaga aberta, a gente recebe currículos. Se você se identifica com o que leu aqui e quer
> trabalhar com RevOps, saúde e tecnologia: manda seu currículo.

**Campos:**
- Nome
- E-mail
- WhatsApp
- **Área de interesse** (seletor)
  - Marketing / Performance
  - CRM / Comercial
  - Tecnologia / Automações
  - Design / Conteúdo
  - Outra
- Link do currículo ou portfólio

**Botão:** Enviar currículo →

---

#### Notas SEO

| Campo | Conteúdo |
|---|---|
| Meta title | Faça Parte \| Renke — Trabalhe com RevOps, saúde e tecnologia |
| Meta description | Venha fazer parte do #TeamRenke. Ambiente GPTW, liberdade, evolução e trabalho com propósito. Envie seu currículo. |
| Schema | Organization + JobPosting (quando houver vaga) |

---

## O que ainda falta escrever

Copy que o briefing prevê mas não entregou. Lista completa e atualizada em
`docs/05-analise/pendencias-e-proximos-passos.md`.

### Prioridade alta — bloqueia páginas já mapeadas
- [ ] **Home · Seção 5 (CTA final)** — copy inexistente
- [ ] **Home · FAQ** (4 perguntas) — exigida pelo schema declarado
- [ ] **Home · seções previstas no sitemap e ausentes na copy**: "Visual jornada", "Por que a Renke e
      não mais uma agência?", "Metáfora do corpo"
- [ ] **Revena Full · Seção Resultados**
- [ ] **Revena Scale · Seção Resultados**
- [ ] **Revena Core · Seção Resultados**
- [ ] **Revena Start · Seção 5** (ou renumerar)
- [ ] **Contato · 5ª pergunta do FAQ**

### Prioridade alta — páginas inteiras sem copy
- [ ] `/studio` — visão geral do Studio
- [ ] `/sobre` — quem somos, história, tese, time, números, cultura
- [ ] `/cases` — depende dos cases reais (ver seção 3)
- [ ] `/tools` — Renke CRM, Connect, Pulse AI + waitlist

### Prioridade média
- [ ] `/studio/site-institucional`
- [ ] `/studio/identidade-visual`
- [ ] `/academy/clickup-on-track`
- [ ] `/academy/crm-sheets`
- [ ] Notas SEO das 5 páginas de produto da Academy

### Prioridade baixa (pós-lançamento)
- [ ] Blog — primeiros posts das 4 categorias, começando pelo território virgem:
      "o que é revops", "por que trocar de agência não funciona", "quanto custa captar um paciente"

