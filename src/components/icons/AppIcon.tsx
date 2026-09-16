import { siGithub } from 'simple-icons'
import type { AppId } from '@/data/apps'

/**
 * Iconos de aplicaciones diseñados en SVG (estilo squircle de macOS).
 * Sin recursos propietarios: cada icono es un dibujo propio.
 */

export type IconId = AppId | 'github' | 'linkedin' | 'mail'

interface Props {
  id: IconId
  size?: number
  className?: string
}

const R = 22.37 // % — radio de esquina usado por los iconos de macOS

const Squircle = ({ children, gradient, id }: { children: React.ReactNode; gradient: [string, string]; id: string }) => (
  <>
    <defs>
      <linearGradient id={`bg-${id}`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor={gradient[0]} />
        <stop offset="1" stopColor={gradient[1]} />
      </linearGradient>
      <linearGradient id={`gloss-${id}`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#fff" stopOpacity="0.35" />
        <stop offset="0.5" stopColor="#fff" stopOpacity="0.05" />
        <stop offset="1" stopColor="#fff" stopOpacity="0" />
      </linearGradient>
    </defs>
    <rect width="100" height="100" rx={R} fill={`url(#bg-${id})`} />
    {children}
    <rect width="100" height="100" rx={R} fill={`url(#gloss-${id})`} />
    <rect x="0.5" y="0.5" width="99" height="99" rx={R} fill="none" stroke="#000" strokeOpacity="0.12" />
  </>
)

const icons: Record<IconId, React.ReactNode> = {
  // Sobre mí — tarjeta de contacto con avatar (guiño al fondo de pantalla)
  about: (
    <Squircle id="about" gradient={['#5b5b60', '#2c2c2f']}>
      <circle cx="50" cy="40" r="15" fill="#f0c4a2" />
      <path d="M25 84c2-16 12-25 25-25s23 9 25 25z" fill="#1a1a1c" />
      <rect x="34" y="35" width="13" height="9" rx="2.5" fill="none" stroke="#1a1a1c" strokeWidth="3" />
      <rect x="53" y="35" width="13" height="9" rx="2.5" fill="none" stroke="#1a1a1c" strokeWidth="3" />
      <path d="M47 39h6" stroke="#1a1a1c" strokeWidth="3" strokeLinecap="round" />
      <path d="M36 27c4-8 24-8 28 0" fill="none" stroke="#1a1a1c" strokeWidth="5" strokeLinecap="round" />
    </Squircle>
  ),
  // Proyectos — carpeta estilo Finder
  projects: (
    <Squircle id="projects" gradient={['#3aa0ff', '#0a63d9']}>
      <path d="M18 34a6 6 0 0 1 6-6h18l6 6h28a6 6 0 0 1 6 6v32a6 6 0 0 1-6 6H24a6 6 0 0 1-6-6z" fill="#dff0ff" />
      <path d="M18 44h64v28a6 6 0 0 1-6 6H24a6 6 0 0 1-6-6z" fill="#fff" />
      <path d="M18 44h64" stroke="#b9d9f7" strokeWidth="1" />
    </Squircle>
  ),
  // Proyecto individual — mismo estilo que carpeta pero abierto
  project: (
    <Squircle id="project" gradient={['#3aa0ff', '#0a63d9']}>
      <path d="M22 32a5 5 0 0 1 5-5h16l5 5h25a5 5 0 0 1 5 5v6H22z" fill="#dff0ff" />
      <path d="M16 46a4 4 0 0 1 4-4h60a4 4 0 0 1 4 4l-4 24a4 4 0 0 1-4 4H24a4 4 0 0 1-4-4z" fill="#fff" />
    </Squircle>
  ),
  // Tecnología — chip con nodos (solo para el menú/registro; el escritorio usa TechIcon)
  tech: (
    <Squircle id="tech" gradient={['#6e6e73', '#3a3a3c']}>
      <rect x="30" y="30" width="40" height="40" rx="8" fill="#fff" />
      <rect x="40" y="40" width="20" height="20" rx="4" fill="#3a3a3c" />
      {[36, 50, 64].map((v) => (
        <g key={v} stroke="#fff" strokeWidth="4" strokeLinecap="round">
          <path d={`M${v} 18v12M${v} 70v12M18 ${v}h12M70 ${v}h12`} />
        </g>
      ))}
    </Squircle>
  ),
  // Hoja de vida — documento PDF
  cv: (
    <Squircle id="cv" gradient={['#f7f7f9', '#dcdce2']}>
      <path d="M30 18h28l16 16v48a4 4 0 0 1-4 4H30a4 4 0 0 1-4-4V22a4 4 0 0 1 4-4z" fill="#fff" stroke="#c9c9cf" />
      <path d="M58 18v16h16z" fill="#e6e6ea" />
      <rect x="34" y="44" width="30" height="3" rx="1.5" fill="#8e8e93" />
      <rect x="34" y="52" width="30" height="3" rx="1.5" fill="#8e8e93" />
      <rect x="34" y="60" width="20" height="3" rx="1.5" fill="#8e8e93" />
      <rect x="22" y="66" width="34" height="16" rx="4" fill="#ff3b30" />
      <text x="39" y="78" textAnchor="middle" fontSize="11" fontWeight="700" fill="#fff" fontFamily="system-ui, sans-serif">PDF</text>
    </Squircle>
  ),
  // Terminal
  terminal: (
    <Squircle id="terminal" gradient={['#3b3b40', '#151517']}>
      <rect x="14" y="20" width="72" height="60" rx="8" fill="#000" fillOpacity="0.55" />
      <path d="M26 36l12 10-12 10" fill="none" stroke="#fff" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M44 58h22" stroke="#fff" strokeWidth="6" strokeLinecap="round" />
    </Squircle>
  ),
  // Contacto — sobre
  contact: (
    <Squircle id="contact" gradient={['#4db2ff', '#1a73e8']}>
      <rect x="16" y="30" width="68" height="44" rx="7" fill="#fff" />
      <path d="M18 34l32 24 32-24" fill="none" stroke="#1a73e8" strokeWidth="4" strokeLinejoin="round" />
      <path d="M16 70l24-20M84 70L60 50" stroke="#dbe9fb" strokeWidth="3" />
    </Squircle>
  ),
  mail: (
    <Squircle id="mail" gradient={['#4db2ff', '#1a73e8']}>
      <rect x="16" y="30" width="68" height="44" rx="7" fill="#fff" />
      <path d="M18 34l32 24 32-24" fill="none" stroke="#1a73e8" strokeWidth="4" strokeLinejoin="round" />
    </Squircle>
  ),
  github: (
    <Squircle id="github" gradient={['#2e2e33', '#101012']}>
      <g transform="translate(20 20) scale(2.5)">
        <path d={siGithub.path} fill="#fff" />
      </g>
    </Squircle>
  ),
  linkedin: (
    <Squircle id="linkedin" gradient={['#2b84d8', '#0a5cad']}>
      <text x="50" y="72" textAnchor="middle" fontSize="58" fontWeight="800" fill="#fff" fontFamily="system-ui, -apple-system, sans-serif" letterSpacing="-2">
        in
      </text>
    </Squircle>
  ),
}

export function AppIcon({ id, size, className }: Props) {
  return (
    <svg
      viewBox="0 0 100 100"
      width={size}
      height={size}
      className={className}
      aria-hidden="true"
      focusable="false"
      style={{ display: 'block', filter: 'drop-shadow(0 2px 3px rgba(0,0,0,0.3))' }}
    >
      {icons[id]}
    </svg>
  )
}
