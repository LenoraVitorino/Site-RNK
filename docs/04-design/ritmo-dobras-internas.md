# Ritmo de dobras sólidas nas páginas internas — especificação (28/09/2026)

Pedido da Lenora em 28/09: mais dobras sólidas (papel e preto) nas internas, alternando com a cena, que fica na abertura, no fecho e em no máximo um respiro no meio.

**Arquivos da análise:** `/private/tmp/claude-501/-Users-lenoravitorino-Renke/9b8cb60c-c4b6-4004-a052-a8c61b28e8fa/scratchpad/sobre/tons/`
- `regra-tons.ts`
- `rodar.ts`
- `resultado-tons.txt`
- `prototipo.css`
- `prototipo.cjs`
- `full-*-p.jpg`

**Símbolos usados:** ◌ = cena, □ = papel, ■ = preto.

---

## (a) `src/components/pagina/contexto.ts`

### Tipos

```ts
/** Tom da seção: 'cena' é transparente (leva data-cena); 'papel' e 'preto' são dobras sólidas. */
export type Tom = 'cena' | 'papel' | 'preto';

export interface ContextoSecao {
  // ...campos atuais...
  cena?: Cena;   // só quando tom === 'cena'; nas dobras sólidas fica undefined
  tom: Tom;      // NOVO
}
```

### `classesSecao`

Acrescenta a classe do tom só nas dobras sólidas:

```ts
export const classesSecao = (secao: ContextoSecao, ...extras) =>
  ['secao', 'int-secao', secao.junta && 'int-secao--junta', secao.colaAbaixo && 'int-secao--cola-abaixo',
   secao.tom !== 'cena' && `int-secao--${secao.tom}`, ...extras];
```

### Removidos

- `ehPapel`
- `ultimaTransparente`
- a condição `!ehPapel(anterior)` em `junta`

### Helpers novos (privados)

```ts
type Real = Exclude<Bloco, { tipo: 'pendencia' }>;
const ehFecho = (b: Real) => b.tipo === 'ctaFinal' || b.tipo === 'formulario';
const assinatura = (b: Real, c: ContextoSecao) =>
  b.tipo === 'texto' ? `texto:${formaTexto(b)}`
  : b.tipo === 'antesDepois' ? `antesDepois:${formaAntesDepois(b)}`
  : b.tipo === 'blocos' ? `blocos:${c.variante ?? 'cartoes'}`
  : b.tipo === 'numeros' ? `numeros:${b.grade ? 'grade' : 'regua'}`
  : b.tipo;
/** Herda o tom da anterior: cola nela (junta) ou é a régua sem h2 sob a abertura do Contato (fusão). */
const herdaTom = (reais: Real[], ctx: ContextoSecao[], i: number) => {
  const b = reais[i];
  return i > 0 && (ctx[i].junta || (b.tipo === 'numeros' && !b.h2 && !!ctx[i - 1].abertura));
};
```

### `planejarTons`

