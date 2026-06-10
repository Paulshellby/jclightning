// One-off: tighten es/pt/fr <meta name="description"> to <=160, front-loaded.
// SKU descriptions -> patch data files (source of truth), then regenerate.
// Category descriptions -> edit the 4x3 standalone category HTML directly.
// French apostrophes use U+2019 (') so they are safe inside single-quoted JS strings.
const fs = require('fs'), path = require('path');
const ROOT = path.resolve(__dirname, '..');
const data = require('./product-i18n-data.js');
const ptmod = require('./product-i18n-pt.js');
const frmod = require('./product-i18n-fr.js');

const ES = {
p1:"Foco solar de movimiento de 3 cabezales, 2500-3500 lm, IP65, PIR 270°, LiFePO4. Seguridad perimetral de amplia cobertura. CE + RoHS, OEM, FOB Shenzhen.",
p2:"Aplique solar PIR antivandálico, 800 lm, IP65, doble PIR 8-12 m, LiFePO4 4000mAh. Para muros perimetrales y recintos. CE + RoHS, OEM, FOB Shenzhen.",
p7:"Foco solar de seguridad 30W, 2400 lm, IP66, PIR 270°, -20 a +50°C. Grado industrial para almacenes y granjas. CE + RoHS, OEM, FOB Shenzhen.",
p10:"Aplique solar arriba-abajo, 2x3W, IP65, aluminio, 3000K blanco cálido. Luz de fachada y entrada arquitectónica. CE + RoHS, OEM, FOB Shenzhen.",
p9:"Farola solar todo en uno, 100/200/300W, IP66, sensor radar, LiFePO4. Vías, parques y recintos sin red. CE + RoHS, OEM, FOB Shenzhen.",
p27:"Farola solar separada, 30/60/100W, 3000-10000 lm, IP66, sensor radar. Panel aparte para vías con sombra. CE + RoHS, OEM, FOB Shenzhen.",
p25:"Baliza solar de advertencia, visibilidad 500m+, IP66, LiFePO4. Señalización de seguridad vial, marina y de obra. CE + RoHS, OEM, FOB Shenzhen.",
p26:"Luz solar para asta de bandera, 8W, 600 lm, 6500K, IP65, LiFePO4. Ilumina la bandera de noche, sin cables. CE + RoHS, OEM, FOB Shenzhen.",
p28:"Columna solar de patio, 1-2 m, 10W, 800 lm, IP65, LiFePO4. Iluminación de pilares y senderos para jardines. CE + RoHS, OEM, FOB Shenzhen.",
p6:"Estacas solares de jardín, pack de 8, vidrio esmerilado, IP65, caja minorista. Senderos y bordes. CE + RoHS, OEM, FOB Shenzhen.",
p8:"Foco solar de jardín para clavar, 5W, 400 lm, cabezal giratorio 360°, IP65. Acentúa árboles y fachadas. CE + RoHS, OEM, FOB Shenzhen.",
p4:"Farol de pared exterior solar o AC, IP44, casquillo E27, acabados bronce/negro/cobre. Porche y entrada. CE + RoHS, OEM, FOB Shenzhen.",
p11:"Guirnalda solar Edison, 40/60 LED, IP65, 2700K cálido, hasta 30 m. Ambiente para patios y eventos, sin cables. CE + RoHS, OEM, FOB Shenzhen.",
p19:"Antorcha solar de llama, 120 cm, IP67, 96 LED parpadeantes, LiFePO4. Ambiente de llama danzante en jardines. CE + RoHS, OEM, FOB Shenzhen.",
p20:"Guirnalda solar de hilo de cobre, 100/200 LED, 2700K, 8 modos. Decoración flexible para jardines y eventos. CE + RoHS, OEM, FOB Shenzhen.",
p21:"Luz solar para sombrilla, 28/48/64 LED, blanco cálido + RGB, mando IR, IP44. Sombrillas y cenadores. CE + RoHS, OEM, FOB Shenzhen.",
p22:"Lámpara solar de pie exterior, 24W, 1800 lm, 3000K, IP65, LiFePO4. Luz ambiental para patios y cafés. CE + RoHS, OEM, FOB Shenzhen.",
p29:"Luz solar flotante para piscina, RGB 16 colores, IP68, mando IR. Flota en piscinas y estanques. CE + RoHS, OEM, FOB Shenzhen.",
p15:"Luz solar interior de panel separado, 400 lm, USB, lista para apagones. Luz interior con aspecto cableado. CE + RoHS, OEM, FOB Shenzhen.",
p16:"Bombilla LED solar de emergencia, E27/B22, se enciende sola en un apagón con batería integrada. CE + RoHS, OEM, FOB Shenzhen.",
p17:"Kit de iluminación solar para hogar, 2 luces, panel 10W, salida USB, caja minorista. Hogar y comercio sin red. CE + RoHS, OEM, FOB Shenzhen.",
p18:"Ventilador de techo solar con luz, 48 pulgadas, 12V DC, 12W LED, mando. Confort sin red para hogares. CE + RoHS, OEM, FOB Shenzhen.",
p13:"Linterna solar de camping portátil, 5W, 4000mAh, 15h+, power bank USB. Luz para acampada y emergencias. CE + RoHS, OEM, FOB Shenzhen.",
p14:"Lámpara solar antimosquitos UV-LED, 2W, IP65, cubre 100-200 m². Control de insectos sin químicos. CE + RoHS, OEM, FOB Shenzhen.",
p23:"Luz de trabajo solar portátil, 10/20/30W, 3000 lm, batería LiFePO4 extraíble. Iluminación inalámbrica de obra. CE + RoHS, OEM, FOB Shenzhen.",
p24:"Linterna solar power bank Pro, COB, USB-C PD 18W, 8000mAh LiFePO4, 400 lm, IP65. Carga rápida sin red. CE + RoHS, OEM, FOB Shenzhen.",
p30:"Luz de emergencia UFO recargable, 150/200W, USB-C, 3 temperaturas, colgar sin instalación. CE + RoHS, OEM. Para apagones. FOB Shenzhen.",
p31:"Foco LED de red AC, 50-1000W, IP65, 6500K, 30000h. Para fábricas, canchas y patios. CE + RoHS, OEM, FOB Shenzhen.",
p32:"Campana industrial UFO LED AC, 100-300W, IP65, haz 120°, 6500K. Para almacenes y fábricas. CE + RoHS, OEM, FOB Shenzhen.",
p33:"Farola LED de red AC, 50/100W, IP65, 6500K, para postes de 60mm, con fotocélula. Vías y parques. CE + RoHS, OEM, FOB Shenzhen.",
};

