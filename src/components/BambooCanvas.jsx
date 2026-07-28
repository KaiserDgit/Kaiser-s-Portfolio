import { useEffect, useRef } from 'react'
import { useDeviceProfile } from '../hooks/useDeviceProfile.js'

const STEMS  = ['#6B8F5E','#5A7D4E','#7DA068','#4E7044','#89A874']
const NODES  = ['#4A6B3A','#3D5C30','#527844']
const LEAVES = ['#7CBB6A','#5FA050','#8BC878','#4E8C42','#6BAA58']

const MAX_BAMBOO = 140

class Bamboo {
  constructor(x, h, fromClick = false, leafDensity = 1) {
    this.x = x; this.baseY = h * 0.82 + (Math.random()-0.5)*16
    this.totalSegs = Math.floor(Math.random()*7)+5; this.segH = Math.random()*26+20
    this.width = Math.random()*7+4
    this.color = STEMS[Math.floor(Math.random()*STEMS.length)]
    this.nodeColor = NODES[Math.floor(Math.random()*NODES.length)]
    this.lean = (Math.random()-0.5)*0.14
    this.grown = fromClick ? 0 : 1; this.growSpeed = 0.022
    this.swayOffset = Math.random()*Math.PI*2; this.swayAmp = Math.random()*0.011+0.005
    this.windEffect = 0; this.layer = Math.random(); this.leaves = []
    for (let i=2; i<this.totalSegs; i++) {
      const side = Math.random()>0.5?1:-1
      // Leaves dominate per-frame cost: 2 bezier curves + fill + stroke each.
      const n=Math.max(1,Math.round((Math.floor(Math.random()*3)+1)*leafDensity))
      for (let l=0;l<n;l++) this.leaves.push({
        seg:i, side:l%2===0?side:-side, angle:Math.random()*0.4+0.15,
        len:Math.random()*26+16, width:Math.random()*4+3,
        color:LEAVES[Math.floor(Math.random()*LEAVES.length)],
        offset:Math.random()*Math.PI*2, sway:Math.random()*0.014+0.005
      })
    }
  }
  update(wind, t, mx) {
    if (this.grown<1) this.grown=Math.min(1,this.grown+this.growSpeed)
    if (Math.abs(mx-this.x)<110) this.windEffect+=(this.x-mx)/110*0.035
    this.windEffect*=0.91
  }
  draw(ctx, wind, t) {
    const visSegs=Math.ceil(this.totalSegs*this.grown); if(!visSegs) return
    const windF=(wind/100)*0.028+this.windEffect
    const sway=Math.sin(t*0.75+this.swayOffset)*this.swayAmp*(wind/45+0.5)+Math.sin(t*1.2+this.swayOffset*1.4)*this.swayAmp*0.35
    let cx=this.x,cy=this.baseY,cumA=this.lean; const pts=[{x:cx,y:cy}]
    for (let i=0;i<visSegs;i++) {
      const hf=(i+1)/this.totalSegs; cumA+=(sway*hf*hf+windF*hf*hf)*0.28
      const nx=cx+Math.sin(cumA)*this.segH,ny=cy-Math.cos(cumA)*this.segH
      pts.push({x:nx,y:ny}); cx=nx; cy=ny
    }
    const w=this.width
    for (let i=0;i<pts.length-1;i++) {
      const p0=pts[i],p1=pts[i+1]
      const t0=w*(1-i/pts.length*0.38),t1=w*(1-(i+1)/pts.length*0.38)
      const dx=p1.x-p0.x,dy=p1.y-p0.y,len=Math.sqrt(dx*dx+dy*dy)||1
      const nx2=-dy/len,ny2=dx/len
      ctx.beginPath()
      ctx.moveTo(p0.x+nx2*t0,p0.y+ny2*t0); ctx.lineTo(p1.x+nx2*t1,p1.y+ny2*t1)
      ctx.lineTo(p1.x-nx2*t1,p1.y-ny2*t1); ctx.lineTo(p0.x-nx2*t0,p0.y-ny2*t0)
      ctx.closePath(); ctx.fillStyle=this.color; ctx.fill()
      ctx.fillStyle=this.nodeColor; ctx.fillRect(p1.x-t1*1.1,p1.y-2,t1*2.2,4)
    }
    for (const leaf of this.leaves) {
      if (leaf.seg>=visSegs) continue; const p=pts[leaf.seg]; if(!p) continue
      const hf=leaf.seg/this.totalSegs
      const ls=sway*hf*hf+Math.sin(t*leaf.sway*55+leaf.offset)*0.055*(wind/100+0.3)
      ctx.save(); ctx.translate(p.x,p.y); ctx.rotate(leaf.side*leaf.angle+ls+cumA*hf*0.5)
      ctx.beginPath(); ctx.moveTo(0,0)
      ctx.bezierCurveTo(leaf.side*leaf.len*0.3,-leaf.width,leaf.side*leaf.len*0.7,-leaf.width*0.5,leaf.side*leaf.len,0)
      ctx.bezierCurveTo(leaf.side*leaf.len*0.7,leaf.width*0.5,leaf.side*leaf.len*0.3,leaf.width,0,0)
      ctx.fillStyle=leaf.color; ctx.fill()
      ctx.beginPath(); ctx.moveTo(0,0); ctx.lineTo(leaf.side*leaf.len*0.82,0)
      ctx.strokeStyle='#4A7A38'; ctx.lineWidth=0.5; ctx.globalAlpha=0.35; ctx.stroke()
      ctx.globalAlpha=1; ctx.restore()
    }
  }
}

