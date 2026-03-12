import { useEffect, useRef } from 'react'
import * as THREE from 'three'

const TAGS = ['React','Node','SQL','Python','Docker','TypeScript','AWS','GraphQL']

export default function SkillsSphere() {
  const canvasRef = useRef(null)
  useEffect(() => {
    const canvas = canvasRef.current
    const size = canvas.parentElement.offsetWidth || 340
    const renderer = new THREE.WebGLRenderer({ canvas, antialias:true, alpha:true })
    renderer.setPixelRatio(Math.min(devicePixelRatio,2))
    renderer.setSize(size,size); renderer.setClearColor(0x000000,0)
    const scene = new THREE.Scene()
    const cam = new THREE.PerspectiveCamera(45,1,0.1,100)
    cam.position.set(0,0,5.5)
    const sphere = new THREE.Mesh(
      new THREE.SphereGeometry(1.8,18,18),
      new THREE.MeshBasicMaterial({color:0x3A7D5C,wireframe:true,transparent:true,opacity:0.12})
    )
    scene.add(sphere)
    TAGS.forEach((_,i)=>{
      const phi=Math.acos(-1+(2*i)/TAGS.length), theta=Math.sqrt(TAGS.length*Math.PI)*phi
      const dot=new THREE.Mesh(new THREE.SphereGeometry(0.07,8,8),new THREE.MeshBasicMaterial({color:i%2===0?0x3A7D5C:0x7CBB9E}))
      dot.position.setFromSphericalCoords(1.8,phi,theta); scene.add(dot)
    })
    const ring=new THREE.Mesh(new THREE.TorusGeometry(2.1,0.012,6,72),new THREE.MeshBasicMaterial({color:0x3A7D5C,transparent:true,opacity:0.18}))
    ring.rotation.x=Math.PI/5; scene.add(ring)
    scene.add(new THREE.AmbientLight(0xffffff,0.5))
    let t=0,raf
    const anim=()=>{ raf=requestAnimationFrame(anim); t+=0.006; sphere.rotation.y=t*0.28; sphere.rotation.x=t*0.08; ring.rotation.z=t*0.14; renderer.render(scene,cam) }
    anim()
    return ()=>{ cancelAnimationFrame(raf); renderer.dispose() }
  }, [])
  return <canvas ref={canvasRef} style={{display:'block',width:'100%',aspectRatio:'1'}}/>
}
