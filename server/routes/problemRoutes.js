const { createProblemTag } = require("../controllers/tagControllers")
const isAuthenticated = require("../middlewares/isAutheticated")

const router = require("express").Router()

router.route("/:pid/tags").post(createProblemTag)

module.exports = router
