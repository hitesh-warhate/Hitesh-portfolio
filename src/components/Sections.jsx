import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { profile, education, focus, projects, skills, journey } from '../data'
import ProjectArt from './ProjectArt'
import { SplitText, Tilt, CountUp, Marquee } from './anim'

const reveal = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.7, ease: [0.2, 0.8, 0.2, 1] },
}

function Heading({ kicker, title, aside }) {
  return (
    <div className="sec-head">
      <div>
        <motion.span
          className="kicker"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.i initial={{ width: 0 }} whileInView={{ width: 26 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }} />{' '}
          {kicker}
        </motion.span>
        <SplitText as="h2" text={title} className="sec-title" inView stagger={0.035} />
      </div>
      {aside && (
        <motion.p
          className="sec-aside"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          {aside}
        </motion.p>
      )}
    </div>
  )
}

/* ---------- Originals (projects) ---------- */
export function Originals({ onOpen }) {
  return (
    <section className="section" id="originals">
      <Heading
        kicker={`H Originals · ${projects.length} titles`}
        title="Originals"
        aside="Productions from the studio — each one planned, built and shipped end to end. Click a title for the full episode guide."
      />
      <div className="rail rail-posters">
        {projects.map((p, i) => (
          <motion.button
            key={p.slug}
            className="poster"
            onClick={() => onOpen(p)}
            initial={{ opacity: 0, x: 80, rotateY: -25 }}
            whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: i * 0.12, duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
          >
            <motion.span
              className="rank"
              initial={{ opacity: 0, scale: 0.6, y: 40 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.25 + i * 0.12, type: 'spring', stiffness: 140, damping: 14 }}
            >
              {i + 1}
            </motion.span>
            <Tilt className="poster-card" max={8}>
              <ProjectArt project={p} />
              <div className="poster-info">
                <div className="poster-btns">
                  <span className="circle white">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M7 4v16l13-8z" />
                    </svg>
                  </span>
                  <span className="circle">+</span>
                  <span className="circle push">⌄</span>
                </div>
                <div className="poster-meta">
                  <span className="match">{p.match}% Match</span>
                  <span className="pill">{p.genre}</span>
                  <span>{p.year}</span>
                </div>
                <p className="poster-log">{p.logline}</p>
                <div className="dots">{p.stack.slice(0, 4).join(' • ')}</div>
              </div>
            </Tilt>
          </motion.button>
        ))}
      </div>
    </section>
  )
}

