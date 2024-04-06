'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Recommend } from '@/types/club'
import { Widget } from '@/ui'
import defaultAvatar from '@assets/img/user/defaultAvatar.png'
import { recommendationService } from '@services'
import { useLangs } from '@store'
import styles from './Recommendations.module.css'

export function Recommendations() {
  const [recommendations, setRecommendations] = useState<Recommend[]>([])
  const [loading, setLoading] = useState(true)
  const { lang, translate } = useLangs()

  useEffect(() => {
    const getRecommendations = async () => {
      const response = await recommendationService.getAll()
      setRecommendations(response)
      setLoading(false)
    }
    getRecommendations()
  }, [])

  if (!loading && !recommendations.length)
    return (
      <Widget title={translate[lang].club.matching}>
        <div className={styles.items}>{translate[lang].club.noMatching}</div>
      </Widget>
    )

  return (
    <Widget title={translate[lang].club.matching}>
      <div className={styles.items}>
        {recommendations.map(({ _id, avatarUrl, fullName, about }) => (
          <Link href={`/club/users/${_id}`} key={_id} className={styles.item}>
            <div className={styles.avatar}>
              <Image
                fill
                sizes="(max-width: 1800px) 33vw"
                src={avatarUrl || defaultAvatar}
                alt={`${fullName} avatar`}
              />
            </div>
            <div className={styles.content}>
              {fullName}, <span>{about}</span>
            </div>
          </Link>
        ))}
      </div>
    </Widget>
  )
}
