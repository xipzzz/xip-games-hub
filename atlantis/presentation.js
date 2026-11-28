// Presentation mode: Samnang's plan-to-walk mechanics on this unit's model.
// Scroll is Lenis (duration 1.6) driven by the GSAP ticker. The camera is not a ScrollTrigger scrub.
import * as THREE from 'three';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { GTAOPass } from 'three/addons/postprocessing/GTAOPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { ShaderPass } from 'three/addons/postprocessing/ShaderPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';

const DEG = Math.PI / 180;
const MAX = 16;
const SCROLL_SCALE = 0.85;
const CAM_WEIGHT = 3.6;
const LENIS_DURATION = 1.6;
const lenisEase = (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t));
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const lerp = (a, b, t) => a + (b - a) * t;
const smooth = (t) => { t = clamp(t, 0, 1); return t * t * (3 - 2 * t); };
const span = (x, a, b) => clamp((x - a) / ((b - a) || 1), 0, 1);
const easeIO = (t) => 0.5 - 0.5 * Math.cos(Math.PI * clamp(t, 0, 1));
const OFF = 1e5;
// Grade exposure. Paper and ink below are the linear colours that land on
// (0.937, 0.922, 0.886) and (0.13, 0.13, 0.14) after ACES, gamma, warmth, contrast and saturation.
const GRADE_EXPOSURE = 0.48;
const PAPER_LIN = [1.29, 1.213, 1.025];
const INK_LIN = [0.051, 0.051, 0.055];

// Floor outline in model millimetres (same polygon as lighting.js).
const FLOOR = [[3253, 3336], [12102, 3336], [12316, 3786], [14181, 3786], [19100, 6753], [11957, 14246], [11024, 13303], [10271, 14010], [10799, 14527], [9513, 13034], [8186, 11912], [3253, 11912]];

const FALLBACK_XZ = { bed1: [-4.7, -4.7], bed2: [-9.63, -3.73], bath2: [-3.7, -8.85] };
const ROOM_SPECS = [
  { id: 'entry', name: 'Entry', door: 'Door_135_72_Leaf', side: 'in' },
  { id: 'living', name: 'Living room', pred: (n) => n.startsWith('Lounge_Sofa_') },
  { id: 'breakfast', name: 'Breakfast bar', pred: (n) => n.includes('Breakfast_') },
  { id: 'kitchen', name: 'Kitchen', pred: (n) => n.startsWith('Furniture_Kitchen_') },
  { id: 'bath2', name: 'Bathroom 2', pred: (n) => n.includes('Bath2') },
  { id: 'service', name: 'Service balcony', door: 'Door_135_74_Leaf', side: 'out' },
  { id: 'wardrobe', name: 'Wardrobe', pred: (n) => n.startsWith('Furniture_Wardrobe_') },
  { id: 'bed1', name: 'Bedroom 1', pred: (n) => n.startsWith('Furniture_Figma_196_310') || n.startsWith('Furniture_Figma_196_318') },
  { id: 'bath1', name: 'Bathroom 1', pred: (n) => n.includes('Bath1') },
  { id: 'bed2', name: 'Bedroom 2', pred: (n) => n.startsWith('Furniture_Figma_196_293') },
  { id: 'study', name: 'Study', pred: (n) => n.startsWith('Furniture_Study_') },
  { id: 'balcony', name: 'Living balcony', door: 'Door_Sliding_232_2_Leaf', side: 'out' },
];

const SHADE_HEAD = `
uniform float uLive; uniform float uCutY; uniform float uCutOn; uniform float uFill;
uniform vec3 uPaper; uniform vec3 uInk; uniform vec3 uAccent;
uniform vec4 uMap; uniform sampler2D uRoomMap;
uniform float uRV[${MAX}]; uniform vec4 uRO[${MAX}]; uniform vec4 uRD[${MAX}];
uniform float uXV; uniform vec4 uXO; uniform vec4 uXD;
uniform float uHatch; uniform float uGlass; uniform float uGlassOp; uniform float uSection;
varying vec3 vDrawW; varying float vCutH;
float gRev; vec4 gOrg; vec4 gDir; float gRing;
float rh2(vec2 p) { return fract(sin(dot(p, vec2(41.3, 289.1))) * 43758.5453); }
float lineAA(float c, float period, float width) {
  float f = abs(fract(c / period + 0.5) - 0.5) * period;
  float px = max(fwidth(c), 1e-4), w = px * width;
  return (1.0 - smoothstep(w * 0.5, w * 1.5, f)) * (1.0 - smoothstep(period * 0.16, period * 0.4, px));
}
void roomPick(vec3 wp) {
  gRev = uXV; gOrg = uXO; gDir = uXD;
  vec2 uv = (wp.xz - uMap.xy) / max(uMap.zw, vec2(1e-4));
  if (uv.x < 0.0 || uv.y < 0.0 || uv.x > 1.0 || uv.y > 1.0) return;
  float idx = texture2D(uRoomMap, uv).r * 255.0;
  for (int i = 0; i < ${MAX}; i++) {
    float sel = 1.0 - step(0.5, abs(float(i + 1) - idx));
    gRev = mix(gRev, uRV[i], sel);
    gOrg = mix(gOrg, uRO[i], sel);
    gDir = mix(gDir, uRD[i], sel);
  }
}
float hatchOf(vec3 wp, vec3 wn) {
  bool horiz = abs(wn.y) > 0.7;
  vec2 q = horiz ? wp.xz : vec2(abs(wn.x) > abs(wn.z) ? wp.z : wp.x, wp.y);
  if (uHatch < 0.5) return 0.0;
  if (uHatch < 1.5) {
    vec2 cell = (fract((q + vec2(0.3, 0.3)) / 0.6) - 0.5) * 0.6;
    float fw = max(fwidth(q.x), fwidth(q.y));
    float r = max(0.018, fw * 0.9);
    float ties = 1.0 - smoothstep(r * 0.7, r * 1.3, length(cell));
    return horiz ? 0.0 : ties * 0.8 * (1.0 - smoothstep(0.011, 0.026, fw));
  }
  if (uHatch < 2.5) {
    // 2026-10-20: floors stay clean paper (the 1.2 x 0.6 joints printed as grid seams across the plan sheet).
    // Walls: a flat tone per face direction instead of brick courses, so faces meet in one crisp edge
    // (the courses aliased into scratchy, doubled stair-step lines on the rising walls).
    float tone = 0.07 + 0.09 * abs(wn.x) + 0.03 * abs(wn.z);
    return horiz ? 0.0 : tone;
  }
  if (uHatch < 3.5) return horiz ? 0.0 : lineAA(q.x, 0.16, 1.0) * 0.6;
  float d = q.x - q.y * 0.85;
  return clamp(lineAA(d, 2.4, 1.2) + lineAA(d + 0.3, 2.4, 1.0), 0.0, 1.0) * 0.55 * (1.0 - smoothstep(0.014, 0.034, max(fwidth(q.x), fwidth(q.y))));
}
float revealAt(vec3 wp, vec3 wn) {
  float rev = gRev; vec4 org = gOrg;
  float on = step(0.001, rev) * step(rev, 0.998);
  bool both = gDir.z < 0.0;
  float L = max(abs(gDir.z), 1e-3);
  float H = max(gDir.w, 0.5);
  float front = rev * 1.08 - 0.04 + (uFill - uFill);
  vec3 cw = wp; vec2 id; float edge;
  if (abs(wn.y) > 0.7) {
    vec2 sz = abs(gDir.x) > 0.5 ? vec2(0.6, 1.2) : vec2(1.2, 0.6);
    if (wn.y < -0.7) sz = abs(gDir.x) > 0.5 ? vec2(0.6, 4000.0) : vec2(4000.0, 0.6);
    vec2 c = (wp.xz + 1000.0) / sz;
    if (sz.x > sz.y) c.x += 0.5 * mod(floor(c.y), 2.0); else c.y += 0.5 * mod(floor(c.x), 2.0);
    id = floor(c); vec2 f = fract(c);
    edge = min(min(f.x, 1.0 - f.x) * sz.x, min(f.y, 1.0 - f.y) * sz.y);
    vec2 ctr = id + 0.5;
    if (sz.x > sz.y) ctr.x -= 0.5 * mod(id.y, 2.0); else ctr.y -= 0.5 * mod(id.x, 2.0);
    cw.xz = ctr * sz - 1000.0;
  } else {
    bool nx = abs(wn.x) > abs(wn.z);
    vec2 c = vec2(nx ? wp.z : wp.x, wp.y) / 1.2;
    id = floor(c); vec2 f = fract(c);
    edge = min(min(f.x, 1.0 - f.x), min(f.y, 1.0 - f.y)) * 1.2;
    vec2 ctr = (id + 0.5) * 1.2;
    if (nx) cw.z = ctr.x; else cw.x = ctr.x;
    cw.y = ctr.y; id += 37.0;
  }
  vec2 dc = cw.xz - org.xz;
  float ac = dot(dc, gDir.xy) / L;
  ac = clamp(both ? abs(ac) : ac, 0.0, 1.0);
  float t = 0.82 * ac + 0.1 * rh2(id) + 0.08 * clamp(cw.y / H, 0.0, 1.0);
  float local = (front - t) / 0.07;
  float px = max(length(fwidth(wp)), 1e-4);
  float line = 1.0 - smoothstep(px * 0.5, px * 1.8, edge);
  float band = max(1.0, L / 9.0);
  gRing = line * smoothstep(0.0, 0.3, local) * (1.0 - smoothstep(1.3 / band, 2.4 / band, local)) * on;
  return rev >= 0.999 ? 1.0 : smoothstep(0.45, 1.15, local);
}
`;

