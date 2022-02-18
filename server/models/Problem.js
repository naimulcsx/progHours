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
      this.hasMany(models.Submission, {
        foreignKey: {
          name: "problemId",
          allowNull: false,
        },
      })
      this.belongsToMany(models.Tag, {
        foreignKey: "problemId",
        as: "tags",
        through: models.ProblemTag,
      })
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
      difficulty: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: false,
      },
      link: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
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
      underscored: true,
      modelName: "Problem",
    }
  )
  return Problem
}