const PT = {
p1:"Foco solar de movimento de 3 cabeças, 2500-3500 lm, IP65, PIR 270°, LiFePO4. Segurança perimetral de ampla cobertura. CE + RoHS, OEM, FOB Shenzhen.",
p2:"Arandela solar PIR antivandalismo, 800 lm, IP65, duplo PIR 8-12 m, LiFePO4 4000mAh. Para muros e recintos. CE + RoHS, OEM, FOB Shenzhen.",
p7:"Foco solar de segurança 30W, 2400 lm, IP66, PIR 270°, -20 a +50°C. Nível industrial para armazéns e fazendas. CE + RoHS, OEM, FOB Shenzhen.",
p10:"Arandela solar cima-baixo, 2x3W, IP65, alumínio, 3000K branco quente. Luz de fachada e entrada. CE + RoHS, OEM, FOB Shenzhen.",
p9:"Poste solar tudo em um, 100/200/300W, IP66, sensor radar, LiFePO4. Vias, parques e recintos sem rede. CE + RoHS, OEM, FOB Shenzhen.",
p27:"Poste solar separado, 30/60/100W, 3000-10000 lm, IP66, sensor radar. Painel à parte para vias sombreadas. CE + RoHS, OEM, FOB Shenzhen.",
p25:"Baliza solar de aviso, visibilidade 500m+, IP66, LiFePO4. Sinalização de segurança viária, marítima e de obra. CE + RoHS, OEM, FOB Shenzhen.",
p26:"Luz solar para mastro de bandeira, 8W, 600 lm, 6500K, IP65, LiFePO4. Ilumina a bandeira à noite, sem fios. CE + RoHS, OEM, FOB Shenzhen.",
p28:"Coluna solar de pátio, 1-2 m, 10W, 800 lm, IP65, LiFePO4. Iluminação de pilares e caminhos para jardins. CE + RoHS, OEM, FOB Shenzhen.",
p6:"Estacas solares de jardim, pack de 8, vidro fosco, IP65, caixa de varejo. Caminhos e bordas. CE + RoHS, OEM, FOB Shenzhen.",
p8:"Foco solar de jardim de espeto, 5W, 400 lm, cabeça giratória 360°, IP65. Destaca árvores e fachadas. CE + RoHS, OEM, FOB Shenzhen.",
p4:"Lanterna de parede externa solar ou AC, IP44, soquete E27, acabamentos bronze/preto/cobre. Varanda e entrada. CE + RoHS, OEM, FOB Shenzhen.",
p11:"Cordão de luzes solar Edison, 40/60 LED, IP65, 2700K quente, até 30 m. Ambiente para pátios e eventos. CE + RoHS, OEM, FOB Shenzhen.",
p19:"Tocha solar de chama, 120 cm, IP67, 96 LED tremeluzentes, LiFePO4. Ambiente de chama dançante em jardins. CE + RoHS, OEM, FOB Shenzhen.",
p20:"Cordão solar de fio de cobre, 100/200 LED, 2700K, 8 modos. Decoração flexível para jardins e eventos. CE + RoHS, OEM, FOB Shenzhen.",
p21:"Luz solar para guarda-sol, 28/48/64 LED, branco quente + RGB, controle IR, IP44. Guarda-sóis e gazebos. CE + RoHS, OEM, FOB Shenzhen.",
p22:"Luminária solar de piso externa, 24W, 1800 lm, 3000K, IP65, LiFePO4. Luz ambiente para pátios e cafés. CE + RoHS, OEM, FOB Shenzhen.",
p29:"Luz solar flutuante para piscina, RGB 16 cores, IP68, controle IR. Flutua em piscinas e lagos. CE + RoHS, OEM, FOB Shenzhen.",
p15:"Luz solar interna de painel separado, 400 lm, USB, pronta para quedas de energia. Aspecto de luz com fios. CE + RoHS, OEM, FOB Shenzhen.",
p16:"Lâmpada LED solar de emergência, E27/B22, acende sozinha numa queda de energia, bateria integrada. CE + RoHS, OEM, FOB Shenzhen.",
p17:"Kit de iluminação solar residencial, 2 luzes, painel 10W, saída USB, caixa de varejo. Casa e comércio sem rede. CE + RoHS, OEM, FOB Shenzhen.",
p18:"Ventilador de teto solar com luz, 48 pol., 12V DC, 12W LED, controle. Conforto sem rede para casas. CE + RoHS, OEM, FOB Shenzhen.",
p13:"Lanterna solar de camping portátil, 5W, 4000mAh, 15h+, power bank USB. Luz para camping e emergências. CE + RoHS, OEM, FOB Shenzhen.",
p14:"Luz solar mata-insetos UV-LED, 2W, IP65, cobre 100-200 m². Controle de insetos sem químicos. CE + RoHS, OEM, FOB Shenzhen.",
p23:"Luz de trabalho solar portátil, 10/20/30W, 3000 lm, bateria LiFePO4 removível. Iluminação sem fios de obra. CE + RoHS, OEM, FOB Shenzhen.",
p24:"Lanterna solar power bank Pro, COB, USB-C PD 18W, 8000mAh LiFePO4, 400 lm, IP65. Carga rápida sem rede. CE + RoHS, OEM, FOB Shenzhen.",
p30:"Luz de emergência UFO recarregável, 150/200W, USB-C, 3 temperaturas, pendurar sem instalação. CE + RoHS, OEM. Para apagões. FOB Shenzhen.",
p31:"Refletor LED de rede AC, 50-1000W, IP65, 6500K, 30000h. Para fábricas, quadras e pátios. CE + RoHS, OEM, FOB Shenzhen.",
p32:"Luminária industrial UFO LED AC, 100-300W, IP65, facho 120°, 6500K. Para armazéns e fábricas. CE + RoHS, OEM, FOB Shenzhen.",
p33:"Poste de luz LED AC, 50/100W, IP65, 6500K, para postes de 60mm, com fotocélula. Vias e parques. CE + RoHS, OEM, FOB Shenzhen.",
};

