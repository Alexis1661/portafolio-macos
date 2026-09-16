import { useMemo, useState } from 'react'
import { ChevronLeft, ChevronRight, LayoutGrid, List, Search, FolderOpen, Smartphone, Globe, Boxes, Layers, Github, Lock, ExternalLink } from 'lucide-react'
import { githubRepos, GITHUB_URL } from '@/data/github'
import { projects, type Project } from '@/data/projects'
import { ProjectThumb } from '@/components/icons/ProjectThumb'
import { useWindows } from '@/store/windows'

type Filter = 'all' | 'web' | 'mobile' | 'saas' | 'github'

const filters: { id: Filter; label: string; icon: React.ReactNode; match: (p: Project) => boolean }[] = [
  { id: 'all', label: 'Todos los proyectos', icon: <FolderOpen size={15} />, match: () => true },
  { id: 'web', label: 'Web', icon: <Globe size={15} />, match: (p) => /web|plataforma|sistema|cliente/i.test(p.type) },
  { id: 'mobile', label: 'Móvil', icon: <Smartphone size={15} />, match: (p) => /móvil/i.test(p.type) },
  { id: 'saas', label: 'SaaS', icon: <Boxes size={15} />, match: (p) => /saas/i.test(p.type) },
  { id: 'github', label: 'GitHub', icon: <Github size={15} />, match: () => false },
]

