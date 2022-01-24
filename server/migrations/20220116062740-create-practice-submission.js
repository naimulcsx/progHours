"use strict"
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable("practice_submissions", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
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
      verdict: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      solvedAt: {
        type: DataTypes.DATE,
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
    await queryInterface.dropTable("practice_submissions")
  },
}
