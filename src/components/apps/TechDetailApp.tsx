import { ExternalLink, Github, Lock } from 'lucide-react'
import { getTech, techs } from '@/data/tech'
import { projects } from '@/data/projects'
import { profile } from '@/data/profile'
import { githubRepos, reposForTech, GITHUB_URL } from '@/data/github'
import { TechIcon } from '@/components/icons/TechIcon'
import { ProjectThumb } from '@/components/icons/ProjectThumb'
import { useWindows } from '@/store/windows'

const Meta = ({ label, value }: { label: string; value: string }) => (
  <div>
    <div className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#1d1d1f]">{label}</div>
    <div className="mt-1 text-[14px] text-[#6e6e73]">{value}</div>
  </div>
)

const Chip = ({ children, strong }: { children: string; strong?: boolean }) => (
  <span
    className={`rounded-full px-2.5 py-0.5 text-[11.5px] font-medium ${
      strong ? 'bg-accent/12 text-accent' : 'bg-[#f2f2f7] text-[#3a3a3c]'
    }`}
  >
    {children}
  </span>
)

/**
 * Ventana de una tecnología: qué he construido con ella.
 * Cruza la tecnología con los proyectos del CV, la experiencia laboral y los
 * repositorios reales de GitHub (src/data/github.ts).
 */
export function TechDetailApp({ techId }: { techId: string }) {
  const open = useWindows((s) => s.open)
  const tech = getTech(techId)
  if (!tech) return <div className="p-8 text-[#8e8e93]">Tecnología no encontrada.</div>

  const related = projects.filter((p) => p.tech.includes(tech.match))
  const repos = reposForTech(tech.match)
  const usedAtWork = profile.experience.filter((x) => x.bullets.some((b) => b.includes(tech.match)))
  const others = techs.filter((t) => t.id !== tech.id)
  const publicRepos = repos.filter((r) => !r.private).length

  return (
    <div className="px-6 pb-8 pt-2 sm:px-8">
      <div className="flex items-center gap-4">
        <TechIcon tech={tech} className="h-16 w-16 shrink-0 drop-shadow-md" />
        <div>
          <h1 className="text-[34px] font-bold leading-tight text-[#1d1d1f] sm:text-[40px]">{tech.name}</h1>
          <p className="text-[14px] text-[#6e6e73]">{tech.category}</p>
        </div>
      </div>

      <p className="mt-5 max-w-[64ch] text-[14.5px] leading-relaxed text-[#515154]">{tech.description}</p>

      <div className="mt-7 grid grid-cols-2 gap-x-8 gap-y-5 sm:grid-cols-3">
        <Meta
          label="Repositorios en GitHub"
          value={repos.length ? `${repos.length} ${repos.length === 1 ? 'repositorio' : 'repositorios'}${publicRepos < repos.length ? ` (${publicRepos} públicos)` : ''}` : '—'}
        />
        <Meta label="Proyectos del CV" value={related.length ? related.map((p) => p.name).join(', ') : '—'} />
        <Meta
          label="Experiencia laboral"
          value={usedAtWork.length ? usedAtWork.map((x) => `${x.company} · ${x.role}`).join(', ') : '—'}
        />
      </div>

      {repos.length > 0 && (
        <section className="mt-8">
          <div className="flex items-baseline justify-between gap-3">
            <h2 className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#1d1d1f]">
              Qué he construido con {tech.name}
            </h2>
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 text-[12px] font-medium text-accent hover:underline"
            >
              <Github size={13} /> github.com/Alexis1661
            </a>
          </div>
          <ul className="mt-3 divide-y divide-black/6 overflow-hidden rounded-xl border border-black/8 bg-[#fafafa]">
            {repos.map((r) => (
              <li key={r.name} className="flex gap-3 px-4 py-3">
                <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#1d1d1f] text-white">
                  {r.private ? <Lock size={14} /> : <Github size={15} />}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                    {r.private ? (
                      <span className="text-[14px] font-semibold text-[#1d1d1f]">{r.name}</span>
                    ) : (
                      <a
                        href={r.url}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 text-[14px] font-semibold text-[#1d1d1f] hover:text-accent"
                      >
                        {r.name} <ExternalLink size={12} className="text-[#8e8e93]" />
                      </a>
                    )}
                    <span className="text-[11.5px] text-[#8e8e93]">
                      {r.language} · {r.year}
                      {r.private ? ' · privado' : ''}
                    </span>
                  </div>
                  <p className="mt-1 text-[13px] leading-relaxed text-[#515154]">{r.description}</p>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {r.tech.map((t) => (
                      <Chip key={t} strong={t === tech.match}>
                        {t}
                      </Chip>
                    ))}
                  </div>
                  {r.projectId && projects.some((p) => p.id === r.projectId) && (
                    <button
                      type="button"
                      onClick={(e) => {
                        const p = projects.find((x) => x.id === r.projectId)!
                        open('project', { payload: { projectId: p.id }, title: p.name, origin: { x: e.clientX, y: e.clientY } })
                      }}
                      className="mt-2 text-[12px] font-medium text-accent hover:underline"
                    >
                      Ver ficha del proyecto →
                    </button>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </section>
      )}

      {related.length > 0 && (
        <section className="mt-8">
          <h2 className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#1d1d1f]">Proyectos del CV con {tech.name}</h2>
          <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3">
            {related.map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={(e) =>
                  open('project', { payload: { projectId: p.id }, title: p.name, origin: { x: e.clientX, y: e.clientY } })
                }
                className="group overflow-hidden rounded-xl border border-black/8 bg-[#fafafa] text-left transition hover:border-black/15 hover:shadow-sm"
              >
                <ProjectThumb variant={p.thumb} className="aspect-[16/10] w-full" />
                <div className="p-2.5">
                  <div className="text-[13px] font-semibold text-[#1d1d1f]">{p.name}</div>
                  <div className="mt-0.5 text-[11.5px] text-[#8e8e93]">{p.year}</div>
                </div>
              </button>
            ))}
          </div>
        </section>
      )}

      <section className="mt-8">
        <h2 className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#1d1d1f]">Otras tecnologías</h2>
        <div className="mt-3 flex flex-wrap gap-2">
          {others.map((t) => {
            const n = githubRepos.filter((r) => r.tech.includes(t.match)).length
            return (
              <button
                key={t.id}
                type="button"
                onClick={(e) => open('tech', { payload: { techId: t.id }, title: t.name, origin: { x: e.clientX, y: e.clientY } })}
                className="flex items-center gap-1.5 rounded-full bg-[#f2f2f7] py-1 pl-1 pr-3 text-[12px] font-medium text-[#3a3a3c] transition hover:bg-[#e5e5ea]"
              >
                <TechIcon tech={t} className="h-5 w-5" />
                {t.name}
                {n > 0 && <span className="text-[10.5px] text-[#8e8e93]">{n}</span>}
              </button>
            )
          })}
        </div>
      </section>
    </div>
  )
}
