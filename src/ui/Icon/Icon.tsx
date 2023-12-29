'use client'

import { HTMLAttributes } from 'react'
import { IconType } from 'react-icons'
import * as aiIcons from 'react-icons/ai'
import * as biIcons from 'react-icons/bi'
import * as bsIcons from 'react-icons/bs'
import * as faIcons from 'react-icons/fa'
import * as fiIcons from 'react-icons/fi'
import * as giIcons from 'react-icons/gi'
import * as tbIcons from 'react-icons/tb'

type Props = HTMLAttributes<SVGElement> & {
  name: string
  size?: string
}

export function Icon({ name, size = '1.5rem', ...rest }: Props) {
  const getIcon = (iconName: string) => {
    const iconsMap = new Map()
    iconsMap.set('Bs', bsIcons)
    iconsMap.set('Ai', aiIcons)
    iconsMap.set('Bi', biIcons)
    iconsMap.set('Gi', giIcons)
    iconsMap.set('Fa', faIcons)
    iconsMap.set('Tb', tbIcons)
    iconsMap.set('Fi', fiIcons)

    return iconsMap.get(iconName.substring(0, 2))
  }

  const icons: any = getIcon(name)
  const Icon: IconType = icons[name]

  return <Icon size={size} {...rest} />
}
