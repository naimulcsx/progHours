const { DataTypes } = require("sequelize")
const bcrypt = require("bcrypt")

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
        unique: {
          args: true,
          msg: "User already exists",
        },
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
      underscored: true /** This makes table name and property names lowercase */,
    }
  )
  /**
   * Validate password instance method
   * ! ARROW FUNCTION WILL NOT WORK
   */
  User.prototype.validatePassword = function (password) {
    return bcrypt.compare(password, this.password)
  }
  /**
   * Hash the password before inserting into table
   */
  User.beforeCreate(async (user, options) => {
    try {
      const hash = await bcrypt.hash(user.password, 10)
      user.password = hash
    } catch (error) {
      throw new Error(error)
    }
  })
  return User
}
