import type { Pagina } from './tipos';
import { analiseDeMercado, ctaProtocolo } from './comuns';

/** Copy literal de docs/03-copy/revena-scale.md */
export const revenaScale: Pagina = {
  rota: '/studio/revena-scale',
  titulo: 'Protocolo Revena Scale | Captação + conteúdo + reativação para clínicas',
  descricao:
    'A operação completa: marketing, comercial, conteúdo orgânico e ativação de base. Para clínicas que querem crescer sem depender só de anúncio.',
  blocos: [
    {
      tipo: 'hero',
      titulo: ['Crescer por todos os lados:', 'pacientes novos e os antigos voltando.'],
      realce: 1,
      sub: 'O Revena Scale é a operação mensal mais completa da Renke. Captação, conversão, conteúdo que cresce seu perfil e comunicações automáticas de cuidado. Menos dependência de tráfego pago, mais receita de quem já confia em você.',
      cta: 'Fale com a equipe e descubra se o Scale faz sentido para sua clínica →',
    },
    {
      tipo: 'lista',
      eyebrow: 'Para quem é',
      h2: 'Você se reconhece aqui?',
      fundo: 'alt',
      itens: [
        'Sua clínica fatura acima de R$300k/mês e já tá rodando bem. Quer depender menos de anúncio e fazer pacientes antigos voltarem.',
        'Tem marketing interno mas sabe que pode performar mais.',
        'Sabe que tem uma base de pacientes valiosa, mas não faz nada com ela.',
        'Quer construir autoridade digital, não só comprar atenção.',
        'Busca crescimento sustentável: todas as frentes operando juntas.',
        'Já tem o Start ou Full implementado (pré-requisito).',
      ],
    },
    {
      tipo: 'blocos',
      eyebrow: 'Nossa solução',
      h2: 'O que o Scale faz pela sua clínica. Toda semana. Todo mês.',
      largo: true,
      itens: [
        {
          titulo: 'Tudo do Core',
          texto:
            'Marketing + comercial + dados integrados, operando toda semana. Relatórios semanais, recuperação de orçamentos, anúncios otimizados por quem realmente virou paciente.',
        },
        {
          titulo: 'Conteúdo que constrói autoridade',
          texto:
            'Um profissional de conteúdo dedicado que cria material que faz seu perfil crescer organicamente. É alguém dentro do seu dia a dia, produzindo conteúdo que atrai pacientes sem pagar por cada visualização.',
        },
        {
          titulo: 'Ativação estruturada de pacientes antigos',
          texto:
            'Pacientes que sumiram voltam a agendar. Conforme os meses passam e os dados se acumulam, as campanhas ficam cada vez mais inteligentes: segmentação por comportamento, histórico, perfil e momento do paciente.',
        },
        {
          titulo: 'Comunicações automáticas de cuidado (réguas inteligentes)',
          texto:
            'Geração de contratos, cobrança de exames, orientações pré e pós-procedimento, confirmações e lembretes de retorno. Tudo personalizado e automático, baseado no momento real de cada paciente.',
        },
      ],
    },
    analiseDeMercado,
    {
      tipo: 'texto',
      centro: true,
      paragrafos: [
        '<strong>Menos dependência de anúncio pago, mais receita dos pacientes que já confiam em você.</strong>',
      ],
    },
    {
      tipo: 'etapas',
      eyebrow: 'Como funciona',
      fundo: 'alt',
      h2: ['Etapas do Revena Scale'],
      etapas: [
        { n: '1', duracao: '45 dias', nome: 'Estruturação', descricao: 'Tudo do Core + otimização dos perfis digitais, estratégia de conteúdo orgânico, exportação e segmentação da base com criação do calendário de ativações.' },
        { n: '2', duracao: '90 dias', nome: 'Laboratório', descricao: 'Testamos canais, criativos e abordagens. Validamos o que funciona. Otimizamos conteúdos orgânicos em paralelo. Performance medida de ponta a ponta.' },
        { n: '3', duracao: '180 dias', nome: 'Performance', descricao: 'Dobramos a aposta no que tá dando certo. Abrimos novos canais. Ampliamos presença digital.' },
        { n: '4', duracao: 'A partir de 12 meses', nome: 'Operação Contínua', descricao: 'Previsibilidade alcançada. Inovação constante pra não estagnar.' },
      ],
      fechamento:
        'Cada etapa alimenta a próxima. Sem a base construída, seria mais uma agência otimizando no escuro.',
    },
    {
      tipo: 'lista',
      eyebrow: 'Cadência',
      h2: 'O que acontece toda semana e todo mês na sua clínica',
      itens: [
        'Olhar de marketing semanal com análise e recomendações',
        'Acionáveis comerciais semanais com o que fazer para buscar a meta',
        'Relatório de conteúdo mensal (o que mais funcionou no perfil e que vai ser replicado)',
        'Check-in mensal com o gestor da clínica',
        'Alinhamentos quinzenais com a equipe comercial',
        'Suporte via WhatsApp em horário comercial',
        'Alertas proativos quando algo merece atenção imediata',
      ],
    },
    {
      tipo: 'pendencia',
      o_que:
        'Seção 8 · Resultados — o briefing traz só [IMG]. Usar o bloco global de depoimentos/resultados (D11). E a Etapa 1 diz "Tudo do Core", o que contraria a diretriz de não referenciar o Core.',
    },
    ctaProtocolo,
  ],
};
