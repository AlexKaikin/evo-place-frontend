'use client'

import { ReactNode, useState } from 'react'
import cn from 'classnames'
import { useElementSize } from '@hooks'
import { Button } from '@ui'
import styles from './Spoiler.module.css'

type Props = {
  children: ReactNode
  maxHeight?: number
  showLabel: string
  hideLabel: string
  labelSize?: 'small' | 'medium' | 'large'
  hideShadow?: boolean
}

export function Spoiler(props: Props) {
  const {
    children,
    maxHeight = 100,
    showLabel,
    hideLabel,
    labelSize = 'medium',
    hideShadow,
  } = props
  const [show, setShowState] = useState(false)
  const { ref: contentRef, height } = useElementSize()
  const spoilerMoreContent = show ? hideLabel : showLabel
  const spoiler = spoilerMoreContent !== null && maxHeight! < height

  return (
    <div className={styles.spoiler}>
      <div
        className={cn(styles.content, {
          [styles.hide]: !show,
          [styles.hideShadow]: hideShadow,
        })}
        style={{
          maxHeight: !show
            ? maxHeight + 'px'
            : height
              ? height + 'px'
              : undefined,
          overflow: 'hidden',
        }}
      >
        <div ref={contentRef}>{children}</div>
      </div>
      {spoiler && (
        <Button
          size={labelSize}
          onClick={() => setShowState(opened => !opened)}
        >
          {spoilerMoreContent}
        </Button>
      )}
    </div>
  )
}
