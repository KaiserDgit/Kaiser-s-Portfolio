import styles from './Footer.module.css'
export default function Footer() {
  return (
    <footer className={styles.footer}>
      <p>© {new Date().getFullYear()} Kaiser Dualeh</p>
      <p>Built with React · GSAP · Three.js</p>
    </footer>
  )
}
