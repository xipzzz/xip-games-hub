import { currentModel } from './current-model.js?v=fix-5';
import { addDining } from './dining.js?v=tonstad-4'; // dining table switcher
import { createInteractions } from './interact.js?v=pass-1';
import { createFrames } from './frames.js?v=2'; // frames.js: IKEA wall frames on the TV wall (2026-10-18) // Walk "1" use key: TV, sofa bed, taps, drawers
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { CSS2DRenderer, CSS2DObject } from 'three/addons/renderers/CSS2DRenderer.js';
import { makeExteriorPanorama } from './exterior-view.js?v=step3-4'; // Step 3: sharp outside view drawn in code
import { createWindowLights, createAOComposer } from './lighting.js?v=outline-1'; // Step 4: daylight + soft corner shading
import { createOutdoorWorld } from './outdoor-world.js?v=fix-2'; // Phase 2: real 3D world outside
import { createWeather } from './weather.js?v=en-1'; // Phase 2: weather panel
import { createPresentation } from './presentation.js?v=14-grokv2';

/** Blender Z-up meters → Three.js Y-up (matches glTF export_yup). */
function bz(x, y, z) {
  return new THREE.Vector3(x, z, -y);
}

const VIEW_DEFS = [
  {id:'entry',label:'Entry',pos:bz(10.10,12.80,1.55),look:bz(10.20,10.20,1.20)},
  {id:'lounge',label:'Lounge',pos:bz(12.20,10.40,1.55),look:bz(14.90,10.40,0.9)},
  {id:'breakfast',label:'Breakfast',pos:bz(12.10,12.63,1.65),look:bz(9.55,10.40,1.30)},
  {id:'storage',label:'Wardrobe',pos:bz(9.25,5.90,1.60),look:bz(8.40,7.55,1.0)},
  {id:'kitchen',label:'Kitchen',pos:bz(7.65,8.85,1.65),look:bz(6.65,11.45,1.40)},
  {id:'bed1',label:'Bed 1',pos:bz(5.50,6.20,1.55),look:bz(4.70,4.70,1.10)},
  // Step 1 (2026-10-04): Bed 2, Bath 1, Bath 2 and Living balcony re-aimed from a corner/doorway,
  // looking diagonally down into the room like the photos. Old values are in backups/20261004-step-1.
  // Note: each view's `look` point is also where that room's label sits on the Top map.
  {id:'bed2',label:'Bed 2',pos:bz(11.36,6.10,1.60),look:bz(9.63,3.73,0.80)},
  {id:'bath1',label:'Bath 1',pos:bz(8.45,5.75,1.65),look:bz(7.55,3.85,0.85)},
  {id:'bath2',label:'Bath 2',pos:bz(5.65,8.40,1.65),look:bz(3.70,8.85,0.85)},
  {id:'study',label:'Study',pos:bz(14.27,6.15,2.25),look:bz(12.90,5.45,.65)},
  // Living balcony: seen from inside the lounge, through the glass doors, like the photo.
  // (look kept near the old label spot so "Living balcony" doesn't collide with the nudged "Lounge" label)
  {id:'living_balcony',label:'Living balcony',pos:bz(13.73,7.29,1.55),look:bz(17.20,6.45,0.90)},
  // Service balcony (yard, ~x 3.4–5.0 m, y 9.4–11.9 m): camera moved inside, by the door (opening 135:68),
  // looking to the far corner. The old camera stood outside the yard wall and only saw the wall.
  {id:'service_balcony',label:'Service balcony',pos:bz(4.80,9.62,1.60),look:bz(3.75,11.35,0.65)},
];

const LAYER_DEFS = [
  { id: 'walls', label: 'Walls' },
  { id: 'glazing', label: 'Glazing' },
  { id: 'furniture', label: 'Furniture' },
  { id: 'doors', label: 'Doors' },
];

const EYE_HEIGHT = 1.55;
const WALK_SPEED = 2.6;
// Walk QA (2026-10-09): Counter-Strike / Source-engine movement feel instead of instant start/stop.
// Each frame: friction bleeds speed (stopping takes ~0.2 s), then acceleration adds speed toward the
// keys' direction (full speed in ~0.2 s). Diagonals are normalised, so they are not faster. Shift = walk.
const MOVE = { accelerate: 9, friction: 5.2, stopSpeed: 1.4, runSpeed: WALK_SPEED, walkSpeed: 1.3 };
const walkVel = new THREE.Vector3();
// 2026-10-10: Explore = Counter-Strike free-roam spectator (Valve Source SDK FullNoClipMove, sv_specnoclip 1):
// fly where you look, through walls, no gravity. accelerate = sv_specaccelerate 5, friction = sv_friction 5.2
// (stop floor speed/4). speed = scroll wheel (Xip's choice), 0.5–60 m/s; Shift halves it like CS.
const FLY = { accelerate: 5, friction: 5.2, speed: 5, min: 0.5, max: 60 };
const flyVel = new THREE.Vector3();
// 2026-10-10 Walk: Space = jump, Ctrl = crouch (Xip). CS feel scaled to a home: ~0.5 m jump, gravity 15 m/s²
// (CS sv_gravity 800 u/s²), crouch eye 1.12 m reached in 0.2 s, crouched speed × 0.34 (CS duck multiplier).
const JUMP = { gravity: 15, speed: Math.sqrt(2 * 15 * 0.5), crouchEye: 1.12, crouchTime: 0.2, crouchSpeed: 0.34 };
const walkY = { h: 0, vy: 0, crouch: 0, jumpHeld: false };
let interactions = null; // Walk "1" use key (interact.js)
let dining = null;       // dining table switcher (dining.js): aim + right-click / E -> menu, click -> extend
let frames = null, frameAimed = null; // frames.js: TV-wall frames; frameAimed = slot under the crosshair this frame
let diningAimed = false; // crosshair is on the table this frame (white outline)
let ceilingState = null; // last value given to setCeilingVisible (so the fly loop only changes it when needed)
// The room you're standing in: nearest room anchor (each named view's look point) with no wall in between.
let roomCheckAt = 0;
function updateCurrentRoom() {
  const now = performance.now(); if (now - roomCheckAt < 250 || !root) return; roomCheckAt = now;
  const flip = root.scale.x < 0 ? -1 : 1, walls = walkColliders().filter((o) => !/^Door_/.test(o.name)), eye = walkCam.position;
  let best = null, bestD = Infinity;
  for (const v of VIEW_DEFS) {
    const a = new THREE.Vector3(v.look.x * flip, eye.y, v.look.z), d = a.distanceTo(eye); if (d >= bestD) continue;
    const blocked = d > 0.05 && new THREE.Raycaster(eye, a.clone().sub(eye).normalize(), 0.01, d).intersectObjects(walls, false).length > 0;
    if (!blocked) { best = v; bestD = d; }
  }
  if (best) roomNameEl.textContent = best.label;
}
const TOUCH_LOOK_SENS = 0.0045;

const host = document.getElementById('canvas-host');
const loadOverlay = document.getElementById('load-overlay');
const walkOverlay = document.getElementById('walk-overlay');
const roomNameEl = document.getElementById('room-name');
const hintRight = document.getElementById('hint-right');
const statusEye = document.getElementById('status-eye');
const statusLook = document.getElementById('status-look');
document.getElementById('status').hidden = true;
const viewsEl = document.getElementById('views');
const layersEl = document.getElementById('layers');
const joystickEl = document.getElementById('joystick');
const stickEl = joystickEl.querySelector('.stick');
const lookZone = document.getElementById('look-zone');

const isTouch = matchMedia('(pointer: coarse)').matches;
if (isTouch) document.body.classList.add('touch-ui');

const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false, powerPreference: 'high-performance', preserveDrawingBuffer: true });
renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
renderer.setSize(host.clientWidth, host.clientHeight);
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 0.88; // Step 5: was 1.05 — whites were blowing out after the window lights were added
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
host.appendChild(renderer.domElement);

const labelRenderer = new CSS2DRenderer();
labelRenderer.domElement.className = 'name-layer';
labelRenderer.setSize(host.clientWidth, Math.max(host.clientHeight, 1));
host.appendChild(labelRenderer.domElement);
const walkRooms=document.createElement('nav');walkRooms.setAttribute('aria-label','Walk rooms');walkRooms.style.cssText='position:absolute;top:12px;right:12px;z-index:10;display:none;max-height:75%;overflow:auto;max-width:180px;';
for(const view of VIEW_DEFS){const b=document.createElement('button');b.className='name-label';b.textContent='⌂ '+view.label;b.style.cssText='display:block;margin:4px;';b.addEventListener('click',e=>{e.stopPropagation();goToView(view);});walkRooms.appendChild(b);}host.appendChild(walkRooms);
const doorPrompt=document.createElement('button');doorPrompt.id='hint-pill';doorPrompt.className='name-label';doorPrompt.style.cssText='position:absolute;bottom:40px;left:50%;transform:translateX(-50%);z-index:11;display:none;';host.appendChild(doorPrompt);let nearbyDoor=null;
doorPrompt.addEventListener('click',e=>{e.stopPropagation();if(nearbyDoor)toggleDoor(nearbyDoor);});
let nameFly = null;
const nameLabels = [];
let wallEdges = null;
let exteriorView = null;

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xdeddd9);

const pmrem = new THREE.PMREMGenerator(renderer);
scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
scene.environmentIntensity = 0.55;

const hemi = new THREE.HemisphereLight(0xdde7ff, 0x3a3228, 0.85); // Phase 2: kept in a variable so the weather can change it
scene.add(hemi);
let outdoor = null, weather = null;
let outdoorFocus = false; // true while looking at the building from outside (Building / Pool views)
const sun = new THREE.DirectionalLight(0xfff2dd, 1.15);
sun.position.set(-4, 12, -4);
sun.target.position.set(-10,0,-9);scene.add(sun.target);
sun.castShadow=true;sun.shadow.mapSize.set(2048,2048);
Object.assign(sun.shadow.camera,{left:-12,right:12,top:12,bottom:-12,near:1,far:35});
sun.shadow.normalBias=0.012;sun.shadow.bias=-0.00015;
scene.add(sun);
const fill = new THREE.DirectionalLight(0xb8d0ff, 0.35);
fill.position.set(-6, 6, -8);
scene.add(fill);

const camera = new THREE.PerspectiveCamera(65, host.clientWidth / Math.max(host.clientHeight, 1), 0.1, 9000); // Phase 2: far 200 -> 9000 m; near 0.1 (was 0.05) doubles depth precision far away
camera.position.copy(bz(6.5, 14, 8));

const orbit = new OrbitControls(camera, renderer.domElement);
orbit.mouseButtons.MIDDLE=THREE.MOUSE.PAN;
orbit.enableDamping = true;
orbit.dampingFactor = 0.08;
orbit.target.copy(bz(6.5, 5.5, 1.2));
orbit.minPolarAngle = 0.12;
orbit.maxPolarAngle = Math.PI * 0.48;
orbit.minDistance = 1.0;
orbit.maxDistance = 14;
orbit.update();

const walkCam = new THREE.PerspectiveCamera(72, camera.aspect, 0.1, 9000); // Phase 2: far 9000 m; near 0.1 for depth precision
const crosshairEl = document.getElementById('crosshair');
// True plan camera. World +Z is north and is screen-up. Up is set before lookAt.
const orthoCam = new THREE.OrthographicCamera(-10, 10, 10, -10, 0.05, 400);
orthoCam.up.set(0, 0, 1);

const params = new URLSearchParams(location.search);
// 2026-10-10: ?view=top | <named view id> picks the starting view (same as ?shot=, e.g. ?view=lounge);
// ?layout=option2 starts in the gear menu's "option two" layout (default: "assisting").
const viewParam = params.get('view');
const shot = params.get('shot') || (viewParam ? (viewParam === 'top' ? 'fit' : viewParam) : null);
// ?layout=assisting | option2 | proposal | ikea (2026-10-10: ikea = IKEA proposal, ikea-proposal.js).
const startLayout = ['proposal', 'ikea', 'grok'].includes(params.get('layout')) ? params.get('layout') : /^(option-?2|option-?two|two)$/i.test(params.get('layout') || '') ? 'option2' : 'assisting';
// ?panel=hidden starts with the Settings panel closed (for screenshots); ?panel=shown opens it. Otherwise the last choice.
const panelParam = params.get('panel');
let noPerspective = !shot || shot === 'fit';

let walkDragFallback=false,dragLook=null;
// Counter-Strike-style free look for browsers that block pointer lock (e.g. the Claude app's browser pane):
// plain mouse movement turns the view, the cursor is hidden, and holding it near an edge keeps turning.
// 'armed' waits until the mouse pauses inside the view, so the movement from the Walk button into the scene doesn't swing the camera.
const freeLook={x:0,y:0,inside:false,armed:false,lastMove:0};
let mode = 'explore'; // explore | walk | figma | presentation
let orbitFree = false; // mode bar ORBIT: Explore 3D with drag orbit instead of mouse-look fly (2026-10-20)
let orbitHold = false; // set while ORBIT runs the 3D overview, so leaveTopView keeps orbitFree (no pointer lock)
let presentation = null;
let activeView = null;
let root = null;
let nameToMeshes = new Map(); // objectName -> [Object3D]
let layerVisibility = Object.fromEntries(LAYER_DEFS.map((l) => [l.id, true]));
let layerNameSets = Object.fromEntries(LAYER_DEFS.map((l) => [l.id, new Set()]));

const keys = Object.create(null);
const clock = new THREE.Clock();
// Step 4: soft corner shading (ambient occlusion) for the two 3D cameras. Top plan stays plain.
const aoOrbit = createAOComposer(renderer, scene, camera, host.clientWidth, Math.max(host.clientHeight, 1));
const aoWalk = createAOComposer(renderer, scene, walkCam, host.clientWidth, Math.max(host.clientHeight, 1));
// 2026-11-22 (Grok v2): adaptive quality. GTAO + bloom + 4x MSAA at retina resolution dropped to ~7-12 fps on
// iPad / laptop GPUs. Every 1.5 s we look at the real frame rate and step the render resolution (and AO samples)
// down when it is slow, and back up when there is headroom. ?quality=high pins full resolution.
const quality = (() => {
  const maxR = Math.min(devicePixelRatio || 1, 2), minR = Math.min(maxR, 1); // never below 1:1 CSS pixels (it went soft at 0.75)
  const pinned = params.get('quality') === 'high';
  let ratio = maxR, frames = 0, t0 = performance.now(), calmUntil = 0, aoSamples = 16;
  const setAO = (n) => { if (n === aoSamples) return; aoSamples = n; for (const c of [aoOrbit, aoWalk]) c.ao.updateGtaoMaterial({ samples: n }); };
  const apply = () => { renderer.setPixelRatio(ratio); onResize(); };
  const api = { get ratio() { return ratio; }, get aoSamples() { return aoSamples; }, fps: 0,
    tick() {
      if (pinned || document.hidden) { frames = 0; t0 = performance.now(); return; }
      frames++; const now = performance.now(), span = now - t0; if (span < 1500) return;
      const fps = frames * 1000 / span; api.fps = +fps.toFixed(1); frames = 0; t0 = now;
      if (now < calmUntil) return;
      if (fps < 42 && ratio > minR + 0.01) { if (aoSamples > 8) setAO(8); ratio = Math.max(minR, +(ratio - 0.25).toFixed(2)); apply(); calmUntil = now + 1200; }
      else if (fps > 57 && ratio < maxR - 0.01) { ratio = Math.min(maxR, +(ratio + 0.25).toFixed(2)); if (ratio >= maxR - 0.01) setAO(16); apply(); calmUntil = now + 4000; }
    } };
  return api;
})();
window.__atlantisQuality = quality;
// 2026-11-22 (Grok v2): doll-house stage. From above (3D / Orbit) the flat had nothing under it and floated in a flat
// grey void. Now: a soft sky-to-paper gradient behind it and a soft contact shadow under the unit.
const stage = (() => {
  const bgCanvas = document.createElement('canvas'); bgCanvas.width = 4; bgCanvas.height = 512;
  const g = bgCanvas.getContext('2d'), grad = g.createLinearGradient(0, 0, 0, 512);
  grad.addColorStop(0, '#b9cbdc'); grad.addColorStop(0.55, '#dcdfdf'); grad.addColorStop(1, '#e6e1d8');
  g.fillStyle = grad; g.fillRect(0, 0, 4, 512);
  const bg = new THREE.CanvasTexture(bgCanvas); bg.colorSpace = THREE.SRGBColorSpace;
  const shCanvas = document.createElement('canvas'); shCanvas.width = shCanvas.height = 256;
  const sg = shCanvas.getContext('2d'), rg = sg.createRadialGradient(128, 128, 10, 128, 128, 128);
  rg.addColorStop(0, 'rgba(38,34,28,0.72)'); rg.addColorStop(0.62, 'rgba(38,34,28,0.42)'); rg.addColorStop(1, 'rgba(40,36,30,0)');
  sg.fillStyle = rg; sg.fillRect(0, 0, 256, 256);
  const shTex = new THREE.CanvasTexture(shCanvas); shTex.colorSpace = THREE.SRGBColorSpace;
  const blob = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), new THREE.MeshBasicMaterial({ map: shTex, transparent: true, depthWrite: false, toneMapped: false }));
  blob.rotation.x = -Math.PI / 2; blob.renderOrder = -1; blob.name = 'Stage_ContactShadow'; blob.visible = false;
  const catcher = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), new THREE.ShadowMaterial({ opacity: 0.24, depthWrite: false }));
  catcher.rotation.x = -Math.PI / 2; catcher.receiveShadow = true; catcher.name = 'Stage_ShadowCatcher'; catcher.visible = false;
  scene.add(blob, catcher);
  let fitted = null, plain = null, on = false;
  return {
    update(active) {
      if (active && root && fitted !== Math.sign(root.scale.x)) {
        const b = planBounds(), c = b.getCenter(new THREE.Vector3()), sz = b.getSize(new THREE.Vector3());
        const w = Math.max(sz.x, sz.z) * 1.4;
        blob.position.set(c.x, b.min.y - 0.035, c.z); blob.scale.set(w, w, 1);
        catcher.position.set(c.x, b.min.y - 0.03, c.z); catcher.scale.set(w * 1.3, w * 1.3, 1);
        fitted = Math.sign(root.scale.x);
      }
      if (active === on) return; on = active;
      blob.visible = catcher.visible = active;
      if (active) { plain = scene.background; scene.background = bg; } else if (scene.background === bg) scene.background = plain;
    } };
})();
let windowLights = null;
const joy = { active: false, x: 0, y: 0, id: null };
const lookTouch = { id: null, lx: 0, ly: 0 };
const euler = new THREE.Euler(0, 0, 0, 'YXZ');
const _fwd = new THREE.Vector3();
const _right = new THREE.Vector3();
const _move = new THREE.Vector3();
const _up = new THREE.Vector3(0, 1, 0);
// Who uses mouse-look (pointer lock / free look / centre crosshair): Walk, and Explore in 3D (not the 2D top plan,
// not phones/tablets, which keep touch orbit). lookCam = the camera the mouse turns.
const flying = () => mode === 'explore' && !noPerspective && !isTouch && !orbitFree;
const looking = () => mode === 'walk' || flying();
const lookCam = () => (mode === 'walk' ? walkCam : camera);
const flyHint = () => `Mouse / arrows look · WASD fly · Space up · C down · Shift slow · Scroll speed ${FLY.speed.toFixed(1)} m/s · Esc release`;

