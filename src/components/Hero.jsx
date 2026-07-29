import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { CpuArchitecture } from '@/components/ui/cpu-architecture'
import { useDeviceProfile } from '../hooks/useDeviceProfile.js'
import { RESUME_URL } from '../lib/site.js'

// Renders the icon twice: a resting base layer, plus a green layer that traces
// itself in on hover. The border gets the same treatment via an overlaid rect.
function SocialIcon({ href, label, tooltip, external, children }) {
  const linkProps = external ? { target: '_blank', rel: 'noreferrer' } : {}
  return (
    <a href={href} className="hero-social-icon" aria-label={label} data-tooltip={tooltip} {...linkProps}>
      <svg className="hero-social-border" viewBox="0 0 55 55" fill="none" aria-hidden="true">
        <rect pathLength="1" x="0.5" y="0.5" width="54" height="54" rx="10" />
      </svg>
      <svg width="35" height="35" viewBox="0 0 24 24" fill="none" strokeWidth="1.5">
        <g className="hero-icon-base">{children}</g>
        <g className="hero-icon-trace">{children}</g>
      </svg>
    </a>
  )
}

export default function Hero() {
  const sectionRef = useRef(null)
  const innerRef = useRef(null)
  const { isMobile, reducedMotion } = useDeviceProfile()
  const still = isMobile || reducedMotion

  useEffect(() => {
    const mm = gsap.matchMedia(sectionRef)
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const tl = gsap.timeline({ delay: 0.5 })
      tl.fromTo('.hero-name',    { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, ease: 'power2.out' })
        .fromTo('.hero-bio',     { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' }, '-=0.3')
        .fromTo('.hero-socials', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' }, '-=0.3')
    })
    return () => mm.revert()
  }, [])

  return (
    <section id="hero" className="hero" ref={sectionRef}>
      <CpuArchitecture className="hero-cpu-bg" animateLines={!still} animateMarkers={!still} animateText={!still} />
      <div className="hero-fade" />
      <div className="hero-inner" ref={innerRef}>
<h1 className="hero-name">
          Kaiser<br />
          <em>Dualeh</em>
        </h1>
        <p className="hero-bio">
          A software developer building full stack applications.
        </p>
        <div className="hero-socials">

          {/* Email */}
          <SocialIcon href="mailto:Kaiserdualeh518@gmail.com" label="Email" tooltip="Kaiserdualeh518@gmail.com">
            <path pathLength="1" d="M4 4h16c1.1 0 2 .9 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6c0-1.1.9-2 2-2z"/>
            <polyline pathLength="1" points="22,6 12,13 2,6"/>
          </SocialIcon>

          {/* Phone */}
          <SocialIcon href="tel:6132205931" label="Phone" tooltip="(613) 220-5931">
            <path pathLength="1" d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.41 2 2 0 0 1 3.6 1.23h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.82a16 16 0 0 0 6.27 6.27l.96-.96a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
          </SocialIcon>

          {/* LinkedIn */}
          <SocialIcon href="https://www.linkedin.com/in/kaiser-d-4b5713281" label="LinkedIn" tooltip="linkedin.com/in/kaiser-d-4b5713281" external>
            <path pathLength="1" d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
            <rect pathLength="1" x="2" y="9" width="4" height="12"/>
            <circle pathLength="1" cx="4" cy="4" r="2"/>
          </SocialIcon>

          {/* GitHub */}
          <SocialIcon href="https://github.com/KaiserDgit" label="GitHub" tooltip="github.com/KaiserDgit" external>
            <path pathLength="1" d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
          </SocialIcon>

          {/* Resume */}
          <SocialIcon href={RESUME_URL} label="Resume" tooltip="View résumé (PDF)" external>
            <path pathLength="1" d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
            <polyline pathLength="1" points="14 2 14 8 20 8"/>
            <line pathLength="1" x1="16" y1="13" x2="8" y2="13"/>
            <line pathLength="1" x1="16" y1="17" x2="8" y2="17"/>
            <polyline pathLength="1" points="10 9 9 9 8 9"/>
          </SocialIcon>

        </div>
      </div>
    </section>
  )
}
