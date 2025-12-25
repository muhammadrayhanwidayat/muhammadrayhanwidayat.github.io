
  (function(){
    const toggle = document.querySelector('.nav-toggle');
    const nav = document.getElementById('navlinks');

    if(!toggle || !nav) return;

    function setOpen(open){
      toggle.setAttribute('aria-expanded', String(open));
      toggle.classList.toggle('open', open);
      nav.classList.toggle('open', open);
    }

    toggle.addEventListener('click', ()=>{
      const isOpen = toggle.getAttribute('aria-expanded') === 'true';
      setOpen(!isOpen);
    });

    // tutup menu saat klik link
    nav.querySelectorAll('a').forEach(a=>{
      a.addEventListener('click', ()=> setOpen(false));
    });

    // tutup menu kalau klik di luar
    document.addEventListener('click', (e)=>{
      if(!nav.classList.contains('open')) return;
      if(e.target === nav || nav.contains(e.target) || e.target === toggle || toggle.contains(e.target)) return;
      setOpen(false);
    });

    // optional: tutup dengan ESC
    document.addEventListener('keydown', (e)=>{
      if(e.key === 'Escape') setOpen(false);
    });
  })();

