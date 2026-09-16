import { useEffect, useRef, useState, type ReactNode } from 'react'
import { motion } from 'motion/react'
import { projects } from '@/data/projects'
import { techs } from '@/data/tech'
import { ProjectThumb } from '@/components/icons/ProjectThumb'
import { TechIcon } from '@/components/icons/TechIcon'
import { useWindows, type WindowPayload } from '@/store/windows'
import type { AppId } from '@/data/apps'

interface DesktopItem {
  id: string
  label: string
  kind: 'project' | 'tech'
  appId: AppId
  payload: WindowPayload
  desktop: { x: number; y: number }
  thumb: ReactNode
}

/**
 * Iconos dispersos sobre el fondo, como en la referencia: proyectos (miniatura
 * apaisada) y tecnologías (squircle con logo). Un clic selecciona, doble clic
 * (o toque en móvil) abre la ventana correspondiente. Arrastrables en escritorio.
 */
export function DesktopIcons({ isMobile }: { isMobile: boolean }) {
  const open = useWindows((s) => s.open)
  const [selected, setSelected] = useState<string | null>(null)
  const areaRef = useRef<HTMLDivElement>(null)

  const items: DesktopItem[] = [
    ...projects.map<DesktopItem>((p) => ({
      id: `project:${p.id}`,
      label: p.name,
      kind: 'project',
      appId: 'project',
      payload: { projectId: p.id },
      desktop: p.desktop,
      thumb: (
        <ProjectThumb
          variant={p.thumb}
          className="h-[46px] w-[72px] rounded-[7px] shadow-[0_2px_6px_rgba(0,0,0,0.35)] ring-1 ring-white/30"
        />
      ),
    })),
    ...techs.map<DesktopItem>((t) => ({
      id: `tech:${t.id}`,
      label: t.name,
      kind: 'tech',
      appId: 'tech',
      payload: { techId: t.id },
      desktop: t.desktop,
      thumb: <TechIcon tech={t} className="h-[50px] w-[50px] drop-shadow-[0_2px_6px_rgba(0,0,0,0.35)]" />,
    })),
  ]

  // Deseleccionar al hacer clic fuera de cualquier icono.
  useEffect(() => {
    const onDown = (e: PointerEvent) => {
      if (!(e.target as HTMLElement).closest('[data-desktop-icon]')) setSelected(null)
    }
    window.addEventListener('pointerdown', onDown)
    return () => window.removeEventListener('pointerdown', onDown)
  }, [])

  const openItem = (item: DesktopItem, e: React.MouseEvent) => {
    setSelected(item.id)
    open(item.appId, { payload: item.payload, title: item.label, origin: { x: e.clientX, y: e.clientY } })
  }

  return (
    <div
      ref={areaRef}
      className={
        isMobile
          ? 'mac-scroll absolute inset-x-2 bottom-[104px] top-[40px] grid grid-cols-4 content-end gap-x-1 gap-y-3 overflow-y-auto'
          : 'absolute inset-x-0 bottom-[96px] top-[28px]'
      }
      style={{ zIndex: 10 }}
    >
      {items.map((item, i) => {
        const active = selected === item.id
        return (
          <motion.button
            key={item.id}
            type="button"
            data-desktop-icon
            aria-label={`Abrir ${item.kind === 'project' ? 'proyecto' : 'tecnología'} ${item.label}`}
            drag={!isMobile}
            dragMomentum={false}
            dragConstraints={areaRef}
            dragElastic={0}
            initial={{ opacity: 0, scale: 0.7, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.55 + i * 0.07, type: 'spring', stiffness: 300, damping: 24 }}
            whileTap={{ scale: 0.96 }}
            onClick={(e) => {
              if (isMobile || window.matchMedia('(pointer: coarse)').matches) openItem(item, e)
              else setSelected(item.id)
            }}
            onDoubleClick={(e) => openItem(item, e)}
            className={`no-select group flex flex-col items-center gap-1.5 ${
              isMobile ? 'relative mx-auto w-full' : 'absolute w-[104px]'
            }`}
            style={isMobile ? undefined : { left: `${item.desktop.x}%`, top: `${item.desktop.y}%` }}
          >
            <span
              className={`flex h-[54px] items-center rounded-lg px-1 transition-colors ${
                active ? 'bg-black/30 ring-1 ring-white/25' : 'group-hover:bg-black/10'
              }`}
            >
              {item.thumb}
            </span>
            <span
              className={`icon-label line-clamp-2 max-w-full rounded-[4px] px-1.5 py-[1px] text-center text-[11.5px] font-medium leading-tight text-white ${
                active ? 'bg-accent' : ''
              }`}
            >
              {item.label}
            </span>
          </motion.button>
        )
      })}
    </div>
  )
}
