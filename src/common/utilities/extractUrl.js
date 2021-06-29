export const splitExtension = (url) => {
  let split = url?.split('.')

  if (split.length > 0)
    return split[split.length - 1]
  else
    return ''
}

export const splitNombre = (url) => {

  if (!url)
    return "sin_nombre"

  let split = url?.split('.')

  if (split.length == 0)
    return 'sin_nombre'

  let splitName = split[split.length - 2]?.split('/')

  if (splitName.length == 0)
    return 'sin_nombre'

  let name = splitName[splitName.length - 1]

  if (name.split("%20").length == 0)
    return name

  let refactorName = ''

  name.split("%20").map((item) => (
    refactorName += item + " "
  ))

  return refactorName?.trim()
}