import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { CpuArchitecture } from '@/components/ui/cpu-architecture'

export default function Hero() {
  const sectionRef = useRef(null)
  const innerRef = useRef(null)

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.5 })
    tl.fromTo('.hero-label', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' })
      .fromTo('.hero-name',  { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, ease: 'power2.out' }, '-=0.3')
      .fromTo('.hero-bio',   { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' }, '-=0.3')
  }, [])

  return (
    <section id="hero" className="hero" ref={sectionRef}>
      <CpuArchitecture className="hero-cpu-bg" />
      <div className="hero-fade" />
      <div className="hero-inner" ref={innerRef}>
<h1 className="hero-name">
          Kaiser<br />
          <em>Dualeh.</em>
        </h1>
        <p className="hero-bio">
          A Computer Science student and IT professional with 8 years of enterprise experience.
          Solve real problems at the intersection of software, systems, and design.
        </p>
      </div>
    </section>
  )
}
