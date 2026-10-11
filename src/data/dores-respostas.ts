/**
 * A dor do dono de clínica e a resposta da Renke, uma por cartão de "O que
 * muda na sua clínica", na mesma ordem de `perguntas` (data/home.ts).
 * Rascunho de 10/10/2026 (versão ajustada; a copy original não tem
 * respostas): a pergunta encurtada e uma resposta que responde de fato,
 * abrindo com a resposta direta. Precisa de validação da Lenora.
 * `d` é o trecho da pergunta que vai em peso médio na lista (escolha minha,
 * a validar).
 */
export const doresRespostas = [
  { q: 'Quanto custa, de verdade, um paciente novo pra sua clínica?', d: 'paciente novo', t: 'Você passa a saber.', r: 'A gente mostra o custo por paciente e o retorno de cada canal.' },
  { q: 'Dos leads que chegam, quantos sentam na cadeira do consultório?', d: 'sentam na cadeira', t: 'Dá pra saber um por um.', r: 'A gente acompanha cada lead até o agendamento.' },
  { q: 'Se sua secretária sai amanhã, o processo continua?', d: 'o processo continua', t: 'Continua.', r: 'A gente estrutura o comercial para a clínica não depender de uma só pessoa.' },
  { q: 'Você sabe qual canal trouxe seus melhores pacientes este mês?', d: 'melhores pacientes', t: 'Com a gente, sabe.', r: 'Você vê de onde veio cada paciente e põe a verba no canal certo.' },
  { q: 'No mês ruim, você encontra o motivo nos dados, com facilidade?', d: 'o motivo', t: 'Encontra.', r: 'Os indicadores mostram em que ponto a clínica perdeu e onde agir.' },
  { q: 'E no mês bom, você sabe o porquê para repetir o resultado?', d: 'repetir o resultado', t: 'Sabe, e repete.', r: 'O que deu certo vira processo e o resultado deixa de ser sorte.' },
  { q: 'Você sabe que espaço seus concorrentes deixam aberto?', d: 'espaço', t: 'A gente mapeia pra você.', r: 'O que eles comunicam e onde sobra espaço.' },
];
