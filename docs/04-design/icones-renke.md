# Ícones Renke — V1 (02/10/2026)

Conjunto próprio para substituir a Lucide no site. Pedido da Lenora: "com um
detalhe mais Renke… acabamento diagonal… minimalista, nada muito grotesco…
bem moderno. Faz uma V1 para eu ver."

Prévia: `/laboratorio/icones` (escuro, claro, tamanhos, antes e depois, em
contexto). Dados: `src/data/icones-renke.ts`. Componente:
`src/components/ui/IconeRenke.astro`. Ainda não aplicado no site.

## Linguagem

- Grade de 24, área viva de 3 a 21, traço 1,5. Quinas vivas (miter) e pontas
  retas (butt): nada arredondado no traço.
- Retângulos com **chanfro de 45°** no lugar do raio, o mesmo acabamento das
  peças do Protocolo, do painel do método e dos selos. O **octógono** é forma
  de base (método validado, investimento, encerrado). Círculos seguem
  círculos, para não ficar bruto.
- **Assinatura: o losango** (quadrado a 45°). Marca o ponto que importa em cada
  ícone (o centro da mira, o fim do menu, o dia da agenda, o nó do
  crescimento). Usa `--icone-acento`: amarelo nos pontos escolhidos, ou a cor
  do traço quando o amarelo não cabe (sobre claro, em pílulas).
- No máximo um destaque por ícone. O amarelo é detalhe.

## Inventário (43)

- Interface (13): seta diagonal, seta, seta para baixo, avançar, abrir, menu,
  fechar, mais, confirmado, tocar, pausar, som ligado, sem som.
- Conceitos (10): destaque (estrela do selo), pessoas, método validado,
  crescimento, direção, tecnologia, processo, foco, parceria, camadas.
- Ganhos (3 próprios, além de foco, processo, camadas e direção): conversão,
  investimento, dados.
- Canais e etapas (14): anúncios, Instagram, Google, busca, atendimento,
  conversa, agenda, consulta, redes sociais, indicação, telefone, ficha,
  etiqueta, local, encerrado, base de dados.
- Redes (3, além do Instagram): LinkedIn, Facebook, YouTube.

## Próximo passo (se aprovado)

Trocar `Icone.astro` (Lucide) por `IconeRenke` nos componentes, os caminhos
das ilustrações (PilarConexoes e cenas) e os ícones dos ganhos e do rodapé.
