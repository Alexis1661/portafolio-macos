import { useEffect } from 'react'
import { motion } from 'motion/react'
import { MenuBar } from './MenuBar'
import { Dock } from './Dock'
import { DesktopIcons } from './DesktopIcons'
import { WindowManager } from '@/components/window/WindowManager'
import { MobileHome } from '@/components/mobile/MobileHome'
import { useViewport } from '@/hooks/useViewport'
import { useWindows } from '@/store/windows'
import { apps } from '@/data/apps'
import { getWorkArea } from '@/lib/layout'

/**
 * Escritorio completo. Secuencia de arranque (como en el video de referencia):
 * fondo → barra superior → iconos uno a uno → Dock → primera ventana ("Sobre mí").
 * En móvil se muestra la experiencia estilo iPhone (MobileHome).
 */
export function Desktop() {
  const { isMobile } = useViewport()
  const open = useWindows((s) => s.open)

  useEffect(() => {
    if (isMobile) return
    // Abre "Sobre mí" tras el arranque, solo si el usuario no abrió nada antes.
    // Se coloca a la izquierda para no tapar la cara del avatar.
    const t = window.setTimeout(() => {
      if (useWindows.getState().windows.length !== 0) return
      const area = getWorkArea()
      const w = Math.min(apps.about.size.w, Math.max(apps.about.minSize.w, area.w * 0.36))
      const h = Math.min(apps.about.size.h, area.h - 120)
      open('about', { rect: { x: 32, y: (area.h - h) / 2 - 10, w, h } })
    }, 1900)
    return () => window.clearTimeout(t)
    // Solo al montar: la posición inicial no debe cambiar al redimensionar.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (isMobile) return <MobileHome />

  return (
    <div className="relative h-full w-full overflow-hidden bg-[#3a3a3c]">
      {/* Fondo de pantalla: sin modificar, cubriendo toda la pantalla */}
      <motion.img
        src="/wallpaper.png"
        alt=""
        aria-hidden="true"
        draggable={false}
        initial={{ opacity: 0, scale: 1.04 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.1, ease: [0.2, 0.8, 0.2, 1] }}
        className="no-select pointer-events-none absolute inset-0 h-full w-full object-cover object-[50%_35%]"
      />

      {/* Nombre decorativo a la derecha del fondo (public/name.png) */}
      <motion.img
        src="/name.png"
        alt="Alexis Delgado"
        draggable={false}
        initial={{ opacity: 0, x: 24 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.9, ease: [0.2, 0.8, 0.2, 1], delay: 0.5 }}
        className="no-select pointer-events-none absolute top-1/2 -translate-y-1/2"
        style={{ right: '4%', width: 'clamp(200px, 21vw, 400px)', filter: 'drop-shadow(0 6px 18px rgba(0,0,0,0.35))', zIndex: 5 }}
      />

      <DesktopIcons isMobile={false} />
      <WindowManager />
      <MenuBar />
      <Dock isMobile={false} />
    </div>
  )
}
