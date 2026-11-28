// IKEA proposal (2026-10-10): real IKEA Malaysia products at their listed sizes (ikea-products.json), in mm.
// Same pattern as lounge-proposal.js: everything new lives in ONE group added to the model root (units mm, the
// Flip mirror applies), and app.js hides the originals listed by ikeaReplacedObjects() and restores them exactly.
// Walls, wall colours, wall materials and the floor are never touched.
//
// Strip frame (see option-two.js): s runs entry -> balcony, t runs TV wall (NW) -> sofa wall (SE). Wall faces
// measured by raycast in the model (gear-proof/tools/ikea-walls.cjs): NW wall t 14090; SE wall t 18419 at s -1300
// sloping to 18226 at s 6100; entry vestibule SE wall t 17080 for s < -1513; balcony glass s ~6270.
// Sightline: entry door centre (s -2350, t 16413) to the balcony glass (6200, 15500); only the flat rug crosses it.
import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';
import { finish } from './surface-materials.js?v=step5-2';
import { originalLoungeObjects } from './lounge-proposal.js?v=1';

const R = Math.SQRT1_2;
const mat = (color, kind, roughness = .8, scale = 4) => {
  const m = new THREE.MeshStandardMaterial({ color, roughness });
  return kind ? finish(m, kind, scale) : m;
};
// Colours picked to match the product photos on ikea.com/my.
const anthracite = mat(0x47494c, 'fabric', .95);          // KIVIK Tresund anthracite
const anthraciteDark = mat(0x34363a, 'fabric', .95);
const blackBrown = mat(0x2f2824, 'wood', .55, 2);         // LACK black-brown
const offWhite = mat(0xe9e3d5, 'fabric', .98, 6);         // STOENSE off-white
const unbleached = mat(0xe4d9c2, 'linen', .95);           // GURLI unbleached
const greyGreen = mat(0x8d9a86, 'fabric', .95);           // LAGERPOPPEL grey-green
const ash = mat(0xd9c4a2, 'wood', .6, 2);                 // LAUTERS ash
const black = mat(0x1f2124, null, .45);
const white = mat(0xf4f2ec, null, .6);
const shadeWhite = mat(0xf3efe6, 'linen', .9); shadeWhite.side = THREE.DoubleSide;
const sheer = new THREE.MeshStandardMaterial({ color: 0xfbfaf6, roughness: .9, transparent: true, opacity: .55, side: THREE.DoubleSide, depthWrite: false });   // STENFRÖ sheer
const glow = () => new THREE.MeshStandardMaterial({ color: 0xffeacb, emissive: 0xffcc84, emissiveIntensity: .65 });

const box = (w, h, d, r = 0) => r ? new RoundedBoxGeometry(w, h, d, 4, Math.min(r, w / 2 - .1, h / 2 - .1, d / 2 - .1)) : new THREE.BoxGeometry(w, h, d);
function mesh(g, geo, material, x, y, z, name) {
  const m = new THREE.Mesh(geo, material); m.name = 'Ikea_' + name;
  m.position.set(x, y, z); m.castShadow = m.receiveShadow = true; g.add(m); return m;
}
// Headings: -PI/4 = front (+Z) faces the TV wall (-t), local +X runs along +s (same as lounge-proposal.js).
const H = { towardTV: -Math.PI / 4, towardSofaWall: 3 * Math.PI / 4, towardBalcony: Math.PI / 4, towardEntry: -3 * Math.PI / 4 };
function piece(g, name, s, t, heading = H.towardTV, y = 0) {
  const p = new THREE.Group(); p.name = 'Ikea_' + name;
  p.position.set((s + t) * R, y, -(t - s) * R); p.rotation.y = heading;
  p.userData.strip = { s, t }; g.add(p); return p;
}
function beam(g, a, b, radius, material, name) {
  const start = new THREE.Vector3(...a), end = new THREE.Vector3(...b), dir = end.clone().sub(start);
  const m = mesh(g, new THREE.CylinderGeometry(radius, radius, dir.length(), 12), material, 0, 0, 0, name);
  m.position.copy(start.add(end).multiplyScalar(.5)); m.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir.normalize()); return m;
}

