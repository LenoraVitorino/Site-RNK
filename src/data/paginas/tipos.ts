/**
 * Blocos de conteúdo das páginas internas.
 *
 * A copy de todas as páginas segue o mesmo punhado de formatos — herói, lista
 * de reconhecimento, blocos do que resolve, linha do tempo de etapas, tabela
 * antes/depois, CTA final. Em vez de 14 arquivos .astro repetindo marcação,
 * cada página é uma lista de blocos e um só componente sabe desenhá-los.
 *
 * A copy vem literal de docs/03-copy/. Onde há ⚠️ no documento de origem, o
 * campo `pendencia` registra o que falta — não inventar conteúdo de cliente.
 */

export type Etapa = {
  n: string;
  duracao: string;
  nome: string;
  descricao: string;
};

export type ItemBloco = {
  titulo: string;
  /** Parágrafo. Algumas seções trazem lista em vez de texto corrido. */
  texto?: string;
  itens?: string[];
  /** Id do slot em src/data/midia.ts, quando a copy pede um visual. */
  media?: string;
};

export type Pergunta = { p: string; r: string };

export type Campo = {
  id: string;
  rotulo: string;
  tipo: 'text' | 'email' | 'tel' | 'url' | 'textarea' | 'select';
  /** Só para tipo 'select'. */
  opcoes?: string[];
  obrigatorio?: boolean;
  autocomplete?: string;
};

export type Bloco =
  /** Abertura. `titulo` são as linhas do H1, na quebra que a copy define. */
  | {
      tipo: 'hero';
      titulo: string[];
      /** Índice da linha que recebe o realce amarelo. */
      realce?: number;
      sub?: string;
      cta?: string;
      rotaCta?: string;
      /** Centraliza o herói nessa página (o padrão é alinhado à esquerda). */
      centro?: boolean;
      /** Esconde o rótulo da navegação acima do H1 (Academy, 28/09). */
      semRotulo?: boolean;
    }
  | {
      tipo: 'lista';
      eyebrow?: string;
      h2: string;
      itens: string[];
      /** Numera quando a ordem é a informação — uma jornada, um passo a passo. */
      numerada?: boolean;
      fundo?: 'alt' | 'escuro';
    }
  | {
      tipo: 'produtos';
      eyebrow?: string;
      h2: string;
      sub?: string;
      itens: { titulo: string; texto: string; rota: string; cta: string }[];
      fundo?: 'alt' | 'escuro';
    }
  | {
      tipo: 'blocos';
      eyebrow?: string;
      h2: string;
      /** Linha de apoio abaixo do título. */
      sub?: string;
      /** Título maior, para dar mais peso à abertura do bloco. */
      grande?: boolean;
      itens: ItemBloco[];
      /** Numera os blocos quando a ordem é informação, não decoração. */
      numerado?: boolean;
      /** Uma coluna, para blocos com lista longa dentro. */
      largo?: boolean;
      fundo?: 'alt' | 'escuro';
    }
  /** Painéis grandes 2×2: ícone e índice no topo, título e frase na base (Academy, 28/09). */
  | {
      tipo: 'paineis';
      h2: string;
      /** `titulo` são as duas linhas do título, na quebra definida: todos os painéis com a mesma diagramação. */
      itens: { icone: 'Target' | 'Handshake' | 'TrendingUp' | 'Layers' | 'Workflow' | 'BadgeCheck' | 'Users'; titulo: [string, string]; texto: string }[];
    }
  | {
      tipo: 'etapas';
      eyebrow?: string;
      h2: string[];
      etapas: Etapa[];
      fechamento?: string;
      fundo?: 'alt' | 'escuro';
    }
  | {
      tipo: 'antesDepois';
      eyebrow?: string;
      h2: string;
      rotulos: [string, string];
      linhas: [string, string][];
      fundo?: 'alt' | 'escuro';
    }
  | {
      tipo: 'texto';
      eyebrow?: string;
      h2?: string;
      paragrafos: string[];
      fundo?: 'alt' | 'escuro';
      centro?: boolean;
      /** Mais respiro em cima e embaixo, para dobras de texto curto (Performa, 28/09). */
      respiro?: boolean;
      /** Tópicos curtos com ícone (nome Lucide de Icone.astro), numa linha centralizada abaixo das duas colunas. */
      topicos?: { icone: 'Compass' | 'Cpu' | 'Workflow'; texto: string }[];
      /** Selo de certificação sob o título (layout, não copy). Arquivo em src/assets/selos/. */
      selo?: 'gptw';
    }
  | {
      tipo: 'numeros';
      h2?: string;
      itens: string[];
      /** Frase de fechamento sob os números. */
      nota?: string;
      /** Grade numerada (01, 02…) em vez da fileira de chips. */
      grade?: boolean;
      /** Régua compacta: cartões baixos, valor e legenda lado a lado (só valores curtos, como no Contato). */
      compacto?: boolean;
      fundo?: 'alt' | 'escuro';
    }
  | { tipo: 'faq'; h2: string; perguntas: Pergunta[]; fundo?: 'alt' | 'escuro' }
  | {
      tipo: 'formulario';
      h2?: string;
      sub?: string;
      /** Canal direto, exibido ao lado do formulário. */
      email?: string;
      campos: Campo[];
      botao: string;
    }
  | { tipo: 'ctaFinal'; destaque?: string; texto?: string; cta: string; rotaCta?: string }
  /** Conteúdo que a copy prevê mas ainda não existe. Só aparece em dev. */
  | { tipo: 'pendencia'; o_que: string };

export type Pagina = {
  rota: string;
  /** Meta title da tabela "Notas SEO" do documento de copy. */
  titulo: string;
  descricao: string;
  blocos: Bloco[];
};
