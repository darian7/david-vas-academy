export const stringToJson = (str, lng) => {
  try {
    if (!lng) return JSON.parse(str)
    return lng == 'es' ? JSON.parse(str).es : JSON.parse(str).en
  } catch (e) {
    return str
  }
}