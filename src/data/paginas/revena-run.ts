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
      titulo: ['Você investiu para organizar.', 'A gente garante que não volta a bagunçar.'],
      realce: 1,
      sub: 'O Revena Run é a manutenção mensal da operação de atendimento da sua clínica. Toda semana, alguém checa se seu time tá seguindo o processo, se os dados estão certos e se nada quebrou. Refinamentos e otimizações nas jornadas são feitas sob medida. Você cuida do paciente. A gente cuida do seu negócio.',
      cta: 'Fale com a equipe e descubra se o Run faz sentido para sua clínica →',
    },
    {
      tipo: 'lista',
      eyebrow: 'Para quem é',
      h2: 'Você se reconhece aqui?',
      fundo: 'alt',
      itens: [
        'Já tem marketing e não quer trocar. Só precisa de alguém cuidando do processo comercial.',
        'Montou tudo direitinho, mas sem alguém de olho, a equipe relaxa e volta pro improviso.',
        'Já viu os dados ficarem sujos e o processo parar porque ninguém estava monitorando.',
        'Quer manter tudo funcionando sem ser você quem cobra a equipe todo dia.',
        'Já passou pelo Start ou Full da Renke (pré-requisito).',
      ],
    },
    {
      tipo: 'blocos',
      eyebrow: 'Nossa solução',
      h2: 'O que o Revena Run faz pela sua clínica',
      itens: [
        {
          titulo: 'Direção estruturada',
          texto:
            'Toda semana, olhamos pra dentro da sua operação. O time tá usando o processo? Os dados estão entrando certo? Alguma coisa travou? Corrigimos antes de virar problema.',
        },
        {
          titulo: 'Acionável claro do que precisa de atenção',
          texto:
            'Pacientes esquecidos, informações faltando, tarefas que ninguém fez. A gente identifica e te diz exatamente o que corrigir.',
        },
        {
          titulo: 'Recuperação de orçamentos parados',
          texto:
            'Paciente pediu orçamento e sumiu? Não fica esquecido. Acionamos seu time com processo pra trazer de volta.',
        },
        {
          titulo: 'Ajustes contínuos',
          texto:
            'Conforme sua clínica evolui, ajustamos o que precisa. Confirmações, lembretes, follow-ups: tudo continua rodando certinho.',
        },
      ],
    },
    {
      tipo: 'texto',
      centro: true,
      fundo: 'alt',
      paragrafos: [
        'Sua cabeça fica no resultado do paciente. A nossa fica na experiência digital dele e na sua operação. <strong>Tecnologia sem manutenção degrada. O Run é quem mantém sua operação viva.</strong>',
      ],
    },
    {
      tipo: 'lista',
      eyebrow: 'Cadência',
      h2: 'O que acontece toda semana e todo mês na sua clínica',
      itens: [
        'Toda semana: relatório com o que tá funcionando e o que precisa de atenção',
        'Todo mês: reunião com a equipe pra alinhar melhorias e próximos passos',
        'No dia a dia: suporte via WhatsApp (horário comercial) pra dúvidas rápidas',
        'Quando necessário: alerta imediato se algo merece sua atenção',
      ],
    },
    {
      tipo: 'texto',
      paragrafos: [
        '<strong>Quem cuida disso:</strong> uma equipe enxuta e focada só em manter sua operação saudável. Sem excesso, sem complexidade.',
      ],
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
    ctaProtocolo,
  ],
};