// ---------- pieces (front = local +Z, width along local X) ----------
// KIVIK 3-seat sofa 2280 x 950 x 830, seat height 450. Wide low arms, three seat and three back cushions.
function kivik(g) {
  const W = 2280, D = 950, armW = 200, armH = 640, inner = W - 2 * armW;
  for (const x of [-W / 2 + 70, W / 2 - 70]) for (const z of [-D / 2 + 70, D / 2 - 70]) mesh(g, new THREE.CylinderGeometry(22, 18, 40, 16), black, x, 20, z, 'Sofa_Foot');
  mesh(g, box(W, 220, D, 30), anthraciteDark, 0, 150, 0, 'Sofa_Base');
  for (const x of [-(W - armW) / 2, (W - armW) / 2]) mesh(g, box(armW, armH - 40, D, 70), anthracite, x, 40 + (armH - 40) / 2, 0, 'Sofa_Arm');
  mesh(g, box(inner, 560, 190, 50), anthraciteDark, 0, 260 + 280, -D / 2 + 95, 'Sofa_BackFrame');
  const seatD = D - 190, cw = inner / 3;
  for (let i = 0; i < 3; i++) {
    const x = -inner / 2 + cw * (i + .5);
    mesh(g, box(cw - 6, 190, seatD - 10, 60), anthracite, x, 260 + 95, D / 2 - seatD / 2 - 5, 'Sofa_SeatCushion');
    // Back cushions top out at the listed 830 mm (their lower edge is hidden behind the seat cushions).
    const b = mesh(g, box(cw - 8, 430, 190, 75), anthracite, x, 830 - 230, -D / 2 + 190 + 60, 'Sofa_BackCushion'); b.rotation.x = -.12;
  }
  // 4 x 50 x 50 cushions: GURLI unbleached at the arms, LAGERPOPPEL grey-green in front of them (FJÄDRAR pads inside).
  // Seat top is at 450: a 500 mm cushion leaning back 0.2 rad needs its centre at >= 450 + 245 to rest on it, not in it.
  const cushion = (x, color, tilt, z, y = 700) => { const c = mesh(g, box(500, 500, 150, 70), color, x, y, z, 'Cushion'); c.rotation.set(-.2, 0, tilt); };
  cushion(-inner / 2 + 280, unbleached, .08, -60, 705);
  cushion(inner / 2 - 280, unbleached, -.08, -60, 705);
  cushion(-inner / 2 + 600, greyGreen, -.06, 70);
  cushion(inner / 2 - 600, greyGreen, .06, 70);
}
// LACK coffee table 1180 x 780 x 450, black-brown: thick top, square legs, shelf.
function lack(g) {
  mesh(g, box(1180, 50, 780, 4), blackBrown, 0, 425, 0, 'Coffee_Top');
  for (const x of [-540, 540]) for (const z of [-340, 340]) mesh(g, box(50, 400, 50, 2), blackBrown, x, 200, z, 'Coffee_Leg');
  mesh(g, box(1080, 16, 680, 2), blackBrown, 0, 110, 0, 'Coffee_Shelf');
  mesh(g, new THREE.CylinderGeometry(120, 110, 18, 40), offWhite, 230, 459, 40, 'Coffee_Tray');
  mesh(g, box(240, 30, 170, 4), unbleached, -260, 465, -30, 'Coffee_Book');
}
// STOENSE rug 3000 x 2000, low pile, flat (10 mm).
function stoense(g) {
  mesh(g, box(3000, 10, 2000, 4), offWhite, 0, 5, 0, 'Rug').castShadow = false;
}
// LAUTERS floor lamp: three ash legs (feet on a 620 mm circle) joining under a 370 mm white shade, 1400 mm high.
function lauters(g) {
  const top = [0, 1130, 0];
  for (let i = 0; i < 3; i++) { const a = i * 2 * Math.PI / 3; beam(g, [Math.sin(a) * 300, 8, Math.cos(a) * 300], top, 13, ash, 'Lamp_Leg'); }
  beam(g, top, [0, 1180, 0], 10, ash, 'Lamp_Neck');
  mesh(g, new THREE.CylinderGeometry(160, 185, 230, 48, 1, true), shadeWhite, 0, 1285, 0, 'Lamp_Shade').castShadow = false;
  mesh(g, new THREE.SphereGeometry(40, 20, 12), glow(), 0, 1250, 0, 'Lamp_Bulb').castShadow = false;
  const light = new THREE.PointLight(0xffd7a2, .6, 3, 2); light.name = 'Ikea_LautersLight'; light.position.set(0, 1250, 0); g.add(light);
}
// STRANDAD floor lamp 1120 mm, 210 mm shade, white/black.
function strandad(g) {
  mesh(g, new THREE.CylinderGeometry(110, 115, 22, 40), black, 0, 11, 0, 'Lamp2_Base');
  mesh(g, new THREE.CylinderGeometry(8, 8, 930, 12), black, 0, 480, 0, 'Lamp2_Stem');
  mesh(g, new THREE.CylinderGeometry(65, 105, 190, 40, 1, true), shadeWhite, 0, 1025, 0, 'Lamp2_Shade').castShadow = false;
  mesh(g, new THREE.SphereGeometry(30, 16, 10), glow(), 0, 1000, 0, 'Lamp2_Bulb').castShadow = false;
  const light = new THREE.PointLight(0xffd7a2, .35, 2.5, 2); light.name = 'Ikea_StrandadLight'; light.position.set(0, 1000, 0); g.add(light);
}
// STENFRÖ sheer curtain panel 1450 x 2500, gathered to ~300 mm when open, hanging from the rod.
function stenfro(g) {
  const width = 300, height = 2500, folds = 6, geo = new THREE.PlaneGeometry(width, height, folds * 10, 10), p = geo.attributes.position;
  for (let i = 0; i < p.count; i++) { const u = (p.getX(i) + width / 2) / width; p.setZ(i, Math.sin(u * folds * Math.PI * 2) * 35); }
  geo.computeVertexNormals();
  const m = mesh(g, geo, sheer, 0, 2560 - height / 2, 0, 'Curtain'); m.castShadow = false; m.renderOrder = 2;
}

