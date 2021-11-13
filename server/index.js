const express = require("express")
const app = express()

app.get("/", (req, res) => {
  res.send("hello worldss")
})

app.listen(4000, () => console.log("server listening on port 4000"))
