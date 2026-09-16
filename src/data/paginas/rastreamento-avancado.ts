import type { Pagina } from './tipos';

/**
 * Copy literal de docs/03-copy/rastreamento-avancado.md
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
      titulo: ["Seu cliente pergunta 'de onde veio esse lead?'", 'Agora você prova.'],
      realce: 1,
      sub: 'O Rastreamento Avançado da Renke Academy entrega tudo pronto: scripts, configurações, templates de fluxos e integrações. Você instala, configura e entrega pro cliente em minutos. Cada conversão rastreada do clique ao CRM.',
      cta: 'Quero acesso ao Rastreamento Avançado →',
    },
    {
      tipo: 'lista',
      eyebrow: 'Para quem é',
      h2: 'Se você...',
      fundo: 'alt',
      itens: [
        'Precisa provar pro cliente que os contatos vieram do anúncio (e não do orgânico)',
        'Trabalha com campanhas de mensagem e não consegue rastrear de verdade',
        'Quer diferenciar sua entrega de outras agências que só mostram CPL',
        'Não quer depender de ferramentas caras para ter rastreamento preciso',
        'Quer internalizar uma tecnologia para servir como vantagem competitiva',
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
            'Botões de WhatsApp em sites e landing pages rastreados com precisão. Origem, campanha e criativo identificados no CRM automaticamente.',
        },
        {
          titulo: 'Formulários nativos e de página',
          texto:
            'Tudo integrado direto ao CRM com UTMs dinâmicas. Cada lead com origem clara, sem achismo.',
        },
        {
          titulo: 'Campanhas de mensagem (Meta)',
          texto:
            'Rastreamento de campanhas com objetivo de mensagens. Dados chegando estruturados no CRM com campanha, conjunto e criativo.',
        },
        {
          titulo: 'Plug & play',
          texto:
            'Não precisa programar. Recebe a lógica pronta, instala e configura seguindo o passo a passo. Entrega pro cliente no mesmo dia.',
        },
      ],
    },
    {
      tipo: 'blocos',
      eyebrow: 'Como funciona',
      h2: 'Três passos até a entrega',
      numerado: true,
      fundo: 'alt',
      itens: [
        {
          titulo: 'Recebe a lógica pronta',
          texto:
            'Scripts, tags e configurações documentadas passo a passo. Sem precisar de dev ou ferramenta cara.',
        },
        {
          titulo: 'Instala e configura',
          texto:
            'Segue o tutorial, aplica no site e no CRM do cliente. Funciona com qualquer builder e qualquer CRM.',
        },
        {
          titulo: 'Entrega e impressiona',
          texto:
            'Seu cliente passa a ver exatamente de onde vem cada contato. Você prova ROI real e justifica o investimento.',
        },
      ],
    },
    {
      tipo: 'antesDepois',
      eyebrow: 'O problema',
      h2: 'O que muda quando a origem para de ser achismo',
      rotulos: ['Sem rastreamento', 'Com o Rastreamento Avançado'],
      linhas: [
        [
          '"De onde veio esse lead?" Ninguém sabe. O cliente acha que é orgânico, você não consegue provar que é do tráfego. Resultado: desconfiança, cancelamento, churn.',
          'Cada contato chega no CRM com origem, campanha e criativo. O cliente vê o retorno. Você justifica a verba, aumenta ticket e retém com dados.',
        ],
      ],
    },
    {
      tipo: 'texto',
      eyebrow: 'Sobre a Renke',
      h2: 'Direto da operação Renke',
      fundo: 'alt',
      paragrafos: [
        'O Rastreamento Avançado é extraído da operação real da Renke Studio. O mesmo rastreamento que roda nos nossos projetos, testado com WhatsApp, formulários, campanhas de mensagem e CRMs diferentes. Não é teoria: é o que usamos todo dia para provar resultado. Você recebe pronto, instala e entrega.',
      ],
    },
    {
      tipo: 'ctaFinal',
      destaque:
        'Seu cliente vai continuar achando que os leads são orgânicos... ou você vai instalar o rastreamento e provar de onde vem cada contato?',
      texto:
        'O Rastreamento Avançado da Renke entrega tudo pronto: scripts, configurações e integrações. Sem programação, sem ferramenta cara, sem achismo. Instala, entrega e prova ROI real. Sem dependência de software terceiro. Plug & play.',
      cta: 'Quero acesso ao Rastreamento Avançado →',
    },
  ],
};
