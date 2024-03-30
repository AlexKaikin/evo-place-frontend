import { create } from 'zustand'
import { Langs, translate } from '@langs'
import { getLocalStorage } from '@utils'

type Lang = {
  lang: Langs
  translate: typeof translate
  setLang: (lang: Langs) => void
  getLang: () => void
}

export const useLangs = create<Lang>()(set => ({
  lang: Langs.EN,
  translate,
  setLang: lang =>
    set(() => {
      localStorage.setItem('lang', JSON.stringify(lang))
      return { lang }
    }),
  getLang: () => set(() => ({ lang: getLocalStorage('lang') })),
}))
