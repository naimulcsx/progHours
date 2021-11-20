const swaggerRedirectFix = (req, res, next) => {
  if (req.originalUrl == "/docs") return res.redirect("docs/")
  next()
}

module.exports = swaggerRedirectFix