class Firefly {
  constructor(w,h){this.w=w;this.h=h;this.reset()}
  reset(){
    this.x=Math.random()*this.w; this.y=this.h*0.15+Math.random()*this.h*0.65
    this.vx=(Math.random()-0.5)*0.5; this.vy=(Math.random()-0.5)*0.3
    this.life=0; this.maxLife=Math.random()*180+80; this.phase=Math.random()*Math.PI*2
  }
  update(t){
    this.x+=this.vx; this.y+=this.vy+Math.sin(t*1.8+this.phase)*0.18; this.life++
    if(this.life>this.maxLife||this.x<0||this.x>this.w||this.y<0) this.reset()
  }
  draw(ctx,t){
    const blink=(Math.sin(t*2.8+this.phase)+1)/2
    const alpha=blink*0.65*Math.min(1,this.life/18)*Math.min(1,(this.maxLife-this.life)/18)
    if(alpha<0.04) return
    ctx.beginPath(); ctx.arc(this.x,this.y,2,0,Math.PI*2)
    ctx.fillStyle=`rgba(240,215,70,${alpha})`; ctx.fill()
    ctx.beginPath(); ctx.arc(this.x,this.y,5,0,Math.PI*2)
    ctx.fillStyle=`rgba(240,215,70,${alpha*0.12})`; ctx.fill()
  }
}

