import { useRef, useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform, type MotionValue } from 'motion/react'
import { apps, dockApps, type AppId } from '@/data/apps'
import { profile } from '@/data/profile'
import { useWindows } from '@/store/windows'
import { AppIcon, type IconId } from '@/components/icons/AppIcon'
import { DOCK_BOTTOM_GAP } from '@/lib/layout'

interface DockEntry {
  id: IconId
  label: string
  appId?: AppId
  href?: string
}

const entries: DockEntry[] = [
  ...dockApps.map((id) => ({ id, label: apps[id].title, appId: id })),
]
const links: DockEntry[] = [
  { id: 'github', label: 'GitHub', href: profile.github },
  { id: 'linkedin', label: 'LinkedIn', href: profile.linkedin },
]

const BASE = 48
const MAX = 74
const RANGE = 140

function DockItem({ entry, mouseX, isMobile }: { entry: DockEntry; mouseX: MotionValue<number>; isMobile: boolean }) {
  const ref = useRef<HTMLButtonElement>(null)
  const open = useWindows((s) => s.open)
  const restore = useWindows((s) => s.restore)
  const focus = useWindows((s) => s.focus)
  const windows = useWindows((s) => s.windows)
  const [bounce, setBounce] = useState(false)
  const [hover, setHover] = useState(false)

  const isOpen = entry.appId ? windows.some((w) => w.appId === entry.appId) : false

  // Magnificación en función de la distancia horizontal al cursor.
  const distance = useTransform(mouseX, (x) => {
    const r = ref.current?.getBoundingClientRect()
    if (!r || x === Infinity) return Infinity
    return x - (r.left + r.width / 2)
  })
  const targetSize = useTransform(distance, [-RANGE, 0, RANGE], [BASE, MAX, BASE])
  const size = useSpring(targetSize, { mass: 0.1, stiffness: 180, damping: 14 })
  const finalSize = isMobile ? 40 : size

  const activate = (e: React.MouseEvent) => {
    if (entry.href) {
      window.open(entry.href, '_blank', 'noopener')
      return
    }
    const appId = entry.appId!
    const win = windows.find((w) => w.appId === appId)
    if (win?.minimized) restore(win.id)
    else if (win) focus(win.id)
    else {
      setBounce(true)
      window.setTimeout(() => setBounce(false), 700)
      open(appId, { origin: { x: e.clientX, y: e.clientY } })
    }
  }

  return (
    <div className="relative flex flex-col items-center">
      {hover && !isMobile && (
        <motion.div
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          className="pointer-events-none absolute -top-9 whitespace-nowrap rounded-md border border-white/10 bg-[#1c1c1e]/85 px-2.5 py-1 text-[12px] text-white shadow-lg backdrop-blur-xl"
          role="tooltip"
        >
          {entry.label}
        </motion.div>
      )}
      <motion.button
        ref={ref}
        type="button"
        aria-label={entry.label}
        title={isMobile ? entry.label : undefined}
        onClick={(e) => {
          setHover(false)
          activate(e)
        }}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        style={{ width: finalSize, height: finalSize }}
        animate={bounce ? { y: [0, -18, 0, -8, 0] } : { y: 0 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        whileTap={{ scale: 0.92 }}
        className="relative flex items-end justify-center"
      >
        <AppIcon id={entry.id} className="h-full w-full" />
      </motion.button>
      <span
        aria-hidden="true"
        className={`mt-1 h-1 w-1 rounded-full bg-[#1d1d1f]/70 transition-opacity ${isOpen ? 'opacity-100' : 'opacity-0'}`}
      />
    </div>
  )
}

/** Dock inferior de vidrio esmerilado con magnificación e indicadores de apps abiertas. */
export function Dock({ isMobile }: { isMobile: boolean }) {
  const mouseX = useMotionValue(Infinity)

  return (
    <motion.nav
      aria-label="Dock"
      initial={{ y: 90, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.55, ease: [0.2, 0.8, 0.2, 1], delay: 0.9 }}
      className="pointer-events-none absolute inset-x-0 z-40 flex justify-center px-2"
      style={{ bottom: `calc(${DOCK_BOTTOM_GAP}px + env(safe-area-inset-bottom, 0px))` }}
    >
      <div
        onMouseMove={(e) => !isMobile && mouseX.set(e.clientX)}
        onMouseLeave={() => mouseX.set(Infinity)}
        className={`glass pointer-events-auto flex min-w-0 max-w-full items-end rounded-[22px] pb-1.5 pt-2 ${
          isMobile ? 'gap-1.5 px-2' : 'gap-2 px-2.5'
        }`}
      >
        {entries.map((e) => (
          <DockItem key={e.id} entry={e} mouseX={mouseX} isMobile={isMobile} />
        ))}
        <div className={`mb-3 w-px self-end bg-black/15 ${isMobile ? 'h-8' : 'mx-0.5 h-10'}`} aria-hidden="true" />
        {links.map((e) => (
          <DockItem key={e.id} entry={e} mouseX={mouseX} isMobile={isMobile} />
        ))}
      </div>
    </motion.nav>
  )
}
