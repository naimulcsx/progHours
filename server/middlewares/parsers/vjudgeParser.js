const cheerio = require("cheerio")
const axios = require("axios")
const nodeURL = require("url")
const path = require("path")

const getVjudgeLink = (link) => {
  const { hostname } = nodeURL.parse(link, true)
  let url = path.parse(link)
  const prefix = "https://vjudge.net/problem"
  switch (hostname) {
    case "spoj.com":
    case "www.spoj.com":
      return [`SPOJ-${url.base}`, `${prefix}/SPOJ-${url.base}`]
    case "codechef.com":
    case "www.codechef.com":
      return [`CC-${url.base}`, `${prefix}/CodeChef-${url.base}`]
    case "atcoder.jp":
    case "www.atcoder.jp":
      return [`AtCoder-${url.base}`, `${prefix}/AtCoder-${url.base}`]
    case "www.hackerrank.com":
      if (url.base === "problem")
        url = path.parse(link.split("/").slice(0, -1).join("/"))
      return [`HR-${url.base}`, `${prefix}/HackerRank-${url.base}`]
  }
}

const vjudgeParser = async (body) => {
  const { link } = body
  const [pid, vjudgeLink] = getVjudgeLink(link)
  body.test = vjudgeLink
  try {
    const { data } = await axios(vjudgeLink)
    const $ = cheerio.load(data)
    body.name = $("#prob-title h2").html()
    body.pid = pid
    body.tags = []
    body.difficulty = null
  } catch (err) {}
  return body
}

module.exports = vjudgeParser
