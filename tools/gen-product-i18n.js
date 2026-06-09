/*
 * JC Lightning — localized SKU product-page generator.
 * Reads tools/product-i18n-data.js and renders products/<lang>/<slug>.html
 * for every SKU that has content for that language. Structure mirrors the
 * English SKU pages exactly; only text + URLs differ.
 *
 * Usage:  node gen-product-i18n.js [es|pt|fr]   (no arg = all languages with data)
 * hreflang wiring + sitemap are handled by separate steps (kept out of here on purpose).
 */
const fs = require('fs');
const path = require('path');
const DATA = require('./product-i18n-data.js');
const ROOT = path.resolve(__dirname, '..');           // .../网站
const ORIGIN = 'https://jclightning.com';

function esc(s) { return String(s); } // content is authored as ready HTML/text; no escaping needed

function render(lang, sku) {
  const ui = DATA.ui[lang];
  const cat = DATA.categories[sku.cat][lang];          // {label, slug}
  const c = sku.content[lang];
  const selfUrl = `${ORIGIN}/products/${lang}/${c.slug}.html`;
  const imgUrl = `${ORIGIN}/${sku.img}`;
  const catUrl = `${ORIGIN}/products/${lang}/${cat.slug}.html`;
  const noCat = !!cat.noCatPage;
  const catCrumb = noCat ? cat.label : `<a href="${cat.slug}.html">${cat.label}</a>`;
  const catCtaHref = noCat ? '../../index.html#products' : `${cat.slug}.html`;
  const catCtaText = noCat ? ui.seeAll : ui.seeRange;
  const bcCat = noCat
    ? `{"@type":"ListItem","position":3,"name":${JSON.stringify(cat.label)}}`
    : `{"@type":"ListItem","position":3,"name":${JSON.stringify(cat.label)},"item":"${catUrl}"}`;
  const footMeta = c.footerMeta || 'CE &middot; RoHS &middot; LiFePO4';

  const specRows = c.specs.map(([k, v]) => `      <tr><th>${k}</th><td>${v}</td></tr>`).join('\n');
  const whyHtml = c.why.map(p => `    <p>${p}</p>`).join('\n');
  const introHtml = c.intro.map(p => `    <p>${p}</p>`).join('\n');
  const relHtml = c.related.map(([slug, rc, name]) =>
    `    <a class="rel-card" href="${slug}.html"><span class="rc-cat">${rc}</span><h4>${name}</h4></a>`).join('\n');
  const jsonProps = c.specs.map(([k, v]) =>
    `{"@type":"PropertyValue","name":${JSON.stringify(k)},"value":${JSON.stringify(String(v).replace(/&[a-z]+;/g,' '))}}`).join(',');

  return `<!DOCTYPE html>
<html lang="${lang}">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="theme-color" content="#12100e">
<title>${c.title}</title>
<meta name="description" content="${c.metaDesc}">
<meta name="keywords" content="${c.keywords}">
<meta name="robots" content="index, follow">
<meta name="author" content="JC Lightning">
<link rel="canonical" href="${selfUrl}">
<meta property="og:type" content="product">
<meta property="og:title" content="${c.ogTitle}">
<meta property="og:description" content="${c.ogDesc}">
<meta property="og:url" content="${selfUrl}">
<meta property="og:image" content="${imgUrl}">
<meta property="og:site_name" content="JC Lightning">
<meta property="og:locale" content="${ui.ogLocale}">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${c.name}">
<meta name="twitter:description" content="${c.twDesc}">
<meta name="twitter:image" content="${imgUrl}">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Outfit:wght@300;400;500;600;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="../../insights/article.css">
<script type="application/ld+json">
{"@context":"https://schema.org","@type":"Product","name":${JSON.stringify(c.name)},"image":"${imgUrl}","description":${JSON.stringify(c.schemaDesc)},"brand":{"@type":"Brand","name":"JC Lightning"},"manufacturer":{"@type":"Organization","name":"JC Lightning","url":"https://jclightning.com/"},"category":${JSON.stringify(cat.label)},"additionalProperty":[${jsonProps}]}
</script>
<script type="application/ld+json">
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":${JSON.stringify(ui.home)},"item":"https://jclightning.com/"},{"@type":"ListItem","position":2,"name":${JSON.stringify(ui.products)},"item":"https://jclightning.com/#products"},${bcCat},{"@type":"ListItem","position":4,"name":${JSON.stringify(c.name)}}]}
</script>
</head>
<body>
<a class="skip" href="#main">${ui.skip}</a>
<header class="site-hd"><div class="site-hd-in">
  <a class="brand" href="../../index.html">JC <em>Lightning</em></a>
  <nav class="hd-nav" aria-label="${ui.navAria}">
    <a href="../../index.html#products">${ui.products}</a>
    <a href="../../index.html#insights">Insights</a>
    <a class="hd-cta" href="../../index.html#contact">${ui.quote}</a>
  </nav>
</div></header>
<nav class="crumb" aria-label="${ui.crumbAria}">
  <a href="../../index.html">${ui.home}</a> &rsaquo; <a href="../../index.html#products">${ui.products}</a> &rsaquo; ${catCrumb} &rsaquo; <span>${c.name}</span>
</nav>
<main id="main">
<article class="wrap">
  <header class="art-head">
    <span class="cat">${cat.label}${c.badge ? ' &middot; ' + c.badge : ''}</span>
    <h1>${c.name}</h1>
    <p class="dek">${c.dek}</p>
    <div class="byline"><span><b>JC Lightning</b> &middot; ${ui.factory}</span><span>&middot;</span><span>CE + RoHS</span><span>&middot;</span><span>OEM / ODM</span></div>
  </header>
  <figure class="hero-fig">
    <img src="../../${sku.img}" alt="${c.alt}" loading="eager" width="1200" height="675">
    <figcaption>${c.figcaption}</figcaption>
  </figure>
  <div class="art-body">
${introHtml}

    <h2>${ui.specsH}</h2>
    <table class="spec-table">
${specRows}
    </table>
    <a class="spec-cta" href="../../index.html#contact">${ui.specCta} &rarr;</a>

    <h2>${ui.whyH}</h2>
${whyHtml}

    <div class="bottom-line"><b>${ui.builtFor}</b>${c.bottomLine}</div>
  </div>
</article>
<section class="cta">
  <h2>${ui.ctaH}</h2>
  <p>${ui.ctaP}</p>
  <div class="cta-row"><a class="btn btn-primary" href="../../index.html#contact">${ui.quote}</a><a class="btn btn-ghost" href="${catCtaHref}">${catCtaText}</a></div>
</section>
<section class="related">
  <h3>${ui.relatedH}</h3>
  <div class="rel-grid">
${relHtml}
  </div>
</section>
</main>
<footer class="site-ft">
  <a class="brand" href="../../index.html">JC <em>Lightning</em></a>
  <div>${ui.footerTag} &middot; Shenzhen, China &middot; <a href="../../index.html#contact">${ui.contact}</a></div>
  <div class="ft-meta">&copy; 2026 JC Lightning Technology Co., Ltd. &middot; ${footMeta}</div>
</footer>
</body>
</html>
`;
}

const langs = process.argv[2] ? [process.argv[2]] : ['es', 'pt', 'fr'];
let total = 0;
for (const lang of langs) {
  if (!DATA.ui[lang]) { console.log(`(no ui for ${lang}, skip)`); continue; }
  const dir = path.join(ROOT, 'products', lang);
  fs.mkdirSync(dir, { recursive: true });
  let n = 0;
  for (const sku of DATA.skus) {
    if (!sku.content || !sku.content[lang]) continue;
    const html = render(lang, sku);
    fs.writeFileSync(path.join(dir, sku.content[lang].slug + '.html'), html, 'utf8');
    n++; total++;
  }
  console.log(`${lang}: generated ${n} pages`);
}
console.log(`total generated: ${total}`);
