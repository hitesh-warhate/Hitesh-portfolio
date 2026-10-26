import { useEffect, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useMedia } from './anim'

const RUNTIME = 42 * 60 // the whole page "plays" like a 42-minute episode

// Fixed chapter rail on the right edge (wide screens only): live timecode,
// a progress line, one dot per section and the current episode name.
export default function ChapterHud({ chapters }) {
  const wide = useMedia('(min-width: 1100px)')
  const { scrollYProgress } = useScroll()
  const time = useTransform(scrollYProgress, (v) => fmt(v * RUNTIME))
  const [active, setActive] = useState(-1)
  const [show, setShow] = useState(false)

  useEffect(() => {
    if (!wide) return
    let raf = 0
    const update = () => {
      raf = 0
      const line = window.innerHeight * 0.45
      let idx = -1
      chapters.forEach((c, i) => {
        const el = document.getElementById(c.id)
        if (el && el.getBoundingClientRect().top <= line) idx = i
      })
      setActive(idx)
      const footer = document.querySelector('.footer')
      const inFooter = footer && footer.getBoundingClientRect().top < window.innerHeight * 0.5
      setShow(window.scrollY > window.innerHeight * 0.8 && !inFooter)
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [wide, chapters])

  if (!wide) return null
  const current = chapters[active]

  return (
    <motion.aside
      className="hud"
      aria-label="Chapters"
      initial={false}
      animate={{ opacity: show ? 1 : 0, x: show ? 0 : 24 }}
      transition={{ duration: 0.4 }}
      style={{ y: '-50%', pointerEvents: show ? 'auto' : 'none' }}
    >
      <motion.span className="hud-time">{time}</motion.span>
      <div className="hud-rail">
        <div className="hud-track">
          <motion.div className="hud-fill" style={{ scaleY: scrollYProgress }} />
        </div>
        {chapters.map((c, i) => (
          <a key={c.id} href={`#${c.id}`} className={`hud-dot ${i === active ? 'on' : ''} ${i < active ? 'done' : ''}`}>
            <i />
            <span>
              <small>E{String(i + 1).padStart(2, '0')}</small> {c.label}
            </span>
          </a>
        ))}
      </div>
      <motion.span
        key={current?.id ?? 'none'}
        className="hud-now"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        style={{ rotate: 180 }}
      >
        {current ? `S01 · E${String(active + 1).padStart(2, '0')} · ${current.label}` : 'Now playing'}
      </motion.span>
    </motion.aside>
  )
}

function fmt(sec) {
  const s = Math.max(0, Math.round(sec))
  const h = Math.floor(s / 3600)
  const m = Math.floor((s % 3600) / 60)
  return [h, m, s % 60].map((n) => String(n).padStart(2, '0')).join(':')
}
