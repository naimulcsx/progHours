const express = require("express")
const router = express.Router()
const isAuthenticated = require('../middlewares/isAutheticated')

const {
  register,
  login,
  logout,
  getUser,
} = require("../controllers/authControllers")

router.route("/register").post(register)
router.route("/login").post(login)
router.route("/logout").get(logout)
router.route("/user").get(isAuthenticated, getUser)

module.exports = router
