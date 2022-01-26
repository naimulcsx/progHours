const { Problem, PracticeSubmission } = require("../models").sequelize.models
const cheerio = require("cheerio")
const axios = require("axios")

const createProblem = async (req, res, next) => {
  let { link, verdict, solveTime, pid, judgeId } = req.body
  let userId = req.user.id

  try {
    let problemId
    const problem = await Problem.findOne({ where: { pid } })
    if (problem) problemId = problem.dataValues.id
    else {
      const response = await axios(link)
      const $ = cheerio.load(response.data)
      const name = $(".title").html().split(". ")[1]
      const newProblem = await Problem.create({
        pid,
        name,
        judgeId,
        solveTime,
      })
      problemId = newProblem.dataValues.id
    }
    const [newSubmission, created] = await PracticeSubmission.findOrCreate({
      where: { userId, problemId },
      defaults: {
        userId,
        problemId,
        solveTime,
        verdict,
      },
    })
    res.status(201).send({
      status: "success",
      data: newSubmission,
    })
  } catch (err) {
    res.json(err)
  }
}

module.exports = { createProblem }
