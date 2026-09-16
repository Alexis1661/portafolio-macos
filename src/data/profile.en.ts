/**
 * Versión en inglés de los textos del perfil que se muestran en "Sobre mí".
 * Los datos estructurales (nombre, enlaces, listas de tecnologías) se toman de profile.ts.
 */
import { profile } from './profile'

export const profileEn = {
  role: 'Full Stack Developer',
  location: 'Cali, Colombia',
  summary:
    'Systems Engineering student with a strong interest in software development, especially web and mobile applications, software architecture and Full Stack development. Experienced with Java, Spring Boot, React, Next.js, NestJS, TypeScript, React Native and Go, working across frontend, backend and mobile.',
  summaryExtended:
    'Currently working as a Full Stack Developer, contributing to the development and maintenance of software solutions. As a degree project, built a system for data management and traceability, and independently developed Ducki, a mobile social network app for the university community. Known for fast learning, teamwork and problem solving in technology environments.',
  education: [{ institution: 'Universidad Icesi', degree: 'Systems Engineering', period: 'In progress' }],
  certifications: [
    { name: 'Scrum Foundation Professional Certification (SFPC)', issuer: 'CertiProf', date: 'February 2024' },
    { name: 'Google Cloud Courses', issuer: 'Google Cloud', date: 'August 2025' },
  ],
  experience: [{ company: 'Pistis', role: 'Full Stack Developer', period: 'February 2026 – August 2026' }],
  skills: {
    languages: profile.skills.languages,
    frameworks: profile.skills.frameworks,
    areas: ['Full Stack development', 'Web applications', 'Mobile applications', 'API development', 'Software architecture'],
    tools: profile.skills.tools,
  },
  softSkills: [
    'Teamwork',
    'Assertive communication',
    'Analytical thinking',
    'Problem solving',
    'Continuous learning',
    'Adaptability to technology environments',
  ],
  languages: [
    { name: 'Spanish', level: 'Native' },
    { name: 'English', level: 'Intermediate (B2)' },
  ],
} as const

/** Etiquetas de la interfaz de "Sobre mí" en ambos idiomas. */
export const aboutLabels = {
  es: {
    education: 'Formación',
    experience: 'Experiencia',
    languages: 'Idiomas',
    technicalSkills: 'Habilidades técnicas',
    softSkills: 'Habilidades personales',
    certifications: 'Certificaciones',
    viewProjects: 'Ver proyectos',
    openCv: 'Abrir hoja de vida',
    contact: 'Contacto',
    avatarAlt: 'Avatar de Alexis Delgado',
    switchTo: 'View in English',
  },
  en: {
    education: 'Education',
    experience: 'Experience',
    languages: 'Languages',
    technicalSkills: 'Technical skills',
    softSkills: 'Soft skills',
    certifications: 'Certifications',
    viewProjects: 'View projects',
    openCv: 'Open résumé',
    contact: 'Contact',
    avatarAlt: 'Alexis Delgado avatar',
    switchTo: 'Ver en español',
  },
} as const
