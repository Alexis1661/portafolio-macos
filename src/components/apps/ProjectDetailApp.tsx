import { ExternalLink, Github } from 'lucide-react'
import { getProject } from '@/data/projects'
import { ProjectThumb } from '@/components/icons/ProjectThumb'

const Meta = ({ label, value }: { label: string; value: string }) => (
  <div>
    <div className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#1d1d1f]">{label}</div>
    <div className="mt-1 text-[14px] text-[#6e6e73]">{value}</div>
  </div>
)

/**
 * Ventana de detalle de proyecto. Replica la ventana de la referencia:
 * título grande → párrafo → grid de metadatos → imagen grande redondeada.
 */
export function ProjectDetailApp({ projectId }: { projectId: string }) {
  const project = getProject(projectId)
  if (!project) return <div className="p-8 text-[#8e8e93]">Proyecto no encontrado.</div>

  return (
    <div className="px-6 pb-8 pt-2 sm:px-8">
      <h1 className="text-[34px] font-bold leading-tight text-[#1d1d1f] sm:text-[40px]">{project.name}</h1>
      <p className="mt-4 max-w-[64ch] text-[14.5px] leading-relaxed text-[#515154]">{project.description}</p>

      <div className="mt-7 grid grid-cols-2 gap-x-8 gap-y-5 sm:grid-cols-3">
        <Meta label="Año" value={project.year} />
        <Meta label="Tipo de proyecto" value={project.type} />
        <Meta label="Rol" value={project.role} />
        <div className="col-span-2 sm:col-span-3">
          <div className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#1d1d1f]">Tecnologías</div>
          <div className="mt-2 flex flex-wrap gap-2">
            {project.tech.map((t) => (
              <span key={t} className="rounded-full bg-[#f2f2f7] px-3 py-1 text-[12px] font-medium text-[#3a3a3c]">
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-7 overflow-hidden rounded-2xl">
        <ProjectThumb variant={project.thumb} detailed className="aspect-[16/9] w-full" />
      </div>

      {(project.repo || project.demo) && (
        <div className="mt-6 flex flex-wrap items-center gap-2">
          {project.repo && project.repoPrivate && (
            <span className="inline-flex items-center gap-2 rounded-lg bg-[#f2f2f7] px-4 py-2 text-[13px] font-semibold text-[#6e6e73]">
              <Github size={15} /> Repositorio privado
            </span>
          )}
          {project.repo && !project.repoPrivate && (
            <a
              href={project.repo}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-[#1d1d1f] px-4 py-2 text-[13px] font-semibold text-white transition hover:brightness-125"
            >
              <Github size={15} /> Repositorio
            </a>
          )}
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-accent px-4 py-2 text-[13px] font-semibold text-white transition hover:brightness-110"
            >
              <ExternalLink size={15} /> Ver demo
            </a>
          )}
        </div>
      )}
    </div>
  )
}