```ts
function planejarTons(reais: Real[], ctx: ContextoSecao[]): Tom[] {
  const n = reais.length;
  const tons: (Tom | undefined)[] = new Array(n).fill(undefined);
  const herda = (i: number) => herdaTom(reais, ctx, i);

  // 1) Âncoras na cena: a primeira; ctaFinal/formulário em qualquer posição;
  //    um único respiro (a primeira citação estritamente no meio).
  if (n) tons[0] = 'cena';
  reais.forEach((b, i) => { if (ehFecho(b)) tons[i] = 'cena'; });
  const respiro = reais.findIndex((b, i) => i > 0 && i < n - 1 && b.tipo === 'texto' && formaTexto(b) === 'citacao');
  if (respiro > 0) tons[respiro] = 'cena';

  // 2) Trechos livres entre âncoras. As herdeiras não entram nem quebram o trecho.
  const trechos: number[][] = []; let atual: number[] = [];
  for (let i = 0; i < n; i++) {
    if (tons[i] === 'cena') { if (atual.length) trechos.push(atual); atual = []; }
    else if (!herda(i)) atual.push(i);
  }
  if (atual.length) trechos.push(atual);

  // Dobra do formulário = o formulário e as herdeiras dele.
  const dobraForm = new Set<number>();
  reais.forEach((b, i) => { if (b.tipo !== 'formulario') return; dobraForm.add(i); for (let j = i + 1; j < n && herda(j); j++) dobraForm.add(j); });
  const proxima = (i: number) => { let j = i + 1; while (j < n && herda(j)) j++; return j; };

  // 3) Pesos.
  const peso = (i: number, t: Tom) => {
    const b = reais[i]; let p = 0;
    if (t === 'papel' && b.tipo === 'etapas') p += 2;
    if (t === 'papel' && b.tipo === 'antesDepois' && formaAntesDepois(b) === 'lista') p += 2;
    if (t === 'preto' && (b.tipo === 'produtos' || (b.tipo === 'antesDepois' && formaAntesDepois(b) === 'prosa'))) p += 3;
    if (t === 'papel' && (dobraForm.has(i - 1) || dobraForm.has(proxima(i)))) p -= 5;
    for (let j = 0; j < i; j++) if (tons[j] === t && assinatura(reais[j], ctx[j]) === assinatura(b, ctx[i])) { p -= 1; break; }
    return p;
  };

  // 4) Cada trecho alterna. Das duas partidas vence a de maior soma; empate começa em papel.
  for (const c of trechos) {
    const partida = (ini: Tom): Tom[] => c.map((_, k) => (k % 2 === 0 ? ini : ini === 'papel' ? 'preto' : 'papel'));
    const soma = (t: Tom[]) => c.reduce((a, i, k) => a + peso(i, t[k]), 0);
    const pa = partida('papel'), pr = partida('preto');
    (soma(pr) > soma(pa) ? pr : pa).forEach((t, k) => (tons[c[k]] = t));
  }

  // 5) Herdeiras.
  for (let i = 0; i < n; i++) if (!tons[i]) tons[i] = tons[i - 1] ?? 'cena';
  return tons as Tom[];
}
```

A repetição (−1) só compara com trechos já decididos mais acima na página. Isso reproduz a verificação de `resultado-tons.txt`.

### `planejarSecoes`, na ordem

1. **Fusão do Contato:** igual à de hoje.
2. **Contextos:** cada um nasce com `tom: 'cena'` e `cena: undefined`. `junta` vira:
   ```ts
   const junta = !!anterior && anterior.tipo !== 'hero' && anterior.tipo !== 'formulario'
     && (ehSolto(b) || (b.tipo === 'numeros' && !b.h2));
   ```
3. **`colaAbaixo` e variante `'tipografica'`:** sem mudança.
   - A variante é calculada **antes** do tom e não depende dele. Dois grids de cartões seguidos continuam repetitivos mesmo em tons diferentes.
   - Ela entra na assinatura como `blocos:tipografica`.
4. **Tons:**
   ```ts
   const tons = planejarTons(reais, contextos);
   contextos.forEach((c, i) => {
     c.tom = tons[i];
     if (c.tom !== 'cena') return;
     c.cena = i === 0 ? 'hero'
       : herdaTom(reais, contextos, i) ? contextos[i - 1].cena
       : ehFecho(reais[i]) ? 'formulario'
       : 'pilares';                       // o respiro
   });
   ```

### Comentários do cabeçalho de `planejarSecoes`

- **(d):** passa a dizer que a cena vai só nas seções em tom `cena`: `hero` na primeira, `pilares` no respiro, `formulario` no fecho, e a herdeira repete o quadro da anterior.
- **(e):** some "nem a dobra papel".
- **(h) novo:** descreve o tom.

### `Blocos2.astro`

