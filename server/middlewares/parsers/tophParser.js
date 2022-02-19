const axios = require("axios")
const cheerio = require("cheerio")
const path = require("path")

const tophParser = async (body) => {
  const { link } = body

  try {
    const { data } = await axios(link)
    const $ = cheerio.load(data)

    // problem name
    const pname = $(".artifact__caption h1").text().trim()
    body.name = pname

    /// problem id
    const { name } = path.parse(link)
    const pid = name.includes("lang") ? name.split("?")[0] : name

    body.pid = "TH-" + pid

    // problem difficulty
    body.difficulty = 500

    // problem tags
    body.tags = []
    $(".flair__item .text a").each(function (i, e) {
      const tag = $(this).text().trim()
      body.tags.push(tag)
    })

    body.judgeId = 9
  } catch (err) {
    return { error: "Parser: Something went wrong" }
  }

  return body
}

module.exports = tophParser
