import {studyFurniture,addStudyDetails,STUDY_REFERENCE} from './study-model.js?v=step5-2';
import {roomPhotoFurniture,clothesRack} from './room-photo-models.js?v=step5-2';
import {buildPassThrough,breakfastFurniture} from './breakfast-model.js?v=fix-2';
import {buildNyhamn} from './nyhamn-model.js';
// Step 2: photo-matched fixtures, curtains and upgraded boxes (see photo-additions.js).
import {photoUpgrade,addPhotoAdditions} from './photo-additions.js?v=fix-5';
import * as THREE from 'three';
import {RoundedBoxGeometry} from 'three/addons/geometries/RoundedBoxGeometry.js';
import {finish,tileFloor,ensureSurfaceUV} from './surface-materials.js?v=step5-2';

// The source is already calibrated: Figma coordinates are millimetres.
// Architectural heights are inherited estimates, not measured dimensions.
const HEIGHT = 2800, SILL = 860, HEAD = 2140;
const windowHeights=w=>w.sill!==undefined?{sill:w.sill,head:w.head}:w.id==='147:12'?{sill:900,head:2580}:{sill:SILL,head:HEAD};
const wallMaterial = new THREE.MeshStandardMaterial({color:0xeceeef,roughness:0.9,side:THREE.DoubleSide}); // Phase 2: cool light grey-white from the photos (was warm 0xf5f4f0)
const frameMaterial = new THREE.MeshStandardMaterial({color:0x2b2b2b,roughness:0.65});
const glassMaterial = new THREE.MeshStandardMaterial({color:0xdcebf0,transparent:true,opacity:0.14,roughness:0.05,depthWrite:false,side:THREE.DoubleSide}); // Phase 2: clearer glass so the view reads like the photos (was 0xb9dbe8 @ 0.25)

function polygons(w, frame) {
  const result=[];
  for(const path of [...w.fillGeometry,...w.strokeGeometry]) {
    let poly=[];
    for(const token of path.data.matchAll(/([MLZ])(?:\s*([-+\d.eE]+)\s+([-+\d.eE]+))?/g)) {
      if(token[1]==='Z') {if(poly.length>2) result.push(poly);poly=[];continue;}
      if(token[1]==='M'&&poly.length>2){result.push(poly);poly=[];}
      const x=Number(token[2]),y=Number(token[3]),t=w.transform;
      const p=[t[0][0]*x+t[0][1]*y+t[0][2]-frame.transform[0][2],t[1][0]*x+t[1][1]*y+t[1][2]-frame.transform[1][2]];
      if(!poly.length||Math.hypot(p[0]-poly.at(-1)[0],p[1]-poly.at(-1)[1])>0.00001)poly.push(p);
    }
    if(poly.length>2)result.push(poly);
  }
  return result;
}

function clip(poly, axis, limit, inside=true) {
  const out=[];
  for(let i=0;i<poly.length;i++) {
    const a=poly[i],b=poly[(i+1)%poly.length];
    const da=a[0]*axis[0]+a[1]*axis[1]-limit,db=b[0]*axis[0]+b[1]*axis[1]-limit;
    const ia=inside?da>=0:da<=0,ib=inside?db>=0:db<=0;
    if(ia)out.push(a);
    if(ia!==ib){const t=da/(da-db);out.push([a[0]+t*(b[0]-a[0]),a[1]+t*(b[1]-a[1])]);}
  }
  return out;
}

function subtractOpening(poly, opening) {
  const {a,b}=opening,dx=b[0]-a[0],dy=b[1]-a[1],l=Math.hypot(dx,dy),u=[dx/l,dy/l],v=[-u[1],u[0]];
  const dot=(p,n)=>p[0]*n[0]+p[1]*n[1];
  // Cut the true wall polygons by four half-planes; never turn a wall AABB into geometry.
  const planes=[[u,dot(a,u)+20],[[ -u[0],-u[1]],-dot(b,u)+20],[v,dot(a,v)-300],[[-v[0],-v[1]],-dot(a,v)-300]];
  const outside=[];let remainder=poly;
  for(const [axis,limit] of planes){const part=clip(remainder,axis,limit,false);if(part.length>2)outside.push(part);remainder=clip(remainder,axis,limit);if(remainder.length<3)break;}
  return outside;
}

function extrude(poly,bottom,height,material=wallMaterial) {
  const shape=new THREE.Shape(poly.map(p=>new THREE.Vector2(...p)));
  const geometry=new THREE.ExtrudeGeometry(shape,{depth:height,bevelEnabled:false,steps:1});
  geometry.rotateX(-Math.PI/2);geometry.translate(0,bottom,0);
  return new THREE.Mesh(geometry,material);
}

