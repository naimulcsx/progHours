"use strict"
const { Model } = require("sequelize")
module.exports = (sequelize, DataTypes) => {
  class Tag extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsToMany(models.Problem, {
        foreignKey: "tagId",
        through: models.ProblemTag,
      })
    }
  }
  Tag.init(
    {
      name: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        trim: true,
      },
    },
    {
      sequelize,
      tableName: "tags",
      modelName: "Tag",
    }
  )
  return Tag
}
