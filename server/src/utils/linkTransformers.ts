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

export const csesLinkTransformer = (link: string) => {
  let linkURL = new URL(link)
  if (linkURL.hostname === "www.cses.fi") {
    linkURL.hostname = "cses.fi"
  }
  return linkURL.toString()
}

export const ccLinkTransformer = (link: string) => {
  let linkURL = new URL(link)
  if (linkURL.hostname === "codechef.com") {
    linkURL.hostname = "www.codechef.com"
  }
  link = linkURL.toString()
  const pattern = new UrlPattern("/:contestId/problems/:problemId")
  const patternResult = pattern.match(new URL(link).pathname)
  if (patternResult) {
    link = `${linkURL.origin}/problems/${patternResult.problemId}`
  }
  return link
}

export const timusLinkTransformer = (link: string) => {
  const linkURL = new URL(link)
  const patternResult = new UrlPattern("/print.aspx").match(linkURL.pathname)
  const problemId = linkURL.searchParams.get("num"),
    spaceId = linkURL.searchParams.get("space")
  if (patternResult) {
    link = `${linkURL.origin}/problem.aspx?space=${spaceId}&num=${problemId}`
  }
  return link
}
