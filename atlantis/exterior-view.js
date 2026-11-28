// Step 3 (2026-10-04): the view outside every window, drawn in code at 4096 x 2048
// (the old exterior-view.jpg was a 2048 px placeholder of blurry ovals; it is kept as a file but no longer used).
// Matches the photo board (Figma 166:320): from the 13th floor you look down onto dense green
// treetops, with a band of sea and the horizon in the distance under a bright, hazy tropical sky.
// It is an artistic stand-in, not a photo of the real view.
import * as THREE from 'three';

function rng(seed){return()=>{seed|=0;seed=seed+0x6D2B79F5|0;let t=Math.imul(seed^seed>>>15,1|seed);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296;};}

export function makeExteriorPanorama(W=4096){
  const H=W/2,c=document.createElement('canvas');c.width=W;c.height=H;const g=c.getContext('2d'),r=rng(1304);
  const horizon=H*.5, seaEnd=H*.517, coastEnd=H*.527;   // thin sea strip, mostly canopy (as in the bedroom photos)

  // Sky: soft blue overhead to a bright, hazy horizon.
  let sky=g.createLinearGradient(0,0,0,horizon);
  sky.addColorStop(0,'#7fb0dc');sky.addColorStop(.55,'#b5d3ec');sky.addColorStop(1,'#eef4f6');
  g.fillStyle=sky;g.fillRect(0,0,W,horizon);
  // Fair-weather cumulus clouds, flatter and fainter toward the horizon.
  for(let i=0;i<70;i++){
    const x=r()*W,y=horizon*(.35+r()*.6),s=40+r()*160*(y/horizon);
    for(let k=0;k<9;k++){const cx=x+(r()-.5)*s*2.4,cy=y+(r()-.5)*s*.5,rad=s*(.4+r()*.6);
      const grad=g.createRadialGradient(cx,cy,0,cx,cy,rad);grad.addColorStop(0,'rgba(255,255,255,.55)');grad.addColorStop(1,'rgba(255,255,255,0)');
      g.fillStyle=grad;g.beginPath();g.ellipse(cx,cy,rad,rad*.55,0,0,Math.PI*2);g.fill();}
  }

  // Sea: a calm band below the horizon with fine horizontal glints.
  let sea=g.createLinearGradient(0,horizon,0,seaEnd);
  sea.addColorStop(0,'#9ab9cc');sea.addColorStop(1,'#5f8eab');
  g.fillStyle=sea;g.fillRect(0,horizon,W,seaEnd-horizon);
  for(let i=0;i<2600;i++){const y=horizon+r()*(seaEnd-horizon),w=6+r()*40;g.fillStyle=`rgba(255,255,255,${.08+r()*.18})`;g.fillRect(r()*W,y,w,1);}

  // Distant coast: hazy blue-green strip.
  g.fillStyle='#7d9686';g.fillRect(0,seaEnd,W,coastEnd-seaEnd);
  for(let x=0;x<W;x+=3){const h=2+r()*7;g.fillStyle='rgba(95,120,100,.7)';g.fillRect(x,seaEnd-h*.5,3,h);}

  // Tree canopy: a dense, continuous mass of overlapping crowns. Each tree is a cluster of blobs with a
  // shadow underneath; far trees are drawn first so nearer (lower, bigger) ones overlap them.
  const base=g.createLinearGradient(0,coastEnd,0,H);base.addColorStop(0,'#7f9886');base.addColorStop(.25,'#4f6f49');base.addColorStop(1,'#2f4a2c');
  g.fillStyle=base;g.fillRect(0,coastEnd,W,H-coastEnd);
  const greens=[[58,96,52],[72,112,60],[88,128,70],[66,104,58],[98,136,78],[52,86,48]];
  const trees=[];for(let i=0;i<14000;i++){const t=Math.pow(r(),1.35);trees.push([r()*W,coastEnd+t*(H-coastEnd),t]);}
  trees.sort((a,b)=>a[1]-b[1]);
  for(const [x,y,near] of trees){
    const R=2.5+Math.pow(near,1.5)*70*(.7+r()*.6),haze=Math.pow(1-near,2.2)*.7;
    const [cr,cg,cb]=greens[(r()*greens.length)|0],mix=(v,h)=>Math.round(v*(1-haze)+h*haze);
    for(const dx of (x<R*2?[0,W]:x>W-R*2?[0,-W]:[0])){            // wrap across the panorama seam
      g.fillStyle=`rgba(${mix(22,120)},${mix(38,138)},${mix(22,128)},.55)`;g.beginPath();g.ellipse(x+dx+R*.15,y+R*.25,R*1.05,R*.8,0,0,Math.PI*2);g.fill();
      const blobs=R<4?1:5+((r()*5)|0);
      for(let k=0;k<blobs;k++){
        const a=r()*Math.PI*2,d=blobs>1?R*.55*r():0,bx=x+dx+Math.cos(a)*d,by=y+Math.sin(a)*d*.7-R*.15,br=R*(blobs>1?.45+r()*.3:1);
        const lift=(by<y?10:-6)+((r()*10)|0);
        g.fillStyle=`rgb(${mix(cr+lift,140)},${mix(cg+lift,160)},${mix(cb+lift*.7,148)})`;
        g.beginPath();g.arc(bx,by,br,0,Math.PI*2);g.fill();
      }
    }
  }
  // Atmospheric haze over the far canopy.
  const haze=g.createLinearGradient(0,coastEnd,0,coastEnd+H*.08);haze.addColorStop(0,'rgba(225,235,240,.45)');haze.addColorStop(1,'rgba(225,235,240,0)');
  g.fillStyle=haze;g.fillRect(0,coastEnd,W,H*.08);

  const tex=new THREE.CanvasTexture(c);tex.colorSpace=THREE.SRGBColorSpace;tex.anisotropy=8;tex.generateMipmaps=true;
  tex.userData={source:'procedural, photo-guided (Figma 166:320)',size:[W,H]};
  return tex;
}
