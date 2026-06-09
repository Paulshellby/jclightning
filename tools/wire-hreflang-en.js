/* Insert the 5-way hreflang cluster (en/es/pt/fr + x-default) into the 30 English SKU pages,
   right after their <link rel="canonical">. Idempotent. Run: node wire-hreflang-en.js */
const fs = require('fs');
const path = require('path');
const DATA = require('./product-i18n-data.js');
const EN_SLUG = require('./en-slugs.js');
const PRODDIR = path.resolve(__dirname, '..', 'products');
const ORIGIN = 'https://jclightning.com';
const byKey = {}; DATA.skus.forEach(s => byKey[s.key] = s);

let done = 0, skip = 0, miss = 0;
for (const key of Object.keys(EN_SLUG)) {
  const enSlug = EN_SLUG[key];
  const fp = path.join(PRODDIR, enSlug + '.html');
  if (!fs.existsSync(fp)) { console.log('MISSING EN page: ' + enSlug); miss++; continue; }
  let html = fs.readFileSync(fp, 'utf8');
  if (html.includes('rel="alternate" hreflang=')) { skip++; continue; } // already wired
  const s = byKey[key];
  const lines = [
    `<link rel="alternate" hreflang="en" href="${ORIGIN}/products/${enSlug}.html">`,
    s.content.es ? `<link rel="alternate" hreflang="es" href="${ORIGIN}/products/es/${s.content.es.slug}.html">` : '',
    s.content.pt ? `<link rel="alternate" hreflang="pt" href="${ORIGIN}/products/pt/${s.content.pt.slug}.html">` : '',
    s.content.fr ? `<link rel="alternate" hreflang="fr" href="${ORIGIN}/products/fr/${s.content.fr.slug}.html">` : '',
    `<link rel="alternate" hreflang="x-default" href="${ORIGIN}/products/${enSlug}.html">`,
  ].filter(Boolean).join('\n');
  const canonRe = /(<link rel="canonical" href="[^"]+">)/;
  if (!canonRe.test(html)) { console.log('NO canonical: ' + enSlug); miss++; continue; }
  html = html.replace(canonRe, '$1\n' + lines);
  fs.writeFileSync(fp, html, 'utf8');
  done++;
}
console.log(`EN hreflang: wired=${done} skipped(already)=${skip} missing=${miss}`);