const FR = {
p1:"Projecteur solaire à détection 3 têtes, 2500-3500 lm, IP65, PIR 270°, LiFePO4. Sécurité périmétrique large. CE + RoHS, OEM, FOB Shenzhen.",
p2:"Applique solaire PIR anti-vandalisme, 800 lm, IP65, double PIR 8-12 m, LiFePO4 4000mAh. Pour murs et enceintes. CE + RoHS, OEM, FOB Shenzhen.",
p7:"Projecteur solaire de sécurité 30W, 2400 lm, IP66, PIR 270°, -20 à +50°C. Niveau industriel, entrepôts et fermes. CE + RoHS, OEM, FOB Shenzhen.",
p10:"Applique solaire haut-bas, 2x3W, IP65, aluminium, 3000K blanc chaud. Lumière de façade et d’entrée. CE + RoHS, OEM, FOB Shenzhen.",
p9:"Lampadaire solaire tout-en-un, 100/200/300W, IP66, capteur radar, LiFePO4. Routes et parcs hors réseau. CE + RoHS, OEM, FOB Shenzhen.",
p27:"Lampadaire solaire séparé, 30/60/100W, 3000-10000 lm, IP66, capteur radar. Panneau déporté, routes ombragées. CE + RoHS, OEM, FOB Shenzhen.",
p25:"Balise solaire d’avertissement, visibilité 500m+, IP66, LiFePO4. Signalisation routière, maritime et de chantier. CE + RoHS, OEM, FOB Shenzhen.",
p26:"Lampe solaire pour mât de drapeau, 8W, 600 lm, 6500K, IP65, LiFePO4. Éclaire le drapeau la nuit, sans fil. CE + RoHS, OEM, FOB Shenzhen.",
p28:"Colonne solaire de cour, 1-2 m, 10W, 800 lm, IP65, LiFePO4. Éclairage de piliers et d’allées pour jardins. CE + RoHS, OEM, FOB Shenzhen.",
p6:"Piquets solaires de jardin, pack de 8, verre dépoli, IP65, boîte de vente. Allées et bordures. CE + RoHS, OEM, FOB Shenzhen.",
p8:"Projecteur solaire de jardin à piquet, 5W, 400 lm, tête rotative 360°, IP65. Met en valeur arbres et façades. CE + RoHS, OEM, FOB Shenzhen.",
p4:"Lanterne murale extérieure solaire ou AC, IP44, douille E27, finitions bronze/noir/cuivre. Porche et entrée. CE + RoHS, OEM, FOB Shenzhen.",
p11:"Guirlande solaire Edison, 40/60 LED, IP65, 2700K chaud, jusqu’à 30 m. Ambiance terrasses et événements. CE + RoHS, OEM, FOB Shenzhen.",
p19:"Torche solaire à flamme, 120 cm, IP67, 96 LED vacillantes, LiFePO4. Ambiance de flamme dansante au jardin. CE + RoHS, OEM, FOB Shenzhen.",
p20:"Guirlande solaire en fil de cuivre, 100/200 LED, 2700K, 8 modes. Décoration souple pour jardins et fêtes. CE + RoHS, OEM, FOB Shenzhen.",
p21:"Lampe solaire pour parasol, 28/48/64 LED, blanc chaud + RGB, télécommande IR, IP44. Parasols et gazebos. CE + RoHS, OEM, FOB Shenzhen.",
p22:"Lampadaire solaire sur pied, 24W, 1800 lm, 3000K, IP65, LiFePO4. Lumière d’ambiance pour terrasses. CE + RoHS, OEM, FOB Shenzhen.",
p29:"Lampe solaire flottante de piscine, RGB 16 couleurs, IP68, télécommande IR. Flotte sur piscines et bassins. CE + RoHS, OEM, FOB Shenzhen.",
p15:"Applique solaire intérieure à panneau séparé, 400 lm, USB, prête pour coupures. Allure d’éclairage filaire. CE + RoHS, OEM, FOB Shenzhen.",
p16:"Ampoule LED solaire de secours, E27/B22, s’allume seule lors d’une coupure, batterie intégrée. CE + RoHS, OEM, FOB Shenzhen.",
p17:"Kit d’éclairage solaire maison, 2 lampes, panneau 10W, sortie USB, boîte de vente. Maison et commerce hors réseau. CE + RoHS, OEM, FOB Shenzhen.",
p18:"Ventilateur de plafond solaire avec lumière, 48 po, 12V DC, 12W LED, télécommande. Confort hors réseau. CE + RoHS, OEM, FOB Shenzhen.",
p13:"Lanterne solaire de camping portable, 5W, 4000mAh, 15h+, power bank USB. Lumière camping et secours. CE + RoHS, OEM, FOB Shenzhen.",
p14:"Lampe solaire anti-moustiques UV-LED, 2W, IP65, couvre 100-200 m². Contrôle des insectes sans produits. CE + RoHS, OEM, FOB Shenzhen.",
p23:"Lampe de travail solaire portable, 10/20/30W, 3000 lm, batterie LiFePO4 amovible. Éclairage de chantier sans fil. CE + RoHS, OEM, FOB Shenzhen.",
p24:"Lanterne solaire power bank Pro, COB, USB-C PD 18W, 8000mAh LiFePO4, 400 lm, IP65. Charge rapide hors réseau. CE + RoHS, OEM, FOB Shenzhen.",
p30:"Lampe de secours UFO rechargeable, 150/200W, USB-C, 3 températures, à suspendre sans installation. CE + RoHS, OEM. Pour délestage. FOB Shenzhen.",
p31:"Projecteur LED secteur AC, 50-1000W, IP65, 6500K, 30000h. Pour usines, terrains et cours. CE + RoHS, OEM, FOB Shenzhen.",
p32:"Cloche industrielle UFO LED AC, 100-300W, IP65, faisceau 120°, 6500K. Pour entrepôts et usines. CE + RoHS, OEM, FOB Shenzhen.",
p33:"Lampadaire LED secteur AC, 50/100W, IP65, 6500K, pour mâts de 60mm, prêt photocellule. Routes et parcs. CE + RoHS, OEM, FOB Shenzhen.",
};

