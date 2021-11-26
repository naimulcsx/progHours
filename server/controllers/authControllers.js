const { User } = require("../models")

exports.register = async (req, res) => {
  const { name, password, uid, email } = req.body
  try {
    const newUser = await User.create({
      name,
      password,
      uid,
      email,
    })
    res.json(newUser)
  } catch (err) {
    res.status(400).json(err)
  }
}

exports.login = async (req, res) => {
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
    res.status(200).json({
      status: "success",
      token: "TOKEN_GOES_HERE",
    })
  } catch (err) {
    res.json(err.response)
  }
}
