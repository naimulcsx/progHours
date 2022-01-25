const { PracticeSubmission } = require("../models").sequelize.models
const cheerio = require("cheerio")
const path = require("path")
const urlHelp = require("url")

const createProblem = async (req, res) => {
  let { url } = req.body

  //   const file = urlHelp.parse(url, true)

  //   console.log("parsing------", cheerio.load(file).html())

  //   url = url.split("/")

  //   if (url.includes("problemset")) {
  //     console.log("Eito peye gechi -- problemset")
  //   }

  //   console.log(url.length)
  //   console.log(url.includes("problemset"))
  //   console.log(url.includes("contest"))

  console.log(path.resolve(url))

  return res.status(200).json({
    message: "Hello world",
  })
}

module.exports = { createProblem }
