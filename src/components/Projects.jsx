import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { FallingPattern } from './ui/FallingPattern.jsx'
import { logoFor, slugify } from '../lib/techLogos.js'
import thumb1 from '../pics/Screenshot 2026-03-12 094422.png'
import thumb2 from '../pics/Screenshot 2026-03-12 153051.png'
import bidsenseThumb from '../pics/Bidsense picture.jpg'
gsap.registerPlugin(ScrollTrigger)

// Thumb and url are both optional so a project can be listed before its
// screenshot or public link exists, rather than rendering a broken <img>.
function ProjectThumb({ project }) {
  if (!project.thumb) {
    return <div className="project-thumb-placeholder">SCREENSHOT PENDING</div>
  }
  const img = <img src={project.thumb} alt={project.title} className="project-thumb" />
  const slug = slugify(project.title)
  if (!project.url) return <div className="project-thumb-link" data-project={slug}>{img}</div>
  return (
    <a href={project.url} target="_blank" rel="noreferrer" className="project-thumb-link" data-project={slug}>{img}</a>
  )
}

const PROJECTS = [
  {
    index: '', type: 'AI Cost Estimation Platform', year: '',
    title: 'BidSense',
    url: '',
    thumb: bidsenseThumb,
    desc: 'Built an ML pipeline in Python with scikit learn to predict construction cost and timeline overruns, framing it as a regression problem and comparing several models to choose the most accurate, and prototyped a PyTorch neural network to benchmark against the simpler models. Moved the heaviest feature encoding work into a C++ preprocessing module to cut pipeline processing time by roughly 30%, and served predictions through a FastAPI endpoint containerized with Docker and deployed to AWS, tracking model versions per client in PostgreSQL.',
    tech: ['Python', 'PyTorch', 'scikit learn', 'C++', 'FastAPI', 'PostgreSQL', 'Docker', 'Kubernetes', 'AWS'],
  },
  {
    index: '', type: 'AI Basketball Analytics Platform', year: '',
    title: 'ClearVision AI',
    url: 'https://courtvisionai-kappa.vercel.app/',
    thumb: thumb1,
    desc: 'Built a full stack AI analytics app (React/TypeScript frontend, C# .NET backend) that generates scouting reports by retrieving the most relevant game data and passing it to an LLM so the output stays grounded in real stats, a retrieval augmented (RAG) approach built with LangChain and a vector database, with API keys kept server side. Designed typed React components and validated the LLM JSON output against a schema so the interface always rendered consistent, well formed reports, and deployed the application on AWS.',
    tech: ['React', 'TypeScript', 'C#', '.NET', 'LangChain', 'RAG', 'Vector DB', 'PostgreSQL', 'AWS'],
  },
  {
    index: '', type: 'Healthcare Platform', year: '',
    title: 'ClearQ',
    url: 'https://clearq.vercel.app/',
    thumb: thumb2,
    desc: 'Real time ER queue management platform addressing a critical gap in Canadian healthcare patients have zero visibility into their wait, costing clinics $150 to $300 per walkout. Built a dynamic ETA engine that recalculates all patient wait times simultaneously on any status change, using CTAS priority levels and queue depth. Features a 5 tier patient journey system, staff dashboard with priority escalation, triage filters, and PHIPA compliant authentication concept via health card and date of birth.',
    tech: ['React', 'JavaScript', 'PostgreSQL'],
  },
]

export default function Projects() {
  const ref = useRef(null)

  useEffect(() => {
    const mm = gsap.matchMedia(ref)
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.utils.toArray('.project-item').forEach((el, i) => {
        gsap.fromTo(el,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, ease: 'power2.out',
            scrollTrigger: { trigger: el, start: 'top 82%' },
            delay: i * 0.05
          }
        )
      })
    })
    return () => mm.revert()
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
          <div className="project-item" key={p.title}>
            <div>
              <div className="project-index">{p.index}</div>
              <div className="project-type">{p.title}</div>
              <div className="project-year">{p.year}</div>
              <ProjectThumb project={p} />
            </div>
            <div>
              <div className="project-title">{p.type}</div>
              <div className="project-desc">{p.desc}</div>
              <div className="tech-row">
                {p.tech.map(t => {
                  const logo = logoFor(t)
                  return logo
                    ? <span className="tech-logo tech-logo-sm" key={t} data-slug={slugify(t)} title={t}><img src={logo} alt={t} /></span>
                    : <span className="tech-tag" key={t}>{t}</span>
                })}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