function boxBetween(a,b,height,bottom,thickness,material,name) {
  const dx=b[0]-a[0],dy=b[1]-a[1],length=Math.hypot(dx,dy);
  const mesh=new THREE.Mesh(new THREE.BoxGeometry(length,height,thickness),material);
  mesh.position.set((a[0]+b[0])/2,bottom+height/2,-(a[1]+b[1])/2);
  mesh.rotation.y=Math.atan2(dy,dx);mesh.name=name;return mesh;
}

function placeLounge(legacy,root,layout) {
  for(const [prefix,id,oldCenter,oldWidth,oldDepth] of [
    ['Lounge_Sofa_Charcoal_','158:8',[7545.693075987241,-5048.074399427127],2000,970],
    ['Lounge_Sofa_Tan_','158:3',[6267.075549568752,-6466.960307855096],1460,800],
    ['Lounge_CoffeeTable_A_','158:13',[6851.862022430703,-5122.819982506959],600,600]
  ]) {
    const ref=layout.lounge.find(n=>n.id===id),t=ref.transform;
    const cx=t[0][0]*ref.width/2+t[0][1]*ref.height/2+t[0][2]-14239;
    const cy=t[1][0]*ref.width/2+t[1][1]*ref.height/2+t[1][2]-8200;
    if(prefix==='Lounge_Sofa_Charcoal_'){const sofa=buildNyhamn();sofa.position.set(cx,0,-cy);sofa.rotation.y=Math.atan2(t[1][0],t[0][0]);root.add(sofa);continue;}
    const parts=[];legacy.traverse(n=>{if(n.isMesh&&n.name.startsWith(prefix))parts.push(n);});
    const base=parts.find(n=>n.name.endsWith('_Base')||n.name.endsWith('_Top'));
    if(!base)continue;
    const oldAngle=base.rotation.y,newAngle=Math.atan2(t[1][0],t[0][0]);
    const registration=new THREE.Group();registration.position.set(cx,0,-cy);registration.rotation.y=newAngle-oldAngle;
    // Source dimensions scale the existing furniture, while heights stay in mm.
    const oldLocal=new THREE.Group();oldLocal.rotation.y=oldAngle;oldLocal.scale.set(ref.width/oldWidth,1,ref.height/oldDepth);
    const undo=new THREE.Group();undo.rotation.y=-oldAngle;oldLocal.add(undo);registration.add(oldLocal);root.add(registration);
    for(const n of parts){if((prefix.includes('Charcoal')||prefix.includes('Tan'))&&!n.name.includes('_Leg_')){const dims=n.scale.clone();n.geometry=new RoundedBoxGeometry(dims.x,dims.y,dims.z,4,Math.min(45,dims.y*.22,dims.z*.22));n.scale.set(1,1,1);}n.geometry=ensureSurfaceUV(n.geometry);if(!n.geometry.getAttribute('normal'))n.geometry.computeVertexNormals();if(prefix.includes('Charcoal'))n.material=new THREE.MeshStandardMaterial({color:0x454b56,roughness:0.95});else if(prefix.includes('Tan'))n.material=new THREE.MeshStandardMaterial({color:n.name.includes('_Leg_')?0xdac6a5:0x8c6239,roughness:0.95});if(prefix.includes('Coffee'))n.material=new THREE.MeshStandardMaterial({color:n.name.endsWith('_Top')?0xe7e4df:0xf7f7f5,roughness:0.85});if(prefix.includes('Charcoal')||prefix.includes('Tan')){if(!n.name.includes('_Leg_'))finish(n.material,'fabric',28);else finish(n.material,'wood',2);}else if(n.name.endsWith('_Top'))finish(n.material,'stone',2);legacy.remove(n);n.position.x-=oldCenter[0];n.position.z-=oldCenter[1];undo.add(n);}
  }
}

function nearestWallThickness(point,source) {
  let nearest=Infinity,thickness=180;
  for(const wall of source.walls){
    if(wall.strokeWeight<50)continue;
    for(const poly of polygons(wall,source.frame))for(let i=0;i<poly.length;i++){
      const a=poly[i],b=poly[(i+1)%poly.length],dx=b[0]-a[0],dy=b[1]-a[1],length2=dx*dx+dy*dy;
      const t=length2?THREE.MathUtils.clamp(((point[0]-a[0])*dx+(point[1]-a[1])*dy)/length2,0,1):0;
      const distance=Math.hypot(point[0]-a[0]-t*dx,point[1]-a[1]-t*dy);
      if(distance<nearest){nearest=distance;thickness=wall.strokeWeight;}
    }
  }
  return thickness;
}

