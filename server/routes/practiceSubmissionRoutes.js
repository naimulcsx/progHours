const {
  createProblem,
} = require("../controllers/practiceSubmissionControllers")

const router = require("express").Router()

router.route("/create").post(createProblem)

module.exports = router
