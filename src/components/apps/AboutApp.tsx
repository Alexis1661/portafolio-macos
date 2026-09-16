import { Languages } from 'lucide-react'
import { profile } from '@/data/profile'
import { profileEn, aboutLabels } from '@/data/profile.en'
import { useLang, type Lang } from '@/store/lang'
import { useWindows } from '@/store/windows'

const Meta = ({ label, value }: { label: string; value: string }) => (
  <div>
    <div className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#1d1d1f]">{label}</div>
    <div className="mt-1 text-[14px] text-[#6e6e73]">{value}</div>
  </div>
)

const Chip = ({ children }: { children: string }) => (
  <span className="rounded-full bg-[#f2f2f7] px-3 py-1 text-[12px] font-medium text-[#3a3a3c]">{children}</span>
)

/** Selector de idioma ES / EN (segmentado, estilo macOS). */
function LangSwitch({ lang, onChange }: { lang: Lang; onChange: (l: Lang) => void }) {
  return (
    <div className="flex items-center gap-1.5">
      <Languages size={14} className="text-[#8e8e93]" />
      <div className="flex rounded-lg bg-[#f2f2f7] p-0.5" role="group" aria-label="Idioma / Language">
        {(['es', 'en'] as Lang[]).map((l) => (
          <button
            key={l}
            type="button"
            aria-pressed={lang === l}
            onClick={() => onChange(l)}
            className={`rounded-md px-2.5 py-1 text-[12px] font-semibold uppercase transition ${
              lang === l ? 'bg-white text-[#1d1d1f] shadow-sm' : 'text-[#8e8e93] hover:text-[#1d1d1f]'
            }`}
          >
            {l}
          </button>
        ))}
      </div>
    </div>
  )
}

/** Ventana "Sobre mí": sigue la composición de la ventana de la referencia. Disponible en español e inglés. */
export function AboutApp() {
  const open = useWindows((s) => s.open)
  const lang = useLang((s) => s.lang)
  const setLang = useLang((s) => s.setLang)
  const t = aboutLabels[lang]
  const p = lang === 'en' ? profileEn : profile

  return (
    <div className="px-6 pb-8 pt-2 sm:px-8">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="text-[34px] font-bold leading-tight text-[#1d1d1f] sm:text-[40px]">{profile.shortName}</h1>
          <p className="mt-1 text-[15px] font-medium text-[#6e6e73]">
            {p.role} · {p.location}
          </p>
        </div>
        <div className="pt-2">
          <LangSwitch lang={lang} onChange={setLang} />
        </div>
      </div>

      <p className="mt-5 max-w-[62ch] text-[14.5px] leading-relaxed text-[#515154]">{p.summary}</p>
      <p className="mt-3 max-w-[62ch] text-[14.5px] leading-relaxed text-[#515154]">{p.summaryExtended}</p>

      <div className="mt-7 grid grid-cols-2 gap-x-8 gap-y-5 sm:grid-cols-3">
        <Meta label={t.education} value={`${p.education[0].degree} · ${p.education[0].institution}`} />
        <Meta label={t.experience} value={`${p.experience[0].role} · ${p.experience[0].company}`} />
        <Meta label={t.languages} value={p.languages.map((l) => `${l.name} (${l.level})`).join(' · ')} />
      </div>

      <div className="mt-7 overflow-hidden rounded-2xl bg-[#8b8b8f]">
        <img
          src="/wallpaper.webp"
          alt={t.avatarAlt}
          className="aspect-[16/9] w-full object-cover object-[50%_28%]"
          draggable={false}
        />
      </div>

      <section className="mt-8">
        <h2 className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#1d1d1f]">{t.technicalSkills}</h2>
        <div className="mt-3 flex flex-wrap gap-2">
          {[...p.skills.languages, ...p.skills.frameworks].map((s) => (
            <Chip key={s}>{s}</Chip>
          ))}
        </div>
        <div className="mt-2 flex flex-wrap gap-2">
          {[...p.skills.areas, ...p.skills.tools].map((s) => (
            <Chip key={s}>{s}</Chip>
          ))}
        </div>
      </section>

      <section className="mt-6 grid gap-6 sm:grid-cols-2">
        <div>
          <h2 className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#1d1d1f]">{t.softSkills}</h2>
          <ul className="mt-2 space-y-1 text-[14px] text-[#515154]">
            {p.softSkills.map((s) => (
              <li key={s}>· {s}</li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#1d1d1f]">{t.certifications}</h2>
          <ul className="mt-2 space-y-2 text-[14px] text-[#515154]">
            {p.certifications.map((c) => (
              <li key={c.name}>
                <div className="font-medium text-[#1d1d1f]">{c.name}</div>
                <div className="text-[13px] text-[#8e8e93]">
                  {c.issuer} · {c.date}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <div className="mt-8 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => open('projects')}
          className="rounded-lg bg-accent px-4 py-2 text-[13px] font-semibold text-white shadow-sm transition hover:brightness-110 active:scale-[0.98]"
        >
          {t.viewProjects}
        </button>
        <button
          type="button"
          onClick={() => open('cv')}
          className="rounded-lg bg-[#f2f2f7] px-4 py-2 text-[13px] font-semibold text-[#1d1d1f] transition hover:bg-[#e5e5ea] active:scale-[0.98]"
        >
          {t.openCv}
        </button>
        <button
          type="button"
          onClick={() => open('contact')}
          className="rounded-lg bg-[#f2f2f7] px-4 py-2 text-[13px] font-semibold text-[#1d1d1f] transition hover:bg-[#e5e5ea] active:scale-[0.98]"
        >
          {t.contact}
        </button>
      </div>
    </div>
  )
}
