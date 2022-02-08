const { Problem, PracticeSubmission, Tag, ProblemTag } =
  require("../models").sequelize.models
const cheerio = require("cheerio")
const axios = require("axios")

const createProblem = async (req, res, next) => {
  let { link, verdict, solveTime, pid, judgeId } = req.body
  let userId = req.user.id

  try {
    let problemId
    const problem = await Problem.findOne({ where: { pid } })
    if (problem) {
      problemId = problem.dataValues.id
    } else {
      const response = await axios(link)
      const $ = cheerio.load(response.data)
      const problemExists = $(".title a").html() === null

      if (!problemExists) {
        return res.status(400).json({
          status: "error",
          message: "Invalid problem link.",
        })
      }

      let makeTags = []
      $(".roundbox .tag-box").each(function (i, e) {
        const tag = $(this).text().trim()
        makeTags.push({ name: tag })
      })

      // create problem
      let difficulty = makeTags[makeTags.length - 1].name

      const name = $(".title").html().split(". ")[1]

      const newProblem = await Problem.create({
        pid,
        name,
        judgeId,
        solveTime,
        difficulty,
      })
      problemId = newProblem.dataValues.id

      // create tags
      const tags = [...makeTags]
      tags.pop()

      tags.forEach(async (el) => {
        const [newTag] = await Tag.findOrCreate({
          where: { name: el.name },
          defaults: { name: el.name },
        })

        await ProblemTag.create({ problemId, tagId: newTag.dataValues.id })
      })
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
    if (!created) {
      return res.status(400).send({
        status: "error",
        message: "You already added this problem",
      })
    }
    res.status(201).send({
      status: "success",
      data: newSubmission,
    })
  } catch (err) {
    console.log(err)
    res.json(err)
  }
}

const getAllProblems = async (req, res, next) => {
  const userId = req.user.id
  try {
    const problems = await PracticeSubmission.findAll({
      include: { model: Problem, as: "problem" },
      where: { userId },
      order: [["createdAt", "DESC"]],
    })
    res.status(200).json({
      data: problems,
    })
  } catch (err) {
    res.json(err)
  }
}

const updateProblem = async (req, res, next) => {
  const { verdict, solveTime, solvedAt } = req.body
  const { id } = req.params

  try {
    const isUpdated = await PracticeSubmission.update(
      { verdict, solveTime, solvedAt },
      { where: { id } }
    )

    if (!isUpdated[0]) {
      return res.status(400).json({
        status: "error",
        message: "submission not updated",
      })
    }

    res.status(200).json({
      status: "success",
    })
  } catch (err) {
    req.json(err)
  }
}

const deleteProblem = async (req, res, next) => {
  const userId = req.user.id
  const { id } = req.params

  try {
    const isDeleted = await PracticeSubmission.destroy({
      where: { id, userId },
    })

    if (!isDeleted) {
      return res.status(400).json({
        status: "error",
        message: "Something went very wrong",
      })
    }

    res.status(204).json({
      status: "success",
    })
  } catch (err) {
    res.json(err)
  }
}

module.exports = { createProblem, getAllProblems, deleteProblem, updateProblem }