function setMode(next) {
  if (mode === next) return;
  const prev = mode;walkDragFallback=false;dragLook=null;
  mode = next; if (!orbitHold) orbitFree = false;
  if (mode !== 'explore') nameFly = null;
  declutterLabels(); // Step 7: label offsets only apply in the Top view
  if (mode === 'walk' && noPerspective) leaveTopView();
  document.body.classList.toggle('mode-walk', mode === 'walk');
  document.body.classList.toggle('mode-figma', mode === 'figma');
  document.body.classList.toggle('mode-presentation', mode === 'presentation');
  if (prev === 'presentation' && next !== 'presentation' && presentation) presentation.leave();
  document.getElementById('mode-explore').setAttribute('aria-pressed', String(mode === 'explore'));
  document.getElementById('mode-walk').setAttribute('aria-pressed', String(mode === 'walk'));
  const figmaBtn = document.getElementById('mode-figma');
  if (figmaBtn) figmaBtn.setAttribute('aria-pressed', String(mode === 'figma'));
  const figmaPanel = document.getElementById('figma-panel');
  if (figmaPanel) figmaPanel.setAttribute('aria-hidden', String(mode !== 'figma'));

  orbit.enabled = mode === 'explore' && !noPerspective && isTouch; // fly replaces orbit (touch devices keep orbit)
  flyVel.set(0, 0, 0);
  if (mode !== 'walk') {
    if (document.pointerLockElement === renderer.domElement) document.exitPointerLock();
    document.body.classList.remove('walk-locked');
    if (crosshairEl) crosshairEl.hidden = true;
    walkOverlay.classList.remove('show');
  }

  if (mode === 'explore') {
    hintRight.textContent = noPerspective ? 'Top view · north up' : isTouch ? 'Orbit drag · pinch zoom' : flyHint();
    if (!activeView) roomNameEl.textContent = noPerspective ? 'Top' : 'Explore';
    // resume renderer sizing after leaving figma
    if (prev === 'figma') onResize();
    if (flying()) { camera.up.set(0, 1, 0); requestWalkLock(); } // straight into flying, like Walk
  } else if (mode === 'walk') {
    nameFly = null;
    const lounge=VIEW_DEFS.find(v=>v.id==='lounge'),look=lounge.look.clone();
    walkCam.position.copy(lounge.pos);
    if(root&&root.scale.x<0){walkCam.position.x*=-1;look.x*=-1;}
    walkCam.position.y=EYE_HEIGHT;walkCam.up.set(0,1,0);walkCam.lookAt(look);
    setCeilingVisible(true);activeView='lounge';roomNameEl.textContent='Lounge';
    euler.setFromQuaternion(walkCam.quaternion);
    euler.z = 0;
    // keep pitch reasonable
    euler.x = THREE.MathUtils.clamp(euler.x, -1.2, 1.2);
    walkCam.quaternion.setFromEuler(euler);
    hintRight.textContent = isTouch ? 'Joystick move · drag look' : 'Mouse look · WASD move · Click use · Right-click/E options · Esc release';
    if (!activeView) roomNameEl.textContent = 'Walk';
    if (!isTouch) requestWalkLock(); // go straight into looking around — no 'Tap / click to look around' screen
  } else if (mode === 'figma') {
    const frame = document.getElementById('figma-embed');
    if (frame && frame.dataset.src && !frame.getAttribute('src')) frame.src = frame.dataset.src;
    hintRight.textContent = 'Figma canvas · drag pan · scroll zoom';
    roomNameEl.textContent = 'Figma';
    requestAnimationFrame(() => {
      if (typeof window.__figmaCanvasFit === 'function') window.__figmaCanvasFit();
    });
  } else if (mode === 'presentation') {
    orbit.enabled = false;
    roomNameEl.textContent = 'Presentation';
    hintRight.textContent = 'Scroll to walk in · Space plays';
    if (presentation) presentation.enter();
  }
}

document.getElementById('mode-explore').addEventListener('click', () => setMode('explore'));
document.getElementById('mode-walk').addEventListener('click', () => setMode('walk'));
document.getElementById('mode-figma').addEventListener('click', () => setMode('figma'));

function syncWalkLock() {
  if(document.pointerLockElement===renderer.domElement)walkDragFallback=false;
  const locked = looking() && (document.pointerLockElement === renderer.domElement||walkDragFallback); // Walk or Explore-fly
  if(!locked)for(const key of Object.keys(keys))delete keys[key];
  document.body.classList.toggle('walk-locked', locked);
  if (crosshairEl) crosshairEl.hidden = !locked;
  walkOverlay.classList.remove('show'); // the 'Tap / click to look around' screen is never shown
  if (!locked && mode === 'walk' && !isTouch) hintRight.textContent = 'Click to look around · WASD move';
  if (!locked && flying()) hintRight.textContent = 'Click to fly · WASD · Space/C up/down · Scroll speed';
  if (locked && flying()) hintRight.textContent = flyHint();
}
function enableWalkFallback() {
  if (settingsAction || document.activeElement?.closest('#side-panel')) return;
  if(!looking())return;walkDragFallback=true;freeLook.armed=false;freeLook.lastMove=performance.now();renderer.domElement.tabIndex=0;renderer.domElement.focus();walkOverlay.classList.remove('show');if(crosshairEl)crosshairEl.hidden=false;document.body.classList.add('walk-locked');hintRight.textContent=mode==='walk'?'Move mouse to look · WASD move · Click use · Right-click/E options · Esc release':flyHint();host.dataset.walkInput='free-look';
}
let lockPending = false; // one pointer-lock request at a time (e.g. Building button = setMode + leaveTopView)
let settingsAction = false;
let settingsPanel = null; // { show, hide, toggle } — set by buildSidePanel()
function requestWalkLock() {
  if (settingsAction || document.activeElement?.closest('#side-panel')) return;
  if (!looking() || isTouch || lockPending || walkDragFallback || document.pointerLockElement === renderer.domElement) return;
  const el = renderer.domElement;
  host.dataset.walkLockContext=JSON.stringify({connected:el.isConnected,sameDocument:el.ownerDocument===document,parent:el.parentElement?.id,visibility:document.visibilityState,focused:document.hasFocus(),topLevel:window.top===window,userActive:navigator.userActivation?.isActive});
  // Raw mouse input like Counter-Strike (no OS acceleration) where supported; older browsers ignore the option.
  let pending; try { pending = el.requestPointerLock({ unadjustedMovement: true }); } catch (_) { pending = el.requestPointerLock(); }
  if (pending && typeof pending.then === 'function') { lockPending = true; const done = () => { lockPending = false; }; pending.then(done, done); }
  if (pending && typeof pending.catch === 'function') pending.catch(error => { host.dataset.walkLockError = error.name + ': ' + error.message;
    if (error.name === 'NotSupportedError') { const p2 = el.requestPointerLock(); if (p2?.catch) p2.catch(() => enableWalkFallback()); } else enableWalkFallback(); });
}
walkOverlay.addEventListener('click', () => requestWalkLock());
renderer.domElement.addEventListener('click', (e) => {
  if (tableMenu.open) { closeTableMenu(true); return; }   // click outside the table menu = close it and look again
  if (looking() && !walkDragFallback && document.pointerLockElement !== renderer.domElement) { requestWalkLock(); return; }
  // Normal pointer (2D top plan, touch orbit): left-click = the table's direct action (TONSTAD extend / close);
  // tables without one open the menu where you clicked. Right-click / E = the menu (see the mousedown handler).
  if (!looking() && mode === 'explore' && dining && mouseOnTable(e.clientX, e.clientY)) {
    if (dining.extendable()) dining.toggleExtend(); else openTableMenu(e.clientX, e.clientY);
  }
  else if (!looking() && mode === 'explore') { const fs = mouseOnFrame(e.clientX, e.clientY); if (fs) openTableMenu(e.clientX, e.clientY, fs); } // frames.js
});
// 2026-10-11 (Xip): right-click is "options", so the browser's own context menu never opens over the 3D view.
for (const el of [renderer.domElement, host]) el.addEventListener('contextmenu', (e) => e.preventDefault());
function mouseOnFrame(x, y) {   // frames.js: normal mouse pointer over a TV-wall frame -> its slot
  if (!frames) return null;
  const r = renderer.domElement.getBoundingClientRect(), ndc = new THREE.Vector2((x - r.left) / r.width * 2 - 1, -((y - r.top) / r.height) * 2 + 1);
  _aimRay.setFromCamera(ndc, noPerspective ? orthoCam : camera); _aimRay.far = Infinity;
  const f = furnitureHit(_aimRay); return f ? frames.slotOf(f.piece) : null;
}
function mouseOnTable(x, y) {   // normal mouse pointer over the dining table (top plan / touch orbit)
  const r = renderer.domElement.getBoundingClientRect(), ndc = new THREE.Vector2((x - r.left) / r.width * 2 - 1, -((y - r.top) / r.height) * 2 + 1);
  _aimRay.setFromCamera(ndc, noPerspective ? orthoCam : camera); _aimRay.far = Infinity;
  return diningHit(_aimRay);
}
document.addEventListener('pointerlockchange', syncWalkLock);
// With real pointer lock, Chrome uses the first Esc itself to release the mouse (the page never gets that keydown).
// So: the mouse was released, not by our own code -> treat it as that Esc and open Settings.
let codeUnlockAt = 0;
{ const exit = document.exitPointerLock.bind(document); document.exitPointerLock = () => { codeUnlockAt = performance.now(); return exit(); }; }
document.addEventListener('pointerlockchange', () => {
  if (!document.pointerLockElement && performance.now() - codeUnlockAt > 300 && looking() && !tableMenu.open && settingsPanel) settingsPanel.show();
});
document.addEventListener('pointerlockerror', enableWalkFallback);
window.addEventListener('mousemove', (e) => {
  if(!looking())return;
  let dx,dy;
  if(document.pointerLockElement===renderer.domElement){dx=e.movementX;dy=e.movementY;}          // real pointer lock (normal Chrome)
  else if(walkDragFallback){                                                                       // free look: no button needed
    const r=renderer.domElement.getBoundingClientRect(),overUI=e.target.closest?.('button,a,input,#weather-panel,#side-panel');
    freeLook.x=e.clientX;freeLook.y=e.clientY;
    freeLook.inside=!overUI&&e.clientX>=r.left&&e.clientX<=r.right&&e.clientY>=r.top&&e.clientY<=r.bottom;
    if(!freeLook.inside)return;
    if(!freeLook.armed){freeLook.lastMove=performance.now();return;}   // still arriving: don't turn yet
    dx=e.movementX;dy=e.movementY;
  } else return;
  const cam = lookCam(); // Walk turns walkCam, Explore-fly turns the Explore camera
  euler.setFromQuaternion(cam.quaternion);
  euler.y -= dx * 0.0022;
  euler.x -= dy * 0.0022;
  euler.x = THREE.MathUtils.clamp(euler.x, -1.45, 1.45);
  euler.z = 0;
  cam.quaternion.setFromEuler(euler);
});

