import { useCallback, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { profile, projects, skills } from '../data'
import BugRunner from './BugRunner'
import { CountUp } from './anim'
import { GithubIcon } from './Sections'
import { store, session } from './store'

// Global page-view counter (free, no-auth Abacus API). Local dev only reads it,
// so testing doesn't inflate the real number.
const COUNTER = 'https://abacus.jasoncameron.dev'
const COUNTER_KEY = 'hiteshwarhate-portfolio/visits'

const credits = [
  ['Directed by', profile.name],
  ['Written by', profile.name],
  ['Starring', `${profile.name} as “The Developer”`],
  ['Produced at', 'St. Vincent Pallotti College, Nagpur'],
  ['Special effects', 'React · Framer Motion · Canvas'],
  ['Catering', 'Chai, lots of chai'],
  ['Bugs harmed', 'Many. Please play below to harm more.'],
]

const links = [
  ['Originals', '#originals'],
  ['Skills', '#skills'],
  ['Journey', '#journey'],
  ['Full Story', '#story'],
  ['Contact', '#contact'],
]

export default function Footer() {
  const stats = useVisitStats()
  const [games, setGames] = useState(() => readGameStats())
  const refreshGames = useCallback(() => setGames(readGameStats()), [])

  return (
    <footer className="footer">
      <div className="footer-bg" aria-hidden="true" />

      <motion.div
        className="credits"
        initial="hide"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        variants={{ show: { transition: { staggerChildren: 0.08 } } }}
      >
        <motion.span className="kicker" variants={rise}>
          <i /> Thanks for watching
        </motion.span>
        <motion.h2 className="credits-title" variants={rise}>
          That&rsquo;s a wrap.
        </motion.h2>
        <div className="credits-list">
          {credits.map(([role, who]) => (
            <motion.div key={role} className="credit" variants={rise}>
              <span>{role}</span>
              <b>{who}</b>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <div className="footer-grid">
        <motion.section
          className="panel game-panel"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <header className="panel-head">
            <div>
              <span className="panel-ep">Bonus episode</span>
              <h3>Bug Runner</h3>
            </div>
            <span className="panel-keys">
              <kbd>Space</kbd> / tap to jump · double-jump works
            </span>
          </header>
          <BugRunner onScore={refreshGames} />
        </motion.section>

        <motion.section
          className="panel stats-panel"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15 }}
        >
          <header className="panel-head">
            <div>
              <span className="panel-ep">Live</span>
              <h3>Viewer Stats</h3>
            </div>
            <span className="live-dot">
              <i /> LIVE
            </span>
          </header>
          <div className="vstats">
            <VStat big label="Total views" value={stats.total} note="all-time, everyone" />
            <VStat label="Your visits" value={stats.mine} note={stats.mine === 1 ? 'welcome, first-timer!' : 'welcome back 👋'} />
            <VStat label="Watching for" text={fmtDuration(stats.seconds)} note="this session" />
            <VStat label="First visit" text={stats.first} note={stats.lastSeen ? `last seen ${stats.lastSeen}` : 'that’s today'} />
            <VStat label="Best score" value={games.best} note={`${games.plays} game${games.plays === 1 ? '' : 's'} played`} />
            <VStat label="Hitesh’s time" text={stats.clock} note="Nagpur, India (IST)" />
          </div>
          <div className="vfacts">
            <span>
              <b>{projects.length}</b> originals
            </span>
            <span>
              <b>{skills.reduce((a, s) => a + s.items.length, 0)}</b> skills
            </span>
            <span>
              <b>∞</b> cups of chai
            </span>
          </div>
        </motion.section>
      </div>

      <div className="footer-bottom">
        <div className="footer-brand">
          <a href="#top" className="logo">
            HITESH
          </a>
          <p>{profile.tagline}</p>
        </div>
        <nav className="footer-links">
          {links.map(([l, h]) => (
            <a key={h} href={h}>
              {l}
            </a>
          ))}
        </nav>
        <div className="footer-social">
          <a href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub">
            <GithubIcon />
          </a>
          <a href={profile.resume} target="_blank" rel="noreferrer">
            Resume
          </a>
          <motion.a href="#top" className="to-top" whileHover={{ y: -4 }} aria-label="Back to top">
            ↑
          </motion.a>
        </div>
      </div>
      <p className="footer-legal">
        © {profile.name} · Designed &amp; built with React + Framer Motion · Not affiliated with Netflix, just inspired by it.
      </p>
    </footer>
  )
}

const rise = {
  hide: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.2, 0.8, 0.2, 1] } },
}

function VStat({ label, value, text, note, big }) {
  return (
    <div className={`vstat ${big ? 'big' : ''}`}>
      <span className="vstat-label">{label}</span>
      <b className="vstat-value">{value == null ? (text ?? '—') : <CountUp to={value} />}</b>
      <span className="vstat-note">{note}</span>
    </div>
  )
}

function readGameStats() {
  return {
    best: Number(store.get('bugRunnerBest')) || 0,
    plays: Number(store.get('bugRunnerPlays')) || 0,
  }
}

function useVisitStats() {
  const [s] = useState(() => {
    const now = Date.now()
    const counted = session.get('visitCounted')
    let mine = Number(store.get('visits')) || 0
    const first = Number(store.get('firstVisit')) || now
    const prev = Number(store.get('lastVisit')) || 0
    if (!counted) {
      mine += 1
      store.set('visits', mine)
      store.set('firstVisit', first)
      store.set('lastVisit', now)
      session.set('visitCounted', '1')
      session.set('prevVisit', prev)
    }
    const shownPrev = Number(session.get('prevVisit')) || 0
    return {
      mine,
      first: new Date(first).toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' }),
      lastSeen: shownPrev ? timeAgo(shownPrev) : '',
      start: now,
    }
  })
  const [total, setTotal] = useState(null)
  const [now, setNow] = useState(() => Date.now())

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000)
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    let alive = true
    const hit = !import.meta.env.DEV && !session.get('globalCounted')
    fetch(`${COUNTER}/${hit ? 'hit' : 'get'}/${COUNTER_KEY}`)
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        if (!alive || !d || typeof d.value !== 'number') return
        if (hit) session.set('globalCounted', '1')
        setTotal(d.value)
      })
      .catch(() => {})
    return () => {
      alive = false
    }
  }, [])

  return {
    ...s,
    total,
    seconds: Math.floor((now - s.start) / 1000),
    clock: new Date(now).toLocaleTimeString('en-IN', { timeZone: 'Asia/Kolkata', hour: '2-digit', minute: '2-digit', second: '2-digit' }),
  }
}

function fmtDuration(sec) {
  const m = Math.floor(sec / 60)
  const s = sec % 60
  return m ? `${m}m ${String(s).padStart(2, '0')}s` : `${s}s`
}

function timeAgo(ts) {
  const d = (Date.now() - ts) / 1000
  if (d < 60) return 'just now'
  if (d < 3600) return `${Math.floor(d / 60)} min ago`
  if (d < 86400) return `${Math.floor(d / 3600)} h ago`
  return `${Math.floor(d / 86400)} days ago`
}
