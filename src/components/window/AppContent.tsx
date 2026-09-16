import type { WindowState } from '@/store/windows'
import { AboutApp } from '@/components/apps/AboutApp'
import { ProjectsApp } from '@/components/apps/ProjectsApp'
import { ProjectDetailApp } from '@/components/apps/ProjectDetailApp'
import { TechDetailApp } from '@/components/apps/TechDetailApp'
import { CvApp } from '@/components/apps/CvApp'
import { TerminalApp } from '@/components/apps/TerminalApp'
import { ContactApp } from '@/components/apps/ContactApp'

/** Contenido de una ventana según su app (compartido por escritorio y móvil). */
export function AppContent({ win }: { win: WindowState }) {
  switch (win.appId) {
    case 'about':
      return <AboutApp />
    case 'projects':
      return <ProjectsApp />
    case 'project':
      return <ProjectDetailApp projectId={win.payload?.projectId ?? ''} />
    case 'tech':
      return <TechDetailApp techId={win.payload?.techId ?? ''} />
    case 'cv':
      return <CvApp />
    case 'terminal':
      return <TerminalApp />
    case 'contact':
      return <ContactApp />
  }
}
