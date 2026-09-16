# Inventário de mídia — Home

Todo slot de imagem, vídeo e animação da home, com número, tipo e proporção. O número aparece no
canto da caixa no wireframe, para poder ser citado na conversa ("o slot 03").

> Gerado por `npm run docs:midia` a partir de [`src/data/midia.ts`](../../src/data/midia.ts).
> Editar lá atualiza o wireframe e esta lista juntos.

## Lista de produção

| # | Seção | Tipo | Proporção | O que é | Status |
|---|---|---|---|---|---|
| **01** | Hero | Logos | `5/2` | Logos de clientes | ⏳ pendente |
| **02** | O que fazemos | Vídeo | `9/16` | Vídeo institucional "o que a Renke faz" | ✅ existe |
| **03** | O que fazemos | GIF | `16/10` | Renke CRM em uso | ⏳ pendente |
| **04** | Resultados | Foto | `1/1` | Depoimentos de clientes | ⏳ pendente |
| **05** | Academy + Tools | Imagem | `3/2` | Renke Academy | ⏳ pendente |
| **06** | Academy + Tools | Imagem | `3/2` | Renke Tools | ⏳ pendente |

## Detalhamento

### 01 · Logos de clientes

**Logos** · proporção `5/2` · seção Hero

5 a 6 logos em linha, opacidade reduzida, com leve sobreposição.

> **Produção:** Exigem autorização de uso. Cada um precisa de nome + especialidade para o tooltip.

### 02 · Vídeo institucional "o que a Renke faz"

**Vídeo** · proporção `9/16` · seção O que fazemos

Reel do @renke.studio que explica a categoria RevOps. 1min42.

> **Produção:** Formato reels, 720×1280. Auto-hospedado (H.264, CRF 32, 6,6 MB) e com legenda queimada, então comunica mudo. Toca ao entrar na tela e pausa ao sair.

### 03 · Renke CRM em uso

**GIF** · proporção `16/10` · seção O que fazemos

Tela do CRM com dados entrando, dentro do card "Implementamos um CRM".

> **Produção:** Loop curto, 3–4s. Nome do cliente borrado.

### 04 · Depoimentos de clientes

**Foto** · proporção `1/1` · seção Resultados

2 fotos reais de médicos, com fala, nome, especialidade e cidade.

> **Produção:** Foto real, não stock. Exige autorização de imagem.

### 05 · Renke Academy

**Imagem** · proporção `3/2` · seção Academy + Tools

Imagem que represente a Academy — sala, gravação, ou material do curso.

### 06 · Renke Tools

**Imagem** · proporção `3/2` · seção Academy + Tools

Imagem dos produtos de tecnologia — CRM, Connect, Pulse AI.

## Status

5 de 6 slots ainda sem asset definitivo. É a mesma lista que aparece em
[pendências](../05-analise/pendencias-e-proximos-passos.md), agora com proporção e enquadramento
definidos — para a produção não sair no tamanho errado e precisar ser refeita.

## Convenção no wireframe

- Caixa **tracejada** = imagem parada
- Caixa **sólida, com número escuro** = vídeo, GIF ou animação
- A proporção aparece no canto inferior direito, como cota de desenho técnico
- No modo "ocultar anotações" o número e a cota somem
