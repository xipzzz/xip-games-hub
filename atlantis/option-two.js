// "option two" (gear menu, 2026-10-10): an interior-designer layout on top of the built apartment.
// Everything new lives in ONE group (added to the model root, so units are mm and the Flip mirror applies).
// Existing objects are only moved, rotated, hidden or re-materialled through OPTION_TWO_CHANGES; app.js saves
// their originals first and puts them back exactly when "assisting" is chosen again.
//
// Placement frame for the living space (lounge + dining + entry). Its walls run at exactly 45 degrees, so:
//   s = (x - y) / sqrt2  runs along the room, from the entry wall (s = -2510) to the balcony glass 232:2 (s = 6290)
//   t = (x + y) / sqrt2  runs across it, from the NW wall face (t = 14090) to the SE wall face (t = 18380 at s = 0,
//                        18230 at s = 6000; that wall is 1.5 degrees off 45)
// x, y are Figma plan millimetres (current-layout.json, current-figma-walls.json). Model position = (x, height, -y).
// Sightline: entry door 135:72 centre (s -2612, t 16413) to the balcony glass at (s 6290, t 15500). A 500 mm wide
// band around that line is kept free of furniture (rug excepted: 10 mm, flat on the floor).
import * as THREE from 'three';
import {RoundedBoxGeometry} from 'three/addons/geometries/RoundedBoxGeometry.js';
import {finish} from './surface-materials.js?v=step5-2';

const R = Math.SQRT1_2;
export const stripToPlan = (s, t) => [(s + t) * R, (t - s) * R];   // strip frame -> Figma plan mm
export const SIGHTLINE = { from: [-2350, 16413], to: [6200, 15500], halfWidth: 250 };   // in (s, t)
// rotation.y so that local +Z (an item's front) faces plan direction (dx, dy); same rule as photo-additions.js
const facing = (dx, dy) => Math.atan2(dx, -dy);
const FACE = { NW: facing(-1, -1), SE: facing(1, 1), NE: facing(1, -1), SW: facing(-1, 1), E: facing(1, 0), S: facing(0, 1) };

const mat = (color, roughness = .6, metalness = 0, extra = {}) => new THREE.MeshStandardMaterial({ color, roughness, metalness, ...extra });
const oak = finish(mat(0xd9be96, .62), 'wood', 2);
const oakDark = finish(mat(0xb08a62, .6), 'wood', 2);
const linen = finish(mat(0xece4d6, .95, 0, { side: THREE.DoubleSide }), 'linen', 3);
const sage = finish(mat(0x9aa892, .95), 'fabric', 4);
const terracotta = finish(mat(0xb86e4b, .95), 'fabric', 3);
const oatmeal = finish(mat(0xd8cbb4, .95), 'fabric', 4);
const white = mat(0xf3f2ee, .5), black = mat(0x1f2124, .45, .4), brass = mat(0xb8955a, .35, .8), ceramic = mat(0xe9e2d6, .3);
const mirrorMat = mat(0xdfe6ea, .03, 1);
const glow = (color = 0xffd9a0, intensity = 2.2) => new THREE.MeshStandardMaterial({ color: 0xfff6e8, emissive: color, emissiveIntensity: intensity, roughness: .4 });

function part(g, geo, m, x, y, z, name) { const o = new THREE.Mesh(geo, m); o.position.set(x, y, z); o.name = 'OptionTwo_' + name; o.castShadow = o.receiveShadow = m.emissive.getHex() === 0; g.add(o); return o; }   // glowing parts cast no shadow
const box = (w, h, d, r = 0) => r ? new RoundedBoxGeometry(w, h, d, 3, Math.min(r, w / 2 - 1, h / 2 - 1, d / 2 - 1)) : new THREE.BoxGeometry(w, h, d);
const cyl = (rt, rb, h, seg = 24) => new THREE.CylinderGeometry(rt, rb, h, seg);
// A warm lamp: physically based falloff in metres (the model root scales mm -> m), no shadows, short reach so it
// stays in its own room. Named so it can be found in QA.
// LAMP_SCALE: the lounge test shot showed full-strength values washing the white walls out next to the daylight.
const LAMP_SCALE = 0.35;
function lamp(g, x, y, z, intensity, distance, name, color = 0xffc98a) { const l = new THREE.PointLight(color, intensity * LAMP_SCALE, distance, 2); l.position.set(x, y, z); l.name = name; g.add(l); return l; }
// item = one placed piece of furniture: a group at plan (x, y), rotated, tagged with its area and how it is held up.
function item(parent, name, area, support, x, y, rotY = 0, elevation = 0) {
  const g = new THREE.Group(); g.name = 'OptionTwo_' + name; g.position.set(x, elevation, -y); g.rotation.y = rotY;
  g.userData = { area, support }; parent.add(g); return g;
}
const inStrip = (parent, name, area, support, s, t, face, elevation = 0) => { const [x, y] = stripToPlan(s, t); return item(parent, name, area, support, x, y, FACE[face], elevation); };

