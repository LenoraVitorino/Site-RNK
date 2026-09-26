import type { Pagina } from './tipos';
import { ctaProtocolo } from './comuns';

/** Copy literal de docs/03-copy/revena-start.md */
export const revenaStart: Pagina = {
  rota: '/studio/revena-start',
  titulo: 'Protocolo Revena Start | Estruturação comercial para clínicas em 90 dias',
  descricao:
    'Do lead ao paciente na cadeira. CRM, processo, automações e dados implementados em 90 dias. Para clínicas de alto padrão.',
  blocos: [
    {
      tipo: 'hero',
      titulo: ['Revena Start'],
      centro: true,
      sub: 'Organizamos seu processo comercial em 90 dias, do primeiro contato ao fechamento, com dados, automações e rastreamento.',
      cta: 'Conheça o Start',
    },
    {
      tipo: 'lista',
      h2: 'Ideal para clínicas que:',
      fundo: 'alt',
      numerada: true,
      itens: [
        'Já possuem uma operação comercial ativa',
        'Investem em aquisição de pacientes',
        'Têm equipe dedicada ao atendimento',
        'Precisam rastrear a jornada do lead ao fechamento',
        'Querem tomar decisões comerciais com dados confiáveis',
      ],
    },
    {
      tipo: 'blocos',
      h2: 'O que o Start faz',
      largo: true,
      itens: [
        {
          titulo: 'Marketing conectado ao comercial',
          texto: 'Rastreie a origem de cada lead e acompanhe sua jornada até o fechamento.',
        },
        {
          titulo: 'Processo comercial estruturado',
          texto: 'Roteiros, etapas e critérios claros, com recuperação de oportunidades que ficaram pelo caminho.',
        },
        {
          titulo: 'Automação da operação',
          texto: 'Follow-ups, lembretes, confirmações e alertas acontecendo no momento certo.',
        },
        {
          titulo: 'Dados que orientam decisões',
          texto: 'Uma fonte única e confiável: custo por paciente, conversão por etapa e performance por canal.',
        },
      ],
    },
    {
      tipo: 'etapas',
      fundo: 'alt',
      h2: ['Etapas do Start'],
      etapas: [
        { n: '1', duracao: '10 dias', nome: 'Onboarding', descricao: 'Acessos, briefing e alinhamento inicial.' },
        { n: '2', duracao: '30 dias', nome: 'Diagnóstico', descricao: 'Mapeamento da jornada, processos, canais e oportunidades.' },
        { n: '3', duracao: '30 dias', nome: 'Implementação', descricao: 'Configuração do sistema, automações, rastreamento e treinamento.' },
        { n: '4', duracao: '30 dias', nome: 'Acompanhamento', descricao: 'Monitoramento, ajustes e suporte à equipe.' },
        { n: '5', duracao: 'Opcional', nome: 'Operação contínua', descricao: 'Acompanhamento da operação conforme a evolução da clínica.' },
      ],
      fechamento:
        'Um processo acompanhado de perto. Acompanhamos sua operação, analisamos os dados e ajustamos o que for necessário para que o processo continue funcionando.',
    },
    {
      tipo: 'antesDepois',
      h2: 'O que você passa a ter em 90 dias.',
      rotulos: ['Operação', 'Resultado'],
      linhas: [
        ['Rastreabilidade', 'Origem e jornada de cada paciente acompanhadas de ponta a ponta.'],
        ['Processo comercial', 'Etapas, critérios e rotinas definidos para toda a equipe.'],
        ['Recuperação', 'Follow-ups estruturados para oportunidades que não avançaram.'],
        ['Dados', 'Uma fonte confiável para acompanhar a operação comercial.'],
        ['Inteligência', 'Indicadores para entender conversão, custo e performance por canal.'],
        ['Continuidade', 'Processos documentados, treináveis e independentes de pessoas.'],
      ],
    },
    ctaProtocolo,
  ],
};
