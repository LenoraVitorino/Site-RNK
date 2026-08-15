/* ============================================================
   WIREFRAME — Navegação
   - Desktop: mega-menu abre no hover e no clique/teclado
   - Mobile:  drawer lateral com submenus em acordeão
   - Fecha com Escape, clique fora e ao redimensionar
   ============================================================ */

(function () {
  'use strict';

  var DESKTOP = window.matchMedia('(min-width: 900px)');

  var header    = document.getElementById('header');
  var navToggle = document.getElementById('navToggle');
  var nav       = document.getElementById('navPrincipal');
  var overlay   = document.getElementById('navOverlay');
  var triggers  = Array.prototype.slice.call(document.querySelectorAll('.nav__trigger'));

  /* ---------- Submenus ---------- */

  function panelOf(trigger) {
    return document.getElementById(trigger.getAttribute('aria-controls'));
  }

  function openSubmenu(trigger) {
    var panel = panelOf(trigger);
    if (!panel) return;
    trigger.setAttribute('aria-expanded', 'true');
    panel.hidden = false;
  }

  function closeSubmenu(trigger) {
    var panel = panelOf(trigger);
    if (!panel) return;
    trigger.setAttribute('aria-expanded', 'false');
    panel.hidden = true;
  }

  function closeAllSubmenus(except) {
    triggers.forEach(function (t) {
      if (t !== except) closeSubmenu(t);
    });
  }

  triggers.forEach(function (trigger) {
    var item = trigger.closest('.nav__item');

    trigger.addEventListener('click', function (e) {
      e.preventDefault();

      // Desktop: o hover já abre o painel, então o clique nunca fecha — se
      // alternasse, clicar no item sob o cursor fecharia o menu recém-aberto.
      // Fechar fica por conta de mouseleave, Escape, clique fora ou outro trigger.
      if (DESKTOP.matches) {
        closeAllSubmenus(trigger);
        openSubmenu(trigger);
        return;
      }

      // Mobile: acordeão, vários podem ficar abertos.
      var isOpen = trigger.getAttribute('aria-expanded') === 'true';
      isOpen ? closeSubmenu(trigger) : openSubmenu(trigger);
    });

    // Hover no desktop
    item.addEventListener('mouseenter', function () {
      if (!DESKTOP.matches) return;
      closeAllSubmenus(trigger);
      openSubmenu(trigger);
    });

    item.addEventListener('mouseleave', function () {
      if (!DESKTOP.matches) return;
      closeSubmenu(trigger);
    });

    // Fecha ao sair do submenu com Tab
    item.addEventListener('focusout', function (e) {
      if (!DESKTOP.matches) return;
      if (!item.contains(e.relatedTarget)) closeSubmenu(trigger);
    });
  });

  /* ---------- Drawer mobile ---------- */

  function openNav() {
    navToggle.setAttribute('aria-expanded', 'true');
    navToggle.setAttribute('aria-label', 'Fechar menu');
    nav.classList.add('is-open');
    overlay.hidden = false;
    document.body.style.overflow = 'hidden';
  }

  function closeNav() {
    navToggle.setAttribute('aria-expanded', 'false');
    navToggle.setAttribute('aria-label', 'Abrir menu');
    nav.classList.remove('is-open');
    overlay.hidden = true;
    document.body.style.overflow = '';
    closeAllSubmenus();
  }

  navToggle.addEventListener('click', function () {
    nav.classList.contains('is-open') ? closeNav() : openNav();
  });

  overlay.addEventListener('click', closeNav);

  /* ---------- Fechamento global ---------- */

  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    var openTrigger = triggers.filter(function (t) {
      return t.getAttribute('aria-expanded') === 'true';
    })[0];

    if (openTrigger) {
      closeSubmenu(openTrigger);
      openTrigger.focus();
    } else if (nav.classList.contains('is-open')) {
      closeNav();
      navToggle.focus();
    }
  });

  document.addEventListener('click', function (e) {
    if (!DESKTOP.matches) return;
    if (e.target.closest('.nav__item--has-menu')) return;
    closeAllSubmenus();
  });

  // Links do wireframe ainda não levam a lugar nenhum: fecha o menu e avisa.
  nav.addEventListener('click', function (e) {
    var link = e.target.closest('a[href="#"]');
    if (!link) return;
    e.preventDefault();
    var rota = link.getAttribute('data-rota');
    closeAllSubmenus();
    if (!DESKTOP.matches) closeNav();
    if (rota) console.info('[wireframe] rota prevista: ' + rota + ' (página ainda não construída)');
  });

  /* ---------- Reset ao trocar de breakpoint ---------- */

  function onBreakpointChange() {
    closeAllSubmenus();
    if (DESKTOP.matches) closeNav();
  }

  DESKTOP.addEventListener
    ? DESKTOP.addEventListener('change', onBreakpointChange)
    : DESKTOP.addListener(onBreakpointChange);

  /* ---------- Sombra no header ao rolar ---------- */

  var ticking = false;
  window.addEventListener('scroll', function () {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(function () {
      header.classList.toggle('is-stuck', window.scrollY > 8);
      ticking = false;
    });
  }, { passive: true });

  /* ---------- Toggle das anotações de wireframe ---------- */

  var notesBtn = document.getElementById('toggleNotes');

  notesBtn.addEventListener('click', function () {
    var hidden = document.body.classList.toggle('notes-hidden');
    notesBtn.textContent = hidden ? 'Mostrar anotações' : 'Ocultar anotações';
    notesBtn.setAttribute('aria-pressed', String(!hidden));
  });

})();
