---
target: home (src/pages/index.astro)
total_score: 16
max_score: 36
na_heuristics: 10
p0_count: 2
p1_count: 3
target_identity: "file:/Users/lenoravitorino/Renke/src/pages/index.astro"
target_fingerprint: "sha256:87fc620e48c1d1bbd4aec961f717027a947bdbb11a2b4dd1832dfa94fa256ae9"
target_path: /Users/lenoravitorino/Renke/src/pages/index.astro
timestamp: 2026-09-21T01-55-40Z
slug: src-pages-index-astro
closed: true
---
Método: dual-agent (A: revisão de design · B: detector + navegador). Alvo: home, src/pages/index.astro, versão do estúdio, em http://localhost:4350. Data: 20/09/2026.

## Placar de saúde do design

| # | Heurística | Nota | Problema-chave |
|---|---|---|---|
| 1 | Visibilidade do status | 2 | Hero fica ~3 s sem a mensagem final; o envio do formulário só recarrega a página; o header some nas 5 telas do palco |
| 2 | Correspondência com o mundo real | 2 | "RevOps", "operação de receita", Start/Run/Scale/Core/Full: vocabulário de quem vende. Só o extrato fala em Dermatologia e agendamento |
| 3 | Controle e liberdade | 1 | Três dobras presas ao scroll (hero, palco com snap, Sobre); vídeo em autoplay; "Fale com a gente" inacessível durante o palco |
| 4 | Consistência e padrões | 2 | Cinco rótulos para o mesmo /contato; três contagens de clientes (hero "00", Sobre "+30", meta description "+140") |
| 5 | Prevenção de erros | 1 | Formulário sem required e sem action: o submit faz GET com nome e WhatsApp na URL; sete links levam a "#" |
| 6 | Reconhecimento em vez de memorização | 2 | O palco mostra um plano por tela; comparar exige lembrar os quatro anteriores |
| 7 | Flexibilidade e eficiência | 2 | Âncoras dos planos e skip link ajudam; não dá para pular a cena da hero; no celular o CTA só existe dentro do menu |
| 8 | Estética e design minimalista | 3 | Superfície disciplinada (uma família, um acento). O conteúdo não: selo repete o lead, 7 benefícios parecidos, 3 fotos repetidas 2× |
| 9 | Recuperação de erros | 1 | Nenhum estado de erro na página; o único socorro é um aviso de 12 px com mailto |
| 10 | Ajuda e documentação | n/a | Landing sem tarefa que exija documentação |
| Total | | 16/36 | Fraco (44%) |

## Veredito de especificidade

Avaliação de design: a página é uma coleção bem executada de momentos de outros sites (hero, reel na moldura, palco, esteira, extrato, letreiro), e o próprio docs/04-design/home-v2-estrutura.md cataloga a origem de cada dobra. O que é da Renke aparece em quatro lugares: o risco em "não é marketing → RevOps.", os símbolos dos planos, o painel "Limitado a 1 nova clínica por mês" e o extrato por especialidade. O resto da copy é intercambiável com qualquer consultoria. A voz específica existe no repositório (hero.lead da copy literal, pilares-estudio.ts com "custo por agendamento", "taxa de comparecimento") e foi justamente o que a versão do estúdio tirou da tela. A tese "Você não controla o que não enxerga." está no rodapé, em itálico.

