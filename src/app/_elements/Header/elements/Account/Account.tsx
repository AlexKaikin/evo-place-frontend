import { useRouter } from 'next/navigation'
import { useAuth } from '@store'
import { Divider, Icon, Menu, MenuItem } from '@ui'
import styles from './Account.module.css'

export function Account() {
  const router = useRouter()
  const { user, logout } = useAuth()

  return (
    <Menu label={<Icon name="BsPersonCircle" />}>
      {user ? (
        <>
          <div className={styles.account}>
            {user.fullName}
            <span>{user.email}</span>
          </div>
          <MenuItem
            label={'Account'}
            icon={<Icon name="BsPerson" />}
            minWidth={170}
            onClick={() => router.push('/account')}
          />
          <Divider />
          <MenuItem
            label={'Logout'}
            icon={<Icon name="BsBoxArrowRight" />}
            minWidth={170}
            onClick={logout}
          />
        </>
      ) : (
        <>
          <MenuItem label={'Log In'} onClick={() => router.push('/login')} />
          <MenuItem
            label={'Sign Up'}
            onClick={() => router.push('/register')}
          />
        </>
      )}
    </Menu>
  )
}