Aviso só em dev:

```ts
if (import.meta.env.DEV) for (const { bloco, secao } of plano)
  if (secao && ['hero', 'ctaFinal', 'formulario'].includes(bloco.tipo) && secao.tom !== 'cena')
    console.warn(`[Blocos2] ${bloco.tipo} em ${secao.id} saiu da cena (tom ${secao.tom}).`);
```

### `antesDepois` em lista

- Deixa de impor papel.
- Hoje tem +2 para papel.
- Na Start cai em preto (novo mosaico escuro); na Full, em papel.

---

## (b) Sequência por página

Entre colchetes está o quadro da cena. As outras seções são sólidas e não têm `data-cena`.

| Página | Tons | Seções |
|---|---|---|
| /academy | ◌■■□■□■◌ | hero ◌[hero] · antesDepois prosa ■ · texto solto (junta) ■ · lista □ · blocos cartões ■ · editorial □ · produtos ■ · ctaFinal ◌[formulario] |
| /contato | ◌◌■□ | formulário abertura ◌[hero] · régua sem h2 (herda) ◌[hero] · faq ■ · texto ficha □ |
| /academy/cultura-pro | ◌□■□■■□◌ | hero · lista □ · blocos ■ · blocos tipográfica □ · antesDepois prosa ■ · régua (junta) ■ · editorial □ · ctaFinal ◌[formulario] |
| /faca-parte | ◌□■□■◌ | hero · editorial □ · editorial ■ · blocos cartões □ · editorial ■ · formulário ◌[formulario] |
| /academy/formacao-performa | ◌□■◌□◌ | hero · lista □ · blocos ■ · citação ◌[pilares] · editorial □ · ctaFinal ◌[formulario] |
| /academy/protocolo-renke | ◌□■□◌ | hero · lista □ · blocos ■ · editorial □ · ctaFinal ◌ |
| /academy/rastreamento-avancado | ◌□■□■□◌ | hero · lista □ · blocos ■ · tipográfica □ · antesDepois prosa ■ · editorial □ · ctaFinal ◌ |
| /studio/revena-core | ◌□■□■■◌ | hero · lista □ · blocos ■ · etapas □ · tipográfica ■ · solto (junta) ■ · ctaFinal ◌ |
| /studio/revena-full | ◌□■□■□◌ | hero · lista □ · blocos ■ · etapas □ · números grade ■ · antesDepois lista □ · ctaFinal ◌ |
| /studio/revena-run | ◌□■◌■■◌ | hero · lista □ · blocos ■ · citação ◌[pilares] · lista ■ · solto (junta) ■ · ctaFinal ◌ |
| /studio/revena-scale | ◌□■◌□■◌ | hero · lista □ · blocos ■ · citação ◌[pilares] · etapas □ · lista ■ · ctaFinal ◌ |
| /studio/revena-start | ◌□■□■◌ | hero · lista □ · blocos ■ · etapas □ · antesDepois lista ■ · ctaFinal ◌ |
| /academy/treinamento-crm | ◌□■□□■◌ | hero · lista □ · blocos ■ · tipográfica □ · régua (junta) □ · editorial ■ · ctaFinal ◌ |
| /404 | ◌ | sem mudança (`int-erro`, `data-cena="hero"`, sem classe de tom) |

**Roteiro da cena por página:**
- Performa, Run e Scale: hero → pilares → formulario.
- Contato: só hero.
- As outras nove: hero → formulario. Os dois usam o mesmo quadro `amostra(0)`.

---

## (c) CSS global em `src/styles/paginas2.css`

### 1. Tokens novos no `:root` existente

São os valores da cena, que é o padrão.

