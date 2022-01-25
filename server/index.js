const { exec } = require("child_process")
const express = require("express")
const app = express()
const jwt = require("jsonwebtoken")

/**
 * Migrate Database
 */
const runMigration = async () => {
  return await new Promise((resolve, reject) => {
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
 * Setup application routes
 */
const authRoutes = require("./routes/authRoutes")
app.use("/auth", authRoutes)
app.get("/user", async (req, res) => {
  const { cookie } = req.headers
  const accessToken = cookie.split("=")[1]
  const user = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET)
  res.json(user)
})

/**
 * Listen for requests
 */
app.listen(4000, () => console.log("server listening on port 4000"))
