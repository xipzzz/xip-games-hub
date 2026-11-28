// Dining table switcher. Units: millimetres in the model frame (plan point (x m, y m) -> model (x*1000, h, -y*1000)).
// Three tables share one spot; each comes with 6 matching chairs (3 per long side, pulled in under the table).
// Sizes are the real product sizes; Migic and TONSTAD are modelled EXTENDED.
import * as THREE from 'three';
import {RoundedBoxGeometry} from 'three/addons/geometries/RoundedBoxGeometry.js';
import {finish} from './surface-materials.js?v=step5-2';

// 2026-10-10 (Xip: kitchen spot "太挤了", move to the living room by the entry): centre of the open floor between the
// breakfast counter and the TV/sofa zone, measured in the 3D model. Room axes run at 45°: table long side follows the room.
// Clearances (TONSTAD 196 × 85 extended): ~1.4 m to the TV wall side, ~1.2 m to the tan loveseat, ~35–40 cm at each end.
export const DINING_CENTER={x:11.99,y:10.43}; // plan metres (was 7.75, 9.15 = in the kitchen)
export const DINING_ROTATION=-Math.PI/4;       // long side along the living room (model frame)
// 2026-10-11 (Xip): IKEA TONSTAD (oak, 140/196, RM 1,599) is the default in EVERY living room layout; the others stay
// in the option menu. Nothing is persisted: a fresh load always starts on TONSTAD (only an explicit ?table= overrides).
export const DEFAULT_TABLE='tonstad';
// Per-layout table spots in the living-room strip frame (option-two.js: s entry -> balcony, t TV wall -> sofa wall, mm).
// Layouts not listed use DINING_CENTER. Long side always along s.
//  option2: the spot of option two's own 140 x 85 set (its pendant hangs here), which TONSTAD now replaces.
//  ikea:    off the entry-to-balcony sightline (t 16117 at s 420): NW chair backs at t 16495, SE chair backs at
//           t 18005 (SE wall ~18370), extended table s -560..1400 (KIVIK arm s 2360). Was t 17840 with no wall-side chairs.
//  proposal (Warm Nordic, 2026-10-11 Xip): pushed against the long sofa / gallery wall (t ~18370) in the empty stretch
//           between the entry-end corner (wall return at s -1515) and Proposal_FloorLamp (s 1850, base r 190).
//           wall:true drops the wall-side chairs: extended = 3 on the open side + 1 at the corner end, closed = 2 + 1.
//           No chair at the lamp end: with one there, neither end keeps 75 cm behind its chair (stretch is ~317 cm).
//           pendant:true hangs a linen dome over the table centre (this layout had none; the bell pendant seen
//           behind the table belongs to the breakfast counter and stays there).
export const DINING_SPOTS={option2:{s:-350,t:17355},ikea:{s:420,t:17250},proposal:{s:550,t:17860,wall:true,pendant:true}};
export const TABLES=[
  {id:'migic',name:'Migic (Harvey Norman)',L:1800,W:800,H:750,note:'extended'},       // closed 150 x 80, extends to 180
  {id:'cassandra',name:'CASSANDRA (CKE)',L:1500,W:900,H:750},
  {id:'tonstad',name:'IKEA TONSTAD',L:1960,W:850,H:750,note:'extendable 140/196'},   // IKEA MY 205.940.62, RM 1,599
];

const mat=(color,rough,kind)=>{const m=new THREE.MeshStandardMaterial({color,roughness:rough});return kind?finish(m,kind,2):m;};
const mesh=(g,geo,m,x,y,z,name)=>{const o=new THREE.Mesh(geo,m);o.position.set(x,y,z);o.castShadow=o.receiveShadow=true;if(name)o.name=name;g.add(o);return o;};
const rbox=(w,h,d,r)=>new RoundedBoxGeometry(w,h,d,3,Math.min(r,w/2-1,h/2-1,d/2-1));

