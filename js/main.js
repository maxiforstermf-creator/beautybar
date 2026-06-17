/* ============================================================
   BEAUTYBAR VANESSA FORSTER – main.js
   Vanilla JS – kein jQuery.
   Setzt partials.js voraus (Header/Footer bereits im DOM).
   Unterstützt sowohl eigene Klassen als auch originale WP/Divi-Klassen.
   ============================================================ */

'use strict';

/* ─────────────────────────────────────────────────────────────
   1. ANNOUNCEMENT BAR + HEADER OFFSET
   Original: .et_pb_section_3_tb_header / .et_pb_section_1_tb_header
   ───────────────────────────────────────────────────────────── */
function initHeaderOffset() {
  const bar    = document.querySelector('.announcement-bar, .et_pb_section_3_tb_header');
  const header = document.querySelector('.site-header, .et_pb_section_1_tb_header');
  if (!bar || !header) return;

  function setOffset() {
    const h = bar.getBoundingClientRect().height;
    document.documentElement.style.setProperty('--announce-h', h + 'px');
    header.style.top = h + 'px';
  }

  setOffset();
  window.addEventListener('resize', setOffset, { passive: true });
}

/* ─────────────────────────────────────────────────────────────
   2. STICKY HEADER
   Original: .et_pb_sticky_module / .et-fixed-header
   ───────────────────────────────────────────────────────────── */
function initStickyHeader() {
  const header = document.querySelector('.site-header, .et_pb_section_1_tb_header');
  if (!header) return;

  function onScroll() {
    const sticky = window.scrollY > 50;
    header.classList.toggle('scrolled',       sticky);
    header.classList.toggle('et-fixed-header', sticky);
    header.classList.toggle('et_pb_sticky_module', sticky);
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/* ─────────────────────────────────────────────────────────────
   3. BEHANDLUNGS-MEGAMENÜ
   Original: .et_pb_section_2_tb_header  Klasse is-open togglen
   ───────────────────────────────────────────────────────────── */
function initMegaMenu() {
  const megaMenu = document.querySelector(
    '.behandlungs-megamenu, .et_pb_section_2_tb_header'
  );
  if (!megaMenu) return;

  const triggers = document.querySelectorAll(
    '.site-header__nav a[href*="leistungen"], .site-header__nav a[href*="behandlung"]'
  );
  if (!triggers.length) return;

  let hideTimer;

  function show() {
    clearTimeout(hideTimer);
    megaMenu.classList.add('is-open');
  }

  function hide() {
    hideTimer = setTimeout(() => megaMenu.classList.remove('is-open'), 180);
  }

  triggers.forEach(t => {
    t.addEventListener('mouseenter', show);
    t.addEventListener('mouseleave', hide);
    t.addEventListener('focus', show);
    t.addEventListener('blur',  hide);
  });

  megaMenu.addEventListener('mouseenter', () => clearTimeout(hideTimer));
  megaMenu.addEventListener('mouseleave', hide);

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') megaMenu.classList.remove('is-open');
  });
}

/* ─────────────────────────────────────────────────────────────
   4. RECHTE SIDEBAR
   Original: .rightsidebuttonsrow — beim Erreichen des Footers verstecken
   ───────────────────────────────────────────────────────────── */
function initRightSidebar() {
  const sidebar = document.querySelector('.rightsidebuttonsrow');
  const footer  = document.querySelector('.site-footer, .et_pb_section_0_tb_footer');
  if (!sidebar || !footer) return;

  function checkVisibility() {
    const footerTop = footer.getBoundingClientRect().top;
    const winH      = window.innerHeight;
    const hide      = footerTop <= winH;
    sidebar.style.opacity       = hide ? '0' : '1';
    sidebar.style.pointerEvents = hide ? 'none' : 'all';
    sidebar.style.transform     = hide ? 'translateX(100%)' : 'translateX(0)';
  }

  sidebar.style.transition = 'opacity 0.3s, transform 0.3s';
  window.addEventListener('scroll', checkVisibility, { passive: true });
  checkVisibility();
}