// ---------- pieces (front = local +Z, width along local X) ----------
function diningChair(g) {   // 440 wide, seat 450 high, back at local -Z
  part(g, box(440, 40, 420, 10), oatmeal, 0, 450, 20, 'Chair_Seat');
  part(g, box(440, 300, 26, 8), oak, 0, 700, -215, 'Chair_Back');
  for (const sx of [-1, 1]) for (const z of [-200, 200]) part(g, box(32, z < 0 ? 850 : 430, 32), oak, sx * 190, z < 0 ? 425 : 215, z, 'Chair_Leg');
}
function pendant(g, drop) {   // canopy on the ceiling (2800), cord, linen dome; g sits at floor level
  part(g, cyl(60, 60, 18), white, 0, 2791, 0, 'Pendant_Canopy');
  part(g, cyl(3, 3, 2782 - drop - 200), black, 0, (2782 + drop + 200) / 2, 0, 'Pendant_Cord');
  part(g, new THREE.CylinderGeometry(70, 260, 200, 40, 1, true), linen, 0, drop + 100, 0, 'Pendant_Shade').castShadow = false;
  part(g, new THREE.SphereGeometry(45, 20, 12), glow(), 0, drop + 120, 0, 'Pendant_Bulb');
  lamp(g, 0, drop + 60, 0, 3.2, 4.5, 'OptionTwo_PendantLight');
}
function rug(g, w, d) {
  part(g, box(w, 10, d), finish(mat(0xcdb699, .98), 'fabric', 6), 0, 5, 0, 'Rug').castShadow = false;
  const border = finish(mat(0x9b6f4f, .98), 'fabric', 4);
  for (const sz of [-1, 1]) part(g, box(w - 160, 2, 40), border, 0, 11, sz * (d / 2 - 100), 'Rug_Border').castShadow = false;
  for (const sx of [-1, 1]) part(g, box(40, 2, d - 160), border, sx * (w / 2 - 100), 11, 0, 'Rug_Border').castShadow = false;
}
function tripodLamp(g) {   // oak tripod, linen drum, warm bulb
  // Legs splay 0.13 rad; centre height 706.5 puts each tilted foot exactly on y 0.
  for (let i = 0; i < 3; i++) { const a = i * Math.PI * 2 / 3, leg = part(g, cyl(12, 14, 1420, 10), oak, Math.sin(a) * 110, 706.5, Math.cos(a) * 110, 'FloorLamp_Leg'); leg.rotation.set(Math.cos(a) * -.13, 0, Math.sin(a) * .13); }
  part(g, new THREE.CylinderGeometry(200, 220, 280, 40, 1, true), linen, 0, 1520, 0, 'FloorLamp_Shade').castShadow = false;
  part(g, new THREE.SphereGeometry(40, 20, 12), glow(), 0, 1480, 0, 'FloorLamp_Bulb');
  lamp(g, 0, 1460, 0, 2.4, 4, 'OptionTwo_FloorLampLight');
}
function shoeCabinet(g, w, d, h) {
  part(g, box(w, h - 80, d, 6), oak, 0, 80 + (h - 80) / 2, 0, 'Shoe_Cabinet');
  part(g, box(w - 40, 80, d - 40), oakDark, 0, 40, -10, 'Shoe_Plinth');
  for (const x of [-w / 4, w / 4]) { part(g, box(w / 2 - 6, h - 120, 4), white, x, 80 + (h - 80) / 2, d / 2 + 2, 'Shoe_Door'); part(g, box(120, 12, 14), brass, x, h - 120, d / 2 + 11, 'Shoe_Pull'); }
  part(g, cyl(70, 50, 160, 24), ceramic, -w / 4, h + 80, 0, 'Shoe_Vase');
  part(g, box(200, 12, 200, 4), oakDark, w / 4, h + 6, 0, 'Shoe_KeyTray');
}
function entryBench(g, w, d) {
  part(g, box(w, 40, d, 6), oak, 0, 430, 0, 'Bench_Top');
  part(g, box(w - 60, 60, d - 40, 25), terracotta, 0, 480, 0, 'Bench_Cushion');
  for (const sx of [-1, 1]) part(g, box(36, 410, d - 40), oakDark, sx * (w / 2 - 40), 205, 0, 'Bench_Side');
  part(g, box(w - 116, 20, d - 60), oakDark, 0, 120, 0, 'Bench_ShoeShelf');
}
function wallMirror(g, w, h, bottom) {   // oak frame, glass; g origin on the wall plane, mirror front +Z
  part(g, box(w, h, 22), oak, 0, bottom + h / 2, 11, 'Mirror_Frame');
  part(g, box(w - 60, h - 60, 6), mirrorMat, 0, bottom + h / 2, 25, 'Mirror_Glass');
}
function slidingWardrobe(g, w, d, h) {   // origin = carcass back centre on the wall; doors face +Z
  // Carcass 0..540 deep; two door tracks in front of it: back track z 545..565, front track z 575..595.
  part(g, box(w, h, 540), white, 0, h / 2, 270, 'Wardrobe_Carcass');
  part(g, box(w, 40, 60), mat(0xbfc3c6, .35, .7), 0, h - 20, 570, 'Wardrobe_TopTrack');
  part(g, box(w, 12, 60), mat(0xbfc3c6, .35, .7), 0, 6, 570, 'Wardrobe_BottomTrack');
  const n = 3, pw = (w - 20) / n + 20;
  for (let i = 0; i < n; i++) {
    const front = i === 1, z = front ? 585 : 555, x = -w / 2 + 10 + (w - 20) * (i + .5) / n;
    const panel = new THREE.Group(); panel.position.set(x, 0, z); g.add(panel);
    part(panel, box(pw, h - 67, 20, 3), front ? mirrorMat : oak, 0, 22 + (h - 67) / 2, 0, 'Wardrobe_SlidingDoor_' + i);
    // Pulls on the outer edges, where no other door passes in front.
    part(panel, box(16, 700, 10), black, (i === 0 ? -1 : 1) * (pw / 2 - 40), 1050, 15, 'Wardrobe_Pull');
  }
}
function dayBed(g, w, d) {   // back rail at local -Z (against the window wall), front +Z
  part(g, box(w, 220, d, 10), oak, 0, 210, 0, 'DayBed_Frame');
  for (const sx of [-1, 1]) for (const sz of [-1, 1]) part(g, box(50, 100, 50), oakDark, sx * (w / 2 - 70), 50, sz * (d / 2 - 70), 'DayBed_Foot');
  part(g, box(w - 100, 160, d - 80, 40), sage, 0, 400, 20, 'DayBed_Mattress');
  part(g, box(w, 300, 40, 8), oak, 0, 470, -d / 2 + 20, 'DayBed_BackRail');
  for (const sx of [-1, 1]) part(g, box(40, 200, d - 40, 8), oak, sx * (w / 2 - 20), 420, 0, 'DayBed_Arm');
  for (let i = 0; i < 3; i++) { const c = part(g, box(w / 3 - 60, 360, 150, 60), i === 1 ? terracotta : oatmeal, (i - 1) * (w / 3 - 20), 675, -d / 2 + 150, 'DayBed_BackCushion'); c.rotation.x = -.12; }
  for (const sx of [-1, 1]) { const b = part(g, cyl(105, 105, 560, 28), oatmeal, sx * (w / 2 - 160), 585, 110, 'DayBed_Bolster'); b.rotation.x = Math.PI / 2; }
}
function wallDesk(g, w, d) {   // origin on the wall plane, front +Z; no legs (wall mounted on two brackets)
  part(g, box(w, 30, d, 4), oak, 0, 735, d / 2, 'Desk_Top');
  part(g, box(w * .45, 110, d - 60), white, -w * .15, 665, (d - 60) / 2, 'Desk_DrawerBox');
  for (const x of [-w / 2 + 60, w / 2 - 60]) part(g, box(30, 160, d - 120), black, x, 640, (d - 120) / 2, 'Desk_Bracket');
  for (const [y, len] of [[1150, w - 100], [1480, w - 300]]) {
    part(g, box(len, 30, 240, 3), oak, (w - 100 - len) / 2, y, 120, 'Desk_FloatingShelf');
    for (let i = 0; i < 6; i++) part(g, box(28, 200 + (i % 3) * 25, 170), [terracotta, sage, white, oakDark][i % 4], -len / 2 + 80 + i * 32 + (w - 100 - len) / 2, y + 15 + (200 + (i % 3) * 25) / 2, 110, 'Desk_Book');
  }
  part(g, cyl(60, 70, 180, 24), ceramic, w / 2 - 160, 750 + 90, d / 2, 'Desk_Pot');
  part(g, new THREE.SphereGeometry(110, 16, 12), finish(mat(0x5d7a52, .9), 'fabric', 2), w / 2 - 160, 750 + 180 + 80, d / 2, 'Desk_Plant');
}
function deskChair(g) { diningChair(g); }
function tableLamp(g, shadeColor = 0xe9dcc6) {   // stands on a bedside top; g origin = top surface
  part(g, cyl(75, 85, 200, 28), ceramic, 0, 100, 0, 'BedsideLamp_Base');
  part(g, cyl(10, 10, 60, 10), brass, 0, 230, 0, 'BedsideLamp_Neck');
  part(g, new THREE.CylinderGeometry(120, 150, 210, 32, 1, true), mat(shadeColor, .9, 0, { side: THREE.DoubleSide }), 0, 365, 0, 'BedsideLamp_Shade').castShadow = false;
  part(g, new THREE.SphereGeometry(35, 16, 10), glow(), 0, 300, 0, 'BedsideLamp_Bulb');
  lamp(g, 0, 330, 0, 1.0, 2.4, 'OptionTwo_BedsideLight');
}
function bulbIn(g, y, name) { part(g, new THREE.SphereGeometry(35, 16, 10), glow(), 0, y, 0, name); lamp(g, 0, y, 0, 1.0, 2.4, 'OptionTwo_BedsideLight'); }
function mirrorLight(g, w) {   // warm LED bar; origin on the wall plane, front +Z
  part(g, box(w, 30, 50, 6), brass, 0, 15, 25, 'MirrorLight_Bar');
  part(g, box(w - 30, 8, 30), glow(0xffcf8a, 3), 0, -2, 30, 'MirrorLight_Diffuser');
  lamp(g, 0, -40, 160, 0.9, 2.2, 'OptionTwo_MirrorLight', 0xffcf96);
}
function downlight(g, name) {   // recessed trim on the ceiling; named Ceiling_* so it hides with the ceiling (Top view)
  const trim = part(g, cyl(70, 70, 12, 28), white, 0, 2794, 0, 'Downlight_Trim'); trim.name = 'Ceiling_OptionTwo_Downlight_' + name;
  const lens = part(g, cyl(48, 48, 4, 24), glow(0xffe2b8, 2.6), 0, 2786, 0, 'Downlight_Lens'); lens.name = 'Ceiling_OptionTwo_DownlightLens_' + name;
}
function curtain(g, width, height, folds) {   // gathered linen panel, hangs from the rod at 2600
  const geo = new THREE.PlaneGeometry(width, height, Math.max(8, folds * 10), 12), p = geo.getAttribute('position');
  for (let i = 0; i < p.count; i++) { const u = (p.getX(i) + width / 2) / width; p.setZ(i, Math.sin(u * folds * Math.PI * 2) * 38); }
  geo.computeVertexNormals();
  part(g, geo, linen, 0, 2560 - height / 2, 0, 'Curtain_Panel').castShadow = false;
}

