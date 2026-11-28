// IKEA gallery-inspired concept, not product CAD. All dimensions are design estimates in mm.
// This module only adds lounge furniture. The existing shell, tile floor and other rooms are untouched.
import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';
import { finish } from './surface-materials.js?v=step5-2';

const R = Math.SQRT1_2;
const mat = (color, kind) => {
  const m = new THREE.MeshStandardMaterial({ color, roughness: .8 });
  return kind ? finish(m, kind, kind === 'wood' ? 2 : 4) : m;
};
const oak = mat(0xc49d70, 'wood'), oakEdge = mat(0xa67d52, 'wood');
const cream = mat(0xe5dfcf, 'linen'), olive = mat(0x788064, 'fabric');
const sand = mat(0xc7b99d, 'fabric'), ink = mat(0x353b33), clay = mat(0xaa7256);
const shade = mat(0xf2e8d2, 'linen'); shade.side = THREE.DoubleSide;
const box = (w, h, d, r = 0) => r ? new RoundedBoxGeometry(w, h, d, 4, Math.min(r, w / 2 - .1, h / 2 - .1, d / 2 - .1)) : new THREE.BoxGeometry(w, h, d);
function mesh(g, geo, material, x, y, z, name) {
  const m = new THREE.Mesh(geo, material); m.name = 'Proposal_' + name;
  m.position.set(x, y, z); m.castShadow = m.receiveShadow = true; g.add(m); return m;
}
function piece(g, name, s, t, heading = -Math.PI / 4) {
  // s runs entry -> balcony; t runs TV wall -> sofa wall; +Z is the furniture's front.
  const p = new THREE.Group(); p.name = 'Proposal_' + name;
  p.position.set((s + t) * R, 0, -(t - s) * R); p.rotation.y = heading;
  p.userData.strip = { s, t }; g.add(p); return p;
}
function beam(g, a, b, radius, material, name) {
  const start = new THREE.Vector3(...a), end = new THREE.Vector3(...b), dir = end.clone().sub(start);
  const m = mesh(g, new THREE.CylinderGeometry(radius, radius, dir.length(), 12), material, 0, 0, 0, name);
  m.position.copy(start.add(end).multiplyScalar(.5)); m.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir.normalize()); return m;
}
function pillow(g, x, y, z, color, size = 390, tilt = 0) {
  const p = mesh(g, box(size, size, 125, 55), color, x, y, z, 'Cushion'); p.rotation.set(.16, 0, tilt);
}
function sofa(g) {
  for (const x of [-990, 990]) for (const z of [-325, 325]) mesh(g, box(55, 165, 55, 10), oak, x, 82.5, z, 'Sofa_Leg');
  mesh(g, box(2350, 235, 950, 60), cream, 0, 275, 0, 'Sofa_Base');
  mesh(g, box(2170, 440, 170, 65), cream, 0, 650, -380, 'Sofa_Back');
  for (const x of [-1080, 1080]) mesh(g, box(190, 370, 940, 75), cream, x, 505, 0, 'Sofa_Arm');
  for (const x of [-495, 495]) {
    mesh(g, box(973, 180, 710, 70), cream, x, 435, 90, 'Sofa_Seat');
    const b = mesh(g, box(970, 440, 180, 65), cream, x, 695, -267, 'Sofa_BackCushion'); b.rotation.x = .10;
  }
  pillow(g, -780, 687, -70, olive, 400, -.12);
  pillow(g, 760, 670, -50, sand, 370, .14);
  pillow(g, 400, 630, -30, cream, 330, -.11);
  // A continuous folded textile over the arm, with small ripples and a loose lower edge.
  const cloth = new THREE.PlaneGeometry(1, 1, 28, 40), p = cloth.attributes.position;
  for (let i = 0; i < p.count; i++) {
    const u = p.getX(i) + .5, v = p.getY(i) + .5;
    const along = v * 625, z = -210 + u * 590;
    const ripple = Math.sin(u * Math.PI * 8) * (5 + v * 5);
    const x = along < 240 ? -950 - along : -1190 - ripple;
    const y = along < 240 ? 703 + ripple : 703 - (along - 240) + Math.sin(u * 8) * v * 9;
    p.setXYZ(i, x, y, z);
  }
  cloth.computeVertexNormals(); const clothMat = olive.clone(); clothMat.side = THREE.DoubleSide;
  mesh(g, cloth, clothMat, 0, 0, 0, 'Throw');
}
function chair(g) {
  for (const x of [-325, 325]) {
    beam(g, [x, 18, 325], [x, 580, -210], 24, oak, 'Chair_FrontLeg');
    beam(g, [x, 18, -315], [x, 600, 270], 24, oak, 'Chair_BackLeg');
    mesh(g, box(60, 40, 700, 19), oak, x, 620, 0, 'Chair_Arm');
    beam(g, [x, 350, -270], [x, 840, -355], 22, oak, 'Chair_BackFrame');
  }
  mesh(g, box(670, 55, 670, 20), oakEdge, 0, 345, 10, 'Chair_Rail');
  mesh(g, box(620, 140, 660, 65), sand, 0, 425, 30, 'Chair_Seat');
  const b = mesh(g, box(620, 425, 130, 55), cream, 0, 655, -280, 'Chair_Back'); b.rotation.x = -.16;
  pillow(g, 0, 610, -140, olive, 330, .05);
}
function table(g) {
  // Soft oval keeps circulation clear around the central seating group.
  const top = mesh(g, new THREE.CylinderGeometry(1, 1, 32, 64), oak, 0, 382, 0, 'Coffee_Top'); top.scale.set(575, 1, 320);
  const shelf = mesh(g, new THREE.CylinderGeometry(1, 1, 22, 64), oak, 0, 160, 0, 'Coffee_Shelf'); shelf.scale.set(450, 1, 240);
  for (const x of [-365, 365]) for (const z of [-170, 170]) mesh(g, box(40, 366, 40, 12), oakEdge, x, 183, z, 'Coffee_Leg');
  mesh(g, box(230, 25, 175, 3), cream, -165, 411, 15, 'Book_Pages');
  mesh(g, box(234, 4, 180, 2), olive, -165, 425, 15, 'Book_Cover');
  mesh(g, new THREE.CylinderGeometry(115, 112, 16, 40), ink, 185, 406, 0, 'Tray');
  mesh(g, new THREE.CylinderGeometry(46, 58, 140, 32), clay, 180, 484, 0, 'Vase');
  beam(g, [180, 550, 0], [140, 760, 15], 3, olive, 'Vase_Stem');
  const leaf = mesh(g, new THREE.SphereGeometry(1, 14, 10), olive, 130, 708, 15, 'Vase_Leaf'); leaf.scale.set(45, 14, 85); leaf.rotation.z = -.7;
}
function rug(g) {
  const fabric = mat(0xd8ccb3, 'fabric');
  mesh(g, box(3000, 10, 2000, 4), fabric, 0, 7, 0, 'Rug').castShadow = false;
  const border = mat(0x9b9986, 'fabric');
  for (const z of [-875, 875]) for (const dz of [0, 28]) mesh(g, box(2780, 1, 12), border, 0, 12.5, z + dz, 'Rug_Stripe').castShadow = false;
  for (let i = 0; i < 44; i++) for (const x of [-1515, 1515]) mesh(g, box(30, 3, 6), fabric, x, 5, -950 + i * 44, 'Rug_Fringe').castShadow = false;
}
function floorLamp(g) {
  mesh(g, new THREE.CylinderGeometry(180, 190, 28, 40), ink, 0, 14, 0, 'Lamp_Base');
  mesh(g, new THREE.CylinderGeometry(12, 12, 1360, 16), oak, 0, 700, 0, 'Lamp_Stem');
  mesh(g, new THREE.CylinderGeometry(180, 235, 330, 48, 1, true), shade, 0, 1480, 0, 'Lamp_Shade').castShadow = false;
  const glow = new THREE.MeshStandardMaterial({ color: 0xffeacb, emissive: 0xffcc84, emissiveIntensity: .65 });
  mesh(g, new THREE.SphereGeometry(45, 20, 12), glow, 0, 1400, 0, 'Lamp_Bulb').castShadow = false;
  const light = new THREE.PointLight(0xffd7a2, .65, 3, 2); light.position.set(0, 1380, 0); g.add(light);
}
function plant(g) {
  mesh(g, new THREE.CylinderGeometry(200, 145, 340, 40), mat(0xb59e80), 0, 170, 0, 'Plant_Pot');
  mesh(g, new THREE.CylinderGeometry(188, 188, 8, 40), mat(0x403a2b), 0, 339, 0, 'Plant_Soil');
  const leaves = [mat(0x4e6645), mat(0x6b8055), mat(0x7a8964)];
  for (let i = 0; i < 12; i++) {
    const a = i * 2.4, h = 760 + (i % 4) * 210, r = 175 + (i % 3) * 35;
    const x = Math.sin(a) * r, z = Math.cos(a) * r;
    beam(g, [0, 320, 0], [x, h, z], 7, oakEdge, 'Plant_Stem');
    const l = mesh(g, new THREE.SphereGeometry(1, 18, 12), leaves[i % 3], x, h, z, 'Plant_Leaf');
    l.scale.set(82, 180, 22); l.rotation.set(.45, a, Math.sin(a) * .55);
  }
}
function artwork(g) {
  const paper = mat(0xe8dfc9), moss = mat(0x6e765a);
  for (const x of [-360, 360]) {
    mesh(g, box(620, 800, 28, 4), oak, x, 1720, 0, 'Art_Frame');
    mesh(g, box(578, 758, 5), paper, x, 1720, 17, 'Art_Paper');
    const disk = mesh(g, new THREE.CircleGeometry(175, 48), x < 0 ? moss : clay, x, 1810, 21, 'Art_Sun'); disk.scale.y = 1.25;
    mesh(g, box(430, 180, 2), x < 0 ? sand : moss, x + 25, 1530, 22, 'Art_Field');
  }
}
export function buildLoungeProposal() {
  const g = new THREE.Group(); g.name = 'Lounge_Proposal';
  sofa(piece(g, 'Sofa', 3450, 17760));
  rug(piece(g, 'RugGroup', 3550, 16690));
  table(piece(g, 'CoffeeTable', 3450, 16490));
  chair(piece(g, 'ReadingChair', 5270, 17160, -3 * Math.PI / 4));
  floorLamp(piece(g, 'FloorLamp', 1850, 17900));
  plant(piece(g, 'Plant', 5750, 17780));
  const side = piece(g, 'SideTable', 4900, 17860);
  mesh(side, new THREE.CylinderGeometry(210, 210, 25, 40), oak, 0, 515, 0, 'Side_Top');
  mesh(side, new THREE.CylinderGeometry(95, 130, 502, 32), oak, 0, 251, 0, 'Side_Base');
  // The SE wall has a slight angle in the measured shell; follow it with frames, never alter the wall.
  artwork(piece(g, 'Gallery', 3450, 18257, -Math.PI / 4 - .026));
  g.userData.description = 'Warm Nordic · 235 × 95 cm sofa, 115 × 64 cm oval table, 300 × 200 cm rug';
  return g;
}

export function originalLoungeObjects(root) {
  const groups = root.children.filter(o =>
    o.getObjectByName('Lounge_Sofa_Tan_Base') || o.getObjectByName('Lounge_CoffeeTable_A_Top'));
  for (const name of ['Lounge_Sofa_Charcoal_NYHAMN', 'Furniture_Figma_BlueSofa', 'Furniture_Photo_FloorLamp', 'Furniture_Photo_HighChair_ANTILOP']) {
    const o = root.getObjectByName(name); if (o) groups.push(o);
  }
  return [...new Set(groups)];
}
