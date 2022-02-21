const { User, Problem, PracticeSubmission, Tag, ProblemTag, UserProblemTag } =
  require("../models").sequelize.models

/**
 ** This controller creates a tag for a particular problem with `problemId`
 */

const createProblemTag = async (req, res, next) => {
  const { name } = req.body
  const { id } = req.params
  const userId = req.user.id
  try {
    /**
     ** Check if the tag we are trying to add already exists
     ** If it exists then we don't need to create it again
     ** So we will use findOrCreate
     */
    const [tag] = await Tag.findOrCreate({
      where: { name },
      defaults: { name },
    })
    await ProblemTag.findOrCreate({
      where: { problemId: id, tagId: tag.dataValues.id },
      defaults: { problemId: id, tagId: tag.dataValues.id },
    })
    const newProblemTag = await ProblemTag.findOne({
      where: { problemId: id, tagId: tag.dataValues.id },
      attributes: ["id"],
    })
    const [userProblemTag] = await UserProblemTag.findOrCreate({
      where: { problemTagId: newProblemTag.id, userId },
      defaults: { problemTagId: newProblemTag.id, userId },
    })
    return res.send({ status: "success", userProblemTag })
  } catch (err) {
    res.json(err)
  }
}

// const testController = async (req, res, next) => {
//   let tagId = 10,
//     problemId = 1
//   const problemTag = await ProblemTag.findOne({
//     where: { tagId, problemId },
//     attributes: ["id"],
//   })
//   // Find out the users who added a particular tag for a particular problem
//   const val = await UserProblemTag.findAll({
//     where: { problemTagId: problemTag.id },
//     include: User,
//   })
//   res.send(val)
// }

module.exports = { createProblemTag }
