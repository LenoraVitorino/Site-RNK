/**
 * Estrutura do menu principal.
 * Ver docs/02-arquitetura/sitemap.md
 *
 * "Home" saiu: a assinatura no header já leva à raiz, e o item ocupava espaço
 * sem oferecer destino novo.
 *
 * "Conteúdos", "Contato" e "Faça Parte" eram três itens soltos no fim. Viraram:
 * um grupo "A Renke" (Sobre · Cases · Conteúdos · Faça Parte) e o Contato
 * promovido a botão, que é o que ele de fato é — a ação de conversão.
 *
 * Isso também resolve a D7: "Sobre" e "Cases" estavam fora do menu apesar de
 * serem os pilares de E-E-A-T declarados no briefing.
 */

export type NavLink = {
  rotulo: string;
  rota: string;
  sufixo?: string;
  nota?: string;
};

export type NavGrupo = {
  titulo: string;
  itens: NavLink[];
};

export type NavItem =
  | { rotulo: string; rota: string; atual?: boolean }
  | { rotulo: string; id: string; grupos: NavGrupo[] };

export const menu: NavItem[] = [
  {
    rotulo: 'Para Clínicas',
    id: 'mm-clinicas',
    grupos: [
      {
        titulo: 'Revena',
        itens: [
          { rotulo: 'Revena Start', rota: '/studio/revena-start' },
          { rotulo: 'Revena Full', rota: '/studio/revena-full' },
          { rotulo: 'Revena Core', rota: '/studio/revena-core' },
          { rotulo: 'Revena Scale', rota: '/studio/revena-scale' },
          { rotulo: 'Revena Run', rota: '/studio/revena-run' },
        ],
      },
      {
        titulo: 'Treinamento',
        itens: [
          {
            rotulo: 'Treinamento para secretárias',
            rota: '/studio/treine-sua-equipe',
            nota: 'decisão pendente: descontinuar?',
          },
        ],
      },
    ],
  },

  {
    rotulo: 'Para Agências',
    id: 'mm-agencias',
    grupos: [
      {
        titulo: 'Renke Academy',
        itens: [
          { rotulo: 'Renke Academy', rota: '/academy' },
          { rotulo: 'Protocolo Renke', rota: '/academy/protocolo-renke' },
          { rotulo: 'Formação Performa', rota: '/academy/formacao-performa' },
          { rotulo: 'Treinamento CRM', rota: '/academy/treinamento-crm' },
          { rotulo: 'Rastreamento Avançado', rota: '/academy/rastreamento-avancado' },
          { rotulo: 'Cultura Pro', rota: '/academy/cultura-pro' },
        ],
      },
    ],
  },

  {
    rotulo: 'Outras Soluções',
    id: 'mm-solucoes',
    grupos: [
      {
        titulo: 'Produtos digitais',
        itens: [
          { rotulo: 'Site Institucional', rota: '/studio/site-institucional' },
          { rotulo: 'Identidade Visual', rota: '/studio/identidade-visual' },
        ],
      },
    ],
  },

  {
    rotulo: 'Tecnologia',
    id: 'mm-tecnologia',
    grupos: [
      {
        titulo: 'Renke Tools',
        itens: [
          {
            rotulo: 'Renke Connect',
            rota: '/tools/renke-connect',
            sufixo: '(em breve)',
            nota: 'estratégia diz que já está ativo',
          },
          { rotulo: 'Renke CRM', rota: '/tools/renke-crm', sufixo: '(em breve)' },
        ],
      },
    ],
  },

  {
    rotulo: 'A Renke',
    id: 'mm-renke',
    grupos: [
      {
        titulo: 'A empresa',
        itens: [
          { rotulo: 'Sobre', rota: '/sobre' },
          { rotulo: 'Cases', rota: '/cases' },
        ],
      },
      {
        titulo: 'Mais',
        itens: [
          { rotulo: 'Conteúdos', rota: '/blog' },
          { rotulo: 'Faça Parte', rota: '/faca-parte' },
        ],
      },
    ],
  },
];

/** Ação de conversão no header. Botão, não item de navegação. */
export const acaoHeader = { rotulo: 'Fale com a gente', rota: '/contato' };

export const rodape = {
  tagline: 'Não é marketing. É RevOps.',
  links: [
    { rotulo: 'Home', rota: '/' },
    { rotulo: 'Para Clínicas', rota: '/studio' },
    { rotulo: 'Para Agências', rota: '/academy' },
    { rotulo: 'Tecnologia', rota: '/tools' },
    { rotulo: 'Conteúdos', rota: '/blog' },
    { rotulo: 'Faça Parte', rota: '/faca-parte' },
  ],
  redes: [
    { rotulo: 'Instagram', rota: 'https://instagram.com/renkestudio' },
    { rotulo: 'LinkedIn', rota: '#' },
    { rotulo: 'YouTube', rota: '#' },
  ],
  endereco: [
    'R. Benjamin Constant, 2364',
    'Sala Térrea, Escola Agrícola',
    'Blumenau/SC · CEP 89035-100',
  ],
  email: 'contato@renkestudio.com.br',
  copyright: '© 2026 Renke Studio. Todos os direitos reservados.',
  assinatura: 'Você não controla o que não enxerga.',
};
