// 2026-10-10: Walk "use" key (1, like Counter-Strike's +use): aim the centre crosshair at a thing and switch it.
// First five (Xip): doors (handled in app.js), TV, NYHAMN sofa bed, taps, drawers. Lights / curtains / fan come later.
// Units: millimetres in the model frame (everything here is added under the model root, so the Flip mirror follows).
import * as THREE from 'three';

const ease = (t) => t * t * (3 - 2 * t);
const lerp = THREE.MathUtils.lerp;

export function createInteractions(root) {
  const items = [];      // { id, label: [offText, onText], on, t, dur, apply(t), targets: [Object3D] }
  const targets = [];    // everything the crosshair ray may hit for an item (meshes or invisible hit boxes)
  const find = (re) => { const out = []; root.traverse((o) => { if (re.test(o.name || '')) out.push(o); }); return out; };
  const hitBox = (parent, size, pos) => {   // invisible box that makes small things (taps) easy to aim at
    const m = new THREE.Mesh(new THREE.BoxGeometry(...size), new THREE.MeshBasicMaterial({ visible: false }));
    m.position.set(...pos); m.name = 'Interact_HitBox'; parent.add(m); return m;
  };
  function add(item) {
    item.on = false; item.t = 0; items.push(item);
    for (const o of item.targets) { o.userData.interactItem = item; targets.push(o); }
  }

  // ---- TV: glowing picture + soft light on the room, standby LED red -> green ----
  for (const screen of find(/TV_Display$/)) {
    const c = document.createElement('canvas'); c.width = 512; c.height = 288; const g = c.getContext('2d');
    const sky = g.createLinearGradient(0, 0, 0, 288); sky.addColorStop(0, '#2b6cb0'); sky.addColorStop(0.55, '#f6b26b'); sky.addColorStop(0.56, '#1f7a8c'); sky.addColorStop(1, '#0b3c49');
    g.fillStyle = sky; g.fillRect(0, 0, 512, 288);
    g.fillStyle = '#ffe9b0'; g.beginPath(); g.arc(380, 150, 26, 0, Math.PI * 2); g.fill();                 // sun over the sea
    g.fillStyle = 'rgba(255,255,255,.92)'; g.font = 'bold 30px sans-serif'; g.fillText('Atlantis · Melaka', 28, 58);
    const tex = new THREE.CanvasTexture(c); tex.colorSpace = THREE.SRGBColorSpace;
    const off = screen.material, onMat = off.clone(); onMat.emissive = new THREE.Color(0xffffff); onMat.emissiveMap = tex; onMat.emissiveIntensity = 0;
    screen.material = onMat;
    const glow = new THREE.PointLight(0x9fc4ff, 0, 3.5, 2); glow.position.set(0, 0, -600); screen.add(glow);   // in front of the screen (front = -Z)
    const led = screen.parent ? screen.parent.children.find((o) => /TV_Standby$/.test(o.name || '')) : null;
    // The model root is mirrored (Flip, scale.x < 0), which also mirrors the picture: read it the right way round
    // by flipping the texture whenever the screen's world transform is mirrored (checked each frame, so Flip on/off both work).
    tex.wrapS = THREE.RepeatWrapping; let mirrored = null;
    const fixMirror = () => { const m = screen.matrixWorld.determinant() < 0; if (m !== mirrored) { mirrored = m; tex.repeat.x = m ? -1 : 1; tex.offset.x = m ? 1 : 0; tex.needsUpdate = true; } };
    add({ id: 'tv', label: ['Turn on TV', 'Turn off TV'], dur: 0.35, targets: [screen], tick: fixMirror,
      apply: (t) => { onMat.emissiveIntensity = 1.1 * t; glow.intensity = 1.6 * t; if (led) led.material.color.setHex(t > 0.5 ? 0x2bd46a : 0x8c211b); } });
  }

  // ---- NYHAMN sofa bed: seat, slats and front legs slide out ~430 mm, the back folds flat = 140 × 200 bed ----
  const sofa = root.getObjectByName('Lounge_Sofa_Charcoal_NYHAMN');
  if (sofa) {
    const parts = [], OUT = 430;
    sofa.traverse((o) => {
      const n = o.name || '';
      const front = /SteelLeg|FootCap|LongRail/.test(n) && o.position.z > 0;           // front legs + front rail
      if (/SeatMattress|SeatPiping|CoverFold|FrontPullStrap|BentwoodSlat/.test(n) || front) parts.push({ o, z0: o.position.z });
    });
    const back = sofa.getObjectByName('Lounge_Sofa_Charcoal_BackMattress')?.parent;
    const b0 = back ? { y: back.position.y, z: back.position.z, r: back.rotation.x } : null;
    add({ id: 'sofabed', label: ['Unfold to bed', 'Fold to sofa'], dur: 1.2, targets: [sofa],
      apply: (t) => {
        const e = ease(t);
        for (const p of parts) p.o.position.z = p.z0 + OUT * e;
        if (back) { back.rotation.x = lerp(b0.r, -Math.PI / 2, e); back.position.y = lerp(b0.y, 260, e); back.position.z = lerp(b0.z, -120, e); }
      } });
  }

  // ---- Taps: water stream from the spout down to the basin / sink (positions in the tap's parent frame) ----
  const TAPS = [
    { re: /Sink_Tap$/, tip: () => [45, 1075, 0], stop: 723 },                                   // kitchen gooseneck (room-photo-models)
    { re: /Vanity_Tap$/, tip: (m) => [m.position.x, 1000, m.position.z + 35], stop: 892 },       // Bath 1 pillar tap
    { re: /Basin_TapSpout$/, tip: (m) => [m.position.x, 972, m.position.z + 55], stop: 857 },    // Bath 2 wall basin spout
  ];
  const water = new THREE.MeshPhysicalMaterial({ color: 0xd6efff, roughness: 0.05, transparent: true, opacity: 0.6, emissive: 0x1a2a38, depthWrite: false });
  for (const spec of TAPS) for (const tap of find(spec.re)) {
    const parent = tap.parent, [x, y, z] = spec.tip(tap), len = Math.max(40, y - spec.stop);
    const geo = new THREE.CylinderGeometry(6, 7, len, 10, 1, true); geo.translate(0, -len / 2, 0);   // grows downward from the tip
    const stream = new THREE.Mesh(geo, water); stream.position.set(x, y, z); stream.scale.y = 0.001; stream.visible = false; stream.name = 'Interact_Water';
    parent.add(stream);
    add({ id: 'tap', label: ['Turn on tap', 'Turn off tap'], dur: 0.3, targets: [tap, hitBox(parent, [260, 260, 260], [x, y - 60, z])],
      apply: (t) => { stream.visible = t > 0.001; stream.scale.y = Math.max(0.001, t); },
      tick: () => { if (stream.visible) stream.scale.x = stream.scale.z = 0.9 + Math.random() * 0.25; } });   // a little flicker = running water
  }

  // ---- Drawers: bedside cabinets (front = local +X) and the TV console end doors (front = local -Z) ----
  for (const body of find(/Bedside_Body$/)) {
    const cab = body.parent, p = body.geometry.parameters, w = p.width, d = p.depth;
    const drawer = new THREE.Group(); drawer.name = 'Interact_Drawer'; cab.add(drawer);
    const inside = new THREE.MeshStandardMaterial({ color: 0xcdbfa9, roughness: 0.8 });
    const front = new THREE.Mesh(new THREE.BoxGeometry(16, 140, d - 30), body.material); front.position.set(w / 2 + 6, 410, 0); drawer.add(front);
    const tray = new THREE.Mesh(new THREE.BoxGeometry(w - 70, 8, d - 70), inside); tray.position.set(w / 2 - (w - 70) / 2 - 4, 352, 0); drawer.add(tray);
    for (const s of [-1, 1]) { const side = new THREE.Mesh(new THREE.BoxGeometry(w - 70, 100, 10), inside); side.position.set(tray.position.x, 400, s * (d - 80) / 2); drawer.add(side); }
    const knob = cab.children.find((o) => /Bedside_Knob$/.test(o.name || '')); if (knob) drawer.attach(knob);
    add({ id: 'drawer', label: ['Open drawer', 'Close drawer'], dur: 0.45, targets: [drawer, body],
      apply: (t) => { drawer.position.x = 260 * ease(t); } });
  }
  for (const door of find(/Console_EndDoor$/)) {
    const p = door.geometry.parameters, inside = new THREE.MeshStandardMaterial({ color: 0xe9e9e6, roughness: 0.7 });
    const tray = new THREE.Mesh(new THREE.BoxGeometry(p.width - 30, 8, 300), inside); tray.position.set(0, -p.height / 2 + 30, 160); door.add(tray);
    for (const s of [-1, 1]) { const side = new THREE.Mesh(new THREE.BoxGeometry(10, 120, 300), inside); side.position.set(s * (p.width / 2 - 20), -p.height / 2 + 90, 160); door.add(side); }
    const z0 = door.position.z;
    add({ id: 'drawer', label: ['Open drawer', 'Close drawer'], dur: 0.45, targets: [door],
      apply: (t) => { door.position.z = z0 - 280 * ease(t); } });
  }

  // ---- Breakfast pass-through window (breakfast-model.js): 3 frosted sliding panels on 3 tracks ----
  // Xip 2026-10-10: two states. Open = all panels pushed to the far left (the photo, as modelled);
  // closed = all panels pushed to the far right. Panels move one after another, like real sliding sashes.
  const pass = find(/^PassThrough_Frosted_\d$/);
  if (pass.length) {
    const g = pass[0].parent, track = g.children.find((o) => o.name === 'PassThrough_HeadTrack');
    const length = track ? track.geometry.parameters.width - 60 : 0, occupied = length * 0.48, shift = length - occupied;
    const panels = pass.map((p) => ({ p, x0: p.position.x, mull: g.children.filter((o) => o.name === 'PassThrough_Mullion' && Math.abs(o.position.z - p.position.z) < 1).map((m) => ({ m, x0: m.position.x })) }));
    for (const pn of panels) pn.mull = pn.mull.filter(({ x0 }) => Math.abs(x0 - pn.x0) < length * 0.1);   // this panel's own side frames
    const rails = g.children.filter((o) => o.name === 'PassThrough_PanelRail').map((r) => ({ r, x0: r.position.x }));
    if (length > 0) add({ id: 'passthrough', label: ['Close window', 'Open window'], dur: 1.4,
      targets: [...pass, ...panels.flatMap((pn) => pn.mull.map(({ m }) => m)), ...rails.map(({ r }) => r)],
      apply: (t) => {
        panels.forEach((pn, i) => {           // the rightmost panel leads when closing, the leftmost leads when opening
          const k = ease(THREE.MathUtils.clamp((t - (panels.length - 1 - i) * 0.12) / (1 - 0.24), 0, 1)), dx = shift * k;
          pn.p.position.x = pn.x0 + dx; for (const { m, x0 } of pn.mull) m.position.x = x0 + dx;
        });
        for (const { r, x0 } of rails) r.position.x = x0 + shift * ease(t);
      } });
  }

  function itemOf(object) { let o = object; while (o) { if (o.userData?.interactItem) return o.userData.interactItem; o = o.parent; } return null; }
  function toggle(item) { item.on = !item.on; }
  function update(dt) {
    for (const it of items) {
      const goal = it.on ? 1 : 0;
      if (it.t !== goal) { it.t = goal > it.t ? Math.min(1, it.t + dt / it.dur) : Math.max(0, it.t - dt / it.dur); it.apply(it.t); }
      if (it.tick) it.tick(dt);
    }
  }
  const labelFor = (item) => item.label[item.on ? 1 : 0];
  root.userData.interactions = items.map((i) => i.id);
  return { items, targets, itemOf, toggle, update, labelFor };
}
