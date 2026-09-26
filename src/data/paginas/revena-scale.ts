import type { Pagina } from './tipos';
import { analiseDeMercado, ctaProtocolo } from './comuns';

/** Copy atualizada pelo PR #5, adaptada aos blocos existentes. Base: docs/03-copy/revena-scale.md */
export const revenaScale: Pagina = {
  rota: '/studio/revena-scale',
  titulo: "Revena Scale | Captação + conteúdo + reativação para clínicas",
  descricao:
    'A operação completa: marketing, comercial, conteúdo orgânico e ativação de base. Para clínicas que querem crescer sem depender só de anúncio.',
  blocos: [
    {
      tipo: 'hero',
      titulo: ["Revena Scale"],
      realce: 1,
      sub: "A operação mais completa da Renke para ampliar a receita da clínica, combinando captação, conteúdo e reativação da base de pacientes.",
      cta: "Conheça o Scale",
    },
    {
      tipo: 'lista',
      eyebrow: 'Para quem é',
      h2: "Ideal para clínicas que:",
      fundo: 'alt',
      itens: ["Faturam acima de R$300k/mês e já possuem uma operação estruturada","Têm marketing interno e buscam ampliar sua performance","Possuem uma base relevante de pacientes ainda pouco explorada","Buscam ampliar receita com novas fontes de aquisição e reativação"],
    },
    {
      tipo: 'blocos',
      eyebrow: 'Nossa solução',
      h2: "O que o Scale faz",
      largo: true,
      itens: [
        {
          titulo: "Operação integrada",
          texto:
            "Marketing, comercial e dados trabalhando em conjunto, com acompanhamento e otimização contínuos.",
        },
        {
          titulo: "Conteúdo proprietário",
          texto:
            "Produção estratégica para fortalecer autoridade e ampliar a presença orgânica da clínica.",
        },
        {
          titulo: "Ativação da base",
          texto:
            "Estratégias de reativação para transformar pacientes inativos em novas oportunidades.",
        },
        {
          titulo: "Comunicação automatizada",
          texto:
            "Confirmações, lembretes e orientações personalizadas ao longo da jornada.",
        },
      ],
    },
    analiseDeMercado,
    {
      tipo: 'texto',
      centro: true,
      paragrafos: ["<strong>Menos dependência de anúncio pago, mais receita dos pacientes que já confiam em você.</strong>"],
    },
    {
      tipo: 'etapas',
      eyebrow: 'Como funciona',
      fundo: 'alt',
      h2: ["Etapas do Scale"],
      etapas: [
        { n: '1', duracao: '45 dias', nome: 'Estruturação', descricao: "Otimização dos perfis digitais, estratégia de conteúdo orgânico e segmentação da base com calendário de ativações." },
        { n: '2', duracao: '90 dias', nome: 'Laboratório', descricao: "Testes de canais, criativos e conteúdo orgânico, com performance medida de ponta a ponta." },
        { n: '3', duracao: '180 dias', nome: 'Performance', descricao: "Escala do que funciona, com novos canais e mais presença digital." },
        { n: '4', duracao: "12 meses", nome: "Operação contínua", descricao: "Previsibilidade alcançada, com inovação constante para não estagnar." },
      ],
      fechamento:
        'Cada etapa alimenta a próxima. Sem a base construída, seria mais uma agência otimizando no escuro.',
    },
    {
      tipo: 'lista',
      eyebrow: 'Cadência',
      h2: 'O que acontece toda semana e todo mês na sua clínica',
      itens: ["Olhar de marketing semanal com análise e recomendações","Acionáveis comerciais semanais com o que fazer para buscar a meta","Relatório de conteúdo mensal (o que mais funcionou no perfil e que vai ser replicado)","Check-in mensal com o gestor da clínica","Alinhamentos quinzenais com a equipe comercial","Suporte via WhatsApp em horário comercial","Alertas proativos quando algo merece atenção imediata"],
    },
    {
      tipo: 'pendencia',
      o_que:
        'Seção 8 · Resultados — o briefing traz só [IMG]. Usar o bloco global de depoimentos/resultados (D11). E a Etapa 1 diz "Tudo do Core", o que contraria a diretriz de não referenciar o Core.',
    },
    ctaProtocolo,
  ],
};
