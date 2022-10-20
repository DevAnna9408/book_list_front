
const get = (obj, path = '', defaultValue) => {
  if (!obj || !path || !path.split) return undefined

  const result = path
    .split('.')
    .reduce((acc, pathKey) => acc && acc[pathKey], obj)

  return result !== undefined ? result : defaultValue
}

const initObject = (path = '', initialValue) => {
  return !path || !path.split ? {} : path
    .split('.')
    .reverse()
    .reduce((acc, key) => ({
      [key]: acc
    }), initialValue)
}
const getNewObjectFromPath = (value, newKey) => (value
  ? initObject(newKey, value)
  : {})

const handleObjectMapperOption = (obj, mapperOption) => {
  const path = mapperOption.from || mapperOption.name
  const newKey = mapperOption.name
  const value = get(obj, path)

  if (value === undefined && (mapperOption.from)) {
    return {}
  }

  if (mapperOption.shouldApply) {
    const {
      condition,
      field
    } = mapperOption.shouldApply
    const conditionValue = get(obj, field)
    if ((field && conditionValue === undefined) || !condition(conditionValue, obj)) return {}
  }

  return getNewObjectFromPath(value, newKey)
}

export const mapper = (mapperOptions) => {
  return mapperObject => mapperOptions.reduce((mappedOutput, mapperOption) => {
    if (!mapperOption) return mappedOutput

    switch (typeof mapperOption) {
      case 'object':
        return Object.assign(mappedOutput, handleObjectMapperOption(mapperObject, mapperOption))
      case 'string':
        return Object.assign(mappedOutput,
          getNewObjectFromPath(get(mapperObject, mapperOption), mapperOption))
      default:
        return mappedOutput
    }
  }, {})
}
