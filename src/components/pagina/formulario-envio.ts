/**
 * Envio dos formulários das internas ([data-form-pagina]).
 * Especificação: docs/04-design/paginas-internas.md, "formulario", ENVIO.
 *
 * Mesma lógica do formulário da home (home2/Formulario.astro), só que
 * genérica: os campos vêm dos dados, então a validação é a nativa do
 * navegador (checkValidity) e o erro inline é o validationMessage, sem
 * microcopy nova. Com o formulário válido, a mensagem é montada em linhas
 * 'Rótulo: valor' a partir do .field__label e abre no WhatsApp (quando
 * data-whatsapp está preenchido) ou no e-mail do visitante, pronta para
 * revisar e mandar. Nada trafega pela URL do site. Quando existir um endpoint
 * de envio, basta trocar o trecho de abertura do canal.
 */
type Controle = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;

const ehControle = (el: Element): el is Controle =>
  (el instanceof HTMLInputElement || el instanceof HTMLSelectElement || el instanceof HTMLTextAreaElement) && el.name !== '';

/**
 * Rótulo do campo na mensagem: o texto do .field__label, sem o '(opcional)'
 * da interface. Rótulo em pergunta ('Qual o seu interesse?') não leva
 * dois-pontos depois do ponto de interrogação.
 */
const linhaDe = (controle: Controle, valor: string) => {
  const rotulo = (controle.closest('.field')?.querySelector('.field__label')?.textContent ?? controle.name)
    .replace(/\s*\(opcional\)\s*$/i, '')
    .trim();
  return /[?:]$/.test(rotulo) ? `${rotulo} ${valor}` : `${rotulo}: ${valor}`;
};

function montar(form: HTMLFormElement) {
  const status = form.querySelector<HTMLElement>('[data-status]');
  const copiar = form.querySelector<HTMLButtonElement>('[data-copiar]');
  const controles = [...form.elements].filter(ehControle);
  let texto = '';

  const valida = (controle: Controle) => {
    const ok = controle.checkValidity();
    if (ok) controle.removeAttribute('aria-invalid');
    else controle.setAttribute('aria-invalid', 'true');
    controle.closest('.field')?.classList.toggle('field--invalido', !ok);
    const erro = document.getElementById(`${controle.id}-erro`);
    if (erro) {
      erro.textContent = ok ? '' : controle.validationMessage;
      erro.hidden = ok;
    }
    return ok;
  };

  // Depois do primeiro erro, o campo se revalida enquanto a pessoa corrige.
  controles.forEach((controle) => {
    const revalida = () => {
      if (controle.getAttribute('aria-invalid') === 'true') valida(controle);
    };
    controle.addEventListener('input', revalida);
    controle.addEventListener('change', revalida);
  });

  form.addEventListener('submit', (evento) => {
    evento.preventDefault();

    // Espaço em branco não conta como resposta (a home faz o mesmo com trim).
    controles.forEach((controle) => {
      if (!(controle instanceof HTMLSelectElement) && controle.value !== controle.value.trim()) {
        controle.value = controle.value.trim();
      }
      // Link colado sem esquema ('linkedin.com/in/…') ganha https://, desde que
      // tenha cara de endereço (sem espaço, domínio com ponto). O resto segue
      // como a pessoa digitou e a validação nativa acusa o erro normalmente.
      if (
        controle instanceof HTMLInputElement &&
        controle.type === 'url' &&
        !/^[a-z][a-z0-9+.-]*:/i.test(controle.value) &&
        /^[^\s/?#]+\.[^\s/?#]+([/?#]\S*)?$/.test(controle.value)
      ) {
        controle.value = `https://${controle.value}`;
      }
    });

    const invalidos = controles.filter((controle) => !valida(controle));
    if (invalidos.length) {
      invalidos[0].focus();
      return;
    }

    const linhas = controles
      .map((controle) => [controle, controle.value.trim()] as const)
      .filter(([, valor]) => valor !== '')
      .map(([controle, valor]) => linhaDe(controle, valor));
    texto = `Olá, Renke.\n\n${linhas.join('\n')}`;

    const zap = form.dataset.whatsapp;
    const email = form.dataset.email;
    if (zap) {
      window.open(`https://wa.me/${zap}?text=${encodeURIComponent(texto)}`, '_blank', 'noopener');
      if (status) status.textContent = 'Sua mensagem abriu no WhatsApp, pronta para enviar.';
    } else {
      location.href = `mailto:${email}?subject=${encodeURIComponent('Contato pelo site')}&body=${encodeURIComponent(texto)}`;
      if (status) status.textContent = `Sua mensagem abriu no seu e-mail, pronta para enviar. Se não abriu, copie e mande para ${email}.`;
    }
    if (copiar) copiar.hidden = false;
  });

  copiar?.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(texto);
      if (status) status.textContent = `Mensagem copiada. Cole no seu ${form.dataset.whatsapp ? 'WhatsApp' : 'e-mail'} e envie.`;
    } catch {
      if (status) status.textContent = texto;
    }
  });
}

document.querySelectorAll<HTMLFormElement>('[data-form-pagina]').forEach(montar);
