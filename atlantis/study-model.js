import * as THREE from 'three';
import {RoundedBoxGeometry} from 'three/addons/geometries/RoundedBoxGeometry.js';
import {finish} from './surface-materials.js?v=step5-2';
export const STUDY_REFERENCE={photos:['148:282','148:284'],cabinet:'Photo reconstruction; EKET 4-compartment reference, exact model unconfirmed',product:'https://www.ikea.com.hk/en/products/solitaire-cabinets---sideboards/living-room-storage/eket-art-90333957',cabinet_mm:[663.046,700,314.666],footprints:'Figma 196:278, 196:369 preserved',heights:'estimated from photographs'};
const mat=(color,roughness=.7,metalness=0)=>new THREE.MeshStandardMaterial({color,roughness,metalness});
const white=mat(0xecece5,.6),black=mat(0x202529,.5),cableMat=mat(0xd7d6ca,.8),turquoise=mat(0x168e91,.95);
function add(g,geo,m,p,name){const o=new THREE.Mesh(geo,m);o.position.set(...p);o.name='Furniture_Study_'+name;o.castShadow=o.receiveShadow=true;g.add(o);return o;}
function box(g,w,h,d,x,y,z,m,name,r=0){return add(g,r?new RoundedBoxGeometry(w,h,d,3,r):new THREE.BoxGeometry(w,h,d),m,[x,y,z],name);}
function pipe(g,points,r,m,name){return add(g,new THREE.TubeGeometry(new THREE.CatmullRomCurve3(points.map(p=>new THREE.Vector3(...p))),Math.max(32,points.length*10),r,7,false),m,[0,0,0],name);}
function cylinder(g,r1,r2,h,p,m,name){return add(g,new THREE.CylinderGeometry(r1,r2,h,48),m,p,name);}
function textile(striped=true){const m=finish(mat(0xf4f2e9,.98),'linen',9);m.bumpScale=.32;if(striped){const c=document.createElement('canvas');c.width=256;c.height=256;const ctx=c.getContext('2d'),im=ctx.createImageData(256,256);for(let y=0;y<256;y++)for(let x=0;x<256;x++){const tone=242+(x%32<16?5:-5)+(x%3===0?-5:0)+(y%3===0?-3:0);let i=(y*256+x)*4;im.data[i]=im.data[i+1]=im.data[i+2]=tone;im.data[i+3]=255;}ctx.putImageData(im,0,0);m.map=new THREE.CanvasTexture(c);m.map.colorSpace=THREE.SRGBColorSpace;m.map.wrapS=m.map.wrapT=THREE.RepeatWrapping;m.map.repeat.set(6,2);m.map.anisotropy=8;}return m;}
function art(g,h,d){const f=new THREE.Group();f.position.set(55,h+4,-d/2+52);f.rotation.x=-.09;g.add(f);const w=260,hh=335;
 box(f,w,hh,16,0,hh/2,0,black,'Art_Frame',2);box(f,w-21,hh-21,2,0,hh/2,9,mat(0xf3f0e6),'Art_Mount');
 const paper=box(f,177,256,1,0,hh/2,11,mat(0xd6dcd7),'Art_Paper');
 // Geometric line print reconstructed as actual paths, not a flat room photograph.
 for(let i=0;i<7;i++){const x=-72+i*20;pipe(f,[[x,45,13],[x,102,13],[x-12,130,13],[x+12,158,13],[x-20,202,13],[x-20,275,13]],.7,black,'Art_Print');}
 const remote=new THREE.Group();remote.position.set(-w*.66,h+8,d*.18);remote.rotation.y=.28;g.add(remote);box(remote,42,14,96,0,7,0,white,'Remote',6);for(let row=0;row<4;row++)for(let col=0;col<3;col++)box(remote,6,2,6,-11+col*11,15,-25+row*15,black,'Remote_Key',2);
}
export function buildStudyCabinet(w=663.046,d=314.666,{decor=true}={}){const g=new THREE.Group();g.name='Furniture_Study_Cubby';const h=700,t=17;
 for(const x of [-w/2+t/2,w/2-t/2])box(g,t,h,d,x,h/2,0,white,'Cabinet_Side',.8);
 for(const y of [t/2,h/2,h-t/2])box(g,w-2*t,t,d,0,y,0,white,'Cabinet_Shelf',.8);
 box(g,t,h-2*t,d-7,0,h/2,3.5,white,'Cabinet_Divider',.8);box(g,w-2*t,h-2*t,5,0,h/2,-d/2+3,mat(0xe0e0d8,.83),'Cabinet_Back');
 for(const x of [-w/2+28,w/2-28])for(const z of [-d/2+28,d/2-28])cylinder(g,9,9,4,[x,2,z],black,'Cabinet_Glide');
 if(decor)art(g,h,d);g.userData.reference=STUDY_REFERENCE;g.userData.compartments=4;return g;
}
export function buildStudyLamp(){const g=new THREE.Group();g.name='Furniture_Study_Lamp';cylinder(g,124,135,23,[0,11.5,0],white,'Lamp_Base');cylinder(g,10,10,1575,[0,810,0],white,'Lamp_Stem');
 function bowl(parent,r,h,y,name){const points=[[0,0],[15,0],[r*.35,h*.1],[r*.65,h*.35],[r*.85,h*.66],[r,h],[r-3,h],[r*.82,h*.66],[r*.62,h*.35],[r*.32,h*.13],[12,5],[0,5]].map(p=>new THREE.Vector2(...p));const shell=add(parent,new THREE.LatheGeometry(points,64),white,[0,y,0],name);cylinder(parent,16,16,22,[0,y+18,0],mat(0xe8e5d8),'Lamp_BulbSocket');const bulb=add(parent,new THREE.SphereGeometry(24,24,16),mat(0xfff8dc,.35),[0,y+50,0],'Lamp_Bulb');return shell;}
 bowl(g,140,125,1595,'Lamp_UplightShade');pipe(g,[[0,1000,0],[-50,1090,0],[-120,1120,0],[-155,1200,0],[-166,1300,0]],7,white,'Lamp_ReadingArm');const reader=new THREE.Group();reader.position.set(-166,1310,0);reader.rotation.z=-.18;g.add(reader);bowl(reader,62,65,0,'Lamp_ReadingShade');
 box(g,22,70,22,0,1040,14,white,'Lamp_Switch',5);box(g,9,25,5,0,1040,27,black,'Lamp_SwitchButton',2);
 pipe(g,[[12,1450,-8],[14,1080,-9],[14,650,-9],[17,55,-12],[55,8,-80],[130,7,-108]],2,cableMat,'Lamp_Cord');g.userData.height_mm=1720;return g;
}
export function buildStudyBed(w=1404.464,l=1865.129){const g=new THREE.Group();g.name='Furniture_Study_Bed';const navy=finish(mat(0x293d50),'fabric',12);navy.bumpScale=.5;const linen=textile(),plain=textile(false);
 for(const x of [-w*.4,w*.4])for(const z of [-l*.4,l*.4])cylinder(g,24,22,60,[x,30,z],black,'Bed_Foot');
 box(g,w,290,l,0,205,0,navy,'Bed_UpholsteredBase',14);box(g,2,245,l-30,0,210,0,mat(0x1c2d3d),'Bed_BaseSeam');
 box(g,w-32,185,l-44,0,436,0,linen,'Bed_Mattress',35);
 // Rounded duvet with shallow creases and draped side edges.
 const duvet=new RoundedBoxGeometry(w+10,72,l-300,7,28),p=duvet.attributes.position;
 for(let i=0;i<p.count;i++){const x=p.getX(i),y=p.getY(i),z=p.getZ(i);if(y>10){const fade=Math.max(0,1-Math.abs(x)/(w/2));p.setY(i,y+fade*(3*Math.sin(z*.017+x*.012)+1.8*Math.sin(z*.05)));}}duvet.computeVertexNormals();add(g,duvet,linen,[0,541,125],'Bed_Duvet');
 box(g,w+16,19,190,0,584,-l/2+480,plain,'Bed_FoldedSheet',9);
 for(const x of [-w*.24,w*.24]){const pillow=box(g,w*.44,115,360,x,628,-l/2+215,linen,'Bed_Pillow',52);pillow.rotation.x=.18;pipe(g,[[x-w*.2,635,-l/2+60],[x+w*.2,635,-l/2+60],[x+w*.21,615,-l/2+380],[x-w*.21,615,-l/2+380],[x-w*.2,635,-l/2+60]],1,plain,'Bed_PillowSeam');}
 for(let i=0;i<2;i++){const towel=new THREE.Group();towel.position.set(-70+i*85,646+i*85,l*.22);towel.rotation.y=i?.38:-.1;g.add(towel);const roll=cylinder(towel,62,62,280,[0,0,0],plain,'Towel_Roll');roll.rotation.z=Math.PI/2;for(const side of [-1,1]){const pts=[];for(let k=0;k<=150;k++){const a=k*.14,r=6+k*.34;pts.push([side*141,Math.cos(a)*r,Math.sin(a)*r]);}pipe(towel,pts,1.4,mat(0xd9d8d0),'Towel_Spiral');}}
 return g;
}
function place(n){const t=n.t,g=new THREE.Group();g.name='Furniture_Figma_'+n.id.replace(':','_');g.position.set(t[0][0]*n.width/2+t[0][1]*n.height/2+t[0][2]-14239,0,-(t[1][0]*n.width/2+t[1][1]*n.height/2+t[1][2]-8200));return g;}
export function studyFurniture(n){if(n.id==='196:369'){const g=place(n);const body=buildStudyCabinet(n.width,n.height);const t=n.t;body.applyMatrix4(new THREE.Matrix4().set(t[0][0],0,t[0][1],0,0,1,0,0,-t[1][0],0,-t[1][1],0,0,0,0,1));g.add(body);g.userData.reference=STUDY_REFERENCE;return g;}
 if(n.id==='196:278'){const g=place(n),bed=buildStudyBed(n.height,n.width);bed.rotation.y=Math.PI/2;g.add(bed);return g;}
 if(['196:279','196:283','196:284'].includes(n.id)){const g=place(n);g.userData.replacedBy='196:278 / detailed bedding';return g;}return null;
}
export function addStudyDetails(root){const g=new THREE.Group();g.name='Furniture_Study_PhotoDetails';root.add(g);const lamp=buildStudyLamp();lamp.position.set(12490,0,-5540);lamp.rotation.y=-.7;g.add(lamp);
 // Paint on the inside of the existing head wall; does not change its footprint.
 const paint=add(g,new THREE.PlaneGeometry(1740,2800),turquoise,[12306.6,1400,-4656],'AccentPaint');paint.rotation.y=Math.PI/2;paint.castShadow=false;
 const trim=box(g,8,70,1740,12309,35,-4656,mat(0x838985),'Skirting');
 // Gathered curtain at the left jamb of the existing study window.
 const cloth=textile(false);cloth.side=THREE.DoubleSide;const geo=new THREE.PlaneGeometry(380,2060,32,50),p=geo.attributes.position;
 for(let i=0;i<p.count;i++){let x=p.getX(i),y=p.getY(i);const k=1-.65*Math.exp(-Math.pow((y+210)/300,2));p.setXYZ(i,x*k,y,Math.sin(x*.115)*17+Math.sin(y*.006)*8);}geo.computeVertexNormals();add(g,geo,cloth,[12535,1530,-3880],'Curtain');pipe(g,[[12445,1290,-3852],[12535,1275,-3835],[12625,1290,-3852]],5,white,'Curtain_Tie');
 g.userData.reference=STUDY_REFERENCE;return g;
}
export function buildStudyDisplay(mode='room'){if(mode==='cabinet')return buildStudyCabinet();if(mode==='lamp')return buildStudyLamp();if(mode==='bed')return buildStudyBed();
 const g=new THREE.Group();g.name='Study_Photo_Corner';const cabinet=buildStudyCabinet();cabinet.position.set(-1090,0,-860);g.add(cabinet);const lamp=buildStudyLamp();lamp.position.set(-680,0,-940);g.add(lamp);const bed=buildStudyBed();bed.position.set(190,0,-85);g.add(bed);
 const backdrop=new THREE.Group();backdrop.name='Study_Backdrop';g.add(backdrop);
 const wall=(w,x,c)=>{const m=mat(c,.94);const panel=add(backdrop,new THREE.PlaneGeometry(w,2200),m,[x,1100,-1050],'Backdrop');panel.castShadow=false;return panel;};wall(920,-1080,0xe4e6df);wall(1490,125,0x168e91);
 const tile=finish(mat(0xb5ada0),'tile',4);const floor=box(backdrop,2750,30,2350,-160,-17,70,tile,'DisplayFloor');floor.receiveShadow=true;
 const border=mat(0x383e41,.6);for(const z of [-1060,1070])box(backdrop,34,2180,35,925,1090,z,border,'WindowJamb');for(const y of [100,980,2160])box(backdrop,34,35,2130,925,y,5,border,'WindowRail');box(backdrop,34,2060,28,925,1120,180,border,'WindowMullion');
 const glass=new THREE.MeshPhysicalMaterial({color:0xbad3d6,roughness:.17,transparent:true,opacity:.13,depthWrite:false,side:THREE.DoubleSide});box(backdrop,5,2020,2090,925,1130,0,glass,'WindowGlass');
 const cloth=textile(false);cloth.side=THREE.DoubleSide;const geo=new THREE.PlaneGeometry(430,2000,35,48),p=geo.attributes.position;for(let i=0;i<p.count;i++){const x=p.getX(i),y=p.getY(i),tight=1-.66*Math.exp(-Math.pow((y+180)/300,2));p.setXYZ(i,x*tight,y,Math.sin(x*.1)*18);}geo.computeVertexNormals();const curtain=add(backdrop,geo,cloth,[900,1140,-720],'DisplayCurtain');curtain.rotation.y=-Math.PI/2;
 return g;
}
