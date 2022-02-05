const { User } = require("../models").sequelize.models
const jwt = require("jsonwebtoken")
const getAccessToken = require("../utils/getAccessToken")

const register = async (req, res) => {
  let { name, password, uid, email } = req.body
  uid = uid.toLowerCase()

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
    console.log(err)
    res.status(400).json(err)
  }
}

const login = async (req, res) => {
  let { uid, password } = req.body
  uid = uid.toLowerCase()

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
    const { id } = user.dataValues
    const accessToken = jwt.sign(
      { id, uid: uid, name: user.name },
      process.env.ACCESS_TOKEN_SECRET
    )
    // send the accessToken to client
    res.cookie("accessToken", accessToken).send({
      status: "success",
      user: {
        uid,
        name: user.name,
      },
    })
  } catch (err) {
    console.log(err)
    res.status(400).send({
      status: "error",
    })
  }
}

const logout = (req, res) => {
  res.cookie("accessToken", "", { expires: new Date(Date.now() - 100) }).json({
    type: "success",
  })
}

const getUser = async (req, res) => {
  const { cookie } = req.headers
  const accessToken = getAccessToken(cookie)
  // can't handle the error when the token is invalid
  // tried both callback and try-catch
  const user = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET)
  res.status(200).send({
    status: "sucess",
    user,
  })
}

module.exports = { register, login, logout, getUser }
