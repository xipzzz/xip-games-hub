// Phase 2 (2026-10-04): a real 3D world outside the windows, replacing the painted panorama.
// Matches the photo board (Figma 166:320): from the 13th floor (~40 m) you look down on green scrub,
// tree clumps, ponds, a river and a road; toward the Study/lounge side the land turns sandy, rows of low
// houses, then a turquoise sea; toward the bedroom side the land fades into hazy low hills.
//
// Coordinates: the group is added to `root` with scale 1000, so its local units are PLAN METRES
// (x = plan x, y = height above the apartment floor, z = -plan y). It mirrors with the Flip button.
// North (top of plan) = +Z, east (right of plan) = +X. Ground is 40 m below the apartment floor.
// All outdoor materials share one "aerial perspective": distance haze that glows toward the sun.
import * as THREE from 'three';
import { Sky } from 'three/addons/objects/Sky.js';

export const GROUND_Y = -40;                       // 13th floor ≈ 40 m above ground
const C = new THREE.Vector2(11, -9);              // apartment centre (local x, z)
const SEA = new THREE.Vector2(0.25, 0.97).normalize(); // toward the sea: in front of the bedroom side (brochure: Tower C = sea view)
const PERP = new THREE.Vector2(-SEA.y, SEA.x);
const COAST = 900;                                // shoreline distance from the tower (m); the Study photo shows the sea fairly close
const FLOOR = [[3.253,3.336],[12.102,3.336],[12.316,3.786],[14.181,3.786],[19.1,6.753],[11.957,14.246],[11.024,13.303],[10.271,14.01],[10.799,14.527],[9.513,13.034],[8.186,11.912],[3.253,11.912]];

// Same coast formula in JS (placing trees/houses) and GLSL (colouring) so they always agree.
function coastDist(x, z) { const dx = x - C.x, dz = z - C.y, t = dx * PERP.x + dz * PERP.y; return dx * SEA.x + dz * SEA.y - (COAST + 260 * Math.sin(t * 0.0021) + 140 * Math.sin(t * 0.0057 + 1.3)); }
function hash(x, z) { const s = Math.sin(x * 127.1 + z * 311.7) * 43758.5453; return s - Math.floor(s); }
function vnoise(x, z) { const xi = Math.floor(x), zi = Math.floor(z), xf = x - xi, zf = z - zi, u = xf * xf * (3 - 2 * xf), v = zf * zf * (3 - 2 * zf);
  const a = hash(xi, zi), b = hash(xi + 1, zi), c = hash(xi, zi + 1), d = hash(xi + 1, zi + 1); return a + (b - a) * u + (c - a) * v + (a - b - c + d) * u * v; }
function inFloor(x, y) { let c = false; for (let i = 0, j = FLOOR.length - 1; i < FLOOR.length; j = i++) { const [xi, yi] = FLOOR[i], [xj, yj] = FLOOR[j]; if ((yi > y) !== (yj > y) && x < (xj - xi) * (y - yi) / (yj - yi) + xi) c = !c; } return c; }

const GLSL_COMMON = /* glsl */`
uniform vec3 uSunDir; uniform vec3 uHaze; uniform vec3 uSunHaze; uniform float uDensity; uniform float uTime; uniform float uWet; uniform float uGain;
float hash12(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float vnoise(vec2 p){ vec2 i=floor(p), f=fract(p), u=f*f*(3.0-2.0*f);
  return mix(mix(hash12(i),hash12(i+vec2(1,0)),u.x), mix(hash12(i+vec2(0,1)),hash12(i+vec2(1,1)),u.x), u.y); }
float fbm(vec2 p){ float s=0.0, a=0.5; for(int i=0;i<5;i++){ s+=a*vnoise(p); p*=2.03; a*=0.5; } return s; }
// Aerial perspective: exponential distance haze, denser near the ground, glowing toward the sun.
vec3 aerial(vec3 col, vec3 wp){
  vec3 v = wp - cameraPosition; float dist = length(v); vec3 dir = v / max(dist, 1e-3);
  float h = max(wp.y - ${GROUND_Y.toFixed(1)}, 0.0);
  float dens = uDensity * (0.35 + 0.65 * exp(-h / 500.0));
  float f = 1.0 - exp(-dist * dens);
  float s = pow(max(dot(dir, uSunDir), 0.0), 6.0);
  return mix(col, mix(uHaze, uSunHaze, s), f);
}
`;

const COAST_GLSL = /* glsl */`
const vec2 C = vec2(${C.x.toFixed(3)}, ${C.y.toFixed(3)}); const vec2 SEA = vec2(${SEA.x.toFixed(3)}, ${SEA.y.toFixed(3)}); const vec2 PERP = vec2(${PERP.x.toFixed(3)}, ${PERP.y.toFixed(3)});
float coastDist(vec2 p){ vec2 d=p-C; float t=dot(d,PERP); return dot(d,SEA) - (${COAST.toFixed(1)} + 260.0*sin(t*0.0021) + 140.0*sin(t*0.0057+1.3)); }
float riverZ(float x){ return -620.0 + 140.0*sin(x*0.006) + 60.0*sin(x*0.017+0.8); }
`;

