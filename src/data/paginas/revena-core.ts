import type { Pagina } from './tipos';
import { analiseDeMercado, ctaProtocolo } from './comuns';

/** Copy literal de docs/03-copy/revena-core.md */
export const revenaCore: Pagina = {
  rota: '/studio/revena-core',
  titulo: 'Protocolo Revena Core | Marketing + comercial + dados integrados para clínicas',
  descricao:
    'Um time operando marketing, comercial e dados da sua clínica toda semana. Custo por paciente real, não custo por clique.',
  blocos: [
    {
      tipo: 'hero',
      titulo: ['Toda semana um time olha', 'para os números da sua clínica', 'e diz exatamente o que fazer.'],
      sub: 'O Revena Core assume marketing, comercial e dados da sua clínica. Tudo conectado, toda semana analisado, todo mês otimizado.',
      cta: 'Fale com a equipe e descubra se o Revena Core faz sentido para sua clínica →',
    },
    {
      tipo: 'lista',
      eyebrow: 'Para quem é',
      h2: 'Você se reconhece aqui?',
      fundo: 'alt',
      itens: [
        'Sua clínica fatura acima de R$300k/mês e já entendeu que o problema não é só a agência. Quer um time que conecte tudo.',
        'Tem dados, tem marketing, tem comercial, mas cada área opera no seu mundo e de maneira independente.',
        'Quer clareza do que tá funcionando, o que precisa mudar, e o que fazer.',
        'Já tem o Start ou Full implementado (pré-requisito).',
      ],
    },
    {
      tipo: 'blocos',
      eyebrow: 'Nossa solução',
      h2: 'O que o Revena Core faz pela sua clínica, toda semana',
      largo: true,
      itens: [
        {
          titulo: 'Marketing que funciona de verdade',
          itens: [
            'Anúncios e páginas criados pela Renke, otimizados pelo paciente que fecha, não pelo clique',
            'Estratégia de canais baseada em dados reais de quem avançou no funil',
            'Roteiros produzidos em cima de anatomias validadas',
          ],
        },
        {
          titulo: 'Gestão comercial com método',
          itens: [
            'O dado de quem fechou volta pro marketing. O marketing melhora com base em quem realmente virou paciente',
            'Recuperação de orçamentos parados com processo, não com spam',
            'Alguém olhando toda semana pro seu processo comercial e dizendo o que ajustar',
          ],
        },
        {
          titulo: 'Tecnologia própria rodando',
          itens: [
            'Rastreamento de onde veio cada paciente, de verdade',
            'Confirmações, lembretes e follow-ups disparando sozinhos',
            'Tudo integrado num sistema só',
          ],
        },
        {
          titulo: 'Dados que viram decisão',
          itens: [
            'Painéis com os números que importam: custo por paciente, por canal, por procedimento',
            'Relatório de marketing toda semana com análise e recomendação',
            'Relatório comercial toda semana com o que fazer',
            'Você sabe onde investir mais e onde parar. Cada real tem destino claro.',
          ],
        },
      ],
    },
    analiseDeMercado,
    {
      tipo: 'etapas',
      eyebrow: 'Como funciona',
      h2: ['Etapas do Revena Core'],
      etapas: [
        { n: '1', duracao: '45 dias', nome: 'Estruturação', descricao: 'Dossiê completo da clínica, estudo de concorrência, estratégia de posicionamento, rastreamento configurado, sistema de gestão comercial implementado, painéis de dados montados, metas definidas.' },
        { n: '2', duracao: '90 dias', nome: 'Laboratório', descricao: 'Testamos canais, criativos, abordagens. Validamos o que funciona pra sua clínica especificamente. Performance medida de ponta a ponta: do primeiro contato até o paciente fechar.' },
        { n: '3', duracao: '180 dias', nome: 'Performance', descricao: 'Aumentamos a aposta no que tá dando certo. Cortamos o que não funciona. Abrimos novos canais se fizer sentido.' },
        { n: '4', duracao: 'Em 12 meses', nome: 'Operação Contínua', descricao: 'Previsibilidade alcançada. Otimização constante com o time que já conhece sua clínica por dentro.' },
      ],
      fechamento:
        'Cada etapa alimenta a próxima. Por isso exigimos que a base esteja construída antes de operar. Sem isso, seria mais uma agência otimizando no escuro e tentando milagre com tráfego pago do passado.',
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