```css
  --int-tinta: var(--papel); --int-cinza: var(--cinza); --int-valor: rgb(242 242 238 / .88);
  --int-marca: rgb(242 242 238 / .4); --int-check: rgb(242 242 238 / .5);
  --int-linha: #0e0e0e; --int-faq: rgb(242 242 238 / .06); --int-foco: var(--papel);
  --int-pilula: rgb(242 242 238 / .1); --int-raio-interno: 12px;
  --int-antes: #070707; --int-antes-texto: #8f8f8b; --int-depois: #141413; --int-depois-texto: #d0d0cc;
  --int-ficha: var(--int-papel-ficha); --int-ficha-texto: var(--int-papel-texto);
```

### 2. Bloco "Ritmo"

Substitui as linhas 37–39 atuais e o comentário "Nenhuma seção tem fundo próprio…".

```css
/* Tons (28/09/2026): planejarTons() em contexto.ts. Cena = transparente;
   preto e papel são dobras sólidas que redefinem os tokens. Regra: dentro
   de papel só há superfícies claras; dentro de preto, só escuras (o
   cabeçalho camaleão lê o fundo sob ele). */
.int-secao--preto {
  background: var(--fundo); color: var(--papel);
  --int-cartao: var(--grafite); --int-linha: var(--grafite); --int-faq: var(--grafite);
  --int-raio-interno: var(--int-cartao-raio);
  --int-antes: #0e0e0e; --int-depois: var(--grafite);
  --int-ficha: var(--grafite); --int-ficha-texto: var(--papel);
}
.int-secao--papel {
  background: var(--int-papel); color: var(--int-papel-texto);
  --int-tinta: #252523; --int-cinza: #5f5f5d; --int-valor: #252523;
  --int-corpo: #50504e; --int-apoio: #50504e; --int-cartao-texto: #50504e;
  --int-mudo: #5f5f5d; --int-indice: #5f5f5d;
  --int-marca: rgb(37 37 35 / .55); --int-check: rgb(37 37 35 / .6);
  --int-cartao: #efefed; --int-linha: #f4f4f2; --int-faq: #efefed;
  --int-foco: #262624; --int-pilula: #262624;
  --int-raio-interno: var(--int-cartao-raio);
  --int-antes: #efefed; --int-antes-texto: #626260; --int-depois: #f4f4f2; --int-depois-texto: #252523;
  --int-ficha: #efefed; --int-ficha-texto: #252523;
}
.int-secao--papel .rotulo { color: var(--int-papel-rotulo); }
.int-secao--papel :focus-visible { outline-color: var(--int-foco); }
/* A caixa preta do Ecossistema vira a própria dobra. */
:is(.int-secao--papel, .int-secao--preto) .int-caixa { background: none; padding: 0; border-radius: 0; }
```

### 3. Regras globais que passam a usar token

- `.int-rico strong` → `color: var(--int-tinta)`
- `.int-manifesto > p:not(...)` → `color: var(--int-cinza)`
- `.int-manifesto strong` → `color: var(--int-tinta)`
- `.int-citacao` → `color: var(--int-tinta)`
- `.int-destaque` → `color: var(--int-tinta)`
- `.int-ficha` → `background: var(--int-ficha); color: var(--int-ficha-texto);` (raio 10 e padding continuam iguais)

### 4. Remoções

- As 2 linhas `.int-cabeca--claro` (l. 64–65).
- `--int-painel` e `.int-painel` estão sem uso, mas **ficam**: estão fora do escopo.

### Contrastes conferidos

**Papel**

| Texto | Fundo | Contraste |
|---|---|---|
| `#252523` | `#e7e7e5` / `#efefed` / `#f4f4f2` | 12,4 / 13,3 / 13,9 |
| `#50504e` | `#e7e7e5` / `#efefed` / `#f4f4f2` | 6,5 / 7,0 / 7,3 |
| `#5f5f5d` | `#e7e7e5` / `#efefed` | 5,2 / 5,6 |
| `#626260` | `#efefed` | 5,3 |

**Preto**

