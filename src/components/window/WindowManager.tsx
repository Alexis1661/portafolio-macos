import { AnimatePresence } from 'motion/react'
import { useWindows } from '@/store/windows'
import { MENUBAR_HEIGHT } from '@/lib/layout'
import { Window } from './Window'
import { AppContent } from './AppContent'

/** Capa de ventanas de escritorio: vive debajo de la barra superior y por debajo del Dock. */
export function WindowManager() {
  const windows = useWindows((s) => s.windows)

  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-0" style={{ top: MENUBAR_HEIGHT, zIndex: 20 }}>
      <AnimatePresence>
        {windows.map((win) => (
          <Window key={win.id} win={win} isMobile={false} dark={win.appId === 'terminal'}>
            <AppContent win={win} />
          </Window>
        ))}
      </AnimatePresence>
    </div>
  )
}
