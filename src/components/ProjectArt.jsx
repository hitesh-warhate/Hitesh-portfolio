// Generated "poster" artwork for a project — no image assets needed.
export default function ProjectArt({ project, big = false }) {
  const [a, b, c] = project.theme
  return (
    <div
      className={`art ${big ? 'art-big' : ''}`}
      style={{ background: `radial-gradient(120% 90% at 85% 15%, ${b} 0%, ${a} 55%, #050505 100%)` }}
    >
      <Motif kind={project.motif} color={c} />
      <div className="art-grain" />
      <div className="art-label">
        <span className="art-n">
          <b>H</b> ORIGINAL
        </span>
        <span className="art-title">{project.title}</span>
      </div>
    </div>
  )
}

function Motif({ kind, color }) {
  const s = { stroke: color, fill: 'none', strokeWidth: 1.2, opacity: 0.55 }
  return (
    <svg className="art-motif" viewBox="0 0 200 120" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      {kind === 'map' && (
        <g {...s}>
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <path key={i} d={`M${-10 + i * 6} ${110 - i * 14} C 50 ${80 - i * 12}, 90 ${120 - i * 16}, 210 ${60 - i * 9}`} />
          ))}
          <circle cx="140" cy="45" r="5" fill={color} opacity="0.9" />
          <circle cx="140" cy="45" r="13" />
          <circle cx="140" cy="45" r="22" opacity="0.4" />
        </g>
      )}
      {kind === 'sensor' && (
        <g {...s}>
          {[14, 28, 42, 56].map((r) => (
            <path key={r} d={`M ${150 - r} 70 A ${r} ${r} 0 0 1 ${150 + r} 70`} />
          ))}
          <circle cx="150" cy="70" r="4" fill={color} opacity="0.9" />
          <path d="M0 105 Q 25 90 50 105 T 100 105 T 150 105 T 200 105" />
          <path d="M0 115 Q 25 100 50 115 T 100 115 T 150 115 T 200 115" opacity="0.3" />
        </g>
      )}
      {kind === 'pipeline' && (
        <g {...s}>
          {[0, 1, 2, 3].map((i) => (
            <g key={i}>
              <rect x={20 + i * 44} y="40" width="28" height="28" rx="4" />
              {i < 3 && <path d={`M${48 + i * 44} 54 h16`} strokeDasharray="3 3" />}
            </g>
          ))}
          <rect x="152" y="40" width="28" height="28" rx="4" fill={color} opacity="0.5" />
          <path d="M10 90 H190" opacity="0.3" />
        </g>
      )}
      {kind === 'chart' && (
        <g {...s}>
          {Array.from({ length: 14 }).map((_, i) => {
            const h = 12 + ((i * 37) % 40)
            const y = 100 - h - i * 3
            return <rect key={i} x={12 + i * 13} y={y} width="6" height={h} opacity={0.35 + (i % 3) * 0.15} />
          })}
          <path d="M10 95 L40 80 L70 85 L100 60 L130 66 L160 40 L195 22" strokeWidth="2" opacity="0.9" />
        </g>
      )}
    </svg>
  )
}
