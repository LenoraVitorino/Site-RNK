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
      titulo: ['Seus clientes trocam de agência todo ano.', 'O problema não é a entrega. É o modelo.'],
      realce: 1,
      sub: 'O mercado joga de 2 maneiras. O jogo antigo está matando agências e frustrando clientes. O jogo novo está criando operações lucrativas com poucos clientes e responsabilidade real pelo resultado. A Renke Academy ensina o jogo novo.',
      cta: 'Quero conhecer a Academy →',
    },
    {
      tipo: 'antesDepois',
      h2: 'Dois jogos. Você escolhe qual jogar.',
      fundo: 'alt',
      rotulos: ['O jogo antigo', 'O jogo novo'],
      linhas: [
        [
          'Cliente contrata agência pro tráfego, outra pro conteúdo, alguém implementa um CRM que ninguém usa, e todo mundo decide no feeling. Cada peça solta, nenhuma conversa com a outra. O dono do negócio trabalha cada vez mais sem ver o dinheiro voltar. Troca de agência todo ano achando que o problema é a agência. E a agência? Cobra pouco, entrega muito, perde o cliente mesmo assim, e começa tudo de novo com outro.',
          'Os negócios que estão crescendo com consistência já operam com RevOps. Marketing, comercial e dados como um sistema só. Faturamento previsível. E as agências que operam esse modelo? Poucos clientes, ticket alto, retenção real, margem de verdade. Funciona em saúde, em serviços, em qualquer negócio onde o cliente investe em marketing e precisa de previsibilidade.',
        ],
      ],
    },
    {
      tipo: 'texto',
      fundo: 'alt',
      paragrafos: [
        'A Renke validou esse modelo em <strong>+140 clínicas</strong>. Com metodologia própria (Studio), tecnologia que operacionaliza tudo (Tools), e formação para quem quer aplicar esse jogo no nicho que quiser (Academy).',
        '<em>"Se você continua jogando o jogo antigo, está competindo num mercado que está morrendo."</em>',
      ],
    },
    {
      tipo: 'lista',
      eyebrow: 'Para quem é',
      h2: 'Se você é dono de agência e...',
      itens: [
        'Está preso no modelo "faz tudo para todo mundo" e quer criar um posicionamento real',
        'Entrega resultado pro cliente mas não consegue provar com dados (e cobra pouco por isso)',
        'Quer parar de ser executor de tarefa e virar parceiro estratégico do cliente',
        'Busca um modelo onde poucos clientes + ticket alto = operação lucrativa sem caos',
        'Quer entender RevOps na prática e oferecer isso como serviço de alto valor',
      ],
    },
    {
      tipo: 'blocos',
      eyebrow: 'O que você acessa',
      h2: 'Tudo que a Renke usa para operar, aberto para você modelar',
      fundo: 'alt',
      largo: true,
      itens: [
        {
          titulo: 'Metodologia Revena completa',
          texto:
            'O framework que usamos para operar o Studio. Como nos posicionamos, como vendemos, como entregamos, como precificamos, como gerimos. O sistema operacional inteiro, não um resumo.',
        },
        {
          titulo: 'Processos reais de operação',
          texto:
            'Playbooks, scripts, fluxos de automação, modelos de relatório, rotinas semanais. Não é template genérico. É o que usamos hoje, com 30 clínicas ativas.',
        },
        {
          titulo: 'Stack técnica documentada',
          texto:
            'Ferramentas, configurações de CRM, modelos de rastreamento, lógica de integração. Operação real, não teoria.',
        },
        {
          titulo: 'Comunidade de operadores',
          texto:
            'Acesso a outros donos de agência que estão implementando o mesmo modelo. Troca real entre quem faz.',
        },
      ],
    },
    {
      tipo: 'texto',
      eyebrow: 'A tese',
      h2: 'O mercado te ensinou errado',
      paragrafos: [
        'O modelo tradicional de agência: muitos clientes, ticket baixo, equipe grande, margem pequena, cliente que troca de agência todo ano. <strong>Escalar assim é cavar sua cova.</strong>',
        'O modelo Renke: poucos clientes, entrega sofisticada, responsabilidade pelo resultado de receita, precificação por valor, não por hora. <strong>Menos clientes, mais lucro, mais controle.</strong>',
        '<em>"Você não abriu uma agência para ter uma vida pior do que tinha antes dela."</em>',
      ],
    },
    {
      tipo: 'produtos',
      eyebrow: 'Produtos',
      h2: 'Nossos Cursos',
      sub: 'Trilha completa ou módulos independentes',
      fundo: 'alt',
      itens: [
        {
          titulo: 'Protocolo Renke',
          texto:
            'O sistema operacional inteiro de uma operação de RevOps lucrativa. Posicionamento, venda, entrega, precificação, gestão de equipe. 100% dos bastidores abertos para você modelar no seu nicho.',
          rota: '/academy/protocolo-renke',
          cta: 'Saiba Mais',
        },
        {
          titulo: 'Formação Performa',
          texto: 'De executor reativo para estrategista de performance. Sistema de pensamento, não curso de botão.',
          rota: '/academy/formacao-performa',
          cta: 'Saiba Mais',
        },
        {
          titulo: 'Treinamento de CRM',
          texto:
            'Uma nova linha de receita para sua agência: implementação de CRM como serviço de alto valor. Método testado em 200+ projetos.',
          rota: '/academy/treinamento-crm',
          cta: 'Saiba Mais',
        },
        {
          titulo: 'Rastreamento Avançado',
          texto:
            'Prove retorno real de WhatsApp e formulários sem depender de software terceiro. Recebe tudo pronto, instala e entrega.',
          rota: '/academy/rastreamento-avancado',
          cta: 'Saiba Mais',
        },
        {
          titulo: 'Cultura Pro',
          texto:
            'Cultura organizacional para agências, ensinada por quem tem certificação GPTW. Os erros e acertos reais da Renke.',
          rota: '/academy/cultura-pro',
          cta: 'Saiba Mais',
        },
      ],
    },
    {
      tipo: 'pendencia',
      o_que:
        'ClickUp On Track e CRM Sheets aparecem no sitemap e na hierarquia de produtos, mas não estão nesta lista nem têm copy.',
    },
    {
      tipo: 'ctaFinal',
      destaque: 'A Renke Academy não é para todo mundo.',
      texto:
        'É para quem quer parar de ser agência genérica e construir uma operação com posicionamento, método e margem real.',
      cta: 'Falar com a equipe →',
    },
  ],
};
