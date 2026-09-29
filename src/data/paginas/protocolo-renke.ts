import type { Pagina } from './tipos';

/**
 * Base: docs/03-copy/protocolo-renke.md, no padrão da página da Academy
 * (28/09/2026): hero curto, cartões pretos no lugar da lista, sem rótulos
 * pequenos, sem a dobra "A tese" e sem aspas, "+" ou "=" no texto.
 * ⚠️ O preço (R$7k) não vai para o site, conforme o próprio documento.
 * Notas SEO não especificadas no briefing — o title abaixo é a sugestão a validar.
 */
export const protocoloRenke: Pagina = {
  rota: '/academy/protocolo-renke',
  titulo: 'Protocolo Renke | O sistema operacional de uma agência de RevOps lucrativa',
  descricao:
    'Tudo que a Renke construiu operando +140 projetos, documentado e transferido para você aplicar no seu negócio.',
  blocos: [
    {
      tipo: 'hero',
      titulo: ['Protocolo Renke'],
      semRotulo: true,
      sub: 'Tudo que a Renke construiu em quatro anos de operação, documentado para você aplicar no seu negócio.',
      cta: 'Fale com a equipe',
    },
    {
      tipo: 'paineis',
      h2: 'Para donos de agência que buscam',
      itens: [
        { icone: 'Workflow', titulo: ['Operação', 'independente'], texto: 'Uma operação que roda sem depender de você no dia a dia.' },
        { icone: 'BadgeCheck', titulo: ['Preço à altura', 'da entrega'], texto: 'Cobrar pelo valor que entrega e manter os clientes por mais tempo.' },
        { icone: 'TrendingUp', titulo: ['Escala', 'com valor'], texto: 'Crescer pelo valor entregue, não pelo tamanho da equipe.' },
        { icone: 'Target', titulo: ['Mais lucro,', 'menos caos'], texto: 'Um negócio com rotina mais leve e margem de verdade.' },
      ],
    },
    {
      tipo: 'blocos',
      h2: 'O que você recebe',
      itens: [
        {
          titulo: 'Posicionamento',
          texto:
            'Como sair do modelo genérico e criar um posicionamento que atrai clientes de alto ticket. Como a Renke se diferenciou num mercado comoditizado.',
        },
        {
          titulo: 'Modelo comercial',
          texto:
            'Como vender projetos de R$20k a R$40k e recorrências de R$6,5k a R$15k por mês, com venda consultiva, precificação por valor e qualificação de clientes.',
        },
        {
          titulo: 'Operação',
          texto:
            'Como entregar com poucos clientes e margem alta. Estrutura de squads, rotinas semanais, rituais de gestão e distribuição de contas.',
        },
        {
          titulo: 'Gestão de equipe',
          texto: 'Como montar uma equipe enxuta que opera sem depender de você. Cultura, processos e autonomia.',
        },
        {
          titulo: 'Método de entrega',
          texto:
            'O Protocolo Revena traduzido para você aplicar: diagnóstico, implementação e acompanhamento. Como entregar resultado real e reter clientes por anos.',
        },
        {
          titulo: 'Documentos reais',
          texto:
            'Templates, playbooks, scripts, modelos de proposta e estruturas de relatório. O que usamos hoje, sem versões diluídas.',
        },
      ],
    },
    {
      tipo: 'ctaFinal',
      destaque: 'Um sistema operacional completo para a sua agência.',
      texto: 'Posicionamento, vendas, entrega, precificação e gestão, documentados a partir da operação da Renke.',
      cta: 'Quero conhecer o Protocolo Renke',
    },
  ],
};
