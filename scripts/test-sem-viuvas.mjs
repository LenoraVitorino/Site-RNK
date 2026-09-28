// Testes do transformador que evita palavras sozinhas (src/lib/sem-viuvas.mjs).
// Uso: node scripts/test-sem-viuvas.mjs
import assert from 'node:assert/strict';
import { semViuvas, tokenizar } from '../src/lib/sem-viuvas.mjs';

let n = 0;
const caso = (nome, entrada, esperado) => {
  const saida = semViuvas(entrada);
  assert.equal(saida, esperado, nome);
  assert.equal(semViuvas(saida), saida, `${nome} (idempotente)`);
  n++;
};
const igual = (nome, html) => caso(nome, html, html);

// Tokenizador: a soma dos pedaços devolve o HTML original.
{
  const html = '<!doctype html><p class="a" data-x=\'1>2\'>Oi <b>x</b></p><!-- c --><script>if (a<b) x()</script>';
  assert.equal(tokenizar(html).map((t) => t.bruto).join(''), html);
  n++;
}

// Parágrafo comum: o espaço antes da última palavra vira &nbsp;.
caso('parágrafo', '<p>Uma operação integrada de CRM, marketing e vendas.</p>', '<p>Uma operação integrada de CRM, marketing e&nbsp;vendas.</p>');
// Rodapé real (24 caracteres de limite: "direitos" + "reservados." = 19).
caso('copyright', '<p>© 2026 Renke Studio. Todos os direitos reservados.</p>', '<p>© 2026 Renke Studio. Todos os direitos&nbsp;reservados.</p>');
// Dupla longa demais (25): fica como está. 23 e 24 já se juntam (casos reais da home).
caso('dupla de 23', '<p>Sua operação comercial, acompanhada e otimizada continuamente.</p>', '<p>Sua operação comercial, acompanhada e otimizada&nbsp;continuamente.</p>');
igual('dupla longa', '<p>Resultados com previsibilidade e acompanhamento permanente.</p>');
// Título: limite menor em h1/h2 (16). "operação conectada." tem 18.
igual('h2 longo', '<h2 class="titulo">Uma operação conectada.</h2>');
caso('h2 curto', '<h2 class="titulo">O que muda quando a operação tem estrutura.</h2>', '<h2 class="titulo">O que muda quando a operação tem&nbsp;estrutura.</h2>');
// h3 usa o limite padrão.
caso('h3', '<h3 class="int-h3">Processo comercial estruturado</h3>', '<h3 class="int-h3">Processo comercial&nbsp;estruturado</h3>');

// h1 tem o limite mais curto (12): corpo de 40px ou mais a 320px.
igual('h1 longo', '<h1 class="titulo"><span>Vamos conversar?</span></h1>');
caso('h1 curto', '<h1>Isso é RevOps.</h1>', '<h1>Isso é&nbsp;RevOps.</h1>');
// Em títulos, se uma das duas palavras tem 12+ caracteres, elas não se juntam.
igual('título com palavra longa', '<h3>Construímos seu posicionamento</h3>');
igual('título com penúltima longa', '<h3 class="int-lado__titulo">Com o Rastreamento Avançado</h3>');
caso('parágrafo com palavra longa', '<p>Construímos seu posicionamento</p>', '<p>Construímos seu&nbsp;posicionamento</p>');
// Saídas manuais: data-quebra="livre" e data-quebra="junta".
igual('quebra livre', '<p data-quebra="livre">Um texto que fica como está.</p>');
igual('quebra livre herdada', '<li data-quebra="livre"><span class="x">Um texto que fica como está.</span></li>');
caso('junta forçado', '<h3 data-quebra="junta">Construímos seu posicionamento</h3>', '<h3 data-quebra="junta">Construímos seu&nbsp;posicionamento</h3>');

// Hífen entre letras nas palavras presas vira hífen inseparável; fora delas, não.
caso('hífen', '<p>Leads recuperados com follow-ups estruturados.</p>', '<p>Leads recuperados com follow&#8209;ups&nbsp;estruturados.</p>');
caso('hífen fora do fim', '<p>O follow-up vem depois da consulta.</p>', '<p>O follow-up vem depois da&nbsp;consulta.</p>');
caso('hífen solto como travessão', '<p>Antes e depois - juntos</p>', '<p>Antes e depois&nbsp;-&nbsp;juntos</p>');

// strong no fim: atravessa a tag inline.
caso('strong no fim', '<p>Entregamos um painel <strong>com dados reais.</strong></p>', '<p>Entregamos um painel <strong>com dados&nbsp;reais.</strong></p>');
caso('espaço fora do strong', '<p>Tudo fica <strong>visível</strong> no painel.</p>', '<p>Tudo fica <strong>visível</strong> no&nbsp;painel.</p>');
caso('espaço antes do strong', '<p>O resultado é <strong>previsível.</strong></p>', '<p>O resultado é&nbsp;<strong>previsível.</strong></p>');
// Link dentro do texto: atributos intactos.
caso('link', '<p>Escreva para <a href="mailto:oi@renke.com" title="a b c">oi@renke.com</a> hoje.</p>', '<p>Escreva para <a href="mailto:oi@renke.com" title="a b c">oi@renke.com</a>&nbsp;hoje.</p>');

// Entidades contam como um caractere e não quebram nada.
caso('entidades', '<p>Marketing &amp; vendas &mdash; juntos.</p>', '<p>Marketing &amp; vendas&nbsp;&mdash;&nbsp;juntos.</p>');
// &nbsp; já existente na última palavra: o bloco já está protegido.
igual('nbsp existente', '<p>Investimento a partir de R$&nbsp;5k</p>');
igual('nbsp literal', '<p>Investimento a partir de R$ 5k</p>');

