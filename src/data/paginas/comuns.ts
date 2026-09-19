import type { Bloco } from './tipos';

/**
 * Blocos que aparecem iguais em mais de uma página.
 *
 * Os documentos de copy marcam isso explicitamente ("idêntica à Seção 4 do
 * Revena Core → construir como componente reutilizável"). Duplicar o texto
 * garantiria que um dia as duas versões divergissem.
 */

/** Seção 4 do Core e do Scale, palavra por palavra. */
export const analiseDeMercado: Bloco = {
  tipo: 'texto',
  eyebrow: 'Diferencial estratégico',
  h2: 'Antes de gastar um real, a gente te mostra o jogo.',
  fundo: 'alt',
  paragrafos: [
    'Seus concorrentes estão investindo em anúncios agora. Você sabe no quê? Sabe como se comunicam? Sabe qual brecha estão deixando aberta pra você ocupar?',
    'A gente estuda isso a fundo. Depois, constrói um posicionamento exclusivo pra sua clínica: o que te torna a escolha óbvia na sua região e na sua especialidade.',
    '<strong>Não é template. É construção estratégica individual. Cada clínica tem a sua.</strong>',
  ],
};

/** Fecho padrão dos protocolos. */
export const ctaProtocolo: Bloco = {
  tipo: 'ctaFinal',
  destaque: 'Atendemos uma nova clínica por mês.',
  texto: 'Cada projeto começa com um diagnóstico próprio e acompanhamento dedicado em toda a implementação. Sem templates. Sem terceirização.',
  cta: 'Agende uma conversa',
};
