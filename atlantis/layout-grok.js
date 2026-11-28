// Grok proposal: a 5th living-room layout built from real IKEA Malaysia products (ikea.com/my, checked 2026-10-10).
// Same API shape as lounge-proposal.js: build*() returns a THREE.Group placed in the same lounge strip coordinates.
// Wall colour is never touched; the existing floor tiles are kept (IKEA MY sells no indoor floor tiles).
import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';
import { finish } from './surface-materials.js?v=step5-2';
export { originalLoungeObjects } from './lounge-proposal.js?v=1';

export const GROK_PRODUCTS = [
  { name: 'SÖDERHAMN 3-seat sofa, Kelinge dark yellow', size: '198×99 cm, seat 40 cm high', price: 1795, url: 'https://www.ikea.com/my/en/p/soederhamn-3-seat-sofa-kelinge-dark-yellow-s89621628/' },
  { name: 'SÖDERHAMN spare cover, 3-seat section', size: 'removable cover', price: 395, url: 'https://www.ikea.com/my/en/p/soederhamn-cover-for-3-seat-section-kelinge-beige-90629464/' },
  { name: 'ÖRTRÄSK coffee table, brown ash veneer', size: '110×68×35 cm', price: 699, url: 'https://www.ikea.com/my/en/p/oertraesk-coffee-table-brown-ash-veneer-90635846/' },
  { name: 'LOHALS rug, flatwoven, natural (jute)', size: '200×300 cm', price: 599, url: 'https://www.ikea.com/my/en/p/lohals-rug-flatwoven-natural-80277396/' },
  { name: 'HEKTAR floor lamp, dark grey', size: '181 cm high, shade Ø31.5 cm', price: 259, url: 'https://www.ikea.com/my/en/p/hektar-floor-lamp-dark-grey-60216549/' },
  { name: 'SVARTPOPPEL cushion cover, off-white ×2', size: '50×50 cm', price: 20, qty: 2, url: 'https://www.ikea.com/my/en/p/svartpoppel-cushion-cover-off-white-30543005/' },
  { name: 'KRYDDBUSKE cushion cover, brown-red ×1', size: '50×50 cm', price: 30, url: 'https://www.ikea.com/my/en/p/kryddbuske-cushion-cover-brown-red-00624362/' },
  { name: 'FJÄDRAR cushion pad, off-white ×3', size: '50×50 cm', price: 25, qty: 3, url: 'https://www.ikea.com/my/en/p/fjaedrar-cushion-pad-off-white-80262192/' },
  { name: 'GINSTMOTT curtains, 1 pair, beige (legend only, not modelled)', size: '145×250 cm', price: 85, url: 'https://www.ikea.com/my/en/p/ginstmott-curtains-1-pair-beige-with-eyelets-90605420/' },
];

