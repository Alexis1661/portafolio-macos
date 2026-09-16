import { useState } from 'react'
import { Download, ExternalLink, FileText, LayoutTemplate } from 'lucide-react'
import { profile } from '@/data/profile'
import { projects } from '@/data/projects'

export const CV_PDF_PATH = '/cv.pdf'
export const CV_PDF_NAME = 'CV-Hector-Alexis-Delgado-Abril.pdf'

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <section className="mt-6">
    <h2 className="border-b border-black/10 pb-1 text-[11px] font-bold uppercase tracking-[0.14em] text-[#1d1d1f]">{title}</h2>
    <div className="mt-3">{children}</div>
  </section>
)

/** Visor de hoja de vida: vista legible (HTML) o el PDF original embebido, con descarga. */
export function CvApp() {
  const [mode, setMode] = useState<'doc' | 'pdf'>('doc')

  return (
    <div className="flex h-full min-h-0 flex-col">
      <div className="flex h-[44px] shrink-0 items-center gap-2 border-b border-black/8 bg-[#f7f7f9] px-3">
        <div className="flex items-center gap-1 rounded-md bg-black/5 p-0.5">
          <button
            type="button"
            onClick={() => setMode('doc')}
            className={`flex items-center gap-1 rounded px-2 py-1 text-[12px] ${
              mode === 'doc' ? 'bg-white text-[#1d1d1f] shadow-sm' : 'text-[#8e8e93]'
            }`}
          >
            <LayoutTemplate size={13} /> Documento
          </button>
          <button
            type="button"
            onClick={() => setMode('pdf')}
            className={`flex items-center gap-1 rounded px-2 py-1 text-[12px] ${
              mode === 'pdf' ? 'bg-white text-[#1d1d1f] shadow-sm' : 'text-[#8e8e93]'
            }`}
          >
            <FileText size={13} /> PDF
          </button>
        </div>
        <div className="ml-auto flex items-center gap-1.5">
          <a
            href={CV_PDF_PATH}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1 rounded-md px-2 py-1 text-[12px] font-medium text-[#1d1d1f] hover:bg-black/5"
          >
            <ExternalLink size={13} /> Abrir
          </a>
          <a
            href={CV_PDF_PATH}
            download={CV_PDF_NAME}
            className="flex items-center gap-1 rounded-md bg-accent px-2.5 py-1 text-[12px] font-semibold text-white hover:brightness-110"
          >
            <Download size={13} /> Descargar PDF
          </a>
        </div>
      </div>

      {mode === 'pdf' ? (
        <object
          data={`${CV_PDF_PATH}#toolbar=0&view=FitH`}
          type="application/pdf"
          aria-label="Hoja de vida en PDF"
          className="min-h-0 flex-1 bg-[#525659]"
        >
          <div className="flex h-full flex-col items-center justify-center gap-3 p-8 text-center text-[13px] text-white/80">
            <FileText size={32} />
            <p>Tu navegador no puede mostrar el PDF embebido.</p>
            <a href={CV_PDF_PATH} target="_blank" rel="noreferrer" className="rounded-md bg-accent px-3 py-1.5 font-semibold text-white">
              Abrir el PDF en una pestaña nueva
            </a>
          </div>
        </object>
      ) : (
        <div className="mac-scroll min-h-0 flex-1 overflow-auto bg-[#e9e9ee] p-3 sm:p-6">
          <article className="mx-auto max-w-[720px] rounded-lg bg-white px-6 py-8 shadow-[0_1px_3px_rgba(0,0,0,0.12)] sm:px-10 sm:py-10">
            <header>
              <h1 className="text-[26px] font-bold leading-tight text-[#1d1d1f]">{profile.name}</h1>
              <p className="mt-1 text-[13px] text-[#6e6e73]">
                {profile.phone} · {profile.email} · GitHub · LinkedIn
              </p>
            </header>

            <Section title="Perfil profesional">
              <p className="text-[13.5px] leading-relaxed text-[#3a3a3c]">
                {profile.summary} {profile.summaryExtended}
              </p>
            </Section>

            <Section title="Educación">
              {profile.education.map((e) => (
                <div key={e.institution} className="flex justify-between gap-4 text-[13.5px]">
                  <span className="font-semibold text-[#1d1d1f]">{e.institution}</span>
                  <span className="text-[#3a3a3c]">{e.degree}</span>
                </div>
              ))}
            </Section>

            <Section title="Formación complementaria">
              <ul className="space-y-1.5 text-[13.5px]">
                {profile.certifications.map((c) => (
                  <li key={c.name} className="flex justify-between gap-4">
                    <span className="text-[#3a3a3c]">
                      <span className="font-semibold text-[#1d1d1f]">{c.name}</span> – {c.issuer}
                    </span>
                    <span className="shrink-0 text-[#8e8e93]">{c.date}</span>
                  </li>
                ))}
              </ul>
            </Section>

            <Section title="Experiencia laboral">
              {profile.experience.map((x) => (
                <div key={x.company}>
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4 text-[13.5px]">
                    <span className="font-semibold text-[#1d1d1f]">
                      {x.company} ({x.location})
                    </span>
                    <span className="text-[#8e8e93]">{x.period}</span>
                  </div>
                  <div className="text-[13px] italic text-[#3a3a3c]">{x.role}</div>
                  <ul className="mt-1.5 list-disc space-y-1 pl-5 text-[13px] leading-relaxed text-[#3a3a3c]">
                    {x.bullets.map((b) => (
                      <li key={b}>{b}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </Section>

            <Section title="Proyectos relevantes">
              <ul className="space-y-2.5 text-[13px] leading-relaxed text-[#3a3a3c]">
                {projects.map((p) => (
                  <li key={p.id}>
                    <span className="font-semibold text-[#1d1d1f]">{p.name}</span> – {p.role} ({p.tech.join(' / ')}) – {p.year}.{' '}
                    {p.description}
                  </li>
                ))}
              </ul>
            </Section>

            <Section title="Competencias e intereses">
              <dl className="space-y-2 text-[13px] leading-relaxed text-[#3a3a3c]">
                <div>
                  <dt className="font-semibold text-[#1d1d1f]">Habilidades técnicas</dt>
                  <dd>
                    {[...profile.skills.languages, ...profile.skills.frameworks, ...profile.skills.areas, ...profile.skills.tools].join(
                      ', ',
                    )}
                    .
                  </dd>
                </div>
                <div>
                  <dt className="font-semibold text-[#1d1d1f]">Habilidades personales</dt>
                  <dd>{profile.softSkills.join(', ')}.</dd>
                </div>
                <div>
                  <dt className="font-semibold text-[#1d1d1f]">Idiomas</dt>
                  <dd>{profile.languages.map((l) => `${l.name} – ${l.level}`).join(' · ')}</dd>
                </div>
                <div>
                  <dt className="font-semibold text-[#1d1d1f]">Intereses</dt>
                  <dd>{profile.interests.join(', ')}.</dd>
                </div>
              </dl>
            </Section>
          </article>
        </div>
      )}
    </div>
  )
}
