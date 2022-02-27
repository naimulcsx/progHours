const axios = require("axios")
const cheerio = require("cheerio")

const UVAParser = async (body) => {
  const { link } = body

  try {
    const { data } = await axios(link)
    const $ = cheerio.load(data)

    const str = $(".floatbox tr td h3").text().trim()
    const parts = str.split(" - ")

    body.pid = "UVA-" + parts[0]
    body.name = parts.slice(1).join(" ").trim()
    body.difficulty = 0
    body.tags = []
    body.judgeId = 7
  } catch (err) {
    return { error: "Parser: Something went wrong" }
  }

  return body
}

module.exports = UVAParser
