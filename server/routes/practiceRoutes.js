const {
  createProblem,
  getAllProblems,
} = require("../controllers/practiceControllers")
const isCFValid = require("../middlewares/isCFValid")
const isAuthenticated = require('../middlewares/isAutheticated')

const router = require("express").Router()
router.route("/").post(isAuthenticated, isCFValid, createProblem).get(getAllProblems)

module.exports = router
