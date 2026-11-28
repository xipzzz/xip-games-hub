// 2026-10-18 (Xip): IKEA wall frames on the living-room TV wall (Wall_Figma_132_14), three slots.
// Data: ikea-frames.json (real IKEA MY / SG pages; RM and S$ for the hung size, null = not verified).
// Frames are children of the model root named Furniture_IKEA_Frame_*, so the existing hover outline + price tag
// work unchanged; the existing table menu (app.js openTableMenu) lists the nine frames when a frame is aimed at.
// To remove: delete this file + ikea-frames.json and the lines in app.js marked "frames.js".
// 2026-10-19 (Xip): extra scheme 'featurewall' (?frames=featurewall): a What Chill salon wall of mixed IKEA frames on
// the SE sofa wall (Wall_Figma_132_6), data + layout in frames-featurewall.json, art in assets/frames-art/.
// The TV-wall frames stay as they are; the feature wall is only built when the URL asks for it.
import * as THREE from 'three';

// Wall face: plane x + z = -19.926 (world metres in the default mirrored plan; root scale (-0.001, 0.001, 0.001) at the origin), facing (-0.707, 0, -0.707) into the room.
// Points are on the wall surface at the frame centre; height = centre height above the floor.
const SLOTS = {
  A: { pos: [-11.4835, 1.45, -8.4425], label: 'beside the TV' },
  B: { pos: [-12.6855, 1.98, -7.2405], label: 'above the TV, left' },
  C: { pos: [-12.1905, 1.98, -7.7355], label: 'above the TV, right' },
};
const FINISH = {
  white: { color: 0xf3f2ee, roughness: .55, metalness: 0 },
  black: { color: 0x1c1c1e, roughness: .5, metalness: 0 },
  pine: { color: 0xd8b886, roughness: .7, metalness: 0 },
  'gold-colour': { color: 0xb59457, roughness: .45, metalness: .55 },
  'oak effect': { color: 0xc49a66, roughness: .62, metalness: 0 },
  'birch effect': { color: 0xdcc39a, roughness: .62, metalness: 0 },
};
const TV_THETA = 3 * Math.PI / 4;   // holder rotation for the TV wall (see addSlot)
export const FRAME_SCHEME = (() => { const v = new URLSearchParams(location.search).get('frames') || ''; return /^(featurewall|chill)/.test(v) ? 'featurewall' : 'tv'; })();
const ART_CROP = { A: 0.36, B: 0.55, C: 0.72 };   // horizontal crop centre in exterior-view.jpg per slot

