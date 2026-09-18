import type { Pagina } from './tipos';

/** Copy literal de docs/03-copy/revena-start.md */
export const revenaStart: Pagina = {
  rota: '/studio/revena-start',
  titulo: 'Revena Start | Estruturação comercial para clínicas em 90 dias',
  descricao:
    'Do lead ao paciente na cadeira. CRM, processo, automações e dados implementados em 90 dias. Para clínicas de alto padrão.',
  blocos: [
    {
      tipo: 'hero',
      titulo: ['Sua clínica atrai pacientes.', 'Mas perde no processo.'],
      realce: 1,
      sub: 'O Revena Start organiza todo o processo de vendas da sua clínica do zero, em 90 dias: do primeiro contato até o paciente fechar. Saber de onde veio cada paciente, processo claro pro time, automações e dados confiáveis.',
      cta: 'Fale com a equipe e descubra se o Start faz sentido para sua clínica →',
    },
    {
      tipo: 'lista',
      eyebrow: 'Para quem é',
      h2: 'Você se reconhece aqui?',
      fundo: 'alt',
      itens: [
        'Fatura acima de R$300k/mês, mas está no escuro. Não sabe o que funciona.',
        'Sua equipe atende no improviso, sem roteiro, sem processo.',
        'Já contratou agência, recebeu contatos, mas não sabe quantos viraram paciente.',
        'Cada ferramenta mostra um número diferente e ninguém sabe qual é o real.',
        'Tem pelo menos 1 pessoa dedicada ao atendimento comercial (recepcionista ou secretária).',
      ],
    },
    {
      tipo: 'blocos',
      eyebrow: 'Nossa solução',
      h2: 'O que o Revena Start faz pela sua clínica',
      itens: [
        {
          titulo: 'Conecta marketing ao comercial',
          texto:
            'Cada paciente interessado chega no sistema com contexto (de onde veio, o que viu, qual procedimento buscou). Tecnologia própria que identifica de onde veio cada paciente, de verdade. Sem depender de planilha ou WhatsApp solto.',
        },
        {
          titulo: 'Organiza seus dados num lugar só',
          texto:
            'Painel central com tudo que acontece na clínica. Você confia no que está vendo porque os dados são limpos e vêm de uma fonte unificada.',
        },
        {
          titulo: 'Cria processos claros pro seu time',
          texto:
            'Roteiros de atendimento por etapa, regras claras de quando e como avançar cada paciente. O processo roda com ou sem a pessoa que o criou.',
        },
        {
          titulo: 'Automatiza o que é chato e toma tempo, mas é importante',
          texto:
            'Confirmação, lembrete, follow-up, pesquisa de satisfação, alerta de paciente parado. Tudo dispara sozinho, no momento certo.',
        },
        {
          titulo: 'Resgata orçamentos que esfriaram',
          texto:
            'Paciente pediu orçamento e sumiu? Não fica esquecido. Temos processo dedicado pra recuperar.',
        },
        {
          titulo: 'Entrega dados que viram decisão',
          texto:
            'Custo por paciente, quantos avançam em cada etapa, quais canais convertem de verdade. Não é relatório, é recomendação do que fazer.',
        },
      ],
    },
    {
      tipo: 'etapas',
      eyebrow: 'Como funciona',
      fundo: 'alt',
      h2: [
        'A gente não opera sem diagnosticar.',
        'Assim como você não entra em procedimentos sem exames.',
      ],
      etapas: [
        { n: '1', duracao: '10 dias', nome: 'Onboarding', descricao: 'Coleta de acessos, briefing e reunião de kick-off.' },
        { n: '2', duracao: '30 dias', nome: 'Diagnóstico', descricao: 'Mapeamos a jornada inteira dos pacientes: de onde vêm, como são atendidos, onde se perdem.' },
        { n: '3', duracao: '30 dias', nome: 'Implementação', descricao: 'Sistema configurado, automações rodando, rastreamento conectado, equipe treinada.' },
        { n: '4', duracao: '30 dias', nome: 'Acompanhamento', descricao: 'Checagem semanal: seu time tá usando certo? Ajustes finos e suporte proativo.' },
        { n: '5', duracao: 'Opcional', nome: 'Operação contínua', descricao: 'Acompanhamento conforme o momento da sua clínica.' },
      ],
      fechamento:
        'Um time dedicado que responde pelo resultado de receita, e não por quantidade de lead. Todo mês. Com dados na mesa.',
    },
    { tipo: 'pendencia', o_que: 'Seção 5 — o documento de copy pula da Seção 4 para a Seção 6.' },
    {
      tipo: 'antesDepois',
      eyebrow: 'Resultados',
      h2: 'O que muda na sua clínica em 90 dias.',
      rotulos: ['Antes', 'Depois do Revena Start'],
      linhas: [
        ['Não sabe de onde vem cada paciente', 'Cada contato chega rastreado com origem real'],
        ['Secretária atende no improviso', 'Processo claro que roda com ou sem a pessoa'],
        ['Paciente pede orçamento e some', 'Processo de follow-up e de resgate que recupera quem esfriou'],
        ['Cada ferramenta mostra um número diferente', 'Uma fonte só de dados, limpa e confiável'],
        ['Decisão no feeling', 'Decisão com dado real: custo por paciente, canal que funciona, etapa que trava'],
        ['Alguém da equipe sai e o processo vai junto', 'Documentado, treinável, replicável'],
      ],
    },
    {
      tipo: 'ctaFinal',
      destaque: 'Limitado a 1 nova clínica por mês.',
      texto: 'Cada projeto começa com diagnóstico. Não usamos template. Não terceirizamos.',
      cta: 'Converse com a equipe. Em 90 dias, sua operação pode estar rodando. →',
    },
  ],
};
