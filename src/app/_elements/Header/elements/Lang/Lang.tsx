'use client'

import Image from 'next/image'
import en from '@assets/img/langs/en.jpg'
import ru from '@assets/img/langs/ru.jpg'
import { Langs } from '@langs'
import { useLangs } from '@store'
import { Button } from '@ui'
import styles from './Lang.module.css'

export function Lang() {
  const { lang, setLang } = useLangs()
  const handleToggle = () =>
    lang === 'en' ? setLang(Langs.RU) : setLang(Langs.EN)

  return (
    <Button onClick={handleToggle} className={styles.button}>
      <div className={styles.flag}>
        <Image
          width={20}
          height={20}
          src={lang === 'en' ? en : ru}
          alt="lang"
        />
      </div>
      {lang.toUpperCase()}
    </Button>
  )
}
