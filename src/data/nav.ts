/** Menu com os rótulos originais da copy. Destinos sem página são filtrados no Header.
 * Os ícones e a sequência atual dos planos Revena foram preservados.
 * Outras Soluções permanece removido conforme pedido anterior.
 */

export type NavLink = {
  rotulo: string;
  rota: string;
  sufixo?: string;
  nota?: string;
  /** Ícone ao lado do nome no menu do desktop (nome do plano em /icones/plano-<id>-<tom>.svg). */
  plano?: string;
};

/**
 * Cartão de destaque à direita do painel do menu (desktop). Textos já usados
 * no site; a foto é uma das fotos da sede (chave do mapa em Header.astro).
 */
export type NavDestaque = { titulo: string; texto: string; rota: string; rotulo: string; foto?: 'cafe' | 'estudio' };

export type NavGrupo = {
  titulo: string;
  itens: NavLink[];
};

export type NavItem =
  | { rotulo: string; rota: string; atual?: boolean }
  | { rotulo: string; id: string; grupos: NavGrupo[]; destaque?: NavDestaque };

export const menu: NavItem[] = [
  { rotulo: 'Home', rota: '/' },
  {
    rotulo: 'Para Clínicas',
    id: 'mm-clinicas',
    grupos: [
      {
        titulo: 'Protocolo Revena',
        itens: [
          // Mesma escada do palco (Lenora, 26/09): Start, Run, Scale, Core, Full.
          { rotulo: 'Protocolo Revena Start', rota: '/studio/revena-start', plano: 'start' },
          { rotulo: 'Protocolo Revena Run', rota: '/studio/revena-run', plano: 'run' },
          { rotulo: 'Protocolo Revena Scale', rota: '/studio/revena-scale', plano: 'scale' },
          { rotulo: 'Protocolo Revena Core', rota: '/studio/revena-core', plano: 'core' },
          { rotulo: 'Protocolo Revena Full', rota: '/studio/revena-full', plano: 'full' },
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
    destaque: {
      titulo: 'Protocolo Revena',
      texto: 'Do anúncio ao retorno do paciente, tudo conectado, tudo rastreado.',
      rota: '/contato',
      rotulo: 'Fale com a gente',
      foto: 'cafe',
    },
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
    destaque: {
      titulo: 'Renke Academy',
      texto: 'Método, processos e ferramentas para donos de agências estruturarem uma operação mais eficiente.',
      rota: '/academy',
      rotulo: 'Conhecer',
      foto: 'estudio',
    },
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
    destaque: {
      titulo: 'Renke Tools',
      texto: 'Tecnologias proprietárias que transformam nossa metodologia em ferramentas para acelerar resultados.',
      rota: '/tools',
      rotulo: 'Conhecer',
    },
  },

  { rotulo: 'Conteúdos', rota: '/blog' },
  {
    rotulo: 'A Renke',
    id: 'mm-renke',
    grupos: [{
      titulo: 'A Renke',
      itens: [
        { rotulo: 'Sobre', rota: '/#o-que-fazemos' },
        { rotulo: 'Contato', rota: '/contato' },
        { rotulo: 'Faça Parte', rota: '/faca-parte' },
      ],
    }],
  },
];

/** Ação de conversão no header. Botão, não item de navegação. */
export const acaoHeader = { rotulo: 'Contato', rota: '/contato' };

export const rodape = {
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
  /** Só dígitos, com DDI (ex.: 5547999999999). Vazio: o formulário abre o e-mail. */
  whatsapp: '',
  copyright: '© 2026 Renke Studio. Todos os direitos reservados.',
  assinatura: 'Você não controla o que não enxerga.',
};
