import type { Pagina } from './tipos';

/** Copy atualizada pelo PR #5, adaptada aos blocos existentes. Base: docs/03-copy/revena-full.md */
export const revenaFull: Pagina = {
  rota: '/studio/revena-full',
  titulo: "Revena Full | Jornada completa do paciente para clínicas",
  descricao:
    'Do primeiro contato ao retorno. Comercial + pós-venda conectados. Para clínicas que já têm equipe e querem retenção real.',
  blocos: [
    {
      tipo: 'hero',
      titulo: ["Revena Full"],
      realce: 1,
      sub: "Uma operação completa para acompanhar cada paciente da aquisição ao retorno, com comercial, relacionamento e dados integrados.",
      cta: "Conheça o Full",
    },
    {
      tipo: 'lista',
      eyebrow: 'Para quem é',
      h2: "Ideal para clínicas que:",
      fundo: 'alt',
      itens: ["Já possuem uma operação comercial consolidada","Têm estrutura dedicada ao atendimento e relacionamento","Querem transformar pós-venda em parte da operação de receita","Buscam aumentar retenção, recorrência e indicação","Precisam de uma jornada do paciente estruturada de ponta a ponta"],
    },
    {
      tipo: 'blocos',
      eyebrow: 'Nossa solução',
      h2: "O que o Full faz",
      itens: [
        {
          titulo: 'Processo comercial completo',
          texto:
            "Do primeiro contato ao fechamento, com sistema, automações, rastreamento e processos estruturados para o time.",
        },
        {
          titulo: 'Acompanhamento pós-venda',
          texto:
            "Comunicações automáticas e personalizadas para orientar, confirmar e acompanhar o paciente no momento certo.",
        },
        {
          titulo: 'Integração com agenda',
          texto:
            "Sistema integrado à agenda para acompanhar retornos, reduzir faltas e dar continuidade à jornada do paciente.",
        },
        {
          titulo: 'Processo que faz paciente voltar',
          texto: "Uma rotina estruturada de relacionamento para aumentar o retorno e manter o paciente próximo da clínica.",
        },
      ],
    },
    {
      tipo: 'etapas',
      eyebrow: 'Como funciona',
      fundo: 'alt',
      h2: ["Etapas do Full"],
      etapas: [
        { n: '1', duracao: '10 dias', nome: 'Onboarding', descricao: "Coleta de acessos, briefing e kick-off para iniciar o projeto." },
        { n: '2', duracao: '30 dias', nome: 'Diagnóstico', descricao: "Mapeamento da jornada do paciente, processos, regras e oportunidades de automação." },
        { n: '3', duracao: '30 dias', nome: 'Implementação', descricao: "Configuração do CRM, automações, integrações e processos da operação." },
        { n: '4', duracao: '30 dias', nome: 'Acompanhamento', descricao: "Monitoramento semanal, ajustes e suporte para garantir a adoção da operação." },
        { n: '5', duracao: 'Opcional', nome: 'Operação contínua', descricao: "Suporte e evolução contínua da operação conforme o momento da clínica." },
      ],
    },
    {
      tipo: 'numeros',
      h2: "O Full integra os 4 pilares da operação",
      itens: ["Controle","Automação","Processo","Experiência"],
      nota: "Uma operação que acompanha o paciente de ponta a ponta, do primeiro contato ao retorno.",
    },
    {
      tipo: 'pendencia',
      o_que:
        'Seção 6 · Resultados — o briefing traz só [IMG]. Recomendação em docs/03-copy/revena-full.md: reaproveitar a estrutura Antes/Depois do Start + bloco global de depoimentos.',
    },
    {
      tipo: 'ctaFinal',
      destaque: "Atendemos uma nova clínica por mês.",
      texto: "Cada projeto começa com um diagnóstico próprio e acompanhamento dedicado em toda a implementação. Sem templates. Sem terceirização.",
      cta: "Agende uma conversa",
    },
  ],
};
