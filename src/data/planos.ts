/**
 * O que cada página de plano Revena tem além do texto da copy (05/10/2026):
 * a ficha da hero, os ícones dos cartões e as peças da ilustração. A ficha
 * só repete informações que a página já traz. As peças da ilustração são
 * microcopy de interface, de exemplo, sem números de resultado.
 */
import type { NomeIconeRenke } from './icones-renke';

export interface ArtePlano {
  chegada: { icone: 'instagram' | 'relatorio' | 'busca' | 'campanha'; titulo: string; sub: string };
  mensagem: { rotulo: string; canal: string; quando: string; texto: string };
  estado: { titulo: string; sub: string };
}
export interface ExtrasPlano {
  slug: 'start' | 'run' | 'scale' | 'core' | 'full';
  ficha: { rotulo: string; valor: string }[];
  /** Ícones dos cartões de "O que o plano faz", na ordem. */
  icones: NomeIconeRenke[];
  arte: ArtePlano;
}

export const extrasPlanos: Record<ExtrasPlano['slug'], ExtrasPlano> = {
  start: {
    slug: 'start',
    ficha: [
      { rotulo: 'Duração', valor: '90 dias' },
      { rotulo: 'Etapas', valor: 'Onboarding, diagnóstico, implementação e acompanhamento' },
      { rotulo: 'Para clínicas', valor: 'Com operação comercial ativa' },
      { rotulo: 'Entrega', valor: 'CRM, processo, automações e dados' },
    ],
    icones: ['conexao', 'funil', 'fluxo', 'dados'],
    arte: {
      chegada: { icone: 'instagram', titulo: 'Novo lead', sub: 'Instagram · agora' },
      mensagem: { rotulo: 'Lembrete', canal: 'WhatsApp', quando: 'agora', texto: 'Sua avaliação é amanhã, às 14:00. Podemos confirmar a sua presença?' },
      estado: { titulo: 'Agendado', sub: 'ter, 14:00' },
    },
  },
  run: {
    slug: 'run',
    ficha: [
      { rotulo: 'Ritmo', valor: 'Acompanhamento semanal e reunião mensal' },
      { rotulo: 'Pré-requisito', valor: 'Revena Start ou Full implementado' },
      { rotulo: 'Para clínicas', valor: 'Que querem manter o processo comercial rodando' },
      { rotulo: 'Entrega', valor: 'Relatório, acionáveis, recuperação e ajustes' },
    ],
    icones: ['bussola', 'mira', 'funil', 'fluxo'],
    arte: {
      chegada: { icone: 'relatorio', titulo: 'Relatório semanal', sub: 'Operação · hoje' },
      mensagem: { rotulo: 'Alerta', canal: 'WhatsApp', quando: 'agora', texto: 'Três orçamentos estão parados há uma semana. Vale retomar o contato hoje.' },
      estado: { titulo: 'Ajustado', sub: 'follow-up' },
    },
  },
  scale: {
    slug: 'scale',
    ficha: [
      { rotulo: 'Etapas', valor: 'Estruturação, laboratório, performance e operação contínua' },
      { rotulo: 'Ritmo', valor: 'Análises semanais e check-in mensal' },
      { rotulo: 'Para clínicas', valor: 'Acima de R$300k/mês, com operação estruturada' },
      { rotulo: 'Entrega', valor: 'Captação, conteúdo e reativação da base' },
    ],
    icones: ['conexao', 'brilho', 'pessoas', 'fluxo'],
    arte: {
      chegada: { icone: 'busca', titulo: 'Novo lead', sub: 'Google · agora' },
      mensagem: { rotulo: 'Reativação', canal: 'WhatsApp', quando: 'agora', texto: 'Faz seis meses da sua última consulta. Quer agendar o seu retorno?' },
      estado: { titulo: 'Retorno agendado', sub: 'qui, 10:00' },
    },
  },
  core: {
    slug: 'core',
    ficha: [
      { rotulo: 'Etapas', valor: 'Estruturação, laboratório, performance e operação contínua' },
      { rotulo: 'Ritmo', valor: 'Relatórios semanais e check-in mensal' },
      { rotulo: 'Para clínicas', valor: 'Acima de R$300k/mês, com Start ou Full implementado' },
      { rotulo: 'Entrega', valor: 'Marketing, comercial e dados num time só' },
    ],
    icones: ['mira', 'funil', 'tecnologia', 'dados'],
    arte: {
      chegada: { icone: 'campanha', titulo: 'Campanha', sub: 'Marketing · ativa' },
      mensagem: { rotulo: 'Check-in', canal: 'Semanal', quando: 'hoje', texto: 'Ritmo, qualidade dos contatos e projeção de fechamento revisados com o gestor.' },
      estado: { titulo: 'Meta', sub: 'no ritmo' },
    },
  },
  full: {
    slug: 'full',
    ficha: [
      { rotulo: 'Duração', valor: '90 dias' },
      { rotulo: 'Etapas', valor: 'Onboarding, diagnóstico, implementação e acompanhamento' },
      { rotulo: 'Para clínicas', valor: 'Com operação comercial consolidada' },
      { rotulo: 'Entrega', valor: 'Comercial, pós-venda, agenda e retorno' },
    ],
    icones: ['funil', 'conversa', 'agenda', 'crescimento'],
    arte: {
      chegada: { icone: 'instagram', titulo: 'Novo lead', sub: 'Instagram · agora' },
      mensagem: { rotulo: 'Pós-procedimento', canal: 'WhatsApp', quando: 'agora', texto: 'Como você está se sentindo hoje? Seu retorno está marcado para o dia 12, às 9:00.' },
      estado: { titulo: 'Retorno', sub: 'confirmado' },
    },
  },
};
