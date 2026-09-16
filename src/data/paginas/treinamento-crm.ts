import type { Pagina } from './tipos';

/**
 * Copy literal de docs/03-copy/treinamento-crm.md
 * Notas SEO não especificadas no briefing — title e descrição são sugestão a validar.
 */
export const treinamentoCrm: Pagina = {
  rota: '/academy/treinamento-crm',
  titulo: 'Treinamento de CRM | Implementação de CRM como serviço de alto valor',
  descricao:
    'Como vender e entregar projetos de implementação e gestão de CRM de R$5k a R$40k. Método testado em 200+ projetos reais.',
  blocos: [
    {
      tipo: 'hero',
      titulo: ['Uma nova linha de receita para sua agência:', 'implementação de CRM como serviço de alto valor.'],
      realce: 1,
      sub: 'O Treinamento de CRM da Renke Academy ensina como vender e entregar projetos de implementação e gestão de CRM de R$5k a R$40k. Método testado em 200+ projetos reais. Alunos vendendo na primeira semana.',
      cta: 'Quero aprender a vender CRM →',
    },
    {
      tipo: 'lista',
      eyebrow: 'Para quem é',
      h2: 'Se você...',
      fundo: 'alt',
      itens: [
        'Até implementa um CRM ou outro mas sem metodologia para replicar com seu time e amadurecer sua entrega',
        'Quer adicionar um serviço de alto ticket sem precisar de equipe nova',
        'Já atende clientes de marketing e quer agregar valor com processo comercial',
        'Quer parar de depender só de recorrência de gestão de tráfego',
        'Quer aprender a implementar CRM com método, não por tentativa e erro',
      ],
    },
    {
      tipo: 'blocos',
      eyebrow: 'No Treinamento de CRM você aprende...',
      h2: 'O que você recebe',
      largo: true,
      itens: [
        {
          titulo: 'Como vender',
          texto:
            'Posicionamento do serviço, precificação, abordagem comercial. Como mostrar valor pro cliente antes de falar preço.',
        },
        {
          titulo: 'Como diagnosticar',
          texto:
            'Mapeamento da jornada do cliente, identificação de gargalos, recomendação de arquitetura.',
        },
        {
          titulo: 'Como implementar',
          texto:
            'Configuração completa: funis, etapas, campos, regras, automações, rastreamento e treinamento da equipe do cliente.',
        },
        {
          titulo: 'Como manter',
          texto:
            'Modelo de recorrência pós-implementação. Gestão de CRM como serviço mensal de R$3k a R$5k.',
        },
      ],
    },
    {
      tipo: 'blocos',
      eyebrow: 'Como funciona',
      h2: 'Do diagnóstico à entrega',
      fundo: 'alt',
      itens: [
        {
          titulo: 'Módulos práticos passo a passo',
          texto:
            'Do diagnóstico à entrega. Cada módulo é um pedaço do projeto real: você assiste, aplica no seu próximo cliente e já cobra por isso.',
        },
        {
          titulo: 'Templates de projeto prontos',
          texto:
            'Mapa de operações, checklist de implementação, roteiro de onboarding, modelo de recorrência. Tudo pronto para usar.',
        },
      ],
    },
    {
      tipo: 'numeros',
      itens: [
        'R$5k a R$40k por implementação',
        'R$1k a R$5k/mês de recorrência',
        'Sem equipe nova: você entrega sozinho',
        '1ª semana: alunos já vendendo',
      ],
    },
    {
      tipo: 'pendencia',
      o_que:
        'Inconsistência de número: a seção "O que você recebe" fala em recorrência de R$3k a R$5k/mês; a de números diz R$1k a R$5k/mês. Alinhar antes de publicar.',
    },
    {
      tipo: 'texto',
      eyebrow: 'Sobre a Renke',
      h2: 'Método nascido em operação real',
      fundo: 'alt',
      paragrafos: [
        'O treinamento é baseado nos 200+ projetos de implementação da Renke Studio. Clínicas, escritórios, negócios de alto ticket. Não é framework importado: é o que funciona no Brasil, com cliente cobrando no WhatsApp.',
      ],
    },
    {
      tipo: 'ctaFinal',
      destaque:
        'Sua agência vai continuar vendendo só tráfego a R$1.500/mês... ou vai adicionar projetos de R$5k a R$40k?',
      texto:
        'O Treinamento de CRM te entrega o método completo: como vender, diagnosticar, implementar e manter. Um serviço novo de alto valor que seus clientes já precisam, só não sabem pedir.',
      cta: 'Quero adicionar CRM ao meu portfólio →',
    },
  ],
};
