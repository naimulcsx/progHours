const axios = require("axios")
const cheerio = require("cheerio")
const path = require("path")

const tophParser = async (body) => {
  const { link } = body

  try {
    const { data } = await axios(link)
    const $ = cheerio.load(data)

    const pname = $(".artifact__caption h1").text().trim()
    const parser = path.parse(link)

    body.name = pname

    body.pid = "TH-" + parser.name

    body.difficulty = 500
    body.tags = []
    body.judgeId = 9
  } catch (err) {
    return { error: "Parser: Something went wrong" }
  }

  return body
}

module.exports = tophParser
