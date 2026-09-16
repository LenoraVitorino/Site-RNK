import type { Pagina } from './tipos';

/** Copy literal de docs/03-copy/revena-full.md */
export const revenaFull: Pagina = {
  rota: '/studio/revena-full',
  titulo: 'Protocolo Revena Full | Jornada completa do paciente para clínicas',
  descricao:
    'Do primeiro contato ao retorno. Comercial + pós-venda conectados. Para clínicas que já têm equipe e querem retenção real.',
  blocos: [
    {
      tipo: 'hero',
      titulo: ['Do primeiro contato ao retorno.', 'A jornada inteira do paciente, conectada.'],
      realce: 1,
      sub: 'O Revena Full estrutura o comercial e o pós-venda da sua clínica. Cada paciente se sente cuidado do começo ao fim. Isso faz pacientes voltarem e indicarem.',
      cta: 'Fale com a equipe e descubra se o Full faz sentido para sua clínica →',
    },
    {
      tipo: 'lista',
      eyebrow: 'Para quem é',
      h2: 'Você se reconhece aqui?',
      fundo: 'alt',
      itens: [
        'Fatura acima de R$300k/mês, mas além de não saber o que funciona na captação, seus pacientes somem depois da primeira consulta.',
        'Tem mais de 5 planilhas que o time precisa ficar preenchendo, sem contar os sistemas.',
        'Tem alguém no comercial e alguém cuidando do pós-venda (concierge, coordenadora, secretária dedicada), mas opera no improviso.',
        'Paciente fecha o procedimento e raramente volta. Você não tem processo de retenção.',
        'Quer que o paciente se sinta acompanhado, mas não tem estrutura pra isso rodar sem você pensar.',
      ],
    },
    {
      tipo: 'blocos',
      eyebrow: 'Nossa solução',
      h2: 'Tudo do Revena Start + a jornada completa do paciente',
      itens: [
        {
          titulo: 'Processo comercial completo',
          texto:
            'Do primeiro contato até o fechamento. Sistema de gestão, automações, rastreamento de origem, formulário pré-consulta com anamnese digital, equipe treinada.',
        },
        {
          titulo: 'Acompanhamento pós-venda',
          texto:
            'Comunicações automáticas de cuidado no momento certo: lembrete de retorno, orientação pré-procedimento, confirmação. Tudo personalizado, sem a equipe precisar lembrar.',
        },
        {
          titulo: 'Integração com agenda',
          texto:
            'O sistema conversa com a agenda da clínica. Menos pacientes que não aparecem, mais retorno.',
        },
        {
          titulo: 'Processo que faz paciente voltar',
          texto: 'Não é campanha de reconquista. É cuidado sistemático que faz pacientes voltarem.',
        },
      ],
    },
    {
      tipo: 'etapas',
      eyebrow: 'Como funciona',
      fundo: 'alt',
      h2: ['Etapas do projeto'],
      etapas: [
        { n: '1', duracao: '10 dias', nome: 'Onboarding', descricao: 'Coleta de acessos, briefing e reunião de kick-off.' },
        { n: '2', duracao: '30 dias', nome: 'Diagnóstico', descricao: 'Organização do acervo documental e gerencial. Mapeamos a jornada: captação, atendimento, procedimento e pós. Identificamos o que precisa ser automatizado, documentamos regras de negócio, criamos fluxogramas visuais e definimos quem faz o quê em cada etapa.' },
        { n: '3', duracao: '30 dias', nome: 'Implementação', descricao: 'Vamos para a tecnologia. Implementamos o CRM do jeito certo. Processo de acompanhamento de tratamentos; processo de relacionamento com a base de pacientes; comunicações automáticas da concierge; integração com sistema de agenda; geração automática de contrato e termos LGPD.' },
        { n: '4', duracao: '30 dias', nome: 'Acompanhamento', descricao: 'Checagem semanal: seu time tá usando? E está usando certo? Suporte proativo via WhatsApp, ajustes finos, reuniões. Garantimos que a equipe realmente use e que os dados estão entrando limpos.' },
        { n: '5', duracao: 'Opcional', nome: 'Operação contínua', descricao: 'Acompanhamento conforme o momento da clínica. Mantém rodando no longo prazo sob nossos cuidados profissionais.' },
      ],
    },
    {
      tipo: 'numeros',
      h2: 'O Full é o único produto que entrega os 4 pilares na íntegra',
      itens: ['Controle', 'Automação', 'Processo', 'Experiência'],
      nota: 'O paciente se sente cuidado do começo ao fim. Isso faz ele voltar e indicar.',
    },
    {
      tipo: 'pendencia',
      o_que:
        'Seção 6 · Resultados — o briefing traz só [IMG]. Recomendação em docs/03-copy/revena-full.md: reaproveitar a estrutura Antes/Depois do Start + bloco global de depoimentos.',
    },
    {
      tipo: 'ctaFinal',
      destaque: 'Limitado a 1 nova clínica por mês.',
      texto: 'Cada projeto começa com diagnóstico. Não usamos template. Não terceirizamos.',
      cta: 'Converse com a equipe. Em 90 dias, sua operação pode estar rodando. →',
    },
  ],
};
