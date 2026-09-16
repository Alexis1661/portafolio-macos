/** Constantes de layout del escritorio (px). */
export const MENUBAR_HEIGHT = 28
export const DOCK_HEIGHT = 72
export const DOCK_BOTTOM_GAP = 10
export const MOBILE_BREAKPOINT = 768
export const WINDOW_MARGIN = 12

export interface Rect {
  x: number
  y: number
  w: number
  h: number
}

export const isMobileViewport = () =>
  typeof window !== 'undefined' && window.innerWidth < MOBILE_BREAKPOINT

/**
 * Área en la que pueden vivir las ventanas. Es relativa a la capa de ventanas,
 * que empieza justo debajo de la barra superior (por eso y = 0).
 */
export const getWorkArea = () => {
  const vw = window.innerWidth
  const vh = window.innerHeight
  return {
    x: 0,
    y: 0,
    w: vw,
    h: vh - MENUBAR_HEIGHT,
  }
}

/** Ajusta un rect para que quepa dentro del área de trabajo. */
export const clampRect = (rect: Rect, min: { w: number; h: number }): Rect => {
  const area = getWorkArea()
  const maxW = Math.max(min.w, area.w - WINDOW_MARGIN * 2)
  const maxH = Math.max(min.h, area.h - WINDOW_MARGIN * 2)
  const w = Math.min(Math.max(rect.w, min.w), maxW)
  const h = Math.min(Math.max(rect.h, min.h), maxH)
  const x = Math.min(Math.max(rect.x, area.x + WINDOW_MARGIN), area.x + area.w - w - WINDOW_MARGIN)
  const y = Math.min(Math.max(rect.y, area.y + WINDOW_MARGIN), area.y + area.h - h - WINDOW_MARGIN)
  return { x, y, w, h }
}

/** Posición centrada con un pequeño desplazamiento en cascada. */
export const cascadeRect = (
  size: { w: number; h: number },
  min: { w: number; h: number },
  index: number,
): Rect => {
  const area = getWorkArea()
  const offset = (index % 6) * 28
  const w = Math.min(size.w, area.w - WINDOW_MARGIN * 2)
  const h = Math.min(size.h, area.h - WINDOW_MARGIN * 2)
  return clampRect(
    {
      x: area.x + (area.w - w) / 2 + offset,
      y: area.y + (area.h - h) / 2 - 20 + offset,
      w,
      h,
    },
    min,
  )
}

export const maximizedRect = (): Rect => {
  const area = getWorkArea()
  return { x: area.x, y: area.y, w: area.w, h: area.h }
}

/** Fracción del área de `a` que queda cubierta por `b`. */
const overlapFraction = (a: Rect, b: Rect) => {
  const w = Math.max(0, Math.min(a.x + a.w, b.x + b.w) - Math.max(a.x, b.x))
  const h = Math.max(0, Math.min(a.y + a.h, b.y + b.h) - Math.max(a.y, b.y))
  return (w * h) / (a.w * a.h)
}

/**
 * Posición para una ventana nueva sin tapar las existentes: se prueban huecos a
 * los lados de la ventana superior y de las ventanas más extremas, y se elige el
 * primero que apenas se solape; si ninguno sirve, en cascada sobre la superior.
 */
export const besideRect = (
  size: { w: number; h: number },
  min: { w: number; h: number },
  top: Rect,
  others: Rect[] = [],
): Rect => {
  const area = getWorkArea()
  const w = Math.min(size.w, area.w - WINDOW_MARGIN * 2)
  const h = Math.min(size.h, area.h - WINDOW_MARGIN * 2)
  const gap = 18
  const all = [top, ...others]
  const rightmost = all.reduce((a, b) => (b.x + b.w > a.x + a.w ? b : a))
  const leftmost = all.reduce((a, b) => (b.x < a.x ? b : a))
  const candidates: Rect[] = [
    { x: top.x + top.w + gap, y: top.y, w, h },
    { x: top.x - gap - w, y: top.y, w, h },
    { x: rightmost.x + rightmost.w + gap, y: top.y, w, h },
    { x: leftmost.x - gap - w, y: top.y, w, h },
    { x: top.x + 44, y: top.y + 44, w, h },
  ].map((c) => clampRect(c, min))
  const score = (r: Rect) => Math.max(...all.map((o) => overlapFraction(r, o)))
  // Sin hueco libre: en cascada sobre la ventana superior (como macOS), nunca sobre una más antigua.
  return candidates.find((c) => score(c) < 0.2) ?? candidates[candidates.length - 1]
}
