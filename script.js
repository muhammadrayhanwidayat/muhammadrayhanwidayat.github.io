
/* ── Nav toggle ── */
(function(){
  const toggle = document.querySelector('.nav-toggle');
  const nav    = document.getElementById('navlinks');
  if (!toggle || !nav) return;

  function setOpen(open) {
    toggle.setAttribute('aria-expanded', String(open));
    toggle.classList.toggle('open', open);
    nav.classList.toggle('open', open);
  }

  toggle.addEventListener('click', () => setOpen(toggle.getAttribute('aria-expanded') !== 'true'));
  nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => setOpen(false)));
  document.addEventListener('click', e => {
    if (!nav.classList.contains('open')) return;
    if (nav.contains(e.target) || toggle.contains(e.target)) return;
    setOpen(false);
  });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') setOpen(false); });
})();

/* ── Typing animation ── */
(function(){
  const el = document.getElementById('typing-text');
  if (!el) return;

  const texts = [
    'Detection Engineering',
    'Threat Hunting',
    'SIEM Rule Development',
    'Incident Response',
    'Malware Analysis',
  ];

  let ti = 0, ci = 0, deleting = false;

  function tick() {
    const word = texts[ti];
    if (deleting) {
      el.textContent = word.slice(0, --ci);
    } else {
      el.textContent = word.slice(0, ++ci);
    }

    if (!deleting && ci === word.length) {
      setTimeout(() => { deleting = true; tick(); }, 2000);
      return;
    }
    if (deleting && ci === 0) {
      deleting = false;
      ti = (ti + 1) % texts.length;
    }
    setTimeout(tick, deleting ? 38 : 75);
  }

  tick();
})();

/* ── Scroll reveal ── */
(function(){
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
})();