window.addEventListener('keydown', (e) => {
  if (tableMenu.open && e.code === 'Escape') { closeTableMenu(false); return; } // close the table menu first
  // 2026-10-10 (Xip): Esc = game-style settings: first Esc releases the mouse and opens Settings, the next Esc hides it.
  if (e.code === 'Escape' && !e.repeat) {
    if (looking()) { if (document.pointerLockElement === renderer.domElement) document.exitPointerLock(); walkDragFallback=false;dragLook=null;syncWalkLock(); }
    if (settingsPanel) settingsPanel.toggle();
    return;
  }
  keys[e.code] = true;
  if (mode === 'walk' && (e.code === 'KeyW' || e.code === 'KeyA' || e.code === 'KeyS' || e.code === 'KeyD')) {
    e.preventDefault();
  }
  // Fly keys. C (not Ctrl) = down: Ctrl+W would close the browser tab while flying forward.
  if (flying() && ['KeyW','KeyA','KeyS','KeyD','Space','KeyC'].includes(e.code)) e.preventDefault();
  if (mode === 'walk' && ['Space','ControlLeft','ControlRight'].includes(e.code)) e.preventDefault(); // jump / crouch, no page scroll
  if (looking() && e.code.startsWith('Arrow')) e.preventDefault(); // arrow keys look around, no page scroll
  // 2026-10-11 (Xip): E = options (same as right-click): the table menu. Things without a menu (TV, sofa bed, tap,
  // drawer, door) keep E as a fallback for their click action, so the old "E opens doors" habit still works.
  if(e.code==='KeyE'&&!e.repeat&&!e.metaKey&&!e.ctrlKey&&!e.target.closest?.('input,textarea,select,[contenteditable]')){
    if(mode==='walk'||diningAimed||frameAimed){e.preventDefault();optionsAimed();}
    else if(mode==='explore'&&!looking()&&hoverPx&&mouseOnTable(...hoverPx)){e.preventDefault();openTableMenu(...hoverPx);}
    else if(mode==='explore'&&!looking()&&hoverPx&&mouseOnFrame(...hoverPx)){e.preventDefault();openTableMenu(...hoverPx,mouseOnFrame(...hoverPx));} // frames.js   // top plan: E over the table
  }
  // 2026-10-10 (Xip): number keys = the four buttons at the top: 1 Explore · 2 Walk · 3 Figma · 4 No perspective.
  if (!e.repeat && !e.metaKey && !e.ctrlKey && !e.altKey && !e.target.closest?.('input,textarea,select,button,summary,a,[contenteditable]')) {
    if (e.code === 'Digit1') { e.preventDefault(); if (mode !== 'explore') setMode('explore'); else if (noPerspective) leaveTopView(); }
    if (e.code === 'Digit2') { e.preventDefault(); setMode('walk'); }
    if (e.code === 'Digit3') { e.preventDefault(); setMode('figma'); }
    if (e.code === 'Digit4') { e.preventDefault(); if (mode !== 'explore') setMode('explore'); applyTopView(); }
  }
  if (e.code === 'KeyF' && !e.repeat) setMode('walk');
  if (e.code === 'KeyG' && !e.repeat) setMode('figma');
});
// 2026-10-10: Cmd+1..5 (Ctrl+1..5 on Windows / Linux) = living room layout: Existing · Option two · Warm Nordic · IKEA · Grok.
// Capture phase, so it also works while a Settings dropdown has focus; preventDefault stops the browser's tab switch.
const LAYOUT_KEYS = { Digit1: 'assisting', Digit2: 'option2', Digit3: 'proposal', Digit4: 'ikea', Digit5: 'grok' };
const IS_MAC = /Mac|iPhone|iPad/.test(navigator.platform || navigator.userAgent);
window.addEventListener('keydown', (e) => {
  const next = LAYOUT_KEYS[e.code];
  if (!next || e.altKey || e.shiftKey || !(IS_MAC ? e.metaKey && !e.ctrlKey : e.ctrlKey && !e.metaKey)) return;
  e.preventDefault(); e.stopPropagation();
  if (!e.repeat) setLayout(next);   // setLayout updates the dropdown (syncLayoutControl) and the ?layout= URL, no reload
}, true);
window.addEventListener('keyup', (e) => { keys[e.code] = false; });
window.addEventListener('pointerup',()=>{dragLook=null;});
document.addEventListener('mouseleave',()=>{freeLook.inside=false;});
// ---- Centre-crosshair aiming (Counter-Strike style): the crosshair is the only pointer in Walk look mode ----
let aimedLabel=null;
const walkLooking=()=>looking()&&document.body.classList.contains('walk-locked'); // Walk or Explore-fly, mouse captured
function labelAtCentre(){
  const r=renderer.domElement.getBoundingClientRect(),cx=r.left+r.width/2,cy=r.top+r.height/2;
  for(const o of nameLabels){const el=o.element;if(!o.visible||!el.offsetParent)continue;const b=el.getBoundingClientRect();
    if(cx>=b.left&&cx<=b.right&&cy>=b.top&&cy<=b.bottom)return el;}
  return null;
}
function updateAim(){
  const el=walkLooking()?labelAtCentre():null;
  if(el!==aimedLabel){aimedLabel?.classList.remove('aim');el?.classList.add('aim');aimedLabel=el;}
}
const _aimRay=new THREE.Raycaster();
function doorAtCentre(){
  _aimRay.setFromCamera(new THREE.Vector2(0,0),walkCam);_aimRay.far=2.0;
  const hit=_aimRay.intersectObjects([...walkColliders(),...doorLeaves()],true)[0];
  let o=hit?.object;while(o&&!(o.name&&o.name.startsWith('Door_')&&o.name.includes('Leaf')))o=o.parent;
  return o||null;
}
// The switchable thing (interact.js) under the crosshair within 2.2 m; walls and doors in front block it.
function interactAtCentre(){
  if(!interactions||mode!=='walk')return null;
  _aimRay.setFromCamera(new THREE.Vector2(0,0),walkCam);_aimRay.far=2.2;
  const hit=_aimRay.intersectObjects([...walkColliders(),...interactions.targets],true).find(h => {
    // Hidden baseline furniture must not offer interactions through its replacement in a proposal.
    for (let o = h.object; o; o = o.parent) if (!o.visible) return false;
    return true;
  });
  return hit?interactions.itemOf(hit.object):null;
}
// ---- Dining table: crosshair on it = white outline; click / 1 = small menu to swap the table (Xip 2026-10-10) ----
function diningHit(ray){                    // true when the first thing the ray meets is the visible dining set
  if(!dining)return false;let o=dining.holder;while(o){if(!o.visible)return false;o=o.parent;}   // hidden (e.g. option two)
  const hit=ray.intersectObjects([...walkColliders(),dining.holder],true).find(h=>h.object.visible);
  let p=hit?.object;while(p&&p!==dining.holder)p=p.parent;return !!p;
}
// ---- 2026-10-10 (Xip): EVERY piece of furniture gets the white outline on hover ----
// Crosshair (Walk / Explore fly) or the normal mouse pointer (top plan, Settings open).
// A "piece" = the outermost furniture-named object above what the ray hits, stopping at layout containers.
const FURNITURE_NAME=/^(Furniture_|Lounge_|Proposal_|Ikea_|IKEA_|OptionTwo_|Product_|Grok_)/;
const NOT_FURNITURE=/TileWall|BathFloor|AccentPaint|RainShower|CeilingFan/;
const LAYOUT_CONTAINERS=new Set(['Lounge_Proposal','Ikea_Proposal','Lounge_GrokProposal','OptionTwo_Designer','Furniture_Dining']);
let hoverNdc=null,hoverPx=null; // mouse position over the 3D view (normal pointer): NDC and client px
renderer.domElement.addEventListener('pointermove',(e)=>{const r=renderer.domElement.getBoundingClientRect();hoverNdc=new THREE.Vector2((e.clientX-r.left)/r.width*2-1,-((e.clientY-r.top)/r.height)*2+1);hoverPx=[e.clientX,e.clientY];});
renderer.domElement.addEventListener('pointerleave',()=>{hoverNdc=null;hoverPx=null;});
function furnitureHit(ray){
  if(!root)return null;
  const objs=root.children.filter(c=>c.visible&&!(c.name||'').startsWith('Outdoor'));
  const hit=ray.intersectObjects(objs,true).find(h=>{for(let o=h.object;o;o=o.parent)if(!o.visible)return false;return h.object.isMesh;});
  if(!hit)return null;
  let piece=null;
  for(let o=hit.object;o&&o!==root;o=o.parent){const n=o.name||'';if(LAYOUT_CONTAINERS.has(n)||n.startsWith('ProductSlot_'))break;if(FURNITURE_NAME.test(n))piece=o;}
  if(!piece||NOT_FURNITURE.test(piece.name))return null;
  let objects=[piece];
  if(piece.isMesh&&piece.parent){   // older furniture made of loose sibling parts (e.g. Lounge_Sofa_Tan_Base/_Leg_1): outline them together
    const prefix=piece.name.split('_').slice(0,3).join('_')+'_';objects=piece.parent.children.filter(c=>c.visible&&c.isMesh&&c.name.startsWith(prefix));
  }
  return {piece,objects,distance:hit.distance};
}
// ---- Hover price tag (Xip 2026-10-10): only the item under the crosshair / mouse, never a full list ----
// Prices: existing furniture checked on the Malaysian sites 2026-10-10 (docs/atlantis-existing-furniture-prices.md);
// Grok and IKEA proposals read their own product data. No checked price = no tag.
const IKEA_MY='https://www.ikea.com/my/en/p/';
const PRICE_INFO={
  Lounge_Sofa_Charcoal_NYHAMN:{name:'IKEA NYHAMN 3-seat sofa-bed',size:'200 × 97 × 90 cm · bed 140 × 200',price:1295},
  Furniture_Figma_196_404:{name:'IKEA TÄRNÖ table + 2 chairs, outdoor',size:'table 55 × 54 × 70 cm',price:249},
  Furniture_Figma_196_411:{name:'IKEA TÄRNÖ table + 2 chairs, outdoor',size:'chair 39 × 40 × 79 cm',price:249},
  Furniture_Figma_196_415:{name:'IKEA TÄRNÖ table + 2 chairs, outdoor',size:'chair 39 × 40 × 79 cm',price:249},
  Furniture_Figma_196_384:{name:'IKEA FRANKLIN bar stool, foldable',size:'50 × 44 × 95 cm · seat 63 cm',price:145},
  Furniture_Figma_196_391:{name:'IKEA FRANKLIN bar stool, foldable',size:'50 × 44 × 95 cm · seat 63 cm',price:145},
  Furniture_Photo_HighChair_ANTILOP:{name:'IKEA ANTILOP highchair with tray',size:'56 × 60 × 90 cm',price:59},
  Furniture_Figma_196_377:{name:'IKEA KALLAX shelving unit, white',size:'77 × 39 × 77 cm',price:179},
  Furniture_Dining_tonstad:{name:'IKEA TONSTAD extendable table, oak veneer',size:'140/196 × 85 × 75 cm',price:1599},
  Furniture_Dining_migic:{name:'Migic dining table, LED + power track (Harvey Norman)',size:'150 (+30) × 80 × 75 cm',price:4993,note:'sale price'},
  Furniture_Dining_cassandra:{name:'CASSANDRA 6-seater dining set (CKE)',size:'table 150 × 90 × 75 cm',price:2950,note:'set price'},
};
const GROK_PIECE_INDEX={Grok_Sofa:0,Grok_CoffeeTable:2,Grok_Rug:3,Grok_FloorLamp:4};
const IKEA_PIECE_ROLE={Ikea_Sofa:'sofa',Ikea_CoffeeTable:'coffee_table',Ikea_RugGroup:'rug',Ikea_DiningTable:'dining_table',Ikea_FloorLamp:'floor_lamp',Ikea_FloorLamp2:'floor_lamp_2',Ikea_Curtain:'curtains',Ikea_CurtainRod:'curtains'};
let ikeaProducts=null;fetch('./ikea-products.json').then(r=>r.json()).then(d=>{ikeaProducts=d.products||[];}).catch(()=>{});
function priceFor(piece){
  const n=piece?.name||'';
  if(piece?.userData?.product)return piece.userData.product;
  if(PRICE_INFO[n])return PRICE_INFO[n];
  if(n in GROK_PIECE_INDEX&&grok.module?.GROK_PRODUCTS){const p=grok.module.GROK_PRODUCTS[GROK_PIECE_INDEX[n]];if(p)return{name:p.name,size:p.size,price:p.price};}
  if(IKEA_PIECE_ROLE[n]&&ikeaProducts){const p=ikeaProducts.find(x=>x.role===IKEA_PIECE_ROLE[n]);if(p)return{name:p.name,size:p.size_text,price:p.price_rm};}
  return null;
}
const priceTag=document.createElement('div');priceTag.id='price-tag';priceTag.hidden=true;host.appendChild(priceTag);
function updatePriceTag(found){
  const info=found?priceFor(found.piece):null;
  if(!info||!info.price){priceTag.hidden=true;return;}
  const key=info.name+info.price;
  if(priceTag.dataset.key!==key){priceTag.dataset.key=key;
    priceTag.innerHTML=`<b>${info.name}</b>${info.size?`<span>${info.size}</span>`:''}<strong><small>RM</small>${Number(info.price).toLocaleString('en-MY')}</strong>${info.note?`<em>${info.note}</em>`:''}`;}
  const r=host.getBoundingClientRect();
  let x=r.width/2+22,y=r.height/2+22;                                             // crosshair: just below-right of the centre
  if(!walkLooking()&&hoverNdc){x=(hoverNdc.x+1)/2*r.width+18;y=(1-hoverNdc.y)/2*r.height+18;}   // mouse: next to the pointer
  priceTag.style.left=Math.min(x,r.width-250)+'px';priceTag.style.top=Math.min(y,r.height-110)+'px';priceTag.hidden=false;
}
function updateDiningAim(){
  diningAimed=false;frameAimed=null;let found=null;
  if(!tableMenu.open&&mode!=='figma'){
    if(walkLooking()){_aimRay.setFromCamera(new THREE.Vector2(0,0),lookCam());_aimRay.far=mode==='walk'?4.0:10.0;found=furnitureHit(_aimRay);}
    else if(hoverNdc&&!looking()){_aimRay.setFromCamera(hoverNdc,noPerspective?orthoCam:camera);_aimRay.far=Infinity;found=furnitureHit(_aimRay);}
  }
  // The dining table keeps its E / click menu (crosshair only, within the old reach).
  if(found&&dining&&walkLooking()&&found.distance<=(mode==='walk'?3.0:8.0))for(let o=found.piece;o;o=o.parent)if(o===dining.holder){diningAimed=true;break;}
  if(found&&frames&&walkLooking()&&found.distance<=(mode==='walk'?3.0:8.0))frameAimed=frames.slotOf(found.piece); // frames.js
  updatePriceTag(found); // 2026-10-10: hover shows only that item's price (no always-on lists)
  const sel=found?found.objects:[];
  aoWalk.outline.selectedObjects=sel;aoOrbit.outline.selectedObjects=sel;
}
const tableMenu={open:false,el:null};
function openTableMenu(x,y,frameSlot){   // frameSlot (frames.js): list the IKEA frames for that wall slot instead of tables
  if(!dining&&!frameSlot)return;
  if(document.pointerLockElement===renderer.domElement)document.exitPointerLock();   // show the normal pointer to pick
  walkDragFallback=false;syncWalkLock();
  tableMenu.el?.remove();
  const el=document.createElement('div');el.id='table-menu';
  const r=host.getBoundingClientRect(),px=x==null?r.width/2:x-r.left,py=y==null?r.height/2:y-r.top;
  el.style.cssText=`position:absolute;z-index:20;left:${px}px;top:${py}px;transform:translate(-50%,-50%);background:rgba(18,20,24,.94);color:#fff;border-radius:14px;padding:10px;display:flex;flex-direction:column;gap:6px;min-width:230px;box-shadow:0 8px 30px rgba(0,0,0,.4);font-size:13px;`;
  const title=document.createElement('div');title.textContent=frameSlot?'Choose frame · '+frameSlot.label:'Choose table';title.style.cssText='font-weight:600;opacity:.8;padding:2px 4px 4px;';el.appendChild(title);
  if(frameSlot)for(const f of (frames.optionsFor?frames.optionsFor(frameSlot):frames.products)){   // frames.js: hung size + exact RM / S$ (feature wall: same-size options)
    const b=document.createElement('button');b.type='button';b.className='chip';b.setAttribute('aria-pressed',String(f.id===frameSlot.id));
    b.innerHTML=`<b>${f.name}</b> <span style="float:right">${f.price_rm==null?'RM n/a':'RM'+f.price_rm}</span><br><span style="opacity:.75">${f.size_cm.join(' × ')} cm · ${f.finish} · ${f.price_sgd==null?'S$ n/a':'S$'+f.price_sgd.toFixed(2)}</span>`;
    b.style.cssText='text-align:left;line-height:1.35;padding:7px 10px;';
    b.addEventListener('click',(e)=>{e.stopPropagation();frames.set(frameSlot.slotId,f.id);closeTableMenu(true);});
    el.appendChild(b);
  }
  else for(const t of dining.tables){
    const b=document.createElement('button');b.type='button';b.className='chip';b.setAttribute('aria-pressed',String(t.id===dining.current()));
    b.innerHTML=`<b>${t.name}</b><br><span style="opacity:.75">${t.L/10} × ${t.W/10} × ${t.H/10} cm${t.note?', '+t.note:''}</span>`;
    b.style.cssText='text-align:left;line-height:1.35;padding:7px 10px;';
    b.addEventListener('click',(e)=>{e.stopPropagation();dining.set(t.id);closeTableMenu(true);});
    el.appendChild(b);
  }
  if(!frameSlot&&dining.extendable()){   // TONSTAD: open / close like IKEA's video (halves glide apart, leaf flips up)
    const x=document.createElement('button');x.type='button';x.className='chip';x.setAttribute('aria-pressed','true');
    x.textContent=dining.isExtended()?'↔ Close to 140 cm':'↔ Extend to 196 cm';
    x.style.cssText='padding:8px 10px;margin-top:4px;background:#2f7cf6;color:#fff;';
    x.addEventListener('click',(e)=>{e.stopPropagation();dining.toggleExtend();closeTableMenu(true);});
    el.appendChild(x);
  }
  for(const ev of ['pointerdown','mousedown','wheel'])el.addEventListener(ev,(e)=>e.stopPropagation());
  host.appendChild(el);tableMenu.el=el;tableMenu.open=true;
}
function closeTableMenu(resume){
  tableMenu.el?.remove();tableMenu.el=null;tableMenu.open=false;
  if(resume&&looking())requestWalkLock();   // back to looking around (the click is the user gesture)
}
// 2026-10-11 (Xip) input scheme: left-click = the direct action, right-click / E = the object's option menu.
// Left-click: TONSTAD extend / close (tables without one: the menu), TV on / off, sofa bed, tap, drawer, door.
function clickAimed(){
  if(diningAimed){if(dining.extendable())dining.toggleExtend();else openTableMenu();return true;}
  if(frameAimed){openTableMenu(null,null,frameAimed);return true;} // frames.js: no direct action, so click = the menu
  if(mode!=='walk')return false; // doors / things switch only in Walk (Explore fly: the table only)
  const item=interactAtCentre();
  if(item){interactions.toggle(item);updateDoorPrompt();return true;}
  updateDoorPrompt();if(nearbyDoor){toggleDoor(nearbyDoor);return true;}
  return false;
}
// Right-click / E: the menu of the aimed object. Only the dining table has one ('Choose table'); for things
// without a menu, E falls back to the click action (right-click does nothing there).
function optionsAimed(fromKey){
  if(diningAimed){openTableMenu();return true;}
  if(frameAimed){openTableMenu(null,null,frameAimed);return true;} // frames.js
  return fromKey!==false&&clickAimed();
}
// A click while looking acts on what the crosshair is aimed at (the first click only starts looking).
window.addEventListener('mousedown',(e)=>{
  if(e.target.closest?.('#side-panel,#panel-toggle,#table-menu'))return;
  if(e.button===2){   // right-click = options: crosshair (Walk / Explore fly) or the mouse pointer (top plan)
    if(walkLooking()){e.preventDefault();optionsAimed(false);}
    else if(mode==='explore'&&!looking()&&dining&&mouseOnTable(e.clientX,e.clientY)){e.preventDefault();openTableMenu(e.clientX,e.clientY);}
    else if(mode==='explore'&&!looking()&&mouseOnFrame(e.clientX,e.clientY)){e.preventDefault();openTableMenu(e.clientX,e.clientY,mouseOnFrame(e.clientX,e.clientY));} // frames.js
    return;
  }
  if(e.button!==0||!walkLooking())return;
  if(aimedLabel){e.preventDefault();aimedLabel.click();return;}
  if(clickAimed())e.preventDefault();
},true);
// Edge turning: the hidden cursor still stops at the screen edge, so near an edge the view keeps turning (full 360°).
function stepFreeLookEdges(dt){
  if(looking()&&walkDragFallback&&freeLook.inside&&!freeLook.armed&&performance.now()-freeLook.lastMove>180)freeLook.armed=true; // mouse paused: start looking
  if(!looking()||!walkDragFallback||!freeLook.inside||!freeLook.armed)return;
  const r=renderer.domElement.getBoundingClientRect(),m=0.06;
  const edge=(v,a,b)=>{const t=(v-a)/(b-a);return t<m?-(m-t)/m:t>1-m?(t-(1-m))/m:0;};
  const ex=edge(freeLook.x,r.left,r.right),ey=0;if(!ex)return; // sideways only, like Counter-Strike
  const cam=lookCam();euler.setFromQuaternion(cam.quaternion);euler.y-=Math.sign(ex)*ex*ex*2.2*dt;euler.x=THREE.MathUtils.clamp(euler.x-ey*1.2*dt,-1.45,1.45);euler.z=0;cam.quaternion.setFromEuler(euler);
}
// 2026-10-10 (Xip): arrow keys look around like Counter-Strike's +left/+right/+lookup/+lookdown (moving = WASD only).
// Speeds: 150°/s turn, 100°/s up/down (CS defaults cl_yawspeed 210 / cl_pitchspeed 225 feel too fast indoors).
const ARROW_LOOK={yaw:150*Math.PI/180,pitch:100*Math.PI/180};
function stepArrowLook(dt){
  if(!walkLooking())return;
  const yaw=(keys['ArrowLeft']?1:0)-(keys['ArrowRight']?1:0),pitch=(keys['ArrowUp']?1:0)-(keys['ArrowDown']?1:0);
  if(!yaw&&!pitch)return;
  const cam=lookCam();euler.setFromQuaternion(cam.quaternion);
  euler.y+=yaw*ARROW_LOOK.yaw*dt;euler.x=THREE.MathUtils.clamp(euler.x+pitch*ARROW_LOOK.pitch*dt,-1.45,1.45);euler.z=0;cam.quaternion.setFromEuler(euler);
}
window.addEventListener('blur',()=>{for(const key of Object.keys(keys))delete keys[key];joyReset();});

function goToView(v) {
  nameFly = null;outdoorFocus = false;
  if (noPerspective) leaveTopView();
  activeView = v.id;
  roomNameEl.textContent = v.label;
  [...viewsEl.querySelectorAll('.tab')].forEach((b) => {
    b.setAttribute('aria-selected', String(b.dataset.id === v.id));
  });
  setCeilingVisible(true);
  const flipX = root && root.scale.x < 0;
  const pos = v.pos.clone();
  const look = v.look.clone();
  if (flipX) { pos.x *= -1; look.x *= -1; }
  if (mode === 'explore') {
    orbit.minPolarAngle = 0.02;
    orbit.maxPolarAngle = Math.PI * 0.92;
    orbit.minDistance = 1.0;
    orbit.maxDistance = 40;
    camera.position.copy(pos);
    orbit.target.copy(look);
    orbit.update();
  } else {
    walkCam.position.copy(pos);
    walkCam.position.y = EYE_HEIGHT;
    walkCam.lookAt(look);
    euler.setFromQuaternion(walkCam.quaternion);
    euler.z = 0;
    walkCam.quaternion.setFromEuler(euler);
  }
}

function setCeilingVisible(on) {
  if (!root) return;
  ceilingState = on;
  root.traverse((o) => {
    if (o.name && o.name.startsWith('Ceiling')) o.visible = on;
  });
}

