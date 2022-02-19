const axios = require("axios")
const cheerio = require("cheerio")
const url = require("url")

const atCoderParser = async (body) => {
  const { link } = body

  try {
    const { data } = await axios(link)
    const $ = cheerio.load(data)

    // problem name
    const parse = $("#main-container .row span.h2").text().trim()
    body.name = parse.split("\n")[0].split("-")[1].trim()

    // problem Id
    const parseLink = url.parse(link, true)
    const pid = parseLink.pathname.split("/")[4]
    body.pid = "AC-" + pid

    // problem difficulty
    body.difficulty = 0

    // problem tags
    body.tags = []
    body.judgeId = 4
  } catch (err) {
    return { error: "Parser: Something went wrong!" }
  }

  return body
}

module.exports = atCoderParser
