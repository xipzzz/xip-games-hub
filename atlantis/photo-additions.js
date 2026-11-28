// Step 2 (2026-10-04): items Xip's photo board (Figma 166:320) shows but the model was missing,
// plus recognisable versions of plain Figma boxes (balcony table/chairs, washing machine, Bath 1 vanity).
// Units: millimetres in the model frame. Plan point (x m, y m) -> model (x*1000, height, -y*1000).
// Everything without a Figma footprint is marked userData.status = 'estimated from photo'.
import * as THREE from 'three';
import {RoundedBoxGeometry} from 'three/addons/geometries/RoundedBoxGeometry.js';
import {finish} from './surface-materials.js?v=step5-2';

const mat=(color,roughness=.6,metalness=0,extra={})=>new THREE.MeshStandardMaterial({color,roughness,metalness,...extra});
const ceramic=mat(0xf6f6f3,.18), chrome=mat(0xc9cdd0,.18,.95), black=mat(0x24262a,.55,.2);
const glass=new THREE.MeshPhysicalMaterial({color:0xdfeff2,roughness:.05,transmission:.0,transparent:true,opacity:.22,depthWrite:false,side:THREE.DoubleSide});
const mirror=mat(0xdfe6ea,.03,1);
const slatWood=finish(mat(0xb08a5e,.7),'wood',2);
const curtainFabric=finish(mat(0xb5aab8,.95,0,{side:THREE.DoubleSide,transparent:true,opacity:.9}),'linen',3);
const cushionFabric=finish(mat(0x2d3242,.95),'fabric',6);

const P=(x,y)=>new THREE.Vector3(x*1000,0,-y*1000);           // plan metres -> model mm
const facing=(dx,dy)=>Math.atan2(dx,-dy);                      // rotation.y so local +Z faces plan direction (dx,dy)

function part(g,geo,m,x,y,z,name){const o=new THREE.Mesh(geo,m);o.position.set(x,y,z);o.name='Furniture_Photo_'+name;o.castShadow=o.receiveShadow=true;g.add(o);return o;}
const rbox=(w,h,d,r)=>new RoundedBoxGeometry(w,h,d,3,Math.min(r,w/2-1,h/2-1,d/2-1));

// ---------- new fixtures (front faces local +Z) ----------
function toilet(){
  const g=new THREE.Group();
  part(g,rbox(360,380,180,40),ceramic,0,600,-235,'Toilet_Tank');
  part(g,rbox(390,40,200,18),ceramic,0,800,-235,'Toilet_TankLid');
  const bowl=part(g,new THREE.CylinderGeometry(185,150,390,40),ceramic,0,195,50,'Toilet_Bowl');bowl.scale.set(1,1,1.35);
  const seat=part(g,new THREE.CylinderGeometry(190,190,28,40),ceramic,0,405,60,'Toilet_Seat');seat.scale.set(1,1,1.38);
  part(g,new THREE.CylinderGeometry(18,18,12,16),chrome,120,826,-235,'Toilet_Flush');
  return g;
}
function wallBasin(){
  const g=new THREE.Group();
  part(g,rbox(500,150,420,45),ceramic,0,780,0,'Basin_Bowl');
  part(g,new THREE.CylinderGeometry(14,14,150,16),chrome,0,920,-150,'Basin_TapBody');
  part(g,rbox(28,22,120,8),chrome,0,985,-100,'Basin_TapSpout');
  part(g,new THREE.CylinderGeometry(30,30,330,16),chrome,0,540,-150,'Basin_Trap');
  return g;
}
function curtainPanel(width,height,folds){
  const geo=new THREE.PlaneGeometry(width,height,Math.max(8,folds*10),12),p=geo.getAttribute('position');
  for(let i=0;i<p.count;i++){const u=(p.getX(i)+width/2)/width,v=(p.getY(i)+height/2)/height;p.setZ(i,Math.sin(u*folds*Math.PI*2)*(34+10*v));}
  geo.computeVertexNormals();return geo;
}

// Curtains: two gathered side panels + rod, 150 mm inside the window line (room side = normal).
function curtains(root,a,b,normal,id,color){
  const ax=a[0],ay=a[1],bx=b[0],by=b[1],len=Math.hypot(bx-ax,by-ay)*1000,ux=(bx-ax)/len*1000,uy=(by-ay)/len*1000;
  const g=new THREE.Group();g.name='Furniture_Photo_Curtains_'+id;g.userData.status='estimated from photo';
  const off=0.15,mid=P((ax+bx)/2+normal[0]*off,(ay+by)/2+normal[1]*off);g.position.copy(mid);g.rotation.y=Math.atan2(uy,ux);
  const top=2560,h=2520,panel=Math.max(420,len*.26);
  part(g,new THREE.CylinderGeometry(12,12,len+300,12),black,0,top+20,0,'CurtainRod').rotation.z=Math.PI/2;
  const fabric=color?curtainFabric.clone():curtainFabric;if(color)fabric.color.setHex(color);
  for(const s of [-1,1]){const c=part(g,curtainPanel(panel,h,Math.round(panel/120)),fabric,s*(len/2+150-panel/2),top-h/2,0,'CurtainPanel');c.castShadow=false;}
  root.add(g);
}