/* ---------- Skills ---------- */
export function Skills() {
  const [active, setActive] = useState(0)
  const cat = skills[active]
  return (
    <section className="section" id="skills">
      <Heading
        kicker="Genres"
        title="My Skill Universe"
        aside="Pick a genre to see the cast. Ratings are self-assessed out of 20 — honest, not inflated."
      />
      <motion.div className="skills" {...reveal}>
        <div className="skill-tabs">
          {skills.map((s, i) => (
            <button key={s.category} className={`skill-tab ${i === active ? 'on' : ''}`} onClick={() => setActive(i)}>
              <span>{s.category}</span>
              <small>
                {s.items.length} skills · {s.blurb}
              </small>
            </button>
          ))}
        </div>
        <div className="skill-panel">
          <div className="skill-panel-head">
            <b>{cat.category}</b> — {cat.blurb}
          </div>
          <AnimatePresence mode="wait">
            <motion.div
              key={cat.category}
              className="skill-grid"
              initial="hide"
              animate="show"
              exit="hide"
              variants={{ show: { transition: { staggerChildren: 0.05 } } }}
            >
              {cat.items.map(([name, lvl]) => (
                <motion.div
                  key={name}
                  className="skill-tile"
                  variants={{ hide: { opacity: 0, y: 20, scale: 0.9 }, show: { opacity: 1, y: 0, scale: 1 } }}
                  whileHover={{ y: -4, scale: 1.03 }}
                >
                  <motion.span
                    className="skill-badge"
                    variants={{ hide: { rotate: -90, scale: 0 }, show: { rotate: 0, scale: 1 } }}
                    transition={{ type: 'spring', stiffness: 260, damping: 16 }}
                  >
                    {name.slice(0, 2).toUpperCase()}
                  </motion.span>
                  <span className="skill-name">{name}</span>
                  <span className="skill-bar">
                    <motion.span initial={{ width: 0 }} animate={{ width: `${(lvl / 20) * 100}%` }} transition={{ duration: 0.8, delay: 0.15 }} />
                  </span>
                  <span className="skill-lvl">{lvl}/20</span>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>
      <div className="skills-marquee">
        <Marquee items={focus} reverse />
      </div>
    </section>
  )
}

/* ---------- Journey ---------- */
export function Journey() {
  const seasons = [...new Set(journey.map((e) => e.code.split(' ')[0]))]
  const [season, setSeason] = useState(seasons[seasons.length - 1])
  const eps = journey.filter((e) => e.code.startsWith(season))
  return (
    <section className="section" id="journey">
      <Heading kicker="Docuseries" title="My Journey" aside="Season 1 is the foundation. Season 2 is where it gets real." />
      <motion.div className="seasons" {...reveal}>
        {seasons.map((s) => (
          <button key={s} className={`season ${s === season ? 'on' : ''}`} onClick={() => setSeason(s)}>
            Season {Number(s.slice(1))}
          </button>
        ))}
      </motion.div>
      <AnimatePresence mode="wait">
        <motion.div
          key={season}
          className="episodes"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -30 }}
          transition={{ duration: 0.35 }}
        >
          {eps.map((e, i) => (
            <motion.article
              key={e.code}
              className={`episode ${e.upcoming ? 'upcoming' : ''}`}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, delay: i * 0.08, ease: [0.2, 0.8, 0.2, 1] }}
            >
              <Tilt className="ep-thumb" max={6} style={{ background: `linear-gradient(135deg, ${e.color}, #0a0a0a 85%)` }}>
                <span className="ep-num">{String(i + 1).padStart(2, '0')}</span>
                <span className="ep-code">{e.code}</span>
                <span className="ep-name">{e.title}</span>
              </Tilt>
              <div className="ep-body">
                <div className="ep-top">
                  <h3>{e.role ?? e.title}</h3>
                  <span className="ep-when">{e.when}</span>
                </div>
                <span className="pill">{e.kind}</span>
                {e.company && <span className="ep-company">{e.company}</span>}
                {e.text && <p>{e.text}</p>}
                {e.points && (
                  <ul>
                    {e.points.map((pt, j) => (
                      <motion.li
                        key={pt}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 + j * 0.1 }}
                      >
                        {pt}
                      </motion.li>
                    ))}
                  </ul>
                )}
              </div>
            </motion.article>
          ))}
        </motion.div>
      </AnimatePresence>
    </section>
  )
}

