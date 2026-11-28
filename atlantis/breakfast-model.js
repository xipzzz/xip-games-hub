import * as THREE from 'three';
import {RoundedBoxGeometry} from 'three/addons/geometries/RoundedBoxGeometry.js';
const metal=new THREE.MeshStandardMaterial({color:0x303336,roughness:.52,metalness:.5});
const white=new THREE.MeshStandardMaterial({color:0xefeee7,roughness:.65});
const tan=new THREE.MeshStandardMaterial({color:0xb5ac98,roughness:.88});
const black=new THREE.MeshStandardMaterial({color:0x222629,roughness:.4});
function box(g,w,h,d,x,y,z,mat,name,r=0){const m=new THREE.Mesh(r?new RoundedBoxGeometry(w,h,d,3,r):new THREE.BoxGeometry(w,h,d),mat);m.position.set(x,y,z);m.name=name;g.add(m);return m;}
function tube(g,a,b,r,mat,name){a=new THREE.Vector3(...a);b=new THREE.Vector3(...b);const m=new THREE.Mesh(new THREE.CylinderGeometry(r,r,a.distanceTo(b),10),mat);m.position.copy(a).add(b).multiplyScalar(.5);m.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0),b.sub(a).normalize());m.name=name;g.add(m);return m;}
export function buildPassThrough(w){
 const g=new THREE.Group(),length=Math.hypot(w.b[0]-w.a[0],w.b[1]-w.a[1]),bottom=900,top=2580,occupied=length*.48,pw=occupied/3;
 g.position.set((w.a[0]+w.b[0])/2,0,-(w.a[1]+w.b[1])/2);g.rotation.y=Math.atan2(w.b[1]-w.a[1],w.b[0]-w.a[0]);
 const frost=new THREE.MeshPhysicalMaterial({color:0xd3d9ce,roughness:.8,metalness:0,transparent:true,opacity:.91,side:THREE.DoubleSide});
 frost.userData.keepOpacity=true;
 // Photo shows three narrow frosted lights parked on the left, and an unobstructed right opening.
 for(let i=0;i<3;i++){
  const x=-length/2+pw*(i+.5),z=i*8;
  box(g,pw-24,top-bottom-65,8,x,(top+bottom)/2,z,frost,'PassThrough_Frosted_'+i);
  for(const side of [-1,1])box(g,22,top-bottom,42,x+side*(pw/2-11),(top+bottom)/2,z,metal,'PassThrough_Mullion');
 }
 for(const y of [bottom+18,top-18])box(g,occupied,36,54,-length/2+occupied/2,y,8,metal,'PassThrough_PanelRail');
 box(g,length+60,65,100,0,top+8,0,metal,'PassThrough_HeadTrack');
 box(g,length+40,32,180,0,905,0,black,'PassThrough_Sill');
 // Bell pendant over the open right half, as in the supplied photo.
 const lamp=new THREE.Group();lamp.name='Furniture_Breakfast_Pendant';lamp.position.set(length*.23,0,-270);g.add(lamp);
 tube(lamp,[0,2785,0],[0,2290,0],5,metal,'Pendant_Cord');
 box(lamp,75,30,75,0,2780,0,metal,'Pendant_CeilingRose',10);
 const profile=[[0,175],[25,175],[28,140],[40,125],[44,95],[68,66],[100,32],[130,0]].map(v=>new THREE.Vector2(...v));
 const shade=new THREE.Mesh(new THREE.LatheGeometry(profile,40),new THREE.MeshStandardMaterial({color:0x49382a,roughness:.43,metalness:.65,side:THREE.DoubleSide}));shade.position.y=2120;shade.name='Pendant_BellShade';lamp.add(shade);
 const glow=new THREE.Mesh(new THREE.CircleGeometry(120,40),new THREE.MeshBasicMaterial({color:0xffe9b7,side:THREE.DoubleSide}));glow.rotation.x=Math.PI/2;glow.position.y=2122;glow.name='Pendant_WarmInterior';lamp.add(glow);
 g.userData.photoReference='User supplied breakfast pass-through photo / Figma pictures 148:269';g.userData.openFraction=.52;return g;
}
export function breakfastFurniture(n){
 if(!['196:201','196:202','196:384','196:391','196:398'].includes(n.id))return null;
 const g=new THREE.Group(),t=n.t;g.name='Furniture_Figma_'+n.id.replace(':','_');g.position.set(t[0][0]*n.width/2+t[0][1]*n.height/2+t[0][2]-14239,0,-(t[1][0]*n.width/2+t[1][1]*n.height/2+t[1][2]-8200));g.rotation.y=Math.atan2(t[1][0],t[0][0]);
 if(n.id==='196:201'){
  box(g,n.width-40,890,Math.min(n.height-65,260),0,445,n.height/2-150,white,'Breakfast_WhiteBase');
  box(g,n.width+25,30,n.height+25,0,905,0,black,'Breakfast_BlackCounter',5);
 }else if(n.id==='196:202')box(g,n.width,30,n.height,0,905,0,black,'Breakfast_KitchenSideCounter',5);
 else if(n.id==='196:398'){
  box(g,n.width,340,n.height,0,210,0,black,'Bench_LeatherBase',18);
  for(let x=0;x<4;x++)for(let z=0;z<2;z++){
   const px=(x-1.5)*n.width/4,pz=(z-.5)*n.height/2;box(g,n.width/4-5,65,n.height/2-5,px,410,pz,black,'Bench_TuftedCushion',14);
   const button=new THREE.Mesh(new THREE.SphereGeometry(5,8,6),metal);button.position.set(px,442,pz);g.add(button);
  }
  for(const x of [-n.width/2+35,n.width/2-35])for(const z of [-n.height/2+30,n.height/2-30])tube(g,[x,0,z],[x,70,z],12,metal,'Bench_Foot');
 }else{
  // 2026-10-09: IKEA FRANKLIN bar stool with backrest, foldable, counter height, white/white (photo 148:269).
  // IKEA data: 50 W × 44 D × 95 H cm, seat 34 × 34 cm at 63 cm. Was a 45 cm dining chair.
  // Photo: both stools face ALONG the counter (backrests toward the bench), one behind the other, slightly staggered.
  g.rotation.y=-2.30;                                              // back (+Z) toward the bench, plan dir (-0.75, 0.67)
  if(n.id==='196:384')g.position.add(new THREE.Vector3(66,0,-75));  // front stool sits ~10 cm further from the counter
  const s=170,x=s+12,seatY=630,ply=new THREE.MeshStandardMaterial({color:0xd9c4a0,roughness:.7});
  box(g,2*s,14,2*s,0,seatY+8,0,white,'FoldingChair_Seat',5);          // white seat...
  box(g,2*s-6,6,2*s-6,0,seatY-2,0,ply,'FoldingChair_SeatPlyEdge');     // ...with the birch-ply edge seen in the photo
  for(const sx of [-x,x]){
   tube(g,[sx,15,-230],[sx,950,190],9,white,'FoldingChair_BackLeg');   // front foot -> top of backrest
   tube(g,[sx,15,230],[sx,seatY,-s],9,white,'FoldingChair_CrossLeg');  // back foot -> front of seat (the X)
   tube(g,[sx,seatY,-s],[sx,seatY,s],9,white,'FoldingChair_SeatFrame');
   const bolt=new THREE.Mesh(new THREE.SphereGeometry(12,10,8),metal);bolt.position.set(sx,345,-30);bolt.name='FoldingChair_Hinge';g.add(bolt);
  }
  tube(g,[-x,300,-102],[x,300,-102],9,white,'FoldingChair_Footrest');   // footrest bar at the front
  tube(g,[-x,40,230],[x,40,230],9,white,'FoldingChair_Crossbar');
  const back=box(g,2*x,90,14,0,880,173,white,'FoldingChair_Back',5);back.rotation.x=.42;   // follows the back-leg lean (top toward +Z)
 }
 g.userData.detailStatus='Photo reconstruction; vertical dimensions estimated';return g;
}