const CAT = {
'cat-security':{
 es:"Luces solares de seguridad y vías de fábrica en Shenzhen: focos PIR y farolas todo en uno. IP66, LiFePO4, OEM. CE + RoHS, FOB Shenzhen.",
 pt:"Luzes solares de segurança e vias de fábrica em Shenzhen: focos PIR e postes tudo em um. IP66, LiFePO4, OEM. CE + RoHS, FOB Shenzhen.",
 fr:"Lampes solaires de sécurité et voirie, usine de Shenzhen : projecteurs PIR et lampadaires tout-en-un. IP66, LiFePO4, OEM. CE + RoHS, FOB Shenzhen.",
},
'cat-garden':{
 es:"Luces solares de jardín y paisaje de fábrica: balizas, focos para clavar y columnas. IP65, LiFePO4, OEM. CE + RoHS, FOB Shenzhen.",
 pt:"Luzes solares de jardim e paisagem de fábrica: balizas, focos de espeto e colunas. IP65, LiFePO4, OEM. CE + RoHS, FOB Shenzhen.",
 fr:"Lampes solaires de jardin et paysage, usine de Shenzhen : balises, projecteurs à piquet et colonnes. IP65, LiFePO4, OEM. CE + RoHS, FOB Shenzhen.",
},
'cat-decorative':{
 es:"Luces solares decorativas de fábrica: guirnaldas, faroles de pared y antorchas de llama. Ambiente cálido. CE + RoHS, OEM, FOB Shenzhen.",
 pt:"Luzes solares decorativas de fábrica: cordões, lanternas de parede e tochas de chama. Ambiente quente. CE + RoHS, OEM, FOB Shenzhen.",
 fr:"Lampes solaires décoratives, usine de Shenzhen : guirlandes, lanternes murales et torches à flamme. Ambiance chaude. CE + RoHS, OEM, FOB Shenzhen.",
},
'cat-offgrid':{
 es:"Luces solares sin red y portátiles de fábrica: kits para hogar, linternas, luces de trabajo y de emergencia. CE + RoHS, OEM, FOB Shenzhen.",
 pt:"Luzes solares sem rede e portáteis de fábrica: kits residenciais, lanternas, luzes de trabalho e emergência. CE + RoHS, OEM, FOB Shenzhen.",
 fr:"Lampes solaires autonomes et portables, usine de Shenzhen : kits maison, lanternes, lampes de travail et de secours. CE + RoHS, OEM, FOB Shenzhen.",
},
};

