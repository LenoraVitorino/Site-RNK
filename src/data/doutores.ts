/** Retratos e contagem reais, compartilhados pelas duas versões da hero. */
export interface Doutor {
  nome: string;
  especialidade: string;
  foto: string;
}

// Número de clínicas já exibido na home; não representa contagem de médicos.
export const totalClinicas = 30;
export const doutores: Doutor[] = [];
