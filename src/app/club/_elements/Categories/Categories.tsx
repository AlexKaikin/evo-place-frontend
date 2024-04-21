'use client'

import { useRouter, usePathname } from 'next/navigation'
import { useLangs } from '@store'
import { Icon, Menu, Stack, Widget } from '@ui'

export function Categories() {
  const router = useRouter()
  const pathname = usePathname()
  const { lang, translate } = useLangs()
  const currentCategory = pathname.split('/')[2]

  return (
    <Widget>
      <Stack gap={10}>
        <Menu
          icon={<Icon name="BsPerson" />}
          label={translate[lang].club.mayPage}
          variant="category"
          action={() => router.push(`/club`)}
          active={!currentCategory ? true : false}
        />
        <Menu
          icon={<Icon name="BsChatText" />}
          label={translate[lang].club.messenger}
          variant="category"
          action={() => router.push(`/club/messenger`)}
          active={currentCategory === 'messenger' ? true : false}
        />
        <Menu
          icon={<Icon name="BsFlag" />}
          label={translate[lang].club.groups}
          variant="category"
          action={() => router.push(`/club/groups`)}
          active={currentCategory === 'groups' ? true : false}
        />
        <Menu
          icon={<Icon name="BsPeople" />}
          label={translate[lang].club.users}
          variant="category"
          action={() => router.push(`/club/users`)}
          active={currentCategory === 'users' ? true : false}
        />
        <Menu
          icon={<Icon name="BsMegaphone" />}
          label={translate[lang].club.events}
          variant="category"
          action={() => router.push(`/club/events`)}
          active={currentCategory === 'events' ? true : false}
        />
      </Stack>
    </Widget>
  )
}