/* ─────────────────────────────────────────────────────────────
   5. SMOOTH SCROLL
   Original: et_pb_smooth_scroll
   ───────────────────────────────────────────────────────────── */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', function (e) {
      const id = this.getAttribute('href');
      if (!id || id === '#') return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();

      const bar    = document.querySelector('.announcement-bar');
      const header = document.querySelector('.site-header');
      const offset = ((bar    ? bar.offsetHeight    : 0)
                    + (header ? header.offsetHeight : 0)
                    + 16);

      window.scrollTo({
        top:      target.getBoundingClientRect().top + window.scrollY - offset,
        behavior: 'smooth'
      });
    });
  });
}

/* ─────────────────────────────────────────────────────────────
   6. BEFORE / AFTER SLIDER
   Original: .dipi_before_after_slider, .dipi_before_after_slider_container
   Drag-Handle horizontal ziehbar, clip-path auf After-Bild.
   ───────────────────────────────────────────────────────────── */
function initBeforeAfterSliders() {
  document.querySelectorAll(
    '.dipi_before_after_slider, .ba-slider'
  ).forEach(initSingleSlider);
}

function initSingleSlider(wrapper) {
  const inner   = wrapper.querySelector('.dipi_before_after_slider_container, .ba-slider__inner');
  const afterEl = wrapper.querySelector('.dipi_after_img, .ba-slider__after');
  const handle  = wrapper.querySelector('.dipi_handle, .ba-slider__handle');
  if (!inner || !afterEl || !handle) return;

  let dragging = false;

  function pctFromEvent(e) {
    const rect    = inner.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    return Math.min(100, Math.max(0, ((clientX - rect.left) / rect.width) * 100));
  }

  function apply(pct) {
    afterEl.style.clipPath = `inset(0 ${100 - pct}% 0 0)`;
    handle.style.left      = pct + '%';
  }

  apply(50);

  handle.addEventListener('mousedown',  () => { dragging = true; });
  handle.addEventListener('touchstart', () => { dragging = true; }, { passive: true });

  window.addEventListener('mousemove', e => { if (dragging) apply(pctFromEvent(e)); });
  window.addEventListener('touchmove', e => { if (dragging) apply(pctFromEvent(e)); }, { passive: true });
  window.addEventListener('mouseup',   () => { dragging = false; });
  window.addEventListener('touchend',  () => { dragging = false; });
}

/* ─────────────────────────────────────────────────────────────
   7. SCROLL-ANIMATIONEN
   Original: .et_animated  →  Klasse .fade + animation-name et_pb_fade
   Eigene:   .fade-in       →  Klasse .visible
   ───────────────────────────────────────────────────────────── */
function initScrollAnimations() {
  const elements = document.querySelectorAll('.fade-in, .et_animated');
  if (!elements.length) return;

  if (!window.IntersectionObserver) {
    elements.forEach(el => el.classList.add('visible', 'fade'));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible', 'fade');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  elements.forEach(el => observer.observe(el));
}

/* ─────────────────────────────────────────────────────────────
   8. BEHANDLUNGEN POPUP (Slide-in Menü)
   Original: .behandlungs-slide-in  /  .et_pb_button_1_tb_header
   ───────────────────────────────────────────────────────────── */
function initBehandlungsPopup() {
  const popup = document.querySelector(
    '.behandlungs-slide-in'
  );
  if (!popup) return;

  const triggers = document.querySelectorAll(
    '.site-header__cta, .et_pb_button_1_tb_header, .site-header__nav a[href*="leistungen"]'
  );
  if (!triggers.length) return;

  let hideTimer;

  function show() {
    clearTimeout(hideTimer);
    popup.classList.add('is-open');
  }

  function hide() {
    hideTimer = setTimeout(() => popup.classList.remove('is-open'), 200);
  }

  triggers.forEach(t => {
    t.addEventListener('mouseenter', show);
    t.addEventListener('mouseleave', hide);
  });

  popup.addEventListener('mouseenter', () => clearTimeout(hideTimer));
  popup.addEventListener('mouseleave', hide);

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') popup.classList.remove('is-open');
  });
}

