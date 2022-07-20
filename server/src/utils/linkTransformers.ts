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
  // check for /{contestId}/problems/{problemId}
  const pattern = new UrlPattern("/:contestId/problems/:problemId")
  const patternResult = pattern.match(new URL(link).pathname)
  if (patternResult) {
    link = `${linkURL.origin}/problems/${patternResult.problemId}`
  }
  // check for /submit/{problemId}
  const pattern2 = new UrlPattern("/submit/:problemId")
  const patternResult2 = pattern2.match(new URL(link).pathname)
  if (patternResult2) {
    link = `${linkURL.origin}/problems/${patternResult2.problemId}`
  }
  console.log(link)
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

export const lightOjLinkTransformer = (link: string) => {
  const linkURL = new URL(link)
  if (linkURL.hostname === "www.lightoj.com") {
    linkURL.hostname = "lightoj.com"
  }
  return linkURL.toString()
}

export const atCoderLinkTransformer = (link: string) => {
  const linkURL = new URL(link)
  if (linkURL.hostname === "www.atcoder.jp") {
    linkURL.hostname = "atcoder.jp"
  }
  return linkURL.toString()
}

export const eolympLinkTransformer = (link: string) => {
  const linkURL = new URL(link)
  if (linkURL.hostname === "eolymp.com") {
    linkURL.hostname = "www.eolymp.com"
  }
  return linkURL.toString()
}

export const beecrowdLinkTransformer = (link: string) => {
  const linkURL = new URL(link)
  if (linkURL.hostname === "beecrowd.com.br") {
    linkURL.hostname = "www.beecrowd.com.br"
  }
  const beecrowdRepoPattern = new UrlPattern(
    "/repository/UOJ_:problemId_en.html"
  )
  const result = beecrowdRepoPattern.match(linkURL.pathname)
  if (result) {
    linkURL.pathname = `/judge/en/problems/view/${result.problemId}`
  }
  return linkURL.toString()
}

export const uvaLinkTransformer = (link: string) => {
  const linkURL = new URL(link)
  if (linkURL.hostname === "www.onlinejudge.org") {
    linkURL.hostname = "onlinejudge.org"
  }
  return linkURL.toString()
}

export const tophLinkTransformer = (link: string) => {
  const linkURL = new URL(link)
  if (linkURL.hostname === "www.toph.co") {
    linkURL.hostname = "toph.co"
  }
  return linkURL.toString()
}

export const hackrrankLinkTransformer = (link: string) => {
  const linkURL = new URL(link)
  if (linkURL.hostname === "hackerrank.com") {
    linkURL.hostname = "www.hackerrank.com"
  }
  const pattern = new UrlPattern("/challenges/:problemId/problem")
  const result = pattern.match(linkURL.pathname)
  if (result) {
    linkURL.pathname = `/challenges/${result.problemId}`
  }

  const pattern2 = new UrlPattern(
    "/contests/:contestId/challenges/:problemId/problem"
  )
  const result2 = pattern2.match(linkURL.pathname)
  if (result2) {
    linkURL.pathname = `/contests/${result2.contestId}/challenges/${result2.problemId}`
  }

  return linkURL.toString()
}

export const leetcodeLinkTransformer = (link: string) => {
  const linkURL = new URL(link)
  if (linkURL.hostname === "www.leetcode.com") {
    linkURL.hostname = "leetcode.com"
  }
  return linkURL.toString()
}

export const codetowinLinkTransformer = (link: string) => {
  const linkURL = new URL(link)
  if (linkURL.hostname === "www.codeto.win") {
    linkURL.hostname = "codeto.win"
  }
  return linkURL.toString()
}

export const hackerearthLinkTransformer = (link: string) => {
  const linkURL = new URL(link)
  if (linkURL.hostname === "hackerearth.com") {
    linkURL.hostname = "www.hackerearth.com"
  }
  return linkURL.toString()
}
