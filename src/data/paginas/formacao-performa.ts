import type { Pagina } from './tipos';

/**
 * Base: docs/03-copy/formacao-performa.md, no padrão da página da Academy
 * (28/09/2026): hero curto, cartões pretos no lugar da lista, sem rótulos
 * pequenos, sem a dobra da citação e sem aspas no texto.
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
      titulo: ['Formação Performa'],
      semRotulo: true,
      sub: 'De executor reativo para estrategista de performance: um sistema de pensamento estratégico para quem já opera tráfego.',
      cta: 'Fale com a equipe',
    },
    {
      tipo: 'paineis',
      h2: 'Para gestores de tráfego que buscam',
      itens: [
        { icone: 'Target', titulo: ['Segurança', 'nas decisões'], texto: 'Método para pensar a estratégia por trás do tráfego, não só otimizar.' },
        { icone: 'TrendingUp', titulo: ['Resultado', 'de negócio'], texto: 'Conectar o que acontece no gerenciador com o resultado do cliente.' },
        { icone: 'BadgeCheck', titulo: ['Prova', 'de valor'], texto: 'Mostrar ao cliente, com dados, o valor da sua entrega.' },
        { icone: 'Layers', titulo: ['Visão de', 'estrategista'], texto: 'Sair da gestão de tráfego e liderar a estratégia de performance.' },
      ],
    },
    {
      tipo: 'blocos',
      h2: 'O que você recebe',
      largo: true,
      itens: [
        {
          titulo: 'Framework estratégico',
          texto: 'Análise de mercado, definição de canais, estruturação de funis e alocação de verba baseada em dados.',
        },
        {
          titulo: 'Otimização por resultado',
          texto: 'Aprenda a otimizar pelo avanço do funil, agendamento e venda, não apenas por métricas de mídia.',
        },
        {
          titulo: 'Visão consultiva',
          texto: 'Aprenda a discutir estratégia com o cliente e transformar dados em decisões.',
        },
        {
          titulo: 'Integração com comercial',
          texto: 'Use os dados da operação comercial para orientar campanhas e melhorar a performance.',
        },
      ],
    },
    {
      tipo: 'texto',
      h2: 'Quem está por trás da Formação',
      respiro: true,
      paragrafos: [
        'A Formação Performa nasce de quatro anos de operação da Renke Studio em clínicas de alto ticket. Um modelo construído na prática, validado em operações reais e aprimorado continuamente com dados e resultados.',
      ],
    },
    {
      tipo: 'ctaFinal',
      destaque: 'De executor a estrategista de performance.',
      texto: 'Framework, visão consultiva e integração com o comercial para ampliar o impacto da sua operação.',
      cta: 'Conheça a Performa →',
    },
  ],
};
