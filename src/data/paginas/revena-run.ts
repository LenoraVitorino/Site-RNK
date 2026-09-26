import type { Pagina } from './tipos';
import { ctaProtocolo } from './comuns';

/** Copy literal de docs/03-copy/revena-run.md */
export const revenaRun: Pagina = {
  rota: '/studio/revena-run',
  titulo: 'Protocolo Revena Run | Manutenção da operação comercial para clínicas',
  descricao:
    'Manutenção semanal, dados limpos, equipe aderindo. Alguém garantindo que sua operação não volta a bagunçar.',
  blocos: [
    {
      tipo: 'hero',
      titulo: ['Revena Run'],
      centro: true,
      sub: 'A manutenção contínua da sua operação, com acompanhamento semanal e ajustes para manter processos, dados e equipe funcionando.',
      cta: 'Conheça o Run',
    },
    {
      tipo: 'lista',
      h2: 'Ideal para clínicas que:',
      fundo: 'alt',
      numerada: true,
      itens: [
        'Não querem trocar de marketing, só cuidar do processo comercial',
        'Veem a equipe voltar ao improviso quando ninguém acompanha',
        'Já viram os dados sujarem por falta de monitoramento',
        'Querem manter tudo rodando sem cobrar a equipe todo dia',
        'Já implementaram o Revena Start ou Full (pré-requisito)',
      ],
    },
    {
      tipo: 'blocos',
      h2: 'O que o Run faz',
      largo: true,
      itens: [
        {
          titulo: 'Direção estruturada',
          texto: 'Toda semana olhamos sua operação por dentro: se o time está seguindo o processo, se os dados estão certos e se nada travou.',
        },
        {
          titulo: 'Acionável claro do que precisa de atenção',
          texto: 'Pacientes esquecidos, informação faltando, tarefa que ninguém fez: a gente identifica e diz exatamente o que corrigir.',
        },
        {
          titulo: 'Recuperação de orçamentos parados',
          texto: 'Orçamento que esfriou não fica esquecido: seu time é acionado com processo para trazer o paciente de volta.',
        },
        {
          titulo: 'Ajustes contínuos',
          texto: 'Conforme a clínica evolui, confirmações, lembretes e follow-ups são ajustados para continuar rodando certo.',
        },
      ],
    },
    {
      tipo: 'texto',
      centro: true,
      fundo: 'alt',
      paragrafos: [
        '<strong>Tecnologia sem manutenção degrada. O Run é quem mantém sua operação viva.</strong>',
      ],
    },
    {
      tipo: 'lista',
      h2: 'O que acontece toda semana e todo mês na sua clínica',
      itens: [
        'Relatório semanal com o que está funcionando e o que precisa de atenção',
        'Reunião mensal com a equipe para alinhar melhorias e próximos passos',
        'Suporte via WhatsApp em horário comercial para dúvidas do dia a dia',
        'Alerta imediato quando algo merece sua atenção',
      ],
    },
    {
      tipo: 'texto',
      paragrafos: [
        '<strong>Quem cuida disso:</strong> uma equipe enxuta e focada só em manter sua operação saudável. Sem excesso, sem complexidade.',
      ],
    },
    {
      tipo: 'pendencia',
      o_que:
        'Seção de Resultados — o documento de copy do Run não traz a tabela Operação → Resultado que Start e Full receberam.',
    },
    ctaProtocolo,
  ],
};
