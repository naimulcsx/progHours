"use strict"
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable("onlineJudges", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        trim: true,
        unique: true,
      },
    })
  },
  async down(queryInterface, DataTypes) {
    await queryInterface.dropTable("onlineJudges")
  },
}
