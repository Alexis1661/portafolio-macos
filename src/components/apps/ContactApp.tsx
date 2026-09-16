import { useState } from 'react'
import { Check, Copy, Mail, Phone, Github, Linkedin, MapPin, MessageCircle } from 'lucide-react'
import { profile } from '@/data/profile'

interface Row {
  icon: React.ReactNode
  label: string
  value: string
  href: string
  copy?: string
}

const rows: Row[] = [
  { icon: <Mail size={17} />, label: 'Correo', value: profile.email, href: `mailto:${profile.email}`, copy: profile.email },
  { icon: <Phone size={17} />, label: 'Teléfono', value: profile.phone, href: `tel:${profile.phoneRaw}`, copy: profile.phoneRaw },
  {
    icon: <MessageCircle size={17} />,
    label: 'WhatsApp',
    value: profile.phone,
    href: `https://wa.me/${profile.phoneRaw.replace('+', '')}`,
  },
  { icon: <Github size={17} />, label: 'GitHub', value: profile.github.replace(/^https?:\/\/(www\.)?/, ''), href: profile.github },
  { icon: <Linkedin size={17} />, label: 'LinkedIn', value: profile.linkedin.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, ''), href: profile.linkedin },
]

/** Ventana de contacto con todos los datos del CV. */
export function ContactApp() {
  const [copied, setCopied] = useState<string | null>(null)

  const copy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(text)
      window.setTimeout(() => setCopied(null), 1500)
    } catch {
      /* portapapeles no disponible */
    }
  }

  return (
    <div className="px-6 pb-8 pt-2 sm:px-8">
      <div className="flex items-center gap-4">
        <div className="h-16 w-16 shrink-0 overflow-hidden rounded-full bg-[#8b8b8f] ring-2 ring-black/10">
          <img src="/wallpaper.webp" alt="" className="h-full w-full scale-[1.9] object-cover object-[50%_30%]" draggable={false} />
        </div>
        <div>
          <h1 className="text-[26px] font-bold leading-tight text-[#1d1d1f]">{profile.shortName}</h1>
          <p className="flex items-center gap-1 text-[13px] text-[#6e6e73]">
            <MapPin size={13} /> {profile.role} · {profile.location}
          </p>
        </div>
      </div>

      <p className="mt-5 text-[14px] leading-relaxed text-[#515154]">
        ¿Hablamos? Estoy abierto a prácticas, oportunidades junior y proyectos de desarrollo web, móvil y backend.
      </p>

      <ul className="mt-5 divide-y divide-black/6 overflow-hidden rounded-xl border border-black/8 bg-[#fafafa]">
        {rows.map((r) => (
          <li key={r.label} className="flex items-center gap-3 px-4 py-3">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent/12 text-accent">{r.icon}</span>
            <div className="min-w-0 flex-1">
              <div className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#8e8e93]">{r.label}</div>
              <a
                href={r.href}
                target={r.href.startsWith('http') ? '_blank' : undefined}
                rel="noreferrer"
                className="block truncate text-[14px] font-medium text-[#1d1d1f] hover:text-accent"
              >
                {r.value}
              </a>
            </div>
            {r.copy && (
              <button
                type="button"
                onClick={() => copy(r.copy!)}
                aria-label={`Copiar ${r.label}`}
                className="rounded-md p-1.5 text-[#8e8e93] transition hover:bg-black/5 hover:text-[#1d1d1f]"
              >
                {copied === r.copy ? <Check size={15} className="text-[#28c840]" /> : <Copy size={15} />}
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}
