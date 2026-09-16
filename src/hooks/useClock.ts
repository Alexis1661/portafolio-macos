import { useEffect, useState } from 'react'

const fmt = new Intl.DateTimeFormat('es-CO', {
  weekday: 'short',
  day: 'numeric',
  month: 'short',
  hour: 'numeric',
  minute: '2-digit',
  hour12: true,
})

const format = (d: Date) =>
  fmt
    .format(d)
    .replace(/\./g, '')
    .replace(/,/g, '')
    .replace(/\s+a\s*m/i, ' a. m.')
    .replace(/\s+p\s*m/i, ' p. m.')

/** Reloj estilo barra de menús: "lun 15 sept 4:32 p. m." */
export function useClock() {
  const [now, setNow] = useState(() => format(new Date()))
  useEffect(() => {
    const tick = () => setNow(format(new Date()))
    const id = window.setInterval(tick, 10_000)
    return () => window.clearInterval(id)
  }, [])
  return now
}
