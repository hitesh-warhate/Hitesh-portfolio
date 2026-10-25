import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { projects } from '../data'
import ProjectArt from './ProjectArt'
import { GithubIcon } from './Sections'

// Netflix-style title detail modal.
export default function ProjectModal({ project: p, onClose, onOpen }) {
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  const more = projects.filter((x) => x.slug !== p.slug)

  return (
    <motion.div className="modal-back" onClick={onClose} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <motion.div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-label={p.title}
        onClick={(e) => e.stopPropagation()}
        initial={{ y: 60, scale: 0.94, opacity: 0 }}
        animate={{ y: 0, scale: 1, opacity: 1 }}
        exit={{ y: 40, scale: 0.96, opacity: 0 }}
        transition={{ duration: 0.4, ease: [0.2, 0.8, 0.2, 1] }}
      >
        <button className="modal-x" onClick={onClose} aria-label="Close">
          ✕
        </button>
        <div className="modal-hero">
          <ProjectArt project={p} big />
          <div className="modal-hero-fade" />
          <div className="modal-hero-text">
            <h2>{p.title}</h2>
            <div className="hero-actions">
              {p.demo ? (
                <a className="btn btn-play" href={p.demo} target="_blank" rel="noreferrer">
                  ▶ Live Demo
                </a>
              ) : (
                <span className="btn btn-play disabled">▶ Demo soon</span>
              )}
              <a className="btn btn-info" href={p.source || 'https://github.com/hitesh-warhate'} target="_blank" rel="noreferrer">
                <GithubIcon /> Source
              </a>
            </div>
          </div>
        </div>

        <div className="modal-body">
          <div className="modal-main">
            <div className="hero-meta">
              <span className="match">{p.match}% Match</span>
              <span>{p.year}</span>
              <span className="pill">{p.genre}</span>
              <span className="pill">HD</span>
            </div>
            <p className="modal-log">{p.logline}</p>
            <p>{p.overview}</p>
          </div>
          <div className="modal-side">
            <p>
              <span className="muted">Cast: </span>
              {p.stack.join(', ')}
            </p>
            <p>
              <span className="muted">Genre: </span>
              {p.genre}
            </p>
            <p>
              <span className="muted">This project is: </span>
              Scalable, Hands-on, Production-minded
            </p>
          </div>
        </div>

        <div className="modal-section">
          <h3>Episodes</h3>
          {p.features.map((f, i) => (
            <div className="modal-ep" key={f}>
              <span className="modal-ep-n">{i + 1}</span>
              <span className="modal-ep-t">{f}</span>
            </div>
          ))}
        </div>

        <div className="modal-section">
          <h3>More Like This</h3>
          <div className="more-grid">
            {more.map((m) => (
              <button key={m.slug} className="more-card" onClick={() => onOpen(m)}>
                <ProjectArt project={m} />
                <div className="more-text">
                  <span className="match">{m.match}% Match</span>
                  <p>{m.logline}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
