import { useEffect, useRef, useState, type ReactNode } from 'react'
import { motion, AnimatePresence, useMotionValue, animate } from 'motion/react'
import { Wifi, BatteryFull, Signal, ChevronLeft } from 'lucide-react'
import { apps, type AppId } from '@/data/apps'
import { projects } from '@/data/projects'
import { techs } from '@/data/tech'
import { profile } from '@/data/profile'
import { useWindows, type WindowPayload } from '@/store/windows'
import { AppIcon, type IconId } from '@/components/icons/AppIcon'
import { ProjectThumb } from '@/components/icons/ProjectThumb'
import { TechIcon } from '@/components/icons/TechIcon'
import { AppContent } from '@/components/window/AppContent'

/**
 * Experiencia móvil estilo iPhone: barra de estado, pantalla de inicio con
 * páginas deslizables de iconos, Dock inferior y apps a pantalla completa que
 * se abren con zoom desde su icono y se cierran con el botón atrás o deslizando
 * hacia abajo desde la barra de título.
 */

const STATUS_H = 47
const DOCK_H = 96
const COLS = 4

interface HomeItem {
  id: string
  label: string
  icon: ReactNode
  onOpen: (origin: { x: number; y: number }) => void
}

const timeFmt = new Intl.DateTimeFormat('es-CO', { hour: 'numeric', minute: '2-digit', hour12: false })

function StatusBar({ dark, z = 30 }: { dark?: boolean; z?: number }) {
  const [time, setTime] = useState(() => timeFmt.format(new Date()))
  useEffect(() => {
    const id = window.setInterval(() => setTime(timeFmt.format(new Date())), 10_000)
    return () => window.clearInterval(id)
  }, [])
  return (
    <div
      className={`pointer-events-none absolute inset-x-0 top-0 flex items-end justify-between px-7 pb-2 text-[15px] font-semibold ${
        dark ? 'text-[#1d1d1f]' : 'text-white'
      }`}
      style={{ height: `calc(${STATUS_H}px + env(safe-area-inset-top, 0px))`, zIndex: z }}
    >
      <span className="tabular-nums">{time}</span>
      <span className="flex items-center gap-1.5">
        <Signal size={15} strokeWidth={2.5} />
        <Wifi size={15} strokeWidth={2.5} />
        <BatteryFull size={20} strokeWidth={2} />
      </span>
    </div>
  )
}

function HomeIcon({ item }: { item: HomeItem }) {
  const ref = useRef<HTMLButtonElement>(null)
  return (
    <motion.button
      ref={ref}
      type="button"
      aria-label={`Abrir ${item.label}`}
      whileTap={{ scale: 0.9, opacity: 0.8 }}
      onClick={() => {
        const r = ref.current?.getBoundingClientRect()
        item.onOpen(r ? { x: r.left + r.width / 2, y: r.top + r.height / 2 } : { x: 0, y: 0 })
      }}
      className="no-select flex w-full flex-col items-center gap-1.5"
    >
      <span className="block h-[60px] w-[60px] overflow-hidden rounded-[22.37%] shadow-[0_3px_8px_rgba(0,0,0,0.35)]">{item.icon}</span>
      <span className="icon-label w-[74px] truncate text-center text-[11px] font-medium leading-tight text-white">{item.label}</span>
    </motion.button>
  )
}

