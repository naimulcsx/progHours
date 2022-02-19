const { Problem, PracticeSubmission, Tag, ProblemTag, ProblemTagVotes } =
  require("../models").sequelize.models

const createProblemTag = async (req, res, next) => {
  const { name } = req.body
  const { pid } = req.params

  const userId = 1

  try {
    const tag = await Tag.findOne({ where: { name } })

    if (!tag) {
      res.status(404).json({
        status: "error",
        message: "Tag is not found!",
      })
    }

    await ProblemTagVotes.create({ userId })

    res.send({ tag })
  } catch (err) {
    res.json(err)
  }
}

module.exports = { createProblemTag }