function planBounds() {
  const box = new THREE.Box3();
  const part = new THREE.Box3();
  root.updateMatrixWorld(true);
  root.traverse((o) => {
    if (!o.isMesh || !o.geometry) return;
    if ((o.name || '').startsWith('Outdoor_')) return; // Phase 2: the landscape is not part of the plan
    let n = o.name || '';
    let p = o.parent;
    while (p && p !== root) {
      if (p.name && !/^Object_\d+$/.test(p.name) && !/^Mesh_\d+$/.test(p.name)) {
        n = p.name;
        break;
      }
      p = p.parent;
    }
    if (n.startsWith('Ceiling') || n.startsWith('Dim_') || n.startsWith('Dim ')) return;
    if (!o.geometry.boundingBox) o.geometry.computeBoundingBox();
    part.copy(o.geometry.boundingBox).applyMatrix4(o.matrixWorld);
    box.union(part);
  });
  return box;
}

// Orthographic plan. camera.up is (0, 0, 1) before lookAt so world +Z (north) is screen-up.
// A straight-down look is perpendicular to that up, so it does not roll the way Y-up does.
function frameOrtho() {
  if (!root) return;
  setCeilingVisible(false);
  const box = planBounds();
  if (box.isEmpty()) return;
  const size = box.getSize(new THREE.Vector3());
  const center = box.getCenter(new THREE.Vector3());
  const w = host.clientWidth || 1;
  const h = Math.max(host.clientHeight, 1);
  const aspect = w / h;
  const margin = 1.08;
  const planW = Math.max(size.x, 0.01) * margin;
  const planH = Math.max(size.z, 0.01) * margin;
  let halfW;
  let halfH;
  if (planW / planH > aspect) {
    halfW = planW / 2;
    halfH = halfW / aspect;
  } else {
    halfH = planH / 2;
    halfW = halfH * aspect;
  }
  const camY = box.max.y + 12;
  orthoCam.left = -halfW;
  orthoCam.right = halfW;
  orthoCam.top = halfH;
  orthoCam.bottom = -halfH;
  orthoCam.near = 0.05;
  orthoCam.far = 400;
  orthoCam.up.set(0, 0, 1);
  orthoCam.position.set(center.x, camY, center.z);
  orthoCam.lookAt(center.x, center.y, center.z);
  orthoCam.updateProjectionMatrix();
}

function syncWallEdges() {
  if (!wallEdges) return;
  wallEdges.visible = noPerspective && layerVisibility.walls !== false;
}

function applyTopView() {
  noPerspective = true; orbitFree = false;
  const btn = document.getElementById('no-perspective');
  if (btn) btn.setAttribute('aria-pressed', 'true');
  nameFly = null;
  activeView = null;
  orbit.enabled = false;
  // The 2D top plan uses the normal mouse pointer (click room labels): stop flying / release the mouse.
  if (mode === 'explore') { if (document.pointerLockElement === renderer.domElement) document.exitPointerLock(); walkDragFallback = false; flyVel.set(0, 0, 0); syncWalkLock(); }
  roomNameEl.textContent = 'Top';
  hintRight.textContent = 'Top view · north up';
  [...viewsEl.querySelectorAll('.tab')].forEach((b) => {
    b.setAttribute('aria-selected', String(b === fitBtn));
  });
  frameOrtho();
  spreadCrowdedLabels();
  syncWallEdges();
  syncProposalVisibility();
}

function leaveTopView() {
  noPerspective = false; if (!orbitHold) orbitFree = false;
  syncWallEdges();
  const btn = document.getElementById('no-perspective');
  if (btn) btn.setAttribute('aria-pressed', 'false');
  setCeilingVisible(true);
  camera.up.set(0, 1, 0);
  orbit.enabled = mode === 'explore' && isTouch; // fly replaces orbit (touch devices keep orbit)
  if (mode === 'explore') { hintRight.textContent = isTouch ? 'Orbit drag · pinch zoom' : flyHint(); requestWalkLock(); } // back in 3D: fly
  declutterLabels(); // Step 7: clear Top-view label offsets
}

function fitModel() {
  if (!root) return;
  if (mode !== 'explore') setMode('explore');
  applyTopView();
}

const fitBtn = document.createElement('button');
fitBtn.className = 'tab';
fitBtn.type = 'button';
fitBtn.textContent = 'Fit';
fitBtn.addEventListener('click', () => fitModel());
viewsEl.appendChild(fitBtn);
const overviewBtn=document.createElement('button');overviewBtn.className='tab';overviewBtn.type='button';overviewBtn.textContent='3D';
overviewBtn.addEventListener('click',()=>{if(!root)return;outdoorFocus=false;if(mode!=='explore')setMode('explore');leaveTopView();setCeilingVisible(false);const b=planBounds(),c=b.getCenter(new THREE.Vector3());fitOverview(b,c);orbit.target.copy(c);orbit.update();roomNameEl.textContent='3D';[...viewsEl.querySelectorAll('.tab')].forEach(t=>t.setAttribute('aria-selected',String(t===overviewBtn))); /* Step 7: highlight 3D, not Fit */});viewsEl.appendChild(overviewBtn);
// Outside views of the whole Atlantis Residences (towers, pool deck, roads). Plan metres -> world via fileToWorld.
function showOutside(label, eye, look, btn) {
  if (!root) return; if (mode !== 'explore') setMode('explore'); leaveTopView(); setCeilingVisible(true);
  outdoorFocus = true; nameFly = null;
  orbit.minDistance = 2; orbit.maxDistance = 2500; orbit.minPolarAngle = 0.05; orbit.maxPolarAngle = Math.PI * 0.495;
  camera.position.copy(fileToWorld(eye[0], eye[2], -eye[1])); orbit.target.copy(fileToWorld(look[0], look[2], -look[1])); orbit.update();
  roomNameEl.textContent = label;
  [...viewsEl.querySelectorAll('.tab')].forEach((t) => t.setAttribute('aria-selected', String(t === btn)));
}
const buildingBtn = document.createElement('button'); buildingBtn.className = 'tab'; buildingBtn.type = 'button'; buildingBtn.textContent = 'Building';
buildingBtn.addEventListener('click', () => showOutside('Atlantis Residences', [-90, -230, 70], [-47, 53, 20], buildingBtn)); // from the sea side
viewsEl.appendChild(buildingBtn);
const poolBtn = document.createElement('button'); poolBtn.className = 'tab'; poolBtn.type = 'button'; poolBtn.textContent = 'Pool';
poolBtn.addEventListener('click', () => showOutside('Pool deck · level 7', [-47, 84, -13.5], [-47, 38, -19.5], poolBtn));      // on the deck, looking at the pool and Tower C
viewsEl.appendChild(poolBtn);
const saveImageBtn=document.createElement('button');saveImageBtn.className='tab';saveImageBtn.type='button';saveImageBtn.textContent='Save image';saveImageBtn.addEventListener('click',()=>{renderer.render(scene,mode==='walk'?walkCam:noPerspective?orthoCam:camera);renderer.domElement.toBlob(blob=>{const a=document.createElement('a'),url=URL.createObjectURL(blob);const old=document.getElementById('saved-image-link');if(old){URL.revokeObjectURL(old.href);old.remove();}a.href=url;a.download='atlantis-current-'+(noPerspective?'top':'3d')+'.png';a.id='saved-image-link';a.textContent='Download image';a.className='tab';viewsEl.appendChild(a);a.click();},'image/png');});viewsEl.appendChild(saveImageBtn);
const nyhamnLink=document.createElement('a');nyhamnLink.href='./nyhamn.html';nyhamnLink.textContent='NYHAMN 360°';nyhamnLink.className='tab';nyhamnLink.style.cssText='display:flex;align-items:center;text-decoration:none;color:inherit;';viewsEl.appendChild(nyhamnLink);const fridgeLink=nyhamnLink.cloneNode(true);fridgeLink.href='./fridge.html';fridgeLink.textContent='Fridge 360°';viewsEl.appendChild(fridgeLink);const studyLink=nyhamnLink.cloneNode(true);studyLink.href='./study.html';studyLink.textContent='Study 360°';viewsEl.appendChild(studyLink);



const noPerspBtn = document.getElementById('no-perspective');
if (noPerspBtn) {
  noPerspBtn.setAttribute('aria-pressed', String(noPerspective));
  noPerspBtn.addEventListener('click', () => {
    if (mode !== 'explore') setMode('explore');
    applyTopView();
  });
}
if (noPerspective) hintRight.textContent = 'Top view · north up';

VIEW_DEFS.forEach((v) => {
  const b = document.createElement('button');
  b.className = 'tab';
  b.type = 'button';
  b.dataset.id = v.id;
  b.textContent = v.label;
  b.setAttribute('aria-selected', 'false');
  b.addEventListener('click', () => goToView(v));
  viewsEl.appendChild(b);
});

LAYER_DEFS.forEach((l) => {
  const b = document.createElement('button');
  b.className = 'chip';
  b.type = 'button';
  b.dataset.layer = l.id;
  b.textContent = l.label;
  b.setAttribute('aria-pressed', String(layerVisibility[l.id] !== false));
  b.addEventListener('click', () => {
    layerVisibility[l.id] = !layerVisibility[l.id];
    b.setAttribute('aria-pressed', String(layerVisibility[l.id]));
    applyLayers();
  });
  layersEl.appendChild(b);
});

const flipBtn = document.createElement('button');
flipBtn.className = 'chip';
flipBtn.type = 'button';
flipBtn.textContent = 'Flip';
flipBtn.setAttribute('aria-pressed', 'true');
flipBtn.addEventListener('click', () => {
  if (!root) return;
  const unit = Math.abs(root.scale.y) || 0.001;
  const on = root.scale.x > 0;
  root.scale.x = (on ? -1 : 1) * unit;
  root.updateMatrixWorld(true);
  windowLights?.place(); // Step 4: window lights follow the flip
  weather?.apply(); // Phase 2: the sun follows the flip too
  flipBtn.setAttribute('aria-pressed', String(root.scale.x < 0));
});
layersEl.appendChild(flipBtn);

function applyLayers() {
  for (const [layerId, names] of Object.entries(layerNameSets)) {
    const vis = layerVisibility[layerId] !== false;
    for (const name of names) {
      const meshes = nameToMeshes.get(name);
      if (!meshes) continue;
      for (const m of meshes) m.visible = vis;
    }
  }
  syncWallEdges();
  syncProposalVisibility();
}

function classifyFallback(name) {
  if (!name) return null;
  if (name.startsWith('Wall_')) return 'walls';
  if (name.startsWith('Furniture_Figma_')) return 'furniture';
  if (name.startsWith('Door_') && !name.includes('Swing_Arc')) {
    if (name.includes('LeafGlass') || name.includes('FixedPane')) return 'glazing';
    return 'doors';
  }
  if (name.includes('Glass') || name.startsWith('Window_') || name.includes('FixedPane') || name.includes('LeafGlass')) {
    return 'glazing';
  }
  if (
    name.startsWith('Bed') || name.startsWith('Bath') || name.startsWith('Dining') ||
    name.startsWith('Lounge') || name.startsWith('Kitchen_') || name.startsWith('Breakfast') ||
    name.startsWith('Pendant') || name.startsWith('Balcony_Chair') || name.startsWith('Balcony_Table') ||
    name.startsWith('Study_') || name.startsWith('Yard_') || name.startsWith('Entry_') ||
    name.startsWith('Sofa') || name.startsWith('TV') || name.startsWith('Console') ||
    name.startsWith('Rug') || name.includes('Wardrobe') || name.includes('Nightstand')
  ) return 'furniture';
  if (
    name.startsWith('Exterior_') || name.startsWith('Partition_') || name.startsWith('Shell_') ||
    name.startsWith('Balcony_Deck') || name.startsWith('Balcony_Outer_Guard_Base') ||
    name.startsWith('Balcony_Outer_Guard_Cap') || name.startsWith('Balcony_Interface_') ||
    name.startsWith('AC_') || name.startsWith('GlassScreen_') && name.includes('Jamb')
  ) {
    if (name.includes('Glass')) return 'glazing';
    return 'walls';
  }
  return null;
}

function indexScene(object) {
  object.traverse((child) => {
    if (!child.isMesh) return;
    // Prefer Blender object name (extras / parent empty / node name)
    let n = child.name || '';
    // climb for meaningful parent name (gltf often nests mesh under Object_X)
    let p = child.parent;
    while (p && p !== root) {
      if (p.name && !/^Object_\d+$/.test(p.name) && !/^Mesh_\d+$/.test(p.name) && p.name !== 'Scene' && p.name !== 'RootNode') {
        n = p.name;
        break;
      }
      p = p.parent;
    }
    if (!nameToMeshes.has(n)) nameToMeshes.set(n, []);
    nameToMeshes.get(n).push(child);
    if (n.startsWith('Dim_') || n.startsWith('Dim ')) child.visible = false;
    // materials: ensure double-side for thin glass / walls viewed from inside
    const mats = Array.isArray(child.material) ? child.material : [child.material];
    for (const mat of mats) {
      if (!mat) continue;
      if (mat.transparent || (mat.opacity !== undefined && mat.opacity < 0.99) || /glass/i.test(child.name)) {
        mat.transparent = true;
        mat.depthWrite = false;
        mat.side = child.name.startsWith('Ceiling') ? THREE.FrontSide : THREE.DoubleSide;
        if (mat.opacity > 0.85 && !mat.userData.keepOpacity) mat.opacity = 0.45;
      } else {
        mat.side = child.name.startsWith('Ceiling') ? THREE.FrontSide : THREE.DoubleSide;
      }
    }
  });
}

function assignLayersFromMeta(meta) {
  if (meta?.layers) {
    for (const [id, names] of Object.entries(meta.layers)) {
      if (!layerNameSets[id]) layerNameSets[id] = new Set();
      for (const n of names) layerNameSets[id].add(n);
    }
  }
  // fallback classify any unindexed names
  for (const name of nameToMeshes.keys()) {
    let found = false;
    for (const set of Object.values(layerNameSets)) {
      if (set.has(name)) { found = true; break; }
    }
    if (!found) {
      const c = classifyFallback(name);
      if (c) layerNameSets[c].add(name);
    }
  }
  for (const name of nameToMeshes.keys()) {
    if (name.startsWith('Wall_')) {
      for (const set of Object.values(layerNameSets)) set.delete(name);
      layerNameSets.walls.add(name);
    } else if (name.startsWith('Lounge_')) {
      for (const set of Object.values(layerNameSets)) set.delete(name);
      layerNameSets.furniture.add(name);
    }
  }
}


function fileToWorld(x, y, z) {
  const flip = !root || root.scale.x < 0;
  return new THREE.Vector3(flip ? -x : x, y, z);
}

function pullBackFrom(toP, toL) {
  const back = toP.clone().sub(toL);
  back.y = 0;
  if (back.lengthSq() < 1e-6) back.set(0, 0, 1);
  back.normalize().multiplyScalar(1.35);
  const fromP = toP.clone().add(back);
  fromP.y = toP.y;
  return fromP;
}

function flyExplore(fileCam, fileLook, title) {
  if (mode !== 'explore') return;
  const fromTop = noPerspective;
  if (fromTop) leaveTopView();
  activeView = null;
  [...viewsEl.querySelectorAll('.tab')].forEach((b) => b.setAttribute('aria-selected', 'false'));
  roomNameEl.textContent = title;
  setCeilingVisible(true);
  orbit.minPolarAngle = 0.02;
  orbit.maxPolarAngle = Math.PI * 0.92;
  orbit.minDistance = 1.0;
  orbit.maxDistance = 40;
  const toP = fileToWorld(fileCam[0], fileCam[1], fileCam[2]);
  const toL = fileToWorld(fileLook[0], fileLook[1], fileLook[2]);
  const fromP = fromTop ? pullBackFrom(toP, toL) : camera.position.clone();
  const fromL = fromTop ? toL.clone() : orbit.target.clone();
  if (fromTop) {
    camera.up.set(0, 1, 0);
    camera.position.copy(fromP);
    orbit.target.copy(fromL);
  }
  nameFly = {
    t0: performance.now(),
    dur: 900,
    fromP,
    fromL,
    toP,
    toL,
  };
}

function stepNameFly() {
  if (!nameFly) return false;
  const u = Math.min(1, (performance.now() - nameFly.t0) / nameFly.dur);
  const e = u * u * (3 - 2 * u);
  const damp = orbit.enableDamping;
  orbit.enableDamping = false;
  camera.position.lerpVectors(nameFly.fromP, nameFly.toP, e);
  orbit.target.lerpVectors(nameFly.fromL, nameFly.toL, e);
  orbit.update();
  orbit.enableDamping = damp;
  if (u >= 1) {
    nameFly = null;
    const direction = orbit.target.clone().sub(camera.position);
    const check = new THREE.Raycaster(camera.position, direction.clone().normalize(), 0.01, direction.length());
    const walls = [];
    root.traverse(n => { if(n.isMesh && n.parent?.name.startsWith('Wall_Figma_')) walls.push(n); });
    host.dataset.roomFocus = JSON.stringify({room:roomNameEl.textContent,wallHits:check.intersectObjects(walls,false).length,eye:camera.position.toArray(),target:orbit.target.toArray()});
  }
  return true;
}

function addNameLabel(text, worldPos, onClick) {
  const el = document.createElement('button');
  el.type = 'button';
  el.className = 'name-label';
  el.textContent = text;
  el.addEventListener('pointerdown', (ev) => {
    ev.stopPropagation();
    ev.preventDefault();
  });
  el.addEventListener('click', (ev) => {
    ev.stopPropagation();
    ev.preventDefault();
    if(mode!=='explore'&&mode!=='walk')return;
    onClick();
  });
  const obj = new CSS2DObject(el);
  obj.position.copy(worldPos);
  obj.userData.home = worldPos.clone();
  obj.name = 'NameLabel';
  scene.add(obj);
  nameLabels.push(obj);
  return obj;
}

function meshesByPrefix(prefix) {
  const list = [];
  if (!root) return list;
  root.traverse((o) => {
    if (o.name && o.name.startsWith(prefix) && o.isMesh) list.push(o);
  });
  return list;
}


