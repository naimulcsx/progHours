const express = require("express")
const app = express()
const jwt = require("jsonwebtoken")

/**
 * Allow JSON body parsing
 */
app.use(express.static(__dirname + "/public"))
app.use(express.json())

/**
 * Setup application routes
 */
const authRoutes = require("./routes/authRoutes")
const practiceSubmissionRoutes = require("./routes/practiceSubmissionRoutes")

app.use("/auth", authRoutes)
app.use("/practice", practiceSubmissionRoutes)

app.get("/user", async (req, res) => {
  const { cookie } = req.headers
  const accessToken = cookie.split("=")[1]
  const user = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET)
  res.json(user)
})

app.all("*", (req, res) => {
  res.json({
    message: `Can't find ${req.originalUrl} to this server!`,
  })
})

/**
 * Listen for requests
 */
app.listen(4000, () => console.log("server listening on port 4000"))