// ---------- upgrades of existing Figma rectangles ----------
function place(n){const g=new THREE.Group(),t=n.t;g.name='Furniture_Figma_'+n.id.replace(':','_');g.position.set(t[0][0]*n.width/2+t[0][1]*n.height/2+t[0][2]-14239,0,-(t[1][0]*n.width/2+t[1][1]*n.height/2+t[1][2]-8200));g.rotation.y=Math.atan2(t[1][0],t[0][0]);g.userData.photoApproximation=true;return g;}

// 2026-10-09: balcony set rebuilt as IKEA TÄRNÖ (Xip: "find it from IKEA"). Source of truth = IKEA's
// product photos + measurement drawing: table 55×54 cm top, 70 cm high, feet 48×43 cm;
// chair 39 W × 40 D × 79 H cm, seat 45 cm high. Black powder-coated steel tubes, light-brown stained acacia slats.
const acacia=finish(mat(0x9a7148,.7),'wood',2), steel=mat(0x1e2023,.45,.6);
// A round steel tube from point a to point b ([x,y,z] in mm). The old legs were tilted boxes that floated;
// a tube between two exact points always touches what it connects.
function tube(g,a,b,name,r=9){
  const A=new THREE.Vector3(...a),B=new THREE.Vector3(...b),dir=B.clone().sub(A),len=dir.length();
  const t=part(g,new THREE.CylinderGeometry(r,r,len,10),steel,0,0,0,name);
  t.position.copy(A).add(B).multiplyScalar(.5);t.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0),dir.normalize());return t;
}
const foot=(g,x,z)=>part(g,new THREE.CylinderGeometry(13,13,10,10),steel,x,5,z,'Tarno_Foot');   // plastic feet

