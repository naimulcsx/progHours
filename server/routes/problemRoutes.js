const { createProblemTag } = require("../controllers/tagControllers")
const isAuthenticated = require("../middlewares/isAutheticated")
const { Problem, PracticeSubmission, Tag, ProblemTag, UserProblemTag } =
  require("../models").sequelize.models

const router = require("express").Router()

router.route("/:pid/tags").post(createProblemTag)

router.route("/test-sub").get(async (req, res, next) => {
  const tag = await ProblemTag.findAll()

  res.send({ tag })

  console.log("---------------", tag)
})

module.exports = router
