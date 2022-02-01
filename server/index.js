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
app.use((req, res, next) => {
  const cookie = req.headers.cookie || ""
  const accessToken = getAccessToken(cookie)
  if (!accessToken) return next()
  const user = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET)
  req.user = user
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
