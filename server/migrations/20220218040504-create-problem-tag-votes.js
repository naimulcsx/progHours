"use strict"
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("ProblemTagVotes", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      userId: {
        type: Sequelize.INTEGER,
        references: {
          model: "users",
          key: "id",
        },
      },
      problemTagsId: {
        type: Sequelize.INTEGER,
        references: {
          model: "problemTags",
          key: "id",
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    })
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("ProblemTagVotes")
  },
}
