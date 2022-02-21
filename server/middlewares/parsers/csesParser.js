const path = require("path")
const axios = require("axios")
const cheerio = require("cheerio")

const csesParser = async (body) => {
  const { link } = body

  try {
    const { data } = await axios(link)
    const $ = cheerio.load(data)

    // problem name

    body.name = $(".title-block h1").text().trim()

    // problem id
    const { name } = path.parse(link)
    const pid = name.includes("lang") ? name.split("?")[0] : name

    body.pid = "CSES-" + pid

    // problem difficulty
    body.difficulty = 0

    // problem tags
    body.tags = []

    // attached judgeId
    body.judgeId = 8
  } catch (err) {
    return { error: "Parser: Something went wrong!" }
  }

  return body
}

module.exports = csesParser
