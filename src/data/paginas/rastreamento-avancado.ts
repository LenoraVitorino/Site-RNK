import type { Pagina } from './tipos';

/**
 * Base: docs/03-copy/rastreamento-avancado.md, no padrão da página da Academy
 * (28/09/2026): hero curto, cartões pretos no lugar da lista, sem rótulos
 * pequenos e sem aspas no texto.
 * Notas SEO não especificadas no briefing — title e descrição são sugestão a validar.
 */
export const rastreamentoAvancado: Pagina = {
  rota: '/academy/rastreamento-avancado',
  titulo: 'Rastreamento Avançado | Prove de onde veio cada lead de WhatsApp e formulário',
  descricao:
    'Scripts, configurações e integrações prontos. Cada conversão rastreada do clique ao CRM, sem depender de software terceiro.',
  blocos: [
    {
      tipo: 'hero',
      titulo: ['Rastreamento Avançado'],
      semRotulo: true,
      sub: 'Scripts, configurações e integrações prontos para rastrear cada conversão do clique ao CRM e identificar a origem de cada contato com precisão.',
      cta: 'Fale com a equipe',
    },
    {
      tipo: 'paineis',
      h2: 'Para agências que buscam',
      itens: [
        { icone: 'BadgeCheck', titulo: ['Prova de', 'origem'], texto: 'Mostrar ao cliente que os contatos vieram do anúncio, e não do orgânico.' },
        { icone: 'Target', titulo: ['Rastreamento', 'de mensagens'], texto: 'Medir de verdade o resultado das campanhas de mensagem.' },
        { icone: 'Layers', titulo: ['Uma entrega', 'diferenciada'], texto: 'Ir além do CPL que a maioria das agências apresenta.' },
        { icone: 'Workflow', titulo: ['Tecnologia', 'como vantagem'], texto: 'Rastreamento preciso, integrado à operação e sob seu controle.' },
      ],
    },
    {
      tipo: 'blocos',
      h2: 'O que você recebe',
      largo: true,
      itens: [
        {
          titulo: 'Rastreamento de WhatsApp',
          texto:
            'Botões de WhatsApp em sites e landing pages rastreados com precisão. Origem, campanha e criativo identificados automaticamente no CRM.',
        },
        {
          titulo: 'Formulários nativos e de página',
          texto: 'Formulários integrados ao CRM com UTMs dinâmicas e identificação precisa da origem de cada lead.',
        },
        {
          titulo: 'Campanhas de mensagem · Meta',
          texto:
            'Rastreamento de campanhas com objetivo de mensagens, com dados estruturados no CRM por campanha, conjunto e criativo.',
        },
        {
          titulo: 'Implementação guiada',
          texto:
            'A lógica de rastreamento já está estruturada. Você configura seguindo o passo a passo e aplica a solução diretamente nos projetos dos seus clientes.',
        },
      ],
    },
    {
      tipo: 'blocos',
      h2: 'Três passos até a entrega',
      numerado: true,
      fundo: 'alt',
      itens: [
        {
          titulo: 'Recebe a lógica pronta',
          texto: 'Scripts, tags e configurações documentadas passo a passo, sem precisar de dev ou ferramenta cara.',
        },
        {
          titulo: 'Instala e configura',
          texto: 'Segue o tutorial e aplica no site e no CRM do cliente. Funciona com qualquer builder e qualquer CRM.',
        },
        {
          titulo: 'Entrega e impressiona',
          texto: 'Seu cliente passa a ver de onde vem cada contato. Você prova o retorno real e justifica o investimento.',
        },
      ],
    },
    {
      tipo: 'antesDepois',
      h2: 'O que muda quando a origem passa a ser rastreável',
      rotulos: ['Sem rastreamento', 'Com o Rastreamento Avançado'],
      linhas: [
        [
          'A origem dos leads não é identificada com precisão. Isso limita a leitura da performance e dificulta entender quais campanhas e canais geram oportunidades reais.',
          'Cada contato chega ao CRM com origem, campanha e criativo identificados. Mais visibilidade sobre a performance, mais clareza para alocar investimento e mais dados para orientar decisões.',
        ],
      ],
    },
    {
      tipo: 'texto',
      h2: 'Desenvolvido na prática',
      respiro: true,
      fundo: 'alt',
      paragrafos: [
        'O Rastreamento Avançado foi desenvolvido e aprimorado na operação da Renke Studio, com aplicações reais em WhatsApp, formulários, campanhas de mensagem e diferentes CRMs.',
      ],
    },
    {
      tipo: 'ctaFinal',
      destaque: 'Rastreie a origem de cada contato.',
      texto: 'Scripts, configurações e integrações prontos para instalar e implementar, sem programação e sem depender de soluções de terceiros.',
      cta: 'Conheça o Rastreamento →',
    },
  ],
};
