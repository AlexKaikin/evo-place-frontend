import React, { CSSProperties, ReactNode } from 'react'

type Props = {
  gap?: number
  isWide?: boolean
  children: ReactNode
  flexWrap?: CSSProperties['flexWrap']
  alignItems?: CSSProperties['alignItems']
  overflow?: CSSProperties['overflow']
  direction?: CSSProperties['flexDirection']
  justifyContent?: CSSProperties['justifyContent']
  style?: { opacity?: string }
}

export function Stack(props: Props) {
  const {
    style,
    isWide,
    gap = 0,
    children,
    direction = 'column',
    ...restProps
  } = props

  return (
    <div
      style={{
        display: 'flex',
        gap: gap + 'px',
        flexDirection: direction,
        width: isWide ? '100%' : 'auto',
        height: isWide ? '100%' : 'auto',
        ...style,
        ...restProps,
      }}
    >
      {children}
    </div>
  )
}