const GRADE = {
  uniforms: {
    tDiffuse: { value: null },
    vignette: { value: 0.32 },
    warmth: { value: 0.06 },
    contrast: { value: 1.14 },
    saturation: { value: 1.04 },
    exposure: { value: GRADE_EXPOSURE },
    res: { value: new THREE.Vector2(1, 1) },
    px: { value: new THREE.Vector2(1, 1) },
    paperOn: { value: 0 },
    paperCol: { value: new THREE.Vector3(0.937, 0.922, 0.886) },
    inkCol: { value: new THREE.Vector3(0.13, 0.13, 0.14) },
  },
  vertexShader: `varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,
  fragmentShader: `
    uniform sampler2D tDiffuse; uniform float vignette; uniform float warmth; uniform float contrast; uniform float saturation; uniform float exposure;
    uniform vec2 res; uniform vec2 px; uniform float paperOn; uniform vec3 paperCol; uniform vec3 inkCol;
    varying vec2 vUv;
    vec3 aces(vec3 x){ return clamp((x * (2.51 * x + 0.03)) / (x * (2.43 * x + 0.59) + 0.14), 0.0, 1.0); }
    float lum(vec3 c){ return dot(c, vec3(0.2126, 0.7152, 0.0722)); }
    void main(){
      vec4 sc = texture2D(tDiffuse, vUv);
      // Lone ink pixels are hairline cracks between stacked wall boxes (the box's inside shows through), not poche:
      // take the neighbours' value instead. Real poche and 1 px wall lines always have 2+ ink neighbours.
      if (sc.a < 0.92 && sc.b > 0.45) {
        float n = 0.0; vec4 acc = vec4(0.0); float m = 0.0;
        for (int j = -1; j <= 1; j++) for (int i = -1; i <= 1; i++) {
          if (i == 0 && j == 0) continue;
          vec4 s2 = texture2D(tDiffuse, vUv + vec2(float(i), float(j)) * px);
          bool ink = s2.a < 0.92 && s2.b > 0.45;
          n += ink ? 1.0 : 0.0;
          if (!ink && (i == 0 || j == 0)) { acc += s2; m += 1.0; }
        }
        if (n < 2.0 && m > 0.0) sc = acc / m;
      }
      vec3 c;
      if (sc.a < 0.92 && sc.b > 0.45) c = inkCol;
      else if (sc.a < 0.92 && sc.b < 0.2) {
        float hatch = clamp(sc.r / max(sc.a / 0.5, 0.25), 0.0, 1.0);
        float ring = smoothstep(0.25, 0.85, sc.g);
        c = mix(paperCol, inkCol, hatch * 0.85);
        c = mix(c, vec3(0.86, 0.38, 0.14) * 2.2, ring);
      } else {
        vec3 hdr = max(sc.rgb, 0.0) * exposure;
        c = aces(hdr);
        c = pow(max(c, 0.0), vec3(1.0 / 2.2));
        c.r *= 1.0 + warmth * 0.08; c.b *= 1.0 - warmth * 0.1;
        float l = lum(c);
        c = mix(vec3(l), c, saturation);
        c = (c - 0.5) * contrast + 0.5;
      }
      vec2 q = vUv - 0.5; q.x *= res.x / max(res.y, 1.0);
      c *= mix(1.0, smoothstep(1.15, 0.2, length(q)), vignette);
      gl_FragColor = vec4(clamp(c, 0.0, 1.0), 1.0);
    }
  `,
};

function insideFloor(x, y) {
  let c = false;
  for (let i = 0, j = FLOOR.length - 1; i < FLOOR.length; j = i++) {
    const [xi, yi] = FLOOR[i], [xj, yj] = FLOOR[j];
    if ((yi > y) !== (yj > y) && x < (xj - xi) * (y - yi) / (yj - yi) + xi) c = !c;
  }
  return c;
}

function catmull(p0, p1, p2, p3, f) {
  const r = f * f;
  return 0.5 * (2 * p1 + (-p0 + p2) * f + (2 * p0 - 5 * p1 + 4 * p2 - p3) * r + (3 * p1 - p0 - 3 * p2 + p3) * r * f);
}

function loadScript(src) {
  return new Promise((resolve, reject) => {
    if (document.querySelector(`script[data-pres="${src}"]`)) { resolve(); return; }
    const s = document.createElement('script');
    s.src = src; s.async = false; s.dataset.pres = src;
    s.onload = () => resolve();
    s.onerror = () => reject(new Error('script'));
    document.head.appendChild(s);
  });
}

export function createPresentation(api) {
  const { scene, renderer, camera, host, getRoot, getMode, setMode, setCeiling, getExterior, lights, getLabels, getWallEdges } = api;
  const cutPlane = new THREE.Plane(new THREE.Vector3(0, -1, 0), 1.2);
  const SW = {
    uLive: { value: 0 },
    uCutY: { value: OFF },
    uCutOn: { value: 0 },
    uFill: { value: 3 },
    uPaper: { value: new THREE.Vector3(...PAPER_LIN) },
    uInk: { value: new THREE.Vector3(...INK_LIN) },
    uAccent: { value: new THREE.Vector3(0.86, 0.38, 0.14) },
    uMap: { value: new THREE.Vector4(0, 0, 1, 1) },
    uRoomMap: { value: null },
    uRV: { value: new Float32Array(MAX) },
    uRO: { value: Array.from({ length: MAX }, () => new THREE.Vector4(0, 0.5, 0, 20)) },
    uRD: { value: Array.from({ length: MAX }, () => new THREE.Vector4(0, 1, 6, 2.8)) },
    uXV: { value: 0 },
    uXO: { value: new THREE.Vector4(0, 0.5, 0, 60) },
    uXD: { value: new THREE.Vector4(1, 0, 12, 2.8) },
  };
  const patched = new Set();
  const savedClip = new Map();
  let keys = [];
  let rooms = [];
  let seedDebug = [];
  let doorLeaf = null;
  let doorClosed = null;
  let ceilingH = 2.8;
  let floorCenter = new THREE.Vector3();
  let frameW = 18;
  let ready = false;
  let active = false;
  let lenis = null;
  let gsapRef = null;
  let tickerFn = null;
  let usingFallback = false;
  let fe = 0;
  let lastT = performance.now();
  let frames = 0;
  let autoplay = false;
  let handed = false;
  let autoMark = null;
  let scrollReady = false;
  let composer = null;
  let gradePass = null;
  let saved = null;
  let capKey = -2;
  let ptr = { x: 0, y: 0, tx: 0, ty: 0 };
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const hud = buildHud();

  function buildHud() {
    const root = host.parentElement || document.body;
    const launch = document.createElement('button');
    launch.id = 'pres-launch'; launch.type = 'button'; launch.textContent = 'Presentation'; launch.hidden = true;
    launch.addEventListener('click', () => { if (getMode() === 'presentation') restart(); else setMode('presentation'); });
    root.appendChild(launch);
    const el = document.createElement('div');
    el.id = 'pres-hud'; el.hidden = true;
    el.innerHTML = `
      <div id="pres-sheet"><strong>Plan</strong><span>RESIDENCE · NORTH UP</span></div>
      <div id="pres-count"><b>00</b> / 00 ROOMS</div>
      <div id="pres-hint"><span id="pres-hint-text">Scroll to walk in  ·  Space plays</span><i><b></b></i></div>
      <button id="pres-exit" type="button" data-dest="explore">Exit</button>
      <div id="pres-ruler"><i id="pres-now"></i></div>
      <div id="pres-spot" hidden>
        <div id="pres-reticle"><i></i><i></i><i></i><i></i><b></b></div>
        <div id="pres-tag"><span class="ln"><span class="tag-no"></span></span><span class="ln"><strong class="tag-title"></strong></span><span class="ln"><span class="tag-meta"></span></span></div>
      </div>
      <div id="pres-north"><b></b>N</div>`;
    root.appendChild(el);
    const track = document.createElement('div');
    track.id = 'pres-track';
    document.body.appendChild(track);
    el.querySelector('#pres-exit').addEventListener('click', (e) => setMode(e.currentTarget.dataset.dest || 'explore'));
    return { el, track, launch };
  }

  function isOutdoor(o) {
    for (let p = o; p; p = p.parent) if (p.name && p.name.startsWith('Outdoor_')) return true;
    return false;
  }
  function labelOf(o) {
    for (let p = o; p; p = p.parent) {
      if (p.name && !/^Object_\d+$/.test(p.name) && !/^Mesh_\d+$/.test(p.name)) return p.name;
    }
    return o.name || '';
  }
  function worldBoxOf(pred) {
    const root = getRoot();
    const box = new THREE.Box3();
    let n = 0;
    root.updateMatrixWorld(true);
    root.traverse((o) => {
      if (!o.isMesh || isOutdoor(o) || !pred(o, labelOf(o))) return;
      if (!o.geometry.boundingBox) o.geometry.computeBoundingBox();
      const b = new THREE.Box3().copy(o.geometry.boundingBox).applyMatrix4(o.matrixWorld);
      const s = b.getSize(new THREE.Vector3());
      if (s.x > 80 || s.y > 80 || s.z > 80) return;
      box.union(b); n++;
    });
    return n ? box : null;
  }
  function insideWorld(v) {
    const p = getRoot().worldToLocal(v.clone());
    return insideFloor(p.x, -p.z);
  }

  function patchMaterials() {
    const root = getRoot();
    const outdoorMats = new Set();
    root.traverse((o) => {
      if (!o.isMesh || !isOutdoor(o)) return;
      const list = Array.isArray(o.material) ? o.material : [o.material];
      list.forEach((m) => m && outdoorMats.add(m));
    });
    // Materials used by the stacked wall boxes (meshes under a Wall_* group): only these get the section depth nudge
    // in the shader tail, so flat double-faced things like the bathroom floor photos do not turn into ink.
    const wallMats = new Set();
    root.traverse((o) => {
      if (!o.isMesh) return;
      let wall = false;
      for (let p = o.parent; p && p !== root; p = p.parent) if (/^Wall_/.test(p.name || '')) wall = true;
      if (!wall) return;
      const list = Array.isArray(o.material) ? o.material : [o.material];
      list.forEach((m) => m && wallMats.add(m));
    });
    root.traverse((o) => {
      if (!o.isMesh || isOutdoor(o)) return;
      const list = Array.isArray(o.material) ? o.material : [o.material];
      list.forEach((mat) => {
        if (!mat || mat.isShaderMaterial || outdoorMats.has(mat) || patched.has(mat)) return;
        if (!(mat.isMeshStandardMaterial || mat.isMeshPhysicalMaterial || mat.isMeshLambertMaterial || mat.isMeshPhongMaterial)) return;
        const hatch = (mat.transparent || /glass/i.test(o.name || '') || /glass/i.test(labelOf(o))) ? 4 : 2;
        const section = wallMats.has(mat) ? 1 : 0;
        const prevKey = mat.customProgramCacheKey && mat.customProgramCacheKey.bind(mat);
        mat.onBeforeCompile = (shader) => {
          const depthNudge = renderer.localClippingEnabled;
          Object.assign(shader.uniforms, SW);
          shader.uniforms.uHatch = { value: hatch };
          shader.uniforms.uSection = { value: section };
          shader.uniforms.uGlass = { value: mat.transparent ? 1 : 0 };
          shader.uniforms.uGlassOp = { value: mat.opacity == null ? 0.3 : mat.opacity };
          if (!shader.vertexShader.includes('#include <project_vertex>')) return;
          shader.vertexShader = 'varying vec3 vDrawW; varying float vCutH;\n' + shader.vertexShader.replace(
            '#include <project_vertex>',
            `#include <project_vertex>
              vec4 dwp = vec4(transformed, 1.0);
              #ifdef USE_INSTANCING
              dwp = instanceMatrix * dwp;
              #endif
              vDrawW = (modelMatrix * dwp).xyz; vCutH = vDrawW.y;`,
          );
          shader.fragmentShader = SHADE_HEAD + shader.fragmentShader;
          if (shader.fragmentShader.includes('#include <clipping_planes_fragment>')) {
            shader.fragmentShader = shader.fragmentShader.replace(
              '#include <clipping_planes_fragment>',
              `#include <clipping_planes_fragment>
               if (uLive > 0.5 && uCutOn > 0.5 && vCutH > uCutY) discard;`,
            );
          }
          const tail = `
            if (uLive > 0.5) {
              vec3 wn = normalize((vec4(vNormal, 0.0) * viewMatrix).xyz);
              roomPick(vDrawW);
              float got = revealAt(vDrawW, wn);
              float paper = 1.0 - got;
              float hatch = hatchOf(vDrawW, wn);
              vec3 lit = gl_FragColor.rgb;
              if (paper > 0.999) {
                gl_FragColor = vec4(clamp(hatch, 0.0, 1.0), gRing, 0.0, 0.5);
              } else if (uGlass > 0.5) {
                vec3 inked = mix(uPaper, uInk, hatch * 0.85);
                vec3 col = mix(lit, inked, paper);
                col = mix(col, uAccent * 2.2, gRing);
                gl_FragColor = vec4(col, mix(uGlassOp, 1.0, clamp(paper + gRing, 0.0, 1.0)));
              } else {
                vec3 inked = mix(uPaper, uInk, hatch * 0.85);
                vec3 col = mix(lit, inked, paper);
                col = mix(col, uAccent * 2.2, gRing);
                gl_FragColor = vec4(col, 1.0);
              }
              // Solid ink only for the cut walls' insides (the poche). Other back faces (furniture, knobs, fittings
              // with flipped or double-sided faces) stay paper, or they print as black blobs on the plan.
              if (!gl_FrontFacing && uCutOn > 0.5) gl_FragColor = uSection > 0.5 ? vec4(0.0, 0.0, 1.0, 0.5) : vec4(0.0, 0.0, 0.0, 0.5);
            }
            // 2026-10-19 (Xip): walls are stacked boxes, so the cut box's bottom (back face, ink) sits at the same height
            // as the top of the box below (front face, paper) and paper won the tie: hollow "wireframe" walls.
            // Pull wall back faces a hair towards the camera while the cut is on so the ink section wins.
            // 2026-10-20: only down-facing back faces (the tie), and a constant depth step instead of fwidth, which at
            // grazing angles pulled back faces through the outer wall at every stacked-box seam (scratchy lines).
            // 2026-11-22 (Grok v2): writing gl_FragDepth turns off the GPU's early depth test for every material, and
            // these shaders stayed compiled after leaving the plan, so Orbit/Walk fell from ~40 to ~16 fps on an M1.
            // Only compile the depth nudge while the presentation is on (clipping on); leave() recompiles without it.
            ${depthNudge ? `gl_FragDepth = gl_FragCoord.z;
            if (uLive > 0.5 && uCutOn > 0.5 && uSection > 0.5 && !gl_FrontFacing && normalize((vec4(vNormal, 0.0) * viewMatrix).xyz).y < -0.7) gl_FragDepth -= 2e-6;` : ''}`;
          if (shader.fragmentShader.includes('#include <dithering_fragment>')) {
            shader.fragmentShader = shader.fragmentShader.replace('#include <dithering_fragment>', '#include <dithering_fragment>\n' + tail);
          } else if (shader.fragmentShader.includes('#include <colorspace_fragment>')) {
            shader.fragmentShader = shader.fragmentShader.replace('#include <colorspace_fragment>', '#include <colorspace_fragment>\n' + tail);
          }
        };
        mat.customProgramCacheKey = () => `pres-${hatch}-${mat.transparent ? 1 : 0}-${section}-${renderer.localClippingEnabled ? 'cut' : 'nocut'}-${prevKey ? prevKey() : ''}`;
        mat.needsUpdate = true;
        patched.add(mat);
      });
    });
  }

  function setClipping(on) {
    renderer.localClippingEnabled = on;
    patched.forEach((mat) => {
      if (on) {
        if (!savedClip.has(mat)) savedClip.set(mat, mat.clippingPlanes || null);
        mat.clippingPlanes = [cutPlane];
      } else if (savedClip.has(mat)) {
        mat.clippingPlanes = savedClip.get(mat);
      }
      mat.needsUpdate = true;
    });
    if (!on) savedClip.clear();
  }

  function measure() {
    const root = getRoot();
    root.updateMatrixWorld(true);
    const floor = worldBoxOf((o, n) => n === 'Floor' || o.name === 'Floor');
    const ceil = worldBoxOf((o, n) => n.startsWith('Ceiling') || o.name.startsWith('Ceiling'));
    if (!floor) throw new Error('floor');
    ceilingH = ceil ? ceil.min.y : 2.8;
    floorCenter = floor.getCenter(new THREE.Vector3());
    floorCenter.y = 0;
    const size = floor.getSize(new THREE.Vector3());
    frameW = Math.max(size.x, size.z) * 1.42;
    const cell = 0.16;
    const minX = floor.min.x - 0.4, minZ = floor.min.z - 0.4;
    const cols = Math.ceil((floor.max.x - floor.min.x + 0.8) / cell);
    const rows = Math.ceil((floor.max.z - floor.min.z + 0.8) / cell);
    const blocked = new Uint8Array(cols * rows);
    const mark = (x, z) => {
      const cc = Math.round((x - minX) / cell - 0.5), rr = Math.round((z - minZ) / cell - 0.5);
      if (cc >= 0 && rr >= 0 && cc < cols && rr < rows) blocked[rr * cols + cc] = 1;
    };
    const drawEdge = (x0, z0, x1, z1) => {
      const len = Math.hypot(x1 - x0, z1 - z0);
      const steps = Math.max(1, Math.ceil(len / (cell * 0.45)));
      for (let i = 0; i <= steps; i++) {
        const t = i / steps;
        mark(x0 + (x1 - x0) * t, z0 + (z1 - z0) * t);
      }
    };
    root.traverse((o) => {
      if (!o.isMesh || isOutdoor(o) || !o.geometry?.attributes?.position) return;
      const name = labelOf(o);
      const wall = name.startsWith('Wall_') || name.startsWith('Doorway_');
      // 2026-10-19 (Xip): sliding / glass / panel doors used to be skipped here, so the balcony and study seeds flooded
      // through them into the living room and its sofa, shelf and TV stayed paper until those later stops.
      const door = name.startsWith('Door_');
      if (!wall && !door) return;
      const pos = o.geometry.attributes.position;
      const idx = o.geometry.index;
      const m = o.matrixWorld.elements;
      const wp = (i) => {
        const x = pos.getX(i), y = pos.getY(i), z = pos.getZ(i);
        return [m[0] * x + m[4] * y + m[8] * z + m[12], m[1] * x + m[5] * y + m[9] * z + m[13], m[2] * x + m[6] * y + m[10] * z + m[14]];
      };
      const tri = (a, b, c) => {
        const A = wp(a), B = wp(b), C = wp(c);
        const cy = (A[1] + B[1] + C[1]) / 3;
        if (cy < 0.12 || cy > 2.05) return;
        const ab = [B[0] - A[0], B[1] - A[1], B[2] - A[2]], ac = [C[0] - A[0], C[1] - A[1], C[2] - A[2]];
        const ny = Math.abs(ab[2] * ac[0] - ab[0] * ac[2]);
        const nx = ab[1] * ac[2] - ab[2] * ac[1], nz = ab[0] * ac[1] - ab[1] * ac[0];
        if (Math.abs(ny) > Math.max(Math.abs(nx), Math.abs(nz))) return;
        drawEdge(A[0], A[2], B[0], B[2]); drawEdge(B[0], B[2], C[0], C[2]); drawEdge(C[0], C[2], A[0], A[2]);
      };
      if (idx) for (let i = 0; i < idx.count; i += 3) tri(idx.getX(i), idx.getX(i + 1), idx.getX(i + 2));
      else for (let i = 0; i < pos.count; i += 3) tri(i, i + 1, i + 2);
    });
    const idGrid = new Int16Array(cols * rows);
    idGrid.fill(-1);
    const seeds = [];
    const missed = [];
    const findObj = (name) => getRoot().getObjectByName(name);
    const centerOf = (pred) => {
      const b = worldBoxOf((o, n) => {
        if (pred(n) || pred(o.name || '')) return true;
        for (let p = o.parent; p; p = p.parent) if (p.name && pred(p.name)) return true;
        return false;
      });
      return b ? b.getCenter(new THREE.Vector3()) : null;
    };
    for (const spec of ROOM_SPECS) {
      let p = null;
      if (spec.door) {
        const door = findObj(spec.door);
        if (!door) { missed.push(spec.id); continue; }
        const pos = door.getWorldPosition(new THREE.Vector3());
        const nrm = new THREE.Vector3(0, 0, 1).transformDirection(door.matrixWorld);
        nrm.y = 0; if (nrm.lengthSq() < 1e-6) nrm.set(0, 0, 1); nrm.normalize();
        const a = pos.clone().addScaledVector(nrm, 0.95);
        const b = pos.clone().addScaledVector(nrm, -0.95);
        const far = a.distanceTo(floorCenter) > b.distanceTo(floorCenter) ? a : b;
        const near = far === a ? b : a;
        p = spec.side === 'out' && insideWorld(far) ? far : (insideWorld(near) ? near : (insideWorld(far) ? far : near));
        if (spec.id === 'entry') doorLeaf = door;
      } else p = centerOf(spec.pred);
      if (!p && FALLBACK_XZ[spec.id]) p = new THREE.Vector3(FALLBACK_XZ[spec.id][0], 1, FALLBACK_XZ[spec.id][1]);
      if (!p) { missed.push(spec.id); continue; }
      p.y = 1;
      seeds.push({ spec, p });
    }
    const q = [];
    seeds.forEach((s, i) => {
      let c = clamp(Math.round((s.p.x - minX) / cell), 0, cols - 1);
      let r = clamp(Math.round((s.p.z - minZ) / cell), 0, rows - 1);
      if (blocked[r * cols + c]) {
        let found = false;
        for (let rad = 1; rad < 18 && !found; rad++) {
          for (let dc = -rad; dc <= rad && !found; dc++) for (let dr = -rad; dr <= rad && !found; dr++) {
            const cc = c + dc, rr = r + dr;
            if (cc < 0 || rr < 0 || cc >= cols || rr >= rows) continue;
            if (!blocked[rr * cols + cc]) { c = cc; r = rr; found = true; }
          }
        }
      }
      if (!blocked[r * cols + c] && idGrid[r * cols + c] < 0) {
        idGrid[r * cols + c] = i; q.push(c, r, i);
      }
    });
    for (let qi = 0; qi < q.length; qi += 3) {
      const c = q[qi], r = q[qi + 1], id = q[qi + 2];
      for (const [dc, dr] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
        const cc = c + dc, rr = r + dr, k = rr * cols + cc;
        if (cc < 0 || rr < 0 || cc >= cols || rr >= rows || blocked[k] || idGrid[k] >= 0) continue;
        const x = minX + (cc + 0.5) * cell, z = minZ + (rr + 0.5) * cell;
        if (!insideWorld(new THREE.Vector3(x, 1, z))) { blocked[k] = 1; continue; }
        idGrid[k] = id; q.push(cc, rr, id);
      }
    }
    seeds.forEach((s, i) => {
      let count = 0;
      for (let k = 0; k < idGrid.length; k++) if (idGrid[k] === i) count++;
      if (count >= 8) return;
      const c0 = Math.round((s.p.x - minX) / cell), r0 = Math.round((s.p.z - minZ) / cell);
      const n = Math.ceil(1.15 / cell);
      for (let dr = -n; dr <= n; dr++) for (let dc = -n; dc <= n; dc++) {
        if (dc * dc + dr * dr > n * n) continue;
        const c = c0 + dc, r = r0 + dr;
        if (c < 0 || r < 0 || c >= cols || r >= rows || blocked[r * cols + c]) continue;
        if (idGrid[r * cols + c] < 0) idGrid[r * cols + c] = i;
      }
    });
    rooms = seeds.map((s, i) => {
      const cells = [];
      for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) if (idGrid[r * cols + c] === i) cells.push([c, r]);
      if (cells.length < 8) return null;
      let cx = 0, cz = 0;
      cells.forEach(([c, r]) => { cx += minX + (c + 0.5) * cell; cz += minZ + (r + 0.5) * cell; });
      cx /= cells.length; cz /= cells.length;
      let xx = 0, xz = 0, zz = 0;
      const pts = cells.map(([c, r]) => [minX + (c + 0.5) * cell, minZ + (r + 0.5) * cell]);
      pts.forEach(([x, z]) => { const dx = x - cx, dz = z - cz; xx += dx * dx; xz += dx * dz; zz += dz * dz; });
      const ang = 0.5 * Math.atan2(2 * xz, xx - zz);
      const vx = Math.cos(ang), vz = Math.sin(ang);
      let minA = 1e9, maxA = -1e9, minB = 1e9, maxB = -1e9;
      pts.forEach(([x, z]) => {
        const dx = x - cx, dz = z - cz, a = dx * vx + dz * vz, b = -dx * vz + dz * vx;
        minA = Math.min(minA, a); maxA = Math.max(maxA, a); minB = Math.min(minB, b); maxB = Math.max(maxB, b);
      });
      const length = Math.max(0.8, maxA - minA + cell), width = Math.max(0.8, maxB - minB + cell);
      return {
        id: s.spec.id, name: s.spec.name, cells, cx, cz, length, width,
        area: cells.length * cell * cell, ceiling: ceilingH, seed: s.p,
      };
    }).filter(Boolean);
    const data = new Uint8Array(cols * rows * 4);
    const indexOf = new Map(rooms.map((r, i) => [r.id, i]));
    for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) {
      const sid = idGrid[r * cols + c];
      if (sid < 0) continue;
      const room = rooms.find((rm) => rm.id === seeds[sid].spec.id);
      if (!room) continue;
      const id = indexOf.get(room.id) + 1;
      const o = (r * cols + c) * 4;
      data[o] = id; data[o + 3] = 255;
    }
    const tex = new THREE.DataTexture(data, cols, rows, THREE.RGBAFormat);
    tex.colorSpace = THREE.NoColorSpace;
    tex.magFilter = tex.minFilter = THREE.NearestFilter;
    tex.flipY = false; tex.needsUpdate = true;
    seedDebug = seeds.map((s, i) => {
      let count = 0;
      for (let k = 0; k < idGrid.length; k++) if (idGrid[k] === i) count++;
      return { id: s.spec.id, cells: count, x: +s.p.x.toFixed(2), z: +s.p.z.toFixed(2) };
    }).concat(missed.map((id) => ({ id, cells: 0, missed: true })));
    SW.uRoomMap.value = tex;
    SW.uMap.value.set(minX, minZ, cols * cell, rows * cell);
    return { minX, minZ, cell, cols, rows };
  }

  function poseFrom(target, camPos) {
    const off = camPos.clone().sub(target);
    const dist = Math.max(0.4, off.length());
    return {
      t: [target.x, target.y, target.z],
      yaw: Math.atan2(off.x, off.z) / DEG,
      pitch: Math.asin(clamp(off.y / dist, -1, 1)) / DEG,
      dist, fov: 52,
    };
  }

  // Small furniture footprints. Room-sized groups are left alone so the camera is not walked through a wall.
  function furnitureFootprints() {
    const boxes = [];
    const size = new THREE.Vector3();
    getRoot().traverse((o) => {
      if (!o.isMesh) return;
      let n = o, furn = false;
      while (n) {
        if (n.name && n.name.startsWith('Outdoor_')) return;
        if (n.name && n.name.startsWith('Furniture_')) furn = true;
        n = n.parent;
      }
      if (!furn) return;
      const box = new THREE.Box3().setFromObject(o);
      if (box.isEmpty()) return;
      box.getSize(size);
      if (size.x > 2.2 || size.z > 2.2 || size.y < 0.05 || size.y > 1.7) return;
      if (box.max.y < 0.25 || box.min.y > 1.45) return;
      boxes.push(box);
    });
    return boxes;
  }
  function onFootprint(box, p) {
    const m = 0.18;
    return p.x > box.min.x - m && p.x < box.max.x + m && p.z > box.min.z - m && p.z < box.max.z + m;
  }
  function clearStand(stand, doorway, room, grid, boxes) {
    const allowed = new Set(room.cells.map(([c, r]) => c + ',' + r));
    const inside = (p) => {
      const c = Math.floor((p.x - grid.minX) / grid.cell);
      const r = Math.floor((p.z - grid.minZ) / grid.cell);
      return allowed.has(c + ',' + r);
    };
    const p = stand.clone();
    const away = doorway.clone().sub(p);
    away.y = 0;
    let steps = 0;
    const blocked = () => boxes.some((b) => onFootprint(b, p));
    if (away.lengthSq() > 1e-6 && blocked()) {
      away.normalize();
      for (; steps < 12; steps++) {
        const next = p.clone().addScaledVector(away, 0.18);
        next.y = 1.55;
        if (!inside(next)) break;
        p.copy(next);
        if (!blocked()) break;
      }
    }
    if (!inside(p)) p.copy(doorway);
    p.y = 1.55;
    return { p, steps };
  }

  function buildKeys(grid) {
    const dossiers = rooms;
    const door = getRoot().getObjectByName('Door_135_72_Leaf');
    const doorPos = door ? door.getWorldPosition(new THREE.Vector3()) : (dossiers[0] ? dossiers[0].seed.clone() : floorCenter.clone());
    const nrm = new THREE.Vector3(0, 0, 1);
    if (door) nrm.transformDirection(door.matrixWorld);
    nrm.y = 0; nrm.normalize();
    const a = doorPos.clone().addScaledVector(nrm, 1.7);
    const b = doorPos.clone().addScaledVector(nrm, -1.7);
    const outside = insideWorld(a) && !insideWorld(b) ? b : (!insideWorld(a) ? a : (a.distanceTo(floorCenter) > b.distanceTo(floorCenter) ? a : b));
    outside.y = 1.35;
    const inside = doorPos.clone().addScaledVector(outside.clone().sub(doorPos).normalize(), -1.15);
    inside.y = 1.2;
    const list = [];
    list.push({ id: 'hero', t: [floorCenter.x, 0, floorCenter.z], yaw: 0, pitch: 89.4, fov: 3, frame: frameW, hold: 40, go: 120 });
    const lensCam = outside.clone(); lensCam.y = 9;
    const lensT = floorCenter.clone(); lensT.y = 0.4;
    list.push({ id: 'lens', ...poseFrom(lensT, lensCam), fov: 36, hold: 0, go: 100 });
    const appCam = outside.clone(); appCam.y = 3.2;
    const appT = doorPos.clone(); appT.y = 1.4;
    list.push({ id: 'approach', ...poseFrom(appT, appCam), fov: 44, hold: 0, go: 90 });
    const doorCam = outside.clone(); doorCam.y = 1.55;
    const doorT = inside.clone(); doorT.y = 1.35;
    list.push({ id: 'door', ...poseFrom(doorT, doorCam), fov: 50, hold: 80, go: 70 });
    let prev = inside.clone();
    const boxes = furnitureFootprints();
    dossiers.forEach((room, i) => {
      let best = null, bestD = 1e9;
      const { minX, minZ, cell } = grid;
      room.cells.forEach(([c, r]) => {
        const x = minX + (c + 0.5) * cell, z = minZ + (r + 0.5) * cell;
        const d = (x - prev.x) ** 2 + (z - prev.z) ** 2;
        if (d < bestD) { bestD = d; best = [x, z]; }
      });
      const doorway = new THREE.Vector3(best[0], 1.55, best[1]);
      const center = new THREE.Vector3(room.cx, 1.05, room.cz);
      let stand = doorway.clone().lerp(center.clone().setY(1.55), 0.42);
      room.standSteps = 0;
      // The living-room centroid sits inside the coffee table. Other rooms
      // read clearly from the lerp, and stepping them walks into cabinets.
      if (room.id === 'living') {
        const cleared = clearStand(stand, doorway, room, grid, boxes);
        stand = cleared.p;
        room.standSteps = cleared.steps;
      }
      if (i > 0) {
        const midT = prev.clone().lerp(center, 0.5); midT.y = 1.3;
        const midC = stand.clone().lerp(prev.clone().setY(1.55), 0.5); midC.y = 1.7;
        list.push({ id: 'go-' + room.id, ...poseFrom(midT, midC), fov: 56, hold: 0, go: 64 });
      }
      const stop = poseFrom(center, stand);
      stop.fov = room.area < 8 ? 58 : 52;
      list.push({ id: room.id, ...stop, hold: 86, go: 36, dossier: true, room: i });
      room.stand = stand; room.look = center;
      prev = center;
    });
    const liftCam = floorCenter.clone(); liftCam.y = 14; liftCam.z -= 6;
    list.push({ id: 'lift', ...poseFrom(floorCenter.clone().setY(0.6), liftCam), fov: 30, hold: 0, go: 90 });
    list.push({ id: 'asbuilt', t: [floorCenter.x, 0, floorCenter.z], yaw: -360, pitch: 89.4, fov: 3, frame: frameW, hold: 70, go: 40 });
    const orbitDist = Math.max(sizeFit(), 14);
    list.push({ id: 'orbitA', t: [floorCenter.x, 0.7, floorCenter.z], yaw: 28, pitch: 52, fov: 38, dist: orbitDist, hold: 16, go: 80 });
    list.push({ id: 'orbitB', t: [floorCenter.x, 0.7, floorCenter.z], yaw: 168, pitch: 46, fov: 36, dist: orbitDist * 0.92, hold: 50, go: 0, dossier: false });
    list.forEach((k) => {
      const frame = k.frame != null ? k.frame : 2 * k.dist * Math.tan((k.fov * DEG) / 2);
      k.lf = Math.log(k.fov); k.lfr = Math.log(Math.max(0.2, frame)); k.roll = 0;
    });
    const asbI = list.findIndex((k) => k.id === 'asbuilt');
    for (let i = 1; i < asbI; i++) {
      let y = list[i].yaw, p = list[i - 1].yaw;
      while (y - p > 180) y -= 360;
      while (p - y > 180) y += 360;
      list[i].yaw = y;
    }
    list[asbI].yaw = list[asbI - 1].yaw - 360;
    const orbitAbs = { orbitA: 28, orbitB: 168 };
    for (let i = asbI + 1; i < list.length; i++) {
      let y = orbitAbs[list[i].id] ?? list[i].yaw, p = list[i - 1].yaw;
      while (y - p > 180) y -= 360;
      while (p - y > 180) y += 360;
      list[i].yaw = y;
    }
    let g = 0;
    list.forEach((k) => {
      k.hold = k.hold || 0; k.go = k.go || 0;
      k.h0 = g; g += k.hold * SCROLL_SCALE; k.h1 = g; g += k.go * SCROLL_SCALE; k.g1 = g;
    });
    // North-up roll for the flat plan, measured after a dry placement.
    const hero = list[0];
    applySample({ tx: hero.t[0], ty: hero.t[1], tz: hero.t[2], yaw: hero.yaw, pitch: hero.pitch, roll: 0, lf: hero.lf, lfr: hero.lfr });
    const c = floorCenter.clone();
    const up = c.clone(); up.z += 1;
    const pa = c.clone().project(camera), pb = up.project(camera);
    const ang = Math.atan2(pb.x - pa.x, -(pb.y - pa.y));
    // The measured roll points +Z up; this unit's south door still lands at the top, so add a half turn.
    hero.roll = list.find((k) => k.id === 'asbuilt').roll = -ang / DEG + 180;
    keys = list;
    rooms.forEach((r) => { r.key = list.find((k) => k.id === r.id); });
  }
  function sizeFit() {
    return Math.max(8, frameW * 0.72);
  }

  function mapScroll(vh) {
    const y = keys.length - 1;
    if (vh <= 0) return { idx: 0, push: 0, key: 0, phase: 'hold', f: 0 };
    for (let t = 0; t <= y; t++) {
      const a = keys[t];
      if (vh < a.h0) break;
      if (a.h1 > a.h0 && vh <= a.h1) return { idx: t, push: (vh - a.h0) / (a.h1 - a.h0), key: t, phase: 'hold', f: (vh - a.h0) / (a.h1 - a.h0) };
    }
    let t = 0;
    for (let a = 0; a <= y; a++) if (keys[a].hold && keys[a].h1 <= vh) t = a;
    if (t >= y) return { idx: y, push: 1, key: y, phase: 'hold', f: 1 };
    let a = t + 1;
    while (a < y && !keys[a].hold) a++;
    const o = keys[t].h1, n = keys[a].h0;
    const r = clamp((vh - o) / ((n - o) || 1), 0, 1);
    const eased = o + (0.5 - 0.5 * Math.cos(Math.PI * r)) * (n - o);
    let s = t;
    while (s < a - 1 && eased > keys[s].g1) s++;
    const seg = keys[s].g1 - keys[s].h1;
    return { idx: s + (seg > 0 ? clamp((eased - keys[s].h1) / seg, 0, 1) : 1), push: 1 - smooth(clamp(r / 0.35, 0, 1)), key: t, phase: 'go', f: r, to: a };
  }
  function sampleAt(e) {
    const y = keys.length - 1;
    e = clamp(e, 0, y);
    const a = Math.min(y - 1, Math.floor(e)), f = e - a;
    const n = keys[Math.max(0, a - 1)], r = keys[a], i = keys[Math.min(y, a + 1)], s = keys[Math.min(y, a + 2)];
    const l = (fn) => catmull(fn(n), fn(r), fn(i), fn(s), f);
    return { tx: l((k) => k.t[0]), ty: l((k) => k.t[1]), tz: l((k) => k.t[2]), yaw: l((k) => k.yaw), pitch: l((k) => k.pitch), roll: l((k) => k.roll), lf: l((k) => k.lf), lfr: l((k) => k.lfr) };
  }
  function applySample(e) {
    const fov = Math.exp(e.lf);
    const frame = Math.exp(e.lfr);
    const dist = frame / (2 * Math.tan((fov * DEG) / 2));
    const aspect = camera.aspect || (host.clientWidth / Math.max(host.clientHeight, 1));
    const fit = Math.pow(Math.max(1, 1.5 / aspect), 0.6);
    const fov2 = (2 * Math.atan(Math.tan((fov * DEG) / 2) * fit)) / DEG;
    const pitch = e.pitch * DEG, yaw = e.yaw * DEG, cp = Math.cos(pitch);
    camera.position.set(e.tx + Math.sin(yaw) * cp * dist, e.ty + Math.sin(pitch) * dist, e.tz + Math.cos(yaw) * cp * dist);
    camera.up.set(0, 1, 0);
    camera.lookAt(e.tx, e.ty, e.tz);
    camera.rotateZ((e.roll || 0) * DEG);
    camera.fov = fov2;
    camera.near = Math.max(0.05, Math.min(30, 0.02 * dist));
    camera.far = Math.max(2000, 6 * dist);
    camera.updateProjectionMatrix();
    camera.updateMatrixWorld(true);
    return dist;
  }
  function keyBy(id) { return keys.find((k) => k.id === id); }

  function cutFor(vh, camY, idx) {
    const door = keyBy('door'), first = rooms[0]?.key, asb = keyBy('asbuilt'), orb = keyBy('orbitA');
    if (!door || !first || !asb) return 1.2;
    if (orb && vh >= orb.h0 - 8) return 2.45;
    if (vh < first.h1) {
      const t = smooth(span(idx, 0.18, 0.9));
      const r = camY < 3.55 ? smooth(3.55 - camY) : 0;
      const i = smooth(span(vh, door.h1 + 20, first.h0 + 8));
      if (i >= 1) return OFF;
      if (i > 0) return lerp(4.25, 5.3, i);
      return lerp(1.2, 3.52, t) + 0.73 * r;
    }
    if (vh < asb.h0 - 70) return OFF;
    const u = smooth(span(vh, asb.h0 - 70, asb.h0 - 8));
    return lerp(lerp(5.3, 3.52, u), 1.2, smooth(span(vh, asb.h0 - 36, asb.h1)));
  }

  function updateReveal(vh) {
    const asb = keyBy('asbuilt'), orb = keyBy('orbitA');
    const shut = asb ? 1 - easeIO(span(vh, asb.h0 - 46, asb.h0)) : 1;
    const force = orb && vh >= orb.h0 - 6;
    rooms.forEach((room, i) => {
      const k = room.key;
      // 2026-10-19 (Xip): was span(vh, k.h0 - 18, k.h1 + 10), which only finished after the stop ended, so a room
      // you stopped at (caption showing) stayed half paper with jagged tiles. Now the room lays down while the
      // camera flies in (from h0 - 50, as in the reference) and is complete just after arrival (h0 + 10).
      let rev = k ? easeIO(span(vh, k.h0 - 50, k.h0 + 10)) * shut : 0;
      if (force) rev = 1;
      room.rev = rev;
      SW.uRV.value[i] = rev;
      const dirx = room.look.x - room.stand.x, dirz = room.look.z - room.stand.z;
      const L = Math.max(room.length, room.width, Math.hypot(dirx, dirz), 1.2);
      SW.uRO.value[i].set(room.stand.x, 0.5, room.stand.z, 20);
      SW.uRD.value[i].set(dirx / L, dirz / L, L, ceilingH);
    });
    for (let i = rooms.length; i < MAX; i++) SW.uRV.value[i] = 0;
    const door = keyBy('door');
    SW.uXV.value = force ? 1 : (door ? easeIO(span(vh, door.h0, door.h1 + 24)) * shut : 0);
  }

  function driveDoor(vh) {
    if (!doorLeaf || !doorClosed || !doorLeaf.userData.hinge) return;
    const door = keyBy('door'), asb = keyBy('asbuilt');
    const open = door ? easeIO(span(vh, door.h0 + 8, door.h1 - 6)) : 0;
    const close = asb ? easeIO(span(vh, asb.h0 - 50, asb.h0 - 10)) : 0;
    const t = open * (1 - close);
    doorLeaf.position.copy(doorClosed.pos);
    doorLeaf.quaternion.copy(doorClosed.quat);
    const hinge = new THREE.Vector3(doorLeaf.userData.hinge[0], doorClosed.pos.y, doorLeaf.userData.hinge[1]);
    const q = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 1, 0), (doorLeaf.userData.openAngle ?? Math.PI / 2) * t);
    doorLeaf.position.sub(hinge).applyQuaternion(q).add(hinge);
    doorLeaf.quaternion.premultiply(q);
  }

  function ensureBuilt() {
    if (ready) return;
    patchMaterials();
    const grid = measure();
    buildKeys(grid);
    if (doorLeaf) doorClosed = { pos: doorLeaf.position.clone(), quat: doorLeaf.quaternion.clone() };
    ready = true;
  }

  function trackHeight() {
    const end = keys.length ? keys[keys.length - 1].h1 : 100;
    return end * (window.innerHeight / 100) + window.innerHeight;
  }
  function maxScroll() {
    return Math.max(1, trackHeight() - window.innerHeight);
  }
  function vhNow() {
    const y = lenis ? lenis.scroll : window.scrollY;
    return y / (window.innerHeight / 100);
  }

  async function ensureLibs() {
    if (gsapRef || usingFallback) return;
    try {
      await loadScript('./vendor/gsap.min.js');
      await loadScript('./vendor/lenis.min.js');
      if (!window.gsap || !window.Lenis) throw new Error('missing');
      gsapRef = window.gsap;
    } catch (err) {
      usingFallback = true;
    }
  }

  function startScroll() {
    hud.track.style.height = trackHeight() + 'px';
    document.documentElement.classList.add('pres-on');
    if (gsapRef && window.Lenis && !usingFallback) {
      lenis = new window.Lenis({
        duration: LENIS_DURATION,
        easing: lenisEase,
        smoothWheel: true,
        gestureOrientation: 'vertical',
      });
      gsapRef.ticker.lagSmoothing(0);
      tickerFn = (time) => lenis && lenis.raf(time * 1000);
      gsapRef.ticker.add(tickerFn);
      lenis.scrollTo(0, { immediate: true, force: true });
    } else {
      usingFallback = true;
      lenis = makeFallback();
      lenis.scrollTo(0, { immediate: true });
    }
  }
  function makeFallback() {
    const st = { y: 0, from: 0, to: 0, t: 1 };
    let rafId = 0, prev = performance.now();
    const apiS = {
      get scroll() { return st.y; },
      scrollTo(y, opts) {
        const dest = clamp(y, 0, maxScroll());
        if (opts && opts.immediate) { st.y = st.to = dest; st.t = 1; window.scrollTo(0, dest); return; }
        st.from = st.y; st.to = dest; st.t = 0;
      },
      raf() {},
      resize() {},
      destroy() { cancelAnimationFrame(rafId); },
    };
    const step = (now) => {
      const dt = Math.min(0.05, (now - prev) / 1000); prev = now;
      if (st.t < 1) {
        st.t = Math.min(1, st.t + dt / LENIS_DURATION);
        st.y = st.from + (st.to - st.from) * lenisEase(st.t);
        window.scrollTo(0, st.y);
      }
      if (active) rafId = requestAnimationFrame(step);
    };
    rafId = requestAnimationFrame(step);
    return apiS;
  }
  function stopScroll() {
    if (tickerFn && gsapRef) gsapRef.ticker.remove(tickerFn);
    tickerFn = null;
    if (lenis) { lenis.destroy(); lenis = null; }
    hud.track.style.height = '0px';
    document.documentElement.classList.remove('pres-on');
    window.scrollTo(0, 0);
  }

  function ensureComposer() {
    if (composer) return;
    const w = host.clientWidth || window.innerWidth, h = Math.max(host.clientHeight || window.innerHeight, 1);
    // 2026-10-20: no MSAA. The grade reads a paper/ink flag from alpha and blue, and the multisample resolve blended
    // flag pixels with lit ones at every edge (blue and black fringe lines on real GPUs; SwiftShader hid it).
    const target = new THREE.WebGLRenderTarget(w, h, { type: THREE.HalfFloatType, samples: 0 });
    composer = new EffectComposer(renderer, target);
    composer.setPixelRatio(renderer.getPixelRatio());
    composer.addPass(new RenderPass(scene, camera));
    const ao = new GTAOPass(scene, camera, w, h);
    ao.blendIntensity = 0.8;
    if (ao.updateGtaoMaterial) ao.updateGtaoMaterial({ radius: 0.6, distanceExponent: 1.4, thickness: 1.2, scale: 1.1, samples: 8 });
    composer.addPass(ao);
    // 2026-10-19 (Xip): threshold 1.1 -> 1.25. The paper background (PAPER_LIN, luminance about 1.21) was above 1.1,
    // so bloom blurred it onto the plan's paper/ink flag pixels and the grade painted a brown blob around the plan.
    const bloom = new UnrealBloomPass(new THREE.Vector2(w, h), 0.25, 0.55, 1.25);
    bloom.blendMaterial.blending = THREE.CustomBlending;
    bloom.blendMaterial.blendEquation = THREE.AddEquation;
    bloom.blendMaterial.blendSrc = THREE.OneFactor;
    bloom.blendMaterial.blendDst = THREE.OneFactor;
    bloom.blendMaterial.blendEquationAlpha = THREE.AddEquation;
    bloom.blendMaterial.blendSrcAlpha = THREE.ZeroFactor;
    bloom.blendMaterial.blendDstAlpha = THREE.OneFactor;
    composer.addPass(bloom);
    gradePass = new ShaderPass(GRADE);
    gradePass.uniforms.res.value.set(w, h);
    gradePass.uniforms.px.value.set(1 / (w * renderer.getPixelRatio()), 1 / (h * renderer.getPixelRatio()));
    composer.addPass(gradePass);
    composer.addPass(new OutputPass());
    composer.setSize(w, h);
  }

  function applyWarm(on) {
    if (on) {
      saved.sun = { color: lights.sun.color.clone(), intensity: lights.sun.intensity, pos: lights.sun.position.clone() };
      saved.hemi = { sky: lights.hemi.color.clone(), ground: lights.hemi.groundColor.clone(), intensity: lights.hemi.intensity };
      saved.fill = lights.fill.intensity;
      saved.tone = renderer.toneMapping;
      saved.exposure = renderer.toneMappingExposure;
      saved.output = renderer.outputColorSpace;
      saved.background = scene.background ? scene.background.clone() : null;
      saved.edges = getWallEdges() ? getWallEdges().visible : null;
      saved.ceiling = true;
      getRoot().traverse((o) => { if (o.name && o.name.startsWith('Ceiling')) saved.ceiling = o.visible; });
      const az = Math.atan2(0.37, -0.93), el = 44 * DEG, dist = 40;
      lights.sun.color.set(16773340);
      lights.sun.intensity = 6;
      lights.sun.position.set(Math.cos(el) * Math.sin(az) * dist, Math.sin(el) * dist, Math.cos(el) * Math.cos(az) * dist);
      lights.hemi.color.set(15659248);
      lights.hemi.groundColor.set(14207152);
      lights.hemi.intensity = 0.5;
      lights.fill.intensity = 0.15;
      renderer.toneMapping = THREE.NoToneMapping;
      renderer.toneMappingExposure = 1;
      renderer.outputColorSpace = THREE.LinearSRGBColorSpace;
      scene.background = new THREE.Color(...PAPER_LIN);
    } else if (saved) {
      lights.sun.color.copy(saved.sun.color); lights.sun.intensity = saved.sun.intensity; lights.sun.position.copy(saved.sun.pos);
      lights.hemi.color.copy(saved.hemi.sky); lights.hemi.groundColor.copy(saved.hemi.ground); lights.hemi.intensity = saved.hemi.intensity;
      lights.fill.intensity = saved.fill;
      renderer.toneMapping = saved.tone;
      renderer.toneMappingExposure = saved.exposure;
      renderer.outputColorSpace = saved.output;
      scene.background = saved.background;
      const edges = getWallEdges();
      if (edges && saved.edges != null) edges.visible = saved.edges;
      setCeiling(saved.ceiling !== false);
    }
  }

  function show(on) {
    hud.el.hidden = !on;
    active = on;
    SW.uLive.value = on ? 1 : 0;
  }

  async function enter() {
    if (!getRoot()) return;
    try { await enterNow(); }
    catch (err) { console.error('[presentation]', err); leave(); if (getMode() === 'presentation') setMode('explore'); }
  }
  async function enterNow() {
    handed = false; autoplay = false; capKey = -2; fe = 0;
    saved = {
      cam: { pos: camera.position.clone(), quat: camera.quaternion.clone(), up: camera.up.clone(), fov: camera.fov, near: camera.near, far: camera.far },
    };
    ensureBuilt();
    setClipping(true);
    applyWarm(true);
    setCeiling(true);
    show(true);
    if (location.hash !== '#presentation') history.replaceState(null, '', location.pathname + location.search + '#presentation');
    buildRuler();
    await ensureLibs();
    if (!active) return;
    startScroll();
    ensureComposer();
    resize();
    scrollReady = true;
    window.ATL_PRES = apiPublic;
  }
  function leave() {
    if (!saved && !active) return;
    autoplay = false;
    scrollReady = false;
    show(false);
    stopScroll();
    setClipping(false);
    SW.uLive.value = 0;
    SW.uCutOn.value = 0;
    if (doorLeaf && doorClosed) {
      doorLeaf.position.copy(doorClosed.pos);
      doorLeaf.quaternion.copy(doorClosed.quat);
    }
    if (saved) {
      applyWarm(false);
      camera.position.copy(saved.cam.pos);
      camera.quaternion.copy(saved.cam.quat);
      camera.up.copy(saved.cam.up);
      camera.fov = saved.cam.fov; camera.near = saved.cam.near; camera.far = saved.cam.far;
      camera.updateProjectionMatrix();
    }
    saved = null;
    const ext = getExterior();
    if (ext) ext.visible = true;
    if (location.hash === '#presentation') history.replaceState(null, '', location.pathname + location.search);
  }
  function restart() { leave(); enter(); }

  function buildRuler() {
    const ruler = hud.el.querySelector('#pres-ruler');
    ruler.querySelectorAll('.mark,.tick').forEach((n) => n.remove());
    const end = keys[keys.length - 1].h1 || 1;
    for (let i = 0; i <= 28; i++) {
      const tick = document.createElement('i');
      tick.className = 'tick'; tick.style.top = (i / 28 * 100) + '%';
      ruler.appendChild(tick);
    }
    rooms.forEach((r, i) => {
      const b = document.createElement('button');
      b.type = 'button'; b.className = 'mark'; b.style.top = (r.key.h0 / end * 100) + '%';
      b.title = r.name;
      b.addEventListener('click', (e) => { e.stopPropagation(); scrollToVh(r.key.h0 + 0.35 * (r.key.h1 - r.key.h0)); });
      ruler.appendChild(b);
    });
    const n = String(rooms.length).padStart(2, '0');
    hud.el.querySelector('#pres-count').innerHTML = `<b>00</b> / ${n} ROOMS`;
  }
  function scrollToVh(vh) {
    const y = clamp(vh * (window.innerHeight / 100), 0, maxScroll());
    if (lenis) lenis.scrollTo(y, { immediate: false, force: true, duration: 3.2, easing: (e) => 1 - Math.pow(1 - e, 4) });
    else window.scrollTo(0, y);
  }

  function updateHud(vh, phase, keyIndex) {
    const end = keys[keys.length - 1].h1 || 1;
    const now = hud.el.querySelector('#pres-now');
    now.style.top = clamp(vh / end, 0, 1) * 100 + '%';
    const asb = keyBy('asbuilt'), hero = keyBy('hero'), orb = keyBy('orbitA');
    const sheet = vh < (hero ? hero.h1 * 0.92 : 20) || (asb && vh > asb.h0 - 8 && (!orb || vh < orb.h0 - 6));
    hud.el.querySelector('#pres-sheet').hidden = !sheet;
    hud.el.querySelector('#pres-north').hidden = !sheet;
    let shown = null;
    rooms.forEach((r) => {
      if (r.key && vh > r.key.h0 - 20 && vh < r.key.h1 + 16) shown = r;
    });
    if (orb && vh >= orb.h0 - 6) shown = null;
    const spot = hud.el.querySelector('#pres-spot');
    const count = hud.el.querySelector('#pres-count');
    const seen = shown ? rooms.indexOf(shown) + 1 : rooms.filter((r) => r.rev > 0.45).length;
    const activeN = shown ? rooms.indexOf(shown) + 1 : (rooms.findIndex((r) => r.rev > 0.05 && r.rev < 0.98) + 1 || (vh > (rooms[0]?.key.h0 || 0) ? rooms.length : 0));
    count.innerHTML = `<b>${String(activeN).padStart(2, '0')}</b> / ${String(rooms.length).padStart(2, '0')} ROOMS`;
    void seen;
    const hint = hud.el.querySelector('#pres-hint-text');
    const bar = hud.el.querySelector('#pres-hint b');
    const exit = hud.el.querySelector('#pres-exit');
    const atEnd = !!(orb && vh >= orb.h0);
    exit.dataset.dest = atEnd ? 'walk' : 'explore';
    exit.textContent = atEnd ? 'Walk' : 'Exit';
    if (sheet && vh < 30) hint.textContent = 'Scroll to walk in  ·  Space plays';
    else if (atEnd) hint.textContent = 'Orbit  ·  Walk when you are ready';
    else hint.textContent = 'Scroll to the next room  ·  Space plays';
    bar.style.transform = `scaleX(${phase && phase.phase === 'hold' ? phase.f : phase ? phase.f : 0})`;
    if (!shown) {
      if (capKey !== -1 && gsapRef) gsapRef.to(spot, { autoAlpha: 0, duration: reduced ? 0.01 : 0.5, overwrite: true });
      else spot.hidden = true;
      capKey = -1;
      return;
    }
    if (gsapRef) gsapRef.set(spot, { autoAlpha: 1 });
    spot.hidden = false;
    const anchor = shown.look.clone(); anchor.y = 1.35;
    const p = anchor.project(camera);
    const w = host.clientWidth || window.innerWidth, h = host.clientHeight || window.innerHeight;
    let x = (p.x * 0.5 + 0.5) * w, y = (-p.y * 0.5 + 0.5) * h;
    x = clamp(x, 12, w - 220); y = clamp(y, 70, h - 110);
    spot.hidden = p.z > 1;
    spot.style.transform = `translate(${x}px, ${y}px)`;
    if (capKey !== shown.key.h0) {
      capKey = shown.key.h0;
      const n = rooms.indexOf(shown) + 1;
      spot.querySelector('.tag-no').textContent = 'ROOM ' + String(n).padStart(2, '0');
      spot.querySelector('.tag-title').textContent = shown.name;
      const a = Math.max(shown.length, shown.width), b = Math.min(shown.length, shown.width);
      spot.querySelector('.tag-meta').textContent = `${a.toFixed(2)} × ${b.toFixed(2)} m · ${shown.area.toFixed(1)} m² · ceiling ${shown.ceiling.toFixed(2)}`;
      playCaption(spot);
    }
  }
  function playCaption(spot) {
    const ret = spot.querySelector('#pres-reticle');
    const tag = spot.querySelector('#pres-tag');
    const no = spot.querySelector('.tag-no');
    const title = spot.querySelector('.tag-title');
    const meta = spot.querySelector('.tag-meta');
    const s = reduced ? 0.01 : 1;
    if (!gsapRef) {
      ret.style.opacity = 1; ret.style.transform = 'none';
      tag.style.opacity = 1; tag.style.transform = 'none';
      return;
    }
    const g = gsapRef;
    g.killTweensOf([spot, ret, tag, no, title, meta]);
    g.set(spot, { autoAlpha: 1 });
    g.set(ret, { autoAlpha: 0, scale: 1.8 });
    g.set(tag, { scaleX: 0, scaleY: 0, autoAlpha: 1 });
    g.set(no, { autoAlpha: 0 });
    g.set(title, { yPercent: 115 });
    g.set(meta, { autoAlpha: 0 });
    const tl = g.timeline();
    tl.to(ret, { autoAlpha: 1, scale: 1, duration: 1.1 * s, ease: 'expo.out' }, 0);
    tl.to(tag, { scaleY: 1, duration: 1.2 * s, ease: 'expo.out' }, 0.1 * s);
    tl.to(tag, { scaleX: 1, duration: 1.4 * s, ease: 'expo.out' }, 0.2 * s);
    tl.to(no, { autoAlpha: 1, duration: 0.8 * s, ease: 'expo.out' }, 0.35 * s);
    tl.to(title, { yPercent: 0, duration: 1.2 * s, ease: 'expo.out' }, 0.3 * s);
    tl.to(meta, { autoAlpha: 1, duration: 0.8 * s, ease: 'expo.out' }, 0.7 * s);
  }

  function resize() {
    const w = host.clientWidth || window.innerWidth, h = Math.max(1, host.clientHeight || window.innerHeight);
    if (composer) {
      composer.setSize(w, h);
      if (gradePass) {
        gradePass.uniforms.res.value.set(w, h);
        gradePass.uniforms.px.value.set(1 / (w * renderer.getPixelRatio()), 1 / (h * renderer.getPixelRatio()));
      }
    }
    camera.aspect = w / h;
    if (active) hud.track.style.height = trackHeight() + 'px';
  }

  function update() {
    if (!active || !ready) return;
    const now = performance.now();
    const rawDt = (now - lastT) / 1000; lastT = now;
    const dt = Math.min(autoplay ? 0.5 : 0.1, rawDt);
    if (autoplay && lenis) {
      if (!autoMark) autoMark = { t: now, y: lenis.scroll || 0 };
      const elapsed = (now - autoMark.t) / 1000;
      const dest = Math.min(maxScroll(), autoMark.y + maxScroll() * (elapsed / 78));
      lenis.scrollTo(dest, { immediate: true, force: true });
      if (dest >= maxScroll() - 2 && !handed) {
        handed = true;
        setTimeout(() => { if (getMode() === 'presentation') setMode('walk'); }, 700);
      }
    } else autoMark = null;
    const vh = vhNow();
    fe += (vh - fe) * (1 - Math.exp(-dt * CAM_WEIGHT));
    if (Math.abs(fe - vh) < 1e-3) fe = vh;
    const phase = mapScroll(fe);
    let sample = sampleAt(phase.idx);
    if (phase.phase === 'go') {
      sample = { ...sample, lfr: sample.lfr + Math.log(Math.max(0.2, 1 - 0.05 * phase.push)), yaw: sample.yaw + 1.2 * phase.push * (phase.key % 2 ? 1 : -1) };
    }
    const g = Math.min(1, Math.exp(sample.lf) / 40);
    if (!reduced) {
      ptr.x += (ptr.tx - ptr.x) * (1 - Math.exp(-dt * 2.5));
      ptr.y += (ptr.ty - ptr.y) * (1 - Math.exp(-dt * 2.5));
      sample = { ...sample, yaw: sample.yaw + ptr.x * 0.6 * (0.3 + 0.7 * g), pitch: sample.pitch - ptr.y * 0.6 * 0.5 * (0.3 + 0.7 * g) };
    }
    applySample(sample);
    const cut = cutFor(fe, camera.position.y, phase.idx);
    const on = cut < OFF * 0.5;
    SW.uCutY.value = cut; SW.uCutOn.value = on ? 1 : 0;
    cutPlane.constant = on ? cut : OFF;
    updateReveal(fe);
    driveDoor(fe);
    const orb = keyBy('orbitA');
    const doll = orb && fe >= orb.h0 - 8;
    setCeiling(!doll);
    const ext = getExterior();
    if (ext) ext.visible = !on && !doll && fe > (keyBy('door')?.h0 || 0);
    const edges = getWallEdges();
    if (edges) edges.visible = false;
    getLabels().forEach((l) => { l.visible = false; });
    updateHud(fe, phase, phase.idx);
    frames++;
  }
  function render() {
    if (!composer) { renderer.render(scene, camera); return; }
    composer.render();
  }

  const apiPublic = {
    get ready() { return ready && active && scrollReady; },
    get autoplay() { return active && autoplay; }, // mode bar: WALK IN lit while the tour plays
    enter, leave, update, render, resize,
    play() { autoplay = true; handed = false; },
    setProgress(p) {
      autoplay = false;
      const y = clamp(p, 0, 1) * maxScroll();
      if (lenis) lenis.scrollTo(y, { immediate: true, force: true });
      else window.scrollTo(0, y);
      fe = y / (window.innerHeight / 100);
    },
    scrollToVh,
    stops() { return rooms.map((r) => ({ name: r.name, id: r.id, h0: r.key.h0, h1: r.key.h1 })); },
    state() {
      return {
        mode: getMode(), ready, active, prog: maxScroll() ? (lenis ? lenis.scroll : window.scrollY) / maxScroll() : 0,
        vh: fe, cut: SW.uCutY.value, frames, autoplay,
        room: (rooms.find((r) => r.key && fe > r.key.h0 - 20 && fe < r.key.h1 + 16) || {}).name || '',
        reveals: rooms.map((r) => +((r.rev || 0).toFixed(3))),
        rooms: rooms.map((r) => ({ id: r.id, name: r.name, area: +r.area.toFixed(2), length: +r.length.toFixed(2), width: +r.width.toFixed(2), standSteps: r.standSteps || 0 })),
        seeds: seedDebug,
        keys: keys.map((k) => ({ id: k.id, h0: +k.h0.toFixed(2), h1: +k.h1.toFixed(2), g1: +k.g1.toFixed(2), dossier: !!k.dossier })),
        fallback: usingFallback,
      };
    },
  };
  window.addEventListener('pointermove', (e) => {
    if (!active) return;
    const r = renderer.domElement.getBoundingClientRect();
    ptr.tx = ((e.clientX - r.left) / Math.max(r.width, 1) - 0.5) * 2;
    ptr.ty = ((e.clientY - r.top) / Math.max(r.height, 1) - 0.5) * 2;
  });
  window.addEventListener('keydown', (e) => {
    if (getMode() !== 'presentation') return;
    if (e.code === 'Space') { e.preventDefault(); e.stopPropagation(); autoplay = !autoplay; if (autoplay) handed = false; }
    if (e.code === 'Escape') { e.preventDefault(); e.stopPropagation(); setMode('explore'); }
  }, true);

  window.ATL_PRES = apiPublic;
  return { enter, leave, update, render, resize, restart, arm() { hud.launch.hidden = false; }, api: apiPublic };
}
