const { exec } = require("child_process")
const express = require("express")
const app = express()
const jwt = require("jsonwebtoken")

/**
 * Migrate Database
 */
const runMigration = async () => {
  await new Promise((resolve, reject) => {
    const migrate = exec("npm run migrate", { env: process.env }, (err) =>
      err ? reject(err) : resolve()
    )
    // Forward stdout+stderr to this process
    migrate.stdout.pipe(process.stdout)
    migrate.stderr.pipe(process.stderr)
  })
}
runMigration()

/**
 * Allow JSON body parsing
 */
app.use(express.static(__dirname + "/public"))
app.use(express.json())

/**
 * Attach user's information on the request object
 */
const { User } = require("./models").sequelize.models
app.use(async (req, res, next) => {
  const cookie = req.headers.cookie || ""
  const accessToken = getAccessToken(cookie)
  if (!accessToken) return next()
  try {
    const user = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET)
    // check if the user is found on the database
    const userFound = await User.findOne({ where: { id: user.id } })
    if (userFound) req.user = user
  } catch (err) {}
  next()
})

/**
 * Setup application routes
 */
const authRoutes = require("./routes/authRoutes")
const practiceRoutes = require("./routes/practiceRoutes")
const getAccessToken = require("./utils/getAccessToken")

app.use("/auth", authRoutes)
app.use("/submissions", practiceRoutes)

/**
 * Listen for requests
 */
app.listen(4000, () => console.log("server listening on port 4000"))