function bistroTable(n){                         // 196:404 "Bistro table · slatted wood" -> IKEA TÄRNÖ table
  const g=place(n),W=550,D=540,H=700,slats=6;
  // Top: 6 acacia slats running the long way, small gaps between them.
  for(let i=0;i<slats;i++)part(g,rbox(W,20,D/slats-12,5),acacia,0,H-10,-D/2+(i+.5)*D/slats,'Tarno_TableSlat');
  // Under-top frame (apron) the slats sit on.
  const ax=W/2-30,az=D/2-30,top=H-28;
  for(const s of [-1,1]){tube(g,[-ax,top,s*az],[ax,top,s*az],'Tarno_Apron');tube(g,[s*ax,top,-az],[s*ax,top,az],'Tarno_Apron');}
  // Each side is an "X": two legs cross from the top corners to the opposite feet (feet 48 × 43 cm).
  const fx=240,fz=215;
  for(const s of [-1,1]){
    tube(g,[s*ax,top,-az],[s*fx,10,fz],'Tarno_TableLeg');tube(g,[s*ax,top,az],[s*fx,10,-fz],'Tarno_TableLeg');
    foot(g,s*fx,fz);foot(g,s*fx,-fz);
  }
  // Floor rails join the left and right X's (front and back), as in the IKEA photo.
  for(const s of [-1,1])tube(g,[-fx,40,s*fz],[fx,40,s*fz],'Tarno_FloorRail',7);
  g.userData.status='IKEA TÄRNÖ table 55×54×70 cm (IKEA product data), Figma position';return g;
}
// 2026-10-09: "Cubby shelf · balcony corner" (196:377) was a plain white box. Photo unit09: white KALLAX-style
// 2×2 open cube shelf (open front AND back, like IKEA KALLAX) with two black-framed blue prints leaning on top.
// Width/depth = Xip's Figma footprint; height = width (square unit). Local +Z = the wall behind it (measured).
function cubeShelf(n){
  const g=place(n),W=n.width,D=n.height,H=W,o=30,i=15,wh=mat(0xf3f3ef,.5);
  part(g,new THREE.BoxGeometry(W,o,D),wh,0,o/2,0,'Kallax_Bottom');part(g,new THREE.BoxGeometry(W,o,D),wh,0,H-o/2,0,'Kallax_Top');
  for(const s of [-1,1])part(g,new THREE.BoxGeometry(o,H-2*o,D),wh,s*(W/2-o/2),H/2,0,'Kallax_Side');
  part(g,new THREE.BoxGeometry(i,H-2*o,D),wh,0,H/2,0,'Kallax_MidV');part(g,new THREE.BoxGeometry(W-2*o,i,D),wh,0,H/2,0,'Kallax_MidH');
  // Two prints leaning on the wall: big one on the balcony-door side (+X), smaller one beside it.
  const art=(seed)=>canvasTex(256,320,(c,w,h)=>{c.fillStyle='#f4f6f7';c.fillRect(0,0,w,h);
    for(let k=0;k<7;k++){c.fillStyle=['#1f4e79','#3b78a8','#9cc3dc','#0e2a47'][(k+seed)%4];c.globalAlpha=.8;
      c.beginPath();c.ellipse(w*(.3+.4*Math.sin(k*1.7+seed)),h*(.2+.1*k),w*(.08+.05*((k+seed)%3)),h*.09,k*.6,0,Math.PI*2);c.fill();}});
  // Photo: big print on the door side, small print just in front of its other edge (small overlap).
  for(const [x,fw,fh,seed,z] of [[-W*.23,420,530,0,D/2-70],[W*.28,330,420,2,D/2-120]]   /* -X = door side (model is mirrored) */){
    const f=new THREE.Group();f.position.set(x,H,z);f.rotation.x=.12;g.add(f);   // bottom on the shelf, top leaning on the wall
    part(f,new THREE.BoxGeometry(fw,fh,22),black,0,fh/2,0,'Print_Frame');
    part(f,new THREE.PlaneGeometry(fw-50,fh-50),new THREE.MeshStandardMaterial({map:art(seed),roughness:.8}),0,fh/2,-12,'Print_Art').rotation.y=Math.PI;
  }
  g.userData.status='Figma footprint; open cube shelf + 2 prints from photo unit09 (height estimated = width)';return g;
}
// Photo unit09: silver floor reading lamp (thin stem, angled arm, dome shade) and IKEA ANTILOP high chair
// (90 H × 56 W × 62 D cm, seat 54 cm). Front/arm = local +Z.
function readingLamp(){
  const g=new THREE.Group(),alu=mat(0xc9ccd0,.3,.85);
  part(g,new THREE.CylinderGeometry(130,140,16,32),alu,0,8,0,'FloorLamp_Base');
  part(g,new THREE.CylinderGeometry(9,9,1350,10),alu,0,690,0,'FloorLamp_Stem');
  const arm=part(g,new THREE.CylinderGeometry(7,7,480,10),alu,0,1520,170,'FloorLamp_Arm');arm.rotation.x=1.0;
  const shade=part(g,new THREE.CylinderGeometry(45,105,170,28,1,true),new THREE.MeshStandardMaterial({color:0xc9ccd0,roughness:.3,metalness:.85,side:THREE.DoubleSide}),0,1560,370,'FloorLamp_Shade');
  shade.rotation.x=.7;shade.castShadow=false;return g;
}
function highChair(){
  const g=new THREE.Group(),plastic=mat(0xf5f5f2,.35),alu=mat(0xc9ccd0,.3,.85);
  part(g,rbox(300,40,280,15),plastic,0,540,0,'HighChair_Seat');
  part(g,rbox(300,330,40,15),plastic,0,720,-140,'HighChair_Back');
  for(const s of [-1,1])part(g,rbox(30,180,260,10),plastic,s*155,640,0,'HighChair_Side');
  part(g,rbox(420,30,300,20),plastic,0,700,260,'HighChair_Tray');
  for(const sx of [-1,1])for(const sz of [-1,1])tube(g,[sx*120,530,sz*100],[sx*270,10,sz*300],'HighChair_Leg',11).material=alu;
  return g;
}
function foldingChair(n,towards){                // 196:411 / 196:415 -> IKEA TÄRNÖ chair, front (+Z) faces the table
  const g=place(n);g.rotation.y=facing(towards[0],towards[1]);
  const W=390,x=W/2-12,seatY=450,sb=-150,sf=150;   // seat 39 cm wide, back edge z -150, front edge z +150
  // Seat: 5 slats across the width, resting on two side rails.
  for(let i=0;i<5;i++)part(g,rbox(W,18,(sf-sb)/5-10,4),acacia,0,seatY-9,sb+(i+.5)*(sf-sb)/5,'Tarno_SeatSlat');
  for(const s of [-1,1])tube(g,[s*x,seatY-26,sb],[s*x,seatY-26,sf],'Tarno_SeatRail');
  for(const s of [-1,1]){
    // Back post: from the top of the backrest down past the seat's back corner, then on to the FRONT foot.
    tube(g,[s*x,790,-195],[s*x,seatY-26,sb],'Tarno_BackPost');
    tube(g,[s*x,seatY-26,sb],[s*x,10,190],'Tarno_FrontLeg');
    // Second leg: from the seat's front corner to the BACK foot. The two legs cross in an X under the seat.
    tube(g,[s*x,seatY-26,sf],[s*x,10,-190],'Tarno_BackLeg');
    foot(g,s*x,190);foot(g,s*x,-190);
  }
  tube(g,[-x,40,190],[x,40,190],'Tarno_FootRail',7);tube(g,[-x,40,-190],[x,40,-190],'Tarno_FootRail',7);
  tube(g,[-x,seatY-26,sf],[x,seatY-26,sf],'Tarno_SeatFrontRail');
  // Backrest: 2 wide slats in front of the posts, leaning back with them.
  const lean=Math.atan2(195-150,790-(seatY-26));
  for(const y of [660,750]){const z=-150-(y-(seatY-26))*Math.tan(lean)+14;part(g,rbox(W,75,16,4),acacia,0,y,z,'Tarno_BackSlat').rotation.x=-lean;}
  g.userData.status='IKEA TÄRNÖ chair 39×40×79 cm, seat 45 cm (IKEA product data), Figma position';return g;
}
function washingMachine(n){                      // 196:419, front faces into the yard (local +Z)
  const g=place(n),w=n.width,d=n.height,h=850;
  part(g,rbox(w,h,d,18),mat(0xf3f4f2,.4),0,h/2,0,'Washer_Body');
  part(g,new THREE.BoxGeometry(w-30,110,6),mat(0xe4e6e5,.35),0,h-75,d/2+2,'Washer_Panel');
  part(g,new THREE.CylinderGeometry(70,70,14,32),mat(0xb9bec2,.25,.7),w*.28,h-75,d/2+6,'Washer_Dial').rotation.x=Math.PI/2;
  part(g,new THREE.TorusGeometry(185,26,16,48),mat(0xc7ccd0,.25,.8),0,h*.45,d/2+10,'Washer_DoorRing');
  part(g,new THREE.CircleGeometry(165,48),new THREE.MeshPhysicalMaterial({color:0x2a3438,roughness:.08,metalness:.1,clearcoat:1}),0,h*.45,d/2+12,'Washer_DoorGlass');
  const basin=part(g,new THREE.CylinderGeometry(210,150,150,32),mat(0xd8262e,.45),-w*.08,h+75,0,'Washer_RedBasin');basin.userData.status='photo unit01';
  g.userData.status='Figma footprint; front-load shape from photo, height estimated 850 mm';return g;
}
function vanity(n){                              // 196:426 Bath 1, against the left wall, front faces +X
  const g=place(n),depth=n.width,width=n.height;
  const body=new THREE.Group();body.rotation.y=Math.PI/2;g.add(body);   // body local +Z now faces plan +X
  part(body,rbox(width,420,depth-40,14),mat(0xf2f1ee,.45),0,640,-20,'Vanity_Cabinet');
  part(body,rbox(width+20,40,depth,10),ceramic,0,870,0,'Vanity_Top');
  part(body,new THREE.BoxGeometry(width-40,4,3),mat(0x9a9d9e,.6),0,640,depth/2-18,'Vanity_DoorGap');
  part(body,new THREE.CylinderGeometry(14,14,150,16),chrome,0,960,-depth/2+60,'Vanity_Tap');
  part(body,rbox(width-40,720,20,8),mirror,0,1550,-depth/2+12,'Vanity_Mirror');
  g.userData.status='Figma footprint; wall-hung cabinet, basin and mirror from photo, heights estimated';return g;
}


