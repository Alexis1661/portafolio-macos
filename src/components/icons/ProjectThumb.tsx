import type { ThumbVariant } from '@/data/projects'

/**
 * Miniaturas vectoriales de cada proyecto (relación 16:10).
 * Se usan en los iconos del escritorio, el Finder y la cabecera de la ventana de proyecto.
 */

interface Props {
  variant: ThumbVariant
  className?: string
  /** Detalle alto para la imagen grande dentro de la ventana. */
  detailed?: boolean
}

const palettes: Record<ThumbVariant, [string, string, string]> = {
  ducki: ['#ff9f43', '#e8590c', '#ffe1c2'],
  health: ['#2ec4b6', '#0b7a75', '#d6fff9'],
  legal: ['#4b5563', '#111827', '#d1d5db'],
  talent: ['#8b5cf6', '#4c1d95', '#ede9fe'],
  inventory: ['#34d399', '#065f46', '#d1fae5'],
}

function Motif({ variant, c }: { variant: ThumbVariant; c: [string, string, string] }) {
  const light = c[2]
  switch (variant) {
    case 'ducki':
      return (
        <g>
          {/* burbujas de chat */}
          <path d="M40 38h44a10 10 0 0 1 10 10v14a10 10 0 0 1-10 10H58l-10 9v-9h-8a10 10 0 0 1-10-10V48a10 10 0 0 1 10-10z" fill={light} />
          <path d="M76 66h40a9 9 0 0 1 9 9v12a9 9 0 0 1-9 9h-8v8l-9-8H76a9 9 0 0 1-9-9V75a9 9 0 0 1 9-9z" fill="#fff" fillOpacity="0.9" />
          <circle cx="56" cy="55" r="3" fill={c[1]} />
          <circle cx="66" cy="55" r="3" fill={c[1]} />
          <circle cx="76" cy="55" r="3" fill={c[1]} />
          <path d="M84 81h26M84 88h16" stroke={c[1]} strokeWidth="3" strokeLinecap="round" />
        </g>
      )
    case 'health':
      return (
        <g>
          <path d="M20 64h24l10-24 14 46 12-34 8 12h32" fill="none" stroke="#fff" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M132 24l16 6v14c0 10-7 18-16 21-9-3-16-11-16-21V30z" fill={light} />
          <path d="M126 44h12M132 38v12" stroke={c[1]} strokeWidth="3" strokeLinecap="round" />
        </g>
      )
    case 'legal':
      return (
        <g>
          <rect x="30" y="30" width="100" height="62" rx="6" fill="#fff" fillOpacity="0.92" />
          <rect x="30" y="30" width="100" height="14" rx="6" fill={light} />
          <circle cx="39" cy="37" r="2.5" fill="#ff5f57" />
          <circle cx="47" cy="37" r="2.5" fill="#febc2e" />
          <circle cx="55" cy="37" r="2.5" fill="#28c840" />
          <rect x="38" y="52" width="44" height="4" rx="2" fill={c[0]} />
          <rect x="38" y="62" width="70" height="4" rx="2" fill={c[2]} />
          <rect x="38" y="72" width="56" height="4" rx="2" fill={c[2]} />
          <rect x="38" y="82" width="24" height="4" rx="2" fill={c[2]} />
          <rect x="94" y="50" width="28" height="12" rx="6" fill={c[0]} />
        </g>
      )
    case 'talent':
      return (
        <g stroke="#fff" strokeWidth="2.5" strokeOpacity="0.8">
          <path d="M40 60L80 36M80 36l40 24M40 60l40 20M80 80l40-20M80 36v44" />
          <circle cx="40" cy="60" r="9" fill={light} stroke="none" />
          <circle cx="80" cy="36" r="9" fill="#fff" stroke="none" />
          <circle cx="120" cy="60" r="9" fill={light} stroke="none" />
          <circle cx="80" cy="80" r="9" fill={light} stroke="none" />
          <circle cx="80" cy="36" r="4" fill={c[1]} stroke="none" />
        </g>
      )
    case 'inventory':
      return (
        <g>
          {[0, 1, 2].map((i) => (
            <g key={i} transform={`translate(${34 + i * 32} 52)`}>
              <path d="M0 8l14-8 14 8v18l-14 8-14-8z" fill={light} />
              <path d="M0 8l14 8 14-8M14 16v18" fill="none" stroke={c[1]} strokeWidth="2" />
            </g>
          ))}
          <rect x="30" y="36" width="100" height="4" rx="2" fill="#fff" fillOpacity="0.7" />
        </g>
      )
  }
}

export function ProjectThumb({ variant, className, detailed }: Props) {
  const c = palettes[variant]
  const id = `pt-${variant}`
  return (
    <svg viewBox="0 0 160 100" className={className} aria-hidden="true" focusable="false" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id={`${id}-bg`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={c[0]} />
          <stop offset="1" stopColor={c[1]} />
        </linearGradient>
        <radialGradient id={`${id}-glow`} cx="0.2" cy="0" r="1">
          <stop offset="0" stopColor="#fff" stopOpacity="0.35" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="160" height="100" fill={`url(#${id}-bg)`} />
      <rect width="160" height="100" fill={`url(#${id}-glow)`} />
      {detailed && (
        <g opacity="0.12" stroke="#fff" strokeWidth="1">
          {Array.from({ length: 8 }).map((_, i) => (
            <path key={i} d={`M${i * 22} 0v100`} />
          ))}
          {Array.from({ length: 5 }).map((_, i) => (
            <path key={`h${i}`} d={`M0 ${i * 22}h160`} />
          ))}
        </g>
      )}
      <Motif variant={variant} c={c} />
    </svg>
  )
}
