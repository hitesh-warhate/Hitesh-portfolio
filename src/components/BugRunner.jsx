import { useEffect, useRef, useState } from 'react'
import { store } from './store'

const H = 220 // logical canvas height
const GROUND = H - 34
const GRAVITY = 2100
const JUMP = 720

// "Bug Runner": the H logo dodges bugs on its way to production.
// Space / ↑ / click / tap to jump (double jump allowed).
export default function BugRunner({ onScore }) {
  const wrap = useRef(null)
  const canvas = useRef(null)
  const game = useRef(null)
  const [state, setState] = useState('idle') // idle | running | over
  const [score, setScore] = useState(0)
  const [best, setBest] = useState(() => Number(store.get('bugRunnerBest')) || 0)
  const scoreCb = useRef(onScore)
  useEffect(() => {
    scoreCb.current = onScore
  })

  useEffect(() => {
    const c = canvas.current
    const ctx = c.getContext('2d')
    let raf = 0
    let last = 0
    let visible = true
    let width = 0

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      width = c.clientWidth
      c.width = width * dpr
      c.height = H * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      if (!game.current || game.current.status !== 'running') draw()
    }

    const fresh = () => ({
      status: 'idle',
      y: GROUND,
      vy: 0,
      jumps: 0,
      speed: 360,
      dist: 0,
      bonus: 0,
      obstacles: [],
      coins: [],
      particles: [],
      nextObs: 0.9,
      nextCoin: 2.2,
      t: 0,
    })
    game.current = fresh()

    const score = (g) => Math.floor(g.dist / 10) + g.bonus

    const spawnObstacle = (g) => {
      const flying = g.dist > 2500 && Math.random() < 0.28
      const size = 18 + Math.random() * 14
      g.obstacles.push({ x: width + 30, y: flying ? GROUND - 70 - Math.random() * 20 : GROUND, size, flying, wob: Math.random() * 6 })
      g.nextObs = Math.max(0.55, 1.5 - g.speed / 900) + Math.random() * 0.9
    }

    const burst = (g, x, y, color, n = 14) => {
      for (let i = 0; i < n; i++) {
        const a = Math.random() * Math.PI * 2
        const s = 60 + Math.random() * 220
        g.particles.push({ x, y, vx: Math.cos(a) * s, vy: Math.sin(a) * s - 80, life: 0.6 + Math.random() * 0.4, color })
      }
    }

    const step = (dt) => {
      const g = game.current
      g.t += dt
      if (g.status !== 'running') return
      g.speed += dt * 9
      g.dist += g.speed * dt

      g.vy += GRAVITY * dt
      g.y = Math.min(GROUND, g.y + g.vy * dt)
      if (g.y >= GROUND) {
        g.vy = 0
        g.jumps = 0
      }

      g.nextObs -= dt
      if (g.nextObs <= 0) spawnObstacle(g)
      g.nextCoin -= dt
      if (g.nextCoin <= 0) {
        g.coins.push({ x: width + 20, y: GROUND - 40 - Math.random() * 70 })
        g.nextCoin = 1.6 + Math.random() * 2.4
      }

      for (const o of g.obstacles) o.x -= g.speed * dt * (o.flying ? 1.15 : 1)
      for (const k of g.coins) k.x -= g.speed * dt
      g.obstacles = g.obstacles.filter((o) => o.x > -60)
      g.coins = g.coins.filter((k) => k.x > -40 && !k.taken)
      for (const p of g.particles) {
        p.x += p.vx * dt
        p.y += p.vy * dt
        p.vy += 600 * dt
        p.life -= dt
      }
      g.particles = g.particles.filter((p) => p.life > 0)

      // Player hitbox
      const px = 56
      const ps = 30
      const top = g.y - ps
      for (const k of g.coins) {
        if (Math.abs(k.x - (px + ps / 2)) < 24 && Math.abs(k.y - (top + ps / 2)) < 26) {
          k.taken = true
          g.bonus += 50
          burst(g, k.x, k.y, '#46d369', 10)
        }
      }
      for (const o of g.obstacles) {
        const r = o.size * 0.42
        const cx = o.x
        const cy = o.y - o.size * 0.45
        const nx = Math.max(px, Math.min(cx, px + ps))
        const ny = Math.max(top, Math.min(cy, top + ps))
        if ((cx - nx) ** 2 + (cy - ny) ** 2 < r * r) {
          g.status = 'over'
          burst(g, px + ps / 2, top + ps / 2, '#e50914', 30)
          const s = score(g)
          const prevBest = Number(store.get('bugRunnerBest')) || 0
          if (s > prevBest) store.set('bugRunnerBest', s)
          store.set('bugRunnerPlays', (Number(store.get('bugRunnerPlays')) || 0) + 1)
          setBest(Math.max(s, prevBest))
          setState('over')
          scoreCb.current?.()
          break
        }
      }
      setScore(score(g))
    }

    const draw = () => {
      const g = game.current
      ctx.clearRect(0, 0, width, H)

      // Sky grid that scrolls with distance
      ctx.strokeStyle = 'rgba(255,255,255,0.04)'
      ctx.lineWidth = 1
      const off = (g.dist * 0.3) % 40
      for (let x = -off; x < width; x += 40) {
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, GROUND)
        ctx.stroke()
      }
      // Distant skyline of "servers"
      ctx.fillStyle = 'rgba(229,9,20,0.07)'
      const sOff = (g.dist * 0.15) % 120
      for (let x = -sOff; x < width + 120; x += 120) {
        ctx.fillRect(x, GROUND - 60, 46, 60)
        ctx.fillRect(x + 60, GROUND - 38, 34, 38)
      }
      // Ground
      ctx.fillStyle = '#e50914'
      ctx.fillRect(0, GROUND, width, 2)
      ctx.fillStyle = 'rgba(255,255,255,0.12)'
      const dOff = g.dist % 28
      for (let x = -dOff; x < width; x += 28) ctx.fillRect(x, GROUND + 10, 12, 2)

      // Coins (green commit checks)
      for (const k of g.coins) {
        const bob = Math.sin(g.t * 6 + k.x * 0.05) * 3
        ctx.beginPath()
        ctx.arc(k.x, k.y + bob, 11, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(70,211,105,0.18)'
        ctx.fill()
        ctx.strokeStyle = '#46d369'
        ctx.lineWidth = 2
        ctx.stroke()
        ctx.beginPath()
        ctx.moveTo(k.x - 5, k.y + bob)
        ctx.lineTo(k.x - 1, k.y + bob + 4)
        ctx.lineTo(k.x + 6, k.y + bob - 4)
        ctx.stroke()
      }

      // Bugs
      for (const o of g.obstacles) drawBug(ctx, o, g.t)

      // Player: the H logo block
      const px = 56
      const ps = 30
      const top = g.y - ps
      const squash = g.y < GROUND ? 1.06 : 1
      ctx.save()
      ctx.translate(px + ps / 2, top + ps / 2)
      ctx.rotate(g.y < GROUND ? Math.min(0.25, -g.vy / 3000) : 0)
      ctx.scale(1 / squash, squash)
      ctx.shadowColor = 'rgba(229,9,20,0.9)'
      ctx.shadowBlur = 18
      ctx.fillStyle = '#e50914'
      roundRect(ctx, -ps / 2, -ps / 2, ps, ps, 6)
      ctx.fill()
      ctx.shadowBlur = 0
      ctx.fillStyle = '#fff'
      ctx.font = '26px "Bebas Neue", Impact, sans-serif'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillText('H', 0, 2)
      ctx.restore()
      // Running dust
      if (g.status === 'running' && g.y >= GROUND && Math.floor(g.t * 20) % 2 === 0) {
        ctx.fillStyle = 'rgba(255,255,255,0.25)'
        ctx.fillRect(px - 6 - Math.random() * 8, GROUND - 3, 3, 3)
      }

      for (const p of g.particles) {
        ctx.globalAlpha = Math.max(0, p.life)
        ctx.fillStyle = p.color
        ctx.fillRect(p.x, p.y, 4, 4)
      }
      ctx.globalAlpha = 1
    }

    const loop = (now) => {
      const dt = Math.min(0.033, (now - last) / 1000 || 0)
      last = now
      if (visible) {
        step(dt)
        draw()
      }
      raf = requestAnimationFrame(loop)
    }

    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting
    })
    io.observe(c)
    resize()
    window.addEventListener('resize', resize)
    raf = requestAnimationFrame(loop)

    game.current.jump = () => {
      const g = game.current
      if (g.status === 'idle' || g.status === 'over') {
        Object.assign(g, fresh(), { jump: g.jump, status: 'running' })
        setScore(0)
        setState('running')
        return
      }
      if (g.jumps < 2) {
        g.vy = g.jumps === 0 ? -JUMP : -JUMP * 0.85
        g.jumps++
        burst(g, 71, g.y, 'rgba(255,255,255,0.6)', 5)
      }
    }

    return () => {
      cancelAnimationFrame(raf)
      io.disconnect()
      window.removeEventListener('resize', resize)
    }
  }, [])

  const jump = (e) => {
    e?.preventDefault()
    wrap.current?.focus({ preventScroll: true })
    game.current?.jump?.()
  }

  const onKey = (e) => {
    if (e.code === 'Space' || e.code === 'ArrowUp' || e.code === 'KeyW') jump(e)
  }

  return (
    <div
      ref={wrap}
      className={`runner runner-${state}`}
      tabIndex={0}
      role="application"
      aria-label="Bug Runner mini game. Press space or tap to jump."
      onPointerDown={jump}
      onKeyDown={onKey}
    >
      <div className="runner-hud">
        <span>
          SCORE <b>{String(score).padStart(5, '0')}</b>
        </span>
        <span>
          BEST <b>{String(best).padStart(5, '0')}</b>
        </span>
      </div>
      <canvas ref={canvas} className="runner-canvas" style={{ height: H }} />
      {state !== 'running' && (
        <div className="runner-overlay">
          {state === 'over' ? (
            <>
              <strong>Bug in production!</strong>
              <span>
                You shipped <b>{score}</b> lines {score >= best && score > 0 ? '· new best 🎉' : ''}
              </span>
            </>
          ) : (
            <>
              <strong>Bug Runner</strong>
              <span>Dodge the bugs, grab the green commits.</span>
            </>
          )}
          <em>{state === 'over' ? 'Tap / Space to retry' : 'Tap / Space to start'}</em>
        </div>
      )}
    </div>
  )
}

