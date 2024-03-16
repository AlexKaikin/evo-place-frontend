import cn from 'classnames'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useLangs } from '@store'
import styles from './Nav.module.css'

export function Nav() {
  const pathname = usePathname()
  const { lang, translate } = useLangs()
  const links = [
    { url: '/', title: translate[lang].header.nav.home, icon: 'BsHouse' },
    { url: '/shop', title: translate[lang].header.nav.shop, icon: 'BsShop' },
    {
      url: '/blog',
      title: translate[lang].header.nav.blog,
      icon: 'BsJournalText',
    },
    { url: '/club', title: translate[lang].header.nav.club, icon: 'BsPeople' },
    {
      url: '/contacts',
      title: translate[lang].header.nav.contacts,
      icon: 'BsEnvelope',
    },
  ]

  return (
    <nav className={styles.nav}>
      {links.map(link => (
        <Link
          key={link.title}
          href={link.url}
          className={cn(styles.navLink, {
            [styles.active]:
              (pathname.indexOf(link.url) >= 0 && link.url !== '/') ||
              pathname === link.url,
          })}
        >
          {link.title}
        </Link>
      ))}
    </nav>
  )
}
