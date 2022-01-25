"use strict"
const { Model } = require("sequelize")
module.exports = (sequelize, DataTypes) => {
  class PracticeSubmission extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  PracticeSubmission.init(
    {
      problemId: {
        type: DataTypes.INTEGER,
        references: {
          model: "problems",
          key: "id",
        },
      },
      userId: {
        type: DataTypes.INTEGER,
        references: {
          model: "users",
          key: "id",
        },
      },
      solveTime: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      verdict: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      solvedAt: {
        type: DataTypes.DATE,
      },
    },
    {
      sequelize,
      tableName: "practiceSubmissions",
      modelName: "PracticeSubmission",
    }
  )
  return PracticeSubmission
}
