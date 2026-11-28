// Step 4 (2026-10-04): realistic daylight.
// 1. Soft window light: one rectangular area light per outside window, shining into the room.
// 2. Soft corner shading (ambient occlusion, GTAO) for the 3D views, with 4x anti-aliasing kept.
// The flat Top plan keeps the plain renderer so it stays crisp.
import * as THREE from 'three';
import { RectAreaLightUniformsLib } from 'three/addons/lights/RectAreaLightUniformsLib.js';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { GTAOPass } from 'three/addons/postprocessing/GTAOPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { OutlinePass } from 'three/addons/postprocessing/OutlinePass.js';

// Floor outline (mm, model frame) copied from current-model.js — used to find each window's room side.
const FLOOR=[[3253,3336],[12102,3336],[12316,3786],[14181,3786],[19100,6753],[11957,14246],[11024,13303],[10271,14010],[10799,14527],[9513,13034],[8186,11912],[3253,11912]];
const inside=(x,y)=>{let c=false;for(let i=0,j=FLOOR.length-1;i<FLOOR.length;j=i++){const [xi,yi]=FLOOR[i],[xj,yj]=FLOOR[j];if((yi>y)!==(yj>y)&&x<(xj-xi)*(y-yi)/(yj-yi)+xi)c=!c;}return c;};
// Internal openings (pass-through, yard/kitchen) don't bring daylight in.
const INTERNAL=new Set(['147:12','148:304']);

export function createWindowLights(scene, root, windows){
  RectAreaLightUniformsLib.init();
  const lights=[];
  for(const w of windows){
    if(INTERNAL.has(w.id))continue;
    const [ax,ay]=w.a,[bx,by]=w.b,len=Math.hypot(bx-ax,by-ay);if(len<300)continue;
    const mx=(ax+bx)/2,my=(ay+by)/2,nx=-(by-ay)/len,ny=(bx-ax)/len,side=inside(mx+nx*600,my+ny*600)?1:-1;
    const sill=w.sill??(w.id==='147:12'?900:860),head=w.head??2140;
    const light=new THREE.RectAreaLight(0xeef4ff,2.4,len/1000,(head-sill)/1000);
    light.name='Daylight_'+w.id;
    light.userData={mid:[mx+nx*side*60,(sill+head)/2,my+ny*side*60],into:[mx+nx*side*1500,(sill+head)/2-500,my+ny*side*1500]};
    scene.add(light);lights.push(light);
  }
  const place=()=>{root.updateMatrixWorld(true);for(const l of lights){const [x,h,y]=l.userData.mid,[tx,th,ty]=l.userData.into;
    l.position.copy(root.localToWorld(new THREE.Vector3(x,h,-y)));l.lookAt(root.localToWorld(new THREE.Vector3(tx,th,-ty)));}};
  place();
  return {lights,place};
}

export function createAOComposer(renderer, scene, camera, w, h){
  const target=new THREE.WebGLRenderTarget(w,h,{type:THREE.HalfFloatType,samples:4});
  const composer=new EffectComposer(renderer,target);
  composer.setPixelRatio(renderer.getPixelRatio());composer.setSize(w,h);
  composer.addPass(new RenderPass(scene,camera));
  const ao=new GTAOPass(scene,camera,w,h);
  ao.updateGtaoMaterial({radius:0.45,distanceExponent:1.4,thickness:1.2,scale:1.15,samples:16});
  ao.updatePdMaterial({lumaPhi:10,depthPhi:2,normalPhi:3,radius:6,rings:2,samples:16});
  ao.blendIntensity=0.85;
  composer.addPass(ao);
  // Phase 2: soft glow around very bright areas (sunlit windows, sky, sun glitter on the sea).
  const bloom=new UnrealBloomPass(new THREE.Vector2(w,h),0.28,0.55,0.92);
  composer.addPass(bloom);
  // 2026-10-10: white outline around what the crosshair aims at (dining table). Costs nothing while nothing is selected.
  const outline=new OutlinePass(new THREE.Vector2(w,h),scene,camera);
  outline.edgeStrength=4;outline.edgeGlow=0;outline.edgeThickness=1.2;outline.pulsePeriod=0;
  outline.visibleEdgeColor.set(0xffffff);outline.hiddenEdgeColor.set(0x000000);   // only the visible edges, in white
  composer.addPass(outline);
  composer.addPass(new OutputPass());
  return {composer,ao,bloom,outline,setSize:(W,H)=>{composer.setPixelRatio(renderer.getPixelRatio());composer.setSize(W,H);}};
}
