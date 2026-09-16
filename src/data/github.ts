/**
 * Repositorios de GitHub (github.com/Alexis1661) seleccionados a mano.
 * Datos verificados con `gh` (lenguajes, README y dependencias) — no inventados.
 *
 * `tech` usa los mismos nombres que `techs[].match` en tech.ts para que la
 * ventana de cada tecnología pueda listar los repos donde se usa.
 */

export interface GithubRepo {
  name: string
  url: string
  /** Descripción breve basada en el README / estructura del repo. */
  description: string
  /** Tecnologías, en el orden de relevancia. */
  tech: string[]
  /** Lenguaje principal según GitHub. */
  language: string
  year: string
  /** Repos privados: se muestran sin enlace público. */
  private?: boolean
  /** Con qué proyecto del CV se relaciona (id de projects.ts). */
  projectId?: string
  /** Destacado: aparece primero. */
  featured?: boolean
}

export const GITHUB_USER = 'Alexis1661'
export const GITHUB_URL = `https://github.com/${GITHUB_USER}`

export const githubRepos: GithubRepo[] = [
  {
    name: 'Ducki',
    url: `${GITHUB_URL}/Ducki`,
    description:
      'Red social universitaria. Monorepo con API en Go (monolito modular con chi, Ent, PostgreSQL y Redis) y app móvil en Expo / React Native: media, reportes, dispositivos y video corto.',
    tech: ['Go', 'React Native', 'TypeScript', 'PostgreSQL', 'Redis', 'Docker'],
    language: 'Go / TypeScript',
    year: '2026',
    private: true,
    projectId: 'ducki',
    featured: true,
  },
  {
    name: 'Inventory',
    url: `${GITHUB_URL}/Inventory`,
    description:
      'Gestor de inventario SaaS: catálogo, stock por almacén con kardex, POS, compras, traslados, vistas por rol, lectura de códigos de barras y auditoría. Next.js + NestJS con Prisma sobre PostgreSQL, Supabase y Redis.',
    tech: ['Next.js', 'React', 'NestJS', 'TypeScript', 'PostgreSQL', 'Redis'],
    language: 'TypeScript',
    year: '2026',
    projectId: 'inventorypro',
    featured: true,
  },
  {
    name: 'Venexpress',
    url: `${GITHUB_URL}/Venexpress`,
    description:
      'Plataforma para digitalizar giros Colombia–Venezuela con roles (administradores, vendedores, usuarios), tasa de cambio y comprobantes. Backend NestJS + TypeORM + PostgreSQL con JWT; frontend Next.js con React Query y Recharts.',
    tech: ['NestJS', 'Next.js', 'React', 'TypeScript', 'PostgreSQL'],
    language: 'TypeScript',
    year: '2026',
    featured: true,
  },
  {
    name: 'TokenWars',
    url: `${GITHUB_URL}/TokenWars`,
    description:
      'Juego educativo de agentes de IA para clases universitarias: equipos compiten en 3 niveles sobre ReAct y Tool Calling. Frontend Next.js y motor de IA en Python (LangChain + FastAPI) con Supabase y Groq.',
    tech: ['Next.js', 'React', 'TypeScript', 'Python', 'Supabase'],
    language: 'TypeScript',
    year: '2026',
    featured: true,
  },
  {
    name: 'SandBox-PISTIS',
    url: `${GITHUB_URL}/SandBox-PISTIS`,
    description:
      'Sandbox del algoritmo de viajes de Pistis: login multiusuario, sesiones en Zustand, herramientas por rol (conductor / pasajero) y mapa con Google Maps API conectado al backend NestJS.',
    tech: ['React', 'TypeScript', 'NestJS'],
    language: 'TypeScript',
    year: '2026',
  },
  {
    name: 'Pacifico_educativo',
    url: `${GITHUB_URL}/Pacifico_educativo`,
    description:
      'Juego educativo web para niños del Pacífico colombiano: matemáticas y lenguaje en 5 niveles, personajes mitológicos, historias generadas con IA local (Ollama) y voz TTS offline. Flask + JavaScript.',
    tech: ['Python', 'JavaScript'],
    language: 'Python',
    year: '2026',
  },
  {
    name: 'SID2-PROJECT',
    url: `${GITHUB_URL}/SID2-PROJECT`,
    description:
      'Trackademic: gestión colaborativa de notas y planes de evaluación por curso y semestre, con informes de rendimiento. Java con PostgreSQL (datos relacionales) y MongoDB (datos flexibles).',
    tech: ['Java', 'PostgreSQL', 'MongoDB'],
    language: 'Java',
    year: '2025',
  },
  {
    name: 'blood-nexus-app',
    url: `${GITHUB_URL}/blood-nexus-app`,
    description: 'Aplicación web en React + Vite + TypeScript con Supabase como backend (auth y base de datos).',
    tech: ['React', 'TypeScript', 'Supabase'],
    language: 'TypeScript',
    year: '2025',
  },
  {
    name: 'MakeItMemee',
    url: `${GITHUB_URL}/MakeItMemee`,
    description:
      'Juego de memes en tiempo real: salas, editor visual con plantillas, votación por rondas y panel de administración. Python (Flask) con Redis.',
    tech: ['Python', 'JavaScript', 'Redis'],
    language: 'Python',
    year: '2025',
  },
  {
    name: 'ServidorMultihilos',
    url: `${GITHUB_URL}/ServidorMultihilos`,
    description: 'Servidor de sockets multihilo en Java: manejo concurrente de clientes.',
    tech: ['Java'],
    language: 'Java',
    year: '2025',
  },
  {
    name: 'QuickMart',
    url: `${GITHUB_URL}/QuickMart`,
    description: 'API REST de tienda con Node.js y Express: autenticación con JWT y bcrypt.',
    tech: ['JavaScript', 'Node.js'],
    language: 'JavaScript',
    year: '2024',
  },
  {
    name: 'MontecarloTeam',
    url: `${GITHUB_URL}/MontecarloTeam`,
    description: 'Simulación Montecarlo distribuida en Java (curso de Computación en Internet).',
    tech: ['Java'],
    language: 'Java',
    year: '2024',
  },
  {
    name: 'Integradora3',
    url: `${GITHUB_URL}/Integradora3`,
    description: 'ReadX: proyecto integrador de programación orientada a objetos en Java.',
    tech: ['Java'],
    language: 'Java',
    year: '2023',
  },
  {
    name: 'Discretes_Structures2',
    url: `${GITHUB_URL}/Discretes_Structures2`,
    description: 'Implementación de estructuras de datos y algoritmos en Java (Estructuras Discretas).',
    tech: ['Java'],
    language: 'Java',
    year: '2023',
  },
]

/** Repos que usan una tecnología (por nombre de `techs[].match`), destacados primero. */
export const reposForTech = (match: string) =>
  githubRepos
    .filter((r) => r.tech.includes(match))
    .sort((a, b) => Number(!!b.featured) - Number(!!a.featured) || b.year.localeCompare(a.year))
