import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { FallingPattern } from './ui/FallingPattern.jsx'
import profilePic from '../pics/IMG_3243.jpg'

gsap.registerPlugin(ScrollTrigger)

export default function About() {
  const ref = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.about-grid',
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: ref.current, start: 'top 75%' }
        }
      )
      gsap.fromTo('.stat-num',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'power2.out',
          scrollTrigger: { trigger: '.about-stats', start: 'top 85%' }
        }
      )
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section id="about" className="about-section" ref={ref} style={{ position: 'relative', overflow: 'hidden' }}>
      <div className="section-pattern-wrap" aria-hidden="true">
        <FallingPattern
          color="rgba(58, 125, 92, 0.35)"
          backgroundColor="transparent"
          duration={120}
          blurIntensity="0.5em"
          density={1.2}
          style={{ opacity: 0.6 }}
        />
        <div className="section-pattern-vignette" />
      </div>
      <div className="section-wrap" style={{ position: 'relative', zIndex: 1 }}>
        <div className="about-grid">
          <div className="about-photo-wrap">
            <div className="about-photo-frame">
              <img src={profilePic} alt="Profile" className="about-photo" />
            </div>
          </div>
          <div className="about-text">
            <h2 className="section-title">About</h2>
            <p>Enterprise IT experience at Bell Canada and Canada Life gave me something most developers don't have: a deep understanding of how systems fail in the real world. Now finishing my BSc in Computer Science (AI/Machine Learning) at Carleton, I build full stack products in React, JavaScript, Python, and SQL with a bias toward clear architecture and production-ready code.</p>
            <p>Current focus: AI, SaaS and IT.</p>
            <div className="about-stats">
              <div><div className="stat-num">8+</div><div className="stat-label">Years in IT</div></div>
              <div><div className="stat-num">1</div><div className="stat-label">Degree earned</div></div>
              <div><div className="stat-num">10+</div><div className="stat-label">Technologies</div></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