// Injects world position + aerial perspective (and optional albedo code) into a built-in material.
function withAerial(material, uniforms, { albedo = '', vertex = '' } = {}) {
  material.onBeforeCompile = (shader) => {
    Object.assign(shader.uniforms, uniforms);
    shader.vertexShader = 'varying vec3 vWP; varying vec3 vLP; varying vec3 vLN;\nuniform float uTime;\n' + shader.vertexShader
      .replace('#include <begin_vertex>', '#include <begin_vertex>\n' + vertex)
      .replace('#include <project_vertex>', `#include <project_vertex>
        vec4 _wp = vec4(transformed, 1.0);
        #ifdef USE_INSTANCING
          _wp = instanceMatrix * _wp;
        #endif
        vLP = _wp.xyz; vWP = (modelMatrix * _wp).xyz; vLN = objectNormal;`);
    shader.fragmentShader = 'varying vec3 vWP; varying vec3 vLP; varying vec3 vLN;\n' + GLSL_COMMON + COAST_GLSL + shader.fragmentShader
      .replace('#include <color_fragment>', '#include <color_fragment>\n' + albedo)
      .replace('#include <tonemapping_fragment>', 'gl_FragColor.rgb = aerial(gl_FragColor.rgb * uGain, vWP);\n#include <tonemapping_fragment>');
  };
  material.customProgramCacheKey = () => 'aerial-' + albedo.length + '-' + vertex.length;
  return material;
}

