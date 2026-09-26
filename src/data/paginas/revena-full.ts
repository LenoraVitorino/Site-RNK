import type { Pagina } from './tipos';
import { ctaProtocolo } from './comuns';

/** Copy literal de docs/03-copy/revena-full.md */
export const revenaFull: Pagina = {
  rota: '/studio/revena-full',
  titulo: 'Protocolo Revena Full | Jornada completa do paciente para clínicas',
  descricao:
    'Do primeiro contato ao retorno. Comercial + pós-venda conectados. Para clínicas que já têm equipe e querem retenção real.',
  blocos: [
    {
      tipo: 'hero',
      titulo: ['Revena Full'],
      centro: true,
      sub: 'Uma operação completa para acompanhar cada paciente da aquisição ao retorno, com comercial, relacionamento e dados integrados.',
      cta: 'Conheça o Full',
    },
    {
      tipo: 'lista',
      h2: 'Ideal para clínicas que:',
      fundo: 'alt',
      numerada: true,
      itens: [
        'Já possuem uma operação comercial consolidada',
        'Têm estrutura dedicada ao atendimento e relacionamento',
        'Querem transformar pós-venda em parte da operação de receita',
        'Buscam aumentar retenção, recorrência e indicação',
        'Precisam de uma jornada do paciente estruturada de ponta a ponta',
      ],
    },
    {
      tipo: 'blocos',
      h2: 'O que o Full faz',
      sub: 'Reúne toda a estrutura do Revena Start e amplia a operação para o pós-venda, retorno e relacionamento com o paciente.',
      largo: true,
      itens: [
        {
          titulo: 'Processo comercial completo',
          texto: 'Do primeiro contato ao fechamento, com sistema, automações, rastreamento e processos estruturados para o time.',
        },
        {
          titulo: 'Acompanhamento pós-venda',
          texto: 'Comunicações automáticas e personalizadas para orientar, confirmar e acompanhar o paciente no momento certo.',
        },
        {
          titulo: 'Integração com agenda',
          texto: 'Sistema integrado à agenda para acompanhar retornos, reduzir faltas e dar continuidade à jornada do paciente.',
        },
        {
          titulo: 'Processo que faz paciente voltar',
          texto: 'Uma rotina estruturada de relacionamento para aumentar o retorno e manter o paciente próximo da clínica.',
        },
      ],
    },
    {
      tipo: 'etapas',
      fundo: 'alt',
      h2: ['Etapas do Full'],
      etapas: [
        { n: '1', duracao: '10 dias', nome: 'Onboarding', descricao: 'Coleta de acessos, briefing e kick-off para iniciar o projeto.' },
        { n: '2', duracao: '30 dias', nome: 'Diagnóstico', descricao: 'Mapeamento da jornada do paciente, processos, regras e oportunidades de automação.' },
        { n: '3', duracao: '30 dias', nome: 'Implementação', descricao: 'Configuração do CRM, automações, integrações e processos da operação.' },
        { n: '4', duracao: '30 dias', nome: 'Acompanhamento', descricao: 'Monitoramento semanal, ajustes e suporte para garantir a adoção da operação.' },
        { n: '5', duracao: 'Opcional', nome: 'Operação contínua', descricao: 'Suporte e evolução contínua da operação conforme o momento da clínica.' },
      ],
    },
    {
      tipo: 'numeros',
      h2: 'O Full integra os 4 pilares da operação',
      itens: ['Controle', 'Automação', 'Processo', 'Experiência'],
      grade: true,
      nota: 'Uma operação que acompanha o paciente de ponta a ponta, do primeiro contato ao retorno.',
    },
    {
      tipo: 'antesDepois',
      h2: 'O impacto de uma operação completa',
      rotulos: ['Operação', 'Resultado'],
      linhas: [
        ['Jornada completa', 'Acompanhamento estruturado do primeiro contato ao retorno.'],
        ['Pós-venda', 'Paciente acompanhado após o procedimento, com comunicações no momento certo.'],
        ['Relacionamento', 'Contato contínuo com a base, sem depender de ações manuais.'],
        ['Agenda integrada', 'Mais controle sobre retornos, confirmações e faltas.'],
        ['Retenção', 'Processos estruturados para aumentar o retorno dos pacientes.'],
        ['Recorrência', 'Mais oportunidades de continuidade ao longo da jornada.'],
      ],
    },
    ctaProtocolo,
  ],
};