// Fixed closed-door tips from the opposite endpoint of Figma swing arcs 135:63–83.
// Source leaf vectors depict open poses, not the wall opening. Coordinates are mm.
const CLOSED_DOOR_TIPS = {"135:62": [6150, 7836.206604003906], "135:64": [7908.62109375, 6037.9359130859375], "135:66": [5945.490905761719, 8808.801452636719], "135:68": [5046.634765625, 10258.207702636719], "135:70": [10388.79296875, 8022.4136962890625], "135:72": [9383.6171875, 13033.430949868496], "135:74": [4046.652571901981, 11909.859375], "135:76": [4046.6538009643555, 11258.189544677734], "135:80": [16585.708038330078, 5561.677734375], "135:82": [11248.74690246582, 14943.50390625]};

export async function currentModel(loader) {
  const [legacy,source,layout,furniture]=await Promise.all([
    loader.loadAsync('./panorama-base-148.glb?v=preserved-furniture'),
    fetch('./current-wall-repair/current-figma-walls.json').then(r=>r.json()),
    fetch('./current-layout.json?v=bath1-window-1').then(r=>r.json()),
    fetch('./furniture-source.json').then(r=>r.json())
  ]);
  const root=new THREE.Group();root.name='Scene';let wallCount=0;const doorHeaderChecks=[];
  for(const w of source.walls){
    const group=new THREE.Group();group.name='Wall_Figma_'+w.id.replace(':','_');root.add(group);
    for(const poly of polygons(w,source.frame)){
      const levels=[...new Set([0,HEIGHT,...layout.windows.flatMap(w=>Object.values(windowHeights(w)))])].sort((a,b)=>a-b);
      for(let i=0;i<levels.length-1;i++){
        const bottom=levels[i],top=levels[i+1],mid=(bottom+top)/2;let pieces=[poly];
        for(const opening of layout.windows){const h=windowHeights(opening);if(mid>h.sill&&mid<h.head)pieces=pieces.flatMap(p=>subtractOpening(p,opening));}
        for(const piece of pieces)group.add(extrude(piece,bottom,top-bottom));
      }
    }
    wallCount++;
  }
  for(const w of layout.windows){
    const group=new THREE.Group();group.name='Window_Figma_'+w.id.replace(':','_');root.add(group);
    if(w.id==='135:78'){
      // Figma's arc describes a casement WINDOW, confirmed by photo 148:277.
      // Existing wall jambs: x=7607.935..8360.858. Bridge only that original gap.
      const a=w.a,b=w.b,{sill,head}=windowHeights(w),width=b[0]-a[0],cx=(a[0]+b[0])/2,z=-a[1],thickness=186.207;
      const lower=boxBetween([7607.935,3336.207],[8360.858,3336.207],sill,0,thickness,wallMaterial,'Bath1_Window_LowerWall');group.add(lower);
      const upper=boxBetween([7607.935,3336.207],[8360.858,3336.207],HEIGHT-head,head,thickness,wallMaterial,'Bath1_Window_UpperWall');group.add(upper);
      for(const [x1,x2] of [[7607.935,a[0]],[b[0],8360.858]])group.add(boxBetween([x1,3336.207],[x2,3336.207],head-sill,sill,thickness,wallMaterial,'Bath1_Window_Reveal'));
      const add=(sx,sy,sz,x,y,d,material,name)=>{const o=new THREE.Mesh(new THREE.BoxGeometry(sx,sy,sz),material);o.position.set(x,y,z+d);o.name='Bath1_Window_'+name;group.add(o);return o;};
      const frame=new THREE.MeshStandardMaterial({color:0x242a2d,roughness:.48,metalness:.45});
      for(const x of [a[0]+20,b[0]-20])add(40,head-sill,65,x,(sill+head)/2,0,frame,'OuterJamb');
      for(const y of [sill+20,head-20])add(width,40,65,cx,y,0,frame,'OuterRail');
      for(const x of [a[0]+53,b[0]-53])add(26,head-sill-80,35,x,(sill+head)/2,-12,frame,'CasementJamb');
      for(const y of [sill+53,head-53])add(width-80,26,35,cx,y,-12,frame,'CasementRail');
      const privacy=new THREE.MeshStandardMaterial({color:0xd4e5df,roughness:.76,transparent:true,opacity:.92,depthWrite:false,side:THREE.DoubleSide});privacy.userData.keepOpacity=true;
      const pane=add(width-132,head-sill-132,9,cx,(sill+head)/2,-12,privacy,'PrivacyGlass');
      add(13,100,20,b[0]-53,(sill+head)/2,-43,frame,'Handle');
      for(const y of [sill+160,head-160])add(17,65,18,a[0]+52,y,-37,frame,'Hinge');
      add(width+24,22,thickness+32,cx,sill-11,0,new THREE.MeshStandardMaterial({color:0xbdbab1,roughness:.7}),'SillLedge');
      root.updateMatrixWorld(true);
      const rays={};for(const [label,y,objects] of [['below',600,[lower]],['above',2620,[upper]],['glass',1700,[pane]]])rays[label]=new THREE.Raycaster(new THREE.Vector3(cx,y,z+400),new THREE.Vector3(0,0,-1),0,800).intersectObjects(objects,false).length;
      const openingClear=new THREE.Raycaster(new THREE.Vector3(cx,1700,z+400),new THREE.Vector3(0,0,-1),0,800).intersectObjects([lower,upper],false).length===0;
      group.userData.correction={from:'door',to:'window',source:'135:78 / photo 148:277 / user correction',width_mm:width,sill_mm:sill,head_mm:head,wallThickness_mm:thickness,heightsEstimated:true,rays,openingClear};
      if(!rays.below||!rays.above||!rays.glass||!openingClear)throw new Error('Bath 1 window infill validation failed');
      continue;
    }
    if(w.id==='147:12'){
      group.add(buildPassThrough(w));group.add(boxBetween(w.a,w.b,900,0,134.829,wallMaterial,'Estimated_Sill'));
      group.add(boxBetween(w.a,w.b,HEIGHT-2580,2580,134.829,wallMaterial,'Estimated_Head'));continue;
    }
    let fixedSpan=w;
    if(w.id==='166:322'){
      // Door 135:80 occupies the start of this window band in the source plan.
      // Stop its fixed glass, sill and lower rail at the door jamb, not across the passage.
      const dx=w.b[0]-w.a[0],dy=w.b[1]-w.a[1],length=Math.hypot(dx,dy),u=[dx/length,dy/length],tip=CLOSED_DOOR_TIPS['135:80'];
      const cut=THREE.MathUtils.clamp((tip[0]-w.a[0])*u[0]+(tip[1]-w.a[1])*u[1]+20,0,length);
      fixedSpan={...w,a:[w.a[0]+u[0]*cut,w.a[1]+u[1]*cut]};
      group.userData.doorOpening={door:'135:80',removedFixedSpan_mm:cut,remainingFixedSpan_mm:length-cut};
    }
    group.add(boxBetween(fixedSpan.a,fixedSpan.b,HEAD-SILL-40,SILL+20,12,glassMaterial,'Glass'));
    group.add(boxBetween(fixedSpan.a,fixedSpan.b,SILL,0,134.829,wallMaterial,'Estimated_Sill'));
    group.add(boxBetween(w.a,w.b,HEIGHT-HEAD,HEAD,134.829,wallMaterial,'Estimated_Head'));
    for(const y of [SILL,HEAD-40])group.add(boxBetween(y===SILL?fixedSpan.a:w.a,w.b,40,y,60,frameMaterial,'Frame'));
    for(const p of [fixedSpan.a,w.b])group.add(boxBetween([p[0]-20,p[1]],[p[0]+20,p[1]],HEAD-SILL,SILL,60,frameMaterial,'Frame'));
  }
  for(const d of layout.doors){
    const sliding=/sliding/i.test(d.name),material=sliding?glassMaterial:new THREE.MeshStandardMaterial({color:0xbfa387,roughness:0.8});
    const leaf=boxBetween(d.a,d.b,2100,0,40,material,'Door_'+(sliding?'Sliding_':'')+d.id.replace(':','_')+'_Leaf');
    if(d.id==='155:6'){
      const width=leaf.geometry.parameters.width,half=width/2;leaf.userData.bifold=true;leaf.userData.collisionProxy=false;leaf.material=frameMaterial.clone();leaf.material.colorWrite=false;leaf.material.depthWrite=false;
      const fixedHinge=new THREE.Group();fixedHinge.position.x=-width/2;leaf.add(fixedHinge);
      const centreHinge=new THREE.Group();centreHinge.position.x=half;fixedHinge.add(centreHinge);
      for(const hinge of [fixedHinge,centreHinge]){
        const add=(w,h,depth,x,y,mat,name)=>{const m=new THREE.Mesh(new THREE.BoxGeometry(w,h,depth),mat);m.position.set(x,y,0);m.name=name;hinge.add(m);};
        add(half-50,920,25,half/2,-590,frameMaterial,'Door_Fold_LowerPanel');
        add(half-50,1120,12,half/2,450,glassMaterial,'Door_Fold_Glass');
        for(const x of [12.5,half-12.5])add(25,2100,45,x,0,frameMaterial,'Door_Fold_Frame');
        for(const y of [-1030,-110,1030])add(half,40,45,half/2,y,frameMaterial,'Door_Fold_Frame');
        add(15,180,55,half-50,0,frameMaterial,'Door_Fold_Handle');
      }
      leaf.userData.fixedHinge=fixedHinge;leaf.userData.centreHinge=centreHinge;leaf.userData.photoSource='148:269';
    }
    if(d.id==='232:2'){
      const width=leaf.geometry.parameters.width,panelWidth=width/4;leaf.userData.fourPanel=true;leaf.userData.collisionProxy=false;leaf.material=glassMaterial.clone();leaf.material.colorWrite=false;leaf.material.opacity=0;leaf.material.depthWrite=false;
      for(let i=0;i<4;i++){const panel=new THREE.Group();panel.name='Balcony_Panel_'+i;panel.position.x=-width/2+panelWidth*(i+.5);panel.userData.closedX=panel.position.x;leaf.add(panel);
        const glass=new THREE.Mesh(new THREE.BoxGeometry(panelWidth-50,2020,12),glassMaterial);glass.name='Door_Panel_Glass';panel.add(glass);
        for(const x of [-panelWidth/2+12.5,panelWidth/2-12.5]){const rail=new THREE.Mesh(new THREE.BoxGeometry(25,2100,55),frameMaterial);rail.position.x=x;rail.name='Door_Panel_Frame';panel.add(rail);}
        for(const y of [-1030,1030]){const rail=new THREE.Mesh(new THREE.BoxGeometry(panelWidth,40,55),frameMaterial);rail.position.y=y;rail.name='Door_Panel_Frame';panel.add(rail);}
      }
    }
    leaf.userData.hinge=[d.a[0],-d.a[1]];leaf.userData.slide=[d.b[0]-d.a[0],-(d.b[1]-d.a[1])];
    const closedTip=CLOSED_DOOR_TIPS[d.id];
    if(closedTip){
      const sourceAngle=leaf.rotation.y,closedAngle=Math.atan2(closedTip[1]-d.a[1],closedTip[0]-d.a[0]);
      leaf.geometry.dispose();leaf.geometry=new THREE.BoxGeometry(Math.hypot(closedTip[0]-d.a[0],closedTip[1]-d.a[1]),2100,40);
      leaf.position.set((d.a[0]+closedTip[0])/2,1050,-(d.a[1]+closedTip[1])/2);leaf.rotation.y=closedAngle;
      leaf.userData.sourcePoseAngle=Math.atan2(Math.sin(sourceAngle-closedAngle),Math.cos(sourceAngle-closedAngle));
      // Small Figma arcs depict ajar poses. Keep their handedness, but open fully for Walk.
      leaf.userData.openAngle=Math.sign(leaf.userData.sourcePoseAngle)*(Math.abs(leaf.userData.sourcePoseAngle)<Math.PI/4?Math.PI/2:Math.abs(leaf.userData.sourcePoseAngle));
      leaf.userData.closedFromSourceSwing='135:'+String(Number(d.id.split(':')[1])+1);
      leaf.userData.sourceOpenDirection=[d.b[0]-d.a[0],0,-(d.b[1]-d.a[1])];
      leaf.userData.sourceClosedDirection=[closedTip[0]-d.a[0],0,-(closedTip[1]-d.a[1])];
    }
    root.add(leaf);
    // Every door gets a fixed header, using its CLOSED opening rather than its moving leaf.
    {
      const doorTop=2100,thickness=nearestWallThickness([leaf.position.x,-leaf.position.z],source);
      const headerGroup=new THREE.Group();headerGroup.name='Wall_DoorHeader_'+d.id.replace(':','_');
      const header=new THREE.Mesh(new THREE.BoxGeometry(leaf.geometry.parameters.width+200,HEIGHT-doorTop,thickness),wallMaterial);
      header.name='Doorway_UpperWall';header.position.set(leaf.position.x,(doorTop+HEIGHT)/2,leaf.position.z);header.quaternion.copy(leaf.quaternion);headerGroup.add(header);root.add(headerGroup);
      headerGroup.userData.sourceDoor=d.id;headerGroup.userData.verticalDimensions='estimated: door top 2100 mm, wall top 2800 mm';
      root.updateMatrixWorld(true);const normal=new THREE.Vector3(0,0,1).applyQuaternion(header.quaternion),axis=new THREE.Vector3(1,0,0).applyQuaternion(header.quaternion);
      const samples=[-.48,-.25,0,.25,.48].map(f=>{
        const centre=header.position.clone().addScaledVector(axis,f*leaf.geometry.parameters.width);
        const upperHits=new THREE.Raycaster(centre.clone().addScaledVector(normal,-500),normal,0,1000).intersectObject(header).length;
        centre.y=1550;const doorwayHits=new THREE.Raycaster(centre.clone().addScaledVector(normal,-500),normal,0,1000).intersectObject(header).length;
        return {fraction:f,upperHits,doorwayHits};
      });
      doorHeaderChecks.push({id:d.id,thickness_mm:thickness,bottom_mm:doorTop,top_mm:HEIGHT,samples,fixed:true,openingA:d.a,openingB:closedTip||d.b,sourceArc:leaf.userData.closedFromSourceSwing||null});
      if(samples.some(s=>!s.upperHits||s.doorwayHits))throw new Error('Door header blocks opening or leaves top gap: '+d.id);
    }
  }
  placeLounge(legacy.scene,root,layout);
  root.add(clothesRack());
  addStudyDetails(root);
  for(const n of furniture){
    const study=studyFurniture(n);if(study){root.add(study);continue;}
    const detailed=roomPhotoFurniture(n);if(detailed){root.add(detailed);continue;}
    const photoFurniture=breakfastFurniture(n);if(photoFurniture){root.add(photoFurniture);continue;}
    const upgraded=photoUpgrade(n);if(upgraded){root.add(upgraded);continue;}
    const label=n.names.join(' / '),t=n.t;
    let height=500,bottom=0;
    if(/bed/i.test(label)&&!/bedside|bench|wardrobe|desk|chair/i.test(label)){
      if(n.width<150){height=950;}else if(n.width<600){height=70;bottom=550;}else if(n.id==='196:279'||n.id==='196:294'||n.id==='196:311'||n.id==='196:319'){height=200;bottom=350;}else height=350;
    }else if(/wardrobe|clothes rail|refrigerator/i.test(label))height=2000;
    else if(/desk|table|counter|base cabinets/i.test(label))height=850;
    else if(/washing machine/i.test(label))height=850;
    else if(/shower screen|shower door/i.test(label))height=2100;
    else if(/wall art/i.test(label)){height=450;bottom=1100;}
    else if(/hob|sink/i.test(label)){height=35;bottom=850;}
    else if(/hood/i.test(label)){height=250;bottom=1800;}
    if(n.id==='196:202'){height=40;bottom=850;}
    if(n.id==='214:3'){height=900;bottom=600;}
    const displayOverrides={'196:203':0xf7f7f5,'196:204':0xf7f7f5,'214:5':0xf7f7f5,'214:4':0xb7bcc2,'196:202':0xf3f1ec};
    const color=displayOverrides[n.id]!==undefined?new THREE.Color(displayOverrides[n.id]):n.c?new THREE.Color().setRGB(n.c.r,n.c.g,n.c.b,THREE.SRGBColorSpace):new THREE.Color(0xd8d0c0);
    const material=new THREE.MeshStandardMaterial({color,roughness:/leather|table|cabinet/i.test(label)?0.6:0.9,side:THREE.DoubleSide});
    if(/bed/i.test(label)&&!/cabinet|wardrobe|desk/i.test(label))finish(material,n.width<600||['196:279','196:294','196:311','196:319'].includes(n.id)?'linen':'fabric',8);
    if(n.id==='214:3'){material.color.setHex(0x080c10);material.roughness=0.12;material.metalness=0.3;}
    if(n.id==='214:4'){material.metalness=0.65;material.roughness=0.4;}
    if(/glass/i.test(label)){material.transparent=true;material.opacity=0.3;material.depthWrite=false;}
    const mesh=new THREE.Mesh((/bed/i.test(label)&&!/cabinet|wardrobe|desk/i.test(label)?new RoundedBoxGeometry(n.width,height,n.height,3,Math.min(15,height/8)):new THREE.BoxGeometry(n.width,height,n.height)),material);
    mesh.position.set(t[0][0]*n.width/2+t[0][1]*n.height/2+t[0][2]-14239,bottom+height/2,-(t[1][0]*n.width/2+t[1][1]*n.height/2+t[1][2]-8200));
    mesh.rotation.y=Math.atan2(t[1][0],t[0][0]);mesh.name='Furniture_Figma_'+n.id.replace(':','_');mesh.userData.verticalDimensions='estimated';if(n.id==='214:2'){const front=new THREE.MeshStandardMaterial({color:0xf7f7f5,roughness:0.65}),top=finish(new THREE.MeshStandardMaterial({color:0x8a8a8a}),'wood',3);mesh.material=[front,front,top,front,front,front];}
    if(n.id==='214:2'||n.id==='214:3'){
      const add=(w,h,d,x,y,z,mat,name)=>{const part=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),mat);part.position.set(x,y,z);part.name='Furniture_Detail_'+name;mesh.add(part);};
      if(n.id==='214:2'){
        const white=new THREE.MeshStandardMaterial({color:0xf7f7f5,roughness:.48});
        const inset=new THREE.MeshStandardMaterial({color:0x43484a,roughness:.75});
        const glazing=new THREE.MeshPhysicalMaterial({color:0xa4afb0,roughness:.14,metalness:.12,transparent:true,opacity:.55,depthWrite:false});
        // Photo 09: white end doors and a framed glazed central compartment.
        const w=n.width,d=n.height,front=-d/2-1,doorW=w*.25-8;
        add(w-16,370,2,0,-25,front,inset,'Console_Recess');
        for(const x of [-w*.375,w*.375])add(doorW,354,16,x,-25,front-8,white,'Console_EndDoor');
        add(w*.5-30,294,4,0,-25,front-6,glazing,'Console_Glass');
        for(const y of [-188,138])add(w*.5-6,28,18,0,y,front-10,white,'Console_CentreFrame');
        for(const x of [-w*.25+12,w*.25-12])add(24,310,18,x,-25,front-10,white,'Console_CentreFrame');
        mesh.userData.photoSource='148:269';
      } else {
        mesh.material=new THREE.MeshStandardMaterial({color:0x17191c,roughness:.4});
        const screen=new THREE.MeshPhysicalMaterial({color:0x06080b,roughness:.17,metalness:.12,clearcoat:1,clearcoatRoughness:.12});
        add(n.width-24,height-24,3,0,0,-n.height/2-2,screen,'TV_Display');
        add(3,2,2,n.width*.42,-height/2+5,-n.height/2-4,new THREE.MeshBasicMaterial({color:0x8c211b}),'TV_Standby');
      }
    }
    root.add(mesh);
  }
  // Preserve the source blue sofa in addition to the existing tan and charcoal models.
  const blue=layout.lounge.find(n=>n.id==='196:271');if(blue){
    const t=blue.transform,w=blue.width,d=blue.height,sofa=new THREE.Group();
    sofa.position.set(t[0][0]*w/2+t[0][1]*d/2+t[0][2]-14239,0,-(t[1][0]*w/2+t[1][1]*d/2+t[1][2]-8200));sofa.rotation.y=Math.atan2(t[1][0],t[0][0]);sofa.name='Furniture_Figma_BlueSofa';
    const upholstery=finish(new THREE.MeshStandardMaterial({color:0x9eb3c0}),'fabric',24),legMaterial=new THREE.MeshStandardMaterial({color:0x353638,roughness:.65,metalness:.3});
    const part=(sx,sy,sz,x,y,z,mat,kind)=>{const m=new THREE.Mesh(new RoundedBoxGeometry(sx,sy,sz,4,Math.min(35,sy*.2,sz*.2)),mat);m.position.set(x,y,z);m.name='Furniture_BlueSofa_'+kind;sofa.add(m);};
    part(w,100,d,0,220,0,upholstery,'Base');
    for(let i=0;i<3;i++){const x=(i-1)*w/3;part(w/3-8,120,d-150,x,330,-55,upholstery,'Seat');part(w/3-8,290,140,x,455,d/2-70,upholstery,'Back');}
    for(const x of [-w/2+100,w/2-100])for(const z of [-d/2+80,d/2-80])part(35,170,35,x,85,z,legMaterial,'Leg');
    sofa.userData.detailStatus='Approximate upholstery within the original footprint';root.add(sofa);
  }
  addPhotoAdditions(root);

  // Floor perimeter bridges the source's window and entrance gaps. It is an estimated plate.
  const floor=[[3253,3336],[12102,3336],[12316,3786],[14181,3786],[19100,6753],[11957,14246],[11024,13303],[10271,14010],[10799,14527],[9513,13034],[8186,11912],[3253,11912]];
  const plate=extrude(floor,-30,30,new THREE.MeshStandardMaterial({color:0xc4b9a8,roughness:0.85}));tileFloor(plate.material,plate.geometry);plate.name='Floor';root.add(plate);
  const ceiling=extrude(floor,HEIGHT,20,new THREE.MeshStandardMaterial({color:0xf4f4f2,roughness:0.9,side:THREE.DoubleSide}));const underside=[];const normals=ceiling.geometry.getAttribute('normal');for(let i=0;i<normals.count;i+=3)if(normals.getY(i)<-0.9)underside.push(i,i+1,i+2);ceiling.geometry.setIndex(underside);ceiling.material.side=THREE.FrontSide;ceiling.name='Ceiling_Estimated';ceiling.visible=false;root.add(ceiling);
  root.updateMatrixWorld(true);
  const wallMeshes=[];let maxCapError=0;
  for(const group of root.children.filter(n=>n.name.startsWith('Wall_Figma_'))){
    group.traverse(n=>{if(n.isMesh)wallMeshes.push(n);});
    const w=source.walls.find(w=>'Wall_Figma_'+w.id.replace(':','_')===group.name);
    const expected=polygons(w,source.frame).reduce((sum,p)=>sum+Math.abs(p.reduce((v,a,i)=>{const b=p[(i+1)%p.length];return v+a[0]*b[1]-b[0]*a[1];},0))/2,0);
    let actual=0;for(const mesh of group.children){const p=mesh.geometry.attributes.position;for(let i=0;i<p.count;i+=3){if([i,i+1,i+2].every(i=>Math.abs(p.getY(i)-HEIGHT)<0.01)){actual+=Math.abs((p.getX(i+1)-p.getX(i))*(p.getZ(i+2)-p.getZ(i))-(p.getX(i+2)-p.getX(i))*(p.getZ(i+1)-p.getZ(i)))/2;}}}
    maxCapError=Math.max(maxCapError,Math.abs(expected-actual));
  }
  const openingChecks=layout.windows.map(w=>{const dx=w.b[0]-w.a[0],dy=w.b[1]-w.a[1],l=Math.hypot(dx,dy),normal=new THREE.Vector3(-dy/l,0,-dx/l),center=new THREE.Vector3((w.a[0]+w.b[0])/2,1500,-(w.a[1]+w.b[1])/2);const ray=new THREE.Raycaster(center.clone().addScaledVector(normal,-400),normal,0,800);return {id:w.id,wallHits:ray.intersectObjects(wallMeshes,false).length};});
  if(openingChecks.some(c=>c.wallHits))throw new Error('Source window cut remains blocked: '+JSON.stringify(openingChecks));
  ceiling.updateMatrixWorld(true);const ceilingQA={fromInside:new THREE.Raycaster(new THREE.Vector3(5000,1550,-5000),new THREE.Vector3(0,1,0)).intersectObject(ceiling).length,fromOutside:new THREE.Raycaster(new THREE.Vector3(5000,4000,-5000),new THREE.Vector3(0,-1,0)).intersectObject(ceiling).length};
  root.userData.evidence={bath1Window:root.getObjectByName("Window_Figma_135_78").userData.correction,study:STUDY_REFERENCE,fridgeEnclosure:root.getObjectByName('Furniture_Figma_214_4').userData.enclosure,photoFurniture:{wardrobes:['196:328','196:348'],clothesRack:'173:52 / IKEA MULIG',kitchen:'148:268',fridgeBrand:'unconfirmed',tileGrid:{size_mm:600,rotation_deg:45,anchor:[10203.82,9595.30],status:'photo alignment, tile dimensions unmeasured'}},balconyOverlapRepair:root.getObjectByName('Window_Figma_166_322').userData.doorOpening,doorHeaderChecks,ceilingQA,wallCount,windowCount:layout.windows.length,doorCount:layout.doors.length,unit:'mm',wallHeight:{value:HEIGHT,status:'estimated'},source:'148:314',legacyWalls:0,windowVerticalDimensions:'estimated: standard sill 860/head 2140; photo breakfast pass-through sill 900/head 2580',floorAndCeiling:'estimated perimeter plate',furnitureRectangles:furniture.length,furnitureHeights:'estimated, native Figma footprints and colours',maxCapAreaError_mm2:maxCapError,openingChecks};
  console.info('[atlantis] current Figma geometry',JSON.stringify(root.userData.evidence));
  return root;
}
