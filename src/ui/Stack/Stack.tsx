import React, { CSSProperties, ComponentProps, ReactNode } from 'react'

type Props = ComponentProps<'div'> & {
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
    className,
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
      className={className}
    >
      {children}
    </div>
  )
}