// Step 7: 3D overview fills ~90% of the frame at any window size (was a fixed 19.7 m offset).
// Same viewing direction as before; the distance is found by projecting the model's 8 bounding-box corners.
function fitOverview(box, center) {
  const dir = new THREE.Vector3(-10, 13, -11).normalize();
  // Use the real floor outline (not the bounding box, whose corners are empty space for this angled plan).
  const corners = [], floor = root.getObjectByName('Floor');
  if (floor) { floor.updateMatrixWorld(true); const p = floor.geometry.getAttribute('position');
    for (let i = 0; i < p.count; i++) { const v = floor.localToWorld(new THREE.Vector3().fromBufferAttribute(p, i)); corners.push(v.clone().setY(0), v.clone().setY(2.8)); } }
  if (!corners.length) for (const x of [box.min.x, box.max.x]) for (const y of [0, 2.8]) for (const z of [box.min.z, box.max.z]) corners.push(new THREE.Vector3(x, y, z));
  let lo = 3, hi = 80;
  for (let i = 0; i < 24; i++) {
    const d = (lo + hi) / 2;
    camera.position.copy(center).addScaledVector(dir, d); camera.lookAt(center); camera.updateMatrixWorld(true);
    const extent = Math.max(...corners.map((p) => { const q = p.clone().project(camera); return Math.max(Math.abs(q.x), Math.abs(q.y)); }));
    if (extent > 0.9) lo = d; else hi = d;
  }
  camera.position.copy(center).addScaledVector(dir, hi);
  host.dataset.overviewFit = JSON.stringify({ distance_m: +hi.toFixed(2), aspect: +camera.aspect.toFixed(2), box: [box.min.toArray(), box.max.toArray()] });
}

// Step 7: keep Top-view labels readable at any window size. After the fixed nudges below, push labels
// that still overlap apart (downwards) and pull labels cut off at the left/right edge back inside.
// Uses CSS margins, which CSS2DRenderer doesn't overwrite; margins are cleared outside the Top view.
function declutterLabels() {
  const els = nameLabels.map((o) => o.element);
  for (const e of els) { e.style.marginLeft = '0px'; e.style.marginTop = '0px'; }
  if (!noPerspective || mode !== 'explore') return;
  const hostR = host.getBoundingClientRect(), placed = [];
  const items = nameLabels.filter((o) => o.visible && o.element.offsetParent).map((o) => ({ e: o.element, r: o.element.getBoundingClientRect() })).sort((a, b) => a.r.top - b.r.top);
  for (const it of items) {
    let { left, top, width, height } = it.r, dx = 0, dy = 0;
    if (left < hostR.left + 4) dx = hostR.left + 4 - left;
    else if (left + width > hostR.right - 4) dx = hostR.right - 4 - (left + width);
    left += dx;
    for (let k = 0; k < 20; k++) {
      const hit = placed.find((p) => left < p.right + 2 && p.left < left + width + 2 && top + dy < p.bottom + 2 && p.top < top + dy + height + 2);
      if (!hit) break; dy = hit.bottom + 2 - top;
    }
    it.e.style.marginLeft = dx + 'px'; it.e.style.marginTop = dy + 'px';
    placed.push({ left, right: left + width, top: top + dy, bottom: top + dy + height });
  }
}
// Labels move into place on the next render, so measure two frames later.
const scheduleDeclutter = () => requestAnimationFrame(() => requestAnimationFrame(declutterLabels));

function spreadCrowdedLabels() {
  // Screen pixels from each label's home. +x is right, +y is down.
  // Kept inside the plan so a push cannot throw Kitchen or Tan off the sheet.
  const nudge = {
    Charcoal: [18, 12],
    'Coffee table': [-96, 6],
    Tan: [36, 42],
    Lounge: [-36, -150],
    Dining: [-120, 18],
    Kitchen: [-150, 36],
    // Step 1: moves Breakfast onto the breakfast bar so it no longer overlaps Entry.
    // Measured on screen: +x actually moves a label LEFT (the plan is mirrored), +y moves it down.
    Breakfast: [45, -30],
  };
  const w = host.clientWidth || 1;
  const h = Math.max(host.clientHeight, 1);
  const mPerPxX = (orthoCam.right - orthoCam.left) / w;
  const mPerPxZ = (orthoCam.top - orthoCam.bottom) / h;
  const box = planBounds();
  const pad = 0.45;
  for (const o of nameLabels) {
    const n = o.element.textContent;
    if (!nudge[n] || !o.userData.home) continue;
    const [sx, sy] = nudge[n];
    o.position.copy(o.userData.home);
    o.position.x += sx * mPerPxX;
    o.position.z -= sy * mPerPxZ;
    if (!box.isEmpty()) {
      o.position.x = THREE.MathUtils.clamp(o.position.x, box.min.x + pad, box.max.x - pad);
      o.position.z = THREE.MathUtils.clamp(o.position.z, box.min.z + pad, box.max.z - pad);
    }
  }
  scheduleDeclutter(); // Step 7
}

function buildWallEdges() {
  if (wallEdges || !root) return;
  const group = new THREE.Group();
  group.name = 'Wall_Edges_Top';
  const mat = new THREE.LineBasicMaterial({ color: 0x222222 });
  const names = layerNameSets.walls || new Set();
  root.updateMatrixWorld(true);
  for (const name of names) {
    const meshes = nameToMeshes.get(name) || [];
    for (const o of meshes) {
      if (!o.isMesh || !o.geometry) continue;
      const line = new THREE.LineSegments(new THREE.EdgesGeometry(o.geometry, 15), mat);
      line.applyMatrix4(o.matrixWorld);
      group.add(line);
    }
  }
  scene.add(group);
  wallEdges = group;
  syncWallEdges();
}

function buildNameLabels() {
  // File metres before the X flip. Label y is above the floor. Camera y is standing eye.
  const rooms = VIEW_DEFS.map(v=>({name:v.label,label:[v.look.x,1.2,v.look.z],cam:v.pos.toArray(),look:v.look.toArray()}));
  for (const r of rooms) {
    addNameLabel(r.name, fileToWorld(r.label[0], r.label[1], r.label[2]), () => {
      if(mode==='walk'){const view=VIEW_DEFS.find(v=>v.label===r.name);if(view)goToView(view);}else flyExplore(r.cam, r.look, r.name);
    });
  }
  for (const f of FURNITURE_LABELS) {
    const meshes = meshesByPrefix(f.prefix);
    if (!meshes.length) {
      console.warn('[atlantis] skip label, mesh missing', f.name, f.prefix);
      continue;
    }
    // Measured on click (not once here), so the camera still finds the piece after the gear menu moves it.
    addNameLabel(f.name, furnitureLabelHome(f.prefix), () => {
      const center = furnitureBox(f.prefix).getCenter(new THREE.Vector3());
      const lookY = THREE.MathUtils.clamp(center.y, 0.35, 1.2);
      flyExploreWorld(f.cam, new THREE.Vector3(center.x, lookY, center.z), f.name);
    });
    console.info('[atlantis] furniture label', f.name, meshes.map((m) => m.name));
  }
}
const FURNITURE_LABELS = [
  { name: 'Charcoal', prefix: 'Lounge_Sofa_Charcoal_', cam: [12.20, 1.55, -10.40] },
  { name: 'Tan', prefix: 'Lounge_Sofa_Tan_', cam: [11.70, 1.55, -11.60] },
  { name: 'Coffee table', prefix: 'Lounge_CoffeeTable_A_', cam: [12.10, 1.55, -9.20] },
];
function furnitureBox(prefix) { const box = new THREE.Box3(); for (const m of meshesByPrefix(prefix)) box.expandByObject(m); return box; }
// A furniture label sits over the middle of the piece, just above it.
function furnitureLabelHome(prefix) { const box = furnitureBox(prefix), c = box.getCenter(new THREE.Vector3()); return new THREE.Vector3(c.x, Math.min(box.max.y + 0.22, 1.35), c.z); }

function flyExploreWorld(fileCam, worldLook, title) {
  if (mode !== 'explore') return;
  const fromTop = noPerspective;
  if (fromTop) leaveTopView();
  activeView = null;
  [...viewsEl.querySelectorAll('.tab')].forEach((b) => b.setAttribute('aria-selected', 'false'));
  roomNameEl.textContent = title;
  setCeilingVisible(true);
  orbit.minPolarAngle = 0.02;
  orbit.maxPolarAngle = Math.PI * 0.92;
  orbit.minDistance = 1.0;
  orbit.maxDistance = 40;
  const toP = fileToWorld(fileCam[0], fileCam[1], fileCam[2]);
  const toL = worldLook.clone();
  const fromP = fromTop ? pullBackFrom(toP, toL) : camera.position.clone();
  const fromL = fromTop ? toL.clone() : orbit.target.clone();
  if (fromTop) {
    camera.up.set(0, 1, 0);
    camera.position.copy(fromP);
    orbit.target.copy(fromL);
  }
  nameFly = {
    t0: performance.now(),
    dur: 900,
    fromP,
    fromL,
    toP,
    toL,
  };
}

// One layout selector in the settings panel; each scheme restores the previous model state first.
const layout = { current: 'assisting', module: null, group: null, saved: null, queue: Promise.resolve() };
const proposal = { module: null, group: null, saved: null };
const proposalPanel = document.getElementById('lounge-proposal');
const proposalStatus = document.getElementById('proposal-status');
function syncLayoutControl() {
  const select = document.getElementById('setting-layout');
  if (select) select.value = layout.current;
  proposalPanel.hidden = layout.current !== 'proposal';
}
function syncProposalVisibility() {
  if (grok.group) { grok.group.visible = layout.current === 'grok' && layerVisibility.furniture !== false;
    if (layout.current === 'grok') for (const s of grok.saved || []) s.o.visible = false; }
  if (ikea.group) {   // IKEA proposal: same rules as Warm Nordic (Furniture layer off hides it, originals stay hidden)
    ikea.group.visible = layout.current === 'ikea' && layerVisibility.furniture !== false;
    if (layout.current === 'ikea') for (const s of ikea.saved || []) s.o.visible = false;
  }
  if (!proposal.group) return;
  proposal.group.visible = layout.current === 'proposal' && layerVisibility.furniture !== false;
  if (layout.current === 'proposal') for (const s of proposal.saved || []) s.o.visible = false;
}
// ---- Grok proposal (layout-grok.js): real IKEA MY products + own legend ----
const grok = { module: null, group: null, saved: null };
const GROK_MODULE = './layout-grok.js?v=1';
async function enterGrok() {
  grok.module ||= await import(GROK_MODULE);
  if (!grok.group) { grok.group = grok.module.buildGrokProposal(); root.add(grok.group); }
  grok.saved = grok.module.originalLoungeObjects(root).map(saveObject);
  for (const s of grok.saved) s.o.visible = false;
  grok.group.visible = layerVisibility.furniture !== false;
  grok.module.showGrokLegend(true, host.parentElement);
  root.updateMatrixWorld(true);
}
function leaveGrok() {
  if (!grok.saved) return;
  grok.group.visible = false; grok.module.showGrokLegend(false);
  for (const s of grok.saved) restoreObject(s);
  grok.saved = null; root.updateMatrixWorld(true);
}
// ---- IKEA proposal (ikea-proposal.js): real IKEA MY products, legend with sizes and RM prices ----
const ikea = { module: null, group: null, saved: null, legend: null };
const IKEA_MODULE = './ikea-proposal.js?v=2';
async function enterIkea() {
  ikea.module ||= await import(IKEA_MODULE);
  if (!ikea.group) { ikea.group = ikea.module.buildIkeaProposal(); root.add(ikea.group); }
  ikea.saved = ikea.module.ikeaReplacedObjects(root).map(saveObject);   // 1. save originals, 2. hide them
  for (const s of ikea.saved) s.o.visible = false;
  ikea.group.visible = layerVisibility.furniture !== false;
  root.updateMatrixWorld(true);
  showIkeaLegend(true);
}
function leaveIkea() {
  showIkeaLegend(false);
  if (!ikea.saved) return;
  ikea.group.visible = false;
  for (const s of ikea.saved) restoreObject(s);   // includes the dining.js table with whichever variant was showing
  ikea.saved = null;
  root.updateMatrixWorld(true);
}
// Small legend, bottom-left: each product with its size and RM price, read from ikea-products.json.
function showIkeaLegend(show) {
  if (!show) { if (ikea.legend) ikea.legend.hidden = true; return; }
  if (!ikea.legend) {
    const el = document.createElement('aside'); el.id = 'ikea-legend'; el.setAttribute('aria-label', 'IKEA products in this layout');
    el.innerHTML = '<div class="ikea-legend-head"><b>IKEA proposal</b><span>ikea.com/my · loading…</span></div>';
    host.parentElement.append(el); ikea.legend = el;
    fetch('./ikea-products.json').then((r) => r.json()).then((data) => {
      const byRole = Object.fromEntries(data.products.map((p) => [p.role, p]));
      let total = 0;
      const rows = ikea.module.IKEA_USED.filter(([role]) => byRole[role]).map(([role, qty]) => {
        const p = byRole[role], cost = p.price_rm * qty; total += cost;
        const name = p.name.split(',')[0];   // full name (with colour) is in the link's tooltip
        return '<li><a href="' + p.url + '" target="_blank" rel="noopener" title="' + p.name + ' · RM ' + p.price_rm + ' each">' + (qty > 1 ? qty + ' × ' : '') + name + '</a>'
          + '<span class="ikea-size">' + p.size_text.replace(/ cm/g, '').replace(/x/g, '×') + ' cm</span><span class="ikea-price">' + cost.toLocaleString('en-MY') + '</span></li>';
      });
      el.innerHTML = '<div class="ikea-legend-head"><b>IKEA proposal</b><span>RM, ikea.com/my</span></div><ul>' + rows.join('')
        + '<li class="ikea-total"><b>Total</b><span></span><b class="ikea-price">RM ' + total.toLocaleString('en-MY') + '</b></li></ul><p>Prices checked '
        + (data.source.match(/\d{4}-\d{2}-\d{2}/) || [''])[0] + '. Chairs and curtain rod not included. Floor and walls unchanged.</p>';
    }).catch((err) => { el.querySelector('span').textContent = 'product list unavailable'; console.warn('[atlantis] ikea-products.json', err); });
  }
  ikea.legend.hidden = false;
}
async function enterProposal() {
  proposal.module ||= await import('./lounge-proposal.js?v=1');
  if (!proposal.group) { proposal.group = proposal.module.buildLoungeProposal(); root.add(proposal.group); }
  proposal.saved = proposal.module.originalLoungeObjects(root).map(saveObject);
  for (const s of proposal.saved) s.o.visible = false;
  proposal.group.visible = layerVisibility.furniture !== false;
  root.updateMatrixWorld(true);
}
function leaveProposal() {
  if (!proposal.saved) return;
  proposal.group.visible = false;
  for (const s of proposal.saved) restoreObject(s);
  proposal.saved = null;
  root.updateMatrixWorld(true);
}

function setLayout(next) {   // queued, so quick double clicks can't interleave a save and a restore
  layout.queue = layout.queue.then(async () => {
    if (!root || next === layout.current || !['assisting', 'option2', 'proposal', 'ikea', 'grok'].includes(next)) return;
    proposalPanel.setAttribute('aria-busy', 'true');
    proposalStatus.hidden = false;
    proposalStatus.textContent = 'Switching…';
    // Resolve imports before restoring the active scheme, so a network failure leaves that scheme intact.
    if (next === 'proposal') proposal.module ||= await import('./lounge-proposal.js?v=1');
    if (next === 'option2') layout.module ||= await import('./option-two.js?v=gear-2');
    if (next === 'ikea') ikea.module ||= await import(IKEA_MODULE);
    if (next === 'grok') grok.module ||= await import(GROK_MODULE);
    if (layout.current === 'option2') leaveOptionTwo();
    if (layout.current === 'proposal') leaveProposal();
    if (layout.current === 'ikea') leaveIkea();
    if (layout.current === 'grok') leaveGrok();
    if (next === 'option2') await enterOptionTwo();
    if (next === 'proposal') await enterProposal();
    if (next === 'ikea') await enterIkea();
    if (next === 'grok') await enterGrok();
    layout.current = next;
    dining?.placeAt(next);   // 2026-10-11: one switchable table (TONSTAD by default) in every layout, at that layout's spot
    syncProposalVisibility();
    host.dataset.layout = next;
    proposalPanel.dataset.layout = next;
    syncLayoutControl();
    proposalStatus.textContent = '';
    proposalStatus.hidden = true;
    const url = new URL(location.href); if (next === 'assisting') url.searchParams.delete('layout'); else url.searchParams.set('layout', next);
    history.replaceState(null, '', url);
  }).catch((err) => {
    proposalStatus.hidden = false; syncLayoutControl();
    proposalStatus.textContent = 'Switch failed, please try again'; console.error('[atlantis] layout switch failed', err);
  }).finally(() => proposalPanel.removeAttribute('aria-busy'));
  return layout.queue;
}
// Everything needed to put an object back exactly. Euler fields are copied silently (no re-derivation) so that
// rotation AND quaternion come back bit-for-bit.
function saveObject(o) { return { o, position: o.position.clone(), quaternion: o.quaternion.clone(), rotation: o.rotation.clone(), scale: o.scale.clone(), visible: o.visible, material: o.material }; }
function restoreObject(s) {
  const o = s.o; o.position.copy(s.position); o.scale.copy(s.scale); o.visible = s.visible;
  o.quaternion.copy(s.quaternion); Object.assign(o.rotation, { _x: s.rotation._x, _y: s.rotation._y, _z: s.rotation._z, _order: s.rotation._order });
  if (s.material !== undefined) o.material = s.material;
}
async function enterOptionTwo() {
  layout.module ||= await import('./option-two.js?v=gear-2'); // loaded only when first chosen; "assisting" never runs it
  const { buildOptionTwo, OPTION_TWO_CHANGES } = layout.module;
  const targets = OPTION_TWO_CHANGES.map((c) => ({ c, o: c.find(root) }));
  for (const t of targets) if (!t.o && !t.c.optional) console.warn('[atlantis] option two: object missing for', t.c.what);
  // The table switcher's buttons (dining.js) control a table option two hides, so they step aside too.
  const dom = [...document.querySelectorAll('#table-switch')];
  // 1. Save originals before changing anything.
  layout.saved = { objects: targets.filter((t) => t.o).map((t) => saveObject(t.o)), labels: nameLabels.map((o) => ({ o, position: o.position.clone(), home: o.userData.home.clone() })),
    dom: dom.map((el) => ({ el, display: el.style.display })) };
  // 2. Change existing objects, show the new group.
  for (const t of targets) if (t.o) t.c.apply(t.o);
  for (const el of dom) el.style.display = 'none';
  if (!layout.group) { layout.group = buildOptionTwo(); root.add(layout.group); }
  layout.group.visible = true;
  if (ceilingState !== null) setCeilingVisible(ceilingState); // downlights are Ceiling_* and hide with the ceiling (Top view)
  root.updateMatrixWorld(true);
  for (const o of nameLabels) { const f = FURNITURE_LABELS.find((f) => f.name === o.element.textContent); if (f) o.userData.home.copy(furnitureLabelHome(f.prefix)); }
  if (noPerspective && mode === 'explore') spreadCrowdedLabels();
}
function leaveOptionTwo() {
  if (!layout.saved) return;
  layout.group.visible = false;
  for (const s of layout.saved.objects) restoreObject(s);
  for (const s of layout.saved.labels) { s.o.position.copy(s.position); s.o.userData.home.copy(s.home); }
  for (const s of layout.saved.dom) s.el.style.display = s.display;
  layout.saved = null;
  root.updateMatrixWorld(true);
  if (noPerspective && mode === 'explore') spreadCrowdedLabels(); // same homes -> same label spots as before
}

