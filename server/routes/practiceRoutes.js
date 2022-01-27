const {
  createProblem,
  getAllProblems,
} = require("../controllers/practiceControllers")
const isCFValid = require("../middlewares/isCFValid")

const router = require("express").Router()
router.route("/").post(isCFValid, createProblem).get(getAllProblems)

module.exports = router
