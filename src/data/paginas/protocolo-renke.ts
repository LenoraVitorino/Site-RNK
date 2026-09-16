import type { Pagina } from './tipos';

/**
 * Copy literal de docs/03-copy/protocolo-renke.md
 * ⚠️ O preço (R$7k) não vai para o site, conforme o próprio documento.
 * Notas SEO não especificadas no briefing — o title abaixo é a sugestão a validar.
 */
export const protocoloRenke: Pagina = {
  rota: '/academy/protocolo-renke',
  titulo: 'Protocolo Renke | O sistema operacional de uma agência de RevOps lucrativa',
  descricao:
    'Tudo que a Renke construiu operando +140 projetos, documentado e transferido para você aplicar no seu nicho.',
  blocos: [
    {
      tipo: 'hero',
      titulo: ['O sistema operacional inteiro de uma operação de RevOps lucrativa.', 'Aberto para você modelar.'],
      realce: 1,
      sub: 'O Protocolo Renke é o flagship da Renke Academy. Tudo que a Renke construiu em 4 anos operando +140 projetos, documentado e transferido para você aplicar no seu nicho. Posicionamento, produtos, processos, ferramentas, venda, entrega, precificação, gestão de equipe. Sem filtro.',
      cta: 'Quero o sistema operacional da Renke →',
    },
    {
      tipo: 'lista',
      eyebrow: 'Para quem é',
      h2: 'Se você é dono de agência e...',
      fundo: 'alt',
      itens: [
        'Tá preso no operacional e não consegue sair',
        'Cobra pouco, entrega muito, e mesmo assim perde cliente',
        'Quer parar de escalar com mais gente e começar a escalar com mais valor',
        'Sente que construiu uma prisão em vez de um negócio',
        'Quer um modelo com menos loucura e mais lucro',
      ],
    },
    {
      tipo: 'blocos',
      eyebrow: '100% dos bastidores da Renke',
      h2: 'O que você recebe',
      itens: [
        {
          titulo: 'Posicionamento',
          texto:
            'Como sair de "agência genérica" e criar um posicionamento que atrai clientes de alto ticket. Como a Renke se diferenciou num mercado comoditizado.',
        },
        {
          titulo: 'Modelo comercial',
          texto:
            'Como vender projetos de R$20k–R$40k e recorrências de R$6.5k–R$15k/mês. Processo de venda consultiva, precificação por valor, qualificação de clientes.',
        },
        {
          titulo: 'Operação',
          texto:
            'Como entregar com poucos clientes e margem alta. Estrutura de squads, rotinas semanais, rituais de gestão, distribuição de contas.',
        },
        {
          titulo: 'Gestão de Equipe',
          texto:
            'Como montar uma equipe enxuta que opera sem depender de você. Cultura, processos, autonomia.',
        },
        {
          titulo: 'Método de Entrega',
          texto:
            'O Protocolo Revena traduzido para você aplicar: diagnóstico, implementação, acompanhamento. Como entregar resultado real e reter cliente por anos.',
        },
        {
          titulo: 'Documentos reais',
          texto:
            'Templates, playbooks, scripts, modelos de proposta, estruturas de relatório. Tudo que usamos hoje, não versões diluídas.',
        },
      ],
    },
    {
      tipo: 'texto',
      eyebrow: 'A tese',
      fundo: 'alt',
      paragrafos: [
        '<em>"Você não abriu uma agência para ter uma vida pior do que tinha antes dela."</em>',
        'O mercado ensinou que crescer = mais clientes + mais equipe. Isso é uma armadilha. Quanto mais clientes, mais caos, mais rotatividade, menos margem, menos qualidade de vida.',
        'O modelo Renke inverte: <strong>poucos clientes + entrega sofisticada + precificação por valor = escala vertical sem caos.</strong> Menos clientes, mais lucro, mais controle, mais liberdade.',
        '<em>"Não é mentoria de quem parou de fazer. É o blueprint de quem faz isso todo dia."</em>',
      ],
    },
    {
      tipo: 'pendencia',
      o_que:
        'Seção 5 · Prova social — estrutura definida ("o que as agências dizem", "o que as clínicas dizem"), mas os depoimentos ainda não foram coletados.',
    },
    {
      tipo: 'ctaFinal',
      destaque: 'O Protocolo Renke não é para todo mundo.',
      texto:
        'É para quem tá pronto para matar o próprio negócio e reconstruir o modelo do zero, mas com inteligência e estrutura. Se quer só "mais dicas de marketing", não é para você. Se quer um sistema operacional completo para transformar sua agência, você está no momento certo.',
      cta: 'Quero conhecer o Protocolo Renke →',
    },
  ],
};