export function createFrames(root) {
  const api = { slots: {}, products: [], all: [], scheme: FRAME_SCHEME, ready: false };
  const images = {};
  const loadImage = (src) => images[src] || (images[src] = new Promise((res) => { const im = new Image(); im.onload = () => res(im); im.onerror = () => { console.warn('[atlantis] frame art missing', src); res(null); }; im.src = src; }));
  const panorama = new Promise((res) => { const im = new Image(); im.onload = () => res(im); im.onerror = () => res(null); im.src = './exterior-view.jpg'; });
  const artTex = async (slot, w, h) => {   // TV wall: crop of the outdoor panorama; feature wall: the slot's own artwork
    const def = api.slots[slot];
    if (def?.art) {   // cover-crop the artwork to the opening, centred (focus_y moves the crop up / down)
      const im = await loadImage(def.art); if (!im) return null;
      const ar = w / h, iar = im.width / im.height; let sw = im.width, sh = im.height;
      if (iar > ar) sw = sh * ar; else sh = sw / ar;
      const sx = (im.width - sw) / 2, sy = Math.min(im.height - sh, Math.max(0, im.height * (def.focus_y ?? .5) - sh / 2));
      const c = document.createElement('canvas'); c.width = Math.round(512 * Math.min(1, ar)); c.height = Math.round(512 * Math.min(1, 1 / ar));
      c.getContext('2d').drawImage(im, sx, sy, sw, sh, 0, 0, c.width, c.height);
      const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 8; return t;
    }
    const im = await panorama; if (!im) return null;
    const ch = im.height * 0.62, cw = Math.min(im.width, ch * w / h), c = document.createElement('canvas');
    c.width = Math.round(512 * Math.min(1, w / h)); c.height = Math.round(512 * Math.min(1, h / w));
    c.getContext('2d').drawImage(im, im.width * ART_CROP[slot] - cw / 2, im.height * 0.5 - ch / 2, cw, ch, 0, 0, c.width, c.height);
    const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 8; return t;
  };
  const product = (p) => ({
    name: 'IKEA ' + p.name + ' frame, ' + p.finish,
    size: p.size_cm.join(' × ') + ' cm · outer ' + p.outer_cm.join(' × ') + ' × ' + p.depth_cm + ' cm',
    price: p.price_rm == null ? 'n/a' : p.price_rm,
    note: (p.price_sgd == null ? 'S$ n/a' : 'S$' + p.price_sgd.toFixed(2)) + ' · ' + p.finish + (p.note && p.price_sgd != null ? ' · ' + p.note : ''),
    url: p.url_my,
  });
  async function build(slotId, p) {   // metres; back of the frame on the wall, front towards the room (+z)
    const g = new THREE.Group(); g.name = 'Furniture_IKEA_Frame_' + slotId + '_' + p.id;
    const s = api.slots[slotId], rot = s?.orient === 'landscape' ? (a) => [a[1], a[0]] : (a) => a;
    const [W, H] = rot(p.outer_cm).map((v) => v / 100), D = p.depth_cm / 100;
    const [pw, ph] = rot(p.size_cm).map((v) => v / 100);
    const bw = Math.max(0.01, (W - pw) / 2), bh = Math.max(0.01, (H - ph) / 2);   // visible border from outer vs picture size
    const f = FINISH[p.finish] || FINISH.white, mat = new THREE.MeshStandardMaterial(f);
    const bar = (w, h, x, y) => { const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, D), mat); m.position.set(x, y, D / 2); m.name = g.name + '_Border'; g.add(m); };
    bar(W, bh, 0, H / 2 - bh / 2); bar(W, bh, 0, -H / 2 + bh / 2); bar(bw, H - 2 * bh, -W / 2 + bw / 2, 0); bar(bw, H - 2 * bh, W / 2 - bw / 2, 0);
    const back = new THREE.Mesh(new THREE.PlaneGeometry(W - 2 * bw, H - 2 * bh), new THREE.MeshStandardMaterial({ color: 0xfbfbf8, roughness: .9 }));
    back.position.z = Math.min(D * .5, .008); back.name = g.name + '_Mount'; g.add(back);
    const useMount = p.mount_opening_cm && (s?.mount ?? true);   // feature wall: most prints go in without the mount
    const [aw, ah] = useMount ? rot(p.mount_opening_cm).map((v) => v / 100) : [W - 2 * bw, H - 2 * bh];
    const tex = await artTex(slotId, aw, ah);
    const art = new THREE.Mesh(new THREE.PlaneGeometry(aw, ah), new THREE.MeshStandardMaterial({ map: tex, color: tex ? 0xffffff : 0xdfe3e6, roughness: .8 }));
    art.position.z = back.position.z + .001; art.name = g.name + '_Art'; g.add(art);
    return g;
  }
  async function set(slotId, id) {
    const s = api.slots[slotId], p = api.all.find((x) => x.id === id); if (!s || !p) return;
    const g = await build(slotId, p);
    if (s.current) { s.holder.remove(s.current); s.current.traverse((o) => { o.geometry?.dispose?.(); if (o.material) { o.material.map?.dispose?.(); o.material.dispose?.(); } }); }
    s.holder.add(g); s.current = g; s.id = id; s.holder.userData.product = product(p);
  }
  function slotOf(object) { for (let o = object; o; o = o.parent) if (o.userData?.frameSlot) return o.userData.frameSlot; return null; }
  api.set = set; api.slotOf = slotOf;
  // Menu options for a slot: TV wall = the nine products (unchanged); feature wall = every verified product of the
  // same picture size (so a swap keeps the salon layout), from ikea-frames.json + frames-featurewall.json.
  const sizeKey = (p) => [...p.size_cm].sort((a, b) => a - b).join('x');
  api.optionsFor = (slot) => {
    if (!slot?.scheme || slot.scheme === 'tv') return api.products;
    const cur = api.all.find((x) => x.id === slot.id), seen = new Set();
    return api.all.filter((x) => cur && sizeKey(x) === sizeKey(cur) && !seen.has(x.url_my) && seen.add(x.url_my));
  };
  // One holder per frame under the model root. pos = world point on the wall face (default mirrored plan);
  // local = world / root scale, with x always mirrored (|sx| = 0.001), and the holder scale cancels root's.
  // Front faces world normal n when theta = -atan2(n.x, n.z) (same in either plan direction).
  function addSlot(id, def) {
    const sx = Math.abs(root.scale.x), sy = root.scale.y, sz = root.scale.z, [x, y, z] = def.pos;
    const holder = new THREE.Group(); holder.name = 'Furniture_IKEA_Frame_Slot' + id;
    holder.position.set(-x / sx, y / sy, z / sz);
    holder.scale.set(1 / root.scale.x, 1 / sy, 1 / sz);
    holder.rotation.y = def.theta;
    const slot = { id: null, slotId: id, label: def.label, holder, current: null, scheme: def.scheme || 'tv', art: def.art, mount: def.mount, orient: def.orient, focus_y: def.focus_y };
    holder.userData.frameSlot = slot; api.slots[id] = slot; root.add(holder);
    return slot;
  }
  api.load = fetch('./ikea-frames.json').then((r) => r.json()).then(async (data) => {
    api.products = data.frames; api.all = [...data.frames];
    root.updateMatrixWorld(true);
    for (const [id, def] of Object.entries(SLOTS)) {
      addSlot(id, { ...def, theta: TV_THETA });
      await set(id, (data.default || {})[id] || 'roedalm');
    }
    if (api.scheme === 'featurewall') await loadFeatureWall();
    api.ready = true;
    console.info('[atlantis] IKEA frames hung:', Object.values(api.slots).map((s) => s.slotId + '=' + s.id).join(' '));
    return api;
  });
  async function loadFeatureWall() {
    const fw = await (await fetch('./frames-featurewall.json')).json();
    api.featurewall = fw; api.all.push(...fw.catalogue);
    const n = fw.wall.normal, o = fw.wall.origin, right = [n[2], 0, -n[0]], theta = -Math.atan2(n[0], n[2]);
    api.wallPoint = (xcm, ycm, out = 0) => [o[0] + right[0] * xcm / 100 + n[0] * out, ycm / 100 + o[1], o[2] + right[2] * xcm / 100 + n[2] * out];
    await Promise.all(fw.slots.map((s) => {
      addSlot(s.id, { pos: api.wallPoint(s.x_cm, s.y_cm), theta, label: s.label, scheme: 'featurewall', art: s.art, mount: s.mount, orient: s.orient, focus_y: s.focus_y });
      return set(s.id, s.product);
    }));
    // The proposal / ikea / grok layouts hang their own two-print 'Proposal_Gallery' on this wall. Only while this
    // scheme is asked for, hide it so the salon does not overlap it (the layouts themselves are untouched).
    const hideClash = () => root.traverse((o) => { if (o.name === 'Proposal_Gallery') o.visible = false; });
    hideClash(); setTimeout(hideClash, 3000);
    const total = (k) => fw.slots.reduce((t, s) => { const v = api.all.find((p) => p.id === s.product)?.[k]; return v == null || t == null ? null : t + v; }, 0);
    console.info('[atlantis] feature wall:', fw.slots.length, 'frames, RM' + total('price_rm'), 'S$' + (total('price_sgd')?.toFixed(2) ?? 'n/a'));
  }
  return api;
}

