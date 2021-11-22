const { DataTypes } = require("sequelize")

module.exports = (sequelize) => {
  const User = sequelize.define(
    "User",
    {
      uid: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        trim: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isEmail: {
            msg: "Invalid email address",
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      role: {
        type: DataTypes.SMALLINT,
        defaultValue: 0,
      },
    },
    {
      updatedAt: false,
      underscored: true,
    }
  )
  return User
}
