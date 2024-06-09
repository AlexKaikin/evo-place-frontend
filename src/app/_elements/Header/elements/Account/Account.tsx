import { useRouter } from 'next/navigation'
import { useAuth, useLangs } from '@store'
import { Divider, Icon, Menu, MenuItem } from '@ui'
import styles from './Account.module.css'

export function Account() {
  const router = useRouter()
  const { lang, translate } = useLangs()
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
            label={translate[lang].header.account.account}
            icon={<Icon name="BsPerson" />}
            minWidth={170}
            onClick={() => router.push('/account')}
          />
          {user.role === 'admin' && (
            <MenuItem
              label={translate[lang].header.account.admin}
              icon={<Icon name="BsGear" />}
              minWidth={170}
              onClick={() => router.push('/admin')}
            />
          )}

          <Divider />
          <MenuItem
            label={translate[lang].header.account.logout}
            icon={<Icon name="BsBoxArrowRight" />}
            minWidth={170}
            onClick={logout}
          />
        </>
      ) : (
        <>
          <MenuItem
            label={translate[lang].header.account.login}
            onClick={() => router.push('/login')}
          />
          <MenuItem
            label={translate[lang].header.account.register}
            onClick={() => router.push('/register')}
          />
        </>
      )}
    </Menu>
  )
}