export function createOutdoorWorld(root) {
  const group = new THREE.Group(); group.name = 'Outdoor_World'; group.scale.setScalar(1000);   // root is 0.001 -> plan metres
  const U = {
    uSunDir: { value: new THREE.Vector3(0, 1, 0) }, uHaze: { value: new THREE.Color(0.8, 0.86, 0.92) }, uSunHaze: { value: new THREE.Color(1, 0.95, 0.85) },
    uDensity: { value: 0.00028 }, uTime: { value: 0 }, uWet: { value: 0 }, uGain: { value: 2.6 }, uSkyGain: { value: 3.0 },   // outdoor sunlight is much brighter than indoor light
    uSunColor: { value: new THREE.Color(3, 2.9, 2.7) }, uSea: { value: new THREE.Color(0.03, 0.30, 0.33) }, uSkyRefl: { value: new THREE.Color(0.7, 0.8, 0.9) },
    uCloud: { value: 0.25 }, uCloudColor: { value: new THREE.Color(1, 1, 1) }, uRain: { value: 0 },
  };

  // ---- Terrain: flat wetland near the tower, sandy coast toward the sea, hills on the far bedroom side ----
  const SIZE = 14000, SEG = 320;
  const tg = new THREE.PlaneGeometry(SIZE, SIZE, SEG, SEG); tg.rotateX(-Math.PI / 2); tg.translate(C.x, 0, C.y);
  const p = tg.getAttribute('position');
  for (let i = 0; i < p.count; i++) {
    const x = p.getX(i), z = p.getZ(i), cd = coastDist(x, z), dx = x - C.x, dz = z - C.y;
    let h = GROUND_Y + vnoise(x * 0.004, z * 0.004) * 1.5;               // land only bumps UP, so it never sinks to the sea surface (was ±1.5 m -> flicker)
    if (cd > -40) h -= Math.min(12, (cd + 40) * 0.15);                        // slope down under the sea, clearly below it at the shore
    const away = -(dx * SEA.x + dz * SEA.y);                                   // distance toward the hills side
    if (away > 2800) { const k = Math.min(1, (away - 2800) / 2200), r = 1 - Math.abs(vnoise(x * 0.0011, z * 0.0011) * 2 - 1);
      h += k * (120 + 300 * r * r + 90 * vnoise(x * 0.004, z * 0.004)); }
    p.setY(i, h);
  }
  tg.computeVertexNormals();
  const terrainMat = withAerial(new THREE.MeshLambertMaterial({ color: 0xffffff }), U, { albedo: /* glsl */`
    vec2 q = vLP.xz; float cd = coastDist(q); float d0 = length(q - C);
    float n1 = fbm(q * 0.012), n2 = fbm(q * 0.035 + 7.1), n3 = vnoise(q * 0.2);
    vec3 grass = mix(vec3(0.090,0.200,0.030), vec3(0.200,0.300,0.060), n1);           // linear-space greens (photo: bright green scrub)
    vec3 scrub = vec3(0.040,0.110,0.022);
    vec3 col = mix(grass, scrub, smoothstep(0.52, 0.64, n2));
    // plantation rows (south-west), seen in the Bed 1 photo
    vec2 rowDir = normalize(vec2(0.6, 0.8)); float rows = smoothstep(0.55, 0.62, fbm(q*0.004+3.0)) * step(0.0, -(q.x-C.x)*0.3-(q.y-C.y));
    col = mix(col, col * (0.75 + 0.25*sin(dot(q,rowDir)*0.9)), rows);
    // grass ripples moving in the wind near the tower
    col *= 1.0 + 0.10 * sin(dot(q, vec2(0.08, 0.05)) - uTime*1.4 + n3*2.0) * (1.0 - smoothstep(150.0, 600.0, d0));
    // ponds, river and the road / embankment
    float water = step(0.80, fbm(q*0.02+11.0)) * step(cd, -300.0);
    water = max(water, (1.0 - smoothstep(9.0, 14.0, abs(q.y - riverZ(q.x)))) * step(q.x, 300.0) * step(-3200.0, q.x));
    float road = 1.0 - smoothstep(5.0, 7.0, abs(cd + 1100.0));
    // sandy reclaimed land near the coast, then wet sand
    float sand = smoothstep(-380.0, -240.0, cd) * (0.6 + 0.4*n3);   // narrow sandy strip, then the sea
    col = mix(col, vec3(0.42,0.36,0.24), sand);
    col = mix(col, vec3(0.30,0.30,0.27), road);
    col = mix(col, vec3(0.020,0.055,0.060), water);
    // far hills: bluish-green
    col = mix(col, vec3(0.040,0.075,0.050), smoothstep(5.0, 60.0, vLP.y - ${GROUND_Y.toFixed(1)}));
    col *= 1.0 - 0.25*uWet;
    diffuseColor.rgb = col;` });
  const terrain = new THREE.Mesh(tg, terrainMat); terrain.name = 'Outdoor_Terrain'; group.add(terrain);

  // ---- Sea: turquoise near the shore, deeper blue far out, sun glitter, sky reflection ----
  const seaMat = new THREE.ShaderMaterial({
    uniforms: U, transparent: false,
    vertexShader: 'varying vec3 vWP; varying vec3 vLP; void main(){ vLP=position; vec4 w=modelMatrix*vec4(position,1.0); vWP=w.xyz; gl_Position=projectionMatrix*viewMatrix*w; }',
    fragmentShader: 'varying vec3 vWP; varying vec3 vLP; uniform vec3 uSunColor; uniform vec3 uSea; uniform vec3 uSkyRefl;\n' + GLSL_COMMON + COAST_GLSL + /* glsl */`
      void main(){
        vec2 q = vLP.xz; float cd = coastDist(q);
        vec2 w = q*0.08 + vec2(uTime*0.35, uTime*0.2);
        vec3 n = normalize(vec3((vnoise(w)-0.5)*0.35, 1.0, (vnoise(w*1.7+3.0)-0.5)*0.35));
        vec3 v = normalize(vWP - cameraPosition);
        float fres = pow(1.0 - max(dot(-v, n), 0.0), 4.0);
        vec3 shallow = uSea * vec3(0.9, 1.3, 1.2), deep = uSea * vec3(0.25, 0.6, 1.1);
        vec3 col = mix(shallow, deep, smoothstep(0.0, 1800.0, cd));
        col = mix(col, uSkyRefl * 0.6, 0.05 + 0.18*fres);      // little sky reflection: the photo's sea reads clearly turquoise
        float spec = pow(max(dot(reflect(v, n), uSunDir), 0.0), 220.0);
        col += uSunColor * spec * 1.6 * (1.0 - uWet);
        gl_FragColor = vec4(aerial(col * uGain * 0.32, vWP * vec3(1.0, 1.0, 1.0)), 1.0);   // darker so tone mapping keeps it turquoise, not washed-out white
        #include <tonemapping_fragment>
        #include <colorspace_fragment>
      }`,
  });
  const seaGeo = new THREE.PlaneGeometry(SIZE, SIZE, 1, 1); seaGeo.rotateX(-Math.PI / 2); seaGeo.translate(C.x, GROUND_Y - 2.5, C.y);   // 2.5 m below the land: no z-fighting at a distance
  const sea = new THREE.Mesh(seaGeo, seaMat); sea.name = 'Outdoor_Sea'; group.add(sea);

  // ---- Trees: clumps on land, denser in the scrub, none in water ----
  const treeGeo = new THREE.IcosahedronGeometry(1, 1); treeGeo.scale(1, 0.75, 1);
  const treeMat = withAerial(new THREE.MeshLambertMaterial({ color: 0xffffff }), U);
  const TREES = 6000, trees = new THREE.InstancedMesh(treeGeo, treeMat, TREES); trees.name = 'Outdoor_Trees';
  const m = new THREE.Matrix4(), col = new THREE.Color(); let n = 0;
  for (let tries = 0; n < TREES && tries < TREES * 8; tries++) {
    const a = Math.random() * Math.PI * 2, r = 25 + Math.pow(Math.random(), 1.7) * 2600, x = C.x + Math.cos(a) * r, z = C.y + Math.sin(a) * r;
    const cd = coastDist(x, z); if (cd > -320) continue;                          // keep off the sand and the sea
    if (Math.abs(z - (-620 + 140 * Math.sin(x * 0.006) + 60 * Math.sin(x * 0.017 + 0.8))) < 18 && x < 300) continue;   // river
    if (Math.abs(cd + 1100) < 10) continue;                                       // road
    if (onSite(x, -z)) continue;                                                  // the Atlantis site (podium + ring road)
    if (vnoise(x * 0.035 + 7.1, z * 0.035) < 0.62 || Math.random() < 0.45) continue;   // clustered clumps with open grass between, like the photos
    const s = 2.0 + Math.random() * 3.5;
    m.compose(new THREE.Vector3(x, GROUND_Y + s * 0.55, z), new THREE.Quaternion().setFromEuler(new THREE.Euler(0, Math.random() * 6, 0)), new THREE.Vector3(s, s * (0.8 + Math.random() * 0.5), s));
    trees.setMatrixAt(n, m); trees.setColorAt(n, col.setRGB(0.05 + Math.random() * 0.05, 0.13 + Math.random() * 0.09, 0.025 + Math.random() * 0.03)); n++;
  }
  trees.count = n; trees.instanceMatrix.needsUpdate = true; if (trees.instanceColor) trees.instanceColor.needsUpdate = true; group.add(trees);

  // ---- Grass clumps right below the tower, swaying in the wind ----
  const blade = new THREE.BufferGeometry();
  blade.setAttribute('position', new THREE.Float32BufferAttribute([-0.08,0,0, 0.08,0,0, 0,1,0.02,  0,0,-0.08, 0,0,0.08, 0.02,1,0], 3)); blade.computeVertexNormals();
  const grassMat = withAerial(new THREE.MeshLambertMaterial({ color: 0x2f5a1c, side: THREE.DoubleSide }), U, {
    vertex: 'float _ph = (instanceMatrix[3].x*0.13 + instanceMatrix[3].z*0.11); transformed.x += sin(uTime*2.2 + _ph) * 0.18 * position.y; transformed.z += cos(uTime*1.7 + _ph) * 0.10 * position.y;' });
  const GRASS = 26000, grass = new THREE.InstancedMesh(blade, grassMat, GRASS); grass.name = 'Outdoor_Grass'; let g = 0;
  for (let i = 0; i < GRASS; i++) {
    const a = Math.random() * Math.PI * 2, r = 8 + Math.sqrt(Math.random()) * 160, x = C.x + Math.cos(a) * r, z = C.y + Math.sin(a) * r;
    if (inFloor(x, -z) || onSite(x, -z)) continue; const s = 0.5 + Math.random() * 0.9;
    m.compose(new THREE.Vector3(x, GROUND_Y, z), new THREE.Quaternion().setFromEuler(new THREE.Euler(0, Math.random() * 6, 0)), new THREE.Vector3(s * 2.2, s, s * 2.2));
    grass.setMatrixAt(g, m); grass.setColorAt(g++, col.setRGB(0.20 + Math.random() * 0.12, 0.34 + Math.random() * 0.14, 0.09 + Math.random() * 0.05));   // brighter: read as grass, not dark specks, from the Building view
  }
  grass.count = g; grass.instanceMatrix.needsUpdate = true; if (grass.instanceColor) grass.instanceColor.needsUpdate = true; group.add(grass);

  // ---- Rows of low houses on the reclaimed land (Study photo) ----
  const houseMat = withAerial(new THREE.MeshLambertMaterial({ color: 0xffffff }), U);
  const houses = new THREE.InstancedMesh(new THREE.BoxGeometry(1, 1, 1), houseMat, 420); houses.name = 'Outdoor_Houses'; let hcount = 0;
  for (let row = 0; row < 3; row++) for (let i = -70; i < 70 && hcount < 420; i++) {
    const t = i * 14, along = new THREE.Vector2(PERP.x * t, PERP.y * t), base = new THREE.Vector2(C.x, C.y).add(along);
    const shore = COAST + 260 * Math.sin(t * 0.0021) + 140 * Math.sin(t * 0.0057 + 1.3), d = shore - 300 - row * 26;
    const x = base.x + SEA.x * d, z = base.y + SEA.y * d; if (Math.abs(t) > 1300 || vnoise(t * 0.01, row) < 0.35) continue;
    m.compose(new THREE.Vector3(x, GROUND_Y + 3.5, z), new THREE.Quaternion().setFromEuler(new THREE.Euler(0, Math.atan2(PERP.x, PERP.y), 0)), new THREE.Vector3(12, 7, 9));
    houses.setMatrixAt(hcount, m); houses.setColorAt(hcount++, col.setRGB(0.55 + Math.random() * 0.15, 0.52 + Math.random() * 0.12, 0.45 + Math.random() * 0.1));
  }
  houses.count = hcount; houses.instanceMatrix.needsUpdate = true; if (houses.instanceColor) houses.instanceColor.needsUpdate = true; group.add(houses);

  // ---- The Atlantis Residences: 4 towers on a podium, pool deck in the middle, ring road (see buildAtlantis) ----
  const atlantis = buildAtlantis(U); group.add(atlantis);

  // ---- Clouds: one high layer, coverage set by the weather ----
  const cloudMat = new THREE.ShaderMaterial({
    uniforms: U, transparent: true, depthWrite: false, side: THREE.DoubleSide,
    vertexShader: 'varying vec3 vWP; varying vec3 vLP; void main(){ vLP=position; vec4 w=modelMatrix*vec4(position,1.0); vWP=w.xyz; gl_Position=projectionMatrix*viewMatrix*w; }',
    fragmentShader: 'varying vec3 vWP; varying vec3 vLP; uniform float uCloud; uniform vec3 uCloudColor;\n' + GLSL_COMMON + /* glsl */`
      void main(){
        vec2 q = vLP.xz * 0.0009 + vec2(uTime*0.004, uTime*0.0015);
        float c = fbm(q) * 0.65 + fbm(q*3.1+5.0) * 0.35;
        float a = smoothstep(1.0 - uCloud, 1.0 - uCloud + 0.28, c);
        vec3 col = uCloudColor * (0.75 + 0.35*c);
        float far = smoothstep(2500.0, 6500.0, length(vWP.xz - cameraPosition.xz));
        gl_FragColor = vec4(mix(col, uHaze, far*0.8), a * (1.0 - far*0.6));
        #include <tonemapping_fragment>
        #include <colorspace_fragment>
      }`,
  });
  const cloudGeo = new THREE.PlaneGeometry(SIZE, SIZE, 1, 1); cloudGeo.rotateX(Math.PI / 2); cloudGeo.translate(C.x, 900, C.y);
  const clouds = new THREE.Mesh(cloudGeo, cloudMat); clouds.name = 'Outdoor_Clouds'; clouds.renderOrder = 1; group.add(clouds);

  // ---- Rain: streaks around the building, never inside the apartment footprint ----
  const RAIN = 14000, rp = [], rs = [], re = [];
  for (let i = 0; i < RAIN; i++) {
    let x, z; do { x = C.x + (Math.random() - 0.5) * 140; z = C.y + (Math.random() - 0.5) * 120; } while (inFloor(x, -z) || (Math.abs(x - C.x) < 10 && Math.abs(z - C.y) < 8));
    const y = Math.random() * 70, s = Math.random();
    for (const e of [0, 1]) { rp.push(x, y, z); rs.push(s); re.push(e); }
  }
  const rainGeo = new THREE.BufferGeometry(); rainGeo.setAttribute('position', new THREE.Float32BufferAttribute(rp, 3));
  rainGeo.setAttribute('aSeed', new THREE.Float32BufferAttribute(rs, 1)); rainGeo.setAttribute('aEnd', new THREE.Float32BufferAttribute(re, 1));
  const rain = new THREE.LineSegments(rainGeo, new THREE.ShaderMaterial({
    uniforms: U, transparent: true, depthWrite: false,
    vertexShader: /* glsl */`attribute float aSeed; attribute float aEnd; uniform float uTime;
      void main(){ vec3 p = position; p.y = mod(position.y - uTime*(9.0 + aSeed*4.0), 70.0) - 42.0 + aEnd*0.75; p.x += aEnd*0.06;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0); }`,
    fragmentShader: 'uniform float uRain; void main(){ gl_FragColor = vec4(vec3(0.78,0.82,0.88), 0.32*uRain); }',
  }));
  rain.name = 'Outdoor_Rain'; rain.frustumCulled = false; group.add(rain);

  // ---- Physical sky (three.js Sky): sun position and haze come from the weather panel ----
  const sky = new Sky(); sky.scale.setScalar(8400);    // group units are metres (its x1000 cancels root's x0.001): an 8.4 km sky box
  sky.position.set(C.x, 0, C.y);
  sky.material.uniforms.uSkyGain = U.uSkyGain;            // the stock sky is dim at our exposure; photos show a near-white hazy sky
  sky.material.fragmentShader = 'uniform float uSkyGain;\n' + sky.material.fragmentShader.replace('gl_FragColor = vec4( retColor, 1.0 );', 'gl_FragColor = vec4( retColor * uSkyGain, 1.0 );');
  sky.name = 'Outdoor_Sky'; sky.renderOrder = -1; sky.material.depthWrite = false; group.add(sky);

  for (const o of [terrain, sea, trees, grass, houses, clouds, rain, sky]) { o.castShadow = false; o.receiveShadow = false; }
  atlantis.traverse((o) => { o.castShadow = false; o.receiveShadow = false; });
  root.add(group);

  return {
    group, sky, uniforms: U,
    update(dt) { U.uTime.value += dt; rain.visible = U.uRain.value > 0.01; },
  };
}

