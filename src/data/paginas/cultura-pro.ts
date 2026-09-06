import type { Pagina } from './tipos';

/**
 * Copy literal de docs/03-copy/cultura-pro.md
 * Notas SEO não especificadas no briefing — title e descrição são sugestão a validar.
 */
export const culturaPro: Pagina = {
  rota: '/academy/cultura-pro',
  titulo: 'Cultura Pro | Cultura organizacional para agências, com selo GPTW',
  descricao:
    'O método da Renke para construir cultura de verdade numa agência: rituais, feedbacks, onboarding, autonomia e retenção.',
  blocos: [
    {
      tipo: 'hero',
      titulo: ['Sua agência cresce, mas a equipe não acompanha.', 'O problema é cultura.'],
      realce: 1,
      sub: 'O Cultura Pro é o método da Renke para construir cultura organizacional de verdade numa agência. Não é RH corporativo adaptado. É o que funciona quando você tem 10-20 pessoas e precisa que elas operem sem você no meio. Ensinado por quem errou, acertou e tem GPTW para provar.',
      cta: 'Quero construir cultura na minha agência →',
    },
    {
      tipo: 'lista',
      eyebrow: 'Para quem é',
      h2: 'Se você...',
      fundo: 'alt',
      itens: [
        'Sente que a equipe só funciona quando você tá em cima',
        'Já perdeu gente boa porque o ambiente não segurou',
        'Quer que a agência rode mesmo quando você não está',
        'Não quer copiar modelo corporativo, quer algo que funcione para agência de verdade',
        'Sabe que precisa de cultura mas não sabe por onde começar sem parecer forçado',
      ],
    },
    {
      tipo: 'blocos',
      eyebrow: 'No Cultura Pro você aprende...',
      h2: 'O que você aprende',
      largo: true,
      itens: [
        {
          titulo: 'Os erros reais da Renke',
          texto:
            'O que fizemos errado antes de acertar. Os bastidores sem filtro de quem quase quebrou a cultura antes de construir uma de verdade.',
        },
        {
          titulo: 'Rituais que funcionam',
          texto:
            'Reuniões, feedbacks, alinhamentos, celebrações. O que manter e o que cortar. Sem burocracia, só o que gera resultado.',
        },
        {
          titulo: 'Autonomia sem caos',
          texto:
            'Como dar liberdade sem perder controle. Processos que guiam sem sufocar. O equilíbrio que faz a equipe rodar sem depender de você.',
        },
        {
          titulo: 'Retenção real',
          texto:
            'Como fazer gente boa querer ficar. Não com salário absurdo, mas com ambiente, propósito e crescimento tangível.',
        },
      ],
    },
    {
      tipo: 'blocos',
      eyebrow: 'Como funciona',
      h2: 'Conteúdo que vira prática na semana seguinte',
      fundo: 'alt',
      itens: [
        {
          titulo: 'Módulos práticos',
          texto:
            'Conteúdo direto ao ponto com os bastidores reais da Renke. Cada módulo é um pilar de cultura que você aplica na semana seguinte.',
        },
        {
          titulo: 'Frameworks e templates',
          texto:
            'Modelos de rituais, scripts de feedback, estrutura de onboarding, playbook de cultura. Tudo pronto para adaptar.',
        },
      ],
    },
    {
      tipo: 'antesDepois',
      eyebrow: 'O problema',
      h2: 'O que muda quando a cultura é intencional',
      rotulos: ['Sem cultura intencional', 'Com cultura construída'],
      linhas: [
        [
          'Turnover alto, equipe desmotivada, você apagando incêndio todo dia. Contrata, treina, perde. Repete. A agência cresce em faturamento mas encolhe em energia.',
          'Equipe que opera sem você em cima. Gente boa que fica. Autonomia com alinhamento. Você para de ser o gargalo e vira o líder que a agência precisa para escalar.',
        ],
      ],
    },
    {
      tipo: 'numeros',
      fundo: 'alt',
      itens: [
        'GPTW: certificação conquistada',
        '30+ pessoas operando com cultura real',
        '4+ anos construindo e iterando',
        'Baixo turnover: gente boa que fica',
      ],
      nota: '"Não é teoria de livro de gestão. É o método de quem já errou e acertou dentro de uma agência. Com certificação GPTW para provar."',
    },
    {
      tipo: 'texto',
      eyebrow: 'Sobre a Renke',
      h2: 'Método da Renke, com selo GPTW',
      paragrafos: [
        'O Cultura Pro nasce dos erros e acertos reais da Renke Studio. Uma agência que cresceu de 5 para 30+ pessoas sem perder a essência. Com certificação GPTW conquistada na prática, você aprende com quem vive cultura todo dia.',
      ],
    },
    {
      tipo: 'ctaFinal',
      destaque:
        'Sua agência vai continuar perdendo gente boa e dependendo de você para tudo funcionar... ou você vai construir uma cultura que faz a equipe operar sem você no meio?',
      texto:
        'O Cultura Pro te entrega o método completo: rituais, feedbacks, onboarding, autonomia e retenção. Tudo testado na Renke, com GPTW para provar que funciona.',
      cta: 'Quero construir cultura de verdade →',
    },
  ],
};
