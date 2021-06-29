export const getLink = (str) => {
  let linkURL
  if (str.includes("[[")) {
    let subs = str.substring(str.indexOf("[[") + 2, str.indexOf("]]"))
    linkURL = subs.substr(subs.indexOf("|") + 1)
  }
  return linkURL
}

export const deleteLink = (str) => {
  let result = ''
  let msg = str
  if (str.includes("[[")) {
    while (msg.includes("[[")) {
      let cadena = msg.substring(0, msg.indexOf('[['))
      msg = msg.substr(msg.indexOf("]]") + 2)
      result += cadena
    }
    result += msg
    return result
  }
  return str
}