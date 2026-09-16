import { useMemo, type ReactNode } from 'react'
import { Rnd } from 'react-rnd'
import { motion } from 'motion/react'
import { apps } from '@/data/apps'
import { useWindows, type WindowState } from '@/store/windows'
import { DOCK_HEIGHT, DOCK_BOTTOM_GAP, MENUBAR_HEIGHT } from '@/lib/layout'
import { TrafficLights } from './TrafficLights'

interface Props {
  win: WindowState
  isMobile: boolean
  children: ReactNode
  /** Barra de título oscura (Terminal). */
  dark?: boolean
}

const spring = { type: 'spring', stiffness: 380, damping: 32, mass: 0.9 } as const

export function Window({ win, isMobile, children, dark }: Props) {
  const focusedId = useWindows((s) => s.focusedId)
  const close = useWindows((s) => s.close)
  const minimize = useWindows((s) => s.minimize)
  const toggleMaximize = useWindows((s) => s.toggleMaximize)
  const focus = useWindows((s) => s.focus)
  const setRect = useWindows((s) => s.setRect)

  const def = apps[win.appId]
  const active = focusedId === win.id && !win.minimized

  // Origen de la animación de apertura: el icono que la abrió (o el centro).
  const transformOrigin = useMemo(() => {
    if (!win.origin) return '50% 50%'
    const ox = ((win.origin.x - win.rect.x) / win.rect.w) * 100
    const oy = ((win.origin.y - MENUBAR_HEIGHT - win.rect.y) / win.rect.h) * 100
    return `${Math.min(Math.max(ox, -50), 150)}% ${Math.min(Math.max(oy, -50), 150)}%`
  }, [win.origin, win.rect])

  const frame = (
    <motion.div
      className={`relative flex h-full w-full flex-col overflow-hidden ${
        isMobile ? 'rounded-2xl' : 'rounded-xl'
      } ${dark ? 'bg-[#1e1e1e] text-white' : 'bg-window text-[#1d1d1f]'}`}
      style={{
        transformOrigin: win.minimized ? '50% 120%' : transformOrigin,
        boxShadow: active ? 'var(--shadow-window)' : 'var(--shadow-window-inactive)',
        pointerEvents: win.minimized ? 'none' : 'auto',
      }}
      initial={{ opacity: 0, scale: 0.82, y: 14 }}
      animate={
        win.minimized
          ? { opacity: 0, scale: 0.35, y: 240, transition: { duration: 0.32, ease: [0.4, 0, 0.2, 1] } }
          : { opacity: 1, scale: 1, y: 0, transition: spring }
      }
      exit={{ opacity: 0, scale: 0.9, y: 8, transition: { duration: 0.18, ease: [0.4, 0, 1, 1] } }}
      role="dialog"
      aria-label={win.title}
      aria-hidden={win.minimized}
    >
      {/* Barra de título */}
      <div
        className={`window-drag no-select flex h-[38px] shrink-0 items-center gap-3 px-4 ${
          dark ? 'bg-[#2b2b2b]' : 'bg-white'
        } ${isMobile ? '' : 'cursor-default'}`}
        onDoubleClick={() => !isMobile && toggleMaximize(win.id)}
      >
        <TrafficLights
          active={active}
          maximized={win.maximized}
          onClose={() => close(win.id)}
          onMinimize={() => minimize(win.id)}
          onMaximize={() => toggleMaximize(win.id)}
        />
        <span
          className={`truncate text-[13px] ${
            dark ? (active ? 'text-white/85' : 'text-white/45') : active ? 'text-[#6e6e73]' : 'text-[#b0b0b5]'
          }`}
        >
          {win.title}
        </span>
      </div>
      {/* Contenido */}
      <div className={`window-body min-h-0 flex-1 overflow-auto ${dark ? 'mac-scroll-dark' : 'mac-scroll'}`}>{children}</div>
    </motion.div>
  )

  if (isMobile) {
    // En móvil la ventana ocupa toda la pantalla entre la barra y el Dock, sin arrastre.
    return (
      <div
        className="absolute left-2 right-2"
        style={{ top: 8, bottom: DOCK_HEIGHT + DOCK_BOTTOM_GAP + 8, zIndex: win.z, pointerEvents: win.minimized ? 'none' : 'auto' }}
        onPointerDownCapture={() => focus(win.id)}
      >
        {frame}
      </div>
    )
  }

  return (
    <Rnd
      size={{ width: win.rect.w, height: win.rect.h }}
      position={{ x: win.rect.x, y: win.rect.y }}
      minWidth={def.minSize.w}
      minHeight={def.minSize.h}
      bounds="parent"
      dragHandleClassName="window-drag"
      disableDragging={win.maximized}
      enableResizing={def.resizable && !win.maximized}
      onDragStart={() => focus(win.id)}
      onDragStop={(_, d) => setRect(win.id, { x: d.x, y: d.y })}
      onResizeStart={() => focus(win.id)}
      onResizeStop={(_, __, ref, ___, pos) =>
        setRect(win.id, { w: ref.offsetWidth, h: ref.offsetHeight, x: pos.x, y: pos.y })
      }
      style={{ zIndex: win.z, pointerEvents: win.minimized ? 'none' : 'auto' }}
      resizeHandleStyles={{
        bottomRight: { width: 16, height: 16, right: -4, bottom: -4 },
        bottomLeft: { width: 16, height: 16, left: -4, bottom: -4 },
        topRight: { width: 16, height: 16, right: -4, top: -4 },
        topLeft: { width: 16, height: 16, left: -4, top: -4 },
      }}
    >
      <div className="h-full w-full" onPointerDownCapture={() => focus(win.id)}>
        {frame}
      </div>
    </Rnd>
  )
}