// 1) length guard
let over = [];
for (const [name, m] of [['es',ES],['pt',PT],['fr',FR]])
  for (const k in m) if (m[k].length > 160) over.push(name+'/'+k+' ('+m[k].length+')');
for (const c in CAT) for (const l of ['es','pt','fr'])
  if (CAT[c][l].length > 160) over.push('cat '+l+'/'+c+' ('+CAT[c][l].length+')');
if (over.length) { console.log('ABORT - over 160:'); over.forEach(x=>console.log('  '+x)); process.exit(1); }
console.log('length guard OK. es max', Math.max(...Object.values(ES).map(s=>s.length)),
            '| pt max', Math.max(...Object.values(PT).map(s=>s.length)),
            '| fr max', Math.max(...Object.values(FR).map(s=>s.length)));

// 2) patch data files (SKU metaDesc) via delimiter-anchored literal replace
function patchData(file, pairs) {
  let t = fs.readFileSync(file, 'utf8'); const miss = [];
  for (const p of pairs) {
    const needle = "'" + p.old + "'", repl = "'" + p.new + "'";
    if (!t.includes(needle)) { miss.push(p.key); continue; }
    t = t.split(needle).join(repl);
  }
  fs.writeFileSync(file, t, 'utf8'); return miss;
}
const esPairs = data.skus.filter(s=>ES[s.key]).map(s=>({key:s.key, old:s.content.es.metaDesc, new:ES[s.key]}));
const ptPairs = data.skus.filter(s=>PT[s.key]).map(s=>({key:s.key, old:ptmod[s.key].metaDesc, new:PT[s.key]}));
const frPairs = data.skus.filter(s=>FR[s.key]).map(s=>({key:s.key, old:frmod[s.key].metaDesc, new:FR[s.key]}));
console.log('es patch:', esPairs.length, 'pt patch:', ptPairs.length, 'fr patch:', frPairs.length);
const m1 = patchData(path.join(__dirname,'product-i18n-data.js'), esPairs);
const m2 = patchData(path.join(__dirname,'product-i18n-pt.js'), ptPairs);
const m3 = patchData(path.join(__dirname,'product-i18n-fr.js'), frPairs);
console.log('NOT FOUND es:', JSON.stringify(m1), 'pt:', JSON.stringify(m2), 'fr:', JSON.stringify(m3));

// 3) edit standalone category HTML directly
function setDesc(file, desc) {
  let h = fs.readFileSync(file, 'utf8');
  const re = /(<meta name="description" content=")([\s\S]*?)(">)/;
  if (!re.test(h)) return 'NO-TAG';
  fs.writeFileSync(file, h.replace(re, '$1'+desc+'$3'), 'utf8'); return 'ok';
}
let catApplied = 0;
for (const ck in CAT) {
  const c = data.categories[ck];
  for (const l of ['es','pt','fr']) {
    const f = path.join(ROOT, 'products', l, c[l].slug + '.html');
    if (!fs.existsSync(f)) { console.log('CAT FILE MISSING:', l, ck, c[l].slug); continue; }
    const r = setDesc(f, CAT[ck][l]);
    if (r === 'ok') catApplied++; else console.log('CAT', l, ck, r);
  }
}
console.log('category descriptions applied:', catApplied, '/ 12');
console.log('DONE patching data + categories. Next: run gen-product-i18n.js to regenerate SKU pages.');
