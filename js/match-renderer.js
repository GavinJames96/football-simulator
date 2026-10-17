'use strict';
// Rendering coordinates are independent of authoritative simulation coordinates.
const visualPlayers=new Map();let visualBall={x:52.5,y:34};let lastVisualOwner=null;
function resetVisuals(){visualPlayers.clear();for(const t of teams)for(const p of t.players)visualPlayers.set(p.id,{x:p.x,y:p.y});visualBall={x:sim?.ball.x??52.5,y:sim?.ball.y??34};lastVisualOwner=sim?.carrier?.id??null;ballFx=null}
function smoothVisuals(dt){if(!sim)return;const speed=Number($('speed').value)||1;
  // Smaller simulation steps yield continuous off-ball targets; per-frame damping removes residual stepping.
  const a=1-Math.exp(-dt*7),playerMax=(8+speed*6.2)*dt;
  for(const t of teams)for(const p of t.players){let v=visualPlayers.get(p.id);if(!v){v={x:p.x,y:p.y};visualPlayers.set(p.id,v)}
    const dx=p.x-v.x,dy=p.y-v.y,d=Math.hypot(dx,dy);if(d>.0001){let step=Math.min(d*a,playerMax,d);v.x+=dx/d*step;v.y+=dy/d*step}}
  let target=sim.ball;const carrier=sim.carrier;
  // Put the ball just ahead of the carrier so it remains visibly distinct.
  if(carrier){const cp=visualPlayers.get(carrier.id);if(cp){let vx=carrier.x-cp.x,vy=carrier.y-cp.y,n=Math.hypot(vx,vy);let forward=carrier.team?-1:1;target={x:cp.x+(n>.2?vx/n*.95:forward*1.6),y:cp.y+(n>.2?vy/n*.95:0.55)};}}
  if(ballFx){const u=Math.min(1,(performance.now()-ballFx.at)/ballFx.duration);const ease=u*u*(3-2*u);
    visualBall.x=ballFx.a.x+(ballFx.b.x-ballFx.a.x)*ease;visualBall.y=ballFx.a.y+(ballFx.b.y-ballFx.a.y)*ease;
    if(u>=1)ballFx=null;
  }else{const b=1-Math.exp(-dt*15);visualBall.x+=(target.x-visualBall.x)*b;visualBall.y+=(target.y-visualBall.y)*b;}
  visualBall.x=clamp(visualBall.x,0,105);visualBall.y=clamp(visualBall.y,0,68);lastVisualOwner=carrier?.id??null;
}
function draw(){const c=$('pitch'),ctx=c.getContext('2d'),sx=c.width/W,sy=c.height/L;ctx.clearRect(0,0,c.width,c.height);ctx.fillStyle='#126444';ctx.fillRect(0,0,c.width,c.height);for(let i=0;i<10;i++){ctx.fillStyle=i%2?'#116040':'#176b4a';ctx.fillRect(i*c.width/10,0,c.width/10,c.height)}ctx.save();ctx.scale(sx,sy);ctx.strokeStyle='rgba(245,255,250,.72)';ctx.lineWidth=.19;ctx.strokeRect(.5,.5,104,67);ctx.beginPath();ctx.moveTo(52.5,.5);ctx.lineTo(52.5,67.5);ctx.stroke();ctx.beginPath();ctx.arc(52.5,34,9.15,0,Math.PI*2);ctx.stroke();ctx.strokeRect(.5,13.84,16.5,40.32);ctx.strokeRect(88,13.84,16.5,40.32);ctx.strokeRect(.5,24.84,5.5,18.32);ctx.strokeRect(99,24.84,5.5,18.32);ctx.strokeRect(-1.5,30.34,2,7.32);ctx.strokeRect(104.5,30.34,2,7.32);ctx.fillStyle='#d9eadf';ctx.beginPath();ctx.arc(11.5,34,.45,0,7);ctx.arc(93.5,34,.45,0,7);ctx.fill();for(let t=0;t<2;t++)for(let p of active(t)){let v=visualPlayers.get(p.id),x=v?.x??p.x,y=v?.y??p.y;ctx.beginPath();ctx.arc(x,y,1.55,0,7);ctx.fillStyle=t?'#ee9a4d':'#299ad9';ctx.fill();ctx.lineWidth=.26;ctx.strokeStyle='#e8f5ff';ctx.stroke();ctx.font='bold 1.6px Arial';ctx.fillStyle='#fff';ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText(p.num,x,y+.12);if(sim?.carrier===p){ctx.beginPath();ctx.strokeStyle='#fffab6';ctx.lineWidth=.35;ctx.arc(x,y,2.3,0,7);ctx.stroke()}}ctx.restore();if(sim){
    // Draw the football in screen-space, rather than pitch metres, for a crisp icon.
    const bx=visualBall.x*sx,by=visualBall.y*sy,r=6.6;
    ctx.save();ctx.fillStyle='rgba(0,0,0,.26)';ctx.beginPath();ctx.ellipse(bx+1.7,by+3,r*.95,r*.55,0,0,Math.PI*2);ctx.fill();
    ctx.beginPath();ctx.arc(bx,by,r,0,Math.PI*2);ctx.fillStyle='#fff';ctx.fill();ctx.lineWidth=1.2;ctx.strokeStyle='#1c2630';ctx.stroke();
    ctx.beginPath();for(let i=0;i<5;i++){const theta=-Math.PI/2+i*2*Math.PI/5;const x=bx+Math.cos(theta)*3.15,y=by+Math.sin(theta)*3.15;if(i===0)ctx.moveTo(x,y);else ctx.lineTo(x,y)}ctx.closePath();ctx.fillStyle='#1c2630';ctx.fill();
    ctx.restore();}}

