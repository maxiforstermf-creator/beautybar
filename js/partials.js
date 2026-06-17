/* ============================================================
   BEAUTYBAR – partials.js
   Injiziert Header und Footer direkt – funktioniert ohne Server.
   Muss VOR main.js geladen werden.
   ============================================================ */

(function () {

  /* ── Header ── */
  const HEADER_HTML = `
<header class="site-header" id="site-header">
  <div class="site-header__inner">
    <a href="index.html" class="site-header__logo" aria-label="Beautybar Vanessa Forster – Startseite">
      <img src="public/logo-schwarz.png" alt="Beautybar Vanessa Forster" width="120" height="60" />
    </a>
    <nav class="site-header__nav" aria-label="Hauptnavigation">
      <a href="index.html">Startseite</a>
      <a href="uber-mich.html">Über mich</a>
      <a href="leistungen.html">Leistungen</a>
      <a href="academy.html">Academy</a>
      <a href="shop.html">Shop</a>
      <a href="kontakt.html">Kontakt</a>
    </nav>
    <div class="site-header__actions">
      <a href="https://beautinda.de/salon/L02VOFGFixKbHouJWl7j"
         target="_blank" rel="noopener noreferrer"
         class="site-header__cta">Termin buchen</a>
      <button class="hamburger" aria-label="Menü öffnen" aria-expanded="false" aria-controls="mobileNav">
        <span></span><span></span><span></span>
      </button>
    </div>
  </div>
</header>

<div class="mobile-overlay" id="mobileOverlay" aria-hidden="true"></div>

<nav class="mobile-nav" id="mobileNav" aria-label="Mobile Navigation" aria-hidden="true">
  <div class="mobile-nav__head">
    <img src="public/logo-schwarz.png" alt="Beautybar Vanessa Forster" width="100" height="50" />
    <button class="mobile-nav__close" aria-label="Menü schließen">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
           stroke="currentColor" stroke-width="2"
           stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
      </svg>
    </button>
  </div>
  <ul class="mobile-nav__links">
    <li><a href="index.html">Startseite</a></li>
    <li><a href="uber-mich.html">Über mich</a></li>
    <li><a href="leistungen.html">Leistungen</a></li>
    <li><a href="academy.html">Academy</a></li>
    <li><a href="shop.html">Shop</a></li>
    <li><a href="kontakt.html">Kontakt</a></li>
  </ul>
  <div class="mobile-nav__foot">
    <a href="https://beautinda.de/salon/L02VOFGFixKbHouJWl7j"
       target="_blank" rel="noopener noreferrer">Termin buchen</a>
  </div>
</nav>`;

  /* ── Footer ── */
  const FOOTER_HTML = `
<footer class="site-footer">
  <div class="site-footer__main">

    <div class="footer-brand">
      <a href="index.html">
        <img src="public/logo-schwarz.png" alt="Beautybar Vanessa Forster"
             class="footer-brand__logo" width="140" height="70" />
      </a>
      <p class="footer-brand__desc">
        Dein Premium-Kosmetikstudio in Gersthofen bei Augsburg.
        Individuelle Behandlungen für natürliche Schönheit.
      </p>
      <div class="footer-social">
        <a href="https://www.instagram.com/beautybar_vanessaforster"
           target="_blank" rel="noopener noreferrer" aria-label="Instagram">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
               stroke="currentColor" stroke-width="1.5"
               stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
            <circle cx="12" cy="12" r="4"/>
            <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor"/>
          </svg>
        </a>
        <a href="https://www.tiktok.com/@beautybar_vanessa"
           target="_blank" rel="noopener noreferrer" aria-label="TikTok">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.76a4.85 4.85 0 0 1-1.01-.07z"/>
          </svg>
        </a>
        <a href="https://wa.me/4917622314868"
           target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
            <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.555 4.117 1.527 5.845L.057 23.428a.5.5 0 0 0 .617.601l5.688-1.49A11.94 11.94 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22a9.94 9.94 0 0 1-5.065-1.381l-.362-.215-3.756.984.999-3.65-.236-.376A9.944 9.944 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
          </svg>
        </a>
      </div>
    </div>

    <div class="footer-col">
      <h3 class="footer-col__title">Navigation</h3>
      <ul>
        <li><a href="index.html">Startseite</a></li>
        <li><a href="uber-mich.html">Über mich</a></li>
        <li><a href="leistungen.html">Leistungen</a></li>
        <li><a href="academy.html">Academy</a></li>
        <li><a href="shop.html">Shop</a></li>
        <li><a href="kontakt.html">Kontakt</a></li>
      </ul>
    </div>

    <div class="footer-col">
      <h3 class="footer-col__title">Kontakt</h3>
      <address class="footer-contact">
        <p>Bahnhofstraße 9<br />86368 Gersthofen</p>
        <a href="tel:+4917622314868">+49 176 22314868</a>
        <a href="mailto:info@beautybar-vanessaforster.de">info@beautybar-vanessaforster.de</a>
      </address>
      <div class="footer-hours">
        <h4 class="footer-hours__title">Öffnungszeiten</h4>
        <p>Mo–Fr 09–18 Uhr · Sa 09–15 Uhr</p>
      </div>
    </div>

  </div>
  <div class="site-footer__bottom">
    <div class="site-footer__bottom-inner">
      <p class="site-footer__copy">
        &copy; <span id="footer-year"></span> Beautybar Vanessa Forster. Alle Rechte vorbehalten.
      </p>
      <nav class="site-footer__legal" aria-label="Rechtliches">
        <a href="impressum.html">Impressum</a>
        <a href="datenschutz.html">Datenschutz</a>
      </nav>
    </div>
  </div>
</footer>`;

  /* ── Inject ── */
  var hp = document.getElementById('header-placeholder');
  if (hp) hp.innerHTML = HEADER_HTML;

  var fp = document.getElementById('footer-placeholder');
  if (fp) fp.innerHTML = FOOTER_HTML;

  var yr = document.getElementById('footer-year');
  if (yr) yr.textContent = new Date().getFullYear();

})();
