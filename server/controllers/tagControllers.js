const { Problem, PracticeSubmission, Tag, ProblemTag, UserProblemTag } =
  require("../models").sequelize.models

const createProblemTag = async (req, res, next) => {
  const { name } = req.body
  const { pid } = req.params

  const userId = 1

  try {
    const tag = await Tag.findOne({ where: { name } })

    let problemTagId

    if (!tag) {
      const newTag = await Tag.create({ name })

      const createPTag = await ProblemTag.create({
        problemId: pid,
        tagId: newTag.dataValues.id,
      })

      console.log("-------------------", createPTag)

      problemTagId = createPTag.dataValues.problemId
    } else {
      const pTag = await ProblemTag.findOne({
        where: { problemId: pid },
      })

      problemTagId = pTag.dataValues.id

      console.log("-------------------", pTag)
      console.log("-------------------", pTag.id)
    }

    const userPTag = await UserProblemTag.create({
      userId,
      problemTagId,
    })

    return res.send({ tag, userPTag })
  } catch (err) {
    res.json(err)
  }
}

module.exports = { createProblemTag }
