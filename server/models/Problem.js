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
        unique: {
          args: true,
          msg: "Problem already exists",
        },
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
  return Problem
}
