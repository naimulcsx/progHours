const {
  createProblem,
  getAllProblems,
  deleteProblem,
} = require("../controllers/practiceControllers")
const isCFValid = require("../middlewares/isCFValid")
const isAuthenticated = require("../middlewares/isAutheticated")

const router = require("express").Router()
router
  .route("/")
  .post(isAuthenticated, isCFValid, createProblem)
  .get(getAllProblems)

router.route("/:id").delete(isAuthenticated, deleteProblem)

module.exports = router
