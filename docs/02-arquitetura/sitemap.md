# Sitemap e arquitetura de navegação

## Estrutura completa (conforme briefing)

```
renke.com.br/
│
├── Home (protagonista: Studio fala com clínicas)
│   ├── Headline + posicionamento ("Não somos agência...")
│   ├── Dor + diagnóstico (escada emocional)
│   ├── Visual jornada (agência para no lead, Renke vai até o retorno)
│   ├── Prova social (números, logos, depoimentos)
│   ├── Escada de maturidade (menção aos protocolos sem cardápio)
│   ├── Seção "Por que a Renke e não mais uma agência?"
│   ├── Metáfora do corpo (veias/coração)
│   ├── Academy (teaser pra agências)
│   ├── Tools (teaser "em breve")
│   └── CTA → Fale com a gente
│
├── /studio (Pra Clínicas)
│   ├── Visão geral do Studio
│   ├── /studio/revena-start
│   ├── /studio/revena-full
│   ├── /studio/revena-run
│   ├── /studio/revena-core
│   ├── /studio/revena-scale
│   ├── /studio/treine-sua-equipe (Agendamento 10x)
│   ├── /studio/site-institucional
│   └── /studio/identidade-visual
│
├── /academy (Pra Agências)
│   ├── Visão geral da Academy
│   ├── /academy/protocolo-renke (flagship)
│   ├── /academy/formacao-performa
│   ├── /academy/treinamento-crm
│   ├── /academy/rastreamento-avancado
│   ├── /academy/cultura-pro
│   ├── /academy/clickup-on-track
│   └── /academy/crm-sheets
│
├── /tools (Em breve)
│   ├── Renke CRM (teaser + waitlist)
│   ├── Renke Connect (já ativo, pode ter mais conteúdo)
│   └── Renke Pulse AI (teaser se houver algo concreto)
│
├── /sobre
│   ├── Quem somos (história, tese, time)
│   ├── Narrativa "jogo antigo vs. jogo novo"
│   ├── Números e certificações (GPTW, 140+ clínicas, R$42M)
│   └── Cultura e valores
│
├── /cases
│   ├── Cases com números reais (antes/depois)
│   └── Filtro por especialidade ou produto
│
├── /blog
│   ├── Categoria: RevOps pra clínicas (educar mercado)
│   ├── Categoria: Marketing médico/odontológico
│   ├── Categoria: Gestão de agências (atrai público Academy)
│   └── Categoria: Tecnologia e dados
│
├── /contato
│   ├── Formulário simples (nome + WhatsApp + tipo de negócio)
│   └── WhatsApp direto
│
├── /carreiras (Faça parte)
│   └── Vagas abertas + cultura
│
└── Rodapé
    ├── Links principais
    ├── Redes sociais
    ├── Certificações
    └── Dados institucionais
```

## ⚠️ Conflito de rotas a resolver

O sitemap estratégico usa `/studio/revena-start`. As páginas de copy final declaram
`/revena-start` (sem prefixo). O mesmo vale para `/treine-sua-equipe` (copy) vs.
`/studio/treine-sua-equipe` (sitemap) e `/carreiras` (sitemap) vs. `/faca-parte` (copy).

**Recomendação:** adotar o padrão hierárquico do sitemap (`/studio/revena-start`), que é o que o
próprio briefing pede em "URLs limpas e hierárquicas (/studio/revena-start)" na seção de SEO
técnico, e configurar redirects 301 das versões curtas.
Decisão precisa ser confirmada — ver [pendências](../05-analise/pendencias-e-proximos-passos.md).

## Notas sobre a arquitetura

1. **Home como filtro de público**
   O primeiro scroll fala com clínicas (90% do tráfego esperado). Academy e Tools aparecem como
   seções menores na home, com links pras respectivas páginas.

2. **Cada página de produto é independente**
   Funciona sozinha, sem o visitante precisar ter lido outra antes. Responde: o que é, pra quem é,
   o que resolve, o que recebo, por que confiar.

3. **Blog como motor de SEO**
   Alimenta tráfego orgânico de longo prazo. Foco em termos de baixa concorrência que educam o
   mercado sobre RevOps e gestão de clínicas.

4. **/cases como prova social dedicada**
   Não esconder cases dentro de outras páginas. Uma seção dedicada com resultados reais ranqueia
   pra termos como "resultado marketing clínica" e reforça E-E-A-T.

## Navegação principal (menu)

```
Pra Clínicas (Studio) | Pra Agências (Academy) | Tools | Sobre | Cases | Blog | Contato
```

### Menu conforme a copy da home (versão com mega-menu)

O bloco de navegação transcrito na copy da home tem rótulos ligeiramente diferentes:

| Item de menu | Submenu |
|---|---|
| **Home** | — |
| **Para Clínicas** | Protocolo Revena Start · Protocolo Revena Full · Protocolo Revena Core · Protocolo Revena Scale · Protocolo Revena Run · Treinamento para secretárias |
| **Para Agências** | Renke Academy · Protocolo Renke · Formação Performa · Treinamento CRM · Rastreamento Avançado · Cultura Pro |
| **Outras Soluções** | Site Institucional · Identidade Visual |
| **Tecnologia** | Renke Connect *(em breve)* · Renke CRM *(em breve)* |
| **Conteúdos** | — |
| **Contato** | — |
| **Faça Parte** | — |

> ⚠️ Divergências entre os dois menus: "Cases", "Sobre" e "Blog" não aparecem no menu da copy
> ("Conteúdos" provavelmente cobre o Blog). "Renke Connect" está marcado como "em breve" no menu,
> mas a estratégia diz que ele **já está ativo**. Resolver antes de implementar o header.

## CTAs por página

| Página | CTA |
|---|---|
| Home | "Fale com a gente" / "Descubra se faz sentido para sua clínica" |
| Studio / Produtos | "Agendar diagnóstico" ou "Conversar com a equipe" |
| Academy | "Conhecer o produto" (link pra LP de venda) |
| Cases | "Quero resultado assim" (CTA pra contato) |
| Blog | "Quer isso pra sua clínica?" (CTA contextual no final dos posts) |

## Rodapé

Fundo escuro, 4 colunas:

| Coluna 1 | Coluna 2 — Links | Coluna 3 — Siga-nos | Coluna 4 — Contato |
|---|---|---|---|
| [Logo] <br> "Não é marketing. É RevOps." | Home <br> Para Clínicas <br> Para Agências <br> Tecnologia <br> Conteúdos <br> Faça Parte | Instagram <br> LinkedIn <br> YouTube | [Endereço] <br> [Telefone] <br> [Email] |

Linha final:
`© 2026 Renke Studio. Todos os direitos reservados.`
`Você não controla o que não enxerga.`
