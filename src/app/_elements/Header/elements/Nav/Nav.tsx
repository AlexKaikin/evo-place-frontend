import cn from 'classnames'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import styles from './Nav.module.css'

export function Nav() {
  const pathname = usePathname()
  const links = [
    { url: '/', title: 'Home', icon: 'BsHouse' },
    { url: '/shop', title: 'Shop', icon: 'BsShop' },
    { url: '/blog', title: 'Blog', icon: 'BsJournalText' },
    { url: '/club', title: 'Club', icon: 'BsPeople' },
    { url: '/contacts', title: 'Contacts', icon: 'BsEnvelope' },
  ]

  return (
    <nav className={styles.nav}>
      {links.map(link => (
        <Link
          key={link.title}
          href={link.url}
          className={cn(styles.navLink, {
            [styles.active]: pathname === link.url,
          })}
        >
          {link.title}
        </Link>
      ))}
    </nav>
  )
}
