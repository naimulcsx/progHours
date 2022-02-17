const path = require("path")
const axios = require("axios")
const cheerio = require("cheerio")

const csesParser = async (body) => {
  const { link } = body

  try {
    const { data } = await axios(link)
    const $ = cheerio.load(data)

    const parser = path.parse(link)

    body.name = $(".title-block h1").text().trim()
    body.pid = "CSES-" + parser.name
    body.difficulty = 500
    body.tags = []
    body.judgeId = 8
  } catch (err) {
    return { error: "Parser: Something went wrong!" }
  }

  return body
}

module.exports = csesParser
