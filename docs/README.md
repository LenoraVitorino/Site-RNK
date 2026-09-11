# Documentação — Site Institucional Renke

Base de consulta do projeto. Todo o conteúdo aqui vem do briefing original
(`_original/briefing-site-institucional-renke.html`, exportado do ClickUp em 15/08/2026),
reorganizado por tema para consulta rápida durante design e desenvolvimento.

> **Regra de ouro do projeto:** o site precisa fazer o visitante entender em **5 segundos**
> que a Renke **não é agência de marketing**.

## Documento único

[**Estrutura e copy — Site Renke Studio**](dossie-estrutura-e-copy.md) reúne o mapa do site e a
copy das 15 páginas num arquivo só, para enviar a quem não vai navegar pelo repositório.
Gerado por `npm run docs:dossie` a partir dos arquivos abaixo — editar lá e rodar de novo.

## Índice

### 01 · Estratégia
| Documento | O que responde |
|---|---|
| [Posicionamento e tom de voz](01-estrategia/posicionamento-e-tom-de-voz.md) | Frase-eixo, headlines candidatas, régua de tom por público |
| [ICP, dor e diagnóstico](01-estrategia/icp-dor-e-diagnostico.md) | Quem é o cliente, o que ele sente, o que causa a dor |
| [Estrutura do grupo e produtos](01-estrategia/estrutura-do-grupo-e-produtos.md) | Studio / Academy / Tools, Protocolo Revena, produtos digitais |
| [Diferenciais e provas](01-estrategia/diferenciais-e-provas.md) | Por que a Renke e não mais uma agência, números de prova |
| [Glossário e termos proibidos](01-estrategia/glossario-e-termos-proibidos.md) | Tradução CEO → médico, blacklist de vocabulário |
| [Narrativa institucional](01-estrategia/narrativa-institucional.md) | Jogo antigo vs. jogo novo |

### 02 · Arquitetura
| Documento | O que responde |
|---|---|
| [Sitemap](02-arquitetura/sitemap.md) | Estrutura de URLs, navegação, CTAs por página |
| [SEO e keywords](02-arquitetura/seo-e-keywords.md) | Mapa de keywords por página, requisitos técnicos, E-E-A-T |
| [Padrões de página](02-arquitetura/padroes-de-pagina.md) | Regras que toda página precisa seguir |
| [Stack](02-arquitetura/stack.md) | Astro: por quê, como rodar, estrutura de pastas |
| [Preview no túnel](02-arquitetura/preview-no-tunel.md) | Expor o dev server numa URL pública pelo Cloudflare |
| [Publicação](02-arquitetura/publicacao.md) | Deploy na Cloudflare: config, formas de publicar, domínio |

### 03 · Copy (por página)
| Página | Rota | Arquivo |
|---|---|---|
| Home | `/` | [home.md](03-copy/home.md) |
| Revena Start | `/revena-start` | [revena-start.md](03-copy/revena-start.md) |
| Revena Full | `/revena-full` | [revena-full.md](03-copy/revena-full.md) |
| Revena Core | `/revena-core` | [revena-core.md](03-copy/revena-core.md) |
| Revena Scale | `/revena-scale` | [revena-scale.md](03-copy/revena-scale.md) |
| Revena Run | `/revena-run` | [revena-run.md](03-copy/revena-run.md) |
| Treinamento p/ Secretárias | `/treine-sua-equipe` | [treinamento-secretarias.md](03-copy/treinamento-secretarias.md) ⚠️ decisão pendente |
| Renke Academy | `/academy` | [academy.md](03-copy/academy.md) |
| Protocolo Renke | `/academy/protocolo-renke` | [protocolo-renke.md](03-copy/protocolo-renke.md) |
| Formação Performa | `/academy/formacao-performa` | [formacao-performa.md](03-copy/formacao-performa.md) |
| Treinamento de CRM | `/academy/treinamento-crm` | [treinamento-crm.md](03-copy/treinamento-crm.md) |
| Rastreamento Avançado | `/academy/rastreamento-avancado` | [rastreamento-avancado.md](03-copy/rastreamento-avancado.md) |
| Cultura Pro | `/academy/cultura-pro` | [cultura-pro.md](03-copy/cultura-pro.md) |
| Contato | `/contato` | [contato.md](03-copy/contato.md) |
| Faça Parte | `/faca-parte` | [faca-parte.md](03-copy/faca-parte.md) |

### 04 · Design
| Documento | O que responde |
|---|---|
| [Notas para o designer — Home](04-design/notas-designer-home.md) | Direcionamento visual seção a seção |
| [Diretrizes visuais gerais](04-design/diretrizes-visuais.md) | Paleta, tipografia, ritmo de scroll, imagens |
| [Direção visual](04-design/direcao-visual.md) | Análise das referências e o que foi aplicado |
| [Direção visual v2](04-design/direcao-visual-v2.html) | Proposta de 11/09: base clara, grafite, amarelo suave no tom da marca, Instrument Sans, caixa alta nos títulos — aguardando aprovação |
| [Design system](04-design/design-system.md) | Guia inicial: tokens, botões, hierarquia de CTA |
| [Paleta de marca](04-design/paleta-de-marca.md) | Cores oficiais extraídas do site atual e a regra de contraste do amarelo |
| [Inventário de mídia](04-design/inventario-de-midia.md) | Os 7 slots de imagem, vídeo e animação da home |

### 05 · Análise
| Documento | O que responde |
|---|---|
| [Análise do briefing](05-analise/analise-do-briefing.md) | Inconsistências, lacunas e riscos encontrados |
| [Pendências e próximos passos](05-analise/pendencias-e-proximos-passos.md) | O que falta decidir e produzir antes de codar |

### Assets
- `assets/briefing/time-renke.png` — foto do time (⚠️ marcada como desatualizada no briefing)
- `assets/briefing/sede-renke.png` — foto da sede (⚠️ endereço mudou)
- `assets/briefing/ceo-renke.png` — foto do CEO

### Original
- `_original/briefing-site-institucional-renke.html` — export bruto do ClickUp (fonte da verdade)
- `_original/briefing-texto-extraido.txt` — texto plano extraído, para busca rápida (`grep`)

## Convenções desta documentação

- **Copy final** aparece em blocos de citação ou listas, transcrita literalmente do briefing.
- **Diretrizes** (não são copy final) aparecem marcadas como tal.
- ⚠️ marca pendência, placeholder ou decisão em aberto.
- Comentários internos do time (ex.: discussões entre CEO e Eduarda) foram preservados como
  notas, porque afetam decisões de escopo.
