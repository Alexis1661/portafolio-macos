import { useEffect, useState } from 'react'
import { MOBILE_BREAKPOINT } from '@/lib/layout'
import { useWindows } from '@/store/windows'

/** Devuelve si el viewport es móvil y re-encaja las ventanas al redimensionar. */
export function useViewport() {
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < MOBILE_BREAKPOINT)
  const relayout = useWindows((s) => s.relayout)

  useEffect(() => {
    let raf = 0
    const onResize = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
        relayout()
      })
    }
    window.addEventListener('resize', onResize)
    return () => {
      window.removeEventListener('resize', onResize)
      cancelAnimationFrame(raf)
    }
  }, [relayout])

  return { isMobile }
}
