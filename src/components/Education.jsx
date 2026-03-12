import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { FallingPattern } from './ui/FallingPattern.jsx'

gsap.registerPlugin(ScrollTrigger)

import algonquinLogo from '../pics/background-green-algonquin-college-algonquin-college-perth-logo-letterhead-ottawa-canada-text-png-clipart-jukebox-bg-removed.png'
import carletonLogo from '../pics/carleton_u_2-jukebox-bg-removed.png'

const SCHOOLS = [
  {
    index: '01',
    name: 'Carleton University',
    location: 'Ottawa, Ontario',
    degree: 'Bachelor of Computer Science',
    status: 'Expected 2027',
    photo: carletonLogo,
    courses: [
      'Data Structures & Algorithms',
      'Machine Learning',
      'Artificial Intelligence',
      'Object-Oriented Programming',
      'Computer Organization & Programming',
      'Objects & Design',
      'Statistics & Applications',
    ],
  },
  {
    index: '02',
    name: 'Algonquin College',
    location: 'Ottawa, Ontario',
    degree: 'Computer Programming Diploma',
    status: 'Graduated, GPA 3.6 / 4.0',
    photo: algonquinLogo,
    courses: [
      'Java & SQL Application Development',
      'RESTful APIs',
      'Object-Oriented Design',
      'UML Modeling',
      'Multithreading',
      'Android Development',
      'Database Design & Optimization',
      'Design Patterns',
    ],
  },
]

export default function Education() {
  const ref = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray('.edu-item').forEach((el) => {
        gsap.fromTo(el,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, ease: 'power2.out',
            scrollTrigger: { trigger: el, start: 'top 82%' }
          }
        )
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section id="education" className="edu-section" ref={ref} style={{ position: 'relative', overflow: 'hidden' }}>
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
        <h2 className="section-title">Education</h2>
        {SCHOOLS.map(s => (
          <div className="edu-item" key={s.index}>
            <div className="edu-meta">
              <div className="project-index">{s.index}</div>
              <div className="edu-location">{s.location}</div>
              <div className="edu-status">{s.status}</div>
              <div className="edu-photo-wrap">
                {s.photo
                  ? <img src={s.photo} alt={s.name} className="edu-photo" />
                  : <div className="edu-photo-placeholder">ADD PHOTO</div>
                }
              </div>
            </div>
            <div className="edu-body">
              <div className="edu-name">{s.name}</div>
              <div className="edu-degree">{s.degree}</div>
              <div className="tech-row">
                {s.courses.map(c => <span className="tech-tag" key={c}>{c}</span>)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
