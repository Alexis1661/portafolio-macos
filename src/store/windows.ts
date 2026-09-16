import { create } from 'zustand'
import { apps, type AppId } from '@/data/apps'
import { besideRect, cascadeRect, clampRect, maximizedRect, type Rect } from '@/lib/layout'

export interface WindowPayload {
  projectId?: string
  techId?: string
}

export interface WindowState {
  id: string
  appId: AppId
  title: string
  rect: Rect
  /** Rect previo a maximizar, para restaurar. */
  restoreRect?: Rect
  z: number
  minimized: boolean
  maximized: boolean
  payload?: WindowPayload
  /** Punto (px) desde el que se anima la apertura/minimización (icono origen). */
  origin?: { x: number; y: number }
}

interface WindowsStore {
  windows: WindowState[]
  focusedId: string | null
  nextZ: number
  openCount: number

  open: (
    appId: AppId,
    opts?: {
      payload?: WindowPayload
      title?: string
      origin?: { x: number; y: number }
      /** Posición/tamaño inicial (se ajusta al área visible). Si se omite, se centra en cascada. */
      rect?: Partial<Rect>
    },
  ) => string
  close: (id: string) => void
  minimize: (id: string) => void
  restore: (id: string) => void
  toggleMaximize: (id: string) => void
  focus: (id: string) => void
  setRect: (id: string, rect: Partial<Rect>) => void
  closeAll: () => void
  /** Re-encaja todas las ventanas al cambiar el tamaño del viewport. */
  relayout: () => void
}

const windowId = (appId: AppId, payload?: WindowPayload) => {
  const key = payload?.projectId ?? payload?.techId
  return key ? `${appId}:${key}` : appId
}

export const useWindows = create<WindowsStore>((set, get) => ({
  windows: [],
  focusedId: null,
  nextZ: 10,
  openCount: 0,

  open: (appId, opts) => {
    const def = apps[appId]
    const id = def.multiInstance ? windowId(appId, opts?.payload) : appId
    const existing = get().windows.find((w) => w.id === id)
    const z = get().nextZ + 1

    if (existing) {
      set((s) => ({
        nextZ: z,
        focusedId: id,
        windows: s.windows.map((w) =>
          w.id === id
            ? { ...w, z, minimized: false, payload: opts?.payload ?? w.payload, title: opts?.title ?? w.title }
            : w,
        ),
      }))
      return id
    }

    // Ventana nueva: al lado de la ventana superior visible para no taparla; si no hay, centrada.
    const visible = get()
      .windows.filter((w) => !w.minimized && !w.maximized)
      .sort((a, b) => b.z - a.z)
    const base = visible.length
      ? besideRect(def.size, def.minSize, visible[0].rect, visible.slice(1).map((w) => w.rect))
      : cascadeRect(def.size, def.minSize, get().openCount)
    const rect = opts?.rect ? clampRect({ ...base, ...opts.rect }, def.minSize) : base
    const win: WindowState = {
      id,
      appId,
      title: opts?.title ?? def.title,
      rect,
      z,
      minimized: false,
      maximized: false,
      payload: opts?.payload,
      origin: opts?.origin,
    }
    set((s) => ({
      windows: [...s.windows, win],
      focusedId: id,
      nextZ: z,
      openCount: s.openCount + 1,
    }))
    return id
  },

  close: (id) =>
    set((s) => {
      const windows = s.windows.filter((w) => w.id !== id)
      const top = [...windows].filter((w) => !w.minimized).sort((a, b) => b.z - a.z)[0]
      return { windows, focusedId: s.focusedId === id ? (top?.id ?? null) : s.focusedId }
    }),

  minimize: (id) =>
    set((s) => {
      const windows = s.windows.map((w) => (w.id === id ? { ...w, minimized: true } : w))
      const top = windows.filter((w) => !w.minimized).sort((a, b) => b.z - a.z)[0]
      return { windows, focusedId: top?.id ?? null }
    }),

  restore: (id) => {
    const z = get().nextZ + 1
    set((s) => ({
      nextZ: z,
      focusedId: id,
      windows: s.windows.map((w) => (w.id === id ? { ...w, minimized: false, z } : w)),
    }))
  },

  toggleMaximize: (id) => {
    const z = get().nextZ + 1
    set((s) => ({
      nextZ: z,
      focusedId: id,
      windows: s.windows.map((w) => {
        if (w.id !== id) return w
        if (w.maximized) {
          const def = apps[w.appId]
          return { ...w, z, maximized: false, rect: clampRect(w.restoreRect ?? w.rect, def.minSize), restoreRect: undefined }
        }
        return { ...w, z, maximized: true, restoreRect: w.rect, rect: maximizedRect() }
      }),
    }))
  },

  focus: (id) => {
    if (get().focusedId === id) return
    const z = get().nextZ + 1
    set((s) => ({
      nextZ: z,
      focusedId: id,
      windows: s.windows.map((w) => (w.id === id ? { ...w, z } : w)),
    }))
  },

  setRect: (id, partial) =>
    set((s) => ({
      windows: s.windows.map((w) => (w.id === id ? { ...w, rect: { ...w.rect, ...partial } } : w)),
    })),

  closeAll: () => set({ windows: [], focusedId: null }),

  relayout: () =>
    set((s) => ({
      windows: s.windows.map((w) =>
        w.maximized ? { ...w, rect: maximizedRect() } : { ...w, rect: clampRect(w.rect, apps[w.appId].minSize) },
      ),
    })),
}))

/** Ventanas visibles ordenadas por z (para el Dock / indicadores). */
export const selectOpenApps = (s: WindowsStore) => new Set(s.windows.map((w) => w.appId))
