const axios = require("axios")
const cheerio = require("cheerio")

const lightOJParser = async (body) => {
  const { link } = body

  try {
    const { data } = await axios(link)

    const $ = cheerio.load(data)

    // body.difficulty = $(".tags .is-primary").text().trim()
    body.difficulty = 500
    body.pid = $(".tags .is-link").text().trim()
    body.name = $(".title").text().trim()
    body.tags = []
  } catch (err) {
    return { error: "Parser: Something went wrong" }
  }

  return body
}

module.exports = lightOJParser
