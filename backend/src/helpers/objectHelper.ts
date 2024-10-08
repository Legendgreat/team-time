export const omitKeys = (obj: object, keys: string[]) => {
  for (const key of keys) {
    delete obj[key]
  }
  return obj
}
