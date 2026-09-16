import type { Pagina } from './tipos';

/**
 * Copy literal de docs/03-copy/formacao-performa.md
 * Notas SEO não especificadas no briefing — title e descrição abaixo são sugestão a validar.
 */
export const formacaoPerforma: Pagina = {
  rota: '/academy/formacao-performa',
  titulo: 'Formação Performa | De executor reativo para estrategista de performance',
  descricao:
    'Sistema de pensamento estratégico para quem já opera tráfego mas quer parar de apertar botão e começar a pensar como estrategista.',
  blocos: [
    {
      tipo: 'hero',
      titulo: ['De executor reativo', 'para estrategista de performance'],
      realce: 1,
      sub: 'A Formação Performa é um sistema de pensamento estratégico para quem já opera tráfego mas quer parar de apertar botão e começar a pensar como estrategista.',
      cta: 'Quero conhecer a Formação Performa →',
    },
    {
      tipo: 'lista',
      eyebrow: 'Para quem é',
      h2: 'Se você...',
      fundo: 'alt',
      itens: [
        'Faz tráfego mas não tem muita segurança nas decisões estratégicas',
        'Sabe que poderia entregar mais resultado para o cliente que confiou em você',
        'Sabe otimizar, mas não tem método para pensar na estratégia por trás do tráfego',
        'Quer conectar o que faz no gerenciador com o resultado real do cliente',
        'Gera resultado mas não prova valor para o cliente',
        'Quer subir de nível: de gestor de tráfego para estrategista de performance',
      ],
    },
    {
      tipo: 'blocos',
      eyebrow: 'Na Formação Performa você aprende...',
      h2: 'O que você recebe',
      largo: true,
      itens: [
        {
          titulo: 'Framework estratégico',
          texto:
            'Como pensar antes de executar. Análise de concorrência, definição de canais, estruturação de funis, alocação de verba baseada em dados reais.',
        },
        {
          titulo: 'Otimização por resultado, não por métrica de vaidade',
          texto:
            'Como parar de olhar para CPL e começar a otimizar por avanço de funil, agendamento e venda.',
        },
        {
          titulo: 'Visão consultiva',
          texto:
            'Como conversar com o cliente sobre estratégia, não só sobre relatório. Como se posicionar como parceiro, não como executor.',
        },
        {
          titulo: 'Integração com comercial',
          texto:
            'Como usar os dados do comercial para melhorar as campanhas. O circuito que separa gestores medianos de estrategistas.',
        },
      ],
    },
    {
      tipo: 'texto',
      centro: true,
      fundo: 'alt',
      paragrafos: [
        '<em>"Não é curso de botão. É sistema de pensamento estratégico. Quem sai daqui pensa diferente antes de abrir o gerenciador."</em>',
      ],
    },
    {
      tipo: 'texto',
      eyebrow: 'Sobre a Renke',
      h2: 'Quem está por trás da Formação',
      paragrafos: [
        'A Formação Performa nasce da operação da Renke Studio. Não é teoria emprestada de livro gringo. É o sistema que roda há 4 anos com clínicas de alto ticket, validado com verba real, resultado real e cliente real cobrando no WhatsApp todo dia.',
      ],
    },
    {
      tipo: 'ctaFinal',
      destaque:
        'Você vai continuar otimizando CPL enquanto o cliente cancela... ou vai aprender a pensar como estrategista?',
      texto:
        'A Formação Performa é para quem quer parar de reagir e começar a liderar a estratégia. Framework, visão consultiva, integração com comercial e um sistema de pensamento que muda como você opera.',
      cta: 'Quero sair do modo executor →',
    },
  ],
};