Varredura determinística: o detector rodou limpo nos 29 arquivos de marcação (saída 0, com teste de controle provando que .astro é lido). No CSS (src/styles/home2.css) há 4 achados: gradient-text na linha 334 (falso positivo: é a técnica do risco da hero, dois tons com corte duro, não decoração), transition em width na 128 (barra de 10 px dentro do botão, custo desprezível), padding-left na 240 (hover do menu) e margin na 550 (cartas do Protocolos, que não está na home). O overlay na página achou 5 padrões: contraste 3,7:1 no rótulo "Resultados" (home2.css:789, #757575 sobre #e8e7df), padding colado na arte do cartão Tools (AcademyTools.astro:27), kicker "Por dentro da Renke" acima do H2 do Sobre (Sobre.astro:41), sete rótulos numerados 01–07 nas perguntas (Perguntas.astro:41), marquee do letreiro (pausa só no hover e no reduced-motion) e dois "clipped-overflow" na moldura do telefone, que são falsos positivos (o recorte do vídeo é intencional).

Onde as duas avaliações se encontram: o contraste do rótulo "Resultados" (3,71:1 medido por A, 3,7:1 pelo detector), o letreiro sem pausa e os sete benefícios numerados. O detector pegou o que a revisão não viu: o kicker do Sobre e a arte do Tools colada na borda.

Overlays: visíveis na aba "[Human] Renke" do navegador embutido.

## Impressão geral

Superfície de estúdio, função de wireframe. A disciplina visual está pronta para as páginas internas, mas a ação principal da home não funciona, a primeira dobra mostra "zero clientes" e a dobra mais cara (o palco) termina sem responder "qual plano é o meu". A maior oportunidade é uma só: colocar a voz e as provas que já existem no repositório nos lugares onde a doutora decide (selo da hero, prova social, formulário).

## O que funciona

1. O risco da hero (Hero.astro:21–30, home2.css:331–341): o único gesto que é argumento e não decoração. Nega a categoria em que o médico vai encaixar a Renke e propõe outra, respeitando reduced-motion e sem JS.
2. O extrato por especialidade (Resultados.astro): Dermatologia, Otorrino, Cirurgia plástica, Nutrologia, Tricologia. É onde a página muda de "consultoria" para "consultoria de clínicas". Os números agora estão em #4A4B46 sobre #e8e7df (7,1:1, ajustado nesta sessão a pedido).
3. Disciplina de superfície: uma família (Inter variável), um acento, botões brancos com seta iguais em toda a página, rótulos em caixa alta com tracking. Contrastes do corpo acima de 7:1 (lead 9,7:1, benefícios 9,4:1, rótulos do formulário 15,6:1).

## Problemas prioritários

[P0] O formulário submete por GET, recarrega a home e coloca nome, WhatsApp e faturamento na URL. Formulario.astro:11 tem form sem action, method ou handler; nenhum campo required; "Selecione" é enviado como valor. Por que importa: é a ação principal da superfície; o único aviso está depois do botão, em 12 px, e um telefone pessoal vai para histórico e logs. Correção: enquanto o envio não existir, trocar o form por um painel com a mesma composição e dois botões reais ("Falar no WhatsApp" via wa.me e "Enviar e-mail"), com a frase "Cada projeto começa com diagnóstico" como reasseguro. Quando ligar: method="post" com action, required em Nome e WhatsApp, option vazia disabled selected, estados enviando/sucesso/erro no lugar do card e uma linha de privacidade antes do botão. Comando: /impeccable harden src/components/home2/Formulario.astro.

[P0] Prova social com "+ de 00" e seis círculos vazios na primeira dobra. ConfiancaHero.astro:4 cai no placeholder porque src/data/doutores.ts:9 tem totalDoutores = null. Para leitor de tela vira "Retratos dos doutores, lista, 0 itens" seguido de "+ de 00 doutores confiam na gente". Por que importa: o dono de clínica lê "zero clientes" no lugar reservado para confiança. Correção: em Hero.astro:36, renderizar ConfiancaHero só quando houver doutores e total; no else, mostrar ali os três números que já existem em Sobre.astro:17–22 (+30 clínicas, +4 anos, R$42M). E alinhar a meta description (home.ts:9 diz "+140 clínicas", a página diz "+30"). Comando: /impeccable onboard src/components/home2/Hero.astro.

[P1] Palco dos planos: cinco telas presas, header escondido, substância em 14 px e nenhum critério de escolha. PlanosPalco.astro:163 esconde o header por ~4.500 px de rolagem; :242 arma o snap 260 ms depois de cada scroll. home2.css:646–647 põe o que o plano faz numa coluna de 160–250 px em 14–18 px; :596 deixa o H2 "Protocolo Revena" a 2,64:1; :618 as âncoras inativas a ~2,4:1. A "fala" em primeira pessoa não tem nome nem aspas. Correção: manter ao menos o botão "Fale com a gente" visível no palco; coluna de texto clamp(280px, 24vw, 420px) e frase clamp(16px, 1.15vw, 19px); uma linha "Para clínicas que…" por plano; alfa ≥ .62 no título e nas âncoras; snap ≥ 600 ms ou só âncoras. Comando: /impeccable layout src/components/home2/PlanosPalco.astro.

[P1] A copy da versão do estúdio apagou a voz que existe no repositório. Hero.astro:9–10 troca hero.lead ("você não sabe de onde vem cada real nem onde trava") por "Estratégia, tecnologia e operação para clínicas de alto padrão que exigem sofisticação"; :20 adiciona um selo que repete o lead. OQueFaz.astro:16–20 tem quatro linhas abstratas com nowrap; o letreiro gira quatro substantivos genéricos. Correção (a confirmar com você, porque muda copy): usar hero.lead ou uma versão enxuta; selo com a tese "Você não controla o que não enxerga."; em OQueFaz, os quatro primeiros pilares de pilares-estudio.ts; no letreiro, quatro métricas ("Custo por agendamento + Taxa de comparecimento + Faturamento por canal + Retorno do paciente"). Comando: /impeccable clarify src/components/home2/Hero.astro.

[P1] No celular não existe caminho permanente para contato, e sete links levam a "#". home2.css:208–216 põe o botão "Fale com a gente" dentro do drawer; em 375 px a página tem ~13.400 px e o formulário está na última dobra. Links mortos: "Ver mais sobre a Renke" (OQueFaz.astro:22 e Sobre.astro:47, /sobre não existe), "Conhecer" dos Tools, e no rodapé Para Clínicas, Tecnologia, Conteúdos, LinkedIn, YouTube (nav.ts:140–149). Correção: um botão /contato fora do nav, ao lado do toggle, visível abaixo de 900 px; para rotas inexistentes, esconder o botão ou trocar por "Em breve" em vez de a[href="#"]. Comando: /impeccable adapt src/components/Header.astro.

## Sinais vermelhos por persona

Alex (experiente, impaciente): espera ~3 s pela frase final da hero sem pista de que dá para pular; no palco, interpolação + snap puxam a página de volta e o header sumiu; procura comparação de planos e não encontra; vê o mesmo /contato com três nomes e desconfia que são destinos diferentes.

Sam (leitor de tela, teclado, zoom 200%): "lista, 0 itens" + "+ de 00" na hero; botão de som com aria-pressed="true" enquanto está mudo (Telefone.astro:28); H2 "Protocolo Revena" a 2,64:1; entre 900 e 1150 px o parágrafo de "Nossa metodologia" encolhe para 12–15 px por causa de min(3.3cqw, 19px) + nowrap (home2.css:1099–1104); no Sobre, o H2 e o CTA ficam dentro de role="group" "Fotos da sede" (Sobre.astro:38); o submit recarrega e perde foco.

Casey (celular, uma mão, conexão lenta): vídeo de 6,6 MB com preload none mostra moldura preta sobre preto com dois botões de 40×40 px; pilha de planos de 3,6 telas sem dizer qual é o dele; no Sobre, título e botão são o primeiro item de um trilho horizontal de ~2.100 px e deslizam para fora; "Fale com a gente" só no hambúrguer; o "01" do CTA final fica a 8% de opacidade atrás do título.

Dra. Renata (dermatologista, dona de clínica, avaliando contratar): "Isso é RevOps." sem explicar; "+ de 00" na hero, "+30" no Sobre, "+140" no Google; cinco planos sem faixa de clínica, sem prazo além de "90 dias" no Start, fala sem nome de médico; "Dermatologia 19%" sem de quanto para quanto; "não somos agência" na hero e "Academy para donos de agências" quatro dobras depois; o formulário pede faturamento sem dizer o que ela ganha e avisa que não funciona.

## Observações menores

- AcademyTools.astro:8 e :15 definem eyebrow "Para Agências"/"Tecnologia" e o template não renderiza; o visitante não recebe o aviso de troca de público. Os H3 desses cartões ficam aninhados sob o H2 "Limitado a 1 nova clínica por mês."
- "+42M em faturamento gerado" sem "R$" (Sobre.astro:20); a copy literal tem "R$42M".
- Três fotos da sede repetidas duas vezes na esteira do Sobre (blocos 1–3 e 4–6).
- Hover das perguntas pinta a borda de amarelo em elementos não clicáveis (falsa affordance).
- Header.astro procura .nav__indicador, que não existe no markup nem no CSS; .rolo (carrossel de logos) tem CSS sem componente. Código morto.
- Kicker "Por dentro da Renke" acima do H2 do Sobre (Sobre.astro:41–42); rótulos 01–07 nas perguntas.
- Rótulo "Resultados" a 3,7:1 (home2.css:789).
- Arte do cartão Tools colada na borda inferior (AcademyTools.astro:27, home2.css:998/1005).
- Letreiro em loop de 42 s com pausa só no hover.
- Diff não commitado em Hero.astro:20 troca o ícone Lucide Sparkles por "✦", um commit depois de "padroniza ícones Lucide".
- Planos na ordem Start, Run, Scale, Core, Full: não é uma escada que o visitante consiga decodificar.
- O live-server do overlay criou .impeccable/live/ (pastas vazias, fora do git).

## Perguntas para destravar

1. Se "Você não controla o que não enxerga." é a tese, por que ela está no rodapé em itálico e não no lugar do selo da hero?
2. O palco existe para o médico escolher um plano ou para a Renke exibir os ícones? Se é para escolher, qual pergunta de uma linha levaria cada dono ao plano certo sem rolar cinco telas?
3. A home diz "não somos agência", vende Academy "para donos de agências" e, no menu, site e identidade visual. Qual das duas histórias esta página quer contar ao médico?
4. Se os números reais (+30 clínicas, 4 anos, R$42M, 19% em 90 dias) são a prova, por que estão na 6ª e na 9ª dobra dentro de um carrossel, enquanto a primeira dobra mostra "+ de 00"?
