import * as THREE from 'three';
import {RoundedBoxGeometry} from 'three/addons/geometries/RoundedBoxGeometry.js';
import {finish} from './surface-materials.js?v=step5-2';
const mat=(color,roughness=.6,metalness=0)=>new THREE.MeshStandardMaterial({color,roughness,metalness});
const white=mat(0xeeeeea,.52), seam=mat(0x444747,.75), steel=mat(0x9da4aa,.32,.75), dark=mat(0x22292b,.4), stone=finish(mat(0xded9c6),'stone',2), wood=finish(mat(0x777c80),'wood',4);
function box(g,w,h,d,x,y,z,m,name,r=0){const o=new THREE.Mesh(r?new RoundedBoxGeometry(w,h,d,3,r):new THREE.BoxGeometry(w,h,d),m);o.position.set(x,y,z);o.name='Furniture_'+name;g.add(o);return o;}
function pipe(g,points,r,m,name){const curve=new THREE.CatmullRomCurve3(points.map(p=>new THREE.Vector3(...p)),false,'centripetal');const o=new THREE.Mesh(new THREE.TubeGeometry(curve,Math.max(16,points.length*8),r,8,false),m);o.name='Furniture_'+name;g.add(o);return o;}
function line(g,a,b,r,m,name){const av=new THREE.Vector3(...a),bv=new THREE.Vector3(...b),o=new THREE.Mesh(new THREE.CylinderGeometry(r,r,av.distanceTo(bv),10),m);o.position.copy(av).add(bv).multiplyScalar(.5);o.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0),bv.sub(av).normalize());o.name='Furniture_'+name;g.add(o);return o;}
function place(n){const g=new THREE.Group(),t=n.t;g.name='Furniture_Figma_'+n.id.replace(':','_');g.position.set(t[0][0]*n.width/2+t[0][1]*n.height/2+t[0][2]-14239,0,-(t[1][0]*n.width/2+t[1][1]*n.height/2+t[1][2]-8200));g.rotation.y=Math.atan2(t[1][0],t[0][0]);g.userData.photoApproximation=true;return g;}
// Local photo materials: subdued vertical grain and fine brushed-metal roughness.
function photoSurface(kind){const c=document.createElement('canvas');c.width=256;c.height=512;const ctx=c.getContext('2d'),im=ctx.createImageData(c.width,c.height);for(let y=0;y<c.height;y++)for(let x=0;x<c.width;x++){const hash=Math.sin(x*71.3+y*.171)*15271.91,noise=hash-Math.floor(hash);let v;if(kind==='metal')v=215+noise*15+5*Math.sin(x*.025);else{const grain=Math.sin(x*.51+Math.sin(y*.009)*1.7)+.5*Math.sin(x*1.73+y*.003);v=182+grain*9+noise*7+12*Math.sin(x*.063+y*.0007);}const i=(y*c.width+x)*4;im.data[i]=im.data[i+1]=im.data[i+2]=v;im.data[i+3]=255;}ctx.putImageData(im,0,0);const t=new THREE.CanvasTexture(c);t.colorSpace=THREE.SRGBColorSpace;t.wrapS=t.wrapT=THREE.RepeatWrapping;t.anisotropy=4;return t;}
wood.map=photoSurface('wood');wood.bumpMap=wood.map;wood.bumpScale=.15;wood.roughness=.76;
function sticker(g,w,h,x,y,z,style){const c=document.createElement('canvas');c.width=256;c.height=160;const ctx=c.getContext('2d');ctx.fillStyle=style==='linear'?'#d8dad3':'#e7e8df';ctx.fillRect(0,0,256,160);if(style==='linear'){ctx.fillStyle='#9b3934';ctx.fillRect(0,0,256,53);ctx.fillStyle='white';ctx.font='bold 27px sans-serif';ctx.fillText('LINEAR',18,37);ctx.fillStyle='#70777a';for(let i=0;i<4;i++)ctx.fillRect(20,75+i*17,160-i*20,4);}else if(style==='warranty'){ctx.fillStyle='#303b42';ctx.font='bold 90px sans-serif';ctx.fillText('10',65,106);ctx.fillRect(20,124,216,3);}else{ctx.fillStyle=style==='energy'?'#ac3934':'#347b9e';ctx.fillRect(0,0,256,45);for(let i=0;i<5;i++){ctx.fillStyle=style==='energy'?['#5a9065','#86a65f','#d6bc59','#c89045','#ad5944'][i]:'#758690';ctx.fillRect(25,60+i*17,110+i*17,9);}}const texture=new THREE.CanvasTexture(c);texture.colorSpace=THREE.SRGBColorSpace;const m=new THREE.MeshStandardMaterial({map:texture,roughness:.65});box(g,w,h,1,x,y,z,m,'Fridge_PhotoLabel_'+style);}
function wardrobe(n){const g=place(n),rotated=n.id==='196:328',w=rotated?n.height:n.width,d=rotated?n.width:n.height,h=1810;const body=new THREE.Group();if(rotated)body.rotation.y=-Math.PI/2;g.add(body);
 box(body,w,h-85,d,0,(h+85)/2,0,white,'Wardrobe_Carcass');box(body,w-32,85,d-34,0,42.5,0,white,'Wardrobe_Plinth');box(body,w-28,h-110,3,0,(h+75)/2,d/2+2,seam,'Wardrobe_DoorGaps');
 for(let i=0;i<3;i++){const x=-w/2+(i+.5)*w/3;box(body,w/3-4,h-102,18,x,(h+88)/2,d/2+8,white,'Wardrobe_Door_'+i,1.5);const hx=x+(i===0?1:-1)*(w/6-30);line(body,[hx,900,d/2+37],[hx,1028,d/2+37],4,steel,'Wardrobe_Handle');for(const y of [900,1028])line(body,[hx,y,d/2+17],[hx,y,d/2+37],4,steel,'Wardrobe_HandleMount');}
 g.userData.design='Photo-matched three-door white wardrobe; exact IKEA model unconfirmed; Figma footprint preserved; height estimated 1810 mm';return g;
}
export function clothesRack(){const g=new THREE.Group();g.name='Furniture_MULIG_ClothesRack';// Figma rail 173:52: same wall as wardrobe 196:348.
 g.position.set(8919.342,0,-7546.41);const x=477,r=12;
 pipe(g,[[-x,90,0],[-x,1390,0],[-465,1470,0],[-420,1508,0],[420,1508,0],[465,1470,0],[x,1390,0],[x,90,0]],r,white,'MULIG_Rail');
 for(const s of [-1,1]){pipe(g,[[s*x,12,-218],[s*x,65,-205],[s*x,88,-160],[s*x,88,160],[s*x,65,205],[s*x,12,218]],12,white,'MULIG_Foot');for(const z of [-218,218])box(g,30,8,32,s*x,6,z,mat(0xdadbd7),'MULIG_FootCap',3);}
 line(g,[-x,95,0],[x,95,0],10,white,'MULIG_Base');
 pipe(g,[[200,1493,0],[195,1535,0],[165,1530,0],[164,1496,0],[183,1475,0],[183,1435,0]],4,dark,'Hanger_Hook');
 line(g,[183,1435,0],[-15,1320,0],5,dark,'Hanger');line(g,[-15,1320,0],[380,1320,0],5,dark,'Hanger');line(g,[380,1320,0],[183,1435,0],5,dark,'Hanger');
 g.userData.reference={source:'173:52',product:'IKEA MULIG 801.794.33',width_mm:990,depth_mm:460,height_mm:1520,placement:'same back-wall line as wardrobe, side gap 80 mm'};return g;
}
function cabinet(n){const g=place(n),ret=n.id==='196:203',w=ret?n.height:n.width,d=ret?n.width:n.height;const b=new THREE.Group();if(ret)b.rotation.y=Math.PI/2;g.add(b);
 if(ret){for(const x of [-w/2+9,w/2-9])box(b,18,755,d-30,x,457.5,-15,white,'Kitchen_CarcassSide');box(b,w,18,d-30,0,89,-15,white,'Kitchen_CarcassBottom');box(b,w,755,18,0,457.5,-d/2+9,white,'Kitchen_CarcassBack');}else box(b,w,755,d-30,0,457.5,-15,white,'Kitchen_Carcass');box(b,w-20,80,d-100,0,40,-20,mat(0xc8c7c0),'Kitchen_ToeKick');box(b,w-8,720,4,0,460,d/2-16,seam,'Kitchen_DoorGaps');
 const count=ret?3:5;for(let i=0;i<count;i++){const x=-w/2+(i+.5)*w/count;box(b,w/count-4,714,18,x,461,d/2-6,white,'Kitchen_BaseDoor_'+i,1);if(!ret&&i===1){box(b,w/count-44,400,25,x,475,d/2+7,steel,'Microwave_Frame',3);box(b,w/count-85,305,6,x-10,475,d/2+24,dark,'Microwave_Glass',3);box(b,14,250,16,x+w/count*.36,475,d/2+32,steel,'Microwave_Handle',3);}}
 if(ret){const sx=-398.16,hw=368,hd=357;box(b,sx-hw/2+w/2,35,d,-w/2+(sx-hw/2+w/2)/2,852.5,0,stone,'Counter_SinkLeft');box(b,w/2-sx-hw/2,35,d,(sx+hw/2+w/2)/2,852.5,0,stone,'Counter_SinkRight');for(const z of [-1,1])box(b,hw,35,(d-hd)/2,sx,852.5,z*(hd/2+(d-hd)/4),stone,'Counter_SinkRim');}
 else box(b,w+6,35,d+24,0,852.5,0,stone,'Kitchen_Counter',3);
 if(!ret){const back=-d/2;box(b,w,700,12,0,1220,back+7,mat(0xd4cec0,.68),'Kitchen_Backsplash');
  const uw=w,ux=-w/2+uw/2;box(b,uw,660,584,ux,2470,back+292,white,'Kitchen_UpperWhite');box(b,w,535,292,0,1852.5,back+146,wood,'Kitchen_UpperWood');
  for(let i=1;i<5;i++)box(b,3,648,2,ux-uw/2+i*uw/5,2470,back+585,seam,'Kitchen_UpperWhiteJoint');
  for(let i=1;i<6;i++)box(b,3,520,2,-w/2+i*w/6,1852.5,back+293,seam,'Kitchen_UpperWoodJoint');
  for(const x of [-w*.38,w*.28]){box(b,110,80,12,x,1450,back+20,white,'Kitchen_Socket');for(const q of [-22,22]){box(b,5,15,2,x+q,1450,back+27,dark,'Kitchen_SocketPin');box(b,5,10,2,x+q+9,1466,back+27,dark,'Kitchen_SocketPin');}}
  const kettle=new THREE.Mesh(new THREE.CylinderGeometry(67,79,190,28),steel);kettle.position.set(w*.31,975,70);kettle.name='Furniture_Kettle';b.add(kettle);const lid=new THREE.Mesh(new THREE.CylinderGeometry(64,64,10,28),dark);lid.position.set(w*.31,1074,70);lid.name='Furniture_KettleLid';b.add(lid);pipe(b,[[w*.31-58,1000,70],[w*.31-94,1032,70],[w*.31-100,1050,70]],15,steel,'Kettle_Spout');box(b,170,20,160,w*.31,880,70,dark,'Kettle_Base',8);pipe(b,[[w*.31+62,1040,70],[w*.31+110,1040,70],[w*.31+116,910,70],[w*.31+65,910,70]],13,dark,'Kettle_Handle');
  const dx=-650;const beige=mat(0xb8a993,.6);box(b,420,180,345,dx,960,25,beige,'DishDryer_Base',24);box(b,412,180,337,dx,1140,25,new THREE.MeshPhysicalMaterial({color:0xb5c0c3,roughness:.28,transparent:true,opacity:.64,depthWrite:false}), 'DishDryer_Dome',55);box(b,65,30,8,dx,927,201,dark,'DishDryer_Handle',5);box(b,25,35,4,dx+90,1024,200,dark,'DishDryer_Control',3);for(let i=0;i<5;i++)box(b,240,3,2,dx,912+i*8,199,mat(0x8c8172),'DishDryer_Vent');
 }
 return g;
}
export function buildFridge(w=639.153,d=696.432){d-=45;const g=new THREE.Group(),h=1740;g.name='Furniture_Refrigerator';const shell=mat(0x666f76,.38,.6),face=mat(0xa0a7aa,.34,.72);face.roughnessMap=photoSurface('metal');box(g,w,h-55,d-35,0,(h+55)/2,-17.5,shell,'Fridge_Cabinet',9);
 box(g,w-14,1015,46,0,562.5,d/2-6,face,'Fridge_LowerDoor',13);box(g,w-14,641,46,0,1407.5,d/2-6,face,'Fridge_FreezerDoor',13);
 const grip=new THREE.Shape();grip.moveTo(-w/2+16,1106);grip.quadraticCurveTo(0,1051,w/2-16,1106);grip.lineTo(w/2-16,1080);grip.quadraticCurveTo(0,1025,-w/2+16,1080);grip.closePath();const gripMesh=new THREE.Mesh(new THREE.ExtrudeGeometry(grip,{depth:12,bevelEnabled:true,bevelThickness:2,bevelSize:2,bevelSegments:2,steps:1}),dark);gripMesh.position.z=d/2+19;gripMesh.name='Furniture_Fridge_CurvedRecess';g.add(gripMesh);
 pipe(g,[[-w/2+32,1078,d/2+31],[-w*.26,1059,d/2+33],[0,1053,d/2+33],[w*.26,1059,d/2+33],[w/2-32,1078,d/2+31]],3,shell,'Fridge_GripLip');
 for(const x of [-w*.35,w*.35])for(const z of [-d*.35,d*.35])box(g,45,50,45,x,25,z,dark,'Fridge_Foot',5);
 // Visible sticker layout, with no invented logo or model number.
 sticker(g,74,74,-w*.28,1620,d/2+18,'blue');sticker(g,46,88,w*.32,1470,d/2+18,'warranty');sticker(g,46,110,w*.32,1345,d/2+18,'energy');sticker(g,w*.64,85,0,1185,d/2+18,'linear');sticker(g,49,42,w*.03,1600,d/2+18,'blue');sticker(g,47,37,-w*.23,1470,d/2+18,'blue');

 box(g,w-54,430,5,0,345,-d/2-1,mat(0x34393b),'Fridge_RearPanel');for(let y=180;y<440;y+=22)box(g,w-100,5,8,0,y,-d/2-5,dark,'Fridge_RearVent');
 g.userData.reference='Photo 148:268: silver top-freezer refrigerator; brand/model unverified, dimensions from plan with estimated 1740 mm height';return g;
}
export function roomPhotoFurniture(n){
 if(['196:328','196:348'].includes(n.id))return wardrobe(n);
 if(['196:203','196:204'].includes(n.id))return cabinet(n);
 if(n.id==='214:4'){const g=place(n);const fridge=buildFridge(n.width,n.height);fridge.traverse(o=>{if(o.isMesh&&o.name.startsWith('Furniture_Fridge_PhotoLabel')){o.material.map=o.material.map.clone();o.material.map.repeat.x=-1;o.material.map.offset.x=1;}});g.add(fridge);const board=18,clearance=25,enclosureWidth=n.width+2*(board+clearance);for(const side of [-1,1])box(g,board,2800,n.height+28,side*(n.width/2+clearance+board/2),1400,0,white,'Kitchen_FridgeEnclosure_'+(side<0?'Left':'Right'));box(g,enclosureWidth,660,n.height+28,0,2470,0,white,'Kitchen_OverFridgeCabinet');g.userData.enclosure={panels:2,height_mm:2800,thickness_mm:board,sideClearance_mm:clearance,fridgeTopGap_mm:400,status:'Estimated from user photo annotation'};box(g,3,646,2,0,2470,n.height/2+15,seam,'Kitchen_OverFridgeJoint');return g;}
 // This rectangle is inside the refrigerator footprint, not another visible base cabinet.
 if(n.id==='214:5'||n.id==='196:243'){const g=place(n);g.userData.replacedBy=n.id==='214:5'?'214:4':'196:242';return g;}
 if(n.id==='196:234'){const g=place(n);box(g,n.width,10,n.height,0,876,0,dark,'Hob_Glass',7);for(const x of [-n.width*.25,n.width*.25]){const ring=new THREE.Mesh(new THREE.TorusGeometry(102,1.4,6,64),mat(0x777e81));ring.rotation.x=Math.PI/2;ring.position.set(x,882,0);ring.name='Furniture_Hob_Ring';g.add(ring);}return g;}
 if(n.id==='196:238'){const g=place(n);box(g,n.width,170,n.height,0,1690,0,wood,'Hood_Fascia');box(g,n.width,45,n.height+65,0,1587,25,steel,'Hood_StainlessLip',3);box(g,n.width-50,5,n.height-20,0,1563,20,dark,'Hood_Filter');return g;}
 if(n.id==='196:242'){const g=place(n),w=n.width,d=n.height;for(const x of [-1,1]){box(g,18,12,d,x*(w/2-9),870,0,steel,'Sink_Rim');box(g,5,150,d-36,x*(w/2-20),792,0,steel,'Sink_InnerWall');}for(const z of [-1,1]){box(g,w-36,12,18,0,870,z*(d/2-9),steel,'Sink_Rim');box(g,w-36,150,5,0,792,z*(d/2-20),steel,'Sink_InnerWall');}box(g,w-36,5,d-36,0,718,0,steel,'Sink_Bottom',3);const drain=new THREE.Mesh(new THREE.CylinderGeometry(23,23,3,24),dark);drain.position.set(0,722,0);drain.name='Furniture_Sink_Drain';g.add(drain);pipe(g,[[-w/2+25,885,0],[-w/2+25,1110,0],[-w/2+5,1170,0],[0,1178,0],[45,1140,0],[45,1080,0]],11,steel,'Sink_Tap');return g;}
 if(n.id==='196:245'){const g=place(n);box(g,260,395,330,0,1067,0,white,'Water_Dispenser',22);const face=new THREE.Mesh(new THREE.CylinderGeometry(85,85,12,48),dark);face.rotation.z=Math.PI/2;face.position.set(136,1140,0);face.name='Furniture_WaterDispenser_CircularFace';g.add(face);for(let i=0;i<7;i++)box(g,2,4,170,131,943+i*11,0,seam,'WaterDispenser_Vent');box(g,120,6,285,0,1267,0,mat(0xae9ea8),'WaterDispenser_Top');box(g,50,55,90,150,935,0,seam,'Water_Dispenser_DripTray',5);return g;}
 return null;
}
