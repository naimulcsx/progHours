const axios = require("axios")
const cheerio = require("cheerio")
const path = require("path")

const codeChefParser = async (body) => {
  const { link } = body

  try {
    const { data } = await axios(link)
    const $ = cheerio.load(data)

    body.html = $.html()
    body.difficulty = 500
    body.tags = []
    body.judgeId = 4
  } catch (err) {
    return { error: "Parser: Something went wrong!" }
  }

  return body
}

module.exports = codeChefParser
