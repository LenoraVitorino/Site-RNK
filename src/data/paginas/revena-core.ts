import type { Pagina } from './tipos';
import { analiseDeMercado } from './comuns';

/** Copy atualizada pelo PR #5, adaptada aos blocos existentes. Base: docs/03-copy/revena-core.md */
export const revenaCore: Pagina = {
  rota: '/studio/revena-core',
  titulo: "Revena Core | Marketing + comercial + dados integrados para clínicas",
  descricao:
    'Um time operando marketing, comercial e dados da sua clínica toda semana. Custo por paciente real, não custo por clique.',
  blocos: [
    {
      tipo: 'hero',
      titulo: ["Revena Core"],
      sub: "Marketing, comercial e dados operados por um time dedicado, com acompanhamento contínuo e decisões orientadas por receita.",
      cta: "Conheça o Core",
    },
    {
      tipo: 'lista',
      eyebrow: 'Para quem é',
      h2: "Ideal para clínicas que:",
      fundo: 'alt',
      itens: ["Faturam acima de R$300k/mês","Já possuem marketing, comercial e dados estruturados, mas ainda desconectados","Precisam de uma operação integrada para orientar decisões e prioridades","Já implementaram o Revena Start ou Full"],
    },
    {
      tipo: 'blocos',
      eyebrow: 'Nossa solução',
      h2: "O que o Core faz",
      largo: true,
      itens: [
        {
          titulo: 'Marketing que funciona de verdade',
          itens: ["Anúncios e páginas otimizados pelo paciente que fecha","Estratégia baseada em dados reais","Roteiros produzidos em cima de anatomias validadas"],
        },
        {
          titulo: 'Gestão comercial com método',
          itens: ["Recuperação de orçamentos parados","Acompanhamento semanal do processo comercial","Dados de fechamento conectados ao marketing"],
        },
        {
          titulo: 'Tecnologia própria rodando',
          itens: ["Rastreamento de origem","Confirmações e follow-ups automáticos","Tudo integrado"],
        },
        {
          titulo: 'Dados que viram decisão',
          itens: ["Painéis com custo por paciente","Performance por canal","Indicadores por procedimento","Relatórios semanais"],
        },
      ],
    },
    analiseDeMercado,
    {
      tipo: 'etapas',
      eyebrow: 'Como funciona',
      h2: ["Etapas do Core"],
      etapas: [
        { n: '1', duracao: '45 dias', nome: 'Estruturação', descricao: "Posicionamento, rastreamento, operação comercial, dados e metas estruturados." },
        { n: '2', duracao: '90 dias', nome: 'Laboratório', descricao: "Testes de canais, criativos e abordagens para identificar o que gera resultado para a clínica." },
        { n: '3', duracao: '180 dias', nome: 'Performance', descricao: "Escala do que funciona, otimização contínua e abertura de novos canais quando fizer sentido." },
        { n: '4', duracao: "12 meses", nome: "Operação contínua", descricao: "Otimização constante com um time que conhece a operação e evolui a estratégia continuamente." },
      ],
      fechamento:
        "Cada etapa prepara a próxima. Por isso, o Core parte de uma operação estruturada antes de buscar performance.",
    },
    {
      tipo: 'blocos',
      eyebrow: 'Cadência',
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
      paragrafos: ["A Renke não manda relatório mensal e some. Toda semana, 3 camadas de análise se cruzam.","<strong>Você recebe:</strong> relatório de marketing + relatório comercial toda semana. Check-in mensal com o gestor. Alinhamentos com sua própria equipe. Suporte via WhatsApp em horário comercial."],
    },
    {
      tipo: 'pendencia',
      o_que:
        'Seção 7 · Resultados — decisão sugerida no briefing: depoimentos como componente global em todas as páginas (D11).',
    },
    {
      tipo: 'ctaFinal',
      destaque: "Atendemos uma nova clínica por mês.",
      texto: "Cada projeto começa com um diagnóstico próprio e acompanhamento dedicado em toda a implementação. Sem templates. Sem terceirização.",
      cta: "Agende uma conversa",
    },
  ],
};
