const cheerio = require("cheerio")
const axios = require("axios")

const getPID = (link) => {
  let pid = "",
    parts = link.split("/")
  if (parts.length !== 7) return -1
  if (parts.includes("contest")) pid = "CF" + "-" + parts[4] + parts[6]
  if (parts.includes("problemset")) pid = "CF" + "-" + parts.slice(-2).join("")
  return pid
}

const cfParser = async (body) => {
  const { link, solveTime, verdict } = body
  try {
    const { data } = await axios(link)
    const $ = cheerio.load(data)
    // check if link is a valid problem page
    const isValidLink = $(".title").html() && $(".title a").html() === null
    if (!isValidLink) return { error: "Invalid link" }

    // attach the problem name
    body.pid = getPID(link)
    body.name = $(".title").html().split(". ")[1]
    // attach problem tags
    body.tags = []
    $(".roundbox .tag-box").each(function (i, e) {
      const tag = $(this).text().trim()
      body.tags.push(tag)
    })
    body.diffculty = parseInt(body.tags[body.tags.length - 1].split("*")[1])
    body.judgeId = 1
    body.tags.pop()
  } catch (err) {}
  return body
}

module.exports = cfParser
