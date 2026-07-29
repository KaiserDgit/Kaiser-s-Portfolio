import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import styles from './Nav.module.css'
import { RESUME_URL } from '../lib/site.js'

// `external` entries leave the page instead of scrolling to a section.
const LINKS = [
  { href: '#hero',       label: 'Home' },
  { href: '#about',      label: 'About' },
  { href: '#experience', label: 'Experience' },
  { href: '#projects',   label: 'Projects' },
  { href: '#education',  label: 'Education' },
  { href: RESUME_URL,    label: 'Resume', external: true },
]

// Matches the cubic-bezier(.22,1,.36,1) easing the rest of the page uses.
const SLIDE = { type: 'tween', ease: [0.22, 1, 0.36, 1], duration: 0.4 }

export default function Nav() {
  const [open, setOpen] = useState(false)
  const toggleRef = useRef(null)
  const firstLinkRef = useRef(null)

  useEffect(() => {
    if (!open) return
    const onKeyDown = (e) => { if (e.key === 'Escape') setOpen(false) }
    window.addEventListener('keydown', onKeyDown)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    // preventScroll: the drawer is fixed, but focusing would otherwise nudge the
    // locked page underneath it.
    firstLinkRef.current?.focus({ preventScroll: true })
    return () => {
      window.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = prevOverflow
      toggleRef.current?.focus({ preventScroll: true })
    }
  }, [open])

  return (
    <>
      <button
        ref={toggleRef}
        type="button"
        className={`${styles.toggle} ${open ? styles.toggleOpen : ''}`}
        aria-label={open ? 'Close menu' : 'Open menu'}
        aria-expanded={open}
        aria-controls="nav-drawer"
        onClick={() => setOpen((v) => !v)}
      >
        <span className={styles.bar} />
        <span className={styles.bar} />
        <span className={styles.bar} />
      </button>

      {/* Both siblings sit directly under AnimatePresence, a wrapping fragment
          would be the unkeyed child and their exit animations would be skipped. */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="backdrop"
            className={styles.backdrop}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setOpen(false)}
          />
        )}
        {open && (
          <motion.aside
            key="drawer"
            id="nav-drawer"
            className={styles.drawer}
            role="dialog"
            aria-modal="true"
            aria-label="Site navigation"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={SLIDE}
          >
            <nav>
              <ul className={styles.links}>
                {LINKS.map((link, i) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      ref={i === 0 ? firstLinkRef : null}
                      onClick={() => setOpen(false)}
                      {...(link.external ? { target: '_blank', rel: 'noreferrer' } : {})}
                    >
                      {link.label}
                      {link.external && (
                        <svg
                          className={styles.linkArrow}
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.75"
                          aria-hidden="true"
                        >
                          <path d="M7 17 17 7M9 7h8v8" />
                        </svg>
                      )}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  )
}
