import React, { CSSProperties, ReactNode } from 'react'

type Props = {
  isWide?: boolean
  children: ReactNode
  gap?: number
  wrap?: CSSProperties['flexWrap']
  align?: CSSProperties['alignItems']
  overflow?: CSSProperties['overflow']
  direction?: CSSProperties['flexDirection']
  justify?: CSSProperties['justifyContent']
}

export function Stack(props: Props) {
  const {
    isWide,
    children,
    gap = 0,
    wrap = 'wrap',
    align = 'center',
    direction = 'row',
    justify = 'center',
    overflow = 'initial',
  } = props
  return (
    <div
      style={{
        overflow,
        display: 'flex',
        flexWrap: wrap,
        gap: gap + 'px',
        alignItems: align,
        justifyContent: justify,
        flexDirection: direction,
        width: isWide ? '100%' : 'auto',
        height: isWide ? '100%' : 'auto',
      }}
    >
      {children}
    </div>
  )
}