// Rounded-corner slab (corner radius r in plan), thickness t, sitting on y=0.
function slab(L,W,t,r){
  const s=new THREE.Shape(),x=L/2,z=W/2;
  s.moveTo(-x+r,-z);s.lineTo(x-r,-z);s.quadraticCurveTo(x,-z,x,-z+r);s.lineTo(x,z-r);s.quadraticCurveTo(x,z,x-r,z);
  s.lineTo(-x+r,z);s.quadraticCurveTo(-x,z,-x,z-r);s.lineTo(-x,-z+r);s.quadraticCurveTo(-x,-z,-x+r,-z);
  const g=new THREE.ExtrudeGeometry(s,{depth:t,bevelEnabled:false,curveSegments:6});
  g.rotateX(Math.PI/2);g.translate(0,t,0);
  g.computeVertexNormals();
  return g;
}

// A chair facing +Z (front): seat 440 x 440 at 450 high, back to 880.
function chair(c){
  const g=new THREE.Group(),w=440,d=440,seatY=450;
  mesh(g,rbox(w,35,d,10),c.seat,0,seatY-17,0);
  for(const sx of[-1,1])for(const sz of[-1,1]){
    mesh(g,c.legGeo,c.leg,sx*(w/2-28),(seatY-35)/2,sz*(d/2-28));
    if(sz<0)mesh(g,new THREE.BoxGeometry(34,880-seatY,34),c.leg,sx*(w/2-28),seatY+(880-seatY)/2,sz*(d/2-28)); // back posts
  }
  mesh(g,rbox(w-10,40,20,8),c.seat,0,880-40,-d/2+28);   // top rail
  mesh(g,rbox(w-10,40,20,8),c.seat,0,880-190,-d/2+28);  // lower rail
  return g;
}

// Migic: built-in power track down the middle of the top: 3 sockets and a thin LED strip, flush with a 4 mm lip.
function powerTrack(g,H){
  const len=1000,tw=90,dark=mat(0x26282b,.4),plate=mat(0xe9e8e4,.35),hole=mat(0x0c0c0d,.6);
  mesh(g,new THREE.BoxGeometry(len,4,tw),dark,0,H+2,0,'Dining_PowerTrack');
  mesh(g,new THREE.BoxGeometry(len-40,2,8),new THREE.MeshStandardMaterial({color:0xfff4dc,emissive:0xffd9a0,emissiveIntensity:2.2,roughness:.4}),0,H+5,-tw/2+14,'Dining_PowerTrack_LED');
  for(const x of[-300,0,300]){
    mesh(g,rbox(76,5,52,6),plate,x,H+6.5,12,'Dining_PowerTrack_Socket');
    for(const dx of[-12,12])mesh(g,new THREE.CylinderGeometry(4,4,2,10),hole,x+dx,H+9.5,12);
  }
}