// ---------- Step 6: bedroom furniture detail (Figma footprints and colours kept, heights estimated) ----------
const colorOf=(n,f)=>n.c?new THREE.Color().setRGB(n.c.r,n.c.g,n.c.b,THREE.SRGBColorSpace):new THREE.Color(f);
const upholstery=(n,f)=>finish(new THREE.MeshStandardMaterial({color:colorOf(n,f),roughness:.95}),'fabric',3);
const bedLinen=finish(mat(0xf6f7f5,.95),'linen',2), towel=finish(mat(0xfbfbf9,.98),'fabric',2), oak=finish(mat(0xc9a77c,.7),'wood',1);
// All three beds have their headboard at local -X (plan west), foot at +X.
function bedBase(n){const g=place(n),w=n.width,d=n.height,m=upholstery(n,0x344e69);if(n.id==='196:310'||n.id==='196:318')m.color.setHex(0x2d4a78);   // Phase 2: brighter blue, as in the photo
  part(g,rbox(w,290,d,32),m,0,205,0,'Bed_Base');
  part(g,new THREE.BoxGeometry(w-90,60,d-90),mat(0x1d2229,.8),0,30,0,'Bed_Plinth');
  g.userData.status='Figma footprint/colour; upholstered divan, height estimated 350 mm';return g;}
function mattress(n){const g=place(n),w=n.width,d=n.height;
  part(g,rbox(w,200,d,45),bedLinen,0,450,0,'Bed_Mattress');
  const pillowZone=n.height>1600?560:470,duvetLen=w-pillowZone+30,cx=w/2-duvetLen/2+15;
  part(g,rbox(duvetLen,55,d+50,26),bedLinen,cx,575,0,'Bed_Duvet');
  for(const s of [-1,1])part(g,rbox(duvetLen,210,24,12),bedLinen,cx,470,s*(d/2+30),'Bed_DuvetDrape');
  part(g,rbox(24,210,d+50,12),bedLinen,w/2+30,470,0,'Bed_DuvetFoot');
  part(g,rbox(150,75,d+56,30),bedLinen,cx-duvetLen/2+75,598,0,'Bed_DuvetFold');
  for(const [i,z] of [[0,-d*.17],[1,d*.17]]){const t=part(g,rbox(330,60,230,18),towel,w/2-420,632+i*2,z,'Bed_Towel');t.rotation.y=(i?-.08:.06);}
  g.userData.status='Figma footprint; mattress, draped duvet and folded towels from photo, heights estimated';return g;}
function tuftedHeadboard(n){const g=place(n),w=n.width,d=n.height,m=finish(new THREE.MeshStandardMaterial({color:0x2f4f80,roughness:.95}),'fabric',3);
  part(g,rbox(w+30,1000,d,140),m,0,720,0,'Bed_Headboard');                         // big radius = rounded top corners
  const cols=Math.max(5,Math.round(d/170)),btn=mat(0x22385c,.8);
  for(const y of [880,1060])for(let i=0;i<cols;i++)part(g,new THREE.SphereGeometry(11,10,8),btn,w/2+20,y,-d/2+(i+.5)*d/cols,'Bed_HeadboardButton');
  g.userData.status='Figma footprint; button-tufted rounded headboard from photo "bedroom 1", height estimated 220–1220 mm';return g;}
function headboard(n){if(n.id==='196:312'||n.id==='196:320')return tuftedHeadboard(n);
  if(n.id==='196:295'){const g=place(n);g.userData.status='Bed 2 photo shows no visible headboard';return g;}
  const g=place(n),w=n.width,d=n.height,m=upholstery(n,0x496581),count=Math.max(4,Math.round(d/190));
  part(g,rbox(w+10,900,d,40),m,0,700,0,'Bed_Headboard');
  for(let i=0;i<count;i++)part(g,rbox(50,850,d/count-16,24),m,w/2+12,700,-d/2+(i+.5)*d/count,'Bed_HeadboardChannel');
  g.userData.status='Figma footprint/colour; padded channel headboard, height estimated 250–1150 mm';return g;}
