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
      <p class="site-footer__copy">
        Copyright &copy; <span id="footer-year"></span> – Alle Rechte vorbehalten
      </p>
    </div>

    <div class="footer-col">
      <h3 class="footer-col__title">SOCIALS</h3>
      <div class="footer-social">
        <a href="https://www.instagram.com/vanessaforster.aesthetics/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="20" height="20" aria-hidden="true">
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
          </svg>
        </a>
        <a href="https://wa.me/4917622314868" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
          <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20" aria-hidden="true">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
            <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.555 4.117 1.527 5.845L.057 23.428a.5.5 0 0 0 .617.601l5.688-1.49A11.94 11.94 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22a9.94 9.94 0 0 1-5.065-1.381l-.362-.215-3.756.984.999-3.65-.236-.376A9.944 9.944 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
          </svg>
        </a>
        <a href="https://www.tiktok.com/@vanessaforster.aesthetic" target="_blank" rel="noopener noreferrer" aria-label="TikTok">
          <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20" aria-hidden="true">
            <path d="M16.6 5.82s.51.5 0 0A4.278 4.278 0 0 1 15.54 3h-3.09v12.4a2.592 2.592 0 0 1-2.59 2.5c-1.42 0-2.6-1.16-2.6-2.6 0-1.72 1.66-3.01 3.37-2.48V9.66c-3.45-.46-6.47 2.22-6.47 5.64 0 3.33 2.76 5.7 5.69 5.7 3.14 0 5.69-2.55 5.69-5.7V9.01a7.35 7.35 0 0 0 4.31 1.38V7.3s-1.88.09-3.25-1.48z"/>
          </svg>
        </a>
      </div>
    </div>

    <div class="footer-col">
      <h3 class="footer-col__title">BEAUTYBAR</h3>
      <ul>
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
        <li><a href="${basePath}/impressum/">Impressum</a></li>
        <li><a href="${basePath}/datenschutz/">Datenschutz</a></li>
        <li><a href="${basePath}/kontakt/">AGBs</a></li>
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

  <nav class="quick-bar">
    <a href="${basePath}/leistungen/">BEHANDLUNGEN</a>
    <a href="https://shop.beautybar-vanessaforster.de/" target="_blank" rel="noopener noreferrer">ONLINE SHOP</a>
    <a href="${basePath}/academy/">ACADEMY</a>
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
