/**
 * Remove all query params from the link
 *  - except a few online judge which uses query params as problem links eg. uva, timus etc
 */
export const removeParams = (link: string) => {
  const url = new URL(link)
  const params = []
  let excludeOJParams = {
    "onlinejudge.org": ["option", "Itemid", "category", "page", "problem"],
    "www.onlinejudge.org": ["option", "Itemid", "category", "page", "problem"],
    "icpcarchive.ecs.baylor.edu": [
      "option",
      "Itemid",
      "category",
      "page",
      "problem",
    ],
    "acm.timus.ru": ["space", "num"],
  }
  for (let param of url.searchParams.entries()) params.push(param)
  params.forEach(([key]) => {
    let match: boolean
    Object.keys(excludeOJParams).forEach((oj) => {
      if (url.hostname === oj) {
        match = true
        if (!excludeOJParams[oj].includes(key)) {
          url.searchParams.delete(key)
        }
      }
    })
    if (!match) url.searchParams.delete(key)
  })
  return url.toString()
}

/**
 * Convert link to https protocol
 */
export const toHttps = (link: string) => {
  const url = new URL(link)
  if (url.protocol === "http:") link = `https:` + link.substring(5)
  return link
}

/**
 * Remove trailing slash
 */
export const removeTrailingSlash = (link: string) => link.replace(/\/$/, "")
