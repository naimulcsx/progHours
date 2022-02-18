"use strict"
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable("ProblemTagVotes", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      userId: {
        type: DataTypes.INTEGER,
        references: {
          model: "users",
          key: "id",
        },
      },
      problemTagsId: {
        type: DataTypes.INTEGER,
        references: {
          model: "problemTags",
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
    await queryInterface.dropTable("ProblemTagVotes")
  },
}
