import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion'
import { profile, education, projects, skills } from '../data'
import { ScrollProgress, CursorGlow, Tilt, CountUp, Marquee, Embers, useMedia } from './anim'
import ChapterHud from './ChapterHud'
import { Originals, Skills, Journey, FullStory, Contact } from './Sections'
import ProjectModal from './ProjectModal'
import Footer from './Footer'

const sectionMap = {
  originals: Originals,
  skills: Skills,
  journey: Journey,
  story: FullStory,
  contact: Contact,
}

const navLabels = {
  originals: 'Originals',
  skills: 'Skills',
  journey: 'Journey',
  story: 'Full Story',
  contact: 'Contact',
}

const order = ['originals', 'skills', 'journey', 'story', 'contact']
const chapters = order.map((id) => ({ id, label: navLabels[id] }))

export default function Browse() {
  const [open, setOpen] = useState(null)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
  }, [open])

  return (
    <div className="browse">
      <ScrollProgress />
      <ChapterHud chapters={chapters} />
      <CursorGlow />
      <Navbar scrolled={scrolled} />
      <Hero onPlay={() => setOpen(projects[0])} />
      <ContinueRow />
      <Marquee items={skills.flatMap((c) => c.items.map(([n]) => n))} />
      {order.map((id) => {
        const S = sectionMap[id]
        return <S key={id} onOpen={setOpen} />
      })}
      <Footer />
      <AnimatePresence>{open && <ProjectModal project={open} onClose={() => setOpen(null)} onOpen={setOpen} />}</AnimatePresence>
    </div>
  )
}

function Navbar({ scrolled }) {
  const [menu, setMenu] = useState(false)
  return (
    <motion.header
      className={`nav ${scrolled ? 'nav-solid' : ''}`}
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, delay: 0.2, ease: [0.2, 0.8, 0.2, 1] }}
    >
      <a href="#top" className="logo" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
        HITESH
      </a>
      <nav className={`nav-links ${menu ? 'open' : ''}`} onClick={() => setMenu(false)}>
        <a href="#top">Home</a>
        {order.map((id, i) => (
          <motion.a
            key={id}
            href={`#${id}`}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45 + i * 0.06 }}
          >
            {navLabels[id]}
          </motion.a>
        ))}
      </nav>
      <div className="nav-right">
        <a className="nav-resume" href={profile.resume} target="_blank" rel="noreferrer">
          Resume
        </a>
        <a className="nav-avatar" href="#top" title={profile.name}>
          <span className="mini-avatar">
            <img src={profile.photo} alt="" />
          </span>
        </a>
        <button className="nav-burger" onClick={() => setMenu((m) => !m)} aria-label="Menu">
          <span />
          <span />
          <span />
        </button>
      </div>
    </motion.header>
  )
}

function Hero({ onPlay }) {
  // Desktop: the hero pins while the "film starts" (letterbox + zoom-through).
  // Phones / reduced motion: it just scrolls away with a lighter version.
  const pinned = useMedia('(min-width: 901px) and (min-height: 640px) and (prefers-reduced-motion: no-preference)')
  return <HeroScene key={pinned ? 'pin' : 'flow'} pinned={pinned} onPlay={onPlay} />
}

function HeroScene({ pinned, onPlay }) {
  const ref = useRef(null)
  const { scrollYProgress: p } = useScroll({
    target: ref,
    offset: pinned ? ['start start', 'end end'] : ['start start', 'end start'],
  })
  const photoY = useTransform(p, [0, 1], ['0%', pinned ? '4%' : '18%'])
  const photoScale = useTransform(p, [0, 1], [1, pinned ? 1.35 : 1.1])
  const contentY = useTransform(p, [0, 1], ['0%', pinned ? '-8%' : '-30%'])
  const restOpacity = useTransform(p, [0, pinned ? 0.45 : 0.6], [1, 0])
  const titleOpacity = useTransform(p, [pinned ? 0.55 : 0.3, pinned ? 1 : 0.8], [1, 0])
  const titleScale = useTransform(p, [0, 1], [1, pinned ? 1.18 : 1.05])
  const bars = useTransform(p, [0.05, pinned ? 0.55 : 0.7], [0, 1])
  const dim = useTransform(p, [0.25, 1], [0, pinned ? 0.8 : 0.5])
  const cueOpacity = useTransform(p, [0, 0.08], [1, 0])

  return (
    <div className={`hero-stage ${pinned ? 'is-pinned' : ''}`} ref={ref}>
      <section className="hero" id="top">
        <motion.div className="hero-photo" style={{ y: photoY, scale: photoScale }}>
          <div className="kenburns">
            <motion.img
              src={profile.photo}
              alt={profile.name}
              initial={{ scale: 1.25, opacity: 0, filter: 'blur(12px)' }}
              animate={{ scale: 1, opacity: 1, filter: 'blur(0px)' }}
              transition={{ duration: 1.8, ease: [0.2, 0.8, 0.2, 1] }}
            />
          </div>
        </motion.div>
        <div className="hero-glow" />
        <Embers />
        <div className="hero-fade" />
        <motion.div className="hero-dim" style={{ opacity: dim }} />
        <motion.div
          className="hero-content"
          style={{ y: contentY }}
          initial="hide"
          animate="show"
          variants={{ show: { transition: { staggerChildren: 0.12, delayChildren: 0.9 } } }}
        >
          <motion.div style={{ opacity: restOpacity }}>
            <motion.div className="hero-series" variants={fadeUp}>
              <b>H</b> SERIES
            </motion.div>
          </motion.div>
          <motion.h1 className="hero-title-wrap" style={{ opacity: titleOpacity, scale: titleScale, originX: 0 }}>
            <HeroTitle text={profile.first} progress={p} spread={pinned ? 46 : 18} />
            <motion.span className="hero-title-shine" aria-hidden="true" style={{ opacity: cueOpacity }}>
              {profile.first}
            </motion.span>
          </motion.h1>
          <motion.div style={{ opacity: restOpacity }}>
            <motion.div className="hero-sub" variants={fadeUp}>
              THE SERIES
            </motion.div>
            <motion.div className="hero-meta" variants={fadeUp}>
              <span className="match">
                <CountUp to={98} />% Match
              </span>
              <span>{education.span}</span>
              <span className="pill">B.Tech IT</span>
              <span>{projects.length} Originals</span>
              <span className="pill">CGPA {education.cgpa}</span>
            </motion.div>
            <motion.div className="hero-genre" variants={fadeUp}>
              {profile.tagline}
            </motion.div>
            <motion.p className="hero-desc" variants={fadeUp}>
              {profile.summary}
            </motion.p>
            <motion.div className="hero-actions" variants={fadeUp}>
              <motion.button className="btn btn-play" onClick={onPlay} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M7 4v16l13-8z" />
                </svg>
                Play
              </motion.button>
              <motion.a whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="btn btn-info" href={profile.resume} target="_blank" rel="noreferrer">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="9" />
                  <path d="M12 11v6M12 7.5v.5" />
                </svg>
                View Resume
              </motion.a>
            </motion.div>
          </motion.div>
        </motion.div>
        <motion.div
          className="hero-rating"
          initial={{ x: 120, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 1.8, duration: 0.6 }}
        >
          <span>{profile.location}</span>
        </motion.div>
        <motion.div className="letterbox top" style={{ scaleY: bars }} />
        <motion.div className="letterbox bottom" style={{ scaleY: bars }} />
        <motion.a
          href="#continue"
          className="scroll-cue"
          aria-label="Scroll down"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.4 }}
          style={{ opacity: cueOpacity }}
        >
          <span />
        </motion.a>
      </section>
    </div>
  )
}

