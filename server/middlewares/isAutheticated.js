const isAuthenticated = (req, res, next) => {
  if (req.user) return next()
  return res.status(401).send({
    status: "error",
    message: "User not logged in"
  });
}

module.exports = isAuthenticated