import type { Pagina } from './tipos';
import { ctaProtocolo } from './comuns';

/** Copy literal de docs/03-copy/revena-core.md */
export const revenaCore: Pagina = {
  rota: '/studio/revena-core',
  titulo: 'Protocolo Revena Core | Marketing + comercial + dados integrados para clínicas',
  descricao:
    'Um time operando marketing, comercial e dados da sua clínica toda semana. Custo por paciente real, não custo por clique.',
  blocos: [
    {
      tipo: 'hero',
      titulo: ['Revena Core'],
      centro: true,
      sub: 'Marketing, comercial e dados operados por um time dedicado, com acompanhamento contínuo e decisões orientadas por receita.',
      cta: 'Conheça o Core',
    },
    {
      tipo: 'lista',
      h2: 'Ideal para clínicas que:',
      fundo: 'alt',
      numerada: true,
      itens: [
        'Faturam acima de R$300k/mês',
        'Já possuem marketing, comercial e dados estruturados, mas ainda desconectados',
        'Precisam de uma operação integrada para orientar decisões e prioridades',
        'Já implementaram o Revena Start ou Full',
      ],
    },
    {
      tipo: 'blocos',
      h2: 'O que o Core faz',
      sub: 'Reúne marketing, comercial e dados num time só, operando sua clínica toda semana.',
      largo: true,
      itens: [
        {
          titulo: 'Marketing que funciona de verdade',
          texto: 'Anúncios e páginas otimizados pelo paciente que fecha, com estratégia baseada em dados reais.',
        },
        {
          titulo: 'Gestão comercial com método',
          texto: 'Recuperação de orçamentos parados e acompanhamento semanal do processo comercial.',
        },
        {
          titulo: 'Tecnologia própria rodando',
          texto: 'Rastreamento de origem, confirmações e follow-ups automáticos, tudo integrado.',
        },
        {
          titulo: 'Dados que viram decisão',
          texto: 'Painéis e relatórios semanais com custo por paciente, canal e procedimento.',
        },
      ],
    },
    {
      tipo: 'etapas',
      h2: ['Etapas do Core'],
      etapas: [
        { n: '1', duracao: '45 dias', nome: 'Estruturação', descricao: 'Posicionamento, rastreamento, operação comercial, dados e metas estruturados.' },
        { n: '2', duracao: '90 dias', nome: 'Laboratório', descricao: 'Testes de canais, criativos e abordagens para identificar o que gera resultado para a clínica.' },
        { n: '3', duracao: '180 dias', nome: 'Performance', descricao: 'Escala do que funciona, otimização contínua e abertura de novos canais quando fizer sentido.' },
        { n: '4', duracao: '12 meses', nome: 'Operação contínua', descricao: 'Otimização constante com um time que conhece a operação e evolui a estratégia continuamente.' },
      ],
      fechamento:
        'Cada etapa prepara a próxima. Por isso, o Core parte de uma operação estruturada antes de buscar performance.',
    },
    {
      tipo: 'blocos',
      h2: 'O que acontece toda semana na sua clínica',
      numerado: true,
      fundo: 'alt',
      itens: [
        { titulo: 'Ritmo', texto: 'Como os números estão vs. a meta.' },
        { titulo: 'Qualidade dos contatos', texto: 'Quem tá chegando tá avançando no funil? Se não, por quê?' },
        { titulo: 'Fechamento e projeção', texto: 'Quanto já fechou, quanto vai fechar, o que precisa mudar.' },
      ],
    },
    {
      tipo: 'texto',
      fundo: 'alt',
      paragrafos: [
        'A Renke não manda relatório mensal e some. Toda semana, 3 camadas de análise se cruzam.',
        '<strong>Você recebe:</strong> relatório de marketing + relatório comercial toda semana. Check-in mensal com o gestor. Alinhamentos com sua própria equipe. Suporte via WhatsApp em horário comercial.',
      ],
    },
    {
      tipo: 'pendencia',
      o_que:
        'Seção 7 · Resultados — decisão sugerida no briefing: depoimentos como componente global em todas as páginas (D11).',
    },
    ctaProtocolo,
  ],
};