function pillow(n){const g=place(n),w=n.width,d=n.height,p=part(g,rbox(w-20,150,d-30,68),bedLinen,0,640,0,'Bed_Pillow');p.rotation.z=.22;p.scale.set(1,1,1);
  g.userData.status='Figma footprint; plump pillow leaning on the headboard';return g;}
function desk(n){const g=place(n),w=n.width,d=n.height,white=mat(0xf2f2ef,.45);
  part(g,rbox(w,28,d,6),white,0,738,0,'Desk_Top');
  for(const sx of [-1,1])for(const sz of [-1,1])part(g,new THREE.BoxGeometry(36,724,36),white,sx*(w/2-45),362,sz*(d/2-45),'Desk_Leg');
  g.userData.status='Figma footprint; white desk from photo, height estimated 752 mm';return g;}
function chair(n){const g=place(n),w=n.width,d=n.height,shell=mat(0xf3f3f0,.35);   // backrest (196:347) is on local -X
  part(g,rbox(w,30,d,14),shell,0,455,0,'Chair_Seat');
  const back=part(g,rbox(28,330,d,14),shell,-w/2+14,650,0,'Chair_Back');back.rotation.z=.12;
  for(const sx of [-1,1])for(const sz of [-1,1]){const l=part(g,new THREE.CylinderGeometry(13,10,450,10),oak,sx*(w/2-50),222,sz*(d/2-50),'Chair_Leg');l.rotation.z=-sx*.08;l.rotation.x=sz*.08;}
  g.userData.status='Figma footprint; white shell chair with wood legs from photo, heights estimated';return g;}
function tuftedBench(n){const g=place(n),w=n.width,d=n.height,m=upholstery(n,0x424c56);
  part(g,rbox(w,130,d,36),m,0,395,0,'Bench_Cushion');
  for(let i=0;i<6;i++)for(const x of [-w/5,w/5])part(g,new THREE.SphereGeometry(9,10,8),mat(0x2a3038,.7),x,461,-d/2+(i+.5)*d/6,'Bench_Button');
  for(const sx of [-1,1])for(const sz of [-1,1])part(g,new THREE.BoxGeometry(34,330,34),black,sx*(w/2-40),165,sz*(d/2-60),'Bench_Leg');
  g.userData.status='Figma footprint/colour; tufted bench from photo, height estimated 460 mm';return g;}
function bedside(n){const g=place(n),w=n.width,d=n.height,m=finish(new THREE.MeshStandardMaterial({color:colorOf(n,0xe1d3be),roughness:.6}),'wood',1);
  part(g,rbox(w,480,d,10),m,0,250,0,'Bedside_Body');                 // front faces local +X (toward the bed foot side)
  part(g,new THREE.BoxGeometry(3,4,d-50),mat(0x8b7f70,.7),w/2+1,330,0,'Bedside_DrawerGap');
  part(g,new THREE.CylinderGeometry(9,9,16,12),chrome,w/2+8,400,0,'Bedside_Knob').rotation.z=Math.PI/2;
  if(n.id==='196:336'||n.id==='196:339'){g.children[0].material=mat(0xf1f1ee,.5);part(g,rbox(w+10,22,d+10,4),finish(mat(0x6b4a33,.55),'wood',1),0,501,0,'Bedside_WalnutTop');g.add(tableLamp(0xd8c8a8,{x:0,y:512,z:0}));}
  g.userData.status='Figma footprint/colour; drawer cabinet, height estimated 490 mm';return g;}
// Table lamp: round base, slim stem, drum shade (photos: beige shade in Bed 2, grey in Bed 1).
function tableLamp(shadeColor,at){const g=new THREE.Group();g.position.set(at.x,at.y,at.z);g.name='Furniture_Photo_TableLamp';
  part(g,new THREE.CylinderGeometry(70,80,18,24),mat(0xe9e6e0,.4),0,9,0,'Lamp_Base');
  part(g,new THREE.CylinderGeometry(8,8,300,10),chrome,0,160,0,'Lamp_Stem');
  const shade=part(g,new THREE.CylinderGeometry(120,150,190,32,1,true),new THREE.MeshStandardMaterial({color:shadeColor,roughness:.9,side:THREE.DoubleSide,emissive:shadeColor,emissiveIntensity:.06}),0,330,0,'Lamp_Shade');shade.castShadow=false;
  g.userData.status='estimated from photo';return g;}
const STEP6={'196:310':bedBase,'196:318':bedBase,'196:293':bedBase,'196:311':mattress,'196:319':mattress,'196:294':mattress,
  '196:312':headboard,'196:320':headboard,'196:295':headboard,'196:313':pillow,'196:314':pillow,'196:321':pillow,'196:322':pillow,'196:299':pillow,'196:300':pillow,
  '196:333':desk,'196:345':desk,'196:346':chair,'196:340':tuftedBench,'196:326':bedside,'196:336':bedside,'196:339':bedside};
