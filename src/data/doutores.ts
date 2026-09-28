/** Retratos e contagem reais, compartilhados pelas duas versões da hero. */
export interface Doutor {
  nome: string;
  especialidade: string;
  foto: string;
}

// 00 é o marcador solicitado enquanto a contagem de doutores não é definida.
export const totalDoutores: number | null = null;
export const doutores: Doutor[] = [];