const R = Math.SQRT1_2;
const mat = (color, kind) => { const m = new THREE.MeshStandardMaterial({ color, roughness: .85 }); return kind ? finish(m, kind, kind === 'wood' ? 2 : 4) : m; };
const mustard = mat(0xb98a2e, 'fabric'), ash = mat(0x7a5a3c, 'wood'), jute = mat(0xb89d74, 'fabric');
const steel = mat(0x2f3132), offwhite = mat(0xece6d8, 'linen'), brick = mat(0x8e3f2c, 'fabric');
const box = (w, h, d, r = 0) => r ? new RoundedBoxGeometry(w, h, d, 4, Math.min(r, w / 2 - .1, h / 2 - .1, d / 2 - .1)) : new THREE.BoxGeometry(w, h, d);
function mesh(g, geo, m, x, y, z, name) { const o = new THREE.Mesh(geo, m); o.name = 'Grok_' + name; o.position.set(x, y, z); o.castShadow = o.receiveShadow = true; g.add(o); return o; }
function piece(g, name, s, t, heading = -Math.PI / 4) {
  const p = new THREE.Group(); p.name = 'Grok_' + name;
  p.position.set((s + t) * R, 0, -(t - s) * R); p.rotation.y = heading; p.userData.strip = { s, t }; g.add(p); return p;
}
function sofa(g) { // SÖDERHAMN 3-seat: 1980 × 990, low deep seat, metal legs
  for (const x of [-900, 900]) for (const z of [-400, 400]) mesh(g, box(30, 120, 30), steel, x, 60, z, 'Sofa_Leg');
  mesh(g, box(1980, 200, 990, 40), mustard, 0, 220, 0, 'Sofa_Frame');
  for (const x of [-660, 0, 660]) mesh(g, box(650, 130, 720, 50), mustard, x, 385, 110, 'Sofa_Seat');
  for (const x of [-660, 0, 660]) { const b = mesh(g, box(650, 400, 200, 70), mustard, x, 560, -380, 'Sofa_Back'); b.rotation.x = .12; }
  const pil = (x, m, tilt) => { const p = mesh(g, box(500, 500, 130, 60), m, x, 650, -230, 'Cushion'); p.rotation.set(.18, 0, tilt); };
  pil(-720, offwhite, -.1); pil(720, offwhite, .1); pil(-240, brick, .05);
}
function table(g) { // ÖRTRÄSK 1100 × 680 × 350
  mesh(g, box(1100, 30, 680, 8), ash, 0, 335, 0, 'Coffee_Top');
  mesh(g, box(1000, 18, 580, 4), ash, 0, 110, 0, 'Coffee_Shelf');
  for (const x of [-500, 500]) for (const z of [-290, 290]) mesh(g, box(45, 320, 45, 6), ash, x, 160, z, 'Coffee_Leg');
}
function rug(g) { const r = mesh(g, box(3000, 8, 2000, 3), jute, 0, 5, 0, 'Rug'); r.castShadow = false; }
function lamp(g) { // HEKTAR 1810 high
  mesh(g, new THREE.CylinderGeometry(150, 160, 25, 32), steel, 0, 12, 0, 'Lamp_Base');
  mesh(g, new THREE.CylinderGeometry(12, 12, 1600, 12), steel, 0, 810, 0, 'Lamp_Stem');
  const sh = mesh(g, new THREE.CylinderGeometry(70, 157, 260, 32, 1, true), steel, 0, 1680, 120, 'Lamp_Shade'); sh.rotation.x = .5; sh.material = steel.clone(); sh.material.side = THREE.DoubleSide;
  const light = new THREE.PointLight(0xffd7a2, .6, 3, 2); light.position.set(0, 1550, 200); g.add(light);
}
export function buildGrokProposal() {
  const g = new THREE.Group(); g.name = 'Lounge_GrokProposal';
  // Units: mm in the lounge strip (s: entry→balcony, t: TV wall→sofa wall), same frame as lounge-proposal.js.
  sofa(piece(g, 'Sofa', 3450, 17740));              // back against sofa wall
  rug(piece(g, 'Rug', 3450, 16700));
  table(piece(g, 'CoffeeTable', 3450, 16450));      // ~45 cm knee gap to sofa front; ≥90 cm walkways either end
  lamp(piece(g, 'FloorLamp', 2150, 17850));
  g.userData.description = 'Grok proposal · SÖDERHAMN 198×99 sofa, ÖRTRÄSK 110×68 table, LOHALS 200×300 rug';
  return g;
}
let legendEl = null;
export function showGrokLegend(on, parent = document.body) {
  if (!legendEl) {
    legendEl = document.createElement('aside'); legendEl.id = 'grok-legend';
    legendEl.style.cssText = 'position:absolute;z-index:15;left:12px;bottom:12px;max-width:340px;padding:10px 12px;background:#fffdf8ee;border-radius:10px;font:11px/1.5 system-ui,sans-serif;color:#2c2c28;box-shadow:0 2px 10px #0002';
    const total = GROK_PRODUCTS.reduce((a, p) => a + p.price * (p.qty || 1), 0);
    legendEl.innerHTML = '<b>Grok proposal · IKEA Malaysia</b><br>' + GROK_PRODUCTS.map(p =>
      `<a href="${p.url}" target="_blank" rel="noopener" style="color:inherit">${p.name}</a> — ${p.size} — RM${p.price}${p.qty ? ' each' : ''}`).join('<br>') +
      `<br><b>Total ≈ RM${total}</b> <span style="color:#777">(prices ikea.com/my, 2026-10-10; walls & floor unchanged)</span>`;
    parent.appendChild(legendEl);
  }
  legendEl.hidden = !on;
}