export function photoUpgrade(n){
  if(STEP6[n.id])return STEP6[n.id](n);
  if(n.id==='196:347'){const g=place(n);g.userData.replacedBy='196:346';return g;}   // chair backrest, now part of the chair
  if(n.id==='196:404')return bistroTable(n);
  if(n.id==='196:377')return cubeShelf(n);          // 2026-10-09: cube shelf + prints (photo unit09)
  if(n.id==='196:411')return foldingChair(n,[16.78-17.28,6.86-7.34]);
  if(n.id==='196:415')return foldingChair(n,[16.78-16.26,6.86-6.43]);
  if(n.id==='196:419')return washingMachine(n);
  if(n.id==='196:420'){const g=place(n);g.userData.replacedBy='196:419';return g;}   // strip inside the washer footprint
  if(n.id==='196:426')return vanity(n);
  if(n.id==='196:424'){const g=place(n),w=n.width,d=n.height,navy=mat(0x23324d,.6);           // photo unit01: navy louvred cabinet
    part(g,rbox(w,780,d,8),navy,0,390,0,'Yard_Cabinet');
    for(let i=0;i<11;i++)part(g,new THREE.BoxGeometry(w-60,14,8),mat(0x1a2538,.6),0,90+i*60,d/2+4,'Yard_Louvre').rotation.x=-.5;
    g.userData.status='Figma footprint; navy louvred cabinet from photo, height estimated 780 mm';return g;}
  if(n.id==='196:425'){const g=place(n);const tub=part(g,rbox(n.width+40,170,n.height+60,60),mat(0xf3f3ef,.35),0,780+85,0,'Yard_Tub');tub.userData.status='photo unit01';return g;}
  return null;
}

export function addPhotoAdditions(root){
  const add=(obj,x,y,dirX,dirY,name)=>{obj.position.copy(P(x,y));obj.rotation.y=facing(dirX,dirY);obj.name='Furniture_Photo_'+name;obj.userData.status='estimated from photo';root.add(obj);};
  // Bath 1 (x 7.35–8.49, y 3.40–5.94): toilet on the right wall facing left; shower at the window end.
  add(toilet(),8.30,4.70,-1,0,'Bath1_Toilet');   // Phase 2: back against the measured wall (x 8.63)
  const screen=new THREE.Group();screen.name='Furniture_Photo_Bath1_ShowerScreen';screen.userData.status='estimated from photo';
  part(screen,new THREE.BoxGeometry(650,2000,8),glass,0,1000,0,'Bath1_ShowerGlass');
  part(screen,new THREE.CylinderGeometry(10,10,650,12),chrome,0,2000,0,'Bath1_ShowerRail').rotation.z=Math.PI/2;
  screen.position.copy(P(7.68,4.32));root.add(screen);
  const head=new THREE.Group();head.name='Furniture_Photo_Bath1_ShowerHead';head.userData.status='estimated from photo';
  part(head,new THREE.CylinderGeometry(12,12,1100,12),chrome,0,1500,0,'Bath1_ShowerPipe');
  part(head,new THREE.CylinderGeometry(110,110,14,32),chrome,0,2060,90,'Bath1_ShowerRose');
  part(head,new THREE.BoxGeometry(20,20,100),chrome,0,2060,40,'Bath1_ShowerArm');
  head.position.copy(P(7.38,3.85));head.rotation.y=facing(1,0);root.add(head);
  // Bath 2 (x 3.34–5.88, y 8.03–9.40): toilet on the yard-side wall, basin on the opposite wall.
  add(toilet(),4.75,8.97,0,-1,'Bath2_Toilet');    // Phase 2: was 10 cm inside the wall (measured wall y 9.30)
  add(wallBasin(),4.80,8.17,0,1,'Bath2_Basin');     // Phase 2: against the measured wall (y 7.96)
  // Curtains, light mauve-grey sheers as in the bedroom photos. Normals point into the room.
  // Phase 2: colours from the full-size photos — Bed 1 light grey-mauve sheers, Bed 2 dusty mauve.
  curtains(root,[3.36,3.31],[4.15,3.31],[0,1],'142_2',0xcdc6cc);
  curtains(root,[4.37,3.31],[7.14,3.31],[0,1],'142_3',0xcdc6cc);
  curtains(root,[3.25,7.01],[3.25,7.80],[1,0],'142_7',0xcdc6cc);
  curtains(root,[9.16,3.30],[11.98,3.30],[0,1],'142_4',0xa8939f);
  addPhase2Details(root);
  // Dark cushions on the light grey sofa (photo: lounge by the balcony).
  const sofa=root.getObjectByName('Furniture_Figma_BlueSofa');
  if(sofa){const w=sofa.children.reduce((m,c)=>Math.max(m,Math.abs(c.position.x)),0)*2||1800;
    for(const x of [-w*.3,w*.3]){const c=part(sofa,rbox(430,430,140,60),x>0?unionJack():cushionFabric,x,560,180,'Sofa_Cushion');c.rotation.x=.3;c.rotation.z=x>0?-.06:.06;c.userData.status='estimated from photo';}}   // Phase 2: one Union Jack cushion, as in the lounge photo
}

