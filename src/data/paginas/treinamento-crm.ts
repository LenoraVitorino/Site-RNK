import type { Pagina } from './tipos';

/**
 * Base: docs/03-copy/treinamento-crm.md, no padrão da página da Academy
 * (28/09/2026): hero curto, cartões pretos no lugar da lista, sem rótulos
 * pequenos e sem "+" no texto.
 * ⚠️ Recorrência: "O que você recebe" diz R$3k a R$5k/mês; os números dizem
 * R$1k a R$5k/mês. Alinhar com a Renke antes de publicar.
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
      titulo: ['Treinamento de CRM'],
      semRotulo: true,
      sub: 'Uma nova linha de receita para sua agência: aprenda a vender, implementar e manter CRM como um serviço de alto valor para os seus clientes.',
      cta: 'Fale com a equipe',
    },
    {
      tipo: 'paineis',
      h2: 'Para agências que buscam',
      itens: [
        { icone: 'Workflow', titulo: ['Entrega', 'com método'], texto: 'Implementar CRM com uma metodologia que o seu time consegue replicar.' },
        { icone: 'BadgeCheck', titulo: ['Serviço de', 'alto ticket'], texto: 'Um novo serviço de alto valor, sem precisar de equipe nova.' },
        { icone: 'Layers', titulo: ['Valor além', 'do tráfego'], texto: 'Levar processo comercial aos clientes que você já atende em marketing.' },
        { icone: 'TrendingUp', titulo: ['Nova fonte', 'de receita'], texto: 'Depender menos da recorrência de gestão de tráfego.' },
      ],
    },
    {
      tipo: 'blocos',
      h2: 'O que você recebe',
      largo: true,
      itens: [
        {
          titulo: 'Como vender',
          texto:
            'Posicionamento do serviço, precificação e abordagem comercial. Como mostrar valor para o cliente antes de falar de preço.',
        },
        {
          titulo: 'Como diagnosticar',
          texto: 'Mapeamento da jornada do cliente, identificação de gargalos e recomendação de arquitetura.',
        },
        {
          titulo: 'Como implementar',
          texto:
            'Configuração completa: funis, etapas, campos, regras, automações, rastreamento e treinamento da equipe do cliente.',
        },
        {
          titulo: 'Como manter',
          texto: 'Modelo de recorrência pós-implementação. Gestão de CRM como serviço mensal de R$3k a R$5k.',
        },
      ],
    },
    {
      tipo: 'blocos',
      h2: 'Do diagnóstico à entrega',
      fundo: 'alt',
      itens: [
        {
          titulo: 'Módulos práticos passo a passo',
          texto:
            'Cada módulo é uma etapa do projeto real: você assiste, aplica no seu próximo cliente e já cobra por isso.',
        },
        {
          titulo: 'Templates de projeto prontos',
          texto:
            'Mapa de operações, checklist de implementação, roteiro de onboarding e modelo de recorrência, prontos para usar.',
        },
      ],
    },
    {
      tipo: 'numeros',
      itens: [
        'R$5k a R$40k por implementação',
        'R$1k a R$5k de recorrência mensal',
        'Sem equipe nova: você entrega sozinho',
        '1ª semana: alunos já vendendo',
      ],
    },
    {
      tipo: 'texto',
      h2: 'Mais de 200 projetos como base',
      respiro: true,
      fundo: 'alt',
      paragrafos: [
        'O treinamento reúne a experiência da Renke Studio em mais de 200 projetos de implementação para clínicas, escritórios e negócios de alto ticket. Processos, templates e aprendizados construídos na prática e prontos para aplicar.',
      ],
    },
    {
      tipo: 'ctaFinal',
      destaque: 'CRM como uma nova frente de receita.',
      texto: 'Aprenda a vender, diagnosticar, implementar e manter projetos de CRM para seus clientes.',
      cta: 'Conheça o Treinamento →',
    },
  ],
};