| Texto | Fundo | Contraste |
|---|---|---|
| papel | `#161616` | 16,1 |
| `#b6b6b6` | `#161616` | 8,9 |
| `#A3A39B` | `#161616` | 7,1 |
| `#8f8f8b` | `#0e0e0e` | 6,0 |
| `#d0d0cc` | `#161616` | 11,7 |
| índice a 45% | `#161616` | 4,15 |

---

## (d) Mudanças por componente

Vale para todos os `Bloco*.astro` (Hero, Lista, Produtos, Blocos, Etapas, AntesDepois, Texto, Numeros, Faq, Formulario, CtaFinal): acrescentar `data-tom={secao.tom}` na `<section>` raiz. Os seletores abaixo são os do `<style>` scoped de cada arquivo.

**CabecaSecao.astro**
- Sai a prop `tom` (interface, desestruturação e `tom === 'claro' && 'int-cabeca--claro'`).
- Atualizar o comentário.

**BlocoLista.astro**
- `.int-lista__texto`: `color: var(--papel)` → `var(--int-tinta)`
- `.int-lista__ponto`: `background: rgb(242 242 238 / .4)` → `var(--int-marca)`

**BlocoBlocos.astro**
- `.int-blocos__itens :global(.int-blocos__check)`: `color` → `var(--int-check)`
- O cartão já usa `--int-cartao` e o texto `--int-cartao-texto` / `--int-corpo`. O h3 e o índice herdam. Nada mais muda.
- **Papel:** fichas `#efefed`, h3 `#252523`, texto `#50504e`.
- **Preto:** cartões `#161616`, texto `#b6b6b6`.

**BlocoEtapas.astro**
- `.int-etapa`: acrescentar `background: var(--int-linha);`
  - Na cena fica `#0e0e0e`, como hoje; em preto, `#161616`; em papel, `#f4f4f2`.
  - O seletor scoped vence `.int-cartao`.
- `.int-etapa__n` e `.int-etapa__nome`: `color: var(--papel)` → `var(--int-tinta)`
- A duração (`.rotulo`) e a descrição/fechamento (`--int-corpo`) já seguem o tom.
- No comentário, trocar "#0e0e0e" por "a linha do tom (--int-linha)".

**BlocoTexto.astro**
- `.int-citacao--manifesto`: `color` → `var(--int-tinta)`
- `.int-citacao--manifesto :global(.int-citacao__pilula)`: `background` → `var(--int-pilula)`. O ponto `#FFD103` fica e dá 10,4:1 sobre `#262624`.
- `.int-dados dd`: `color` → `var(--int-valor)`
- Os links (`.int-rico a` e `dd a`) herdam a cor. Nada mais muda.

**BlocoNumeros.astro**
- `.int-regua__valor` e `.int-numeros__palavra`: `color` → `var(--int-tinta)`
- A legenda (`--int-mudo`) e as notas (`--int-apoio` e `.int-citacao` global) já seguem o tom.

**BlocoFaq.astro**
- `.int-faq__item`: `background` → `var(--int-faq)`
- `.int-faq__item:has(.int-faq__resumo:focus-visible)`: `outline: 2px solid var(--int-foco)`
- `.int-faq__pergunta` e `.int-faq__icone`: `color` → `var(--int-tinta)`
- **Sem hover novo:** a E2 é estática e a Lenora não pediu isso.

**BlocoProdutos.astro**
- `.int-produto`: `border-radius: 12px` → `var(--int-raio-interno)` (18 com a caixa dissolvida).
- Atualizar o comentário do raio.
- Os cartões (`--int-cartao`) e o texto já seguem o tom; o nome e o link herdam.

