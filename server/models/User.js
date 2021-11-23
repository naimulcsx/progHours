const { DataTypes } = require("sequelize")

/**
 *  @swagger
 *  components:
 *    schemas:
 *      user:
 *        type: object
 *        required:
 *          - uid
 *          - name
 *          - email
 *          - password
 *        properties:
 *          id:
 *            type: integer
 *          uid:
 *            type: string
 *          name:
 *            type: string
 *          email:
 *            type: string
 *          password:
 *            type: string
 *          role:
 *            type: shortint
 */

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
