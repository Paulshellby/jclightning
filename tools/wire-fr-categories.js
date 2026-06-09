/* One-off: wire the 4 FR category pages' "What's in this range" grid to the FR SKU pages.
   Reads merged data (fr slug + name), uses a curated chip per SKU. Run: node wire-fr-categories.js */
const fs = require('fs');
const path = require('path');
const DATA = require('./product-i18n-data.js');
const FRDIR = path.resolve(__dirname, '..', 'products', 'fr');

const chip = {
  p1:'2 500–3 500 lm · IP65 · PIR 270°', p9:'100/200/300W · IP66 · radar', p27:'30/60/100W · IP66 · radar',
  p7:'30W · 2 400 lm · IP66', p2:'800 lm · IP65 · double PIR', p10:'2×3W · IP65 · aluminium',
  p25:'6 LED · IP66 · 500m+', p26:'8W · 600 lm · IP65',
  p28:'10W · 800 lm · IP65 · 1–2m', p8:'5W · 400 lm · 360° rotatif', p6:'1,2W · IP65 · lot 8',
  p4:'E27 · IP44 · solaire/secteur', p11:'40/60 LED · IP65 · 30m', p19:'120cm · IP67 · 96 LED',
  p20:'100/200 LED · IP44 · 8 modes', p21:'chaud + RGB · IP44 · télécommande', p22:'24W · 1800 lm · IP65',
  p29:'RGB 16 couleurs · IP68',
  p15:'400 lm · USB · coupures', p16:'E27/B22 · auto · 4–6h', p17:'panneau 10W · 2 ampoules · USB',
  p18:'48&quot; · 12V CC · 900 lm', p13:'5W · 4000mAh · 15h+ · USB', p24:'COB · USB-C PD 18W · 8000mAh',
  p23:'10/20/30W · 3000 lm · IP65', p14:'UV-LED · IP65 · 100–200m²', p30:'150/200W · USB-C · sans installation',
};
// category -> file slug + ordered SKU keys
const cats = {
  'cat-security':   { file:'lampes-solaires-securite-voirie',     order:['p1','p9','p27','p7','p2','p10','p25','p26'] },
  'cat-garden':     { file:'lampes-solaires-jardin-paysage',      order:['p28','p8','p6'] },
  'cat-decorative': { file:'lampes-solaires-decoratives-murales', order:['p4','p11','p19','p20','p21','p22','p29'] },
  'cat-offgrid':    { file:'lampes-solaires-autonomes-portables', order:['p15','p16','p17','p18','p13','p24','p23','p14','p30'] },
};
const byKey = {}; DATA.skus.forEach(s => byKey[s.key] = s);

const gridRe = /<div class="rel-grid">\s*(?:<a class="rel-card" href="\.\.\/\.\.\/index\.html#products">[\s\S]*?<\/a>\s*)+<\/div>/;

let done = 0;
for (const [cat, cfg] of Object.entries(cats)) {
  const cards = cfg.order.map(k => {
    const fr = byKey[k].content.fr;
    return `      <a class="rel-card" href="${fr.slug}.html"><span class="rc-cat">${chip[k]}</span><h4>${fr.name}</h4></a>`;
  }).join('\n');
  const grid = `<div class="rel-grid">\n${cards}\n    </div>`;
  const fp = path.join(FRDIR, cfg.file + '.html');
  let html = fs.readFileSync(fp, 'utf8');
  if (!gridRe.test(html)) { console.log('SKIP (no #products grid): ' + cfg.file); continue; }
  html = html.replace(gridRe, grid);
  fs.writeFileSync(fp, html, 'utf8');
  done++; console.log('OK ' + cfg.file + ' (' + cfg.order.length + ' cards)');
}
console.log('wired: ' + done + '/4');
