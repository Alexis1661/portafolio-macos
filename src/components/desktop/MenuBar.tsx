import { useEffect, useRef, useState } from 'react'
import { motion } from 'motion/react'
import { Wifi, Search, SlidersHorizontal, BatteryFull } from 'lucide-react'
import { useClock } from '@/hooks/useClock'
import { useWindows } from '@/store/windows'
import { apps, dockApps, type AppId } from '@/data/apps'
import { profile } from '@/data/profile'
import { MENUBAR_HEIGHT } from '@/lib/layout'

interface MenuItem {
  label: string
  action?: () => void
  disabled?: boolean
  separator?: boolean
}

/** Logo propio (avatar con gafas) en lugar del logotipo de Apple. */
const Logo = () => (
  <svg viewBox="0 0 64 64" width="16" height="16" aria-hidden="true">
    <circle cx="32" cy="26" r="11" fill="currentColor" />
    <path d="M12 58c2-13 10-20 20-20s18 7 20 20z" fill="currentColor" />
    <rect x="19" y="21" width="11" height="8" rx="2" fill="#3a3a3c" />
    <rect x="34" y="21" width="11" height="8" rx="2" fill="#3a3a3c" />
    <path d="M30 25h4" stroke="#3a3a3c" strokeWidth="2" />
  </svg>
)

function Menu({ label, items, bold, open, anyOpen, onOpen, onClose }: {
  label: React.ReactNode
  items: MenuItem[]
  bold?: boolean
  open: boolean
  /** Si otro menú ya está abierto, pasar el cursor cambia de menú (como en macOS). */
  anyOpen: boolean
  onOpen: () => void
  onClose: () => void
}) {
  return (
    <div className="relative h-full">
      <button
        type="button"
        onClick={() => (open ? onClose() : onOpen())}
        onMouseEnter={() => anyOpen && !open && onOpen()}
        className={`flex h-full items-center rounded px-2.5 text-[13px] ${bold ? 'font-semibold' : ''} ${
          open ? 'bg-white/20' : 'hover:bg-white/10'
        }`}
      >
        {label}
      </button>
      {open && (
        <motion.ul
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.12 }}
          className="absolute left-0 top-full mt-1 min-w-[200px] rounded-lg border border-white/20 bg-[#2c2c2e]/85 p-1 text-[13px] text-white shadow-2xl backdrop-blur-2xl"
          role="menu"
        >
          {items.map((it, i) =>
            it.separator ? (
              <li key={i} className="my-1 h-px bg-white/15" role="separator" />
            ) : (
              <li key={i} role="none">
                <button
                  type="button"
                  role="menuitem"
                  disabled={it.disabled}
                  onClick={() => {
                    it.action?.()
                    onClose()
                  }}
                  className="flex w-full items-center rounded-md px-3 py-1 text-left hover:bg-accent disabled:opacity-40 disabled:hover:bg-transparent"
                >
                  {it.label}
                </button>
              </li>
            ),
          )}
        </motion.ul>
      )}
    </div>
  )
}

