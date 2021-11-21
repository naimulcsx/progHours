const express = require("express")
const app = express()

/**
 * Swagger UI Setup
 */
const swaggerUI = require("swagger-ui-express")
const swaggerJSDoc = require("swagger-jsdoc")
const swaggerRedirectFix = require("./middlewares/swaggerRedirectFix")
const specs = swaggerJSDoc({
  definition: {
    openapi: "3.0.0",
    info: {
      title: "ProgHours",
      version: "0.1.0",
      description:
        "A one-stop training tool for coaches and competitive programmers. 🔥",
    },
  },
  apis: ["./routes/*.js"],
})
app.use("/docs/", swaggerRedirectFix, swaggerUI.serve, swaggerUI.setup(specs))

/**
 * Setup application routes
 */

app.get("/", (req, res) => {
  res.send("hello worldss")
})

const { User } = require("./model").models

app.get("/create-user", (req, res) => {
  User.create({
    firstName: "Naimul",
    lastName: "Haque",
  })
    .then(() => {
      res.send("Successfully created user")
    })
    .catch((err) => {
      res.json(err)
    })
})

/**
 * Listen for requests
 */
app.listen(4000, () => console.log("server listening on port 4000"))
