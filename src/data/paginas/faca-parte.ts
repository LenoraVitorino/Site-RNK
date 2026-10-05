import type { Pagina } from './tipos';
import { copyLiteral } from '../versao';

/**
 * Copy literal de docs/03-copy/faca-parte.md. A versão estudio (padrão) tem
 * o topo revisto em 29/09/2026; a VERSAO=copy mantém o original.
 */
/**
 * Layout editorial (04/10/2026): o /faca-parte deixou o layout genérico e
 * monta as dobras em src/components/faca-parte/, lendo os blocos abaixo.
 * Textos novos só de interface, nas duas versões.
 */
export const facaParteEd = {
  /** Título da dobra do time (estudio) e o rótulo da versão copy. */
  time: copyLiteral
    ? { rotulo: undefined, h2: '#TEAMRENKE' }
    : { rotulo: 'Quem faz a Renke', h2: 'Pessoas que constroem a operação.' },
};

export const facaParte: Pagina = {
  rota: '/faca-parte',
  titulo: 'Faça Parte | Renke — Trabalhe com RevOps, saúde e tecnologia',
  descricao:
    'Venha fazer parte do #TeamRenke. Ambiente GPTW, liberdade, evolução e trabalho com propósito. Envie seu currículo.',
  blocos: [
    {
      tipo: 'hero',
      // Na estudio a quebra é só tipográfica: "Faça parte da Renke." em duas linhas, a 2ª em realce.
      titulo: copyLiteral ? ['Faça parte do', '#TEAMRENKE.'] : ['Faça parte', 'da Renke.'],
      realce: 1,
      sub: copyLiteral
        ? 'A Renke é a primeira assessoria de Revenue Operations para clínicas de alto padrão no Brasil. Aqui, a gente conecta marketing, comercial e dados em um sistema só. E faz isso com um time enxuto, autônomo e obcecado por resultado. Se você quer trabalhar com propósito, liberdade e evolução constante: esse é o lugar.'
        : 'Uma operação de Revenue Operations para clínicas de alto padrão, construída por pessoas que valorizam autonomia, responsabilidade e evolução.',
      cta: copyLiteral ? 'Deixe seu currículo ↓' : 'Envie seu currículo →',
      rotaCta: '#formulario',
    },
    {
      tipo: 'texto',
      h2: copyLiteral ? 'Somos GPTW: um ótimo lugar para trabalhar e evoluir.' : 'Um lugar para trabalhar e evoluir.',
      realce: copyLiteral ? undefined : 'evoluir.',
      fundo: 'alt',
      // Selo extraído do site atual (renkestudio.com.br/faca-parte), 28/09/2026.
      selo: 'gptw',
      paragrafos: copyLiteral
        ? [
            'Receber o selo Great Place to Work é reflexo de um compromisso diário com o bem-estar e o desenvolvimento de cada pessoa do time. Aqui, suas ideias são ouvidas, seu crescimento é levado a sério e o ambiente é leve, criativo e humano.',
            '<strong>Não é só um selo. É como a gente opera todo dia.</strong>',
          ]
        : [   // revisão de 29/09/2026
            'Certificados pelo Great Place To Work. Um ambiente de desenvolvimento, autonomia e espaço para cada pessoa crescer.',
          ],
      acoes: copyLiteral ? undefined : [
        { rotulo: 'Conheça nossa cultura', rota: '/sobre#sobre-cultura' },
        { rotulo: 'Ver oportunidades', rota: '#formulario' },
      ],
      indicadores: copyLiteral ? undefined : [
        { icone: 'Compass', texto: 'Autonomia' },
        { icone: 'TrendingUp', texto: 'Desenvolvimento' },
        { icone: 'Users', texto: 'Pessoas em primeiro lugar' },
      ],
    },
    copyLiteral
      ? {
          tipo: 'texto',
          eyebrow: '#TEAMRENKE',
          h2: 'No que acreditamos',
          paragrafos: [
            'Liberdade com autorresponsabilidade. Criatividade com método. Evolução pessoal como parte do trabalho, não como extra.',
            'Nossa filosofia não é um time que constrói a empresa. É uma empresa que constrói pessoas. Um ambiente que te ajuda a ampliar seu nível de felicidade por meio do trabalho, com pessoas plurais que compartilham uma mesma visão: fazer diferente, com excelência.',
          ],
        }
      : {   // revisão de 29/09/2026: sem o #TEAMRENKE, três crenças em lista
          tipo: 'texto',
          h2: 'No que acreditamos',
          paragrafos: [
            'Uma empresa que constrói pessoas com autonomia, troca e espaço para fazer diferente, com excelência.',
          ],
          lista: [
            { icone: 'Compass', titulo: 'Liberdade', texto: 'Com autorresponsabilidade.' },
            { icone: 'Sparkles', titulo: 'Criatividade', texto: 'Com método.' },
            { icone: 'TrendingUp', titulo: 'Evolução', texto: 'Como parte do trabalho.' },
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
    // Só na versão copy: na estudio a dobra saiu (29/09/2026); o endereço está no rodapé.
    ...(copyLiteral ? [{
      tipo: 'texto' as const,
      h2: 'Onde a mágica acontece',
      paragrafos: [
        'Operamos de forma híbrida com o time, com base física pra quem quiser um café e um papo presencial.',
        'R. Benjamin Constant, 2364 · Sala Térrea, Escola Agrícola · Blumenau/SC · CEP 89035-100',
      ],
    }] : []),
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
