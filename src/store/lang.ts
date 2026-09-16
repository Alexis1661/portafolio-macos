import { create } from 'zustand'

export type Lang = 'es' | 'en'

interface LangStore {
  lang: Lang
  setLang: (lang: Lang) => void
  toggle: () => void
}

/** Idioma de los textos del perfil ("Sobre mí"). Se recuerda entre visitas. */
export const useLang = create<LangStore>((set) => ({
  lang: (typeof localStorage !== 'undefined' && (localStorage.getItem('lang') as Lang)) || 'es',
  setLang: (lang) => {
    try {
      localStorage.setItem('lang', lang)
    } catch {
      /* sin almacenamiento */
    }
    set({ lang })
  },
  toggle: () => set((s) => {
    const lang: Lang = s.lang === 'es' ? 'en' : 'es'
    try {
      localStorage.setItem('lang', lang)
    } catch {
      /* sin almacenamiento */
    }
    return { lang }
  }),
}))
