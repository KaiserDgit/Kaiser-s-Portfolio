import { useEffect } from 'react'
import { MotionConfig } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Nav from './components/Nav.jsx'
import Hero from './components/Hero.jsx'
import About from './components/About.jsx'
import Experience from './components/Experience.jsx'
import Projects from './components/Projects.jsx'
import Education from './components/Education.jsx'
import Footer from './components/Footer.jsx'

gsap.registerPlugin(ScrollTrigger)
// iOS fires resize every time the URL bar collapses, forcing a full recalculation mid-scroll.
ScrollTrigger.config({ ignoreMobileResize: true })

export default function App() {
  // Trigger positions are computed before the ~25 unsized images finish loading,
  // so they're stale by the time the user scrolls — worse on mobile where the
  // images span the full column width.
  useEffect(() => {
    const onLoad = () => ScrollTrigger.refresh()
    if (document.readyState === 'complete') { onLoad(); return }
    window.addEventListener('load', onLoad)
    return () => window.removeEventListener('load', onLoad)
  }, [])

  return (
    <MotionConfig reducedMotion="user">
      <Nav />
      <Hero />
      <About />
      <Experience />
      <Projects />
      <Education />
      <Footer />
    </MotionConfig>
  )
}