// ======================= Phase 2 (2026-10-04): details from the full-size photos =======================
function canvasTex(w,h,draw){const c=document.createElement('canvas');c.width=w;c.height=h;draw(c.getContext('2d'),w,h);const t=new THREE.CanvasTexture(c);t.colorSpace=THREE.SRGBColorSpace;t.wrapS=t.wrapT=THREE.RepeatWrapping;t.anisotropy=8;return t;}
function unionJack(){const t=canvasTex(512,512,(g,w,h)=>{g.fillStyle='#1d2a52';g.fillRect(0,0,w,h);
  const line=(lw,col)=>{g.strokeStyle=col;g.lineWidth=lw;g.beginPath();g.moveTo(0,0);g.lineTo(w,h);g.moveTo(w,0);g.lineTo(0,h);g.stroke();};
  line(90,'#f2f0ea');line(30,'#b0262e');g.fillStyle='#f2f0ea';g.fillRect(w/2-75,0,150,h);g.fillRect(0,h/2-75,w,150);
  g.fillStyle='#b0262e';g.fillRect(w/2-45,0,90,h);g.fillRect(0,h/2-45,w,90);});
  return new THREE.MeshStandardMaterial({map:t,roughness:.95});}
// Bathroom tiles: light grey 600x300 wall tiles (photo unit05) and charcoal 300x300 floor tiles.
const wallTile=canvasTex(512,512,(g,w,h)=>{for(let r=0;r<4;r++)for(let c=0;c<2;c++){const v=226+((r*7+c*3)%5)-2;g.fillStyle=`rgb(${v},${v+1},${v+2})`;g.fillRect(c*256,r*128,256,128);}
  g.strokeStyle='#c4c8c9';g.lineWidth=3;for(let r=0;r<=4;r++){g.beginPath();g.moveTo(0,r*128);g.lineTo(w,r*128);g.stroke();}for(let r=0;r<4;r++)for(let c=0;c<=2;c++){const x=c*256+(r%2?128:0);g.beginPath();g.moveTo(x,r*128);g.lineTo(x,r*128+128);g.stroke();}});
const floorTile=canvasTex(512,512,(g,w,h)=>{for(let r=0;r<2;r++)for(let c=0;c<2;c++){const v=58+((r+c)%2)*6;g.fillStyle=`rgb(${v},${v+2},${v+5})`;g.fillRect(c*256,r*256,256,256);}
  g.strokeStyle='#2a2c2f';g.lineWidth=4;for(let i=0;i<=2;i++){g.beginPath();g.moveTo(i*256,0);g.lineTo(i*256,h);g.moveTo(0,i*256);g.lineTo(w,i*256);g.stroke();}});
function tiled(tex,wMM,hMM,repW,repH,rough){const t=tex.clone();t.needsUpdate=true;t.repeat.set(wMM/repW,hMM/repH);return new THREE.MeshStandardMaterial({map:t,roughness:rough});}
// One tiled wall: a thin panel 4 mm in front of the wall from (x0,y0) to (x1,y1) (plan metres), split around openings.
// openings: [from_m, to_m, bottom_mm, top_mm] measured along the wall from (x0,y0).
function tileWall(root,x0,y0,x1,y1,normal,openings,name){const len=Math.hypot(x1-x0,y1-y0),ux=(x1-x0)/len,uy=(y1-y0)/len,H=2700,T=6;
  const g=new THREE.Group();g.name='Furniture_Photo_TileWall_'+name;g.userData.status='photo-matched bathroom tiles; tile size estimated 600x300';
  const piece=(a,b,bot,top)=>{if(b-a<0.02||top-bot<20)return;const w=(b-a)*1000,h=top-bot,m=tiled(wallTile,w,h,600,300,.35);
    const o=new THREE.Mesh(new THREE.BoxGeometry(w,h,T),m);const cx=x0+ux*(a+b)/2+normal[0]*0.007,cy=y0+uy*(a+b)/2+normal[1]*0.007;
    o.position.set(cx*1000,bot+h/2,-cy*1000);o.rotation.y=Math.atan2(uy,ux);o.name='Furniture_Photo_Tile';o.receiveShadow=true;g.add(o);};
  const ops=[...openings].sort((p,q)=>p[0]-q[0]);let cur=0;
  for(const [a,b,bot,top] of ops){piece(cur,a,0,H);piece(a,b,0,bot);piece(a,b,top,H);cur=b;}
  piece(cur,len,0,H);root.add(g);}
function tileFloor(root,x0,y0,x1,y1,name){const w=(x1-x0)*1000,d=(y1-y0)*1000,m=tiled(floorTile,w,d,600,600,.45);
  const o=new THREE.Mesh(new THREE.BoxGeometry(w,4,d),m);o.position.set((x0+x1)/2*1000,2,-(y0+y1)/2*1000);o.name='Furniture_Photo_BathFloor_'+name;o.receiveShadow=true;o.userData.status='photo-matched charcoal floor tile, size estimated';root.add(o);}
function rainShower(root,x,y,name){const g=new THREE.Group();g.name='Furniture_Photo_RainShower_'+name;g.position.copy(P(x,y));g.userData.status='estimated from photo';
  part(g,new THREE.CylinderGeometry(10,10,160,10),chrome,0,2720,0,'RainShower_Arm');
  part(g,new THREE.CylinderGeometry(125,125,10,40),chrome,0,2640,0,'RainShower_Head');root.add(g);}