// ============================================================================================================
// The Atlantis Residences (Teladan Setia brochure, page 5 "Facilities Site Plan" + "Typical Storey Plan").
// Four L-shaped 40-storey towers (A, B, C, D) at the corners of a podium; the pool deck is level 7, the pool sits
// in the middle between the towers; a ring road runs around the site. Our unit is Tower C, level 13, the Type C
// corner unit (the developer's Type C plan matches our Figma plan: 10,031 x 8,500 mm with the 45° corner).
// Units: plan metres (x right, y down on our Figma plan). Our unit's bedroom face (y = 3.34) is Tower C's sea face.
// Sizes are estimated from the brochure drawings (no dimensions are printed); positions marked accordingly.
// ============================================================================================================
const STOREY = 40 / 12;                                          // ground -> level 13 = 40 m, ~3.33 m per storey
const LEVEL_Y = (L) => (L - 1) * STOREY + GROUND_Y;              // floor height of level L (our unit, L13 = 0)
const ARM_LONG = 42, ARM_SHORT = 32, DEPTH = 19;                 // estimated L-arm lengths and depth
const CX = 18.06, CY = 3.34;                                     // Tower C outer corner (virtual, before the 45° chamfer)
export const SITE = { x0: CX - 130, x1: CX, y0: CY, y1: CY + 100 };  // podium ~130 x 100 m (3 acres incl. road)
const SITE_PAD = 14;                                             // ring road + verge around the podium
function onSite(x, y) { return x > SITE.x0 - SITE_PAD && x < SITE.x1 + SITE_PAD && y > SITE.y0 - SITE_PAD && y < SITE.y1 + SITE_PAD; }
const mirrorX = (x) => SITE.x0 + SITE.x1 - x, mirrorY = (y) => SITE.y0 + SITE.y1 - y;
// Tower C outline (plan): long arm along the sea face, short arm along the side, 45° chamfer at the outer corner.
const TOWER_C = [[CX - ARM_LONG, CY], [14.04, CY], [CX, 7.36], [CX, CY + ARM_SHORT], [CX - DEPTH, CY + ARM_SHORT], [CX - DEPTH, CY + DEPTH], [CX - ARM_LONG, CY + DEPTH]];
// Level 13 of Tower C without our unit (our unit has its own walls and windows there).
// 2026-10-09 fix: the old straight cut (8.19,11.91)->(11.96,14.25) went 0.6 m INSIDE the entrance foyer, so the
// tower's dark glass facade showed up indoors (the "navy panels"). The cut now follows the real floor outline
// (floor corners 9.51,13.03 / 10.27,14.01 / 10.80,14.53) plus a 1.8 m lift-lobby corridor outside the entry door.
const CORRIDOR = [[8.19, 11.91], [6.77, 13.01], [9.38, 15.63], [11.96, 15.2]];   // estimated, 1.8 m wide
const TOWER_C_L13 = [[CX - ARM_LONG, CY], [3.25, CY], [3.25, 11.91], ...CORRIDOR, [11.96, 14.25], [CX, 7.84], [CX, CY + ARM_SHORT], [CX - DEPTH, CY + ARM_SHORT], [CX - DEPTH, CY + DEPTH], [CX - ARM_LONG, CY + DEPTH]];
const TOWERS = {
  C: TOWER_C,
  B: TOWER_C.map(([x, y]) => [mirrorX(x), y]),                  // sea side, other end
  D: TOWER_C.map(([x, y]) => [x, mirrorY(y)]),                  // city side, our end
  A: TOWER_C.map(([x, y]) => [mirrorX(x), mirrorY(y)]),
};
// Pool: free-form lobes in the middle of the deck (brochure: large pool + jacuzzi lobe + kids pool), estimated.
const PC = [(SITE.x0 + SITE.x1) / 2, (SITE.y0 + SITE.y1) / 2];
const POOL_LOBES = [[PC[0] - 6, PC[1], 27, 12], [PC[0] + 21, PC[1] - 4, 11, 9], [PC[0] - 31, PC[1] - 7, 6, 6]];  // cx, cy, rx, ry

