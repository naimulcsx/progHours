const getAccessToken = (cookie) => {
  const cookieObj = {}
  const cookieArray = cookie.split("; ")
  cookieArray.forEach((cookieItem) => {
    const [key, value] = cookieItem.split("=")
    cookieObj[key] = value
  })
  return cookieObj.accessToken ? cookieObj.accessToken : null
}

module.exports = getAccessToken