// ---- IKEA TONSTAD extendable 140/196 × 85 × 75 cm, animated like IKEA's product video (2026-10-10, Xip) ----
// Video: the two top halves glide apart on runners (the legs stay in the corners), the self-storing leaf
// (56 cm, kept under the top) flips up through the gap and lies flat. Closing runs the same steps backwards.
// s = 0 closed (140 cm, 4 seats) ... 1 extended (196 cm, 6 seats).
const ease=(t)=>{t=Math.min(1,Math.max(0,t));return t*t*(3-2*t);};
function halfSlab(len,W,t,r,sgn){   // half top: square inner edge at x=0, rounded outer corners at x=sgn*len
  const s=new THREE.Shape(),z=W/2,X=(x)=>sgn*x;
  s.moveTo(0,-z);s.lineTo(X(len-r),-z);s.quadraticCurveTo(X(len),-z,X(len),-z+r);s.lineTo(X(len),z-r);s.quadraticCurveTo(X(len),z,X(len-r),z);s.lineTo(0,z);s.lineTo(0,-z);
  const g=new THREE.ExtrudeGeometry(s,{depth:t,bevelEnabled:false,curveSegments:6});g.rotateX(Math.PI/2);g.translate(0,t,0);g.computeVertexNormals();return g;
}
function buildTonstad(t){
  const g=new THREE.Group();g.name='Furniture_Dining_'+t.id;g.userData.status='IKEA TONSTAD extendable 140/196 x 85 x 75 cm (animated)';
  const oak=mat(0xd9bc8c,.55,'wood'),rail=mat(0xcfae7c,.6,'wood'),steel=mat(0x9a9da1,.35);
  const Lc=1400,leafL=560,W=t.W,H=t.H,topT=30,half=Lc/2,inset=75,under=H-topT;
  const halves=[];
  for(const sgn of[-1,1]){
    const h=new THREE.Group();g.add(h);halves.push(h);
    mesh(h,halfSlab(half,W,topT,70,sgn),oak,0,under,0,'Dining_Top');
    for(const sz of[-1,1]){
      mesh(h,rbox(60,under,60,8),oak,sgn*(half-inset),under/2,sz*(W/2-inset),'Dining_Leg');                    // legs stay in the corners
      mesh(h,new THREE.BoxGeometry(half-inset-60,70,22),rail,sgn*((half-inset)/2+30),under-35,sz*(W/2-inset),'Dining_SideRail');
    }
    mesh(h,new THREE.BoxGeometry(22,70,W-2*inset),rail,sgn*(half-inset),under-35,0,'Dining_EndRail');
  }
  const runners=[];for(const sz of[-1,1])runners.push(mesh(g,new THREE.BoxGeometry(1,16,26),steel,0,under-14,sz*(W/2-150),'Dining_Runner'));
  const leaf=mesh(g,rbox(leafL-4,topT,W,3),oak,0,0,0,'Dining_Leaf');
  // 6 chairs: see apply() for the closed / extended layouts.
  const c={seat:oak,leg:rail,legGeo:new THREE.BoxGeometry(34,450-35,34)},chairs=[];
  for(const side of[-1,1])for(const i of[-1,0,1]){
    const ch=chair(c);ch.rotation.y=side>0?Math.PI:0;ch.name='Furniture_Dining_Chair';g.add(ch);chairs.push({ch,side,i});
  }
  const apply=(s)=>{
    const a=ease(s/0.45),p=ease((s-0.45)/0.55),off=leafL/2*a;           // 1) halves glide apart, 2) leaf flips up
    halves[0].position.x=-off;halves[1].position.x=off;
    for(const r of runners){r.scale.x=2*off+300;r.visible=off>2;}
    leaf.position.set(0,lerp(under-60,under,p)+Math.sin(Math.PI*p)*140,0);   // stored under the top -> rises -> flush
    leaf.rotation.z=Math.sin(Math.PI*p)*0.55;                               // tilted on the way up, like the video
    // Chairs (Xip 2026-10-10): closed = 2 per long side + 1 at each end (head chairs); extended = 3 per long side.
    // The middle chairs walk round to the ends on a small outward arc, so they never pass through the table.
    const e=ease(s),sideZ=W/2+110,endX=Lc/2+110;
    if(g.userData.extend.wall){   // long side (-Z = +t) against a wall: no chairs there, one at the -X (corner) end
      for(const {ch,side,i} of chairs){
        ch.visible=side>0?(i!==0||e>0.5):i===0;   // open-side middle chair only once there is room for it (extended)
        if(side>0){ch.position.set(i*lerp(Lc/4,(Lc+leafL)/3,e),0,sideZ);ch.rotation.y=Math.PI;}
        else{ch.position.set(-(lerp(Lc,Lc+leafL,e)/2+110),0,0);ch.rotation.y=Math.PI/2;}   // end chair follows the table end
      }
      return;
    }
    for(const {ch,side,i} of chairs){
      ch.visible=true;
      if(i!==0){ch.position.set(i*lerp(Lc/4,(Lc+leafL)/3,e),0,side*sideZ);ch.rotation.y=side>0?Math.PI:0;continue;}
      const x=lerp(side*endX,0,e),z=lerp(0,side*sideZ,e),bump=Math.sin(Math.PI*e)*350,len=Math.hypot(x,z)||1;
      ch.position.set(x+x/len*bump,0,z+z/len*bump);
      ch.rotation.y=side>0?lerp(-Math.PI/2,-Math.PI,e):lerp(Math.PI/2,0,e);   // end: face the table along its length; side: face across
    }
  };
  g.userData.extend={s:1,target:1,apply};apply(1);
  return g;
}
const lerp=(a,b,t)=>a+(b-a)*t;

