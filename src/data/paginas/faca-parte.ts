import type { Pagina } from './tipos';

/** Copy literal de docs/03-copy/faca-parte.md */
export const facaParte: Pagina = {
  rota: '/faca-parte',
  titulo: 'Faça Parte | Renke — Trabalhe com RevOps, saúde e tecnologia',
  descricao:
    'Venha fazer parte do #TeamRenke. Ambiente GPTW, liberdade, evolução e trabalho com propósito. Envie seu currículo.',
  blocos: [
    {
      tipo: 'hero',
      titulo: ['Faça parte do', '#TEAMRENKE.'],
      realce: 1,
      sub: 'A Renke é a primeira assessoria de Revenue Operations para clínicas de alto padrão no Brasil. Aqui, a gente conecta marketing, comercial e dados em um sistema só. E faz isso com um time enxuto, autônomo e obcecado por resultado. Se você quer trabalhar com propósito, liberdade e evolução constante: esse é o lugar.',
      cta: 'Deixe seu currículo ↓',
      rotaCta: '#curriculo',
    },
    {
      tipo: 'pendencia',
      o_que:
        'Foto do time e depoimentos em vídeo estão desatualizados — o briefing pede regravar com colaboradores ativos. E aqui a frase é "primeira assessoria no Brasil", enquanto a home diz "do mundo" (D5).',
    },
    {
      tipo: 'texto',
      h2: 'Somos GPTW: um ótimo lugar para trabalhar e evoluir.',
      fundo: 'alt',
      paragrafos: [
        'Receber o selo Great Place to Work é reflexo de um compromisso diário com o bem-estar e o desenvolvimento de cada pessoa do time. Aqui, suas ideias são ouvidas, seu crescimento é levado a sério e o ambiente é leve, criativo e humano.',
        '<strong>Não é só um selo. É como a gente opera todo dia.</strong>',
      ],
    },
    {
      tipo: 'texto',
      eyebrow: '#TEAMRENKE',
      h2: 'No que acreditamos',
      paragrafos: [
        'Liberdade com autorresponsabilidade. Criatividade com método. Evolução pessoal como parte do trabalho, não como extra.',
        'Nossa filosofia não é um time que constrói a empresa. É uma empresa que constrói pessoas. Um ambiente que te ajuda a ampliar seu nível de felicidade por meio do trabalho, com pessoas plurais que compartilham uma mesma visão: fazer diferente, com excelência.',
      ],
    },
    {
      tipo: 'blocos',
      h2: 'Os 4 valores',
      largo: true,
      fundo: 'alt',
      itens: [
        { titulo: 'Liberdade', texto: 'Você decide como, quando e de onde trabalhar. Confiamos no seu julgamento.' },
        { titulo: 'Autorresponsabilidade', texto: 'Liberdade vem com responsabilidade. A entrega é sua, o compromisso é com o resultado.' },
        { titulo: 'Conexão', texto: 'Somos uma tribo. O bem do grupo é inegociável. Colaboração é o padrão, não a exceção.' },
        { titulo: 'Evolução', texto: 'Crescer como profissional aqui é tão importante quanto entregar resultado.' },
      ],
    },
    {
      tipo: 'texto',
      h2: 'Onde a mágica acontece',
      paragrafos: [
        'Operamos de forma híbrida com o time, com base física pra quem quiser um café e um papo presencial.',
        'R. Benjamin Constant, 2364 · Sala Térrea, Escola Agrícola · Blumenau/SC · CEP 89035-100',
      ],
    },
    {
      tipo: 'pendencia',
      o_que:
        'Endereço a confirmar: a copy de /faca-parte traz placeholder e o de /contato traz o da Escola Agrícola. Fotos da nova sede também estão pendentes.',
    },
    {
      tipo: 'formulario',
      h2: 'Quer fazer parte?',
      sub: 'Mesmo sem vaga aberta, a gente recebe currículos. Se você se identifica com o que leu aqui e quer trabalhar com RevOps, saúde e tecnologia: manda seu currículo.',
      botao: 'Enviar currículo →',
      campos: [
        { id: 'nome', rotulo: 'Nome', tipo: 'text', autocomplete: 'name', obrigatorio: true },
        { id: 'email', rotulo: 'E-mail', tipo: 'email', autocomplete: 'email', obrigatorio: true },
        { id: 'whatsapp', rotulo: 'WhatsApp', tipo: 'tel', autocomplete: 'tel', obrigatorio: true },
        {
          id: 'area',
          rotulo: 'Área de interesse',
          tipo: 'select',
          opcoes: [
            'Marketing / Performance',
            'CRM / Comercial',
            'Tecnologia / Automações',
            'Design / Conteúdo',
            'Outra',
          ],
        },
        { id: 'curriculo', rotulo: 'Link do currículo ou portfólio', tipo: 'url', obrigatorio: true },
      ],
    },
  ],
};
