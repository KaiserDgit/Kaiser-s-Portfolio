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
    dates: 'Sept 2023 to Jan 2026',
    photo: canadaLifeLogo,
    bullets: [
      'Developed application features and automated test frameworks in C# and TypeScript using MS Visual Studio and Git, writing 50+ test cases across functional, regression, and integration scenarios within an Agile/Scrum team, cutting manual testing effort by 40%.',
      'Wrote Oracle PL/SQL queries to set up test data and validate records directly against the database, catching data level defects that UI testing alone would have missed.',
      'Built C# and C++ automation utilities that handled repetitive test setup and verification steps, which the team reused across regression cycles to save time each release.',
      'Ran test suites across web and React Native mobile apps (iOS and Android), reproducing defects and tracing root causes alongside developers to cut average resolution time by 35%.',
      'Added the automated test suite as a stage in the team CI/CD pipeline so tests ran on every build, working with services running in Docker and Kubernetes, and supported an internal SAP HRMS application by validating its payroll and administrative functions.',
    ],
  },
  {
    index: '',
    company: 'Bell Canada',
    role: 'Help Desk Analyst',
    dates: 'June 2018 to Aug 2022',
    photo: bellLogo,
    bullets: [
      'Delivered bilingual (English/French) IT support to 2,000+ employees across Windows 10/11 and Microsoft 365 (Active Directory, Exchange, SharePoint), consistently meeting SLA targets.',
      'Managed incidents and change records using enterprise service management platforms (HP Service Centre, Remedy, CWA), producing major outage reports and contributing to post incident analysis and process improvements that reduced repeat incidents.',
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
