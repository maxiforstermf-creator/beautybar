/* ============================================================
   BEAUTYBAR – partials.js
   Injiziert Header und Footer direkt – funktioniert ohne Server.
   Muss VOR main.js geladen werden.
   ============================================================ */

(function () {

  /* Basis-Pfad aus der eigenen <script src="...">-URL ableiten, statt
     hart "/" anzunehmen. Läuft die Seite unter einer Domain-Wurzel
     (z.B. die künftige eigene Domain), ist basePath leer und "/uber-uns/"
     bleibt wie gewohnt. Läuft sie unter einem Unterpfad (GitHub Pages
     Projekt-Seite "/beautybar/", Netlify-Preview-Unterordner etc.), wird
     dieser Unterpfad automatisch mit eingerechnet – dieselbe HEADER_HTML/
     FOOTER_HTML funktioniert dadurch überall, ohne Kopien pro Seite. */
  var scriptSrc = (document.currentScript && document.currentScript.src) || '';
  var basePath = scriptSrc.replace(/\/js\/partials\.js(\?.*)?$/, '');

  /* Nur auf der Academy-Seite zeigt der Header das gestapelte Logo mit
     "Aesthetic & Academy"-Schriftzug (dieselbe Datei wie im Footer) statt
     des schmalen Standard-Logos – auf allen anderen Seiten unverändert. */
  var isAcademy = /\/academy\/?(?:index\.html)?$/.test(window.location.pathname);
  var headerLogoSrc = basePath + '/public/' + (isAcademy ? 'logo-schwarz-v2.png' : 'logo-header.png');
  var headerLogoClass = isAcademy ? ' nav-logo--stacked' : '';
  var headerLogoAlt = isAcademy ? 'Beautybar Vanessa Forster – Aesthetic & Academy' : 'Beautybar Vanessa Forster';

  /* ── Header ── */
  var HEADER_HTML = `
<header class="site-header" id="site-header">
  <div class="site-header__inner">
    <a href="${basePath}/" class="site-header__logo${headerLogoClass}" aria-label="Beautybar Vanessa Forster – Startseite">
      <img src="${headerLogoSrc}"
           alt="${headerLogoAlt}" width="140" height="60" />
    </a>
    <nav class="site-header__nav" aria-label="Hauptnavigation">
      <a href="${basePath}/">STARTSEITE</a>
      <a href="${basePath}/uber-uns/">ÜBER UNS</a>
      <a href="${basePath}/leistungen/">LEISTUNGEN</a>
      <a href="${basePath}/academy/">ACADEMY</a>
      <a href="https://shop.beautybar-vanessaforster.de/" target="_blank" rel="noopener noreferrer">SHOP</a>
      <a href="${basePath}/kontakt/">KONTAKT</a>
    </nav>
    <div class="site-header__actions">
      <a href="${basePath}/leistungen/" class="site-header__cta">BEHANDLUNGEN</a>
      <button class="hamburger" aria-label="Menü öffnen" aria-expanded="false" aria-controls="mobileNav">
        <span></span><span></span><span></span>
      </button>
    </div>
  </div>
</header>

<div class="mobile-overlay" id="mobileOverlay" aria-hidden="true"></div>

<nav class="mobile-nav" id="mobileNav" aria-label="Mobile Navigation" aria-hidden="true">
  <div class="mobile-nav__head${headerLogoClass}">
    <img src="${headerLogoSrc}"
         alt="${headerLogoAlt}" width="120" height="50" />
    <button class="mobile-nav__close" aria-label="Menü schließen">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
           stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
      </svg>
    </button>
  </div>
  <ul class="mobile-nav__links">
    <li><a href="${basePath}/">STARTSEITE</a></li>
    <li><a href="${basePath}/uber-uns/">ÜBER UNS</a></li>
    <li><a href="${basePath}/leistungen/">LEISTUNGEN</a></li>
    <li><a href="${basePath}/academy/">ACADEMY</a></li>
    <li><a href="https://shop.beautybar-vanessaforster.de/" target="_blank" rel="noopener noreferrer">SHOP</a></li>
    <li><a href="${basePath}/kontakt/">KONTAKT</a></li>
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
      <a href="${basePath}/">
        <img src="${basePath}/public/logo-schwarz-v2.png"
             alt="Beautybar Vanessa Forster" class="footer-brand__logo" width="160" height="70" />
      </a>
    </div>

    <div class="footer-col">
      <h3 class="footer-col__title">SOCIALS</h3>
      <ul>
        <li><a href="https://www.instagram.com/vanessaforster.aesthetics/" target="_blank" rel="noopener noreferrer">Instagram</a></li>
        <li><a href="https://wa.me/4917622314868" target="_blank" rel="noopener noreferrer">WhatsApp</a></li>
        <li><a href="https://www.tiktok.com/@vanessaforster.aesthetic" target="_blank" rel="noopener noreferrer">TikTok</a></li>
      </ul>
    </div>

    <div class="footer-col">
      <h3 class="footer-col__title">BEAUTYBAR</h3>
      <ul>
        <li><a href="https://info.beautybar-vanessaforster.de/" target="_blank" rel="noopener noreferrer">Beautybar Infoseite</a></li>
        <li><a href="https://shop.beautybar-vanessaforster.de/" target="_blank" rel="noopener noreferrer">Beautybar Shop</a></li>
        <li><a href="${basePath}/academy/">Beautybar Academy</a></li>
      </ul>
    </div>

    <div class="footer-col">
      <h3 class="footer-col__title">SEITEN</h3>
      <ul>
        <li><a href="${basePath}/uber-uns/">Über uns</a></li>
        <li><a href="${basePath}/leistungen/">Leistungen</a></li>
        <li><a href="${basePath}/kontakt/">Kontakt</a></li>
      </ul>
    </div>

    <div class="footer-col">
      <h3 class="footer-col__title">KONTAKT</h3>
      <address class="footer-contact">
        <p>Bahnhofstraße 9<br />86368 Gersthofen</p>
        <a href="tel:+4917622314868">+49 176 22314868</a>
        <a href="${basePath}/kontakt/">Kontakt</a>
      </address>
    </div>
  </div>

  <div class="site-footer__bottom">
    <div class="site-footer__bottom-inner container container--lg">
      <p class="site-footer__copy">
        Copyright &copy; <span id="footer-year"></span> – Alle Rechte vorbehalten
      </p>
      <nav class="site-footer__legal">
        <a href="${basePath}/impressum/">Impressum</a>
        <a href="${basePath}/datenschutz/">Datenschutz</a>
        <a href="${basePath}/kontakt/">AGBs</a>
      </nav>
    </div>
  </div>

  <nav class="quick-bar">
    <a href="${basePath}/leistungen/">BEHANDLUNGEN</a>
    <a href="https://shop.beautybar-vanessaforster.de/" target="_blank" rel="noopener noreferrer">ONLINE SHOP</a>
    <a href="${basePath}/academy/">ACADEMY</a>
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
