import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import * as THREE from 'three'
gsap.registerPlugin(ScrollTrigger)

const SKILLS = [
  { name: 'React / JavaScript', pct: 90 },
  { name: 'Python / Java', pct: 85 },
  { name: 'SQL / PostgreSQL', pct: 85 },
  { name: 'TypeScript / Angular', pct: 78 },
  { name: 'Docker / Kubernetes', pct: 72 },
  { name: 'REST APIs / Git', pct: 88 },
]

const TAGS = ['React', 'Python', 'Java', 'SQL', 'Docker', 'TypeScript', 'Figma', 'Git']

export default function Skills() {
  const sectionRef = useRef(null)
  const canvasRef = useRef(null)
  const fillsRef = useRef([])

  // Three.js sphere
  useEffect(() => {
    const canvas = canvasRef.current
    const pw = canvas.parentElement.offsetWidth / 2
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true })
    renderer.setPixelRatio(Math.min(devicePixelRatio, 2))
    renderer.setSize(pw, pw)
    renderer.setClearColor(0x000000, 0)

    const scene = new THREE.Scene()
    const cam = new THREE.PerspectiveCamera(45, 1, 0.1, 100)
    cam.position.set(0, 0, 5.5)

    const sphere = new THREE.Mesh(
      new THREE.SphereGeometry(1.8, 18, 18),
      new THREE.MeshBasicMaterial({ color: 0x3A7D5C, wireframe: true, transparent: true, opacity: 0.12 })
    )
    scene.add(sphere)

    TAGS.forEach((tag, i) => {
      const phi = Math.acos(-1 + (2 * i) / TAGS.length)
      const theta = Math.sqrt(TAGS.length * Math.PI) * phi
      const dot = new THREE.Mesh(
        new THREE.SphereGeometry(0.07, 8, 8),
        new THREE.MeshBasicMaterial({ color: i % 2 === 0 ? 0x3A7D5C : 0x7CBB9E })
      )
      dot.position.setFromSphericalCoords(1.8, phi, theta)
      scene.add(dot)
    })

    const ring = new THREE.Mesh(
      new THREE.TorusGeometry(2.1, 0.012, 6, 72),
      new THREE.MeshBasicMaterial({ color: 0x3A7D5C, transparent: true, opacity: 0.18 })
    )
    ring.rotation.x = Math.PI / 5
    scene.add(ring)
    scene.add(new THREE.AmbientLight(0xffffff, 0.5))

    let t = 0, rafId
    const animate = () => {
      rafId = requestAnimationFrame(animate)
      t += 0.006
      sphere.rotation.y = t * 0.28
      sphere.rotation.x = t * 0.08
      ring.rotation.z = t * 0.14
      renderer.render(scene, cam)
    }
    animate()

    const ro = new ResizeObserver(() => {
      const w = canvas.parentElement.offsetWidth / 2
      renderer.setSize(w, w)
    })
    ro.observe(canvas.parentElement)

    return () => {
      cancelAnimationFrame(rafId)
      renderer.dispose()
      ro.disconnect()
    }
  }, [])

  // GSAP skill bars
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(fillsRef.current,
        { scaleX: 0 },
        {
          scaleX: (i) => SKILLS[i].pct / 100,
          duration: 1.2,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' }
        }
      )
      gsap.fromTo('.skill-row',
        { x: -20, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.6, stagger: 0.08, ease: 'power2.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' }
        }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section id="skills" className="skills-section" ref={sectionRef}>
      <div className="section-wrap">
        <div className="section-tag">Skills</div>
        <h2 className="section-title">Tools of the trade</h2>
        <div className="skills-grid">
          <div>
            {SKILLS.map((s, i) => (
              <div className="skill-row" key={s.name}>
                <div className="skill-header">
                  <span className="skill-name">{s.name}</span>
                  <span className="skill-pct">{s.pct}%</span>
                </div>
                <div className="skill-track">
                  <div className="skill-fill" ref={el => fillsRef.current[i] = el} />
                </div>
              </div>
            ))}
          </div>
          <canvas className="skills-canvas" ref={canvasRef} />
        </div>
      </div>
    </section>
  )
}
