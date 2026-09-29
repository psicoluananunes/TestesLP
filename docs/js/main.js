(function () {
  var ids = ['inicio', 'para-voce', 'depoimentos', 'sobre', 'planos', 'agenda', 'duvidas'];
  var header = document.querySelector('.site-header');
  var menuBtn = document.querySelector('.menu-btn');
  var progress = document.querySelector('.progress');
  var navLinks = document.querySelectorAll('.nav-desktop a, .nav-mobile a');

  function setActive(id) {
    navLinks.forEach(function (a) {
      a.classList.toggle('is-active', a.getAttribute('data-target') === id);
    });
  }

  function setMenu(open) {
    header.classList.toggle('menu-open', open);
    menuBtn.textContent = open ? '×' : '☰';
    menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
  }

  // Seção ativa, barra de progresso e visibilidade da agenda
  function onScroll() {
    var y = window.scrollY;
    var active = ids[0];
    ids.forEach(function (id) {
      var el = document.getElementById(id);
      if (el && el.getBoundingClientRect().top <= 140) active = id;
    });
    setActive(active);
    var max = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.width = ((max > 0 ? Math.min(1, y / max) : 0) * 100).toFixed(2) + '%';
    var ag = document.getElementById('agenda');
    var agendaVisible = false;
    if (ag) {
      var r = ag.getBoundingClientRect();
      agendaVisible = r.top < window.innerHeight * 0.85 && r.bottom > 0;
    }
    document.body.classList.toggle('agenda-visible', agendaVisible);
  }

  // Navegação suave entre as seções, descontando o header fixo
  document.querySelectorAll('a[data-target]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var id = a.getAttribute('data-target');
      var el = id && document.getElementById(id);
      if (!el) return;
      e.preventDefault();
      var top = el.getBoundingClientRect().top + window.scrollY - 71;
      window.scrollTo({ top: id === 'inicio' ? 0 : top, behavior: 'smooth' });
      setMenu(false);
      setActive(id);
    });
  });

  menuBtn.addEventListener('click', function () {
    setMenu(!header.classList.contains('menu-open'));
  });

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', function () {
    if (window.innerWidth > 980) setMenu(false);
    onScroll();
  });
  onScroll();

  // Carrossel de relatos
  var track = document.querySelector('.track');
  document.querySelectorAll('[data-dir]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var card = track.firstElementChild;
      var dir = Number(btn.getAttribute('data-dir'));
      track.scrollBy({ left: ((card ? card.offsetWidth : 500) + 16) * dir, behavior: 'smooth' });
    });
  });

  // Ampliação dos relatos
  var lb = document.querySelector('.lightbox');
  var lbImg = lb.querySelector('img');
  function closeLb() {
    lb.classList.remove('is-open');
    lbImg.removeAttribute('src');
  }
  track.querySelectorAll('button').forEach(function (btn) {
    btn.addEventListener('click', function () {
      lbImg.src = btn.querySelector('img').src;
      lb.classList.add('is-open');
    });
  });
  lb.addEventListener('click', function (e) { if (e.target === lb) closeLb(); });
  lb.querySelector('.lb-close').addEventListener('click', closeLb);
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeLb(); });

  // Widgets externos: agenda Doctoralia e feed do Instagram (Elfsight)
  function add(id, src) {
    if (document.getElementById(id)) return;
    var s = document.createElement('script');
    s.id = id; s.src = src; s.async = true;
    document.body.appendChild(s);
  }
  add('zl-widget-s', 'https://platform.docplanner.com/js/widget.js');
  add('elfsight-platform', 'https://elfsightcdn.com/platform.js');
})();
