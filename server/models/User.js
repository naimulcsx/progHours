const { Model } = require("sequelize")
const bcrypt = require("bcrypt")

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init(
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
      sequelize,
      tableName: "users",
      modelName: "User",
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
