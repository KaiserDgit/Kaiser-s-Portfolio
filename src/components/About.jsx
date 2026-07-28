import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { FallingPattern } from './ui/FallingPattern.jsx'
import { LOGOS } from '../lib/techLogos.js'
import profilePic from '../pics/IMG_3243.jpg'

gsap.registerPlugin(ScrollTrigger)

const TECH = [
  {
    label: 'Languages',
    items: [
      { name: 'Java', slug: 'java' },
      { name: 'Python', slug: 'python' },
      { name: 'JavaScript', slug: 'javascript' },
      { name: 'TypeScript', slug: 'typescript' },
      { name: 'SQL', slug: 'sql' },
      { name: 'C#', slug: 'csharp' },
      { name: 'C++', slug: 'cpp' },
    ],
  },
  {
    label: 'Frameworks & Tools',
    items: [
      { name: 'React', slug: 'react' },
      { name: 'Node.js', slug: 'nodejs' },
      { name: 'Vue.js', slug: 'vuejs' },
      { name: 'Django', slug: 'django' },
      { name: 'PostgreSQL', slug: 'postgresql' },
      { name: 'MongoDB', slug: 'mongodb' },
      { name: 'Docker', slug: 'docker' },
      { name: 'AWS', slug: 'aws' },
      { name: 'Postman', slug: 'postman' },
      { name: 'Claude', slug: 'claude' },
      { name: 'Git', slug: 'git' },
    ],
  },
]

export default function About() {
  const ref = useRef(null)

  useEffect(() => {
    const mm = gsap.matchMedia(ref)
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.fromTo('.about-grid',
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: ref.current, start: 'top 75%' }
        }
      )
    })
    return () => mm.revert()
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
            <p>Software developer with 3 years of experience building full stack applications. Experienced integrating machine learning models into production web applications, working with data pipelines, and leveraging AI tools to improve software performance and user experience. Comfortable collaborating with cross functional teams and passionate about applying AI and modern development practices to solve real world problems.</p>
            <div className="about-tech">
              {TECH.map(group => (
                <div className="about-tech-group" key={group.label}>
                  <div className="about-tech-label">{group.label}</div>
                  <div className="tech-logos">
                    {group.items.filter(item => LOGOS[item.slug]).map(item => (
                      <span className="tech-logo" key={item.slug} data-slug={item.slug} title={item.name}>
                        <img src={LOGOS[item.slug]} alt={item.name} />
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