// Screenshot aid (like ?panel=hidden; no UI): ?frames=tv (all three frames) or ?frames=tv-close (slot A),
// optional &framemenu=A|B|C opens the frame menu for that slot once everything has loaded.
const shotParams = new URLSearchParams(location.search);
if (shotParams.get('frames')) (async () => {
  const CAMS = { tv: { pos: [-14.8, 1.5, -10.3], look: [-12.2, 1.62, -7.9] }, 'tv-close': { pos: [-13.0, 1.45, -9.95], look: [-11.494, 1.45, -8.453] } };
  const name = shotParams.get('frames');
  while (!(window.__atlantis?.frames?.ready && document.getElementById('load-overlay')?.hidden)) await new Promise((r) => setTimeout(r, 200));
  const fwp = window.__atlantis.frames.wallPoint;   // feature wall cameras: from the TV side, square to the sofa wall
  if (fwp) { CAMS.featurewall = CAMS.chill = { pos: fwp(20, 158, 3.75), look: fwp(20, 168, 0) }; CAMS['featurewall-close'] = { pos: fwp(55, 165, 2.0), look: fwp(45, 170, 0) }; }
  const cam = CAMS[name]; if (!cam) return;
  const a = window.__atlantis, flip = a.root.scale.x < 0, V = (p) => new THREE.Vector3(flip ? -p[0] : p[0], p[1], p[2]);   // goToView mirrors x itself
  a.goToView({ id: 'frames', label: /^(featurewall|chill)/.test(name) ? 'Living room · Feature wall' : 'Living room · TV wall', pos: V(cam.pos), look: V(cam.look) });
  const slot = a.frames.slots[shotParams.get('framemenu')];
  await new Promise((r) => setTimeout(r, 1200));
  if (slot) { const r = a.renderer.domElement.getBoundingClientRect(); a.openTableMenu(r.left + r.width - 330, r.top + r.height / 2, slot); }
  document.title = 'FRAMES READY ' + shotParams.get('frames') + (slot ? ' menu' : '');
})();
