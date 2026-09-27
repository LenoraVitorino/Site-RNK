/** Perfis e contagem compartilhados pelas duas versões da hero. */
export interface Doutor {
  nome: string;
  especialidade: string;
  foto: string;
}

// 00 é o marcador solicitado enquanto a contagem de doutores não é definida.
export const totalDoutores: number | null = null;
// Nomes fictícios para validar o hover; substituir pelos perfis reais antes da publicação.
export const doutores: Doutor[] = [
  'Dra. Mariana Costa',
  'Dr. Rafael Almeida',
  'Dra. Camila Rocha',
  'Dr. Lucas Martins',
  'Dra. Beatriz Lima',
  'Dr. André Ribeiro',
].map((nome) => ({ nome, especialidade: 'Perfil ilustrativo', foto: '' }));
