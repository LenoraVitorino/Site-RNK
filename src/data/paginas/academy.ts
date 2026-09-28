import type { Pagina } from './tipos';

/** Copy literal de docs/03-copy/academy.md */
export const academy: Pagina = {
  rota: '/academy',
  titulo: 'Renke Academy | Como construir uma operação de RevOps lucrativa para agências',
  descricao:
    'O modelo de RevOps validado em +140 clínicas, aberto para agências. Método, processos, ferramentas e bastidores reais da Renke.',
  blocos: [
    {
      tipo: 'hero',
      titulo: ['Renke Academy'],
      semRotulo: true,
      sub: 'Aprenda a metodologia para conectar marketing, comercial e dados em uma única operação.',
      cta: 'Fale com a equipe',
    },
    {
      tipo: 'antesDepois',
      h2: 'O valor da sua entrega está além do marketing.',
      fundo: 'alt',
      rotulos: ['O modelo tradicional', 'O modelo RevOps'],
      linhas: [
        [
          'Mais clientes, mais entregas, mais pessoas envolvidas. Tráfego de um lado, conteúdo de outro, comercial separado e decisões baseadas no feeling. A agência entrega cada vez mais, mas continua presa a projetos, escopo e ticket.',
          'Uma operação integrada de marketing, comercial e dados. Menos dispersão, mais controle sobre a receita e uma entrega que gera valor contínuo para o cliente. É esse modelo que a Renke aplica há quatro anos em mais de 140 clínicas.',
        ],
      ],
    },
    {
      tipo: 'texto',
      h2: 'Um novo modelo de entrega.',
      paragrafos: [
        'Aprenda a estruturar processos, tecnologia e operação para ampliar o valor da sua entrega e assumir uma atuação mais estratégica com seus clientes.',
      ],
      topicos: [
        { icone: 'Compass', texto: 'Metodologia própria' },
        { icone: 'Cpu', texto: 'Tecnologia aplicada' },
        { icone: 'Workflow', texto: 'Operação na prática' },
      ],
    },
    {
      tipo: 'paineis',
      h2: 'Para donos de agência que buscam',
      itens: [
        { icone: 'Target', titulo: 'Posicionamento real', texto: 'Sair do modelo que atende todo mundo e se tornar referência no seu nicho.' },
        { icone: 'Handshake', titulo: 'Parceria estratégica', texto: 'Provar resultado com dados e deixar de ser executor para decidir junto com o cliente.' },
        { icone: 'TrendingUp', titulo: 'Operação lucrativa', texto: 'Menos clientes, ticket mais alto e uma operação que cresce sem caos.' },
        { icone: 'Layers', titulo: 'RevOps como serviço', texto: 'Entender RevOps na prática e oferecer ao cliente um serviço de alto valor.' },
      ],
    },
    {
      tipo: 'blocos',
      h2: 'A estrutura por trás da operação',
      fundo: 'alt',
      largo: true,
      itens: [
        {
          titulo: 'Método Revena',
          texto: 'O framework completo que orienta posicionamento, vendas, entrega, precificação e gestão.',
        },
        {
          titulo: 'Processos reais de operação',
          texto:
            'Playbooks, scripts, fluxos de automação, modelos de relatório e rotinas de operação. Estruturados a partir do que aplicamos diariamente nas clínicas.',
        },
        {
          titulo: 'Tecnologia e integrações',
          texto:
            'Ferramentas, configurações de CRM, rastreamento e integrações documentadas para reproduzir a operação na prática.',
        },
        {
          titulo: 'Comunidade de operadores',
          texto:
            'Acesso a uma rede de profissionais que estão implementando o modelo, compartilhando aprendizados, desafios e resultados.',
        },
      ],
    },
    {
      tipo: 'produtos',
      h2: 'Nossos cursos',
      sub: 'Trilha completa ou módulos independentes.',
      fundo: 'alt',
      itens: [
        {
          titulo: 'Protocolo Renke',
          texto: 'O modelo completo de uma operação de RevOps, dos bastidores à gestão.',
          rota: '/academy/protocolo-renke',
          cta: 'Conheça o curso',
        },
        {
          titulo: 'Formação Performa',
          texto: 'Desenvolva uma visão estratégica de performance para tomar decisões além da execução.',
          rota: '/academy/formacao-performa',
          cta: 'Conheça o curso',
        },
        {
          titulo: 'Treinamento de CRM',
          texto: 'Aprenda a estruturar e implementar CRM como uma nova frente de serviço e receita.',
          rota: '/academy/treinamento-crm',
          cta: 'Conheça o curso',
        },
        {
          titulo: 'Rastreamento Avançado',
          texto: 'Aprenda a estruturar rastreamento de WhatsApp e formulários para medir o retorno real das ações.',
          rota: '/academy/rastreamento-avancado',
          cta: 'Conheça o curso',
        },
        {
          titulo: 'Cultura Pro',
          texto: 'Método e experiência prática para estruturar cultura, gestão e desenvolvimento de equipes.',
          rota: '/academy/cultura-pro',
          cta: 'Conheça o curso',
        },
      ],
    },
    {
      tipo: 'ctaFinal',
      destaque: 'Um novo modelo para quem quer ir além da entrega.',
      texto: 'Tudo o que a Renke aplica para construir uma operação mais estruturada, valiosa e rentável.',
      cta: 'Veja como funciona',
    },
  ],
};
