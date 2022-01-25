const { Model } = require("sequelize")
const bcrypt = require("bcrypt")

module.exports = (sequelize, DataTypes) => {
  class OnlineJudge extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  OnlineJudge.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        trim: true,
      },
    },
    {
      sequelize,
      tableName: "onlineJudges",
      modelName: "OnlineJudge",
    }
  )
  return OnlineJudge
}
