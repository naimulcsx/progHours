const { Problem, PracticeSubmissions } = require("../models").sequelize.models
const cheerio = require("cheerio")
const axios = require("axios")

const createProblem = async (req, res, next) => {
  let { link, verdict, solveTime, pid } = req.body

  return res.send({
    foo: "bar",
  })

  // try {
  //   const problem = await Problem.findOne({ where: { pid } })

  // }

  // const urlSplit = url.split("/")

  // let pid
  // if (urlSplit.includes("problemset")) pid = urlSplit.slice(-2).join("")
  // else if (urlSplit.includes("contest")) pid = urlSplit[4] + "" + urlSplit[6]

  // try {
  //   const findId = await Problem.findOne({ where: { pid } })
  //   console.log(pid)

  //   console.log("findId---", findId)

  //   if (findId) {
  //     return res.status(400).json({
  //       message: "Problem already exists",
  //     })
  //   }

  //   const response = await axios(url)
  //   const data = response.data

  //   const $ = cheerio.load(data)
  //   const val = $(".title").html()

  //   const name = val.split(". ")
  //   console.log("pname----", name)

  //   // const newSubmisison = await Problem.create({
  //   //   userId: req.currentUser.id,
  //   //   pid,
  //   //   verdict,
  //   // })

  //   return res.status(200).json({
  //     message: "Hello world",
  //     val,
  //     pid,
  //   })
  // } catch (err) {
  //   console.log(err)
  //   res.status(400).json(err)
  // }
}

module.exports = { createProblem }
