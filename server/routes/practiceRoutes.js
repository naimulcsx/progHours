const { createProblem } = require("../controllers/practiceControllers")

const router = require("express").Router()
router.route("/").post(createProblem)

module.exports = router