**BlocoAntesDepois.astro**
- `const papel = forma === 'lista'` → `const lista = forma === 'lista'`.
- Tirar `papel && 'int-secao--papel'` de `classesSecao`.
- Tirar `tom="claro"` da CabecaSecao.
- `.int-lado`: `border-radius: var(--int-raio-interno)`
- `.int-lado--antes`: `background: var(--int-antes); color: var(--int-antes-texto);`
- `.int-lado--depois`: `background: var(--int-depois); color: var(--int-depois-texto);`
- `.int-lado--depois .int-lado__titulo`: `color: var(--int-tinta)`
- `.int-ficha__texto`: `color: var(--int-papel-texto)` → `var(--int-ficha-texto)`
- `.int-antes-depois__topo :global(.int-cabeca__titulo)`: acrescentar `max-width: 24ch;`, que vinha do `--claro`.
- **Mosaico em preto (Start):**
  - fichas `#161616` com raio 10;
  - operação 14px/450 em papel (herda da ficha);
  - resultado papel, peso 300;
  - índice com opacidade .6;
  - legenda `.rotulo` e seta `#A3A39B` (padrão global).
- **Comentário:** tirar "É a única dobra clara da página" e "sem cena".

**BlocoHero, BlocoCtaFinal e BlocoFormulario:** só o `data-tom`. A regra garante que eles ficam sempre na cena.

---

## (e) Índice, fundo e máscara

### `IndicePagina.astro`

- **Na montagem do `destino`:** a condição vira só `if (i === 0) { destino.set(s, null); return; }`. Some a checagem `int-secao--papel`. O índice passa a sumir só sobre a primeira dobra e o rodapé.
- **Terceiro observador**, na linha do centro vertical do `nav`, dentro de `montar()`:
  ```ts
  const sobCentro = new Set<HTMLElement>();          // declarado fora; limpar no início de montar()
  const aplicarTom = () => nav.classList.toggle('int-indice-pagina--claro',
    [...sobCentro].some((el) => el.dataset.tom === 'papel'));
  // em montar(), depois de r:
  const c = Math.round(r.top + r.height / 2);
  const centro = new IntersectionObserver((es) => {
    for (const e of es) e.isIntersecting ? sobCentro.add(e.target as HTMLElement) : sobCentro.delete(e.target as HTMLElement);
    aplicarTom();
  }, { rootMargin: `${-c}px 0px ${-(innerHeight - c - 1)}px 0px` });
  destino.forEach((_, el) => centro.observe(el));
  observadores = [linha, faixa, centro];
  ```
  Quando `!medida.matches`, remover `int-indice-pagina--claro`.
- **CSS scoped:**
  ```css
  .int-indice-pagina__fio { transition: transform .5s var(--easing-suave), background-color .5s var(--easing-suave); }
  .int-indice-pagina--claro a { color: #5f5f5d; }
  .int-indice-pagina--claro a:hover,
  .int-indice-pagina--claro a[aria-current='true'] { color: #252523; }
  .int-indice-pagina--claro .int-indice-pagina__fio { background: #252523; }
  ```
  O seletor com a classe `--claro` precisa repetir o `aria-current`: sem isso, o scoped `--claro a` vence o `a[aria-current]`.
- **Comentário do topo:** "Some sobre a primeira dobra e o rodapé; sobre papel, os números invertem para grafite."

### `fundo-internas.ts`

- `TEXTOS_INTERNAS = [ ...os mesmos 16 seletores... ].map((s) => \`main > [data-cena] ${s}\`).join(', ');`
- O comentário do topo troca "A dobra papel não tem cena" por "As seções sólidas (papel e preto) não têm cena".
- O comentário de `TEXTOS` acrescenta: "Só texto sobre a cena: o limite é de 16 retângulos."

### Sem mudança

- `FundoInterno.astro`
- `fundo-cena.ts`: `transparentes: 'main > [data-cena]'` continua. O laço do WebGL dorme quando só há dobras sólidas na tela.
- `Header.astro`: o `tomAbaixo()` já resolve. Preto (lum 0) e cena deixam o cabeçalho escuro; papel (lum ≈231) deixa claro.

