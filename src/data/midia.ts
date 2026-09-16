/**
 * Inventário de mídia da home.
 *
 * Cada slot tem número, tipo, proporção e o que precisa mostrar. Serve para
 * três coisas: o wireframe desenhar a caixa no tamanho certo, a conversa ter
 * um vocabulário comum ("o slot 03"), e o time da Renke saber exatamente o
 * que produzir.
 *
 * A lista de produção sai daqui: docs/04-design/inventario-de-midia.md
 */

export type Tipo = 'imagem' | 'video' | 'gif' | 'animacao' | 'logo' | 'retrato';

export type Slot = {
  id: string;
  secao: string;
  tipo: Tipo;
  /** Proporção largura/altura. Define a caixa no wireframe. */
  proporcao: string;
  titulo: string;
  descricao: string;
  /** Nota de produção: enquadramento, confidencialidade, alternativas. */
  producao?: string;
  status: 'pendente' | 'existe';
  /**
   * Preenchido quando o asset já existe e é um vídeo próprio.
   * A caixa de slot dá lugar ao player real — ver src/components/ui/Reel.astro.
   */
  video?: Video;
};

export type Video = {
  /**
   * Arquivos em public/, na ordem de preferência. Auto-hospedados: sem
   * terceiro no caminho. Hoje só H.264 — a lista existe para um formato
   * menor entrar na frente sem mexer no componente.
   */
  arquivos: { src: string; tipo: string }[];
  /** Primeiro quadro, servido antes de o vídeo carregar. */
  poster: string;
  duracao: string;
  autor: string;
  /** Publicação original, creditada na legenda. */
  origem: string;
  /** Descreve o conteúdo para quem não vê o vídeo. */
  descricao: string;
};

export const slots: Slot[] = [
  {
    id: '01',
    secao: 'Hero',
    tipo: 'logo',
    proporcao: '5 / 2',
    titulo: 'Logos de clientes',
    descricao: '5 a 6 logos em linha, opacidade reduzida, com leve sobreposição.',
    producao: 'Exigem autorização de uso. Cada um precisa de nome + especialidade para o tooltip.',
    status: 'pendente',
  },
  {
    id: '02',
    secao: 'O que fazemos',
    tipo: 'video',
    proporcao: '9 / 16',
    titulo: 'Vídeo institucional "o que a Renke faz"',
    descricao: 'Reel do @renke.studio que explica a categoria RevOps. 1min42.',
    producao:
      'Formato reels, 720×1280. Auto-hospedado (H.264, CRF 32, 6,6 MB) e com legenda ' +
      'queimada, então comunica mudo. Toca ao entrar na tela e pausa ao sair.',
    status: 'existe',
    video: {
      arquivos: [
        { src: '/midia/o-que-a-renke-faz.mp4', tipo: 'video/mp4; codecs="avc1.4D401F, mp4a.40.2"' },
        // Versão leve (540p, ~3 MB) só para o arquivo único do artifact, que
        // embute o menor <source> em base64. No site o navegador usa o primeiro.
        { src: '/midia/o-que-a-renke-faz-previa.mp4', tipo: 'video/mp4; codecs="avc1.4D401F, mp4a.40.2"' },
      ],
      poster: '/midia/reel-o-que-a-renke-faz.jpg',
      duracao: '1min42',
      autor: '@renke.studio',
      origem: 'https://www.instagram.com/reel/DXcJsj2FTz0/',
      descricao:
        'A equipe da Renke trabalhando em automações e CRM, com legendas explicando ' +
        'por que dados integrados e processos escaláveis decidem a competitividade de ' +
        'uma clínica.',
    },
  },
  {
    id: '03',
    secao: 'O que fazemos',
    tipo: 'gif',
    proporcao: '16 / 10',
    titulo: 'Renke CRM em uso',
    descricao: 'Tela do CRM com dados entrando, dentro do card "Implementamos um CRM".',
    producao: 'Loop curto, 3–4s. Nome do cliente borrado.',
    status: 'pendente',
  },
  {
    id: '04',
    secao: 'Resultados',
    tipo: 'retrato',
    proporcao: '1 / 1',
    titulo: 'Depoimentos de clientes',
    descricao: '2 fotos reais de médicos, com fala, nome, especialidade e cidade.',
    producao: 'Foto real, não stock. Exige autorização de imagem.',
    status: 'pendente',
  },
  {
    id: '05',
    secao: 'Academy + Tools',
    tipo: 'imagem',
    proporcao: '3 / 2',
    titulo: 'Renke Academy',
    descricao: 'Imagem que represente a Academy — sala, gravação, ou material do curso.',
    status: 'pendente',
  },
  {
    id: '06',
    secao: 'Academy + Tools',
    tipo: 'imagem',
    proporcao: '3 / 2',
    titulo: 'Renke Tools',
    descricao: 'Imagem dos produtos de tecnologia — CRM, Connect, Pulse AI.',
    status: 'pendente',
  },
];

export const porId = (id: string) => {
  const slot = slots.find((s) => s.id === id);
  if (!slot) throw new Error(`Slot de mídia "${id}" não existe em src/data/midia.ts`);
  return slot;
};

export const rotuloTipo: Record<Tipo, string> = {
  imagem: 'IMAGEM',
  video: 'VÍDEO',
  gif: 'GIF',
  animacao: 'ANIMAÇÃO',
  logo: 'LOGOS',
  retrato: 'FOTO',
};
