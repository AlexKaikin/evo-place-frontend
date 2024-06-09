export function selectFile(contentType: string, multiple?: boolean) {
  return new Promise(resolve => {
    const input = document.createElement('input')
    input.type = 'file'
    input.multiple = multiple || false
    input.accept = contentType

    input.onchange = () => {
      const files = Array.from(input.files as Iterable<File>)
      if (multiple) resolve(files)
      else resolve(files[0])
    }

    input.click()
  })
}

export function validateFileSize(file: File, sizeMb: number) {
  const fileSize = file.size / 1024 / 1024
  if (fileSize > sizeMb) return false
  else return true
}

export function toFormData<Type extends object>(
  obj: Type,
  formData = new FormData(),
  prevKey: string | null | undefined = null
): Type {
  Object.entries(obj).forEach(([key, value]) => {
    const fieldName = prevKey
      ? `${prevKey}[${value instanceof File ? '' : key}]`
      : key

    if (
      value instanceof Object &&
      !(value instanceof File || value instanceof Date)
    ) {
      toFormData(value, formData, fieldName)
    } else {
      formData.append(fieldName, value)
    }
  })

  return formData as Type
}
// const fieldName = prevKey ? `${prevKey}[${key}]` : key