// ---------- one light floor throughout: pale oak planks along the room (UVs from tileFloor: 1 repeat = 1200 mm) ----------
function oakFloorMaterial() {
  const c = document.createElement('canvas'); c.width = c.height = 1024; const ctx = c.getContext('2d');
  const plank = 1024 / 6;   // 6 boards per 1200 mm = 200 mm wide, 1200 mm long, one staggered joint per row
  for (let r = 0; r < 6; r++) {
    const offset = (r * 389) % 1024, len = 1024, tone = 206 + ((r * 7) % 9) * 3;   // same tone both sides of the wrap: no seam
    for (let k = -1; k < 1; k++) {
      const x0 = offset + k * len;
      ctx.fillStyle = `rgb(${tone},${tone - 22},${tone - 52})`; ctx.fillRect(x0, r * plank, len, plank);
      for (let i = 0; i < 26; i++) { ctx.strokeStyle = `rgba(150,110,70,${.05 + (i % 4) * .015})`; ctx.lineWidth = 1 + (i % 3); const yy = r * plank + 6 + (i * 37 % (plank - 12)); ctx.beginPath(); ctx.moveTo(x0, yy); ctx.bezierCurveTo(x0 + len * .3, yy + 4, x0 + len * .6, yy - 4, x0 + len, yy + 2); ctx.stroke(); }
      ctx.fillStyle = 'rgba(110,80,50,.55)'; ctx.fillRect(x0, r * plank, 3, plank);
    }
    ctx.fillStyle = 'rgba(110,80,50,.5)'; ctx.fillRect(0, r * plank, 1024, 2);
  }
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; t.wrapS = t.wrapT = THREE.RepeatWrapping; t.anisotropy = 8;
  const m = new THREE.MeshStandardMaterial({ map: t, roughness: .7, color: 0xffffff });
  m.userData.optionTwo = 'pale oak boards 200 mm, visual approximation'; return m;
}

