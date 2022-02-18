const { Model } = require("sequelize")

module.exports = (sequelize, DataTypes) => {
  class Handle extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Handle.init(
    {
      value: {
        type: DataTypes.STRING,
        allowNull: false,
        trim: true,
      },
      userId: {
        type: DataTypes.INTEGER,
        references: {
          model: "users",
          key: "id",
        },
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
      modelName: "Handle",
    }
  )
  return Handle
}