function build(t){
  if(t.id==='tonstad')return buildTonstad(t);
  const g=new THREE.Group();g.name='Furniture_Dining_'+t.id;g.userData.status=t.name+' '+t.L/10+' x '+t.W/10+' x '+t.H/10+' cm'+(t.note?' ('+t.note+')':'');
  let chairLeg,chairSeat;
  if(t.id==='migic'){ // white engineered marble top, matt black steel legs (legs: assumed, not in the brief)
    const top=finish(new THREE.MeshStandardMaterial({color:0xf3f2ee}),'stone',2);top.roughness=.28;
    const leg=mat(0x1e2022,.45),topT=30,inset=90;
    mesh(g,slab(t.L,t.W,topT,25),top,0,t.H-topT,0,'Dining_Top');
    for(const sx of[-1,1])for(const sz of[-1,1])mesh(g,rbox(50,t.H-topT,50,5),leg,sx*(t.L/2-inset),(t.H-topT)/2,sz*(t.W/2-inset));
    for(const sz of[-1,1])mesh(g,new THREE.BoxGeometry(t.L-2*inset,40,16),leg,0,t.H-topT-20,sz*(t.W/2-inset));
    powerTrack(g,t.H);
    chairLeg=mat(0x1e2022,.45);chairSeat=mat(0xcbc4b6,.9,'fabric');
  }else if(t.id==='cassandra'){ // sintered stone top (thin, matt) on a rubberwood frame
    const top=mat(0xb4ada1,.55,'stone'),wood=mat(0xcfa670,.6,'wood'),topT=14,apronH=75,inset=60;
    mesh(g,slab(t.L,t.W,topT,30),top,0,t.H-topT,0,'Dining_Top');
    for(const sx of[-1,1])for(const sz of[-1,1])mesh(g,rbox(65,t.H-topT,65,6),wood,sx*(t.L/2-inset),(t.H-topT)/2,sz*(t.W/2-inset));
    for(const sz of[-1,1])mesh(g,new THREE.BoxGeometry(t.L-2*inset,apronH,22),wood,0,t.H-topT-apronH/2,sz*(t.W/2-inset));
    for(const sx of[-1,1])mesh(g,new THREE.BoxGeometry(22,apronH,t.W-2*inset),wood,sx*(t.L/2-inset),t.H-topT-apronH/2,0);
    chairLeg=mat(0xcfa670,.6,'wood');chairSeat=mat(0xb89463,.6,'wood');
  }else{ // IKEA TONSTAD: brushed light oak veneer, rounded corners, 4 legs
    const top=mat(0xd9bc8c,.55,'wood'),topT=30,inset=75;
    mesh(g,slab(t.L,t.W,topT,70),top,0,t.H-topT,0,'Dining_Top');
    for(const sx of[-1,1])for(const sz of[-1,1])mesh(g,rbox(60,t.H-topT,60,8),top,sx*(t.L/2-inset),(t.H-topT)/2,sz*(t.W/2-inset));
    chairLeg=mat(0xcfae7c,.6,'wood');chairSeat=mat(0xd9bc8c,.55,'wood');
  }
  // 6 chairs: three per long side, pulled in 110 mm under the table, facing it
  const c={seat:chairSeat,leg:chairLeg,legGeo:new THREE.BoxGeometry(34,450-35,34)};
  for(const side of[-1,1])for(const i of[-1,0,1]){
    const ch=chair(c);ch.position.set(i*t.L/3,0,side*(t.W/2+110));
    ch.rotation.y=side>0?Math.PI:0; // chair front (+Z) must face the table
    ch.name='Furniture_Dining_Chair';g.add(ch);
  }
  return g;
}

// Dining pendant (same linen dome as option two's): canopy on the 2800 ceiling, shade bottom 1600 = 85 cm over the top.
// A separate root child, not inside the holder, so aiming at it does not count as aiming at the table.
function buildPendant(){
  const g=new THREE.Group();g.name='Dining_Pendant';
  const white=mat(0xf1efe9,.6),black=mat(0x1f1f1f,.5),linen=mat(0xece3cf,.9,'fabric'),drop=1600;linen.side=THREE.DoubleSide;
  mesh(g,new THREE.CylinderGeometry(60,60,18,24),white,0,2791,0,'Pendant_Canopy');
  mesh(g,new THREE.CylinderGeometry(3,3,2782-drop-200,8),black,0,(2782+drop+200)/2,0,'Pendant_Cord');
  mesh(g,new THREE.CylinderGeometry(70,260,200,40,1,true),linen,0,drop+100,0,'Pendant_Shade').castShadow=false;
  mesh(g,new THREE.SphereGeometry(45,20,12),new THREE.MeshStandardMaterial({color:0xffeacb,emissive:0xffcc84,emissiveIntensity:.9}),0,drop+120,0,'Pendant_Bulb').castShadow=false;
  const l=new THREE.PointLight(0xffc98a,1.1,4.5,2);l.position.set(0,drop+60,0);l.name='Dining_PendantLight';g.add(l);
  return g;
}

