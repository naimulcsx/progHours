const { User } = require("../models")
const jwt = require("jsonwebtoken")

const register = async (req, res) => {
  const { name, password, uid, email } = req.body
  try {
    const newUser = await User.create({
      name,
      password,
      uid,
      email,
    })
    res.json({
      status: "success",
      user: newUser,
    })
  } catch (err) {
    res.status(400).json(err)
  }
}

const login = async (req, res) => {
  const { uid, password } = req.body
  try {
    // check if user exists
    const user = await User.findOne({ where: { uid } })
    if (!user) {
      return res
        .status(401)
        .json({ status: "error", message: "User not found" })
    }
    // check if the password provided is valid
    const isValid = await user.validatePassword(password)
    if (!isValid) {
      return res.status(401).json({
        status: "error",
        message: "Incorrect password",
      })
    }
    // if user exists and password is correct
    const accessToken = jwt.sign(
      { uid: uid, name: user.name },
      process.env.ACCESS_TOKEN_SECRET
    )
    // send the accessToken to client
    res.cookie("accessToken", accessToken).send({
      status: "success",
    })
  } catch (err) {
    res.json(err.response)
  }
}

const logout = (req, res) => {
  res.cookie("accessToken", "", { expires: new Date(Date.now() - 100) }).json({
    type: "success",
  })
}

module.exports = { register, login, logout }
