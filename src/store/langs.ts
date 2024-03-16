import { create } from 'zustand'
import { Langs, translate } from '@langs'

type Lang = {
  lang: Langs
  translate: typeof translate
  setLang: (lang: Langs) => void
}

export const useLangs = create<Lang>()(set => ({
  lang: Langs.EN,
  translate,
  setLang: lang => set(() => ({ lang })),
}))
