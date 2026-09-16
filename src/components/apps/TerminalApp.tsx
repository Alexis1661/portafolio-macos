import { useEffect, useRef, useState } from 'react'
import { profile } from '@/data/profile'
import { projects } from '@/data/projects'
import { techs } from '@/data/tech'
import { useWindows } from '@/store/windows'
import type { AppId } from '@/data/apps'

type Line = { kind: 'in' | 'out' | 'err'; text: string }

const PROMPT = 'alexis@portfolio ~ %'

const HELP = [
  'Comandos disponibles:',
  '  help        muestra esta ayuda',
  '  whoami      quién soy',
  '  about       perfil profesional',
  '  skills      habilidades técnicas',
  '  tech        tecnologías del escritorio y proyectos donde las uso',
  '  projects    lista de proyectos',
  '  experience  experiencia laboral',
  '  education   formación',
  '  contact     datos de contacto',
  '  open <app>  abre una app (about, projects, cv, contact)',
  '  neofetch    resumen del sistema',
  '  clear       limpia la pantalla',
]

const neofetch = () => [
  `${profile.shortName.toLowerCase().replace(' ', '')}@portfolio`,
  '-------------------------',
  `OS:        macOS-inspired web desktop`,
  `Host:      ${profile.location}`,
  `Shell:     zsh (simulada)`,
  `Role:      ${profile.role}`,
  `Uni:       ${profile.education[0].institution} · ${profile.education[0].degree}`,
  `Stack:     ${[...profile.skills.languages.slice(0, 4), ...profile.skills.frameworks.slice(0, 3)].join(', ')}`,
  `Langs:     ${profile.languages.map((l) => `${l.name} (${l.level})`).join(', ')}`,
  `Projects:  ${projects.length}`,
]

function run(cmdline: string, openApp: (id: AppId) => void): Line[] {
  const [cmd, ...args] = cmdline.trim().split(/\s+/)
  const out = (lines: string[]): Line[] => lines.map((text) => ({ kind: 'out', text }))
  switch (cmd) {
    case '':
      return []
    case 'help':
      return out(HELP)
    case 'whoami':
      return out([profile.name, `${profile.role} · ${profile.location}`])
    case 'about':
      return out([profile.summary, '', profile.summaryExtended])
    case 'skills':
      return out([
        `Lenguajes:   ${profile.skills.languages.join(', ')}`,
        `Frameworks:  ${profile.skills.frameworks.join(', ')}`,
        `Áreas:       ${profile.skills.areas.join(', ')}`,
        `Herramientas:${' '}${profile.skills.tools.join(', ')}`,
      ])
    case 'tech':
      return out(
        techs.map(
          (t) =>
            `${t.name.padEnd(14)} ${t.category.padEnd(10)} ${projects.filter((p) => p.tech.includes(t.match)).map((p) => p.name).join(', ') || '—'}`,
        ),
      )
    case 'projects':
    case 'ls':
      return out(projects.map((p) => `${p.name.padEnd(24)} ${p.year.padEnd(26)} ${p.tech.join(', ')}`))
    case 'experience':
      return out(
        profile.experience.flatMap((x) => [
          `${x.company} (${x.location}) — ${x.role} · ${x.period}`,
          ...x.bullets.map((b) => `  • ${b}`),
        ]),
      )
    case 'education':
      return out([
        ...profile.education.map((e) => `${e.institution} — ${e.degree}`),
        ...profile.certifications.map((c) => `${c.name} — ${c.issuer} (${c.date})`),
      ])
    case 'contact':
      return out([`Tel:      ${profile.phone}`, `Email:    ${profile.email}`, `GitHub:   ${profile.github}`, `LinkedIn: ${profile.linkedin}`])
    case 'neofetch':
      return out(neofetch())
    case 'open': {
      const target = args[0] as AppId | undefined
      const valid: AppId[] = ['about', 'projects', 'cv', 'contact', 'terminal']
      const tech = techs.find((t) => t.id === args[0]?.toLowerCase())
      if (tech) {
        useWindows.getState().open('tech', { payload: { techId: tech.id }, title: tech.name })
        return out([`Abriendo ${tech.name}…`])
      }
      if (target && valid.includes(target)) {
        openApp(target)
        return out([`Abriendo ${target}…`])
      }
      return [{ kind: 'err', text: `open: no encontrado. Usa: ${valid.join(', ')} o una tecnología (${techs.map((t) => t.id).join(', ')})` }]
    }
    case 'pwd':
      return out(['/Users/alexis/portfolio'])
    case 'date':
      return out([new Date().toString()])
    case 'echo':
      return out([args.join(' ')])
    case 'sudo':
      return [{ kind: 'err', text: 'alexis no está en el archivo sudoers. Este incidente será reportado.' }]
    default:
      return [{ kind: 'err', text: `zsh: command not found: ${cmd}` }]
  }
}

/** Terminal simulada estilo macOS con historial y comandos del portafolio. */
export function TerminalApp() {
  const open = useWindows((s) => s.open)
  const [lines, setLines] = useState<Line[]>([
    { kind: 'out', text: `Last login: ${new Date().toDateString()} on ttys000` },
    { kind: 'out', text: `Bienvenido al portafolio de ${profile.shortName}. Escribe "help" para ver los comandos.` },
    { kind: 'out', text: '' },
  ])
  const [input, setInput] = useState('')
  const [history, setHistory] = useState<string[]>([])
  const [histIdx, setHistIdx] = useState(-1)
  const inputRef = useRef<HTMLInputElement>(null)
  const endRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    endRef.current?.scrollIntoView({ block: 'end' })
  }, [lines])

  const submit = () => {
    const cmd = input
    const result = run(cmd, (id) => open(id))
    if (cmd.trim() === 'clear') {
      setLines([])
    } else {
      setLines((prev) => [...prev, { kind: 'in', text: cmd }, ...result])
    }
    if (cmd.trim()) setHistory((h) => [cmd, ...h].slice(0, 50))
    setHistIdx(-1)
    setInput('')
  }

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') submit()
    else if (e.key === 'ArrowUp') {
      e.preventDefault()
      const next = Math.min(histIdx + 1, history.length - 1)
      setHistIdx(next)
      setInput(history[next] ?? '')
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      const next = Math.max(histIdx - 1, -1)
      setHistIdx(next)
      setInput(next === -1 ? '' : history[next])
    } else if (e.key === 'l' && e.ctrlKey) {
      e.preventDefault()
      setLines([])
    }
  }

  return (
    <div
      className="h-full cursor-text bg-[#1e1e1e] px-4 py-3 font-mono text-[12.5px] leading-[1.5] text-[#e6e6e6]"
      onClick={() => inputRef.current?.focus()}
    >
      {lines.map((l, i) => (
        <div key={i} className="whitespace-pre-wrap break-words">
          {l.kind === 'in' ? (
            <>
              <span className="text-[#7ee787]">{PROMPT}</span> <span>{l.text}</span>
            </>
          ) : (
            <span className={l.kind === 'err' ? 'text-[#ff7b72]' : ''}>{l.text || ' '}</span>
          )}
        </div>
      ))}
      <div className="flex items-center">
        <span className="shrink-0 text-[#7ee787]">{PROMPT}</span>
        <span className="w-2" />
        <input
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={onKeyDown}
          autoFocus
          spellCheck={false}
          autoComplete="off"
          autoCapitalize="off"
          aria-label="Entrada de la terminal"
          className="min-w-0 flex-1 bg-transparent text-[#e6e6e6] caret-[#e6e6e6] outline-none"
        />
      </div>
      <div ref={endRef} />
    </div>
  )
}