// ---------- the group ----------
export function buildOptionTwo() {
  const g = new THREE.Group(); g.name = 'OptionTwo_Designer'; g.userData.layout = 'option two';

  // Lounge (s 2150..5130): the two existing sofas form an L facing the TV wall (see OPTION_TWO_CHANGES), on a rug.
  rug(inStrip(g, 'Lounge_Rug', 'lounge', 'floor', 3265, 16690, 'NW'), 2230, 1280);
  tripodLamp(inStrip(g, 'Lounge_FloorLamp', 'lounge', 'floor', 4774, 16560, 'SW'));
  // Light inside the moved reading lamp's shade (that lamp stands at s 2000, t 17900, facing NE; shade 370 mm out).
  { const o = inStrip(g, 'Lounge_ReadingLampGlow', 'lounge', 'on:Furniture_Photo_FloorLamp', 2000, 17900, 'NE'); part(o, new THREE.SphereGeometry(30, 14, 10), glow(), 0, 1525, 370, 'ReadingLamp_Bulb'); lamp(o, 0, 1480, 370, 2.0, 4, 'OptionTwo_FloorLampLight'); }
  // Linen curtains gathered at both ends of the balcony glass (180 mm inside it), so the glass and sightline stay open.
  for (const [t0, t1] of [[14930, 15180], [17760, 18190]]) {
    const o = inStrip(g, 'Lounge_Curtain', 'lounge', 'rod', 6290 - 180, (t0 + t1) / 2, 'SW'); curtain(o, t1 - t0, 2520, Math.round((t1 - t0) / 110));
  }
  { const o = inStrip(g, 'Lounge_CurtainRod', 'lounge', 'ceiling', 6290 - 180, 16560, 'SW'); part(o, cyl(12, 12, 3300, 12), black, 0, 2600, 0, 'Curtain_Rod').rotation.z = Math.PI / 2;
    for (const x of [-1600, 1600]) part(o, box(30, 190, 30), black, x, 2705, 0, 'Curtain_RodDrop'); }

  // Dining: the open middle strip of the living room between the breakfast counter / kitchen door and the sofas
  // (s -1430..730), on the SE side so the entry-to-balcony sightline stays open (Xip found the kitchen-side spot too
  // crowded). 2026-10-11 (Xip): the table + chairs here are the switchable dining.js set (TONSTAD by default, moved to
  // this spot by app.js, see DINING_SPOTS.option2); option two's own 140 x 85 oak table and 6 chairs are no longer built.
  const tableS = -350, tableT = 17355;
  pendant(inStrip(g, 'Dining_Pendant', 'dining', 'ceiling', tableS, tableT, 'NW'), 1600);

  // Entry (s -2510..-1740): shoe cabinet on the NW wall, bench + mirror on the entry wall beside the door.
  shoeCabinet(inStrip(g, 'Entry_ShoeCabinet', 'entry', 'floor', -2090, 14090 + 175, 'SE'), 700, 330, 1000);
  entryBench(inStrip(g, 'Entry_Bench', 'entry', 'floor', -2280, 15150, 'NE'), 1000, 380);
  wallMirror(inStrip(g, 'Entry_Mirror', 'entry', 'wall', -2482, 15150, 'NE'), 600, 900, 1000);

  // Wardrobe: closed built-in with three sliding doors on the wall y 7764 (replaces 196:348 + MULIG rail).
  slidingWardrobe(item(g, 'Wardrobe_Sliding', 'wardrobe', 'floor', 8400, 7752, 0), 2100, 600, 2400);   // rotY 0 = doors face north, into the room

  // Study: day bed under the north window, wall-mounted desk + floating shelves on the SW wall, chair.
  dayBed(item(g, 'Study_DayBed', 'study', 'floor', 13250, 4410, FACE.S), 1800, 900);
  wallDesk(inStrip(g, 'Study_WallDesk', 'study', 'wall', 4652, 13575, 'NE'), 1050, 500);
  deskChair(inStrip(g, 'Study_DeskChair', 'study', 'floor', 5390, 13575, 'SW'));

  // Bedside lamps (warm): new lamp on Bed 1's shared bedside (top 490), warm bulbs in Bed 2's two existing lamps.
  tableLamp(item(g, 'Bed1_BedsideLamp', 'bed1', 'on:Furniture_Figma_196_326', 3697, 5206, 0, 490));
  // 196:336 / 196:339 centres; their lamps stand at the centre.
  for (const [x, y] of [[9070, 3685], [9064, 6038]]) bulbIn(item(g, 'Bed2_BedsideBulb', 'bed2', 'on:Furniture_Photo_TableLamp', x, y), 875, 'BedsideLamp_Bulb');

  // Bathrooms: warm LED bar over Bath 1's vanity mirror; Bath 2 gets a mirror over its basin plus the same light.
  mirrorLight(item(g, 'Bath1_MirrorLight', 'bath1', 'wall', 7352, 5545, FACE.E, 1935), 480);
  wallMirror(item(g, 'Bath2_Mirror', 'bath2', 'wall', 4800, 7972, FACE.S), 500, 700, 1150);
  mirrorLight(item(g, 'Bath2_MirrorLight', 'bath2', 'wall', 4800, 7972, FACE.S, 1880), 440);

  // Ceiling downlights (layer one of three). Strip points (s, t) and plain plan points (x, y).
  const dl = item(g, 'Downlights', 'downlights', 'ceiling', 0, 0);
  const spots = [[-2000, 15500], [-1900, 16600], [-700, 15600], [1100, 15600], [2700, 15500], [4100, 15500], [2700, 17250], [4100, 17250], [5500, 15700], [5500, 17200]].map(([s, t]) => stripToPlan(s, t))
    .concat([[4500, 4300], [4500, 6200], [9900, 4700], [8400, 6700], [13300, 5300], [7990, 4900], [5000, 8650]]);
  spots.forEach(([x, y], i) => { const o = new THREE.Group(); o.position.set(x, 0, -y); dl.add(o); downlight(o, i); });
  for (const [s, t, i] of [[-2000, 16000, 1.3], [3400, 16300, 1.6], [5300, 16400, 1.2]]) { const [x, y] = stripToPlan(s, t); const l = lamp(dl, x, 2650, -y, i, 4.5, 'Ceiling_OptionTwo_DownlightGlow', 0xffe0b8); l.userData.layer = 'downlights'; }
  for (const [x, y] of [[13300, 5300], [9900, 4700]]) lamp(dl, x, 2650, -y, 1.0, 4, 'Ceiling_OptionTwo_DownlightGlow', 0xffe0b8);

  g.traverse((o) => { if (o.isMesh) o.userData.optionTwo = true; });
  return g;
}

