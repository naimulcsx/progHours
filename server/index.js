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

app.get("/", (req, res) => {
  res.send("hello worldss")
})

app.listen(4000, () => console.log("server listening on port 4000"))