// ---------- placement (s, t of each piece centre) ----------
// Every number below is checked in gear-proof/IKEA.md (clearances measured from the built boxes).
export const IKEA_PLACES = {
  sofa: { s: 3500, t: 17765 },            // back 18240, SE wall 18264..18301 along it; front 17290
  coffeeTable: { s: 3500, t: 16520 },     // 380 mm knee room to the sofa (IKEA: 30-45 cm); NW edge 16130, outside the sightline band
  rug: { s: 3400, t: 16850 },             // s 1900..4900, t 15850..17850: under the sofa's front feet
  lauters: { s: 4975, t: 17940 },         // east of the sofa arm, front foot off the rug, 2 feet toward the wall
  strandad: { s: 2300, t: 14350 },        // beside the TV console's entry end, clear of the kitchen door
  // dining table: dining.js DINING_SPOTS.ikea (s 420, t 17250), between the vestibule wall step (s -1513) and the sofa arm (s 2360)
};
export function buildIkeaProposal() {
  const g = new THREE.Group(); g.name = 'Ikea_Proposal';
  const P = IKEA_PLACES;
  stoense(piece(g, 'RugGroup', P.rug.s, P.rug.t));
  kivik(piece(g, 'Sofa', P.sofa.s, P.sofa.t, H.towardTV, 10));          // 10 mm up: front feet stand on the rug
  lack(piece(g, 'CoffeeTable', P.coffeeTable.s, P.coffeeTable.t, H.towardTV, 10));
  lauters(piece(g, 'FloorLamp', P.lauters.s, P.lauters.t, H.towardTV));   // leg 0 points to the TV, two toward the wall
  strandad(piece(g, 'FloorLamp2', P.strandad.s, P.strandad.t));
  // Dining (2026-10-11, Xip): the switchable dining.js set (TONSTAD by default, 6 oak chairs, menu for the others)
  // stands here instead of a fixed copy; app.js moves it to DINING_SPOTS.ikea (s 420, t 17250).
  // STENFRÖ: one pair, one panel gathered at each end of the balcony glass (t 14914..18211), 150 mm inside it,
  // so the open glass between them (t 15230..17900) keeps the sightline end point (t 15500) clear.
  for (const t of [15080, 18050]) stenfro(piece(g, 'Curtain', 6110, t, H.towardEntry));
  const rod = piece(g, 'CurtainRod', 6110, 16560, H.towardEntry);
  mesh(rod, new THREE.CylinderGeometry(10, 10, 3300, 12), white, 0, 2580, 0, 'Curtain_Rod').rotation.z = Math.PI / 2;
  g.userData.description = 'IKEA proposal · KIVIK 3-seat, LACK, STOENSE, TONSTAD 196 x 85';
  return g;
}

// Originals hidden while the IKEA layout is shown: the same lounge set Warm Nordic replaces. The switcher's dining
// table (dining.js) stays and is moved off the entry-to-balcony sightline by app.js (DINING_SPOTS.ikea).
export function ikeaReplacedObjects(root) {
  return [...new Set(originalLoungeObjects(root))];
}

// Products in this layout and how many of each (roles from ikea-products.json).
export const IKEA_USED = [
  ['sofa', 1], ['coffee_table', 1], ['rug', 1], ['dining_table', 1], ['floor_lamp', 1], ['floor_lamp_2', 1],
  ['cushion_cover', 2], ['cushion_cover_accent', 2], ['cushion_pad', 4], ['curtains', 1],
];
