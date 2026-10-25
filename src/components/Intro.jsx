import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

const ribbon = ['#e50914', '#b20710', '#ff3d47', '#8a0510', '#ff6a3d', '#e50914', '#c4005a', '#ff2a2a', '#7a0a1a', '#e50914']

// Netflix-style "tudum" intro: letters drop in, glow, then the logo zooms through
// a burst of red light ribbons. Plays on every visit; click anywhere to skip.
export default function Intro({ onDone }) {
  const done = useRef(onDone)
  useEffect(() => {
    done.current = onDone
  })
  useEffect(() => {
    const t = setTimeout(() => done.current(), 3400)
    return () => clearTimeout(t)
  }, [])

  return (
    <motion.div className="intro" onClick={() => done.current()} exit={{ opacity: 0, transition: { duration: 0.5 } }}>
      <motion.div
        className="intro-logo"
        initial={{ scale: 1 }}
        animate={{ scale: [1, 1, 1.08, 14], opacity: [1, 1, 1, 0] }}
        transition={{ duration: 3.3, times: [0, 0.55, 0.7, 1], ease: 'easeIn' }}
      >
        {[...'HITESH'].map((ch, i) => (
          <motion.span
            key={i}
            initial={{ y: -120, opacity: 0, scaleY: 1.6 }}
            animate={{ y: 0, opacity: 1, scaleY: 1 }}
            transition={{ delay: 0.15 + i * 0.09, type: 'spring', stiffness: 380, damping: 18 }}
          >
            {ch}
          </motion.span>
        ))}
        <motion.span
          className="intro-shine"
          aria-hidden="true"
          initial={{ backgroundPosition: '150% 0' }}
          animate={{ backgroundPosition: '-50% 0' }}
          transition={{ delay: 1.0, duration: 1, ease: 'easeInOut' }}
        >
          HITESH
        </motion.span>
      </motion.div>

      <div className="intro-ribbons">
        {ribbon.map((c, i) => (
          <motion.span
            key={i}
            style={{ background: `linear-gradient(180deg, transparent, ${c} 40%, ${c} 60%, transparent)`, left: `${44 + i * 1.3}%` }}
            initial={{ scaleY: 0, opacity: 0 }}
            animate={{ scaleY: [0, 1, 1.4], opacity: [0, 1, 0], x: [0, 0, (i - 4.5) * 160] }}
            transition={{ delay: 2.1 + i * 0.03, duration: 1.2, times: [0, 0.4, 1], ease: 'easeOut' }}
          />
        ))}
      </div>

      <motion.div
        className="intro-beams"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.8, 0] }}
        transition={{ duration: 3.2, times: [0, 0.6, 1] }}
      />
      <span className="intro-skip">click to skip</span>
    </motion.div>
  )
}
