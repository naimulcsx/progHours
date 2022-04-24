import * as UrlPattern from "url-pattern"

function getUniformTimusLink(link) {
  const linkUrl = new URL(link)

  const pattern = new UrlPattern("/print.aspx")
  const patternResult = pattern.match(linkUrl.pathname)

  const problemId = linkUrl.searchParams.get("num")
  const spaceId = linkUrl.searchParams.get("space")

  if (patternResult) {
    link = `https://acm.timus.ru/problem.aspx?space=${spaceId}&num=${problemId}`
  }
  return link
}

export default getUniformTimusLink
