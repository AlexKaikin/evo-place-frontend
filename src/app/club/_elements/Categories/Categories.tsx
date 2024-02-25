'use client'

import { useRouter, usePathname } from 'next/navigation'
import { Icon, Menu, Stack, Widget } from '@ui'

export function Categories() {
  const router = useRouter()
  const pathname = usePathname()
  const currentCategory = pathname.split('/')[2]

  return (
    <Widget title="Categories" icon="BsGrid">
      <Stack gap={10}>
        <Menu
          icon={<Icon name="BsPerson" />}
          label="My page"
          variant="category"
          action={() => router.push(`/club`)}
          active={!currentCategory ? true : false}
        />
        <Menu
          icon={<Icon name="BsChatText" />}
          label="Messenger"
          variant="category"
          //action={() => router.push(`/club/messenger`)}
          active={currentCategory === 'messenger' ? true : false}
        />
        <Menu
          icon={<Icon name="BsFlag" />}
          label="Groups"
          variant="category"
          action={() => router.push(`/club/groups`)}
          active={currentCategory === 'groups' ? true : false}
        />
        <Menu
          icon={<Icon name="BsPeople" />}
          label="Users"
          variant="category"
          action={() => router.push(`/club/users`)}
          active={currentCategory === 'users' ? true : false}
        />
        <Menu
          icon={<Icon name="BsMegaphone" />}
          label="Events"
          variant="category"
          //action={() => router.push(`/club/events`)}
          active={currentCategory === 'events' ? true : false}
        />
      </Stack>
    </Widget>
  )
}
