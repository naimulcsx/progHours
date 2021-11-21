const { DataTypes } = require("sequelize")

module.exports = (sequelize) => {
  const User = sequelize.define(
    "User",
    {
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
    },
    {
      updatedAt: false,
    }
  )
  return User
}
