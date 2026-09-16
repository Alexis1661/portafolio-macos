import { useState } from 'react'

interface Props {
  active: boolean
  onClose: () => void
  onMinimize: () => void
  onMaximize: () => void
  maximized?: boolean
}

/** Semáforo de macOS: los glifos aparecen al pasar el cursor sobre el grupo. */
export function TrafficLights({ active, onClose, onMinimize, onMaximize, maximized }: Props) {
  const [hover, setHover] = useState(false)
  const base = 'relative h-3 w-3 rounded-full border transition-colors duration-150 flex items-center justify-center'
  const inactive = 'bg-[#d9d9de] border-[#c4c4c8]'

  return (
    <div
      className="flex items-center gap-2"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onPointerDown={(e) => e.stopPropagation()}
    >
      <button
        type="button"
        aria-label="Cerrar ventana"
        onClick={onClose}
        className={`${base} ${active ? 'bg-[#ff5f57] border-[#e0443e]' : inactive}`}
      >
        <svg viewBox="0 0 12 12" className={`h-2 w-2 ${hover ? 'opacity-100' : 'opacity-0'}`} aria-hidden="true">
          <path d="M3 3l6 6M9 3l-6 6" stroke="#4d0000" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      </button>
      <button
        type="button"
        aria-label="Minimizar ventana"
        onClick={onMinimize}
        className={`${base} ${active ? 'bg-[#febc2e] border-[#dea123]' : inactive}`}
      >
        <svg viewBox="0 0 12 12" className={`h-2 w-2 ${hover ? 'opacity-100' : 'opacity-0'}`} aria-hidden="true">
          <path d="M2.5 6h7" stroke="#995700" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      </button>
      <button
        type="button"
        aria-label={maximized ? 'Restaurar ventana' : 'Maximizar ventana'}
        onClick={onMaximize}
        className={`${base} ${active ? 'bg-[#28c840] border-[#1aab29]' : inactive}`}
      >
        <svg viewBox="0 0 12 12" className={`h-2 w-2 ${hover ? 'opacity-100' : 'opacity-0'}`} aria-hidden="true">
          {maximized ? (
            <path d="M3 6h6M6 3v6" stroke="#006500" strokeWidth="1.6" strokeLinecap="round" />
          ) : (
            <>
              <path d="M3 7.5V3h4.5z" fill="#006500" />
              <path d="M9 4.5V9H4.5z" fill="#006500" />
            </>
          )}
        </svg>
      </button>
    </div>
  )
}
