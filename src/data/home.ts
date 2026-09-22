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
  cta: 'Quero conhecer',
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
    media: '03',
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
    fala: 'CRM que organiza sua operação. Leads, oportunidades e vendas rastreados de ponta a ponta.',
    texto: 'Organizamos seu comercial em 90 dias. Processos claros, automações e dados confiáveis.',
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
  { titulo: 'Aquisição sob controle', texto: 'Clareza sobre o investimento por paciente e os canais que realmente geram retorno.' },
  { titulo: 'Mais conversão', texto: 'Acompanhe cada oportunidade até o agendamento e reduza perdas ao longo do processo.' },
  { titulo: 'Processos que funcionam', texto: 'Uma operação comercial estruturada, sem depender de uma única pessoa.' },
  { titulo: 'Investimento mais inteligente', texto: 'Direcione verba para os canais e estratégias com maior potencial de retorno.' },
  { titulo: 'Decisões baseadas em dados', texto: 'Indicadores claros para identificar pontos de perda e definir onde agir.', excedente: true },
  { titulo: 'Crescimento replicável', texto: 'Transforme o que funciona em processo e replique resultados com consistência.', excedente: true },
  { titulo: 'Oportunidades de mercado', texto: 'Inteligência sobre concorrência, movimentos e espaços para novas oportunidades de crescimento.', excedente: true },
];

/** ⚠️ Números placeholder — nota do próprio briefing. */
export const resultados = [
  { especialidade: 'Dermatologia', numero: '19%', texto: 'Taxa de agendamento de 19% alcançada em apenas 90 dias de operação.' },
  { especialidade: 'Otorrino', numero: '29%', texto: 'Leads recuperados com processos comerciais automatizados e follow-ups estruturados.' },
  { especialidade: 'Cirurgia plástica', numero: '38%', texto: 'O digital passou a representar 38% da receita total da clínica.' },
  { especialidade: 'Nutrologia', numero: '24%', texto: 'Pacientes reativados ao longo do trimestre por meio de ações estruturadas de relacionamento.' },
  { especialidade: 'Tricologia', numero: '60 dias', texto: 'Rastreamento completo da origem dos leads, com dados centralizados em um único painel.' },
];

export const formulario = {
  titulo: 'Pronto para transformar a operação da sua clínica?',
  texto:
    'Conecte marketing, vendas e operação para atrair mais pacientes e transformar oportunidades ' +
    'em crescimento.',
  botao: 'Quero saber se faz sentido',
  faixasFaturamento: ['Selecione', 'Até R$100k', 'R$100k – R$300k', 'Acima de R$300k'],
};

/** Os três números do briefing (⚠️ D1): prova social da hero (enquanto não há
 *  retratos de doutores) e cartões do Sobre. Versão do estúdio com "+" e sem
 *  "R$", como em Numeros.astro. */
export const numerosProva = {
  copy: [
    { valor: '~30', legenda: 'clínicas atendidas' },
    { valor: '4 anos', legenda: 'de método validado' },
    { valor: 'R$42M', legenda: 'em faturamento gerado' },
  ],
  estudio: [
    { valor: '+30', legenda: 'clínicas atendidas' },
    { valor: '+4 anos', legenda: 'de método validado' },
    { valor: '+42M', legenda: 'em faturamento gerado' },
  ],
};
