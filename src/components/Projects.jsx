import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { FallingPattern } from './ui/FallingPattern.jsx'
import thumb1 from '../pics/Screenshot 2026-03-12 094422.png'
import thumb2 from '../pics/Screenshot 2026-03-12 153051.png'
gsap.registerPlugin(ScrollTrigger)

const PROJECTS = [
  {
    index: '01', type: 'AI Analytics App', year: '2026',
    title: 'ClearVision AI',
    url: 'https://courtvisionai-kappa.vercel.app/',
    thumb: thumb1,
    desc: 'Full stack AI-powered basketball analytics web application integrating a large language model API to generate real time scouting reports, shot charts, and game strategies from raw game data. Architected and modularized a large codebase into 14 organized components across a scalable folder structure. Engineered structured JSON prompt schemas that return consistent, parseable analytics data rendered across 6 dynamic UI modules.',
    tech: ['React', 'JavaScript', 'PostgreSQL', 'LLM API'],
  },
  {
    index: '02', type: 'Healthcare Platform', year: '2026',
    title: 'ClearQ',
    url: 'https://clearq.vercel.app/',
    thumb: thumb2,
    desc: 'Real time ER queue management platform addressing a critical gap in Canadian healthcare patients have zero visibility into their wait, costing clinics $150–$300 per walkout. Built a dynamic ETA engine that recalculates all patient wait times simultaneously on any status change, using CTAS priority levels and queue depth. Features a 5 tier patient journey system, staff dashboard with priority escalation, triage filters, and PHIPA compliant authentication concept via health card and date of birth.',
    tech: ['React', 'JavaScript', 'PostgreSQL'],
  },
]

export default function Projects() {
  const ref = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray('.project-item').forEach((el, i) => {
        gsap.fromTo(el,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, ease: 'power2.out',
            scrollTrigger: { trigger: el, start: 'top 82%' },
            delay: i * 0.05
          }
        )
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section id="projects" className="projects-section" ref={ref} style={{ position: 'relative', overflow: 'hidden' }}>
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
        <h2 className="section-title">Projects</h2>
        {PROJECTS.map(p => (
          <div className="project-item" key={p.index}>
            <div>
              <div className="project-index">{p.index}</div>
              <div className="project-type">{p.title}</div>
              <div className="project-year">{p.year}</div>
              <a href={p.url} target="_blank" rel="noreferrer" className="project-thumb-link">
                <img src={p.thumb} alt={p.title} className="project-thumb" />
              </a>
            </div>
            <div>
              <div className="project-title">{p.type}</div>
              <div className="project-desc">{p.desc}</div>
              <div className="tech-row">{p.tech.map(t => <span className="tech-tag" key={t}>{t}</span>)}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