function drawBug(ctx, o, t) {
  const { x, y, size: s, flying, wob } = o
  const cy = y - s * 0.45
  ctx.save()
  ctx.translate(x, cy)
  // legs
  ctx.strokeStyle = '#ff6b6b'
  ctx.lineWidth = 2
  const step = Math.sin(t * 22 + wob) * 3
  for (let i = -1; i <= 1; i++) {
    ctx.beginPath()
    ctx.moveTo(i * s * 0.22, 0)
    ctx.lineTo(i * s * 0.32 - 4, s * 0.45 + (i % 2 ? step : -step))
    ctx.moveTo(i * s * 0.22, 0)
    ctx.lineTo(i * s * 0.32 + 4, -s * 0.45 + (i % 2 ? -step : step) * (flying ? 0 : 1))
    ctx.stroke()
  }
  // wings for flying bugs
  if (flying) {
    ctx.fillStyle = 'rgba(255,255,255,0.35)'
    const flap = Math.abs(Math.sin(t * 30 + wob)) * s * 0.5
    ctx.beginPath()
    ctx.ellipse(-s * 0.1, -s * 0.35, s * 0.25, flap + 2, -0.4, 0, Math.PI * 2)
    ctx.ellipse(s * 0.1, -s * 0.35, s * 0.25, flap + 2, 0.4, 0, Math.PI * 2)
    ctx.fill()
  }
  // body
  ctx.shadowColor = 'rgba(255,40,40,0.8)'
  ctx.shadowBlur = 12
  ctx.fillStyle = '#b20710'
  ctx.beginPath()
  ctx.ellipse(0, 0, s * 0.42, s * 0.32, 0, 0, Math.PI * 2)
  ctx.fill()
  ctx.shadowBlur = 0
  ctx.fillStyle = '#ff3d47'
  ctx.beginPath()
  ctx.arc(-s * 0.42, -2, s * 0.17, 0, Math.PI * 2)
  ctx.fill()
  // eyes
  ctx.fillStyle = '#fff'
  ctx.fillRect(-s * 0.5, -5, 3, 3)
  ctx.strokeStyle = 'rgba(0,0,0,0.35)'
  ctx.beginPath()
  ctx.moveTo(0, -s * 0.3)
  ctx.lineTo(0, s * 0.3)
  ctx.stroke()
  ctx.restore()
}

function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath()
  ctx.moveTo(x + r, y)
  ctx.arcTo(x + w, y, x + w, y + h, r)
  ctx.arcTo(x + w, y + h, x, y + h, r)
  ctx.arcTo(x, y + h, x, y, r)
  ctx.arcTo(x, y, x + w, y, r)
  ctx.closePath()
}