/** App abierta a pantalla completa con barra de navegación iOS. */
function MobileApp({ winId, onBack, origin }: { winId: string; onBack: () => void; origin?: { x: number; y: number } }) {
  const win = useWindows((s) => s.windows.find((w) => w.id === winId))
  const y = useMotionValue(0)
  if (!win) return null
  const dark = win.appId === 'terminal'
  const ox = origin ? (origin.x / window.innerWidth) * 100 : 50
  const oy = origin ? (origin.y / window.innerHeight) * 100 : 50

  return (
    <motion.div
      className={`absolute inset-0 z-40 flex flex-col overflow-hidden ${dark ? 'bg-[#1e1e1e] text-white' : 'bg-white text-[#1d1d1f]'}`}
      style={{ transformOrigin: `${ox}% ${oy}%`, y, borderRadius: 0 }}
      initial={{ opacity: 0, scale: 0.15, borderRadius: 40 }}
      animate={{ opacity: 1, scale: 1, borderRadius: 0, transition: { type: 'spring', stiffness: 320, damping: 32, mass: 0.9 } }}
      exit={{ opacity: 0, scale: 0.15, borderRadius: 40, transition: { duration: 0.28, ease: [0.4, 0, 1, 1] } }}
      role="dialog"
      aria-label={win.title}
    >
      <StatusBar dark={!dark} z={50} />
      {/* Barra de navegación: arrastrar hacia abajo cierra la app */}
      <motion.div
        className={`flex shrink-0 items-center gap-1 px-2 pb-2 ${dark ? 'bg-[#2b2b2b]' : 'bg-[#f7f7f9]'} border-b ${dark ? 'border-white/10' : 'border-black/8'}`}
        style={{ paddingTop: `calc(${STATUS_H}px + env(safe-area-inset-top, 0px))`, touchAction: 'pan-x' }}
        drag="y"
        dragConstraints={{ top: 0, bottom: 0 }}
        dragElastic={{ top: 0, bottom: 0.5 }}
        onDrag={(_, info) => y.set(Math.max(0, info.offset.y))}
        onDragEnd={(_, info) => {
          if (info.offset.y > 110 || info.velocity.y > 600) onBack()
          else animate(y, 0, { type: 'spring', stiffness: 400, damping: 34 })
        }}
      >
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-0.5 rounded-lg py-1 pl-1 pr-3 text-[16px] font-medium text-accent active:opacity-60"
        >
          <ChevronLeft size={22} strokeWidth={2.4} /> Inicio
        </button>
        <span className="absolute left-1/2 -translate-x-1/2 text-[16px] font-semibold">{win.title}</span>
      </motion.div>
      <div className={`window-body min-h-0 flex-1 overflow-auto ${dark ? 'mac-scroll-dark' : 'mac-scroll'}`}>
        <AppContent win={win} />
        <div style={{ height: 'calc(24px + env(safe-area-inset-bottom, 0px))' }} />
      </div>
      {/* Indicador de inicio */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 flex justify-center pb-2">
        <span className={`h-[5px] w-[134px] rounded-full ${dark ? 'bg-white/80' : 'bg-black/80'}`} />
      </div>
    </motion.div>
  )
}

export function MobileHome() {
  const open = useWindows((s) => s.open)
  const close = useWindows((s) => s.close)
  const windows = useWindows((s) => s.windows)
  const [page, setPage] = useState(0)
  const [origins] = useState(() => new Map<string, { x: number; y: number }>())

  const launch = (appId: AppId, title: string, origin: { x: number; y: number }, payload?: WindowPayload) => {
    const id = open(appId, { payload, title, origin })
    origins.set(id, origin)
  }
  const link = (href: string) => () => window.open(href, '_blank', 'noopener')
  const app = (id: IconId, appId: AppId): HomeItem => ({
    id,
    label: apps[appId].title,
    icon: <AppIcon id={id} className="h-full w-full" />,
    onOpen: (o) => launch(appId, apps[appId].title, o),
  })

  const pages: HomeItem[][] = [
    [
      app('cv', 'cv'),
      { id: 'github', label: 'GitHub', icon: <AppIcon id="github" className="h-full w-full" />, onOpen: link(profile.github) },
      { id: 'linkedin', label: 'LinkedIn', icon: <AppIcon id="linkedin" className="h-full w-full" />, onOpen: link(profile.linkedin) },
      ...projects.map<HomeItem>((p) => ({
        id: `project:${p.id}`,
        label: p.name,
        icon: <ProjectThumb variant={p.thumb} className="h-full w-full" />,
        onOpen: (o) => launch('project', p.name, o, { projectId: p.id }),
      })),
    ],
    techs.map<HomeItem>((t) => ({
      id: `tech:${t.id}`,
      label: t.name,
      icon: <TechIcon tech={t} className="h-full w-full" />,
      onOpen: (o) => launch('tech', t.name, o, { techId: t.id }),
    })),
  ]
  const dock: HomeItem[] = [app('about', 'about'), app('projects', 'projects'), app('terminal', 'terminal'), app('contact', 'contact')]

  // Solo se muestra la app superior; "Inicio" la cierra y deja ver la anterior si la hay.
  const top = [...windows].sort((a, b) => b.z - a.z)[0]

  return (
    <div className="relative h-full w-full overflow-hidden bg-[#3a3a3c]">
      <motion.img
        src="/wallpaper.png"
        alt=""
        aria-hidden="true"
        draggable={false}
        initial={{ opacity: 0, scale: 1.06 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.1, ease: [0.2, 0.8, 0.2, 1] }}
        className="no-select pointer-events-none absolute inset-0 h-full w-full object-cover object-[50%_22%]"
      />
      {/* Oscurecer levemente para legibilidad de etiquetas */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/25 via-transparent to-black/45" />

      <StatusBar />

      {/* Páginas de iconos */}
      <div
        className="absolute inset-x-0 overflow-hidden"
        style={{ top: `calc(${STATUS_H + 14}px + env(safe-area-inset-top, 0px))`, bottom: `calc(${DOCK_H + 14 + 40}px + env(safe-area-inset-bottom, 0px))` }}
      >
        <motion.div
          className="flex h-full"
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.15}
          animate={{ x: `-${page * 100}%` }}
          transition={{ type: 'spring', stiffness: 300, damping: 32 }}
          onDragEnd={(_, info) => {
            if (info.offset.x < -50 && page < pages.length - 1) setPage(page + 1)
            else if (info.offset.x > 50 && page > 0) setPage(page - 1)
          }}
        >
          {pages.map((items, i) => (
            <div key={i} className="h-full w-full shrink-0 px-5" style={{ touchAction: 'pan-y' }}>
              <motion.div
                className="grid gap-x-3 gap-y-5"
                style={{ gridTemplateColumns: `repeat(${COLS}, minmax(0, 1fr))` }}
                initial="hidden"
                animate="show"
                variants={{ show: { transition: { staggerChildren: 0.04, delayChildren: 0.4 } } }}
              >
                {items.map((item) => (
                  <motion.div key={item.id} variants={{ hidden: { opacity: 0, scale: 0.7 }, show: { opacity: 1, scale: 1 } }}>
                    <HomeIcon item={item} />
                  </motion.div>
                ))}
              </motion.div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Puntos de página (encima del Dock, con su propia píldora como en iOS) */}
      <div
        className="absolute inset-x-0 flex justify-center"
        style={{ bottom: `calc(${DOCK_H + 14 + 14}px + env(safe-area-inset-bottom, 0px))` }}
      >
        <div className="flex items-center gap-2.5 rounded-full bg-black/25 px-3 py-1.5 backdrop-blur-md">
          {pages.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Página ${i + 1}`}
              onClick={() => setPage(i)}
              className={`h-2 w-2 rounded-full transition ${i === page ? 'bg-white' : 'bg-white/45'}`}
            />
          ))}
        </div>
      </div>

      {/* Dock iOS */}
      <motion.div
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.55, ease: [0.2, 0.8, 0.2, 1], delay: 0.6 }}
        className="absolute inset-x-3 flex items-start justify-around rounded-[32px] px-2 pt-3.5"
        style={{
          bottom: `calc(14px + env(safe-area-inset-bottom, 0px))`,
          height: DOCK_H,
          background: 'rgba(255,255,255,0.22)',
          backdropFilter: 'saturate(180%) blur(24px)',
          WebkitBackdropFilter: 'saturate(180%) blur(24px)',
        }}
      >
        {dock.map((item) => (
          <motion.button
            key={item.id}
            type="button"
            aria-label={item.label}
            whileTap={{ scale: 0.9 }}
            onClick={(e) => {
              const r = (e.currentTarget as HTMLElement).getBoundingClientRect()
              item.onOpen({ x: r.left + r.width / 2, y: r.top + r.height / 2 })
            }}
            className="h-[60px] w-[60px] overflow-hidden rounded-[22.37%] shadow-[0_3px_8px_rgba(0,0,0,0.35)]"
          >
            {item.icon}
          </motion.button>
        ))}
      </motion.div>

      {/* Indicador de inicio */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 flex justify-center pb-2">
        <span className="h-[5px] w-[134px] rounded-full bg-white/85" />
      </div>

      {/* App abierta */}
      <AnimatePresence>
        {top && <MobileApp key={top.id} winId={top.id} origin={origins.get(top.id)} onBack={() => close(top.id)} />}
      </AnimatePresence>
    </div>
  )
}
