/**
 * Tecnologías que aparecen como iconos en el escritorio.
 * Los logos vienen de simple-icons (CC0). `usedIn` se calcula desde los proyectos
 * y la experiencia del CV, así que no hay que mantenerlo a mano.
 */
import {
  siReact,
  siGo,
  siTypescript,
  siOpenjdk,
  siSpringboot,
  siNextdotjs,
  siNestjs,
  siJavascript,
  type SimpleIcon,
} from 'simple-icons'

export interface Tech {
  id: string
  name: string
  category: 'Lenguaje' | 'Framework' | 'Móvil' | 'Backend' | 'Frontend'
  icon: SimpleIcon
  /** Fondo del icono y color del logo. */
  bg: [string, string]
  fg: string
  description: string
  /** Posición en el escritorio, en % del área útil. */
  desktop: { x: number; y: number }
  /** Nombre tal como aparece en `projects[].tech` / experiencia para relacionarlos. */
  match: string
}

export const techs: Tech[] = [
  {
    id: 'react',
    name: 'React',
    category: 'Frontend',
    icon: siReact,
    bg: ['#1f2b38', '#0f171f'],
    fg: '#61DAFB',
    description: 'Biblioteca principal para interfaces web. La uso en el frontend de la mayoría de mis proyectos (Inventory, Venexpress, TokenWars, el sandbox de Pistis) y en mi trabajo en Pistis, casi siempre con TypeScript y Next.js.',
    desktop: { x: 21, y: 32 },
    match: 'React',
  },
  {
    id: 'react-native',
    name: 'React Native',
    category: 'Móvil',
    icon: siReact,
    bg: ['#20232a', '#101216'],
    fg: '#61DAFB',
    description: 'Desarrollo de aplicaciones móviles multiplataforma con Expo. Es el cliente de Ducki, la red social universitaria: dev builds nativos, subida de media y video corto conectados a la API en Go.',
    desktop: { x: 49, y: 84 },
    match: 'React Native',
  },
  {
    id: 'typescript',
    name: 'TypeScript',
    category: 'Lenguaje',
    icon: siTypescript,
    bg: ['#3d8fe0', '#2563b8'],
    fg: '#ffffff',
    description: 'Lenguaje base de mis proyectos web y móviles: es el lenguaje principal de la mayoría de mis repositorios en GitHub, tanto en frontend (React, Next.js, React Native) como en backend con NestJS.',
    desktop: { x: 9, y: 84 },
    match: 'TypeScript',
  },
  {
    id: 'javascript',
    name: 'JavaScript',
    category: 'Lenguaje',
    icon: siJavascript,
    bg: ['#f9e24a', '#e8c81a'],
    fg: '#1d1d1f',
    description: 'Fundamento de todo el desarrollo web que hago, junto con HTML5 y CSS3. Lo he usado directo en APIs con Node/Express (QuickMart) y en juegos web como Pacifico Educativo.',
    desktop: { x: 22, y: 80 },
    match: 'JavaScript',
  },
  {
    id: 'java',
    name: 'Java',
    category: 'Lenguaje',
    icon: siOpenjdk,
    bg: ['#f0f0f3', '#d6d6dc'],
    fg: '#e76f00',
    description: 'Mi primer lenguaje fuerte: proyectos integradores de POO (ReadX), estructuras de datos, servidores de sockets multihilo, simulaciones distribuidas (Montecarlo) y Trackademic con PostgreSQL + MongoDB. En el trabajo lo uso con Spring Boot.',
    desktop: { x: 34, y: 84 },
    match: 'Java',
  },
  {
    id: 'spring-boot',
    name: 'Spring Boot',
    category: 'Backend',
    icon: siSpringboot,
    bg: ['#7cc94d', '#4f9a2c'],
    fg: '#ffffff',
    description: 'Framework backend con el que diseñé e integré APIs y servicios en Pistis, y base del sistema de trazabilidad de datos en salud (proyecto de grado) y del proyecto para Waterfount Abogados.',
    desktop: { x: 64, y: 84 },
    match: 'Spring Boot',
  },
  {
    id: 'go',
    name: 'Go',
    category: 'Backend',
    icon: siGo,
    bg: ['#29c4e6', '#0a9cc0'],
    fg: '#ffffff',
    description: 'Lenguaje del backend de Ducki: un monolito modular con chi, Ent y migraciones Atlas sobre PostgreSQL y Redis, empaquetado con Docker Compose, con endpoints de media, reportes y dispositivos.',
    desktop: { x: 91, y: 24 },
    match: 'Go',
  },
  {
    id: 'nextjs',
    name: 'Next.js',
    category: 'Frontend',
    icon: siNextdotjs,
    bg: ['#2a2a2e', '#0f0f11'],
    fg: '#ffffff',
    description: 'Framework React para aplicaciones web completas: frontend de Inventory (SaaS de inventarios), Venexpress (giros) y TokenWars (juego de agentes de IA), además de TalentHub y mi trabajo en Pistis.',
    desktop: { x: 78, y: 84 },
    match: 'Next.js',
  },
  {
    id: 'nestjs',
    name: 'NestJS',
    category: 'Backend',
    icon: siNestjs,
    bg: ['#ef3b64', '#b81a45'],
    fg: '#ffffff',
    description: 'Framework backend en TypeScript para APIs estructuradas: backend de Inventory (Prisma, Supabase, Redis), de Venexpress (TypeORM, JWT, PostgreSQL) y del backend de Pistis; también en TalentHub.',
    desktop: { x: 91, y: 84 },
    match: 'NestJS',
  },
]

export const getTech = (id: string) => techs.find((t) => t.id === id)
