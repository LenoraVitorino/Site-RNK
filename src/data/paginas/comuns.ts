import type { Bloco } from './tipos';

/**
 * Blocos que aparecem iguais em mais de uma página.
 *
 * Os documentos de copy marcam isso explicitamente ("idêntica à Seção 4 do
 * Revena Core → construir como componente reutilizável"). Duplicar o texto
 * garantiria que um dia as duas versões divergissem.
 */

/** Fecho padrão dos protocolos. */
export const ctaProtocolo: Bloco = {
  tipo: 'ctaFinal',
  destaque: 'Atendemos uma nova clínica por mês.',
  texto: 'Cada projeto começa com um diagnóstico próprio e acompanhamento dedicado em toda a implementação. Sem templates. Sem terceirização.',
  cta: 'Agende uma conversa',
};