async function load() {
  let meta = null;
  try {
    meta = await fetch('./layers.json').then((r) => r.json());
  } catch (e) {
    console.warn('layers.json missing', e);
  }

  const loader = new GLTFLoader();
  root = await currentModel(loader);
  // Real handedness. 148 base is in millimetres; show it in metres. No second shell.
  root.scale.set(-0.001, 0.001, 0.001);
  root.updateMatrixWorld(true);
  scene.add(root);
  dining = addDining(root, new URLSearchParams(location.search).get('table')); // TONSTAD by default
  try { frames = createFrames(root); frames.load.catch((err) => console.warn('[atlantis] frames', err)); } catch (err) { console.warn('[atlantis] frames', err); frames = null; } // frames.js
  interactions = createInteractions(root); // Walk "1": TV, NYHAMN sofa bed, taps, drawers
  document.getElementById('canvas-host').dataset.geometryEvidence=JSON.stringify(root.userData.evidence);checkWalkCollision();
  root.traverse((o) => {
    const n = o.name || '';
    if(o.isMesh){o.castShadow=/^(Furniture_|Lounge_)/.test(n);o.receiveShadow=n==='Floor'||/^(Furniture_|Lounge_)/.test(n);}
    if (n.startsWith('Dim_')) o.visible = false;
    // Step 4: walls and ceiling also receive furniture shadows (they were floor/furniture only).
    if (o.isMesh && (o.parent?.name.startsWith('Wall_Figma_') || n === 'Ceiling_Estimated')) o.receiveShadow = true;
    // Phase 2: every solid part of the apartment casts shadows, so sunlight only comes in through the glass.
    if (o.isMesh && !(Array.isArray(o.material) ? o.material.some((x) => x.transparent) : o.material?.transparent)) o.castShadow = true;
  });
  // Step 4: soft daylight from every outside window, shining into the room.
  try { const layout = await fetch('./current-layout.json').then((r) => r.json()); windowLights = createWindowLights(scene, root, layout.windows); }
  catch (e) { console.warn('[atlantis] window lights skipped', e); }
  indexScene(root);
  assignLayersFromMeta(meta);
  applyLayers();
  const textured=[];root.traverse(o=>{if(o.isMesh){const materials=Array.isArray(o.material)?o.material:[o.material];for(const m of materials)if(m.map)textured.push({name:o.name,kind:m.userData.photoApproximation,uv:!!o.geometry.getAttribute('uv')});}});
  host.dataset.materialsQA=JSON.stringify({texturedMeshes:textured.length,missingUV:textured.filter(m=>!m.uv),kinds:[...new Set(textured.map(m=>m.kind))],fourPanelDoors:doorLeaves().filter(d=>d.userData.fourPanel).map(d=>({name:d.name,panels:d.children.length})),middleMousePan:orbit.mouseButtons.MIDDLE===THREE.MOUSE.PAN});

  // frame model
  const box = new THREE.Box3().setFromObject(root);
  const size = box.getSize(new THREE.Vector3());
  const center = box.getCenter(new THREE.Vector3());
  console.info('[atlantis] AABB', box.min.toArray(), box.max.toArray(), 'size', size.toArray());

  // Phase 2: a real 3D world outside (terrain, trees, grass, sea, hills, sky, clouds, rain) replaces the
  // painted panorama of Step 3 (exterior-view.js is kept but no longer used).
  outdoor = createOutdoorWorld(root);
  exteriorView = outdoor.group;
  weather = createWeather({ host, renderer, scene, sun, hemi, fill, outdoor, root, getWindowLights: () => windowLights });
  buildSidePanel(); // 2026-10-10: all settings in one right-side panel (hide with P)
  window.__atlantis = { scene, root, outdoor, weather, renderer, camera, walkCam, // debugging aid (read-only use)
    orthoCam, layout, setLayout, dining, interactions, frames, goToView, openTableMenu, viewCamera: () => (mode === 'walk' ? walkCam : noPerspective ? orthoCam : camera) }; // gear-menu proof tools
  console.info('[atlantis] meshes indexed', nameToMeshes.size, 'layers', Object.fromEntries(Object.entries(layerNameSets).map(([k, v]) => [k, v.size])));

  orbit.minPolarAngle = 0.02;
  orbit.maxPolarAngle = Math.PI * 0.92;
  orbit.minDistance = 1.0;
  orbit.maxDistance = 40;
  if (shot === 'window') {
    // Inside bed 1, looking north through the window. File (7000, 1550, -2400). Flip negates X.
    leaveTopView();
    camera.up.set(0, 1, 0);
    camera.position.set(-10.40, 1.55, -4.80);
    orbit.target.set(-10.55, 1.45, -3.30);
    orbit.enabled = true;
    setCeilingVisible(true);
    orbit.update();
  } else if (shot === 'breakfast') {
    goToView(VIEW_DEFS.find((v) => v.id === 'breakfast'));
  } else if (shot === 'bath1-exterior') {
    goToView({id:'bath1',label:'Bath 1 · Exterior window',pos:bz(7.95,1.5,2.6),look:bz(7.98,3.32,1.65)});
  } else if (shot === 'fridge-niche') {
    goToView({id:'kitchen',label:'Kitchen · Fridge',pos:bz(6.30,9.20,1.65),look:bz(8.03,11.04,1.40)});
  } else if (shot === 'kitchen' || shot === 'storage' || shot === 'study' || shot === 'bath1') {
    goToView(VIEW_DEFS.find((v) => v.id === shot));
  } else if (shot === 'dining') {
    goToView({id:'dining',label:'Dining',pos:bz(8.3,8.3,5.2),look:bz(7.75,9.15,0.4)});
  } else if (shot === 'lounge') {
    goToView(VIEW_DEFS.find((v) => v.id === 'lounge'));
  } else if (shot === 'entry') {
    goToView(VIEW_DEFS.find((v) => v.id === 'entry'));
  } else if (VIEW_DEFS.some((v) => v.id === shot)) {
    goToView(VIEW_DEFS.find((v) => v.id === shot)); // any other named view, e.g. ?view=bed2
  } else {
    // No query, or ?shot=fit. True plan, not the oblique orbit fit.
    fitModel();
  }

  buildNameLabels();
  buildWallEdges();
  if (noPerspective) spreadCrowdedLabels();
  if (startLayout !== 'assisting') await setLayout(startLayout); // before the overlay goes, so screenshots see it
  loadOverlay.hidden = true;
  hintRight.textContent += ' · walls 2800 mm estimated';
  if (presentation) presentation.arm();
  if (location.hash === '#presentation') setMode('presentation');
}

const doorMemory = new Map();
const _doorRay = new THREE.Raycaster();
const _doorNdc = new THREE.Vector2();
let _doorWalls = null;

function doorLeaves() {
  const list = [];
  if (!root) return list;
  root.traverse((o) => {
    if (o.name && o.name.startsWith('Door_') && o.name.includes('Leaf')) list.push(o);
  });
  return list;
}

function doorWallBoxes() {
  if (_doorWalls) return _doorWalls;
  _doorWalls = [];
  for (const [name, meshes] of nameToMeshes) {
    if (!name.startsWith('Wall_')) continue;
    for (const m of meshes) _doorWalls.push(new THREE.Box3().setFromObject(m));
  }
  return _doorWalls;
}

function nearestWallDist(point, boxes) {
  let best = Infinity;
  const tmp = new THREE.Vector3();
  for (const wb of boxes) {
    wb.clampPoint(point, tmp);
    best = Math.min(best, tmp.distanceTo(point));
  }
  return best;
}

function toggleDoor(leaf) {
  if(!leaf.userData.hinge)return;
  let m=doorMemory.get(leaf);
  if(!m){m={pos:leaf.position.clone(),quat:leaf.quaternion.clone(),progress:0,open:false};doorMemory.set(leaf,m);}
  m.open=!m.open;m.from=m.progress;m.to=m.open?1:0;m.started=performance.now();m.animating=true;
  host.dataset.doorState=JSON.stringify({name:leaf.name,open:m.open,animating:true,progress:m.progress});
}
function updateDoorPrompt() {
  nearbyDoor=null;doorPrompt.style.display='none';if(!root||tableMenu.open)return; // no hint under the open table menu
  // 2026-10-11 (Xip): "Click · <direct action>", plus "Right-click/E · <menu>" only on things that have a menu (the table).
  if(diningAimed){doorPrompt.textContent=dining.extendable()?'Click · '+(dining.isExtended()?'Close to 140':'Extend to 196')+' · Right-click/E · Change table':'Click / Right-click / E · Change table';doorPrompt.style.display='block';return;} // Walk + Explore fly
  if(frameAimed){doorPrompt.textContent='Click / Right-click / E · Change frame';doorPrompt.style.display='block';return;} // frames.js
  if(mode!=='walk')return;
  // 2026-10-10: a switchable thing under the crosshair (TV, sofa bed, tap, drawer) comes first.
  const thing=interactAtCentre();if(thing){doorPrompt.textContent='Click · '+interactions.labelFor(thing);doorPrompt.style.display='block';host.dataset.aimedThing=thing.id;return;}
  // Walk QA: like Counter-Strike's use key — the door under the crosshair first.
  const aimed=doorAtCentre();if(aimed){nearbyDoor=aimed;doorPrompt.textContent=doorMemory.get(aimed)?.open?'Click · Close door':'Click · Open door';doorPrompt.style.display='block';host.dataset.nearbyDoor=JSON.stringify({name:aimed.name,aimed:true});return;}
  root.updateMatrixWorld(true);const facing=new THREE.Vector3();walkCam.getWorldDirection(facing);facing.y=0;facing.normalize();let nearest=1.8;const walls=walkColliders().filter(o=>!/^Door_/.test(o.name));
  for(const leaf of doorLeaves()){
    const box=new THREE.Box3().setFromObject(leaf),point=box.clampPoint(walkCam.position,new THREE.Vector3()),distance=point.distanceTo(walkCam.position);
    const toward=point.clone().sub(walkCam.position);toward.y=0;
    const reach=point.clone().sub(walkCam.position);const blocked=reach.length()>.01&&new THREE.Raycaster(walkCam.position,reach.clone().normalize(),.01,Math.max(.01,reach.length()-.03)).intersectObjects(walls,false).length>0;
    const ahead=toward.lengthSq()<1e-6||toward.normalize().dot(facing)>Math.cos(35*Math.PI/180);
    if(!blocked&&ahead&&distance<Math.min(nearest,1.2)){nearbyDoor=leaf;nearest=distance;}   // only a door in front of you
  }
  if(nearbyDoor){doorPrompt.textContent=doorMemory.get(nearbyDoor)?.open?'Click · Close door':'Click · Open door';doorPrompt.style.display='block';}
  host.dataset.nearbyDoor=JSON.stringify({name:nearbyDoor?.name||null,distance_m:nearbyDoor?nearest:null,maxDistance_m:1.8});
}
// Compare actual animated transforms with Figma directions, including the mirrored root.
const doorDirectionChecks=new Map();
function checkDoorDirection(leaf,open){
  root.updateMatrixWorld(true);
  const width=leaf.geometry.parameters.width;
  const header=root.getObjectByName('Wall_DoorHeader_'+leaf.name.replace(/^Door_(Sliding_)?/,'').replace(/_Leaf$/,''))?.children[0];
  const result={name:leaf.name,open};
  if(leaf.userData.sourceOpenDirection){
    const expected=new THREE.Vector3(...leaf.userData.sourceClosedDirection);if(open)expected.applyAxisAngle(new THREE.Vector3(0,1,0),leaf.userData.openAngle);expected.transformDirection(root.matrixWorld);
    const actual=new THREE.Vector3(1,0,0).transformDirection(leaf.matrixWorld);
    const expectedHinge=root.localToWorld(new THREE.Vector3(leaf.userData.hinge[0],1050,leaf.userData.hinge[1]));
    result.angleError_deg=THREE.MathUtils.radToDeg(actual.angleTo(expected));result.sourcePoseAngle_deg=THREE.MathUtils.radToDeg(leaf.userData.sourcePoseAngle);result.fullOpenAngle_deg=THREE.MathUtils.radToDeg(leaf.userData.openAngle);result.sameFigmaOpeningSide=Math.sign(leaf.userData.openAngle)===Math.sign(leaf.userData.sourcePoseAngle);
    result.hingeError_mm=leaf.localToWorld(new THREE.Vector3(-width/2,0,0)).distanceTo(expectedHinge)*1000;
    result.sourceArc=leaf.userData.closedFromSourceSwing;
    result.pass=result.angleError_deg<.001&&result.hingeError_mm<.01&&result.sameFigmaOpeningSide;
  }else if(leaf.userData.bifold){
    // Figma 155:5 goes from the fixed hinge toward smaller drawing Y, on the negative side of the 155:6 opening.
    result.foldSide=leaf.userData.fixedHinge.rotation.y<0?'figma-side':'closed-or-opposite';
    result.foldAngles=[THREE.MathUtils.radToDeg(leaf.userData.fixedHinge.rotation.y),THREE.MathUtils.radToDeg(leaf.userData.centreHinge.rotation.y)];
    result.pass=open?result.foldAngles[0]<0&&result.foldAngles[1]>0:result.foldAngles.every(a=>Math.abs(a)<.001);
  }else{result.pass=true;result.motion=leaf.userData.fourPanel?'inner panels stack outward along tracks':'bidirectional arrow axis 182:5';}
  if(header){result.headerFixed=header.parent===root.getObjectByName(header.parent.name)&&header.parent.parent===root;result.pass&&=result.headerFixed;}
  doorDirectionChecks.set(leaf.name+(open?':open':':closed'),result);
  host.dataset.doorDirectionQA=JSON.stringify([...doorDirectionChecks.values()]);
}
const doorPassageChecks=new Map();
function checkDoorPassage(leaf,open){
  root.updateMatrixWorld(true);
  const header=root.getObjectByName('Wall_DoorHeader_'+leaf.name.replace(/^Door_(Sliding_)?/,'').replace(/_Leaf$/,''))?.children[0];
  if(!header)return;
  const width=leaf.geometry.parameters.width*.001,normal=new THREE.Vector3(0,0,1).transformDirection(header.matrixWorld),axis=new THREE.Vector3(1,0,0).transformDirection(header.matrixWorld),center=header.getWorldPosition(new THREE.Vector3());center.y=EYE_HEIGHT;
  const margin=Math.max(0,width/2-.25),objects=walkColliders(),panels=[];leaf.traverse(n=>{if(n.isMesh&&n.userData.collisionProxy!==false)panels.push(n);});
  const samples=[-1,-.5,0,.5,1].map(f=>{const c=center.clone().addScaledVector(axis,f*margin);return {offset_m:f*margin,clear:[-1,1].every(sign=>!walkBlocked(c.clone().addScaledVector(normal,sign*.4),normal.clone().multiplyScalar(-sign*.8),objects)),panelsClear:[-1,1].every(sign=>!walkBlocked(c.clone().addScaledVector(normal,sign*.4),normal.clone().multiplyScalar(-sign*.8),panels))};});
  doorPassageChecks.set(leaf.name+(open?':open':':closed'),{name:leaf.name,open,width_m:width,clear:samples.some(s=>s.clear),panelsClear:samples.some(s=>s.panelsClear),samples});
  host.dataset.doorPassageQA=JSON.stringify([...doorPassageChecks.values()]);
}
function stepDoors() {
  for(const [leaf,m] of doorMemory){
    if(!m.animating)continue;
    const t=Math.min(1,(performance.now()-m.started)/500),e=t*t*(3-2*t);
    m.progress=m.from+(m.to-m.from)*e;leaf.position.copy(m.pos);leaf.quaternion.copy(m.quat);
    if(leaf.userData.bifold){const angle=THREE.MathUtils.degToRad(-86)*m.progress;leaf.userData.fixedHinge.rotation.y=angle;leaf.userData.centreHinge.rotation.y=-2*angle;}
    else if(leaf.userData.fourPanel){const w=leaf.geometry.parameters.width/4;for(let i=0;i<leaf.children.length;i++){const panel=leaf.children[i];panel.position.x=panel.userData.closedX+(i===1?-w*m.progress:i===2?w*m.progress:0);panel.position.z=i===1||i===2?35:0;}}
    else if(leaf.name.includes('Sliding')){leaf.position.x+=leaf.userData.slide[0]*0.65*m.progress;leaf.position.z+=leaf.userData.slide[1]*0.65*m.progress;}
    else {const hinge=new THREE.Vector3(leaf.userData.hinge[0],m.pos.y,leaf.userData.hinge[1]),q=new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0,1,0),(leaf.userData.openAngle??Math.PI/2)*m.progress);leaf.position.sub(hinge).applyQuaternion(q).add(hinge);leaf.quaternion.premultiply(q);}
    m.animating=t<1;if(!m.animating){checkDoorDirection(leaf,m.open);checkDoorPassage(leaf,m.open);}if(!m.animating&&leaf.userData.bifold)checkBifoldPassage(leaf,m.open);host.dataset.doorState=JSON.stringify({name:leaf.name,open:m.open,animating:m.animating,progress:m.progress,foldAngles:leaf.userData.bifold?[THREE.MathUtils.radToDeg(leaf.userData.fixedHinge.rotation.y),THREE.MathUtils.radToDeg(leaf.userData.centreHinge.rotation.y)]:undefined,panelOffsets:leaf.userData.fourPanel?leaf.children.map(p=>p.position.x-p.userData.closedX):undefined});
  }
}