/* ─────────────────────────────────────────────────────────────
   9. MOBILE HAMBURGER / NAV
   Original: .dipi_hamburger, .mobile_menu_bar  →  is-active togglen
   ───────────────────────────────────────────────────────────── */
function initMobileNav() {
  const hamburger = document.querySelector(
    '.hamburger, .dipi_hamburger, .mobile_menu_bar'
  );
  const overlay   = document.querySelector('.mobile-overlay');
  const nav       = document.querySelector('.mobile-nav');
  const closeBtn  = document.querySelector('.mobile-nav__close');
  if (!hamburger || !nav) return;

  function openNav() {
    nav.classList.add('open');
    hamburger.classList.add('is-active');
    hamburger.setAttribute('aria-expanded', 'true');
    if (overlay) {
      overlay.classList.add('open');
      overlay.removeAttribute('aria-hidden');
    }
    nav.removeAttribute('aria-hidden');
    document.body.style.overflow = 'hidden';
  }

  function closeNav() {
    nav.classList.remove('open');
    hamburger.classList.remove('is-active');
    hamburger.setAttribute('aria-expanded', 'false');
    if (overlay) {
      overlay.classList.remove('open');
      overlay.setAttribute('aria-hidden', 'true');
    }
    nav.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  hamburger.addEventListener('click', openNav);
  if (overlay)  overlay.addEventListener('click',  closeNav);
  if (closeBtn) closeBtn.addEventListener('click', closeNav);

  nav.querySelectorAll('a').forEach(a => a.addEventListener('click', closeNav));
  window.addEventListener('keydown', e => { if (e.key === 'Escape') closeNav(); });
  window.addEventListener('resize',  () => {
    if (window.innerWidth >= 1024) closeNav();
  }, { passive: true });
}

/* ─────────────────────────────────────────────────────────────
   STICKY BOOKING BUTTON  (eigene Komponente)
   ───────────────────────────────────────────────────────────── */
function initStickyBooking() {
  const btn = document.getElementById('stickyBooking');
  if (!btn) return;

  const threshold = window.innerHeight * 0.6;
  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > threshold);
  }, { passive: true });
}

/* ─────────────────────────────────────────────────────────────
   COOKIE NOTICE
   Original: .cn-position-bottom  →  cookie-notice-hidden entfernen nach 5 s
   ───────────────────────────────────────────────────────────── */
function initCookieNotice() {
  const notice = document.querySelector('.cn-position-bottom, .cookie-notice');
  if (!notice) return;

  const STORAGE_KEY = 'bb_cookie_ok';

  if (localStorage.getItem(STORAGE_KEY)) {
    notice.classList.add('cookie-notice-hidden');
    return;
  }

  setTimeout(() => {
    notice.classList.remove('cookie-notice-hidden');
  }, 5000);

  const acceptBtn = notice.querySelector(
    '.cn-button, .cn-accept, .cookie-notice__accept, [data-cookie-accept]'
  );
  if (acceptBtn) {
    acceptBtn.addEventListener('click', () => {
      localStorage.setItem(STORAGE_KEY, '1');
      notice.classList.add('cookie-notice-hidden');
    });
  }
}

/* ─────────────────────────────────────────────────────────────
   INIT – partials.js läuft synchron davor
   ───────────────────────────────────────────────────────────── */
(function init() {
  initHeaderOffset();
  initStickyHeader();
  initMegaMenu();
  initRightSidebar();
  initSmoothScroll();
  initBeforeAfterSliders();
  initScrollAnimations();
  initBehandlungsPopup();
  initMobileNav();
  initStickyBooking();
  initCookieNotice();
})();
