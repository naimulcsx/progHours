"use strict"
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable("problems", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
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
      solveTime: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      judgeId: {
        type: DataTypes.INTEGER,
        references: {
          model: "onlineJudges",
          key: "id",
        },
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    })
  },
  async down(queryInterface, DataTypes) {
    await queryInterface.dropTable("problems")
  },
}
