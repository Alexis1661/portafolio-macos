/**
 * Registro de aplicaciones del escritorio.
 * Define título, tamaño por defecto y comportamiento de cada ventana.
 */

export type AppId = 'about' | 'projects' | 'project' | 'tech' | 'cv' | 'terminal' | 'contact'

export interface AppDefinition {
  id: AppId
  title: string
  /** Tamaño inicial en px (escritorio). Se ajusta si no cabe en pantalla. */
  size: { w: number; h: number }
  minSize: { w: number; h: number }
  resizable: boolean
  /** Si es true, cada `open()` con payload distinto crea una ventana nueva. */
  multiInstance?: boolean
  /** Aparece en el Dock. */
  inDock: boolean
}

export const apps: Record<AppId, AppDefinition> = {
  about: {
    id: 'about',
    title: 'Sobre mí',
    size: { w: 760, h: 560 },
    minSize: { w: 420, h: 360 },
    resizable: true,
    inDock: true,
  },
  projects: {
    id: 'projects',
    title: 'Proyectos',
    size: { w: 880, h: 580 },
    minSize: { w: 520, h: 380 },
    resizable: true,
    inDock: true,
  },
  project: {
    id: 'project',
    title: 'Proyecto',
    size: { w: 720, h: 600 },
    minSize: { w: 400, h: 360 },
    resizable: true,
    multiInstance: true,
    inDock: false,
  },
  tech: {
    id: 'tech',
    title: 'Tecnología',
    size: { w: 640, h: 560 },
    minSize: { w: 380, h: 340 },
    resizable: true,
    multiInstance: true,
    inDock: false,
  },
  cv: {
    id: 'cv',
    title: 'Hoja de vida',
    size: { w: 820, h: 640 },
    minSize: { w: 420, h: 380 },
    resizable: true,
    inDock: true,
  },
  terminal: {
    id: 'terminal',
    title: 'Terminal',
    size: { w: 680, h: 440 },
    minSize: { w: 380, h: 260 },
    resizable: true,
    inDock: true,
  },
  contact: {
    id: 'contact',
    title: 'Contacto',
    size: { w: 560, h: 480 },
    minSize: { w: 360, h: 340 },
    resizable: true,
    inDock: true,
  },
}

export const dockApps: AppId[] = ['about', 'projects', 'cv', 'terminal', 'contact']
