import * as UrlPattern from "url-pattern"

function getUniformCCLink(link) {
  const pattern = new UrlPattern("/:contestId/problems/:problemId")
  const patternResult = pattern.match(new URL(link).pathname)
  if (patternResult) {
    link = `https://www.codechef.com/problems/${patternResult.problemId}`
  }
  return link
}

export default getUniformCCLink
