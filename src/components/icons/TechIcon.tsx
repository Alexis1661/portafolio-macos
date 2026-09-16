import type { Tech } from '@/data/tech'

/** Icono squircle estilo macOS con el logo de una tecnología (simple-icons). */
export function TechIcon({ tech, className }: { tech: Tech; className?: string }) {
  const gid = `tech-bg-${tech.id}`
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={tech.bg[0]} />
          <stop offset="1" stopColor={tech.bg[1]} />
        </linearGradient>
      </defs>
      <rect width="100" height="100" rx="22.37" fill={`url(#${gid})`} />
      <g transform="translate(22 22) scale(2.333)">
        <path d={tech.icon.path} fill={tech.fg} />
      </g>
      <rect x="0.5" y="0.5" width="99" height="99" rx="22.37" fill="none" stroke="#fff" strokeOpacity="0.18" />
    </svg>
  )
}
