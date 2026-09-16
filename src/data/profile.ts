/**
 * Fuente de verdad de todos los datos profesionales del portafolio.
 * Extraído del CV (cv.txt). Editar aquí para actualizar todas las apps.
 */

export const profile = {
  name: 'Hector Alexis Delgado Abril',
  shortName: 'Alexis Delgado',
  role: 'Desarrollador Full Stack',
  location: 'Cali, Colombia',
  phone: '+57 314 585 2269',
  phoneRaw: '+573145852269',
  email: 'hectordelga16@gmail.com',
  github: 'https://github.com/Alexis1661',
  linkedin: 'https://www.linkedin.com/in/hector-alexis-delgado-abril-4a2269245/',
  summary:
    'Estudiante de Ingeniería de Sistemas con interés en el desarrollo de software, especialmente en desarrollo de aplicaciones web y móviles, arquitectura de software y desarrollo Full Stack. Cuenta con experiencia utilizando tecnologías como Java, Spring Boot, React, Next.js, NestJS, TypeScript, React Native y Go, trabajando en entornos frontend, backend y desarrollo móvil.',
  summaryExtended:
    'Actualmente se desempeña como Desarrollador Full Stack, participando en el desarrollo y mantenimiento de soluciones de software. Como proyecto de grado, desarrolló un sistema orientado a la gestión y trazabilidad de datos, y de forma independiente desarrolló Ducki, una aplicación móvil de red social pensada para la comunidad universitaria. Se caracteriza por su capacidad de aprendizaje, trabajo en equipo y resolución de problemas en entornos de desarrollo tecnológico.',
  education: [
    {
      institution: 'Universidad Icesi',
      degree: 'Ingeniería de Sistemas',
      period: 'En curso',
    },
  ],
  certifications: [
    {
      name: 'Scrum Foundation Professional Certification (SFPC)',
      issuer: 'CertiProf',
      date: 'Febrero 2024',
    },
    {
      name: 'Google Cloud Courses',
      issuer: 'Google Cloud',
      date: 'Agosto 2025',
    },
  ],
  experience: [
    {
      company: 'Pistis',
      location: 'Cali, Colombia',
      role: 'Desarrollador Full Stack',
      period: 'Febrero 2026 – Agosto 2026',
      bullets: [
        'Desarrollé y mantuve funcionalidades de frontend y backend para una aplicación, contribuyendo a la mejora continua del producto.',
        'Implementé componentes y servicios utilizando tecnologías como Java, Spring Boot, React, Next.js, NestJS y TypeScript.',
        'Participé en el diseño e integración de APIs y servicios backend, asegurando la comunicación eficiente entre los diferentes módulos del sistema.',
        'Colaboré en la implementación de nuevas funcionalidades, corrección de errores y optimización del rendimiento de la aplicación.',
      ],
    },
  ],
  skills: {
    languages: ['Java', 'TypeScript', 'JavaScript', 'Go', 'HTML5', 'CSS3'],
    frameworks: ['Spring Boot', 'React', 'React Native', 'Next.js', 'NestJS'],
    areas: [
      'Desarrollo Full Stack',
      'Aplicaciones web',
      'Aplicaciones móviles',
      'Desarrollo de APIs',
      'Arquitectura de software',
    ],
    tools: ['Git', 'Trello', 'Notion', 'Google Workspace'],
  },
  softSkills: [
    'Trabajo en equipo',
    'Comunicación asertiva',
    'Pensamiento analítico',
    'Resolución de problemas',
    'Aprendizaje continuo',
    'Adaptación a entornos tecnológicos',
  ],
  languages: [
    { name: 'Español', level: 'Nativo' },
    { name: 'Inglés', level: 'Intermedio (B2)' },
  ],
  interests: [
    'Desarrollo de software',
    'Aprendizaje de nuevas tecnologías',
    'Computación en la nube',
    'Arquitectura de software',
    'Participación en proyectos tecnológicos',
  ],
} as const

export type Profile = typeof profile
