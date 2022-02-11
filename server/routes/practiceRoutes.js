const {
  createProblem,
  getAllProblems,
  deleteProblem,
  updateProblem,
} = require("../controllers/practiceControllers")
const isCFValid = require("../middlewares/isCFValid")
const isAuthenticated = require("../middlewares/isAutheticated")

const router = require("express").Router()
router
  .route("/")
  .post(isAuthenticated, isCFValid, createProblem)
  .get(isAuthenticated, getAllProblems)

router.route("/:id").delete(isAuthenticated, deleteProblem).patch(updateProblem)

module.exports = router
