/* ============================================================
   Schreibt Header und Footer aus js/partials.js als statisches HTML
   in alle Seiten mit #header-placeholder / #footer-placeholder.

   Warum: Suchmaschinen sehen Navigation, interne Links sowie Adresse
   und Telefonnummer dann direkt im HTML, ohne JavaScript ausführen zu
   müssen. partials.js erkennt das vorhandene Markup und setzt es nicht
   erneut ein.

   Nach jeder Änderung an HEADER_HTML/FOOTER_HTML in js/partials.js:
     node tools/prerender-partials.js
   ============================================================ */
'use strict';

const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.resolve(__dirname, '..');
const source = fs.readFileSync(path.join(ROOT, 'js', 'partials.js'), 'utf8');

let partials;
const sandbox = {
  window: { __PRERENDER__: (p) => { partials = p; } },
  // basePath wird aus der Script-URL abgeleitet → '' = Links ab Domain-Wurzel
  document: { currentScript: { src: '/js/partials.js' } },
};
vm.runInNewContext(source, sandbox);
if (!partials) throw new Error('partials.js hat keine Templates geliefert');

const year = String(new Date().getFullYear());
const footer = partials.footer.replace('<span id="footer-year"></span>', `<span id="footer-year">${year}</span>`);

function inject(html, id, name, markup) {
  const filled = new RegExp(`(<div id="${id}">)<!--partial:${name}-->[\\s\\S]*?<!--/partial:${name}-->(</div>)`);
  const block = `<!--partial:${name}-->${markup}\n<!--/partial:${name}-->`;
  if (filled.test(html)) return html.replace(filled, `$1${block}$2`);
  return html.replace(`<div id="${id}"></div>`, `<div id="${id}">${block}</div>`);
}

const pages = [path.join(ROOT, 'index.html')];
for (const entry of fs.readdirSync(ROOT, { withFileTypes: true })) {
  const file = path.join(ROOT, entry.name, 'index.html');
  if (entry.isDirectory() && fs.existsSync(file)) pages.push(file);
}

for (const file of pages) {
  const html = fs.readFileSync(file, 'utf8');
  if (!html.includes('id="header-placeholder"')) continue;
  const out = inject(inject(html, 'header-placeholder', 'header', partials.header), 'footer-placeholder', 'footer', footer);
  if (out !== html) fs.writeFileSync(file, out);
  console.log(path.relative(ROOT, file));
}
