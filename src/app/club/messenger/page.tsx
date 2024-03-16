import { Chat, Chats, Search } from './_elements'
import styles from './page.module.css'

export default async function Messenger() {
  return (
    <div className={styles.page}>
      <div className={styles.content}>
        <div className={styles.nav}>
          <Search />
          <Chats />
        </div>
        <Chat />
      </div>
    </div>
  )
}
