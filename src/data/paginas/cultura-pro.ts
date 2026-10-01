import type { Pagina } from './tipos';

/**
 * Base: docs/03-copy/cultura-pro.md, no padrão da página da Academy
 * (28/09/2026): hero curto, cartões pretos no lugar da lista, sem rótulos
 * pequenos e sem aspas no texto.
 * Notas SEO não especificadas no briefing — title e descrição são sugestão a validar.
 */
export const culturaPro: Pagina = {
  rota: '/academy/cultura-pro',
  titulo: 'Cultura Pro | Cultura organizacional para empresas, com selo GPTW',
  descricao:
    'O método da Renke para estruturar cultura organizacional: diagnóstico, estrutura cultural, alinhamento e desenvolvimento de liderança.',
  blocos: [
    {
      tipo: 'hero',
      titulo: ['Cultura Pro'],
      semRotulo: true,
      sub: 'O método da Renke para estruturar cultura organizacional e desenvolver equipes com autonomia e alinhamento.',
      cta: 'Fale com a equipe',
    },
    {
      tipo: 'paineis',
      h2: 'Para quem busca',
      itens: [
        { icone: 'Users', titulo: ['Mais autonomia', 'na equipe'], texto: 'Um time capaz de tomar decisões e avançar sem depender de acompanhamento constante.' },
        { icone: 'Workflow', titulo: ['Mais consistência', 'na operação'], texto: 'Uma equipe alinhada à forma como a empresa trabalha e toma decisões.' },
        { icone: 'BadgeCheck', titulo: ['Liderança', 'que desenvolve'], texto: 'Gestores preparados para orientar, desenvolver e fortalecer suas equipes.' },
        { icone: 'TrendingUp', titulo: ['Crescimento', 'com identidade'], texto: 'Princípios e práticas que acompanham a evolução da empresa sem perder sua identidade.' },
      ],
    },
    {
      tipo: 'blocos',
      h2: 'O que você aprende',
      largo: true,
      itens: [
        {
          titulo: 'Diagnóstico de cultura',
          texto: 'Como identificar padrões, problemas e pontos de atenção na cultura atual da equipe.',
        },
        {
          titulo: 'Estrutura cultural',
          texto: 'Como definir princípios, comportamentos e práticas que orientam a forma de trabalhar.',
        },
        {
          titulo: 'Comunicação e alinhamento',
          texto: 'Como estruturar os momentos e canais que mantêm a equipe alinhada sem excesso de reuniões.',
        },
        {
          titulo: 'Desenvolvimento de liderança',
          texto:
            'Como preparar lideranças para sustentar a cultura, desenvolver pessoas e tomar decisões no dia a dia.',
        },
      ],
    },
    {
      tipo: 'blocos',
      h2: 'Conteúdo para aplicar na operação',
      fundo: 'alt',
      itens: [
        {
          titulo: 'Módulos práticos',
          texto:
            'Conteúdo baseado na experiência da Renke, organizado para você aplicar os conceitos diretamente na rotina da equipe.',
        },
        {
          titulo: 'Frameworks e templates',
          texto:
            'Modelos de feedback, onboarding, comunicação e desenvolvimento de equipe, prontos para adaptar à realidade da sua operação.',
        },
      ],
    },
    {
      tipo: 'antesDepois',
      h2: 'O que muda quando a cultura é estruturada',
      rotulos: ['Sem uma cultura estruturada', 'Com uma cultura estruturada'],
      linhas: [
        [
          'Decisões inconsistentes, desalinhamento entre lideranças e equipe e dificuldade para manter uma forma de trabalho comum. A operação depende mais de pessoas específicas e exige intervenção constante.',
          'Princípios claros, lideranças preparadas e uma equipe alinhada à forma como a empresa opera. A cultura deixa de depender de iniciativas pontuais e passa a fazer parte da operação.',
        ],
      ],
    },
    {
      tipo: 'numeros',
      fundo: 'alt',
      itens: [
        'GPTW: certificação conquistada',
        '+30 pessoas: cultura aplicada na operação',
        '+4 anos: de construção e evolução',
        'Baixo turnover: maior estabilidade da equipe',
      ],
    },
    {
      tipo: 'texto',
      h2: 'Um método construído na prática',
      respiro: true,
      paragrafos: [
        'O Cultura Pro reúne os aprendizados da Renke Studio na construção de uma equipe de mais de 30 pessoas, ao longo de quatro anos, até a conquista da certificação GPTW.',
      ],
    },
    {
      tipo: 'ctaFinal',
      destaque: 'Leve a cultura da sua empresa para o próximo nível.',
      texto: 'Método, experiência e ferramentas para estruturar equipes e lideranças.',
      cta: 'Conheça o Cultura Pro →',
    },
  ],
};
