/**
 * Conteúdo da home. Copy original do briefing, sem as correções propostas na
 * análise — essas ficam para a v2.
 * Ver docs/03-copy/home.md
 */

export const seo = {
  titulo: 'Renke | Não somos agência de marketing para clínicas. Somos RevOps.',
  descricao:
    'Marketing, comercial e operação conectados. +140 clínicas, Método validado, R$42M gerado. Protocolo Revena.',
};

export const hero = {
  // ⚠️ D1: conflita com "+140 clínicas" da seção Sobre.
  numeros: ['~30 clínicas', 'Método validado há 4 anos', 'R$42M em faturamento gerado'],
  cta: 'Descubra se faz sentido para sua clínica →',
  lead:
    'Sua clínica fatura bem, mas você não sabe de onde vem cada real nem onde trava quando os ' +
    'números caem. Esse é o problema que resolvemos. Do anúncio ao retorno do paciente, tudo ' +
    'conectado, tudo rastreado.',
  legenda: 'Você não controla o que não enxerga.',
};

/** ⚠️ D9: notas do designer pedem 4 cards; a copy traz 5. O 5º vem marcado. */
export const pilares = [
  {
    icone: 'link/conexão',
    titulo: 'Vamos além do tráfego pago',
    texto:
      'Conectamos marketing ao comercial para lead virar paciente de verdade, não só um número em relatório.',
  },
  {
    icone: 'database',
    titulo: 'Implementamos um CRM que funciona de verdade',
    texto:
      'Processo, jornadas, scripts, time treinado e usando a ferramenta de verdade. Tudo num lugar só pra você confiar no que está vendo.',
    media: '04',
  },
  {
    icone: 'raio/automação',
    titulo: 'Automatizamos o seu atendimento',
    texto:
      'A parte chata, mas que toma tempo. Toda automatizada. Confirmação, lembrete, follow-up, NPS, avaliação do Google, anamnese... Tudo roda sozinho, sem depender de uma pessoa. Seu time foca no que move ponteiro.',
  },
  {
    icone: 'gráfico de barras',
    titulo: 'Dizemos o que fazer todo mês',
    texto:
      'Custo por agendamento. Taxa de comparecimento. Faturamento por canal. Decisão com dado, não com feeling. Tomadas de decisões com a maturidade que um negócio de verdade precisa.',
  },
  {
    icone: '?',
    titulo: 'Construímos seu posicionamento antes de gastar um real',
    texto:
      'Estudamos seus concorrentes a fundo: o que comunicam, onde investem, quais brechas deixam abertas. Depois, construímos uma tese de diferenciação exclusiva pra sua clínica. Você não entra no mercado genérico. Você entra sabendo por que é a escolha óbvia.',
    excedente: true,
  },
];

export const protocolos = [
  {
    label: 'REVENA START',
    fala: 'Faturo legal, mas tô no escuro. Meu comercial não tem estrutura nem dados.',
    texto: 'Organizamos seu processo comercial do zero em 90 dias.',
    rota: '/studio/revena-start',
  },
  {
    label: 'REVENA FULL',
    fala: 'Tenho dificuldade de estruturar e gerir a jornada completa do meu paciente.',
    texto: 'Estruturamos do comercial ao pós-venda. Paciente acompanhado do começo ao fim.',
    rota: '/studio/revena-full',
  },
  {
    label: 'REVENA CORE',
    fala: 'Já entendi que o problema não é só tráfego. Quero um time estratégico que conecte tudo.',
    texto: 'Marketing + comercial + dados operados toda semana por um time dedicado.',
    rota: '/studio/revena-core',
  },
  {
    label: 'REVENA SCALE',
    fala: 'Tenho resultado, mas não metrifico e não sei como crescer e extrair mais do digital.',
    texto: 'Tudo do Core + conteúdo orgânico + reativação da sua base de pacientes.',
    rota: '/studio/revena-scale',
  },
  {
    label: 'REVENA RUN',
    fala: 'Comercial e dados estruturados, mas preciso de alguém pra gerir meu time e meus números.',
    texto: 'Mantemos sua operação comercial funcionando sem você precisar pensar nisso.',
    rota: '/studio/revena-run',
  },
];

/** ⚠️ D8: o layout pede grid 2×2 (4 slots); a copy traz 7 perguntas. */
export const perguntas = [
  { texto: 'Quanto custa um paciente novo pra sua clínica? De verdade, não o que a agência diz.' },
  { texto: 'Dos leads que chegam, quantos sentam na cadeira do seu consultório?' },
  { texto: 'Se sua secretária sai amanhã, o processo continua?' },
  { texto: 'Você sabe qual canal trouxe seus melhores pacientes este mês?' },
  { texto: 'No mês que o resultado não foi bom, você encontra o motivo baseado em dados e com facilidade?', excedente: true },
  { texto: 'E no mês que o resultado foi bom, você consegue atribuir o porquê para replicar?', excedente: true },
  { texto: 'Você sabe o que seus concorrentes estão comunicando agora e qual espaço estão deixando aberto pra você?', excedente: true },
];

/** ⚠️ Números placeholder — nota do próprio briefing. */
export const resultados = [
  { especialidade: 'Dermatologia', antes: 'Taxa de agendamento baixa', numero: '7% → 19%', depois: 'em 90 dias' },
  { especialidade: 'Otorrino', antes: 'Comercial sem tempo para fazer follow-up e resgates', numero: '29%', depois: 'Processo automatizado e recuperação de leads' },
  { especialidade: 'Cirurgia plástica', antes: 'Raramente vendia para leads do tráfego', numero: '38%', depois: 'Digital responsável por 38% da receita' },
  { especialidade: 'Nutrologia', antes: 'Pacientes sumiam depois do 1º protocolo', numero: '24%', depois: 'reativados no trimestre' },
  { especialidade: 'Tricologia', antes: 'Não mensurava quais leads eram do tráfego e quais do orgânico', numero: '60 dias', depois: 'Painel unificado com tudo rastreado' },
];

export const formulario = {
  titulo: 'Antes de trocar de agência de novo, descubra o que é RevOps.',
  texto:
    'O problema da maioria das clínicas não é o canal de marketing. É que ninguém conecta o ' +
    'anúncio ao paciente na cadeira. Isso tem nome: falta de RevOps. Preencha o formulário e veja ' +
    'se faz sentido para sua clínica.',
  botao: 'Quero saber se faz sentido',
  faixasFaturamento: ['Selecione', 'Até R$100k', 'R$100k – R$300k', 'Acima de R$300k'],
};