/* ---------- Full story (about + resume) ---------- */
export function FullStory({ onOpen }) {
  const gh = useGithub(profile.githubUser)
  const exp = journey.filter((e) => e.role)
  return (
    <section className="section" id="story">
      <Heading kicker="The screenplay" title="The Full Story" />
      <motion.div className="story" {...reveal}>
        <div className="script">
          <div className="script-head">
            <span className="kicker">
              <i /> Starring
            </span>
            <h3>{profile.name.toUpperCase()}</h3>
            <p>{profile.role} · {profile.location}</p>
          </div>

          <div className="script-cols">
            <div>
              <h4>Education</h4>
              <div className="script-item">
                <b>{education.college}</b>
                <span>{education.degree}</span>
                <span className="muted">
                  {education.span} · CGPA {education.cgpa}
                </span>
              </div>

              <h4>Experience</h4>
              {exp.map((e) => (
                <div className="script-item" key={e.code}>
                  <b>{e.role}</b>
                  <span className="muted">
                    {e.company ? `${e.company} · ` : ''}
                    {e.when} · {e.kind}
                  </span>
                </div>
              ))}

              <h4>Projects</h4>
              {projects.map((p) => (
                <button className="script-item link" key={p.slug} onClick={() => onOpen(p)}>
                  <b>{p.title}</b>
                  <span className="muted">{p.stack.slice(0, 4).join(', ')}</span>
                </button>
              ))}
            </div>
            <div>
              <h4>The Plot</h4>
              <p className="script-p">
                I am passionate about creating efficient, scalable systems that solve complex problems. My focus is primarily on
                backend infrastructure, building full-stack platforms, and integrating robust DevOps pipelines into
                production-ready applications.
              </p>
              <h4>Core Focus</h4>
              <ul className="focus">
                {focus.map((f, i) => (
                  <motion.li
                    key={f}
                    initial={{ opacity: 0, scale: 0.6 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + i * 0.08, type: 'spring', stiffness: 300, damping: 18 }}
                    whileHover={{ scale: 1.08 }}
                  >
                    {f}
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <aside className="story-side">
          <motion.div
            className="side-card"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <h4>Every episode, on one page.</h4>
            <p className="muted">Education, internships, projects and skills — the complete resume.</p>
            <a className="btn btn-play full" href={profile.resume} target="_blank" rel="noreferrer">
              View Resume
            </a>
          </motion.div>
          <div className="stats">
            <Stat n={education.cgpa} l="CGPA" />
            <Stat n={projects.length} l="Originals" />
            <Stat n={skills.reduce((a, s) => a + s.items.length, 0)} l="Skills" />
          </div>
          <a className="side-card gh" href={profile.github} target="_blank" rel="noreferrer">
            <h4>
              <GithubIcon /> Live on GitHub
            </h4>
            <span className="muted">@{profile.githubUser}</span>
            {gh && (
              <div className="stats small">
                <Stat n={gh.public_repos} l="Repos" />
                <Stat n={gh.followers} l="Followers" />
                <Stat n={gh.following} l="Following" />
              </div>
            )}
            <span className="gh-cta">View full profile →</span>
          </a>
        </aside>
      </motion.div>
    </section>
  )
}

function Stat({ n, l }) {
  return (
    <div className="stat">
      <b>
        <CountUp to={n} />
      </b>
      <span>{l}</span>
    </div>
  )
}

function useGithub(user) {
  const [data, setData] = useState(null)
  useEffect(() => {
    let alive = true
    fetch(`https://api.github.com/users/${user}`)
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => alive && d && setData(d))
      .catch(() => {})
    return () => {
      alive = false
    }
  }, [user])
  return data
}

/* ---------- Contact ---------- */
export function Contact() {
  const [form, setForm] = useState({ name: '', subject: '', message: '' })
  const send = (e) => {
    e.preventDefault()
    const body = `${form.message}\n\n— ${form.name}`
    window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(form.subject)}&body=${encodeURIComponent(body)}`
  }
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value })

  return (
    <section className="section" id="contact">
      <Heading kicker="Coming soon" title="Next Season" />
      <motion.div className="contact" {...reveal}>
        <div className="contact-glow" aria-hidden="true" />
        <div className="contact-copy">
          <SplitText as="h3" text={'Let\u2019s build something useful.'} inView stagger={0.02} />
          <p>
            I&rsquo;m currently looking for new opportunities, internships, and freelance projects. Whether you have a question or just
            want to say hi, I&rsquo;ll try my best to get back to you!
          </p>
          <div className="socials">
            <motion.a whileHover={{ y: -3 }} href={profile.github} target="_blank" rel="noreferrer">
              <GithubIcon /> GitHub
            </motion.a>
            {profile.linkedin && (
              <a href={profile.linkedin} target="_blank" rel="noreferrer">
                in&nbsp; LinkedIn
              </a>
            )}
            {profile.email && <a href={`mailto:${profile.email}`}>@&nbsp; Email</a>}
            <a href={profile.resume} target="_blank" rel="noreferrer">
              ⤓&nbsp; Resume
            </a>
          </div>
        </div>
        {profile.email && (
          <form className="contact-form" onSubmit={send}>
            <input required placeholder="Your name" value={form.name} onChange={set('name')} />
            <input required placeholder="Subject" value={form.subject} onChange={set('subject')} />
            <textarea required rows={5} placeholder="Message" value={form.message} onChange={set('message')} />
            <button className="btn btn-red">Send message</button>
          </form>
        )}
      </motion.div>
    </section>
  )
}

export function GithubIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 .5a11.5 11.5 0 0 0-3.64 22.41c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.53-1.33-1.28-1.69-1.28-1.69-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.71 1.26 3.37.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.8 1.19 1.83 1.19 3.09 0 4.42-2.7 5.39-5.26 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .5Z" />
    </svg>
  )
}