/** Barra superior fija estilo macOS. */
export function MenuBar() {
  const clock = useClock()
  const windows = useWindows((s) => s.windows)
  const focusedId = useWindows((s) => s.focusedId)
  const open = useWindows((s) => s.open)
  const close = useWindows((s) => s.close)
  const restore = useWindows((s) => s.restore)
  const closeAll = useWindows((s) => s.closeAll)
  const toggleMaximize = useWindows((s) => s.toggleMaximize)
  const minimize = useWindows((s) => s.minimize)

  const [openMenu, setOpenMenu] = useState<string | null>(null)
  const barRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!openMenu) return
    const onDown = (e: PointerEvent) => {
      if (!barRef.current?.contains(e.target as Node)) setOpenMenu(null)
    }
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpenMenu(null)
    window.addEventListener('pointerdown', onDown)
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('pointerdown', onDown)
      window.removeEventListener('keydown', onKey)
    }
  }, [openMenu])

  const focused = windows.find((w) => w.id === focusedId)
  const appName = focused ? (apps[focused.appId].multiInstance ? focused.title : apps[focused.appId].title) : 'Portafolio'

  const menus: { id: string; label: React.ReactNode; bold?: boolean; items: MenuItem[] }[] = [
    {
      id: 'logo',
      label: <Logo />,
      items: [
        { label: `Acerca de ${profile.shortName}`, action: () => open('about') },
        { separator: true, label: '' },
        { label: 'Hoja de vida…', action: () => open('cv') },
        { label: 'Contacto…', action: () => open('contact') },
        { separator: true, label: '' },
        { label: 'Cerrar todas las ventanas', action: closeAll, disabled: windows.length === 0 },
      ],
    },
    {
      id: 'app',
      label: appName,
      bold: true,
      items: [
        { label: `Acerca de ${appName}`, disabled: !focused, action: () => open('about') },
        { separator: true, label: '' },
        { label: 'Ocultar', disabled: !focused, action: () => focused && minimize(focused.id) },
        { label: 'Salir', disabled: !focused, action: () => focused && close(focused.id) },
      ],
    },
    {
      id: 'file',
      label: 'Archivo',
      items: [
        ...dockApps.map((id: AppId) => ({ label: `Abrir ${apps[id].title}`, action: () => open(id) })),
        { separator: true, label: '' },
        { label: 'Cerrar ventana', disabled: !focused, action: () => focused && close(focused.id) },
      ],
    },
    {
      id: 'view',
      label: 'Ver',
      items: [
        { label: focused?.maximized ? 'Salir de pantalla completa' : 'Pantalla completa', disabled: !focused, action: () => focused && toggleMaximize(focused.id) },
        { label: 'Minimizar', disabled: !focused, action: () => focused && minimize(focused.id) },
      ],
    },
    {
      id: 'go',
      label: 'Ir',
      items: [
        { label: 'Sobre mí', action: () => open('about') },
        { label: 'Proyectos', action: () => open('projects') },
        { label: 'Hoja de vida', action: () => open('cv') },
        { label: 'Terminal', action: () => open('terminal') },
        { label: 'Contacto', action: () => open('contact') },
        { separator: true, label: '' },
        { label: 'GitHub ↗', action: () => window.open(profile.github, '_blank', 'noopener') },
        { label: 'LinkedIn ↗', action: () => window.open(profile.linkedin, '_blank', 'noopener') },
      ],
    },
    {
      id: 'window',
      label: 'Ventana',
      items:
        windows.length === 0
          ? [{ label: 'No hay ventanas abiertas', disabled: true }]
          : windows.map((w) => ({
              label: `${w.minimized ? '◇ ' : w.id === focusedId ? '✓ ' : '   '}${w.title}`,
              action: () => (w.minimized ? restore(w.id) : useWindows.getState().focus(w.id)),
            })),
    },
    {
      id: 'help',
      label: 'Ayuda',
      items: [
        { label: 'Comandos de la Terminal', action: () => open('terminal') },
        { label: 'Descargar CV (PDF)', action: () => window.open('/cv.pdf', '_blank', 'noopener') },
      ],
    },
  ]

  return (
    <motion.header
      ref={barRef}
      initial={{ y: -MENUBAR_HEIGHT, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.45, ease: [0.2, 0.8, 0.2, 1], delay: 0.25 }}
      className="glass-bar no-select absolute inset-x-0 top-0 z-50 flex items-center justify-between px-2 text-white"
      style={{ height: MENUBAR_HEIGHT }}
    >
      <nav className="flex h-full items-center" aria-label="Menú principal">
        {menus.map((m, i) => (
          <div key={m.id} className={`h-full ${i > 1 ? 'hidden md:block' : ''}`}>
            <Menu
              label={m.label}
              items={m.items}
              bold={m.bold}
              open={openMenu === m.id}
              anyOpen={openMenu !== null}
              onOpen={() => setOpenMenu(m.id)}
              onClose={() => setOpenMenu(null)}
            />
          </div>
        ))}
      </nav>
      <div className="flex h-full items-center gap-1 pr-1 text-[13px]">
        <span className="hidden items-center px-1.5 sm:flex" title="Batería">
          <BatteryFull size={17} strokeWidth={1.75} />
        </span>
        <span className="hidden items-center px-1.5 sm:flex" title="Wi-Fi">
          <Wifi size={15} strokeWidth={2} />
        </span>
        <button type="button" className="hidden rounded px-1.5 hover:bg-white/10 sm:flex" aria-label="Buscar" onClick={() => open('projects')}>
          <Search size={14} strokeWidth={2.2} />
        </button>
        <span className="hidden items-center px-1.5 sm:flex" title="Centro de control">
          <SlidersHorizontal size={14} strokeWidth={2.2} />
        </span>
        <span className="px-1.5 tabular-nums">{clock}</span>
      </div>
    </motion.header>
  )
}
