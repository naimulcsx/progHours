"use strict"
const { Model } = require("sequelize")
module.exports = (sequelize, DataTypes) => {
  class UserProblemTag extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  UserProblemTag.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        references: {
          model: "users",
          key: "id",
        },
      },
      problemTagId: {
        type: DataTypes.INTEGER,
        references: {
          model: "problemTags",
          key: "id",
        },
      },
    },
    {
      sequelize,
      underscored: true,
      modelName: "UserProblemTag",
    }
  )
  return UserProblemTag
}
