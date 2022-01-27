"use strict"
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable("handles", {
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
    })
  },
  async down(queryInterface, DataTypes) {
    await queryInterface.dropTable("handles")
  },
}
