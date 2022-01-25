const { createProblem } = require("../controllers/practiceControllers")
const isCFValid = require("../middlewares/isCFValid")

const router = require("express").Router()
router.route("/").post(isCFValid, createProblem)

module.exports = router