// ---------- changes to EXISTING objects (app.js saves position/rotation/scale/visibility/material first) ----------
const childWith = (root, meshName) => root.children.find((c) => c.getObjectByName(meshName));
const TAN_HEADING = Math.atan2(-0.725847601890564, 0.6878555417060852);   // 158:3 transform: long axis -46.5 deg
const moveTo = (o, s, t) => { const [x, y] = stripToPlan(s, t); o.position.x = x; o.position.z = -y; };
let floorMaterial = null;
export const OPTION_TWO_CHANGES = [
  { what: 'Floor: light oak boards throughout (was grey-beige tile)', area: 'floor', find: (r) => r.getObjectByName('Floor'),
    apply: (o) => { floorMaterial ||= oakFloorMaterial(); o.material = floorMaterial; } },
  // L: the charcoal NYHAMN stays on the SE wall facing the TV; the tan loveseat turns 90 degrees and closes the L
  // at the balcony end, facing back toward the TV side. Its back is 1.15 m from the balcony glass.
  { what: 'Tan loveseat: turned to close the L, at the balcony end', area: 'lounge', find: (r) => childWith(r, 'Lounge_Sofa_Tan_Base'),
    apply: (o) => { o.rotation.y += (-3 * Math.PI / 4) - TAN_HEADING; moveTo(o, 4774, 17502); } },
  { what: 'Coffee table: centred in the L on the rug (10 mm up)', area: 'lounge', find: (r) => childWith(r, 'Lounge_CoffeeTable_A_Top'),
    apply: (o) => { moveTo(o, 3250, 16600); o.position.y += 10; } },
  { what: 'Reading floor lamp: to the charcoal sofa SW arm', area: 'lounge', find: (r) => r.getObjectByName('Furniture_Photo_FloorLamp'),
    apply: (o) => { moveTo(o, 2000, 17900); o.rotation.y = FACE.NE; } },
  { what: 'High chair: set aside (its corner is now the tan loveseat)', area: 'lounge', find: (r) => r.getObjectByName('Furniture_Photo_HighChair_ANTILOP'), apply: (o) => { o.visible = false; } },
  { what: 'Light blue sofa: set aside (it stood across the entry-to-balcony sightline)', area: 'lounge', find: (r) => r.getObjectByName('Furniture_Figma_BlueSofa'), apply: (o) => { o.visible = false; } },
  { what: 'Hinged wardrobe 196:348: replaced by the sliding-door built-in', area: 'wardrobe', find: (r) => r.getObjectByName('Furniture_Figma_196_348'), apply: (o) => { o.visible = false; } },
  { what: 'MULIG open rail: enclosed in the sliding-door built-in', area: 'wardrobe', find: (r) => r.getObjectByName('Furniture_MULIG_ClothesRack'), apply: (o) => { o.visible = false; } },
  { what: 'Study double bed 196:278: replaced by the day bed', area: 'study', find: (r) => r.getObjectByName('Furniture_Figma_196_278'), apply: (o) => { o.visible = false; } },
  { what: 'Study cubby 196:369: replaced by the floating shelves (its wall now holds the desk)', area: 'study', find: (r) => r.getObjectByName('Furniture_Figma_196_369'), apply: (o) => { o.visible = false; } },
  { what: 'Tufted bench 196:398 by the entry: replaced by the entry bench + shoe cabinet', area: 'entry', find: (r) => r.getObjectByName('Furniture_Figma_196_398'), apply: (o) => { o.visible = false; } },
  // 2026-10-11: the dining.js table is no longer hidden here; app.js moves it under the pendant (DINING_SPOTS.option2).
];
