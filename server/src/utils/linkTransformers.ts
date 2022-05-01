import * as UrlPattern from "url-pattern"

export const spojLinkTransformer = (link: string) => {
  let linkURL = new URL(link)
  if (linkURL.hostname === "spoj.com") {
    linkURL.hostname = "www.spoj.com"
  }
  return linkURL.toString()
}

export const cfLinkTransformer = (link: string) => {
  let linkURL = new URL(link)
  if (linkURL.hostname === "www.codeforces.com") {
    linkURL.hostname = "codeforces.com"
  }
  link = linkURL.toString()
  const patternToConvert = new UrlPattern(
    `/problemset/problem/:contestId/:problemId`
  )
  const result = patternToConvert.match(linkURL.pathname)
  if (result) {
    link = `${linkURL.origin}/contest/${result.contestId}/problem/${result.problemId}`
  }
  return link
}
