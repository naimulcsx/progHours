const cheerio = require("cheerio")
const axios = require("axios")
const nodeURL = require("url")
const path = require("path")

const getVjudgeLink = (link) => {
  const { hostname } = nodeURL.parse(link, true)
  let { name } = path.parse(link)

  const pid = name.includes("lang") ? name.split("?")[0] : name

  const prefix = "https://vjudge.net/problem"
  switch (hostname) {
    case "spoj.com":
    case "www.spoj.com":
      return [`SPOJ-${pid}`, `${prefix}/SPOJ-${pid}`]
    case "codechef.com":
    case "www.codechef.com":
      return [`CC-${pid}`, `${prefix}/CodeChef-${pid}`]
    case "atcoder.jp":
    case "www.atcoder.jp":
      return [`AtCoder-${pid}`, `${prefix}/AtCoder-${pid}`]
    case "www.hackerrank.com":
      if (pid === "problem")
        url = path.parse(link.split("/").slice(0, -1).join("/"))
      return [`HR-${pid}`, `${prefix}/HackerRank-${pid}`]
  }
}

const vjudgeParser = async (body) => {
  const { link } = body
  const [pid, vjudgeLink] = getVjudgeLink(link)
  try {
    const { data } = await axios(vjudgeLink)
    const $ = cheerio.load(data)
    body.name = $("#prob-title h2").html()
    body.pid = pid
    body.tags = []
    body.difficulty = 0
  } catch (err) {
    return { error: "Parser: Something went wrong" }
  }
  return body
}

module.exports = vjudgeParser