export default function BambooCanvas({ wind }) {
  const canvasRef = useRef(null)
  const windRef   = useRef(wind)
  const mouseRef  = useRef({ x: -999 })
  const stateRef  = useRef({ bamboos: [], fireflies: [], t: 0, raf: null, w: 0, h: 0, last: 0 })

  const { isMobile, reducedMotion } = useDeviceProfile()
  const mobileRef = useRef(isMobile)
  useEffect(() => { mobileRef.current = isMobile }, [isMobile])
  useEffect(() => { windRef.current = wind }, [wind])

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const state = stateRef.current

    // Measured once per resize rather than per frame — reading offsetWidth/Height
    // inside the loop forced two synchronous layouts on every tick.
    function measure() {
      state.w = canvas.parentElement.offsetWidth||800
      state.h = canvas.parentElement.offsetHeight||600
    }
    function init() {
      const w=state.w, h=state.h; canvas.width=w; canvas.height=h
      const mobile=mobileRef.current
      state.bamboos=[]
      const count=Math.floor(w/(mobile?64:36))+3
      const leafDensity=mobile?0.5:1
      for(let i=0;i<count;i++){
        const x=50+(i/count)*(w-100)+(Math.random()-0.5)*25
        state.bamboos.push(new Bamboo(x,h,false,leafDensity))
      }
      state.bamboos.sort((a,b)=>a.layer-b.layer)
      state.fireflies=Array.from({length:mobile?4:10},()=>new Firefly(w,h))
    }
    function draw(){
      const w=state.w, h=state.h; const wv=windRef.current; const mx=mouseRef.current.x
      ctx.clearRect(0,0,w,h)
      ctx.fillStyle='#FAFAF8'; ctx.fillRect(0,0,w,h)
      ctx.fillStyle='#EDE8DC'; ctx.fillRect(0,h*0.76,w,h*0.24)
      ctx.fillStyle='#E2DBCC'; ctx.fillRect(0,h*0.82,w,h*0.18)
      state.fireflies.forEach(f=>{f.update(state.t);f.draw(ctx,state.t)})
      state.bamboos.forEach(b=>{b.update(wv,state.t,mx);b.draw(ctx,wv,state.t)})
      ctx.fillStyle='rgba(226,219,204,0.55)'; ctx.fillRect(0,h*0.9,w,h*0.1)
    }
    function loop(){
      state.raf=requestAnimationFrame(loop)
      const now=performance.now()
      state.t+=Math.min((now-state.last)/1000,0.05)   // delta-timed; was a fixed step that ran 2x fast at 120Hz
      state.last=now
      draw()
    }
    // stop() MUST null the id, or StrictMode's second effect run can't restart the loop.
    function stop(){ if(state.raf!=null){ cancelAnimationFrame(state.raf); state.raf=null } }
    function start(){ if(state.raf==null){ state.last=performance.now(); loop() } }

    measure(); init(); draw()

    const cleanups=[]
    if(!reducedMotion){
      const io=new IntersectionObserver(([e])=>(e.isIntersecting?start():stop()),{threshold:0,rootMargin:'100px 0px'})
      io.observe(canvas)
      const onVis=()=>(document.hidden?stop():start())
      document.addEventListener('visibilitychange',onVis)
      cleanups.push(()=>{ io.disconnect(); document.removeEventListener('visibilitychange',onVis) })
    }

    // iOS fires resize on every URL-bar collapse; only a real width change is worth
    // regenerating every stalk for.
    let resizeTimer=null
    const onResize=()=>{
      clearTimeout(resizeTimer)
      resizeTimer=setTimeout(()=>{
        const prevW=state.w
        measure(); canvas.width=state.w; canvas.height=state.h
        if(Math.abs(state.w-prevW)>32) init()
        draw()
      },150)
    }
    window.addEventListener('resize',onResize)

    return ()=>{
      stop(); clearTimeout(resizeTimer)
      cleanups.forEach(fn=>fn())
      window.removeEventListener('resize',onResize)
    }
  }, [reducedMotion])

  return (
    <canvas
      ref={canvasRef}
      style={{position:'absolute',inset:0,width:'100%',height:'100%',cursor:'crosshair',zIndex:0}}
      onMouseMove={e=>{const r=canvasRef.current.getBoundingClientRect();mouseRef.current.x=e.clientX-r.left}}
      onMouseLeave={()=>{mouseRef.current.x=-999}}
      onClick={e=>{
        if(stateRef.current.bamboos.length>=MAX_BAMBOO) return
        const r=canvasRef.current.getBoundingClientRect()
        const b=new Bamboo(e.clientX-r.left,canvasRef.current.height,true,isMobile?0.5:1)
        stateRef.current.bamboos.push(b)
        stateRef.current.bamboos.sort((a,b2)=>a.layer-b2.layer)
      }}
    />
  )
}