// Title letters: rise in on load, then drift apart from the centre as the hero scrolls.
function HeroTitle({ text, progress, spread }) {
  const chars = [...text]
  const mid = (chars.length - 1) / 2
  return (
    <motion.span
      className="hero-title"
      aria-label={text}
      initial="hide"
      animate="show"
      variants={{ show: { transition: { staggerChildren: 0.07, delayChildren: 0.3 } } }}
    >
      {chars.map((ch, i) => (
        <HeroLetter key={i} ch={ch} progress={progress} offset={i * spread} lift={Math.abs(i - mid) * 8} />
      ))}
    </motion.span>
  )
}

function HeroLetter({ ch, progress, offset, lift }) {
  const x = useTransform(progress, [0.1, 0.9], [0, offset])
  const y = useTransform(progress, [0.1, 0.9], [0, -lift])
  return (
    <motion.span className="hero-letter" style={{ x, y }} aria-hidden="true">
      <span className="split-mask">
        <motion.span
          className="split-char"
          variants={{
            hide: { y: '110%', rotate: 8, opacity: 0 },
            show: { y: '0%', rotate: 0, opacity: 1, transition: { duration: 0.8, ease: [0.2, 0.8, 0.2, 1] } },
          }}
        >
          {ch}
        </motion.span>
      </span>
    </motion.span>
  )
}

const fadeUp = {
  hide: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.2, 0.8, 0.2, 1] } },
}

const continueCards = {
  originals: { title: 'My Projects', sub: 'Four originals, built end to end', bg: ['#7f1d1d', '#e50914'], progress: 72 },
  skills: { title: 'Skill Universe', sub: 'Languages, frameworks & tools', bg: ['#3b0764', '#a855f7'], progress: 45 },
  journey: { title: 'My Journey', sub: 'College, internships & beyond', bg: ['#78350f', '#f59e0b'], progress: 60 },
  story: { title: 'About Me', sub: 'The plot · Education · Experience', bg: ['#0c4a6e', '#0ea5e9'], progress: 30 },
  contact: { title: 'Next Season', sub: "Let's build something useful", bg: ['#14532d', '#22c55e'], progress: 10 },
}

function ContinueRow() {
  return (
    <section className="row continue" id="continue">
      <motion.h2
        className="row-title"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.5 }}
      >
        Continue Exploring
      </motion.h2>
      <div className="rail">
        {order.map((id, i) => {
          const c = continueCards[id]
          return (
            <motion.div
              key={id}
              className="cw-wrap"
              initial={{ opacity: 0, y: 40, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 1.6 + i * 0.1, type: 'spring', stiffness: 160, damping: 18 }}
            >
            <Tilt
              as="a"
              href={`#${id}`}
              className="cw-card"
              style={{ background: `linear-gradient(135deg, ${c.bg[0]}, ${c.bg[1]})` }}
              whileHover={{ scale: 1.06, zIndex: 2 }}
            >
              <span className="cw-ep">Episode {String(i + 1).padStart(2, '0')}</span>
              <span className="cw-title">{c.title}</span>
              <span className="cw-sub">{c.sub}</span>
              <span className="cw-play">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M7 4v16l13-8z" />
                </svg>
              </span>
              <span className="cw-bar">
                <motion.span
                  initial={{ width: 0 }}
                  animate={{ width: `${c.progress}%` }}
                  transition={{ delay: 2.1 + i * 0.1, duration: 1.2, ease: [0.2, 0.8, 0.2, 1] }}
                />
              </span>
            </Tilt>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}
