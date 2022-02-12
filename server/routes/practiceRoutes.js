const {
  createSubmission,
  getSubmissions,
  deleteSubmission,
  updateSubmission,
} = require("../controllers/practiceControllers")
const isCFValid = require("../middlewares/isCFValid")
const isAuthenticated = require("../middlewares/isAutheticated")

const router = require("express").Router()
router
  .route("/")
  .get(isAuthenticated, getSubmissions)
  .post(isAuthenticated, isCFValid, createSubmission)

router
  .route("/:id")
  .delete(isAuthenticated, deleteSubmission)
  .patch(isAuthenticated, updateSubmission)

module.exports = router