### Documentação (`docs/04-design/paginas-internas.md`)

- l. 690: "Nunca duas dobras papel…" vira "Nunca duas dobras sólidas do mesmo tom seguidas, salvo seção que cola (junta)".
- l. 1058–1060: legenda com [papel] e [preto]; a frase das "duas superfícies claras" vira "papel nunca encosta no cartão claro do formulário".
- l. 1127–1128: "RITMO" passa a descrever a alternância (cena → papel/preto alternados → respiro na cena → fecho na cena) e a regra `planejarTons`.
- Na seção "Fundação", acrescentar a subseção "Tons (28/09/2026)" com a tabela de tokens do item (c).

### Decisão para levar à Lenora

O hero tem 86svh. Com isso, cerca de 126px de papel aparecem no pé da primeira tela a 1440×900, em 11 das 13 páginas.

Minha recomendação é **manter**: a faixa anuncia o ritmo das dobras. A alternativa é subir o hero para 100svh.

---

## (f) Checklist de verificação

1. `npx astro check` e `npm run build` sem erro. Nenhum `console.warn` do Blocos2 em dev.
2. **Script Playwright** (`channel: "chrome"`, `setDefaultTimeout(20000)`, `exit(2)` em 240s), rodando nas 13 rotas e na /404 em 127.0.0.1:4350. Para cada `main > section` ele lê `dataset.tom`, `dataset.cena`, `classList` e `getComputedStyle().backgroundColor`, e confere:
   - A sequência de tons bate com a tabela (b).
   - O fundo é `rgb(0,0,0)` no preto, `rgb(231,231,229)` no papel e transparente na cena.
   - Não há duas seções sólidas de mesmo tom vizinhas quando a segunda não tem `int-secao--junta` e não é a régua do Contato.
   - `data-cena` aparece só com `tom === 'cena'`.
   - Há no máximo um `pilares` por página.
   - A /404 está idêntica à de hoje.
3. **Cabeçalho:** rolar até o centro de cada dobra sólida e ler a classe do `header`. Esperado `header--claro` no papel e `header--escuro` no preto e na cena.
4. **Superfícies:** dentro de `.int-secao--papel` nenhum fundo de filho tem luminância < 110; dentro de `.int-secao--preto`, nenhum > 110. Checar via `getComputedStyle` dos descendentes com fundo não transparente.
5. **`.int-caixa` dissolvida:** padding 0 e fundo `none` em todo produto e em toda prosa. Os cartões internos ficam com raio 18.
6. **Índice lateral** a 1440×900 na Revena Full e na Scale:
   - oculto sobre o hero e o rodapé;
   - visível sobre as dobras sólidas;
   - com `int-indice-pagina--claro` sobre as etapas e o mosaico em papel;
   - número `#5f5f5d` e atual `#252523`.
7. **Máscara:** em cada página, `document.querySelectorAll(TEXTOS_INTERNAS)` só devolve elementos dentro de `[data-cena]`. Na /404 devolve pelo menos 1.
8. **Contraste:** amostrar texto × fundo em papel e em preto em cada tipo de bloco. Mínimo 4,5:1 para texto e 3:1 para o ícone do FAQ.
9. **Foco:** Tab pelo FAQ do Contato (preto) com contorno papel; pelos links da ficha (papel) com contorno `#262624`.
10. **Celular a 375px:** sem rolagem horizontal. As dobras sólidas vão de borda a borda e o mosaico preto da Start fica em uma coluna.
11. **Movimento reduzido:** o fundo estático aparece nas seções da cena e as sólidas ficam iguais.
12. **A home fica intacta:** `paginas2.css` não é importado por `index.astro`. Comparar a captura da home antes e depois.
13. **Capturas** (reduzidas a no máximo 1200px, no máximo 10 abertas): Academy, Contato, Revena Start, Revena Full e Treinamento CRM a 1440×900, na primeira tela e no meio da página.