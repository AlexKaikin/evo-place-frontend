'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Recommend } from '@/types/club'
import { Widget } from '@/ui'
import defaultAvatar from '@assets/img/user/defaultAvatar.png'
import { useLangs } from '@store'
import styles from './Recommendations.module.css'

type Props = {
  recommendItems: Recommend[]
}

export function Recommendations({ recommendItems }: Props) {
  const { lang, translate } = useLangs()

  if (!recommendItems || !recommendItems.length)
    return (
      <Widget title={translate[lang].club.matching}>
        <div className={styles.items}>{translate[lang].club.noMatching}</div>
      </Widget>
    )

  return (
    <Widget title={translate[lang].club.matching}>
      <div className={styles.items}>
        {recommendItems.map(user => (
          <Link
            href={`/club/users/${user._id}`}
            key={user._id}
            className={styles.item}
          >
            <div className={styles.avatar}>
              <Image
                fill
                sizes="(max-width: 1800px) 33vw"
                src={user.avatarUrl ? user.avatarUrl : defaultAvatar}
                alt=""
              />
            </div>
            <div className={styles.content}>
              {user.fullName}, <span>{user.about}</span>
            </div>
          </Link>
        ))}
      </div>
    </Widget>
  )
}
