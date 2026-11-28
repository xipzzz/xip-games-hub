import * as THREE from 'three';
// Procedural approximations guided by photos; product patterns are not measured.
// Step 5 (2026-10-04): rewritten at higher resolution with natural (tileable) noise instead of
// per-pixel static and hard grid lines. Same three exports, so callers are unchanged.
//   tile   1024 px = 2 x 2 tiles of 600 mm, per-tile tone variation, light grout, sheen via roughnessMap
//   wood   1024 px long grain streaks · fabric 512 px soft basket weave · linen 512 px fine soft weave
//   stone  512 px subtle veining
const cache=new Map();

// Tileable value noise + fractal sum (fbm). period = lattice cells across the texture, so it wraps seamlessly.
function hash(x,y,s){let h=(x*374761393+y*668265263+s*1442695041)|0;h=Math.imul(h^(h>>>13),1274126177);return((h^(h>>>16))>>>0)/4294967295;}
function noise(x,y,period,seed){const xi=Math.floor(x),yi=Math.floor(y),xf=x-xi,yf=y-yi,u=xf*xf*(3-2*xf),v=yf*yf*(3-2*yf);
  const m=(a)=>((a%period)+period)%period,a=hash(m(xi),m(yi),seed),b=hash(m(xi+1),m(yi),seed),c=hash(m(xi),m(yi+1),seed),d=hash(m(xi+1),m(yi+1),seed);
  return a+(b-a)*u+(c-a)*v+(a-b-c+d)*u*v;}
function fbm(x,y,period,seed,oct=4){let s=0,amp=.5,f=1;for(let o=0;o<oct;o++){s+=amp*noise(x*f,y*f,period*f,seed+o);amp*=.5;f*=2;}return s;}   // ~0..1

function paint(size,fn){const c=document.createElement('canvas');c.width=c.height=size;const ctx=c.getContext('2d'),im=ctx.createImageData(size,size);
  for(let y=0;y<size;y++)for(let x=0;x<size;x++){const v=Math.max(0,Math.min(255,fn(x,y,size)));const i=(y*size+x)*4;im.data[i]=im.data[i+1]=im.data[i+2]=v;im.data[i+3]=255;}
  ctx.putImageData(im,0,0);return c;}

const TILE_PX=1024,TILE_N=2,TILE=TILE_PX/TILE_N,GROUT=3;   // 512 px per 600 mm tile -> grout about 3.5 mm
const tileTone=[4,-3,1,-5];                                   // each of the 4 tiles slightly different, like real porcelain batches
const inGrout=(x,y)=>(x%TILE)<GROUT||(y%TILE)<GROUT;
const PAINTERS={
  tile:(x,y,s)=>{if(inGrout(x,y))return 168+fbm(x/s*32,y/s*32,32,9,2)*14;   // grout clearly visible, as in the photos
    const k=((y/TILE)|0)*TILE_N+((x/TILE)|0);return 232+tileTone[k]+(fbm(x/s*6,y/s*6,6,3)-.5)*10+(fbm(x/s*48,y/s*48,48,5,2)-.5)*5;},
  wood:(x,y,s)=>{const warp=fbm(x/s*4,y/s*1,4,11)*28,streak=Math.sin((x+warp)*.21)*.5+.5,fine=fbm(x/s*64,y/s*4,64,12,2);
    return 214+streak*14+(fine-.5)*16+(fbm(x/s*3,y/s*3,3,13)-.5)*14;},
  fabric:(x,y,s)=>{const weave=Math.sin(x*Math.PI/8)*Math.sin(y*Math.PI/8),slub=fbm(x/s*16,y/s*64,16,21,3);
    return 222+weave*9+(slub-.5)*22+(fbm(x/s*4,y/s*4,4,22)-.5)*10;},
  linen:(x,y,s)=>{const thread=Math.sin(x*Math.PI/3)*.5+Math.sin(y*Math.PI/3)*.5,slub=fbm(x/s*8,y/s*48,8,31,3);
    return 238+thread*2.5+(slub-.5)*12+(fbm(x/s*3,y/s*3,3,32)-.5)*6;},
  stone:(x,y,s)=>{const vein=Math.abs(Math.sin((x/s*2+fbm(x/s*3,y/s*3,3,41)*3)*Math.PI*2));return 236+(fbm(x/s*8,y/s*8,8,42)-.5)*12-(vein<.04?10:0);},
};
const SIZE={tile:TILE_PX,wood:1024,fabric:512,linen:512,stone:512};

function texture(kind,repeat=1){
  const key=kind+repeat;if(cache.has(key))return cache.get(key);
  const base=cache.get('canvas:'+kind)||paint(SIZE[kind]||512,PAINTERS[kind]||((x,y,s)=>230+(fbm(x/s*8,y/s*8,8,1)-.5)*10));cache.set('canvas:'+kind,base);
  const t=new THREE.CanvasTexture(base);t.colorSpace=THREE.SRGBColorSpace;t.wrapS=t.wrapT=THREE.RepeatWrapping;t.repeat.set(repeat,repeat);t.anisotropy=8;cache.set(key,t);return t;
}
// Tile sheen: polished porcelain (low roughness) with matte grout.
function tileRoughness(){
  if(cache.has('tileRough'))return cache.get('tileRough');
  const c=paint(TILE_PX,(x,y,s)=>inGrout(x,y)?240:135+(fbm(x/s*10,y/s*10,10,7)-.5)*30);   // satin, not mirror
  const t=new THREE.CanvasTexture(c);t.wrapS=t.wrapT=THREE.RepeatWrapping;t.anisotropy=8;cache.set('tileRough',t);return t;
}

export function finish(material,kind,repeat=1){material.map=texture(kind,repeat);material.bumpMap=material.map;material.bumpScale=kind==='fabric'?0.003:0.001;material.roughness=kind==='fabric'||kind==='linen'?0.95:kind==='wood'?0.75:0.65;material.userData.photoApproximation=kind;return material;}
export function tileFloor(material,geometry){
  // UVs: one texture repeat = 2 x 2 tiles = 1200 mm, rotated 45 degrees and anchored at the breakfast door (as before).
  const p=geometry.getAttribute('position'),uv=geometry.getAttribute('uv');for(let i=0;i<p.count;i++){const x=p.getX(i)-10203.82,y=-p.getZ(i)-9595.30;uv.setXY(i,(x-y)*Math.SQRT1_2/1200,(x+y)*Math.SQRT1_2/1200);}uv.needsUpdate=true;
  finish(material,'tile');material.bumpScale=0.002;material.roughness=1;material.roughnessMap=tileRoughness();
  material.color.setHex(0xcbc5bb);                      // light grey-beige, as in the photos (was 0xc4b9a8, too warm/dark)
  material.userData.tileSize='600 mm visual approximation, unmeasured';return material;
}

export function ensureSurfaceUV(geometry){
  if(geometry.getAttribute('uv'))return geometry;
  const g=geometry.index?geometry.toNonIndexed():geometry.clone();g.computeVertexNormals();const p=g.getAttribute('position'),n=g.getAttribute('normal'),uv=[];
  for(let i=0;i<p.count;i++){const x=p.getX(i),y=p.getY(i),z=p.getZ(i),nx=Math.abs(n.getX(i)),ny=Math.abs(n.getY(i)),nz=Math.abs(n.getZ(i));if(ny>nx&&ny>nz)uv.push(x+.5,z+.5);else if(nx>nz)uv.push(z+.5,y+.5);else uv.push(x+.5,y+.5);}
  g.setAttribute('uv',new THREE.Float32BufferAttribute(uv,2));return g;
}
