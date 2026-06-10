// One-off: tighten EN <meta name="description"> to <=158 chars, front-loaded.
// Only touches name="description" — leaves <title>, og:, twitter: untouched.
const fs = require('fs'), path = require('path');
const PROD = path.resolve(__dirname, '..', 'products');

const DESC = {
'ac-led-floodlight.html': 'Mains AC LED floodlight, 50-1000W, IP65, 6500K, 30,000h. For factories, sports courts and yards. CE + RoHS, OEM, FOB Shenzhen factory pricing.',
'ac-street-light.html': 'Mains AC street light head, 50/100W, IP65, 6500K, fits 60mm poles, photocell-ready. For municipal roads and parks. CE + RoHS, OEM, FOB Shenzhen.',
'all-in-one-solar-street-light.html': 'All-in-one solar street light, 100/200/300W, IP66, radar sensor, LiFePO4. Off-grid roads, parks and compounds. CE + RoHS, OEM, FOB Shenzhen.',
'emergency-ufo-rechargeable-light.html': 'Rechargeable UFO emergency light for blackouts, 150/200W, USB-C, 3 colour temps, hook-hang, no install. CE + RoHS, OEM. Built for load-shedding markets.',
'off-grid-portable-solar-lights.html': 'Off-grid and portable solar lights from a Shenzhen factory: home kits, lanterns, work lights and emergency lamps. CE + RoHS, LiFePO4, OEM available.',
'outdoor-wall-lantern-solar-ac.html': 'Outdoor wall lantern in solar or AC, IP44, E27 socket, bronze/black/copper finishes. Classic porch and entrance lighting. CE + RoHS, OEM, FOB Shenzhen.',
'pir-motion-sensor-wall-light.html': 'Anti-vandal solar PIR wall light, 800lm, IP65, dual PIR 8-12m, 4000mAh LiFePO4. For perimeter walls and compounds. CE + RoHS, OEM, FOB Shenzhen.',
'solar-bug-zapper-light.html': 'Solar UV-LED bug zapper light, 2W, IP65, covers 100-200m2. Chemical-free insect control for gardens and patios. CE + RoHS, OEM, FOB Shenzhen factory.',
'solar-ceiling-fan-with-light.html': 'Solar ceiling fan with LED light, 48-inch, 12V DC, 12W, remote control. Off-grid comfort for homes and verandas. CE + RoHS, OEM, FOB Shenzhen factory.',
'solar-courtyard-column-light.html': 'Solar courtyard column light, 1-2m, 10W, 800lm, IP65, LiFePO4. Pillar and pathway lighting for gardens and gates. CE + RoHS, OEM, FOB Shenzhen factory.',
'solar-decorative-wall-lights.html': 'Decorative solar lights from a Shenzhen factory: string lights, wall lanterns and flame torches. Warm ambience for gardens and patios. CE + RoHS, OEM.',
'solar-edison-string-lights.html': 'Solar Edison string lights, 40/60 LEDs, IP65, 2700K warm white, up to 30m. Patio and event ambience, no wiring. CE + RoHS, OEM, FOB Shenzhen factory.',
'solar-emergency-led-bulb.html': 'Solar emergency LED bulb, E27/B22, auto-on in a blackout with built-in battery. Instant backup light for off-grid homes. CE + RoHS, OEM, FOB Shenzhen.',
'solar-fairy-copper-wire-string-lights.html': 'Solar fairy copper wire string lights, 100/200 LEDs, 2700K, 8 modes. Flexible decorative lighting for gardens and events. CE + RoHS, OEM, FOB Shenzhen.',
'solar-flag-pole-light.html': 'Solar flag pole light, 8W, 600lm, 6500K, IP65, LiFePO4. Downlights a flag from dusk to dawn, no wiring. CE + RoHS, OEM, FOB Shenzhen factory.',
'solar-flame-torch-light.html': 'Solar flame torch light, 120cm, IP67, 96 flickering LEDs, LiFePO4. Dancing-flame garden and pathway ambience. CE + RoHS, OEM, FOB Shenzhen factory.',
'solar-flood-security-light-30w.html': '30W solar flood security light, 2,400lm, IP66, PIR 270 degrees, -20 to +50C. Industrial-grade for warehouses and farms. CE + RoHS, OEM, FOB Shenzhen.',
'solar-garden-landscape-lights.html': 'Solar garden and landscape lights from a Shenzhen factory: bollards, spike spotlights and pillar lights. IP65, LiFePO4, OEM. CE + RoHS, FOB Shenzhen.',
'solar-garden-spike-spotlight.html': 'Solar garden spike spotlight, 5W, 400lm, 360-degree rotating head, IP65. Accent trees, signs and facades. CE + RoHS, OEM, FOB Shenzhen factory.',
'solar-garden-stake-light-8-pack.html': 'Solar garden stake lights, 8-pack, frosted glass, IP65, retail-ready box. Pathway and border accent lighting. CE + RoHS, OEM, FOB Shenzhen factory.',
'solar-home-lighting-kit.html': 'Solar home lighting kit, 2 lights, 10W panel, USB output, retail box. Off-grid home and shop lighting. CE + RoHS, OEM, FOB Shenzhen factory pricing.',
'solar-indoor-wall-light-split-panel.html': 'Solar indoor wall light with split panel, 400lm, USB charging, blackout-ready. Wired-look indoor light, off-grid. CE + RoHS, OEM, FOB Shenzhen.',
'solar-motion-flood-light-3-head.html': '3-head solar motion flood light, 2,500-3,500lm, IP65, PIR 270 degrees, LiFePO4. Wide-coverage perimeter security. CE + RoHS, OEM, FOB Shenzhen.',
'solar-outdoor-floor-lamp.html': 'Solar outdoor floor lamp, 24W, 1800lm, 3000K, IP65, LiFePO4. Ambient lighting for patios, decks and cafes. CE + RoHS, OEM, FOB Shenzhen factory.',
'solar-pool-float-light.html': 'Solar floating pool light, RGB 16-colour, IP68, IR remote. Floats on pools and ponds for colourful ambience. CE + RoHS, OEM, FOB Shenzhen factory.',
'solar-portable-camping-lantern.html': 'Solar portable camping lantern, 5W, 4000mAh, 15h+ runtime, USB power bank. Off-grid and emergency light. CE + RoHS, OEM, FOB Shenzhen factory.',
'solar-portable-work-light.html': 'Solar portable work light, 10/20/30W, 3000lm, removable LiFePO4 pack. Cordless lighting for worksites. CE + RoHS, OEM, FOB Shenzhen factory pricing.',
'solar-power-bank-lantern-pro.html': 'Solar power bank lantern Pro, COB panel, USB-C PD 18W, 8000mAh LiFePO4, 400lm, IP65. Fast-charging off-grid hero. CE + RoHS, OEM, FOB Shenzhen.',
'solar-security-street-lights.html': 'Solar security and street lights from a Shenzhen factory: PIR floodlights and all-in-one street lights. IP66, LiFePO4, OEM. CE + RoHS, FOB Shenzhen.',
'solar-umbrella-light.html': 'Solar umbrella light, 28/48/64 LEDs, warm white + RGB, IR remote, IP44. Patio umbrella and gazebo lighting. CE + RoHS, OEM, FOB Shenzhen factory.',
'solar-warning-beacon-light.html': 'Solar warning beacon light, 500m+ visibility, IP66, LiFePO4. Road, marine and site safety signalling, off-grid. CE + RoHS, OEM, FOB Shenzhen factory.',
'split-solar-street-light.html': 'Split solar street light, 30/60/100W, 3,000-10,000lm, IP66, radar sensor. Separate panel for shaded roads. CE + RoHS, OEM, FOB Shenzhen factory.',
'ufo-high-bay-light.html': 'Mains AC UFO high bay light, 100-300W, IP65, 120-degree beam, 6500K. For warehouses, factories and supermarkets. CE + RoHS, OEM, FOB Shenzhen factory.',
'up-down-solar-wall-light.html': 'Up-down solar wall light, 2x3W, IP65, aluminium body, 3000K warm white. Architectural facade and entrance light. CE + RoHS, OEM, FOB Shenzhen.',
};

let applied = 0, over = [], missing = [];
for (const [file, desc] of Object.entries(DESC)) {
  if (desc.length > 160) over.push(file + ' (' + desc.length + ')');
}
if (over.length) { console.log('ABORT: descriptions over 160:'); over.forEach(x=>console.log('  '+x)); process.exit(1); }

for (const [file, desc] of Object.entries(DESC)) {
  const fp = path.join(PROD, file);
  if (!fs.existsSync(fp)) { missing.push(file); continue; }
  let html = fs.readFileSync(fp, 'utf8');
  const re = /(<meta name="description" content=")([\s\S]*?)(">)/;
  if (!re.test(html)) { console.log('NO desc tag: ' + file); continue; }
  html = html.replace(re, '$1' + desc + '$3');
  fs.writeFileSync(fp, html, 'utf8');
  applied++;
}
console.log('applied:', applied, '/ 34');
if (missing.length) console.log('MISSING FILES:', JSON.stringify(missing));
const lens = Object.values(DESC).map(d=>d.length);
console.log('new desc length min/max:', Math.min(...lens), '/', Math.max(...lens));
