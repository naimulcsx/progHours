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
  res.send({
    message: "Login route",
  })
}
