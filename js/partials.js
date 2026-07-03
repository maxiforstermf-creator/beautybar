/* ============================================================
   BEAUTYBAR – partials.js
   Injiziert Header und Footer direkt – funktioniert ohne Server.
   Muss VOR main.js geladen werden.
   ============================================================ */

(function () {

  /* ── Header ── */
  var HEADER_HTML = `
<div class="announcement-bar">
  <span class="announcement-bar__left">Herzlich Willkommen!</span>
  <span class="announcement-bar__right">→ Coming Soon: E-Book</span>
</div>

<header class="site-header" id="site-header">
  <div class="site-header__inner">
    <a href="/" class="site-header__logo" aria-label="Beautybar Vanessa Forster – Startseite">
      <img src="/public/logo-header.png"
           alt="Beautybar Vanessa Forster" width="140" height="60" />
    </a>
    <nav class="site-header__nav" aria-label="Hauptnavigation">
      <a href="/">STARTSEITE</a>
      <a href="/uber-uns/">ÜBER UNS</a>
      <a href="/leistungen/">LEISTUNGEN</a>
      <a href="/academy/">ACADEMY</a>
      <a href="https://shop.beautybar-vanessaforster.de/" target="_blank" rel="noopener noreferrer">SHOP</a>
      <a href="/kontakt/">KONTAKT</a>
    </nav>
    <div class="site-header__actions">
      <a href="/leistungen/" class="site-header__cta">BEHANDLUNGEN</a>
      <button class="hamburger" aria-label="Menü öffnen" aria-expanded="false" aria-controls="mobileNav">
        <span></span><span></span><span></span>
      </button>
    </div>
  </div>
</header>

<div class="mobile-overlay" id="mobileOverlay" aria-hidden="true"></div>

<nav class="mobile-nav" id="mobileNav" aria-label="Mobile Navigation" aria-hidden="true">
  <div class="mobile-nav__head">
    <img src="/public/logo-header.png"
         alt="Beautybar Vanessa Forster" width="120" height="50" />
    <button class="mobile-nav__close" aria-label="Menü schließen">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
           stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
      </svg>
    </button>
  </div>
  <ul class="mobile-nav__links">
    <li><a href="/">STARTSEITE</a></li>
    <li><a href="/uber-uns/">ÜBER UNS</a></li>
    <li><a href="/leistungen/">LEISTUNGEN</a></li>
    <li><a href="/academy/">ACADEMY</a></li>
    <li><a href="https://shop.beautybar-vanessaforster.de/" target="_blank" rel="noopener noreferrer">SHOP</a></li>
    <li><a href="/kontakt/">KONTAKT</a></li>
  </ul>
  <div class="mobile-nav__foot">
    <a href="https://beautinda.de/salon/L02VOFGFixKbHouJWl7j" target="_blank" rel="noopener noreferrer">
      TERMIN BUCHEN
    </a>
  </div>
</nav>`;

  /* ── Footer ── */
  var FOOTER_HTML = `
<footer class="site-footer">
  <div class="site-footer__main container container--lg">
    <div class="footer-brand">
      <a href="/">
        <img src="/public/logo-footer.png"
             alt="Beautybar Vanessa Forster" class="footer-brand__logo" width="160" height="70" />
      </a>
    </div>

    <div class="footer-col">
      <h3 class="footer-col__title">SOCIALS</h3>
      <ul>
        <li><a href="https://www.instagram.com/beautybar_vanessaforster/" target="_blank" rel="noopener noreferrer">Instagram</a></li>
        <li><a href="https://wa.me/4917622314868" target="_blank" rel="noopener noreferrer">WhatsApp</a></li>
        <li><a href="https://www.tiktok.com/@beautybar_vanessa" target="_blank" rel="noopener noreferrer">TikTok</a></li>
      </ul>
    </div>

    <div class="footer-col">
      <h3 class="footer-col__title">BEAUTYBAR</h3>
      <ul>
        <li><a href="https://info.beautybar-vanessaforster.de/" target="_blank" rel="noopener noreferrer">Beautybar Infoseite</a></li>
        <li><a href="https://shop.beautybar-vanessaforster.de/" target="_blank" rel="noopener noreferrer">Beautybar Shop</a></li>
        <li><a href="/academy/">Beautybar Academy</a></li>
      </ul>
    </div>

    <div class="footer-col">
      <h3 class="footer-col__title">SEITEN</h3>
      <ul>
        <li><a href="/uber-uns/">Über uns</a></li>
        <li><a href="/leistungen/">Leistungen</a></li>
        <li><a href="/kontakt/">Kontakt</a></li>
      </ul>
    </div>

    <div class="footer-col">
      <h3 class="footer-col__title">KONTAKT</h3>
      <address class="footer-contact">
        <p>Bahnhofstraße 9<br />86368 Gersthofen</p>
        <a href="tel:+4917622314868">+49 176 22314868</a>
        <a href="/kontakt/">Kontakt</a>
      </address>
    </div>
  </div>

  <div class="site-footer__bottom">
    <div class="site-footer__bottom-inner container container--lg">
      <p class="site-footer__copy">
        Copyright &copy; <span id="footer-year"></span> – Alle Rechte vorbehalten
      </p>
      <nav class="site-footer__legal">
        <a href="/impressum/">Impressum</a>
        <a href="/datenschutz/">Datenschutz</a>
        <a href="/kontakt/">AGBs</a>
      </nav>
    </div>
  </div>

  <nav class="quick-bar">
    <a href="/leistungen/">BEHANDLUNGEN</a>
    <a href="https://shop.beautybar-vanessaforster.de/" target="_blank" rel="noopener noreferrer">ONLINE SHOP</a>
    <a href="/academy/">ACADEMY</a>
    <a href="https://info.beautybar-vanessaforster.de/" target="_blank" rel="noopener noreferrer">INFOS</a>
  </nav>
</footer>`;

  /* ── Inject ── */
  var hp = document.getElementById('header-placeholder');
  if (hp) hp.innerHTML = HEADER_HTML;

  var fp = document.getElementById('footer-placeholder');
  if (fp) fp.innerHTML = FOOTER_HTML;

  var yr = document.getElementById('footer-year');
  if (yr) yr.textContent = new Date().getFullYear();

})();