export function addDining(root,startId){
  const holder=new THREE.Group();holder.name='Furniture_Dining';
  holder.position.set(DINING_CENTER.x*1000,0,-DINING_CENTER.y*1000);holder.rotation.y=DINING_ROTATION;
  const variants={};
  for(const t of TABLES){variants[t.id]=build(t);holder.add(variants[t.id]);}
  root.add(holder);
  let current=null;
  const set=id=>{
    if(!variants[id])id=DEFAULT_TABLE;
    current=id;
    for(const k in variants)variants[k].visible=k===id;
    document.querySelectorAll('#table-switch button').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.id===id)));
  };
  // always-visible switcher, bottom-left
  const bar=document.createElement('div');bar.id='table-switch';
  bar.style.cssText='position:absolute;z-index:11;left:12px;bottom:40px;display:flex;gap:6px;';
  bar.style.display='none'; // 2026-10-10 (Xip): no always-on buttons; aim/click the table to get the menu (app.js)
  for(const t of TABLES){
    const b=document.createElement('button');b.className='name-label';b.dataset.id=t.id;
    b.innerHTML='<b>'+t.name+'</b><br>'+t.L/10+' x '+t.W/10+' x '+t.H/10+' cm'+(t.note?', '+t.note:'');
    b.style.cssText='text-align:left;cursor:pointer;line-height:1.3;';
    b.addEventListener('click',e=>{e.stopPropagation();set(t.id);});
    bar.appendChild(b);
  }
  document.getElementById('canvas-host').parentElement.appendChild(bar);
  set(startId);
  // Extendable tables (TONSTAD): animate s toward target, ~1.6 s for a full open or close.
  const ext=()=>variants[current]?.userData.extend;
  const update=(dt)=>{for(const k in variants){const e=variants[k].userData.extend;if(e&&e.s!==e.target){e.s=e.target>e.s?Math.min(e.target,e.s+dt/1.6):Math.max(e.target,e.s-dt/1.6);e.apply(e.s);}}};
  // Move the whole set to a layout's spot (DINING_SPOTS key), or back to DINING_CENTER for any other layout.
  // Spots with wall:true hide the wall-side chairs (TONSTAD re-arranges them, see buildTonstad); pendant:true shows the
  // dining pendant over the table centre. Every other spot gets the normal 6 chairs back and no pendant.
  const pendant=buildPendant();pendant.visible=false;root.add(pendant);
  const placeAt=(layoutId)=>{
    const p=DINING_SPOTS[layoutId],R=Math.SQRT1_2;
    if(p)holder.position.set((p.s+p.t)*R,0,-(p.t-p.s)*R);else holder.position.set(DINING_CENTER.x*1000,0,-DINING_CENTER.y*1000);
    holder.rotation.set(0,DINING_ROTATION,0);holder.userData.spot=p?layoutId:'default';
    const wall=!!p?.wall;
    for(const k in variants){
      const e=variants[k].userData.extend;
      if(e){e.wall=wall;e.apply(e.s);continue;}
      for(const ch of variants[k].children)if(ch.name==='Furniture_Dining_Chair')ch.visible=!(wall&&ch.position.z<0);
    }
    pendant.position.copy(holder.position);pendant.visible=!!p?.pendant;
  };
  return {set,holder,variants,tables:TABLES,current:()=>current,update,placeAt,
    extendable:()=>!!ext(),isExtended:()=>(ext()?.target??0)>0.5,toggleExtend:()=>{const e=ext();if(e)e.target=e.target>0.5?0:1;}};
}
