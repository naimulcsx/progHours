"use strict"
const { Model } = require("sequelize")
module.exports = (sequelize, DataTypes) => {
  class Problem extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Problem.init(
    {
      pid: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        trim: true,
      },
      judgeId: {
        type: DataTypes.INTEGER,
        references: {
          model: "onlineJudges",
          key: "id",
        },
      },
    },
    {
      sequelize,
      tableName: "problems",
      modelName: "Problem",
    }
  )

  Problem.associate = (models) => {
    Problem.hasMany(models.PracticeSubmission, {
      foreignKey: {
        name: "problemId",
        allowNull: false
      },
    })
  }

  return Problem
}
