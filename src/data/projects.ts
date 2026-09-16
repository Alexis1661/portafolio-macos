/**
 * Proyectos tomados del CV. Cada proyecto es un icono en el escritorio
 * (como en la referencia) y un ítem dentro de la app "Proyectos".
 *
 * `thumb` define la miniatura vectorial generada en ProjectThumb.tsx.
 * `repo` / `demo` son opcionales: agrega la URL cuando la tengas.
 */

export type ThumbVariant = 'ducki' | 'health' | 'legal' | 'talent' | 'inventory'

export interface Project {
  id: string
  name: string
  role: string
  year: string
  type: string
  tagline: string
  description: string
  tech: string[]
  thumb: ThumbVariant
  repo?: string
  /** El repositorio existe pero es privado: se muestra sin enlace. */
  repoPrivate?: boolean
  demo?: string
  /** Posición del icono en el escritorio, en % del área útil (x, y). */
  desktop: { x: number; y: number }
}

export const projects: Project[] = [
  {
    id: 'ducki',
    name: 'Ducki',
    role: 'Desarrollador Full Stack',
    year: '2026',
    type: 'App móvil · Red social',
    tagline: 'Red social para la comunidad universitaria.',
    description:
      'Aplicación móvil para una red social orientada a la comunidad universitaria, donde los estudiantes pueden comunicarse, expresar ideas y conectar con otras personas. Desarrollada de forma independiente con React Native en el frontend móvil y Go en el backend.',
    tech: ['React Native', 'Go', 'TypeScript'],
    thumb: 'ducki',
    repo: 'https://github.com/Alexis1661/Ducki',
    repoPrivate: true,
    desktop: { x: 9, y: 14 },
  },
  {
    id: 'trazabilidad-salud',
    name: 'Trazabilidad en Salud',
    role: 'Desarrollador · Proyecto de grado',
    year: 'Enero 2026 – Actualidad',
    type: 'Sistema de auditoría de datos',
    tagline: 'Auditoría y trazabilidad de datos en el sector salud.',
    description:
      'Sistema orientado a la auditoría y trazabilidad de datos en el sector salud, enfocado en la gestión y seguimiento de información. Desarrollado como proyecto de grado, con énfasis en la integridad y el rastreo del ciclo de vida de los datos.',
    tech: ['Java', 'Spring Boot', 'React', 'TypeScript'],
    thumb: 'health',
    desktop: { x: 78, y: 12 },
  },
  {
    id: 'waterfount-abogados',
    name: 'Waterfount Abogados',
    role: 'Desarrollador de Software',
    year: '2026-1',
    type: 'Proyecto para cliente real',
    tagline: 'Gestión y optimización de procesos legales.',
    description:
      'Proyecto desarrollado para la empresa cliente Waterfount Abogados, enfocado en la construcción de soluciones tecnológicas para la gestión y optimización de procesos.',
    tech: ['Java', 'Spring Boot', 'React', 'TypeScript'],
    thumb: 'legal',
    desktop: { x: 66, y: 40 },
  },
  {
    id: 'talenthub',
    name: 'TalentHub',
    role: 'Desarrollador Backend / Frontend',
    year: '2025',
    type: 'Plataforma web',
    tagline: 'Gestión y conexión de talento.',
    description:
      'Participación en el desarrollo de funcionalidades backend y frontend para una plataforma orientada a la gestión y conexión de talento.',
    tech: ['NestJS', 'Next.js', 'TypeScript'],
    thumb: 'talent',
    desktop: { x: 10, y: 60 },
  },
  {
    id: 'inventorypro',
    name: 'InventoryPro',
    role: 'Desarrollador de Software',
    year: '2025',
    type: 'SaaS · Inventarios',
    tagline: 'Solución SaaS para la gestión de inventarios.',
    description:
      'Solución SaaS para la gestión de inventarios: catálogo, stock por almacén con kardex, punto de venta, compras, traslados, vistas por rol, lectura de códigos de barras y auditoría de acciones. Monorepo con frontend Next.js y backend NestJS (Prisma sobre PostgreSQL, Supabase y Redis).',
    tech: ['Next.js', 'NestJS', 'TypeScript', 'React'],
    thumb: 'inventory',
    repo: 'https://github.com/Alexis1661/Inventory',
    desktop: { x: 66, y: 62 },
  },
]

export const getProject = (id: string) => projects.find((p) => p.id === id)
