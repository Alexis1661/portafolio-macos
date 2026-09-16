# Portafolio · escritorio macOS

Portafolio personal de **Hector Alexis Delgado Abril** construido como un escritorio estilo macOS dentro del navegador.

- React 19 + TypeScript + Vite 7
- Tailwind CSS 4
- Zustand (estado de ventanas)
- Motion (`motion/react`) para animaciones
- react-rnd para arrastrar / redimensionar ventanas
- Lucide React + SVG propios para iconos
- @react-pdf/renderer para generar `public/cv.pdf`

## Scripts

```bash
npm install      # dependencias
npm run dev      # servidor de desarrollo (http://localhost:5173)
npm run build    # type-check + build de producción en dist/
npm run preview  # previsualizar el build
npm run cv:pdf   # regenerar public/cv.pdf a partir de src/data
```

## Dónde editar el contenido

| Qué                              | Archivo                                  |
| -------------------------------- | ---------------------------------------- |
| Datos personales, CV, habilidades | `src/data/profile.ts`                    |
| Proyectos (y su posición en el escritorio) | `src/data/projects.ts`         |
| Repositorios de GitHub (Finder y ventanas de tecnología) | `src/data/github.ts` |
| Tecnologías del escritorio       | `src/data/tech.ts`                       |
| Apps del Dock y tamaños de ventana | `src/data/apps.ts`                     |
| Fondo de pantalla                | `public/wallpaper.webp`                   |
| PDF del CV                       | `public/cv.pdf` (o `npm run cv:pdf`)     |
| Miniaturas de proyectos (SVG)    | `src/components/icons/ProjectThumb.tsx`  |
| Iconos de apps (SVG)             | `src/components/icons/AppIcon.tsx`       |

> Si tienes repos o demos de los proyectos, agrega `repo` / `demo` en cada entrada de `projects.ts`
> y aparecerán los botones en la ventana del proyecto.

## Estructura

```
src/
  data/          contenido (fuente de verdad)
  store/         windows.ts — gestor de ventanas (Zustand)
  lib/layout.ts  constantes y utilidades de layout
  hooks/         useViewport, useClock
  components/
    desktop/     Desktop, MenuBar, Dock, DesktopIcons
    window/      Window (drag/resize/animación), TrafficLights, WindowManager
    apps/        About, Projects (Finder), ProjectDetail, CV, Terminal, Contact
    icons/       AppIcon, ProjectThumb
scripts/build-cv-pdf.tsx   genera el PDF del CV
```

## Despliegue en Vercel

1. Entra a [vercel.com/new](https://vercel.com/new) e importa el repositorio `Alexis1661/portafolio-macos`.
2. Vercel detecta **Vite** solo: build `npm run build`, salida `dist/`. No hay variables de entorno.
3. Deploy. Cada `git push` a `main` vuelve a desplegar.

`vercel.json` ya incluye el rewrite de todas las rutas a `index.html`.