function extrudePlan(pts, y0, y1) {
  const g = new THREE.ExtrudeGeometry(new THREE.Shape(pts.map(([x, y]) => new THREE.Vector2(x, y))), { depth: y1 - y0, bevelEnabled: false });
  g.rotateX(-Math.PI / 2); g.translate(0, y0, 0); return g;      // plan (x, y) -> local (x, height, -y)
}

function buildAtlantis(U) {
  const g = new THREE.Group(); g.name = 'Outdoor_Atlantis';
  const top = LEVEL_Y(41), deck = LEVEL_Y(7), sky = LEVEL_Y(24);
  // Tower facade (brochure renders): white frames + vertical fins, dark blue-grey glazing, garden band at level 24,
  // a white crown with a lit edge at the top.
  const facade = withAerial(new THREE.MeshLambertMaterial({ color: 0xffffff }), U, { albedo: /* glsl */`
    float yy = vLP.y - ${GROUND_Y.toFixed(1)}, f = fract(yy / ${STOREY.toFixed(4)});
    float u = abs(vLN.x) > 0.7 ? vLP.z : (abs(vLN.z) > 0.7 ? vLP.x : (vLP.x + vLP.z) * 0.7071);
    vec3 white = vec3(0.62, 0.62, 0.60), glass = vec3(0.035, 0.05, 0.07), green = vec3(0.05, 0.13, 0.03);
    float frame = max(step(f, 0.13), max(step(fract(u / 1.6), 0.05), step(fract(u / 7.6), 0.09)));
    vec3 col = mix(glass, white, frame);
    if (yy > ${(sky - GROUND_Y).toFixed(2)} && yy < ${(sky - GROUND_Y + STOREY).toFixed(2)}) col = mix(green, white, step(f, 0.15));   // garden in the sky (L24)
    if (yy > ${(top - GROUND_Y).toFixed(2)}) { col = white; if (yy > ${(top - GROUND_Y + 5.6).toFixed(2)}) col = vec3(0.9, 0.78, 0.5); }  // crown + lit edge
    if (vLN.y > 0.5) col = vec3(0.45, 0.45, 0.43);                                                 // roofs
    diffuseColor.rgb = col;` });
  for (const [name, pts] of Object.entries(TOWERS)) {
    const parts = name === 'C'
      ? [extrudePlan(pts, deck, -0.04), extrudePlan(TOWER_C_L13, -0.04, 2.86), extrudePlan(pts, 2.86, top + 6.2)]   // leave room for our unit at L13
      : [extrudePlan(pts, deck, top + 6.2)];
    parts.forEach((geo, i) => { const m = new THREE.Mesh(geo, facade); m.name = 'Outdoor_Tower_' + name + (parts.length > 1 ? '_' + i : ''); g.add(m); });
  }
  // Corridor lining (inside the cut above): plain light-grey walls, tiled floor, white ceiling — what you'd see
  // through the open entry door, instead of the outside facade pattern.
  const lining = new THREE.MeshStandardMaterial({ color: 0xd9dbdc, roughness: 0.9 }), ceil = new THREE.MeshStandardMaterial({ color: 0xf2f2f0, roughness: 0.95 });
  const C4 = CORRIDOR, wallT = 0.06;
  for (let k = 0; k < C4.length - 1; k++) {
    const [ax, ay] = C4[k], [bx, by] = C4[k + 1], len = Math.hypot(bx - ax, by - ay), nx = -(by - ay) / len * wallT, ny = (bx - ax) / len * wallT;
    const m = new THREE.Mesh(extrudePlan([[ax, ay], [bx, by], [bx + nx, by + ny], [ax + nx, ay + ny]], -0.04, 2.86), lining);
    m.name = 'Outdoor_Corridor_Wall'; g.add(m);
  }
  const quad = [C4[0], C4[1], C4[2], C4[3], [11.96, 14.25], [10.80, 14.53], [10.27, 14.01], [9.51, 13.03]];
  const fl = new THREE.Mesh(extrudePlan(quad, -0.06, -0.02), new THREE.MeshStandardMaterial({ color: 0xcbc5bb, roughness: 0.8 })); fl.name = 'Outdoor_Corridor_Floor'; g.add(fl);
  const ce = new THREE.Mesh(extrudePlan(quad, 2.84, 2.88), ceil); ce.name = 'Outdoor_Corridor_Ceiling'; g.add(ce);
  // Podium (ground to the level-7 deck): car-park storeys with dark openings and green walls.
  const podiumMat = withAerial(new THREE.MeshLambertMaterial({ color: 0xffffff }), U, { albedo: /* glsl */`
    float yy = vLP.y - ${GROUND_Y.toFixed(1)}, f = fract(yy / ${STOREY.toFixed(4)});
    float u = abs(vLN.x) > 0.7 ? vLP.z : vLP.x;
    vec3 col = mix(vec3(0.55, 0.55, 0.52), vec3(0.04, 0.045, 0.05), step(0.35, f) * step(f, 0.75));
    col = mix(col, vec3(0.04, 0.12, 0.03), step(fract(u / 24.0), 0.3) * step(3.5, yy));        // vertical green walls
    if (yy < 3.3) col = mix(vec3(0.6, 0.6, 0.58), vec3(0.05, 0.07, 0.08), step(0.2, f));          // lobby glass at ground
    if (vLN.y > 0.5) col = vec3(0.30, 0.27, 0.22);                                                 // deck paving
    diffuseColor.rgb = col;` });
  const podium = new THREE.Mesh(extrudePlan([[SITE.x0, SITE.y0], [SITE.x1, SITE.y0], [SITE.x1, SITE.y1], [SITE.x0, SITE.y1]], GROUND_Y, deck - 0.02), podiumMat);
  podium.name = 'Outdoor_Podium'; g.add(podium);
  // Pool: a water plane on the deck, shaped by the lobes; turquoise with moving light ripples and a darker deep end.
  const lobes = POOL_LOBES.map(([x, y, rx, ry]) => `d = min(d, length((q - vec2(${x.toFixed(2)}, ${y.toFixed(2)})) / vec2(${rx.toFixed(1)}, ${ry.toFixed(1)})) - 1.0);`).join('\n        ');
  const poolMat = new THREE.ShaderMaterial({
    uniforms: U,
    vertexShader: 'varying vec3 vWP; varying vec3 vLP; void main(){ vLP=position; vec4 w=modelMatrix*vec4(position,1.0); vWP=w.xyz; gl_Position=projectionMatrix*viewMatrix*w; }',
    fragmentShader: 'varying vec3 vWP; varying vec3 vLP; uniform vec3 uSunColor; uniform vec3 uSkyRefl;\n' + GLSL_COMMON + /* glsl */`
      void main(){
        vec2 q = vec2(vLP.x, -vLP.z); float d = 1e3;
        ${lobes}
        if (d > 0.0) discard;
        float edge = smoothstep(-0.12, 0.0, d);                                   // white coping at the rim
        vec2 w = q * 0.6 + vec2(uTime * 0.6, uTime * 0.4);
        float ripple = vnoise(w) * 0.5 + vnoise(w * 2.3 + 4.0) * 0.5;
        vec3 water = mix(vec3(0.02, 0.32, 0.42), vec3(0.01, 0.14, 0.26), smoothstep(-0.2, -0.8, d));
        water += vec3(0.25, 0.35, 0.35) * pow(ripple, 6.0) * 1.5;                // caustic glints
        vec3 v = normalize(vWP - cameraPosition); float fres = pow(1.0 - abs(v.y), 5.0);
        vec3 col = mix(water, uSkyRefl * 0.5, fres * 0.5);
        col = mix(col, vec3(0.75, 0.75, 0.72), edge);
        gl_FragColor = vec4(aerial(col * uGain * 0.6, vWP), 1.0);
        #include <tonemapping_fragment>
        #include <colorspace_fragment>
      }`,
  });
  const poolGeo = new THREE.PlaneGeometry(90, 40); poolGeo.rotateX(-Math.PI / 2); poolGeo.translate(PC[0], deck + 0.03, -PC[1]);
  const pool = new THREE.Mesh(poolGeo, poolMat); pool.name = 'Outdoor_Pool'; g.add(pool);
  // Ring road around the site + the main street on the city side (Jalan KSB 11A), with lane markings.
  const roadMat = withAerial(new THREE.MeshLambertMaterial({ color: 0xffffff }), U, { albedo: /* glsl */`
    float u = abs(vLN.y) > 0.5 ? 0.0 : 0.0;
    vec2 q = vec2(vLP.x, -vLP.z);
    float dash = step(0.5, fract((q.x + q.y) / 6.0));
    float cx = abs(q.y - ${(SITE.y1 + SITE_PAD + 14).toFixed(2)});
    float lane = step(cx, 0.12) * dash;                                          // centre dashes on the main street
    diffuseColor.rgb = mix(vec3(0.07, 0.07, 0.075), vec3(0.75, 0.75, 0.7), lane);` });
  const ring = [];
  const P = SITE_PAD, R = 8;                                                    // 8 m wide ring road, just outside the podium
  for (const [x0, y0, x1, y1] of [[SITE.x0 - P, SITE.y0 - P, SITE.x1 + P, SITE.y0 - P + R], [SITE.x0 - P, SITE.y1 + P - R, SITE.x1 + P, SITE.y1 + P],
    [SITE.x0 - P, SITE.y0 - P, SITE.x0 - P + R, SITE.y1 + P], [SITE.x1 + P - R, SITE.y0 - P, SITE.x1 + P, SITE.y1 + P],
    [SITE.x0 - 600, SITE.y1 + P + 8, SITE.x1 + 600, SITE.y1 + P + 20]]) {
    ring.push(extrudePlan([[x0, y0], [x1, y0], [x1, y1], [x0, y1]], GROUND_Y + 0.05, GROUND_Y + 0.12));
  }
  ring.forEach((geo, i) => { const m = new THREE.Mesh(geo, roadMat); m.name = 'Outdoor_Road_' + i; g.add(m); });
  g.userData = { source: 'Teladan Setia brochure p5 (site plan) + Type C plan; sizes estimated', towers: Object.keys(TOWERS), poolLevel: 7, ourUnit: 'Tower C L13 Type C' };
  return g;
}