function ceilingFan(root,x,y){const g=new THREE.Group();g.name='Furniture_Photo_CeilingFan';g.position.copy(P(x,y));g.userData.status='photo 07_kitchen; position estimated';
  const white=mat(0xf4f4f2,.4);part(g,new THREE.CylinderGeometry(12,12,240,10),white,0,2680,0,'Fan_Rod');
  part(g,new THREE.CylinderGeometry(95,80,110,28),white,0,2520,0,'Fan_Motor');
  for(let i=0;i<3;i++){const b=part(g,rbox(560,10,120,5),white,0,2500,0,'Fan_Blade');b.geometry.translate(330,0,0);b.rotation.y=i*Math.PI*2/3;b.rotation.x=.08;}
  root.add(g);}
function addPhase2Details(root){
  // Bath 1 (measured inner faces: x 7.34–8.63, y 3.43–5.98; window x 7.62–8.35 sill 1150 head 2450; door at the bottom x ~7.80–8.63)
  tileWall(root,7.34,3.43,8.63,3.43,[0,1],[[0.28,1.01,1150,2450]],'B1_Top');
  tileWall(root,7.34,3.43,7.34,5.98,[1,0],[],'B1_Left');
  tileWall(root,8.63,3.43,8.63,5.98,[-1,0],[],'B1_Right');
  tileWall(root,7.34,5.98,8.63,5.98,[0,-1],[[0.46,1.29,0,2100]],'B1_Bottom');
  tileFloor(root,7.34,3.43,8.63,5.98,'B1');rainShower(root,7.72,3.90,'B1');
  // Bath 2 (measured: x 3.35–5.87, y 7.96–9.30; window on the left y 8.25–9.06 sill 860 head 2140; door on the right y ~7.96–8.85)
  tileWall(root,3.35,7.96,5.87,7.96,[0,1],[],'B2_Top');
  tileWall(root,3.35,9.30,5.87,9.30,[0,-1],[],'B2_Bottom');
  tileWall(root,3.35,7.96,3.35,9.30,[1,0],[[0.29,1.10,860,2140]],'B2_Left');
  tileWall(root,5.87,7.96,5.87,9.30,[-1,0],[[0,0.89,0,2100]],'B2_Right');
  tileFloor(root,3.35,7.96,5.87,9.30,'B2');rainShower(root,3.80,8.95,'B2');
  // Kitchen ceiling fan (photo 07_kitchen)
  ceilingFan(root,6.55,10.25);
  // Bed 1 desk: small grey lamp + framed line art above (photo unit13)
  const lamp=tableLamp(0x9aa0a4,{x:0,y:0,z:0});lamp.position.copy(P(6.92,5.92)).setY(752);root.add(lamp);
  const art=new THREE.Group();art.name='Furniture_Photo_DeskArt';art.position.copy(P(7.11,5.45));art.rotation.y=facing(-1,0);art.userData.status='estimated from photo';
  part(art,new THREE.BoxGeometry(420,540,22),mat(0x1d1d1f,.5),0,1450,0,'Art_Frame');
  part(art,new THREE.PlaneGeometry(360,480),new THREE.MeshStandardMaterial({map:canvasTex(256,320,(g,w,h)=>{g.fillStyle='#f4f2ee';g.fillRect(0,0,w,h);g.strokeStyle='#2b2b2b';g.lineWidth=2;
    for(let i=0;i<14;i++){g.beginPath();g.moveTo(40+i*12,60);g.bezierCurveTo(60+i*10,140,20+i*12,200,60+i*9,260);g.stroke();}}),roughness:.8}),0,1450,12,'Art_Print');
  root.add(art);
  // Coffee table top: white-washed brick pattern (lounge photo)
  const top=root.getObjectByName('Lounge_CoffeeTable_A_Top');
  if(top){const t=canvasTex(512,512,(g,w,h)=>{g.fillStyle='#d9dcdc';g.fillRect(0,0,w,h);for(let r=0;r<8;r++)for(let c=0;c<4;c++){const v=200+((r*5+c*7)%6)*7;g.fillStyle=`rgb(${v},${v+3},${v+5})`;g.fillRect(c*128+(r%2?64:0)+3,r*64+3,122,58);}});
    t.repeat.set(1/450,1/450);top.material=new THREE.MeshStandardMaterial({map:t,roughness:.85});top.userData.photo='white-washed brick-pattern top (lounge photo)';}
  // 2026-10-09: photo unit09 — reading lamp and ANTILOP high chair between the cube shelf (16.81, 8.77) and the sofa bed,
  // both facing into the room, plan direction (-0.71, -0.70).
  for(const [obj,x,y,name] of [[readingLamp(),16.40,9.18,'FloorLamp'],[highChair(),15.98,9.50,'HighChair_ANTILOP']]){
    obj.position.copy(P(x,y));obj.rotation.y=facing(-.71,-.70);obj.name='Furniture_Photo_'+name;obj.userData.status='estimated from photo unit09';root.add(obj);}
  // 2026-10-09 (Xip: "No more window here"): the living balcony's outer opening is open air.
  // Glass + 4 frame bars are hidden through their MATERIAL (the Glazing layer button only switches meshes,
  // so it can't bring them back). The low wall below (sill/parapet) and the beam above stay.
  // The hidden glass still counts for Walk collision = an invisible safety rail on the 13th floor.
  const balconyWin=root.getObjectByName('Window_Figma_166_322');
  if(balconyWin){balconyWin.traverse(m=>{if(m.isMesh&&(m.name==='Glass'||m.name==='Frame')){m.material=m.material.clone();m.material.visible=false;m.castShadow=false;}});
    balconyWin.userData.openAir='glass + frame hidden 2026-10-09 (Xip)';}
}
