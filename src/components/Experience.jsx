import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { FallingPattern } from './ui/FallingPattern.jsx'
import canadaLifeLogo from '../pics/The_Canada_Life_Assurance_Company_logo_(post-amalgamation).svg.webp'
import bellLogo from '../pics/Adobe Express - file.png'
gsap.registerPlugin(ScrollTrigger)

const EXPERIENCE = [
  {
    index: '',
    company: 'Canada Life',
    role: 'Software Developer',
    dates: '2022 - 2026',
    photo: canadaLifeLogo,
    bullets: [
      'Built and maintained 50+ automated test cases, cutting manual testing effort 40% and speeding up verification 30%.',
      'Ran 10+ test plans per quarter and compiled data-driven reports, reducing QA-to-dev feedback cycles by 25%.',
      'Investigated 20+ customer-reported issues monthly with engineering and product teams, cutting resolution time 35%.',
    ],
  },
  {
    index: '',
    company: 'Bell Canada',
    role: 'Help Desk Analyst',
    dates: '2018 - 2022',
    photo: bellLogo,
    bullets: [
      'Delivered bilingual IT support to 2,000+ employees across Windows, Microsoft 365, and mobile environments, consistently meeting SLA targets.',
      'Logged and tracked incidents in enterprise service management tools, producing reports that supported infrastructure and support teams.',
    ],
  },
]

export default function Experience() {
  const ref = useRef(null)

  useEffect(() => {
    const mm = gsap.matchMedia(ref)
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.utils.toArray('.exp-item').forEach((el) => {
        gsap.fromTo(el,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, ease: 'power2.out',
            scrollTrigger: { trigger: el, start: 'top 82%' }
          }
        )
      })
    })
    return () => mm.revert()
  }, [])

  return (
    <section id="experience" className="exp-section" ref={ref} style={{ position: 'relative', overflow: 'hidden' }}>
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
        <h2 className="section-title">Experience</h2>
        {EXPERIENCE.map(e => (
          <div className="exp-item" key={e.company}>
            <div className="exp-meta">
              <div className="project-index">{e.index}</div>
              <div className="exp-location">{e.location}</div>
              <div className="exp-dates">{e.dates}</div>
              <div className="exp-photo-wrap">
                {e.photo
                  ? <img src={e.photo} alt={e.company} className="exp-photo" />
                  : <div className="exp-photo-placeholder">ADD LOGO</div>
                }
              </div>
            </div>
            <div>
              <div className="exp-company">{e.company}</div>
              <div className="exp-role">{e.role}</div>
              <ul className="exp-bullets">
                {e.bullets.map((b, i) => <li key={i}>{b}</li>)}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
