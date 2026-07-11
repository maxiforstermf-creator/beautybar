/* ============================================================
   BEAUTYBAR VANESSA FORSTER – main.js
   Vanilla JS – kein jQuery.
   Setzt partials.js voraus (Header/Footer bereits im DOM).
   Unterstützt sowohl eigene Klassen als auch originale WP/Divi-Klassen.
   ============================================================ */

'use strict';

/* ─────────────────────────────────────────────────────────────
   1. STICKY HEADER (Nav-Pille, 3-Zustands-Mechanik siehe style.css)
   ───────────────────────────────────────────────────────────── */
function initStickyHeader() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  // Einziger Scroll-Listener für die Nav-Pille: ab THRESHOLD px bekommt sie
  // .scrolled (Zustand 3 – dauerhaft weiß, siehe style.css). Darunter bleibt
  // sie in Zustand 1 (transparent) bzw. Zustand 2 (Hover, nur Maus-Geräte,
  // reines CSS über @media (hover:hover):hover – kein JS nötig).
  const THRESHOLD = 60;

  function onScroll() {
    header.classList.toggle('scrolled', window.scrollY > THRESHOLD);
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
   7b. ZAHLEN HOCHZÄHLEN (Stat-Karten, z.B. Über-uns-Seite)
   Zählt Zahlen wie "30+" oder "130 m²" beim Einscrollen von 0 hoch,
   statt sie starr dazustehen zu haben. Text ohne Ziffern (z.B.
   "DE + International") bleibt unangetastet.
   ───────────────────────────────────────────────────────────── */
function initCountUp() {
  const elements = document.querySelectorAll('.stat-card__number');
  if (!elements.length) return;

  const duration = 700; // bewusst kurz gehalten

  function animate(el, prefix, target, suffix) {
    const start = performance.now();
    function tick(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = prefix + Math.round(target * eased) + suffix;
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  if (!window.IntersectionObserver) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const match = el.textContent.trim().match(/^(\D*)(\d+)(.*)$/);
      if (match) animate(el, match[1], parseInt(match[2], 10), match[3]);
      observer.unobserve(el);
    });
  }, { threshold: 0.4, rootMargin: '0px 0px -40px 0px' });

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
   GOOGLE BEWERTUNGEN – Places API (New)
   ───────────────────────────────────────────────────────────── */
function initGoogleReviews() {
  const container = document.getElementById('google-reviews');
  const loading   = document.getElementById('reviews-loading');
  if (!container || container.dataset.initialized) return;
  container.dataset.initialized = '1';

  const API_KEY  = 'AIzaSyDzb6AYftmv9bjwlYvl1mLNiQAUwXAUZF8';
  const PLACE_ID = 'ChIJXxBOQGS9nkcRKvu0YdQvZhc';

  fetch('https://places.googleapis.com/v1/places/' + PLACE_ID, {
    headers: {
      'X-Goog-Api-Key': API_KEY,
      'X-Goog-FieldMask': 'reviews,rating,userRatingCount'
    }
  })
  .then(function(r) { return r.json(); })
  .then(function(data) {
    if (loading) loading.style.display = 'none';
    if (!data.reviews || !data.reviews.length) {
      container.innerHTML = '<p style="text-align:center;color:#999;">Keine Bewertungen gefunden.</p>';
      return;
    }

    const MAPS_URL  = 'https://www.google.com/maps/place/?q=place_id:' + PLACE_ID;

    data.reviews.forEach(function(review) {
      const rating = review.rating || 5;
      const stars  = '★'.repeat(rating) + '☆'.repeat(5 - rating);
      const text   = (review.text && review.text.text) ? review.text.text : '';
      const author = (review.authorAttribution && review.authorAttribution.displayName) ? review.authorAttribution.displayName : '';
      const card   = document.createElement('div');
      card.className = 'review-card';
      card.innerHTML =
        '<div class="review-stars">' + stars + '</div>' +
        '<p class="review-text">„' + text + '"</p>' +
        '<button type="button" class="review-toggle" hidden>Mehr lesen</button>' +
        '<p class="review-author">' + author + '</p>' +
        '<a class="review-link" href="' + MAPS_URL + '" target="_blank" rel="noopener noreferrer">Auf Google ansehen →</a>';
      container.appendChild(card);

      // "Mehr lesen" nur einblenden, wenn der Text durch das Line-Clamp
      // (5 Zeilen, siehe CSS) tatsächlich abgeschnitten wird.
      const textEl   = card.querySelector('.review-text');
      const toggleEl = card.querySelector('.review-toggle');
      requestAnimationFrame(function () {
        if (textEl.scrollHeight > textEl.clientHeight + 1) {
          toggleEl.hidden = false;
          toggleEl.addEventListener('click', function () {
            const expanded = textEl.classList.toggle('is-expanded');
            toggleEl.textContent = expanded ? 'Weniger anzeigen' : 'Mehr lesen';
          });
        }
      });
    });
    initReviewsCarousel(container);
  })
  .catch(function() {
    if (loading) loading.style.display = 'none';
    container.innerHTML = '<p style="text-align:center;color:#999;">Bewertungen konnten nicht geladen werden.</p>';
  });
}

function initReviewsCarousel(track) {
  const prevBtn = document.querySelector('.reviews-carousel__btn--prev');
  const nextBtn = document.querySelector('.reviews-carousel__btn--next');
  if (!prevBtn || !nextBtn) return;

  const cards = track.querySelectorAll('.review-card');
  const total = cards.length;
  let current = 0;

  function getVisible() {
    if (window.innerWidth >= 1024) return 4;
    if (window.innerWidth >= 600)  return 2;
    return 1;
  }

  function update() {
    if (!cards.length) return;
    const v   = getVisible();
    const max = Math.max(0, total - v);
    current   = Math.min(current, max);
    const cardW = cards[0].getBoundingClientRect().width;
    const gap   = parseFloat(getComputedStyle(track).gap) || 24;
    track.style.transform = 'translateX(-' + (current * (cardW + gap)) + 'px)';
    prevBtn.style.opacity       = current === 0  ? '0.35' : '1';
    prevBtn.style.pointerEvents = current === 0  ? 'none'  : '';
    nextBtn.style.opacity       = current >= max ? '0.35' : '1';
    nextBtn.style.pointerEvents = current >= max ? 'none'  : '';
  }

  prevBtn.addEventListener('click', function() { current--; update(); });
  nextBtn.addEventListener('click', function() { current++; update(); });
  window.addEventListener('resize', update, { passive: true });
  update();
}

/* ─────────────────────────────────────────────────────────────
   INIT – partials.js läuft synchron davor
   ───────────────────────────────────────────────────────────── */
(function init() {
  initStickyHeader();
  initMegaMenu();
  initRightSidebar();
  initSmoothScroll();
  initBeforeAfterSliders();
  initScrollAnimations();
  initCountUp();
  initBehandlungsPopup();
  initMobileNav();
  initGoogleReviews();
})();