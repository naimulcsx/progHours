import * as UrlPattern from "url-pattern"

function getUniformCFLink(link) {
  const linkUrl = new URL(link)
  const patternToConvert = new UrlPattern(
    `/problemset/problem/:contestId/:problemId`
  )
  const result = patternToConvert.match(linkUrl.pathname)
  if (result) {
    link = `${linkUrl.origin}/contest/${result.contestId}/problem/${result.problemId}`
  }
  return link
}

export default getUniformCFLink
