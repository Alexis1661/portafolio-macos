import { profile } from '@/data/profile'
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

/** Ventana "Sobre mí": sigue la composición de la ventana de la referencia. */
export function AboutApp() {
  const open = useWindows((s) => s.open)
  return (
    <div className="px-6 pb-8 pt-2 sm:px-8">
      <h1 className="text-[34px] font-bold leading-tight text-[#1d1d1f] sm:text-[40px]">{profile.shortName}</h1>
      <p className="mt-1 text-[15px] font-medium text-[#6e6e73]">
        {profile.role} · {profile.location}
      </p>

      <p className="mt-5 max-w-[62ch] text-[14.5px] leading-relaxed text-[#515154]">{profile.summary}</p>
      <p className="mt-3 max-w-[62ch] text-[14.5px] leading-relaxed text-[#515154]">{profile.summaryExtended}</p>

      <div className="mt-7 grid grid-cols-2 gap-x-8 gap-y-5 sm:grid-cols-3">
        <Meta label="Formación" value={`${profile.education[0].degree} · ${profile.education[0].institution}`} />
        <Meta label="Experiencia" value={`${profile.experience[0].role} · ${profile.experience[0].company}`} />
        <Meta label="Idiomas" value={profile.languages.map((l) => `${l.name} (${l.level})`).join(' · ')} />
      </div>

      <div className="mt-7 overflow-hidden rounded-2xl bg-[#8b8b8f]">
        <img
          src="/wallpaper.png"
          alt="Avatar de Alexis Delgado"
          className="aspect-[16/9] w-full object-cover object-[50%_28%]"
          draggable={false}
        />
      </div>

      <section className="mt-8">
        <h2 className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#1d1d1f]">Habilidades técnicas</h2>
        <div className="mt-3 flex flex-wrap gap-2">
          {[...profile.skills.languages, ...profile.skills.frameworks].map((s) => (
            <Chip key={s}>{s}</Chip>
          ))}
        </div>
        <div className="mt-2 flex flex-wrap gap-2">
          {[...profile.skills.areas, ...profile.skills.tools].map((s) => (
            <Chip key={s}>{s}</Chip>
          ))}
        </div>
      </section>

      <section className="mt-6 grid gap-6 sm:grid-cols-2">
        <div>
          <h2 className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#1d1d1f]">Habilidades personales</h2>
          <ul className="mt-2 space-y-1 text-[14px] text-[#515154]">
            {profile.softSkills.map((s) => (
              <li key={s}>· {s}</li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#1d1d1f]">Certificaciones</h2>
          <ul className="mt-2 space-y-2 text-[14px] text-[#515154]">
            {profile.certifications.map((c) => (
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
          Ver proyectos
        </button>
        <button
          type="button"
          onClick={() => open('cv')}
          className="rounded-lg bg-[#f2f2f7] px-4 py-2 text-[13px] font-semibold text-[#1d1d1f] transition hover:bg-[#e5e5ea] active:scale-[0.98]"
        >
          Abrir hoja de vida
        </button>
        <button
          type="button"
          onClick={() => open('contact')}
          className="rounded-lg bg-[#f2f2f7] px-4 py-2 text-[13px] font-semibold text-[#1d1d1f] transition hover:bg-[#e5e5ea] active:scale-[0.98]"
        >
          Contacto
        </button>
      </div>
    </div>
  )
}