/** Ventana "Proyectos" con estructura tipo Finder: barra lateral, toolbar y vista de iconos/lista. */
export function ProjectsApp() {
  const open = useWindows((s) => s.open)
  const [filter, setFilter] = useState<Filter>('all')
  const [view, setView] = useState<'grid' | 'list'>('grid')
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState<string | null>(null)

  const visible = useMemo(() => {
    const f = filters.find((x) => x.id === filter)!
    const q = query.trim().toLowerCase()
    return projects.filter(
      (p) => f.match(p) && (!q || p.name.toLowerCase().includes(q) || p.tech.join(' ').toLowerCase().includes(q)),
    )
  }, [filter, query])

  const visibleRepos = useMemo(() => {
    const q = query.trim().toLowerCase()
    return githubRepos.filter((r) => !q || r.name.toLowerCase().includes(q) || r.tech.join(' ').toLowerCase().includes(q))
  }, [query])

  const openProject = (p: Project, e?: React.MouseEvent) => {
    const origin = e ? { x: e.clientX, y: e.clientY } : undefined
    open('project', { payload: { projectId: p.id }, title: p.name, origin })
  }

  const current = filters.find((x) => x.id === filter)!

  return (
    <div className="flex h-full min-h-0">
      {/* Barra lateral */}
      <aside className="hidden w-[190px] shrink-0 flex-col border-r border-black/8 bg-[#f5f5f7]/90 px-3 pt-2 sm:flex">
        <div className="px-2 pb-1 text-[11px] font-semibold text-[#8e8e93]">Favoritos</div>
        {filters.filter((f) => f.id !== 'github').map((f) => (
          <button
            key={f.id}
            type="button"
            onClick={() => setFilter(f.id)}
            className={`flex items-center gap-2 rounded-md px-2 py-1.5 text-left text-[13px] transition ${
              filter === f.id ? 'bg-black/8 text-[#1d1d1f]' : 'text-[#3a3a3c] hover:bg-black/5'
            }`}
          >
            <span className="text-accent">{f.icon}</span>
            {f.label}
          </button>
        ))}
        <div className="mt-4 px-2 pb-1 text-[11px] font-semibold text-[#8e8e93]">Ubicaciones</div>
        <button
          type="button"
          onClick={() => setFilter('github')}
          className={`flex items-center gap-2 rounded-md px-2 py-1.5 text-left text-[13px] transition ${
            filter === 'github' ? 'bg-black/8 text-[#1d1d1f]' : 'text-[#3a3a3c] hover:bg-black/5'
          }`}
        >
          <span className="text-[#1d1d1f]"><Github size={15} /></span>
          GitHub
          <span className="ml-auto text-[11px] text-[#8e8e93]">{githubRepos.length}</span>
        </button>
        <div className="mt-4 px-2 pb-1 text-[11px] font-semibold text-[#8e8e93]">Etiquetas</div>
        <div className="flex flex-wrap gap-1.5 px-2">
          {['Java', 'React', 'Go', 'NestJS', 'Next.js'].map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setQuery(query === t ? '' : t)}
              className={`rounded-full px-2 py-0.5 text-[11px] ${
                query === t ? 'bg-accent text-white' : 'bg-black/6 text-[#3a3a3c] hover:bg-black/10'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </aside>

      {/* Área principal */}
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex h-[44px] shrink-0 items-center gap-2 border-b border-black/8 px-3">
          <div className="hidden items-center gap-1 text-[#8e8e93] sm:flex">
            <button type="button" className="rounded p-1 hover:bg-black/5" aria-label="Atrás">
              <ChevronLeft size={16} />
            </button>
            <button type="button" className="rounded p-1 hover:bg-black/5" aria-label="Adelante">
              <ChevronRight size={16} />
            </button>
          </div>
          <div className="flex items-center gap-1.5 text-[13px] font-semibold text-[#1d1d1f]">
            <Layers size={15} className="text-accent" />
            {current.label}
          </div>
          <div className="ml-auto flex items-center gap-1 rounded-md bg-black/5 p-0.5">
            <button
              type="button"
              aria-label="Vista de iconos"
              onClick={() => setView('grid')}
              className={`rounded p-1 ${view === 'grid' ? 'bg-white text-[#1d1d1f] shadow-sm' : 'text-[#8e8e93]'}`}
            >
              <LayoutGrid size={14} />
            </button>
            <button
              type="button"
              aria-label="Vista de lista"
              onClick={() => setView('list')}
              className={`rounded p-1 ${view === 'list' ? 'bg-white text-[#1d1d1f] shadow-sm' : 'text-[#8e8e93]'}`}
            >
              <List size={14} />
            </button>
          </div>
          <label className="relative hidden sm:block">
            <Search size={13} className="pointer-events-none absolute left-2 top-1/2 -translate-y-1/2 text-[#8e8e93]" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar"
              className="h-7 w-[150px] rounded-md bg-black/5 pl-7 pr-2 text-[12px] outline-none placeholder:text-[#8e8e93] focus:bg-white focus:ring-2 focus:ring-accent/40"
            />
          </label>
        </div>

        <div className="mac-scroll min-h-0 flex-1 overflow-auto p-4" onClick={() => setSelected(null)}>
          {/* Filtros en móvil */}
          <div className="mb-3 flex gap-1.5 overflow-x-auto sm:hidden">
            {filters.map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  setFilter(f.id)
                }}
                className={`shrink-0 rounded-full px-3 py-1 text-[12px] ${
                  filter === f.id ? 'bg-accent text-white' : 'bg-black/6 text-[#3a3a3c]'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          {filter === 'github' ? (
            <div>
              <div className="mb-3 flex items-center justify-between gap-2">
                <p className="text-[12.5px] text-[#6e6e73]">Repositorios seleccionados de mi cuenta de GitHub.</p>
                <a
                  href={GITHUB_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex shrink-0 items-center gap-1 text-[12px] font-medium text-accent hover:underline"
                >
                  <Github size={13} /> Ver perfil
                </a>
              </div>
              {visibleRepos.length === 0 && <div className="p-8 text-center text-[13px] text-[#8e8e93]">Sin resultados.</div>}
              <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                {visibleRepos.map((r) => (
                  <div key={r.name} className="flex flex-col rounded-xl border border-black/8 bg-[#fafafa] p-3.5">
                    <div className="flex items-center gap-2">
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-[#1d1d1f] text-white">
                        {r.private ? <Lock size={13} /> : <Github size={14} />}
                      </span>
                      {r.private ? (
                        <span className="truncate text-[13.5px] font-semibold text-[#1d1d1f]">{r.name}</span>
                      ) : (
                        <a
                          href={r.url}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex min-w-0 items-center gap-1 truncate text-[13.5px] font-semibold text-[#1d1d1f] hover:text-accent"
                        >
                          {r.name} <ExternalLink size={11} className="shrink-0 text-[#8e8e93]" />
                        </a>
                      )}
                      <span className="ml-auto shrink-0 text-[11px] text-[#8e8e93]">
                        {r.year}
                        {r.private ? ' · privado' : ''}
                      </span>
                    </div>
                    <p className="mt-2 line-clamp-3 text-[12.5px] leading-relaxed text-[#515154]">{r.description}</p>
                    <div className="mt-2 flex flex-wrap gap-1">
                      {r.tech.slice(0, 5).map((t) => (
                        <span key={t} className="rounded-full bg-black/6 px-2 py-0.5 text-[10.5px] font-medium text-[#3a3a3c]">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : visible.length === 0 ? (
            <div className="p-8 text-center text-[13px] text-[#8e8e93]">Sin resultados.</div>
          ) : view === 'grid' ? (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {visible.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation()
                    if (window.matchMedia('(pointer: coarse)').matches) openProject(p, e)
                    else setSelected(p.id)
                  }}
                  onDoubleClick={(e) => openProject(p, e)}
                  className={`group flex flex-col items-center gap-2 rounded-xl p-2 text-center transition ${
                    selected === p.id ? 'bg-accent/12 ring-1 ring-accent/40' : 'hover:bg-black/4'
                  }`}
                >
                  <ProjectThumb variant={p.thumb} className="aspect-[16/10] w-full rounded-lg shadow-sm ring-1 ring-black/10" />
                  <div className="text-[12.5px] font-medium leading-tight text-[#1d1d1f]">{p.name}</div>
                  <div className="-mt-1 text-[11px] text-[#8e8e93]">{p.year}</div>
                </button>
              ))}
            </div>
          ) : (
            <table className="w-full border-collapse text-[13px]">
              <thead>
                <tr className="text-left text-[11px] text-[#8e8e93]">
                  <th className="pb-2 font-medium">Nombre</th>
                  <th className="hidden pb-2 font-medium sm:table-cell">Tipo</th>
                  <th className="hidden pb-2 font-medium md:table-cell">Tecnologías</th>
                  <th className="pb-2 font-medium">Año</th>
                </tr>
              </thead>
              <tbody>
                {visible.map((p, i) => (
                  <tr
                    key={p.id}
                    onClick={(e) => {
                      e.stopPropagation()
                      setSelected(p.id)
                    }}
                    onDoubleClick={(e) => openProject(p, e)}
                    className={`cursor-default ${selected === p.id ? 'bg-accent text-white' : i % 2 ? 'bg-black/3' : ''}`}
                  >
                    <td className="flex items-center gap-2 rounded-l-md px-2 py-1.5">
                      <ProjectThumb variant={p.thumb} className="h-5 w-8 rounded-sm" />
                      <span className="font-medium">{p.name}</span>
                    </td>
                    <td className="hidden px-2 py-1.5 sm:table-cell">{p.type}</td>
                    <td className="hidden px-2 py-1.5 md:table-cell">{p.tech.join(', ')}</td>
                    <td className="rounded-r-md px-2 py-1.5">{p.year}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {/* Vista previa del seleccionado */}
          {selected && (
            <div className="mt-5 flex items-start gap-4 rounded-xl border border-black/8 bg-[#fafafa] p-4" onClick={(e) => e.stopPropagation()}>
              {(() => {
                const p = projects.find((x) => x.id === selected)!
                return (
                  <>
                    <ProjectThumb variant={p.thumb} className="hidden aspect-[16/10] w-[140px] shrink-0 rounded-lg sm:block" />
                    <div className="min-w-0 flex-1">
                      <div className="text-[15px] font-semibold text-[#1d1d1f]">{p.name}</div>
                      <div className="mt-0.5 text-[12px] text-[#8e8e93]">
                        {p.role} · {p.year}
                      </div>
                      <p className="mt-2 line-clamp-3 text-[13px] text-[#515154]">{p.tagline} {p.description}</p>
                      <button
                        type="button"
                        onClick={(e) => openProject(p, e)}
                        className="mt-3 rounded-md bg-accent px-3 py-1.5 text-[12px] font-semibold text-white hover:brightness-110"
                      >
                        Abrir
                      </button>
                    </div>
                  </>
                )
              })()}
            </div>
          )}
        </div>

        <div className="flex h-[24px] shrink-0 items-center justify-center border-t border-black/8 bg-[#f5f5f7] text-[11px] text-[#8e8e93]">
          {filter === 'github'
            ? `${visibleRepos.length} ${visibleRepos.length === 1 ? 'repositorio' : 'repositorios'}`
            : `${visible.length} ${visible.length === 1 ? 'elemento' : 'elementos'}`}
        </div>
      </div>
    </div>
  )
}
