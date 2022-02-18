"use strict"
const { Model } = require("sequelize")
module.exports = (sequelize, DataTypes) => {
  class Submission extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Submission.init(
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
        defaultValue: DataTypes.NOW,
        allowNull: false,
      },
    },
    {
      sequelize,
      underscored: true,
      modelName: "Submission",
    }
  )
  Submission.associate = (models) => {
    Submission.belongsTo(models.Problem, {
      foreignKey: {
        name: "problemId",
        allowNull: false,
      },
      as: "problem",
    })
  }
  return Submission
}
