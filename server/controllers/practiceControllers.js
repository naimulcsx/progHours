const { Problem, Submission, Tag, ProblemTag } =
  require("../models").sequelize.models

const createSubmission = async (req, res, next) => {
  let {
    link,
    verdict,
    solveTime,
    name,
    difficulty,
    tags,
    judgeId,
    pid,
    solvedAt,
  } = req.body

  let userId = req.user.id
  try {
    let problemId
    const problem = await Problem.findOne({ where: { link } })
    if (problem) {
      problemId = problem.dataValues.id
    } else {
      const newProblem = await Problem.create({
        pid,
        name,
        judgeId,
        solveTime,
        difficulty,
        link,
      })
      problemId = newProblem.dataValues.id
      // create tags
      tags.forEach(async (el) => {
        const [newTag] = await Tag.findOrCreate({
          where: { name: el },
          defaults: { name: el },
        })
        await ProblemTag.create({ problemId, tagId: newTag.dataValues.id })
      })
    }
    const [newSubmission, created] = await Submission.findOrCreate({
      where: { userId, problemId },
      defaults: {
        userId,
        problemId,
        solveTime,
        verdict,
        solvedAt,
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
    res.status(400).json(err)
  }
}

const getSubmissions = async (req, res, next) => {
  const userId = req.user.id
  try {
    const problems = await Submission.findAll({
      include: {
        model: Problem,
        as: "problem",
        include: {
          model: Tag,
          as: "tags",
        },
      },
      where: { userId },
      order: [["solvedAt", "DESC"]],
    })
    res.status(200).json({
      data: problems,
    })
  } catch (err) {
    res.json(err)
  }
}

const updateSubmission = async (req, res, next) => {
  const { name, problemId, verdict, solveTime, solvedAt } = req.body
  const { id } = req.params

  try {
    if (name) {
      const problemUpdated = await Problem.update(
        { name },
        { where: { id: problemId } }
      )
      if (problemUpdated[0]) {
        return res.status(200).json({
          status: "success",
        })
      }
      return res.status(400).json({
        status: "error",
        message: "submission not updated",
      })
    }
    const isUpdated = await Submission.update(
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
    res.status(400).json({
      status: "error",
      message: "Something went wrong.",
    })
  }
}

const deleteSubmission = async (req, res, next) => {
  const userId = req.user.id
  const { id } = req.params

  try {
    const isDeleted = await Submission.destroy({
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

module.exports = {
  createSubmission,
  getSubmissions,
  deleteSubmission,
  updateSubmission,
}
