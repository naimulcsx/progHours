function getHttpStatusError(status) {
  if (status === 502) return "Bad Gateway"
  if (status === 400) return "Bad Request"
  return `Error ${status}`
}

export default getHttpStatusError
