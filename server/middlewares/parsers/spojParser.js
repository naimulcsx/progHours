const axios = require("axios")
const cheerio = require("cheerio")

const spojParser = async (body) => {
  const { link } = body

  try {
    const { data } = await axios(link)
    const $ = cheerio.load(data)

    const str = $(".prob #problem-name").text().trim()
    const parts = str.split(" - ")
    body.name = parts[1]
    body.pid = "SPOJ-" + parts[0]

    body.difficulty = 500
    body.tags = []
    body.judgeId = 2
  } catch (err) {
    return { error: "Parser: Something went wrong!" }
  }

  return body
}

module.exports = spojParser
