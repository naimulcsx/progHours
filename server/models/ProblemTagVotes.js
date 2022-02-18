"use strict"
const { Model } = require("sequelize")
module.exports = (sequelize, DataTypes) => {
  class ProblemTagVotes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ProblemTagVotes.init(
    {
      userId: {
        type: Sequelize.INTEGER,
        references: {
          model: "users",
          key: "id",
        },
      },
      problemTagsId: {
        type: Sequelize.INTEGER,
        references: {
          model: "problemTags",
          key: "id",
        },
      },
    },
    {
      sequelize,
      modelName: "ProblemTagVotes",
    }
  )
  return ProblemTagVotes
}
