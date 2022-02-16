const axios = require("axios")
const cheerio = require("cheerio")
const path = require("path")

const atCoderParser = async (body) => {
  const { link } = body

  try {
    const { data } = await axios(link)
    const $ = cheerio.load(data)

    const str = $("#main-container .row span.h2").text().trim()
    const arr = str.split(" ")
    const firstPart = arr.slice(2, arr.length - 1).join(" ")
    const lastPart = arr.slice(-1).join("").split("\n")[0]
    const parser = path.parse(link)
    body.name = firstPart + " " + lastPart
    body.pid = "AC-" + parser.name

    body.difficulty = 500
    body.tags = []
    body.judgeId = 2
  } catch (err) {
    return { error: "Parser: Something went wrong!" }
  }

  return body
}

module.exports = atCoderParser
