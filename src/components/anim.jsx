import { useEffect, useRef, useState } from 'react'
import { animate, motion, useInView, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion'

const ease = [0.2, 0.8, 0.2, 1]

// True while the CSS media query matches; follows changes (resize, OS settings).
export function useMedia(query) {
  const [match, setMatch] = useState(() => window.matchMedia(query).matches)
  useEffect(() => {
    const mq = window.matchMedia(query)
    const on = () => setMatch(mq.matches)
    on()
    mq.addEventListener('change', on)
    return () => mq.removeEventListener('change', on)
  }, [query])
  return match
}

// Paragraph whose words light up from dim to white as it scrolls through the viewport.
export function ScrollWords({ text, className, as: Tag = 'p' }) {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 85%', 'end 55%'] })
  const words = text.split(' ')
  if (reduce) return <Tag className={className}>{text}</Tag>
  return (
    <Tag ref={ref} className={`scroll-words ${className ?? ''}`} aria-label={text}>
      {words.map((w, i) => (
        <Word key={i} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]}>
          {w}
        </Word>
      ))}
    </Tag>
  )
}

function Word({ children, progress, range }) {
  const opacity = useTransform(progress, range, [0.15, 1])
  const y = useTransform(progress, range, [6, 0])
  return (
    <>
      <motion.span className="sw-word" style={{ opacity, y }} aria-hidden="true">
        {children}
      </motion.span>{' '}
    </>
  )
}

// Thin red reading-progress bar pinned to the top of the page.
export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30 })
  return <motion.div className="scroll-progress" style={{ scaleX }} />
}

// Soft red spotlight that follows the pointer (mouse devices only).
export function CursorGlow() {
  const x = useMotionValue(-500)
  const y = useMotionValue(-500)
  const sx = useSpring(x, { stiffness: 150, damping: 25 })
  const sy = useSpring(y, { stiffness: 150, damping: 25 })
  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return
    const move = (e) => {
      x.set(e.clientX)
      y.set(e.clientY)
    }
    window.addEventListener('pointermove', move)
    return () => window.removeEventListener('pointermove', move)
  }, [x, y])
  return <motion.div className="cursor-glow" style={{ x: sx, y: sy }} />
}

// Splits text into letters that rise in one after another.
export function SplitText({ text, className, as = 'span', delay = 0, stagger = 0.045, inView = false }) {
  const Tag = motion[as]
  const trigger = inView
    ? { initial: 'hide', whileInView: 'show', viewport: { once: true, amount: 0.6 } }
    : { initial: 'hide', animate: 'show' }
  return (
    <Tag
      className={className}
      aria-label={text}
      {...trigger}
      variants={{ show: { transition: { staggerChildren: stagger, delayChildren: delay } } }}
    >
      {[...text].map((ch, i) => (
        <span key={i} className="split-mask" aria-hidden="true">
          <motion.span
            className="split-char"
            variants={{
              hide: { y: '110%', rotate: 8, opacity: 0 },
              show: { y: '0%', rotate: 0, opacity: 1, transition: { duration: 0.8, ease } },
            }}
          >
            {ch === ' ' ? ' ' : ch}
          </motion.span>
        </span>
      ))}
    </Tag>
  )
}

// 3D tilt toward the pointer, with a moving glare highlight.
export function Tilt({ children, className, max = 10, as = 'div', style, ...rest }) {
  const Tag = motion[as]
  const rx = useMotionValue(0)
  const ry = useMotionValue(0)
  const gx = useMotionValue(50)
  const gy = useMotionValue(50)
  const srx = useSpring(rx, { stiffness: 200, damping: 18 })
  const sry = useSpring(ry, { stiffness: 200, damping: 18 })
  const glare = useTransform([gx, gy], ([a, b]) => `radial-gradient(circle at ${a}% ${b}%, rgba(255,255,255,0.28), transparent 55%)`)

  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width
    const py = (e.clientY - r.top) / r.height
    ry.set((px - 0.5) * max * 2)
    rx.set((0.5 - py) * max * 2)
    gx.set(px * 100)
    gy.set(py * 100)
  }
  const onLeave = () => {
    rx.set(0)
    ry.set(0)
  }

  return (
    <Tag
      className={`tilt ${className ?? ''}`}
      style={{ ...style, rotateX: srx, rotateY: sry, transformPerspective: 900 }}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      {...rest}
    >
      {children}
      <motion.span className="tilt-glare" style={{ background: glare }} />
    </Tag>
  )
}

// Counts up to a number when it scrolls into view. Keeps decimals of the target.
export function CountUp({ to, duration = 1.6 }) {
  const ref = useRef(null)
  const seen = useInView(ref, { once: true })
  const target = Number(to)
  const decimals = String(to).split('.')[1]?.length ?? 0
  const [val, setVal] = useState(0)
  useEffect(() => {
    if (!seen || Number.isNaN(target)) return
    const c = animate(0, target, { duration, ease: 'easeOut', onUpdate: setVal })
    return () => c.stop()
  }, [seen, target, duration])
  return <span ref={ref}>{Number.isNaN(target) ? to : val.toFixed(decimals)}</span>
}

// Endless horizontal ticker.
export function Marquee({ items, reverse = false }) {
  const list = [...items, ...items]
  return (
    <div className="marquee">
      <div className={`marquee-track ${reverse ? 'rev' : ''}`}>
        {list.map((t, i) => (
          <span key={i} className="marquee-item">
            {t}
            <b>✦</b>
          </span>
        ))}
      </div>
    </div>
  )
}

// Floating embers for the hero background.
export function Embers({ count = 22 }) {
  const [dots] = useState(() =>
    Array.from({ length: count }, () => ({
      left: Math.random() * 100,
      size: 2 + Math.random() * 4,
      dur: 8 + Math.random() * 10,
      delay: -Math.random() * 18,
      drift: (Math.random() - 0.5) * 120,
    })),
  )
  return (
    <div className="embers" aria-hidden="true">
      {dots.map((d, i) => (
        <span
          key={i}
          style={{
            left: `${d.left}%`,
            width: d.size,
            height: d.size,
            animationDuration: `${d.dur}s`,
            animationDelay: `${d.delay}s`,
            '--drift': `${d.drift}px`,
          }}
        />
      ))}
    </div>
  )
}
