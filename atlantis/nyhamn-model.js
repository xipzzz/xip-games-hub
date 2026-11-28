import * as THREE from 'three';
import {RoundedBoxGeometry} from 'three/addons/geometries/RoundedBoxGeometry.js';

export const NYHAMN_REFERENCE={width:2000,depth:970,height:900,seatDepth:730,seatHeight:310,unit:'mm',source:'https://www.ikea.com/se/en/p/nyhamn-3-seat-sofa-bed-with-foam-mattress-knisa-grey-beige-s39306368/'};
// Reconstructed from IKEA photographs and published overall dimensions.
// Upholstery quilting, frame profiles and hidden hardware are visual approximations.
const texCache=new Map();
function quiltDistance(u,v){let nearest=1000;for(let row=-1;row<9;row++){const wave=row*98+30*Math.sin(u*Math.PI*2/420+row*.55);nearest=Math.min(nearest,Math.abs(v-wave));}return nearest;}
function fabricTexture(width,height,quilt=true){
 const key=[width,height,quilt].join(':');if(texCache.has(key))return texCache.get(key);
 const canvas=document.createElement('canvas');canvas.width=1536;canvas.height=512;
 const ctx=canvas.getContext('2d'),pixels=ctx.createImageData(canvas.width,canvas.height),bump=ctx.createImageData(canvas.width,canvas.height);
 for(let y=0;y<canvas.height;y++)for(let x=0;x<canvas.width;x++){
  const noise=(Math.sin(x*127.1+y*311.7)*43758.5453)%1;
  const distance=quilt?quiltDistance(x/canvas.width*width,y/canvas.height*height):100;
  const stitch=Math.exp(-distance*distance/2.5),puff=1-Math.exp(-distance*distance/150);
  const weave=(x%3===0?-12:3)+(y%3===0?-8:2),tone=215+noise*12+weave-stitch*30+puff*5;
  const i=(y*canvas.width+x)*4;pixels.data[i]=pixels.data[i+1]=pixels.data[i+2]=tone;pixels.data[i+3]=255;
  bump.data[i]=bump.data[i+1]=bump.data[i+2]=110+puff*100-stitch*55+weave*.7;bump.data[i+3]=255;
 }
 ctx.putImageData(pixels,0,0);const map=new THREE.CanvasTexture(canvas);map.colorSpace=THREE.SRGBColorSpace;map.anisotropy=8;map.flipY=false;
 const bumpCanvas=document.createElement('canvas');bumpCanvas.width=canvas.width;bumpCanvas.height=canvas.height;bumpCanvas.getContext('2d').putImageData(bump,0,0);
 const bumpMap=new THREE.CanvasTexture(bumpCanvas);bumpMap.anisotropy=8;bumpMap.flipY=false;
 const result={map,bumpMap};texCache.set(key,result);return result;
}
function upholstery(width,height,color,quilt=true){const maps=fabricTexture(width,height,quilt);const m=new THREE.MeshStandardMaterial({color,roughness:.94,...maps,bumpScale:.0018});m.userData.photoApproximation='NYHAMN woven quilted cover';return m;}
function cushionGeometry(w,h,d,axis){
 const g=new THREE.BoxGeometry(w,h,d,100,axis==='z'?40:6,axis==='y'?40:6),p=g.attributes.position;
 const radius=42,inner=new THREE.Vector3(w/2-radius,h/2-radius,d/2-radius),q=new THREE.Vector3(),delta=new THREE.Vector3();
 for(let i=0;i<p.count;i++){
  q.fromBufferAttribute(p,i);const original=q.clone();delta.set(THREE.MathUtils.clamp(q.x,-inner.x,inner.x),THREE.MathUtils.clamp(q.y,-inner.y,inner.y),THREE.MathUtils.clamp(q.z,-inner.z,inner.z));q.sub(delta).normalize().multiplyScalar(radius).add(delta);
  const face=axis==='y'?original.y>h/2-.1:original.z>d/2-.1;
  if(face){const v=axis==='y'?d/2-original.z:original.y+h/2;const dist=quiltDistance(original.x+w/2,v),edge=Math.min((w/2-Math.abs(original.x))/50,axis==='y'?(d/2-Math.abs(original.z))/50:(h/2-Math.abs(original.y))/50,1);q[axis]+=Math.max(0,edge)*3.5*(1-Math.exp(-dist*dist/150));}
  p.setXYZ(i,q.x,q.y,q.z);
 }
 g.computeVertexNormals();return g;
}
function piping(parent,w,h,mapPoint,material,name){
 const r=35,shape=new THREE.Shape();shape.moveTo(-w/2+r,-h/2);shape.lineTo(w/2-r,-h/2);shape.quadraticCurveTo(w/2,-h/2,w/2,-h/2+r);shape.lineTo(w/2,h/2-r);shape.quadraticCurveTo(w/2,h/2,w/2-r,h/2);shape.lineTo(-w/2+r,h/2);shape.quadraticCurveTo(-w/2,h/2,-w/2,h/2-r);shape.lineTo(-w/2,-h/2+r);shape.quadraticCurveTo(-w/2,-h/2,-w/2+r,-h/2);
 const points=shape.getPoints(14).map(p=>mapPoint(p.x,p.y)),curve=new THREE.CatmullRomCurve3(points,true,'centripetal');const mesh=new THREE.Mesh(new THREE.TubeGeometry(curve,220,1.6,5,true),material);mesh.name=name;parent.add(mesh);
}
export function buildNyhamn({color=0x505458}={}){
 const root=new THREE.Group();root.name='Lounge_Sofa_Charcoal_NYHAMN';root.userData.reference=NYHAMN_REFERENCE;
 const cloth=upholstery(2000,730,color),backCloth=upholstery(2000,610,color),plain=upholstery(2000,600,0x282a2c,false);
 const metal=new THREE.MeshStandardMaterial({color:0x17191b,roughness:.48,metalness:.7}),rubber=new THREE.MeshStandardMaterial({color:0x101113,roughness:.95}),wood=new THREE.MeshStandardMaterial({color:0xcbb48a,roughness:.78}),thread=new THREE.MeshStandardMaterial({color:new THREE.Color(color).multiplyScalar(.72),roughness:1});
 const add=(parent,geometry,mat,pos,name)=>{const mesh=new THREE.Mesh(geometry,mat);mesh.position.set(...pos);mesh.name='Lounge_Sofa_Charcoal_'+name;mesh.castShadow=mesh.receiveShadow=true;parent.add(mesh);return mesh;};
 const bar=(w,h,d,x,y,z,mat,name)=>add(root,new RoundedBoxGeometry(w,h,d,2,Math.min(3,w/5,h/5,d/5)),mat,[x,y,z],name);
 // Four exposed square steel legs and support rails, visible from all sides.
 for(const x of [-880,880])for(const z of [-340,385]){bar(32,185,32,x,92.5,z,metal,'SteelLeg');bar(34,8,34,x,4,z,rubber,'FootCap');}
 for(const z of [-340,385])bar(1800,42,28,0,180,z,metal,'LongRail');
 for(const x of [-905,0,905])bar(28,34,745,x,180,22.5,metal,'SeatRail');
 for(let i=0;i<16;i++)bar(55,9,682,-850+i*1700/15,193,20,wood,'BentwoodSlat');
 // Continuous mattress: no arms and no separate three-seat cushion blocks.
 add(root,cushionGeometry(2000,110,730,'y'),[cloth,cloth,cloth,plain,cloth,cloth],[0,255,120],'SeatMattress');
 piping(root,1962,692,(x,z)=>new THREE.Vector3(x,297,z+120),thread,'Lounge_Sofa_Charcoal_SeatPiping');
 add(root,new RoundedBoxGeometry(1940,30,36,4,14),upholstery(2000,100,color,false),[0,302,-237],'CoverFold');
 const back=new THREE.Group();back.position.set(0,593,-350);back.rotation.x=-.27;root.add(back);
 add(back,cushionGeometry(2000,610,100,'z'),backCloth,[0,0,0],'BackMattress');
 add(back,new RoundedBoxGeometry(1900,570,8,4,3),plain,[0,0,-55],'RearDustCover');
 piping(back,1962,572,(x,y)=>new THREE.Vector3(x,y,39),thread,'Lounge_Sofa_Charcoal_BackPiping');
 for(const x of [-918,918])add(back,new THREE.BoxGeometry(22,550,18),metal,[x,0,-65],'BackSteelRail');
 add(back,new THREE.BoxGeometry(1858,24,18),metal,[0,-275,-65],'BackLowerRail');
 // Side hinge plates and visible pivot heads, approximated from assembly reference.
 for(const x of [-915,915]){
  const hinge=bar(8,95,160,x,235,-255,metal,'HingePlate');
  for(const z of [-290,-220]){const bolt=add(root,new THREE.CylinderGeometry(8,8,10,14),metal,[x+(x<0?-7:7),242,z],'PivotBolt');bolt.rotation.z=Math.PI/2;}
 }
 bar(18,102,3,0,174,473,plain,'FrontPullStrap');
 const calibrated=new THREE.Group();for(const child of [...root.children])calibrated.add(child);root.add(calibrated);root.updateMatrixWorld(true);const bounds=new THREE.Box3().setFromObject(calibrated),size=bounds.getSize(new THREE.Vector3()),centre=bounds.getCenter(new THREE.Vector3());calibrated.scale.set(2000/size.x,900/size.y,970/size.z);calibrated.position.z=-centre.z*calibrated.scale.z;root.updateMatrixWorld(true);
 root.userData.modelStatus='Photo-based reconstruction; published envelope dimensions, approximate hidden hardware';
 return root;
}