let doorDown = null;
renderer.domElement.addEventListener('pointerdown', (e) => {
  doorDown = { x: e.clientX, y: e.clientY };if(mode==='walk'&&walkDragFallback){dragLook={x:e.clientX,y:e.clientY};renderer.domElement.focus();}
  nameFly = null;
});
renderer.domElement.addEventListener('pointerup', (e) => {
  dragLook=null;if (mode !== 'explore' || !doorDown || !root) return;
  if (Math.hypot(e.clientX - doorDown.x, e.clientY - doorDown.y) > 6) return;
  const rect = renderer.domElement.getBoundingClientRect();
  _doorNdc.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
  _doorNdc.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
  _doorRay.setFromCamera(_doorNdc, noPerspective ? orthoCam : camera);
  const leaves = doorLeaves();
  const hits = _doorRay.intersectObjects(leaves, true);
  let picked = hits[0]?.object;
  if(!picked && noPerspective){
    let best=6;
    for(const leaf of leaves){
      const half=leaf.geometry?.parameters?.width/2;if(!half)continue;
      const project=x=>new THREE.Vector3(x,0,0).applyMatrix4(leaf.matrixWorld).project(orthoCam);
      const a=project(-half),b=project(half),ax=rect.left+(a.x+1)*rect.width/2,ay=rect.top+(1-a.y)*rect.height/2,bx=rect.left+(b.x+1)*rect.width/2,by=rect.top+(1-b.y)*rect.height/2;
      const dx=bx-ax,dy=by-ay,t=THREE.MathUtils.clamp(((e.clientX-ax)*dx+(e.clientY-ay)*dy)/(dx*dx+dy*dy),0,1),dist=Math.hypot(e.clientX-ax-t*dx,e.clientY-ay-t*dy);
      if(dist<best){best=dist;picked=leaf;}
    }
  }
  if(!picked)return;
  let leaf = picked;
  while (leaf && !(leaf.name && leaf.name.startsWith('Door_') && leaf.name.includes('Leaf'))) leaf = leaf.parent;
  if (!leaf) return;
  toggleDoor(leaf);
});

presentation = createPresentation({
  scene, renderer, camera, host,
  getRoot: () => root,
  getMode: () => mode,
  setMode,
  setCeiling: setCeilingVisible,
  getExterior: () => exteriorView,
  lights: { sun, hemi, fill },
  getLabels: () => nameLabels,
  getWallEdges: () => wallEdges,
});

// Mode bar (2026-10-20), copied from the Floor Plan 3D House viewer: PLAN = Presentation's plan sheet (held, no
// autoplay), WALK = Walk, ORBIT = whole-home 3D with drag orbit, WALK IN = the guided Presentation tour.
// The active button is re-derived from the mode every frame, so keys, the settings menu, Exit and the tour's
// hand-over to Walk all keep it in sync.
const modebar = document.getElementById('modebar');
let modebarOn = null;
function presWhenReady(fn) {
  const t0 = performance.now();
  const tick = () => {
    const api = presentation && presentation.api;
    if (mode !== 'presentation') return;
    if (api && api.ready) { fn(api); return; }
    if (performance.now() - t0 < 30000) requestAnimationFrame(tick);
  };
  tick();
}
function startOrbit() {
  orbitFree = true; orbitHold = true; // before setMode / leaveTopView, so neither asks for pointer lock
  try { if (mode !== 'explore') setMode('explore'); overviewBtn.click(); } finally { orbitHold = false; } // whole-home 3D, ceiling off, orbit target on the plan centre
  if (document.pointerLockElement === renderer.domElement) document.exitPointerLock();
  walkDragFallback = false; dragLook = null; flyVel.set(0, 0, 0);
  orbit.minDistance = 2; orbit.maxDistance = 60;
  orbit.enabled = true;
  syncWalkLock();
  roomNameEl.textContent = 'Orbit';
  hintRight.textContent = isTouch ? 'Orbit drag · pinch zoom' : 'Orbit drag · right-drag pan · scroll zoom';
}
function syncModebar() {
  if (!modebar) return;
  const autoplay = mode === 'presentation' && !!presentation?.api?.autoplay;
  const on = mode === 'presentation' ? (autoplay ? 'walkin' : 'plan') : mode === 'walk' ? 'walk' : mode === 'explore' && orbitFree && !noPerspective ? 'orbit' : '';
  if (on === modebarOn) return;
  modebarOn = on;
  modebar.querySelectorAll('button').forEach((b) => {
    const hit = b.dataset.m === on;
    b.classList.toggle('on', hit);
    b.setAttribute('aria-pressed', String(hit));
  });
}
if (modebar) {
  modebar.addEventListener('click', (e) => {
    const btn = e.target.closest('button[data-m]');
    if (!btn || !root) return;
    e.stopPropagation();
    btn.blur();
    const m = btn.dataset.m;
    if (m === 'walk') setMode('walk');
    else if (m === 'orbit') startOrbit();
    else if (m === 'plan' || m === 'walkin') {
      if (mode !== 'presentation') setMode('presentation');
      presWhenReady((api) => { api.setProgress(0); if (m === 'walkin') api.play(); });
    }
    syncModebar();
  });
  let modebarErr = false;
  (function modebarLoop() {
    try { syncModebar(); } catch (err) { if (!modebarErr) { modebarErr = true; console.error('[modebar]', err); } }
    requestAnimationFrame(modebarLoop);
  })();
}

load().catch((err) => {
  console.error(err);
  loadOverlay.textContent = 'Failed to load model: ' + (err?.message || err);
});

// —— Walk input: joystick + touch look ——
function joySet(dx, dy) {
  const max = 40;
  const len = Math.hypot(dx, dy) || 1;
  const s = Math.min(len, max) / len;
  const x = dx * s;
  const y = dy * s;
  joy.x = x / max;
  joy.y = y / max;
  stickEl.style.transform = `translate(${x}px, ${y}px)`;
}
function joyReset() {
  joy.active = false;
  joy.id = null;
  joy.x = 0;
  joy.y = 0;
  stickEl.style.transform = 'translate(0,0)';
}

joystickEl.addEventListener('pointerdown', (e) => {
  if (mode !== 'walk') return;
  joy.active = true;
  joy.id = e.pointerId;
  joystickEl.setPointerCapture(e.pointerId);
  const r = joystickEl.getBoundingClientRect();
  joySet(e.clientX - (r.left + r.width / 2), e.clientY - (r.top + r.height / 2));
  e.preventDefault();
});
joystickEl.addEventListener('pointermove', (e) => {
  if (!joy.active || e.pointerId !== joy.id) return;
  const r = joystickEl.getBoundingClientRect();
  joySet(e.clientX - (r.left + r.width / 2), e.clientY - (r.top + r.height / 2));
  e.preventDefault();
});
joystickEl.addEventListener('pointerup', joyReset);
joystickEl.addEventListener('pointercancel', joyReset);

lookZone.addEventListener('pointerdown', (e) => {
  if (mode !== 'walk' || !isTouch) return;
  // ignore if on joystick
  const jr = joystickEl.getBoundingClientRect();
  if (e.clientX >= jr.left && e.clientX <= jr.right && e.clientY >= jr.top && e.clientY <= jr.bottom) return;
  lookTouch.id = e.pointerId;
  lookTouch.lx = e.clientX;
  lookTouch.ly = e.clientY;
  lookZone.setPointerCapture(e.pointerId);
  e.preventDefault();
});
lookZone.addEventListener('pointermove', (e) => {
  if (lookTouch.id !== e.pointerId) return;
  const dx = e.clientX - lookTouch.lx;
  const dy = e.clientY - lookTouch.ly;
  lookTouch.lx = e.clientX;
  lookTouch.ly = e.clientY;
  euler.setFromQuaternion(walkCam.quaternion);
  euler.y -= dx * TOUCH_LOOK_SENS;
  euler.x -= dy * TOUCH_LOOK_SENS;
  euler.x = THREE.MathUtils.clamp(euler.x, -1.25, 1.25);
  euler.z = 0;
  walkCam.quaternion.setFromEuler(euler);
  e.preventDefault();
});
lookZone.addEventListener('pointerup', (e) => {
  if (lookTouch.id === e.pointerId) lookTouch.id = null;
});
lookZone.addEventListener('pointercancel', () => { lookTouch.id = null; });

function walkBlocked(position,delta,objects) {
  const distance=delta.length();if(distance<1e-8)return false;
  const direction=delta.clone().normalize(),side=new THREE.Vector3(-direction.z,0,direction.x);
  for(const height of [0.35,1.1,1.55])for(const offset of [-0.22,0,0.22]){
    const start=position.clone().addScaledVector(side,offset);start.y=height;
    if(new THREE.Raycaster(start,direction,0,distance+0.22).intersectObjects(objects,false).length)return true;
  }
  return false;
}
function checkBifoldPassage(leaf,open) {
  root.updateMatrixWorld(true);
  const centre=leaf.localToWorld(new THREE.Vector3(leaf.geometry.parameters.width*.15,0,0));centre.y=EYE_HEIGHT;
  const normal=new THREE.Vector3(0,0,1).transformDirection(leaf.matrixWorld);
  const all=walkColliders(),panels=[];leaf.traverse(n=>{if(n.isMesh&&n.userData.collisionProxy!==false)panels.push(n);});
  const samples=[-1,1].map(sign=>{const start=centre.clone().addScaledVector(normal,sign*.65),delta=normal.clone().multiplyScalar(-sign*1.3);return {direction:sign,panelsBlocked:walkBlocked(start,delta,panels),sceneBlocked:walkBlocked(start,delta,all)};});
  host.dataset.bifoldPassageQA=JSON.stringify({open,bodyRadius_m:.22,samples,pass:samples.every(s=>open?!s.sceneBlocked:s.panelsBlocked)});
}
function checkWalkCollision() {
  const barrier=new THREE.Mesh(new THREE.BoxGeometry(0.15,2.8,2),new THREE.MeshBasicMaterial({side:THREE.DoubleSide}));
  barrier.position.set(1,1.4,0);barrier.updateMatrixWorld(true);
  const origin=new THREE.Vector3(0,1.55,0),move=new THREE.Vector3(1.5,0,0);
  const wallBlocked=walkBlocked(origin,move,[barrier]);
  const freePath=!walkBlocked(origin,new THREE.Vector3(0,0,-1),[barrier]);
  barrier.position.z=3;barrier.updateMatrixWorld(true);
  let actualWallsChecked=0,actualWallsBlocked=0;
  const groups=root.children.filter(g=>g.name.startsWith('Wall_Figma_'));
  const missingWallHits=[];
  for(const group of groups){actualWallsChecked++;let blocked=false;
    for(const mesh of group.children.filter(m=>m.isMesh)){const p=mesh.geometry.getAttribute('position'),n=mesh.geometry.getAttribute('normal'),normalMatrix=new THREE.Matrix3().getNormalMatrix(mesh.matrixWorld);
      for(let i=0;i<n.count;i+=3){const normal=new THREE.Vector3().fromBufferAttribute(n,i).applyMatrix3(normalMatrix).normalize();if(Math.abs(normal.y)>.1)continue;
        const point=new THREE.Vector3();for(let j=0;j<3;j++)point.add(new THREE.Vector3().fromBufferAttribute(p,i+j));point.multiplyScalar(1/3).applyMatrix4(mesh.matrixWorld);
        const start=point.addScaledVector(normal,.5);if(walkBlocked(start,normal.clone().multiplyScalar(-.8),[mesh])){blocked=true;break;}
      }if(blocked)break;
    }if(blocked)actualWallsBlocked++;else missingWallHits.push(group.name);
  }

  const bathPoint=root.localToWorld(new THREE.Vector3(7984.77,1550,-3314.536));
  const bath1WindowBlocked=walkBlocked(bathPoint.clone().add(new THREE.Vector3(0,0,.6)),new THREE.Vector3(0,0,-1.2),walkColliders());
  const bath1NotDoor=!doorLeaves().some(d=>d.name.includes("135_78"));
  host.dataset.walkCollisionQA=JSON.stringify({bath1WindowBlocked,bath1NotDoor,wallBlocked,freePath,openDoorPass:!walkBlocked(origin,move,[barrier]),actualWallsChecked,actualWallsBlocked,missingWallHits,radius_m:0.22});
  barrier.geometry.dispose();barrier.material.dispose();
}
function walkColliders() {
  const objects=[];if(!root)return objects;
  root.traverse(n=>{if(n.isMesh && n.userData.collisionProxy!==false && (/^Door_/.test(n.name)||(/^Wall_Figma_|^Window_Figma_/.test(n.parent?.name||'')||/^PassThrough_/.test(n.name))))objects.push(n);});
  return objects;
}
function updateWalk(dt) {
  if(mode!=='walk'||(!isTouch&&document.pointerLockElement!==renderer.domElement&&!walkDragFallback)){walkVel.set(0,0,0);return;}
  let forward = 0, strafe = 0;
  if (keys['KeyW']) forward += 1;
  if (keys['KeyS']) forward -= 1;
  if (keys['KeyA']) strafe -= 1;
  if (keys['KeyD']) strafe += 1;
  if (joy.active) { forward += -joy.y; strafe += joy.x; }
  // Friction (like sv_friction / sv_stopspeed)
  const speed = Math.hypot(walkVel.x, walkVel.z);
  if (speed > 0) { const control = Math.max(speed, MOVE.stopSpeed), next = Math.max(speed - control * MOVE.friction * dt, 0); walkVel.multiplyScalar(next / speed); }
  // Acceleration toward the wished direction (like sv_accelerate); the view's pitch never affects movement
  if (forward || strafe) {
    walkCam.getWorldDirection(_fwd); _fwd.y = 0; _fwd.normalize();
    _right.crossVectors(_fwd, new THREE.Vector3(0, 1, 0)).normalize();
    _move.set(0, 0, 0).addScaledVector(_fwd, forward).addScaledVector(_right, strafe).normalize();
    const wishSpeed = ((keys['ShiftLeft'] || keys['ShiftRight']) ? MOVE.walkSpeed : MOVE.runSpeed) * (1 - (1 - JUMP.crouchSpeed) * walkY.crouch); // crouched = slower
    const add = wishSpeed - walkVel.dot(_move);
    if (add > 0) walkVel.addScaledVector(_move, Math.min(MOVE.accelerate * wishSpeed * dt, add));
  }
  if (walkVel.lengthSq() < 1e-6) { walkVel.set(0, 0, 0); return; }
  root.updateMatrixWorld(true); const obstacles = walkColliders();
  // Slide along walls (220 mm body clearance): a blocked axis loses its velocity, the other keeps moving.
  const dx = new THREE.Vector3(walkVel.x * dt, 0, 0), dz = new THREE.Vector3(0, 0, walkVel.z * dt);
  if (walkBlocked(walkCam.position, dx, obstacles)) walkVel.x = 0; else walkCam.position.add(dx);
  if (walkBlocked(walkCam.position, dz, obstacles)) walkVel.z = 0; else walkCam.position.add(dz);
  walkCam.position.y = EYE_HEIGHT;
}
// Walk height: Space = jump (only from the floor; hold-to-repeat off, like CS), Ctrl = crouch (smooth).
// Wall collision is unaffected: walkBlocked() always probes at fixed heights (0.35 / 1.1 / 1.55 m).
function updateWalkHeight(dt) {
  const active = mode === 'walk' && (isTouch || document.pointerLockElement === renderer.domElement || walkDragFallback);
  const crouchHeld = active && (keys['ControlLeft'] || keys['ControlRight']);
  walkY.crouch = THREE.MathUtils.clamp(walkY.crouch + (crouchHeld ? 1 : -1) * dt / JUMP.crouchTime, 0, 1);
  const space = active && !!keys['Space'];
  if (space && !walkY.jumpHeld && walkY.h <= 0) walkY.vy = JUMP.speed;   // jump
  walkY.jumpHeld = space;
  if (walkY.h > 0 || walkY.vy > 0) { walkY.vy -= JUMP.gravity * dt; walkY.h = Math.max(0, walkY.h + walkY.vy * dt); if (walkY.h === 0) walkY.vy = 0; }
  walkCam.position.y = EYE_HEIGHT - (EYE_HEIGHT - JUMP.crouchEye) * walkY.crouch + walkY.h;
}

// Explore fly = Source FullNoClipMove: wish direction from the VIEW (pitch included, so W flies where you look),
// accelerate toward it, then friction with a floor of speed/4 so you glide to a stop. No collision, no gravity.
function updateFly(dt) {
  if (!flying() || !document.body.classList.contains('walk-locked') || nameFly) { flyVel.set(0, 0, 0); return; }
  let f = 0, s = 0, u = 0;
  if (keys['KeyW']) f += 1;
  if (keys['KeyS']) f -= 1;
  if (keys['KeyD']) s += 1;
  if (keys['KeyA']) s -= 1;
  if (keys['Space']) u += 1;                        // straight up
  if (keys['KeyC']) u -= 1;                         // straight down
  const maxSpeed = FLY.speed * ((keys['ShiftLeft'] || keys['ShiftRight']) ? 0.5 : 1); // Shift = half speed (CS IN_SPEED)
  camera.getWorldDirection(_fwd);
  _right.crossVectors(_fwd, _up).normalize();
  _move.set(0, 0, 0).addScaledVector(_fwd, f).addScaledVector(_right, s);
  _move.y += u;
  if (_move.lengthSq() > 0) {                       // Accelerate (sv_specaccelerate)
    _move.normalize();
    const add = maxSpeed - flyVel.dot(_move);
    if (add > 0) flyVel.addScaledVector(_move, Math.min(FLY.accelerate * maxSpeed * dt, add));
  }
  const spd = flyVel.length();
  if (spd < 0.02) { flyVel.set(0, 0, 0); return; }  // CS: under 1 unit/s -> stop
  const control = Math.max(spd, maxSpeed / 4);       // friction, stop floor = maxspeed/4
  flyVel.multiplyScalar(Math.max(spd - control * FLY.friction * dt, 0) / spd);
  camera.position.addScaledVector(flyVel, dt);      // straight through walls
}
// Scroll wheel = fly speed (×1.25 per notch, 0.5–60 m/s). Orbit zoom is off while flying.
renderer.domElement.addEventListener('wheel', (e) => {
  if (!flying()) return;
  e.preventDefault();
  FLY.speed = THREE.MathUtils.clamp(FLY.speed * (e.deltaY < 0 ? 1.25 : 0.8), FLY.min, FLY.max);
  hintRight.textContent = flyHint();
  host.dataset.flySpeed = FLY.speed.toFixed(2);
}, { passive: false });

