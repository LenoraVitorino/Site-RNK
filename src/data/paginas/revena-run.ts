import type { Pagina } from './tipos';

/** Copy atualizada pelo PR #5, adaptada aos blocos existentes. Base: docs/03-copy/revena-run.md */
export const revenaRun: Pagina = {
  rota: '/studio/revena-run',
  titulo: "Revena Run | Manutenção da operação comercial para clínicas",
  descricao:
    'Manutenção semanal, dados limpos, equipe aderindo. Alguém garantindo que sua operação não volta a bagunçar.',
  blocos: [
    {
      tipo: 'hero',
      titulo: ["Revena Run"],
      realce: 1,
      sub: "A manutenção contínua da sua operação, com acompanhamento semanal e ajustes para manter processos, dados e equipe funcionando.",
      cta: "Conheça o Run",
    },
    {
      tipo: 'lista',
      eyebrow: 'Para quem é',
      h2: "Ideal para clínicas que:",
      fundo: 'alt',
      itens: ["Não querem trocar de marketing, só cuidar do processo comercial","Veem a equipe voltar ao improviso quando ninguém acompanha","Já viram os dados sujarem por falta de monitoramento","Querem manter tudo rodando sem cobrar a equipe todo dia","Já implementaram o Revena Start ou Full (pré-requisito)"],
    },
    {
      tipo: 'blocos',
      eyebrow: 'Nossa solução',
      h2: "O que o Run faz",
      itens: [
        {
          titulo: 'Direção estruturada',
          texto:
            "Toda semana olhamos sua operação por dentro: se o time está seguindo o processo, se os dados estão certos e se nada travou.",
        },
        {
          titulo: 'Acionável claro do que precisa de atenção',
          texto:
            "Pacientes esquecidos, informação faltando, tarefa que ninguém fez: a gente identifica e diz exatamente o que corrigir.",
        },
        {
          titulo: 'Recuperação de orçamentos parados',
          texto:
            "Orçamento que esfriou não fica esquecido: seu time é acionado com processo para trazer o paciente de volta.",
        },
        {
          titulo: 'Ajustes contínuos',
          texto:
            "Conforme a clínica evolui, confirmações, lembretes e follow-ups são ajustados para continuar rodando certo.",
        },
      ],
    },
    {
      tipo: 'texto',
      centro: true,
      fundo: 'alt',
      paragrafos: ["<strong>Tecnologia sem manutenção degrada. O Run é quem mantém sua operação viva.</strong>"],
    },
    {
      tipo: 'lista',
      eyebrow: 'Cadência',
      h2: 'O que acontece toda semana e todo mês na sua clínica',
      itens: ["Relatório semanal com o que está funcionando e o que precisa de atenção","Reunião mensal com a equipe para alinhar melhorias e próximos passos","Suporte via WhatsApp em horário comercial para dúvidas do dia a dia","Alerta imediato quando algo merece sua atenção"],
    },
    {
      tipo: 'texto',
      paragrafos: ["<strong>Quem cuida disso:</strong> uma equipe enxuta e focada só em manter sua operação saudável. Sem excesso, sem complexidade."],
    },
    {
      tipo: 'texto',
      eyebrow: 'Quando o Run não basta',
      fundo: 'alt',
      paragrafos: [
        'Se seu marketing não usa os dados que sua operação gera (e continua otimizando só pra entregar leads), o Run mantém a casa em ordem, mas o marketing continua no escuro.',
        'Para que o marketing use a inteligência que sua operação já tem, <a class="link-arrow" href="/studio/revena-core">conheça o Revena Core →</a>',
      ],
    },
    {
      tipo: 'ctaFinal',
      destaque: "Atendemos uma nova clínica por mês.",
      texto:
        "Cada projeto começa com um diagnóstico próprio e acompanhamento dedicado em toda a implementação. Sem templates. Sem terceirização.",
      cta: "Agende uma conversa",
    },
  ],
};
