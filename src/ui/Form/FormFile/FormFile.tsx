'use client'

import { Button, Icon } from '@ui'

type Props = {
  accept: HTMLInputElement['accept']
  multiple?: HTMLInputElement['multiple']
  onChange?: (files: FileList) => void
}

export function FormFile({ onChange, multiple = false, accept }: Props) {
  function handleFiles(files: FileList | null) {
    if (!files?.length) {
      return
    }

    if (onChange) {
      onChange(files)
    }
  }

  function selectFile({
    contentType,
    multiple,
  }: {
    contentType: string
    multiple?: boolean
  }) {
    return new Promise(() => {
      const input = document.createElement('input')
      input.type = 'file'
      input.multiple = multiple || false
      input.accept = contentType

      input.onchange = () => {
        handleFiles(input.files)
      }

      input.click()
    })
  }

  return (
    <div>
      <Button
        type="button"
        startIcon={<Icon name="BsPlus" />}
        onClick={() => selectFile({ contentType: accept, multiple })}
      >
        изображение
      </Button>
    </div>
  )
}
