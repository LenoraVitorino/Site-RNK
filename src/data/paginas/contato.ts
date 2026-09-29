import type { Pagina } from './tipos';
import { copyLiteral } from '../versao';

/**
 * Copy literal de docs/03-copy/contato.md. A versão estudio (padrão) tem o
 * título e a frase do formulário revistos em 29/09/2026 e tira o
 * bloco "Informações · Grupo RNK", que repetia endereço, e-mail e redes do
 * rodapé logo abaixo (29/09/2026); a VERSAO=copy mantém.
 */
export const contato: Pagina = {
  rota: '/contato',
  titulo: 'Contato | Renke — Revenue Operations, Academy e Soluções Digitais',
  descricao:
    'Entre em contato com a Renke. Atendemos clínicas, agências e empresas. Respondemos em até 24h.',
  blocos: [
    {
      tipo: 'hero',
      titulo: [copyLiteral ? 'Vamos conversar?' : 'Vamos falar sobre sua operação.'],
    },
    {
      tipo: 'formulario',
      // A sub do herói vive aqui, ao lado do formulário que ela descreve —
      // é a mesma frase da copy, só no lugar onde ela é instrução e não enfeite.
      sub: copyLiteral
        ? 'Preencha o formulário e a gente responde em até 24h.'
        : 'Conte sobre o momento da sua clínica e os desafios da sua operação comercial. Nossa equipe entra em contato para entender o cenário e os próximos passos.',   // revisão de 29/09/2026
      email: 'contato@renkestudio.com.br',
      botao: 'Enviar →',
      campos: [
        { id: 'nome', rotulo: 'Nome', tipo: 'text', autocomplete: 'name', obrigatorio: true },
        { id: 'email', rotulo: 'E-mail', tipo: 'email', autocomplete: 'email', obrigatorio: true },
        { id: 'whatsapp', rotulo: 'WhatsApp', tipo: 'tel', autocomplete: 'tel', obrigatorio: true },
        {
          id: 'interesse',
          rotulo: 'Qual o seu interesse?',
          tipo: 'select',
          opcoes: [
            'Revena (para clínicas)',
            'Renke Academy (para agências)',
            'Outro assunto',
          ],
        },
        { id: 'mensagem', rotulo: 'Mensagem (opcional)', tipo: 'textarea' },
      ],
    },
    {
      tipo: 'numeros',
      fundo: 'alt',
      itens: ['+140 clínicas atendidas', '+650 alunos no Academy', '6 anos de operação'],
    },
    {
      tipo: 'pendencia',
      o_que:
        '"6 anos de operação" conflita com "4 anos" usado no restante do site (D1). E os logos de clientes e parceiros desta seção ainda não foram autorizados.',
    },
    {
      tipo: 'faq',
      h2: 'Perguntas frequentes',
      perguntas: [
        {
          p: 'O que a Renke faz?',
          r: 'Somos uma empresa de Revenue Operations. Conectamos marketing, comercial e dados em um sistema só. Atendemos clínicas (Studio), ensinamos agências (Academy) e desenvolvemos tecnologia própria (Tools).',
        },
        {
          p: 'O Academy é só para agências de saúde?',
          r: 'Não. O modelo que ensinamos foi validado em saúde, mas se aplica a qualquer agência que queira sair do modelo genérico e criar uma operação de alto valor.',
        },
        {
          p: 'Vocês fazem site e identidade visual para qualquer empresa?',
          r: 'Sim. Nossos produtos digitais (site institucional e identidade visual) atendem qualquer negócio que precise de presença digital profissional.',
        },
        {
          p: 'Onde ficam?',
          r: 'Blumenau, SC. Mas operamos 100% remoto com clientes de todo o Brasil.',
        },
      ],
    },
    ...(copyLiteral ? [{
      tipo: 'texto' as const,
      eyebrow: 'Informações',
      h2: 'Grupo RNK',
      fundo: 'alt' as const,
      paragrafos: [
        '<strong>Endereço:</strong> R. Benjamin Constant, 2364 · Sala Térrea, Escola Agrícola · Blumenau/SC · CEP 89035-100',
        '<strong>E-mail:</strong> <a href="mailto:contato@renkestudio.com.br">contato@renkestudio.com.br</a>',
        '<strong>CNPJ:</strong> 37.079.656/0001-51',
        '<strong>Horário de atendimento:</strong> segunda a sexta, 08h às 12h | 13h30 às 17h. Sábados e domingos sem atendimento.',
        '<strong>Redes:</strong> <a href="https://instagram.com/renkestudio">Instagram</a> · LinkedIn · YouTube',
      ],
    }] : []),
  ],
};
