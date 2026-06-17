/* ============================================================
   BEAUTYBAR VANESSA FORSTER – main.js
   Setzt partials.js voraus (Header/Footer bereits im DOM).
   ============================================================ */

function initHeader() {
  const header = document.querySelector('.site-header');
  if (!header) return;
  const update = () => header.classList.toggle('scrolled', window.scrollY > 20);
  window.addEventListener('scroll', update, { passive: true });
  update();
}

function initMobileNav() {
  const hamburger = document.querySelector('.hamburger');
  const overlay   = document.querySelector('.mobile-overlay');
  const nav       = document.querySelector('.mobile-nav');
  const closeBtn  = document.querySelector('.mobile-nav__close');
  if (!hamburger || !overlay || !nav) return;

  function openNav() {
    overlay.classList.add('open');
    nav.classList.add('open');
    document.body.style.overflow = 'hidden';
    hamburger.setAttribute('aria-expanded', 'true');
  }
  function closeNav() {
    overlay.classList.remove('open');
    nav.classList.remove('open');
    document.body.style.overflow = '';
    hamburger.setAttribute('aria-expanded', 'false');
  }

  hamburger.addEventListener('click', openNav);
  overlay.addEventListener('click', closeNav);
  if (closeBtn) closeBtn.addEventListener('click', closeNav);
  nav.querySelectorAll('a').forEach(a => a.addEventListener('click', closeNav));
  window.addEventListener('resize', () => { if (window.innerWidth >= 1024) closeNav(); });
}

function initStickyButton() {
  const btn = document.getElementById('stickyBooking');
  if (!btn) return;
  const threshold = window.innerHeight * 0.6;
  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > threshold);
  }, { passive: true });
}

function initScrollAnimations() {
  const elements = document.querySelectorAll('.fade-in');
  if (!elements.length) return;
  if (!window.IntersectionObserver) {
    elements.forEach(el => el.classList.add('visible'));
    return;
  }
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -50px 0px' });
  elements.forEach(el => observer.observe(el));
}

/* partials.js läuft synchron davor – DOM und Partials sind bereit */
initHeader();
initMobileNav();
initStickyButton();
initScrollAnimations();