// Span com classe (muitos são display:block): nunca é atravessado, é tratado como bloco próprio.
caso('título com spans de bloco',
  '<h2 class="titulo"><span class="linha">Cinco frentes de uma vez.</span> <span class="linha">Uma operação conectada.</span></h2>',
  '<h2 class="titulo"><span class="linha">Cinco frentes de uma&nbsp;vez.</span> <span class="linha">Uma operação conectada.</span></h2>');
// Duas palavras só: fica livre (o único ponto de quebra).
igual('duas palavras', '<li><span class="int-regua__legenda">certificação conquistada</span></li>');
igual('item de menu', '<li><a href="/x">Para Clínicas</a></li>');
caso('botão', '<a class="botao botao--lg" href="/contato"><span class="botao__texto">Quero conhecer a Formação Performa</span><svg viewBox="0 0 24 24"><path d="M7 7h10"/></svg></a>',
  '<a class="botao botao--lg" href="/contato"><span class="botao__texto">Quero conhecer a Formação&nbsp;Performa</span><svg viewBox="0 0 24 24"><path d="M7 7h10"/></svg></a>');
caso('item de lista com marcador', '<li class="int-lista__item"><span class="int-lista__indice">01</span> <span class="int-lista__texto">Você quer dados confiáveis para decidir.</span></li>',
  '<li class="int-lista__item"><span class="int-lista__indice">01</span> <span class="int-lista__texto">Você quer dados confiáveis para&nbsp;decidir.</span></li>');
// Palavras de lados diferentes de um span com classe não se juntam: o trecho
// antes dele é tratado sozinho, e o espaço junto do span fica comum.
caso('span com classe no fim', '<p>O ciclo fecha com o <span class="pilula">CRM</span></p>', '<p>O ciclo fecha com&nbsp;o <span class="pilula">CRM</span></p>');
igual('uma palavra de cada lado', '<p>ciclo <span class="pilula">CRM</span> fechado</p>');
// Span sem classe é atravessado (é só formatação).
caso('spans sem classe', '<h2 class="titulo metodo__titulo"> <span>O que a</span> <span>Renke faz</span> </h2>', '<h2 class="titulo metodo__titulo"> <span>O que a</span> <span>Renke&nbsp;faz</span> </h2>');
// …mas o espaço que só existe entre duas tags não vira &nbsp; (poderia virar uma linha a mais).
igual('espaço só entre tags', '<h2><span>O que a Renke</span> <span>faz</span></h2>');
igual('palavras em spans', '<h2 class="ancora"><span class="ancora__linha"> <span data-palavra>a</span> <span data-palavra>forma</span> </span></h2>');
// br e outros elementos separam trechos.
caso('br', '<h2 class="titulo">O mesmo método,<br>em outras frentes.</h2>', '<h2 class="titulo">O mesmo método,<br>em outras&nbsp;frentes.</h2>');
caso('img no fim', '<p>Selo de excelência GPTW <img src="/selo.png" alt="Selo GPTW"></p>', '<p>Selo de excelência&nbsp;GPTW <img src="/selo.png" alt="Selo GPTW"></p>');

// Nunca toca em script, style, textarea, pre, code, svg, template, comentários e atributos.
igual('script', '<p>ok</p><script>const a = "uma frase qualquer aqui";</script>');
igual('style', '<style>p::after { content: "a b"; }</style>');
igual('textarea', '<label>Mensagem <textarea>escreva aqui sua mensagem</textarea></label>');
igual('pre e code', '<pre>linha um dois</pre><p><code>npm run build</code></p>');
igual('template', '<template><p>texto dentro do template</p></template>');
igual('comentário', '<p><!-- não mexer aqui dentro --></p>');
caso('atributo com espaços', '<p title="duas palavras aqui" data-x="a b">Texto com alt e title.</p>', '<p title="duas palavras aqui" data-x="a b">Texto com alt e&nbsp;title.</p>');
igual('svg com texto', '<p><svg><text>um dois três</text></svg></p>');

// Blocos aninhados e HTML sem fechamento.
caso('blockquote com p', '<blockquote><p>Uma operação estruturada muda tudo.</p></blockquote>', '<blockquote><p>Uma operação estruturada muda&nbsp;tudo.</p></blockquote>');
caso('dt e dd', '<dl><dt>Horário</dt><dd>Segunda a sexta, das 9h às 18h.</dd></dl>', '<dl><dt>Horário</dt><dd>Segunda a sexta, das 9h às&nbsp;18h.</dd></dl>');
caso('li sem fechamento', '<ul><li>primeiro item da lista<li>segundo item da lista</ul>', '<ul><li>primeiro item da&nbsp;lista<li>segundo item da&nbsp;lista</ul>');
caso('p sem fechamento', '<div><p>texto que não fecha<div>outro</div></div>', '<div><p>texto que não&nbsp;fecha<div>outro</div></div>');
// Palavra única: nada a fazer.
igual('uma palavra', '<p>Contato</p>');
// Texto fora de bloco não é tocado.
igual('fora de bloco', '<div class="x">texto solto numa div</div>');
// Quebra de linha no código-fonte vira um &nbsp; só.
caso('espaço múltiplo', '<p>Fale com a\n      equipe</p>', '<p>Fale com a&nbsp;equipe</p>');

console.log(`sem-viuvas: ${n} casos ok`);
