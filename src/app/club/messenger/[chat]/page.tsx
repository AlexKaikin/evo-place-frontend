import { Chat as Room, Chats, Search } from '../_elements'
import styles from '../page.module.css'

export default function Chat() {
  return (
    <div className={styles.page}>
      <div className={styles.content}>
        <div className={styles.nav}>
          <Search />
          <Chats />
        </div>
        <Room />
      </div>
    </div>
  )
}