function updateStatus() {
  const cam = mode === 'walk' ? walkCam : camera;
  const p = cam.position;
  cam.getWorldDirection(_fwd);
  const yaw = Math.atan2(_fwd.x, _fwd.z) * 180 / Math.PI;
  const pitch = Math.asin(THREE.MathUtils.clamp(_fwd.y, -1, 1)) * 180 / Math.PI;
  const compass = ((yaw % 360) + 360) % 360;
  statusEye.textContent = `eye ${p.y.toFixed(2)} m · x ${p.x.toFixed(2)} z ${p.z.toFixed(2)}`;
  host.dataset.walkPosition=JSON.stringify({mode,room:roomNameEl.textContent,position:walkCam.position.toArray()});
  statusLook.textContent = `look ${compass.toFixed(0)}° · pitch ${pitch.toFixed(0)}°`;
  if(noPerspective && root){const rect=renderer.domElement.getBoundingClientRect();host.dataset.doorTargets=JSON.stringify(doorLeaves().map(leaf=>{const c=leaf.getWorldPosition(new THREE.Vector3()).project(orthoCam);return {name:leaf.name,x:rect.left+(c.x+1)*rect.width/2,y:rect.top+(1-c.y)*rect.height/2};}));}

}

function onResize() {
  const w = host.clientWidth;
  const h = Math.max(host.clientHeight, 1);
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
  walkCam.aspect = w / h;
  walkCam.updateProjectionMatrix();
  renderer.setSize(w, h);
  aoOrbit.setSize(w, h); aoWalk.setSize(w, h); // Step 4
  if (presentation) presentation.resize();
  if (labelRenderer) labelRenderer.setSize(w, h);
  if (noPerspective && root) {
    frameOrtho();
    spreadCrowdedLabels();
  }
}
window.addEventListener('resize', onResize);
new ResizeObserver(onResize).observe(host);

// Studio settings: one control for each choice. Legacy camera buttons remain hidden as action adapters.
function buildSidePanel() {
  const main = host.parentElement, panel = document.createElement('aside');
  panel.id = 'side-panel'; panel.setAttribute('aria-label', 'Settings');
  panel.innerHTML = '<div class="sp-head"><div><span class="sp-eyebrow">SPACE / SETTINGS</span><h2>Settings</h2></div><button type="button" class="sp-close" aria-label="Hide settings" title="Hide settings (Esc / P)">×</button></div>';
  const close = panel.querySelector('.sp-close');
  const field = (parent, id, title, options, change) => {
    const label = document.createElement('label'); label.className = 'sp-field'; label.htmlFor = id;
    const caption = document.createElement('span'); caption.textContent = title;
    const select = document.createElement('select'); select.id = id;
    for (const [value, text] of options) select.add(new Option(text, value));
    select.addEventListener('change', () => {
      settingsAction = true;
      try { change(select.value); } finally { settingsAction = false; }
    });
    label.append(caption, select); parent.append(label); return select;
  };
  const group = (title) => {
    const section = document.createElement('section'); section.className = 'sp-section';
    if (title) { const h = document.createElement('h3'); h.textContent = title; section.append(h); }
    panel.append(section); return section;
  };
  const releaseLook = () => {
    if (document.pointerLockElement === renderer.domElement) document.exitPointerLock();
    walkDragFallback = false; dragLook = null; for (const key of Object.keys(keys)) keys[key] = false; syncWalkLock();
  };
  const cameraSection = group();
  const modeSelect = field(cameraSection, 'setting-mode', 'View mode', [['explore','Explore · fly'],['walk','Walk'],['figma','Figma plan'],['presentation','Presentation']], value => {
    setMode(value); releaseLook(); sync();
  });
  const roomNames = {entry:'Entry',lounge:'Living room',breakfast:'Breakfast bar',storage:'Wardrobe',kitchen:'Kitchen',bed1:'Bedroom 1',bed2:'Bedroom 2',bath1:'Bathroom 1',bath2:'Bathroom 2',study:'Study',living_balcony:'Living balcony',service_balcony:'Service balcony'};
  const viewSelect = field(cameraSection, 'setting-view', 'Location', [['top','Top plan'],['overview','Whole home 3D'],...VIEW_DEFS.map(v => [v.id,roomNames[v.id]]),['building','Building'],['pool','Pool']], value => {
    if (mode === 'figma') setMode('explore');
    if (value === 'top') fitBtn.click();
    else if (value === 'overview') overviewBtn.click();
    else if (value === 'building') buildingBtn.click();
    else if (value === 'pool') poolBtn.click();
    else goToView(VIEW_DEFS.find(v => v.id === value));
    releaseLook(); sync();
  });
  const furnitureSection = group('Furniture');
  field(furnitureSection, 'setting-layout', 'Living room layout', [['assisting','Existing'],['option2','Option two'],['proposal','Warm Nordic · Proposal'],['ikea','IKEA proposal'],['grok','Grok proposal']], value => { releaseLook(); setLayout(value); });
  furnitureSection.append(proposalStatus, proposalPanel);
  const environmentSection = group('Light & weather');
  if (weather) environmentSection.append(weather.panel);
  const layersSection = document.createElement('details'); layersSection.className = 'sp-section sp-details';
  layersSection.innerHTML = '<summary>Display & layers<span>Walls · Furniture · Mirror</span></summary>';
  const layerGrid = document.createElement('div'); layerGrid.className = 'sp-layer-grid'; layersSection.append(layerGrid);
  const layerNames = {walls:'Walls',glazing:'Glass',furniture:'Furniture',doors:'Doors'};
  const layerSelects = LAYER_DEFS.map(l => {
    const control = field(layerGrid, 'setting-layer-' + l.id, layerNames[l.id], [['show','Show'],['hide','Hide']], value => {
      const b = layersEl.querySelector('[data-layer="' + l.id + '"]');
      if ((layerVisibility[l.id] !== false) !== (value === 'show')) b.click();
    });
    return {id:l.id, control};
  });
  const flipSelect = field(layerGrid, 'setting-flip', 'Plan direction', [['flipped','Mirrored'],['original','Original']], value => {
    if ((root.scale.x < 0) !== (value === 'flipped')) flipBtn.click();
  });
  panel.append(layersSection);
  const studySection = group('Detail models');
  const studySelect = field(studySection, 'setting-study', '360° model', [['nyhamn','NYHAMN sofa-bed'],['fridge','Fridge'],['study','Study']], () => {});
  const actions = document.createElement('div'); actions.className = 'sp-actions';
  const openStudy = document.createElement('button'); openStudy.type = 'button'; openStudy.textContent = 'Open model ↗';
  openStudy.addEventListener('click', () => { location.href = {nyhamn:nyhamnLink.href,fridge:fridgeLink.href,study:studyLink.href}[studySelect.value]; });
  saveImageBtn.textContent = 'Save image ↓'; actions.append(openStudy, saveImageBtn); studySection.append(actions);
  const hint = document.createElement('p'); hint.className = 'sp-footnote'; hint.textContent = 'Esc settings · P hide · 1–4 modes · ' + (IS_MAC ? '⌘' : 'Ctrl+') + '1–4 layouts'; panel.append(hint);
  main.append(panel);
  const toggle = document.createElement('button'); toggle.type = 'button'; toggle.id = 'panel-toggle'; toggle.textContent = '☰ Settings';
  toggle.setAttribute('aria-controls', 'side-panel'); main.append(toggle);
  const setHidden = (hidden, focus = false, remember = true) => {
    document.body.classList.toggle('panel-hidden', hidden); panel.inert = hidden;
    panel.setAttribute('aria-hidden', String(hidden)); toggle.setAttribute('aria-expanded', String(!hidden)); toggle.hidden = !hidden;
    if (focus) (hidden ? toggle : close).focus();
    if (remember) try { localStorage.setItem('atlantis-panel-hidden', hidden ? '1' : '0'); } catch (_) {}
  };
  // 2026-11-22 (Grok v2): on a phone the panel covered the whole view on first open; start it closed there.
  let hidden = innerWidth < 760; try { const saved = localStorage.getItem('atlantis-panel-hidden'); if (saved !== null) hidden = saved === '1'; } catch (_) {}
  // The URL choice is for this visit only; it does not overwrite the remembered choice.
  if (panelParam === 'hidden' || panelParam === '0') hidden = true; else if (panelParam === 'shown' || panelParam === '1') hidden = false;
  setHidden(hidden, false, !panelParam); document.body.classList.add('panel-moved');
  settingsPanel = { show: () => setHidden(false), hide: () => setHidden(true), toggle: () => setHidden(!document.body.classList.contains('panel-hidden')) };
  toggle.addEventListener('click', () => { releaseLook(); setHidden(false, true); });
  close.addEventListener('click', () => setHidden(true, true));
  window.addEventListener('keydown', e => {
    if (e.code === 'KeyP' && !e.repeat && !e.target.closest?.('input,textarea,select,[contenteditable]')) { e.preventDefault(); releaseLook(); setHidden(!document.body.classList.contains('panel-hidden'), true); }
  });
  for (const event of ['pointerdown','mousedown','wheel','keyup']) panel.addEventListener(event, e => e.stopPropagation());
  panel.addEventListener('keydown', e => {
    if (e.code === 'Escape') return;   // Esc always reaches the window handler (hide Settings)
    if (e.code !== 'KeyP' || e.target.closest('select,input,textarea')) e.stopPropagation();
  });
  panel.addEventListener('focusin', releaseLook);
  function sync() {
    modeSelect.value = mode;
    viewSelect.disabled = mode === 'figma';
    const title = roomNameEl.textContent;
    if (noPerspective) viewSelect.value = 'top';
    else if (title === '3D' || title === 'Orbit') viewSelect.value = 'overview';
    else if (title === 'Atlantis Residences') viewSelect.value = 'building';
    else if (title.startsWith('Pool')) viewSelect.value = 'pool';
    else { const v = VIEW_DEFS.find(v => v.label === title); viewSelect.value = v ? v.id : ''; }
    for (const {id, control} of layerSelects) control.value = layerVisibility[id] !== false ? 'show' : 'hide';
    flipSelect.value = root.scale.x < 0 ? 'flipped' : 'original';
    syncLayoutControl();
  }
  // Keyboard shortcuts and room-label clicks update the same selects without polling.
  const observer = new MutationObserver(sync);
  for (const el of [document.getElementById('modes'), viewsEl, layersEl]) observer.observe(el, {subtree:true,attributes:true,attributeFilter:['aria-pressed','aria-selected']});
  observer.observe(roomNameEl, {childList:true,characterData:true,subtree:true});
  sync();
}

function tick() {
  const dt = Math.min(clock.getDelta(), 0.05);
  quality.tick();
  stage.update(mode === 'explore' && !noPerspective && !outdoorFocus && !!root && camera.position.y >= 2.75);
  stepDoors();if(interactions)interactions.update(dt);if(dining)dining.update(dt);updateDiningAim();updateDoorPrompt();
  if(outdoor)outdoor.update(dt); // Phase 2: wind, waves, clouds, rain
  if (mode === 'presentation' && presentation) {
    presentation.update();
    if (mode === 'presentation') {
      walkRooms.style.display = 'none';
      if (labelRenderer) labelRenderer.domElement.style.display = 'none';
      presentation.render();
      updateStatus();
      requestAnimationFrame(tick);
      return;
    }
  }
  // weather controls now live in the side panel: always shown there (the whole panel hides with P)
  walkRooms.style.display='none'; // room list removed from Walk (use the 3D room labels or Named views)
  if(exteriorView)exteriorView.visible=mode==='walk'||(!noPerspective&&(camera.position.y<2.6||outdoorFocus));
  for(const label of nameLabels)label.visible=mode!=='walk' && !((layout.current === 'proposal' || layout.current === 'ikea' || layout.current === 'grok') && FURNITURE_LABELS.some(f => f.name === label.element.textContent));
  if(mode==='walk')updateCurrentRoom();
  if(labelRenderer)labelRenderer.domElement.style.display=(mode==='explore'&&noPerspective)||mode==='walk'?'':'none';
  if (mode === 'explore') {
    if (noPerspective) {
      renderer.render(scene, orthoCam);
      if (labelRenderer) labelRenderer.render(scene, orthoCam);
    } else if (flying()) {
      // Counter-Strike free roam. orbit.update() is NOT called every frame here (it would pull the view back to
      // the old orbit target); named views still aim the camera once with it, then you fly on from there.
      if (!stepNameFly()) { stepFreeLookEdges(dt); stepArrowLook(dt); updateFly(dt); }
      updateAim();
      const below = camera.position.y < 2.75;       // inside the storey -> ceiling on; above it -> doll-house look
      if (below !== ceilingState) setCeilingVisible(below);
      aoOrbit.composer.render();
    } else {
      if (!stepNameFly()) orbit.update();
      aoOrbit.composer.render(); // Step 4: was renderer.render(scene, camera)
      if (labelRenderer) labelRenderer.render(scene, camera);
    }
  } else {
    stepFreeLookEdges(dt); // free look: keep turning near the edges
    stepArrowLook(dt); // ← → turn, ↑ ↓ look up / down
    updateWalk(dt);
    updateWalkHeight(dt); // jump / crouch
    updateAim(); // the centre crosshair is the only pointer
    aoWalk.composer.render(); // Step 4: was renderer.render(scene, walkCam)
    if(labelRenderer&&mode==='walk')labelRenderer.render(scene,walkCam);
  }
  updateStatus();
  requestAnimationFrame(tick);
}
tick();


/* ---- Custom Figma canvas (API export, no official embed) ---- */
function initFigmaCanvas() {
  const wrap = document.getElementById('figma-frame-wrap');
  const stage = document.getElementById('figma-stage');
  const img = document.getElementById('figma-canvas-img');
  if (!wrap || !stage || !img) return;

  let scale = 1;
  let tx = 0;
  let ty = 0;
  let fitted = false;
  let dragging = false;
  let lastX = 0;
  let lastY = 0;
  const pointers = new Map();
  let pinchStartDist = 0;
  let pinchStartScale = 1;

  function apply() {
    stage.style.transform = `translate(${tx}px, ${ty}px) scale(${scale})`;
  }

  function fit() {
    const nw = img.naturalWidth || 1648;
    const nh = img.naturalHeight || 4096;
    const vw = wrap.clientWidth || 1;
    const vh = wrap.clientHeight || 1;
    const s = Math.min(vw / nw, vh / nh) * 0.96;
    scale = Math.max(0.05, s);
    tx = (vw - nw * scale) / 2;
    ty = (vh - nh * scale) / 2;
    fitted = true;
    apply();
  }

  function zoomAt(clientX, clientY, nextScale) {
    const rect = wrap.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;
    const worldX = (x - tx) / scale;
    const worldY = (y - ty) / scale;
    scale = Math.min(8, Math.max(0.05, nextScale));
    tx = x - worldX * scale;
    ty = y - worldY * scale;
    apply();
  }

  img.addEventListener('load', () => { fit(); });
  if (img.complete && img.naturalWidth) fit();

  wrap.addEventListener('wheel', (e) => {
    e.preventDefault();
    const factor = e.deltaY < 0 ? 1.12 : 1 / 1.12;
    zoomAt(e.clientX, e.clientY, scale * factor);
  }, { passive: false });

  wrap.addEventListener('pointerdown', (e) => {
    wrap.setPointerCapture(e.pointerId);
    pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (pointers.size === 1) {
      dragging = true;
      wrap.classList.add('dragging');
      lastX = e.clientX;
      lastY = e.clientY;
    } else if (pointers.size === 2) {
      dragging = false;
      const pts = [...pointers.values()];
      pinchStartDist = Math.hypot(pts[0].x - pts[1].x, pts[0].y - pts[1].y) || 1;
      pinchStartScale = scale;
    }
  });

  wrap.addEventListener('pointermove', (e) => {
    if (!pointers.has(e.pointerId)) return;
    pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (pointers.size === 2) {
      const pts = [...pointers.values()];
      const dist = Math.hypot(pts[0].x - pts[1].x, pts[0].y - pts[1].y) || 1;
      const midX = (pts[0].x + pts[1].x) / 2;
      const midY = (pts[0].y + pts[1].y) / 2;
      zoomAt(midX, midY, pinchStartScale * (dist / pinchStartDist));
      return;
    }
    if (!dragging) return;
    const dx = e.clientX - lastX;
    const dy = e.clientY - lastY;
    lastX = e.clientX;
    lastY = e.clientY;
    tx += dx;
    ty += dy;
    apply();
  });

  function endPointer(e) {
    pointers.delete(e.pointerId);
    if (pointers.size < 2) {
      pinchStartDist = 0;
    }
    if (pointers.size === 0) {
      dragging = false;
      wrap.classList.remove('dragging');
    } else if (pointers.size === 1) {
      const only = [...pointers.values()][0];
      dragging = true;
      lastX = only.x;
      lastY = only.y;
      wrap.classList.add('dragging');
    }
  }
  wrap.addEventListener('pointerup', endPointer);
  wrap.addEventListener('pointercancel', endPointer);

  // re-fit when entering Figma mode first time / on resize while in figma
  const mo = new MutationObserver(() => {
    if (document.body.classList.contains('mode-figma') && img.naturalWidth) {
      requestAnimationFrame(() => { if (!fitted) fit(); else apply(); });
    }
  });
  mo.observe(document.body, { attributes: true, attributeFilter: ['class'] });
  window.addEventListener('resize', () => {
    if (document.body.classList.contains('mode-figma') && img.naturalWidth) fit();
  });

  // expose fit for mode switch
  window.__figmaCanvasFit = fit;
}

initFigmaCanvas();
