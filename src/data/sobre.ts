/**
 * Página Sobre a Renke (28/09/2026). Especificação:
 * docs/04-design/pagina-sobre.md (as "Emendas do orquestrador" prevalecem).
 *
 * Todo o texto da página mora aqui, com a fonte ao lado de cada campo. Só
 * texto literal da copy e dos dados; as poucas peças novas (o <title>, os
 * alt das fotos e os rótulos de acessibilidade) são as da lista "Microcopy
 * nova" da especificação.
 *
 * Duas versões (src/data/versao.ts): a VERSAO=copy guarda o texto da copy
 * entregue (home.md, seção 7), literal; a estudio (padrão) leva a copy
 * revista pela Lenora em 29/09/2026. Onde não há revisão, as duas são iguais.
 *
 * Fotos: para trocar uma foto, colocar o arquivo (com pelo menos 1760px de
 * largura) em src/assets/sede/, importá-lo abaixo e apontar a entrada de
 * `fotos`. O layout não muda.
 */
import type { ImageMetadata } from 'astro';
import type { BlocoDe } from '../components/pagina/contexto';
import { copyLiteral } from './versao';
import operacao from '../assets/sede/operacao.jpg';
import salaVidro from '../assets/sede/sala-vidro.jpg';
import estudio from '../assets/sede/estudio.jpg';
import cafe from '../assets/sede/cafe.jpg';
import equipe from '../assets/sede/equipe.jpg';   // ES1: foto nova do salão, não a foto de grupo antiga (time-renke.png)
import sofa from '../assets/sede/sofa.jpg';

/* ------------------------------------------------------------------ */
/* SEO                                                                  */
/* ------------------------------------------------------------------ */

/**
 * A frase de abertura, num campo só (pendência D5, "do mundo" × "no
 * Brasil": fica o texto da home até a Lenora decidir). O <strong> segue o
 * negrito da copy e a direção do briefing (:1038-1041).
 * Fonte: docs/03-copy/home.md:194; briefing-texto-extraido.txt:947.
 */
const frase1 =
  'A Renke é a primeira <strong>assessoria de Revenue Operations</strong> para clínicas médicas e odontológicas de alto padrão do mundo.';

export const seo = {
  /** Microcopy nova 1: montagem de títulos existentes. */
  titulo: 'Sobre a Renke | Grupo RNK',
  /** A 1ª frase do §1, literal, sem o negrito. */
  descricao: frase1.replace(/<\/?strong>/g, ''),
};

/* ------------------------------------------------------------------ */
/* S0 · Abertura                                                        */
/* ------------------------------------------------------------------ */

export const abertura = {
  rotulo: 'Sobre',                    // home.md:191 (Eyebrow)
  linhasH1: ['Sobre a', 'Renke'],     // home.md:192 (H2 da home); a quebra é só tipográfica
  /** HTML: tem o <strong>. Renderizar com set:html. */
  lead: frase1,                       // home.md:194
};

/* ------------------------------------------------------------------ */
/* S1 · O que somos                                                     */
/* ------------------------------------------------------------------ */

export const somos = {
  /** Tom duplo: a 1ª linha em tinta, a 2ª em cinza. */
  h2: copyLiteral
    ? ['Não somos agência de marketing.', 'Não somos consultoria de gestão.'] as const   // home.md:195
    : ['Uma operação de receita', 'construída para clínicas.'] as const,              // revisão de 29/09/2026; a quebra é só tipográfica
  texto: copyLiteral
    ? 'Somos o time que conecta marketing, processo comercial e dados em um sistema único, operado de perto, com responsabilidade pelo resultado da última linha do nosso cliente.'   // home.md:195-197
    : 'Somos o time que conecta marketing, processo comercial e dados em uma operação única, orientada por dados e acompanhada de perto.',   // revisão de 29/09/2026
};

/* ------------------------------------------------------------------ */
/* S2 · A tese                                                          */
/* ------------------------------------------------------------------ */

/** Um passo da tese: a afirmação e, na versão estudio, a frase de apoio. */
export interface PassoTese {
  frase: string;
  apoio?: string;
}

export const tese: { h2: string; passos: PassoTese[] } = {
  h2: 'Começamos com uma tese simples:',   // home.md:199; briefing:949
  passos: copyLiteral
    /**
     * O parágrafo da tese destrinchado em cinco linhas, sem mudar nenhuma
     * letra. A minúscula da 1ª linha é a continuação literal do título.
     * Fonte: home.md:199-202.
     */
    ? [
        { frase: 'o problema das clínicas que faturam bem mas não têm previsibilidade não é marketing.' },
        { frase: 'É o que acontece depois do lead.' },
        { frase: 'Dados soltos, equipes desconectadas, decisões no feeling.' },
        { frase: 'Nenhuma agência resolve isso porque isso não é um problema de marketing.' },
        { frase: 'É um problema de negócio.' },
      ]
    /** Revisão de 29/09/2026: quatro afirmações, cada uma com a sua frase de apoio. */
    : [
        {
          frase: 'Clínicas podem faturar bem sem ter previsibilidade.',
          apoio: 'Crescimento de receita não significa, necessariamente, uma operação previsível.',
        },
        {
          frase: 'O lead é só o começo da operação.',
          apoio: 'A maior parte das perdas acontece entre a entrada da oportunidade e o fechamento.',
        },
        {
          frase: 'Marketing, comercial e dados precisam operar juntos.',
          apoio: 'Quando cada área trabalha com processos e informações diferentes, fica difícil entender a performance e identificar onde a receita está sendo perdida.',
        },
        {
          frase: 'Previsibilidade é uma questão de negócio.',
          apoio: 'Receita previsível exige processos, dados e decisões integrados ao longo de toda a operação.',
        },
      ],
};

/* ------------------------------------------------------------------ */
/* S3 · A prova                                                         */
/* ------------------------------------------------------------------ */

export const prova = {
  /** A frase em cinza e o realce (o negrito da copy) em tinta, no mesmo peso. */
  h2: { antes: 'Em quatro anos, validamos essa tese em mais de ', realce: '140 clínicas', depois: '.' },   // home.md:204
  /** B, C e D, na ordem de leitura. Fonte: home.md:204-207; briefing:951. */
  frases: [
    copyLiteral
      ? 'Construímos o Protocolo Revena, metodologia proprietária que estrutura a operação de receita do zero e a mantém funcionando no longo prazo.'
      : 'A experiência deu origem ao Protocolo Revena, metodologia proprietária para estruturar, operar e evoluir a receita das clínicas.',   // revisão de 29/09/2026
    copyLiteral
      ? 'Desenvolvemos tecnologia própria para operacionalizar o método.'
      : 'Desenvolvemos tecnologia própria para traduzir o método em ferramentas e processos aplicáveis à operação.',   // revisão de 29/09/2026
    copyLiteral
      ? 'E formamos especialistas que fazem isso, para saúde, todo santo dia.'
      : 'E formamos especialistas preparados para operar esse modelo no setor de saúde.',   // revisão de 29/09/2026
  ] as const,
};

/* ------------------------------------------------------------------ */
/* S4 · A casa                                                          */
/* ------------------------------------------------------------------ */

export const casa = {
  h2: copyLiteral
    ? 'Onde a mágica acontece'    // src/data/paginas/faca-parte.ts:55
    : 'Onde a Renke opera',       // revisão de 29/09/2026
  /** Pendência: "híbrida" aqui × "100% remoto" em contato.ts:66. */
  texto: copyLiteral
    ? 'Operamos de forma híbrida com o time, com base física pra quem quiser um café e um papo presencial.'   // faca-parte.ts:57
    : 'Trabalhamos de forma híbrida, combinando operação remota com uma base física para encontros presenciais, reuniões e troca próxima com o time.',   // revisão de 29/09/2026
};

/* ------------------------------------------------------------------ */
/* S5 · Cultura                                                         */
/* ------------------------------------------------------------------ */

export const cultura = {
  /** Só na versão copy: na estudio o selo saiu (29/09/2026, "nada high ticket"). */
  rotulo: copyLiteral ? '#TEAMRENKE' : undefined,   // faca-parte.ts:34
  h2: 'No que acreditamos',        // faca-parte.ts:35
  frase: copyLiteral
    /** Recorte literal do começo do 2º parágrafo (faca-parte.ts:38). */
    ? 'Nossa filosofia não é um time que constrói a empresa. É uma empresa que constrói pessoas.'
    : 'Uma empresa forte é construída por pessoas com espaço para crescer, autonomia para agir e responsabilidade pelo que constroem.',   // revisão de 29/09/2026
  /** Só os títulos dos quatro valores (faca-parte.ts:43-51). */
  valores: ['Liberdade', 'Autorresponsabilidade', 'Conexão', 'Evolução'] as const,
  /** Só na versão copy: na estudio a dobra fecha nos valores, sem CTA (29/09/2026). */
  link: copyLiteral ? { rotulo: 'Faça Parte', rota: '/faca-parte' } : undefined,   // rótulo do nav.ts
};

/* ------------------------------------------------------------------ */
/* S6 · Fecho (BlocoCtaFinal)                                           */
/* ------------------------------------------------------------------ */

export const fecho: BlocoDe<'ctaFinal'> = {
  tipo: 'ctaFinal',
  destaque: copyLiteral
    ? 'Antes de trocar de agência de novo, descubra o que é RevOps.'   // home.md:218
    : 'Sua próxima decisão sobre receita começa aqui.',              // revisão de 29/09/2026
  texto: copyLiteral
    ? undefined
    : 'Entenda como uma operação de Revenue Operations pode transformar a forma como sua clínica cresce.',   // revisão de 29/09/2026
  cta: 'Fale com a gente',                                                     // nav.ts:62
  rotaCta: '/contato',
};

/* ------------------------------------------------------------------ */
/* Fotos (04/10/2026, layout editorial): uma por dobra, todas da sede.  */
/* ------------------------------------------------------------------ */

export interface FotoEd {
  foto: ImageMetadata;
  alt: string;
  /** object-position da imagem ('50% 45%'). */
  foco?: string;
}

export const fotos: Record<'capa' | 'somos' | 'tese' | 'prova' | 'casa' | 'casaDetalhe', FotoEd> = {
  capa: { foto: operacao, foco: '50% 42%', alt: 'Salão da sede da Renke, com o time nas estações de trabalho e o R amarelo na parede.' },
  somos: { foto: estudio, foco: '50% 40%', alt: 'Parede amarela com o nome Renke em neon e a frase “Pense, elabore e surpreenda!”.' },
  tese: { foto: salaVidro, foco: '40% 50%', alt: 'Sala de reunião com divisória de vidro e palavras em amarelo na parede.' },
  prova: { foto: cafe, foco: '30% 50%', alt: 'Área do café da sede, com bancada e cadeiras amarelas.' },
  casa: { foto: equipe, foco: '50% 50%', alt: 'Salão da sede com o time nas estações de trabalho e a faixa amarela da marca na parede.' },
  casaDetalhe: { foto: sofa, foco: '50% 50%', alt: 'Nicho amarelo com sofá e a frase “Seja o hábito da mudança!”.' },
};
